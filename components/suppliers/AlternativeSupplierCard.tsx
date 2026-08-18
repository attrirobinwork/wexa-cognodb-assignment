import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  MapPin,
  Network,
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  city: string;
  sharedCategories: string[];
}

export default function AlternativeSupplierCard({
  supplier,
}: {
  supplier: Supplier;
}) {
  return (
    <Link
      href={`/suppliers/${supplier.id}`}
      className="group block rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.025] p-5 transition hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          <Building2 size={20} />
        </div>

        <ArrowRight
          size={18}
          className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-emerald-400"
        />
      </div>

      <h3 className="mt-5 font-semibold text-white">
        {supplier.name}
      </h3>

      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
        <MapPin size={14} />
        {supplier.city}
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-400">
          <Network size={13} />
          Shared categories
        </div>

        <div className="flex flex-wrap gap-2">
          {supplier.sharedCategories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-slate-300"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}