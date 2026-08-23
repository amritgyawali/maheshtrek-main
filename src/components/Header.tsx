"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { href, type Locale } from "@/lib/i18n";

export interface HeaderNavItem {
  slug: string;
  label: string;
  primary: boolean;
}

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
  };
  items: HeaderNavItem[];
}

export default function Header({ lang, siteName, labels, items }: HeaderProps) {
  const pathname = usePathname() || href(lang);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const primary = items.filter((item) => item.primary);

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

  // Closing on click rather than on pathname change keeps the panel out of
  // effect-driven state updates.
  const closeMenu = () => setOpen(false);

  const isActive = (slug: string) =>
    pathname === href(lang, slug) || pathname.startsWith(`${href(lang, slug)}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/95 backdrop-blur transition-shadow ${
        scrolled ? "border-line shadow-card" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link href={href(lang)} aria-label={siteName} className="shrink-0">
          <Logo lang={lang} />
        </Link>

        <nav aria-label={labels.nav} className="hidden items-center gap-1 lg:flex">
          {primary.map((item) => (
            <Link
              key={item.slug}
              href={href(lang, item.slug)}
              aria-current={isActive(item.slug) ? "page" : undefined}
              className={`rounded px-3 py-2 text-body-sm transition-colors ${
                isActive(item.slug) ? "text-brand" : "text-body hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher current={lang} label={labels.language} className="hidden sm:inline-flex" />
          <Link
            href={href(lang, "contact")}
            className="hidden rounded-full bg-ink px-5 py-2.5 text-body-sm font-medium text-paper transition-colors hover:bg-brand md:inline-flex"
          >
            {labels.contact}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? labels.close : labels.menu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
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
        <div id="mobile-nav" className="border-t border-line bg-paper lg:hidden">
          <nav aria-label={labels.nav} className="container-page flex flex-col py-4">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={href(lang, item.slug)}
                onClick={closeMenu}
                aria-current={isActive(item.slug) ? "page" : undefined}
                className={`border-b border-line py-3.5 text-body-md ${
                  isActive(item.slug) ? "text-brand" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={href(lang, "contact")}
              onClick={closeMenu}
              className="mt-5 rounded-full bg-ink px-5 py-3 text-center text-body-sm font-medium text-paper"
            >
              {labels.contact}
            </Link>
            <LanguageSwitcher current={lang} label={labels.language} className="mt-4 self-start sm:hidden" />
          </nav>
        </div>
      )}
    </header>
  );
}
