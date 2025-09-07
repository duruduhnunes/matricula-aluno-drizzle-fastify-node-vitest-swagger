import fastify from "fastify";

import { eq } from "drizzle-orm";
import {validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod';
import { fastifySwaggerUi} from '@fastify/swagger-ui'
import { z } from 'zod';
import { fastifySwagger} from '@fastify/swagger'
import { createCourses } from "./database/routes/createCourses.ts";
import { getCourses } from "./database/routes/getCourses.ts";
import { getCoursesById } from "./database/routes/getCoursesByID.ts";


const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);



if (process.env.NODE_ENV === "development") {
    app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Rocket Fastify API',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform
})
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})
}
app.register(createCourses);
app.register(getCourses);
app.register(getCoursesById);




export { app };