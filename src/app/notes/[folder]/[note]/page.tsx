'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { remarkWikiLink } from '@/app/lib/custom-remark-wiki-link'
import { useParams } from 'next/navigation'
import matter from 'gray-matter'
import { markdownComponents } from '@/app/lib/markdown-components'

interface Frontmatter {
  title?: string
  date?: string
  tags?: string[]
  [key: string]: any
}

export default function NotePage() {
  const params = useParams()
  const [content, setContent] = useState('')
  const [frontmatter, setFrontmatter] = useState<Frontmatter>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNote() {
      try {
        const response = await fetch(`/api/notes/${params.folder}/${params.note}`)
        const data = await response.text()
        const { content: markdownContent, data: frontmatterData } = matter(data)
        setContent(markdownContent)
        setFrontmatter(frontmatterData)
      } catch (error) {
        console.error('Error loading note:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNote()
  }, [params.folder, params.note])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{frontmatter.title || decodeURIComponent(params.note as string)}</h1>
      {frontmatter.date && (
        <div className="text-gray-500 dark:text-gray-400 mb-8">
          {new Date(frontmatter.date).toLocaleDateString()}
        </div>
      )}
      {frontmatter.tags && (
        <div className="flex gap-2 mb-8">
          {frontmatter.tags.map((tag: string) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      )}
      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown 
          remarkPlugins={[
            remarkGfm,
            [remarkWikiLink, { folder: params.folder as string }]
          ]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  )
} 