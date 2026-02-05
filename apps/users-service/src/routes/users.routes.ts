import { Router, type Router as ExpressRouter } from 'express'
import { prisma } from '@repo/db'
import { authenticate, AuthRequest } from '../middleware/auth.middleware.js'

const router: ExpressRouter = Router()

// Get Current User
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ message: 'Unauthenticated' })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      cell: {
        select: {
          id: true,
          name: true,
          zone: {
            select: { name: true },
          },
          community: {
            select: { name: true },
          },
        },
      },
      departments: {
        select: {
          id: true,
          name: true,
          churchTeam: {
            select: { name: true },
          },
        },
      },
      growthRecord: true,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json(user)
})

// Get A User
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  if (req.user!.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
})

// Get All Users
router.get('/all', authenticate, async (req: AuthRequest, res) => {
  if (req.user!.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const user = await prisma.user.findMany({
    select: { id: true, username: true, email: true, role: true },
  })

  res.json(user)
})

// Update User
// router.PATCH

router.get('/debug/users', async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, email: true, role: true },
  })
  res.json(users)
})

export default router
