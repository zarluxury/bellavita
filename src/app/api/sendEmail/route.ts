import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { requireApiToken } from '@/lib/apiToken';

export async function POST(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const body = await request.json();
    const {
      subject, firstName, lastName, email, phone, organization,
      inquiryType, message, address, pincode, city, state, background
    } = body;

    const fullName = `${firstName} ${lastName}`;
    const brandColor = '#3b82f6'; // Bellavita Blue
    const bgColor = '#050505';

    // 1. Internal Notification Email (To Company)
    const internalHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: ${bgColor}; padding: 30px; text-align: center;">
            <h2 style="color: white; margin: 0; letter-spacing: 2px; text-transform: uppercase; font-size: 18px;">New Lead Alert</h2>
          </div>
          <div style="padding: 40px; color: #333333;">
            <h3 style="border-bottom: 2px solid ${brandColor}; padding-bottom: 10px; margin-bottom: 25px;">${subject}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #777;">Client Name:</td><td style="padding: 8px 0; font-weight: bold;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #777;">Email:</td><td style="padding: 8px 0; font-weight: bold;">${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #777;">Phone:</td><td style="padding: 8px 0; font-weight: bold;">${phone || 'N/A'}</td></tr>
              ${organization ? `<tr><td style="padding: 8px 0; color: #777;">Organization:</td><td style="padding: 8px 0; font-weight: bold;">${organization}</td></tr>` : ''}
              ${inquiryType ? `<tr><td style="padding: 8px 0; color: #777;">Inquiry Type:</td><td style="padding: 8px 0; font-weight: bold;">${inquiryType}</td></tr>` : ''}
              ${pincode ? `<tr><td style="padding: 8px 0; color: #777;">Location:</td><td style="padding: 8px 0; font-weight: bold;">${address},  ${city}, ${state} (${pincode})</td></tr>` : ''}
            </table>
            <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border-left: 4px solid ${brandColor};">
              <p style="margin: 0; font-style: italic; color: #555;">"${message || background}"</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // 2. Customer Confirmation Email (To User)
    const customerHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${bgColor}; padding: 40px 20px; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #333; border-radius: 16px; overflow: hidden; background-color: #0a0a0a;">
          <div style="padding: 40px; text-align: center;">
            <h1 style="color: ${brandColor}; margin: 0; font-size: 28px;">Bellavita</h1>
            <p style="text-transform: uppercase; letter-spacing: 4px; font-size: 10px; color: #888; margin-top: 5px;">Smart Home Solutions</p>
          </div>
          <div style="padding: 0 40px 40px 40px;">
            <h2 style="font-size: 22px; font-weight: 400;">Hello ${firstName},</h2>
            <p style="color: #aaaaaa; line-height: 1.8; font-size: 16px;">
              Thank you for reaching out to us regarding <strong>${subject.toLowerCase()}</strong>. 
              We've received your details and our automation experts are already reviewing your request.
            </p>
            <div style="background: #111; border: 1px solid #222; padding: 20px; border-radius: 12px; margin: 30px 0;">
              <p style="margin: 0; color: #fff; font-size: 14px;"><strong>Next Step:</strong> Our team will contact you within 24 hours to discuss how we can transform your space.</p>
            </div>
            <p style="color: #aaaaaa; line-height: 1.8; font-size: 15px;">
              In the meantime, feel free to explore our latest smart lighting and security solutions on our website.
            </p>
            <div style="margin-top: 40px;">
              <a href="https://bellavita.com" style="background-color: ${brandColor}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Explore Solutions</a>
            </div>
          </div>
          <div style="background-color: #111; padding: 30px; text-align: center; border-top: 1px solid #222;">
            <p style="margin: 0; font-size: 12px; color: #666;">&copy; 2026 Bellavita Smart Homes. Mumbai, India.</p>
          </div>
        </div>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send to Company
    await transporter.sendMail({
      from: `Bellavita Web <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL || 'info@bellavita.com',
      subject: `[NEW LEAD] ${subject} - ${fullName}`,
      html: internalHtml,
    });

    // Send to Customer
    await transporter.sendMail({
      from: `Bellavita Smart Homes <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We've received your ${subject.toLowerCase()} inquiry`,
      html: customerHtml,
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}