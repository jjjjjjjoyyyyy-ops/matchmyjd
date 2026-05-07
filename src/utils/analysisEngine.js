import { buildConceptDictionary, customCategory } from '../data/conceptDictionary.js'
import { experienceTerms, skillCategories, stopWords } from '../data/dictionaries.js'

const CATEGORY_WEIGHTS = {
  aiLlm: 1.25,
  productOps: 1.1,
  dataAnalysis: 1.05,
  translationLocalization: 1.1,
  contentCommunication: 0.95,
  trustSafetyGovernance: 1.05,
  marketingSocialMedia: 0.9,
  toolsSoftware: 0.7,
  languages: 0.75,
  custom: 0.85,
}

const CORE_CATEGORY_IDS = [
  'aiLlm',
  'productOps',
  'dataAnalysis',
  'translationLocalization',
  'contentCommunication',
  'trustSafetyGovernance',
  'marketingSocialMedia',
  'custom',
]

const LANGUAGE_COMMUNICATION_IDS = ['languages', 'contentCommunication']
const ALL_CATEGORIES = [...skillCategories, customCategory]

export function analyzePortfolio(resumeText, jobs, customSynonymText = '') {
  const concepts = buildConceptDictionary(customSynonymText)
  const resumeProfile = buildTextProfile(resumeText, concepts)
  const analyses = jobs
    .filter((job) => job.text.trim())
    .map((job, index) => analyzeJob(resumeText, resumeProfile, job, index, concepts))
    .sort((a, b) => b.overallScore - a.overallScore)
    .map((analysis, index) => ({ ...analysis, rank: index + 1 }))

  return {
    resumeProfile,
    analyses,
    companyGroups: buildCompanyGroups(analyses),
  }
}

export function buildTextProfile(text, concepts = buildConceptDictionary()) {
  const normalized = normalizeText(text)
  const conceptMatches = concepts
    .map((concept) => ({
      concept,
      terms: findTerms(normalized, concept.terms),
    }))
    .filter((match) => match.terms.length > 0)

  const categoryMatches = ALL_CATEGORIES.map((category) => {
    const matches = conceptMatches.filter((match) => match.concept.category === category.id)
    const keywords = unique(matches.flatMap((match) => match.terms))

    return {
      id: category.id,
      label: category.label,
      keywords,
      concepts: matches.map((match) => match.concept),
    }
  })

  const dictionaryKeywords = unique(categoryMatches.flatMap((category) => category.keywords))
  const genericKeywords = extractGenericKeywords(normalized)

  return {
    normalized,
    conceptMatches,
    categoryMatches,
    keywords: unique([...dictionaryKeywords, ...genericKeywords]),
  }
}

