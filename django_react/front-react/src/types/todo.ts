export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
}