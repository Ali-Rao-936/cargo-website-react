import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { buildBusinessEmail, buildConfirmationEmail } from '../server/emailTemplates.js';
import type { QuoteFormData } from '../src/lib/quoteValidation.js';

const BUSINESS_EMAIL = 'info@cargopeakuae.com';
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev';
const REQUIRED_FIELDS: (keyof QuoteFormData)[] = [
  'name', 'email', 'phone', 'pickup', 'destination', 'serviceType', 'weight',
];

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
  const data = req.body as QuoteFormData;

  const missing = REQUIRED_FIELDS.filter((f) => !data[f]?.toString().trim());
  if (missing.length > 0) {
    res.status(400).json({ ok: false, message: 'Invalid request data.' });
    return;
  }

  try {
    const business = buildBusinessEmail(data);
    const confirmation = buildConfirmationEmail(data);

    const businessResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      subject: business.subject,
      html: business.html,
    });

    if (businessResult.error) {
      console.error('[api] Business email error:', businessResult.error);
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
      console.error('[api] Confirmation email error:', confirmResult.error);
    }

    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
      const { error: dbError } = await supabase.from('quotes').insert({
        name: data.name.trim(),
        company: data.company?.trim() || null,
        email: data.email.trim(),
        phone: data.phone.trim(),
        pickup: data.pickup.trim(),
        destination: data.destination.trim(),
        service_type: data.serviceType,
        weight: Number(data.weight),
        additional_info: data.message?.trim() || null,
      });
      if (dbError) console.error('[api] Supabase insert error:', dbError.message);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('[api] Unexpected error:', err);
    res.status(500).json({ ok: false, message: 'An unexpected error occurred. Please try again.' });
  }
}
