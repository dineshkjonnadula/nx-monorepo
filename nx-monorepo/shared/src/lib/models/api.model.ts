export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  userId: string;
}
export type NotificationType = 'info' | 'success' | 'warning' | 'error';
