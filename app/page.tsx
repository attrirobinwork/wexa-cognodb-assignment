import Link from 'next/link';
import {
  ArrowRight,
  Boxes,
  Building2,
  Network,
  Search,
  ShieldCheck,
  Warehouse,
} from 'lucide-react';

const stats = [
  {
    label: 'Suppliers',
    value: '30',
    icon: Building2,
  },
  {
    label: 'Products',
    value: '100',
    icon: Boxes,
  },
  {
    label: 'Categories',
    value: '15',
    icon: Network,
  },
  {
    label: 'Warehouses',
    value: '10',
    icon: Warehouse,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#070a0f] to-[#0a0e14] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="absolute bottom-[-300px] right-[-200px] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* NAVBAR */}
        <nav className="flex h-20 items-center justify-between border-b border-white/10">
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

          <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <Link
              href="/"
              className="text-white hover:text-blue-400 transition"
            >
              Overview
            </Link>

            <Link
              href="/suppliers"
              className="transition hover:text-blue-400"
            >
              Suppliers
            </Link>
          </div>

          <Link
            href="/suppliers"
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-slate-200 hover:shadow-md"
          >
            Explore network
            <ArrowRight size={16} />
          </Link>
        </nav>

        {/* HERO */}
        <section className="relative py-24 sm:py-32 lg:py-36">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              GRAPH-POWERED SUPPLY INTELLIGENCE
            </div>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              See the connections
              <span className="block text-slate-500">
                behind your supply network.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Explore suppliers, products, categories and warehouses
              through a connected graph. Discover alternative suppliers
              before a supply disruption becomes a problem.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/suppliers"
                className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-medium transition hover:bg-blue-500 hover:shadow-lg"
              >
                Explore suppliers
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/suppliers"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white hover:shadow-md"
              >
                <Search size={17} />
                Find a supplier
              </Link>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] sm:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`p-6 sm:p-7 transition hover:bg-white/[0.05] ${
                  index !== 0
                    ? 'border-l border-white/10'
                    : ''
                }`}
              >
                <Icon
                  size={19}
                  className="text-slate-500"
                />

                <p className="mt-5 text-3xl font-semibold tracking-tight">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </section>

        {/* GRAPH EXPLAINER */}
        <section className="grid gap-12 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
              Connected intelligence
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your supply network is more than a list.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              SupplyGraph connects suppliers to products, categories,
              warehouses and locations. This makes it possible to
              discover relationships that are difficult to see in
              isolated records.
            </p>

            <div className="mt-8">
              <Link
                href="/suppliers"
                className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-blue-400"
              >
                Explore the supplier network
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* GRAPH VISUAL */}
          <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.09),transparent_60%)]" />

            {/* lines */}
            <div className="absolute left-[27%] top-[32%] h-px w-[45%] rotate-[20deg] bg-blue-500/30" />
            <div className="absolute left-[27%] top-[58%] h-px w-[45%] -rotate-[20deg] bg-blue-500/30" />
            <div className="absolute left-[50%] top-[31%] h-[38%] w-px bg-blue-500/20" />

            {/* center */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 text-blue-400 shadow-[0_0_60px_rgba(59,130,246,0.12)]">
                <Network size={30} />
              </div>

              <span className="mt-3 text-xs text-slate-400">
                Product
              </span>
            </div>

            {/* nodes */}
            <GraphNode
              className="left-[10%] top-[17%]"
              icon={<Building2 size={18} />}
              label="Supplier"
            />

            <GraphNode
              className="right-[10%] top-[17%]"
              icon={<Network size={18} />}
              label="Category"
            />

            <GraphNode
              className="left-[10%] bottom-[17%]"
              icon={<Warehouse size={18} />}
              label="Warehouse"
            />

            <GraphNode
              className="right-[10%] bottom-[17%]"
              icon={<ShieldCheck size={18} />}
              label="Location"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 via-white/[0.03] to-transparent p-8 sm:p-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
                Supplier discovery
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Find the right supplier faster.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Search the network and discover alternative suppliers
                connected through shared product categories.
              </p>
            </div>

            <Link
              href="/suppliers"
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-slate-200 hover:shadow-md"
            >
              Open supplier explorer
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col gap-3 border-t border-white/10 bg-gradient-to-t from-[#070a0f] to-[#0a0e14] py-8 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 WexaGraph</p>

          <p>
            Graph-powered supplier intelligence
          </p>
        </footer>
      </div>
    </main>
  );
}

function GraphNode({
  className,
  icon,
  label,
}: {
  className: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className={`absolute flex flex-col items-center ${className} transition hover:scale-105`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-400 shadow-xl hover:shadow-lg hover:text-blue-400">
        {icon}
      </div>

      <span className="mt-2 text-xs text-slate-500">
        {label}
      </span>
    </div>
  );
}