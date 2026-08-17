import { NextRequest, NextResponse } from 'next/server';
import { requireApiToken } from '@/lib/apiToken';

export async function POST(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const body = await request.json();
    const { name, email, phone, preferredDate, message, to, subject } = body;

    // Validate required fields
    if (!name || !email || !phone || !preferredDate || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
      New Consultation Request - Bellavita Smart Home
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Preferred Date: ${preferredDate}
      
      Message:
      ${message}
      
      ---
      Sent from: ${new Date().toLocaleString()}
    `;

    // Here you would typically integrate with an email service like:
    // - Resend, SendGrid, Nodemailer, or AWS SES
    // For now, we'll log the data and return success
    
    console.log('Consultation Request:', {
      to,
      subject,
      content: emailContent
    });

    // Example integration with Resend (uncomment and configure):
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'noreply@bellavita.com',
      to: to,
      subject: subject,
      text: emailContent,
    });
    */

    // For development, you could also send to a service like Formspree or Web3Forms
    // Or use a simple SMTP service

    return NextResponse.json(
      { success: true, message: 'Consultation request submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Consultation form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit consultation request' },
      { status: 500 }
    );
  }
}
