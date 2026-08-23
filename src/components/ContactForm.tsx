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
    "mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-body-sm text-ink outline-none transition-colors focus:border-ink";

  return (
    <form
      className="rounded-xl border border-line bg-mist p-6 md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.href = mailto;
      }}
    >
      <h2 className="font-display text-title-md text-ink">{contact.form.heading}</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-caption text-body">
          {contact.form.name}
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={field}
          />
        </label>

        <label className="block text-caption text-body">
          {contact.form.email}
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={field}
          />
        </label>
      </div>

      <label className="mt-5 block text-caption text-body">
        {contact.form.subject}
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={field}
        />
      </label>

      <label className="mt-5 block text-caption text-body">
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
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-body-sm font-medium text-paper transition-colors hover:bg-brand-dark"
      >
        {contact.form.submit}
        <span aria-hidden="true">→</span>
      </button>

      <p className="mt-4 text-caption text-body">{contact.form.hint}</p>
    </form>
  );
}
