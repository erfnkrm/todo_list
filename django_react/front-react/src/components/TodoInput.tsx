import React, { useState } from 'react';
import { Plus, Flag } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoInputProps {
  onAdd: (text: string, priority: Todo['priority'], category?: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [category, setCategory] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, priority, category || undefined);
      setText('');
      setCategory('');
      setPriority('medium');
      setShowOptions(false);
    }
  };

  const priorityColors = {
    low: 'text-green-500 border-green-200',
    medium: 'text-yellow-500 border-yellow-200',
    high: 'text-red-500 border-red-200'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-6 py-4 text-lg bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-300 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md pr-16"
        />
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className="absolute right-14 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Flag size={20} />
        </button>
        <button
          type="submit"
          disabled={!text.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        >
          <Plus size={20} />
        </button>
      </div>

      {showOptions && (
        <div className="bg-white rounded-xl p-4 border-2 border-gray-100 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Priority:</label>
            <div className="flex space-x-2">
              {(['low', 'medium', 'high'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium border-2 transition-all duration-200 ${
                    priority === p 
                      ? priorityColors[p] + ' bg-opacity-10' 
                      : 'text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Optional category"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none transition-colors"
            />
          </div>
        </div>
      )}
    </form>
  );
};