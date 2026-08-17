import { NextRequest, NextResponse } from 'next/server';

export function requireApiToken(request: NextRequest): NextResponse | null {
  const token = request.headers.get('x-api-key');
  if (!token || token !== process.env.API_TOKEN) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
