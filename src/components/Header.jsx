import { useState } from 'react'
import { ClipboardCheck, Languages, RotateCcw, Sparkles } from 'lucide-react'

function Header({ language, setLanguage, onSample, onClear, t }) {
  const [logoAvailable, setLogoAvailable] = useState(true)

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              {logoAvailable ? (
                <img
                  src="/logo.png"
                  alt=""
                  className="h-11 w-11 rounded-lg object-contain"
                  onError={() => setLogoAvailable(false)}
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                </div>
              )}
              <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">{t('appName')}</h1>
            </div>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('positioning')}</p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <div className="inline-flex min-w-max rounded-lg border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-md px-3 text-sm font-semibold transition ${
                  language === 'en' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-950'
                }`}
                title={t('languageEnglish')}
              >
                <Languages className="h-4 w-4" aria-hidden="true" />
                {t('languageEnglish')}
              </button>
              <button
                type="button"
                onClick={() => setLanguage('zh')}
                className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-md px-3 text-sm font-semibold transition ${
                  language === 'zh' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-950'
                }`}
                title={t('languageChinese')}
              >
                {t('languageChinese')}
              </button>
            </div>

            <button
              type="button"
              onClick={onSample}
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t('sampleButton')}
            </button>

            <button
              type="button"
              onClick={onClear}
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t('clearButton')}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
