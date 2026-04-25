import 'dotenv/config';
import express from 'express';
import { Resend } from 'resend';
import { buildBusinessEmail, buildConfirmationEmail, buildContactBusinessEmail, buildContactConfirmationEmail } from './emailTemplates.js';
import type { QuoteFormData } from '../src/lib/quoteValidation.js';
import type { ContactFormData } from '../src/lib/contactValidation.js';

const app = express();
app.use(express.json());

const BUSINESS_EMAIL = 'info@cargopeakuae.com';
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev';
const REQUIRED_FIELDS: (keyof QuoteFormData)[] = [
  'name', 'email', 'phone', 'pickup', 'destination', 'serviceType', 'weight',
];

if (!process.env.RESEND_API_KEY) {
  console.warn('[server] Warning: RESEND_API_KEY is not set. Email sending will fail.');
}

app.post('/api/quote', async (req, res) => {
  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ ok: false, message: 'Email service is not configured on the server.' });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const data = req.body as QuoteFormData;

  const missing = REQUIRED_FIELDS.filter((f) => !data[f]?.toString().trim());
  if (missing.length > 0) {
    res.status(400).json({ ok: false, message: 'Invalid request data.' });
    return;
  }

  try {
    const business = buildBusinessEmail(data);
    const confirmation = buildConfirmationEmail(data);

    // Business notification is critical — fail the request if this one errors.
    const businessResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      subject: business.subject,
      html: business.html,
    });

    if (businessResult.error) {
      console.error('[server] Business email error:', businessResult.error);
      res.status(502).json({
        ok: false,
        message: 'Failed to send email. Please try again or contact us directly.',
      });
      return;
    }

    // User confirmation — best-effort. Log failures but don't block the success response.
    const confirmResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email.trim(),
      subject: confirmation.subject,
      html: confirmation.html,
    });

    if (confirmResult.error) {
      console.error('[server] Confirmation email error:', confirmResult.error);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('[server] Unexpected error:', err);
    res.status(500).json({ ok: false, message: 'An unexpected error occurred. Please try again.' });
  }
});

app.post('/api/contact', async (req, res) => {
  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ ok: false, message: 'Email service is not configured on the server.' });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const data = req.body as ContactFormData;
  const contactRequiredFields: (keyof ContactFormData)[] = ['name', 'email', 'subject', 'message'];

  const missing = contactRequiredFields.filter((f) => !data[f]?.toString().trim());
  if (missing.length > 0) {
    res.status(400).json({ ok: false, message: 'Invalid request data.' });
    return;
  }

  try {
    const business = buildContactBusinessEmail(data);
    const confirmation = buildContactConfirmationEmail(data);

    const businessResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      subject: business.subject,
      html: business.html,
    });

    if (businessResult.error) {
      console.error('[server/contact] Business email error:', businessResult.error);
      res.status(502).json({
        ok: false,
        message: 'Failed to send email. Please try again or contact us directly.',
      });
      return;
    }

    const confirmResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email.trim(),
      subject: confirmation.subject,
      html: confirmation.html,
    });

    if (confirmResult.error) {
      console.error('[server/contact] Confirmation email error:', confirmResult.error);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('[server/contact] Unexpected error:', err);
    res.status(500).json({ ok: false, message: 'An unexpected error occurred. Please try again.' });
  }
});

const port = 3001;
const server = app.listen(port, () => {
  console.log(`[server] Running on http://localhost:${port}`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[server] Port ${port} is already in use.`);
  } else {
    console.error('[server] Error:', err);
  }
  process.exit(1);
});
