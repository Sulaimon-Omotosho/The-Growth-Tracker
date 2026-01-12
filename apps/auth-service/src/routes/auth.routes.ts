import {
  Request,
  Response,
  Router,
  type Router as ExpressRouter,
} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router: ExpressRouter = Router()

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  console.log('Authorize credentials back:', email, password)

  // TEMP USER
  const user = {
    id: '1',
    email: 'admin@church.com',
    password: await bcrypt.hash('password123', 10),
    role: 'ADMIN',
  }

  if (email !== user.email) {
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

export default router
