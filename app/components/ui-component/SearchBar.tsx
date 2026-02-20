import React from 'react'
import { Search } from 'lucide-react'
function SearchBar() {
  return (
    <div className="relative">
      <input type="text" placeholder='Search notes...' className="w-full px-4 py-2 pl-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500" />
      <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 dark:text-slate-400" />
    </div>
  )
}

export default SearchBar