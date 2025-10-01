import React from 'react';
import { CheckCircle, Circle, BarChart3 } from 'lucide-react';
import { TodoStats as TodoStatsType } from '../types/todo';

interface TodoStatsProps {
  stats: TodoStatsType;
}

export const TodoStats: React.FC<TodoStatsProps> = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="text-blue-500" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Circle className="text-gray-400" size={16} />
            <span className="text-2xl font-bold text-gray-800">{stats.total}</span>
          </div>
          <p className="text-sm text-gray-600">Total</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <CheckCircle className="text-green-500" size={16} />
            <span className="text-2xl font-bold text-green-600">{stats.completed}</span>
          </div>
          <p className="text-sm text-gray-600">Done</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Circle className="text-blue-500" size={16} />
            <span className="text-2xl font-bold text-blue-600">{stats.pending}</span>
          </div>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Completion Rate</span>
          <span className="text-sm font-semibold text-gray-800">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};