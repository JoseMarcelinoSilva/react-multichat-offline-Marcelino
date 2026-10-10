import { useChatStore } from '../stores/chatStore'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import Sidebar from './Sidebar'

function useActiveConversation() {
  return useChatStore((state) =>
    state.conversations.find((c) => c.id === state.activeConversationId),
  )
}

export default function Chat() {
  const activeConversation = useActiveConversation()

  return (
    <div className="flex h-dvh bg-stone-200">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto flex h-full w-full max-w-2xl flex-col">
          <MessageList messages={activeConversation?.messages ?? null} />
          <ChatInput disabled={!activeConversation} />
        </div>
      </main>
    </div>
  )
}
