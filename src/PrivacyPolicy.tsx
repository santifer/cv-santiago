import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArticleLayout } from './articles/components'

const content = {
  zh: {
    title: '隐私政策',
    lastUpdated: '最后更新日期：2026年3月15日',
    intro: '本政策说明了您访问 xueyifan.io 时我们如何收集和使用数据。',
    sections: [
      {
        heading: '收集哪些数据',
        items: [
          '聊天机器人消息：当您与聊天机器人“一凡”互动时，消息会被处理以生成回复。我们不请求也不存储个人身份信息。',
          '语音模式音频：如果您激活语音模式，音频将实时处理以进行对话，不会永久存储。',
          '使用分析：我们收集匿名的浏览数据（访问页面、停留时间、设备类型）以改进网站。',
        ],
      },
      {
        heading: '数据如何使用',
        items: [
          '聊天机器人消息仅用于生成关于一凡专业经验的上下文回复。',
          '对话追踪记录以匿名形式存储，以提高回复质量并检测滥用尝试。',
          '分析数据用于了解使用模式并优化网站性能。',
        ],
      },
      {
        heading: '第三方服务',
        items: [
          'Anthropic (Claude): 处理聊天机器人消息以生成回复。',
          'OpenAI (Realtime API): 实时处理语音模式音频进行对话。',
          'Langfuse: 存储匿名的对话追踪，用于可观测性和质量改进。',
          'Vercel: 托管网站并收集匿名使用分析。',
        ],
      },
      {
        heading: 'Cookies 和本地存储',
        body: '本网站不使用跟踪 Cookies 或第三方 Cookies。仅使用浏览器的 localStorage 存储界面偏好（视觉主题）。不存储个人信息。',
      },
      {
        heading: '无用户账户',
        body: '本网站不需要注册或登录。我们不通过网站收集姓名、电子邮件或密码。',
      },
      {
        heading: '联系方式',
        body: '如有任何关于隐私的疑问，您可以致信：',
        email: 'yifanxue.sde@gmail.com',
      },
    ],
    backHome: '返回首页',
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: March 15, 2026',
    intro: 'This policy describes how data is collected and used when you visit xueyifan.io.',
    sections: [
      {
        heading: 'Data Collected',
        items: [
          'Chatbot Messages: When you interact with the "yifan" chatbot, messages are processed to generate responses. No personally identifiable information is requested or stored.',
          'Voice Mode Audio: If you activate voice mode, audio is processed in real-time for the conversation and is not permanently stored.',
          'Usage Analytics: Anonymous browsing data (pages visited, duration, device type) is collected to improve the site.',
        ],
      },
      {
        heading: 'How Data is Used',
        items: [
          'Chatbot messages are used exclusively to generate contextual responses about Yifan\'s professional experience.',
          'Conversation traces are stored anonymously to improve response quality and detect misuse attempts.',
          'Analytics data is used to understand usage patterns and improve site performance.',
        ],
      },
      {
        heading: 'Third Parties',
        items: [
          'Anthropic (Claude): Processes chatbot messages to generate responses.',
          'OpenAI (Realtime API): Processes voice mode audio for real-time conversation.',
          'Langfuse: Stores anonymized conversation traces for observability and quality improvement.',
          'Vercel: Hosts the website and collects anonymous usage analytics.',
        ],
      },
      {
        heading: 'Cookies and Local Storage',
        body: 'This site does not use tracking or third-party cookies. It only uses browser localStorage for interface preferences (visual theme). No personal information is stored.',
      },
      {
        heading: 'No User Accounts',
        body: 'This site does not require registration or login. No names, emails, or passwords are collected through the website.',
      },
      {
        heading: 'Contact',
        body: 'For any privacy concerns, you can reach out to:',
        email: 'yifanxue.sde@gmail.com',
      },
    ],
    backHome: 'Back to home',
  },
}

export default function PrivacyPolicy({ lang = 'en' }: { lang?: 'zh' | 'en' }) {
  const t = content[lang]

  useEffect(() => {
    document.title = `${t.title} | xueyifan.io`
    window.scrollTo(0, 0)
  }, [lang, t])

  return (
    <ArticleLayout>
      <div className="max-w-2xl mx-auto px-6 py-20">
        <nav className="mb-12">
          <Link to={lang === 'en' ? '/' : '/zh'} className="text-sm font-medium text-primary hover:underline">
            ← {t.backHome}
          </Link>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-muted-foreground">{t.lastUpdated}</p>
        </header>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-12">{t.intro}</p>

          {t.sections.map((section, i) => (
            <section key={i} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{section.heading}</h2>
              {section.items ? (
                <ul className="list-disc pl-6 space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              )}
              {section.email && (
                <a href={`mailto:${section.email}`} className="text-primary hover:underline block mt-4">
                  {section.email}
                </a>
              )}
            </section>
          ))}
        </div>
      </div>
    </ArticleLayout>
  )
}
