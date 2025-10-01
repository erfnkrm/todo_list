import { Todo, TodoStats } from '../types/todo';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async getTodos(): Promise<{ results: Todo[] }> {
    return this.request<{ results: Todo[] }>('/todos/');
  }

  async createTodo(title: string): Promise<Todo> {
    return this.request<Todo>('/todos/', {
      method: 'POST',
      body: JSON.stringify({ title, completed: false }),
    });
  }

  async updateTodo(id: number, updates: Partial<Pick<Todo, 'title' | 'completed'>>): Promise<Todo> {
    return this.request<Todo>(`/todos/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteTodo(id: number): Promise<void> {
    return this.request<void>(`/todos/${id}/`, {
      method: 'DELETE',
    });
  }

  async getStats(): Promise<TodoStats> {
    return this.request<TodoStats>('/todos/stats/');
  }
}

export const apiService = new ApiService();
