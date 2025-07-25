import { Doc } from '@convex/_generated/dataModel'
import { motion } from 'motion/react'
import { useState } from 'react'

import { COLORS_MAP } from '@/lib/constants'

type PaperProps = {
  note: Doc<'notes'>
  onClick?: () => void
}

export const PaperThumbnail = ({ note, onClick }: PaperProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const paperLayoutId = `paper-${note._id}`
  const paperHeaderLayoutId = `paper-header-${note._id}`

  return (
    <motion.div
      layoutId={paperLayoutId}
      className="relative cursor-pointer"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="bg-gradient-paper shadow-paper border-paper-border relative h-20 w-16 overflow-hidden rounded-md border p-2"
        layoutId={paperHeaderLayoutId}
        animate={{
          rotateZ: isHovered ? 0 : Math.random() * 6 - 3,
          y: isHovered ? -4 : 0,
        }}
      >
        {/* Mini paper lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted/50 absolute h-px w-full"
            style={{ top: `${8 + i * 6}px`, left: '4px', right: '4px' }}
          />
        ))}

        {/* Color indicator */}
        <motion.div
          // layoutId={paperColorLayoutId}
          className="absolute top-1 left-1 h-2 w-2 rounded-full"
          style={{ backgroundColor: COLORS_MAP[note.color] }}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
        />

        {/* Title preview */}
        <motion.div
          // layoutId={paperTitleLayoutId}
          className="absolute top-4 left-1"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
        >
          <div className="text-foreground/60 truncate text-[6px] font-medium">{note.title}</div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
