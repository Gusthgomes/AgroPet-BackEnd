import { z } from "zod";
import type { FastifyPluginAsync } from "fastify";
import { createCategory } from "../../functions/category/create-category";

// Definir o esquema Zod para o corpo da requisição
const createCategorySchema = z.object({
  name: z.string(),
  description: z.string().min(1).max(70),
});

// Tipagem do Fastify Plugin
export const createGoalRoute: FastifyPluginAsync = async (app) => {
  // Tipagem correta para a rota
  app.post(
    "/category",
    {
      schema: {
        body: createCategorySchema, // Definir o esquema Zod
      },
    },
    async (request, reply) => {
      // Tipar o corpo da requisição com base no esquema Zod
      const { name, description } = request.body as z.infer<
        typeof createCategorySchema
      >;

      // Função para criar a categoria
      await createCategory({
        name,
        description,
      });

      // Resposta adequada após a criação
      reply.status(201).send({ message: "Category created successfully" });
    }
  );
};
