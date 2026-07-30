import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.AUTH_API_URL || 'http://localhost:5123';

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get('auth-token')?.value;
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { cookie: `auth-token=${cookie}` },
  });
  return NextResponse.json(await res.json(), { status: res.status });
}

export async function DELETE(request: NextRequest) {
  const cookie = request.cookies.get('auth-token')?.value;
  const res = await fetch(`${API_URL}/api/auth/me`, {
    method: 'DELETE',
    headers: { cookie: `auth-token=${cookie}` },
  });
  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  const setCookie = res.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }

  return response;
}
