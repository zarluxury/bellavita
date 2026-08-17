import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { requireApiToken } from '@/lib/apiToken';

export async function POST(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const body = await request.json();
    const { name, email, automationFor, projectType, contactNumber, city, details, services } = body;

    if (!name || !email || !contactNumber || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    try {
      const result = await pool.query(
        `INSERT INTO contact_forms (name, email, automation_for, project_type, contact_number, city, details, services, ip, user_agent)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [name, email, automationFor, projectType, contactNumber, city, details || null, services || [], ip, userAgent]
      );

      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully',
        data: result.rows[0]
      });
    } catch (dbError) {
      console.error('Database error:', dbError);

      // Fallback to JSON file
      const fs = require('fs').promises;
      const path = require('path');
      const filePath = path.join(process.cwd(), 'data', 'contact-forms.json');

      await fs.mkdir(path.dirname(filePath), { recursive: true });

      let submissions: any[] = [];
      try {
        const data = await fs.readFile(filePath, 'utf-8');
        submissions = JSON.parse(data);
      } catch {
        submissions = [];
      }

      const submission = {
        id: Date.now().toString(),
        name,
        email,
        automation_for: automationFor,
        project_type: projectType,
        contact_number: contactNumber,
        city,
        details: details || null,
        services: services || [],
        ip,
        user_agent: userAgent,
        status: 'new',
        created_at: new Date().toISOString()
      };

      submissions.push(submission);
      await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));

      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully',
        data: submission
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let queryStr = 'SELECT * FROM contact_forms';
    const params: any[] = [];

    if (status) {
      queryStr += ' WHERE status = $1';
      params.push(status);
    }

    queryStr += ' ORDER BY created_at DESC';

    try {
      const result = await pool.query(queryStr, params);

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
      const filePath = path.join(process.cwd(), 'data', 'contact-forms.json');

      let submissions: any[] = [];
      try {
        const data = await fs.readFile(filePath, 'utf-8');
        submissions = JSON.parse(data);
      } catch {
        submissions = [];
      }

      if (status) {
        submissions = submissions.filter(s => s.status === status);
      }

      return NextResponse.json({
        success: true,
        data: submissions,
        count: submissions.length,
        source: 'file'
      });
    }
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact forms' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'UPDATE contact_forms SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Form not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating contact form:', error);
    return NextResponse.json(
      { error: 'Failed to update contact form' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'DELETE FROM contact_forms WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Form not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Form deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact form' },
      { status: 500 }
    );
  }
}
