import { PostWithUserAndComments } from "@/types"
import axios from "axios"
import { useQuery } from "react-query"

const getPostBySlug = async (slug: string) => {
  const { data } = await axios.get(`/api/posts/${slug}`)
  return data as PostWithUserAndComments
}

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  })
}
