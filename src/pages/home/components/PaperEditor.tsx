// components/PaperEditor.tsx
import { api } from '@convex/_generated/api'
import { Doc } from '@convex/_generated/dataModel'
import { EditorProvider } from '@tiptap/react'
import { useMutation } from 'convex/react'
import debounce from 'lodash.debounce'
import { useEffect, useMemo, useRef, useState } from 'react'

import { BubbleMenuToolbar } from './BubbleMenuToolbar'

import { extensions } from '@/lib/tiptapConfig'

interface PaperEditorProps {
  note: Doc<'notes'>
}

export const PaperEditor = ({ note }: PaperEditorProps) => {
  const updateNote = useMutation(api.notes.mutations.updateNote)
  const [isInitialized, setIsInitialized] = useState(false)
  const hasUnsavedChanges = useRef(false)
  const [localContent, setLocalContent] = useState(note.content || '<p></p>')

  // Sync local content when note.content changes
  useEffect(() => {
    setLocalContent(note.content || '<p></p>')
  }, [note.content])

  // Debounced save function
  const debouncedSave = useMemo(
    () =>
      debounce((content: string) => {
        void updateNote({ noteId: note._id, data: { content } })
        hasUnsavedChanges.current = false
      }, 1000),
    [note._id, updateNote]
  )

  // Flush pending saves on unmount
  useEffect(() => {
    return () => {
      if (hasUnsavedChanges.current) {
        debouncedSave.flush()
      }
    }
  }, [debouncedSave])

  if (note === undefined) {
    return (
      <div className="animate-pulse">
        <div className="bg-muted mb-4 h-4 rounded"></div>
        <div className="bg-muted mb-2 h-4 rounded"></div>
        <div className="bg-muted h-4 w-3/4 rounded"></div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <EditorProvider
        extensions={extensions}
        content={localContent}
        editorProps={{
          attributes: {
            class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px]',
            style: 'font-family: Rubik, sans-serif; line-height: 1.7;',
          },
        }}
        onUpdate={({ editor }) => {
          if (isInitialized) {
            const html = editor.getHTML()
            setLocalContent(html)
            hasUnsavedChanges.current = true
            debouncedSave(html)
          }
        }}
        onCreate={() => setIsInitialized(true)}
      >
        <BubbleMenuToolbar />
      </EditorProvider>
    </div>
  )
}
