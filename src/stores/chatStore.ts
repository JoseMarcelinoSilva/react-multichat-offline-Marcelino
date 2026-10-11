import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Conversation } from '../types/conversation'
import type { Message, Sender } from '../types/message'

type ChatState = {
  conversations: Conversation[]
  activeConversationId: string | null
  sender: Sender
  createConversation: () => void
  selectConversation: (id: string) => void
  deleteConversation: (id: string) => void
  addMessage: (text: string) => void
  toggleSender: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      sender: 'user',

      createConversation: () => {
        const conversation: Conversation = {
          id: crypto.randomUUID(),
          messages: [],
        }

        set({
          conversations: [...get().conversations, conversation],
          activeConversationId: conversation.id,
        })
      },

      selectConversation: (id) => {
        const exists = get().conversations.some((c) => c.id === id)

        if (!exists) return

        set({ activeConversationId: id })
      },

      deleteConversation: (id) => {
        const { conversations, activeConversationId } = get()

        set({
          conversations: conversations.filter((c) => c.id !== id),
          activeConversationId:
            activeConversationId === id ? null : activeConversationId,
        })
      },

      addMessage: (text) => {
        const { conversations, activeConversationId, sender } = get()
        const trimmedText = text.trim()

        if (!activeConversationId || !trimmedText) return

        const message: Message = {
          id: crypto.randomUUID(),
          text: trimmedText,
          sender,
        }

        set({
          conversations: conversations.map((c) =>
            c.id === activeConversationId
              ? { ...c, messages: [...c.messages, message] }
              : c,
          ),
        })
      },

      toggleSender: () => {
        set({ sender: get().sender === 'user' ? 'robot' : 'user' })
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ conversations: state.conversations }),
    },
  ),
)
