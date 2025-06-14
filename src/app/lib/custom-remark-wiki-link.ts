import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Text } from 'mdast'

/* 
* This custom remark plugin is used to converts [[ ]] wiki links to html links.
*
* Example: [[Link]] -> <a href="/notes/folder/link">Link</a>
*
* It needs further improvements to handle the linking to other folders.
* Right now it only handles the linking to the same folder.
* Folder is passed as an option to the plugin.
*/

const WIKI_LINK_REGEX = /\[\[([^\]]+)\]\]/g

export const remarkWikiLink: Plugin = function(options: {
  folder: string
} = { folder: '' }) {
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