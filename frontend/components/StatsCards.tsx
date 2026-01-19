'use client';

import { ListTodo, Clock, CheckCircle2, ListChecks } from 'lucide-react';
import { Card, CardBody } from './ui/Card';
import type { TaskStats } from '@/lib/types';

interface StatsCardsProps {
  stats: TaskStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: ListChecks,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'To Do',
      value: stats.todo,
      icon: ListTodo,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Done',
      value: stats.done,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardBody className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-full`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}