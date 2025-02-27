/*export default async function routes(fastify, options) {
  fastify.get('/ping', async (request, reply) => {
    return 'pong\n';
  });
}*/

import { DB } from '../db/index.js';
import debounce from 'lodash.debounce';

export default async function routes(fastify, options) {
  fastify.get('/ping', async (request, reply) => {
    return 'pong\n';
  });

  fastify.post('/emails', async (request, reply) => {
    try {
      await DB.addEmail(request.body);
      reply.status(201).send({ message: 'Email created' });
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  });

  fastify.get('/emails', async (request, reply) => {
    try {
      const searchText = request.query.q;
      const emails = await DB.getEmails(searchText);
      reply.send(emails);
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  });

  fastify.get('/emails/:id', async (request, reply) => {
    try {
      const email = await DB.getEmailById(request.params.id);
      if (email) {
        reply.send(email);
      } else {
        reply.status(404).send({ message: 'Email not found' });
      }
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  });
}
