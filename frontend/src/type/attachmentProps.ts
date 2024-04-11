import { Attachment, Reaction } from "@type/chat"

export interface AttachmentProps {
  attachment: Attachment
  chat_id: number
  message: string
  reactions: Reaction[]
}
