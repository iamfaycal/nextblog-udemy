import { Category } from "@prisma/client"
import axios from "axios"
import { useQuery } from "react-query"

const getCategories = async () => {
  const { data } = await axios.get("/api/categories/")
  return data as Category[]
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  })
}
