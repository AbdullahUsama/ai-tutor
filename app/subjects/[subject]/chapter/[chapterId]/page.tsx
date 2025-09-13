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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 min-h-0">
        <ChapterView subject={params.subject} chapterId={params.chapterId} />
      </div>
    </div>
  )
}
