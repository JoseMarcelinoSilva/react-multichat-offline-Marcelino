import { useChatStore } from '../stores/chatStore'
import SidebarItem from './SidebarItem'

export default function Sidebar() {

  const {
    conversations,
    activeConversationId,
    createConversation,
    selectConversation,
    deleteConversation
  } = useChatStore()

  return (
    <aside className="flex h-dvh w-72 shrink-0 flex-col border-r border-stone-300 bg-white">
      <div className="p-4">
        <button
          type="button"
          onClick={createConversation}
          className="w-full rounded-lg bg-stone-800 px-4 py-2 text-white transition-colors hover:bg-stone-700"
        >
          Nova conversa
        </button>
      </div>

      <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 pb-4">
        {conversations.map((conversation) => (
          <SidebarItem
            key={conversation.id}
            id={conversation.id}
            isActive={conversation.id === activeConversationId}
            onSelect={() => selectConversation(conversation.id)}
            onDelete={() => deleteConversation(conversation.id)}
          />
        ))}
      </ul>
    </aside>
  )
}
