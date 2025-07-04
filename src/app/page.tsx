import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import config from './config/web-notes.config.json'

interface NoteFolder {
  folder: string
  files: string[]
}

async function getNotes(): Promise<NoteFolder[]> {
  const notesDir = path.join(process.cwd(), 'src/notes')
  const folders = config.folders
    .filter(folder => folder.visible)
    .map(folder => folder.name)

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
      <p>
        Select a note from the sidebar to start reading.
      </p>
    </div>
  )
}
