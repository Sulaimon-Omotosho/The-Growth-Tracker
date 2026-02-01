import { prisma } from '@repo/db'
import { UserFormSchema } from '@repo/types'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params

    if (!id) {
      return NextResponse.json({ message: 'User Id missing' }, { status: 400 })
    }

    const body = await req.json()

    const data = UserFormSchema.partial().parse(body)

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined),
    )

    if (!Object.keys(cleanData).length) {
      return NextResponse.json(
        { message: 'No changes provided' },
        { status: 400 },
      )
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: cleanData,
    })

    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
