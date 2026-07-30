import { NextResponse } from 'next/server';
import { getUserCount } from '@/models';

export const GET = () => NextResponse.json({ count: getUserCount() });
