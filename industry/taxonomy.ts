// 这个行业的分类体系：类别、标签词表、机构（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉模型怎么归类。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 */
export const CATEGORIES = [
  { key: "policy", label: "政策变动", section: "政策变动", guide: "各入境计划的门槛、配额与规则调整，法例与指引修订，新政策公布与公众咨询" },
  { key: "schemes", label: "计划动态", section: "计划动态", guide: "优才、高才通、专才、投资、进修、外劳等各入境计划的官方动态、申请要求与文件清单变化" },
  { key: "practice", label: "审理实务", section: "审理实务", guide: "审批时间与补件要求变化、审理口径、执法行动、e-道与网上服务等办理安排调整" },
  { key: "data", label: "数据与名单", section: "数据与名单", guide: "官方统计数据、获批与申请数字、配额使用、人才清单等各类名单的公布" },
  { key: "residency", label: "续签与永居", section: "续签与永居", guide: "延长逗留期限、核实永久性居民资格、通常居住证明相关的规则与实务动态" },
  { key: "industry", label: "行业", section: "行业与观点", guide: "移民服务行业经营与监管动态、机构与法院判例、市场变化、观点与解读" },
] as const;

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["policy_change", "official_release", "data_release", "practice_update", "industry_event", "opinion_analysis", "explainer_guide"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "政策变动", "计划动态", "审理实务", "数据/统计", "名单/配额", "续签/永居", "官方公告", "行业动态", "观点/分析", "解读/指南", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "优才计划", "高才通", "专才/输入内地人才", "投资移民", "进修移民", "外劳计划", "人才清单", "审批时间", "补件", "通常居住", "e-道/网上服务", "政策咨询", "签证/入境安排", "受养人/K12", "旅行证件",
] as const;

/** 可选的实体标签（机构、部门）。 */
export const ENTITY_TAGS = ["入境事务处", "劳工处", "立法会", "政府统计处", "特区政府"] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  优才: "优才计划", 优秀人才入境计划: "优才计划", qmas: "优才计划",
  高才: "高才通", 高才通计划: "高才通", 高端人才通行证计划: "高才通", ttps: "高才通",
  专才: "专才/输入内地人才", 输入内地人才计划: "专才/输入内地人才", 一般就业政策: "专才/输入内地人才", gep: "专才/输入内地人才",
  投资入境: "投资移民", 新资本投资者入境计划: "投资移民", 资本投资者: "投资移民",
  留学: "进修移民", 进修: "进修移民", 学生签证: "进修移民",
  外劳: "外劳计划", 补充劳工: "外劳计划", 输入劳工: "外劳计划", 劳工输入计划: "外劳计划",
  永居: "续签/永居", 永久居民: "续签/永居", 核实永久性居民: "续签/永居", 延长逗留: "续签/永居", 续签: "续签/永居",
  政策: "政策变动", 法例: "政策变动", 修例: "政策变动", 咨询: "政策咨询", 公众咨询: "政策咨询",
  统计: "数据/统计", 数据: "数据/统计", 数字: "数据/统计", 配额: "名单/配额", 名单: "名单/配额", 人才清单: "人才清单",
  公告: "官方公告", 新闻公报: "官方公告", 新闻稿: "官方公告", 审批: "审批时间", 审理: "审理实务", 补件信: "补件",
  评论: "观点/分析", 分析: "观点/分析", 观点: "观点/分析", 攻略: "解读/指南", 指南: "解读/指南", 解读: "解读/指南",
  行业: "行业动态", 中介: "行业动态", 动态: "行业动态",
};

/** 模型漏了分类标签时，按内容类型补一个。 */
export const CATEGORY_BY_ITEM_TYPE: Readonly<Record<string, string>> = {
  policy_change: "政策变动", official_release: "官方公告", data_release: "数据/统计", practice_update: "审理实务",
  industry_event: "行业动态", opinion_analysis: "观点/分析", explainer_guide: "解读/指南",
};

// ── 机构与主体 ──────────────────────────────────────────────────────────────────────────

/** 机构主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[] }> = {
  immd: { name: "入境事务处", displayTag: "入境事务处", aliases: ["入境处", "入境事务处", "Immigration Department", "IMMD"] },
  labour: { name: "劳工处", displayTag: "劳工处", aliases: ["劳工处", "Labour Department"] },
  legco: { name: "立法会", displayTag: "立法会", aliases: ["立法会", "LegCo", "立法会秘书处"] },
  censtatd: { name: "政府统计处", displayTag: "政府统计处", aliases: ["统计处", "政府统计处", "Census and Statistics Department"] },
  hksarg: { name: "香港特区政府", displayTag: "特区政府", aliases: ["特区政府", "香港特别行政区政府", "保安局", "政务司", "行政长官"] },
};

/**
 * 身份词典：摘要和标题里出现的机构，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 行业没有这个问题时可以留空数组。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "immd", name: "入境事务处", patterns: [/入境處|入境处|入境事務處|入境事务处|immigration\s*department|\bimmd\b/i] },
  { id: "labour", name: "劳工处", patterns: [/勞工處|劳工处|labour\s*department/i] },
  { id: "legco", name: "立法会", patterns: [/立法會|立法会|legislative\s*council|\blegco\b/i] },
  { id: "censtatd", name: "政府统计处", patterns: [/統計處|统计处|census\s*(?:and|&)\s*statistics/i] },
  { id: "hksarg", name: "特区政府", patterns: [/特區政府|特区政府|香港特別行政區政府|香港特别行政区政府|保安局|政務司司长|政务司司长|行政長官|行政长官/i] },
];

/** 这些域名上的文章，发布方就是对应的机构（新闻聚合页如 info.gov.hk、news.gov.hk 归特区政府）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "immd", domains: ["immd.gov.hk"] },
  { entityId: "labour", domains: ["labour.gov.hk"] },
  { entityId: "legco", domains: ["legco.gov.hk"] },
  { entityId: "censtatd", domains: ["censtatd.gov.hk"] },
  { entityId: "hksarg", domains: ["gov.hk", "news.gov.hk", "info.gov.hk"] },
];

/** 原文里的这些写法也算提到了对应机构。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "immd", pattern: /\bImmd\b/ },
];
