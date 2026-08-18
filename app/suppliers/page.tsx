import SupplierSearch from '@/components/suppliers/SupplierSearch';
import SupplierList from '@/components/suppliers/SupplierList';
import Link from 'next/link';

interface Props {
  searchParams: Promise<{
    search?: string;
  }>;
}

async function getSuppliers(search?: string) {
  const query = search
    ? `?search=${encodeURIComponent(search)}`
    : '';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/suppliers${query}`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to load suppliers');
  }

  return response.json();
}

export default async function SuppliersPage({
  searchParams,
}: Props) {
  const { search } = await searchParams;

  const result = await getSuppliers(search);

  const suppliers = result.data || [];

  return (
    <main className="min-h-screen bg-[#070a0f]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
        <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold text-white">
              Wexa Ai
              </p>
              <p className="text-xs text-slate-500">
                Supplier intelligence
              </p>
            </div>
          </div>
          </Link>

          <div className="hidden rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 sm:block">
            ● System operational
          </div>
        </header>

        {/* Hero */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              GRAPH-POWERED SUPPLIER NETWORK
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover the connections
              <span className="block text-slate-500">
                behind your supply network.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Explore suppliers, products and categories through
              relationship-driven data powered by CognoDB.
            </p>
          </div>
        </section>

        {/* Search */}
        <section>
          <SupplierSearch />
        </section>

        {/* Results */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Supplier network
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                {search
                  ? `Results for "${search}"`
                  : 'All suppliers'}
              </h2>
            </div>

            <span className="text-sm text-slate-500">
              {suppliers.length} suppliers
            </span>
          </div>

          <SupplierList suppliers={suppliers} />
        </section>
      </div>
    </main>
  );
}