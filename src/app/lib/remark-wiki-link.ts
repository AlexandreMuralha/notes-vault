import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Text } from 'mdast'

const WIKI_LINK_REGEX = /\[\[([^\]]+)\]\]/g

interface WikiLinkOptions {
  folder: string
}

export const remarkWikiLink: Plugin = function(options: WikiLinkOptions = { folder: '' }) {
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

        // Add the wiki link
        parts.push({
          type: 'wikiLink',
          value: linkText,
          data: {
            hName: 'a',
            hProperties: {
              href: `/notes/${options.folder}/${encodeURIComponent(linkText)}`,
              className: 'text-blue-600 dark:text-blue-400 hover:underline',
              'data-wiki-link': 'true',
              'data-note': linkText
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