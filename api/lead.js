// POST /api/lead — emails a quote request to the business inbox.
// Env: SMTP_HOST, SMTP_PORT, SMTP_SECURE ('true' for 465), SMTP_USER, SMTP_PASS
// Optional: LEAD_TO_EMAIL (defaults to jrgruntwerks@gmail.com)

const nodemailer = require('nodemailer');

const FALLBACK = 'Please call or text 320-815-0900.';
const LEAD_TO = process.env.LEAD_TO_EMAIL || 'jrgruntwerks@gmail.com';

const SERVICES = {
  'water-heater-repair': 'Water heater',
  'leak-repair': 'Leak repair',
  'fixture-installation': 'Fixture install',
  'bathroom-remodel': 'Small remodel',
  other: 'Something else',
};

const esc = (s) => String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clip = (s, n) => String(s || '').trim().slice(0, n);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  // Honeypot: bots fill hidden fields. Pretend it worked.
  if (body.company) return res.status(200).json({ success: true });

  const lead = {
    name: clip(body.name, 100),
    phone: clip(body.phone, 30),
    email: clip(body.email, 150),
    city: clip(body.city, 80),
    service: SERVICES[body.service] || 'Not specified',
    message: clip(body.message, 2000),
    page: clip(body.page, 60),
  };

  if (!lead.name || lead.phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ error: 'Please include your name and a 10-digit phone number.' });
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return res.status(400).json({ error: 'That email address does not look right.' });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Lead form: SMTP env vars are not configured', lead);
    return res.status(503).json({ error: `Our online form is down right now. ${FALLBACK}` });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const rows = [
    ['Name', esc(lead.name)],
    ['Phone', `<a href="tel:${esc(lead.phone)}">${esc(lead.phone)}</a>`],
    ['Email', lead.email ? `<a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a>` : '—'],
    ['Town', esc(lead.city) || '—'],
    ['Service', esc(lead.service)],
    ['Page', esc(lead.page) || '—'],
    ['Details', esc(lead.message).replace(/\n/g, '<br>') || '—'],
  ];

  try {
    await transporter.sendMail({
      from: `Grunt Werks Website <${process.env.SMTP_USER}>`,
      to: LEAD_TO,
      replyTo: lead.email || undefined,
      subject: `New lead: ${lead.service} — ${lead.name}${lead.city ? ` (${lead.city})` : ''}`,
      text: rows.map(([k, v]) => `${k}: ${v.replace(/<[^>]+>/g, '')}`).join('\n'),
      html: `<div style="font-family:Arial,sans-serif;max-width:520px">
        <div style="background:#1f2a1f;color:#fff;padding:16px 20px;border-bottom:4px solid #d9601f">
          <strong style="font-size:18px">New website lead</strong></div>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          ${rows.map(([k, v]) => `<tr><td style="padding:8px 12px;color:#777;width:90px;vertical-align:top">${k}</td><td style="padding:8px 12px">${v}</td></tr>`).join('')}
        </table></div>`,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Lead email failed:', err.message, lead);
    return res.status(500).json({ error: `Something went wrong sending your request. ${FALLBACK}` });
  }
};
