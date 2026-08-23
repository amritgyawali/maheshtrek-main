"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import type { ContactPage } from "@/content/types";

/**
 * Mailto composer, not a submitting form.
 *
 * The site has no backend, and a form that silently drops messages is worse
 * than no form at all. This assembles the fields into the visitor's own mail
 * client, so the message is visibly in their outbox. Swap the submit handler
 * for a real endpoint (route handler + transactional mail provider) when one
 * exists — the markup can stay as it is.
 */
export default function ContactForm({ contact }: { contact: ContactPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const body = [message, "", `— ${name}`, email].filter(Boolean).join("\n");
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    subject || contact.form.heading
  )}&body=${encodeURIComponent(body)}`;

  const field =
    "mt-2 w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3.5 text-body-sm text-content outline-none transition-colors placeholder:text-content-faint hover:border-white/20 focus:border-accent";

  return (
    <form
      className="panel panel-lip p-6 md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.href = mailto;
      }}
    >
      <h2 className="font-display text-title-md text-content">{contact.form.heading}</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-caption text-content-faint">
          {contact.form.name}
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={field}
          />
        </label>

        <label className="block text-caption text-content-faint">
          {contact.form.email}
          <input
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            required
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={field}
          />
        </label>
      </div>

      <label className="mt-5 block text-caption text-content-faint">
        {contact.form.subject}
        <input
          type="text"
          name="subject"
          autoComplete="off"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={field}
        />
      </label>

      <label className="mt-5 block text-caption text-content-faint">
        {contact.form.message}
        <textarea
          name="message"
          rows={5}
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${field} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="mt-7 inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-body-sm font-medium text-canvas transition-all duration-300 hover:bg-[#FF5566] hover:shadow-glow-accent"
      >
        {contact.form.submit}
      </button>

      <p className="mt-4 text-caption text-content-faint">{contact.form.hint}</p>
    </form>
  );
}
