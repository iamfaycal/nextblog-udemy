"use client"

import React from "react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useCategories } from "@/hooks/useCategories"

export default function ResponsiveMenu() {
  const { data: categories, isFetching, error } = useCategories()

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 md:hidden" />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4">
          <Link href="/write">
            <Button variant="ghost">Write a Post</Button>
          </Link>
          <p>Catégories</p>
          {isFetching ? (
            <p>Loading</p>
          ) : (
            categories?.map((category) => (
              <Link
                key={category.id}
                href={`categories/${category.slug}`}
                className="block px-2 py-1 text-lg"
              >
                <Button variant="ghost">{category.title}</Button>
              </Link>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
