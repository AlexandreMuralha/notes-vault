import { promises as fs } from 'fs'
import path from 'path'
import NotesNav from './notes-nav'
import matter from 'gray-matter'
import config from '../config/web-notes.config.json'

interface NoteFolder {
  folder: string
  files: Array<{
    name: string
    isPinned: boolean
  }>
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
      
      // Get frontmatter data for each file
      const filesWithData = await Promise.all(
        files
          .filter(file => file !== '.DS_Store')
          .map(async (file) => {
            const filePath = path.join(folderPath, file)
            const content = await fs.readFile(filePath, 'utf8')
            const { data } = matter(content)
            return {
              name: file,
              isPinned: data['dg-pinned'] === true
            }
          })
      )

      // Sort files: pinned first, then alphabetically
      const sortedFiles = filesWithData.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return a.name.localeCompare(b.name)
      })

      return {
        folder,
        files: sortedFiles
      }
    })
  )

  return notes.filter((note): note is NoteFolder => note !== null)
}

export default async function LeftSidebar() {
  const notes = await getNotes()

  return (
    <aside className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
      <NotesNav notes={notes} />
    </aside>
  )
}
