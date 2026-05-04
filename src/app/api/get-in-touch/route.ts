import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, organization, inquiryType, message } = body;

    if (!firstName || !lastName || !email || !phone || !inquiryType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    try {
      const result = await pool.query(
        `INSERT INTO get_in_touch (first_name, last_name, email, phone, organization, inquiry_type, message, ip, user_agent)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [firstName, lastName, email, phone, organization || null, inquiryType, message, ip, userAgent]
      );

      return NextResponse.json({ success: true, message: 'Form submitted successfully', data: result.rows[0] });
    } catch (dbError) {
      console.error('Database error:', dbError);

      const fs = require('fs').promises;
      const path = require('path');
      const filePath = path.join(process.cwd(), 'data', 'get-in-touch.json');
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      let submissions: any[] = [];
      try {
        const data = await fs.readFile(filePath, 'utf-8');
        submissions = JSON.parse(data);
      } catch { submissions = []; }

      const submission = {
        id: Date.now().toString(), first_name: firstName, last_name: lastName,
        email, phone, organization: organization || null, inquiry_type: inquiryType,
        message, ip, user_agent: userAgent, status: 'new', created_at: new Date().toISOString()
      };
      submissions.push(submission);
      await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));

      return NextResponse.json({ success: true, message: 'Form submitted successfully', data: submission });
    }
  } catch (error) {
    console.error('Get in touch form error:', error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let queryStr = 'SELECT * FROM get_in_touch';
    const params: any[] = [];
    if (status) { queryStr += ' WHERE status = $1'; params.push(status); }
    queryStr += ' ORDER BY created_at DESC';

    try {
      const result = await pool.query(queryStr, params);
      return NextResponse.json({ success: true, data: result.rows, count: result.rows.length, source: 'database' });
    } catch (dbError) {
      console.error('Database query error:', dbError);

      const fs = require('fs').promises;
      const path = require('path');
      const filePath = path.join(process.cwd(), 'data', 'get-in-touch.json');
      let submissions: any[] = [];
      try { const data = await fs.readFile(filePath, 'utf-8'); submissions = JSON.parse(data); } catch { submissions = []; }
      if (status) submissions = submissions.filter(s => s.status === status);

      return NextResponse.json({ success: true, data: submissions, count: submissions.length, source: 'file' });
    }
  } catch (error) {
    console.error('Error fetching get in touch:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });

    const result = await pool.query('UPDATE get_in_touch SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
    if (result.rows.length === 0) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating get in touch:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const result = await pool.query('DELETE FROM get_in_touch WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting get in touch:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
