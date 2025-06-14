import { promises as fs } from 'fs'
import path from 'path'

async function getNote(folder: string, note: string) {
  /* decodeURIComponent is needed to deal with special characteres and spaces */
  const decodedFolder = decodeURIComponent(folder)
  const decodedNote = decodeURIComponent(note)
  const notePath = path.join(process.cwd(), 'src/notes', decodedFolder, decodedNote)
  const content = await fs.readFile(notePath, 'utf-8')
  return content
}

interface PageProps {
  params: Promise<{ folder: string; note: string }>
}

export default async function NotePage({ params }: PageProps) {
  const { folder, note } = await params
  const content = await getNote(folder, note)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{decodeURIComponent(note)}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <pre className="whitespace-pre-wrap">{content}</pre>
      </div>
    </div>
  )
} 