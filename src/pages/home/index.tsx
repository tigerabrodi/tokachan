import { api } from '@convex/_generated/api'
import { useQuery } from 'convex/react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { FloatingControls } from './components/FloatingControls'
import { Paper } from './components/Paper'
import { PaperDock } from './components/PaperDock'

export function HomePage() {
  const notes = useQuery(api.notes.queries.getAllUserNotes, {})
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)

  const handlePaperSelect = (id: string) => {
    setActiveNoteId(id)
  }

  const handleClosePaper = () => {
    setActiveNoteId(null)
  }

  const activeNote = notes?.find((note) => note._id === activeNoteId)

  return (
    <div className="bg-gradient-bg font-rubik flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <motion.div
        key="welcome"
        className="max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="bg-gradient-playful mb-2 bg-clip-text text-6xl font-bold text-transparent"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            type: 'spring',
            bounce: 0.3,
          }}
        >
          Paper Notes
        </motion.h1>
        <motion.p
          className="text-muted-foreground mb-5 text-xl"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.2 }}
        >
          Your thoughts, beautifully organized on digital paper
        </motion.p>
        <motion.div
          className="text-muted-foreground flex items-center justify-center gap-4 text-sm"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', bounce: 0.2 }}
        >
          <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
          <span>Select a paper from the dock below to start writing</span>
          <div className="bg-accent h-2 w-2 animate-pulse rounded-full" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {activeNoteId && activeNote && <Paper key={activeNoteId} note={activeNote} />}
      </AnimatePresence>

      {/* Paper dock */}
      <PaperDock notes={notes ?? []} activeNoteId={activeNoteId} onNoteSelect={handlePaperSelect} />

      {/* Floating controls when paper is active */}
      <AnimatePresence>
        {activeNoteId && <FloatingControls onClose={handleClosePaper} />}
      </AnimatePresence>
    </div>
  )
}
