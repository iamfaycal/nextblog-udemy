import { AuthOptions, getServerSession } from "next-auth"
import GithubPovider from "next-auth/providers/github"
import GooglePovider from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/connect"

export const authOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubPovider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GooglePovider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
} as AuthOptions

export const getAuthSession = () => getServerSession(authOptions)
