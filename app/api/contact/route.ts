import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 * TODO: send the enquiry by e-mail (e.g. Resend, Nodemailer) or store it in a CRM.
 */
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data?.name || !data?.email) {
    return NextResponse.json({ ok: false, error: 'Name und E-Mail sind erforderlich.' }, { status: 400 });
  }
  console.log('[Kontaktanfrage]', data);
  return NextResponse.json({ ok: true });
}
