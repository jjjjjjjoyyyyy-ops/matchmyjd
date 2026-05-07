import { useState } from 'react'
import { BriefcaseBusiness, Plus, Trash2, Upload } from 'lucide-react'
import { extractTextFromFile, FILE_ACCEPT } from '../utils/file.js'

const createJob = () => ({
  id: crypto.randomUUID(),
  company: '',
  role: '',
  text: '',
})

function JDManager({ jobs, setJobs, t }) {
  const [fileStates, setFileStates] = useState({})

  const updateJob = (id, patch) => {
    setJobs((current) => current.map((job) => (job.id === id ? { ...job, ...patch } : job)))
  }

  const removeJob = (id) => {
    setJobs((current) => (current.length === 1 ? current : current.filter((job) => job.id !== id)))
  }

  const setFileState = (id, patch) => {
    setFileStates((current) => ({
      ...current,
      [id]: {
        ...(current[id] || {}),
        ...patch,
      },
    }))
  }

  const handleFile = async (jobId, file) => {
    if (!file) {
      return
    }

    setFileState(jobId, { status: t('extractingFile'), error: '' })

    try {
      const text = await extractTextFromFile(file, t)
      updateJob(jobId, { text })
      setFileState(jobId, { status: '', error: '' })
    } catch (fileError) {
      setFileState(jobId, { status: '', error: fileError.message || t('fileParseFailed') })
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
            <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-950">{t('jdTitle')}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">{t('jdIntro')}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setJobs((current) => [...current, createJob()])}
          className="inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-slate-950 px-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t('addJd')}
        </button>
      </div>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <article key={job.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-slate-700">
                {t('jobCardLabel')} {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeJob(job.id)}
                disabled={jobs.length === 1}
                className="inline-flex min-h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
                title={t('removeJd')}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                {t('removeJd')}
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                  {t('company')} · {t('optional')}
                </span>
                <input
                  value={job.company}
                  onChange={(event) => updateJob(job.id, { company: event.target.value })}
                  className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                  {t('role')} · {t('optional')}
                </span>
                <input
                  value={job.role}
                  onChange={(event) => updateJob(job.id, { role: event.target.value })}
                  className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                />
              </label>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase text-slate-500">{t('jdText')}</span>
                <label className="inline-flex min-h-9 cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300">
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  {t('jdUpload')}
                  <input
                    type="file"
                    accept={FILE_ACCEPT}
                    className="sr-only"
                    onChange={(event) => {
                      handleFile(job.id, event.target.files?.[0])
                      event.target.value = ''
                    }}
                  />
                </label>
              </div>
              <p className="mb-2 text-xs leading-5 text-slate-500">{t('uploadHelp')}</p>
              {fileStates[job.id]?.status ? (
                <p className="mb-2 text-sm font-semibold text-sky-700">{fileStates[job.id].status}</p>
              ) : null}
              {fileStates[job.id]?.error ? (
                <p className="mb-2 text-sm font-semibold text-rose-700">{fileStates[job.id].error}</p>
              ) : null}
              <textarea
                value={job.text}
                onChange={(event) => updateJob(job.id, { text: event.target.value })}
                placeholder={t('jdPlaceholder')}
                className="min-h-[190px] w-full rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default JDManager
