export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  avatar: string;
  createdAt: Date;
}

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

const users: StoredUser[] = [{
  id: 'admin-001',
  name: 'Admin',
  email: 'admin@mousecompare.com',
  password: 'admin123',
  role: 'admin',
  avatar: 'A',
  createdAt: new Date('2026-01-01'),
}];

const reviews: StoredReview[] = [];

let nextUserId = 2;
let nextReviewId = 1;

export function createUser(name: string, email: string, password: string): StoredUser {
  const existing = users.find(u => u.email === email);
  if (existing) throw new Error('Email already registered');
  const user: StoredUser = {
    id: `user-${String(nextUserId++).padStart(3, '0')}`,
    name, email, password, role: 'user',
    avatar: name.charAt(0).toUpperCase(),
    createdAt: new Date(),
  };
  users.push(user);
  return user;
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return users.find(u => u.email === email);
}

export function findUserById(id: string): StoredUser | undefined {
  return users.find(u => u.id === id);
}

export function getAllUsers(): StoredUser[] {
  return [...users];
}

export function getUserCount(): number {
  return users.length;
}

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
