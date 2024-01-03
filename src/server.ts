import Fastify from 'fastify';

import { usersRoute } from './routes/users';

async function bootstrap() {
    const app = Fastify({ logger: true });

    await app.register(usersRoute);

    await app.listen({ port: 3333 });
}

bootstrap();