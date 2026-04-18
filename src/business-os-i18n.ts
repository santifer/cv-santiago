export const businessOsContent = {
  zh: {
    slug: 'business-os-para-airtable',
    altSlug: 'business-os-for-airtable',
    readingTime: '15 分钟阅读',
    seo: {
      title: '我如何使用 Airtable 为 30,000+ 次维修构建自定义业务操作系统（每月节省 170 小时） | xueyifan.io',
      description: '案例研究：我如何利用 12 个 Airtable 库、2,100+ 个字段和 50+ 项自动化构建业务操作系统，在一家完成 30,000+ 次维修的手机维修业务中每月节省 170 小时。',
    },
    nav: {
      breadcrumbHome: '首页',
      breadcrumbCurrent: 'Business OS',
    },
    header: {
      kicker: '案例研究：薛一凡 iRepair',
      h1: '支持 30,000+ 次维修的业务操作系统',
      subtitle: '我如何使用 Airtable 构建完整的业务操作系统：12 个互联库、2,100+ 个字段和 50+ 项自动化，每月节省 170 小时。',
      badge: '系统已于 2025 年随业务一同售出。至今仍在生产环境中运行',
      date: '2026年2月25日',
    },
    heroMetrics: [
      { value: '170小时/月', label: '自动化节省' },
      { value: '12', label: 'Airtable 库' },
      { value: '2,100+', label: '字段' },
      { value: '50+', label: '自动化' },
      { value: '30K+', label: '维修记录' },
    ],
    tldr: '我构建了一个包含 12 个 Airtable 库的操作系统，管理着一家拥有 16 年历史的业务：ERP、CRM、预约、AI 代理和程序化网站，全部源自单一事实来源。每月实现 170+ 小时的自动化。我卖掉了公司，买家保持了这一切的正常运转。这就是我会为您的客户设计的东西。',
    intro: {
      hook: '30,000+ 次维修。12 个库。2,100 个字段。零商业 ERP。全部构建在 Airtable 之上。',
      body: '多服务维修业务无法容纳在通用的 ERP 中。2019 年，我评估了 RepairDesk ($99/月)、Orderry 和 RepairShopr：它们都存在，但没有一个能覆盖多服务模式（维修 + 配件），也不提供带有游戏化、复杂自动化或程序化 SEO 的 CRM。我需要一个系统作为所有内容的唯一事实来源：订单、库存、客户、预约、账单和自动化。所以我构建了它。',
    },
    internalLinks: {
      jacobo: { text: 'AI 代理 Jacobo | 案例研究', href: '/agente-ia-jacobo' },
      pseo: { text: '程序化 SEO | 案例研究', href: '/seo-programatico' },
      n8n: { text: '面向 PM 的 n8n | 文章', href: '/n8n-para-pms' },
      careerOps: { text: 'Career-Ops: 多智能体 AI 系统 | 案例研究', href: '/career-ops' },
    },
    sections: {
      dayInLife: {
        heading: '系统中的一天',
        body: '这是当客户写下“我想修理我的 iPhone 14 Pro”时发生的事情：',
        steps: [
          { emoji: '1️⃣', text: 'Jacobo（全渠道 AI 代理）检测到维修意图，识别型号并实时查询 Airtable 中的屏幕库存。' },
          { emoji: '2️⃣', text: '库存可用 → Jacobo 回复预估价格并询问客户想什么时候来。客户用自然语言表达偏好，Jacobo 的一个子代理查询 YouCanBookMe 的可用性以提供最接近的空档。零摩擦，无需离开对话。' },
          { emoji: '3️⃣', text: '客户确认时间 → 在 YouCanBookMe 中创建预约，在 Airtable 中生成工作单，并从库存中自动预留零件 —— 为该维修锁定。' },
          { emoji: '4️⃣', text: '技术人员在平板电脑上查看订单的所有细节：型号、维修内容、预留零件以及仓库中的确切位置。' },
          { emoji: '5️⃣', text: '维修完成 → 自动生成发票 → 忠诚度积分添加到 CRM → 客户通过 WhatsApp 收到满意度调查。' },
        ],
        jacoboCta: {
          heading: '想了解更多关于 Jacobo 的信息吗？',
          body: '通过 WhatsApp 和语音为客户提供服务、实时查询库存并自主管理预约的全渠道 AI 代理。',
          label: '阅读完整案例研究',
        },
        pseoCta: {
          heading: '我们如何为每个型号和维修生成网页内容？',
          body: 'Airtable CMS 驱动了一个程序化网站，为每个型号和维修类型提供唯一页面 —— 全部通过关键词研究实现自动化。',
          label: '查看程序化 SEO 案例研究',
        },
      },
      whyCustom: {
        heading: '为什么我不使用 RepairDesk 或 Odoo？',
        body: '在构建之前，我研究了替代方案。没有一个合适：',
        reasons: [
          {
            tool: 'RepairDesk ($99/月)',
            issue: '在 2019 年就已经存在。它涵盖了工单和库存，但专为纯维修店设计。不支持多服务模式（维修 + 配件），没有带等级/游戏化的 CRM，也没有复杂的自动化。',
          },
          {
            tool: 'RepairShopr / Orderry',
            issue: '同样在 2019 年可用。RepairShopr 有基础的邮件营销 ("Marketr") 和 Zapier，但流程僵化。Orderry 有很好的基础但缺乏真正的自动化能力。两者都不提供程序化 SEO 或 AI 代理集成。',
          },
          {
            tool: '传统 ERP (Odoo, SAP B1)',
            issue: '过于庞大，实施缓慢，且缺乏每周迭代的灵活性。定制成本远超自行构建。',
          },
        ],
        punchline: '关键决策：我需要对数据流的完全控制，以及在几小时而非几周内自动化任何流程的能力。',
      },
      overview: {
        heading: '12 个 Airtable 库构成的无代码业务操作系统',
        body: '该业务操作系统是一个由 12 个互联的 Airtable 库组成的生态系统。每个库负责一个限定领域，50+ 项原生自动化通过关联记录编排它们之间的数据流 —— 无需重复，只链接必要内容。',
        stats: [
          { value: '12', label: 'Airtable 库' },
          { value: '2,100+', label: '总字段数' },
          { value: '50+', label: '自动化项' },
          { value: '170小时', label: '每月节省' },
        ],
        bases: [
          { name: '核心 ERP', desc: '业务运营中心：工作单（OTS 表中有 496 个字段）、库存、订单、预留和保修。' },
          { name: 'CRM', desc: '客户、潜在客户评分、忠诚度等级、完整历史记录和自动沟通。' },
          { name: '财务会计', desc: '自动银行对账、发票生成、支出控制和财务报告。' },
          { name: '零件目录', desc: '维修零件供应商的价格和库存，与 ERP 库存同步。' },
          { name: '配件目录', desc: '手机壳、保护膜、充电器。供应商目录与库存同步。' },
          { name: '网站 CMS', desc: '拥有 1,534 个字段和 647 个公式的 Headless CMS，驱动按型号和维修划分的程序化网站处理。' },
          { name: '客户反馈', desc: '满意度调查、NPS 和自动化的售后跟进。' },
          { name: '评论管理', desc: '自动提取和汇总内部及外部（Google）评论。' },
          { name: '自动化 KWR', desc: '通过 DataForSEO 进行按型号和维修划分的关键词研究，用于程序化 SEO 决策。' },
          { name: 'GBP 发布', desc: '为 Google 商家资料生成的维修前后对比成功案例。' },
          { name: '短内容', desc: '用于社交媒体和沟通的按维修类型划分的内容。' },
          { name: '自定义 GPT', desc: '内部库存和价格查询 GPT 的配置及提示词。' },
        ],
      },
      e2eFlows: {
        heading: '端到端流程',
        body: '每个流程描绘了“快乐路径” —— 从触发到解决的理想序列。涉及的数据库在每个流程中都有标记。',
        items: [
          {
            icon: '🔧',
            name: '维修生命周期 —— 从咨询到交付',
            trigger: '客户联系询问维修事宜',
            summary: '从客户询问到取回维修好的设备的全过程 —— 包含零件自动预留、预约和开票。',
            basesTouched: ['ERP', '零件目录', 'CRM', '财务会计'],
            details: [
              '接待：Jacobo 识别型号 + 维修类型 → 实时查询 Airtable 库存（集成协议：AI Agent ↔ Airtable REST API）',
              '报价：根据零件成本 + 配置利润率 + CRM 中的客户等级自动计算价格。如果利润率过低，则进行人工审核',
              '排程：预约子代理查询 YouCanBookMe → 提供可用空档 → 在 Airtable 中创建预约 + 工作单 + 自动预留零件。事实来源：YCBM 负责时间可用性，ERP 负责工作单',
              '如果所需零件有库存，则自动接受预约；否则，生成紧急采购订单以快速解决问题',
              '执行：技术人员在平板电脑上查看工作单的所有细节 —— 型号、维修内容、预留零件以及仓库中的确切位置（柜子、抽屉、位置）',
              '完成：维修关闭 → 自动生成带有序列号和税务数据的发票 → 忠诚度积分计入 CRM → 通过 WhatsApp 发送满意度调查',
              'OTS 表拥有 496 个字段 —— 几乎所有其他库都向这个核心记录（事实来源）提供数据。完整可追溯性：每个零件都与其采购订单、供应商以及使用它的维修记录相关联',
            ],
          },
          {
            icon: '📦',
            name: '采购与供应链',
            trigger: '零件库存低于配置的最低阈值',
            summary: '从检测到低库存到补货、消耗和财务对账 —— 包含自动采购订单和库存分类。',
            basesTouched: ['ERP', '零件目录', '配件目录', '财务会计'],
            details: [
              '阈值触发：库存 < 最低值 → 自动向价格最优的供应商生成采购订单。多供应商后备：每个零件有 2-3 个备选供应商，对比价格和交付时间',
              '按零件定制库存警报：iPhone 屏幕的下单利润空间比需求较低的型号更大',
              '收货：零件入库 → Airtable 根据占用情况（柜子、抽屉、位置）自动分配位置',
              '消耗：关闭工作单时，零件自动从库存中扣除',
              '两种不同的生命周期（库存分类）：零件用于维修消耗，配件直接销售。配件售价根据各类别可配置利润率自动计算',
              '周转控制：60 天以上未销售的配件 → 触发降价或下架警报',
              '质量控制：每个零件都有等级（原厂、高端兼容、标准兼容），影响价格和保修',
              '对账：每笔采购订单自动与银行流水匹配。集成支出控制 —— 每项支出关联类别、供应商和成本中心',
              '自动生成月度财务报告，包含损益表、现金流以及与上月的对比',
            ],
          },
          {
            icon: '🌐',
            name: '内容到营收管道',
            trigger: '目录中添加了新机型或维修类型',
            summary: '从 Airtable 中的新机型到在 Google 获得排名的落地页 —— 包含自动关键词研究、动态价格和规模化原创内容。',
            basesTouched: ['网站 CMS', 'KWR', 'GBP', '内容', '零件目录', '配件目录'],
            details: [
              '自动关键词研究提取按机型+维修划分的关键词（DataForSEO API）→ 按搜索量和难度排序',
              'CMS 生成落地页：价格、可用性、SEO 描述、FAQ, JSON-LD —— 全部来自公式。1,534 个字段和 647 个公式计算从规范 URL 到结构化数据的一切（Headless CMS 模式）',
              '目录同步协议：如果零件价格变动 → 网站自动更新，无需人工干预',
              'GBP 帖子包含从 ERP 直接提取的真实维修前后对比照片。HITL 流程在发布前过滤包含个人信息的图片。拥有数百种不同的维修，每篇帖子都是唯一的 —— 规模化原创内容',
              '同一数据库管理多语言（西/英/中） —— 每个字段都有其翻译变体',
              '结果：持续的自然流量存在感，无需每周花费数小时手动创建内容。一切都连接到带有自动内链的网站 CMS',
            ],
          },
          {
            icon: '👥',
            name: '客户生命周期与留存',
            trigger: '维修完成 —— 开始售后服务周期',
            summary: '潜在客户评分、忠诚度等级、自动评论和召回活动 —— 将单次客户转化为回头客的反馈回路。',
            basesTouched: ['CRM', '反馈', '评论', '沟通'],
            details: [
              '自动评分：每次互动累加分数 → 5 个等级（青铜 → 白银 → 黄金 → 钻石 → 铂金），享有折扣、优先预约和延长保修等递进福利',
              '维修后 48 小时 → 请求 Google 评论，仅当客户没有未解决的投诉时（条件触发）',
              '辅助评论回复：CRM 自动将评论者姓名与历史记录交叉对比 —— 维修机型、维修类型、分配的技术人员和等级。用“感谢您将 iPhone 12 Pro 信任地交给我们”而非通用回复来体现差异化',
              '通过 WhatsApp 进行 3 个快速问题的满意度调查 → 结果反馈至评分（反馈回路：调查 → 评分 → 等级 → 福利）',
              '客户沉寂 90 天以上 → 根据维修和购买历史自动开展带有个性化优惠的召回活动',
              '结构化投诉：每项投诉关联原始工作单、责任技术人员和应用解决方案。按阶段显示的 NPS 仪表板用于检测趋势',
              '完整的客户历史记录：所有维修、购买、沟通和投诉都在一个视图中',
            ],
          },
        ],
      },
      crossCutting: {
        heading: '跨领域能力',
        body: '这些能力不属于单一流程 —— 它们贯穿所有流程。',
        items: [
          {
            icon: '✅',
            name: '数据护栏 —— 50+ 项业务规则',
            summary: '护栏在源头阻止错误数据 —— 比下游修正更便宜。系统引导员工完成每个过程：如果他们疏忽，系统会提示缺失内容。',
            details: [
              '未登记使用的零件无法关闭维修订单',
              '客户未签署报价单无法开具发票',
              '没有成本价和最低利润率无法录入产品',
              '如果技术人员同时开启超过 5 项维修，自动发出警报',
              '重复 IMEI 验证：如果设备已在系统中，则链接到现有历史记录',
              '一致性检查：如果报价单写的是“屏幕”但记录的零件是“电池”，则予以拦截',
            ],
          },
          {
            icon: '📱',
            name: '事件驱动通知',
            summary: '每个业务事件（预约确认、维修完成、发票开具）都会通过适当渠道触发通知。沟通层与业务逻辑解耦。',
            details: [
              '按事件自动通知：预约确认、维修完成、发票开具',
              'Meta 批准的带有动态变量（姓名、型号、价格）的 WhatsApp 模板',
              '与预约系统的原生集成：客户预约后立即收到确认',
              '如果零件无库存，向团队发出紧急订单内部通知以快速解决',
            ],
          },
          {
            icon: '🤖',
            name: 'AI 查询层',
            summary: '两个内部 GPT 使用 Airtable 作为事实来源 —— 运行在业务数据之上的自然语言界面，无幻觉。',
            details: [
              '库存 GPT：“我们有 iPhone 14 Pro 的屏幕吗？” → 实时查询 Airtable 并回复库存、供应商、成本价，以及零件确切在哪个柜子和抽屉。还会指出是否有其他正在进行的维修在使用该零件',
              '价格 GPT：“维修一部三星 S23 要多少钱？” → 考虑零件成本 + 配置利润率 + 客户等级计算最终价格',
              '两个 GPT 都使用 Airtable 作为唯一事实来源，消除虚假回答',
            ],
          },
          {
            icon: '🎬',
            name: '生成式 AI 应用',
            summary: 'Airtable 作为事实来源，GenAI 作为创作引擎。从产品目录和业务数据中生成用于橱窗、社交媒体和营销活动的视觉素材，无需人工干预内容。',
            details: [
              'AI 生成的橱窗数字标牌：在店内屏幕上展示的产品图片和促销活动，数据源自 Airtable 目录',
              'Instagram Reels：使用 Sora (OpenAI) 生成视频，Suno (AI) 创作原创歌曲：情感化讲故事、幽默和品牌建设，由 DaVinci Resolve 编辑',
              '完整管道：Airtable 数据 → 提示词 → 视觉生成 → 渠道发布（橱窗、Instagram、WhatsApp）',
            ],
          },
        ],
      },
      impact: {
        heading: '每月 170 小时的详细细分',
        body: '这不是一个虚构的数字。每项节省都基于任务频率和之前所需的手动时间计算得出（通过 3 个月的前后时间记录测量）：',
        savings: [
          { module: '自动采购订单', before: '45 分钟/天', after: '0 (全自动)', monthly: '~22小时' },
          { module: '价格/库存咨询回复', before: '2 小时/天', after: '5 分钟 (GPT)', monthly: '~58小时' },
          { module: '维修跟进', before: '30 分钟/天', after: '全自动', monthly: '~15小时' },
          { module: '预约管理与确认', before: '45 分钟/天', after: '全自动', monthly: '~22小时' },
          { module: '开票与报价', before: '1 小时/天', after: '10 分钟', monthly: '~25小时' },
          { module: '沉睡客户召回', before: '3 小时/周', after: '全自动', monthly: '~12小时' },
          { module: '报告与 KPI', before: '4 小时/周', after: '全自动', monthly: '~16小时' },
        ],
        total: '~170小时/月',
        punchline: '这相当于一个以上的全职员工。而且系统不会生病、不休假、也不会犯复制粘贴的错误。这个系统是 2025 年业务出售（持续经营出售）不可或缺的一部分 —— 足够健壮，使得买家将其作为运营资产收购。',
      },
      beforeAfter: {
        heading: '之前 vs 之后',
        items: [
          { area: '数据管理', before: '简陋的 Checkout POS，数据碎片化且系统间无连接', after: 'Airtable 作为唯一事实来源 (SSOT) —— 一个数据，一个地方' },
          { area: '客户沟通', before: 'WhatsApp 群组，一对一手动消息', after: '按事件自动触发：确认、提醒、完成' },
          { area: '开票', before: '从 Checkout POS 手动开票，数据错误频发', after: '维修完成时自动生成，税务数据准确' },
          { area: '库存控制', before: '肉眼检查，“我觉得还剩 2 个”', after: '实时预警，达到最低值时自动生成采购订单' },
          { area: '人为错误', before: '系统间复制粘贴，数据不一致', after: '50+ 项自动验证拦截不一致，实现 0 错误' },
        ],
      },
      decisions: {
        heading: '架构决策记录 (ADRs)',
        body: '每个技术决策都有其原因。以下是最重要的几项：',
        items: [
          {
            title: '为什么选择 Airtable 作为 SSOT？',
            detail: 'Airtable 结合了电子表格的灵活性和关系型数据库的结构。对于每周都在迭代的业务，变更速度至关重要。添加一个新字段或视图只需几分钟，而非几天的开发时间。',
          },
          {
            title: '为什么选择自定义而非 SaaS？',
            detail: 'SaaS 强加了其数据模型。当您的业务是多服务（维修 + 配件）时，没有垂直领域的 SaaS 能覆盖所有内容。适应成本超过了构建成本。',
          },
          {
            title: '什么时候不应该构建自定义系统？',
            detail: '如果您的业务符合标准垂直领域（仅维修，无多项服务），请使用 RepairDesk 或类似产品。只有当业务差异化在于流程而非产品本身时，构建自定义系统才有意义。',
          },
          {
            title: '为什么选择 Airtable 原生自动化而非 Zapier/Make？',
            detail: 'Airtable 自动化存在于数据库内部，直接访问数据且无单次运行成本。对于日常业务逻辑（50+ 项自动化），这是无敌的。Make 被用作特定集成的粘合剂：Google 商家资料的新评论通知（官方集成）、供应商 Webhooks 以及与支付网关的同步。n8n 用于 Jacobo（AI 代理），那里需要使用语言模型和工具调用进行复杂的编排。',
          },
          {
            title: '如何管理 2,100+ 个字段而不陷入混乱？',
            detail: '通过职责分离：每个库有明确的领域，并仅通过关联记录与其他库同步严格必要的信息。不复制所有内容 —— 只链接合适的内容。再加上按角色过滤的视图（技术员看他的，销售看他们的），使每个用户都能与系统的一个可管理子集进行交互。',
          },
          {
            title: '逻辑放置：规则应该写在哪',
            detail: '简单逻辑 → Airtable 原生自动化（0 运行成本，但 Business 计划有每月 100,000 次运行的上限；耗尽即停）。SaaS 间的粘合 → Make，快速且稳健地与外部 API（Google 商家、供应商、支付）集成，且在需要更多容量时可购买额度。AI 编排 → n8n，用于带有语言模型和工具调用的代理。重型计算 → 自定义代码。原则：尽可能将逻辑推向靠近数据的地方。',
          },
          {
            title: 'ID 策略：记录 ID + 序列号',
            detail: 'Airtable 生成 recXXXXX 用于内部链接。员工和客户使用可读代码：OT-2024-04521, FAC-2024-01234。这种分离在不牺牲引用完整性的情况下避免了人为错误。',
          },
          {
            title: '审计轨迹：修改历史 + 公式时间戳',
            detail: '在关键字段上使用 LAST_MODIFIED_TIME() 创建无需外部日志即可查询的审计轨迹。工作单、发票或报价单的每次更改都会记录日期和用户。',
          },
          {
            title: '库同步策略：关联记录，而非复制',
            detail: '每个库仅与其它库同步必要字段。已知的权衡：跨库报告需要中间视图，但替代方案（重复数据）产生的不一致性成本高于规避方案。',
          },
        ],
      },
      lessons: {
        heading: '经验教训',
        items: [
          {
            title: '从瓶颈开始，而不是从最漂亮的模块开始。',
            detail: '库存管理曾是一团糟。从那里开始解锁了其他一切：采购订单、定价和报价都依赖于可靠的库存。',
          },
          {
            title: '验证比自动化更有价值。',
            detail: '自动化任务节省时间。但阻止错误的验证节省金钱。一个登记错误的零件成本可能超过一小时的人工劳动。',
          },
          {
            title: 'CRM 不是联系人列表 —— 它是留存机器。',
            detail: '带有等级的游戏化使回头率翻倍。客户会主动询问“我有多少分了？”。这在基础 CRM 中是不会发生的。',
          },
          {
            title: '记录业务规则，而不是代码。',
            detail: 'Airtable 自动化是可视化且自解释的。需要记录的是规则：“为什么最低利润率是 30%？”以及“什么时候召回沉睡客户？”。',
          },
        ],
      },
      platformEvolution: {
        heading: '平台演进',
        tagline: '用现有的最好工具构建。当平台允许时进行重构。',
        bridge: ['这些系统仍在薛一凡 iRepair 品牌下运行。', '只是{没有我}。', '构建这个系统教会了我能走多远。', '所以我卖掉了业务，去追求{更多}。'],
        steps: [
          { year: '2019', event: '单一数据库 + Zapier', detail: '工作单、库存、客户和开票都在一个数据库中。Zapier 连接外部流。' },
          { year: '2021', event: '库间同步 → 限定领域', detail: '领域分离到独立的库中（ERP, CRM, 零件, CMS）。仅同步必要内容。' },
          { year: '2022', event: '原生自动化取代 Make', detail: '从 Make 迁移到 Airtable 原生自动化。50+ 项内部流，无外部依赖。' },
          { year: '2023', event: '界面设计器 → 告别原始表格', detail: '整个团队使用按角色设计的界面工作，而非表格。更快、错误更少。' },
          { year: '2024', event: '动态过滤 → 仅显示兼容零件', detail: '在工作单中选择型号时，零件字段仅显示兼容零件 —— 而非目录中的 1,000+ 个。' },
          { year: '2025', event: 'Jacobo AI 代理 → 回报时刻', detail: '处理预约、报价和解决问题的全渠道代理（语音 + WhatsApp）。几周内上线。', punchline: '五年的整洁架构使其成为{必然}。' },
        ],
      },
      replicability: {
        heading: '可迁移模式',
        body: '该业务操作系统背后的架构模式 —— 限定领域、SSOT、事件驱动通知、业务规则护栏 —— 可以迁移到任何服务业务。具体的模块会变，但设计原则不变。',
        examples: [
          { domain: '诊所 / 牙科咨询', detail: '维修周期变为患者旅程。零件目录变为治疗目录。相同的库存逻辑，不同的领域。' },
          { domain: '机构 / 咨询公司', detail: '工作单变为项目交付物。CRM 等级变为客户账户级别。自动化报告保持一致。' },
          { domain: '零售 / 电子商务', detail: '维修接收变为订单履行。供应链逻辑直接迁移。客户生命周期和留存流程即插即用。' },
        ],
        closing: '任何拥有复杂运营的业务都可以从这种方法中受益 —— 无论是服务业、零售业还是电子商务。模式已获验证，改变的只是领域。',
      },
    },
    cta: {
      heading: '是否有 SaaS 无法解决的运营问题？',
      body: '我构建了一个管理了 30,000+ 次维修、每月实现 170 小时自动化并在业务出售后幸存下来的系统。无论是为您自己的公司、为您平台的客户，还是为一个需要从内部构建的人的团队 —— 请告诉我您的问题。',
      label: '聊聊看',
    },
    faq: {
      heading: '常见问题',
      items: [
        {
          q: 'Airtable 能扩展到 30,000+ 条记录吗？',
          a: '可以，但有技巧。在 Business 计划（每个库 12.5 万条记录）中，Airtable 能很好地处理数万条记录。关键是设计带有过滤视图的库，不要在一个视图中加载所有内容。对于接近上限的数量，需要考虑定期归档或迁移到 Postgres。',
        },
        {
          q: '这与 RepairDesk 之类的 SaaS 相比成本如何？',
          a: 'Airtable Business（每用户约 $45/月，12.5 万条记录计划）+ 集成（YouCanBookMe, WATI, Make）≈ $120-170/月。RepairDesk 是 $99/月，但不涵盖高级 CRM、复杂的自动化或多服务模式。真正的节省在于消除了每月 170 小时的人工劳动。',
        },
        {
          q: '如果 Airtable 更改其价格或 API 怎么办？',
          a: '这是一个真实存在的风险。缓解措施：定期进行数据备份，最重要的是，拥有完整的数据架构文档。如果必须迁移，12 个库的关系结构就是资产 —— 可以在任何平台上复制。',
        },
        {
          q: '构建这一切花了多长时间？',
          a: '经过了数年的尝试和错误。但有一个关键模式：每个新模块花费的时间只有前一个的一半，因为积累的经验加速了一切。系统在业务运营过程中有机增长 —— 从未有过“停下一切去构建”的时刻。',
        },
        {
          q: '现在谁来维护系统？',
          a: '买家。我于 2025 年将业务作为持续经营实体出售：包含品牌、系统和工作流。买家将其作为运营资产收购 —— 无需重新构建任何内容 —— 这是对该架构的最终验证。',
        },
        {
          q: '可以为其他业务复制吗？',
          a: '该架构（以 Airtable 为 SSOT 辅以原生自动化）对于任何服务业务都是可复制的：维修店、诊所、机构。改变的是具体的业务规则和所需的模块。',
        },
        {
          q: 'Airtable 可以用作 ERP 吗？',
          a: '可以，但需要设计纪律。Airtable 不是开箱即用的 ERP，但其灵活的关系特性允许构建定制化的 ERP。关键是将每个库视为具有清晰接口（关联记录）的独立模块，并使用原生自动化来编排流程。凭借 12 个库和 2,100+ 个字段，这个业务操作系统管理着传统 ERP 所能做的一切 —— 但迭代周期是每周而非每月。',
        },
        {
          q: 'Airtable 的缺点是什么？',
          a: '主要缺点：Business 计划中每个库 12.5 万条记录的限制（如果增长非常快需要归档）、随用户数快速增长的定价以及供应商依赖。缓解措施：智能的数据设计，按领域划分库，并仅同步库之间必要的信息，而不是一次性同步所有内容。对于这个业务操作系统，优点（迭代速度、灵活性、友好的界面）远超缺点。',
        },
        {
          q: '为什么选择 Airtable 原生自动化而非 Zapier？',
          a: 'Airtable 自动化存在于库本身内部，无运行成本且无需中间 API 即可直接访问数据。对于日常业务逻辑（50+ 项自动化），它是最高效的选择。上限是 Business 计划的每月 100,000 次运行：如果你用完了，它们会停止且无法购买更多。这就是为什么与外部系统（Google 商家评论、供应商 Webhooks）的集成走 Make，在那里你可以根据需要购买额外额度。n8n 用于 Jacobo（AI 代理），那里需要使用语言模型进行复杂的编排。',
        },
      ],
    },
    resources: {
      heading: '资源',
      items: [
        { label: 'Airtable —— 数据库平台', url: 'https://airtable.com' },
        { label: 'n8n —— 工作流自动化', url: 'https://n8n.io' },
        { label: 'YouCanBookMe —— 预约管理', url: 'https://youcanbook.me' },
        { label: 'WATI —— WhatsApp Business API', url: 'https://www.wati.io' },
      ],
    },
    footer: {
      role: 'AI 产品经理 · 解决方案架构师',
      bio: '2025 年构建并售出了一家拥有 16 年历史的业务。现在将相同的系统思维应用于企业级 AI —— 担任 FDE、解决方案架构师或 AI 生产经理。',
      fellowAt: '助教于',
      fellowLink: 'AI 产品学院',
      copyright: '版权所有。',
    },
  },
  en: {
    slug: 'business-os-for-airtable',
    altSlug: 'business-os-para-airtable',
    readingTime: '15 min read',
    seo: {
      title: 'How I Built a Custom Business OS for 30,000+ Repairs with Airtable (170h/Month Saved) | xueyifan.io',
      description: 'Case study: how I built a Business OS with 12 Airtable bases, 2,100+ fields and 50+ automations that saves 170h/month at a phone repair business with 30,000+ repairs completed.',
    },
    nav: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Business OS',
    },
    header: {
      kicker: 'Case Study — Xueyifan iRepair',
      h1: 'Business OS for 30,000+ Repairs',
      subtitle: 'How I built a complete business operating system with Airtable — 12 interconnected bases, 2,100+ fields and 50+ automations saving 170h/month.',
      badge: 'Sold with the business in 2025. Still running in production today',
      date: 'Feb 25, 2026',
    },
    heroMetrics: [
      { value: '170h/mo', label: 'Automated' },
      { value: '12', label: 'Airtable bases' },
      { value: '2,100+', label: 'Fields' },
      { value: '50+', label: 'Automations' },
      { value: '30K+', label: 'Repairs' },
    ],
    tldr: 'I built a 12-base Airtable operating system that ran a 16-year business: ERP, CRM, appointment scheduling, AI agents, and a programmatic website, all from a single source of truth. 170+ hours/month automated. Then I sold the company and the buyer kept everything running. This is what I\'d design for your customers.',
    intro: {
      hook: '30,000+ repairs. 12 bases. 2,100 fields. Zero off-the-shelf ERPs. All built on Airtable.',
      body: 'A multi-service repair business doesn\'t fit in a generic ERP. In 2019, I evaluated RepairDesk ($99/mo), Orderry and RepairShopr: all existed, but none covered the multi-service model (repairs + accessories), nor offered CRM with gamification, complex automations or programmatic SEO. I needed a system that was the single source of truth for everything: orders, inventory, customers, bookings, billing and automations. So I built it.',
    },
    internalLinks: {
      jacobo: { text: 'AI Agent Jacobo — Case Study', href: '/ai-agent-jacobo' },
      pseo: { text: 'Programmatic SEO — Case Study', href: '/programmatic-seo' },
      n8n: { text: 'n8n for PMs — Article', href: '/n8n-for-pms' },
      careerOps: { text: 'Career-Ops: AI Job Search Multi-Agent | Case Study', href: '/career-ops-system' },
    },
    sections: {
      dayInLife: {
        heading: 'A Day in the Life of the System',
        body: 'Here\'s what happens when a customer texts "I want to repair my iPhone 14 Pro":',
        steps: [
          { emoji: '1️⃣', text: 'Jacobo (omnichannel AI agent) detects the repair intent, identifies the model and checks screen stock in Airtable in real time.' },
          { emoji: '2️⃣', text: 'Stock available → Jacobo replies with an estimated price and asks when they\'d like to come. The customer states their preference in natural language, and a Jacobo sub-agent checks YouCanBookMe availability to offer the closest slots. Zero friction, without leaving the conversation.' },
          { emoji: '3️⃣', text: 'Customer confirms the time → the appointment is created in YouCanBookMe, the work order is generated in Airtable and the parts are auto-reserved from inventory — locked for that repair.' },
          { emoji: '4️⃣', text: 'The technician sees the work order on their tablet with full detail: model, repair, reserved parts and exact warehouse location.' },
          { emoji: '5️⃣', text: 'Repair completed → invoice auto-generated → loyalty points added to CRM → customer receives a satisfaction survey via WhatsApp.' },
        ],
        jacoboCta: {
          heading: 'Want to know more about Jacobo?',
          body: 'Omnichannel AI agent that handles customers via WhatsApp and voice, checks stock in real time, and manages appointments autonomously.',
          label: 'Read the full case study',
        },
        pseoCta: {
          heading: 'How did we generate web content for every model and repair?',
          body: 'The Airtable CMS powered a programmatic website with unique pages per model and repair type — all automated with keyword research.',
          label: 'Read the Programmatic SEO case study',
        },
      },
      whyCustom: {
        heading: 'Why I Didn\'t Use RepairDesk or Odoo',
        body: 'Before building, I researched the alternatives. None fit:',
        reasons: [
          {
            tool: 'RepairDesk ($99/mo)',
            issue: 'Already existed in 2019. Covers ticketing and inventory, but designed for pure repair shops. Didn\'t support the multi-service model (repairs + accessories), CRM with tiers/gamification, or complex automations.',
          },
          {
            tool: 'RepairShopr / Orderry',
            issue: 'Also available in 2019. RepairShopr had basic email marketing ("Marketr") and Zapier, but rigid flows. Orderry, good foundation but no real automation capability. Neither offered programmatic SEO or AI agent integration.',
          },
          {
            tool: 'Traditional ERP (Odoo, SAP B1)',
            issue: 'Overkill, slow to implement, and without the flexibility to iterate weekly. Customization cost far exceeded building something custom.',
          },
        ],
        punchline: 'The key decision: I needed full control over data flows and the ability to automate any process in hours, not weeks.',
      },
      overview: {
        heading: '12 Airtable Bases as a No-Code Business OS',
        body: 'The Business OS is an ecosystem of 12 interconnected Airtable bases. Each base owns a bounded domain, and 50+ native automations orchestrate data flows between them via linked records — no duplication, just linking what\'s needed.',
        stats: [
          { value: '12', label: 'Airtable Bases' },
          { value: '2,100+', label: 'Total Fields' },
          { value: '50+', label: 'Automations' },
          { value: '170h', label: 'Monthly Savings' },
        ],
        bases: [
          { name: 'Central ERP', desc: 'Business operations hub: work orders (496 fields in the OTS table), inventory, purchasing, bookings and warranties.' },
          { name: 'CRM', desc: 'Customers, lead scoring, loyalty tiers, complete history and automated communications.' },
          { name: 'Accounting', desc: 'Automatic bank reconciliation, invoice generation, expense tracking and financial reports.' },
          { name: 'Parts Catalog', desc: 'Repair parts pricing and stock from suppliers, synced with the ERP inventory.' },
          { name: 'Accessories Catalog', desc: 'Cases, screen protectors, chargers. Supplier catalog synced with inventory.' },
          { name: 'Web CMS', desc: 'Headless CMS with 1,534 fields and 647 formulas powering the programmatic website by model and repair.' },
          { name: 'Customer Feedback', desc: 'Satisfaction surveys, NPS and automated post-service follow-up.' },
          { name: 'Reviews', desc: 'Internal and external (Google) reviews automatically extracted and aggregated.' },
          { name: 'Automated KWR', desc: 'Keyword research per model and repair via DataForSEO for programmatic SEO decisions.' },
          { name: 'GBP Posts', desc: 'Before/after success stories generated for Google Business Profile.' },
          { name: 'Short Content', desc: 'Per-repair-type content for social media and communications.' },
          { name: 'Custom GPT', desc: 'Configuration and prompts for internal stock and pricing query GPTs.' },
        ],
      },
      e2eFlows: {
        heading: 'End-to-End Flows',
        body: 'Each flow traces the happy path — the ideal sequence from trigger to resolution. The bases involved are tagged in each flow.',
        items: [
          {
            icon: '🔧',
            name: 'Repair Lifecycle — Intake to Delivery',
            trigger: 'Customer contacts asking about a repair',
            summary: 'The complete flow from a customer inquiry to picking up their repaired device — with automatic parts reservation, appointments and invoicing.',
            basesTouched: ['ERP', 'Parts Catalog', 'CRM', 'Accounting'],
            details: [
              'Intake: Jacobo identifies model + repair type → checks stock in Airtable in real time (integration contract: AI Agent ↔ Airtable REST API)',
              'Quoting: price auto-calculated considering part cost + configured margin + customer tier from CRM. Low-margin repairs get flagged for manual review',
              'Scheduling: booking sub-agent queries YouCanBookMe → offers available slots → creates appointment + work order in Airtable + auto-reserves parts. Source of truth: YCBM for time slot availability, ERP for the work order',
              'If the needed part is in stock, auto-accepts the appointment; if not, generates an urgent purchase order for quick resolution',
              'Execution: technician sees the work order on their tablet with full detail — model, repair, reserved parts and exact warehouse location (cabinet, drawer, position)',
              'Completion: repair closed → invoice auto-generated with sequential numbering and tax data → loyalty points added to CRM → satisfaction survey sent via WhatsApp',
              'The OTS table has 496 fields — the central record (source of truth) that almost every other base feeds into. Full traceability: each part is linked to its purchase order, supplier and the repair where it was used',
            ],
          },
          {
            icon: '📦',
            name: 'Procurement & Supply Chain',
            trigger: 'A part\'s stock drops below its configured minimum threshold',
            summary: 'From low-stock detection to restocking, consumption and financial reconciliation — with auto-PO and inventory classification.',
            basesTouched: ['ERP', 'Parts Catalog', 'Accessories Catalog', 'Accounting'],
            details: [
              'Threshold trigger: stock < minimum → auto-generates purchase order to best-priced supplier. Multi-supplier fallback: each part has 2-3 alternative suppliers with prices and delivery times compared',
              'Custom stock alerts per part: iPhone screens are ordered with more buffer than less-demanded models',
              'Reception: part arrives → location auto-assigned by Airtable based on occupancy (cabinet, drawer, position)',
              'Consumption: when the work order is closed, parts are automatically deducted from inventory',
              'Two distinct lifecycles (inventory classification): parts are consumed in repairs, accessories are sold directly. Accessory sale prices auto-calculated with configurable margin per category',
              'Rotation control: accessories unsold for 60+ days → discount or removal alert',
              'Quality control: each part has a grade (original, premium compatible, standard compatible) that impacts price and warranty',
              'Reconciliation: each purchase order is automatically matched with its bank transaction. Expense tracking integrated — each expense linked to category, supplier and cost center',
              'Auto-generated monthly financial reports with P&L, cash flow and month-over-month comparison',
            ],
          },
          {
            icon: '🌐',
            name: 'Content-to-Revenue Pipeline',
            trigger: 'New model or repair type added to the catalog',
            summary: 'From a new model in Airtable to a Google-ranked landing page — with automated KWR, dynamic pricing and original content at scale.',
            basesTouched: ['Web CMS', 'KWR', 'GBP', 'Content', 'Parts Catalog', 'Accessories Catalog'],
            details: [
              'Automated KWR extracts keywords per model+repair (DataForSEO API) → prioritizes by volume and difficulty',
              'CMS generates landing page: price, availability, SEO description, FAQ, JSON-LD — all from formulas. 1,534 fields and 647 formulas calculate everything from canonical URLs to structured data (headless CMS pattern)',
              'Catalog sync contract: if a part price changes → it updates on the website with zero intervention',
              'GBP posts with real before/after repair photos, pulled directly from the ERP. A HITL process filters images with personal information before publishing. With hundreds of different repairs, every post was unique — original content at scale',
              'Multi-language management (ES/EN) from the same base — each field has its translated variant',
              'Result: constant organic presence without spending weekly hours manually creating content. Everything connected to the Web CMS with automatic internal linking',
            ],
          },
          {
            icon: '👥',
            name: 'Customer Lifecycle & Retention',
            trigger: 'Repair completed — post-service cycle begins',
            summary: 'Lead scoring, loyalty tiers, automated reviews and reactivation campaigns — the feedback loop that converts one-time customers into regulars.',
            basesTouched: ['CRM', 'Feedback', 'Reviews', 'Communications'],
            details: [
              'Automatic lead scoring: each interaction adds points → 5 tiers (Bronze → Silver → Gold → Diamond → Platinum) with progressive benefits like discounts, appointment priority and extended warranty',
              '48h post-repair → Google review request, only if the customer has no open complaints (conditional trigger)',
              'Assisted review responses: the CRM auto-cross-references the reviewer\'s name with their history — repaired model, repair type, assigned technician and tier. Replying with "thanks for trusting us with your iPhone 12 Pro" instead of a generic message made all the difference',
              'WhatsApp satisfaction survey with 3 quick questions → results feed lead scoring (feedback loop: survey → scoring → tier → benefits)',
              'Customer inactive for 90+ days → automatic reactivation campaign with personalized offers based on repair and purchase history',
              'Structured complaints: each complaint linked to the original work order, responsible technician and resolution applied. NPS dashboard by period to detect trends',
              'Complete customer history: all repairs, purchases, communications and complaints in one view',
            ],
          },
        ],
      },
      crossCutting: {
        heading: 'Cross-Cutting Capabilities',
        body: 'These capabilities don\'t belong to a single flow — they operate across all of them.',
        items: [
          {
            icon: '✅',
            name: 'Data Guardrails — 50+ Business Rules',
            summary: 'Guardrails block incorrect data at the source — cheaper than fixing downstream. The system guides employees through every process: if they miss a step, it tells them what\'s missing.',
            details: [
              'Can\'t close a repair without logging the parts used',
              'Can\'t invoice without customer-signed quote',
              'Can\'t add a product without cost price and minimum margin',
              'Automatic alert if a technician has more than 5 open repairs simultaneously',
              'Duplicate IMEI validation: if a device is already in the system, it links to existing history',
              'Consistency check: if the quote says "screen" but logged parts are "battery", it blocks',
            ],
          },
          {
            icon: '📱',
            name: 'Event-Driven Notifications',
            summary: 'Every business event (appointment confirmed, repair completed, invoice issued) triggers a notification through the appropriate channel. The communication layer is decoupled from business logic.',
            details: [
              'Automated notifications per event: appointment confirmed, repair completed, invoice issued',
              'Meta-approved WhatsApp templates with dynamic variables (name, model, price)',
              'Native integration with the booking system: customer receives instant confirmation upon booking',
              'If the part isn\'t in stock, an internal urgent order notification fires to the team for quick resolution',
            ],
          },
          {
            icon: '🤖',
            name: 'AI-Powered Query Layer',
            summary: 'Two internal GPTs use Airtable as source of truth — natural language interface over operational data, no hallucinations.',
            details: [
              'Stock GPT: "Do we have iPhone 14 Pro screens?" → queries Airtable in real time and responds with stock, supplier, cost price, and exactly which cabinet and drawer the part is in. It also flags if other in-progress repairs are using that same part',
              'Pricing GPT: "How much do we charge for a Samsung S23 repair?" → calculates final price considering part cost + configured margin + customer tier',
              'Both GPTs use Airtable as source of truth, eliminating hallucinated answers',
            ],
          },
          {
            icon: '🎬',
            name: 'Generative AI Applied',
            summary: 'Airtable as source of truth, GenAI as creative engine. From the product catalog and business data, visual assets were generated for storefront displays, social media and campaigns, with no manual content intervention.',
            details: [
              'AI-generated digital signage for storefront: product images and promotions deployed on in-store screens, fed from the Airtable catalog',
              'Instagram Reels with Sora-generated video (OpenAI) and original songs with Suno (AI): emotional storytelling, humor and branding, edited with DaVinci Resolve',
              'Full pipeline: Airtable data → prompt → visual generation → channel deployment (storefront, Instagram, WhatsApp)',
            ],
          },
        ],
      },
      impact: {
        heading: 'The 170h/Month Breakdown',
        body: 'This isn\'t a made-up number. Each saving is calculated based on task frequency and the manual time it used to require (measured with before/after time tracking over 3 months):',
        savings: [
          { module: 'Automatic purchase orders', before: '45 min/day', after: '0 (automatic)', monthly: '~22h' },
          { module: 'Price/stock inquiry responses', before: '2h/day', after: '5 min (GPT)', monthly: '~58h' },
          { module: 'Repair tracking', before: '30 min/day', after: 'Automatic', monthly: '~15h' },
          { module: 'Appointment management & confirmations', before: '45 min/day', after: 'Automatic', monthly: '~22h' },
          { module: 'Billing & quotes', before: '1h/day', after: '10 min', monthly: '~25h' },
          { module: 'Inactive customer reactivation', before: '3h/week', after: 'Automatic', monthly: '~12h' },
          { module: 'Reports & KPIs', before: '4h/week', after: 'Automatic', monthly: '~16h' },
        ],
        total: '~170h/mo',
        punchline: 'That\'s more than one full-time employee. And the system doesn\'t get sick, doesn\'t take vacations, and doesn\'t make copy-paste mistakes. This system was a key asset in the 2025 business sale (going-concern) — robust enough for the buyer to acquire it as a running operation.',
      },
      beforeAfter: {
        heading: 'Before vs After',
        items: [
          { area: 'Data management', before: 'Basic Checkout POS, data fragmented across disconnected systems', after: 'Airtable as single source of truth (SSOT) — one data point, one place' },
          { area: 'Customer communication', before: 'WhatsApp groups, manual one-by-one messages', after: 'Automated triggers per event: confirmation, reminder, completed' },
          { area: 'Billing', before: 'Manual invoices from Checkout POS, frequent data errors', after: 'Auto-generated on repair completion, with correct tax data' },
          { area: 'Stock control', before: 'Visual check, "I think we have 2 left"', after: 'Real-time alerts, automatic purchase orders when minimum is reached' },
          { area: 'Human errors', before: 'Copy-paste between systems, inconsistent data', after: '0 errors with 50+ automatic validations that block inconsistencies' },
        ],
      },
      decisions: {
        heading: 'Architecture Decision Records (ADRs)',
        body: 'Every technical decision has a reason. Here are the most important ones:',
        items: [
          {
            title: 'Why Airtable as SSOT?',
            detail: 'Airtable combines spreadsheet flexibility with relational database structure. For a business that iterates weekly, speed of change is critical. Adding a new field or view takes minutes, not days of development.',
          },
          {
            title: 'Why custom over SaaS?',
            detail: 'SaaS imposes its data model. When your business is multi-service (repairs + accessories), no vertical SaaS covers everything. The adaptation cost exceeds the build cost.',
          },
          {
            title: 'When NOT to build custom?',
            detail: 'If your business fits a standard vertical (repairs only, no multi-service), use RepairDesk or similar. Building custom makes sense when your business differentiator is in the processes, not the product.',
          },
          {
            title: 'Why native Airtable automations over Zapier/Make?',
            detail: 'Airtable automations live inside the base itself, access data directly, and have no per-execution cost. For day-to-day business logic (50+ automations), that\'s unbeatable. Make is used as glue for specific SaaS integrations: new Google My Business review notifications (official integration), supplier webhooks and payment gateway syncs. n8n is used for Jacobo (the AI agent), where complex orchestration with language models and tool calling is needed.',
          },
          {
            title: 'How do you manage 2,100+ fields without chaos?',
            detail: 'By separating concerns: each base owns a clear domain and only syncs strictly necessary data with other bases via linked records. No duplicating everything — just linking what\'s needed. Combined with role-filtered views (technicians see their stuff, sales sees theirs), each user interacts with a manageable subset of the system.',
          },
          {
            title: 'Logic placement: where each rule lives',
            detail: 'Simple → native Airtable automations (zero cost per execution, but capped at 100,000 runs/month on the Business plan; hit the limit and they stop cold). SaaS glue → Make, fast and robust for integrations with external APIs (Google My Business, suppliers, payments), with purchasable credits if you need more capacity. AI orchestration → n8n for agents with LLMs and tool calling. Heavy computation → custom code. Rule: push logic as close to the data as possible.',
          },
          {
            title: 'ID strategy: record IDs + sequential codes',
            detail: 'Airtable generates recXXXXX for internal linking. Employees and customers use readable codes: OT-2024-04521, FAC-2024-01234. The separation prevents human errors without sacrificing referential integrity.',
          },
          {
            title: 'Audit trail: revision history + formula timestamps',
            detail: 'LAST_MODIFIED_TIME() on critical fields creates a queryable audit trail without external logging. Every change to a work order, invoice or quote is recorded with date and user.',
          },
          {
            title: 'Base sync strategy: linked records, no duplication',
            detail: 'Each base syncs only the necessary fields with other bases. Known trade-off: cross-base reporting requires intermediate views, but the alternative (duplicating data) creates inconsistencies that cost more than the workaround.',
          },
        ],
      },
      lessons: {
        heading: 'Lessons Learned',
        items: [
          {
            title: 'Start with the bottleneck, not the shiniest module.',
            detail: 'Inventory was chaotic. Starting there unblocked everything else: purchase orders, pricing, and quotes all depend on reliable inventory.',
          },
          {
            title: 'Validations are more valuable than automations.',
            detail: 'Automating tasks saves time. But validations that prevent errors save money. A wrongly logged part can cost more than an hour of manual work.',
          },
          {
            title: 'The CRM isn\'t a contact list — it\'s a retention machine.',
            detail: 'Tier gamification multiplied the return rate. Customers actively ask "How many points do I have?". That doesn\'t happen with a basic CRM.',
          },
          {
            title: 'Document the business rules, not the code.',
            detail: 'Airtable automations are visual and self-explanatory. What needs documentation are the rules: "Why is the minimum margin 30%?" and "When does an inactive customer get reactivated?".',
          },
        ],
      },
      platformEvolution: {
        heading: 'Platform Evolution',
        tagline: 'Build with the best available tool. Refactor when the platform allows it.',
        bridge: ['These systems still operate under the Xueyifan iRepair brand.', 'Just {without me}.', 'Building this system showed me what I could do at scale.', 'So I sold the business and went to {find out}.'],
        steps: [
          { year: '2019', event: 'Single base + Zapier', detail: 'Work orders, inventory, customers, and billing in one base. Zapier connected external flows.' },
          { year: '2021', event: 'Base syncing → bounded domains', detail: 'Domains separated into independent bases (ERP, CRM, Parts, CMS). Only sync what\'s needed.' },
          { year: '2022', event: 'Native automations replace Make', detail: 'Migrated from Make to Airtable native automations. 50+ internal flows with zero external dependencies.' },
          { year: '2023', event: 'Interface Designer → goodbye raw tables', detail: 'The whole team works with role-based designed interfaces, not tables. Faster, fewer errors.' },
          { year: '2024', event: 'Dynamic filtering → compatible parts only', detail: 'Selecting a model on a work order filters parts to compatible ones only — not the full 1,000+ catalog.' },
          { year: '2025', event: 'Jacobo AI Agent → the payoff', detail: 'Omnichannel voice + WhatsApp agent. Shipped in weeks, not months.', punchline: 'Five years of clean architecture made it {inevitable}.' },
        ],
      },
      replicability: {
        heading: 'Transferable Patterns',
        body: 'The architecture patterns behind this Business OS — bounded domains, SSOT, event-driven notifications, business rule guardrails — are transferable to any service business. The specific modules change; the design principles don\'t.',
        examples: [
          { domain: 'Clinic / dental practice', detail: 'Replace repair lifecycle with patient journey. Parts catalog becomes treatment catalog. Same inventory logic, different domain.' },
          { domain: 'Agency / consultancy', detail: 'Replace work orders with project delivery. CRM tiers become client account levels. Automated reporting stays identical.' },
          { domain: 'Retail / e-commerce', detail: 'Replace repair intake with order fulfillment. Supply chain logic transfers directly. Customer lifecycle and retention flows are plug-and-play.' },
        ],
        closing: 'Any business with complex operations can benefit from this approach — whether services, retail or e-commerce. The patterns are proven; what changes is the domain.',
      },
    },
    cta: {
      heading: 'Got an operational problem that doesn\'t fit in a SaaS?',
      body: 'I built a system that managed 30,000+ repairs, automated 170h/month, and survived a business sale — intact. Whether it\'s for your own company, your platform\'s customers, or a team that needs someone to build from the inside — tell me the problem.',
      label: 'Get in touch',
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          q: 'Does Airtable scale to 30,000+ records?',
          a: 'Yes, with caveats. On the Business plan (125K records per base), Airtable handles tens of thousands of records well. The key is designing bases with filtered views and not loading everything in a single view. As you approach the limit, consider periodic archiving or migration to Postgres.',
        },
        {
          q: 'How much does this cost vs. SaaS like RepairDesk?',
          a: 'Airtable Business (~$45/mo per user, 125K records/base plan) + integrations (YouCanBookMe, WATI, Make) ≈ $120-170/mo. RepairDesk is $99/mo but doesn\'t cover advanced CRM, complex automations, or the multi-service model. The real savings are in the 170h/month of eliminated manual work.',
        },
        {
          q: 'What if Airtable changes its pricing or API?',
          a: 'It\'s a real risk. The mitigation: periodic data backups and, most importantly, having the complete data schema documented. If migration were ever needed, the relational structure of the 12 bases is the real asset — it can be replicated on any platform.',
        },
        {
          q: 'How long did it take to build all of this?',
          a: 'Years of trial and error. But with a key pattern: each new module took half the time of the previous one, because accumulated learning accelerated everything. The system grew organically while the business operated — there was never a "stop everything and build" moment.',
        },
        {
          q: 'Who maintains the system now?',
          a: 'The buyer. I sold the business in 2025 as a going concern: brand, systems, and workflows included. The fact that the buyer acquired it as a running operation — without needing to rebuild anything — is the ultimate validation of the architecture.',
        },
        {
          q: 'Can this be replicated for another business?',
          a: 'The architecture (Airtable as SSOT with native automations) is replicable for any service business: workshops, clinics, agencies. What changes are the specific business rules and required modules.',
        },
        {
          q: 'Can Airtable be used as an ERP?',
          a: 'Yes, with design discipline. Airtable isn\'t an out-of-the-box ERP, but its relational flexibility lets you build a custom one. The key is treating each base as an independent module with clean interfaces (linked records) and using native automations to orchestrate the flows. With 12 bases and 2,100+ fields, this Business OS handles everything a traditional ERP would — but with weekly iteration instead of monthly.',
        },
        {
          q: 'What are the disadvantages of Airtable?',
          a: 'The main ones: 125K record limit per base on the Business plan (requires archiving if you grow significantly), pricing that scales fast with users, and vendor lock-in. The mitigation: intelligent data design with separate bases per domain, syncing only the necessary information between them, not everything at once. For this Business OS, the advantages (iteration speed, flexibility, friendly UI) far outweigh the disadvantages.',
        },
        {
          q: 'Why native Airtable automations instead of Zapier?',
          a: 'Airtable automations live inside the base itself, have no per-execution cost, and access data directly without intermediate APIs. For day-to-day business logic (50+ automations), it\'s the most efficient option. The limit is 100,000 runs/month on the Business plan: hit it and they stop, with no option to buy more. That\'s why external system integrations (Google My Business reviews, supplier webhooks) go through Make, where you can purchase additional credits if you need more capacity. n8n is used for Jacobo (the AI agent), where complex orchestration with language models is needed.',
        },
      ],
    },
    resources: {
      heading: 'Resources',
      items: [
        { label: 'Airtable — Database Platform', url: 'https://airtable.com' },
        { label: 'n8n — Workflow Automation', url: 'https://n8n.io' },
        { label: 'YouCanBookMe — Appointment Scheduling', url: 'https://youcanbook.me' },
        { label: 'WATI — WhatsApp Business API', url: 'https://www.wati.io' },
      ],
    },
    footer: {
      role: 'AI Product Manager · Solutions Architect',
      bio: 'Built and sold a 16-year business in 2025. Now applying the same systems thinking to enterprise AI — as an FDE, Solutions Architect, or AI Production Manager.',
      fellowAt: 'Teaching Fellow at',
      fellowLink: 'AI Product Academy',
      copyright: 'All rights reserved.',
    },
  },
} as const
