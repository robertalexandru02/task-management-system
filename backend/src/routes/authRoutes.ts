import type { FastifyInstance } from 'fastify';
import { register, login, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

async function authRoutes(fastify: FastifyInstance) {
  // Public routes
  fastify.post('/register', register);
  fastify.post('/login', login);
  
  // Protected routes
  fastify.get('/me', { onRequest: [authenticate] }, getMe);
}

export default authRoutes;