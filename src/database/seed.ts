import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";

async function seed() {
  const usersInsert = await db
    .insert(users)
    .values([
      { id: crypto.randomUUID(), name: "Alice", email: "alice@gmail.com" },
      { id: crypto.randomUUID(), name: "Bob", email: "bob@gmail.com" },
      { id: crypto.randomUUID(), name: "Charlie", email: "charlie@gmail.com" },
    ])
    .returning(); //o returning é usado para retornar os dados inseridos

  const coursesInsert = await db.insert(courses).values([
    {
      id: crypto.randomUUID(),
      title: "Curso de Node.js",
      description: "Aprenda Node.js do zero",
    },
    {
      id: crypto.randomUUID(),
      title: "Curso de React",
      description: "Aprenda React do zero",
    },
  ]).returning()

   await db.insert(enrollments).values([
    {
        id: crypto.randomUUID(),
        courseId: coursesInsert[0].id,
        userId: usersInsert[0].id
    },
    {
        id: crypto.randomUUID(),
        courseId: coursesInsert[0].id,
        userId: usersInsert[1].id
    },
    {
        id: crypto.randomUUID(),
        courseId: coursesInsert[1].id,
        userId: usersInsert[2].id
    },

  ])
}

seed();
