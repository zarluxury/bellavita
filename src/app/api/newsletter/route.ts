import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { requireApiToken } from '@/lib/apiToken';

interface NewsletterSubscription {
  email: string;
  timestamp: Date;
  ip?: string;
  userAgent?: string;
}

export async function POST(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get client info for analytics
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const subscription: NewsletterSubscription = {
      email: email.toLowerCase().trim(),
      timestamp: new Date(),
      ip,
      userAgent
    };

    // Option 1: Store in PostgreSQL
    try {
      await pool.query(
        'INSERT INTO newsletter_subscriptions (email, timestamp, ip, user_agent) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
        [subscription.email, subscription.timestamp, subscription.ip, subscription.userAgent]
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with fallback if database fails
    }

    // Option 2: Store in a JSON file (fallback)
    try {
      const fs = require('fs').promises;
      const path = require('path');
      
      const filePath = path.join(process.cwd(), 'data', 'newsletter-subscriptions.json');
      
      // Ensure data directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      
      // Read existing subscriptions
      let subscriptions: NewsletterSubscription[] = [];
      try {
        const data = await fs.readFile(filePath, 'utf-8');
        subscriptions = JSON.parse(data);
      } catch (error) {
        // File doesn't exist or is empty, start with empty array
        subscriptions = [];
      }
      
      // Check if email already exists
      const exists = subscriptions.some(sub => sub.email === subscription.email);
      if (exists) {
        return NextResponse.json(
          { success: false, error: 'Email already subscribed' },
          { status: 409 }
        );
      }
      
      // Add new subscription
      subscriptions.push(subscription);
      
      // Save back to file
      await fs.writeFile(filePath, JSON.stringify(subscriptions, null, 2));
      
    } catch (fileError) {
      console.error('File storage error:', fileError);
      // Continue with console.log as final fallback
    }

    // Option 3: Send to external service (like Mailchimp, ConvertKit, etc.)
    // Uncomment and configure if you use an external service
    // try {
    //   const response = await fetch('https://api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email_address: email,
    //       status: 'subscribed',
    //     }),
    //   });
    //   
    //   if (!response.ok) {
    //     const error = await response.json();
    //     console.error('Mailchimp error:', error);
    //   }
    // } catch (serviceError) {
    //   console.error('External service error:', serviceError);
    // }

    // Log the subscription (for development/monitoring)
    console.log('Newsletter subscription:', {
      email: subscription.email,
      timestamp: subscription.timestamp,
      ip: subscription.ip,
      userAgent: subscription.userAgent
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// GET endpoint to retrieve subscriptions (admin only)
export async function GET(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    // Skip authentication for development - remove in production
    if (process.env.NODE_ENV === 'development') {
      // In development, just return the data without authentication
      try {
        const result = await pool.query(
          'SELECT * FROM newsletter_subscriptions ORDER BY timestamp DESC'
        );
        
        return NextResponse.json({
          success: true,
          data: result.rows,
          count: result.rows.length,
          source: 'database'
        });
      } catch (dbError) {
        console.error('Database query error:', dbError);
        
        // Fallback to JSON file
        const fs = require('fs').promises;
        const path = require('path');
        const filePath = path.join(process.cwd(), 'data', 'newsletter-subscriptions.json');

        let subscriptions: NewsletterSubscription[] = [];
        try {
          const data = await fs.readFile(filePath, 'utf-8');
          subscriptions = JSON.parse(data);
        } catch (error) {
          subscriptions = [];
        }

        return NextResponse.json({
          success: true,
          data: subscriptions,
          count: subscriptions.length,
          source: 'file'
        });
      }
    }

    // Production authentication
    const authHeader = request.headers.get('authorization');
    const expectedKey = process.env.ADMIN_API_KEY || 'admin-key-123';
    
    if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Try to get from PostgreSQL first
    try {
      const result = await pool.query(
        'SELECT * FROM newsletter_subscriptions ORDER BY timestamp DESC'
      );
      
      return NextResponse.json({
        success: true,
        data: result.rows,
        count: result.rows.length,
        source: 'database'
      });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      
      // Fallback to JSON file
      const fs = require('fs').promises;
      const path = require('path');
      const filePath = path.join(process.cwd(), 'data', 'newsletter-subscriptions.json');

      let subscriptions: NewsletterSubscription[] = [];
      try {
        const data = await fs.readFile(filePath, 'utf-8');
        subscriptions = JSON.parse(data);
      } catch (error) {
        // File doesn't exist or is empty
        subscriptions = [];
      }

      return NextResponse.json({
        success: true,
        data: subscriptions,
        count: subscriptions.length,
        source: 'file'
      });
    }

  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}
