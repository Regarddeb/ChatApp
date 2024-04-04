import { User } from './userTypes'

export interface LatestChat {
  chat_id: number
  message: string
  has_attachment: number
  user_id: number
  thread_id: number
  reply_to: number | null
  created_at: string
  updated_at: string
  user: User | null
  seen_by: SeenBy[]
}

export interface Thread {
  thread_id: number
  group: number
  member_count: number
  latest_chat: LatestChat
  user: User[]
}

export interface SeenBy {
  seen_by_id: number
  member_id: number
  chat_id: number
  member: Member
}

export interface Member {
  member_id: number
  user_id: number
  thread_id: number
  typing: number
}