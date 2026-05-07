import { Building2 } from 'lucide-react'
import ScoreBadge from './ScoreBadge'
import { buildCompanyReason, getGapLabels } from '../utils/viewModel.js'

function CompanyRanking({ groups, language, t }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
          <Building2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-slate-950">{t('companyRanking')}</h3>
      </div>

      {!groups.length ? (
        <p className="text-sm leading-6 text-slate-500">{t('companyRankingEmpty')}</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {groups.map((group) => (
            <article key={group.company} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-950">{group.company}</h4>
                  <p className="text-sm text-slate-500">
                    {group.roles.length} {t('roleCount')}
                  </p>
                </div>
                <ScoreBadge score={group.topRole.overallScore} />
              </div>

              <p className="mb-3 text-sm leading-6 text-slate-700">
                <span className="font-semibold">{t('applyFirst')}:</span>{' '}
                {group.topRole.role || t('unknownRole')}
              </p>
              <p className="text-sm leading-6 text-slate-600">
                {buildCompanyReason(group.topRole, language, getGapLabels(t))}
              </p>

              <ol className="mt-4 space-y-2">
                {group.roles.map((role, index) => (
                  <li key={role.id} className="flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2">
                    <span className="text-sm font-semibold text-slate-700">
                      {index + 1}. {role.role || t('unknownRole')}
                    </span>
                    <span className="text-sm font-bold text-slate-950">{role.overallScore}%</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default CompanyRanking
