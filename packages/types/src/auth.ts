import z from 'zod'

export const UserFormSchema = z.object({
  firstName: z
    .string({ message: 'First Name is required!' })
    .min(2, { message: 'First Name must be at least 2 characters!' })
    .max(50)
    .optional(),
  lastName: z
    .string({ message: 'Last Name is required!' })
    .min(2, { message: 'Last Name must be at least 2 characters!' })
    .max(50)
    .optional(),
  username: z
    .string({ message: 'Username is required!' })
    .min(2, { message: 'Username must be at least 2 characters!' })
    .max(50)
    .optional(),
  email: z.email({ message: 'Email address is required!' }),
  password: z
    .string({ message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' })
    .max(50),
})

export const UserLoginSchema = z.object({
  email: z.email({ message: 'Email address is required!' }),
  password: z
    .string({ message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' })
    .max(50),
})

export const UserSignUpSchema = z.object({
  username: z
    .string({ message: 'Username is required!' })
    .min(2, { message: 'Username must be at least 2 characters!' })
    .max(50),
  email: z.email({ message: 'Email address is required!' }),
  password: z
    .string({ message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' })
    .max(50),
})
