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
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-72 shrink-0 flex-col border-r border-stone-300 bg-white pt-14 transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:pt-0 md:shadow-none ${
          isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-stone-200 p-4">
          <button
            type="button"
            onClick={handleCreate}
            className="w-full cursor-pointer rounded-lg bg-stone-800 px-4 py-2.5 font-medium text-white transition-colors hover:bg-stone-700 active:bg-stone-900"
          >
            Nova conversa
          </button>
        </div>

        {conversations.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-stone-500">
            Nenhuma conversa ainda
          </p>
        )}

        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
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
