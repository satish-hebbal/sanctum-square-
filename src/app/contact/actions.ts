"use server";

import { studio } from "@/content/studio";

export type EnquiryState = {
  status: "idle" | "sent" | "error";
  message?: string;
  /** Field name -> problem, keyed to the inputs so errors render in place. */
  errors?: Record<string, string>;
};

const REQUIRED = ["name", "email", "message"] as const;

/**
 * Delivery is deliberately provider-agnostic. Set one of:
 *
 *   ENQUIRY_WEBHOOK_URL                  POSTs the enquiry as JSON
 *                                        (Zapier, Make, n8n, a CRM endpoint)
 *   RESEND_API_KEY + ENQUIRY_FROM_EMAIL  sends the enquiry as an email
 *
 * With neither set the form refuses to pretend it worked — it says the site is
 * not connected yet and points the visitor at the studio's email address,
 * which is on the page beside it.
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Bots fill hidden fields; people do not.
  if (formData.get("company")) {
    return { status: "sent" };
  }

  const value = (key: string) => String(formData.get(key) ?? "").trim();

  const enquiry = {
    name: value("name"),
    email: value("email"),
    phone: value("phone"),
    projectType: value("projectType"),
    location: value("location"),
    budget: value("budget"),
    message: value("message"),
  };

  const errors: Record<string, string> = {};
  for (const field of REQUIRED) {
    if (!enquiry[field]) errors[field] = "Required";
  }
  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    errors.email = "Enter a valid email address";
  }

  if (Object.keys(errors).length) {
    return { status: "error", message: "Check the highlighted fields.", errors };
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL ?? studio.contact.email;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...enquiry,
          receivedAt: new Date().toISOString(),
          source: "sanctumsquare.com/contact",
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return { status: "sent" };
    }

    if (resendKey && from) {
      const lines = [
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        enquiry.phone && `Phone: ${enquiry.phone}`,
        enquiry.projectType && `Project type: ${enquiry.projectType}`,
        enquiry.location && `Location: ${enquiry.location}`,
        enquiry.budget && `Budget: ${enquiry.budget}`,
        "",
        enquiry.message,
      ].filter(Boolean);

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: enquiry.email,
          subject: `Enquiry — ${enquiry.name}`,
          text: lines.join("\n"),
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
      return { status: "sent" };
    }

    return {
      status: "error",
      message: `This form is not connected to an inbox yet. Please email ${studio.contact.email} in the meantime.`,
    };
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return {
      status: "error",
      message: `Something went wrong sending your enquiry. Please email ${studio.contact.email} instead.`,
    };
  }
}