function analyzeJob(resumeText, resumeProfile, job, index, concepts) {
  const jdProfile = buildTextProfile(job.text, concepts)
  const categoryScores = ALL_CATEGORIES.map((category) => {
    const jdConceptMatches = jdProfile.conceptMatches.filter((match) => match.concept.category === category.id)
    const resumeConceptMatches = resumeProfile.conceptMatches.filter(
      (match) => match.concept.category === category.id,
    )
    const matchedConceptMatches = jdConceptMatches
      .map((jdMatch) => {
        const resumeMatch = resumeProfile.conceptMatches.find(
          (candidate) => candidate.concept.id === jdMatch.concept.id,
        )

        return resumeMatch ? buildConceptMatch(jdMatch, resumeMatch, resumeText) : null
      })
      .filter(Boolean)
    const missingConcepts = jdConceptMatches
      .filter(
        (jdMatch) =>
          !resumeProfile.conceptMatches.some((candidate) => candidate.concept.id === jdMatch.concept.id),
      )
      .map((jdMatch) => ({
        concept: jdMatch.concept,
        jdSignal: jdMatch.terms[0],
        terms: jdMatch.terms,
      }))

    const score = jdConceptMatches.length
      ? Math.round((matchedConceptMatches.length / jdConceptMatches.length) * 100)
      : null

    return {
      id: category.id,
      label: category.label,
      jdKeywords: unique(jdConceptMatches.map((match) => match.terms[0])),
      resumeKeywords: unique(resumeConceptMatches.flatMap((match) => match.terms)),
      matched: matchedConceptMatches.map((match) => match.concept.label.en),
      missing: missingConcepts.map((match) => match.jdSignal),
      matchedConcepts: matchedConceptMatches,
      missingConcepts,
      score,
    }
  })

  const matchedConcepts = categoryScores.flatMap((category) => category.matchedConcepts)
  const missingConcepts = categoryScores.flatMap((category) => category.missingConcepts)
  const matchedConceptSignals = unique(matchedConcepts.flatMap((match) => [match.jdSignal, match.resumeSignal]))
  const missingKeywords = unique(missingConcepts.map((match) => match.jdSignal))
  const matchedGenericKeywords = jdProfile.keywords
    .filter((keyword) => !matchedConceptSignals.includes(keyword))
    .filter((keyword) => containsTerm(resumeProfile.normalized, keyword))
    .slice(0, 12)
  const matchedKeywords = unique([...matchedConcepts.map((match) => match.jdSignal), ...matchedGenericKeywords])
  const unmappedKeywords = findUnmappedKeywords(jdProfile, resumeProfile, concepts)

  const skillsScore = weightedCategoryAverage(categoryScores, CORE_CATEGORY_IDS, 76)
  const experienceScore = calculateExperienceScore(resumeProfile.normalized, jdProfile.normalized)
  const domainScore = weightedCategoryAverage(categoryScores, CORE_CATEGORY_IDS, 78)
  const toolsScore = weightedCategoryAverage(categoryScores, ['toolsSoftware'], 78)
  const languageScore = weightedCategoryAverage(categoryScores, LANGUAGE_COMMUNICATION_IDS, 82)
  const gapRisk = calculateGapRisk(categoryScores, unmappedKeywords)
  const gapScore = gapRisk.level === 'low' ? 94 : gapRisk.level === 'medium' ? 66 : 38

  const overallScore = clampScore(
    Math.round(
      skillsScore * 0.35 +
        experienceScore * 0.25 +
        domainScore * 0.15 +
        toolsScore * 0.1 +
        languageScore * 0.1 +
        gapScore * 0.05,
    ),
  )

  return {
    id: job.id || `jd-${index + 1}`,
    company: job.company?.trim() || '',
    role: job.role?.trim() || '',
    rawText: job.text,
    overallScore,
    priority: getPriority(overallScore),
    dimensions: {
      skills: skillsScore,
      experience: experienceScore,
      domain: domainScore,
      tools: toolsScore,
      language: languageScore,
      gap: gapScore,
    },
    gapRisk,
    matchedKeywords,
    missingKeywords,
    unmappedKeywords,
    matchedConcepts,
    missingConcepts,
    jdKeywords: jdProfile.keywords.slice(0, 48),
    resumeKeywords: resumeProfile.keywords.slice(0, 48),
    categoryScores,
    jdCategories: categoryScores.filter((category) => category.jdKeywords.length > 0),
    resumeCategories: categoryScores.filter((category) => category.resumeKeywords.length > 0),
    evidenceSnippets: matchedConcepts
      .filter((match) => match.evidence)
      .map((match) => ({
        keyword: match.concept.label.en,
        text: match.evidence,
        jdSignal: match.jdSignal,
        resumeSignal: match.resumeSignal,
        concept: match.concept,
      }))
      .slice(0, 8),
  }
}

function buildConceptMatch(jdMatch, resumeMatch, resumeText) {
  const resumeSignal = resumeMatch.terms[0]

  return {
    concept: jdMatch.concept,
    jdSignal: jdMatch.terms[0],
    resumeSignal,
    jdTerms: jdMatch.terms,
    resumeTerms: resumeMatch.terms,
    evidence: findEvidenceForTerms(resumeText, resumeMatch.terms),
  }
}

function calculateExperienceScore(resumeNormalized, jdNormalized) {
  const jdTerms = unique(experienceTerms.filter((term) => containsTerm(jdNormalized, term)))

  if (!jdTerms.length) {
    return 76
  }

  const matchedTerms = jdTerms.filter((term) => containsTerm(resumeNormalized, term))
  const coverage = matchedTerms.length / jdTerms.length
  const score = 42 + coverage * 58

  return clampScore(Math.round(score))
}

function calculateGapRisk(categoryScores, unmappedKeywords) {
  const relevantCategories = categoryScores.filter((category) => category.jdKeywords.length > 0)
  const coreMissing = relevantCategories
    .filter((category) => category.id !== 'toolsSoftware' && category.id !== 'languages')
    .flatMap((category) => category.missingConcepts)
  const coreTotal = relevantCategories
    .filter((category) => category.id !== 'toolsSoftware' && category.id !== 'languages')
    .flatMap((category) => [...category.matchedConcepts, ...category.missingConcepts])

  if (!coreTotal.length) {
    return {
      level: unmappedKeywords.length > 5 ? 'medium' : 'low',
      missingCount: 0,
      totalCoreKeywords: 0,
      missingRatio: 0,
    }
  }

  const unmappedPenalty = Math.min(unmappedKeywords.length, 6) * 0.025
  const missingRatio = Math.min(1, unique(coreMissing.map((match) => match.concept.id)).length / coreTotal.length + unmappedPenalty)
  const level = missingRatio <= 0.25 ? 'low' : missingRatio <= 0.52 ? 'medium' : 'high'

  return {
    level,
    missingCount: unique(coreMissing.map((match) => match.concept.id)).length,
    totalCoreKeywords: coreTotal.length,
    missingRatio,
  }
}

