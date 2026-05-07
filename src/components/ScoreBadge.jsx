function ScoreBadge({ score, size = 'md' }) {
  const color =
    score >= 80
      ? 'bg-emerald-600 text-white'
      : score >= 60
        ? 'bg-amber-500 text-slate-950'
        : 'bg-rose-600 text-white'
  const sizing = size === 'lg' ? 'min-w-24 px-4 py-2 text-xl' : 'min-w-16 px-3 py-1.5 text-sm'

  return (
    <span className={`inline-flex items-center justify-center rounded-md font-bold ${sizing} ${color}`}>
      {score}%
    </span>
  )
}

export default ScoreBadge
