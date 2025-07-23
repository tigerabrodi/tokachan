import { authTables } from '@convex-dev/auth/server'
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

// Define the schema for the application
export default defineSchema({
  // Include Convex Auth tables
  ...authTables,

  // Users table (extends the auth user)
  users: defineTable({
    email: v.string(),
    updatedAt: v.number(),
  }).index('by_email', ['email']),

  // Notes table
  notes: defineTable({
    title: v.string(),
    content: v.string(), // HTML from Tiptap
    userId: v.id('users'),
    createdAt: v.number(),
    updatedAt: v.number(),
    color: v.string(), // For colored note cards
    // isArchived: v.optional(v.boolean()),
  })
    .index('by_user', ['userId'])
    .index('by_user_updated', ['userId', 'updatedAt']),
})
