'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Components } from 'react-markdown'
import { remarkWikiLink } from '@/app/lib/custom-remark-wiki-link'
import { useParams } from 'next/navigation'
import matter from 'gray-matter'

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

  const components: Components = {
    // Customize heading styles
    h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />,
    // Customize paragraph styles
    p: ({node, ...props}) => <div className="my-4 leading-7" {...props} />,
    // Customize code block styles
    pre: ({node, ...props}) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto" {...props} />,
    code: ({node, className, children, ...props}: any) => {
      const match = /language-(\w+)/.exec(className || '')
      return !match ? (
        <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      ) : (
        <code className="block" {...props}>
          {children}
        </code>
      )
    },
    // Customize link styles
    a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
    // Customize list styles
    ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4" {...props} />,
    li: ({node, ...props}) => <li className="my-1" {...props} />,
    // Customize blockquote styles
    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4" {...props} />,
  }

  // if (loading) {
  //   return <div>Loading...</div>
  // }

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
          components={components}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  )
} 