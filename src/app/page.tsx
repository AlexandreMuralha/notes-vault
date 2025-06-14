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

export default async function Home() {
  const notes = await getNotes()

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">My Notes</h1>
    
      <div className="grid gap-6">
        {notes.map((folder) => (
          <div key={folder.folder} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{folder.folder}</h2>
            <ul className="space-y-2">
              {folder.files.map((file) => (
                <li key={file}>
                  <Link 
                    href={`/notes/${encodeURIComponent(folder.folder)}/${encodeURIComponent(file)}`}
                    className="text-blue-500 hover:underline"
                  >
                    {file}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}
