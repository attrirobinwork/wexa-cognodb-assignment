import Link from 'next/link';
import { ArrowLeft, Building2, MapPin } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  city: string;
  productCount?: number;
}

export default function SupplierHeader({
  supplier,
}: {
  supplier: Supplier;
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/[0.08] via-white/[0.03] to-transparent p-7 sm:p-9">
      <Link
        href="/suppliers"
        className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to suppliers
      </Link>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <Building2 size={25} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {supplier.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-slate-500">
            <MapPin size={16} />
            {supplier.city}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Products
          </p>

          <p className="mt-1 text-2xl font-semibold text-white">
            {supplier.productCount ?? 0}
          </p>
        </div>
      </div>
    </section>
  );
}