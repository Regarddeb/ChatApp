import { User } from "./userTypes";

interface LatestChat {
  chat_id: number
  message: string
  has_attachment: number
  user_id: number
  thread_id: number
  reply_to: number | null
  created_at: string
  updated_at: string
  user: User | null 
}

export interface Thread {
  thread_id: number
  group: number
  member_count: number
  latest_chat: LatestChat
  user: User[]
}
