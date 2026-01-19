import type { FastifyInstance } from 'fastify';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js';
import { authenticate } from '../middleware/authMiddleware.js';

async function taskRoutes(fastify: FastifyInstance) {
  // Toate rutele necesită autentificare
  fastify.addHook('onRequest', authenticate);

  // GET /api/tasks - obține toate task-urile user-ului
  fastify.get('/', getAllTasks);
  
  // GET /api/tasks/stats - obține statistici
  fastify.get('/stats', getTaskStats);
  
  // GET /api/tasks/:id - obține un task specific
  fastify.get('/:id', getTaskById);
  
  // POST /api/tasks - creează task nou
  fastify.post('/', createTask);
  
  // PUT /api/tasks/:id - actualizează task
  fastify.put('/:id', updateTask);
  
  // DELETE /api/tasks/:id - șterge task
  fastify.delete('/:id', deleteTask);
}

export default taskRoutes;