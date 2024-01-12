import { PostWithCategoryAndComments } from "@/types"
import axios from "axios"
import { useQuery } from "react-query"

const getPosts = async (category: string | null = null) => {
  const { data } = await axios.get(
    !category ? "/api/posts/" : `/api/posts/?category=${category}`
  )
  return data as PostWithCategoryAndComments[]
}

export const usePosts = (category: string | null = null) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(category),
  })
}
