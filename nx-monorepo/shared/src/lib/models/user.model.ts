export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
}
export type UserRole = 'admin' | 'editor' | 'viewer';
export interface AuthUser extends User {
  token: string;
  refreshToken: string;
  expiresAt: Date;
}
