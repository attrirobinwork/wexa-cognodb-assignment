import { SearchX } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-slate-500">
        <SearchX size={24} />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        No suppliers found
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Try searching with another supplier name or city.
      </p>
    </div>
  );
}