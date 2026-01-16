import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { prisma } from '@repo/db'

// const handler = NextAuth({
export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  debug: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    Credentials({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        const res = await fetch('http://localhost:8000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })

        if (!res.ok) return null

        const user = await res.json()

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          accessToken: user.accessToken,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const email = user.email as string

        const existingUser = await prisma.user.findUnique({
          where: { email },
        })

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email,
              image: user.image,
              provider: 'google',
              providerId: account.providerAccountId,
              // role: 'MEMBER',
            },
          })
        }
      }
      return true
    },

    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
