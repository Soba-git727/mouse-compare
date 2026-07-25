import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

export async function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export async function registerUser({ name, email, password }: { name: string; email: string; password: string }) {
  const { db } = await connectToDatabase();
  const users = db.collection('users');

  const existing = await users.findOne({ email });
  if (existing) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await users.insertOne({
    name,
    email,
    password: hashedPassword,
    role: 'user',
    avatar: name.charAt(0).toUpperCase(),
    createdAt: new Date(),
  });

  return {
    insertedId: result.insertedId,
    name,
    email,
    role: 'user' as const,
    avatar: name.charAt(0).toUpperCase(),
  };
}

export async function loginUser(email: string, password: string) {
  const { db } = await connectToDatabase();
  const users = db.collection('users');

  const user = await users.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user._id.toString(), email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, user };
}

export async function createSession(response: NextResponse, userId: string, email: string, role: string, name: string) {
  const token = jwt.sign(
    { userId, email, role, name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
}

export async function logoutUser(response: NextResponse) {
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}
