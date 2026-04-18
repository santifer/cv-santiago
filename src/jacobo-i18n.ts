export const jacoboContent = {
    zh: {
      slug: 'agente-ia-jacobo',
      altSlug: 'ai-agent-jacobo',
      readingTime: '35 分钟阅读',
      seo: {
        title: 'Jacobo：结合工具调用和语音 AI 的多代理系统 · 生产环境案例研究 | xueyifan.io',
        description: '案例研究：FDE 如何构建一个包含子代理、工具调用、HITL 和语音 AI (n8n + ElevenLabs) 的全渠道 AI 代理，实现 90% 的自助服务。工作流可下载。',
      },
      nav: {
        breadcrumbHome: '首页',
        breadcrumbCurrent: 'AI 代理 Jacobo',
      },
      header: {
        kicker: '案例研究：薛一凡 iRepair (可在 Google 搜索，目前仍在运营)',
        h1: 'Jacobo：具备子代理和工具调用的全渠道 AI 代理',
        subtitle: '我如何构建一个通过 WhatsApp 和固定电话提供服务的 AI 代理，通过 Webhook 编排专业子代理，并在手机维修业务中实现 ~90% 的自助服务。',
        badge: '系统已于 2025 年随业务一同售出。至今仍在生产环境中运行',
        date: '2026年2月25日',
      },
      heroMetrics: [
        {
          value: '~90%',
          label: '自助服务率',
        },
        {
          value: '~80h/月',
          label: '自动化节省',
        },
        {
          value: '<30s',
          label: '响应速度',
        },
        {
          value: '<200€',
          label: '月度成本',
        },
        {
          value: '24/7',
          label: '全天候可用',
        },
      ],
      tldr: '一个多智能体 AI 系统，在不需人工干预的情况下解决 ~90% 的咨询，24/7 全天候运行，每月成本 <200€。包含 4 个代理 + 3 个工具，双渠道（WhatsApp + 固定电话）。在拥有 5 年历史的业务操作系统基础上，用时不到 1 个月建成。于 2025 年随业务一同售出。文章末尾可下载全部 7 个 n8n 工作流。',
      intro: {
        hook: '每天约 15 次中断。每一次中断，都意味着一项维修任务被迫停止。每一次未及时回复的 WhatsApp，都可能意味着客户流向了竞争对手。我构建了一个 AI 代理来管理这两个渠道：处理 ~90% 的交互，24/7 全天候在线，每月成本低于 200 欧元。',
        body: '这不是一个只会机械回复的聊天机器人。它是一个能查询实时价格、验证库存、管理预约，并懂得何时带着完整上下文转接人工的智能代理。这就是 Jacobo 的诞生。在本文中，我将分享完整的架构和生产环境工作流，以便你可以进行复制。',
      },
      internalLinks: {
        businessOs: {
          text: 'Business OS | 案例研究',
          href: '/business-os-para-airtable',
        },
        pseo: {
          text: '程序化 SEO | 案例研究',
          href: '/seo-programatico',
        },
        careerOps: {
          text: 'Career-Ops: 多智能体 AI 系统 | 案例研究',
          href: '/career-ops',
        },
      },
      sections: {
        theProblem: {
          heading: '问题背景',
          body: '在完成了 30,000+ 次维修并拥有多个服务渠道（电话、WhatsApp、网页）的情况下，瓶颈显而易见：',
          painPoints: [
            '80% 的咨询是重复性的：价格、预约、维修进度',
            '每次咨询都会打断正在修理设备的技术人员',
            '响应时间随当天的负载量波动',
            '信息分散在 Airtable、日历和库存系统中',
            '服务时间受限于门店营业时间',
            '专门聘请一名兼职客服的成本超出了业务所能承受的范围',
            '客户主要通过两个渠道（WhatsApp 和固定电话）接入，解决方案必须以同一套逻辑覆盖两者，而非重复劳动',
          ],
          alternatives: {
            body: '从一开始我就确定了三件事：Airtable 是大脑（Business OS 已作为 SSOT 运行多年），我需要针对这些数据进行真正的工具调用 (tool calling)，且该代理必须是多模态的（语音 + 聊天）并共享相同资源。问题在于使用哪种编排工具：',
            items: [
              {
                tool: 'Tidio / Intercom',
                issue: '基于决策树的通用聊天机器人。无法实时查询库存或针对 Airtable 计算动态价格。对于维修业务来说，它们充其量只是一个交互式的常见问题解答 (FAQ)。',
              },
              {
                tool: 'ManyChat (WhatsApp)',
                issue: '适用于营销流程，但缺乏针对现有 ERP 的工具调用能力。无法验证库存、创建工作单 or 进行带有上下文的人工转接。',
              },
              {
                tool: '垂直领域解决方案 (RepairDesk chat)',
                issue: '没有任何维修行业的 SaaS 提供具备自然语言能力且能针对实时数据进行工具调用的对话代理。那些带有聊天功能的本质上只是伪装后的表单。',
              },
            ],
            punchline: 'n8n 是自然之选：支持 Webhook 的工作流编排、原生支持带有 LLM 和工具调用的代理，且每个子代理都可以作为独立的、可测试的工作流。一切都连接到已在 Airtable 中运行的 Business OS。',
          },
        },
        architecture: {
          heading: '系统架构',
          body: 'Jacobo 并不是一个带有超长提示词的聊天机器人。它是一个由多个专门子代理组成的系统，每个子代理都部署为 n8n 中的独立 Webhook，并通过中心路由器的工具调用进行编排。你在本文中看到的每个工作流都是可下载的：你可以直接将它们导入 n8n。',
          whySubAgents: {
            heading: '为什么选择子代理而非单体提示词？',
            reasons: [
              {
                title: '可测试性',
                detail: '每个子代理都有自己的 Webhook。我可以通过 HTTP 调用孤立地测试它，而无需搭建整个系统。',
              },
              {
                title: '独立演进',
                detail: '折扣逻辑的更改不会影响预约。我可以迭代一个领域而无需承担破坏另一个领域的风险。',
              },
              {
                title: '成本效益',
                detail: '并非所有子代理都需要相同的模型。预约使用 MiniMax M2.5（快速且廉价，用于解析时间偏好）。报价使用 GPT-4.1 mini（在结构化输出方面更精准）。每个子代理都配备最适合其任务的模型。',
              },
              {
                title: '平台无关性',
                detail: '子代理本质上是 Webhook。它们不知道是 n8n (WhatsApp) 还 ElevenLabs (语音) 在调用它们。任何编排器都可以复用它们，无需重复逻辑。',
              },
            ],
          },
          agentsHeading: '用 4 个代理和 3 个工具统领全局',
          agentsBody: '4 个拥有各自 LLM 的代理负责决策。3 个不带 LLM 的工具执行纯业务逻辑。全部通过 Webhook 连接。',
          toolsLabel: '工具 (无 LLM)',
          agents: [
            {
              kind: 'agent',
              icon: '🧭',
              name: '主路由器 (n8n)',
              desc: 'WhatsApp 渠道的大脑。分类意图，选择正确的子代理，并维护一个包含 20 条消息的记忆窗口。',
              details: [
                '通过 OpenRouter 运行 GPT-4.1 · 37 个节点',
                '带有 7 个作为 HTTP 端点的工具的 LangChain Agent 模式',
                'Think 工具用于在执行复杂链条前进行推理',
                '伪流式传输 (Pseudo-streaming)：将回复拆分为句子，通过 WhatsApp 逐条发送',
              ],
            },
            {
              kind: 'agent',
              icon: '🎙️',
              name: '语音路由器 (ElevenLabs)',
              desc: '语音渠道的大脑。通过 Aircall → Twilio → ElevenLabs Conversational AI 接收来电，拥有专门为口语对话优化的系统提示词。',
              details: [
                'ElevenLabs Conversational AI · GPT-4o',
                '与主路由器相同的子代理，作为 HTTP 工具连接',
                '原生开箱即用的 RAG：包含维修目录、价格和常见问题的知识库',
                '针对语音优化的延迟：短促且直接的回答',
                '营业时间检测，用于非营业时间转接人工',
              ],
            },
            {
              kind: 'agent',
              icon: '📅',
              name: '预约子代理',
              desc: '将“明天上午”转换为确认的预约。解析自然语言中的时间偏好，查询 YouCanBookMe 并在 WhatsApp 上发送确认模板。',
              details: [
                '通过 OpenRouter 运行 MiniMax M2.5 · 18 个节点',
                '15 条时间解析规则：从“午饭后”到“除周一外的任何一天”',
                '系统中最为复杂的子代理',
              ],
            },
            {
              kind: 'agent',
              icon: '💰',
              name: '报价子代理',
              desc: '所有的价格查询都流经此处。在 Airtable 中查找精确的型号和维修项，返回带有库存状态的真实价格，并决定下一步。',
              details: [
                '通过 OpenRouter 运行 GPT-4.1 mini · 11 个节点',
                '有库存？→ 提供预约',
                '无库存？→ 提供订购',
                '不存在？→ 链接至报价表单',
              ],
            },
            {
              kind: 'tool',
              icon: '📦',
              name: '订单管理',
              desc: '当零件缺货时，在 Airtable 中创建维修/订购记录。',
              details: [
                '3 个节点：Webhook → 创建记录 → 响应',
                '设计简单：所有的验证工作都已在报价阶段完成',
              ],
            },
            {
              kind: 'tool',
              icon: '🧮',
              name: '折扣计算器',
              desc: '纯业务逻辑，无 LLM。当客户组合多个维修项时计算套餐折扣。',
              details: [
                '3 个节点 · 无 LLM',
                '电池 + 屏幕 + 后盖 = 自动计算的多项维修价格',
                '折扣规则存放在这里，而不是分散在提示词中',
              ],
            },
            {
              kind: 'tool',
              icon: '🙋',
              name: 'HITL 转接人工',
              desc: '系统的排压阀。通过 Slack 转接人工，并提供指向 WATI 对话的直接深度链接。',
              details: [
                '5 个节点 · 发布至 #chat 频道',
                '包含对话摘要、检测到的意图和客户历史记录',
                '人工在打开聊天前已掌握完整背景',
              ],
            },
          ],
          memory: {
            heading: '对话记忆',
            body: 'Jacobo 在消息之间不保留自身状态。每当有新消息到达时，它会通过从 WATI 读取真实的对话历史来重构上下文：',
            steps: [
              {
                label: '是否已接待？',
                detail: '一个开关节点检查该号码是否已有活跃会话。如果没有，则触发记忆加载。',
              },
              {
                label: '从 WATI 获取',
                detail: '通过 getMessages/{waId} 进行 HTTP 调用，pageSize=80。获取完整对话中的最后 80 条消息：客户消息、Jacobo 的回复、模板、广播和人工操作员的消息。',
              },
              {
                label: '三阶段解析',
                detail: '三个代码节点将 WATI 事件转换为与 LangChain 兼容的 {human, ai} 对。过滤掉广播、确认模板和系统事件。__reloadFlag__ 标识允许手动重置记忆。',
              },
              {
                label: '缓冲窗口',
                detail: '最后 20 条消息被加载到 LangChain BufferWindow 中，以电话号码为键。代理能“记住”之前的对话：如果你昨天确认了预约，今天 Jacobo 依然知道。',
              },
            ],
            punchline: '这使得 Jacobo 能够继续被中断的对话，识别回头客，并知道人工之前是否介入过该对话。',
          },
          debugTools: {
            heading: '生产环境调试工具',
            body: '两个隐藏命令用于在生产环境中调试记忆而无需改动 n8n。“Borrar memoria”（清除记忆）重置客户缓冲区，当对话损坏或 LLM 进入循环时非常有用。“HISTORIAL”会导出缓冲区的原始 JSON。这教会了我们要对回复进行脱敏：如果不过滤，LLM 会将完整的 JSON 返回给客户。',
          },
          pseudoStreaming: {
            heading: 'WhatsApp 中的伪流式传输',
            body: 'WhatsApp 不支持流式输出。长段落读起来像机器人；连续的消息读起来像真人在打字。路由器根据换行符拆分每个回复，并通过 WATI API 每隔 1 秒发送一个片段。结果：无需流式架构即可实现“正在输入...”的体验。',
          },
          stackIntro: 'Jacobo 依托于 8 个服务，涵盖了从客户接入到人工转接的全过程。每个服务都有其独特角色；如果不改动架构，任何一个都不可替代。',
          stack: [
            {
              name: 'WATI',
              role: 'WhatsApp Business API：主要的输入渠道',
            },
            {
              name: 'Aircall',
              role: '云端 PBX：Jacobo 就像是总机中的一名同事',
            },
            {
              name: 'n8n',
              role: '工作流和子代理的编排（7 个工作流，约 80 个节点）',
            },
            {
              name: 'OpenRouter',
              role: '模型无关的 LLM 网关 (MiniMax M2.5 + GPT-4.1)',
            },
            {
              name: 'ElevenLabs',
              role: '对话式语音代理 (eleven_flash_v2_5, temp 0.0)',
            },
            {
              name: 'Airtable',
              role: 'CRM、库存、客户历史（唯一事实来源）',
            },
            {
              name: 'YouCanBookMe',
              role: '预约管理与可用性',
            },
            {
              name: 'Slack',
              role: 'HITL 人工转接渠道 (#chat)',
            },
          ],
        },
        e2eFlows: {
          heading: '端到端流程',
          body: '每个流程描绘了从客户咨询到解决的“快乐路径”。涉及的子代理在每一步中都有标记。',
          items: [
            {
              icon: '🔧',
              name: '维修预约',
              trigger: '客户咨询维修事宜',
              summary: '从咨询到完成带有预留零件的预约，全程无需人工干预。',
              agentsTouched: [
                '主路由器',
                '报价子代理',
                '预约子代理',
              ],
              details: [
                '客户通过 WhatsApp 咨询：“你好，更换 iPhone 14 Pro 屏幕要多少钱？”',
                '主路由器将意图分类为价格查询 → 委派给报价子代理',
                '报价子代理在 Airtable 中查找：型号 + 维修类型 → 返回真实价格 (189€)、零件可用性及预估时间 (45-60 分钟)',
                '库存可用 → Jacobo 回复价格并询问：“您想预约吗？”',
                '客户回答：“是的，明天上午” → 主路由器委派给预约子代理',
                '预约子代理解析时间偏好，查询 YouCanBookMe → 提供空档：“10:00 和 11:30”',
                '客户确认 → 在 YouCanBookMe 中创建预约 + 在 Airtable 中生成工作单 + 从库存中自动预留零件',
                '通过 WhatsApp 发送包含日期、时间、价格和门店地址的确认信息',
              ],
            },
            {
              icon: '💬',
              name: '价格查询',
              trigger: '客户询问维修或产品价格',
              summary: '使用真实数据查询 Airtable，并根据库存情况调整引导语 (CTA)。',
              agentsTouched: [
                '主路由器',
                '报价子代理',
              ],
              details: [
                '客户：“换一个三星 S23 电池要多少钱？”',
                '主路由器分类意图 → 委派给报价子代理',
                'GPT-4.1 在 Airtable 中查找：精确型号 + 维修类型',
                '如果有库存 → 回复价格、用时，并提供预约选项',
                '如果没库存 → 回复价格，说明需要订购零件，并询问是否下单',
                '如果数据库中不存在该型号 → Jacobo 会如实告知而非胡编乱造价格',
                '库存感知路由：引导语会根据 Airtable 中的实际库存情况动态变化',
              ],
            },
            {
              icon: '🙋',
              name: '人工转接 (HITL)',
              trigger: '意图不明、保修相关、投诉或明确要求人工',
              summary: '带着完整上下文通过 Slack 转接给人工团队。人工无需从零开始询问。',
              agentsTouched: [
                '主路由器',
                'HITL 转接人工',
              ],
              details: [
                '转接触发器：检测到客户产生挫败感、超出领域咨询、保修案例或明确要求与真人沟通',
                '主路由器激活 HITL 转接 → 向 Slack (#chat) 发送通知',
                'Slack 消息包含：对话摘要、检测到的意图、来自 Airtable 的客户数据以及转接原因',
                'WATI 深度链接：人工点击后直接跳转到客户的 WhatsApp 对话界面',
                '人工无需从零开始：已掌握所有背景信息。转接后平均解决时间从分钟级降至秒级',
                'Jacobo 告知客户：“我正为您转接一位同事，他能更好地协助您处理此事”',
              ],
            },
          ],
        },
        deepDiveBooking: {
          heading: '深度探索：自然语言预约',
          body: '预约子代理是系统中最复杂的工作流。其任务是将“明天上午”转换为一个已确认且预留了零件的预约，而无需客户填写任何表单。',
          challenge: {
            heading: '挑战：跨越两个世界',
            body: '客户使用的是自然语言（“周四上午中间时段，或者周五下午”）。YouCanBookMe API 使用的是 Unix 时间戳。子代理必须进行翻译并找到交集。',
          },
          parseUrl: {
            heading: 'URL 解析 (ParseURL)',
            body: '一个代码节点，用于从 YouCanBookMe URL 中提取子域名，以确定使用哪个预约配置。解析查询字符串以获取表单的动态字段（维修类型、客户数据）。针对不同服务有不同的日历：xueyifan-citav2-componentes 用于零件维修，xueyifan-citav2-diagnostico 用于诊断。子域名决定了预约后续的完整流程。',
          },
          analizarDisponibilidad: {
            heading: '可用性分析 (AnalizarDisponibilidad - LLM)',
            body: '一个由 MiniMax M2.5 驱动的 LLM 代理，将自然语言转换为结构化的 JSON 数组：[{date, start, end, exact}]。系统提示词包含 15 条涵盖所有真实情况的时间解析规则。包含结构化输出解析器以确保格式有效，并支持按会话记忆（sessionKey = 电话/ycbmUrl），以便客户在不重头开始的情况下微调偏好。如果没有明确偏好，则返回未来 3 个工作日的完整时间段。',
            rules: [
              '默认范围：“上午” = 10:00-14:00，“下午” = 17:00-21:00，“全天” = 10:00-21:00',
              '复数形式：“上午时段” → 未来 3 个工作日的上午',
              '明确范围：“10点到12点” → start=10:00, end=12:00, exact=true',
              '条件连接：“或者周五” → 将周五添加为备选范围',
              '舍入处理：10:15 → 10:00-11:00（1 小时块）',
              '自动过滤周末（仅限周一至周五）',
              '“上午中间” = 11:00-13:00，“一早” = 10:00-11:00',
              '“午饭后” = 17:00-19:00',
              '当天仅在营业时间剩余 ≥2 小时时才包含在内',
              '相对日期：“后天”、“下周二” → 解析为绝对日期',
            ],
          },
          ycbmApi: {
            heading: 'YCBM API (3 次调用)',
            body: '针对 YouCanBookMe API 的 3 个连续 HTTP 请求管道。每次调用都依赖于前一次的结果，无法并行化：',
            steps: [
              { label: 'POST /v1/intents', detail: '发送子域名 → 创建预约意图并返回唯一 ID' },
              { label: 'GET /v1/intents/{id}/availabilitykey', detail: '使用意图 ID → 获取可用性密钥' },
              { label: 'GET /v1/availabilities/{key}', detail: '使用密钥 → 获取所有带 Unix 时间戳的真实可用空档' },
            ],
          },
          filterSlots: {
            heading: '空档过滤 (FilterSlots)：交集计算',
            body: '一个纯代码节点，执行集合交集运算：LLM 范围 × YCBM 真实空档。将 Unix 时间戳转换为 Europe/Madrid 时区，然后进行过滤。输出是一个包含 0 个、1 个或多个空档的数组。这是工作流中最优雅的节点：纯粹的集合逻辑，无需 LLM 或 API —— 只有时间维度的数学运算。',
          },
          autoBooking: {
            heading: '条件自动预约',
            body: '一个 If 节点评估 slots.length 并分出 3 条路径。子代理拥有自己的会话记忆：客户可以在不重头开始的情况下进行修正。',
            paths: [
              { condition: '恰好 1 个空档', action: '自动确认（零摩擦）：构造包含邮箱、电话、动态变量和备注的表单数据 → 检查邮箱 → 提交选择 → 提交确认 → 告知客户预约成功' },
              { condition: '多个空档', action: '按日期对空档分组，并向客户展示选项及上下文说明' },
              { condition: '0 个空档', action: '告知该时段无可用，并请求客户提供其他时间偏好' },
            ],
          },
          punchline: '结果：客户写下“明天上午中间”，3 秒后就能得到一个已确认且预留了零件的预约。无需表单，无需在日历中选日子，零摩擦。对于 FDE 来说，这就是“我做了一个聊天机器人”与“我设计了一个将人类意图转化为 API 动作的系统”之间的区别。',
        },
        toolCalling: {
          heading: '生产环境中的工具调用 (Tool Calling)',
          body: 'Jacobo 并不根据训练数据生成回答。每一个回答都是通过 7 个被定义为 HTTP 端点的工具查询真实系统而构建的：',
          tools: [
            {
              name: 'presupuestoModelo',
              desc: '在 Airtable 中查找维修/配件的价格和库存。使用 GPT-4.1 以获得精准的结构化输出。',
            },
            {
              name: 'subagenteCitas',
              desc: '通过 YouCanBookMe 管理可用性和预约。LLM 负责解析自然语言中的时间偏好。',
            },
            {
              name: 'hacerPedido',
              desc: '在 Airtable 中创建维修/订购记录。3 个节点：Webhook → 创建记录 → 响应。',
            },
            {
              name: 'Calculadora',
              desc: '批量折扣：多项维修一起做 = 折扣更高。纯业务逻辑，无需 LLM。',
            },
            {
              name: 'contactarAgenteHumano',
              desc: '通过 Slack 转接人工，包含转接原因、WATI 链接和完整背景。同时支持 WhatsApp 和电话渠道。',
            },
            {
              name: 'enviarMensajeWati',
              desc: '并行发送 WhatsApp 信息。当语音代理需要发送链接或报价时，它会在通话的同时发送 WhatsApp 信息。',
            },
            {
              name: 'Think',
              desc: '内部推理元工具。代理在执行多工具链条前会“大声思考”，以减少错误。',
            },
          ],
          waitMessage: {
            heading: 'UX 等待消息',
            body: '当 Jacobo 调用报价工具时（1-3 秒延迟），它会先发送一条“我正在为您查询...”的消息。这极大地提升了用户体验，避免客户因几秒钟的沉默而以为系统挂了。',
          },
          thinkTool: {
            heading: 'Think 工具',
            body: '在执行工具链（查价 → 验库存 → 提预约）之前，代理会调用 Think 来规划顺序。这在多工具场景下显著降低了逻辑错误。',
          },
          stockAware: {
            heading: '库存感知路由',
            body: '报价工具的输出决定了后续步骤。引导语会根据真实库存状态动态变化。',
            flows: [
              {
                condition: '零件有货',
                action: '→ 引导至维修预约',
              },
              {
                condition: '零件缺货',
                action: '→ 引导至向供应商订购（带预计到货时间）',
              },
              {
                condition: '型号未找到',
                action: '→ 如实告知并提供人工联系方式',
              },
            ],
          },
        },
        channels: {
          heading: '双渠道运营',
          body: 'Jacobo 同时运行在两个渠道上。关键点在于：两者共享相同的 Webhook 子代理，业务逻辑只需编写一次。',
          whatsapp: {
            name: 'WhatsApp (业务量最大)',
            detail: '使用 WATI 作为 WhatsApp Business API + n8n 作为编排器。70% 的咨询来自这里。',
            highlights: [
              '采用 LangChain Agent 模式的 n8n 路由器：37 个节点，7 个 HTTP 工具，GPT-4.1 驱动',
              'Meta 批准的用于预约确认、订单跟踪和通知的 WhatsApp 模板',
              '伪流式传输：将回复分段发送，让客户感觉 Jacobo 像真人在打字',
              '记忆功能：每会话 20 条消息，以电话号码为键。通过读取 WATI 完整历史记录重构上下文',
              '事件路由：3 个开关节点在信息到达代理前过滤掉系统干扰信息',
              '透明的人工接管：当人工通过 WATI 接管对话时，Jacobo 会检测到并保持静默',
            ],
          },
          voice: {
            name: '固定电话 (语音)',
            detail: 'Aircall 云总机 + Twilio 电话桥接 + ElevenLabs 对话式语音代理。Jacobo 就像是 Aircall 电话系统中的一名“同事”。',
            highlights: [
              'Aircall → Twilio → ElevenLabs 集成：电话进入业务 Aircall 总机。无人接听或非营业时间时，总机转接至连接 ElevenLabs 的 Twilio 号码。对客户而言全程透明',
              '客户拨打的是固定电话，像和任何员工对话一样和 Jacobo 交谈。它不是网页插件或带菜单的 IVR，而是具备自然声音的真实通话',
              '高质量 ASR + 7秒回复超时 + 20秒静默挂断，用以处理对话中的自然停顿',
              'LLM: GPT-4.1 (temp 0.0) 确保语音工具调用的最高精准度。优化了流式延迟',
              '语音模型：eleven_flash_v2_5，语速 1.2x，兼顾稳定性和相似度',
              '基于 Google Maps、官网等 3 个来源的知识库，利用 ElevenLabs 原生 RAG。n8n 渠道则直接通过工具调用 Airtable 获取业务上下文',
              '与 n8n 共享 5 个 Webhook 工具：查价、预约、折扣计算、人工转接及发送 WhatsApp',
              '跨渠道魔法：在通话时，Jacobo 利用 Caller ID 并行发送 WhatsApp 链接。客户非常喜欢在通话的同时在手机上收到信息',
            ],
          },
          cocaColaAnecdote: {
            heading: '生产事故：可口可乐事件',
            body: '一名客户正在咨询手机维修。通话中，他转头向服务员要了一瓶可口可乐。Jacobo 听到了 —— 然后告诉他我们这里不卖可口可乐。',
            diagnosis: {
              heading: '诊断：系统忽略了三个信号',
              items: [
                { label: '音量', detail: '下降了约 40% —— 客户远离了话筒' },
                { label: '频谱倾斜', detail: '发生了偏移 —— 离轴语音会丢失高频信号' },
                { label: '语义相关性', detail: '“可口可乐”与手机维修完全不相关' },
              ],
            },
            takeaway: '基础的 VAD 是不够的。你需要说话人检测 (Addressee detection)：声学近接感应 + 韵律分析 + 语义门控协同工作。',
          },
          missedCallRecovery: {
            heading: '漏接电话挽回',
            body: '如果客户挂断或无人接听，Aircall 会向 Make.com 发送 Webhook，随后触发 WATI 发送带操作按钮的 WhatsApp 模板。很大一部分潜客来自这里：Jacobo 捕捉到了那些没耐心等待的来电者。由于有 WATI 上下文，回复时它已知道对方曾尝试来电。',
          },
          dualOrchestrator: {
            heading: '双编排器架构',
            body: '这是关键模式：n8n 编排 WhatsApp，ElevenLabs 编排语音，但两者都调用相同的 Webhook 子代理。这是应用于 AI 代理的真正微服务模式。子代理不需要知道是谁在调用它们。',
          },
          unifiedVoiceUx: {
            heading: '统一 UX：同一个声音',
            body: '总机的所有音频（欢迎语、IVR 菜单、语音信箱）都使用 Jacobo 的同款 ElevenLabs 声音生成。无论客户通过哪个环节接入，声音始终一致，无断裂感。',
            punchline: '“请按 3 跟我交谈，我是 Jacobo。” 这是总机在以第一人称介绍 AI 代理。随后接听的是同一个声音。这是一个会自我介绍的代理。',
            audioIntro: '试听真实的总机录音。欢迎语、IVR 菜单和真人代理使用相同的声音：',
            audios: [
              {
                src: '/jacobo/pbx-welcome.mp3',
                label: '欢迎语',
                transcript: '“稍后我们将为您接听。感谢致电薛一凡 iRepair。为确保服务质量，您的通话可能会被录音。”',
              },
              {
                src: '/jacobo/pbx-ivr.mp3',
                label: 'IVR 菜单',
                transcript: '“办理新维修请按 1。查询维修状态请按 2。请按 3 跟我交谈，我是 Jacobo。您在薛一凡 iRepair 的 24/7 虚拟助手。您将立即获得报价并完成预约。”',
                highlight: '请按 3 跟我交谈，我是 Jacobo',
              },
            ],
          },
          eventRouting: {
            heading: '预过滤：Jacobo 应该回答吗？',
            body: '在消息到达 AI 代理之前，三个开关节点会过滤噪音并决定由谁回应：',
            steps: [
              {
                label: '事件类型',
                detail: '仅过滤真实消息。忽略系统事件、送达确认、状态更新及群发广播。否则，Jacobo 会回应自己的确认消息。',
              },
              {
                label: '发送者是谁？',
                detail: '检测最后说话的是客户还是人工。当人工通过深度链接接管时，消息标记为 owner: true。Jacobo 会检测到并停止干扰。',
              },
              {
                label: '是否已接待？',
                detail: '检查活跃会话。如果客户在人工下班后回复，Jacobo 会以共情口吻切入：“我们中午休息了，但我可以协助您直到下午重新营业”。',
              },
            ],
            punchline: '这 3 个节点的过滤器实现了人工与代理的和谐共存。人工可以随时接管，离开后 Jacobo 会带着完整上下文继续服务。',
          },
        },
        results: {
          heading: '运营结果',
          body: '上线 6 个月后的生产环境指标：',
          metrics: [
            {
              value: '~90%',
              label: '自助服务率',
              detail: '无需人工干预即可解决的咨询比例',
            },
            {
              value: '24/7',
              label: '可用性',
              detail: '不再受限于门店营业时间',
            },
            {
              value: '<30s',
              label: '响应时间',
              detail: '对比之前依赖人工时的分钟级响应',
            },
            {
              value: '<200€',
              label: '每月成本',
              detail: '总基础设施成本 (n8n + WATI + Aircall + LLMs)',
            },
          ],
          beforeAfter: {
            heading: '之前 vs 之后',
            items: [
              {
                area: '价格/库存咨询',
                before: '技术人员每天被打断约 15 次',
                after: 'Jacobo 在 30 秒内通过 Airtable 真实数据进行回复',
              },
              {
                area: '预约挂号',
                before: '通过电话手动记录，时有排程错误',
                after: '通过 YouCanBookMe 自动完成，零件自动预留',
              },
              {
                area: '非营业时间',
                before: '咨询流失，客户流向竞争对手',
                after: 'Jacobo 通过 WhatsApp 和固话 24/7 全天候响应',
              },
              {
                area: '人工转接',
                before: '人工需从零开始，重复询问客户问题',
                after: '带着完整上下文转接，数秒内即可解决',
              },
              {
                area: '客服成本',
                before: '兼职员工每月约 800-1,000€',
                after: '总基础设施成本每月不到 200€',
              },
            ],
          },
          roi: '真正的投资回报不仅是成本节省。它让技术人员能专心修手机而非接电话，也让那些晚上 10 点产生的预约不再石沉大海。',
          benchmarks: '行业基准：企业联络中心平均 AI 解决率为 20-30% (Gartner, 2025)。Jacobo 在专业领域达到了 ~90%。差异点在于：具备实时数据访问能力的特定领域子代理 vs 通用聊天机器人。',
          exitNarrative: '自 2025 年 9 月业务转让后，Jacobo 仍在新的所有者下 24/7 运行。买家收购的是一套现成的运营资产。一个系统最好的证明就是：在离开创造者后依然运行良好。',
        },
        decisions: {
          heading: '技术决策记录 (ADRs)',
          body: '塑造系统的关键决策及其背后的原因：',
          items: [
            {
              title: '多模型协作 (GPT-4.1 + MiniMax + GPT-4.1 mini) vs 单一 LLM',
              detail: '每个组件使用最合适的模型：GPT-4.1 用于主路由和语音（精准工具调用），GPT-4.1 mini 用于报价（结构化输出），MiniMax M2.5 用于预约（解析时间偏好既快又省）。通过 OpenRouter 可以在不重写工作流的情况下切换模型。',
            },
            {
              title: 'OpenRouter 作为模型无关网关',
              detail: '在不重写工作流的前提下切换模型，若某个模型宕机可自动降级。我们评估了 Claude, GPT-4, MiniMax：按用例而非品牌进行选择。',
            },
            {
              title: '编排工具选择：n8n vs Make',
              detail: '每个子代理都是一个带 Webhook 的独立工作流。Make 不支持这种模块化。n8n 支持 LangChain 代理模式、记忆管理和原生工具调用。',
            },
            {
              title: '子代理作为 Webhook 微服务',
              detail: '解耦、可独立测试及部署。同一个子代理同时服务于 WhatsApp 和语音渠道，无需重复代码。',
            },
            {
              title: 'Airtable 作为大脑而非单纯数据库',
              detail: '利用已有的 Business OS（12 个库，2,100+ 字段）。它是库存、价格和客户历史的唯一事实来源。在现有基础上构建，而非重复造轮子。',
            },
            {
              title: '记忆窗口：每会话 20 条消息',
              detail: '在上下文长度与 Token 成本之间取得平衡。足以应对一次维修咨询（95% 在 10 条消息内解决）。以电话号码为键确保连贯性。',
            },
            {
              title: '用于内部推理的 Think 工具',
              detail: '在执行多工具链条前显式推理。减少了错误，因为 LLM 在行动前规划了序列（查价 → 验货 → 提约）。',
            },
            {
              title: '带有转接原因的 Slack HITL',
              detail: 'LLM 生成转接原因并包含在 Slack 消息中：为什么需要人工、尝试过什么、客户需要什么。人工在打开对话前就知道为什么被需要。',
            },
            {
              title: 'WhatsApp 在先，语音在后',
              detail: '70% 的业务量来自 WhatsApp。从这里开始能最大化初期影响。语音渠道随后复用了已验证的子代理。',
            },
            {
              title: '共享子代理的双编排器',
              detail: 'n8n 负责 WhatsApp，ElevenLabs 负责语音。子代理是平台无关的 Webhook。真正的微服务模式应用。',
            },
            {
              title: 'ElevenLabs 作为 Aircall 中的“同事”',
              detail: 'Jacobo 集成在 PBX 中，通过路由规则在溢出或非营业时间介入。客户拨打固话，体验透明。使用 temp 0.0 以获得最高一致性。',
            },
            {
              title: 'Aircall → Twilio → ElevenLabs (关于延迟的权衡)',
              detail: '这条链条有效但增加了延迟（约 950-1,500ms）。Twilio 使用 8kHz 音频而 STT 模型针对 16kHz 优化，重采样会导致精度损失。今天我会选择直连 SIP trunk 以消除中间环节，降低延迟并提升音频质量。',
            },
          ],
        },
        platformEvolution: {
          heading: '平台演进',
          tagline: 'Jacobo 并非突发奇想。它是 5 年来在底层构建强大 Business OS 的必然结果。',
          steps: [
            {
              year: '2019-2024',
              event: 'Business OS 奠基',
              detail: '在 Airtable 中构建完整业务操作系统的五年：12 个库、2,100+ 字段、实时库存、CRM。没有这个干净的数据层，任何 AI 代理都只是会胡编乱造的普通聊天机器人。',
            },
            {
              year: '2025年1月',
              event: '进修与审慎设计',
              detail: '在写第一行代码前，我研究了 AI 代理架构。我知道我需要工具调用，Airtable 是 SSOT，且同一后端必须同时服务于语音和聊天。',
            },
            {
              year: '2025年2月',
              event: '首个测试版 (单体)',
              detail: '尝试了全上下文的单一提示词方案。证实了我的怀疑：单体提示词无法跨多个领域扩展。这次测试验证了基于 Webhook 的子代理架构。',
            },
            {
              year: '2025年2月',
              event: '最终多代理版本',
              detail: '我的首个 AI 代理，不到一个月即上线。完整的子代理架构：每个领域独立工作流、带工具调用的中心路由、按需匹配的多模型。速度源于底层已运行的 Business OS。',
            },
            {
              year: '2025年3月',
              event: '语音渠道上线',
              detail: 'Jacobo 作为 Aircall 系统中的一员，通过 Twilio 连接到 ElevenLabs。复用了现有子代理，验证了平台无关设计的有效性。',
            },
            {
              year: '2025年9月',
              event: '业务整体售出',
              detail: 'Jacobo 自上线起 24/7 运行。它作为运营资产随业务一同出售。五年的整洁架构让这次退出成为可能。',
            },
          ],
          bridge: ['Jacobo 并非一次实验。', '那是亲手构建业务的 16 年。', '将其系统化直到能在 {没有我} 的情况下运行。', 'Jacobo 是完成这个 {闭环} 的最后一块拼图。', '我将业务整体转让。', '我构建的系统仍在运行 —— 在 {新的所有者} 手下。'],
          crossLink: {
            text: 'Jacobo 构建于我历时 5 年设计的 Business OS 之上 —— 阅读完整案例研究 →',
            href: '/business-os-para-airtable',
          },
        },
        lessons: {
          heading: '经验教训',
          items: [
            {
              title: '子代理 > 单体提示词。',
              detail: '单体提示词无法在多领域扩展。子代理架构是深思熟虑的决定：每一块都可测试、可迭代且相互独立。折扣逻辑的改动不会弄挂预约系统。',
            },
            {
              title: 'HITL 不是备选方案，它是核心功能。',
              detail: '完善的人工转接比试图解决一切的机器人更能赢得信任。客户看重系统知道何时需要真人。关键在于：人工接手时已具备完整背景。',
            },
            {
              title: 'CRM 是代理的大脑，而非 LLM。',
              detail: 'Jacobo 的聪明在于它能查询 Airtable 中的真实价格、库存和历史。剥离这些数据，它就只是另一个胡言乱语的聊天机器人。',
            },
            {
              title: '从流量最高的渠道开始。',
              detail: 'WhatsApp 占了 70% 的咨询量。从这里开始能最大化影响。当语音渠道随后上线时，子代理已久经沙场，只需接入新的编排器。',
            },
            {
              title: '按需选模型，而非看品牌。',
              detail: 'GPT-4.1 用于路由和语音（精准工具调用），GPT-4.1 mini 用于报价（结构化输出），MiniMax M2.5 用于预约（快且省）。OpenRouter 方便我们随时切换。',
            },
            {
              title: 'Think 工具预防连锁错误。',
              detail: '在执行链条前，代理会明确其计划。一个推理步骤减少了链条中的错误。这是代理自己的“橡皮鸭调试”。',
            },
          ],
        },
        whatIdDoDifferently: {
          heading: '我会做哪些改变',
          body: 'Jacobo 运行了数月，回过头看有些决策我会调整：',
          items: [
            {
              title: '从第一天起就进行结构化评估',
              detail: '我在系统上线后才补上评估 (evals)。重新开始的话，我会在 v1 之前定义响应质量指标、意图分类准确率和 HITL 频率。事后补救可观测性的成本远高于原生设计。',
            },
            {
              title: '使用直连 SIP trunk 而非 Aircall → Twilio → ElevenLabs',
              detail: '3 跳链条增加了延迟并导致重采样损失。使用 Telnyx 直连 ElevenLabs 会提供原生 16kHz 音频和极低延迟。我当时选择了长链条是因为 Aircall 是现成的，今天我会优先考虑延迟。',
            },
            {
              title: '使用向量数据库处理记忆',
              detail: '从 WATI 获取 80 条消息的方式无法扩展到长期客户，也无法进行语义搜索。使用 Pinecone 或 Qdrant 处理对话嵌入将能解锁诸如“记得上次我带 iPhone 12 来的时候”之类的功能。',
            },
          ],
        },
        enterprisePatterns: {
          heading: '可迁移的企业级模式',
          body: 'Jacobo 是为中小企业构建的，但模式是企业级的。以下是我交付的内容 vs 在企业规模下我会增加的内容：',
          builtVsEnterprise: [
            {
              pattern: '带工具调用的子代理路由',
              built: '路由器 + 7 个具备意图分类和委派能力的 Webhook 子代理',
              enterprise: '增加熔断器 (circuit breakers)、重试策略及针对子代理的模型回退',
            },
            {
              pattern: '多模型编排',
              built: '通过 OpenRouter 运行 GPT-4.1 (路由/语音) + GPT-4.1 mini (报价) + MiniMax (预约)',
              enterprise: '子代理模型 A/B 测试，新版本提示词的灰度发布',
            },
            {
              pattern: 'HITL 框架',
              built: '通过 Slack 进行带完整上下文和深度链接的转接',
              enterprise: '队列管理、按客户等级划分的 SLA、转接原因分析',
            },
            {
              pattern: '平台无关的子代理',
              built: '在 n8n (WhatsApp) 和 ElevenLabs (语音) 之间共享 Webhook',
              enterprise: 'API 网关、速率限制、认证及端点版本管理',
            },
            {
              pattern: '可观测性',
              built: 'n8n 日志 + Slack 告警',
              enterprise: '使用 Langfuse/Datadog 进行追踪 (traces)、延迟监控及每会话成本跟踪',
            },
            {
              pattern: '语音基础设施',
              built: 'Aircall → Twilio → ElevenLabs：可用，但增加了延迟。Twilio 的 8kHz 采样率降低了 STT 精度',
              enterprise: '直连 SIP trunk，消除 Twilio 环节。Telnyx 提供原生 16kHz 音频和亚 200ms 延迟。App/Web 端使用 WebRTC 直连，延迟降至 300-600ms',
            },
          ],
          applicability: {
            heading: '行业适用性',
            examples: [
              {
                domain: '旅游 (Booking)',
                detail: '针对航班、酒店、保险的子代理。针对复杂变更的 HITL。针对可用性 API 的工具调用。',
              },
              {
                domain: '金融科技',
                detail: '针对交易、余额查询、支持的子代理。库存感知路由 → 余额感知路由。',
              },
              {
                domain: '医疗健康',
                detail: '针对预约、检查结果、分诊的子代理。HITL 作为专科转诊的关键功能。',
              },
              {
                domain: '电子商务',
                detail: '针对物流追踪、退货、推荐的子代理。同样的库存查询和预约模式。',
              },
              {
                domain: '语音 AI 平台',
                detail: '针对延迟优化的对话代理编排。跨渠道 (语音 → 文本) 和 HITL 模式直接适用。',
              },
              {
                domain: '数据/AI 平台',
                detail: '针对内部 API 的工具调用、按意图路由子代理、记忆管理。同一架构可扩展至任何代理编排器。',
              },
            ],
          },
        },
        promptEngineering: {
          heading: '生产环境中的提示词工程',
          body: '我没有进行微调 (fine-tuning)。对于维修店代理，迭代提示词规则比训练模型更务实、更便宜。以下每条规则背后都有一个真实的生产事故案例。',
          whyNotFineTuning: {
            heading: '为什么选择提示词规则而非微调？',
            reasons: [
              '微调成本高且迭代慢。提示词规则几秒钟就能修改并上线。',
              '领域知识变化快：价格、库存、活动。微调模型几天就会过时。',
              '规则是可审计的。团队中任何人都能读懂提示词并理解 Jacobo 的行为。',
              '90% 的生产错误通过增加一行提示词就能解决，而不是重新训练模型。',
            ],
          },
          businessHours: {
            heading: '营业时间检测',
            body: 'JavaScript 节点在每次对话前检查门店是否营业。结果作为动态变量注入提示词：若 `isBH` 为 false，Jacobo 会调整语气（“下班了但我也会尽力帮您”）并停止承诺人工立即回复。',
            code: `const madridTime = new Date().toLocaleString('en-US', {
  timeZone: 'Europe/Madrid',
});
const madridDate = new Date(madridTime);
const day  = madridDate.getDay();   // 0=Sunday … 6=Saturday
const hour = madridDate.getHours();

const isBH = day >= 1 && day <= 5 &&
             ((hour >= 10 && hour < 14) || (hour >= 17 && hour < 21));

return [{ json: { isBH } }];`,
          },
          mainPrompt: {
            heading: '主路由器系统提示词 (n8n)',
            body: '生产提示词的简化版。原始版本有 18 条规则和额外变量。这里的每个块都反映了一种刻意的提示词工程技术。',
            segments: [
              {
                code: `## 角色
你叫 Jacobo，在位于塞维利亚的手机、平板、智能手表维修店 Xueyifan iRepair 工作。你是商业及电子专家，擅长诊断用户移动设备的故障。`,
                annotations: [
                  {
                    label: '角色提示 + 人设',
                    detail: '定义角色、姓名、公司和专业领域限制了回答空间。没有这个，LLM 可能会闲聊或虚构我们不提供的服务。',
                  },
                ],
              },
              {
                code: `营业时间={{ \$('isBH').item.json.isBH }}
- 若 false → 门店已关门：礼貌告知
- 若 true → 正常回复并提供即时帮助`,
                annotations: [
                  {
                    label: '动态变量注入',
                    detail: '营业时间作为变量注入。提示词行为随外部业务决策（营业时间）改变。',
                  },
                ],
              },
              {
                code: `## 目标
识别型号 + 故障 → 查询库存 → 引导至预约、订购或报价。`,
                annotations: [
                  {
                    label: '转化导向的目标',
                    detail: '明确的目标（“引导至预约、订购或报价”）防止 LLM 陷入技术闲聊。',
                  },
                ],
              },
              {
                code: `若设备非手机、平板或手表，提供一般性帮助但不邀请来店。`,
                annotations: [
                  {
                    label: '范围限制',
                    detail: '限制服务范围且不生硬拒绝：代理在其领域外依然有用但不做过度承诺。',
                  },
                ],
              },
              {
                code: `## 指令
1. 识别型号和症状 → 调用 "presupuestoModelo"
2. 若多项维修 → 调用 "Calculadora" (价格数组)
3. 根据报价结果：
   3.1 有货 → 通过 "subagenteCitas" 提供预约
   3.2 缺货 → 通过 "hacerPedido" 提供紧急订购
   3.3 无报价 → 提供 urlPresupuesto

## 工具
- "mensajeConsulta": 查询前的等待消息
- "presupuestoModelo": Airtable 中的型号及故障查询
- "contactarAgenteHumano": Slack 上的 HITL 转接
- "Think": 复杂调用前的内部推理
- "Calculadora": 多项维修折扣
- "subagenteCitas": 通过 YouCanBookMe 管理预约
- "hacerPedido": 缺货时在 Airtable 创建订单`,
                annotations: [
                  {
                    label: '作为契约的工具定义',
                    detail: '每个工具都记录了功能及使用时机。LLM 需要知道工具的作用及调用顺序。',
                  },
                ],
              },
              {
                code: `## 硬性规则 (源自生产实践)
1. 回复或传递数据前必须调用 Think`,
                annotations: [
                  {
                    label: '强制思维链推理',
                    detail: '“回复前必须调用 Think”强制代理进行显式推理，避免在未校验参数时直接调用工具。',
                  },
                ],
              },
              {
                code: `2. 不要修改报价工具返回的 URL (Meta 会报错)
3. 仅使用一个 * 表示加粗 (WhatsApp)
4. iPhone + 屏幕 → 始终提供高端选项 (12个月保修)
5. 纯文本链接，不使用 Markdown (WhatsApp 不渲染)
6. 仅在报价后调用预约工具
7. 诊断费：19€，仅在不接受维修时收取
8. 邮箱：contacto@xueyifanirepair.es`,
                annotations: [
                  {
                    label: '硬性规则作为生产护栏',
                    detail: '这些规则不是风格偏好，而是对真实错误的修正（URL损坏、客户困惑、订单流失）。它们就像提示词里的回归测试。',
                  },
                ],
              },
              {
                code: `9. 使用地道的表达方式，不要使用生硬翻译
10. 不要推荐其他店铺`,
                annotations: [
                  {
                    label: '负向提示',
                    detail: '告诉 LLM 不要做什么同样重要。',
                  },
                ],
              },
            ],
          },
          voicePrompt: {
            heading: '语音代理系统提示词 (ElevenLabs)',
            body: '生产环境语音提示词的简化版。相同领域，适配电话交谈。共享相同的 Webhook 工具，但流程更直接。',
            segments: [
              {
                code: `## 角色
你叫 Jacobo，在薛一凡 iRepair 工作。请保持简练、友好且能解决问题。`,
                annotations: [
                  {
                    label: '针对语音的精简人设',
                    detail: '语音环境下，简短是关键。更少的系统 Token 意味着更低的首字延迟。',
                  },
                ],
              },
              {
                code: `## 目标
识别型号 + 故障 → 查库存 → 提供链接。引导客户预约或下单。`,
                annotations: [
                  {
                    label: '单行转化漏斗',
                    detail: '语音代理需要快速决策，单行完整流程比一段话更有效。',
                  },
                ],
              },
              {
                code: `## 指令
1. 获取型号和故障
2. 表明正在查询 → 调用 "presupuestoModelo"
3. 同步发送 "urlXueyifan" (通过 EnviarMensajeWati)
4. 若多项维修 → 调用 "Calculadora"
5. 告知价格及货况 + “已将信息发至您的 WhatsApp”`,
                annotations: [
                  {
                    label: '跨渠道体验',
                    detail: '第 3 步是精髓：通话的同时利用 Caller ID 发送 WhatsApp 链接。客户反响极好。',
                  },
                ],
              },
              {
                code: `## 硬性规则
1. 不要修改报价工具的 URL
2. iPhone + 屏幕 → 提供高端选项
3. 营业时间规则...
号码：{{system__caller_id}}`,
                annotations: [
                  {
                    label: '动态变量：Caller ID',
                    detail: '这是实现跨渠道服务的关键，用于向通话中的客户发送文本。',
                  },
                ],
              },
            ],
          },
          citasPrompt: {
            heading: '预约子代理系统提示词 (n8n)',
            body: '15 条时间解析规则，将口语化的表达转换为 JSON 时间范围。它是系统中最复杂子代理的核心。',
            segments: [
              {
                code: `你是一个微服务，负责将西班牙语的时间偏好转换为 JSON 范围数组。`,
                annotations: [
                  {
                    label: '微服务框架',
                    detail: '将其定位为“微服务”而非“助手”，彻底限制了其行为：不打招呼、不解释、不提问，只返回 JSON。',
                  },
                ],
              },
              {
                code: `业务规则
1. 默认范围：上午 10-14, 下午 17-21, 全天 10-21
2. 只有精确到 00 或 30 分时 exact 为 true
3. 其他分钟数进行舍入并创建 1 小时范围
4. 当前日期是 {{ \$now.format('yyyy-MM-dd HH:mm') }}
5. 支持以逗号等分隔的多项请求`,
                annotations: [
                  {
                    label: '作为规则的领域约束',
                    detail: '将营业时间、30分钟步长和时区硬编码为规则，防止 LLM 胡乱猜测。',
                  },
                ],
              },
              {
                code: `6. 严格按此格式返回函数调用：
{"name":"slots","arguments":{"slots":[...]}}`,
                annotations: [
                  {
                    label: '强制结构化输出',
                    detail: '确保输出可被 n8n 节点解析。',
                  },
                ],
              },
              {
                code: `7-15. 各类边缘情况处理：复数形式、条件连接词、本周、工作日过滤等。`,
                annotations: [
                  {
                    label: '边缘情况枚举',
                    detail: '每一条规则都解决了一个生产中的失败案例。',
                  },
                ],
              },
              {
                code: `# 示例
输入：“明天上午”
→ {"slots":[{"date":"[明天]","start":"10:00","end":"14:00","exact":false}]}`,
                annotations: [
                  {
                    label: '少样本提示 (Few-shot)',
                    detail: '通过示例锚定输出格式。',
                  },
                ],
              },
            ],
          },
          iterationExamples: {
            heading: '真实迭代案例',
            items: [
              {
                rule: '不要修改 URL',
                origin: 'Meta 拒绝包含拼接 URL 的消息。客户曾因 Jacobo 合并了两个 URL 而收不到链接。',
              },
              {
                rule: '仅使用单个 * 加粗',
                origin: 'Jacobo 曾使用 ** (Markdown 风格) 导致 WhatsApp 客户看到的是原始星号。',
              },
              {
                rule: '始终提供 iPhone 高端屏',
                origin: '曾因未主动告知有更好的选择而错失高利润订单。',
              },
              {
                rule: '地道表达',
                origin: '修正了 LLM 常用的生硬机翻。',
              },
              {
                rule: '创建者归属作为线索生成',
                origin: '招聘人员问“谁设计了你”时 Jacobo 曾答不上来。现在它会提及一凡并链接至 LinkedIn。',
              },
            ],
          },
        },
        mainRouter: {
          heading: '两个“大脑”',
          body: 'Jacobo 拥有两个独立的路由器，它们共享相同的工具和子代理。一个编排 WhatsApp，另一个管理语音。',
          whatsappRouter: {
            heading: 'WhatsApp 路由器 (n8n)',
            body: '文本大脑：包含 37 个节点的 n8n 工作流，负责分类、调度及编排回复。所有的工具调用和路由逻辑都在这里。',
          },
          voiceRouter: {
            heading: '语音路由器 (ElevenLabs)',
            body: '语音大脑：ElevenLabs 上的对话代理，搭载 Gemini 2.5 Flash 及业务知识库，并以 Webhook 形式暴露相同工具。',
          },
        },
        deepDiveQuotes: {
          heading: '深度探索：报价子代理',
          body: '它是系统中最关键的部分：所有询价都经过这里。使用 GPT-4.1 mini 确保结构化输出的精准性。',
          challenge: {
            heading: '挑战：从自由文本到结构化报价',
            body: '客户输入很随意。子代理必须实时将自然语言连接到 Airtable 数据库。',
          },
          cleanModel: {
            heading: 'CleanModel：编码隐性知识',
            body: '客户不会按数据库格式输入型号。技术员能凭经验识别，但系统需要专门设计。CleanModel 负责规范化输入以支持模糊匹配。',
            insight: '这体现了构建代理需要理解业务领域，而不仅仅是连接 API。',
          },
          aiAgent: {
            heading: 'AI 代理 —— GPT-4.1 mini',
            body: '核心大脑。系统提示词设定了极窄的服务范围。包含 Think 工具用于显式推理。',
            tools: [
              {
                label: '查找型号',
                detail: '在 Airtable 型号表中查找 → 返回 ID、名称、URL。',
              },
              {
                label: '查找维修项',
                detail: '根据型号 ID 查找 → 返回价格、库存及约时间信息。',
              },
              {
                label: '结构化输出解析器',
                detail: '将结果格式化为预定义的 JSON Schema。',
              },
            ],
            fallback: '未找到匹配时，模仿资深技术员的逻辑进行引导。',
          },
          filtrarRespuesta: {
            heading: '过滤响应：确定性后处理',
            body: '代码节点负责校验及清理 AI 代理的回答。根据库存状态应用三条删除字段的路径，确保 router 收到的是最精准的数据。',
          },
          punchline: '结果：客户咨询维修价格，4 秒内即可获得真实价格、库存状态及直接预约链接。',
          presupuestoPrompt: {
            heading: '报价子代理系统提示词',
            body: '定义了三项工具及一个 4 步走的流程，用于返回带库存状态的结构化报价。',
            segments: [
              {
                code: `## 角色
你是 Xueyifan iRepair 的报价子代理。你的工作是：接收型号及维修项，在 Airtable 中查找并返回结构化报价。`,
                annotations: [
                  {
                    label: '限定责任',
                    detail: '消除 LLM 闲聊或提供非请求上下文的倾向。',
                  },
                ],
              },
              {
                code: `## 目标
在数据库中查找型号。返回价格、货况及建议的后续步骤。`,
                annotations: [
                  {
                    label: '单一职责目标',
                    detail: '让主路由器能根据“建议步骤”直接决策。',
                  },
                ],
              },
            ],
          },
        },
        deepDiveOthers: {
          heading: '深度探索：辅助工具',
          body: '并非所有部分都需要 LLM。这三个工具是轻量级的工作流，设计简单。',
          orders: {
            heading: '紧急订购 (hacerPedido)',
            body: '缺货时，router 调用此工具在 Airtable “订单表”中创建记录，以便团队处理。',
            nodes: 'Webhook → Airtable 创建 → 响应',
            details: [
              '自动标记为“紧急”，因为客户正在等待',
              '关联零件和型号 ID 以实现完整可追溯性',
              '团队在 Airtable 视图中即可收到，无需人工干预',
            ],
          },
          calculator: {
            heading: '折扣计算器',
            body: '纯业务逻辑。客户需要多项维修时，计算器自动应用阶梯折扣。',
            nodes: 'Webhook → 代码 (折扣逻辑) → 响应',
            details: [
              '价格从高到低排序：最贵的一项不打折',
              '阶梯折扣：≤50€ 减 15€, ≤100€ 减 20€, >100€ 减 25€',
              '客户能立即看到打包维修省了多少钱',
            ],
            segments: [
              {
                code: `// 折扣规则作为代码而非提示词
const descuentos = ordenados.map((precio, idx) => {
    if (idx === 0) return 0;
    if (precio <= 50)  return 15;
    if (precio <= 100) return 20;
    return 25;
});`,
                annotations: [
                  {
                    label: '确定性保障',
                    detail: '这确保了价格计算 100% 准确，无幻觉。',
                  },
                ],
              },
            ],
          },
          hitl: {
            heading: '转接人工 (HITL Handoff)',
            body: '系统的安全阀。无法解决时，带着完整上下文通过 Slack 呼叫人工。',
            nodes: 'Webhook → Slack → 响应',
            details: [
              '在 Slack #chat 频道发送带摘要的消息',
              '包含 WATI 深度链接，人工点击即达对话现场',
              'Jacobo 告知客户将由同事跟进',
            ],
          },
          whatsapp: {
            heading: '跨渠道发送信息 (EnviarMensajeWati)',
            body: '连接不同渠道。当客户在打电话时，此工作流并行发送 WhatsApp 链接。',
            nodes: 'Webhook → WATI API → 响应',
            details: [
              '发送带个性化预约 URL 的模板',
              '通话结束时，信息已静静躺在客户手机里',
            ],
          },
        },
      },
      cta: {
        heading: '在寻找能为贵公司构建此类系统的人才？',
        body: 'Jacobo 能在 30 秒内处理预约、查询库存并完成背景转接。其模式可广泛应用于旅游、金融、医疗或电商领域。',
        label: 'LinkedIn',
        labelSecondary: '邮箱',
      },
      ctaAfterEnterprise: {
        heading: '这些模式已做好规模化准备。我也是。',
      },
      ctaAfterDownloads: {
        heading: '如果您喜欢这些工作流，想象一下我能为您做些什么。',
      },
      faq: {
        heading: '常见问题',
        items: [
          {
            q: '构建 WhatsApp AI 代理需要多少钱？',
            a: '工具总成本每月不到 200 欧元。主要成本在于架构设计和开发时间。相比兼职客服，其成本仅为一小部分。',
          },
          {
            q: '如果 AI 报错价格怎么办？',
            a: '价格源自 Airtable 而非 LLM。它是实时同步的，结构化数据不存在幻觉可能。',
          },
          {
            q: '语音代理是如何工作的？',
            a: '它集成在 Aircall 总机中。客户拨打固话即可与 Jacobo 交谈，它复用了 WhatsApp 相同的 Webhook 子代理。',
          },
          {
            q: '为什么用 n8n 而非直接写 Python 脚本？',
            a: 'n8n 提供了可视化和低维护门槛。对于复杂的 7 个工作流系统，可视化是一种优势。',
          },
          {
            q: 'Jacobo 还在运行吗？',
            a: '是的。它已随业务一同售出，目前仍在为新房主服务。这是对系统稳定性的最好验证。',
          },
        ],
      },
      resources: {
        heading: '资源',
        items: [
          { label: 'n8n · 工作流自动化', url: 'https://n8n.io' },
          { label: 'OpenRouter · 模型网关', url: 'https://openrouter.ai' },
          { label: 'ElevenLabs · 对话式 AI', url: 'https://elevenlabs.io' },
          { label: 'WATI · WhatsApp API', url: 'https://www.wati.io' },
          { label: 'Airtable · 数据平台', url: 'https://airtable.com' },
        ],
      },
      downloads: {
        badge: '7 个生产环境工作流可供下载。默认开源',
        inlineLabel: '在 GitHub 查看',
        inlineHint: '一键导入 n8n',
        section: {
          heading: '亲自动手试一试',
          intro: '这些是运行了两年的真实生产工作流。已脱敏、带注释，准备好导入 n8n。',
          downloadAllLabel: '全部下载 (ZIP)',
          downloadAllSize: '~37 KB',
          importHeading: '如何导入 n8n',
          importSteps: [
            '打开 n8n 实例并转至 Workflows',
            '点击 "..." → "Import from file"',
            '选择下载的 JSON 文件',
            '更新您自己的 API Key 和 Webhook 等凭据',
          ],
        },
        workflows: [
          {
            id: 'jacobo-chatbot-v2',
            icon: '🧭',
            name: 'Jacobo Chatbot V2',
            subtitle: '核心路由器',
            description: 'WhatsApp 渠道的大脑。意图分类、选择子代理并维护记忆窗口。',
            href: 'https://github.com/xueyifan/jacobo-workflows/blob/main/jacobo-chatbot-v2.json',
            fileSize: '~66 KB',
            nodes: '37 个节点',
            llm: 'GPT-4.1',
          },
          {
            id: 'subagente-citas',
            icon: '📅',
            name: 'subagenteCitas',
            subtitle: '预约子代理',
            description: '解析自然语言时间偏好并确认预约。',
            href: 'https://github.com/xueyifan/jacobo-workflows/blob/main/subagente-citas.json',
            fileSize: '~24 KB',
            nodes: '18 个节点',
            llm: 'MiniMax M2.5',
          },
        ],
        githubNote: '所有工作流都在 GitHub 上：欢迎 Fork、Star 或直接下载。',
        githubCta: '在 GitHub 查看仓库',
      },
      footer: {
        role: 'AI 产品经理 · 解决方案架构师',
        bio: '2025 年售出了一家 16 年历史的业务。现在将系统思维应用于企业级 AI。',
        fellowAt: '助教于',
        fellowLink: 'AI 产品学院',
        copyright: '版权所有。',
      },
    },
    en: {
      slug: 'ai-agent-jacobo',
      altSlug: 'agente-ia-jacobo',
      readingTime: '35 min read',
      seo: {
        title: 'Jacobo: Multi-Agent AI with Tool Calling & Voice AI — Production Case Study | xueyifan.io',
        description: 'Case study: how an FDE built an omnichannel AI agent with sub-agents, tool calling, HITL, and Voice AI (n8n + ElevenLabs) achieving 90% self-service. Downloadable workflows.',
      },
      nav: {
        breadcrumbHome: 'Home',
        breadcrumbCurrent: 'AI Agent Jacobo',
      },
      header: {
        kicker: 'Case Study: Xueyifan iRepair (Google it — still operating today)',
        h1: 'Jacobo: Multi-Agent AI with Sub-Agent Orchestration & Tool Calling',
        subtitle: 'How I built an AI agent that handles WhatsApp and landline calls, orchestrates specialized sub-agents via webhooks, and achieves ~90% self-service at a phone repair business.',
        badge: 'Sold with the business in 2025 — still running in production today',
        date: 'Feb 25, 2026',
      },
      heroMetrics: [
        {
          value: '~90%',
          label: 'Self-service',
        },
        {
          value: '~80h/mo',
          label: 'Automated',
        },
        {
          value: '<30s',
          label: 'Response',
        },
        {
          value: '<€200',
          label: 'Cost/mo',
        },
        {
          value: '24/7',
          label: 'Available',
        },
      ],
      tldr: 'A multi-agent AI system that handles ~90% of customer queries without human intervention, 24/7, for <€200/month. 4 agents + 3 tools, dual-channel (WhatsApp + landline). Built in <1 month on top of a 5-year Business OS. Sold with the business in 2025. All 7 n8n workflows are downloadable at the end.',
      intro: {
        hook: '~15 interruptions per day. Each one, a repair on hold. Every unanswered WhatsApp, a customer walking to the competition. I built an AI agent that handles both — ~90% of interactions, 24/7, for less than €200/month.',
        body: 'Not a chatbot with canned responses. An agent that checks real prices, verifies stock, books appointments, and knows when to loop in a human with full context. That\'s what Jacobo became. In this article I share the complete architecture and the production workflows so you can replicate it.',
      },
      internalLinks: {
        businessOs: {
          text: 'Business OS — Case Study',
          href: '/business-os-for-airtable',
        },
        pseo: {
          text: 'Programmatic SEO — Case Study',
          href: '/programmatic-seo',
        },
        careerOps: {
          text: 'Career-Ops: AI Job Search Multi-Agent | Case Study',
          href: '/career-ops-system',
        },
      },
      sections: {
        theProblem: {
          heading: 'The Problem',
          body: 'With 30,000+ repairs completed and multiple support channels (phone, WhatsApp, web), the bottleneck was clear:',
          painPoints: [
            '80% of inquiries were repetitive: prices, appointments, repair status',
            'Every inquiry pulled the technician away from active repairs',
            'Response times swung wildly depending on the day\'s workload',
            'Data lived in three places: Airtable, the calendar, and inventory',
            'Availability stopped at store closing time',
            'Hiring part-time support didn\'t pencil out',
            'Customers reached out via WhatsApp and landline. The solution had to cover both with shared logic, not duplicate the work',
          ],
          alternatives: {
            body: 'The constraints were fixed: Airtable was the brain (the Business OS had been the SSOT for years), I needed real tool calling against live data, and the agent had to cover voice + chat from the same backend. The only open question was which orchestration layer to use:',
            items: [
              {
                tool: 'Tidio / Intercom',
                issue: 'Generalist chatbots with decision trees. Can\'t check stock in real time or calculate dynamic pricing against Airtable. For a repair business, they\'re little more than an interactive FAQ.',
              },
              {
                tool: 'ManyChat (WhatsApp)',
                issue: 'Good for marketing flows, but no tool calling capability against an existing ERP. Can\'t verify stock, create work orders, or do context-rich handoff.',
              },
              {
                tool: 'Vertical solution (RepairDesk chat)',
                issue: 'No repair SaaS offered a conversational agent with natural language and tool calling against real-time data. The ones with chat were essentially forms in disguise.',
              },
            ],
            punchline: 'n8n was the natural fit: workflow orchestration with webhooks, native LLM agent support with tool calling, and the ability to deploy each sub-agent as an independent, testable workflow. All wired into the Business OS already running in Airtable.',
          },
        },
        architecture: {
          heading: 'The Architecture',
          body: 'Jacobo isn\'t a chatbot with a long prompt. It\'s a system of specialized sub-agents, each deployed as an independent webhook in n8n, orchestrated via tool calling from a central router. Every workflow in this article is importable directly into n8n — grab them at the end.',
          whySubAgents: {
            heading: 'Why sub-agents instead of a monolithic prompt?',
            reasons: [
              {
                title: 'Testability',
                detail: 'Each sub-agent has its own webhook. I can test it in isolation with an HTTP call, without spinning up the entire system.',
              },
              {
                title: 'Independent evolution',
                detail: 'Changing discount logic can\'t break appointments. I can iterate on one domain without risking another.',
              },
              {
                title: 'Cost efficiency',
                detail: 'Not every sub-agent needs the same model. Appointments runs on MiniMax M2.5 (fast and cheap for parsing time preferences). Quotes runs on GPT-4.1 mini (precision for structured output). Right-sized models per task.',
              },
              {
                title: 'Platform-agnostic',
                detail: 'Sub-agents are just webhooks. They don\'t know whether n8n (WhatsApp) or ElevenLabs (voice) is calling them. Any orchestrator can reuse them without duplicating logic.',
              },
            ],
          },
          agentsHeading: '4 Agents & 3 Tools to Rule Them All',
          agentsBody: '4 agents with their own LLM make decisions. 3 tools with no LLM execute pure business logic. All connected via webhooks.',
          toolsLabel: 'Tools (no LLM)',
          agents: [
            {
              kind: 'agent',
              icon: '🧭',
              name: 'Main Router (n8n)',
              desc: 'The brain of the WhatsApp channel. Classifies intent, picks the right sub-agent, and keeps track of the conversation with a 20-message memory window.',
              details: [
                'GPT-4.1 via OpenRouter · 37 nodes',
                'LangChain Agent pattern with 7 tools as HTTP endpoints',
                'Think tool for internal reasoning before complex chains',
                'Pseudo-streaming: splits responses into sentences, sends them one by one via WhatsApp',
              ],
            },
            {
              kind: 'agent',
              icon: '🎙️',
              name: 'Voice Router (ElevenLabs)',
              desc: 'The brain of the voice channel. Receives calls via Aircall → Twilio → ElevenLabs Conversational AI, with its own system prompt optimized for spoken conversation.',
              details: [
                'ElevenLabs Conversational AI · GPT-4o',
                'Same sub-agents as the Main Router, connected as HTTP tools',
                'Native RAG out-of-the-box: knowledge base with repair catalog, pricing and FAQs',
                'Voice-optimized latency: short, direct responses',
                'Business hours detection to transfer to a human outside hours',
              ],
            },
            {
              kind: 'agent',
              icon: '📅',
              name: 'Appointments Sub-agent',
              desc: 'Turns "tomorrow morning" into a confirmed booking. Parses natural language time preferences, checks YouCanBookMe for available slots, and sends a WhatsApp confirmation template.',
              details: [
                'MiniMax M2.5 via OpenRouter · 18 nodes',
                '15 temporal parsing rules: from "after lunch" to "any day except Monday"',
                'The most sophisticated sub-agent in the system',
              ],
            },
            {
              kind: 'agent',
              icon: '💰',
              name: 'Quotes Sub-agent',
              desc: 'Every price inquiry flows through here. Looks up the exact model and repair in Airtable, returns real pricing with stock status, and decides the next step.',
              details: [
                'GPT-4.1 mini via OpenRouter · 11 nodes',
                'Stock available? → offer appointment',
                'Out of stock? → offer order',
                'No listing? → link to the quote form',
              ],
            },
            {
              kind: 'tool',
              icon: '📦',
              name: 'Orders',
              desc: 'Creates repair orders in Airtable when a part is out of stock.',
              details: [
                '3 nodes: webhook → create record → respond',
                'Simple by design: all validation happened upstream in Quotes',
              ],
            },
            {
              kind: 'tool',
              icon: '🧮',
              name: 'Discount Calculator',
              desc: 'Pure business logic, no LLM. Calculates combo discounts when customers bundle multiple repairs.',
              details: [
                '3 nodes · no LLM',
                'Battery + screen + back glass = automatic multi-repair pricing',
                'Discount rules live here, not scattered across prompts',
              ],
            },
            {
              kind: 'tool',
              icon: '🙋',
              name: 'HITL Handoff',
              desc: 'The escape valve. Escalates to a human via Slack with a deep-link straight into the WATI conversation.',
              details: [
                '5 nodes · posts to #chat',
                'Includes conversation summary, detected intent, and customer history',
                'Human gets full context before opening the chat',
              ],
            },
          ],
          memory: {
            heading: 'Conversational Memory',
            body: 'Jacobo holds no state between messages. On every new message, it rebuilds context by reading the actual conversation history from WATI:',
            steps: [
              {
                label: 'Already served?',
                detail: 'A switch checks whether an active session exists for this phone number. If not, it triggers a memory reload.',
              },
              {
                label: 'WATI fetch',
                detail: 'HTTP call to getMessages/{waId} with pageSize=80. Retrieves the last 80 messages from the full conversation: customer messages, Jacobo responses, templates, broadcasts, and human operator messages.',
              },
              {
                label: '3-phase parsing',
                detail: 'Three code nodes transform raw WATI events into {human, ai} pairs compatible with LangChain. Filters out broadcasts, confirmation templates, and system events. A __reloadFlag__ allows manual memory resets.',
              },
              {
                label: 'Buffer Window',
                detail: 'The last 20 messages are loaded into the LangChain BufferWindow, keyed by phone number. The agent "remembers" past conversations: if you confirmed an appointment yesterday, Jacobo knows today.',
              },
            ],
            punchline: 'This is what lets Jacobo pick up interrupted conversations, recognize returning customers, and know when a human stepped in earlier.',
          },
          debugTools: {
            heading: 'Production debug tools',
            body: 'Two hidden commands to debug memory in production without touching n8n. "Borrar memoria" reset the customer\'s buffer, useful when a conversation got corrupted or the LLM entered a loop. "HISTORIAL" dumped the raw buffer JSON — and that\'s what taught us to sanitize responses: the LLM returned the full JSON to the customer if left unfiltered.',
          },
          pseudoStreaming: {
            heading: 'Pseudo-Streaming on WhatsApp',
            body: 'WhatsApp doesn\'t support streaming. A wall of text feels like a bot; sequential messages feel like someone typing. The router splits each response on line breaks and sends each chunk with a 1-second delay via the WATI API. Result: the "typing..." experience with zero streaming infrastructure.',
          },
          stackIntro: 'Jacobo runs on 8 services, end-to-end from first contact to human handoff. Every one is load-bearing — swap any of them and you\'re rearchitecting.',
          stack: [
            {
              name: 'WATI',
              role: 'WhatsApp Business API — primary inbound channel',
            },
            {
              name: 'Aircall',
              role: 'Cloud PBX — Jacobo as a teammate on the phone system',
            },
            {
              name: 'n8n',
              role: 'Workflow orchestration and sub-agents (7 workflows, ~80 nodes)',
            },
            {
              name: 'OpenRouter',
              role: 'Model-agnostic LLM gateway (MiniMax M2.5 + GPT-4.1)',
            },
            {
              name: 'ElevenLabs',
              role: 'Conversational voice agent (eleven_flash_v2_5, temp 0.0)',
            },
            {
              name: 'Airtable',
              role: 'CRM, inventory, customer history (source of truth)',
            },
            {
              name: 'YouCanBookMe',
              role: 'Appointment scheduling and availability',
            },
            {
              name: 'Slack',
              role: 'HITL escalation channel (#chat)',
            },
          ],
        },
        e2eFlows: {
          heading: 'End-to-End Flows',
          body: 'Each flow walks the happy path from inquiry to resolution, with the sub-agents involved called out at each step.',
          items: [
            {
              icon: '🔧',
              name: 'Repair Appointment',
              trigger: 'Customer asks about a repair',
              summary: 'From inquiry to confirmed appointment with reserved parts, zero human intervention.',
              agentsTouched: [
                'Router',
                'Quotes',
                'Appointments',
              ],
              details: [
                'Customer writes on WhatsApp: "Hi, how much does it cost to replace an iPhone 14 Pro screen?"',
                'Router classifies intent as price inquiry → delegates to Quotes sub-agent',
                'Quotes searches Airtable: model + repair type → returns real price (€189), part availability and estimated time (45-60 min)',
                'Stock available → Jacobo responds with price and asks: "Want to book an appointment?"',
                'Customer says "Yes, tomorrow morning" → Router delegates to Appointments sub-agent',
                'Appointments parses the time preference, queries YouCanBookMe → offers slots: "10:00 and 11:30"',
                'Customer confirms → appointment created in YouCanBookMe + work order generated in Airtable + parts auto-reserved from inventory',
                'Confirmation sent via WhatsApp with summary: date, time, price, store address',
              ],
            },
            {
              icon: '💬',
              name: 'Price Inquiry',
              trigger: 'Customer asks about repair or product price',
              summary: 'Airtable lookup with real data, CTA adapted based on stock availability.',
              agentsTouched: [
                'Router',
                'Quotes',
              ],
              details: [
                'Customer: "How much to replace a Samsung S23 battery?"',
                'Router classifies intent → delegates to Quotes',
                'GPT-4.1 searches Airtable: exact model + repair type',
                'If in stock → responds with price, time, and offers to book an appointment',
                'If NOT in stock → responds with price, indicates the part needs to be ordered, offers to place the order',
                'If model doesn\'t exist in the database → Jacobo clearly says so instead of making up a price',
                'Stock-aware routing: the CTA changes based on real availability in Airtable',
              ],
            },
            {
              icon: '🙋',
              name: 'Human Escalation (HITL)',
              trigger: 'Unclear intent, warranty, complaint, or explicit request',
              summary: 'Handoff with full context to the human team via Slack. The human doesn\'t start from scratch.',
              agentsTouched: [
                'Router',
                'HITL Handoff',
              ],
              details: [
                'Escalation triggers: detected frustration, out-of-domain query, warranty case, explicit request to speak with a person',
                'Router activates HITL Handoff → sends notification to Slack (#chat)',
                'The Slack message includes: conversation summary, detected intent, customer data from Airtable, escalation reason',
                'Deep-link to WATI: the human clicks and jumps straight into the customer\'s WhatsApp conversation',
                'The human doesn\'t start from scratch: they have full context. Average post-handoff resolution time: seconds, not minutes',
                'Jacobo tells the customer: "I\'m connecting you with a colleague who can help you better with this"',
              ],
            },
          ],
        },
        deepDiveBooking: {
          heading: 'Deep Dive: Natural Language Booking',
          body: 'The appointments sub-agent has one job: turn "tomorrow morning" into a confirmed booking with reserved parts. No forms, no calendar picker.',
          challenge: {
            heading: 'The challenge: bridging two worlds',
            body: 'The customer speaks natural language ("Thursday mid-morning, or else Friday afternoon"). The YouCanBookMe API speaks Unix timestamps. The sub-agent bridges the gap and finds the intersection.',
          },
          parseUrl: {
            heading: 'ParseURL',
            body: 'A Code node that extracts the subdomain from the YouCanBookMe URL to determine which booking profile to use. Parses the query string for dynamic form fields (repair type, customer data). Different calendars for different services: xueyifan-citav2-componentes for component repairs, xueyifan-citav2-diagnostico for diagnostics. The subdomain determines the entire booking flow downstream.',
          },
          analizarDisponibilidad: {
            heading: 'AnalizarDisponibilidad (LLM)',
            body: 'An LLM agent powered by MiniMax M2.5 converts natural language into a structured JSON array: [{date, start, end, exact}]. The system prompt contains 15 temporal parsing rules covering every real-world case. Includes a Structured Output Parser to guarantee valid format and per-session memory (sessionKey = phone/ycbmUrl) so the customer can refine preferences without starting over. If no explicit preference, returns the next 3 business days with full schedule.',
            rules: [
              'Default ranges: "morning" = 10:00-14:00, "afternoon" = 5:00-9:00pm, "all day" = 10:00-21:00',
              'Plurals: "mornings" → next 3 business mornings',
              'Explicit ranges: "10 to 12" → start=10:00, end=12:00, exact=true',
              'Conditionals: "or else Friday" → adds Friday as alternative range',
              'Rounding: 10:15 → 10:00-11:00 (1-hour block)',
              'Filters weekends automatically (Mon-Fri only)',
              '"Mid-morning" = 11:00-13:00, "first thing" = 10:00-11:00',
              '"After lunch" = 17:00-19:00',
              'Today only included if ≥2 hours of business hours remain',
              'Relative dates: "day after tomorrow", "next Tuesday" → resolved to absolute date',
            ],
          },
          ycbmApi: {
            heading: 'YCBM API (3 calls)',
            body: 'Sequential pipeline of 3 HTTP Requests against the YouCanBookMe API. Each call depends on the previous one — no parallelization possible:',
            steps: [
              { label: 'POST /v1/intents', detail: 'Sends the subdomain → creates a booking intent and returns a unique ID' },
              { label: 'GET /v1/intents/{id}/availabilitykey', detail: 'With the intent ID → retrieves the availability key' },
              { label: 'GET /v1/availabilities/{key}', detail: 'With the key → fetches all real available slots with Unix timestamps' },
            ],
          },
          filterSlots: {
            heading: 'FilterSlots — The Intersection',
            body: 'A pure Code node performing set intersection: LLM ranges × real YCBM slots. Converts Unix timestamps to Europe/Madrid using Intl.DateTimeFormat, then filters: localDate === r.date && localTime >= r.start && localTime < r.end. Output is an array [{date, timestamp, start}] that can contain 0, 1, or N slots. The most elegant node in the workflow: pure set logic, no LLM, no API — just temporal math.',
          },
          autoBooking: {
            heading: 'Conditional Auto-booking',
            body: 'An If node evaluates slots.length and branches into 3 paths. The sub-agent has its own per-session memory: the customer can refine ("no, Thursday instead") without starting over.',
            paths: [
              { condition: 'Exactly 1 slot', action: 'Auto-confirms (zero friction): preparePatchBody builds form data with email, phone, dynamic queryVars, and comments → emailCheck verifies email exists → patchSelections (PATCH /v1/intents/{id}/selections) → patchConfirm (PATCH /v1/intents/{id}/confirm) → confirmarCita informs the customer' },
              { condition: 'Multiple slots', action: 'escogerHora groups slots by date and presents options to the customer with contextual instructions' },
              { condition: '0 slots', action: 'Informs no availability in that range and asks for another time preference' },
            ],
          },
          punchline: 'The result: a customer writes "tomorrow mid-morning" and 3 seconds later has a confirmed appointment with reserved parts. No forms, no date picker, no friction. This is the difference between "I built a chatbot" and "I designed a system that translates human intent into API actions."',
        },
        toolCalling: {
          heading: 'Tool Calling in Production',
          body: 'Jacobo doesn\'t make up answers from training data. Every response is grounded in real systems via 7 tools defined as HTTP endpoints:',
          tools: [
            {
              name: 'presupuestoModelo',
              desc: 'Looks up repair/accessory prices and stock in Airtable. LLM: GPT-4.1 for structured output precision.',
            },
            {
              name: 'subagenteCitas',
              desc: 'Manages availability and bookings via YouCanBookMe. The LLM parses temporal preferences from natural language.',
            },
            {
              name: 'hacerPedido',
              desc: 'Creates repair/purchase orders in Airtable. 3 nodes: webhook → create record → respond.',
            },
            {
              name: 'Calculadora',
              desc: 'Volume discount: more repairs together = bigger discount. Pure business logic, no LLM.',
            },
            {
              name: 'contactarAgenteHumano',
              desc: 'HITL escalation via Slack with escalation reason, deep-link to WATI, and full context. Works from both WhatsApp and phone calls.',
            },
            {
              name: 'enviarMensajeWati',
              desc: 'Sends information via WhatsApp in parallel. When the voice agent needed to send a link or quote, it did so via WhatsApp while still talking on the phone.',
            },
            {
              name: 'Think',
              desc: 'Internal reasoning meta-tool. The agent "thinks out loud" before multi-tool chains to reduce errors.',
            },
          ],
          waitMessage: {
            heading: 'mensajeConsulta: UX while thinking',
            body: 'When Jacobo calls presupuestoModelo (1-3s latency), it fires mensajeConsulta first: an "I\'m checking availability..." that lands before the sub-agent responds. Without it, customers saw 5 seconds of dead air and assumed the bot was broken. One UX detail, massive difference.',
          },
          thinkTool: {
            heading: 'The "Think" Tool',
            body: 'Before executing a tool chain (check price → verify stock → offer appointment), the agent invokes Think to plan the sequence. Explicit reasoning before action cuts errors in multi-tool chains significantly.',
          },
          stockAware: {
            heading: 'Stock-Aware Routing',
            body: 'presupuestoModelo\'s output determines what happens next. It\'s not a fixed flow: the CTA adapts to real-time availability.',
            flows: [
              {
                condition: 'Part in stock',
                action: '→ Offers to book a repair appointment',
              },
              {
                condition: 'Part out of stock',
                action: '→ Offers to place an order with supplier ETA',
              },
              {
                condition: 'Model not found',
                action: '→ Clearly states it and offers human contact',
              },
            ],
          },
        },
        channels: {
          heading: 'The Two Channels',
          body: 'Jacobo runs on two channels simultaneously. The key: both share the same sub-agent webhooks. Business logic written once, served everywhere.',
          whatsapp: {
            name: 'WhatsApp (highest volume)',
            detail: 'WATI as WhatsApp Business API + n8n as orchestrator. 70% of queries flow through here.',
            highlights: [
              'n8n router with LangChain Agent pattern: 37 nodes, 7 tools as HTTP endpoints, GPT-4.1 via OpenRouter',
              'Meta-approved WhatsApp templates for appointment confirmations, order tracking and notifications',
              'Pseudo-streaming: splits the response into sentences and sends them one by one. The customer sees Jacobo "typing" like a real person',
              'Memory: 20 messages per session, keyed by phone number. Rebuilds context by reading full conversation history from WATI',
              'Event Routing: 3 switches filter noise (system events, broadcasts, human operator messages) before reaching the agent',
              'Transparent Human Takeover: when a human takes control via WATI, Jacobo detects the handoff and stays quiet',
            ],
          },
          voice: {
            name: 'Landline (voice)',
            detail: 'Aircall as Cloud PBX + Twilio as phone bridge + ElevenLabs as conversational voice agent. Jacobo sits on the Aircall phone system as a literal "teammate" with its own routing rules.',
            highlights: [
              'Aircall → Twilio → ElevenLabs integration: calls came through the business Aircall PBX. When no one answered or after hours, Aircall redirected to a dedicated Twilio number connected to the ElevenLabs agent. For the customer, it was transparent: they dialed the store landline and talked to Jacobo',
              'The customer called a landline and talked to Jacobo like any other employee. NOT a web widget or an IVR with menus. It was a real phone call with natural voice',
              'High-quality ASR (provider: ElevenLabs, PCM 16kHz) + 7s turn_timeout + 20s silence_end_call to handle natural conversational pauses',
              'LLM: GPT-4.1 (temp 0.0) for maximum precision in voice tool calling. Optimized latency (optimize_streaming_latency: 4)',
              'Voice model: eleven_flash_v2_5, speed 1.2x, stability 0.6, similarity 0.8. Conversations up to 5 minutes (300s)',
              'Knowledge base with 3 sources (Google Maps, Xueyifan iRepair website, business summary) leveraging ElevenLabs\' native RAG (e5_mistral_7b_instruct). Didn\'t build custom RAG: the platform offered it and it was high impact with zero effort. Pure RICE prioritization. n8n didn\'t need it: the WhatsApp agent already accessed business context via direct tool calling to Airtable',
              '5 shared webhook tools with n8n: presupuestoModelo, subagenteCitas, Calculadora, contactarAgenteHumano, and enviarMensajeWati. 20s timeout per tool, immediate execution',
              'enviarMensajeWati was the cross-channel magic: while talking on the phone, Jacobo sent links and quotes via WhatsApp in parallel using the caller_id as a dynamic variable. Customers loved getting the info on their phone while still on the call',
            ],
          },
          cocaColaAnecdote: {
            heading: 'Production incident: the Coca-Cola',
            body: 'A customer was discussing a phone repair. Mid-conversation, he turned to order a Coca-Cola from a waiter. Jacobo heard it — and told him we don\'t serve Coca-Colas.',
            diagnosis: {
              heading: 'Diagnosis: three signals the system ignored',
              items: [
                { label: 'Volume', detail: 'Dropped ~40% — he moved away from the phone' },
                { label: 'Spectral tilt', detail: 'Shifted — off-axis voice loses high frequencies' },
                { label: 'Semantic relevance', detail: '"Coca-Cola" had zero relation to phone repairs' },
              ],
            },
            takeaway: 'Basic VAD isn\'t enough. You need addressee detection: acoustic proximity + prosodic analysis + semantic gating working together.',
          },
          missedCallRecovery: {
            heading: 'Missed Call Recovery',
            body: 'If the customer hung up or no one answered, Aircall fired a webhook to Make.com which triggered a WhatsApp template via WATI with action buttons. A huge chunk of leads came through here: people who called, didn\'t wait, and Jacobo caught them. Since it pulled context from WATI, when they replied it already knew they\'d tried to call.',
          },
          dualOrchestrator: {
            heading: 'Dual-Orchestrator Architecture',
            body: 'This is the key pattern: n8n orchestrates WhatsApp, ElevenLabs orchestrates voice, but both hit the same sub-agent webhooks. A real microservices pattern applied to AI agents. The sub-agents don\'t know who\'s calling them. They don\'t need to.',
          },
          unifiedVoiceUx: {
            heading: 'Unified UX: One Voice',
            body: 'Every PBX audio — welcome greeting, IVR menu, voicemail — was generated with ElevenLabs using Jacobo\'s same voice. When the customer presses 3 or no one can answer and the live agent picks up, the voice is identical. No break. And if no one picks up and Jacobo texts them on WhatsApp after the missed call, the identity stays the same. A unified experience from start to finish, regardless of channel.',
            punchline: '"Press 3 to talk to me, Jacobo." That\'s the PBX introducing the AI agent in first person. The same voice that then picks up. An agent that announces itself.',
            audioIntro: 'Listen to the actual PBX. Jacobo\'s same voice across welcome, IVR menu, and live agent:',
            audios: [
              {
                src: '/jacobo/pbx-welcome.mp3',
                label: 'Welcome',
                transcript: '"We\'ll be right with you. Thank you for calling Xueyifan iRepair. For quality assurance, your call may be recorded."',
                transcriptOriginal: '"A continuación, atenderemos tu llamada. Gracias por llamar a Xueyifan iRepair. Para asegurar la calidad del servicio, tu llamada puede ser grabada."',
              },
              {
                src: '/jacobo/pbx-ivr.mp3',
                label: 'IVR Menu',
                transcript: '"Press 1 for a new repair. Press 2 to check your repair status. Press 3 to talk to me, Jacobo. Your 24/7 virtual assistant at Xueyifan iRepair. Get a quote and book an appointment instantly."',
                transcriptOriginal: '"Marca 1 para solicitar una nueva reparación. Marca 2 para consultar el estado de tu reparación. Marca 3 para hablar conmigo, Jacobo. Tu asistente virtual 24/7 en Xueyifan iRepair. Obtendrás presupuesto y cita al instante."',
                highlight: 'Press 3 to talk to me, Jacobo',
              },
            ],
          },
          eventRouting: {
            heading: 'Pre-filtering: Should Jacobo Respond?',
            body: 'Before a message reaches the AI Agent, three switches filter noise and decide who should respond:',
            steps: [
              {
                label: 'Event Type',
                detail: 'Filters only real messages. Ignores system events, delivery confirmations, status updates, and mass broadcasts. Without this, Jacobo would respond to its own confirmation messages.',
              },
              {
                label: 'Who sent it?',
                detail: 'Detects whether the last speaker was the customer or a human operator. When a human takes control of the conversation via the WATI deep-link, their messages arrive as owner: true. Jacobo knows this and doesn\'t interrupt.',
              },
              {
                label: 'Already served?',
                detail: 'Checks for an active session. If a customer replies to a conversation a human was handling, but the store has already closed, Jacobo enters with an empathetic tone: "We closed at noon, but I can help you until we reopen this afternoon." Real graceful degradation.',
              },
            ],
            punchline: 'This 3-node filter is what makes human-agent coexistence work without conflicts. The human can take over anytime. When they\'re gone, Jacobo picks back up with full context.',
          },
        },
        results: {
          heading: 'Results',
          body: 'Production metrics after 6 months live:',
          metrics: [
            {
              value: '~90%',
              label: 'Self-service',
              detail: 'Inquiries resolved without human intervention',
            },
            {
              value: '24/7',
              label: 'Availability',
              detail: 'No longer limited to store hours',
            },
            {
              value: '<30s',
              label: 'Response time',
              detail: 'Vs. minutes when it depended on a person',
            },
            {
              value: '<€200',
              label: 'Monthly cost',
              detail: 'Total infrastructure (n8n + WATI + Aircall + LLMs)',
            },
          ],
          beforeAfter: {
            heading: 'Before vs After',
            items: [
              {
                area: 'Price/stock inquiries',
                before: '~15 interruptions/day to the technician',
                after: 'Jacobo responds with real Airtable data in <30s',
              },
              {
                area: 'Appointment booking',
                before: 'Manual via phone, frequent scheduling errors',
                after: 'Automatic via YouCanBookMe, parts auto-reserved',
              },
              {
                area: 'After hours',
                before: 'Lost inquiries, customers going to competitors',
                after: 'Jacobo handles 24/7 via WhatsApp and landline',
              },
              {
                area: 'Human escalations',
                before: 'Human started from scratch, repeating questions',
                after: 'Handoff with full context, resolution in seconds',
              },
              {
                area: 'Customer support cost',
                before: 'Part-time employee ~€800-1,000/mo',
                after: '<€200/mo total infrastructure',
              },
            ],
          },
          roi: 'The real return isn\'t just the cost saving. It\'s the technician who\'s actually repairing phones instead of answering them, and the appointment that used to fall through the cracks at 10pm — now confirmed automatically.',
          benchmarks: 'Industry benchmark: enterprise contact centers average 20-30% AI resolution rate (Gartner, 2025 AI Customer Service Report). The most advanced virtual assistants achieve 15% (Gartner, 2025 Hype Cycle for Customer Service & Support Technologies). Jacobo hit ~90% in a specialized domain. The difference: domain-specific sub-agents with real-time data access vs generic chatbots.',
          exitNarrative: 'Jacobo is still running 24/7 under new ownership since September 2025. The buyer acquired it operating — the best proof of a system: it runs without its creator. The architecture patterns documented here are the same ones I\'d bring to your team.',
        },
        decisions: {
          heading: 'Architecture Decision Records (ADRs)',
          body: 'The decisions that shaped the system — and why I made each one:',
          items: [
            {
              title: 'Multi-model (GPT-4.1 + MiniMax + GPT-4.1 mini) vs single LLM',
              detail: 'Each component with the right model: GPT-4.1 for the main router and voice agent (precise tool calling), GPT-4.1 mini for quotes (structured output), MiniMax M2.5 for appointments (fast and cheap for parsing time preferences). OpenRouter as gateway allows switching between models without rewriting workflows.',
            },
            {
              title: 'OpenRouter as model-agnostic gateway',
              detail: 'Switch between models without rewriting workflows, automatic fallback if a model is down. We evaluated Claude, GPT-4, MiniMax: chose by use case, not by brand.',
            },
            {
              title: 'n8n vs Make for orchestration',
              detail: 'Each sub-agent is an independent workflow with its own webhook. Make doesn\'t allow this modularity. n8n supports LangChain agent patterns, memory management and native tool calling.',
            },
            {
              title: 'Sub-agents as webhook microservices',
              detail: 'Decoupled, individually testable, independently deployable. The same sub-agent serves WhatsApp (via n8n) and phone (via ElevenLabs) without duplicating code.',
            },
            {
              title: 'Airtable as brain vs database',
              detail: 'The complete Business OS already existed in Airtable (12 bases, 2,100+ fields). Single source of truth for stock, prices and customer history. Build on what already exists, don\'t duplicate.',
            },
            {
              title: 'Memory window: 20 messages per session',
              detail: 'Balance between context and token cost. Sufficient for a repair conversation (95% resolve in <10 messages). Keyed by phone number for continuity.',
            },
            {
              title: 'Think tool for internal reasoning',
              detail: 'Explicit reasoning before multi-tool chains. Reduces errors because the LLM plans the sequence (check price → verify stock → offer appointment) before executing.',
            },
            {
              title: 'HITL via Slack with escalation reason',
              detail: 'The LLM generates the escalation reason and includes it in the Slack message: why human intervention is needed, what it has tried, and what the customer needs. Works identically from WhatsApp (deep-link to WATI) and phone calls. The human knows why they\'re needed before opening the conversation.',
            },
            {
              title: 'WhatsApp first, voice second',
              detail: '70% of volume came through WhatsApp. Starting there maximized impact before expanding to voice. Voice (ElevenLabs + Aircall) reused existing sub-agents without duplicating logic.',
            },
            {
              title: 'Dual-orchestrator with shared sub-agents',
              detail: 'n8n for WhatsApp/web, ElevenLabs for voice. Sub-agents are platform-agnostic webhooks. Reusable by any orchestrator without duplicating logic. A real microservices pattern.',
            },
            {
              title: 'ElevenLabs as "teammate" on Aircall',
              detail: 'Jacobo integrated into PBX with routing rules: picks up on overflow or after hours. The customer calls a landline, transparent experience. eleven_flash_v2_5 with temp 0.0 for maximum consistency.',
            },
            {
              title: 'Aircall → Twilio → ElevenLabs (and the latency trade-off)',
              detail: 'The Aircall PBX → Twilio (phone bridge) → ElevenLabs chain worked, but each hop added latency: ~950-1,500ms mouth-to-ear. Twilio uses G.711 at 8kHz when STT models are optimized for 16kHz, forcing resampling with accuracy loss. Today I\'d choose a direct SIP trunk (Telnyx offers G.722 wideband at native 16kHz and co-located infrastructure with sub-200ms RTT) eliminating the intermediate hop. The platform-agnostic sub-agent design would make this migration straightforward: only the transport changes, not the logic.',
            },
          ],
        },
        platformEvolution: {
          heading: 'Platform Evolution',
          tagline: 'Jacobo wasn\'t a weekend hack. It was the inevitable result of 5 years building a proper Business OS underneath.',
          steps: [
            {
              year: '2019-2024',
              event: 'Business OS as foundation',
              detail: 'Five years building a complete business operating system in Airtable: 12 bases, 2,100+ fields, real-time inventory, CRM with full customer history. Without this clean data layer, any AI agent would just be a generic chatbot making things up.',
            },
            {
              year: 'Jan 2025',
              event: 'Training and deliberate design',
              detail: 'Before writing a line of code, I studied AI agent architectures. I knew I needed tool calling, that Airtable was the SSOT, and that the same backend had to serve both voice and chat.',
            },
            {
              year: 'Feb 2025',
              event: 'First test version (monolithic)',
              detail: 'Tried the single-prompt-with-everything approach. Confirmed what I suspected: a monolithic prompt doesn\'t scale across multiple domains. This test validated the sub-agent-as-webhooks architecture, platform-agnostic by design.',
            },
            {
              year: 'Feb 2025',
              event: 'Definitive multi-agent version',
              detail: 'My first AI agent, shipped to production in under a month. Full sub-agent architecture: each domain in its own workflow with independent webhook, central router with tool calling, multi-model per use case. The speed came from the Business OS already running underneath. Built alongside all other business responsibilities.',
            },
            {
              year: 'Mar 2025',
              event: 'Voice channel (Aircall + Twilio + ElevenLabs)',
              detail: 'Jacobo as a teammate on the Aircall phone system, connected via Twilio to ElevenLabs. Reused existing sub-agents without duplicating logic. Validation of the platform-agnostic design: the webhooks served a second orchestrator without touching a single line.',
            },
            {
              year: 'Sep 2025',
              event: 'Going-concern sale',
              detail: 'Jacobo has been running 24/7 since launch. It was part of the business sale as an operational asset: the buyer acquired it operating. Five years of clean architecture made this exit possible.',
            },
          ],
          bridge: ['Jacobo wasn\'t an experiment.', '16 years building a business with my own hands.', 'Systematize it until it runs {without me}.', 'Jacobo was the piece that {closed the loop}.', 'I sold the business as a going concern.', 'The systems I built still run today — under {new ownership}.'],
          crossLink: {
            text: 'Jacobo was built on top of the Business OS I designed over 5 years — read the full case study →',
            href: '/business-os-for-airtable',
          },
        },
        lessons: {
          heading: 'Lessons Learned',
          items: [
            {
              title: 'Sub-agents > monolithic prompt.',
              detail: 'I tested a single prompt with full context during design and confirmed it doesn\'t scale across domains. The sub-agent architecture was deliberate from the start: each piece testable, iterable, and independent. Changing discounts can\'t break appointments. Microservices logic, applied to AI agents.',
            },
            {
              title: 'HITL isn\'t a fallback, it\'s a feature.',
              detail: 'A well-implemented handoff builds more trust than a bot that tries to handle everything. Customers value a system that knows when they need a person. The trick: the human picks up with full context, not from scratch.',
            },
            {
              title: 'The CRM is the agent\'s brain, not the LLM.',
              detail: 'Jacobo isn\'t smart because of the LLM. It\'s smart because it queries real prices, stock, and customer history in Airtable. Strip away that data and it\'s just another chatbot making things up.',
            },
            {
              title: 'Start with the highest-volume channel.',
              detail: 'WhatsApp carried 70% of volume. Starting there maximized impact. When voice came later, the sub-agents were already battle-tested. We just plugged in a new orchestrator.',
            },
            {
              title: 'Choose models by use case, not by brand.',
              detail: 'GPT-4.1 for router and voice (precise tool calling), GPT-4.1 mini for quotes (structured output), MiniMax M2.5 for appointments (fast and cheap). OpenRouter as gateway lets you swap models without rewriting. More FDE than "I use X for everything."',
            },
            {
              title: 'The Think tool prevents errors in multi-tool chains.',
              detail: 'Before checking price → verifying stock → offering an appointment, the agent makes its plan explicit. One reasoning step cuts errors in the chain. Rubber duck debugging, but for the agent itself.',
            },
          ],
        },
        whatIdDoDifferently: {
          heading: 'What I\'d Do Differently',
          body: 'Jacobo ran in production for months. Here\'s what I\'d change:',
          items: [
            {
              title: 'Structured evaluation from day 1',
              detail: 'I bolted on evals after the system was already in production. Starting over, I\'d define response quality metrics, intent classification accuracy, and HITL rate before v1. Retrofitting observability costs more than building it in from day one.',
            },
            {
              title: 'Direct SIP trunk instead of Aircall → Twilio → ElevenLabs',
              detail: 'The 3-hop chain added ~950-1,500ms mouth-to-ear latency and forced G.711 (8kHz) → 16kHz resampling. A Telnyx SIP trunk direct to ElevenLabs would give native G.722 wideband and sub-200ms RTT. I went with the long chain because Aircall was already contracted. Today I\'d prioritize latency over convenience.',
            },
            {
              title: 'Vector store for memory instead of raw WATI fetch',
              detail: 'Fetching 80 messages from WATI works, but doesn\'t scale for customers with long histories and can\'t do semantic search. A vector store (Pinecone, Qdrant) with conversation embeddings would unlock "remember when you brought the iPhone 12" without loading the full thread.',
            },
          ],
        },
        enterprisePatterns: {
          heading: 'Transferable Enterprise Patterns',
          body: 'Jacobo was built for an SMB. The patterns scale. Here\'s what I shipped vs. what I\'d add at enterprise scale:',
          builtVsEnterprise: [
            {
              pattern: 'Sub-agent routing with tool calling',
              built: 'Router + 7 webhook sub-agents with intent classification and delegation',
              enterprise: 'Add circuit breakers, retry policies and per-sub-agent model fallback',
            },
            {
              pattern: 'Multi-model orchestration',
              built: 'GPT-4.1 (router/voice) + GPT-4.1 mini (quotes) + MiniMax (appointments) via OpenRouter',
              enterprise: 'A/B testing models per sub-agent, canary deployments for new prompt versions',
            },
            {
              pattern: 'HITL framework',
              built: 'Escalation via Slack with full context and deep-link to the conversation',
              enterprise: 'Queue management, SLAs per customer tier, escalation reason analytics',
            },
            {
              pattern: 'Platform-agnostic sub-agents',
              built: 'Shared webhooks between n8n (WhatsApp) and ElevenLabs (voice)',
              enterprise: 'API gateway, rate limiting, authentication, endpoint versioning',
            },
            {
              pattern: 'Observability',
              built: 'n8n logs + Slack alerts',
              enterprise: 'Langfuse/Datadog for traces, latency and per-conversation cost tracking',
            },
            {
              pattern: 'Voice infrastructure',
              built: 'Aircall → Twilio → ElevenLabs: functional, but each hop adds latency (~950-1,500ms mouth-to-ear). Twilio uses G.711 at 8kHz, requiring resampling to 16kHz for STT models, degrading accuracy',
              enterprise: 'Direct SIP trunk (Telnyx/Plivo) → ElevenLabs via SIP, eliminating the Twilio hop. Telnyx offers G.722 wideband at native 16kHz (no resampling) and co-located infrastructure (GPU + telephony in the same PoP) with sub-200ms RTT. For apps/web: direct WebRTC (Opus 16-48kHz) via LiveKit, no PSTN, achieving 300-600ms mouth-to-ear',
            },
          ],
          applicability: {
            heading: 'Industry applicability',
            examples: [
              {
                domain: 'Travel (Hopper, Booking)',
                detail: 'Sub-agents for flights, hotels, insurance. HITL for complex changes. Tool calling against availability APIs.',
              },
              {
                domain: 'Fintech',
                detail: 'Sub-agents for transactions, balance queries, support. Stock-aware routing → balance-aware routing.',
              },
              {
                domain: 'Healthcare',
                detail: 'Sub-agents for appointments, results, triage. HITL as critical feature for specialist referral.',
              },
              {
                domain: 'E-commerce',
                detail: 'Sub-agents for tracking, returns, recommendations. Same inventory lookup and booking patterns.',
              },
              {
                domain: 'Voice AI Platforms',
                detail: 'Conversational agent orchestration with optimized latency. The cross-channel (voice → text) and HITL patterns apply directly to any voice platform.',
              },
              {
                domain: 'Data/AI Platforms',
                detail: 'Tool calling against internal APIs, intent-based sub-agent routing, memory management. The same architecture scales to any agent orchestrator.',
              },
            ],
          },
        },
        promptEngineering: {
          heading: 'Prompt Engineering in Production',
          body: 'No fine-tuning. For a repair shop agent, iterating on the prompt with hard rules is more pragmatic, cheaper, and faster than training a custom model. Every rule below has a production incident behind it.',
          whyNotFineTuning: {
            heading: 'Why hard rules in the prompt instead of fine-tuning?',
            reasons: [
              'Fine-tuning is expensive and slow to iterate. A prompt rule ships in seconds.',
              'The domain changed constantly: prices, stock, hours, promotions. A fine-tuned model goes stale in days.',
              'Rules are auditable. Anyone on the team can read the prompt and understand why Jacobo behaves a certain way.',
              '90% of production errors got fixed by adding one line to the prompt. Not retraining a model.',
            ],
          },
          businessHours: {
            heading: 'Business hours detection',
            body: 'A JavaScript code node checked whether the store was open before each conversation. The result got injected as a dynamic variable into the prompt: when `isBH` was false, Jacobo shifted tone ("after hours I\'ll try to help you anyway") and stopped promising immediate human responses.',
            code: `const madridTime = new Date().toLocaleString('en-US', {
  timeZone: 'Europe/Madrid',
});
const madridDate = new Date(madridTime);
const day  = madridDate.getDay();   // 0=Sunday … 6=Saturday
const hour = madridDate.getHours();

const isBH = day >= 1 && day <= 5 &&
             ((hour >= 10 && hour < 14) || (hour >= 17 && hour < 21));

return [{ json: { isBH } }];`,
          },
          mainPrompt: {
            heading: 'Main router system prompt (n8n)',
            body: 'Simplified version of the production prompt. The original has 18 rules and additional variables. Each block here reflects a deliberate prompt engineering technique.',
            segments: [
              {
                code: `## ROL
Te llamas Jacobo y trabajas en Xueyifan iRepair, tienda de reparación
de móviles, tablets, smartwatches en Sevilla. Eres un experto comercial
y en electrónica, que sabe diagnosticar los problemas que tienen los
usuarios en sus dispositivos móviles.`,
                annotations: [
                  {
                    label: 'Role prompting + persona',
                    detail: 'Defining ROL, name, company, and domain of expertise constrains the response space. Without this, the LLM wanders or invents services we don\'t offer.',
                  },
                ],
              },
              {
                code: `HorarioComercial={{ \$('isBH').item.json.isBH }}
- Si false → la tienda está cerrada: informa con amabilidad
- Si true → responde con normalidad y ofrece ayuda inmediata`,
                annotations: [
                  {
                    label: 'Dynamic variable injection',
                    detail: 'HorarioComercial is injected as a workflow variable. The prompt changes behavior without changing the prompt: a business decision (opening hours) controls the agent\'s tone.',
                  },
                ],
              },
              {
                code: `## Objetivo
Identificar modelo + avería → consultar stock → conversión hacia cita,
pedido o presupuesto.`,
                annotations: [
                  {
                    label: 'Conversion-oriented objective',
                    detail: 'The explicit goal ("conversion towards appointment, order, or quote") prevents the LLM from staying in technical chat without advancing. Without this, Jacobo would explain chip differences for minutes.',
                  },
                ],
              },
              {
                code: `Si el dispositivo no es móvil, tablet o
smartwatch, dar ayuda general pero no invitar a dejarlo en tienda.`,
                annotations: [
                  {
                    label: 'Scope limiting',
                    detail: 'Limits scope without rejecting the customer: the agent remains useful outside its domain but doesn\'t make promises.',
                  },
                ],
              },
              {
                code: `## Instrucciones
1. Identificar modelo y síntomas → llamar a "presupuestoModelo"
2. Si varias reparaciones → llamar a "Calculadora" (array de precios)
3. Tras respuesta de presupuestoModelo:
   3.1 Hay stock → ofrecer cita vía "subagenteCitas" con urlCita
   3.2 No hay stock → ofrecer pedido urgente vía "hacerPedido"
   3.3 No hay presupuesto → facilitar urlPresupuesto

## Herramientas
- "mensajeConsulta": mensaje de espera antes de consultar precio
- "presupuestoModelo": lookup de modelo + avería en Airtable
- "contactarAgenteHumano": escalado HITL vía Slack
- "Think": razonamiento interno antes de tool calls complejos
- "Calculadora": descuento multi-reparación
- "subagenteCitas": gestión de citas vía YouCanBookMe
- "hacerPedido": crear pedido en Airtable cuando no hay stock`,
                annotations: [
                  {
                    label: 'Tool definitions as contract',
                    detail: 'Each tool documented with its exact function and when to use it. The LLM needs to know what each tool does AND in what order to call them. Without the contract, it made redundant or misordered tool calls.',
                  },
                ],
              },
              {
                code: `## HARD RULES (nacidas de producción)
1. Siempre llamar a Think antes de responder o pasar datos`,
                annotations: [
                  {
                    label: 'Think tool as forced chain-of-thought',
                    detail: '"Always call Think before responding or passing data" forces explicit reasoning. Without this, the agent would jump straight to tool calls without verifying it had all parameters, causing errors.',
                  },
                ],
              },
              {
                code: `2. No modificar URLs de "presupuestoModelo" (Meta da error)
3. Un solo * para negrita (WhatsApp), no dos **
4. iPhone + Pantalla → ofrecer SIEMPRE opción premium (12 meses
   garantía vs 6). No está en web → derivar a humano si interesa
5. Enlaces planos, sin markdown (Meta rechaza [text](url))
6. Solo llamar a subagenteCitas TRAS presupuestoModelo
7. Diagnóstico: 19€, solo se cobra si no acepta la reparación
8. Correo: contacto@xueyifanirepair.es (no info@)`,
                annotations: [
                  {
                    label: 'Hard rules as production guardrails',
                    detail: 'The rules at the end aren\'t style preferences: they\'re corrections from real errors. Each one has a story behind it (broken URL, confused customer, lost sale). They\'re the equivalent of regression tests, but in the prompt.',
                  },
                ],
              },
              {
                code: `9. No decir "agendar" cita → decir "tomar" cita
10. No recomendar otras tiendas`,
                annotations: [
                  {
                    label: 'Negative prompting',
                    detail: '"Don\'t recommend other shops", "don\'t say agendar", "don\'t modify URLs". Telling the LLM what NOT to do is as important as telling it what to do: models tend to be overly "helpful".',
                  },
                ],
              },
            ],
          },
          voicePrompt: {
            heading: 'Voice agent system prompt (ElevenLabs)',
            body: 'Simplified version of the production voice prompt. Same domain, adapted for phone conversation. It shares the same webhook tools but the flow is more direct.',
            segments: [
              {
                code: `## ROL
Te llamas Jacobo y trabajas en Xueyifan iRepair, tienda de reparación
de móviles, tablets, smartwatches en Sevilla. Sé conciso, amigable y
resolutivo.`,
                annotations: [
                  {
                    label: 'Compact persona for voice',
                    detail: 'The WhatsApp prompt has an extensive ROL with tone rules. In voice, brevity is key: the LLM needs less context to generate short, natural responses. Fewer system tokens = lower first-response latency.',
                  },
                ],
              },
              {
                code: `## Objetivo
Identificar modelo + avería → consultar stock → facilitar enlace.
Solo dar detalles técnicos cuando el cliente no tenga clara la avería.
Objetivo: que el cliente tome cita (si hay stock) o genere pedido.`,
                annotations: [
                  {
                    label: 'Single-line conversion funnel',
                    detail: 'Same funnel as WhatsApp, condensed. In voice, the agent needs to decide fast: the conversation won\'t wait. One line with the full flow (model → stock → link) beats a paragraph.',
                  },
                ],
              },
              {
                code: `## Instrucciones
1. Obtener modelo y avería
2. Indicar que estás haciendo la consulta → llamar a "presupuestoModelo"
3. Enviar "urlXueyifan" vía "EnviarMensajeWati" (WhatsApp en paralelo)
4. Si varias reparaciones → llamar a "Calculadora"
5. Informar precio + disponibilidad + "te he mandado la info por WhatsApp"`,
                annotations: [
                  {
                    label: 'Cross-channel UX',
                    detail: 'Step 3 is the magic: while the customer is still talking on the phone, Jacobo sends them the link via WhatsApp using the caller_id. The customer gets the info on their phone without hanging up. Customers loved it.',
                  },
                ],
              },
              {
                code: `## HARD RULES
1. No modificar URLs de "presupuestoModelo"
2. iPhone + Pantalla → ofrecer opción premium (12 meses garantía)
3. No decir "agendar" → decir "tomar"
4. Cierre 18-22 agosto: si necesitan recoger equipo → mensajería gratis

Número del cliente: {{system__caller_id}}`,
                annotations: [
                  {
                    label: 'Dynamic variable: caller_id',
                    detail: 'ElevenLabs injects {{system__caller_id}} with the incoming call\'s phone number. This is what enables cross-channel: Jacobo uses that number to send WhatsApp messages to the same customer who\'s on the phone.',
                  },
                ],
              },
            ],
          },
          citasPrompt: {
            heading: 'Appointments sub-agent system prompt (n8n)',
            body: '15 temporal parsing rules that convert colloquial phrases into JSON time ranges. This prompt powers the most complex sub-agent in the system: it bridges natural language and the YouCanBookMe API.',
            segments: [
              {
                code: `Eres un micro-servicio que convierte frases de preferencia horaria fecha y hora (español de España)
en un array JSON de rangos.`,
                annotations: [
                  {
                    label: 'Micro-service framing',
                    detail: 'Assigning the LLM the role of "micro-service" instead of "assistant" radically constrains its behavior: no greetings, no explanations, no questions. Just parse and return JSON. Reduces hallucinations to a minimum.',
                  },
                ],
              },
              {
                code: `REGLAS DE NEGOCIO
1. Rangos por defecto:
   – mañana = 10:00-14:00
   – tarde   = 17:00-21:00
   – "todo el día" = 10:00-21:00
2. exact será true solo si el usuario da una hora puntual que termine
   en 00 o 30 (ej. "lunes a las 10" o "martes a las 17:30" pero no
   "miércoles a las 10:15").
   Si menciona un rango ("martes de 10 a 12") ⇒ exact:false.
3. Horas con minutos ≠ 00 ó 30 se redondean:
   - Redondea hacia abajo al múltiplo de 30 min anterior.
   - Crea un rango de 1 hora a partir de esa hora redondeada
     (ej. 10:15 ⇒ 10:00-11:00, exact:true porque era puntual).
4. La fecha actual es {{ \$now.format('yyyy-MM-dd HH:mm') }} (Europe/Madrid).
5. Acepta varias peticiones separadas por "y", comas o punto y coma.`,
                annotations: [
                  {
                    label: 'Domain constraints as rules',
                    detail: 'Business hours, 30-minute slots, rounding logic, and timezone are encoded as explicit rules. Without these, the LLM invented non-existent time ranges or 15-minute slots.',
                  },
                ],
              },
              {
                code: `6. Devuelve EXCLUSIVAMENTE una llamada de función con esta forma:
   {"name":"slots","arguments":{"slots":[
     {"date":"AAAA-MM-DD","start":"HH:mm","end":"HH:mm","exact":true/false}
   ]}}
6.1 Si la frase incluye "mañana" sin especificar parte del día,
    trátalo como «todo el día» de mañana (10:00–21:00).`,
                annotations: [
                  {
                    label: 'Forced structured output',
                    detail: 'Enforcing a specific JSON schema guarantees the output is parseable by the next n8n node. "EXCLUSIVAMENTE" is key: without that word, the LLM would prepend conversational text before the JSON.',
                  },
                ],
              },
              {
                code: `7. PLURAL ("mañanas", "tardes"): devuelve las próximas N=3 franjas.
   Incluye hoy si la franja aún no ha terminado.
8. Solo abre de lunes a viernes. Nunca sábado ni domingo.
9. Conectores condicionales ("o", "o bien", "o si no"):
   preferencias alternativas en el mismo orden.
10. "A partir de [día]": todo el día (10:00-21:00) + N-1 laborables.
11. N=5 por defecto.
12. Día concreto: solo las horas de ese día.
13. "Esta semana": todas las franjas laborables restantes (Lu-Vi).
14. Plurales: próximas 3 franjas.
15. Sin preferencia horaria: próximos 3 days laborables, todo el día.`,
                annotations: [
                  {
                    label: 'Edge case enumeration',
                    detail: 'Each rule (7-15) addresses a real production failure: plurals, conditional connectors, "this week". Without explicitly enumerating each edge case, the LLM interpreted freely and generated incorrect slots.',
                  },
                ],
              },
              {
                code: `# EJEMPLOS
Input: "mañana por la mañana"
→ {"slots":[{"date":"[mañana]","start":"10:00","end":"14:00","exact":false}]}

Input: "martes de 10 a 12 y viernes todo el día"
→ {"slots":[
  {"date":"[martes]","start":"10:00","end":"12:00","exact":false},
  {"date":"[viernes]","start":"10:00","end":"21:00","exact":false}
]}

Input: "lunes a las 10"
→ {"slots":[{"date":"[lunes]","start":"10:00","end":"11:00","exact":true}]}`,
                annotations: [
                  {
                    label: 'Few-shot prompting',
                    detail: '3 input→output examples covering the 3 key scenarios: generic range (exact:false), multi-slot with "y", and exact time (exact:true). Just enough to anchor the format without overfitting behavior.',
                  },
                ],
              },
            ],
          },
          iterationExamples: {
            heading: 'Real iteration examples',
            items: [
              {
                rule: 'Don\'t modify URLs',
                origin: 'Meta rejected messages with concatenated URLs. A customer never received their appointment link because Jacobo merged two URLs into one.',
              },
              {
                rule: 'Single * for bold',
                origin: 'WhatsApp uses *text* for bold. Jacobo used **text** (markdown style) and the customer saw literal asterisks.',
              },
              {
                rule: 'Always offer premium screen for iPhone',
                origin: 'Customers asked after hanging up if there was a better option. High-margin sales were being lost.',
              },
              {
                rule: 'Don\'t say "agendar"',
                origin: 'In Spain, nobody says "agendar una cita" (schedule an appointment). It\'s an anglicism that LLMs use constantly. Customers noticed.',
              },
              {
                rule: 'Plain links, no markdown',
                origin: 'Meta/WhatsApp doesn\'t render [text](url). The customer saw broken text instead of a clickable link.',
              },
              {
                rule: 'Don\'t recommend other shops',
                origin: 'Jacobo recommended a competitor when a customer asked about a service we didn\'t offer. Quick lesson learned.',
              },
              {
                rule: 'Creator attribution as lead gen',
                origin: 'A recruiter asked Jacobo "who designed you?" and it didn\'t know. Now the production prompt includes rules mentioning Yifan as creator with a LinkedIn link. The agent becomes a passive lead generation channel.',
              },
            ],
          },
        },
        mainRouter: {
          heading: 'The Two Brains',
          body: 'Jacobo has two independent routers sharing the same tools and sub-agents. One orchestrates WhatsApp, the other handles voice calls. Same business logic, two completely different interfaces.',
          whatsappRouter: {
            heading: 'WhatsApp Router (n8n)',
            body: 'The text brain: an n8n workflow with 37 nodes that classifies every message, decides which sub-agent to invoke, and orchestrates the response. Tool calling, prompt engineering, and all routing logic live here.',
          },
          voiceRouter: {
            heading: 'Voice Router (ElevenLabs)',
            body: 'The voice brain: a conversational agent on ElevenLabs powered by Gemini 2.5 Flash, knowledge bases with business documentation, and the same tools exposed as webhooks. The customer talks on the phone and Jacobo responds in real time, checking prices, availability and managing appointments — exactly the same as WhatsApp.',
          },
        },
        deepDiveQuotes: {
          heading: 'Deep Dive: Quotes Sub-agent',
          body: 'The quotes sub-agent is the most critical in the system: every price inquiry flows through it. It uses GPT-4.1 mini via OpenRouter for structured output precision. Its response determines the entire flow\'s next step.',
          challenge: {
            heading: 'The challenge: from free text to structured quote',
            body: 'The customer writes "how much to replace the screen on an iPhone 15 Pro Max". The router needs a JSON with price, stock status, appointment and part URLs. The sub-agent bridges natural language with the Airtable database in real time.',
          },
          cleanModel: {
            heading: 'CleanModel — Encoding tacit knowledge',
            body: 'Customers don\'t type model names like a database. They write "iphone 15", "iPhone15 pro max", "ip 15 pro", "I-Phone 15Pro Max". A human technician solved this with experience — they knew "the big black one" was probably a Pro Max. That tacit knowledge gets lost if you don\'t design for it.',
            detail: 'CleanModel normalizes the input: strips spaces, parentheses, hyphens, and lowercases. "iPhone 15 Pro Max" → "iphone15promax". This feeds a SEARCH() lookup in Airtable on the modeloLimpio field (also normalized), enabling fuzzy matching without relying on exact spelling.',
            insight: 'This node encodes tacit business knowledge. Without it, the agent would fail on most real inputs — because customers don\'t talk like databases. It\'s an example of why building agents requires domain understanding, not just connecting APIs.',
          },
          aiAgent: {
            heading: 'AI Agent — GPT-4.1 mini via OpenRouter',
            body: 'The sub-agent\'s brain. System prompt with an ultra-scoped ROLE: "agent specialized in looking up prices". Includes Think tool for explicit reasoning before each tool call and Simple Memory (buffer window) with a static sessionKey.',
            tools: [
              {
                label: 'BuscarModelo',
                detail: 'Searches by modeloLimpio field in the Models table → returns RECORD_ID, Name, URLXueyifanNueva, Cita diagnóstico.',
              },
              {
                label: 'BuscarReparacionesModelo',
                detail: 'Searches by RECORD_ID → returns 20 repair types with "Price, stock & appointment" (original screen, compatible, battery, microphone, speaker, charging port, rear/front camera, etc.).',
              },
              {
                label: 'Structured Output Parser',
                detail: 'Formats to JSON with schema: modelo, reparación, precio, stock, urlXueyifan, urlCita, urlPresupuesto, urlDiagnostico, idPiezaAirtable, idModeloAirtable.',
              },
            ],
            fallback: 'If no match is found, the system prompt instructs: "you must keep narrowing the model to get more results, until you find the right one" — replicating a seasoned technician\'s reasoning.',
          },
          filtrarRespuesta: {
            heading: 'FiltrarRespuesta — Deterministic post-processing',
            body: 'Code node that validates and cleans the AI Agent\'s response before returning it to the router. Validates that urlXueyifan points to the correct domain (if it doesn\'t contain "xueyifanirepair.es" → "NOT AVAILABLE ON WEB YET"). Then applies 3 field-stripping paths based on state:',
            rules: [
              {
                condition: 'stock === true',
                action: 'Strips urlPresupuesto, idPieza, idModelo — customer can book an appointment directly.',
              },
              {
                condition: 'stock === false',
                action: 'Strips urlCita and urlPresupuesto — part needs to be ordered before repair.',
              },
              {
                condition: 'precio === "PRESUPUESTO"',
                action: 'Strips urlCita and idPieza — repair not catalogued, requires manual assessment.',
              },
            ],
          },
          punchline: 'The result: a customer asks "how much to fix my iPhone screen" and in 4 seconds gets a real price, stock availability, and a direct link to book an appointment or place an order. No forms, no "let me transfer you". The sub-agent queries only the essential Airtable fields and returns exactly what the router needs to close the conversion.',
          presupuestoPrompt: {
            heading: 'Quotes sub-agent system prompt (n8n)',
            body: 'The prompt defines three tools (BuscarModelo, BuscarReparacionesModelo, Structured Output Parser) and a 4-step flow to return structured quotes with stock status.',
            segments: [
              {
                code: `## ROL
Eres un sub-agente de presupuestos para Xueyifan iRepair.
Tu trabajo: recibir un modelo y una reparación, buscarlos en Airtable
y devolver un presupuesto estructurado.`,
                annotations: [
                  {
                    label: 'Scoped sub-agent role',
                    detail: 'Not a general assistant: a sub-agent with a single responsibility. The ultra-narrow scope eliminates the LLM\'s temptation to chat, suggest alternatives, or add unsolicited context.',
                  },
                ],
              },
              {
                code: `## OBJETIVO
Buscar el modelo exacto y la reparación solicitada en la base de datos.
Devolver precio, disponibilidad de stock y siguiente paso recomendado.`,
                annotations: [
                  {
                    label: 'Single-responsibility objective',
                    detail: 'One job: look up + return quote. The "recommended next step" (appointment, order, manual quote) lets the main router decide without another LLM call.',
                  },
                ],
              },
              {
                code: `## HERRAMIENTAS
- "BuscarModelo": busca el modelo del dispositivo en Airtable
- "BuscarReparacionesModelo": busca reparaciones disponibles para ese modelo
- "Structured Output Parser": formatea la respuesta en JSON estructurado`,
                annotations: [
                  {
                    label: 'Tool chain pipeline',
                    detail: 'The 3 tools form a sequential pipeline: find model → find repairs → format. The Structured Output Parser at the end guarantees the JSON is consumable by the router without post-processing.',
                  },
                ],
              },
              {
                code: `## PASOS
1. Recibir modeloInput y reparacionInput del router
2. Llamar a BuscarModelo con modeloLimpio
3. Si encuentra el modelo → llamar a BuscarReparacionesModelo
4. Devolver JSON: precio, stock, tiempo estimado, urlCita, urlPresupuesto`,
                annotations: [
                  {
                    label: 'Explicit step sequencing',
                    detail: 'Deterministic step-by-step order. Without this, the LLM would sometimes skip BuscarModelo and try to guess the price. Each step conditions the next: zero ambiguity about what to do.',
                  },
                ],
              },
              {
                code: `// User message template (n8n injects the variables)
Modelo: {{ \$json.modeloInput }}
Modelo limpio: {{ \$json.modeloLimpio }}
Reparación: {{ \$json.reparacionInput }}`,
                annotations: [
                  {
                    label: 'Variable injection via template',
                    detail: 'n8n injects modeloInput (what the customer said), modeloLimpio (normalized by the router), and reparacionInput. Separating raw/clean input lets the sub-agent search with the normalized name without losing the customer\'s original context.',
                  },
                ],
              },
            ],
          },
        },
        deepDiveOthers: {
          heading: 'Deep Dive: Tools',
          body: 'Not every piece of the system needs an LLM. These three tools are lightweight workflows that each execute a single operation, simple by design: decision logic lives in the router.',
          orders: {
            heading: 'hacerPedido: Rush Orders',
            body: 'When the quotes sub-agent detects the part is out of stock, the router invokes hacerPedido. The workflow creates a record in the Airtable "Pedidos" table with everything the team needs to order from the supplier.',
            nodes: 'Webhook → Airtable Create (Pedidos table) → Respond to Webhook',
            details: [
              'Automatically flags "Rush? = YES" because the customer is waiting',
              'Links idPieza and idModelo for full traceability in the Business OS',
              'Adds note "Automated order by Jacobo" + customer comment',
              'The team receives the order in their Airtable view with zero manual intervention',
            ],
          },
          calculator: {
            heading: 'Discount Calculator',
            body: 'Pure business logic, zero LLM. When the customer needs multiple repairs (e.g., screen + battery + back glass), the router sends a price array and the calculator applies tiered discounts automatically.',
            nodes: 'Webhook → Code (discount logic) → Response',
            details: [
              'Sorts prices high-to-low: the most expensive repair gets no discount',
              'Position-based discount: ≤€50 → €15 off, ≤€100 → €20 off, >€100 → €25 off',
              'Returns formatted summary: price without discount, discount applied, final price',
              'The customer instantly sees how much they save by bundling repairs in one visit',
            ],
            segments: [
              {
                code: `const precios = item.json.body.precios;

// Validaciones básicas
if (!Array.isArray(precios) || precios.length < 2) {
    throw new Error('Debes enviar un array "precios" with at least 2 numbers.');
}`,
                annotations: [
                  {
                    label: 'Defensive validation',
                    detail: 'The sub-agent doesn\'t trust the router: validates the array exists and has at least 2 prices. If the LLM sent malformed data, it fails fast with a descriptive error instead of returning NaN.',
                  },
                ],
              },
              {
                code: `// 1) Ordenamos de mayor a menor
const ordenados = [...precios].sort((a, b) => b - a);

// 2) Calculamos descuento por posición (el primero no tiene)
const descuentos = ordenados.map((precio, idx) => {
    if (idx === 0) return 0;        // sin descuento para el más caro
    if (precio <= 50)  return 15;
    if (precio <= 100) return 20;
    return 25;                      // >100 €
});`,
                annotations: [
                  {
                    label: 'Business rules as code, not as prompt',
                    detail: 'Discounts live in a Code node, not a prompt. This guarantees determinism: a €189 screen + €45 battery always yields the exact same discount. Zero hallucinations possible.',
                  },
                ],
              },
              {
                code: `// 3) Totales
const totalSinDescuento = ordenados.reduce((s, p) => s + p, 0);
const descuentoTotal    = descuentos.reduce((s, d) => s + d, 0);
const totalConDescuento = totalSinDescuento - descuentoTotal;

// 4) Preparar respuesta
const resumen =
    \`Presupuesto total sin descuento: \${totalSinDescuento.toFixed(2)} €
Descuento aplicado: \${descuentoTotal.toFixed(2)} €
Presupuesto reparándolo todo junto: \${totalConDescuento.toFixed(2)} €\`;`,
                annotations: [
                  {
                    label: 'Pre-formatted response for the router',
                    detail: 'The plain-text summary goes to the router and is passed directly to the customer. The LLM doesn\'t rephrase: it copies the text verbatim. The price the customer sees is exactly what the code calculated.',
                  },
                ],
              },
            ],
          },
          hitl: {
            heading: 'HITL Handoff: Human Escalation',
            body: 'The system\'s escape valve. When Jacobo detects it can\'t resolve (frustrated customer, complex case, out-of-scope request), it escalates to a human via Slack with full context.',
            nodes: 'Webhook → Slack (#chat) → Respond to Webhook',
            details: [
              'Posts to #chat channel with 🤖 emoji as avatar',
              'Message includes: conversation summary, detected intent, and customer history',
              'Deep-link directly to the WATI conversation: the human opens it with full context already loaded',
              'Jacobo confirms to the customer that a human will reach out, without cutting the conversation',
            ],
          },
          whatsapp: {
            heading: 'EnviarMensajeWati: Cross-Channel',
            body: 'The bridge between channels. When the customer is on the phone with Jacobo (ElevenLabs), this workflow sends links and confirmations via WhatsApp in parallel. The customer gets the info in writing while still talking.',
            nodes: 'Webhook → HTTP Request (WATI API) → Respond to Webhook',
            details: [
              'Sends "urlreparacion2" template with the personalized appointment URL',
              'Enables the voice agent to say "I just sent you the link on WhatsApp"',
              'The customer doesn\'t need to write anything down: when they hang up, the info is already on their phone',
            ],
          },
        },
      },
      cta: {
        heading: 'Looking for someone to build this for your company?',
        body: 'Jacobo handles appointments, queries real inventory, and escalates with context, all in under 30 seconds. The sub-agent architecture, tool calling, and HITL patterns apply directly to travel, fintech, healthcare, or e-commerce.',
        label: 'LinkedIn',
        labelSecondary: 'Email',
      },
      ctaAfterEnterprise: {
        heading: 'These patterns are ready to scale. So am I.',
      },
      ctaAfterDownloads: {
        heading: 'You liked the workflows. Imagine what I can do with yours.',
      },
      faq: {
        heading: 'FAQ',
        items: [
          {
            q: 'How much does it cost to build an AI agent for WhatsApp?',
            a: 'The tools (n8n cloud, WATI, Aircall, LLMs via OpenRouter) cost less than €200/month total. The main cost is the time to design and develop the architecture. For a business this size, it\'s a fraction of the cost of a part-time customer service employee.',
          },
          {
            q: 'How does the voice agent on a landline work?',
            a: 'Jacobo is integrated into the Aircall PBX as another "teammate". It picks up when no one else can or after hours. The customer calls a landline and talks to Jacobo with natural voice (ElevenLabs). It uses the same sub-agent webhooks as WhatsApp: same logic, different interface.',
          },
          {
            q: 'Why n8n and not LangChain/LangGraph directly?',
            a: 'n8n lets each sub-agent be a visual workflow with its own webhook, testable with an HTTP call. The maintenance barrier is lower than a Python repo. For this system\'s complexity (7 workflows, ~80 nodes), n8n\'s visualization is an advantage, not a limitation.',
          },
          {
            q: 'How long did it take to build Jacobo?',
            a: 'Less than a month from design to production. And it was my first AI agent, built in parallel with all other business responsibilities. The speed came from the Business OS already existing: clean, accessible data in Airtable, real-time inventory, CRM with history. Without that 5-year foundation, it would have been much slower. Jacobo was the inevitable consequence of a robust business operating system.',
          },
          {
            q: 'Can you build something like this for my company?',
            a: 'Yes. Jacobo\'s patterns (sub-agents, tool calling, HITL, cross-channel) are industry-agnostic. What changes is the data and integrations, not the architecture. If your business has structured data and repetitive processes, I can design a similar system.',
          },
          {
            q: 'Is Jacobo still running?',
            a: 'Yes. I sold the business in 2025 and Jacobo was sold with it — it\'s still in production serving customers today. That\'s the best validation possible: the buyer kept the system because it works.',
          },
          {
            q: 'How did you go from owning a business to looking for an enterprise role?',
            a: 'I built a 16-year business with systems that scale: custom ERP, AI agent, programmatic SEO, gamified CRM. Now I want to apply that same systems thinking to bigger problems — as an FDE, Solutions Architect, or AI Production Manager.',
          },
        ],
      },
      resources: {
        heading: 'Resources',
        items: [
          {
            label: 'n8n — Workflow Automation',
            url: 'https://n8n.io',
          },
          {
            label: 'OpenRouter — Model Gateway',
            url: 'https://openrouter.ai',
          },
          {
            label: 'ElevenLabs — Conversational AI',
            url: 'https://elevenlabs.io',
          },
          {
            label: 'WATI — WhatsApp Business API',
            url: 'https://www.wati.io',
          },
          {
            label: 'Aircall — Cloud PBX',
            url: 'https://aircall.io',
          },
          {
            label: 'Airtable — Database Platform',
            url: 'https://airtable.com',
          },
        ],
      },
      downloads: {
        badge: '7 production workflows downloadable — open source by default',
        inlineLabel: 'View on GitHub',
        inlineHint: 'Import into n8n in 1 click',
        section: {
          heading: 'Run It Yourself',
          intro: 'These are the actual workflows that have been running in production for 2 years. Sanitized, documented, ready to import into n8n. If you build something with them, I\'d love to see it.',
          downloadAllLabel: 'Download all (ZIP)',
          downloadAllSize: '~37 KB',
          importHeading: 'How to import into n8n',
          importSteps: [
            'Open your n8n instance and go to Workflows',
            'Click "..." → "Import from file"',
            'Select any .json file from the download',
            'Update credentials (API keys, webhooks) with your own values',
          ],
        },
        workflows: [
          {
            id: 'jacobo-chatbot-v2',
            icon: '🧭',
            name: 'Jacobo Chatbot V2',
            subtitle: 'Central Router',
            description: 'The brain of the WhatsApp channel. Classifies intent, picks the right sub-agent, maintains a 20-message memory window.',
            href: 'https://github.com/xueyifan/jacobo-workflows/blob/main/jacobo-chatbot-v2.json',
            fileSize: '~66 KB',
            nodes: '37 nodes',
            llm: 'GPT-4.1',
          },
          {
            id: 'subagente-citas',
            icon: '📅',
            name: 'subagenteCitas',
            subtitle: 'Appointment Booking',
            description: 'Turns "tomorrow morning" into a confirmed appointment. Parses natural language time preferences.',
            href: 'https://github.com/xueyifan/jacobo-workflows/blob/main/subagente-citas.json',
            fileSize: '~24 KB',
            nodes: '18 nodes',
            llm: 'MiniMax M2.5',
          },
          {
            id: 'presupuesto-modelo',
            icon: '💰',
            name: 'Presupuesto Modelo',
            subtitle: 'Quote Agent',
            description: 'Looks up exact model + repair in Airtable, returns real price with stock status.',
            href: 'https://github.com/xueyifan/jacobo-workflows/blob/main/presupuesto-modelo.json',
            fileSize: '~15 KB',
            nodes: '11 nodes',
            llm: 'GPT-4.1 mini',
          },
          {
            id: 'hacer-pedido',
            icon: '📦',
            name: 'hacerPedido',
            subtitle: 'Order Creation',
            description: 'Creates repair orders in Airtable when parts are out of stock.',
            href: 'https://github.com/xueyifan/jacobo-workflows/blob/main/hacer-pedido.json',
            fileSize: '~79 KB',
            nodes: '3 nodes',
          },
          {
            id: 'calculadora-xueyifan',
            icon: '🧮',
            name: 'CalculadoraXueyifan',
            subtitle: 'Discount Calculator',
            description: 'Pure business logic. Calculates combo discounts when customers bundle multiple repairs.',
            href: 'https://github.com/xueyifan/jacobo-workflows/blob/main/calculadora-xueyifan.json',
            fileSize: '~2.7 KB',
            nodes: '3 nodes',
          },
          {
            id: 'contactar-agente-humano',
            icon: '🙋',
            name: 'contactarAgenteHumano',
            subtitle: 'HITL Handoff',
            description: 'The escape valve. Escalates to human via Slack with a deep-link to the conversation.',
            href: 'https://github.com/xueyifan/jacobo-workflows/blob/main/contactar-agente-humano.json',
            fileSize: '~2.3 KB',
            nodes: '5 nodes',
          },
          {
            id: 'enviar-mensaje-wati',
            icon: '📱',
            name: 'EnviarMensajeWati',
            subtitle: 'WhatsApp Sender',
            description: 'Cross-channel bridge: the voice agent sends WhatsApp messages via the WATI API.',
            href: 'https://github.com/xueyifan/jacobo-workflows/blob/main/enviar-mensaje-wati.json',
            fileSize: '~2.5 KB',
            nodes: '3 nodes',
          },
        ],
        githubNote: 'All workflows live on GitHub — fork, star, or download directly.',
        githubCta: 'View repo on GitHub',
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
