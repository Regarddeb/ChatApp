import z from "zod";

export const chatInputSchema = z.object({
  message: z.string(),
});

type ChatInput = z.infer<typeof chatInputSchema>;

export default ChatInput;
