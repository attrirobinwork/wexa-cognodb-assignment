import Link from 'next/link';
import { ArrowUpRight, Building2, MapPin, Package } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  city: string;
  productCount?: number;
}

export default function SupplierCard({
  supplier,
}: {
  supplier: Supplier;
}) {
  return (
    <Link
      href={`/suppliers/${supplier.id}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.055]"
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20" />

      <div className="relative">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <Building2 size={22} />
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-500 transition group-hover:border-blue-500/30 group-hover:text-blue-400">
            <ArrowUpRight size={17} />
          </div>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white">
          {supplier.name}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={15} />
          {supplier.city}
        </div>

        <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-slate-400">
          <Package size={15} />
          <span>
            {supplier.productCount ?? 0} products
          </span>
        </div>
      </div>
    </Link>
  );
}