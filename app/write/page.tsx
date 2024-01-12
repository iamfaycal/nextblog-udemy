"use client"

import PageContainer from "@/components/page-container"
import PageTitle from "@/components/page-title"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategories } from "@/hooks/useCategories"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, {
  ReactEventHandler,
  SyntheticEvent,
  useLayoutEffect,
  useState,
} from "react"

import { Button } from "@/components/ui/button"
import { useMutation } from "react-query"
import { Post } from "@prisma/client"
import axios from "axios"
import { slugify } from "@/utils/slugify"
import Image from "next/image"

import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function WritePost() {
  const { data: session } = useSession()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [catSlug, setCatSlug] = useState("")
  const [content, setContent] = useState("")

  const [file, setFile] = useState<File>()
  const [imageObjectURL, setImageObjectURL] = useState<string | null>(null)

  const { data: categories, isFetching } = useCategories()

  const onChangeFile = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files

    if (!files || !files[0]) return

    setFile(files[0])
    setImageObjectURL(URL.createObjectURL(files[0]))
  }

  const uploadImage = async () => {
    try {
      if (!file) return

      const formData = new FormData()
      formData.set("file", file)

      const res = await axios.post("/api/upload", formData)
      return res.data
    } catch (error) {
      console.error("Error on image upload", error)
    }
  }

  const createPost = (newPost: Partial<Post>) =>
    axios.post("/api/posts", newPost).then((res) => res.data)

  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: (data: Post) => {
      router.push(`/posts/${data.slug}`)
    },
  })

  const handlePublish = async (e: SyntheticEvent) => {
    e.preventDefault()
    const image = await uploadImage()
    console.log(image)
    if (
      !!title.length &&
      !!catSlug.length &&
      !!content.length &&
      !!image.length
    ) {
      mutate({
        title,
        content,
        catSlug,
        slug: slugify(title),
        image,
      })
    }
  }

  useLayoutEffect(() => {
    if (!session) {
      router.replace("/login")
      return
    }
  }, [router, session])

  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle>Write a Post</PageTitle>
        <div className="mb-6">
          {imageObjectURL && (
            <div className="relative w-40 h-40 mx-auto mb-2">
              <Image
                alt="banner"
                src={imageObjectURL}
                fill
                className="object-cover"
              />
            </div>
          )}
          <Input type="file" name="image" onChange={onChangeFile} />
        </div>
        <Input
          type="text"
          placeholder="Title"
          className="mb-6"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {isFetching ? (
          <p>Loading</p>
        ) : (
          <Select onValueChange={(value) => setCatSlug(value)} required>
            <SelectTrigger className="mb-6">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <ReactQuill
          className="mb-6"
          placeholder="Content"
          value={content}
          onChange={setContent}
        />
        <Button disabled={isLoading} onClick={handlePublish}>
          {isLoading ? "Loading..." : "Publish"}
        </Button>
      </div>
    </PageContainer>
  )
}
