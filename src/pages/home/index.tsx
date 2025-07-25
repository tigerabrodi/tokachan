import { api } from '@convex/_generated/api'
import { Id } from '@convex/_generated/dataModel'
import { Colors } from '@convex/notes/mutations'
import { useMutation, useQuery } from 'convex/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { FloatingControls } from './components/FloatingControls'
import { Paper } from './components/Paper'
import { PaperDock } from './components/PaperDock'

export function HomePage() {
  const notes = useQuery(api.notes.queries.getAllUserNotes, {})
  const [activeNoteId, setActiveNoteId] = useState<Id<'notes'> | null>(null)
  const updateNoteColor = useMutation(api.notes.mutations.updateNote).withOptimisticUpdate(
    (localStore, args) => {
      const color = args.data.color

      if (!color) {
        return localStore
      }

      const existingNotes = localStore.getQuery(api.notes.queries.getAllUserNotes, {}) || []
      const note = existingNotes.find((note) => note._id === activeNoteId)

      if (note) {
        const newNote = { ...note, color }
        const allNewNotes = existingNotes.map((n) => (n._id === activeNoteId ? newNote : n))
        localStore.setQuery(api.notes.queries.getAllUserNotes, {}, allNewNotes)
      }
      return localStore
    }
  )

  // Refs for click-outside logic
  const paperRef = useRef<HTMLDivElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)

  const handlePaperSelect = (id: Id<'notes'>) => {
    setActiveNoteId(id)
  }

  const handleClosePaper = () => {
    setActiveNoteId(null)
  }

  const handleColorChange = (color: Colors) => {
    if (activeNoteId) {
      void updateNoteColor({ noteId: activeNoteId, data: { color } })
    }
  }

  // Click outside handler
  useEffect(() => {
    if (!activeNoteId) return
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (
        paperRef.current &&
        !paperRef.current.contains(target) &&
        floatingRef.current &&
        !floatingRef.current.contains(target)
      ) {
        handleClosePaper()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeNoteId])

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
          Tokachan
        </motion.h1>
        <motion.p
          className="text-muted-foreground mb-5 text-xl"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.2 }}
        >
          Your thoughts, beautifully organized on digital paper.
        </motion.p>
        <motion.div
          className="text-muted-foreground flex items-center justify-center gap-4 text-sm"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', bounce: 0.2 }}
        >
          <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
          <span>Select or create a paper from the dock below to start writing</span>
          <div className="bg-accent h-2 w-2 animate-pulse rounded-full" />
        </motion.div>
      </motion.div>

      {activeNoteId && activeNote && <div className="bg-background/50 absolute inset-0" />}

      <AnimatePresence>
        {activeNoteId && activeNote && (
          <Paper key={activeNoteId} note={activeNote} paperRef={paperRef} />
        )}
      </AnimatePresence>

      {/* Paper dock */}
      <PaperDock notes={notes ?? []} activeNoteId={activeNoteId} onNoteSelect={handlePaperSelect} />

      {/* Floating controls when paper is active */}
      <AnimatePresence>
        {activeNoteId && (
          <FloatingControls
            onClose={handleClosePaper}
            floatingRef={floatingRef}
            onColorChange={handleColorChange}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
