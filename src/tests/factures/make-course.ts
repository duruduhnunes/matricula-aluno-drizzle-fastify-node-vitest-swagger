import { db } from "../../database/client.ts";
import { courses } from "../../database/schema.ts";
import { faker } from '@faker-js/faker';



export async function makeCourse(title?: string) {
    const [course]= await db.insert(courses).values({
        id: crypto.randomUUID(),
      title: title ?? faker.person.fullName(),
        description: 'Aprenda Node.js do zero'
    }).returning()
    return course
}