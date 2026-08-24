/** Contact section: compact enquiry form and direct email contact. */
import { FormEvent, useId, useState } from "react";
import { siteConfig } from "../data/siteConfig";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FormValues = { name: string; email: string; service: string; details: string; website: string };

const initialValues: FormValues = {
  name: "",
  email: "",
  service: "",
  details: "",
  website: "",
};

export function Contact() {
  const { contact } = siteConfig;
  const formId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!values.name.trim() || !values.email.trim() || !values.service || !values.details.trim()) {
      setStatus("error");
      setError("Please complete every field before sending your enquiry.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !body?.ok) throw new Error(body?.message || "Unable to send your enquiry.");
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
            <a className="contact-direct-email" href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <form className="contact-form reveal-item" onSubmit={submit} noValidate aria-describedby={`${formId}-status`}>
            <div className="contact-form-grid">
              <label className="contact-field" htmlFor={`${formId}-name`}>
                <span>Name</span>
                <input id={`${formId}-name`} name="name" type="text" autoComplete="name" placeholder="Your name" value={values.name} onChange={(event) => update("name", event.target.value)} required />
              </label>
              <label className="contact-field" htmlFor={`${formId}-email`}>
                <span>Email</span>
                <input id={`${formId}-email`} name="email" type="email" autoComplete="email" placeholder="Your email" value={values.email} onChange={(event) => update("email", event.target.value)} required />
              </label>
            </div>
            <label className="contact-field" htmlFor={`${formId}-service`}>
              <span>Service</span>
              <select id={`${formId}-service`} name="service" value={values.service} onChange={(event) => update("service", event.target.value)} required>
                <option value="" disabled>Select a service</option>
                <option value="Website Development">Website Development</option>
                <option value="AI Automation">AI Automation</option>
                <option value="AI Agents">AI Agents</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="contact-field" htmlFor={`${formId}-details`}>
              <span>Project details</span>
              <textarea id={`${formId}-details`} name="details" rows={4} placeholder="Tell me what you need" value={values.details} onChange={(event) => update("details", event.target.value)} required />
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
