import { NextResponse } from 'next/server';

export async function GET() {
  const { getUserCount } = await import('@/lib/store');
  return NextResponse.json({ count: getUserCount() });
}
