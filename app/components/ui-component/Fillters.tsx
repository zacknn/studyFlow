'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FilterDropdownProps {
  categories: string[] | { id: string; name: string }[]
  onSelect?: (selected: string) => void
  placeholder?: string
  label?: string
  className?: string
}

function Filters({
  categories,
  onSelect,
  placeholder = 'Select a category...',
  label,
  className = '',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const items = categories.map((item) => ({
    id: typeof item === 'string' ? item : item.id,
    name: typeof item === 'string' ? item : item.name,
  }))

  const handleSelect = (id: string, name: string) => {
    setSelected(name)
    setIsOpen(false)
    onSelect?.(id)
  }

  return (
    <div className={`w-2xs space-y-2 ${className}`}>
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 flex items-center justify-between"
        >
          <span>{selected || placeholder}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-lg z-50">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id, item.name)}
                className={`w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                  selected === item.name ? 'bg-slate-100 dark:bg-slate-700 font-medium' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Filters