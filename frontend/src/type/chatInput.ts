import z from 'zod'

export const chatInputSchema = z.object({
  message: z.string().min(1)
})

type ChatInput = z.infer<typeof chatInputSchema>

export default ChatInput
