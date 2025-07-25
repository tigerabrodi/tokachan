import { getAuthUserId } from '@convex-dev/auth/server'
import { ConvexError, Infer, v } from 'convex/values'

import { mutation } from '../_generated/server'
import { ColorSchema } from '../schema'

export type Colors = Infer<typeof ColorSchema>

export const createNote = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw new Error('User not authenticated')
    }

    const defaultColor: Colors = 'Ocean'

    const note = await ctx.db.insert('notes', {
      title: 'Untitled',
      color: defaultColor,
      content: '',
      userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    return note
  },
})

export const updateNote = mutation({
  args: {
    noteId: v.id('notes'),
    data: v.object({
      title: v.optional(v.string()),
      content: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw new Error('User not authenticated')
    }

    const { data } = args

    const note = await ctx.db.get(args.noteId)
    if (!note) {
      throw new ConvexError('Note not found')
    }

    if (note.userId !== userId) {
      throw new ConvexError('User does not have permission to update this note')
    }

    await ctx.db.patch(args.noteId, {
      ...data,
      updatedAt: Date.now(),
    })
  },
})
