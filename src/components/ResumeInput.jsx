import { useState } from 'react'
import { FileText, Upload } from 'lucide-react'
import { extractTextFromFile, FILE_ACCEPT } from '../utils/file.js'

function ResumeInput({ value, onChange, t }) {
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const handleFile = async (file) => {
    if (!file) {
      return
    }

    setError('')
    setStatus(t('extractingFile'))

    try {
      const text = await extractTextFromFile(file, t)
      onChange(text)
      setStatus('')
    } catch (fileError) {
      setError(fileError.message || t('fileParseFailed'))
      setStatus('')
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-950">{t('resumeTitle')}</h2>
          <p className="text-sm leading-6 text-slate-500">{t('parsingNote')}</p>
        </div>
      </div>

      <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white">
        <Upload className="h-4 w-4" aria-hidden="true" />
        {t('resumeUpload')}
        <input
          type="file"
          accept={FILE_ACCEPT}
          className="sr-only"
          onChange={(event) => {
            handleFile(event.target.files?.[0])
            event.target.value = ''
          }}
        />
      </label>
      <p className="mt-2 text-xs leading-5 text-slate-500">{t('uploadHelp')}</p>
      {status ? <p className="mt-2 text-sm font-semibold text-sky-700">{status}</p> : null}
      {error ? <p className="mt-2 text-sm font-semibold text-rose-700">{error}</p> : null}

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t('resumePlaceholder')}
        className="min-h-[360px] w-full rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
      />
    </section>
  )
}

export default ResumeInput
