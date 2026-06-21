"use client"

interface SpecItem {
  spec_group: string
  spec_key: string
  spec_value: string
}

interface ProductSpecsProps {
  specs: SpecItem[]
}

export function ProductSpecs({ specs = [] }: ProductSpecsProps) {
  if (specs.length === 0) return null

  const groupedSpecs = specs.reduce((acc, item) => {
    if (!acc[item.spec_group]) {
      acc[item.spec_group] = []
    }
    acc[item.spec_group].push(item)
    return acc
  }, {} as Record<string, SpecItem[]>)

  return (
    <div className="space-y-8 bg-card border border-border p-6 rounded-2xl">
      <h3 className="text-xl font-bold text-foreground border-b border-border pb-3 font-display">Technical Specifications</h3>
      
      <div className="space-y-6">
        {Object.entries(groupedSpecs).map(([groupName, groupItems]) => (
          <div key={groupName} className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-primary">{groupName}</h4>
            <div className="border border-border/80 rounded-xl overflow-hidden divide-y divide-border/60">
              {groupItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 p-3.5 text-sm font-medium">
                  <div className="text-muted-foreground/80 col-span-1 font-semibold">{item.spec_key}</div>
                  <div className="text-foreground col-span-2 font-semibold">{item.spec_value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProductSpecs
