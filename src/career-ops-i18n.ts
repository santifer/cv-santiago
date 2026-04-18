export type CareerOpsLang = 'zh' | 'en'

export const careerOpsContent = {
  zh: {
    slug: 'career-ops',
    altSlug: 'career-ops-system',
    readingTime: '18 分钟阅读',
    seo: {
      title: 'Career-Ops：自动化我求职过程的 AI 智能体',
      description: '案例研究：一个能从 10 个维度评估职位、根据职位生成个性化简历并自动化申请流程的多智能体系统。已有 631 次评估。',
    },
    nav: {
      breadcrumbHome: '首页',
      breadcrumbCurrent: 'Career-Ops',
    },
    header: {
      kicker: '案例研究：从个人项目到 35.6K+ Stars',
      h1: 'Career-Ops：AI 智能体如何自动化我的求职之路',
      subtitle: '我构建了一个多智能体系统来自动化我的求职过程。它成功了：我现在是应用 AI 负责人。随后我将其开源，并迅速走红 — 在 GitHub 上获得了 35.6K+ Stars。',
      badge: '任务完成',
      date: '2026年3月17日',
    },
    heroMetrics: [
      { value: '631', label: '评估次数' },
      { value: '302', label: '处理申请' },
      { value: '12', label: '模式' },
      { value: '10', label: '维度' },
      { value: '680', label: '去重 URL' },
    ],
    tldr: '一个使用 Claude Code 构建的多智能体系统，可自动化求职流程：从 10 个维度 (A-F) 为职位打分，生成针对性优化的个性化 PDF 简历，通过 Playwright 填写表单，并使用并行 Worker 进行批量处理。人机协作设计：AI 分析，我做决定。基于 MIT 协议开源 — 35.6K+ Stars，Discord 成员 1,300+。',
    manifesto: '公司使用 AI 来筛选候选人。我只是让候选人也能用 AI 来选择公司。',
    metaCallout: '讽刺的是：我构建了一个多智能体系统来寻找多智能体相关的职位。这个系统比任何面试都更能证明我的能力。而且，这并不是作弊：Career-Ops 自动化的是分析，而非决策。',
    closingCallback: '这个系统证明了面试无法证明的一点：在 AI 时代，你用 AI 构建的东西才是雇主最看重的简历。',
    internalLinks: {
      chatbot: {
        text: '自愈聊天机器人 | 案例研究',
        href: '/zi-yu-liao-tian-ji-qi-ren',
      },
      jacobo: {
        text: 'AI 智能体 Jacobo | 案例研究',
        href: '/agente-ia-jacobo',
      },
      businessOs: {
        text: 'Business OS | 案例研究',
        href: '/business-os-para-airtable',
      },
      pseo: {
        text: '程序化 SEO | 案例研究',
        href: '/seo-programatico',
      },
    },
    sections: {
      intro: {
        hook: '我构建了一个 AI 系统来找工作。它奏效了 — 我现在是应用 AI 负责人。然后我把它发布在 GitHub 上，反响热烈：35.6K+ Stars，广泛传播，并在法国、中国和韩国都有报道。求职的第一周我全是手动操作。第二周我就不再主动投递了 — 我在构建 Career-Ops。',
        body: '经过 631 次评估，Career-Ops 的筛选效果比我还好。这是一个作为多智能体系统构建的 AI 求职工具：阅读职位描述，从 10 个维度为其打分，生成个性化简历并准备申请。我负责审核和决定，AI 负责分析工作。该系统完美展示了目标职位所需的能力 — 这一点也引起了雇主的注意。',
      },
      theProblem: {
        heading: '为什么我需要自动化求职？',
        body: '寻找高级 AI 工程师职位本身就是一份全职工作。每个职位都需要阅读 JD、将你的技能与要求对应、修改简历、撰写个性化回复并填写包含 15 个字段的表单。如果每天要投 10 个职位，工作量可想而知。',
        painPoints: [
          { label: '重复阅读。', detail: '70% 的职位并不合适。你往往在读完 800 字的 JD 后才发现这一点。' },
          { label: '简历过于通用。', detail: '静态 PDF 无法针对每个具体职位突出最相关的核心竞争力。' },
          { label: '手动填写表单。', detail: '每个平台都以不同的格式询问相同的问题。每次申请都要复制粘贴 15 次。' },
          { label: '缺乏追踪。', detail: '没有系统，你就会忘记在哪里投过。重复投递或彻底失去跟进。' },
          { label: '零反馈。', detail: '投递、等待，却永远不知道问题出在适配度、简历还是时机。' },
          { label: '全球化市场。', detail: 'AI 行业正在全球范围内流动。当你向 6 个不同国家的公司投递时，本地的内推就无法扩展。' },
        ],
        punchline: '这并不难，只是非常重复。而重复的工作就应该被自动化。',
      },
      architecture: {
        heading: '多智能体系统是如何工作的？',
        body: 'Career-Ops 不是一个脚本或自动投递机器人。它是一个拥有 12 种运行模式的多智能体系统，每种模式都是一个 Claude Code 技能文件，拥有自己的上下文、规则和工具。一个能够对问题域进行推理并执行正确操作的 AI 智能体。',
        whyModes: {
          heading: '为什么选择模式化而非单一提示词',
          items: [
            { label: '精准的上下文。', detail: '每种模式仅加载其需要的信息。auto-pipeline 不会加载联系规则。apply 不会加载评分逻辑。' },
            { label: '可测试性。', detail: '每种模式都可以单独测试。修改 PDF 逻辑绝不会影响到评估环节。' },
            { label: '独立演进。', detail: '添加新模式不会破坏现有功能。Training 模式是在首次部署 3 周后添加的。' },
          ],
        },
        modes: [
          { name: 'auto-pipeline', desc: '完整管道：提取 JD、评估 A-F、生成报告、PDF 和追踪记录。' },
          { name: 'oferta', desc: '单职位评估，包含 6 个模块：总结、简历匹配、职级、薪资、个性化、面试。' },
          { name: 'ofertas', desc: '多个职位的对比与排名。' },
          { name: 'pdf', desc: '针对特定职位优化的个性化 ATS 简历，包含核心竞争力及关键词。' },
          { name: 'pipeline', desc: '从收件箱批量处理 URL。' },
          { name: 'scan', desc: '职位搜索：浏览招聘门户和目标公司的招聘页面。许多职位不会出现在聚合平台上。' },
          { name: 'batch', desc: '使用 Conductor + Workers 进行并行处理。同时处理队列中的 122 个 URL。' },
          { name: 'apply', desc: '使用 Playwright 进行交互式表单填写。阅读页面、检索评估结果并生成回答。' },
          { name: 'contacto', desc: 'LinkedIn 外联辅助工具。' },
          { name: 'deep', desc: '对公司进行深度研究。' },
          { name: 'tracker', desc: '申请状态仪表盘。' },
          { name: 'training', desc: '根据北极星目标评估课程和认证。' },
        ],
      },
      scoring: {
        heading: 'Career-Ops 如何评估每个职位？',
        body: '每个职位都会经过一个包含 10 个加权维度的评估框架。输出结果是一个数值分数 (1-5) 和一个 A-F 的等级。并非所有维度的权重都相同 — 职位匹配和技能对齐是“准入门槛”：如果这两项失败，最终分数将大幅下降。',
        dimensions: {
          headers: ['维度', '衡量指标', '权重'],
          rows: [
            ['职位匹配', '岗位要求与简历核心竞争力的契合度', '准入门槛'],
            ['技能对齐', '技术栈重合度', '准入门槛'],
            ['资历', '挑战程度与可谈判空间', '高'],
            ['补偿', '市场价与目标的差距', '高'],
            ['地理位置', '远程/混合/现场办公的可行性', '中'],
            ['公司阶段', '初创/增长/大厂契合度', '中'],
            ['产品市场匹配度', '问题领域的共鸣程度', '中'],
            ['增长轨迹', '职业晋升空间', '中'],
            ['面试可能性', '获得回调的概率', '高'],
            ['时间线', '入职速度与紧迫性', '低'],
          ],
        },
        distribution: {
          heading: '分数分布',
          items: [
            { value: '21', label: '分数 >= 4.5 (A)' },
            { value: '52', label: '分数 4.0-4.4 (B)' },
            { value: '71', label: '分数 3.0-3.9 (C)' },
            { value: '51', label: '分数 < 3.0 (D-F)' },
          ],
        },
        callout: '74% 的评估职位分数低于 4.0。如果没有该系统，我本会浪费大量时间阅读那些根本不合适的 JD。',
      },
      pipeline: {
        heading: '从 URL 输入到生成简历，中间发生了什么？',
        body: 'auto-pipeline 是核心模式。输入一个 URL，输出一份评估报告、一份个性化 PDF 和一行追踪记录。在最终审核前零人工干预。',
        steps: [
          { label: '提取 JD。', detail: 'Playwright 导航至该 URL，提取职位的结构化内容。' },
          { label: '10D 评估。', detail: 'Claude 阅读 JD + 简历 + 作品集，并从 10 个维度生成评分。' },
          { label: '生成报告。', detail: '包含 6 个模块的 Markdown：执行摘要、简历匹配、职级、薪资、个性化和面试可能性。' },
          { label: '生成 PDF。', detail: 'HTML 模板 + 关键词注入 + 自适应框架。使用 Puppeteer 渲染为 PDF。' },
          { label: '登记追踪。', detail: '包含公司、角色、分数、等级、URL 的 TSV 文件。通过 Node.js 脚本自动合并。' },
          { label: '去重。', detail: '检查 scan-history.tsv (680 个 URL) 和 applications.md。零重复评估。' },
        ],
        batch: {
          heading: '批量处理',
          body: '针对高业务量，batch 模式会启动一个 Conductor 来编排并行 Workers。每个 Worker 都是一个独立的 Claude Code 进程，拥有 200K 上下文。Conductor 负责管理队列、追踪进度并合并结果。',
          metrics: [
            { value: '122', label: '队列中的 URL' },
            { value: '200K', label: '每个 Worker 的上下文' },
            { value: '2x', label: '失败重试次数' },
          ],
          details: '容错性：单个 Worker 失败不会阻塞其他 Worker。锁文件防止重复执行。批量处理支持断点续传 — 读取状态并跳过已完成项。',
        },
      },
      pdf: {
        heading: 'Career-Ops 如何为每个职位生成个性化简历？',
        body: '通用的简历注定失败。Career-Ops 作为一个 AI 简历构建器，能为每个职位生成不同的 ATS 优化简历，注入 JD 关键词并按相关性重新排序经历。这不是套用模板：而是从真实的简历核心竞争力中构建出来的简历。',
        steps: [
          { label: '从 JD 中提取 15-20 个关键词。', detail: '关键词会出现在总结、每个角色的第一条描述以及技能部分。' },
          { label: '语言检测。', detail: '英文 JD 生成英文简历。中文 JD 生成中文简历。' },
          { label: '地区检测。', detail: '美国公司生成 Letter 格式。欧洲公司生成 A4 格式。' },
          { label: '架构检测。', detail: '北极星目标的 6 种架构。总结会根据个人资料进行调整。' },
          { label: '精选项目。', detail: '按相关性排名前 3-4 个。Jacobo 用于智能体角色。Business OS 用于 ERP/自动化角色。' },
          { label: '重新排序描述。', detail: '最相关的经历上移，其余下移 — 但不会消失。' },
          { label: '渲染 PDF。', detail: 'Puppeteer 将 HTML 转换为 PDF。字体自托管，单栏 ATS 安全格式。' },
        ],
        archetypes: {
          heading: '6 种架构',
          headers: ['架构', '主要核心竞争力'],
          rows: [
            ['AI 平台 / LLMOps', '自愈聊天机器人 (71 个评估，闭环系统)', '/zi-yu-liao-tian-ji-qi-ren'],
            ['代理工作流', 'Jacobo (4 个智能体，每月自动化 80 小时)', '/agente-ia-jacobo'],
            ['技术 AI PM', 'Business OS (2,100 个字段，50 个自动化)', '/business-os-para-airtable'],
            ['AI 解决方案架构师', '程序化 SEO (4,730 个页面，10.8倍流量)', '/seo-programatico'],
            ['AI FDE', 'Jacobo (已售出，在生产环境中运行)', '/agente-ia-jacobo'],
            ['AI 转型主管', '4 年以上经验 (Walmart, Sagent)', ''],
          ],
        },
        callout: '同样的经历。6 种不同的包装。全部真实 — 关键词会被重新表述，绝非伪造。',
      },
      beforeAfter: {
        heading: '之前与之后',
        headers: ['维度', '手动', 'Career-Ops'],
        rows: [
          ['评估', '阅读 JD，心智映射', '10D 自动评分，A-F 等级'],
          ['简历', '通用 PDF', '个性化 PDF，针对 ATS 优化'],
          ['申请', '手动填表', 'Playwright 自动填充'],
          ['追踪', '表格或完全没有', 'TSV + 自动去重'],
          ['发现', 'LinkedIn 提醒', '扫描器：招聘门户 + 目标公司招聘页面'],
          ['批量', '一次一个', '122 个 URL 并行处理'],
          ['去重', '靠脑子记', '680 个 URL 自动去重'],
        ],
      },
      results: {
        heading: 'Career-Ops 取得了哪些成果？',
        body: '最重要的结果：我拿到了 Offer。我现在是应用 AI 负责人。Career-Ops 评估了 631 个职位，生成了 354 份个性化 PDF，并过滤了杂音，让我能专注于真正合适的机会。',
        metrics: [
          { value: '631', label: '生成报告' },
          { value: '35K+', label: 'GitHub Stars' },
          { value: '354', label: '生成 PDF' },
          { value: '2,600+', label: 'r/ClaudeAI 点赞' },
        ],
        aftermath: {
          heading: '之后发生了什么？',
          body: '当我不再需要 Career-Ops 时，我将其发布在 GitHub 上。在一周内，它从一个私人仓库变成了热门项目 — 获得 35.6K+ Stars，5K+ Forks，并被法国、中国和韩国完全不认识我的博主报道。Discord 上形成了一个 1,300 多人的社区，大家互相帮助配置和调整系统。该项目最终证明了我比任何面试过程都更强的能力。',
          highlights: [
            { value: '35K+', label: '1 周内获得 GitHub Stars' },
            { value: '5K+', label: 'Forks' },
            { value: '4', label: '语言 (EN, FR, ZH, KO)' },
            { value: '6', label: '报道国家' },
          ],
        },
      },
      stack: {
        heading: '技术栈',
        items: [
          { name: 'Claude Code', role: 'LLM 智能体：推理、评估、内容生成' },
          { name: 'Playwright', role: '浏览器自动化：门户扫描和表单填写' },
          { name: 'Puppeteer', role: '从 HTML 模板渲染 PDF' },
          { name: 'Node.js', role: '辅助脚本：追踪合并、CV 同步检查、生成 PDF' },
          { name: 'tmux', role: '并行会话：批量处理中的 Conductor + Workers' },
        ],
      },
      lessons: {
        heading: '经验教训',
        items: [
          {
            title: '自动化分析，而非决策',
            detail: 'Career-Ops 评估了 631 个职位。由我决定在哪些职位上投入时间。人机协作 (HITL) 并非限制，而是设计初衷。AI 过滤噪音，人类提供判断。'
          },
          {
            title: '模式胜过长提示词',
            detail: '12 种拥有精准上下文的模式优于一个 10,000 token 的系统提示词。每种模式仅加载其需要的内容。更少的上下文意味着更好的决策。'
          },
          {
            title: '去重比评分更有价值',
            detail: '680 个去重的 URL 意味着我省去了 680 次重复评估。去重比任何评分优化都更省时间。'
          },
          {
            title: '简历是辩论，而非文档',
            detail: '通用的 PDF 无法说服任何人。一份简历如果能按相关性重新组织经历、注入正确的关键词并调整包装架构 — 这样的简历才能转化。'
          },
          {
            title: '批量处理始终优于顺序处理',
            detail: '当我在做别的事情时，拥有并行 Worker 的 batch 模式会处理 122 个 URL。在并行编排上的投入在第一次运行时就值回票价。'
          },
          {
            title: '系统本身就是作品集',
            detail: '构建一个多智能体系统来寻找多智能体岗位，这是最直接的能力证明。我不需要解释我会做这个 — 我正在使用它。'
          },
          {
            title: '在不再需要时开源',
            detail: '在使用 Career-Ops 期间，它是私有的。当我拿到工作后，我发布了它。一周后它就获得了 35.6K Stars。教训：开源项目的最佳时机是它已经在真实的生产环境中证明了价值。'
          },
          {
            title: '为什么我坚持使用 MIT 协议',
            detail: 'MIT 协议。没有套路，CLI 内部没有加价，没有功能门槛。如果你觉得好用，那就用。如果你想支持维护或加入社区，欢迎。但工具本身不依赖于此。'
          },
        ],
      },
      cta: {
        sidebarLabel: '体验一下',
        heading: '在这里',
        body: 'Career-Ops 在 MIT 协议下开源。克隆它、Fork 它、改造它 — 它是属于你的。',
        ctaLabel: '在 GitHub 上体验',
        ctaHref: 'https://github.com/xueyifan/career-ops',
        communityHeading: '有疑问？问问社区',
        communityBody: '已有 1,300 多名开发者在使用 Career-Ops，并在 Discord 上分享技巧、模板和配置。',
        communityLabel: '加入 Discord',
        communityHref: 'https://discord.gg/8pRpHETxa4',
        supportHeading: '如果它为你节省了时间',
        supportRuleFree: '如果你正在积极找工作，那就专注于求职 — 工具是你的，没有任何附加条件。',
        supportRulePaid: '如果你已经找到了工作，并且该系统为你节省了大量时间，请我喝杯咖啡能让它保持活力。',
        supportFootnote: '100% 的资金将用于 API 成本和基础设施。',
        supportBmcLabel: '请我喝杯咖啡',
        supportBmcHref: 'https://buymeacoffee.com/xueyifan',
      },
    },
    faq: {
      heading: '常见问题',
      items: [
        {
          q: '这算不算作弊？',
          a: 'Career-Ops 自动化的是分析，而非决策。我在投递前会阅读每份报告，在发送前会审核每份 PDF。这与 CRM 的哲学相同：系统负责组织，我负责决策。',
        },
        {
          q: '为什么用 Claude Code 而不是脚本管道？',
          a: '脚本无法推理。Career-Ops 会根据公司背景调整评分，在不造假的前提下重新表述关键词，并生成叙述性报告 — 而不仅仅是填充模板。',
        },
        {
          q: '运行这个需要多少钱？',
          a: '单次评估的边际成本为零。Career-Ops 运行在我的 Claude Max 20x 计划（200美元/月）上，我用它处理一切：作品集、聊天机器人、文章和 Career-Ops。评估了 631 次，没有一笔额外账单。',
        },
        {
          q: 'apply 模式会自动填表吗？',
          a: '它使用 Playwright 阅读页面，检索缓存的评估结果，并生成与评分一致的回答。我会在提交前进行审核 — 始终如此。',
        },
        {
          q: '当扫描器发现重复职位时会发生什么？',
          a: 'scan-history.tsv 存储了 680 个已查看的 URL。通过精确的 URL 匹配以及 applications.md 中的公司+角色归一化匹配。零重复评估。',
        },
        {
          q: '可以复刻吗？',
          a: '可以 — 代码在 GitHub 上开源 (github.com/xueyifan/career-ops)。需要能够访问 Playwright 的 Claude Code。技能文件定义了每种模式的逻辑。已有 35K+ 人查看、Fork 或改造了它。',
        },
        {
          q: '如何使用 Career-Ops？',
          a: 'Career-Ops 是一个本地工具，可以通过 Claude Code 从终端运行。克隆仓库，配置简历和偏好，然后根据需要启动模式：auto-pipeline 用于端到端评估职位，scan 用于在门户网站发现职位，batch 用于并行处理多个 URL，或 pdf 用于生成个性化简历。一切都在你的机器上运行 — 你的简历和个人数据永远不会离开你的电脑。如果你需要帮助，Discord 上有一个 1,000 多人的社区：discord.gg/8pRpHETxa4',
        },
        {
          q: '运行 Career-Ops 需要什么？',
          a: '需要包含工具访问权限的 Claude Code 计划（Claude Max 或 Claude Pro）。用于网页导航的 Playwright。用于追踪合并及 Puppeteer 生成 PDF 的 Node.js。一个包含 Markdown 格式简历和搜索偏好的工作目录。不需要服务器、数据库或外部 API — 全都在本地运行。Discord 社区 (discord.gg/8pRpHETxa4) 可以协助配置。',
        },
        {
          q: 'Career-Ops 使用哪种 AI？',
          a: 'Career-Ops 不是聊天机器人或 API 包装器。它是一个多智能体系统，Claude Code 在其中充当大脑：对每个职位进行推理，从 10 个维度评估其与你的个人资料的匹配度，并做出过滤决策。12 种模式中的每一种都是一个拥有独立上下文和规则的技能文件。网页导航使用 Playwright，PDF 使用 Puppeteer，批量处理在 tmux 中启动并行 Workers。没有微调或自定义模型 — 只是使用了非常精准上下文的标准 Claude。',
        },
        {
          q: '谁创建了 Career-Ops？',
          a: '是我，薛一凡 (xueyifan)。在 Walmart 和 Sagent 等公司工作 4 年多后，我为自己的 AI 求职构建了它。该系统评估了 631 个职位，帮助我拿到了目前应用 AI 负责人的职位。当我不再需要它时，我将其开源。在一周内它就获得了 35.6K+ GitHub Stars。目前 Discord 社区人数已超过 1,300 人：discord.gg/8pRpHETxa4',
        },
      ],
    },
  },
  en: {
    slug: 'career-ops-system',
...
