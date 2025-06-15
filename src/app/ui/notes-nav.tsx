'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'

interface NoteFolder {
  folder: string
  files: Array<{
    name: string
    isPinned: boolean
  }>
}

interface NotesNavProps {
  notes: NoteFolder[]
}

export default function NotesNav({ notes }: NotesNavProps) {
  const pathname = usePathname()

  // Initialize with all folders collapsed
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(() => 
    notes.reduce((acc, { folder }) => {
      acc[folder] = false
      return acc
    }, {} as Record<string, boolean>)
  )

  // Load saved state from localStorage after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('expandedFolders')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Ensure all current folders have a state
        const currentFolders = notes.reduce((acc, { folder }) => {
          acc[folder] = parsed[folder] ?? false
          return acc
        }, {} as Record<string, boolean>)
        setExpandedFolders(currentFolders)
      }
    } catch (error) {
      console.error('Error loading expanded folders state:', error)
    }
  }, [notes])

  // Save to localStorage whenever expandedFolders changes
  useEffect(() => {
    try {
      localStorage.setItem('expandedFolders', JSON.stringify(expandedFolders))
    } catch (error) {
      console.error('Error saving expanded folders state:', error)
    }
  }, [expandedFolders])

  const renderedFolders = useMemo(() => {
    return notes.map(({ folder, files }) => {
      const isExpanded = expandedFolders[folder]
      const folderPath = `/notes/${folder}`

      return (
        <div key={folder} className="mb-2">
          <button
            onClick={() => setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }))}
            className="flex items-center w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4 mr-1" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 mr-1" />
            )}
            {folder}
          </button>
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {files.map(({ name }) => {
                const notePath = `${folderPath}/${name.replace('.md', '')}`
                const isActive = pathname === notePath

                return (
                  <Link
                    key={name}
                    href={notePath}
                    className={`block text-sm ${
                      isActive
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="truncate">{name.replace('.md', '')}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )
    })
  }, [notes, expandedFolders, pathname])

  return <nav className="space-y-1">{renderedFolders}</nav>
} 