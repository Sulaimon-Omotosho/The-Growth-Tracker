import {
  Request,
  Response,
  Router,
  type Router as ExpressRouter,
} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '@repo/db'

const router: ExpressRouter = Router()
// CREATE TOKEN
export function issueAccessToken(user: { id: string; role: string }) {
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '24h',
  })
}

// LOGIN
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  // console.log('the email', email)
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(password, user.password as string)
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const accessToken = issueAccessToken({
    id: user.id,
    role: user.role,
  })

  return res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    accessToken,
  })
})

// REGISTER USER
router.post('/register', async (req: Request, res: Response) => {
  const {
    email,
    password,
    firstName,
    lastName,
    provider = 'credentials',
    providerId,
    image,
  } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  if (provider === 'credentials' && !password) {
    return res.status(400).json({ message: 'Password is required' })
  }

  if (provider === 'google' && !providerId) {
    return res.status(400).json({ message: 'Missing Google providerId' })
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' })
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: password ? await bcrypt.hash(password, 13) : null,
      firstName,
      lastName,
      image,
      provider,
      providerId,
      role: 'MEMBER',
    },
  })

  const accessToken = issueAccessToken({
    id: user.id,
    role: user.role,
  })

  return res.status(201).json({
    id: user.id,
    email: user.email,
    role: user.role,
    accessToken,
  })
})

// GOOGLE
router.post('/google', async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, image, providerId } = req.body
    console.log('google:', email)

    if (!email || !providerId) {
      return res.status(400).json({ message: 'Invalid Google payload' })
    }

    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          image,
          provider: 'google',
          providerId,
          role: 'MEMBER',
        },
      })
    }

    const accessToken = issueAccessToken({
      id: user.id,
      role: user.role,
    })

    return res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken,
    })
  } catch (err) {
    console.error('GOOGLE AUTH API ERROR:', err)
    return res.status(500).json({ message: 'Google auth failed' })
  }
})

export default router
