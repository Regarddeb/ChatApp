import z from 'zod'

export const loginSchema = z.object({
  email_username: z.string(),
  password: z.string(),
  remember_me: z.boolean().nullable()
})

type LoginValues = z.infer<typeof loginSchema>

export default LoginValues
