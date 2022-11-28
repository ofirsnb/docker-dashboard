import fastify, { FastifyInstance } from 'fastify';
import staticPlugin from '@fastify/static';
import cors from '@fastify/cors';
import AuthRouter from './routes/login';
import ContainersRouter from './routes/containers';

const App = async (): Promise<FastifyInstance> => {
  try {
    const server = fastify({ logger: true, disableRequestLogging: true });
    server.register(staticPlugin, { root: __dirname, prefix: '/' });
    await server.register(cors, { origin: '*' });

    server.get('/', (req, reply) => {
      reply.sendFile('index.html', {cacheControl: false});
    });

    server.register(AuthRouter, { prefix: '/auth' });
    server.register(ContainersRouter, { prefix: '/containers' });

    server.setErrorHandler((error, request, reply) => {
      const code = error.code ?? error.statusCode;
      const errorObject = {...error, code};
      reply.code(parseInt(code) || 500).send(errorObject);
    });

    return server;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    process.exit(1);
  }
};

App().then(async (app) => {
  await app.listen({port: 3000, host: '0.0.0.0'});
});
