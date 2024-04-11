import { Reaction } from '@type/chat'

export interface ButtonsProps {
  chat_id: number
  message: string
  reactions: Reaction[]
  has_attachment: number
  user_id: number
  username: string | null
}
