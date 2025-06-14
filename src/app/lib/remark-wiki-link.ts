import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Text } from 'mdast'

const WIKI_LINK_REGEX = /\[\[([^\]]+)\]\]/g

interface WikiLinkOptions {
  currentPath: string
}

export const remarkWikiLink: Plugin<[WikiLinkOptions?]> = function(options = { currentPath: '' }) {
  return (tree) => {
    visit(tree, 'text', (node: Text) => {
      const value = node.value
      const matches = Array.from(value.matchAll(WIKI_LINK_REGEX))
      
      if (matches.length === 0) return

      const parts: any[] = []
      let lastIndex = 0

      matches.forEach((match) => {
        const [fullMatch, linkText] = match
        const index = match.index!

        // Add text before the wiki link
        if (index > lastIndex) {
          parts.push({
            type: 'text',
            value: value.slice(lastIndex, index)
          })
        }

        // Get current folder from path
        const currentFolder = options.currentPath?.split('/')[2] || ''

        // Add the wiki link
        parts.push({
          type: 'wikiLink',
          value: linkText,
          data: {
            hName: 'a',
            hProperties: {
              href: currentFolder 
                ? `/notes/${encodeURIComponent(currentFolder)}/${encodeURIComponent(linkText)}`
                : `/notes/${encodeURIComponent(linkText)}`,
              className: 'text-blue-600 dark:text-blue-400 hover:underline'
            },
            hChildren: [{ type: 'text', value: linkText }]
          }
        })

        lastIndex = index + fullMatch.length
      })

      // Add remaining text
      if (lastIndex < value.length) {
        parts.push({
          type: 'text',
          value: value.slice(lastIndex)
        })
      }

      // Replace the text node with the parts
      Object.assign(node, {
        type: 'paragraph',
        children: parts
      })
    })
  }
} 