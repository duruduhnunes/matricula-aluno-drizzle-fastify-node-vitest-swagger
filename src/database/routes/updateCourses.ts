import { FastifyPluginAsync } from "fastify";
import z from "zod";
import { db } from "../client.ts";
import { courses } from "../schema.ts";
import { eq } from "drizzle-orm";




export const updateCourses: FastifyPluginAsync = async (app) => {
    app.put("/courses/:id", {

        schema: {
            body: 
                z.object({
                    title: z.string().min(5, "Title must be at least 5 characters long"),
                    description: z.string().optional(),
                })
            
        }
    }, async (request, reply) => {
      const { id } = request.params as { id: string };
      const { title, description } = request.body as { title: string; description?: string};

      if(!id){
        return reply.code(400).send({message: "ID is required"});
      }
      const [course] = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
        if(!course){
            return reply.code(404).send({message: "Course not found"});
        }
  

       // Lógica para atualizar o curso no banco de dados
        const updateCoursesResult = await db.update(courses).set({
            title,
            description
        }).where(eq(courses.id, id)).returning()
        return reply.code(200).send({ message: "Course updated successfully", course: updateCoursesResult }); 

    })
}