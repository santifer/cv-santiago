export type IRepairLang = 'zh' | 'en'

interface IRepairMetric {
  value: string
  label: string
}

interface IRepairContent {
  slug: string
  altSlug: string
  seo: {
    title: string
    description: string
  }
  nav: {
    breadcrumbHome: string
    breadcrumbCurrent: string
  }
  hero: {
    headline: string
    sub: string
  }
  metrics: IRepairMetric[]
  cards: {
    shop: {
      title: string
      body: string
      cta: string
      mapLabel: string
    }
    founder: {
      title: string
      body: string
      cta: string
    }
  }
  businessOsCta: {
    heading: string
    body: string
    ctaLabel: string
  }
  jacoboCta: {
    heading: string
    body: string
    ctaLabel: string
  }
  pseoCta: {
    heading: string
    body: string
    ctaLabel: string
  }
}

export const irepairContent: Record<IRepairLang, IRepairContent> = {
  zh: {
    slug: 'xueyifan-irepair',
    altSlug: 'xueyifan-irepair-founder',
    seo: {
      title: 'Xueyifan iRepair 塞维利亚 | 始于2009年的手机维修',
      description: '一帆于2009年创立的手机维修店仍在塞维利亚营业。30,000+ 次维修。查找店铺或了解创始人。',
    },
    nav: {
      breadcrumbHome: '首页',
      breadcrumbCurrent: 'Xueyifan iRepair',
    },
    hero: {
      headline: '我在25岁时开了这家店。\n16年后卖掉了它。它仍在运行。',
      sub: '买家保留了品牌、系统和团队。没有做任何改变。',
    },
    metrics: [
      { value: '16', label: '年' },
      { value: '30K+', label: '次维修' },
      { value: '2009', label: '成立于' },
      { value: '2025', label: '售出于' },
    ],
    cards: {
      shop: {
        title: '在找 Xueyifan iRepair 吗？',
        body: '仍在营业，仍在维修。同样的团队，玻璃上还贴着我的名字。',
        cta: '前往 xueyifanirepair.es',
        mapLabel: '查看位置和营业时间',
      },
      founder: {
        title: '在找一帆吗？',
        body: '一个负责接听电话的AI代理。一个拥有2100个字段的ERP。通过程序化SEO生成的数千个落地页。买家没有改变任何东西。现在我为公司设计AI和自动化系统。',
        cta: '查看作品集',
      },
    },
    businessOsCta: {
      heading: '30,000次维修背后的系统',
      body: '一个基于Airtable的完整ERP，管理了业务多年。自动化、AI，每月节省170小时。',
      ctaLabel: '查看 Business OS',
    },
    jacoboCta: {
      heading: '负责接听电话的代理',
      body: '一个具备语音功能的AI代理，负责管理预约、报价和咨询。90%自助服务。',
      ctaLabel: '查看 Jacobo 案例',
    },
    pseoCta: {
      heading: '自动构建的网站',
      body: '基于ERP生成的4,700多个落地页。200万+有机曝光。零AI生成内容。',
      ctaLabel: '查看程序化SEO',
    },
  },
  en: {
    slug: 'xueyifan-irepair-founder',
    altSlug: 'xueyifan-irepair',
    seo: {
      title: 'Xueyifan iRepair Seville | Phone Repair since 2009',
      description: 'The phone repair shop founded by Yifan in 2009 is still open in Seville, Spain. 30,000+ repairs. Find the shop or meet the founder.',
    },
    nav: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Xueyifan iRepair',
    },
    hero: {
      headline: 'I opened this shop at 25.\nSold it 16 years later. It\'s still running.',
      sub: 'The buyer kept the brand, the systems, and the team. Changed nothing.',
    },
    metrics: [
      { value: '16', label: 'Years' },
      { value: '30K+', label: 'Repairs' },
      { value: '2009', label: 'Founded' },
      { value: '2025', label: 'Sold' },
    ],
    cards: {
      shop: {
        title: 'Looking for Xueyifan iRepair?',
        body: 'Still open, still fixing phones. Same team and my name still on the glass.',
        cta: 'Go to xueyifanirepair.es',
        mapLabel: 'View location & hours',
      },
      founder: {
        title: 'Looking for Yifan?',
        body: 'An AI agent that answered the phone. A 2,100-field ERP. Thousands of landing pages generated with programmatic SEO. The buyer changed nothing. Now I design AI and automation systems for companies.',
        cta: 'View portfolio',
      },
    },
    businessOsCta: {
      heading: 'The system behind 30,000 repairs',
      body: 'A full ERP built in Airtable that ran the business for years. Automations, AI, and 170 hours/month saved.',
      ctaLabel: 'See the Business OS',
    },
    jacoboCta: {
      heading: 'The agent that answered the phone',
      body: 'An AI voice agent that handled bookings, quotes, and inquiries. 90% self-service.',
      ctaLabel: 'See the Jacobo case study',
    },
    pseoCta: {
      heading: 'The website that builds itself',
      body: '4,700+ landing pages generated from the ERP. 2M+ organic impressions. Zero AI content.',
      ctaLabel: 'See the Programmatic SEO',
    },
  },
}
