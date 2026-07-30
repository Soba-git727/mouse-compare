import { createReview, getAllReviews, deleteReview } from '@/models';

export function submitReview(userId: string, userName: string, mouseId: string, mouseName: string, text: string, rating: number) {
  return createReview(userId, userName, mouseId, mouseName, text, rating);
}

export function listReviews() {
  return getAllReviews();
}

export function removeReview(id: string): boolean {
  return deleteReview(id);
}
