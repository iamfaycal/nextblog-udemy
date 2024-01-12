import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/connect"
import { getAuthSession } from "@/lib/authOptions"

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const category = searchParams.get("category")
  // query is "hello" for /api/search?query=hello

  try {
    const post = await prisma.post.findMany({
      where: { catSlug: category || undefined },
      include: { comments: true, cat: true },
    })
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    )
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const session = await getAuthSession()

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 403 }
      )
    }

    const body = await req.json()
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    })
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    )
  }
}
