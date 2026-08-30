"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { submitEnquiry, type EnquiryState } from "@/app/contact/actions";
import { LogoLoader } from "@/components/ui/LogoLoader";
import { Button } from "@/components/ui/primitives";
import { budgetRanges, projectTypes, studio } from "@/content/studio";
import { cx } from "@/lib/cx";

const INITIAL: EnquiryState = { status: "idle" };

/** Inputs are hairline-underlined rather than boxed, per the design system. */
const FIELD =
  "w-full border-b border-hairline bg-transparent text-body outline-none transition-colors duration-300 focus:border-ink";

/**
 * A select is intrinsically taller than a text input, which leaves the two
 * rules in a row sitting at different heights. Pinning both to one height puts
 * the hairlines back on the same line.
 */
const CONTROL = `${FIELD} h-12`;

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <p className="flex flex-col">
      <label htmlFor={name} className="text-eyebrow text-graphite uppercase">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cx(CONTROL, error && "border-ink")}
      />
      {error ? (
        <span id={`${name}-error`} className="text-caption mt-2 text-ink">
          {error}
        </span>
      ) : null}
    </p>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: readonly string[];
}) {
  return (
    <p className="flex flex-col">
      <label htmlFor={name} className="text-eyebrow text-graphite uppercase">
        {label}
      </label>
      <select id={name} name={name} defaultValue="" className={cx(CONTROL, "-ml-1 pl-1")}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </p>
  );
}

/**
 * Sending is the one genuine wait on the site — a webhook or an email API
 * round trip — so it is the one place a loader belongs. The button dims less
 * than a plain disabled control would: it is busy, not unavailable, and the
 * mark has to stay readable on the ink while it works.
 */
function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="gap-3 disabled:opacity-70">
      {pending ? (
        <>
          {/* Decorative: the label beside it already announces the state, and
              a labelled status here would join the button’s accessible name. */}
          <LogoLoader size="sm" tone="paper" label={null} />
          Sending
        </>
      ) : (
        "Send enquiry"
      )}
    </Button>
  );
}

export function EnquiryForm() {
  const [state, action] = useActionState(submitEnquiry, INITIAL);

  if (state.status === "sent") {
    return (
      <div role="status" className="border-t border-hairline pt-8">
        <p className="text-section">Thank you — your enquiry has been sent.</p>
        <p className="text-body mt-3 max-w-md text-graphite">
          Someone from the studio will be in touch. For anything urgent, call{" "}
          <a href={`tel:${studio.contact.phoneHref}`} className="text-ink">
            {studio.contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate>
      <div className="grid gap-x-(--spacing-col-gap) gap-y-10 sm:grid-cols-2">
        <Field
          name="name"
          label="Name"
          required
          autoComplete="name"
          error={state.errors?.name}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          error={state.errors?.email}
        />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
        <Select name="projectType" label="Project type" options={projectTypes} />
        <Field name="location" label="Location" />
        <Select name="budget" label="Budget range" options={budgetRanges} />

        <p className="flex flex-col sm:col-span-2">
          <label
            htmlFor="message"
            className="text-eyebrow text-graphite uppercase"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            aria-invalid={state.errors?.message ? true : undefined}
            aria-describedby={
              state.errors?.message ? "message-error" : undefined
            }
            className={cx(FIELD, "resize-y pt-3 pb-3", state.errors?.message && "border-ink")}
          />
          {state.errors?.message ? (
            <span id="message-error" className="text-caption mt-2 text-ink">
              {state.errors.message}
            </span>
          ) : null}
        </p>
      </div>

      {/* Honeypot. Positioned off-screen rather than hidden so bots still see it. */}
      <p className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </p>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-body mt-10 max-w-md">
          {state.message}
        </p>
      ) : null}

      <div className="mt-12">
        <Submit />
      </div>
    </form>
  );
}
