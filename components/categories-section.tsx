"use client"

import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"
import { useCategories } from "@/hooks/useCategories"

export default function CategoriesSection() {
  const { data: categories, isFetching, error } = useCategories()

  if (isFetching) return <p>Loading</p>
  if (error) return <p>Error</p>

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-4 py-6">
      {categories?.map((category) => (
        <Link key={category.id} href={`categories/${category.slug}`}>
          <Button variant="outline">{category.title}</Button>
        </Link>
      ))}
    </section>
  )
}
