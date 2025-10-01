import { useState, useEffect } from 'react';
import { Todo, TodoStats } from '../types/todo';
import { apiService } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from API on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTodos();
        setTodos(response.results);
        setError(null);
      } catch (err) {
        console.error('Failed to load todos:', err);
        setError('Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const addTodo = async (title: string) => {
    try {
      const newTodo = await apiService.createTodo(title.trim());
      setTodos(prev => [newTodo, ...prev]);
      setError(null);
    } catch (err) {
      console.error('Failed to create todo:', err);
      setError('Failed to create todo');
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        const updatedTodo = await apiService.updateTodo(id, { completed: !todo.completed });
        setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
        setError(null);
      }
    } catch (err) {
      console.error('Failed to toggle todo:', err);
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await apiService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setError('Failed to delete todo');
    }
  };

  const updateTodo = async (id: number, updates: Partial<Pick<Todo, 'title'>>) => {
    try {
      const updatedTodo = await apiService.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
      setError(null);
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Failed to update todo');
    }
  };

  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);
      await Promise.all(completedTodos.map(todo => apiService.deleteTodo(todo.id)));
      setTodos(prev => prev.filter(todo => !todo.completed));
      setError(null);
    } catch (err) {
      console.error('Failed to clear completed todos:', err);
      setError('Failed to clear completed todos');
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const stats: TodoStats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  };

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    stats,
    loading,
    error
  };
};