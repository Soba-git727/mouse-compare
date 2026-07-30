export interface StoredReview {
  id: string;
  userId: string;
  userName: string;
  mouseId: string;
  mouseName: string;
  text: string;
  rating: number;
  createdAt: Date;
}

const reviews: StoredReview[] = [];
let nextReviewId = 1;

export function createReview(userId: string, userName: string, mouseId: string, mouseName: string, text: string, rating: number): StoredReview {
  const review: StoredReview = {
    id: `review-${nextReviewId++}`,
    userId, userName, mouseId, mouseName,
    text, rating,
    createdAt: new Date(),
  };
  reviews.push(review);
  return review;
}

export function getAllReviews(): StoredReview[] {
  return [...reviews];
}

export function deleteReview(id: string): boolean {
  const idx = reviews.findIndex(r => r.id === id);
  if (idx === -1) return false;
  reviews.splice(idx, 1);
  return true;
}
