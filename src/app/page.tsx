import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'

interface NoteFolder {
  folder: string
  files: string[]
}

async function getNotes(): Promise<NoteFolder[]> {
  const notesDir = path.join(process.cwd(), 'src/notes')
  const folders = await fs.readdir(notesDir)
  
  const notes = await Promise.all(
    folders.map(async (folder) => {
      if (folder === '.DS_Store') return null
      const folderPath = path.join(notesDir, folder)
      const files = await fs.readdir(folderPath)
      return {
        folder,
        files: files.filter(file => file !== '.DS_Store')
      }
    })
  )

  return notes.filter((note): note is NoteFolder => note !== null)
}

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome to My Notes</h1>
      <p className="text-gray-600">
        Select a note from the sidebar to start reading.
      </p>
    </div>
  )
}
