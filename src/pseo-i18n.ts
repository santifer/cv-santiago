export const pseoContent = {
  zh: {
    slug: 'cheng-xu-hua-seo',
    altSlug: 'programmatic-seo',
    readingTime: '37 分钟阅读',
    seo: {
      title: '程序化 SEO：从 ERP 自动生成的 4000+ 页面 | xueyifan.io',
      description: '案例研究：我如何利用 Airtable、DataForSEO 和抓取预算优化，自动生成了 4,730 个静态落地页。获得 200 万+ 展示次数和 1.9 万+ 点击。',
    },
    nav: {
      breadcrumbHome: '首页',
      breadcrumbCurrent: '程序化 SEO',
    },
    header: {
      kicker: '案例研究 — <a>薛一凡 iRepair</a>',
      kickerLink: 'https://xueyifanirepair.es',
      h1: '程序化 SEO：从 ERP 自动生成的 4,700+ 页面',
      subtitle: '我如何利用真实的生产数据、包含 14 张表的 Airtable CMS 以及作为决策引擎的 DataForSEO，生成了 4,730 个唯一的落地页。获得 226 万次展示和 1.9 万+ 点击。',
      date: '2026年2月25日',
    },
    intro: {
      hook: '程序化 SEO 是指从数据库自动生成数千个页面，每个页面都针对特定的长尾搜索进行优化。我从 Airtable 中的 ERP 系统构建了 4,730 个落地页。在西班牙的设备维修行业，当时还没有其他人这样做。',
      body: '这个想法很简单：如果有人搜索“塞维利亚 iPhone 电池维修”，就应该有一个针对该搜索的特定页面，包含真实的价格、预估时间以及真实维修的照片。但手动为数千种组合创建页面是不可行的。我需要一个能从 ERP 自动生成页面的系统，并且足够智能，能决定哪些页面需要索引，哪些不需要。',
      context: '自 2009 年起，薛一凡 iRepair 是我在塞维利亚经营的设备维修业务。16 年间，完成超过 30,000 次维修。2024 年，我决定让业务网站从 Squarespace 上的电子宣传册转变为能够捕捉 Google 既有需求的工具。我构建了这个程序化 SEO 系统作为竞争优势，并于 2025 年 9 月在业务巅峰期成功出售。',
      tldr: {
        heading: '10秒概览',
        items: [
          '从生产级 ERP 构建了 4,730 个静态落地页（包含真实价格、照片、评价）',
          '使用 DataForSEO 作为决策引擎：仅索引具有真实搜索量的页面',
          '结果：226 万次展示，1.9 万+ 自然点击，占网站总流量的 80%',
          '由一人历时 7 个月开发，业务在巅峰期售出',
        ],
      },
    },
    sections: {
      migration: {
        heading: '起点',
        intro: '业务网站在 Squarespace 上运行了多年。无法控制 URL，没有规范标签，没有自定义重定向。接下来的任务不仅是更换平台，而是一次三重迁移：平台（Squarespace → Astro）、域名（xueyifan.me → xueyifanirepair.es）以及托管（Squarespace → Vercel/Cloudflare）。第一步是记录究竟需要修复什么：一份长达 144 页的完整技术审计，作为 Big SEO 硕士课程的毕业设计。',
        duplicateCallout: 'Squarespace 在 4 个不同的 URL（www、非 www、带斜杠、.html）上提供相同的页面。Google 视其为每个页面的 4 个副本。',
        audit: {
          heading: '技术审计',
          prose: '第一步是进行完整的技术审计。这份 144 页的文档记录了网站的每个技术细节：从流量状况到最后的元描述。',
          baseline: [
            { value: '23.1', label: '平均排名' },
            { value: '↓ 下滑', label: 'SISTRIX 可见度' },
            { value: '21/100', label: 'Lighthouse (移动端)' },
            { value: '33/40', label: '有错误的项目' },
          ],
          findings: [
            { title: '838 个重复的 H1', detail: 'Squarespace 模板在每个页面都注入了一个隐藏的 H1，导致主标题重复。Google 看到两个标题在争夺相关性。' },
            { title: '1,015 处关键词蚕食', detail: '不同页面在争夺相同的关键词。首页、类别页和模型页在搜索结果中互相竞争。' },
            { title: '869 处结构化数据错误', detail: 'LocalBusiness schema 未遵循 schema.org 的建议。Google 无法正确解读业务信息。' },
            { title: '831 个非规范页面', detail: 'Squarespace 提供每个页面的 4 个 URL，但未重定向到规范 URL。GSC 将其报告为无规范标签的重复内容。' },
          ],
          callout: '审计的 40 个技术项中有 33 个存在错误。只有 7 个合格。审计不仅诊断了问题，更成为了整个项目的路线图。',
        },
        technicalDebt: {
          heading: '技术债务',
          items: [
            { title: '缺少规范标签', detail: 'www 与非 www、带/不带尾随斜杠、带/不带 .html。同一个页面对应 4 个 URL。Squarespace 虽然显示了 canonical 但并未实际重定向。' },
            { title: '无法自定义重定向', detail: 'Squarespace 不允许创建自定义 301 重定向。266 个历史 URL 在 GSC 中显示为 404。无法将旧 URL 映射到新结构。' },
            { title: '无法控制 URL Slug', detail: '业务分类已存在，但 Squarespace 生成了冗余 URL，如 /reparar-iphone/reparar-iphone-x。部分 URL 长度超过 115 字符。' },
            { title: '重复内容风险', detail: '检测到 1,015 处蚕食。79 个页面内容稀薄。无规范标签的 URL 变体向 Google 发送了混乱信号。' },
          ],
        },
        migrationSteps: {
          heading: '迁移过程',
          steps: [
            { label: '使用 Screaming Frog 进行完整抓取', detail: '识别出 838 个多 H1 页面、266 个 404 URL 和 1,015 处蚕食。映射出 1,009 条重定向规则。' },
            { label: '在 Astro 中建立新 URL结构', detail: '从 ~80 个页面扩展到针对 156,000 次月度交易搜索优化的 480+ 个页面。URL 更简洁：/reparar-{设备}/ 等。' },
            { label: '在 vercel.json 中配置 301 重定向', detail: '部署在 Vercel 上的专用重定向服务器。单个配置文件达 190KB。' },
            { label: '基于意图的智能重定向', detail: '将全国性页面重定向到本地版本。例如：将通用维修页面引导至塞维利亚本地版本。' },
          ],
        },
        redirectServer: {
          heading: '重定向服务器',
          prose: '三重迁移（平台、域名、托管）需要一个计划，以免损失旧域名的权威性。解决方案是在 Vercel 上建立一个唯一的重定向项目。',
          metrics: [
            { value: '1,009', label: '重定向规则' },
            { value: '190 KB', label: 'vercel.json' },
            { value: '4', label: '重定向层级' },
            { value: '46', label: '7个月内的提交' },
          ],
          tiers: [
            { title: '模型 → 模型', detail: '清理冗余 URL，保持用户意图一致。' },
            { title: '品牌 → 品牌 + 城市', detail: '新结构加入了城市作为本地信号。' },
            { title: '通配符 + 兜底', detail: '任何未映射的 URL 均重定向至首页。用户和 Google 均无 404。' },
          ],
          callout: '由于 Squarespace 的 URL 结构不规范，1,009 条规则均由人工映射。',
        },
        orderCallout: '在 Google Search Console 中请求地址更改之前实施重定向。顺序非常重要。',
        migrationCost: {
          heading: '迁移成本',
          body: '所有迁移都有过渡成本。800+ 页面重新索引需要时间，核心关键词排名曾短暂下降。这是预料之中的，Google 需要时间重新评估。',
          lighthouse: [
            { value: '100', label: '性能' },
            { value: '92', label: '可访问性' },
            { value: '96', label: '最佳实践' },
            { value: '100', label: 'SEO' },
          ],
          closing: 'Lighthouse 分数从 21 提升至 100。技术审计记录的 33 个问题通过迁移一举解决。',
        },
      },
      theNumbers: {
        heading: '数据表现',
        metrics: [
          { value: '226万', label: '展示次数', detail: '累计总计（GSC 数据）' },
          { value: '1.9万+', label: '自然点击', detail: '来自搜索的真实流量（GSC 数据）' },
          { value: '4,730', label: '有流量的页面', detail: '在生成的数千个页面中，4,084 个被索引' },
          { value: '10.8倍', label: '增长', detail: '月点击量从 202 增长到 2,193' },
          { value: '80%', label: '点击来自 pSEO', detail: '网站自然流量主要来自程序化生成的页面' },
          { value: '7', label: '个月', detail: '1人。包含 CMS、流水线、2.6万张图片和部署' },
        ],
        timeline: '开发时间：2024 年 3 月至 10 月。一人负责所有环节。如果今天用 Claude Code 构建，只需一周。',
      },
      opportunity: {
        heading: '机遇',
        body: '西班牙的设备维修市场具有高度的本地化特征。用户根据城市、品牌和维修类型进行搜索。但大多数同行的网站都很通用。',
        points: [
          '数千种长尾组合在搜索结果中没有真正的竞争',
          '明确的交易搜索意图：用户想要维修，而不是获取信息',
          '2024年，行业内尚无竞争对手在西班牙使用程序化 SEO',
          'ERP 已有所有必要数据：867 个模型、价格、照片',
          '自然的业务分类（设备、品牌、型号、维修、城市）直接映射到 URL',
        ],
        queryExamples: [
          { query: '塞维利亚手机维修', clicks: 42, impressions: 1947, ctr: '2.2%', position: '2.5' },
          { query: '维修 iPhone 塞维利亚', clicks: 51, impressions: 3314, ctr: '1.5%', position: '12.9' },
          { query: 'pixel 6a 更换电池', clicks: 51, impressions: 755, ctr: '6.8%', position: '6.4' },
          { query: '佳明塞维利亚技术服务', clicks: 36, impressions: 534, ctr: '6.7%', position: '6.5' },
        ],
      },
      twoTypes: {
        heading: '两种策略，一个系统',
        body: '项目初期有全国性的雄心，但 Google 的标准不同。维修搜索有极强的本地意图。解决方案是双重策略：针对塞维利亚的本地页面和针对特定维修的全国性利基页面。',
        local: {
          title: '本地页面（塞维利亚）',
          description: '设备 + 品牌 + 维修与“/sevilla”的组合。由于靠近实体店，Google 优先展示这些页面。',
          examples: [
            { url: '/reparar-smartwatch/sevilla', clicks: 615, ctr: '3.7%' },
            { url: '/reparar-iphone/bateria/sevilla', clicks: 581, ctr: '2.5%' },
          ],
        },
        national: {
          title: '全国页面（无城市）',
          description: '针对地理位置不太重要的利基维修。通过“更换-{零件}-{品牌}-{型号}”格式捕捉信息搜索。',
          examples: [
            { url: '/cambiar-bateria-google-pixel-6a', clicks: 372, ctr: '5.0%' },
          ],
        },
      },
      architecture: {
        heading: '架构设计',
        body: '系统由四层组成。Airtable 作为 Headless CMS。ERP 提供真实的生产数据。DataForSEO 决定索引内容。Astro 生成静态 HTML。',
        layers: [
          {
            icon: 'database',
            name: 'Airtable (Headless CMS)',
            desc: '14张表，每表约60个字段。6级层级：设备类型、品牌、系列、型号、维修及本地变体。',
          },
          {
            icon: 'wrench',
            name: 'ERP (生产数据)',
            desc: '为 Airtable 提供真实数据：维修前后的照片、验证过的客户评价、零件库存。',
          },
          {
            icon: 'bar-chart',
            name: 'DataForSEO (决策引擎)',
            desc: '查询每种组合的真实搜索量。无搜索量的页面将不会被索引。',
          },
          {
            icon: 'zap',
            name: 'Astro (静态生成)',
            desc: '21个页面模板。生成带有最少 JS 的静态 HTML。每页包含 6 种 JSON-LD。',
          },
        ],
      },
      cmsDeepDive: {
        heading: 'CMS 深度解析',
        body: 'Airtable 不仅仅是一个加强版的电子表格。在这个项目中，它是一个完整的关系型 CMS。',
        tables: [
          { name: '设备类型', purpose: '分类的根节点', keyFields: 'slug, 名称, SEO 描述' },
          { name: '品牌', purpose: '关联至设备类型', keyFields: 'slug, 名称, Logo' },
          { name: '系列', purpose: '模型分组（如 iPhone 14 系列）', keyFields: 'slug, 主图' },
          { name: '型号', purpose: '具体设备及价格', keyFields: 'slug, 价格, 年份' },
          { name: '维修', purpose: '每个型号的维修类型', keyFields: '价格, 时间, 是否可索引' },
          { name: '本地变体', purpose: '针对本地 SEO 的城市页面', keyFields: '型号 + 维修 + 城市' },
        ],
        highlights: [
          { title: '双重定价', detail: '每项维修都有原装零件和兼容零件的价格。用户在落地页进行选择。' },
          { title: '图片继承', detail: '如果型号没有自己的图片，则继承系列的图片。减少维护工作。' },
          { title: '级联社交证明', detail: '评价与型号或系列挂钩。一个型号的评价会出现在该型号的所有维修页面上。' },
        ],
        businessOsCallout: '这个包含 14 张表的 CMS 是更广泛的 Business OS 的一部分。 <a href="/business-os-for-airtable" class="text-primary underline underline-offset-2 hover:text-primary/80">阅读 Business OS 完整案例研究 →</a>',
      },
      pageAnatomy: {
        heading: '页面剖析',
        body: '数千个页面均从模板生成，但内容是唯一的，因为数据来自 ERP。',
        components: [
          { icon: 'list', name: '面包屑 + Schema', desc: '反映分类层级的导航。自动生成 JSON-LD。' },
          { icon: 'dollar-sign', name: '真实价格', desc: '实时更新。用户看到的就是他们将要支付的价格。' },
          { icon: 'clock', name: '预估时间', desc: '基于维修车间的真实历史数据。' },
          { icon: 'camera', name: '前后对比图', desc: '真实维修的照片。注入了地理位置 EXIF 信息。' },
          { icon: 'star', name: '验证评价', desc: '来自真实客户，与型号关联。' },
          { icon: 'code', name: '6 种 JSON-LD', desc: '包含 LocalBusiness, Product 等。每页都有完整的标记。' },
        ],
        screenshot: {
          src: '/pseo/ss-repair-page-full.webp',
          alt: '程序化维修页面剖析',
          caption: '真实案例：从 ERP 生成的维修页面。双重定价、真实评价、完整 JSON-LD。',
        },
      },
      decisionEngine: {
        heading: '决策引擎',
        body: '系统生成了数千个页面，但并非所有页面都值得被索引。关键在于区分 SEO 和用户体验 (UX)。',
        rules: [
          {
            condition: '高搜索量 (DataForSEO)',
            action: '可索引页面',
            detail: '如果关键词有显著搜索量，页面将设置为 index, follow。',
          },
          {
            condition: '低或无搜索量',
            action: 'Noindex 页面 (仅供 UX)',
            detail: '页面依然存在供用户导航，但不会出现在 sitemap 中。',
          },
          {
            condition: 'ERP 中无服务数据',
            action: '不生成页面',
            detail: '如果没有真实的价格或库存，则不创建页面。',
          },
        ],
        stats: '在生成的数千个页面中，4,084 个被列入 sitemap 供索引。',
      },
      pipeline: {
        heading: '构建流水线',
        body: '流水线将 CMS 数据转化为随时可部署的静态网站。全程自动化。',
        steps: [
          { label: 'Airtable API', desc: '提取记录，支持指数退避重试' },
          { label: 'Schema 映射', detail: '将层级结构转化为 TypeScript 类型' },
          { label: '评价缓存', desc: '缓存评价以避免重复 API 调用' },
          { label: '生成静态路径', desc: '从完整分类生成路由' },
          { label: 'Astro SSG', desc: '静态构建，最少 JS' },
          { label: 'Cloudflare CDN', desc: '全球边缘缓存部署' },
        ],
      },
      contentAutomation: {
        heading: '自动化内容流水线',
        body: '生成页面只是成功了一半。每个页面都需要独特的图片、元数据和文案。',
        pipelines: [
          {
            icon: 'camera',
            name: '参数化图片生成',
            desc: '一张设备照片自动生成 18 种变体（屏幕、电池、充电口维修等）。',
          },
          {
            icon: 'code',
            name: '本地 SEO 的 EXIF 注入',
            desc: '每张图都注入了塞维利亚的 GPS 坐标和 SEO 描述。',
          },
          {
            icon: 'star',
            name: '前后对比图流水线',
            desc: '自动处理 10,000+ 张真实维修照片。',
          },
          {
            icon: 'zap',
            name: '基于型号的动态文案',
            desc: '根据硬件规格（摄像头、电池等）生成独特的微文案。',
          },
        ],
      },
      growth: {
        heading: '增长曲线',
        body: '项目于 2024 年 10 月启动。经历了最初的索引期和随后的结构重组。一旦稳定，点击量在 11 个月内从 202 增长到了 2,193。',
        monthly: [
          { month: '2024年10月', clicks: 202, impressions: 16420, note: '启动' },
          { month: '2025年9月', clicks: 2193, impressions: 164440, note: '峰值 · 业务售出' },
        ],
        insight: '重组后流量在一个月内增长了 62%。该系统在新业主手中继续运行。',
      },
      results: {
        heading: '成果',
        body: '自上线以来的累计指标（2024年10月至2026年2月）：',
        metrics: [
          { value: '19,388', label: '自然点击', detail: '17个月运营' },
          { value: '1.17%', label: '平均 CTR', detail: '基于 226 万次展示' },
          { value: '4,084', label: 'sitemap 中的 URL', detail: '通过决策引擎筛选' },
          { value: '<1秒', label: '加载时间', detail: '高性能 Astro 架构' },
        ],
      },
      crawlBudget: {
        heading: '抓取预算优化',
        body: '管理 4,700+ 页面的抓取预算至关重要。Google 不应在不会带来排名的页面上浪费时间。',
        strategies: [
          { title: '选择性 Noindex', detail: '基于 DataForSEO 的真实数据驱动。' },
          { title: '过滤后的 sitemap', detail: '仅包含 4,084 个可索引 URL。' },
          { title: '结构化 URL', detail: '6种预判模式，方便 Google 理解。' },
          { title: '上下文内链', detail: '为可索引页面提供更多内链。' },
        ],
        safeNoindex: {
          heading: '“安全 Noindex” 模式',
          prose: '意外的 noindex 是最昂贵的错误。我们通过要求输入一个 80 字符的特定字符串来防止这种情况发生。',
          callout: '在 2 年的生产运行中，未发生过意外脱索。',
        },
      },
      stack: {
        heading: '技术栈',
        body: '选择 Astro 是为了纯粹的 SSG。Airtable 作为 CMS 是因为它是已有的业务操作系统。',
        items: [
          { name: 'Astro', role: 'SSG 框架，21个模板' },
          { name: 'Airtable', role: 'Headless CMS，14张表' },
          { name: 'DataForSEO', role: '搜索量数据来源' },
          { name: '自定义 ERP', role: '867个型号的数据' },
          { name: 'Cloudflare', role: '全球 CDN 部署' },
        ],
      },
      lessons: {
        heading: '教训',
        items: [
          { title: 'Google 决定意图，而不是你', detail: '维修搜索具有极强的本地属性，本地页面表现优于全国页面。' },
          { title: '决策引擎比生成器更重要', detail: '生成万个页面很简单，决定索引哪些才是关键。' },
          { title: 'ERP 是竞争护城河，而非模板', detail: '真实数据是无法通过 AI 简单模拟的。' },
          { title: 'Airtable 的扩展性超出预期', detail: '配合重试机制和缓存，Airtable 作为 Headless CMS 非常稳定。' },
        ],
      },
    },
    cta: {
      heading: '我设计能将运营数据转化为竞争优势的系统。',
      body: '这个案例展示了我反复应用的一个模式：映射业务本体、构建数据至部署的流水线，并以真实指标衡量一切。目前我正在寻找 AI 产品经理或解决方案架构师的职位。',
      label: '联系我',
    },
    faq: {
      heading: '常见问题',
      items: [
        {
          q: '程序化 SEO 是垃圾邮件吗？',
          a: '只有当页面不提供价值时才是。在这种情况下，每页都有真实的生产数据。',
        },
        {
          q: '为什么不用 AI 生成内容？',
          a: '因为真正的差异化在于数据的真实性。ERP 的价格和照片是无法通过 AI 模拟的。',
        },
        {
          q: 'Airtable 能承载 4,700+ 页面吗？',
          a: '可以，关键在于配合构建流水线和重试机制，而不是实时查询。',
        },
      ],
    },
    resources: {
      heading: '资源',
      items: [
        { label: 'GitHub 源码', url: 'https://github.com/xueyifan/xueyifan-irepair' },
        { label: 'Astro 框架', url: 'https://astro.build' },
      ],
    },
    footer: {
      role: '全栈软件工程师 · 架构师',
      bio: '在 2025 年成功出售经营了 16 年的业务。现在将同样的系统化思维应用到 AI 领域。',
      copyright: '版权所有。',
    },
  },
  en: {
    slug: 'programmatic-seo',
    altSlug: 'cheng-xu-hua-seo',
    readingTime: '37 min read',
    seo: {
      title: 'Programmatic SEO: 4,000+ Pages from an ERP | xueyifan.io',
      description: 'Case study: 4,730 static landing pages from Airtable as headless CMS with DataForSEO crawl budget optimization and Astro SSG. 2M+ impressions, 19K+ clicks.',
    },
    nav: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Programmatic SEO',
    },
    header: {
      kicker: 'Case Study — <a>Xueyifan iRepair</a>',
      kickerLink: 'https://xueyifanirepair.es',
      h1: 'Programmatic SEO: 4,700+ Pages from an ERP',
      subtitle: 'How I generated 4,730 unique landing pages with real production data, a 14-table Airtable CMS, and DataForSEO as the decision engine. 2.26M impressions, 19K+ clicks.',
      date: 'Feb 25, 2026',
    },
    intro: {
      hook: 'In Spain\'s device repair market, nobody was doing programmatic SEO. Every combination of device, brand, model, repair type, and city was an untapped long-tail opportunity.',
      body: 'The thesis: if someone searches "iPhone battery repair Seville", a dedicated page should exist — with the real price, estimated turnaround, and photos from actual repairs. But hand-building thousands of pages wouldn\'t scale. I needed a system that auto-generated them from the ERP, smart enough to decide which ones to index and which to skip.',
      context: 'Xueyifan iRepair was my device repair business in Seville since 2009. Sixteen years, over 30,000 repairs. In 2024 I decided the website needed to move beyond a Squarespace brochure and start capturing the demand already sitting in Google. I built this programmatic SEO system as a competitive moat and sold the business in September 2025, at its peak.',
      tldr: {
        heading: 'In 10 seconds',
        items: [
          'Built 4,730 static landing pages from a production ERP (real pricing, photos, verified reviews)',
          'DataForSEO-powered decision engine: only pages with real search volume get indexed',
          'Result: 2.26M impressions, 19K+ organic clicks, 80% of total site traffic',
          '7 months to build, one person, sold at peak performance',
        ],
      },
    },
    sections: {
      migration: {
        heading: 'The Starting Point',
        intro: 'The business website had been running on Squarespace for years. No URL control, no canonical tags, no custom redirects. What was coming wasn\'t just a platform change — it was a triple migration: platform (Squarespace → Astro), domain (xueyifan.me → xueyifanirepair.es), and hosting (Squarespace → Vercel/Cloudflare). The first step was documenting exactly what needed fixing: a 144-page technical audit, completed as the Final Master\'s Project for the Big SEO program.',
        duplicateCallout: 'Squarespace served the same page at 4 different URLs (www, non-www, trailing slash, .html). Google saw 4 copies of every page.',
        audit: {
          heading: 'The Technical Audit',
          prose: 'The first step was a full technical audit, completed as the Final Master\'s Project for the Big SEO program. 144 pages documenting every technical aspect of the website: from traffic baseline to the last meta description.',
          baseline: [
            { value: '23.1', label: 'Avg. position' },
            { value: '↓ Declining', label: 'SISTRIX visibility' },
            { value: '21/100', label: 'Lighthouse (mobile)' },
            { value: '33/40', label: 'Items with errors' },
          ],
          findings: [
            { title: '838 duplicate H1s', detail: 'The Squarespace template injected a hidden H1 on every page, duplicating the main heading. Google saw two titles competing for relevance.' },
            { title: '1,015 cannibalizations', detail: 'Pages competing against each other for the same keywords. Home, categories, and models were stepping on each other in search results.' },
            { title: '869 structured data errors', detail: 'The LocalBusiness schema didn\'t follow schema.org recommendations. Google couldn\'t correctly interpret the business information.' },
            { title: '831 non-canonical pages', detail: 'Squarespace served 4 URLs per page without redirecting to the canonical. GSC reported them as duplicates without canonical.' },
          ],
          callout: '33 out of 40 audited technical aspects had errors. Only 7 passed. The audit didn\'t just diagnose the problems — it became the roadmap for the entire project.',
        },
        technicalDebt: {
          heading: 'The Technical Debt',
          items: [
            { title: 'No canonical tags', detail: 'www vs non-www, with/without trailing slash, with/without .html. Same page, 4 URLs. 831 non-canonical pages in GSC. Squarespace set canonical but didn\'t redirect.' },
            { title: 'No custom redirects', detail: 'Squarespace doesn\'t allow custom 301 redirects. 266 historical URLs returning 404 in GSC. Impossible to map old URLs to the new structure.' },
            { title: 'No URL slug control', detail: 'The business taxonomy already existed, but Squarespace generated redundant URLs like /reparar-iphone/reparar-iphone-x. 15 URLs over 115 characters, 10 with uppercase, keyword repeated 3 times.' },
            { title: 'Duplicate content risk', detail: '1,015 cannibalizations detected. 79 pages with thin content. URL variants without canonicals sent confusing signals to Google, diluting the domain\'s authority.' },
          ],
        },
        migrationSteps: {
          heading: 'The Migration',
          steps: [
            { label: 'Full crawl with Screaming Frog', detail: 'The crawl identified 838 pages with multiple H1s, 266 URLs returning 404, and 1,015 cannibalizations. The mapping resulted in 1,009 redirect rules.' },
            { label: 'New URL structure in Astro', detail: 'From ~80 pages to an architecture of 480+ pages optimized for 156,000 monthly transactional searches. Clean URLs: /reparar-{device}/, /reparar-{brand}/{model}/.' },
            { label: '301 redirects in vercel.json', detail: 'Dedicated project (servidor-redirecciones) deployed on Vercel solely to serve 301s. 190KB of configuration in a single file.' },
            { label: 'Intent-based redirects', detail: 'Redirect national pages to local versions. Example: /reparar-movil/reparar-samsung → /reparar-movil/samsung/sevilla.' },
          ],
        },
        redirectServer: {
          heading: 'The Redirect Server',
          prose: 'The triple migration (platform, domain, hosting) required a plan to preserve the authority accumulated on the old domain. The solution was a dedicated Vercel project whose sole purpose was serving 301 redirects. One gotcha from the domain change: Squarespace wouldn\'t allow redirecting the homepage, which blocked GSC\'s change of address. The double hop HTTP→308→301 prevented validation. Fixed in an afternoon with Vercel Redirect Domain + Cloudflare Redirect Rules for a single direct 301.',
          metrics: [
            { value: '1,009', label: 'Redirect rules' },
            { value: '190 KB', label: 'vercel.json' },
            { value: '4', label: 'Redirect tiers' },
            { value: '46', label: 'Commits in 7 months' },
          ],
          tiers: [
            { title: 'Model → model', detail: '/reparar-movil/reparar-samsung/reparar-samsung-galaxy-a12 → /reparar-movil/samsung/galaxy-a12. Clean URL, same intent.' },
            { title: 'Brand → brand + city', detail: '/reparar-movil/reparar-realme → /reparar-movil/realme/sevilla. The new structure added the city as a local signal.' },
            { title: 'Wildcard + catch-all', detail: 'Any URL not mapped in the previous tiers redirects to the homepage. Zero 404s for users and for Google.' },
          ],
          callout: 'An entire Vercel project whose sole purpose was redirecting. 1,009 rules mapped by hand because Squarespace\'s URL structure didn\'t follow a uniform pattern.',
        },
        orderCallout: 'Implement the redirects before requesting the address change in Google Search Console. Not after. The order matters.',
        migrationCost: {
          heading: 'The Cost of Migration',
          body: 'Every migration has a transition cost. 800+ pages took time to get re-indexed and key keywords dropped temporarily — "reparar iphone sevilla" went from top 2 to position 6. This was expected: Google needs time to re-evaluate a domain after an address change. Recovery came.',
          lighthouse: [
            { value: '100', label: 'Performance' },
            { value: '92', label: 'Accessibility' },
            { value: '96', label: 'Best Practices' },
            { value: '100', label: 'SEO' },
          ],
          closing: 'From a Lighthouse score of 21 on Squarespace to 100 on Astro. From DA 8 to competing in a market where leaders have 100x more traffic. The technical audit documented 33 problems; the migration solved them all at once.',
        },
      },
      theNumbers: {
        heading: 'The Numbers',
        metrics: [
          { value: '2.26M', label: 'Impressions', detail: 'Total (measured in Google Search Console)' },
          { value: '19K+', label: 'Organic clicks', detail: 'Real traffic from organic search (measured in Google Search Console)' },
          { value: '4,730', label: 'Pages with traffic', detail: 'Out of thousands generated, 4,084 indexable in sitemap, 4,730 picked up impressions' },
          { value: '10.8x', label: 'Monthly growth', detail: 'From 202 to 2,193 clicks/month in 11 months' },
          { value: '80%', label: 'Clicks from pSEO', detail: 'Organic traffic comes from programmatic pages' },
          { value: '7', label: 'Months', detail: '1 person. CMS, pipelines, DataForSEO, 26K images, and deploy' },
        ],
        timeline: 'Built March → October 2024 (7 months). One person. CMS, generation scripts, image pipeline, DataForSEO integration, and deployment — all in parallel. Production launch October 2024. If I built it today with Claude Code, it\'d take a week.',
      },
      opportunity: {
        heading: 'The Opportunity',
        body: 'Spain\'s device repair market is hyper-local. People search by city, brand, and repair type. But most shops had generic sites — a single landing for all of Spain, if they had a site at all.',
        points: [
          'Thousands of long-tail combos with virtually zero SERP competition',
          'Clear transactional intent: the user wants a repair, not information',
          'No competitor in the sector was doing programmatic SEO in Spain (2024)',
          'The ERP already had everything: 867 models, prices, turnaround times, real photos',
          'The natural business taxonomy (device, brand, model, repair, city) maps directly to URLs',
        ],
        queryExamples: [
          { query: 'reparacion moviles sevilla', clicks: 42, impressions: 1947, ctr: '2.2%', position: '2.5' },
          { query: 'reparar iphone sevilla', clicks: 51, impressions: 3314, ctr: '1.5%', position: '12.9' },
          { query: 'reparacion iphone sevilla', clicks: 46, impressions: 4315, ctr: '1.1%', position: '5.2' },
          { query: 'cambiar bateria pixel 6a', clicks: 51, impressions: 755, ctr: '6.8%', position: '6.4' },
          { query: 'servicio tecnico garmin sevilla', clicks: 36, impressions: 534, ctr: '6.7%', position: '6.5' },
          { query: 'cambiar bateria apple watch', clicks: 37, impressions: 3967, ctr: '0.9%', position: '11.7' },
        ],
      },
      twoTypes: {
        heading: 'Two Strategies, One System',
        body: 'The project started with national ambitions, but Google had other ideas. Repair searches carry strong local intent — Google favors results close to the searcher, so pages without a city couldn\'t compete. The fix: a dual strategy. Local pages for Seville (where the physical shop sits) and national niche pages for specific repairs where location matters less.',
        local: {
          title: 'Local Pages (Seville)',
          description: 'Device + brand + repair combos with "/sevilla". Google ranks these higher thanks to proximity to the physical shop. They drive the most traffic.',
          examples: [
            { url: '/reparar-smartwatch/sevilla', clicks: 615, ctr: '3.7%' },
            { url: '/reparar-iphone/bateria/sevilla', clicks: 581, ctr: '2.5%' },
            { url: '/reparar-apple-watch/sevilla', clicks: 562, ctr: '2.7%' },
            { url: '/reparar-iphone/sevilla', clicks: 466, ctr: '0.6%' },
            { url: '/reparar-ipad/sevilla', clicks: 370, ctr: '1.2%' },
          ],
        },
        national: {
          title: 'National Pages (no city)',
          description: 'Niche repairs where location matters less. The "cambiar-{part}-{brand}-{model}" format captures informational queries that convert.',
          examples: [
            { url: '/cambiar-bateria-google-pixel-6a', clicks: 372, ctr: '5.0%' },
          ],
        },
      },
      architecture: {
        heading: 'The Architecture',
        body: 'The system has four layers. Airtable works as a headless CMS with 14 tables and ~60 fields per table. The ERP feeds real production data. DataForSEO decides what gets indexed. Astro generates static HTML with minimal client-side JavaScript — only what\'s needed for UX (search, carousel), lazy-loaded.',
        layers: [
          {
            icon: 'database',
            name: 'Airtable (Headless CMS)',
            desc: '14 tables, ~60 fields per table. 6-level hierarchy: Device Type, Brand, Family, Model, Repair + local variants. Dual pricing (original and compatible parts), image inheritance, cascading social proof.',
          },
          {
            icon: 'wrench',
            name: 'ERP (Production Data)',
            desc: 'Feeds Airtable with real data: before/after photos of actual repairs, verified customer reviews, up-to-date parts inventory. 867 models, 20+ brands, 15+ repair types.',
          },
          {
            icon: 'bar-chart',
            name: 'DataForSEO (Decision Engine)',
            desc: 'Queries real search volumes for each combination. The "indexable" field in Airtable is driven directly by this data. No volume means no index.',
          },
          {
            icon: 'zap',
            name: 'Astro (Static Generation)',
            desc: '21 page templates. Generates static HTML with minimal lazy-loaded JS. 6 JSON-LD types per page. Image SEO with EXIF injection. Deployed on Cloudflare CDN.',
          },
        ],
      },
      cmsDeepDive: {
        heading: 'Inside the CMS',
        body: 'Airtable isn\'t just a spreadsheet on steroids. Here, it runs as a full relational CMS. The key: a 6-level hierarchy that mirrors exactly how the business operates.',
        tables: [
          { name: 'Device Types', purpose: 'Root level of the taxonomy', keyFields: 'slug, name, SEO description, menu order' },
          { name: 'Brands', purpose: 'Brands linked to device types', keyFields: 'slug, name, logo, compatible types' },
          { name: 'Families', purpose: 'Model grouping (e.g., iPhone 14 series)', keyFields: 'slug, hero image (inheritable), brand' },
          { name: 'Models', purpose: 'Specific devices with pricing', keyFields: 'slug, family, image (inherits from family if empty), year' },
          { name: 'Repairs', purpose: 'Repair types per model', keyFields: 'slug, original price, compatible price, turnaround, indexable' },
          { name: 'Local Variants', purpose: 'City-specific pages for local SEO', keyFields: 'model + repair + city, adjusted price, availability' },
        ],
        highlights: [
          { title: 'Dual pricing', detail: 'Each repair has a price with original parts and a price with compatible parts. The user chooses on the landing page.' },
          { title: 'Image inheritance', detail: 'If a model has no image, it inherits from its family. Cuts maintenance without leaving pages blank.' },
          { title: 'Cascading social proof', detail: 'Reviews link at the model, family, or brand level. A review for "iPhone 14 Pro" shows up on every repair page for that model.' },
          { title: 'Bridge mode', detail: 'Discontinued repairs don\'t get deleted — they\'re flagged as "bridge" and redirect to the closest alternative. Zero 404s, zero authority loss.' },
        ],
        businessOsCallout: 'This 14-table CMS is part of a larger 12-base Airtable Business OS that ran the entire business: inventory, CRM, accounting, HR, and more. <a href="/business-os-for-airtable" class="text-primary underline underline-offset-2 hover:text-primary/80">Read the full Business OS case study →</a>',
      },
      pageAnatomy: {
        heading: 'Anatomy of a Page',
        body: 'Each of the 4,700+ pages is generated from a template, but the content is unique because it comes from the ERP. Not AI-generated text or filler copy — it\'s production data.',
        components: [
          { icon: 'list', name: 'Breadcrumb + Schema', desc: 'Hierarchical navigation reflecting the taxonomy. Generates BreadcrumbList JSON-LD automatically.' },
          { icon: 'dollar-sign', name: 'Real Pricing', desc: 'Original and compatible prices, pulled from the ERP. The user sees exactly what they\'ll pay.' },
          { icon: 'clock', name: 'Estimated Turnaround', desc: 'Based on actual historical repair data. Not a generic guess.' },
          { icon: 'camera', name: 'Before/After Photos', desc: 'Real images from completed repairs. EXIF injected with geolocation and SEO metadata.' },
          { icon: 'star', name: 'Verified Reviews', desc: 'Real customer reviews linked to the model or family. With Review and AggregateRating schema.' },
          { icon: 'code', name: '6 JSON-LD Types', desc: 'LocalBusiness, Product, Service, BreadcrumbList, FAQPage, AggregateRating. Every page has full markup.' },
        ],
        screenshot: {
          src: '/pseo/ss-repair-page-full.webp',
          alt: 'Anatomy of a programmatic repair page',
          caption: 'Real example: repair page generated from the ERP. Dual pricing, real reviews, full JSON-LD.',
        },
        storytelling: {
          heading: 'Conversion Flow per Page',
          body: 'Every page follows a conversion structure designed to take the user from discovery to action:',
          steps: [
            'Hero with dual pricing (original/compatible) + direct booking CTA',
            'Model-specific specs: camera, battery, device technologies',
            'Gallery of real before/after repair photos',
            'Verified customer reviews linked to the model or family',
            'FAQ generated from ERP data (real customer questions)',
            'Final CTA with shop map and booking button',
          ],
          example: 'A user searches "repair iPhone 14 Pro screen Seville." They land on a page with pricing (€189 original / €89 compatible), estimated turnaround (45 min), 3 real repair photos of the iPhone 14 Pro, and 12 verified reviews. No navigation needed — everything they need to decide is right there.',
        },
        dynamicCopy: {
          heading: 'Dynamic Per-Model Copy',
          body: 'Every device model gets unique microcopy generated from its real hardware specs. An Airtable field stores the technical specs (camera, battery, processor, water resistance) and a prompt generates a description that varies by model. An iPhone 14 Pro talks about its 48MP camera and ProMotion display. A Pixel 7a highlights its Tensor chip and computational photography. This isn\'t generic filler — it\'s copy that only applies to THAT model, based on real hardware data. Same template, unique content on every page.',
          screenshotCopy: {
            src: '/pseo/ss-dynamic-copy-iphone12.webp',
            alt: 'iPhone 12 dynamic copy: real hardware specs generate unique text per model',
            caption: 'iPhone 12 page: storage options, RAM, Super Retina XDR OLED display, Li-Ion 2815mAh battery. All pulled from the model\'s real specs in Airtable.',
          },
          pricingHeading: 'Live Pricing from the ERP',
          pricingProse: 'The same CMS that generates the copy also syncs repair prices in real time. Airtable bridges the ERP (where parts costs and margins get updated) and the website. Each model card shows a price range calculated from the min and max of its available repairs. When a price changes in the ERP, the site rebuilds with the updated price — zero manual intervention.',
          screenshotPricing: {
            src: '/pseo/ss-category-pricing.webp',
            alt: 'iPhone category page with price ranges synced from the ERP',
            caption: 'Category page: each card shows "Desde X € hasta Y €", auto-calculated from the ERP\'s repair prices.',
          },
          pricingSegments: [
            {
              code: `let cadenaPrecio = '';
if (mostrarPrecio.startsWith('desde') && detail.precioMinCard) {
  cadenaPrecio = \`Desde \${detail.precioMinCard}\`;
}
if (mostrarPrecio === 'desdeHasta' && detail.precioMaxCard) {
  cadenaPrecio = \`\${cadenaPrecio} hasta \${detail.precioMaxCard}\`;
}
if (mostrarPrecio === 'exacto' && detail.precioMinCard) {
  cadenaPrecio = detail.precioMaxCard
    ? \`Desde \${detail.precioMinCard} hasta \${detail.precioMaxCard}\`
    : \`\${detail.precioMinCard}\`;
}`,
              annotations: [
                { label: 'Three pricing modes', detail: '"desde" (minimum only), "desdeHasta" (full range), "exacto" (fixed price or range with CTA). The mode is configured per page type.' },
                { label: 'precioMinCard / precioMaxCard', detail: 'Calculated fields in Airtable: aggregate min and max across all available repairs for that model. When a parts cost changes in the ERP, these fields recalculate automatically.' },
              ],
            },
          ],
        },
        contextSearch: {
          heading: 'Context-Aware Search',
          body: 'The search bar isn\'t a simple text filter. It runs a custom scoring algorithm — no external libraries like Fuse.js. The user types "iphone 12 pro" and the system scores all 867 models: +20 if all words match, +30 for exact match, +10 if the model name starts with the query, and penalizes extra words in the model name. Result: the 6 most relevant models, ranked by score.',
          detail: 'The interesting part is that the search is context-aware. On the homepage it searches across all 867 models from every brand and device type. But on a brand page (e.g., Samsung), it only searches Samsung models. On a device type page (e.g., tablets), only tablets. The same component, with filter props (`filtroTipo`, `filtroMarca`), behaves differently depending on where it\'s embedded. Models lazy-load on first input focus and cache in localStorage so subsequent searches are instant.',
          codeProse: 'Here\'s the actual scoring function — 30 lines, zero dependencies:',
          codeSegments: [
            {
              code: `function calcularPuntuacion(modelo, terminosBusqueda) {
  let puntuacion = 0;
  const nombreModelo = modelo.n.toLowerCase();

  const todasPresentes = terminosBusqueda.every(t => nombreModelo.includes(t));

  if (todasPresentes) {
    puntuacion += 20;
    const palabrasModelo = nombreModelo.split(/\\s+/);
    const extras = palabrasModelo.filter(p => !terminosBusqueda.includes(p)).length;
    puntuacion -= extras * 2;

    if (nombreModelo === terminosBusqueda.join(' ')) puntuacion += 30;
    if (nombreModelo.startsWith(terminosBusqueda.join(' '))) puntuacion += 10;
  }
  return puntuacion;
}`,
              annotations: [
                { label: '+20 base', detail: 'All terms must be present. "iphone 12 pro" matches "Apple iPhone 12 Pro" but not "Apple iPhone 12".' },
                { label: '-2 per extra word', detail: 'Penalizes long names. "Apple iPhone 12 Pro Max" scores lower than "Apple iPhone 12 Pro" for the query "iphone 12 pro".' },
                { label: '+30 exact, +10 starts-with', detail: 'Exact matches dominate. 30 lines, zero dependencies, outperforming Fuse.js for this specific domain.' },
              ],
            },
          ],
        },
      },
      decisionEngine: {
        heading: 'The Decision Engine',
        body: 'The system generates thousands of pages (well beyond the 4,730 that received traffic), but not all deserve to be indexed. If nobody searches "repair front camera iPhone 11", that page shouldn\'t compete on Google — but it needs to exist for the user browsing from the iPhone 11 page who needs exactly that repair. The key is separating SEO from UX. The decision engine queries DataForSEO for real search volume on each combination, and stores the result in the "indexable" field in <a href="https://github.com/xueyifan/xueyifan-irepair/blob/main/src/lib/airtable.ts" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:text-primary/80">airtable.ts</a>.',
        rules: [
          {
            condition: 'High search volume (DataForSEO)',
            action: 'Indexable page',
            detail: 'If the keyword has significant volume, the page is generated with meta robots "index, follow", included in the sitemap, and receives priority internal linking.',
          },
          {
            condition: 'Low or zero search volume',
            action: 'Noindex page (UX only)',
            detail: 'The page exists for user experience and internal navigation, but carries meta robots "noindex" and is excluded from the sitemap.',
          },
          {
            condition: 'No service data in the ERP',
            action: 'Page not generated',
            detail: 'If there\'s no real service data (price, availability), the page doesn\'t get built. Zero thin content.',
          },
          {
            condition: 'Discontinued repair',
            action: 'Bridge redirect',
            detail: 'The page is flagged as "bridge" and returns a 301 redirect to the closest alternative. Preserves accumulated authority.',
          },
        ],
        stats: 'The system generates thousands of pages total. Of those, 4,084 made it into the sitemap as indexable. 4,730 picked up impressions from Google. The rest aren\'t indexed but still exist for the user navigating the site.',
      },
      pipeline: {
        heading: 'Build Pipeline',
        body: 'The pipeline turns CMS data into a deploy-ready static site. Fully automated. schema.ts alone spans 1,677 lines mapping the Airtable hierarchy to Astro types.',
        steps: [
          { label: 'Airtable API', desc: 'Record extraction with retry and exponential backoff' },
          { label: 'Schema Mapping', desc: '1,677 lines transforming the 6-level hierarchy into TypeScript types' },
          { label: 'Review Cache', desc: 'Reviews are cached to avoid redundant API calls' },
          { label: 'getStaticPaths', desc: 'Generates static routes from the full taxonomy' },
          { label: 'ReparacionLayout', desc: '21 page templates rendering based on taxonomy level' },
          { label: 'Astro SSG', desc: 'Static build with minimal lazy-loaded JavaScript' },
          { label: 'Optimization', desc: 'Compressed images, EXIF injection, filtered sitemap, internal linking' },
          { label: 'Cloudflare CDN', desc: 'Deployment with cache invalidation and global edge caching' },
        ],
        dataPipeline: {
          heading: 'Retry with Exponential Backoff',
          prose: 'The pipeline starts by pulling data from Airtable. Fourteen tables, thousands of records — API calls need to be resilient. One generic function handles all of it:',
          segments: [
            {
              code: `function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  retries: number = 5,
  delayTime: number = 500
): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    if (retries > 0 && (error.statusCode === 502 || error.statusCode === 503)) {
      await delay(delayTime);
      return retryWithBackoff(operation, retries - 1, delayTime * 2);
    }
    throw error;
  }
}`,
              annotations: [
                { label: 'Generic <T>', detail: 'A single function for every record type (ITipos, IMarcas, IModelos, IReparaciones...).' },
                { label: '502/503 only', detail: 'Only retries server errors (Bad Gateway, Service Unavailable). Client errors (400, 401) fail immediately.' },
                { label: 'delayTime * 2', detail: 'Exponential backoff: 500ms → 1s → 2s → 4s → 8s. 5 retries = 15.5s max before giving up.' },
              ],
            },
          ],
        },
        reviewCache: {
          heading: 'Review Cache System',
          prose: 'Reviews are the costliest calls in the build: 4,700+ pages might need them, but only 607 exist. Load them all once at build start, let every page query from memory:',
          segments: [
            {
              code: `let caches: { [key: string]: Reseña[] | undefined } = {};

async function loadReseñas(baseName: string, cacheKey: string): Promise<void> {
  if (caches[cacheKey]) return;

  const fetchOperation = () => new Promise<Reseña[]>((resolve, reject) => {
    const allRecords: Reseña[] = [];
    base(baseName)
      .select({ view: 'CMSAstro', fields: ReseñaFields })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach(record => allRecords.push(mapReseñaFields(record.fields)));
          fetchNextPage();
        },
        (err) => err ? reject(err) : resolve(allRecords)
      );
  });

  caches[cacheKey] = await retryWithBackoff(fetchOperation);
}

export async function ensureCachesLoaded(): Promise<void> {
  await Promise.all([
    loadReseñas('Reseñas sincronizar Astro', 'cachedReseñas'),
    loadReseñas('Reseñas Internas', 'cachedReseñasInternas')
  ]);
}

// Runs on module import
ensureCachesLoaded().catch(console.error);`,
              annotations: [
                { label: 'Module-level call', detail: 'ensureCachesLoaded() runs when the module is imported. In Astro SSG, all reviews load into memory before page generation begins.' },
                { label: 'Promise.all', detail: 'Both sources (Google My Business + internal surveys) load in parallel.' },
                { label: 'Trade-off: O(n) find', detail: 'Pages look up by ID with .find(). Linear scan, but with 607 reviews it eliminates hundreds of API calls. The right trade-off for a build pipeline.' },
              ],
            },
          ],
        },
      },
      contentAutomation: {
        heading: 'Automated Content Pipeline',
        body: 'Generating thousands of pages is half the job. Each one needs unique images, metadata, and copy. Eight Node.js scripts (1,411 lines total) automate all visual and textual content production — zero manual work. Everything connects back to the 12 Airtable bases in the Business OS. Result: over 26,000 auto-generated images.',
        repoLink: '<a href="https://github.com/xueyifan/xueyifan-irepair/tree/main/scripts" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:text-primary/80">Explore the pipeline scripts on GitHub →</a>',
        pipelines: [
          {
            icon: 'camera',
            name: 'Parametric Image Generation',
            desc: 'One device photo spawns 18 variants automatically — one per repair type (screen, battery, camera, charging port...) plus a generic image. Device photos are pulled from GSM Arena and composited with PNG repair overlays. 867 models × 18 variants = 15,500+ unique images, no Photoshop required.',
          },
          {
            icon: 'code',
            name: 'EXIF Injection for Local SEO',
            desc: 'Every image gets Seville GPS coordinates and an SEO description injected into its EXIF metadata. Google Images reads these for local search ranking. Automated with piexifjs and UCS-2 encoding.',
          },
          {
            icon: 'star',
            name: 'Before/After Photo Pipeline',
            desc: '10,000+ real repair photos processed automatically. Downloaded from Airtable, resized, background-blurred, composited to WebP, and the resulting URLs written back to Airtable. Bidirectional ETL: Airtable → processing → Airtable.',
          },
          {
            icon: 'zap',
            name: 'Dynamic Per-Model Copy',
            desc: 'Each device model has a field with its real hardware specs (camera, battery, processor). A prompt turns those specs into unique microcopy for each page. This isn\'t AI generating content — it\'s AI describing real hardware data. Every page reads differently because every device IS different.',
          },
        ],
        exifCode: {
          prose: 'Every repair image gets the shop\'s GPS coordinates injected into EXIF metadata. Google Images uses this data to surface images in local search results:',
          segments: [
            {
              code: `// Shop coordinates in Seville
gps[piexif.GPSIFD.GPSLatitude] = convertToDMS(37.38606);
gps[piexif.GPSIFD.GPSLatitudeRef] = 'N';
gps[piexif.GPSIFD.GPSLongitude] = convertToDMS(-5.98585);
gps[piexif.GPSIFD.GPSLongitudeRef] = 'W';

// SEO description in both EXIF fields
exifObj['0th'][piexif.ImageIFD.ImageDescription] = description;

// UCS-2 for Unicode support (Spanish accents, ñ)
const userComment = Buffer.concat([
  Buffer.from('UNICODE\\0\\0\\0', 'ascii'),
  encodeUCS2(description),
]);
exifObj['Exif'][piexif.ExifIFD.UserComment] = userComment.toString('binary');`,
              annotations: [
                { label: 'Fixed GPS', detail: 'Every repair image receives the exact shop coordinates in Seville. Google Images uses EXIF GPS for local results.' },
                { label: 'Dual description', detail: 'SEO text goes in ImageDescription (standard EXIF) and UserComment (extended EXIF). Different parsers read different fields.' },
                { label: 'UCS-2 encoding', detail: 'Spanish characters (accents, ñ) require Unicode encoding. The EXIF spec mandates UCS-2 with a UNICODE\\0\\0\\0 prefix.' },
              ],
            },
          ],
        },
        cascade: {
          heading: 'Content Cascade: One Review, Six Pages',
          body: 'The system automatically inherits content through the taxonomy. A review for "iPhone 12 screen repair" doesn\'t just appear on that page — it shows up everywhere it\'s relevant:',
          example: [
            { page: '/reparar-movil/apple/iphone-12/pantalla/sevilla', label: 'Model + repair + city' },
            { page: '/reparar-iphone/pantalla/sevilla', label: 'Device + repair + city' },
            { page: '/reparar-movil/apple/sevilla', label: 'Device + brand + city' },
            { page: '/reparar-iphone/sevilla', label: 'Device + city' },
            { page: '/reparar-movil/pantalla/sevilla', label: 'Device + repair + city' },
            { page: '/reparar-movil/sevilla', label: 'Device + city' },
          ],
          detail: 'The same logic applies to before/after photos: a photo from an iPhone 12 screen repair appears on every page in that taxonomy branch. This multiplies unique content without duplicating or generating anything artificially. Each page accumulates more social proof and visual content as the business grows.',
        },
        stats: '26,000+ auto-generated images. 867 models with 18 variants each. 10,000+ real repair photos. Zero manual intervention. The 12 Business OS bases feed the entire pipeline.',
      },
      imagePipeline: {
        heading: 'Inside the Image Pipeline',
        intro: 'The previous section describes the pipeline at a high level. Here you can see exactly how it works: the actual overlay templates, the composition code, and what happens when you run it across 867 different models.',
        overlayShowcase: {
          heading: 'The Overlay Templates',
          body: 'Each repair type has a 384×256 pixel PNG overlay. The overlay visually represents which part gets repaired: a cracked screen, a battery, a camera... 17 templates total, each designed to composite over any device photo.',
          items: [
            { src: 'pantalla.png', altEs: 'Overlay de reparación de pantalla', altEn: 'Screen repair overlay' },
            { src: 'bateria.png', altEs: 'Overlay de cambio de batería', altEn: 'Battery replacement overlay' },
            { src: 'camara-trasera.png', altEs: 'Overlay de cámara trasera', altEn: 'Rear camera overlay' },
            { src: 'puerto-carga.png', altEs: 'Overlay de puerto de carga', altEn: 'Charging port overlay' },
            { src: 'tapa-trasera.png', altEs: 'Overlay de tapa trasera', altEn: 'Back cover overlay' },
            { src: 'cristal.png', altEs: 'Overlay de cambio de cristal', altEn: 'Glass replacement overlay' },
          ],
        },
        compositionProcess: {
          heading: 'The Composition Process',
          body: 'Each repair image is generated in 6 steps, fully automated with a Node.js script and Sharp.js:',
          steps: [
            { label: 'Download device photo', detail: 'The official device photo is pulled from GSM Arena and stored temporarily.' },
            { label: 'Create 384×256 white canvas', detail: 'Sharp.js creates a blank base image at 384×256 pixels with an alpha channel.' },
            { label: 'Overlay the repair PNG', detail: 'The repair template (screen, battery, etc.) is composited as the first layer on the canvas.' },
            { label: 'Center device at x=96', detail: 'The device photo is proportionally resized and centered at x=96, leaving room for the overlay on the right.' },
            { label: 'Export to WebP', detail: 'The result is exported as optimized WebP. Each image weighs ~5-8 KB.' },
            { label: 'Repeat ×17 repairs + hero', detail: 'The process repeats for all 17 repair types plus a generic hero image at 256×256. Total: 18 images per model.' },
          ],
        },
        codeSnippet: {
          heading: 'The Actual Code',
          body: 'This is the real snippet from <a href="https://github.com/xueyifan/xueyifan-irepair/blob/main/scripts/generarImagenesReparacionesModelos.mjs" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:text-primary/80">generarImagenesReparacionesModelos.mjs</a> that generates each repair image:',
          segments: [
            {
              code: `await sharp({
  create: {
    width: 384, height: 256,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  }
})
  .png()
  .composite([
    { input: overlayPath },
    { input: devicePhoto,
      top: Math.round(top),
      left: Math.round(left) }
  ])
  .webp()
  .toFile(outputPath)`,
              annotations: [
                { label: 'Canvas', detail: 'Creates a blank 384×256 image with a white background and alpha channel. This is the canvas everything composites onto.' },
                { label: 'Composition order', detail: 'Overlay first (repair template), then the device photo. Order matters: the overlay sits behind the device.' },
                { label: 'Positioning', detail: 'The device photo is vertically centered and positioned at x≈96. This leaves visual room for the repair overlay to be visible on the right.' },
              ],
            },
          ],
        },
        onePhotoDemo: {
          heading: '1 Photo → 18 Variants',
          body: 'From a single iPhone 14 Pro photo, the pipeline automatically generates 18 unique images: one generic hero and 17 repair variants. Each variant composites the device photo with a specific overlay.',
          hero: {
            src: '/pseo/demo/apple-iphone-14-pro/reparar-apple-iphone-14-pro.webp',
            alt: 'iPhone 14 Pro — auto-generated generic hero image',
            caption: 'Hero image: the iPhone 14 Pro photo centered on a 256×256 canvas, no overlay.',
          },
          variants: [
            { src: 'cambiar-pantalla-apple-iphone-14-pro.webp', altEs: 'Cambiar pantalla iPhone 14 Pro', altEn: 'iPhone 14 Pro screen replacement' },
            { src: 'cambiar-bateria-apple-iphone-14-pro.webp', altEs: 'Cambiar batería iPhone 14 Pro', altEn: 'iPhone 14 Pro battery replacement' },
            { src: 'cambiar-camara-trasera-apple-iphone-14-pro.webp', altEs: 'Cambiar cámara trasera iPhone 14 Pro', altEn: 'iPhone 14 Pro rear camera replacement' },
            { src: 'cambiar-puerto-carga-apple-iphone-14-pro.webp', altEs: 'Cambiar puerto de carga iPhone 14 Pro', altEn: 'iPhone 14 Pro charging port replacement' },
            { src: 'cambiar-tapa-trasera-apple-iphone-14-pro.webp', altEs: 'Cambiar tapa trasera iPhone 14 Pro', altEn: 'iPhone 14 Pro back cover replacement' },
            { src: 'cambiar-cristal-apple-iphone-14-pro.webp', altEs: 'Cambiar cristal iPhone 14 Pro', altEn: 'iPhone 14 Pro glass replacement' },
            { src: 'cambiar-altavoz-apple-iphone-14-pro.webp', altEs: 'Cambiar altavoz iPhone 14 Pro', altEn: 'iPhone 14 Pro speaker replacement' },
            { src: 'cambiar-microfono-apple-iphone-14-pro.webp', altEs: 'Cambiar micrófono iPhone 14 Pro', altEn: 'iPhone 14 Pro microphone replacement' },
            { src: 'cambiar-auricular-apple-iphone-14-pro.webp', altEs: 'Cambiar auricular iPhone 14 Pro', altEn: 'iPhone 14 Pro earpiece replacement' },
          ],
          caption: {
            es: '9 de las 17 variantes generadas automáticamente para el iPhone 14 Pro. Cada imagen combina la foto real del dispositivo con un overlay de reparación específico.',
            en: '9 of the 17 auto-generated variants for the iPhone 14 Pro. Each image composites the real device photo with a specific repair overlay.',
          },
        },
        crossDeviceDemo: {
          heading: 'Same Pipeline, Different Device',
          body: 'The same process applies to any device. The photo changes, the overlays stay the same. That\'s what makes it possible to scale to 867 models with zero manual work.',
          heroes: [
            { src: '/pseo/demo/apple-iphone-14-pro/reparar-apple-iphone-14-pro.webp', alt: 'iPhone 14 Pro — hero' },
            { src: '/pseo/demo/samsung-galaxy-s23-ultra/reparar-samsung-galaxy-s23-ultra.webp', alt: 'Samsung Galaxy S23 Ultra — hero' },
            { src: '/pseo/demo/reparar-xiaomi-12.webp', alt: 'Xiaomi 12 — hero' },
          ],
          comparison: [
            { src: '/pseo/demo/apple-iphone-14-pro/cambiar-pantalla-apple-iphone-14-pro.webp', alt: 'iPhone 14 Pro screen replacement' },
            { src: '/pseo/demo/samsung-galaxy-s23-ultra/cambiar-pantalla-samsung-galaxy-s23-ultra.webp', alt: 'Samsung Galaxy S23 Ultra screen replacement' },
          ],
          comparisonCaption: {
            es: 'Mismo overlay de "cambiar pantalla", diferente dispositivo. La plantilla es idéntica — lo que cambia es la foto del modelo.',
            en: 'Same "screen replacement" overlay, different device. The template is identical — what changes is the model photo.',
          },
        },
        scale: {
          heading: 'The Scale',
          metrics: [
            { value: '867', label: 'Models', detail: 'Unique devices with generated images' },
            { value: '17', label: 'Overlays', detail: 'Repair templates (screen, battery, camera...)' },
            { value: '18', label: 'Imgs/model', detail: '17 repairs + 1 hero per device' },
            { value: '15,606', label: 'Composites', detail: 'Total auto-generated images' },
          ],
        },
      },
      reviewsPipeline: {
        heading: 'Reviews Pipeline',
        intro: 'Reviews are the most powerful social proof on every page. But managing hundreds of customer profiles, syncing two sources, and cascading trust signals across the entire taxonomy requires its own pipeline.',
        sourceSync: {
          heading: 'Source & Sync',
          body: 'Reviews come from two sources: Google My Business (publicly verified) and internal post-repair surveys. Both sync to Airtable and normalize into a single format.',
          table: {
            headers: ['Table', 'Source', 'Key fields'],
            rows: [
              ['Reseñas sincronizar Astro', 'Google My Business', 'quote, name, rating, imageUrl, response'],
              ['Reseñas Internas', 'Post-repair surveys', 'quote, name, rating, imageUrl, linked model'],
            ],
          },
        },
        imageProcessing: {
          heading: 'Profile Photo Processing',
          body: 'Every review with a profile photo goes through an automated processing pipeline:',
          steps: [
            { label: 'Download photo from Airtable', detail: 'The profile photo URL is downloaded from the Airtable attachment field.' },
            { label: 'Convert to WebP quality 95', detail: 'Sharp.js converts the image to WebP at quality 95 to preserve facial detail.' },
            { label: 'Save to /bg/res/', detail: 'The file is saved with a semantic name: reparacion-{type}-{model}-{name}-{date}.webp' },
            { label: 'Write URL back to Airtable', detail: 'The resulting URL is written back to the corresponding field. Bidirectional ETL.' },
          ],
        },
        codeSnippet: {
          heading: 'The Actual Code',
          body: 'This is the real snippet from `generarImagenesReseñas.mjs` that processes each profile photo:',
          segments: [
            {
              code: `const imageBuffer = await fetch(attachmentUrl)
  .then(r => r.arrayBuffer())

await sharp(Buffer.from(imageBuffer))
  .webp({ quality: 95 })
  .toFile(outputPath)

// Write processed URL back to Airtable
await base('Reseñas sincronizar Astro')
  .update(record.id, {
    'imagen_procesada': outputUrl
  })`,
              annotations: [
                { label: 'Dimension preservation', detail: 'No resizing — profile photos keep their original dimensions for maximum quality in the carousel.' },
                { label: 'WebP quality 95', detail: 'Higher quality than repair photos (85) because profile photos are smaller and detail matters more.' },
                { label: 'Bidirectional ETL', detail: 'Airtable is both source AND destination: the photo is downloaded, processed, and the resulting URL is written back to the record.' },
              ],
            },
          ],
        },
        cascade: {
          heading: 'Social Proof Cascade',
          body: 'Reviews don\'t just appear on one page — they inherit across the entire taxonomy. A review linked to a model propagates to every page where that model is relevant.',
          points: [
            '"iPhone 14 Pro" review → appears on every repair page for that model, in every city',
            '"iPhone 14" family review → appears on all models in the family (14, 14 Plus, 14 Pro, 14 Pro Max)',
            '"Apple" brand review → appears on aggregated brand pages like /reparar-movil/apple/sevilla',
            'The cascade is automatic: link the review to the right level and the build distributes it',
          ],
        },
        profileDemo: {
          heading: 'Hundreds of Profiles Processed',
          body: 'Real customer profiles processed by the pipeline. Each photo was downloaded, converted to WebP, and linked back to Airtable.',
          items: [
            { src: 'victor.webp', altEs: 'Víctor — reparación de pantalla Samsung Galaxy A70', altEn: 'Victor — Samsung Galaxy A70 screen repair' },
            { src: 'sarah.webp', altEs: 'Sarah — reparación de auricular iPhone 11', altEn: 'Sarah — iPhone 11 earpiece repair' },
            { src: 'cristina.webp', altEs: 'Cristina — reparación de auricular iPhone 12', altEn: 'Cristina — iPhone 12 earpiece repair' },
            { src: 'ricardo.webp', altEs: 'Ricardo — cambio de batería Google Pixel 4', altEn: 'Ricardo — Google Pixel 4 battery replacement' },
            { src: 'manolo.webp', altEs: 'Manolo — reparación de batería iPhone 11 Pro Max', altEn: 'Manolo — iPhone 11 Pro Max battery repair' },
            { src: 'fernando.webp', altEs: 'Fernando — reparación de táctil iPad 5', altEn: 'Fernando — iPad 5 touch repair' },
            { src: 'susana.webp', altEs: 'Susana — reparación de pantalla iPhone XS', altEn: 'Susana — iPhone XS screen repair' },
            { src: 'teresa.webp', altEs: 'Teresa — reparación de pantalla iPhone 8 Plus', altEn: 'Teresa — iPhone 8 Plus screen repair' },
            { src: 'luisa.webp', altEs: 'Luisa — reparación de batería iPhone 6 Plus', altEn: 'Luisa — iPhone 6 Plus battery repair' },
          ],
          caption: {
            es: 'Perfiles reales de clientes. Cada foto se descarga, convierte a WebP y vincula de vuelta a Airtable.',
            en: 'Real customer profiles. Each photo is downloaded, converted to WebP, and linked back to Airtable.',
          },
        },
        carouselCro: {
          heading: 'Rendering: CRO Carousel',
          body: 'In production, reviews render in a carousel with 9-second auto-rotation, a visual progress bar, and dot navigation. The top 20 reviews are visible directly; the rest expand under a "Show more" button. All server-rendered — zero JavaScript for the base carousel.',
          callout: 'Automatic filter: only reviews with ≥5★ and a written comment appear first. Reviews without text or below 5 stars fall below the fold.',
        },
        scale: {
          heading: 'The Scale',
          metrics: [
            { value: '600+', label: 'Profiles processed', detail: 'Profile photos converted to WebP' },
            { value: '2', label: 'Sources', detail: 'Google My Business + internal surveys' },
            { value: '9s', label: 'Rotation', detail: 'CRO carousel auto-rotation interval' },
            { value: '≥5★', label: 'Priority', detail: '5-star reviews with comments shown first' },
          ],
        },
      },
      repairedDevicesPipeline: {
        heading: 'Before/After Pipeline',
        intro: 'Every completed repair generates photographic evidence: 4 photos documenting the device\'s state before and after. This pipeline processes those photos automatically and distributes them across the site.',
        captureProtocol: {
          heading: 'Capture Protocol',
          body: 'Every completed repair at the shop follows a 4-photo protocol:',
          steps: [
            { label: 'Front before', detail: 'Front-facing photo of the device before repair. Shows visible damage (cracked screen, marks, etc.).' },
            { label: 'Front after', detail: 'Front-facing photo after repair. Same angle for direct comparison.' },
            { label: 'Back before', detail: 'Back photo before repair. Documents the device\'s overall condition.' },
            { label: 'Back after', detail: 'Back photo after repair. Completes the visual documentation.' },
          ],
          privacyNote: 'The `difuminar` flag in Airtable marks photos that need blurring: screens showing notifications, personal data, etc. Blur is applied automatically in the pipeline.',
        },
        imageProcessing: {
          heading: 'Automated Processing',
          body: 'Each photo goes through 6 processing steps with Sharp.js:',
          steps: [
            { label: 'Download from Airtable', detail: 'The original photo is downloaded from the repair record\'s attachment field.' },
            { label: 'Resize to 1/4 resolution', detail: 'The image is scaled to 25% of its original size. Enough for web, cuts file size dramatically.' },
            { label: 'Conditional blur (sigma 8)', detail: 'If the `difuminar` flag is set, a Gaussian blur at sigma 8 is applied. Protects personal data visible on screen.' },
            { label: 'Semi-transparent white overlay', detail: 'A 30% white layer is composited over the background for consistent contrast and a clean look.' },
            { label: 'Export to WebP quality 85', detail: 'Quality 85 — lower than profile photos (95) because at 1/4 resolution the extra detail isn\'t noticeable.' },
            { label: 'Write slug back', detail: 'The processed filename is written back to Airtable so the Astro build can find it.' },
          ],
        },
        codeSnippet: {
          heading: 'The Actual Code',
          body: 'This is the real snippet from <a href="https://github.com/xueyifan/xueyifan-irepair/blob/main/scripts/CasosExito.mjs" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:text-primary/80">CasosExito.mjs</a> that processes each repair photo:',
          segments: [
            {
              code: `let pipeline = sharp(inputBuffer)
  .resize({
    width: Math.round(metadata.width / 4),
    height: Math.round(metadata.height / 4)
  })

if (record.fields.difuminar) {
  pipeline = pipeline.blur(8)
}

await pipeline
  .composite([{
    input: whiteOverlay,
    blend: 'over'
  }])
  .webp({ quality: 85 })
  .toFile(outputPath)`,
              annotations: [
                { label: 'Resize 1/4', detail: 'Scales to one quarter. A 4032×3024 photo becomes 1008×756 — perfect for web, drops file size from ~3MB to ~30KB.' },
                { label: 'Conditional blur', detail: 'Only applied when the `difuminar` field is set in Airtable. Sigma 8 blurs notifications and personal data visible on screen.' },
                { label: 'Quality 85 vs 95', detail: 'Lower quality than profile photos because at 1/4 resolution the extra detail doesn\'t add value. Saves ~40% file size per image.' },
              ],
            },
          ],
        },
        demo: {
          heading: 'Real Result: iPhone 14 Pro',
          body: 'These are real photos processed by the pipeline. Front and back, before and after repair.',
          frontal: [
            { src: '/pseo/before-after/iphone-14-pro-front-before.webp', alt: 'iPhone 14 Pro front — before repair' },
            { src: '/pseo/before-after/iphone-14-pro-front-after.webp', alt: 'iPhone 14 Pro front — after repair' },
          ],
          frontalCaption: 'iPhone 14 Pro — front before and after',
          trasera: [
            { src: '/pseo/before-after/iphone-14-pro-back-before.webp', alt: 'iPhone 14 Pro back — before repair' },
            { src: '/pseo/before-after/iphone-14-pro-back-after.webp', alt: 'iPhone 14 Pro back — after repair' },
          ],
          traseraCaption: 'iPhone 14 Pro — back before and after',
        },
        crossDeviceDemo: {
          heading: 'Same Pipeline, Different Brands',
          body: 'The pipeline works the same for any brand and model. Here it is applied to a Samsung Galaxy A51 and a Xiaomi Redmi Note 9S.',
          samsung: [
            { src: '/pseo/before-after/samsung-a51-before.webp', alt: 'Samsung Galaxy A51 — before repair' },
            { src: '/pseo/before-after/samsung-a51-after.webp', alt: 'Samsung Galaxy A51 — after repair' },
          ],
          samsungCaption: 'Samsung Galaxy A51 — before and after',
          xiaomi: [
            { src: '/pseo/before-after/xiaomi-note9s-before.webp', alt: 'Xiaomi Redmi Note 9S — before repair' },
            { src: '/pseo/before-after/xiaomi-note9s-after.webp', alt: 'Xiaomi Redmi Note 9S — after repair' },
          ],
          xiaomiCaption: 'Xiaomi Redmi Note 9S — before and after',
          caption: {
            es: 'Mismo pipeline de procesamiento para cualquier marca. Las fotos se descargan, redimensionan, difuminan si es necesario y exportan a WebP automáticamente.',
            en: 'Same processing pipeline for any brand. Photos are downloaded, resized, blurred if needed, and exported to WebP automatically.',
          },
        },
        naming: {
          heading: 'Naming Convention',
          body: 'Each photo follows a strict naming convention that lets the Astro build find them automatically:',
          pattern: '{date}-reparacion-{brand}-{model}-{orderId}-{1|2|3|4}.webp',
          suffixes: [
            { title: 'Suffix -1', detail: 'Front before repair' },
            { title: 'Suffix -2', detail: 'Front after repair' },
            { title: 'Suffix -3', detail: 'Back before repair' },
            { title: 'Suffix -4', detail: 'Back after repair' },
          ],
        },
        scale: {
          heading: 'The Scale',
          metrics: [
            { value: '10,342', label: 'Photos processed', detail: 'Real repair photos converted to WebP' },
            { value: '4', label: 'Angles', detail: 'Front before/after + back before/after' },
            { value: '1/4', label: 'Resolution', detail: 'Resized to 25% of original for web' },
            { value: 'Q85', label: 'WebP quality', detail: 'Optimized quality for repair photos' },
          ],
        },
      },
      growth: {
        heading: 'Growth Curve',
        body: 'Launched in October 2024. The first months were pure indexation momentum. After an initial peak in January, traffic flatlined from February through June — and it wasn\'t seasonality. It was a restructuring: the original version generated both national and local pages for every combination, but there were too many and Google clearly favored local intent. I redirected national pages to their local /sevilla equivalents, keeping only niche repairs in national format (like /cambiar-bateria-iphone-11) where specificity outweighs the lack of localization. While Google re-indexed the new structure, traffic stayed flat. Once consolidated, growth took off again — peaking in September 2025 at 2,193 clicks.',
        monthly: [
          { month: 'Oct 2024', clicks: 202, impressions: 16420, note: 'Launch' },
          { month: 'Nov 2024', clicks: 748, impressions: 69054 },
          { month: 'Dec 2024', clicks: 949, impressions: 77387 },
          { month: 'Jan 2025', clicks: 1277, impressions: 110836 },
          { month: 'Feb 2025', clicks: 935, impressions: 100558, note: 'National → local restructure' },
          { month: 'Mar 2025', clicks: 1191, impressions: 118826 },
          { month: 'Apr 2025', clicks: 1027, impressions: 106744 },
          { month: 'May 2025', clicks: 936, impressions: 97137 },
          { month: 'Jun 2025', clicks: 996, impressions: 121088 },
          { month: 'Jul 2025', clicks: 1611, impressions: 150927, note: 'Post-restructure' },
          { month: 'Aug 2025', clicks: 1789, impressions: 164791 },
          { month: 'Sep 2025', clicks: 2193, impressions: 164440, note: 'Peak · Business sold' },
        ],
        insight: 'From 202 to 2,193 clicks/month in 11 months. The Feb–Jun plateau coincides with the national-to-local URL restructuring — Google needed time to re-index the new architecture. Once consolidated, traffic jumped 62% in a single month (Jun → Jul). The system keeps running under the new owner.',
        milestones: {
          heading: 'Google Search Console Milestones',
          body: 'Google celebrates traffic milestones with badges. In 3 months we went from 1.2K to 2K monthly clicks — the last badge arrived right as we closed the business sale.',
          items: [
            { src: '/pseo/gsc-1.2k.webp', label: '1.2K clicks', date: 'Jul 18, 2025' },
            { src: '/pseo/gsc-1.5k.webp', label: '1.5K clicks', date: 'Aug 3, 2025' },
            { src: '/pseo/gsc-1.8k.webp', label: '1.8K clicks', date: 'Sep 11, 2025' },
            { src: '/pseo/gsc-2k.webp', label: '2K clicks', date: 'Sep 22, 2025' },
          ],
        },
      },
      results: {
        heading: 'Results',
        body: 'Cumulative metrics since launch (October 2024 through February 2026), directly from Google Search Console:',
        metrics: [
          { value: '19,388', label: 'Organic clicks', detail: '17 months of operation, Oct 2024 → Feb 2026' },
          { value: '1.17%', label: 'Average CTR', detail: 'Across 2.26M total impressions' },
          { value: '4,084', label: 'URLs in sitemap', detail: 'Only those that pass the DataForSEO decision engine' },
          { value: '<1s', label: 'Page load time', detail: 'Astro SSG with minimal lazy JS + Cloudflare CDN' },
        ],
        transition: 'But these results didn\'t come from nowhere. The starting point was a Squarespace website with technical problems that needed solving before the programmatic system could be built.',
      },
      crawlBudget: {
        heading: 'Crawl Budget Optimization',
        body: 'With 4,700+ pages, managing crawl budget is critical — per Google Search Central\'s crawl budget documentation. Google shouldn\'t waste time crawling pages that won\'t rank. The 700+ robots.txt rules add to the 1,009 redirects inherited from the migration.',
        strategies: [
          {
            title: 'Selective noindex with DataForSEO',
            detail: 'The "indexable" field in Airtable is fed directly from DataForSEO volume data. Pages without search volume get noindex. Not an arbitrary call — it\'s data-driven.',
          },
          {
            title: 'Filtered sitemap (4,084 URLs)',
            detail: 'The sitemap.xml only includes indexable URLs. Out of 4,730 pages with impressions, just 4,084 made it into the sitemap. Google doesn\'t discover the rest through this channel.',
          },
          {
            title: 'URL structure with 6 patterns',
            detail: 'Each taxonomy level has a predictable URL pattern. Google understands the hierarchy without needing to guess.',
          },
          {
            title: 'Contextual internal linking',
            detail: 'Indexable pages receive more internal links. City pages link to available repairs, models link to their repairs, and families aggregate their models.',
          },
          {
            title: 'Bridge redirects for discontinued items',
            detail: 'Instead of returning a 404 when a repair is discontinued, it 301-redirects to the closest alternative. 700+ redirect rules in <a href="https://github.com/xueyifan/xueyifan-irepair/blob/main/vercel.json#L27" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:text-primary/80">vercel.json</a>. Zero authority loss, zero broken links.',
          },
        ],
        safeNoindex: {
          heading: '"Safe Noindex" Pattern',
          prose: 'Accidental noindex is one of SEO\'s costliest mistakes — one line can deindex thousands of pages. Here\'s how we prevented it:',
          segments: [
            {
              code: `{NOINDEXCUIDADO &&
  NOINDEXCUIDADO === 'Estoy absolutamente seguro que no quiero hacer no index por eso pongo esta cadena' && (
    <meta name="robots" content="noindex" />
  )}`,
              annotations: [
                { label: 'String, not boolean', detail: 'A boolean can be true by accident (wrong field, default value, migration error). An 80-character Spanish string requires deliberate intent.' },
                { label: 'Double guard', detail: 'The prop must be truthy AND match the exact string. Even if set to "true" or 1, the noindex tag won\'t render.' },
              ],
            },
          ],
          callout: 'Two years in production. Zero accidental deindexing events. The 80-character Spanish string did its job.',
        },
      },
      urlTaxonomy: {
        heading: 'URL Taxonomy',
        body: 'The site uses 6 URL patterns, each corresponding to a level in the business taxonomy. Local patterns (with /sevilla) capture local intent. National patterns (no city) capture niche searches.',
        patterns: [
          { pattern: '/reparar-{device}/{city}', example: '/reparar-smartwatch/sevilla', description: 'Generic device + city. The broadest entry point into the local funnel.' },
          { pattern: '/reparar-{device}/{brand}/{city}', example: '/reparar-movil/samsung/sevilla', description: 'Device + brand + city. More specific, better CTR.' },
          { pattern: '/reparar-{device}/{repair-type}/{city}', example: '/reparar-iphone/bateria/sevilla', description: 'Device + repair type + city. High transactional intent.' },
          { pattern: '/reparar-{device}/{brand}/{repair-type}/{city}', example: '/reparar-movil/samsung/pantalla/sevilla', description: 'Full local combination. The most specific funnel entry.' },
          { pattern: '/reparar-{device}/{model}/{repair-type}', example: '/reparar-apple-watch/se/bateria', description: 'Specific model + repair, no city. For national niche searches.' },
          { pattern: '/cambiar-{repair}-{brand}-{model}', example: '/cambiar-bateria-google-pixel-6a', description: 'Direct national format. Captures queries like "change pixel 6a battery" with high CTR (5%).' },
        ],
        appleRoutes: {
          heading: 'Premium Apple Routes',
          prose: 'We started in 2009 repairing exclusively Apple devices — people knew us for it. Apple has the highest search volume, and shorter routes reflect that priority: /iphone/14-pro instead of /reparar-movil/apple/iphone-14-pro. Shorter, cleaner, better CTR. A single boolean changes everything:',
          segments: [
            {
              code: `// Apple: /iphone/14-pro (short, clean, better CTR)
const records = await getRecordsModelos(true);  // modoApple = true → CMSAstro(Apple) view
return records.map(r => ({
  params: { paramMarcaApple: r.paramMarca, paramModeloApple: r.paramModelo },
}));

// Generic: /reparar-movil/samsung/galaxy-s21
const records = await getRecordsModelos();  // modoApple = false → CMSAstro view
return records.map(r => ({
  params: { paramTipo: r.paramTipo, paramMarca: r.paramMarca, paramModelo: r.paramModelo },
}));`,
              annotations: [
                { label: 'modoApple = true', detail: 'A single boolean switches the Airtable view (CMSAstro vs CMSAstro(Apple)) and the URL structure. Same page, same layout, two routing systems.' },
                { label: 'Shorter routes', detail: '/iphone/14-pro vs /reparar-movil/apple/iphone-14-pro. Apple is the dominant brand in repairs; its routes deserve premium URLs.' },
              ],
            },
          ],
        },
      },
      stack: {
        heading: 'Stack & Tools',
        body: 'The stack was chosen for a specific need: generating thousands of static pages from a relational CMS, with minimal client-side JavaScript. Astro was the obvious pick for pure SSG. Airtable worked as CMS because it was already the business\'s Business OS — migrating to Supabase for a static site made no sense. DataForSEO was chosen for price and Spanish keyword coverage.',
        items: [
          { name: 'Astro', role: 'SSG, 21 templates, minimal lazy JS' },
          { name: 'Airtable', role: 'Headless CMS, 14 tables, ~60 fields/table' },
          { name: 'DataForSEO', role: 'Search volumes, "indexable" field' },
          { name: 'Custom ERP', role: '867 models, prices, stock, photos, reviews' },
          { name: 'Cloudflare', role: 'CDN, edge caching, deployment' },
          { name: 'TypeScript', role: '1,677-line schema.ts for the mapping' },
          { name: 'JSON-LD', role: '6 types of structured data per page' },
        ],
      },
      lessons: {
        heading: 'Lessons Learned',
        items: [
          {
            title: 'Google decides user intent, not you.',
            detail: 'I started out wanting to rank nationwide. Google had other plans — it read repair searches as strongly local intent. Pages without a city got crushed by Seville-specific ones. The lesson: build the full infrastructure, but let GSC data tell you where to double down.',
          },
          {
            title: 'The decision engine matters more than the generator.',
            detail: 'Generating 10,000 pages is trivial. Deciding which ones to index based on real DataForSEO data — that\'s what separates pSEO with results from a thin content farm. Out of all possible combos, only 4,084 made it into the sitemap.',
          },
          {
            title: 'The ERP is the moat, not the template.',
            detail: 'Anyone can spin up pages with AI. Nobody can generate real before/after photos, verified reviews, dual pricing (original and compatible), and turnaround times from historical data without an integrated ERP. Unique content doesn\'t come from copy — it comes from data.',
          },
          {
            title: 'Airtable scales better than expected.',
            detail: '14 tables, ~60 fields per table, 6-level hierarchy. With retry and exponential backoff on the API, the build stays stable. The trick: cache reviews and skip redundant calls. For a one-person team, Airtable as a headless CMS just works.',
          },
          {
            title: 'National niche URLs deliver the best CTR.',
            detail: 'The /cambiar-bateria-google-pixel-6a format pulls a 5.0% CTR at an average position of 7.8. These queries are so specific they\'ve got almost zero competition. Individual volume is low, but multiplied across hundreds of models, it adds up fast.',
          },
          {
            title: 'Generated content without production data is thin content with better grammar.',
            detail: 'The difference between pSEO that works and a content farm isn\'t the template or the AI — it\'s whether the data is real. ERP pricing, actual repair photos, verified reviews. This pattern applies to any business with operational data: e-commerce, marketplaces, catalog-driven SaaS.',
          },
          {
            title: 'Your business taxonomy IS your information architecture — don\'t invent it, map it.',
            detail: 'I didn\'t design the URL structure from scratch. I mapped the hierarchy that already existed in the business: type → brand → model → repair → city. The Business OS already had that taxonomy in Airtable. The programmatic site simply exposed it to the world. If your company already has an internal ontology, use it.',
          },
        ],
      },
      whatThisDemonstrates: {
        heading: 'What This Demonstrates',
        items: [
          { title: 'End-to-end system design', detail: 'From ERP data to production pages — relational CMS, build pipeline, decision engine, crawl budget optimization.' },
          { title: 'Automation that scales without intervention', detail: 'One person, 4,730 pages, 26,000+ images. The system kept running after the business was sold.' },
          { title: 'Data-driven decisions, not gut feelings', detail: 'DataForSEO as the indexing engine. Google Search Console as the feedback loop. Every decision backed by real metrics.' },
          { title: 'Full execution in a real business context', detail: 'This isn\'t a portfolio project or a tutorial. It\'s a production system that drove real traffic for a real business — and contributed to its sale.' },
        ],
      },
    },
    cta: {
      heading: 'I design systems that turn operational data into competitive advantages.',
      body: 'This case study demonstrates a pattern I\'ve applied repeatedly: map the business ontology, build a data-to-deploy pipeline, and measure everything with real metrics. Currently exploring AI Product Manager and Solutions Architect roles — if your team needs someone who thinks in systems and ships to production, let\'s talk.',
      label: 'Get in touch',
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          q: 'Isn\'t programmatic SEO just spam?',
          a: 'Only if the pages don\'t add value. Here, every page has real service data: current pricing (original and compatible parts), turnaround based on historical data, before/after photos from actual repairs, and verified customer reviews. This isn\'t AI-generated filler — it\'s production data from the ERP.',
        },
        {
          q: 'Does it only work in Seville?',
          a: 'The local pages focus on Seville because that\'s where the physical store is, and Google prioritizes results with geographic proximity for repair searches. The national pages (format /cambiar-{part}-{brand}-{model}) work without geographic restrictions and capture niche searches throughout Spain.',
        },
        {
          q: 'Why didn\'t you use AI to generate the content?',
          a: 'Because the competitive differentiator is that the data is real. Prices come from the ERP, photos are from actual repairs, and reviews are from verified customers. An AI-generated page might sound good, but it doesn\'t have production data. The blog did use AI for copywriting, combined with NotebookLM for each article\'s podcast.',
        },
        {
          q: 'Does Airtable scale with 4,700+ pages?',
          a: 'Yes, with nuances. The 14 tables and ~60 fields per table work well with a build pipeline (not real-time queries). The key is retry with exponential backoff on the API and caching frequent data like reviews. For larger-scale live queries, alternatives like Supabase should be evaluated.',
        },
        {
          q: 'How are the pages kept up to date?',
          a: 'When a price changes or a model is added in the ERP, the data is updated in Airtable. The next build regenerates the affected pages. New reviews automatically propagate through the family-model cascade. There is no manual intervention for content.',
        },
        {
          q: 'Why Astro and not Next.js?',
          a: 'For a 100% static site where content changes infrequently, Astro generates pure HTML with minimal JavaScript — only interactive components like the search bar and carousel, loaded lazily. Pages load in under 1 second, Core Web Vitals are excellent natively, and deployment on Cloudflare CDN is trivial.',
        },
        {
          q: 'What exactly does DataForSEO do?',
          a: 'DataForSEO provides the actual search volume for each keyword. The result is stored in Airtable\'s "indexable" field. If a device + repair + city combination has no search volume, the page is generated but carries a noindex tag. It\'s the decision engine that prevents diluting domain authority with pages Google would ignore.',
        },
      ],
    },
    resources: {
      heading: 'Resources',
      items: [
        { label: 'Source code on GitHub (scripts, layouts, routes)', url: 'https://github.com/xueyifan/xueyifan-irepair' },
        { label: 'Xueyifan iRepair (the programmatic site)', url: 'https://xueyifanirepair.es' },
        { label: 'Case Study: Business OS / ERP feeding these pages', url: '/business-os-para-airtable' },
        { label: 'Astro, the static site framework', url: 'https://astro.build' },
        { label: 'DataForSEO, SEO data API', url: 'https://dataforseo.com' },
        { label: 'Airtable, data platform and CMS', url: 'https://airtable.com' },
      ],
    },
    footer: {
      role: 'Software Engineer · Architect',
      bio: 'Built and sold a 16-year business in 2025. Now applying the same systems thinking to enterprise AI.',
      fellowAt: 'Teaching Fellow at',
      fellowLink: 'AI Product Academy',
      copyright: 'All rights reserved.',
    },
  },
} as const
