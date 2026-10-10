import { useState } from 'react'
import { useChatStore } from '../stores/chatStore'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import MobileMenuButton from './MobileMenuButton'
import Sidebar from './Sidebar'

function useActiveConversation() {
  return useChatStore((state) =>
    state.conversations.find((c) => c.id === state.activeConversationId),
  )
}

export default function Chat() {
  const activeConversation = useActiveConversation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-dvh bg-stone-200">
      <MobileMenuButton
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((open) => !open)}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex min-w-0 flex-1 flex-col pt-14 md:pt-0">
        <div className="mx-auto flex h-full min-h-0 w-full max-w-2xl flex-col">
          <MessageList messages={activeConversation?.messages ?? null} />
          <ChatInput disabled={!activeConversation} />
        </div>
      </main>
    </div>
  )
}
