'use client';

import { useAuth } from '@/context/AuthContext';
import { LogOut, CheckSquare } from 'lucide-react';
import Button from './ui/Button';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-8 h-8 text-primary-600" />
            <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user.name}</span>
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}