# MatchMyJD

MatchMyJD is a free, privacy-friendly resume and job description (JD) matching analyzer. It compares one resume with multiple JDs, highlights matched skills and areas to clarify, ranks roles by application priority, and shows the resume evidence behind each match.

## What It Does

- Paste one resume and one or more job descriptions.
- Upload TXT, DOCX, selectable-text PDF, or legacy DOC files with a friendly DOC fallback.
- Use built-in bilingual concept mapping for English and Simplified Chinese terms.
- Add Custom Synonyms for industry-specific, bilingual, or company-specific expressions.
- Rank roles by Match Score and Application Priority.
- Show matched concepts, resume evidence snippets, possible unmapped job keywords, keyword maps, and company-level role ranking.
- Switch between English and Simplified Chinese UI.
- Customize the logo by adding `public/logo.png`.

## Privacy

MatchMyJD does not use OpenAI, Claude, Gemini, online translation, paid APIs, backend services, databases, API keys, or login.

All resume parsing, job description parsing, synonym matching, and scoring run locally in the browser. Files and text are not uploaded, stored, or sent to any server.

## Bilingual Concept Mapping

MatchMyJD uses concept groups instead of only literal keyword matching. For example, if a JD says `workflow` and the resume says `工作流`, the app can count that as one matched concept.

The app does not automatically translate text. It uses built-in bilingual concept mapping and optional Custom Synonyms. Users can add custom groups like:

- workflow = 工作流, 工作流程, 流程
- LLM = 大语言模型, 大模型
- vendor management = 供应商管理
- risk assessment = 风险评估

Custom Synonyms improve matching between resumes and JDs that use different languages, industry terms, or company-specific wording. They help the app produce more accurate match scores, keyword comparisons, and resume evidence snippets while keeping everything free and private.

## Supported Uploads

- TXT: plain text files are supported.
- DOCX: text is extracted locally in the browser with Mammoth.
- PDF: selectable-text PDFs are supported through PDF.js.
- DOC: legacy DOC files can be selected, but parsing is limited. Users may need to save the file as DOCX or paste the text manually.

PNG, JPG, scanned PDFs, OCR, and image parsing are not supported.

## How Analysis Works

MatchMyJD uses client-side text normalization, keyword extraction, bilingual concept mapping, custom synonym matching, skill category mapping, weighted scoring, gap adjustment, and resume evidence matching.

It is a first-pass role-fit analyzer, not a hiring prediction tool. It should be used to prioritize applications and identify which resume evidence could be made clearer.

Scoring weights:

- Skills match: 35%
- Experience match: 25%
- Domain relevance: 15%
- Tools/technical match: 10%
- Language and communication match: 10%
- Gap adjustment: 5%

Application priority:

- High priority: 80% and above
- Medium priority: 60% to 79%
- Low priority: below 60%

## Local Development

Install dependencies:

npm install

Start the local dev server:

npm run dev

Create a production build:

npm run build

Output directory:

dist

## GitHub Setup

git init
git add .
git commit -m "Initial MatchMyJD app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/matchmyjd.git
git push -u origin main

## Cloudflare Pages Deployment

1. Push this project to GitHub.
2. In Cloudflare, go to Workers & Pages.
3. Create a Pages project and connect the repository.
4. Use these settings:
   - Framework preset: Vite
   - Build command: npm run build
   - Output directory: dist
5. Deploy.

No environment variables or API keys are required.

## Logo Customization

To customize the logo, place your image at:

public/logo.png

If no image is provided, the app uses the default icon logo.

## Limitations

- The app does not use AI APIs or online translation.
- It cannot guarantee hiring outcomes or interview probability.
- It works best as a first-pass role-fit and resume evidence review tool.
- Scanned PDFs and image files are not supported.
