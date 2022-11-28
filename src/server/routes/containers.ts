import {FastifyInstance} from 'fastify';
import {dockerCommand} from 'docker-cli-js';

export default async (server: FastifyInstance): Promise<void> => {

  server.get('/', async (request, reply) => {
    const docker = await dockerCommand('ps -a', {});
    reply.send(docker.containerList);
  });

  server.get('/logs/:id', async (request, reply) => {
    const {id} = request.params as unknown as { id: string };
    const docker = await dockerCommand(`logs -n 15 ${id}`, {});
    reply.send(docker);
  });

  server.get('/start/:id', async (request, reply) => {
    const {id} = request.params as unknown as { id: string };
    const docker = await dockerCommand(`start ${id}`, {});
    reply.send(docker);
  });

  server.get('/stop/:id', async (request, reply) => {
    const {id} = request.params as unknown as { id: string };
    const docker = await dockerCommand(`stop ${id}`, {});
    reply.send(docker);
  });
};
