import { Doc } from '@convex/_generated/dataModel'
import { motion } from 'motion/react'

type PaperProps = {
  note: Doc<'notes'>
}

export const Paper = ({ note }: PaperProps) => {
  const paperLayoutId = `paper-${note._id}`
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        layoutId={paperLayoutId}
        className="bg-gradient-paper shadow-paper border-paper-border rounded-lg border p-8"
        style={{
          // A4 proportions scaled down to fit screen
          maxWidth: '420px',
          maxHeight: '594px',
          aspectRatio: '210/297',
        }}
        initial={{ scale: 0.2, y: 300 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.2, y: 300, transition: { duration: 0.1 } }}
        transition={{
          type: 'spring',
          damping: 26,
          stiffness: 300,
        }}
      >
        {/* Paper punch holes */}
        <div className="absolute top-0 bottom-0 left-3 flex flex-col justify-evenly">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-background border-muted h-4 w-4 rounded-full border-2" />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full">
          <div className="mb-6">
            <motion.div
              className="mb-2 h-6 w-6 rounded-full"
              style={{ backgroundColor: note.color }}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.h1
              className="text-foreground font-rubik text-2xl font-semibold"
              initial={{ scale: 0.2, filter: 'blur(40px)' }}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.2 }}
            >
              {note.title}
            </motion.h1>
          </div>

          <motion.div className="prose prose-slate max-w-none">
            <motion.p
              className="text-foreground/80 font-rubik leading-relaxed whitespace-pre-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {note.content}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
