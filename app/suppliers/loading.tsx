export default function Loading() {
    return (
      <main className="min-h-screen bg-[#070a0f]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="h-10 w-40 animate-pulse rounded-xl bg-white/5" />
  
          <div className="py-20">
            <div className="h-6 w-48 animate-pulse rounded bg-white/5" />
            <div className="mt-4 h-16 max-w-2xl animate-pulse rounded bg-white/5" />
          </div>
  
          <div className="h-14 animate-pulse rounded-2xl bg-white/5" />
  
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-3xl bg-white/[0.04]"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }