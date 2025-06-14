import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { folder: string; note: string } }
) {
  try {
    const folder = decodeURIComponent(params.folder)
    const note = decodeURIComponent(params.note)
    const notePath = path.join(process.cwd(), 'src/notes', folder, `${note}.md`)
    const content = await fs.readFile(notePath, 'utf-8')
    return new NextResponse(content)
  } catch (error) {
    console.error('Error reading note:', error)
    return new NextResponse('Note not found', { status: 404 })
  }
} 