import { writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export const POST = async (req: NextRequest) => {
  const data = await req.formData()
  const file: File | null = data.get("file") as unknown as File

  if (!file) {
    return NextResponse.json({ message: "no file" }, { status: 500 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const imageURL = `/images/${new Date().getTime()}_${file.name}`
  const imagePath = path.join(process.cwd(), `/public${imageURL}`)

  try {
    await writeFile(imagePath, buffer)
    return NextResponse.json(imageURL, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
