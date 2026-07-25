import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

const pendingMice: any[] = [];

export async function GET() {
  return NextResponse.json({ pending: pendingMice });
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json();
  const { name, brand, sensor, weight } = body;

  if (!name || !brand) {
    return NextResponse.json({ error: 'Name and brand required' }, { status: 400 });
  }

  const entry = { id: `pending-${Date.now()}`, ...body, submittedAt: new Date().toISOString() };
  pendingMice.push(entry);

  return NextResponse.json({ message: 'Mouse submitted for review', entry }, { status: 201 });
}
