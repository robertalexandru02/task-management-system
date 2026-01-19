import type { FastifyRequest, FastifyReply } from 'fastify';import bcrypt from 'bcrypt';
import prisma from '../utils/prisma.js';

interface RegisterBody {
  email: string;
  name: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply
) => {
  try {
    const { email, name, password } = request.body;

    if (!email || !name || !password) {
      return reply.status(400).send({
        error: 'Email, name and password are required'
      });
    }

    if (password.length < 6) {
      return reply.status(400).send({
        error: 'Password must be at least 6 characters'
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return reply.status(409).send({
        error: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    const token = request.server.jwt.sign({
      id: user.id,
      email: user.email
    });

    return reply.status(201).send({
      user,
      token
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to register user'
    });
  }
};

export const login = async (
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply.status(400).send({
        error: 'Email and password are required'
      });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return reply.status(401).send({
        error: 'Invalid credentials'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return reply.status(401).send({
        error: 'Invalid credentials'
      });
    }

    const token = request.server.jwt.sign({
      id: user.id,
      email: user.email
    });

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to login'
    });
  }
};

export const getMe = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userId = (request.user as any).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    if (!user) {
      return reply.status(404).send({
        error: 'User not found'
      });
    }

    return reply.send({ user });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to get user data'
    });
  }
};