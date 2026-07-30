export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  avatar: string;
  createdAt: Date;
}

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
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

let nextUserId = 2;

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

export function toUserPayload(user: StoredUser): UserPayload {
  return { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar };
}
