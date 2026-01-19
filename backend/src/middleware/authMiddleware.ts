import type { FastifyRequest, FastifyReply } from 'fastify';

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({
      error: 'Unauthorized - Invalid or missing token'
    });
  }
};