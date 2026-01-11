
export function PersonasListSkeleton() {
    return (
      <>
        <div className="w-full rounded-lg border border-zinc-200 bg-[var(--background)]">
          <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-4 py-3">
            <h2 className="text-sm font-medium">Personas</h2>
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-zinc-500">Persona</th>
                  <th className="px-4 py-3 text-left text-xs text-zinc-500">Email</th>
                  <th className="px-4 py-3 text-left text-xs text-zinc-500">Estado</th>
                  <th className="px-4 py-3 text-left text-xs text-zinc-500">Deuda</th>
                  <th className="px-4 py-3 text-right text-xs text-zinc-500">Acciones</th>
                </tr>
              </thead>
  
              <tbody className="divide-y divide-zinc-200">
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-zinc-200" />
                        
                        <div className="space-y-2">
                          <div className="h-4 w-32 rounded bg-zinc-200" />
                          <div className="h-3 w-24 rounded bg-zinc-200" />
                        </div>
                      </div>
                    </td>
  
                    <td className="px-4 py-3">
                      <div className="h-4 w-40 rounded bg-zinc-200" />
                    </td>
  
                    <td className="px-4 py-3">
                      <div className="h-6 w-24 rounded-full bg-zinc-200" />
                    </td>
  
                    <td className="px-4 py-3">
                      <div className="h-4 w-16 rounded bg-zinc-200" />
                    </td>
  
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <div className="h-8 w-16 rounded-md bg-zinc-200" />
                        <div className="h-8 w-16 rounded-md bg-zinc-200" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-sm text-zinc-500">
            <span>Cargando personas...</span>
          </div>
        </div>
      </>
    )
  }