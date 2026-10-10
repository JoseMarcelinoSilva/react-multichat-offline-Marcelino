type SidebarItemProps = {
  id: string
  isActive: boolean
  onSelect: () => void
  onDelete: () => void
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  )
}

export default function SidebarItem({ id, isActive, onSelect, onDelete }: SidebarItemProps) {
  return (
    <li
      className={`flex items-center gap-2 rounded-lg border-l-4 transition-colors ${
        isActive
          ? 'border-stone-800 bg-stone-200 font-medium text-stone-900'
          : 'border-transparent text-stone-700 hover:bg-stone-100'
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        title={id}
        className="min-w-0 flex-1 cursor-pointer truncate px-3 py-2.5 text-left text-sm"
      >
        {id}
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label="Excluir conversa"
        title="Excluir conversa"
        className="mr-1 shrink-0 cursor-pointer rounded-md p-1.5 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <TrashIcon />
      </button>
    </li>
  )
}
