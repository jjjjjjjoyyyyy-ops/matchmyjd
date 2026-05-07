import { ShieldCheck } from 'lucide-react'

function HowItWorks({ t }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-bold text-slate-950">{t('howItWorks')}</h2>
      </div>
      <p className="text-sm leading-6 text-slate-600">{t('methodNote')}</p>
    </section>
  )
}

export default HowItWorks
