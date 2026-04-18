export type N8nLang = 'zh' | 'en'

/**
 * Classification prompt used in Workflow 2.
 * Identical in both languages — it's a prompt for LLMs, always in English.
 */
export const CLASSIFICATION_PROMPT = `You are a product feedback classifier for a SaaS company.

Your task: classify the feedback below into exactly ONE category.

Categories:
- BUG — The user reports something broken, crashing, erroring, or not
  working as expected. Look for words like: crash, error, broken, fail,
  wrong, doesn't work, can't.
- FEATURE — The user requests new functionality or an improvement to
  existing features. Look for words like: add, would be nice, wish,
  could you, suggestion, improve.
- QUESTION — The user asks how to do something or needs help
  understanding the product. Look for words like: how do I, where is,
  can I, is it possible, help.

Rules:
- If the feedback contains BOTH a bug and a feature request, classify
  as BUG (broken things take priority).
- If unclear, classify as QUESTION (safest default — a human will review).
- Respond with ONLY the category name in caps. No explanation, no punctuation.

Feedback: {{ $json.Feedback }}`

export const n8nContent = {
  zh: {
    slug: 'n8n-para-pms',
    altSlug: 'n8n-for-pms',
    readingTime: '5 分钟阅读',
    seo: {
      title: 'n8n 面向 PM：速查表 + 免费 AI 模板 | xueyifan.io',
      description: '面向产品经理的 n8n 速查表：利用 AI 自动化 Sprint 报告和反馈分类。包含 2 个免费的可导入模板。分步教程。',
    },
    nav: {
      back: 'xueyifan.io',
      breadcrumbHome: '首页',
      breadcrumbCurrent: 'n8n 面向 PM',
    },
    header: {
      kicker: '闪电课程 — <a>Marily Nika 的 AI 产品学院</a>',
      h1: 'n8n 面向产品经理：带有模板的速查表',
      subtitle: '实践指南：使用 n8n 工作流自动化 Sprint 报告并利用 AI 分类反馈 —— 无需编写代码。包含 2 个免费的可导入模板。',
      date: '2026年2月24日',
    },
    intro: {
      hook: '你每周花多少小时在与产品无关的工作上？',
      body: '我衡量过。二十小时。有些周甚至达到三十小时。Sprint 报告消耗掉整整一天。散落在五个工具中的反馈需要我一个一个地阅读、分类并转化为工单。每周一都要从头开始写状态更新。',
      punchline: '我当时不是产品经理。我是一个非常昂贵的数据路由。在那些本该互通的工具之间搬运信息。在实现全自动化之前，我在自己的公司每月要花 170 小时在这上面。这两个工作流是免费的，可以作为 JSON 导入，并在 n8n Cloud 的免费层级运行。无需基础设施，无需向工程团队申请权限。今天我教你如何在一个下午搭建好它们。',
    },
    previewCta: {
      text: '这是我在 <a>Marily Nika 的 AI PM 训练营</a> 担任助教所教授内容的预热。完整课程涵盖了从探索到生产构建 AI 产品的全过程。',
    },
    timeSinks: {
      heading: '偷走你时间的 5 项任务 (20-30 小时/周)',
      columns: { num: '#', sink: '任务', hours: '小时/周', pattern: '自动化模式' },
      rows: [
        { num: '1', sink: 'Sprint 报告', hours: '8-12/sprint', pattern: 'Schedule → Query → Format → Send' },
        { num: '2', sink: '分类反馈', hours: '5-10', pattern: 'Trigger → AI Classify → Route' },
        { num: '3', sink: '在工具间移动数据', hours: '3-5', pattern: 'Trigger → Extract → Create → Notify' },
        { num: '4', sink: '保持团队同步', hours: '2-4', pattern: 'Schedule → Aggregate → Summarize → Post' },
        { num: '5', sink: '准备决策', hours: '1-2/会议', pattern: 'Schedule → Multi-query → Compile → Send' },
      ],
    },
    workflow1: {
      heading: '工作流 1：可自动化的周五',
      description: '每周五上午 9 点自动发布到 Slack 的 Sprint 报告。',
      pipelineLabels: [
        { name: 'Schedule', detail: '(周五 9am)' },
        { name: 'Airtable', detail: '(读取 sprint)' },
        { name: 'Code', detail: '(格式化)' },
        { name: 'Slack', detail: '(发布)' },
      ],
      imgAlt: '面向产品经理的 n8n 自动化 Sprint 报告工作流：每周五定时触发 → 在 Airtable 中读取 Sprint 数据 → 使用 Code 节点格式化报告 → 发布到 Slack 频道',
      imgTitle: '工作流 1：使用 n8n 自动化 Sprint 报告',
      figcaption: 'n8n 工作流 1：自动化 Sprint 报告 — Schedule → Airtable → Code → Slack',
      nodesHeading: '关键节点：',
      nodes: [
        { name: 'Schedule Trigger:', detail: '每周，周五，上午 9:00' },
        { name: 'Airtable:', detail: '按 Sprint = 当前，Status = 已完成 过滤' },
        { name: 'Code node:', detail: '按负责人分组，统计故事点，格式化为 Slack markdown' },
        { name: 'Slack:', detail: '发布到 #sprint-updates' },
      ],
      quote: '你的 Sprint 报告会在每个周五 9:05 准时到达。你什么都不用做。',
      downloadLabel: '下载工作流 1 JSON',
    },
    transition: {
      line1: '工作流 1 中没有 AI。它是纯粹的数据管道。',
      line2: '四个节点每个 Sprint 帮你节省 4-6 小时。现在想象一下当我们加入智能后会发生什么。',
    },
    workflow2: {
      heading: '工作流 2：智能路由',
      description: '利用 AI 进行反馈分类，将 Bug、功能请求和问题发送到正确的 Slack 频道。一个 AI 节点将机械流程转化为智能流程。',
      pipelineLabels: [
        { name: 'Form Trigger', detail: '' },
        { name: 'AI Classify', detail: '(LLM)' },
        { name: 'Switch', detail: '(Bug/Feature/Question)' },
        { name: 'Slack', detail: '+ Airtable' },
      ],
      imgAlt: '面向产品经理的 n8n AI 反馈分类工作流：表单触发 → 使用 Claude 进行 AI 分类 → Switch 节点将 Bug、功能请求和问题路由到独立的 Slack 频道 → 在 Airtable 中记录',
      imgTitle: '工作流 2：n8n 中的 AI 反馈分类',
      figcaption: 'n8n 工作流 2：AI 反馈分类器 — Form → Claude AI → Switch → Slack + Airtable',
      nodesHeading: '关键节点：',
      nodes: [
        { name: 'n8n Form Trigger:', detail: '姓名、邮箱、反馈文本、产品领域' },
        { name: 'Basic LLM Chain:', detail: '使用 AI 分类反馈' },
        { name: 'Switch:', detail: '根据 LLM 结果路由 (BUG / FEATURE / QUESTION)' },
        { name: 'Slack:', detail: '不同类别对应不同频道' },
        { name: 'Airtable:', detail: '记录每条分类后的反馈' },
      ],
      promptHeading: '分类提示词 (Prompt)',
      promptCopyLabel: '复制提示词',
      promptCopiedLabel: '已复制！',
      whyWorksHeading: '为什么这个提示词有效？',
      whyWorks: [
        { label: 'Role', detail: '建立上下文 ("product feedback classifier")' },
        { label: 'Signal words', detail: '按类别引导 LLM 的模式匹配' },
        { label: 'Tiebreaker rule', detail: '解决模糊情况 (Bug > 功能请求 > 问题)' },
        { label: 'Safe default', detail: '确保不遗漏任何内容' },
        { label: 'Strict output', detail: '使 Switch 节点更可靠' },
      ],
      quote: '一个 AI 节点将机械流程转化为智能流程。',
      ambiguousHeading: '模糊测试',
      ambiguousExample: '"如果导出功能能处理超过 100 行且不崩溃就太棒了。"',
      ambiguousExplanation1: '这是功能请求（"太棒了"）还是 Bug（"崩溃"）？提示词中的平局决胜规则解决了这个问题：如果反馈中同时包含 Bug 和功能请求，则分类为 BUG —— 修复损坏的部分具有优先权。',
      ambiguousExplanation2: '如果你不同意这个分类，只需修改一行提示词。无需重新训练模型，无需给数据科学团队提需求。一行文本。你编写的是验收标准而非代码 —— 这是一个产品决策，而非工程决策。',
      downloadLabel: '下载工作流 2 JSON',
    },
    pattern: {
      heading: '模式',
      description: '两个工作流遵循相同的结构：',
      labels: {
        trigger: 'TRIGGER',
        read: 'READ',
        process: 'PROCESS',
        act: 'ACT',
        when: '何时',
        getData: '获取数据',
        transform: '转换/分类',
        notify: '通知/记录',
      },
      worksFor: '此模式适用于：',
      useCases: [
        '优先处理支持工单',
        '分发销售线索',
        '优先处理客户投诉',
        '分类 NPS 响应',
        '处理表单提交',
      ],
      punchline: '流程不变。提示词在变。',
    },
    bootcampCta: {
      heading: '想在 AI 产品管理方面更进一步吗？',
      body: '你刚读到的只是我在 Marily Nika 的 AI PM 训练营中所涵盖内容的一小部分。完整的计划将带你从“想使用 AI”到“正在发布 AI 产品” —— 包含真实项目，而非纯理论。那是我学习的地方，现在我在那里担任助教。',
      cta: '加入下一期训练营',
    },
    getStarted: {
      heading: '开始行动',
      steps: [
        { num: 1, text: '<a>n8n Cloud (14 天免费)</a> — 注册并开始构建' },
        { num: 2, text: '选择你周五最无聊的任务' },
        { num: 3, text: '本周搭建一个工作流' },
      ],
      bonusStep: '想端到端学习 AI 产品管理吗？看看 <a>Marily Nika 博士的 AI PM 训练营</a> —— 我在那里学习，现在在那里担任助教。',
      quote: '第一个自动化是最难的。第二个只需一半的时间。',
    },
    lessons: {
      heading: '每月自动化 170 小时后的心得',
      items: [
        {
          title: '先自动化无聊的任务。',
          detail: '引人注目的用例固然诱人，但 Sprint 报告每两周为我省下了 12 小时 —— 这比我搭建的任何巧妙集成都更具价值。',
        },
        {
          title: '你的数据库就是大脑。',
          detail: '不要另外搭建“自动化数据库”。Jira、Airtable 和 Sheets 已经包含了工作流所需 90% 的数据。',
        },
        {
          title: '自动化触发器，而不仅仅是任务。',
          detail: '“点击按钮时”运行的工作流能省时。但“交易完成时”运行的工作流能省时并将你完全从流程中解放出来。后者价值高出 10 倍。',
        },
        {
          title: '从一个开始。',
          detail: '我曾尝试一次性自动化所有事情，结果得到了 14 个半成品工作流，且完全没省下时间。一个可靠运行的工作流胜过五个草稿。',
        },
      ],
    },
    faq: {
      heading: '常见问题',
      items: [
        {
          q: '什么是 n8n？',
          a: 'n8n 是一个开源的工作流自动化平台。它允许你连接各种工具（Slack, Jira, Airtable, APIs）并创建可视化的无代码工作流。与 Zapier 或 Make 不同，它是可以自托管的，并且拥有原生的 AI 节点，可以将 LLM 直接集成到你的自动化中。',
        },
        {
          q: 'n8n 可以连接到 Jira / Salesforce / 我的工具吗？',
          a: '是的。支持超过 400 种集成 —— Jira, Salesforce, Notion, Linear, HubSpot, Zendesk, Google Sheets。如果你在用它，n8n 很可能就能连接。',
        },
        {
          q: 'n8n 免费吗？',
          a: '自托管版本永久免费（开源，无限制）。云端版提供 Pro 计划 14 天免费试用，无需信用卡。之后每月 24 欧元起。对于这里展示的内容，试用期足够了。',
        },
        {
          q: '我应该使用哪个 LLM 来做分类器？',
          a: '用你公司已经付费的那个。这个提示词在 Claude, GPT-4 或 Gemini 上效果一样。分类模式不随模型改变。',
        },
        {
          q: 'n8n 还是 Make？它与 Zapier 有什么区别？',
          a: 'n8n 是开源的、可自托管的，拥有原生 AI 节点和可视化画布，能让你看清分支逻辑。Zapier 适合简单的触发器。Make 价格不错。n8n 适合当你需要分支、AI、循环和完全控制时 —— 它在西班牙正以每年 647% 的速度增长。',
        },
        {
          q: '如果 AI 分类错误怎么办？',
          a: '修改提示词。添加一个信号词，调整平局决胜规则，或添加一个类别。你在纯文本而非代码中迭代。Airtable 的日志可以让你进行审核和纠正。',
        },
        {
          q: '我可以下载这篇文章中的 n8n 模板吗？',
          a: '是的。这两个工作流都作为 JSON 文件提供，可以直接导入 n8n Cloud (免费层级)。从“导入工作流”部分下载，5 分钟内即可运行。',
        },
      ],
    },
    import: {
      heading: '导入工作流',
      description: '下载 JSON 文件并将其直接导入你的 n8n 实例：',
      wf1Label: '工作流 1 — 可自动化的周五',
      wf2Label: '工作流 2 — 智能路由',
      howToHeading: '如何导入：',
      howToText: '在 n8n 中，点击 + 按钮，选择 "Import from File" 并选择 JSON。然后连接你自己的 Slack、Airtable 和 AI 凭据。',
    },
    resources: {
      heading: '资源',
      items: [
        { label: 'n8n 文档', url: 'https://docs.n8n.io' },
        { label: 'Airtable 节点文档', url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.airtable/' },
        { label: 'AI 节点指南', url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/' },
      ],
    },
    footer: {
      role: 'AI 产品经理 · 解决方案架构师',
      fellowAt: '助教于',
      fellowLink: 'AI 产品学院',
      copyright: '版权所有。',
    },
  },
  en: {
    slug: 'n8n-for-pms',
    altSlug: 'n8n-para-pms',
    readingTime: '5 min read',
    seo: {
      title: 'n8n for PMs: Cheat Sheet + Free AI Templates | xueyifan.io',
      description: 'n8n cheat sheet for Product Managers: automate sprint reports and classify feedback with AI. 2 free importable workflow templates. Step-by-step tutorial.',
    },
    nav: {
      back: 'xueyifan.io',
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'n8n for PMs',
    },
    header: {
      kicker: 'Lightning Session — <a>Marily Nika\'s AI Product Academy</a>',
      h1: 'n8n for Product Managers: Cheat Sheet with Templates',
      subtitle: 'Practical cheat sheet: automate your sprint reports and classify feedback with AI using n8n workflows — no code required. 2 free importable templates.',
      date: 'Feb 24, 2026',
    },
    intro: {
      hook: 'How many hours a week do you spend on work that has nothing to do with product?',
      body: 'I tracked mine. It was twenty. Some weeks, thirty. Sprint reports that take a full day. Feedback scattered across five tools that I had to read, classify, and turn into tickets one by one. Status updates typed from scratch every Monday.',
      punchline: 'I wasn\'t a product manager. I was a very expensive data router. Moving information between tools that should have been talking to each other. I spent 170 hours a month on this at my own company before I automated all of it. Both workflows are free, importable as JSON, and run on n8n Cloud\'s free tier. No infrastructure, no permission from engineering. Today I\'ll show you how to build them in an afternoon.',
    },
    previewCta: {
      text: 'This is a preview of what I teach as a Teaching Fellow at <a>Marily Nika\'s AI PM Bootcamp</a>. The full course covers how to build AI products end-to-end — from discovery to production. Both workflows below are real: I use them weekly at my own company.',
    },
    timeSinks: {
      heading: 'The 5 PM Time Sinks (20-30 hours/week)',
      columns: { num: '#', sink: 'Time Sink', hours: 'Hours/Week', pattern: 'Automation Pattern' },
      rows: [
        { num: '1', sink: 'Sprint reports', hours: '8-12/sprint', pattern: 'Schedule → Query → Format → Send' },
        { num: '2', sink: 'Classifying feedback', hours: '5-10', pattern: 'Trigger → AI Classify → Route' },
        { num: '3', sink: 'Moving data between tools', hours: '3-5', pattern: 'Trigger → Extract → Create → Notify' },
        { num: '4', sink: 'Keeping team in sync', hours: '2-4', pattern: 'Schedule → Aggregate → Summarize → Post' },
        { num: '5', sink: 'Preparing for decisions', hours: '1-2/meeting', pattern: 'Schedule → Multi-query → Compile → Send' },
      ],
    },
    workflow1: {
      heading: 'Workflow 1: The Automatable Friday',
      description: 'Automated sprint report that posts to Slack every Friday at 9am.',
      pipelineLabels: [
        { name: 'Schedule', detail: '(Fri 9am)' },
        { name: 'Airtable', detail: '(read sprint)' },
        { name: 'Code', detail: '(format)' },
        { name: 'Slack', detail: '(post)' },
      ],
      imgAlt: 'n8n automated sprint report workflow for product managers: Schedule Trigger every Friday → Read Sprint Data from Airtable → Format Report with Code node → Post to Slack channel',
      imgTitle: 'Workflow 1: Automated Sprint Report with n8n',
      figcaption: 'Workflow 1 in n8n: automated sprint report — Schedule → Airtable → Code → Slack',
      nodesHeading: 'Key nodes:',
      nodes: [
        { name: 'Schedule Trigger:', detail: 'Every week, Friday, 9:00 AM' },
        { name: 'Airtable:', detail: 'Filter by Sprint = Current, Status = Done' },
        { name: 'Code node:', detail: 'Group by assignee, count story points, format as Slack markdown' },
        { name: 'Slack:', detail: 'Post to #sprint-updates' },
      ],
      quote: 'Your sprint report arrives every Friday at 9:05am. You did nothing.',
      downloadLabel: 'Download Workflow 1 JSON',
    },
    transition: {
      line1: 'There\'s no AI in Workflow 1. It\'s pure plumbing.',
      line2: 'Four nodes that save you 4-6 hours every sprint. Now imagine what happens when we add intelligence.',
    },
    workflow2: {
      heading: 'Workflow 2: The Intelligent Router',
      description: 'AI-powered feedback classification that routes bugs, features, and questions to the right Slack channel. One AI node turns a dumb pipe into a smart pipe.',
      pipelineLabels: [
        { name: 'Form Trigger', detail: '' },
        { name: 'AI Classify', detail: '(LLM)' },
        { name: 'Switch', detail: '(Bug/Feature/Question)' },
        { name: 'Slack', detail: '+ Airtable' },
      ],
      imgAlt: 'n8n AI feedback classification workflow for product managers: Form Trigger → AI Classifier with Claude → Switch node routes bugs, features, and questions to separate Slack channels → Log to Airtable',
      imgTitle: 'Workflow 2: AI-Powered Feedback Classification with n8n',
      figcaption: 'Workflow 2 in n8n: AI feedback classifier — Form → Claude AI → Switch → Slack + Airtable',
      nodesHeading: 'Key nodes:',
      nodes: [
        { name: 'n8n Form Trigger:', detail: 'Name, Email, Feedback Text, Product Area' },
        { name: 'Basic LLM Chain:', detail: 'Classify feedback using AI' },
        { name: 'Switch:', detail: 'Route based on LLM output (BUG / FEATURE / QUESTION)' },
        { name: 'Slack:', detail: 'Different channel per category' },
        { name: 'Airtable:', detail: 'Log every classified feedback' },
      ],
      promptHeading: 'The Classification Prompt',
      promptCopyLabel: 'Copy prompt',
      promptCopiedLabel: 'Copied!',
      whyWorksHeading: 'Why this prompt works:',
      whyWorks: [
        { label: 'Role', detail: 'sets context ("product feedback classifier")' },
        { label: 'Signal words', detail: 'per category guide the LLM\'s pattern matching' },
        { label: 'Tiebreaker rule', detail: 'handles ambiguous cases (bugs > features > questions)' },
        { label: 'Safe default', detail: 'ensures nothing gets lost' },
        { label: 'Strict output', detail: 'makes the Switch node reliable' },
      ],
      quote: 'One AI node turned a dumb pipe into a smart pipe.',
      ambiguousHeading: 'The Ambiguous Test',
      ambiguousExample: '"It would be really nice if the export could handle more than 100 rows without crashing."',
      ambiguousExplanation1: 'Is this a feature request ("it would be nice") or a bug ("crashing")? The tiebreaker rule in the prompt handles it: if feedback contains both a bug and a feature request, classify as BUG — broken things take priority.',
      ambiguousExplanation2: 'If you disagree with that classification, you change one line of the prompt. Not a model retrain. Not a ticket to data science. One line of text. You wrote acceptance criteria, not code — and that\'s a product decision, not an engineering decision.',
      downloadLabel: 'Download Workflow 2 JSON',
    },
    pattern: {
      heading: 'The Pattern',
      description: 'Both workflows follow the same structure:',
      labels: {
        trigger: 'TRIGGER',
        read: 'READ',
        process: 'PROCESS',
        act: 'ACT',
        when: 'when',
        getData: 'get data',
        transform: 'transform/classify',
        notify: 'notify/log',
      },
      worksFor: 'This pattern works for:',
      useCases: [
        'Prioritizing support tickets',
        'Routing sales leads',
        'Triaging customer complaints',
        'Classifying NPS responses',
        'Processing form submissions',
      ],
      punchline: 'The pipe stays the same. The prompt changes.',
    },
    bootcampCta: {
      heading: 'Want to go deeper into AI Product Management?',
      body: 'What you just read is a fraction of what I cover at Marily Nika\'s AI PM Bootcamp. The full program takes you from "I want to use AI" to "I\'m shipping AI products" — with real projects, not theory. It\'s where I trained, and I now teach there as a Fellow.',
      cta: 'Join the next cohort',
    },
    getStarted: {
      heading: 'Get Started',
      steps: [
        { num: 1, text: '<a>n8n Cloud (14-day free trial)</a> — sign up and start building' },
        { num: 2, text: 'Pick your most boring Friday task' },
        { num: 3, text: 'Build one workflow this week' },
      ],
      bonusStep: 'Want to learn AI Product Management end-to-end? Check out the <a>AI PM Bootcamp by Dr. Marily Nika</a> — where I trained and now teach as a Fellow.',
      quote: 'The first automation is the hardest. The second takes half the time.',
    },
    lessons: {
      heading: 'What I Learned Automating 170 Hours a Month',
      items: [
        {
          title: 'Automate the boring task first.',
          detail: 'The flashy use case is tempting. But sprint reports won me 12 hours back every two weeks — more than any clever integration I built.',
        },
        {
          title: 'Your database is the brain.',
          detail: 'Don\'t build a separate "automation database." Jira, Airtable, and Sheets already contain 90% of the data your workflows need.',
        },
        {
          title: 'Automate the trigger, not just the task.',
          detail: 'A workflow that runs "when I click a button" saves time. A workflow that runs "when a deal closes" saves time AND removes you from the loop entirely. The second kind is worth 10x more.',
        },
        {
          title: 'Start with one.',
          detail: 'I tried to automate everything at once and ended up with 14 half-broken workflows and zero time savings. One workflow running reliably beats five in draft mode.',
        },
      ],
    },
    faq: {
      heading: 'Common Questions',
      items: [
        {
          q: 'Can n8n connect to Jira / Salesforce / my tool?',
          a: 'Yes. Over 400 integrations — Jira, Salesforce, Notion, Linear, HubSpot, Zendesk, Google Sheets. If you use it, n8n probably connects to it.',
        },
        {
          q: 'Is n8n free?',
          a: 'Self-hosted is free forever (open source, no limits). Cloud gives you a 14-day free trial of the Pro plan, no credit card required. After that, plans start at €24/month. The trial is more than enough for everything shown here.',
        },
        {
          q: 'What LLM should I use for the classifier?',
          a: 'Whatever your company already pays for. The prompt works the same with Claude, GPT-4, or Gemini. The classification pattern doesn\'t change with the model.',
        },
        {
          q: 'How is this different from Zapier or Make?',
          a: 'Open source, self-hostable, AI nodes built in, and a visual canvas that lets you see the branching logic. Zapier is great for simple triggers. n8n is for when you need branching, AI, loops, and full control.',
        },
        {
          q: 'What if the AI classifies something wrong?',
          a: 'You change the prompt. Add a new signal word, adjust the tiebreaker rule, add a category. You iterate in plain English, not in code. And the Airtable log lets you review and correct.',
        },
        {
          q: 'Can I download the n8n templates from this article?',
          a: 'Yes. Both workflows are available as JSON files you can import directly into n8n Cloud (free tier). Download them from the "Import Workflows" section and they\'ll be running in 5 minutes.',
        },
      ],
    },
    import: {
      heading: 'Import the Workflows',
      description: 'Download the JSON files and import them directly into your n8n instance:',
      wf1Label: 'Workflow 1 — The Automatable Friday',
      wf2Label: 'Workflow 2 — The Intelligent Router',
      howToHeading: 'How to import:',
      howToText: 'In n8n, click the + button, select "Import from File", and choose the JSON. Then connect your own Slack, Airtable, and AI credentials.',
    },
    resources: {
      heading: 'Resources',
      items: [
        { label: 'n8n Documentation', url: 'https://docs.n8n.io' },
        { label: 'Airtable node docs', url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.airtable/' },
        { label: 'AI nodes guide', url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/' },
      ],
    },
    footer: {
      role: 'AI Product Manager · Solutions Architect',
      fellowAt: 'Teaching Fellow at',
      fellowLink: 'AI Product Academy',
      copyright: 'All rights reserved.',
    },
  },
} as const

/** Helper to get content for a given language */
export function getN8nContent(lang: N8nLang) {
  return n8nContent[lang]
}

/** Derive the type of a single language's content */
export type N8nContent = (typeof n8nContent)['en']
