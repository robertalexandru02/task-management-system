import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const server = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
});

// Middleware
await server.register(cors, {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
});

await server.register(jwt, {
  secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production'
});

// Health check
server.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Routes
await server.register(authRoutes, { prefix: '/api/auth' });
await server.register(taskRoutes, { prefix: '/api/tasks' });

// Error handler
server.setErrorHandler((error: any, request, reply) => {
  server.log.error(error);
  
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  
  reply.status(statusCode).send({
    error: {
      message,
      statusCode
    }
  });
});

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001');
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Server running on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();