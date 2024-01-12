"use client"

import React from "react"
import PostCard from "./post-card"
import { usePosts } from "@/hooks/usePosts"

export default function PostsList({ category }: { category?: string }) {
  const { data: posts, isFetching, error } = usePosts(category)

  if (isFetching) return <p>Loading</p>
  if (error) return <p>Error</p>

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  )
}
