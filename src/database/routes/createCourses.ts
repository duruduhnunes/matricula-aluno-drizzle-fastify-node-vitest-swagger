import z from "zod";
import { db } from "../client.ts";
import { courses } from "../schema.ts";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";


export const createCourses: FastifyPluginAsyncZod = async (app) => {
  app.post("/courses",{
      schema: {
            tags: ["Courses"],
            summary: "Create a new course",
            description: "This endpoint allows you to create a new course with a title and an optional description.",
          body: 
              z.object({
                  title: z.string().min(5, "Title is required"),
                  description: z.string().optional(),
              }),
            response: {
                201: z.object({
                    course: z.object({
                        id: z.string().uuid(),
                        title: z.string(),
                        description: z.string().nullable(),
                    }).describe("The created course object"),
                }),
                400: z.object({
                    message: z.string().describe("Bad request"),
                })
            }

                
      }
  }, async (request, replay) => {
  
      const titleCourse = request.body.title;
      const description = request.body.description;
      const resultt = await db.insert(courses).values({
          title: titleCourse,
          description : description,
          id: crypto.randomUUID(),
  
      })
      .returning();
  
      return replay.status(201).send({ course: resultt[0] });
  })

}