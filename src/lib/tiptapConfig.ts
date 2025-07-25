import { Ai, getHTMLContentBetween } from '@tiptap-pro/extension-ai'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import StarterKit from '@tiptap/starter-kit'

// Load common languages for syntax highlighting
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

const appId = import.meta.env.VITE_APP_ID as string
const token = import.meta.env.VITE_AI_JWT_TOKEN as string

// Custom AI extension with your commands
const AiExtended = Ai.extend({
  addCommands() {
    return {
      ...this.parent?.(),
      aiSimplify:
        (options = {}) =>
        ({ editor, state }) => {
          const { from, to } = state.selection
          const selectedText = getHTMLContentBetween(editor, from, to)
          return editor.commands.aiTextPrompt({
            text: `Simplify the following text while keeping the main meaning: ${selectedText}`,
            ...options,
          })
        },
      aiShorten:
        (options = {}) =>
        ({ editor, state }) => {
          const { from, to } = state.selection
          const selectedText = getHTMLContentBetween(editor, from, to)
          return editor.commands.aiTextPrompt({
            text: `Make the following text shorter and more concise: ${selectedText}`,
            ...options,
          })
        },
      aiSummarize:
        (options = {}) =>
        ({ editor, state }) => {
          const { from, to } = state.selection
          const selectedText = getHTMLContentBetween(editor, from, to)
          return editor.commands.aiTextPrompt({
            text: `Summarize the following text in 1-2 sentences: ${selectedText}`,
            ...options,
          })
        },
    }
  },
})

export const extensions = [
  StarterKit.configure({
    // Only allow H1-H3 headings
    heading: {
      levels: [1, 2, 3],
    },
    // Disable default code block to use lowlight version
    codeBlock: false,
    // Keep these useful extensions
    // bulletList: true,
    // orderedList: true,
    // blockquote: true,
    // bold: true,
    // italic: true,
    // code: true, // inline code
    // link: true,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: {
      class: 'rounded-md bg-muted/50 p-4 font-mono text-sm border',
    },
    defaultLanguage: 'plaintext',
  }),
  AiExtended.configure({
    appId: appId, // Your Content AI App ID
    token: token, // You'll need to generate this
    autocompletion: true,
  }),
]
