export const config = {
  runtime: 'edge',
}

// Groq API 配置
const API_URL = "https://api.groq.com/openai/v1/chat/completions"
const API_KEY = process.env.GROQ_API_KEY
const MODEL_NAME = "llama-3.3-70b-versatile"

const SYSTEM_PROMPT_EN = `You are Yifan Xue, a professional Full-Stack Software Engineer.
Background: 4+ years of experience in React, TypeScript, Node.js.
Work History: Lead Front-end Architect at Sagent Lending Technologies, Front-end Engineer at Walmart (Item360 platform).
Education: M.S. in Business Analytics from Tulane University, B.S. in Statistics from Michigan State University.
Current Location: East Lansing, MI (Open to remote, hybrid, or on-site roles).
Voice: Professional, technical, direct, and concise. Speak in the first person.
Mandate: Answer questions about your professional experience and projects. If unsure, suggest contacting you at yifanxue.sde@gmail.com.`

const SYSTEM_PROMPT_ZH = `你是薛一凡 (Yifan Xue)，一名专业的全栈软件工程师。
背景：4年以上 React, TypeScript, Node.js 开发经验。
工作经历：Sagent Lending Technologies 前端架构负责人，Walmart 前端工程师 (Item360 平台)。
教育背景：杜兰大学 (Tulane University) 商业分析硕士，密歇根州立大学 (MSU) 统计学学士。
目前所在地：密歇根州 东兰辛 (East Lansing, MI)，接受远程、混合或线下办公。
语气：专业、技术化、直接且简洁。始终使用第一人称。
任务：回答关于你的专业经验和项目的问题。如果不知道，建议通过邮件联系：yifanxue.sde@gmail.com。`

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { messages, lang = 'en' } = await req.json()
    
    // 1. 修复消息列表：合并连续的相同角色，移除错误消息
    const processedMessages = []
    let lastRole = null

    for (const m of messages) {
      if (!m.content || m.content.includes('Error sending') || m.content.includes('Handler Error')) continue
      
      if (m.role === lastRole) {
        processedMessages[processedMessages.length - 1].content += "\n" + m.content
      } else {
        processedMessages.push({ role: m.role, content: m.content })
        lastRole = m.role
      }
    }

    // 2. 选择系统提示词
    const systemPrompt = lang === 'zh' ? SYSTEM_PROMPT_ZH : SYSTEM_PROMPT_EN

    const finalMessages = [
      { role: 'system', content: systemPrompt },
      ...processedMessages.slice(-8)
    ]

    console.log(`[Groq] 发起请求 (Lang: ${lang})...`)

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: finalMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1024
      })
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('[Groq] API 报错:', err)
      return new Response(`data: ${JSON.stringify({ text: 'API Error' })}\n\ndata: [DONE]\n\n`, {
        headers: { 'Content-Type': 'text/event-stream' }
      })
    }

    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()
    const reader = response.body.getReader()
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    ;(async () => {
      let buffer = ''
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed || trimmed === 'data: [DONE]') continue
            
            if (trimmed.startsWith('data: ')) {
              try {
                const data = JSON.parse(trimmed.slice(6))
                const content = data.choices?.[0]?.delta?.content
                if (content) {
                  await writer.write(encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`))
                }
              } catch (e) {}
            }
          }
        }
      } catch (err) {
        console.error('[Groq] 流转发错误:', err)
      } finally {
        await writer.write(encoder.encode('data: [DONE]\n\n'))
        writer.close()
      }
    })()

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('[Groq] 处理器错误:', error)
    return new Response(`data: ${JSON.stringify({ text: 'Internal Server Error' })}\n\ndata: [DONE]\n\n`, {
      headers: { 'Content-Type': 'text/event-stream' }
    })
  }
}
