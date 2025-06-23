import { Components } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'

export const markdownComponents: Components = {
  // Customize heading styles
  h1: ({node: _, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: ({node: _, ...props}) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
  h3: ({node: _, ...props}) => <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />,
  // Customize paragraph styles
  p: ({node: _, ...props}) => <div className="text-base my-4 leading-7" {...props} />,
  // Customize code block styles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre: ({node: _, children, ...props}: any) => (
    <div className="my-4" {...props}>
      {children}
    </div>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: ({node: _, className, children, ...props}: any) => {
    const match = /language-(\w+)/.exec(className || '')
    return !match ? (
      <code className="bg-gray-100 dark:bg-gray-500 px-1.5 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    ) : (
      <SyntaxHighlighter
        language={match[1]}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          padding: '1rem',
          fontSize: '0.875rem',
        }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    )
  },
  // Customize link styles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: ({node: _, href, ...props}: any) => {
    // Check if this is a wiki link
    if (props['data-wiki-link']) {
      return <Link href={href} className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
    }
    // Regular link
    return <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
  },
  // Customize list styles
  ul: ({node: _, ...props}) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: ({node: _, ...props}) => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: ({node: _, ...props}) => <li className="my-1" {...props} />,
  // Customize blockquote styles
  blockquote: ({node: _, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4" {...props} />,
} 