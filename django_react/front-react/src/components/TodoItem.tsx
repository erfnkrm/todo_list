import React, { useState } from 'react';
import { Check, X, Edit3, Save, Flag } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'text' | 'priority' | 'category'>>) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, { text: editText.trim(), priority: editPriority });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const priorityColors = {
    low: 'border-l-green-400 bg-green-50',
    medium: 'border-l-yellow-400 bg-yellow-50',
    high: 'border-l-red-400 bg-red-50'
  };

  const priorityDots = {
    low: 'bg-green-400',
    medium: 'bg-yellow-400',
    high: 'bg-red-400'
  };

  return (
    <div className={`group bg-white rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all duration-200 ${priorityColors[todo.priority]} ${todo.completed ? 'opacity-60' : ''}`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
            }`}
          >
            {todo.completed && <Check size={14} />}
          </button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                    if (e.key === 'Escape') handleCancel();
                  }}
                  autoFocus
                />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Priority:</span>
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setEditPriority(p)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        editPriority === p ? priorityDots[p] : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p className={`text-gray-800 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.text}
                </p>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${priorityDots[todo.priority]}`} />
                    <span className="text-xs text-gray-500 capitalize">{todo.priority}</span>
                  </div>
                  {todo.category && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {todo.category}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {todo.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};