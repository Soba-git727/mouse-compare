'use server';

import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token);
    return payload;
  } catch {
    return null;
  }
}

export async function protectRoute(request: NextRequest) {
  const auth = await getCurrentUser(request);
  if (!auth) {
    return { error: 'Not authenticated', status: 401 };
  }
  return { user: auth };
}

export async function requireRole(request: NextRequest, allowedRoles: string[]) {
  const auth = await protectRoute(request);
  if ('error' in auth) {
    return auth;
  }

  const user = auth.user as { role: string };
  if (!allowedRoles.includes(user.role)) {
    return { error: 'Insufficient permissions', status: 403 };
  }

  return { user: auth.user };
}

export async function getUserFromRequest(request: NextRequest): Promise<{ userId: string; email: string; role: string; name: string } | null> {
  const user = await getCurrentUser(request);
  return user as { userId: string; email: string; role: string; name: string } | null;
}