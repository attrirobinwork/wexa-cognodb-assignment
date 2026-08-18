'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SupplierSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValue = searchParams.get('search') || '';
  const [value, setValue] = useState(initialValue);

  const handleSearch = (search: string) => {
    setValue(search);

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }

    router.push(`/suppliers?${params.toString()}`);
  };

  const clearSearch = () => {
    setValue('');
    router.push('/suppliers');
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search suppliers by name or city..."
          className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-12 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-blue-500/60 focus:bg-white/[0.06]"
        />

        {value && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}