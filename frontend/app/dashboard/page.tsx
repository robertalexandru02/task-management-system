'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { tasksApi } from '@/lib/api';
import type { Task, TaskStats, CreateTaskData } from '@/lib/types';
import Navbar from '@/components/Navbar';
import StatsCards from '@/components/StatsCards';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import Button from '@/components/ui/Button';
import { Plus, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>({ total: 0, todo: 0, inProgress: 0, done: 0 });
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchStats();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { tasks: fetchedTasks } = await tasksApi.getAll();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { stats: fetchedStats } = await tasksApi.getStats();
      setStats(fetchedStats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleCreateTask = async (data: CreateTaskData) => {
    const { task } = await tasksApi.create(data);
    setTasks([task, ...tasks]);
    fetchStats();
  };

  const handleUpdateTask = async (data: CreateTaskData) => {
    if (!editingTask) return;
    const { task } = await tasksApi.update(editingTask.id, data);
    setTasks(tasks.map(t => t.id === task.id ? task : t));
    setEditingTask(null);
    fetchStats();
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    await tasksApi.delete(id);
    setTasks(tasks.filter(t => t.id !== id));
    fetchStats();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Task
          </Button>
        </div>

        <div className="mb-8">
          <StatsCards stats={stats} />
        </div>

        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />

        <TaskForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          task={editingTask}
        />
      </main>
    </div>
  );
}