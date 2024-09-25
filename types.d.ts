import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      id: string;
      role: "USER" | "ADMIN"; // Adicione aqui o que o `user` deve conter
    };
  }
}
