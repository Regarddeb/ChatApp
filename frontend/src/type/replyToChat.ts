export interface ReplyToChat {
  chat_id: number
  user_id: number
  message: string
  has_attachment: number
  username: string | null
}

export const replyToInitial = {
  chat_id: 0,
  user_id: 0,
  message: '',
  has_attachment: 0,
  username: null
}
