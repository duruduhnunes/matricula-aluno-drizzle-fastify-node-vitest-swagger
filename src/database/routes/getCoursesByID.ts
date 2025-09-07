import z from "zod";
import { db } from "../client.ts";
import { courses } from "../schema.ts";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { eq } from "drizzle-orm";

export const getCoursesById: FastifyPluginAsyncZod = async (app) => {
  app.get("/courses/:id", {
    schema: {
      tags: ["Courses"],
      summary: "Get a course by ID",
      description: "This endpoint retrieves a course by its ID.",
      params: z.object({
        id: z.string().uuid("Invalid course ID format"),
      }),
      response: {
        200: z.object({
          course: z.object({
            id: z.string().uuid(),
            title: z.string(),
            description: z.string().nullable(),
          }),
        }),
        404: z.object({ message: z.string() }),
      },
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const [row] = await db
      .select({
        id: courses.id,
        title: courses.title,
        description: courses.description,
      })
      .from(courses)
      .where(eq(courses.id, id))
      .limit(1);

    if (!row) {
      return reply.code(404).send({ message: "Course not found" });
    }

    return reply.send({ course: row });
  });
};
