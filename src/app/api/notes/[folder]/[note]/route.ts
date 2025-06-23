import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import matter from 'gray-matter'

export async function GET(
  request: Request,
  { params }: { params: { folder: string; note: string } }
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolvedParams = await (params as any);
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