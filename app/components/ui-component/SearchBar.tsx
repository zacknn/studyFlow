'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebounce } from '@/app/lib/hooks/useDebounce';

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  // Use a ref so the effect can always read the latest searchParams
  // without subscribing to it (avoids the infinite re-render loop)
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  // Use the new reusable debounce hook
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // Update URL when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(searchParamsRef.current.toString());

    if (debouncedSearchTerm.trim()) {
      params.set('q', debouncedSearchTerm.trim());
    } else {
      params.delete('q');
    }

    // Reset to page 1 when search changes
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    // searchParams is intentionally excluded — adding it causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, pathname, router]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 pl-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 dark:text-slate-400" />
    </div>
  );
}