'use client';

import TaskCard from './TaskCard';
import type { Task } from '@/lib/types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  const groupedTasks = {
    TODO: tasks.filter(t => t.status === 'TODO'),
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS'),
    DONE: tasks.filter(t => t.status === 'DONE')
  };

  const columns = [
    { title: 'To Do', status: 'TODO' as const, color: 'border-gray-300' },
    { title: 'In Progress', status: 'IN_PROGRESS' as const, color: 'border-yellow-300' },
    { title: 'Done', status: 'DONE' as const, color: 'border-green-300' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map(column => (
        <div key={column.status} className={`border-t-4 ${column.color} bg-gray-50 rounded-lg p-4`}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {column.title} ({groupedTasks[column.status].length})
          </h2>
          <div className="space-y-3">
            {groupedTasks[column.status].length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No tasks</p>
            ) : (
              groupedTasks[column.status].map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}