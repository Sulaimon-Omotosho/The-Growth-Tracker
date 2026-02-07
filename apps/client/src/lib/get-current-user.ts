// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { prisma } from '@repo/db'
// import { getServerSession } from 'next-auth'

// export async function getCurrentUser() {
//   const session = await getServerSession(authOptions)
//   if (!session?.user?.email) return null

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//     include: {
//       cell: {
//         select: {
//           id: true,
//           name: true,
//           zone: {
//             select: { name: true },
//           },
//           community: {
//             select: { name: true },
//           },
//         },
//       },
//       departments: {
//         select: {
//           id: true,
//           name: true,
//           churchTeam: {
//             select: { name: true },
//           },
//         },
//       },
//       growthRecord: true,
//     },
//   })
//   return user
// }
