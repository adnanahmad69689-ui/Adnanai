/** Contact section: compact enquiry form and direct email contact. */
import { FormEvent, KeyboardEvent, useId, useState } from "react";
import { Mail } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { supabaseUrl } from "../lib/supabase";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FormValues = { name: string; email: string; subject: string; service: string; details: string; website: string };

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  service: "",
  details: "",
  website: "",
};

const serviceOptions = ["Website Development", "AI Automation", "AI Agents", "Other"] as const;

export function Contact() {
  const { contact } = siteConfig;
  const formId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleServiceKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      setIsServiceMenuOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsServiceMenuOpen(true);
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!values.name.trim() || !values.email.trim() || !values.subject.trim() || !values.service || !values.details.trim()) {
      setStatus("error");
      setError("Please complete every field before sending your enquiry.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/contact-submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          service: values.service,
          message: values.details,
          website: values.website,
        }),
      });
      const body = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !body?.ok) throw new Error(body?.error || "Unable to send your enquiry.");
      setStatus("success");
      setValues(initialValues);
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send your enquiry.");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-card reveal-item">
          <div className="contact-left">
            <span className="section-label">Contact</span>
            <h2 className="contact-heading">
              {contact.headingLead} <em>{contact.headingEm}</em>
            </h2>
            <p className="contact-subtext">{contact.subtext}</p>
            <div className="contact-email-stack">
              <p className="contact-enquiry-copy">For project enquiries, send me an email.</p>
              <a className="contact-direct-email" href={`mailto:${contact.email}`}>
                <Mail className="contact-email-icon" aria-hidden="true" strokeWidth={1.8} />
                <span>{contact.email}</span>
              </a>
            </div>
          </div>
          <form className="contact-form reveal-item" onSubmit={submit} noValidate autoComplete="off" aria-describedby={`${formId}-status`}>
            <div className="contact-form-grid">
              <label className="contact-field" htmlFor={`${formId}-name`}>
                <span>Name</span>
                <input id={`${formId}-name`} name="name" type="text" autoComplete="off" placeholder="Your name" value={values.name} onChange={(event) => update("name", event.target.value)} required />
              </label>
              <label className="contact-field" htmlFor={`${formId}-email`}>
                <span>Email</span>
                <input id={`${formId}-email`} name="email" type="email" autoComplete="off" placeholder="Your email" value={values.email} onChange={(event) => update("email", event.target.value)} required />
              </label>
            </div>
            <label className="contact-field" htmlFor={`${formId}-subject`}>
              <span>Subject</span>
              <input id={`${formId}-subject`} name="subject" type="text" autoComplete="off" placeholder="What is your enquiry about?" value={values.subject} onChange={(event) => update("subject", event.target.value)} required />
            </label>
            <div
              className="contact-field"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsServiceMenuOpen(false);
              }}
            >
              <span id={`${formId}-service-label`}>Service</span>
              <div className={`contact-service-picker${isServiceMenuOpen ? " is-open" : ""}`}>
                <input type="hidden" name="service" value={values.service} />
                <button
                  id={`${formId}-service`}
                  className="contact-service-trigger"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isServiceMenuOpen}
                  aria-controls={`${formId}-service-options`}
                  aria-labelledby={`${formId}-service-label ${formId}-service-value`}
                  onClick={() => setIsServiceMenuOpen((open) => !open)}
                  onKeyDown={handleServiceKeyDown}
                >
                  <span id={`${formId}-service-value`} className={values.service ? "" : "is-placeholder"}>{values.service || "Select a service"}</span>
                  <span className="contact-service-chevron" aria-hidden="true">⌄</span>
                </button>
                {isServiceMenuOpen ? (
                  <div id={`${formId}-service-options`} className="contact-service-options" role="listbox" aria-label="Service">
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        role="option"
                        aria-selected={values.service === service}
                        className={values.service === service ? "is-selected" : ""}
                        onClick={() => {
                          update("service", service);
                          setIsServiceMenuOpen(false);
                        }}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <label className="contact-field" htmlFor={`${formId}-details`}>
              <span>Project details</span>
              <textarea id={`${formId}-details`} name="details" autoComplete="off" rows={4} placeholder="Tell me what you need" value={values.details} onChange={(event) => update("details", event.target.value)} required />
            </label>
            <label className="contact-honeypot" htmlFor={`${formId}-website`} aria-hidden="true">
              Website
              <input id={`${formId}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} />
            </label>
            <button className="contact-submit" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send enquiry"}
            </button>
            <div id={`${formId}-status`} className={`contact-form-status ${status}`} aria-live="polite">
              {status === "success" ? "Thanks for getting in touch. I’ll get back to you soon." : null}
              {status === "error" ? error : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
