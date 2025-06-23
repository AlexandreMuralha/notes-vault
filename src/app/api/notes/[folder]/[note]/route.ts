import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import matter from 'gray-matter'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ folder: string; note: string }> }
) {
  try {
    const resolvedParams = await params;
    const folder = decodeURIComponent(resolvedParams.folder)
    const note = decodeURIComponent(resolvedParams.note)
    const filePath = path.join(process.cwd(), 'src/notes', folder, `${note}.md`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    
    return new NextResponse(fileContent)
  } catch (error) {
    console.error('Error reading note:', error)
    return new NextResponse('Note not found', { status: 404 })
  }
} 