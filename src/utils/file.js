export const FILE_ACCEPT =
  '.txt,.pdf,.doc,.docx,text/plain,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export async function extractTextFromFile(file, t) {
  if (!file) {
    return ''
  }

  const extension = getExtension(file.name)
  const type = file.type

  if (extension === 'txt' || type === 'text/plain') {
    return file.text()
  }

  if (extension === 'docx' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return extractDocx(file, t)
  }

  if (extension === 'pdf' || type === 'application/pdf') {
    return extractPdf(file, t)
  }

  if (extension === 'doc' || type === 'application/msword') {
    throw new Error(t('docFallback'))
  }

  throw new Error(t('unsupportedFile'))
}

async function extractDocx(file, t) {
  try {
    const mammoth = await import('mammoth/mammoth.browser.js')
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.default.extractRawText({ arrayBuffer })
    const text = result.value?.trim()

    if (!text) {
      throw new Error(t('fileParseFailed'))
    }

    return text
  } catch (error) {
    throw new Error(error.message || t('fileParseFailed'))
  }
}

async function extractPdf(file, t) {
  try {
    const [{ getDocument, GlobalWorkerOptions }, workerModule] = await Promise.all([
      import('pdfjs-dist/build/pdf.mjs'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
    ])
    GlobalWorkerOptions.workerSrc = workerModule.default
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await getDocument({ data: new Uint8Array(arrayBuffer) }).promise
    const pageTexts = []

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber)
      const content = await page.getTextContent()
      const text = content.items.map((item) => item.str).join(' ')

      if (text.trim()) {
        pageTexts.push(text.trim())
      }
    }

    const text = pageTexts.join('\n\n').trim()

    if (!text) {
      throw new Error(t('pdfScannedFallback'))
    }

    return text
  } catch (error) {
    throw new Error(error.message || t('pdfScannedFallback'))
  }
}

function getExtension(fileName) {
  return fileName.split('.').pop()?.toLowerCase() || ''
}
