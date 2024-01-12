import PageContainer from "@/components/page-container"
import PageTitle from "@/components/page-title"
import PostsList from "@/components/posts-list"
import React from "react"

type CategoryPageProps = {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  return (
    <PageContainer>
      <div className="py-10 px-4">
        <PageTitle>{slug.replace("-", " ")}</PageTitle>
        <PostsList category={slug} />
      </div>
    </PageContainer>
  )
}
