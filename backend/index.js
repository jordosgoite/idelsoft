// ESM
import Fastify from 'fastify';
import routes from './src/routes/index.js';
import cors from '@fastify/cors';

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: '*', // Adjust for production
});

fastify.register(routes);

fastify.listen({ port: process.env.PORT || 5000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
