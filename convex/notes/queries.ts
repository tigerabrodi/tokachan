import { getAuthUserId } from '@convex-dev/auth/server'
import { ConvexError } from 'convex/values'

import { query } from '../_generated/server'

export const getAllUserNotes = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)

    if (!userId) {
      throw new ConvexError('User not authenticated')
    }

    return await ctx.db
      .query('notes')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
  },
})
