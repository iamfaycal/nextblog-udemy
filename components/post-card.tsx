import React from "react"
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"
import Image from "next/image"
import { Badge } from "./ui/badge"
import { MessageCircle, Eye } from "lucide-react"
import Link from "next/link"
import { PostWithCategoryAndComments } from "@/types"

export default function PostCard({
  post,
}: {
  post: PostWithCategoryAndComments
}) {
  return (
    <Link href={`/posts/${post?.slug}`}>
      <Card className="flex-grow h-full">
        <CardHeader>
          <div className="relative aspect-square overflow-hidden">
            <Image
              className="aspect-square object-cover transition-all duration-300 hover:scale-110"
              alt={post?.title}
              src={post?.image || ""}
              fill
            />
          </div>
          <h3 className="font-semibold">{post?.title}</h3>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">{post?.cat?.title}</Badge>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <div className="flex gap-1">
              <MessageCircle size={20} className="text-slate-500" />
              <span className="text-slate-500 text-sm">
                {post?.comments.length}
              </span>
            </div>
            <div className="flex gap-1">
              <Eye size={20} className="text-slate-500" />
              <span className="text-slate-500 text-sm">{post?.view}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
