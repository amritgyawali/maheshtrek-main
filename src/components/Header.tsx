"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { href, type Locale } from "@/lib/i18n";

export interface HeaderNavItem {
  slug: string;
  label: string;
  /** Show in the desktop bar. */
  primary: boolean;
  /**
   * A service department. It still appears in the bar when `primary`, but the
   * phone menu lists it as an accordion of its leaf pages rather than as a
   * flat link, so the same page is never in that menu twice.
   */
  isCategory: boolean;
}

export interface HeaderServiceCategory {
  slug: string;
  label: string;
  services: Array<{ slug: string; label: string }>;
}

/**
 * The services menu opens directly after this nav item, which is what puts
 * "Services" second in the bar without the dictionaries having to carry a
 * separate ordering field.
 */
const SERVICES_MENU_AFTER = "about";

interface HeaderProps {
  lang: Locale;
  siteName: string;
  /**
   * Only the strings the header needs. The full dictionary is deliberately not
   * passed: this is a client component, so every prop is serialised into the
   * page payload, and the whole content tree would ride along.
   */
  labels: {
    menu: string;
    close: string;
    language: string;
    nav: string;
    contact: string;
    services: string;
    allServices: string;
    overview: string;
    startConversation: string;
  };
  items: HeaderNavItem[];
  /** The four service categories and their leaf pages, for the services menu. */
  serviceCategories: HeaderServiceCategory[];
}

