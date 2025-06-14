'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Components } from 'react-markdown'
import { remarkWikiLink } from '@/app/lib/remark-wiki-link'
import { useParams } from 'next/navigation'

interface PageProps {
  params: {
    folder: string
    note: string
  }
}

export default function NotePage() {
  const params = useParams()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNote() {
      try {
        const response = await fetch(`/api/notes/${params.folder}/${params.note}`)
        const data = await response.text()
        setContent(data)
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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{decodeURIComponent(params.note as string)}</h1>
      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm, remarkWikiLink]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  )
} 