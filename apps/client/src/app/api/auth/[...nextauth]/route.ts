import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

const handler = NextAuth({
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
        console.log('CREDENTIALS', credentials)

        if (!credentials?.email || !credentials?.password) return null

        const res = await fetch('http://localhost:8000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        if (!res.ok) {
          console.error('Login failed!')
          return null
        }

        const data = await res.json()

        if (!data?.id) {
          console.error('Invalid user object', data)
          return null
        }

        return {
          id: data.id,
          email: data.email,
          role: data.role,
          accessToken: data.accessToken,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.accessToken = user.accessToken
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
})

export { handler as GET, handler as POST }
