import CategoriesSection from "@/components/categories-section"
import HeroSection from "@/components/hero-section"
import PageContainer from "@/components/page-container"
import PostsList from "@/components/posts-list"

export default function Home() {
  return (
    <PageContainer>
      <div className="px-4 py-16">
        <HeroSection />
        <CategoriesSection />
        <PostsList />
      </div>
    </PageContainer>
  )
}
