import { getAuthUserId } from '@convex-dev/auth/server'
import { Infer } from 'convex/values'

import { mutation } from '../_generated/server'
import { ColorSchema } from '../schema'

type Colors = Infer<typeof ColorSchema>

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
