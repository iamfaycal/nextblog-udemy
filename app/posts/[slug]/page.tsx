"use client"

import PageContainer from "@/components/page-container"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { usePost } from "@/hooks/usePost"
import { Comment } from "@prisma/client"
import axios from "axios"
import { MessageCircle, Eye } from "lucide-react"
import { useSession } from "next-auth/react"
import React, { SyntheticEvent, useState } from "react"
import { useMutation } from "react-query"

export default function SinglePost({ params }: { params: { slug: string } }) {
  const { slug } = params

  const { data: post, isFetching, error } = usePost(slug)

  const { data: session } = useSession()

  const [comment, setComment] = useState("")

  const createComment = (newComment: Partial<Comment>) =>
    axios.post("/api/comments", newComment).then((res) => res.data)

  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: (data: Comment) => window.location.reload(),
  })

  const handlePublish = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!!comment.length && !!post?.id) {
      mutate({
        content: comment,
        postId: post.id,
      })
    }
  }

  if (isFetching) return <p>Loading</p>
  if (error) return <p>Error</p>

  return (
    <PageContainer>
      <div className="p-8">
        <section
          style={
            { "--imageUrl": `url('${post?.image}')` } as React.CSSProperties
          }
          className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-[image:var(--imageUrl)] bg-cover flex items-center justify-center"
        >
          <div className="flex flex-col gap-2 max-w-sm sm:max-w-xl p-4 rounded-lg bg-secondary/70">
            <h2 className="font-bold text-3xl sm:text-5xl text-center">
              {post?.title}
            </h2>
          </div>
        </section>
        <div className="flex justify-between items-center p-3 mb-3">
          <div className="flex justify-center items-center gap-3">
            <Avatar>
              <AvatarImage src={post?.user?.image || ""} />
              <AvatarFallback>
                {post?.user?.name
                  ?.split(" ")
                  .splice(0, 2)
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{post?.user?.name}</p>
              {post?.createdAt && (
                <p className="text-slate-500 text-sm">
                  Posted on {new Date(post?.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1">
              <MessageCircle size={20} />
              <span className=" text-sm">{post?.comments.length}</span>
            </div>
            <div className="flex gap-1">
              <Eye size={20} />
              <span className=" text-sm">{post?.view}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div
          className="py-6"
          dangerouslySetInnerHTML={{ __html: post?.content || "" }}
        />
        <Separator />
        <div className="py-6">
          <h2 className="font-semibold text-2xl text-slate-500 mb-2">
            Comments
          </h2>
          {!!session && (
            <>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-2"
                name="comment"
                placeholder="Any comment"
              />
              <Button
                disabled={isLoading}
                onClick={handlePublish}
                className="bg-gray-500 mb-6"
              >
                {isLoading ? "Loading..." : "Add your comment"}
              </Button>
            </>
          )}
          <div className="flex flex-col gap-4">
            {post?.comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 items-center">
                <Avatar>
                  <AvatarImage src={comment.user?.image || ""} />
                  <AvatarFallback>
                    {comment?.user?.name
                      ?.split(" ")
                      .splice(0, 2)
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2">
                      <span>{comment.user?.name}</span>
                      <span className="text-sm text-slate-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    {comment.content}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
