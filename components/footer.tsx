"use client"

import React from "react"
import PageContainer from "./page-container"
import Link from "next/link"
import { Button } from "./ui/button"
import { useCategories } from "@/hooks/useCategories"

export default function Footer() {
  const { data: categories, isFetching, error } = useCategories()

  return (
    <footer className="p-4 border-t">
      <PageContainer>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600">
            NextBlog
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            {isFetching ? (
              <p>Loading</p>
            ) : (
              categories?.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="block px-2 py-1 text-lg"
                >
                  <Button variant="ghost">{category.title}</Button>
                </Link>
              ))
            )}
            <Link href="/write" className="block px-2 py-1 text-lg">
              <Button variant="ghost">Write a post</Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
}
