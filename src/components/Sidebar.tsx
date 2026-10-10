import { useChatStore } from '../stores/chatStore'
import SidebarItem from './SidebarItem'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {

  const {
    conversations,
    activeConversationId,
    createConversation,
    selectConversation,
    deleteConversation
  } = useChatStore()

  function handleCreate() {
    createConversation()
    onClose()
  }

  function handleSelect(id: string) {
    selectConversation(id)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-72 shrink-0 flex-col border-r border-stone-300 bg-white pt-14 md:static md:translate-x-0 md:pt-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <button
            type="button"
            onClick={handleCreate}
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
              onSelect={() => handleSelect(conversation.id)}
              onDelete={() => deleteConversation(conversation.id)}
            />
          ))}
        </ul>
      </aside>
    </>
  )
}
