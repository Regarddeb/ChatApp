import z from 'zod'

export const loginSchema = z.object({
  email_username: z.string({ required_error: 'Email or username is required' }),
  password: z.string({ required_error: 'Password is required' }),
  remember_me: z.boolean().nullable()
})

type LoginValues = z.infer<typeof loginSchema>

export default LoginValues
