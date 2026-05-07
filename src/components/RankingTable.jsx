import ScoreBadge from './ScoreBadge'
import { formatList, getGapLabels, getPriorityLabels, topCategoryLabels } from '../utils/viewModel.js'

function RankingTable({ analyses, language, t }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-panel">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-xl font-bold text-slate-950">{t('rankingTable')}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3">{t('rank')}</th>
              <th className="px-5 py-3">{t('company')}</th>
              <th className="px-5 py-3">{t('role')}</th>
              <th className="px-5 py-3">{t('matchScore')}</th>
              <th className="px-5 py-3">{t('applicationPriority')}</th>
              <th className="px-5 py-3">{t('keyMatchedAreas')}</th>
              <th className="px-5 py-3">{t('keyGaps')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {analyses.map((analysis) => (
              <tr key={analysis.id} className="align-top">
                <td className="px-5 py-4 font-bold text-slate-950">#{analysis.rank}</td>
                <td className="px-5 py-4 text-slate-700">{analysis.company || t('unknownCompany')}</td>
                <td className="px-5 py-4 font-semibold text-slate-900">{analysis.role || t('unknownRole')}</td>
                <td className="px-5 py-4">
                  <ScoreBadge score={analysis.overallScore} />
                </td>
                <td className="px-5 py-4">
                  <PriorityBadge priority={analysis.priority} labels={getPriorityLabels(t)} />
                </td>
                <td className="max-w-[230px] px-5 py-4 text-slate-600">
                  {formatList(topCategoryLabels(analysis, language), t('noData'))}
                </td>
                <td className="max-w-[260px] px-5 py-4 text-slate-600">
                  <div className="mb-2">
                    <GapBadge level={analysis.gapRisk.level} labels={getGapLabels(t)} />
                  </div>
                  {formatList(analysis.missingKeywords.slice(0, 5), t('noData'))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function PriorityBadge({ priority, labels }) {
  const classes = {
    high: 'bg-emerald-100 text-emerald-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-rose-100 text-rose-800',
  }

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${classes[priority]}`}>
      {labels[priority]}
    </span>
  )
}

function GapBadge({ level, labels }) {
  const classes = {
    low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    medium: 'bg-amber-50 text-amber-700 ring-amber-200',
    high: 'bg-rose-50 text-rose-700 ring-rose-200',
  }

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${classes[level]}`}>
      {labels[level]}
    </span>
  )
}

export default RankingTable
