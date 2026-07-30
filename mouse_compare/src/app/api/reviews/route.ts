import { NextRequest } from 'next/server';
import { getReviews, createReviewHandler, deleteReviewHandler } from '@/controllers/review.controller';

export const GET = () => getReviews();
export const POST = (request: NextRequest) => createReviewHandler(request);
export const DELETE = (request: NextRequest) => deleteReviewHandler(request);
