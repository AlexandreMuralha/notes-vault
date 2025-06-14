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

export default async function LeftSidebar() {
  const notes = await getNotes()

  return (
    <aside className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      <nav className="space-y-4">
        {notes.map((folder) => (
          <div key={folder.folder}>
            <h3 className="font-semibold text-gray-700 mb-2">{folder.folder}</h3>
            <ul className="space-y-1">
              {folder.files.map((file) => {
                const noteName = file.replace(/\.md$/, '')
                return (
                  <li key={file}>
                    <Link 
                      href={`/notes/${encodeURIComponent(folder.folder)}/${encodeURIComponent(noteName)}`}
                      className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      {noteName}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
