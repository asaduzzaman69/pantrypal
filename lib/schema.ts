import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const recipesTable = pgTable('recipes_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  userId: text('user_id').notNull(),
})

export type InsertRecipe = typeof recipesTable.$inferInsert
export type SelectRecipe = typeof recipesTable.$inferSelect
