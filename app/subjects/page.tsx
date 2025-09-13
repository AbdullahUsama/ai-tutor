import { SubjectCatalog } from "@/components/subject-catalog"
import { Header } from "@/components/header"

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SubjectCatalog />
      </main>
    </div>
  )
}
