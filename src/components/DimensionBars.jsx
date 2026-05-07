function DimensionBars({ analysis, t }) {
  const rows = [
    ['skills', t('skills')],
    ['experience', t('experience')],
    ['domain', t('domain')],
    ['tools', t('tools')],
    ['language', t('language')],
    ['gap', t('gapAdjustment')],
  ]

  return (
    <div className="space-y-3">
      {rows.map(([key, label]) => {
        const value = analysis.dimensions[key]

        return (
          <div key={key}>
            <div className="mb-1 flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-700">{label}</span>
              <span className="font-bold text-slate-950">{value}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${barColor(value)}`}
                style={{ width: `${value}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function barColor(value) {
  if (value >= 80) {
    return 'bg-emerald-500'
  }

  if (value >= 60) {
    return 'bg-amber-500'
  }

  return 'bg-rose-500'
}

export default DimensionBars
