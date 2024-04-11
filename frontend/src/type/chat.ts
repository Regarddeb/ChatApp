import { Member, SeenBy } from './chatHistory'
import { User } from './userTypes'

interface ChatBase {
  chat_id: number
  message: string
  has_attachment: boolean
  user_id: number
  thread_id: number
  reply_to: null | number
  created_at: string
  updated_at: string
}

export interface ChatData extends ChatBase {
  attachment: Attachment
  seen_by: SeenBy[] | null
  reply: Reply | null
  user: User | null
  reaction: Reaction[]
  thread: Thread
}

export interface Chat extends ChatBase {}

export interface Attachment {
  attachment_id: number
  chat_id: number
  attachment_path: string
  created_at: string
  updated_at: string
}

export interface Reaction {
  reaction_id: number
  reaction: string
  chat_id: number
  member_id: number
}

export interface Reply extends Omit<ChatBase, 'seen_by' | 'reaction'> {
  user: User
}

interface Thread {
  thread_id: number
  group: number
  member_count: number
  member: Member[]
}