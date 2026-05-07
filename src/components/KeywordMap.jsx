import { Tags } from 'lucide-react'

function KeywordMap({ analysis, language, t }) {
  const matchedConceptLabels = analysis.matchedConcepts.map((match) => match.concept.label[language])

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-2">
        <Tags className="h-4 w-4 text-slate-500" aria-hidden="true" />
        <h5 className="text-sm font-bold uppercase text-slate-500">{t('keywordMap')}</h5>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <KeywordGroup title={t('matchedKeywords')} items={matchedConceptLabels} empty={t('noData')} tone="green" />
        <KeywordGroup title={t('missingKeywords')} items={analysis.missingKeywords} empty={t('noData')} tone="rose" />
        <KeywordGroup
          title={t('jdCategories')}
          items={analysis.jdCategories.map((category) => category.label[language])}
          empty={t('noData')}
          tone="blue"
        />
        <KeywordGroup
          title={t('resumeCategories')}
          items={analysis.resumeCategories.map((category) => category.label[language])}
          empty={t('noData')}
          tone="amber"
        />
      </div>

      <div className="mt-4">
        <KeywordGroup title={t('jdTriggers')} items={analysis.matchedKeywords.slice(0, 18)} empty={t('noData')} tone="neutral" />
      </div>
    </section>
  )
}

function KeywordGroup({ title, items, empty, tone }) {
  const toneClass = {
    green: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    rose: 'bg-rose-50 text-rose-800 ring-rose-200',
    blue: 'bg-sky-50 text-sky-800 ring-sky-200',
    amber: 'bg-amber-50 text-amber-900 ring-amber-200',
    neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  }[tone]

  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase text-slate-500">{title}</p>
      {items.length ? (
        <div className="flex flex-wrap gap-2">
          {items.slice(0, 28).map((item) => (
            <span key={item} className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${toneClass}`}>
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">{empty}</p>
      )}
    </div>
  )
}

export default KeywordMap
