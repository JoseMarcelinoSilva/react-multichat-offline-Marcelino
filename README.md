# Chat Offline Multi-conversa

Aplicação de chat offline com **várias conversas independentes**. O usuário cria, seleciona e exclui conversas por um sidebar à esquerda e envia mensagens alternando entre dois remetentes: **usuário** (alinhado à direita) e **robô** (alinhado à esquerda).

As conversas e suas mensagens ficam no `localStorage`. A conversa selecionada e o remetente ativo não são gravados: ao recarregar a página, a lista volta, nenhuma conversa fica selecionada e o remetente retorna para usuário.

## Funcionalidades

- **Múltiplas conversas** — cada uma com o próprio histórico, identificada pelo UUID
- **Sidebar** — lista da mais antiga à mais recente, com destaque da conversa ativa
- **Nova conversa** — cria uma conversa vazia e a seleciona automaticamente
- **Excluir conversa** — ícone em cada item, sem confirmação; se a excluída era a ativa, a área principal volta ao estado vazio
- **Persistência local** — conversas e mensagens salvas no `localStorage` (chave `chat-storage`)
- **Dois remetentes** — toggle global: vale para qualquer conversa e permanece ao trocar de conversa (padrão: usuário)
- **Input condicional** — desabilitado (opacidade 50%) quando não há conversa ativa
- **Layout responsivo** — sidebar fixo no desktop; no mobile, drawer com botão hamburger e backdrop
- **Área do chat** — container centralizado (`max-w-2xl`) em fundo marrom claro
- **Input fixo no rodapé** — card branco permanece visível durante o scroll do histórico
- **Textarea dinâmico** — altura ajusta conforme o conteúdo (mín. 1 linha, máx. ~6 linhas)
- **Atalhos de teclado** — `Enter` envia; `Shift + Enter` insere quebra de linha
- **Estados vazios** — sem conversa ativa, sem conversas no sidebar e conversa sem mensagens
- **Auto-scroll** — rola automaticamente para a última mensagem ao enviar ou trocar de conversa
- **Modo robô** — borda roxa no card de input quando o remetente ativo é o robô

## Stack

| Tecnologia | Uso |
|---|---|
| [Vite](https://vite.dev/) | Build e dev server |
| [React 19](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilização |
| [Zustand](https://zustand.docs.pmnd.rs/) | Estado global e persistência |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter) | Lint |

## Como executar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Uso

1. Clique em **Nova conversa** no sidebar (no mobile, abra o menu pelo botão no canto superior esquerdo).
2. Digite uma mensagem no campo de texto na parte inferior da tela.
3. Use o toggle à esquerda para alternar entre **Usuário** e **Robô** antes de enviar.
4. Envie com `Enter` ou pelo botão à direita (desabilitado quando o campo está vazio ou não há conversa ativa).
5. Mensagens do usuário aparecem alinhadas à direita; mensagens do robô, à esquerda.
6. Troque de conversa pelo sidebar para ver o histórico correspondente. Exclua uma conversa pelo ícone de lixeira.

No mobile, o sidebar fecha sozinho ao criar ou selecionar uma conversa. Um toque no fundo escurecido também o fecha.

## Estrutura do projeto

```
src/
├── types/
│   ├── message.ts            # Sender, Message
│   └── conversation.ts       # Conversation
├── stores/
│   └── chatStore.ts          # Zustand: conversas, ativa, sender e persistência
├── components/
│   ├── Chat.tsx              # Layout: sidebar + área do chat
│   ├── Sidebar.tsx           # Lista, nova conversa e drawer mobile
│   ├── SidebarItem.tsx       # Item (ID + excluir)
│   ├── MobileMenuButton.tsx  # Botão hamburger
│   ├── MessageList.tsx       # Lista, estados vazios e auto-scroll
│   ├── MessageBubble.tsx     # Bolha individual
│   ├── ChatInput.tsx         # Card fixo: toggle + textarea + enviar
│   └── SenderToggle.tsx      # Alternância usuário/robô
├── App.tsx                   # Renderiza <Chat />
└── index.css                 # Import do Tailwind
```

### Modelo de dados

```ts
type Sender = 'user' | 'robot'

type Message = {
  id: string
  text: string
  sender: Sender
}

type Conversation = {
  id: string
  messages: Message[]
}
```

A store guarda `conversations`, `activeConversationId` e `sender`. Só `conversations` entra no `localStorage`.

## Fora de escopo

- Backend ou sincronização entre dispositivos
- Autenticação
- Edição ou exclusão de mensagens individuais
- Renomear conversas (a identificação é o próprio ID)
- Persistência da conversa ativa e do remetente selecionado
- Horários, rótulos de remetente ou cabeçalho do chat
- Markdown, anexos ou formatação rica (apenas texto plano)
- Busca ou filtros de conversas
- Confirmação antes de excluir uma conversa

## Documentação

- Especificação do multi-chat: [.docs/features/multi-chat/prd.md](.docs/features/multi-chat/prd.md)
- Especificação do chat único (envio, bolhas e atalhos): [.docs/prd.md](.docs/prd.md)
