import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/hash";

const prisma = new PrismaClient();

async function main() {
    const password = await hashPassword("mypassword")

    await prisma.user.create({
        data: {
            email: 'dev@akkih.com',
            name: 'Akkih',
            password: password,
        }
    });
}

main();