function weightedCategoryAverage(categoryScores, categoryIds, fallback) {
  const relevant = categoryScores.filter(
    (category) => categoryIds.includes(category.id) && category.score !== null,
  )

  if (!relevant.length) {
    return fallback
  }

  const totalWeight = relevant.reduce((sum, category) => sum + (CATEGORY_WEIGHTS[category.id] || 1), 0)
  const totalScore = relevant.reduce(
    (sum, category) => sum + category.score * (CATEGORY_WEIGHTS[category.id] || 1),
    0,
  )

  return clampScore(Math.round(totalScore / totalWeight))
}

function buildCompanyGroups(analyses) {
  const groups = new Map()

  analyses.forEach((analysis) => {
    const company = analysis.company.trim()

    if (!company) {
      return
    }

    const key = company.toLowerCase()
    const group = groups.get(key) || {
      company,
      roles: [],
    }

    group.roles.push(analysis)
    groups.set(key, group)
  })

  return Array.from(groups.values())
    .filter((group) => group.roles.length > 1)
    .map((group) => ({
      ...group,
      roles: group.roles.sort((a, b) => b.overallScore - a.overallScore),
      topRole: group.roles[0],
    }))
}

function getPriority(score) {
  if (score >= 80) {
    return 'high'
  }

  if (score >= 60) {
    return 'medium'
  }

  return 'low'
}

function findEvidenceForTerms(originalText, terms) {
  const lines = originalText
    .split(/[\n。.!?]+/)
    .map((line) => line.trim())
    .filter(Boolean)

  const line = lines.find((candidate) =>
    terms.some((term) => containsTerm(normalizeText(candidate), term)),
  )

  if (!line) {
    return ''
  }

  return line.length > 220 ? `${line.slice(0, 217)}...` : line
}

function findUnmappedKeywords(jdProfile, resumeProfile, concepts) {
  const conceptCovered = (keyword) =>
    concepts.some((concept) =>
      concept.terms.some((term) => {
        const normalizedKeyword = normalizeText(keyword)
        const normalizedTerm = normalizeText(term)

        return (
          normalizedKeyword === normalizedTerm ||
          normalizedTerm.includes(normalizedKeyword) ||
          normalizedKeyword.includes(normalizedTerm)
        )
      }),
    )

  return jdProfile.keywords
    .filter((keyword) => !conceptCovered(keyword))
    .filter((keyword) => !containsTerm(resumeProfile.normalized, keyword))
    .filter((keyword) => keyword.length >= 4 || /[\u4e00-\u9fff]/.test(keyword))
    .filter((keyword, index, keywords) => !keywords.some((candidate, candidateIndex) => candidateIndex < index && candidate.includes(keyword) && candidate !== keyword))
    .slice(0, 10)
}

function findTerms(normalizedText, terms) {
  return unique(terms.filter((term) => containsTerm(normalizedText, term)))
}

export function normalizeText(text) {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

export function containsTerm(normalizedText, term) {
  const normalizedTerm = normalizeText(term)

  if (!normalizedTerm) {
    return false
  }

  if (/^[a-z0-9+#./&\-\s]+$/.test(normalizedTerm)) {
    const phrase = normalizedTerm.split(/\s+/).map(escapeRegExp).join('\\s+')
    const regex = new RegExp(`(^|[^a-z0-9])${phrase}([^a-z0-9]|$)`, 'i')
    return regex.test(normalizedText)
  }

  return normalizedText.includes(normalizedTerm)
}

function extractGenericKeywords(normalizedText) {
  const words = normalizedText.match(/[a-z][a-z0-9+#./&-]{2,}/g) || []
  const filtered = words.filter((word) => !stopWords.has(word)).filter((word) => !/^\d+$/.test(word))
  const counts = new Map()

  filtered.forEach((word) => counts.set(word, (counts.get(word) || 0) + 1))

  for (let index = 0; index < words.length - 1; index += 1) {
    const first = words[index]
    const second = words[index + 1]

    if (stopWords.has(first) || stopWords.has(second) || /^\d+$/.test(first) || /^\d+$/.test(second)) {
      continue
    }

    const phrase = `${first} ${second}`

    if (phrase.length >= 9) {
      counts.set(phrase, (counts.get(phrase) || 0) + 1.5)
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 36)
    .map(([word]) => word)
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)))
}

function clampScore(score) {
  return Math.max(0, Math.min(100, score))
}
