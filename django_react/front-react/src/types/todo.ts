export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
}