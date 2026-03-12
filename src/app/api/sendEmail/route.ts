import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      subject,
      firstName,
      lastName,
      email,
      phone,
      organization,
      inquiryType,
      message,
      address,
      pincode,
      city,
      state,
      hasInvestment,
      background
    } = body;

    // Create email content based on form type
    let emailContent = '';
    
    if (subject === 'Franchise Inquiry') {
      emailContent = `
        <h2>Franchise Inquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${state} - ${pincode}</p>
        <p><strong>Has Investment:</strong> ${hasInvestment}</p>
        <p><strong>Background:</strong></p>
        <p>${background}</p>
      `;
    } else {
      emailContent = `
        <h2>Contact Inquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `;
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email to company
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL || 'info@bellavita.com',
      subject: `New ${subject} from ${firstName} ${lastName}`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to customer
    const confirmationMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `Thank you for your ${subject.toLowerCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Bellavita Smart Homes</h1>
            <p style="color: white; margin: 10px 0 0 0;">Thank you for contacting us</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-top: 0;">Dear ${firstName} ${lastName},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Thank you for your interest in Bellavita Smart Homes. We have received your ${subject.toLowerCase()} 
              and our team will get back to you within 24-48 hours.
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              If you have any urgent questions, please feel free to call us at +91 22 1234 5678 
              or email us at info@bellavita.com.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://bellavita.com" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                Visit Our Website
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              The Bellavita Team
            </p>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0;">&copy; 2024 Bellavita Smart Homes. All rights reserved.</p>
            <p style="margin: 10px 0 0 0; font-size: 12px;">
              8/62 Sahyog Society, Old Anand Nagar, Santacruz East, Mumbai 400055
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
