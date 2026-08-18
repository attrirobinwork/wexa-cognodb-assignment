import EmptyState from './EmptyState';
import SupplierCard from './SupplierCard';

interface Supplier {
  id: string;
  name: string;
  city: string;
  productCount?: number;
}

export default function SupplierList({
  suppliers,
}: {
  suppliers: Supplier[];
}) {
  if (!suppliers.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {suppliers.map((supplier) => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
        />
      ))}
    </div>
  );
}