'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface FilterDropdownProps {
  tags: string[];
  className?: string;
}

export default function Filters({ tags, className = '' }: FilterDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const currentTag = searchParams.get('tag') || 'All';

  const handleSelect = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tag === 'All') {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }

    // Reset to page 1 when changing filter
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className={`w-full md:w-56 space-y-2 ${className}`}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 flex items-center justify-between"
        >
          <span className="truncate">
            {currentTag === 'All' ? 'All Tags' : `#${currentTag}`}
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
            {/* All Tags Option */}
            <button
              onClick={() => handleSelect('All')}
              className={`w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                currentTag === 'All' ? 'bg-slate-100 dark:bg-slate-700 font-medium' : ''
              }`}
            >
              All Tags
            </button>

            {/* Tag Options */}
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSelect(tag)}
                className={`w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                  currentTag === tag ? 'bg-slate-100 dark:bg-slate-700 font-medium' : ''
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}