export default function Header({
  lang,
  siteName,
  labels,
  items,
  serviceCategories,
}: HeaderProps) {
  const pathname = usePathname() || href(lang);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const primary = items.filter((item) => item.primary);
  // Departments are accordions further down the phone menu; listing them flat
  // as well would put Production and Training in it twice.
  const flat = items.filter((item) => !item.isCategory);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    // Deferred so the first measurement is not a synchronous setState in an
    // effect body, which would cascade a second render before paint.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The services panel is a dropdown, so it closes on Escape and on a click
  // that lands outside it — both expected of a menu, neither free.
  useEffect(() => {
    if (!servicesOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [servicesOpen]);

  const closeAll = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  const isActive = (slug: string) =>
    pathname === href(lang, slug) || pathname.startsWith(`${href(lang, slug)}/`);

  const linkClass = (active: boolean) =>
    `py-1 text-body-sm transition-colors ${
      active ? "text-content" : "text-content-dim hover:text-content"
    }`;

  const servicesActive =
    isActive("services") || serviceCategories.some((category) => isActive(category.slug));

  // Sixteen service pages will not fit in a row, so the department they belong
  // to is the menu and the pages are its contents. The hub itself is a page as
  // well, linked at the foot of the panel.
  const servicesMenu = (
    <div ref={servicesRef} className="relative">
      <button
        type="button"
        onClick={() => setServicesOpen((value) => !value)}
        aria-expanded={servicesOpen}
        aria-controls="services-menu"
        className={`flex items-center gap-2 ${linkClass(servicesActive || servicesOpen)}`}
      >
        {labels.services}
        <span
          aria-hidden="true"
          className={`text-caption transition-transform duration-200 ${
            servicesOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {servicesOpen && (
        <div
          id="services-menu"
          className="panel panel-lip absolute left-1/2 top-[calc(100%+18px)] w-[min(88vw,940px)] -translate-x-1/2 p-7"
        >
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((category) => (
              <div key={category.slug}>
                <Link
                  href={href(lang, category.slug)}
                  onClick={closeAll}
                  className="font-display text-title-sm text-content transition-colors hover:text-accent-text"
                >
                  {category.label}
                </Link>
                <ul className="mt-3 space-y-0.5">
                  {category.services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={href(lang, `${category.slug}/${service.slug}`)}
                        onClick={closeAll}
                        className="-mx-2 block rounded-lg px-2 py-1.5 text-body-sm text-content-dim transition-colors hover:bg-white/[0.05] hover:text-content"
                      >
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link
            href={href(lang, "services")}
            onClick={closeAll}
            className="mt-7 inline-flex items-center gap-2 border-t border-white/[0.08] pt-5 font-mono text-caption uppercase tracking-widest text-content-faint transition-colors hover:text-accent-text"
          >
            {labels.allServices}
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/[0.09] bg-canvas/85 backdrop-blur-xl"
          : "border-transparent bg-canvas/60 backdrop-blur"
      }`}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Link href={href(lang)} aria-label={siteName} className="shrink-0" onClick={closeAll}>
          <Logo lang={lang} />
        </Link>

        {/* Six links plus a button do not fit at 1024px, least of all set in
            Devanagari, so the bar appears at xl and the phone menu covers the
            range below it. */}
        <nav aria-label={labels.nav} className="hidden items-center gap-6 xl:flex">
          {primary.map((item) => (
            <Fragment key={item.slug}>
              <Link
                href={href(lang, item.slug)}
                aria-current={isActive(item.slug) ? "page" : undefined}
                className={linkClass(isActive(item.slug))}
              >
                {item.label}
              </Link>
              {item.slug === SERVICES_MENU_AFTER && servicesMenu}
            </Fragment>
          ))}

          {/* Contact is a link as well as the button: a page in the bar should
              be reachable the same way every other page in it is. */}
          <Link
            href={href(lang, "contact")}
            aria-current={isActive("contact") ? "page" : undefined}
            className={linkClass(isActive("contact"))}
          >
            {labels.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher
            current={lang}
            label={labels.language}
            className="hidden sm:inline-flex"
          />
          <Link
            href={href(lang, "contact")}
            className="hidden rounded-full bg-accent px-5 py-3 text-body-sm font-medium text-canvas transition-colors hover:bg-[#FF5566] md:inline-flex"
          >
            {labels.startConversation}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? labels.close : labels.menu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] text-content transition-colors hover:bg-white/[0.08] xl:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-transform ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-transform ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-white/[0.07] bg-canvas xl:hidden"
        >
          <nav aria-label={labels.nav} className="container-page flex flex-col pb-8 pt-2">
            {flat.map((item) => (
              <Link
                key={item.slug}
                href={href(lang, item.slug)}
                onClick={closeAll}
                aria-current={isActive(item.slug) ? "page" : undefined}
                className={`border-b border-white/[0.07] py-4 text-body-md transition-colors ${
                  isActive(item.slug) ? "text-accent-text" : "text-content hover:text-accent-text"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href={href(lang, "services")}
              onClick={closeAll}
              aria-current={isActive("services") ? "page" : undefined}
              className={`border-b border-white/[0.07] py-4 text-body-md transition-colors ${
                isActive("services") ? "text-accent-text" : "text-content hover:text-accent-text"
              }`}
            >
              {labels.services}
            </Link>

            {/* Every leaf page is reachable here too: a menu that hides half
                the site behind a hover is no menu on a phone. */}
            {serviceCategories.map((category) => (
              <details key={category.slug} className="border-b border-white/[0.07]">
                <summary className="cursor-pointer list-none py-4 text-body-md text-content marker:hidden [&::-webkit-details-marker]:hidden">
                  {category.label}
                </summary>
                <ul className="pb-4 pl-4">
                  <li>
                    <Link
                      href={href(lang, category.slug)}
                      onClick={closeAll}
                      className="block py-2 text-body-sm text-accent-text"
                    >
                      {labels.overview}
                    </Link>
                  </li>
                  {category.services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={href(lang, `${category.slug}/${service.slug}`)}
                        onClick={closeAll}
                        className="block py-2 text-body-sm text-content-dim"
                      >
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}

            <Link
              href={href(lang, "contact")}
              onClick={closeAll}
              aria-current={isActive("contact") ? "page" : undefined}
              className={`border-b border-white/[0.07] py-4 text-body-md transition-colors ${
                isActive("contact") ? "text-accent-text" : "text-content hover:text-accent-text"
              }`}
            >
              {labels.contact}
            </Link>

            <Link
              href={href(lang, "contact")}
              onClick={closeAll}
              className="mt-6 rounded-full bg-accent px-5 py-3.5 text-center text-body-sm font-medium text-canvas"
            >
              {labels.startConversation}
            </Link>
            <LanguageSwitcher
              current={lang}
              label={labels.language}
              className="mt-4 self-start sm:hidden"
            />
          </nav>
        </div>
      )}
    </header>
  );
}
