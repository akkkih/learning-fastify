import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/hash";

export async function usersRoute(fastify: FastifyInstance) {
    fastify.post("/users", async (request, reply) => {
        try {
            const { email, name, password } = z.object({
                email: z.string().email(),
                name: z.string(),
                password: z.string().min(8)
            }).parse(request.body);

            const existingUser = await prisma.user.findUnique({ where: { email } });

            if (existingUser) {
                return reply.status(400).send({ error: "Email already exists" });
            }

            const hashedPassword = await hashPassword(password);

            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword
                }
            });

            return reply.status(201).send(user);
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "An error occurred while creating the user." });
        }
    });

    fastify.get("/users/:id", async (request, reply) => {
        try {
            const { id } = request.params as { id: string };

            const user = await prisma.user.findUnique({ where: { id } });

            if (!user) {
                return reply.status(404).send({ error: "User not found" });
            }

            reply.code(200).send({ data: user });
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "An error occurred while fetching the user." });
        }
    });
}