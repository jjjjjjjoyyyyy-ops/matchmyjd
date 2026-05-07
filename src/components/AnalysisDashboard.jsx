import CompanyRanking from './CompanyRanking'
import DetailCard from './DetailCard'
import RankingTable from './RankingTable'

function AnalysisDashboard({ result, language, t }) {
  if (!result?.analyses?.length) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-500">
          {t('emptyDashboard')}
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 border-t border-slate-200 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">{t('dashboardTitle')}</h2>
          <p className="mt-2 text-sm text-slate-500">
            {result.analyses.length} {t('roleCount')}
          </p>
        </div>
      </div>

      <RankingTable analyses={result.analyses} language={language} t={t} />
      <CompanyRanking groups={result.companyGroups} language={language} t={t} />

      <div>
        <h3 className="mb-4 text-xl font-bold text-slate-950">{t('detailCards')}</h3>
        <div className="space-y-4">
          {result.analyses.map((analysis, index) => (
            <DetailCard key={analysis.id} analysis={analysis} defaultOpen={index === 0} language={language} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AnalysisDashboard
