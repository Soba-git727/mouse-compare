import { NextRequest } from 'next/server';
import { listPendingMice, submitMouseHandler } from '@/controllers/mice.controller';

export const GET = () => listPendingMice();
export const POST = (request: NextRequest) => submitMouseHandler(request);
