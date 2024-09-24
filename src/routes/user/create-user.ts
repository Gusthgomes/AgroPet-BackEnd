import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";

import { createUser } from "../../functions/user/create-user";

const CreateUserSchema = z.object({
  name: z.string().min(1).max(55),
  email: z.string().email(),
});

export const createUserRoute: FastifyPluginAsync = async (app) => {
  app.post(
    "/user",
    {
      schema: {
        body: CreateUserSchema,
      },
    },
    async (request, reply) => {
      const { name, email } = request.body as z.infer<typeof CreateUserSchema>;

      try {
        const newUser = await createUser(name, email);

        reply.status(200).send(newUser);
      } catch (error) {
        reply.status(400).send({ message: "Error creating user", error });
      }
    }
  );
};
