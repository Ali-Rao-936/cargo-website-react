import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { buildContactBusinessEmail, buildContactConfirmationEmail } from '../server/emailTemplates.js';
import type { ContactFormData } from '../src/lib/contactValidation.js';

const BUSINESS_EMAIL = 'info@cargopeakuae.com';
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev';
const REQUIRED_FIELDS: (keyof ContactFormData)[] = ['name', 'email', 'subject', 'message'];

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ ok: false, message: 'Email service is not configured on the server.' });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const data = req.body as ContactFormData;

  const missing = REQUIRED_FIELDS.filter((f) => !data[f]?.toString().trim());
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
      console.error('[api/contact] Business email error:', businessResult.error);
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
      console.error('[api/contact] Confirmation email error:', confirmResult.error);
    }

    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
      const { error: dbError } = await supabase.from('contacts').insert({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
      });
      if (dbError) console.error('[api/contact] Supabase insert error:', dbError.message);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('[api/contact] Unexpected error:', err);
    res.status(500).json({ ok: false, message: 'An unexpected error occurred. Please try again.' });
  }
}
