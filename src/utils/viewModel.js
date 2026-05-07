export function getPriorityLabels(t) {
  return {
    high: t('highPriority'),
    medium: t('mediumPriority'),
    low: t('lowPriority'),
  }
}

export function getGapLabels(t) {
  return {
    low: t('lowGap'),
    medium: t('mediumGap'),
    high: t('highGap'),
  }
}

export function formatList(items, empty) {
  return items.length ? items.join(', ') : empty
}

export function topCategoryLabels(analysis, language) {
  return analysis.categoryScores
    .filter((category) => category.jdKeywords.length && category.matchedConcepts?.length)
    .sort((a, b) => b.matchedConcepts.length - a.matchedConcepts.length)
    .slice(0, 3)
    .map((category) => category.label[language])
}

export function buildStrengths(analysis, language, t) {
  const categoryStrengths = analysis.categoryScores
    .filter((category) => category.matchedConcepts?.length)
    .sort((a, b) => b.matchedConcepts.length - a.matchedConcepts.length)
    .slice(0, 4)
    .map((category) => {
      const concepts = category.matchedConcepts
        .slice(0, 5)
        .map((match) => match.concept.label[language])
        .join(', ')

      if (language === 'zh') {
        return `${category.label.zh}匹配较好：${concepts}`
      }

      return `Strong overlap in ${category.label.en}: ${concepts}`
    })

  if (categoryStrengths.length) {
    return categoryStrengths
  }

  return analysis.matchedKeywords.slice(0, 4).map((keyword) => `${t('matched')}: ${keyword}`)
}

export function buildGaps(analysis, language, t) {
  const gaps = analysis.categoryScores
    .filter((category) => category.missingConcepts?.length)
    .sort((a, b) => b.missingConcepts.length - a.missingConcepts.length)
    .slice(0, 4)
    .map((category) => {
      const keywords = category.missingConcepts
        .slice(0, 5)
        .map((match) => match.jdSignal)
        .join(', ')

      if (language === 'zh') {
        return `${category.label.zh}中有些岗位要求还不够明显：${keywords}`
      }

      return `JD asks for ${category.label.en} signals not found through direct or mapped resume evidence: ${keywords}`
    })

  if (gaps.length) {
    return gaps
  }

  return analysis.missingKeywords.slice(0, 4).map((keyword) => `${t('missing')}: ${keyword}`)
}

export function buildSuggestions(analysis, language) {
  const missing = analysis.missingKeywords.slice(0, 6).join(', ')
  const matched = analysis.matchedConcepts
    .slice(0, 5)
    .map((match) => match.concept.label[language])
    .join(', ')

  if (language === 'zh') {
    const suggestions = [
      matched ? `建议把这些已匹配能力放得更清楚：${matched}。` : '补充更具体的项目、工具和结果描述，让匹配证据更清晰。',
    ]

    if (missing) {
      suggestions.push(`如果确实具备相关经历，可以补充岗位要求中暂未匹配到的表达：${missing}。`)
    }

    suggestions.push('优先用具体项目、指标、流程改进或评估标准证明能力，不要只堆关键词。')
    return suggestions
  }

  const suggestions = [
    matched
      ? `Keep these matched concepts visible near the top of the resume: ${matched}.`
      : 'Add clearer project, tool, and outcome details so the matcher can find stronger evidence.',
  ]

  if (missing) {
    suggestions.push(`If accurate, add evidence for JD keywords currently not matched in the resume: ${missing}.`)
  }

  suggestions.push('Use concrete projects, metrics, workflow improvements, or evaluation criteria instead of keyword stuffing.')
  return suggestions
}

export function buildStrategy(analysis, language, priorityLabels, gapLabels) {
  const matched = analysis.matchedConcepts
    .slice(0, 4)
    .map((match) => match.concept.label[language])
    .join(', ')
  const missing = analysis.missingKeywords.slice(0, 4).join(', ')

  if (language === 'zh') {
    if (analysis.priority === 'high') {
      return `建议作为${priorityLabels.high}岗位处理。当前匹配证据集中在 ${matched || '核心能力'}，简历需要补充的程度为“${gapLabels[analysis.gapRisk.level]}”。投递前可以把相关项目和结果放在更靠前的位置。`
    }

    if (analysis.priority === 'medium') {
      return `建议作为${priorityLabels.medium}岗位处理。已有一定匹配点：${matched || '部分岗位关键词'}，但还需要把 ${missing || '岗位核心要求'} 写得更清楚。`
    }

    return `建议作为${priorityLabels.low}岗位处理，除非你能补充真实经历来覆盖 ${missing || '目前不够明显的要求'}。可以先投递匹配分数更高的岗位。`
  }

  if (analysis.priority === 'high') {
    return `Treat this as a ${priorityLabels.high} role. Evidence clusters around ${matched || 'core role signals'} with ${gapLabels[analysis.gapRisk.level]}. Before applying, move the strongest related projects and outcomes higher in the resume.`
  }

  if (analysis.priority === 'medium') {
    return `Treat this as a ${priorityLabels.medium} role. There is useful overlap around ${matched || 'some JD terms'}, but the resume should clarify evidence for ${missing || 'the main JD requirements'}.`
  }

  return `Treat this as a ${priorityLabels.low} role unless you can truthfully add stronger evidence for ${missing || 'the main gaps'}. Prioritize better-matched roles first.`
}

export function buildCompanyReason(topRole, language, gapLabels) {
  const matched = topRole.matchedConcepts
    .slice(0, 4)
    .map((match) => match.concept.label[language])
    .join(', ')
  const gaps = topRole.missingKeywords.slice(0, 3).join(', ')

  if (language === 'zh') {
    return `这个岗位在同公司岗位中匹配分数最高，匹配能力包括 ${matched || '核心能力'}，简历需要补充的程度为“${gapLabels[topRole.gapRisk.level]}”。需要留意的内容：${gaps || '暂未发现明显短板'}。`
  }

  return `This role has the strongest score within the company group, with matched evidence around ${matched || 'core skills'} and ${gapLabels[topRole.gapRisk.level]}. Main watch-outs: ${gaps || 'no major core gap detected'}.`
}
