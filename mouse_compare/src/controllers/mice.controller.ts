import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/middleware';
import { getPendingMice, submitMouse } from '@/services/mouse.service';

export async function listPendingMice() {
  return NextResponse.json({ pending: getPendingMice() });
}

export async function submitMouseHandler(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const body = await request.json();
  const { name, brand } = body;
  if (!name || !brand) {
    return NextResponse.json({ error: 'Name and brand required' }, { status: 400 });
  }
  const entry = submitMouse(body);
  return NextResponse.json({ message: 'Mouse submitted for review', entry }, { status: 201 });
}
