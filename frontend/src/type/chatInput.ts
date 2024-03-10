import z from "zod";

export const chatInputSchema = z.object({
  attachment: z.instanceof(File).nullable(),
  message: z.string(),
});

type ChatInput = z.infer<typeof chatInputSchema>;

export default ChatInput;
