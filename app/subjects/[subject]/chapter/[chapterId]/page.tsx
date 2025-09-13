import { ChapterView } from "@/components/chapter-view"
import { Header } from "@/components/header"

interface ChapterPageProps {
  params: {
    subject: string
    chapterId: string
  }
}

export default function ChapterPage({ params }: ChapterPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ChapterView subject={params.subject} chapterId={params.chapterId} />
    </div>
  )
}
