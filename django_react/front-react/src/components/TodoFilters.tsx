import React from 'react';
import { Trash2 } from 'lucide-react';

interface TodoFiltersProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({ 
  filter, 
  onFilterChange, 
  onClearCompleted, 
  hasCompleted 
}) => {
  const filters = [
    { key: 'all' as const, label: 'All' },
    { key: 'active' as const, label: 'Active' },
    { key: 'completed' as const, label: 'Completed' }
  ];

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex space-x-1">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              filter === key
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {hasCompleted && (
        <button
          onClick={onClearCompleted}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
        >
          <Trash2 size={16} />
          <span className="text-sm font-medium">Clear Completed</span>
        </button>
      )}
    </div>
  );
};