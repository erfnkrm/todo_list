import React from 'react';
import { CheckSquare } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { TodoStats } from './components/TodoStats';
import { TodoFilters } from './components/TodoFilters';

function App() {
  const {
    todos,
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
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
              <CheckSquare className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Todo Master
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organize your tasks with style and efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Todo Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input */}
            <TodoInput onAdd={addTodo} />

            {/* Filters */}
            <TodoFilters
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
              hasCompleted={stats.completed > 0}
            />

            {/* Todo List */}
            <div className="space-y-3">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading todos...</p>
                </div>
              ) : todos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <CheckSquare className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {filter === 'all' ? 'No todos yet' : `No ${filter} todos`}
                  </h3>
                  <p className="text-gray-500">
                    {filter === 'all' 
                      ? 'Add your first task to get started!' 
                      : `Switch to "All" to see your other todos`
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onUpdate={updateTodo}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TodoStats stats={stats} />
            
            {/* Quick Tips */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Click the plus button to add new todos</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Hover over tasks to reveal edit and delete options</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Use filters to focus on specific task types</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;