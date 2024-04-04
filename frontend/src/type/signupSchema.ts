import { z } from 'zod'

export const signupSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(3, 'Username must be at least 3 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters'),
    password_confirmation: z
      .string({ required_error: 'Password confirmation is required' })
      .min(8, 'Password confirmation must be at least 8 characters')
  })
  .refine(data => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Passwords do not match'
  })
