"use client";

import React from "react";
import { Input } from "@/components/ds/Input";
import { Button } from "@/components/ds/Button";

/**
 * ContactForm — real client-side validation: required name, valid email,
 * message >= 10 chars. Errors surface on blur and on submit; a success state
 * replaces the form.
 */
type Values = { name: string; company: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

function validateContact(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "Enter a valid email address.";
  if (!v.message.trim()) e.message = "Tell us about your event.";
  else if (v.message.trim().length < 10)
    e.message = "A little more detail helps (10+ characters).";
  return e;
}

export function ContactForm({
  heading = "Let's Talk",
  defaultMessage = "",
  note = "We reply within one business day. No sales spam.",
}: {
  heading?: string;
  defaultMessage?: string;
  note?: string;
}) {
  const [vals, setVals] = React.useState<Values>({
    name: "",
    company: "",
    email: "",
    message: defaultMessage,
  });
  const [errs, setErrs] = React.useState<Errors>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof Values, boolean>>>({});
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setVals((v) => ({ ...v, message: defaultMessage }));
  }, [defaultMessage]);

  function set(k: keyof Values, val: string) {
    const nv = { ...vals, [k]: val };
    setVals(nv);
    if (touched[k]) setErrs(validateContact(nv));
  }
  function blur(k: keyof Values) {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrs(validateContact(vals));
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const er = validateContact(vals);
    setErrs(er);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(er).length > 0) return;

    setSending(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vals),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(
          (data as { error?: string }).error ??
            "Something went wrong sending your message. Please email us directly at edaraevents@gmail.com."
        );
      }
    } catch {
      setSubmitError(
        "Something went wrong sending your message. Please email us directly at edaraevents@gmail.com."
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="ek-form__success" role="status" aria-live="polite" aria-atomic="true">
        <span className="material-symbols-outlined" aria-hidden="true">mark_email_read</span>
        <h3 className="ek-form__success-t">Inquiry received.</h3>
        <p className="ek-form__success-s">
          Thanks{vals.name ? `, ${vals.name.split(" ")[0]}` : ""}. One of our event architects will
          be in touch within one business day to scope your next activation.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSent(false);
            setVals({ name: "", company: "", email: "", message: "" });
            setTouched({});
            setErrs({});
          }}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <>
      {heading ? <h3 className="ek-h3">{heading}</h3> : null}
      <form className="ek-form" onSubmit={submit} noValidate>
        <div className="ek-form__two">
          <Input
            label="Name"
            placeholder="John Doe"
            value={vals.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            error={touched.name ? errs.name : undefined}
          />
          <Input
            label="Company"
            placeholder="Tech AI Inc."
            value={vals.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>
        <Input
          label="Email"
          type="email"
          placeholder="john@company.ai"
          value={vals.email}
          onChange={(e) => set("email", e.target.value)}
          onBlur={() => blur("email")}
          error={touched.email ? errs.email : undefined}
        />
        <Input
          label="Message"
          multiline
          placeholder="Which events are you planning, and what do you need help with?"
          value={vals.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => blur("message")}
          error={touched.message ? errs.message : undefined}
        />
        <Button variant="primary" block disabled={sending}>
          {sending ? "Sending…" : "Send"}
        </Button>
        {submitError ? (
          <p className="ek-form__error" role="alert">{submitError}</p>
        ) : null}
        {note ? <p className="ek-form__note">{note}</p> : null}
      </form>
    </>
  );
}

export default ContactForm;
