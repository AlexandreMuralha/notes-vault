import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { folder: string; note: string } }
) {
  try {
    const { folder, note } = params
    const decodedFolder = decodeURIComponent(folder)
    const decodedNote = decodeURIComponent(note)
    const notePath = path.join(process.cwd(), 'src/notes', decodedFolder, decodedNote)
    
    const content = await fs.readFile(notePath, 'utf-8')
    return new NextResponse(content)
  } catch (error) {
    console.error('Error reading note:', error)
    return new NextResponse('Note not found', { status: 404 })
  }
} 