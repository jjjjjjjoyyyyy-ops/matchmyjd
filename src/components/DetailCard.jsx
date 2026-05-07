import { ChevronDown } from 'lucide-react'
import DimensionBars from './DimensionBars'
import KeywordMap from './KeywordMap'
import ScoreBadge from './ScoreBadge'
import {
  buildGaps,
  buildStrategy,
  buildStrengths,
  buildSuggestions,
  getGapLabels,
  getPriorityLabels,
} from '../utils/viewModel.js'

function DetailCard({ analysis, defaultOpen, language, t }) {
  const priorityLabels = getPriorityLabels(t)
  const gapLabels = getGapLabels(t)
  const strengths = buildStrengths(analysis, language, t)
  const gaps = buildGaps(analysis, language, t)
  const suggestions = buildSuggestions(analysis, language, t)
  const strategy = buildStrategy(analysis, language, priorityLabels, gapLabels)

  return (
    <details
      open={defaultOpen}
      className="group rounded-lg border border-slate-200 bg-white shadow-panel"
    >
      <summary className="flex cursor-pointer list-none flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            #{analysis.rank} · {analysis.company || t('unknownCompany')}
          </p>
          <h4 className="mt-1 text-xl font-bold text-slate-950">{analysis.role || t('unknownRole')}</h4>
        </div>
        <div className="flex items-center gap-3">
          <ScoreBadge score={analysis.overallScore} size="lg" />
          <ChevronDown className="h-5 w-5 text-slate-500 transition group-open:rotate-180" aria-hidden="true" />
        </div>
      </summary>

      <div className="border-t border-slate-100 px-5 pb-5 pt-4">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <section className="space-y-4">
            <MetricBlock title={t('overallMatch')}>
              <div className="flex items-center gap-3">
                <ScoreBadge score={analysis.overallScore} />
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  {priorityLabels[analysis.priority]}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  {gapLabels[analysis.gapRisk.level]}
                </span>
              </div>
            </MetricBlock>

            <MetricBlock title={t('dimensionScores')}>
              <DimensionBars analysis={analysis} t={t} />
            </MetricBlock>

            <MetricBlock title={t('strategy')}>
              <p className="text-sm leading-6 text-slate-600">{strategy}</p>
            </MetricBlock>
          </section>

          <section className="space-y-5">
            <InsightList title={t('matchedStrengths')} items={strengths} empty={t('noData')} />
            <InsightList title={t('missingWeakAreas')} items={gaps} empty={t('noData')} />

            <MetricBlock title={t('evidenceSnippets')}>
              {analysis.evidenceSnippets.length ? (
                <div className="space-y-3">
                  {analysis.evidenceSnippets.map((snippet) => (
                    <div
                      key={`${snippet.keyword}-${snippet.text}`}
                      className="border-l-4 border-teal-500 bg-teal-50 px-4 py-3 text-sm leading-6 text-teal-950"
                    >
                      <p>
                        <span className="font-semibold">{t('matchedConcept')}:</span>{' '}
                        {snippet.concept.label[language]}
                      </p>
                      <p>
                        <span className="font-semibold">{t('jdSignal')}:</span> {snippet.jdSignal}
                      </p>
                      <p>
                        <span className="font-semibold">{t('resumeEvidence')}:</span> {snippet.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">{t('noData')}</p>
              )}
            </MetricBlock>

            <InsightList title={t('optimization')} items={suggestions} empty={t('noData')} />
            <UnmappedKeywordList analysis={analysis} t={t} />
            <KeywordMap analysis={analysis} language={language} t={t} />
          </section>
        </div>
      </div>
    </details>
  )
}

function UnmappedKeywordList({ analysis, t }) {
  return (
    <div>
      <h5 className="mb-3 text-sm font-bold uppercase text-slate-500">{t('possibleUnmappedKeywords')}</h5>
      {analysis.unmappedKeywords?.length ? (
        <ul className="space-y-2">
          {analysis.unmappedKeywords.map((keyword) => (
            <li key={keyword} className="rounded-md bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-950">
              {t('unmappedKeywordNote').replace('{keyword}', keyword)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">{t('noData')}</p>
      )}
    </div>
  )
}

function MetricBlock({ title, children }) {
  return (
    <div>
      <h5 className="mb-3 text-sm font-bold uppercase text-slate-500">{title}</h5>
      {children}
    </div>
  )
}

function InsightList({ title, items, empty }) {
  return (
    <div>
      <h5 className="mb-3 text-sm font-bold uppercase text-slate-500">{title}</h5>
      {items.length ? (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="rounded-md bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">{empty}</p>
      )}
    </div>
  )
}

export default DetailCard
