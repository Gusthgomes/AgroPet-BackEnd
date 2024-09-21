import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";

// Category routes
import { createCategoryRoute } from "../routes/category/create-category";
import { getCategoryRoute } from "../routes/category/get-category";
import { getCategoryByNameRoute } from "../routes/category/get-category-by-name";
import { updateCategoryRoute } from "../routes/category/update-category";
import { deleteCategoryRoute } from "../routes/category/delete-category";
import { updateAllCategoryRoute } from "../routes/category/update-all-category";

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Category routes
app.register(createCategoryRoute);
app.register(getCategoryRoute);
app.register(getCategoryByNameRoute);
app.register(updateCategoryRoute);
app.register(deleteCategoryRoute);
app.register(updateAllCategoryRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });
