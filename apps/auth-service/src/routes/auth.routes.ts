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

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  console.log('the email', email)

  // TEMP USER
  // const user = {
  //   id: '1',
  //   email: 'admin@church.com',
  //   password: await bcrypt.hash('password123', 10),
  //   role: 'ADMIN',
  // }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const accessToken = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  )

  return res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    accessToken,
  })
})

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists!' })
    }

    const hashedPassword = await bcrypt.hash(password, 13)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    const accessToken = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    return res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error!' })
  }
})

export default router
