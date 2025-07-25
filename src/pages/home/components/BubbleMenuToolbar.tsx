import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Sparkles,
} from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const BubbleMenuToolbar = () => {
  const { editor } = useCurrentEditor()
  const containerRef = useRef<HTMLElement>(null)

  const editorState = useEditorState({
    editor,

    selector: ({ editor }) => {
      if (!editor) return null

      return {
        isAiGenerating: editor.storage.ai.state === 'loading',
      }
    },
  })

  if (!editor) return null

  const isAiGenerating = editorState?.isAiGenerating ?? false

  const runAICommand = (command: string) => {
    if (!editor) return

    switch (command) {
      case 'simplify':
        editor.chain().focus().aiSimplify().run()
        break
      case 'shorten':
        editor.chain().focus().aiShorten().run()
        break
      case 'summarize':
        editor.chain().focus().aiSummarize().run()
        break
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href as string
    const url = window.prompt('URL', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <BubbleMenu
      editor={editor}
      options={{
        placement: 'top',
      }}
    >
      <div
        ref={containerRef as React.Ref<HTMLDivElement>}
        className="bg-card flex items-center gap-1 rounded-lg border p-2 shadow-lg backdrop-blur-sm"
      >
        {/* Text Formatting */}
        <Button
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={isAiGenerating}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={isAiGenerating}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive('code') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={isAiGenerating}
        >
          <Code className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive('link') ? 'default' : 'ghost'}
          size="sm"
          onClick={setLink}
          disabled={isAiGenerating}
        >
          <Link className="h-4 w-4" />
        </Button>

        <div className="bg-border mx-1 h-6 w-px" />

        {/* Block Formatting */}
        <Button
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          disabled={isAiGenerating}
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={isAiGenerating}
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={isAiGenerating}
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={isAiGenerating}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={isAiGenerating}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={isAiGenerating}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <div className="bg-border mx-1 h-6 w-px" />

        {/* AI Dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onMouseDown={(e) => e.preventDefault()}
              disabled={isAiGenerating}
            >
              {isAiGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" container={containerRef.current}>
            <DropdownMenuItem onClick={() => runAICommand('simplify')} disabled={isAiGenerating}>
              <Sparkles className="mr-2 h-4 w-4" />
              Simplify
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => runAICommand('shorten')} disabled={isAiGenerating}>
              <Sparkles className="mr-2 h-4 w-4" />
              Shorten
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => runAICommand('summarize')} disabled={isAiGenerating}>
              <Sparkles className="mr-2 h-4 w-4" />
              Summarize
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </BubbleMenu>
  )
}
