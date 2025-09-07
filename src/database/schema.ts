

import { table } from 'console'
import { pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'
import { id } from 'zod/locales'

export const users = pgTable('users', {
    id: uuid().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
})

export const courses = pgTable('courses', {
    id: uuid().primaryKey(),
    title: text().notNull(),
    description: text(),
})

export const enrollments = pgTable('enrollments', {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid().notNull().references(() => users.id), //se eu colocasse o unique aq, seria duas constraintes separadas. e eu so quero uma, por isso o do uniqueIndex
    courseId: uuid().notNull().references(() => courses.id),
    createAt: timestamp({ withTimezone: true}).notNull().defaultNow()
}, table => [
    uniqueIndex().on(table.userId, table.courseId) //um usuario não pode se inscrever duas vezes no mesmo curso o unique combine os dois campos
])