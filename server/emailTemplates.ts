import type { QuoteFormData } from "../src/lib/quoteValidation.js";
import type { ContactFormData } from "../src/lib/contactValidation.js";

const SERVICE_LABELS: Record<string, string> = {
  air: "Air Freight",
  sea: "Sea Freight",
  land: "Land Transport",
  door: "Door-to-Door Delivery",
};

function serviceLabel(type: string): string {
  return SERVICE_LABELS[type] ?? type;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:6px 12px 6px 0;color:#64748b;font-size:14px;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;color:#1e293b;font-size:14px;vertical-align:top;">${value || "<em style='color:#94a3b8'>Not provided</em>"}</td>
    </tr>`;
}

function sectionHeader(title: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:20px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#f97316;border-bottom:1px solid #e2e8f0;">
        ${title}
      </td>
    </tr>`;
}

const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:#1e3a8a;padding:28px 36px;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">CargoPeak</p>
            <p style="margin:4px 0 0;font-size:13px;color:#93c5fd;">Global Logistics Solutions</p>
          </td>
        </tr>
        <tr>
          <td style="padding:36px;">
            ${content}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} CargoPeak. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

export function buildBusinessEmail(data: QuoteFormData): { subject: string; html: string } {
  const subject = `New Quote Request from ${data.name}`;
  const timestamp = new Date().toUTCString();

  const html = emailWrapper(`
    <h2 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#1e3a8a;">New Quote Request</h2>
    <p style="margin:0 0 24px;font-size:13px;color:#64748b;">Submitted: ${timestamp}</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      ${sectionHeader("Contact Details")}
      ${row("Name", data.name)}
      ${row("Company", data.company)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#1e3a8a;">${data.email}</a>`)}
      ${row("Phone", data.phone)}
      ${sectionHeader("Route")}
      ${row("Pickup", data.pickup)}
      ${row("Destination", data.destination)}
      ${sectionHeader("Shipment Details")}
      ${row("Service", serviceLabel(data.serviceType))}
      ${row("Weight", data.weight ? `${data.weight} kg` : "")}
      ${row("Notes", data.message)}
    </table>
  `);

  return { subject, html };
}

export function buildContactBusinessEmail(data: ContactFormData): { subject: string; html: string } {
  const subject = `New Contact Message from ${data.name}`;
  const timestamp = new Date().toUTCString();

  const html = emailWrapper(`
    <h2 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#1e3a8a;">New Contact Message</h2>
    <p style="margin:0 0 24px;font-size:13px;color:#64748b;">Submitted: ${timestamp}</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      ${sectionHeader("Contact Details")}
      ${row("Name", data.name)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#1e3a8a;">${data.email}</a>`)}
      ${sectionHeader("Message")}
      ${row("Subject", data.subject)}
      ${row("Message", data.message)}
    </table>
  `);

  return { subject, html };
}

export function buildContactConfirmationEmail(data: ContactFormData): { subject: string; html: string } {
  const subject = "We received your message — CargoPeak";

  const html = emailWrapper(`
    <p style="margin:0 0 20px;font-size:16px;color:#1e293b;">Hi ${data.name},</p>
    <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px;">
      <p style="margin:0;font-size:18px;font-weight:600;color:#166534;">We received your message.</p>
      <p style="margin:6px 0 0;font-size:16px;color:#166534;">Our team will contact you soon.</p>
    </div>
    <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.6;">
      Your message has been received and one of our team members will get back to you within <strong>24 hours</strong>.
    </p>
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      ${sectionHeader("Your Message Summary")}
      ${row("Subject", data.subject)}
    </table>
    <p style="margin:28px 0 0;font-size:14px;color:#475569;">— The CargoPeak Team</p>
  `);

  return { subject, html };
}

export function buildConfirmationEmail(data: QuoteFormData): { subject: string; html: string } {
  const subject = "We received your request — CargoPeak";

  const html = emailWrapper(`
    <p style="margin:0 0 20px;font-size:16px;color:#1e293b;">Hi ${data.name},</p>
    <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px;">
      <p style="margin:0;font-size:18px;font-weight:600;color:#166534;">We received your request.</p>
      <p style="margin:6px 0 0;font-size:16px;color:#166534;">Our Team will contact you soon.</p>
    </div>
    <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.6;">
      Your quote request has been logged and one of our logistics experts will review your shipment details and follow up within <strong>24 hours</strong>.
    </p>
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      ${sectionHeader("Your Request Summary")}
      ${row("Route", `${data.pickup} → ${data.destination}`)}
      ${row("Service", serviceLabel(data.serviceType))}
      ${row("Weight", data.weight ? `${data.weight} kg` : "")}
    </table>
    <p style="margin:28px 0 0;font-size:14px;color:#475569;">— The CargoPeak Team</p>
  `);

  return { subject, html };
}
