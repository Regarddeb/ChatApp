import { SeenBy } from './chatHistory'
import { User } from './userTypes'

interface ChatBase {
  chat_id: number
  message: string
  has_attachment: boolean
  user_id: bigint
  thread_id: bigint
  reply_to: null | bigint
  created_at: string
  updated_at: string
}

export interface ChatData extends ChatBase {
  attachment: Attachment
  seen_by: SeenBy[] | null
  reply: Reply | null
  user: User | null
  reaction: Reaction[]
}

export interface Chat extends ChatBase {}

export interface Attachment {
  attachment_id: bigint
  chat_id: bigint
  attachment_path: string
  created_at: string
  updated_at: string
}

export interface Reaction {
  reaction_id: bigint
  reaction: string
  chat_id: bigint
  member_id: bigint
}

export interface Reply extends Omit<ChatBase, 'seen_by' | 'reaction'> {
  user: User
}
