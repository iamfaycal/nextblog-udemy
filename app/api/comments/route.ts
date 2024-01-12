import { getAuthSession } from "@/lib/authOptions"
import { NextRequest, NextResponse } from "next/server"

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
    const post = await prisma.comment.create({
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
