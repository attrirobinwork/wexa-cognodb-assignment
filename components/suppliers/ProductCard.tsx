import { ArrowUpRight, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string | null;
}

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-white/20 hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-slate-400">
          <Package size={18} />
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-600 transition group-hover:text-blue-400"
        />
      </div>

      <h3 className="mt-5 font-medium text-white">
        {product.name}
      </h3>

      <p className="mt-2 text-xs text-slate-500">
        {product.category || 'Uncategorized'}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm text-slate-500">
          Price
        </span>

        <span className="font-semibold text-white">
          ₹{product.price.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}