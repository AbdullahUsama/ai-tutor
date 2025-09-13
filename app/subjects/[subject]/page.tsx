import { SubjectOverview } from "@/components/subject-overview"
import { Header } from "@/components/header"

interface SubjectPageProps {
  params: {
    subject: string
  }
}

export default function SubjectPage({ params }: SubjectPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SubjectOverview subject={params.subject} />
      </main>
    </div>
  )
}
