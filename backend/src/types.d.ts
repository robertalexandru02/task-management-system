import '@fastify/jwt';

declare module 'fastify' {
  interface FastifyInstance {
    jwt: {
      sign: (payload: any) => string;
      verify: (token: string) => any;
    };
  }
  
  interface FastifyRequest {
    user?: {
      id: string;
      email: string;
    };
  }
}