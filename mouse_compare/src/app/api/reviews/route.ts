import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews, createReview, deleteReview } from '@/lib/store';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

function getUser(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string; name: string };
  } catch {
    return null;
  }
}

export async function GET() {
  return NextResponse.json({ reviews: getAllReviews() });
}

export async function POST(request: NextRequest) {
  const user = getUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json();
  const { mouseId, mouseName, text, rating } = body;

  if (!mouseId || !text || !rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const review = createReview(user.userId, user.name, mouseId, mouseName, text, rating);
  return NextResponse.json({ review }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const user = getUser(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await request.json();
  const deleted = deleteReview(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Review deleted' });
}
