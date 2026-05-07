export const customCategory = {
  id: 'custom',
  label: {
    en: 'Custom synonyms',
    zh: '自定义同义词',
  },
}

export const builtInConcepts = [
  concept('llm', 'aiLlm', 'LLM / large language model', '大语言模型 / 大模型', [
    'LLM',
    'large language model',
    'large language models',
    '大语言模型',
    '大模型',
  ]),
  concept('ai', 'aiLlm', 'AI / artificial intelligence', '人工智能', [
    'AI',
    'artificial intelligence',
    '人工智能',
  ]),
  concept('aigc', 'aiLlm', 'AIGC / AI-generated content', '生成式 AI', [
    'AIGC',
    'AI-generated content',
    'AI generated content',
    '生成式AI',
    '生成式人工智能',
  ]),
  concept('prompt-engineering', 'aiLlm', 'Prompt engineering', '提示词设计', [
    'prompt',
    'prompting',
    'prompt engineering',
    '提示词',
    '提示词设计',
    'prompt设计',
  ]),
  concept('model-evaluation', 'aiLlm', 'Model evaluation', '模型评估 / AI 评测', [
    'model evaluation',
    'AI evaluation',
    'AI output evaluation',
    '模型评估',
    'AI评测',
    'AI输出评估',
  ]),
  concept('hallucination', 'aiLlm', 'Hallucination', '模型幻觉', [
    'hallucination',
    '幻觉',
    '模型幻觉',
  ]),
  concept('machine-translation', 'aiLlm', 'Machine translation', '机器翻译', [
    'machine translation',
    'MT',
    '机器翻译',
  ]),
  concept('nlp', 'aiLlm', 'NLP / natural language processing', '自然语言处理', [
    'NLP',
    'natural language processing',
    '自然语言处理',
  ]),
  concept('automation', 'aiLlm', 'Automation', '自动化', ['automation', '自动化']),

  concept('workflow', 'productOps', 'Workflow', '工作流 / 工作流程', [
    'workflow',
    'work flow',
    '工作流',
    '工作流程',
    '流程',
  ]),
  concept('product-operations', 'productOps', 'Product operations', '产品运营', [
    'product operations',
    '产品运营',
  ]),
  concept('product-management', 'productOps', 'Product management', '产品管理 / 产品经理', [
    'product management',
    'product manager',
    '产品管理',
    '产品经理',
  ]),
  concept('user-research', 'productOps', 'User research', '用户研究', [
    'user research',
    '用户研究',
  ]),
  concept('requirement-analysis', 'productOps', 'Requirement analysis', '需求分析', [
    'requirement analysis',
    'requirements analysis',
    '需求分析',
  ]),
  concept('process-optimization', 'productOps', 'Process optimization', '流程优化 / 工作流优化', [
    'process optimization',
    'workflow optimization',
    '流程优化',
    '工作流优化',
  ]),
  concept('content-operations', 'productOps', 'Content operations', '内容运营', [
    'content operations',
    '内容运营',
  ]),
  concept('platform-operations', 'productOps', 'Platform operations', '平台运营', [
    'platform operations',
    '平台运营',
  ]),
  concept('project-management', 'productOps', 'Project management', '项目管理', [
    'project management',
    '项目管理',
  ]),
  concept('cross-functional-collaboration', 'productOps', 'Cross-functional collaboration', '跨部门协作', [
    'cross-functional collaboration',
    'cross functional collaboration',
    '跨部门协作',
    '跨团队协作',
  ]),

  concept('data-analysis', 'dataAnalysis', 'Data analysis', '数据分析', [
    'data analysis',
    '数据分析',
  ]),
  concept('sql', 'dataAnalysis', 'SQL', 'SQL 查询', ['SQL', 'SQL查询']),
  concept('excel', 'dataAnalysis', 'Excel / spreadsheet', '表格 / 电子表格', [
    'Excel',
    'spreadsheet',
    'spreadsheets',
    '表格',
    '电子表格',
  ]),
  concept('metrics', 'dataAnalysis', 'Metrics', '指标 / 数据指标', [
    'metrics',
    'metric',
    '指标',
    '数据指标',
  ]),
  concept('dashboard', 'dataAnalysis', 'Dashboard', '数据看板', [
    'dashboard',
    'data dashboard',
    '看板',
    '数据看板',
  ]),
  concept('reporting', 'dataAnalysis', 'Reporting', '报告 / 报表', [
    'reporting',
    'report',
    'reports',
    '报告',
    '报表',
  ]),
  concept('data-cleaning', 'dataAnalysis', 'Data cleaning', '数据清洗', [
    'data cleaning',
    '数据清洗',
  ]),
  concept('visualization', 'dataAnalysis', 'Data visualization', '数据可视化', [
    'visualization',
    'data visualization',
    '可视化',
    '数据可视化',
  ]),
  concept('ab-testing', 'dataAnalysis', 'A/B testing', 'A/B 测试', [
    'A/B testing',
    'AB testing',
    'A/B测试',
    'AB测试',
  ]),
  concept('annotation', 'dataAnalysis', 'Data annotation', '数据标注', [
    'annotation',
    'data annotation',
    '标注',
    '数据标注',
  ]),
  concept('evaluation', 'dataAnalysis', 'Evaluation / assessment', '评估', [
    'evaluation',
    'assessment',
    '评估',
  ]),

  concept('translation', 'translationLocalization', 'Translation', '翻译', [
    'translation',
    'translations',
    '翻译',
  ]),
  concept('interpretation', 'translationLocalization', 'Interpretation', '口译', [
    'interpretation',
    'interpreting',
    '口译',
  ]),
  concept('localization', 'translationLocalization', 'Localization', '本地化', [
    'localization',
    'localisation',
    '本地化',
  ]),
  concept('bilingual-localization', 'translationLocalization', 'Bilingual', '双语', [
    'bilingual',
    '双语',
  ]),
  concept('terminology', 'translationLocalization', 'Terminology', '术语', [
    'terminology',
    '术语',
  ]),
  concept('cat-tools', 'translationLocalization', 'CAT tools', '计算机辅助翻译', [
    'CAT tools',
    'CAT',
    '计算机辅助翻译',
  ]),
  concept('post-editing', 'translationLocalization', 'Post-editing', '译后编辑', [
    'post-editing',
    'post editing',
    '译后编辑',
  ]),
  concept('corpus', 'translationLocalization', 'Corpus', '语料库', ['corpus', '语料库']),
  concept('translation-memory', 'translationLocalization', 'Translation memory', '翻译记忆库', [
    'TMX',
    'translation memory',
    'TM',
    '翻译记忆库',
  ]),
  concept('machine-translation-localization', 'translationLocalization', 'Machine translation', '机器翻译', [
    'machine translation',
    'MT',
    '机器翻译',
  ]),

  concept('trust-safety', 'trustSafetyGovernance', 'Trust and safety', '信任与安全', [
    'trust and safety',
    'T&S',
    '信任与安全',
  ]),
  concept('content-safety', 'trustSafetyGovernance', 'Content safety', '内容安全', [
    'content safety',
    '内容安全',
  ]),
  concept('moderation', 'trustSafetyGovernance', 'Content moderation', '内容审核', [
    'moderation',
    'content moderation',
    '审核',
    '内容审核',
  ]),
  concept('platform-governance', 'trustSafetyGovernance', 'Platform governance', '平台治理', [
    'platform governance',
    '平台治理',
  ]),
  concept('risk-control', 'trustSafetyGovernance', 'Risk control / management', '风险控制 / 风险管理', [
    'risk control',
    'risk management',
    '风险控制',
    '风险管理',
  ]),
  concept('policy-enforcement', 'trustSafetyGovernance', 'Policy enforcement', '政策执行', [
    'policy',
    'policy enforcement',
    '政策',
    '政策执行',
  ]),
  concept('compliance', 'trustSafetyGovernance', 'Compliance', '合规', ['compliance', '合规']),
  concept('safety-evaluation', 'trustSafetyGovernance', 'Safety evaluation', '安全评估', [
    'safety evaluation',
    '安全评估',
  ]),
  concept('harmful-content', 'trustSafetyGovernance', 'Harmful content', '有害内容', [
    'harmful content',
    '有害内容',
  ]),
  concept('search-safety', 'trustSafetyGovernance', 'Search safety', '搜索安全', [
    'search safety',
    '搜索安全',
  ]),

  concept('content-creation', 'contentCommunication', 'Content creation', '内容创作', [
    'content creation',
    '内容创作',
  ]),
  concept('copywriting', 'contentCommunication', 'Copywriting', '文案写作', [
    'copywriting',
    '文案',
    '文案写作',
  ]),
  concept('editing', 'contentCommunication', 'Editing', '编辑', ['editing', '编辑']),
  concept('writing', 'contentCommunication', 'Writing', '写作', ['writing', '写作']),
  concept('communication', 'contentCommunication', 'Communication', '沟通', [
    'communication',
    '沟通',
  ]),
  concept('cross-cultural-communication', 'contentCommunication', 'Cross-cultural communication', '跨文化沟通', [
    'cross-cultural communication',
    'cross cultural communication',
    '跨文化沟通',
  ]),
  concept('social-media-content', 'contentCommunication', 'Social media', '社交媒体', [
    'social media',
    '社交媒体',
  ]),
  concept('storytelling', 'contentCommunication', 'Storytelling', '叙事 / 故事化表达', [
    'storytelling',
    '叙事',
    '故事化表达',
  ]),

  concept('marketing', 'marketingSocialMedia', 'Marketing', '市场营销', [
    'marketing',
    '市场营销',
  ]),
  concept('digital-marketing', 'marketingSocialMedia', 'Digital marketing', '数字营销', [
    'digital marketing',
    '数字营销',
  ]),
  concept('campaign', 'marketingSocialMedia', 'Campaign', '营销活动', ['campaign', '营销活动']),
  concept('user-growth', 'marketingSocialMedia', 'User growth', '用户增长', [
    'user growth',
    '用户增长',
  ]),
  concept('brand', 'marketingSocialMedia', 'Brand', '品牌', ['brand', '品牌']),
  concept('social-platforms', 'marketingSocialMedia', 'Social platforms', '社交平台', [
    'TikTok',
    'Xiaohongshu',
    'Douyin',
    'Instagram',
    'SEO',
    '小红书',
    '抖音',
  ]),

  concept('office-tools', 'toolsSoftware', 'Office tools', '办公软件', [
    'Microsoft Office',
    'PowerPoint',
    'Google Workspace',
    '办公软件',
  ]),
  concept('design-tools', 'toolsSoftware', 'Design tools', '设计工具', [
    'Photoshop',
    'Figma',
    'Canva',
  ]),
  concept('technical-tools', 'toolsSoftware', 'Technical tools', '技术工具', [
    'Python',
    'GitHub',
    'Notion',
    '数据工具',
  ]),
  concept('collaboration-tools', 'toolsSoftware', 'Collaboration tools', '协作工具', [
    'Feishu',
    'Lark',
    '飞书',
    '腾讯文档',
  ]),

  concept('english', 'languages', 'English', '英语', ['English', '英语']),
  concept('chinese', 'languages', 'Chinese', '中文', ['Chinese', '中文']),
  concept('mandarin', 'languages', 'Mandarin', '普通话', ['Mandarin', '普通话']),
  concept('cantonese', 'languages', 'Cantonese', '粤语', ['Cantonese', '粤语']),
  concept('french', 'languages', 'French', '法语', ['French', '法语']),
  concept('korean', 'languages', 'Korean', '韩语', ['Korean', '韩语']),
  concept('portuguese', 'languages', 'Portuguese', '葡萄牙语', ['Portuguese', '葡萄牙语']),
  concept('bilingual-language', 'languages', 'Bilingual', '双语', ['bilingual', '双语']),
  concept('multilingual', 'languages', 'Multilingual', '多语', ['multilingual', '多语']),
]

export function parseCustomConcepts(rawText) {
  return rawText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => parseCustomLine(line, index))
    .filter(Boolean)
}

export function buildConceptDictionary(customSynonymText = '') {
  return [...builtInConcepts, ...parseCustomConcepts(customSynonymText)]
}

function parseCustomLine(line, index) {
  const [left, ...rightParts] = line.split('=')
  const right = rightParts.join('=')

  if (!left?.trim() || !right?.trim()) {
    return null
  }

  const primary = left.trim()
  const terms = unique([
    primary,
    ...right
      .split(',')
      .map((term) => term.trim())
      .filter(Boolean),
  ])

  if (terms.length < 2) {
    return null
  }

  return {
    id: `custom-${index}-${slugify(primary)}`,
    category: customCategory.id,
    label: {
      en: primary,
      zh: primary,
    },
    terms,
    source: 'custom',
  }
}

function concept(id, category, en, zh, terms) {
  return {
    id,
    category,
    label: {
      en,
      zh,
    },
    terms: unique(terms),
    source: 'built-in',
  }
}

function slugify(value) {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)))
}
