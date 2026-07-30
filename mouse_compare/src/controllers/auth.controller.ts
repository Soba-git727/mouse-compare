import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser as createUserModel, toUserPayload } from '@/models';
import { signToken, setAuthCookie, clearAuthCookie } from '@/services/auth.service';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

export async function login(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    const token = signToken({ userId: user.id, email: user.email, role: user.role, name: user.name });
    const response = NextResponse.json({ success: true, user: toUserPayload(user) });
    setAuthCookie(response, token);
    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }
}

export async function register(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    const user = createUserModel(name, email, password);
    const token = signToken({ userId: user.id, email: user.email, role: user.role, name: user.name });
    const response = NextResponse.json({ message: 'User registered successfully', user: toUserPayload(user) }, { status: 201 });
    setAuthCookie(response, token);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function getMe(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string; name: string };
    return NextResponse.json({ user: { id: payload.userId, email: payload.email, role: payload.role, name: payload.name } });
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
}

export async function logout(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const response = NextResponse.json({ message: 'Logged out successfully' });
    clearAuthCookie(response);
    return response;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
