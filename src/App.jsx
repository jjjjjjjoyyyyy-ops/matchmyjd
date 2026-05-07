import { useMemo, useState } from 'react'
import { analyzePortfolio } from './utils/analysisEngine.js'
import { sampleJds, sampleResume } from './data/sampleData.js'
import { makeT } from './i18n.js'
import AnalysisDashboard from './components/AnalysisDashboard'
import CustomSynonyms from './components/CustomSynonyms'
import Header from './components/Header'
import HowItWorks from './components/HowItWorks'
import JDManager from './components/JDManager'
import ResumeInput from './components/ResumeInput'

const emptyJob = () => ({
  id: crypto.randomUUID(),
  company: '',
  role: '',
  text: '',
})

function App() {
  const [language, setLanguage] = useState('en')
  const [resumeText, setResumeText] = useState('')
  const [jobs, setJobs] = useState([emptyJob()])
  const [customSynonyms, setCustomSynonyms] = useState('')
  const [result, setResult] = useState(null)
  const t = useMemo(() => makeT(language), [language])

  const canAnalyze = resumeText.trim() && jobs.some((job) => job.text.trim())

  const handleAnalyze = () => {
    if (!canAnalyze) {
      return
    }

    setResult(analyzePortfolio(resumeText, jobs, customSynonyms))
  }

  const handleSample = () => {
    setResumeText(sampleResume)
    setJobs(sampleJds)
    setResult(analyzePortfolio(sampleResume, sampleJds, customSynonyms))
  }

  const handleClear = () => {
    setResumeText('')
    setJobs([emptyJob()])
    setCustomSynonyms('')
    setResult(null)
  }

  return (
    <main className="min-h-screen text-slate-950">
      <Header
        language={language}
        setLanguage={setLanguage}
        onSample={handleSample}
        onClear={handleClear}
        t={t}
      />

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-10 pt-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm leading-6 text-teal-950">
            {t('privacy')}
          </div>

          <ResumeInput value={resumeText} onChange={setResumeText} t={t} />
          <HowItWorks t={t} />
        </div>

        <div className="space-y-6">
          <JDManager jobs={jobs} setJobs={setJobs} t={t} />
          <CustomSynonyms value={customSynonyms} onChange={setCustomSynonyms} t={t} />

          <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-panel sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-slate-600">{t('honestNote')}</p>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {t('analyzeButton')}
            </button>
          </div>
        </div>
      </section>

      <AnalysisDashboard result={result} language={language} t={t} />
    </main>
  )
}

export default App
