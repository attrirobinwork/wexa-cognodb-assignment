export default function Loading() {
    return (
      <main className="min-h-screen bg-[#070a0f]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="h-72 animate-pulse rounded-3xl bg-white/[0.04]" />
  
          <div className="mt-10">
            <div className="h-8 w-52 animate-pulse rounded bg-white/5" />
  
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-48 animate-pulse rounded-2xl bg-white/[0.04]"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }