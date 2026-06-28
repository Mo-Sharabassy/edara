export const runtime = "nodejs";

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// TODO (production): verify your domain in Resend and change `from` to
// "Edara Contact <contact@edaraevents.com>" (or whichever address you configure).
// The onboarding@resend.dev sender works immediately for testing but delivers
// from Resend's shared domain, not yours.
const FROM = "Edara Contact <onboarding@resend.dev>";
const TO = "edaraevents@gmail.com";

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export async function POST(req: NextRequest) {
  let body: { name?: unknown; company?: unknown; email?: unknown; message?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!email || !isValidEmail(email))
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  if (message.length < 10)
    return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });

  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject = `New inquiry from ${name}${company ? ` (${company})` : ""}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>${subject}</title></head>
<body style="font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#1a1a1a;margin:0;padding:0;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="background:#0a0a0a;padding:24px 32px;">
            <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.02em;">Edara</span>
            <span style="color:#888;font-size:12px;margin-left:12px;text-transform:uppercase;letter-spacing:0.08em;">Events as a Service</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 24px;font-size:18px;font-weight:600;color:#0a0a0a;">New contact inquiry</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eee;width:120px;color:#666;font-size:13px;vertical-align:top;">Name</td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #eee;font-size:14px;font-weight:500;vertical-align:top;">${name}</td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;vertical-align:top;">Company</td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #eee;font-size:14px;font-weight:500;vertical-align:top;">${company}</td>
              </tr>` : ""}
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;vertical-align:top;">Email</td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #eee;font-size:14px;vertical-align:top;"><a href="mailto:${email}" style="color:#0a0a0a;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:16px 0 0;color:#666;font-size:13px;vertical-align:top;">Message</td>
                <td style="padding:16px 0 0 16px;font-size:14px;line-height:1.6;vertical-align:top;white-space:pre-wrap;">${message}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;background:#f9f9f9;border-top:1px solid #eee;">
            <p style="margin:0;font-size:12px;color:#999;">Reply directly to this email to reach ${name}.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact/route] Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
