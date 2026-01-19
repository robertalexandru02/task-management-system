import type { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../utils/prisma.js';

interface CreateTaskBody {
  title: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
}

interface UpdateTaskBody {
  title?: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
}

interface TaskParams {
  id: string;
}

export const getAllTasks = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userId = (request.user as any).id;

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return reply.send({ tasks });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to fetch tasks'
    });
  }
};

export const getTaskById = async (
  request: FastifyRequest<{ Params: TaskParams }>,
  reply: FastifyReply
) => {
  try {
    const userId = (request.user as any).id;
    const { id } = request.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!task) {
      return reply.status(404).send({
        error: 'Task not found'
      });
    }

    return reply.send({ task });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to fetch task'
    });
  }
};

export const createTask = async (
  request: FastifyRequest<{ Body: CreateTaskBody }>,
  reply: FastifyReply
) => {
  try {
    const userId = (request.user as any).id;
    const { title, description, status, priority, dueDate } = request.body;

    if (!title) {
      return reply.status(400).send({
        error: 'Title is required'
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'TODO',
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        userId
      }
    });

    return reply.status(201).send({ task });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to create task'
    });
  }
};

export const updateTask = async (
  request: FastifyRequest<{ Params: TaskParams; Body: UpdateTaskBody }>,
  reply: FastifyReply
) => {
  try {
    const userId = (request.user as any).id;
    const { id } = request.params;
    const { title, description, status, priority, dueDate } = request.body;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId }
    });

    if (!existingTask) {
      return reply.status(404).send({
        error: 'Task not found'
      });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(dueDate && { dueDate: new Date(dueDate) })
      }
    });

    return reply.send({ task });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to update task'
    });
  }
};

export const deleteTask = async (
  request: FastifyRequest<{ Params: TaskParams }>,
  reply: FastifyReply
) => {
  try {
    const userId = (request.user as any).id;
    const { id } = request.params;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId }
    });

    if (!existingTask) {
      return reply.status(404).send({
        error: 'Task not found'
      });
    }

    await prisma.task.delete({
      where: { id }
    });

    return reply.send({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to delete task'
    });
  }
};

export const getTaskStats = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userId = (request.user as any).id;

    const [total, todo, inProgress, done] = await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.task.count({ where: { userId, status: 'TODO' } }),
      prisma.task.count({ where: { userId, status: 'IN_PROGRESS' } }),
      prisma.task.count({ where: { userId, status: 'DONE' } })
    ]);

    return reply.send({
      stats: {
        total,
        todo,
        inProgress,
        done
      }
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to fetch task statistics'
    });
  }
};