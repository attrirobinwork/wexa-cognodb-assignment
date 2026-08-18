import SupplierHeader from '@/components/suppliers/SupplierHeader';
import ProductCard from '@/components/suppliers/ProductCard';
import AlternativeSupplierCard from '@/components/suppliers/AlternativeSupplierCard';
import Link from 'next/link';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getSupplier(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/suppliers/${id}`,
    {
      cache: 'no-store',
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to load supplier');
  }

  return response.json();
}

async function getAlternatives(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/suppliers/${id}/alternatives`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to load alternative suppliers');
  }

  return response.json();
}

export default async function SupplierDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const [supplierResult, alternativesResult] =
    await Promise.all([
      getSupplier(id),
      getAlternatives(id),
    ]);

  if (!supplierResult) {
    return (
      <main className="min-h-screen bg-[#070a0f] px-5 py-20 text-center">
        <h1 className="text-2xl font-semibold text-white">
          Supplier not found
        </h1>

        <Link
          href="/suppliers"
          className="mt-6 inline-block text-sm text-blue-400"
        >
          Back to suppliers
        </Link>
      </main>
    );
  }

  const supplier = supplierResult.data;
  const alternatives = alternativesResult.data || [];

  return (
    <main className="min-h-screen bg-[#070a0f]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <SupplierHeader supplier={supplier} />


        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
              Supply catalog
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              Products supplied
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Products connected to this supplier in the graph.
            </p>
          </div>

          {supplier.products?.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {supplier.products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-sm text-slate-500">
              This supplier currently has no products.
            </div>
          )}
        </section>

      

        {/* Alternatives */}
        <section className="mt-12 pb-16">
          <div className="mb-5">

            <h2 className="mt-2 text-2xl font-semibold text-white">
              Alternative suppliers
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Suppliers connected through shared product categories.
            </p>
          </div>

          {alternatives.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {alternatives.map((alternative: any) => (
                <AlternativeSupplierCard
                  key={alternative.id}
                  supplier={alternative}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center">
              <p className="text-sm text-slate-500">
                No alternative suppliers were found.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}