import { SlidersHorizontal } from 'lucide-react'

function CustomSynonyms({ value, onChange, t }) {
  return (
    <details className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
            <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">{t('advancedSettings')}</p>
            <h2 className="text-lg font-bold text-slate-950">{t('customSynonyms')}</h2>
          </div>
        </div>
      </summary>

      <div className="mt-4 space-y-3">
        <p className="text-sm leading-6 text-slate-600">{t('customSynonymsHelp')}</p>
        <p className="rounded-lg border border-violet-200 bg-violet-50 p-3 text-sm leading-6 text-violet-950">
          {t('customSynonymsPrivacy')}
        </p>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t('customSynonymsPlaceholder')}
          className="min-h-[130px] w-full rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />
      </div>
    </details>
  )
}

export default CustomSynonyms
