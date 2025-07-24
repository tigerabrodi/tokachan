import { Doc } from '@convex/_generated/dataModel'
import { PlusIcon } from 'lucide-react'
import { motion } from 'motion/react'

import { PaperThumbnail } from './PaperThumbnail'

interface PaperDockProps {
  notes: Array<Doc<'notes'>>
  activeNoteId: string | null
  onNoteSelect: (id: string) => void
}

export const PaperDock = ({ notes, activeNoteId, onNoteSelect }: PaperDockProps) => {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 transform"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
    >
      <div className="bg-paper/90 border-paper-border shadow-dock rounded-2xl border p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {notes.map((note, index) => (
            <motion.div
              key={note._id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.5 + index * 0.1,
                type: 'spring',
                damping: 20,
                stiffness: 300,
              }}
            >
              {activeNoteId !== note._id && (
                <PaperThumbnail note={note} onClick={() => onNoteSelect(note._id)} />
              )}
            </motion.div>
          ))}

          {/* Add new paper button */}
          <motion.button
            className="border-primary/40 hover:border-primary/60 hover:bg-primary/5 flex h-20 w-16 items-center justify-center rounded-md border-2 border-dashed transition-colors"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              // delay since this will be last item
              delay: 0.5 + notes.length * 0.1,
              type: 'spring',
              damping: 20,
              stiffness: 300,
            }}
          >
            <div className="bg-gradient-playful text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full">
              <PlusIcon className="h-4 w-4" strokeWidth={3} />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
