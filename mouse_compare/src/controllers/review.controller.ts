import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/middleware';
import { submitReview, listReviews, removeReview } from '@/services/review.service';

export async function getReviews() {
  return NextResponse.json({ reviews: listReviews() });
}

export async function createReviewHandler(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const body = await request.json();
  const { mouseId, mouseName, text, rating } = body;
  if (!mouseId || !text || !rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const review = submitReview(user.userId, user.name, mouseId, mouseName, text, rating);
  return NextResponse.json({ review }, { status: 201 });
}

export async function deleteReviewHandler(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const { id } = await request.json();
  const deleted = removeReview(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Review deleted' });
}
