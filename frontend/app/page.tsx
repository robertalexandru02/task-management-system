'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CheckSquare, ListChecks, Clock, Target } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50">
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-8 h-8 text-sky-600" />
            <span className="text-xl font-bold text-gray-900">Task Manager</span>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="secondary">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Organize Your Work,
            <br />
            <span className="text-sky-600">Achieve Your Goals</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A modern and intuitive task management system to help you stay productive
            and organized. Track your tasks, set priorities, and get things done.
          </p>
          <Link href="/register">
            <Button variant="primary" size="lg">
              Start Free Today
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6">
            <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ListChecks className="w-8 h-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Organize Tasks
            </h3>
            <p className="text-gray-600">
              Create, categorize, and manage all your tasks in one place with an intuitive interface.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Track Progress
            </h3>
            <p className="text-gray-600">
              Monitor your task completion with real-time statistics and visual progress indicators.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Stay Focused
            </h3>
            <p className="text-gray-600">
              Set priorities and due dates to ensure you're always working on what matters most.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}