import { Prisma } from "@prisma/client"

export type PostWithCategoryAndComments = Prisma.PostGetPayload<{
  include: { comments: true; cat: true }
}>

export type PostWithUserAndComments = Prisma.PostGetPayload<{
  include: { user: true; comments: { include: { user: true } } }
}>
