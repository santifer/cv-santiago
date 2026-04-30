/**
 * Post-build script: SSR prerender using React's renderToString.
 *
 * Renders the actual App component to HTML so the pre-rendered content
 * matches exactly what React produces. This enables hydrateRoot() on the
 * client to adopt the existing DOM without replacing it (zero CLS).
 *
 * Articles are loaded from the article registry. Only articles whose
 * component files exist will be prerendered (new case studies added to the
 * registry but not yet created will be skipped gracefully).
 *
 * Usage: npx tsx scripts/prerender.tsx  (runs automatically via "npm run build")
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import React, { Suspense, type ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Routes, Route } from 'react-router-dom';
import Critters from 'critters';
import App from '../src/App.tsx';
import GlobalNav from '../src/GlobalNav.tsx';
import { articleRegistry, type ArticleConfig } from '../src/articles/registry.ts';
import { buildArticleJsonLd, buildFaqPage } from '../src/articles/json-ld.ts';
import AboutPage from '../src/AboutPage.tsx';
import { aboutContent } from '../src/about-i18n.ts';
import PrivacyPolicy from '../src/PrivacyPolicy.tsx';
import { seo } from '../src/i18n.ts';
import { n8nContent } from '../src/n8n-i18n.ts';
import { jacoboContent } from '../src/jacobo-i18n.ts';
import { businessOsContent } from '../src/business-os-i18n.ts';
import { pseoContent } from '../src/pseo-i18n.ts';
import { chatbotContent } from '../src/chatbot-i18n.ts';
import { careerOpsContent } from '../src/career-ops-i18n.ts';

// Map article id → i18n content for JSON-LD generation
const i18nMap: Record<string, Record<string, { header: { h1: string }; nav: { breadcrumbHome: string; breadcrumbCurrent: string }; faq: { items: readonly { q: string; a: string }[] } }>> = {
  'n8n-for-pms': n8nContent,
  'jacobo': jacoboContent,
  'business-os': businessOsContent,
  'programmatic-seo': pseoContent,
  'self-healing-chatbot': chatbotContent,
  'career-ops': careerOpsContent,
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

/** Strip React 19 SSR-injected <link> tags from inside #root to prevent hydration mismatch */
function stripReactSSRTags(html: string): string {
  return html.replace(/<link[^>]*>/g, '');
}

// ---------------------------------------------------------------------------
// SSR render per language (home page)
// ---------------------------------------------------------------------------
function renderApp(lang: 'es' | 'en'): string {
  const path = lang === 'en' ? '/en' : '/';
  return stripReactSSRTags(renderToString(
    <StaticRouter location={path}>
      <div>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/en" element={<App />} />
          </Routes>
        </Suspense>
      </div>
    </StaticRouter>
  ));
}

function renderArticlePage(slug: string, ArticleComponent: ComponentType<{ lang: 'es' | 'en' }>, lang: 'es' | 'en'): string {
  return stripReactSSRTags(renderToString(
    <StaticRouter location={`/${slug}`}>
      <GlobalNav />
      <div>
        <Suspense fallback={null}>
          <Routes>
            <Route path={`/${slug}`} element={<ArticleComponent lang={lang} />} />
          </Routes>
        </Suspense>
      </div>
    </StaticRouter>
  ));
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Inject into built HTML
// ---------------------------------------------------------------------------
const distDir = resolve(root, 'dist');
const indexPath = resolve(distDir, 'index.html');

let indexHtml: string;
try {
  indexHtml = readFileSync(indexPath, 'utf-8');
} catch {
  console.error('Error: dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

// --- ES version (inject into existing index.html) ---
let esHtml: string;
try {
  esHtml = renderApp('es');
} catch (err) {
  console.error('[prerender] SSR failed for ES, falling back to empty root:', err);
  esHtml = '';
}

const esSeo = seo.es;

const injectedEs = indexHtml
  .replace('<div id="root"></div>', `<div id="root">${esHtml}</div>`)
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(esSeo.title)}</title>`)
  .replace(/<meta name="title" content="[^"]*" \/>/, `<meta name="title" content="${esc(esSeo.title)}" />`)
  .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(esSeo.description)}" />`)
  .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(esSeo.title)}" />`)
  .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(esSeo.description)}" />`)
  .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(esSeo.title)}" />`)
  .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(esSeo.description)}" />`);

// --- EN version ---
let enHtml: string;
try {
  enHtml = renderApp('en');
} catch (err) {
  console.error('[prerender] SSR failed for EN, falling back to empty root:', err);
  enHtml = '';
}

const enSeo = seo.en;

let enPage = indexHtml
  .replace('<div id="root"></div>', `<div id="root">${enHtml}</div>`)
  .replace('<html lang="es" class="dark">', '<html lang="en" class="dark">')
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(enSeo.title)}</title>`)
  .replace(/<meta name="title" content="[^"]*" \/>/, `<meta name="title" content="${esc(enSeo.title)}" />`)
  .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(enSeo.description)}" />`)
  .replace(/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="https://santifer.io/en" />')
  .replace(/<meta property="og:url" content="[^"]*" \/>/, '<meta property="og:url" content="https://santifer.io/en" />')
  .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(enSeo.title)}" />`)
  .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(enSeo.description)}" />`)
  .replace(/<meta property="og:locale" content="es_ES" \/>/, '<meta property="og:locale" content="en_US" />')
  .replace(/<meta property="og:locale:alternate" content="en_US" \/>/, '<meta property="og:locale:alternate" content="es_ES" />')
  .replace(/<meta name="twitter:url" content="[^"]*" \/>/, '<meta name="twitter:url" content="https://santifer.io/en" />')
  .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(enSeo.title)}" />`)
  .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(enSeo.description)}" />`);

// ---------------------------------------------------------------------------
// About / Entity Home — ES (/sobre-mi) + EN (/about)
// ---------------------------------------------------------------------------

const aboutPersonProfile = {
  '@type': 'ProfilePage',
  dateModified: '2026-04-28',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://santifer.io/#person',
    name: 'Santiago Fernández de Valderrama Aparicio',
    alternateName: ['Santiago Fernández de Valderrama', 'santifer', 'Santi'],
    url: 'https://santifer.io',
    image: 'https://santifer.io/foto-avatar.png',
    email: 'hola@santifer.io',
    jobTitle: ['Multi-Agent Systems Builder', 'Applied AI Operator', 'Head of Applied AI', 'AI Product Manager', 'Solutions Architect (No/Low-Code & AI)', 'AI Forward Deployed Engineer'],
    knowsAbout: [
      { '@type': 'Thing', name: 'Artificial Intelligence', url: 'https://en.wikipedia.org/wiki/Artificial_intelligence' },
      { '@type': 'Thing', name: 'Machine Learning', url: 'https://en.wikipedia.org/wiki/Machine_learning' },
      { '@type': 'Thing', name: 'Multi-Agent System', url: 'https://en.wikipedia.org/wiki/Multi-agent_system' },
      { '@type': 'Thing', name: 'Retrieval-Augmented Generation', url: 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation' },
      { '@type': 'Thing', name: 'No-code development platform', url: 'https://en.wikipedia.org/wiki/No-code_development_platform' },
      { '@type': 'Thing', name: 'Prompt Engineering' },
      { '@type': 'SoftwareApplication', name: 'Airtable', url: 'https://airtable.com' },
      { '@type': 'SoftwareApplication', name: 'n8n', url: 'https://n8n.io' },
      { '@type': 'SoftwareApplication', name: 'Claude API', url: 'https://docs.anthropic.com' },
    ],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'Introduction to Model Context Protocol', recognizedBy: { '@type': 'Organization', name: 'Anthropic' }, url: 'https://verify.skilljar.com/c/4pxam3irsioq' },
      { '@type': 'EducationalOccupationalCredential', name: 'Claude Code in Action', recognizedBy: { '@type': 'Organization', name: 'Anthropic' }, url: 'https://verify.skilljar.com/c/eijx7hwc2x89' },
      { '@type': 'EducationalOccupationalCredential', name: 'Advanced MCP Topics', recognizedBy: { '@type': 'Organization', name: 'Anthropic' }, url: 'https://verify.skilljar.com/c/eiovmq5qaeyd' },
      { '@type': 'EducationalOccupationalCredential', name: 'Building with the Claude API', recognizedBy: { '@type': 'Organization', name: 'Anthropic' }, url: 'https://verify.skilljar.com/c/s4bu5znz53vm' },
      { '@type': 'EducationalOccupationalCredential', name: 'AI Fluency: Framework & Foundations', recognizedBy: { '@type': 'Organization', name: 'Anthropic' }, url: 'https://verify.skilljar.com/c/d6rhfox7ktq6' },
      { '@type': 'EducationalOccupationalCredential', name: 'Teaching AI Fluency', recognizedBy: { '@type': 'Organization', name: 'Anthropic' }, url: 'https://verify.skilljar.com/c/x3bzuoz99rq5' },
      { '@type': 'EducationalOccupationalCredential', name: 'AI App Builder Certification', recognizedBy: { '@type': 'Organization', name: 'Airtable' }, url: 'https://verify.skilljar.com/c/gwg7ak9qgf7r' },
      { '@type': 'EducationalOccupationalCredential', name: 'Airtable Builder Certification', recognizedBy: { '@type': 'Organization', name: 'Airtable' }, url: 'https://verify.skilljar.com/c/id2e4zgqtasv' },
      { '@type': 'EducationalOccupationalCredential', name: 'Airtable Admin Certification', recognizedBy: { '@type': 'Organization', name: 'Airtable' }, url: 'https://verify.skilljar.com/c/u3r8kgn5wdit' },
      { '@type': 'EducationalOccupationalCredential', name: 'Make Advanced', recognizedBy: { '@type': 'Organization', name: 'Make Academy' }, url: 'https://www.credly.com/badges/d27b8174-ef20-46bd-9d81-ee05e9c349e8' },
    ],
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'AI Product Academy — AI PM Bootcamp', url: 'https://maven.com/marily-nika/ai-pm-bootcamp', founder: { '@type': 'Person', name: 'Dr. Marily Nika', sameAs: 'https://www.wikidata.org/wiki/Q107463356' } },
      { '@type': 'EducationalOrganization', name: 'BIGSEO - Master en Inteligencia Artificial' },
      { '@type': 'EducationalOrganization', name: 'ETSI - Universidad de Sevilla' },
    ],
    founder: {
      '@type': 'Organization',
      name: 'Santifer iRepair',
      url: 'https://santiferirepair.es',
      foundingDate: '2009',
    },
    sameAs: [
      'https://www.linkedin.com/in/santifer',
      'https://github.com/santifer',
      'https://x.com/santifer',
      'https://dev.to/santifer',
      'https://santifer.substack.com',
      'https://contentdigest.santifer.io',
      'https://www.youtube.com/@santifer_io',
      'https://stackoverflow.com/users/32541743',
      'https://orcid.org/0009-0006-2192-7210',
      'https://www.crunchbase.com/person/santiago-fernandez-de-valderrama',
      'https://huggingface.co/santifer',
      'https://www.wikidata.org/wiki/Q138710224',
      'https://santiferirepair.es',
      'https://www.facebook.com/santifer.io/',
      'https://www.producthunt.com/@santifer',
      'https://app.daily.dev/santifer',
    ],
    subjectOf: [
      {
        '@type': 'NewsArticle',
        headline: 'I built a tool to filter 700 listings for my job search. It got me a position as head of AI.',
        publisher: { '@type': 'NewsMediaOrganization', name: 'Business Insider', url: 'https://www.businessinsider.com' },
        author: { '@type': 'Person', name: 'Jordan Hart' },
        datePublished: '2026-04-28',
        url: 'https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4',
        inLanguage: 'en',
      },
      {
        '@type': 'NewsArticle',
        headline: 'Mein KI-Tool scannt 700 Job-Anzeigen — so half es mir, Karriere zu machen',
        publisher: { '@type': 'NewsMediaOrganization', name: 'Business Insider Deutschland', url: 'https://www.businessinsider.de' },
        datePublished: '2026-04-28',
        url: 'https://www.businessinsider.de/karriere/bewerbung/mein-ki-tool-scannt-700-job-anzeigen-so-half-es-mir-karriere-zu-machen/',
        inLanguage: 'de',
        isBasedOn: 'https://www.businessinsider.com/how-i-built-tool-filter-job-listings-landed-head-ai-2026-4',
      },
      {
        '@type': 'NewsArticle',
        headline: 'Salir de compras: Una solución exprés para el teléfono',
        publisher: { '@type': 'NewsMediaOrganization', name: 'Diario de Sevilla' },
        datePublished: '2014-06-19',
        url: 'https://www.diariodesevilla.es/vivirensevilla/Salir-compras-solucion-expres-telefono_0_817718799.html',
        inLanguage: 'es',
      },
    ],
    address: { '@type': 'PostalAddress', addressLocality: 'Sevilla', addressCountry: 'ES' },
  },
};

/**
 * Build the per-language @graph for /about + /sobre-mi.
 * Includes ProfilePage + FAQPage so AI crawlers see FAQ schema in SSR'd HTML
 * (no longer requires JS execution / useEffect).
 */
function buildAboutJsonLd(lang: 'es' | 'en', pageUrl: string, faq: readonly { q: string; a: string }[]) {
  const profile = {
    ...aboutPersonProfile,
    '@id': `${pageUrl}#profilepage`,
    inLanguage: lang,
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [profile, buildFaqPage(faq, pageUrl, lang)],
  };
}

interface AboutPageData {
  slug: string;
  html: string;
}

const aboutPages: AboutPageData[] = [];

for (const lang of ['es', 'en'] as const) {
  const t = aboutContent[lang];
  const slug = t.slug;
  const altSlug = t.altSlug;
  const url = `https://santifer.io/${slug}`;
  const altUrl = `https://santifer.io/${altSlug}`;
  const altLang = lang === 'es' ? 'en' : 'es';
  const ogLocale = lang === 'es' ? 'es_ES' : 'en_US';
  const ogLocaleAlt = lang === 'es' ? 'en_US' : 'es_ES';

  let renderedHtml: string;
  try {
    renderedHtml = stripReactSSRTags(renderToString(
      <StaticRouter location={`/${slug}`}>
        <GlobalNav />
        <div>
          <Suspense fallback={null}>
            <Routes>
              <Route path={`/${slug}`} element={<AboutPage lang={lang} />} />
            </Routes>
          </Suspense>
        </div>
      </StaticRouter>
    ));
  } catch (err) {
    console.error(`[prerender] SSR failed for ${slug}, falling back to empty root:`, err);
    renderedHtml = '';
  }

  const hreflangLinks = `<link rel="alternate" hreflang="${lang}" href="${url}" /><link rel="alternate" hreflang="${altLang}" href="${altUrl}" /><link rel="alternate" hreflang="x-default" href="https://santifer.io/sobre-mi" />`;

  let result = indexHtml
    .replace('<div id="root"></div>', `<div id="root">${renderedHtml}</div>`)
    .replace('<html lang="es" class="dark">', `<html lang="${lang}" class="dark">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(t.seo.title)}</title>`)
    .replace(/<meta name="title" content="[^"]*" \/>/, `<meta name="title" content="${esc(t.seo.title)}" />`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(t.seo.description)}" />`)
    .replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\s*/g, '')
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />${hreflangLinks}`)
    .replace(/<meta property="og:type" content="[^"]*" \/>/, '<meta property="og:type" content="profile" />')
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(t.seo.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(t.seo.description)}" />`)
    .replace(/<meta property="og:locale" content="es_ES" \/>/, `<meta property="og:locale" content="${ogLocale}" />`)
    .replace(/<meta property="og:locale:alternate" content="en_US" \/>/, `<meta property="og:locale:alternate" content="${ogLocaleAlt}" />`)
    .replace(/<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(t.seo.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(t.seo.description)}" />`);

  // Build per-language @graph (ProfilePage + FAQPage) and inject as SSR JSON-LD
  const aboutJsonLd = buildAboutJsonLd(lang, url, t.faq);
  const aboutJsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(aboutJsonLd, null, 2)}\n</script>`;

  // Replace homepage JSON-LD with ProfilePage + FAQPage @graph
  result = result.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    aboutJsonLdScript,
  );

  aboutPages.push({ slug, html: result });
}

// ---------------------------------------------------------------------------
// Article pages — build from registry
// ---------------------------------------------------------------------------
interface ArticlePage {
  slug: string;
  html: string;
}

function buildArticlePage(
  config: ArticleConfig,
  lang: 'es' | 'en',
  ArticleComponent: ComponentType<{ lang: 'es' | 'en' }>,
): string {
  const slug = config.slugs[lang];
  const altSlug = config.slugs[lang === 'es' ? 'en' : 'es'];
  const url = `https://santifer.io/${slug}`;
  const altUrl = `https://santifer.io/${altSlug}`;
  const altLang = lang === 'es' ? 'en' : 'es';
  const htmlLang = lang;
  const ogLocale = lang === 'es' ? 'es_ES' : 'en_US';
  const ogLocaleAlt = lang === 'es' ? 'en_US' : 'es_ES';
  const articleSeo = config.seo[lang];
  const xDefaultHref = `https://santifer.io/${config.xDefaultSlug || config.slugs.es}`;

  let renderedHtml: string;
  try {
    renderedHtml = renderArticlePage(slug, ArticleComponent, lang);
  } catch (err) {
    console.error(`[prerender] SSR failed for ${slug}, falling back to empty root:`, err);
    renderedHtml = '';
  }

  const hreflangLinks = `<link rel="alternate" hreflang="${lang}" href="${url}" /><link rel="alternate" hreflang="${altLang}" href="${altUrl}" /><link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />`;

  let result = indexHtml
    .replace('<div id="root"></div>', `<div id="root">${renderedHtml}</div>`)
    .replace('<html lang="es" class="dark">', `<html lang="${htmlLang}" class="dark">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(articleSeo.title)}</title>`)
    .replace(/<meta name="title" content="[^"]*" \/>/, `<meta name="title" content="${esc(articleSeo.title)}" />`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(articleSeo.description)}" />`)
    // Remove home hreflang tags before injecting article-specific ones
    .replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\s*/g, '')
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />${hreflangLinks}`)
    .replace(/<meta property="og:type" content="[^"]*" \/>/, '<meta property="og:type" content="article" />')
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(articleSeo.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(articleSeo.description)}" />`)
    .replace(/<meta property="og:locale" content="es_ES" \/>/, `<meta property="og:locale" content="${ogLocale}" />`)
    .replace(/<meta property="og:locale:alternate" content="en_US" \/>/, `<meta property="og:locale:alternate" content="${ogLocaleAlt}" />`)
    .replace(/<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(articleSeo.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(articleSeo.description)}" />`)
    // OG image — replace with article-specific image if configured
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${esc(config.ogImage || 'https://santifer.io/og-image.webp')}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${esc(articleSeo.title)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, config.ogImage ? `<meta name="twitter:image" content="${esc(config.ogImage)}" />` : '');

  // Inject article:published_time + article:modified_time + article:tag
  const seoMeta = config.seoMeta;
  if (seoMeta) {
    const articleMetaTags = [
      `<meta property="article:published_time" content="${seoMeta.datePublished}" />`,
      `<meta property="article:modified_time" content="${seoMeta.dateModified}" />`,
      `<meta property="article:author" content="https://www.linkedin.com/in/santifer" />`,
      `<meta property="article:tag" content="${esc(seoMeta.articleTags)}" />`,
    ].join('\n    ');
    result = result.replace('</head>', `    ${articleMetaTags}\n  </head>`);
  }

  // Inject article JSON-LD (replace homepage Person/WebSite schema)
  const i18n = i18nMap[config.id];
  if (seoMeta && i18n) {
    const t = i18n[lang];
    if (t) {
      const jsonLd = buildArticleJsonLd({
        lang,
        url: `https://santifer.io/${slug}`,
        altUrl: `https://santifer.io/${altSlug}`,
        headline: t.header.h1,
        alternativeHeadline: articleSeo.title,
        description: articleSeo.description,
        datePublished: seoMeta.datePublished,
        dateModified: seoMeta.dateModified,
        keywords: seoMeta.keywords,
        images: config.heroImage ? [config.heroImage] : seoMeta.images,
        breadcrumbHome: t.nav.breadcrumbHome,
        breadcrumbCurrent: t.nav.breadcrumbCurrent,
        faq: t.faq.items,
        articleType: seoMeta.articleType,
        about: seoMeta.about,
        extra: seoMeta.extra,
        citation: seoMeta.citation,
        isBasedOn: seoMeta.isBasedOn,
        mentions: seoMeta.mentions,
        discussionUrl: seoMeta.discussionUrl,
        relatedLink: seoMeta.relatedLink,
        video: seoMeta.video,
        subjectOf: seoMeta.subjectOf,
      });
      const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;
      // Replace the homepage JSON-LD with article-specific one
      result = result.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        jsonLdScript,
      );
    }
  }

  return result;
}

// Load article components and build pages
const articlePages: ArticlePage[] = [];

for (const config of articleRegistry) {
  let ArticleComponent: ComponentType<{ lang: 'es' | 'en' }>;
  try {
    const mod = await config.component();
    ArticleComponent = mod.default;
  } catch {
    console.log(`[prerender] Skipping ${config.id} — component not found yet`);
    continue;
  }

  const seen = new Set<string>();
  for (const lang of ['es', 'en'] as const) {
    const slug = config.slugs[lang];
    if (seen.has(slug)) continue; // same slug for both languages
    seen.add(slug);
    const html = buildArticlePage(config, lang, ArticleComponent);
    articlePages.push({ slug, html });
  }
}

// ---------------------------------------------------------------------------
// Critical CSS inlining with Critters
// ---------------------------------------------------------------------------
const critters = new Critters({
  path: distDir,
  publicPath: '/',
  inlineFonts: false,
  preload: 'media',
  compress: true,
  reduceInlineStyles: true,
});

function dedupePreloads(html: string): string {
  return html.replace(/<link rel="preload" as="image" href="\/foto-avatar\.webp">/g, '');
}

/**
 * Swap the base <link rel="preload"> for the avatar (home LCP) to the
 * article's hero image (article LCP). Detects `<img ... fetchpriority="high" ...>`
 * in the rendered content and rewrites the preload to match, preserving srcset
 * and sizes where available. If no high-priority image found, leave as-is.
 */
function swapLcpPreload(html: string, isArticle: boolean): string {
  if (!isArticle) return html;
  const imgMatch = html.match(/<img[^>]*fetchpriority="high"[^>]*>/i);
  if (!imgMatch) return html;
  const img = imgMatch[0];
  const src = img.match(/\bsrc="([^"]+)"/)?.[1];
  if (!src) return html;
  const srcset = img.match(/\bsrcset="([^"]+)"/)?.[1];
  const sizes = img.match(/\bsizes="([^"]+)"/)?.[1];
  const attrs = [
    `rel="preload"`,
    `as="image"`,
    `href="${src}"`,
    `type="image/webp"`,
    srcset ? `imagesrcset="${srcset}"` : '',
    sizes ? `imagesizes="${sizes}"` : '',
    `fetchpriority="high"`,
  ].filter(Boolean).join(' ');
  const newPreload = `<link ${attrs} />`;
  return html.replace(
    /<link rel="preload" href="\/foto-avatar-sm\.webp"[^>]*>/,
    newPreload,
  );
}

async function writePage(html: string, outputPath: string, label: string) {
  const dir = dirname(outputPath);
  mkdirSync(dir, { recursive: true });
  // Article pages live in dist/<slug>/index.html, NOT dist/index.html or dist/en/index.html
  const isArticle = /\/dist\/[^/]+\/index\.html$/.test(outputPath)
    && !/\/dist\/(en|privacy|privacidad)\/index\.html$/.test(outputPath);
  const pre = swapLcpPreload(html, isArticle);
  try {
    const processed = dedupePreloads(await critters.process(pre));
    writeFileSync(outputPath, processed, 'utf-8');
    console.log(`[prerender] ${label} (with critical CSS)`);
  } catch {
    writeFileSync(outputPath, pre, 'utf-8');
    console.log(`[prerender] ${label} (no critical CSS)`);
  }
}

// ---------------------------------------------------------------------------
// Privacy pages — /privacidad (ES) + /privacy (EN)
// ---------------------------------------------------------------------------
const privacyPages: { slug: string; html: string }[] = [];

for (const [lang, slug, altSlug] of [['es', 'privacidad', 'privacy'], ['en', 'privacy', 'privacidad']] as const) {
  const url = `https://santifer.io/${slug}`;
  const altUrl = `https://santifer.io/${altSlug}`;
  const altLang = lang === 'es' ? 'en' : 'es';
  const title = lang === 'es' ? 'Política de Privacidad | santifer.io' : 'Privacy Policy | santifer.io';
  const description = lang === 'es'
    ? 'Política de privacidad de santifer.io. Cómo se recopilan y utilizan los datos del chatbot y la web.'
    : 'Privacy policy for santifer.io. How chatbot and website data is collected and used.';

  let renderedHtml: string;
  try {
    renderedHtml = stripReactSSRTags(renderToString(
      <StaticRouter location={`/${slug}`}>
        <GlobalNav />
        <div>
          <Suspense fallback={null}>
            <Routes>
              <Route path={`/${slug}`} element={<PrivacyPolicy lang={lang} />} />
            </Routes>
          </Suspense>
        </div>
      </StaticRouter>
    ));
  } catch (err) {
    console.error(`[prerender] SSR failed for ${slug}:`, err);
    renderedHtml = '';
  }

  const hreflangLinks = `<link rel="alternate" hreflang="${lang}" href="${url}" /><link rel="alternate" hreflang="${altLang}" href="${altUrl}" /><link rel="alternate" hreflang="x-default" href="https://santifer.io/privacidad" />`;

  let result = indexHtml
    .replace('<div id="root"></div>', `<div id="root">${renderedHtml}</div>`)
    .replace('<html lang="es" class="dark">', `<html lang="${lang}" class="dark">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="title" content="[^"]*" \/>/, `<meta name="title" content="${esc(title)}" />`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, nofollow" />')
    .replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\s*/g, '')
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />${hreflangLinks}`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:locale" content="es_ES" \/>/, `<meta property="og:locale" content="${lang === 'es' ? 'es_ES' : 'en_US'}" />`)
    .replace(/<meta property="og:locale:alternate" content="en_US" \/>/, `<meta property="og:locale:alternate" content="${lang === 'es' ? 'en_US' : 'es_ES'}" />`)
    .replace(/<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(description)}" />`);

  // Remove homepage JSON-LD (privacy pages don't need structured data)
  result = result.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');

  privacyPages.push({ slug, html: result });
}

async function inlineCriticalCSS() {
  // Home pages
  await writePage(injectedEs, indexPath, 'ES: dist/index.html updated');
  await writePage(enPage, resolve(distDir, 'en', 'index.html'), 'EN: dist/en/index.html created');

  // About pages
  for (const { slug, html } of aboutPages) {
    await writePage(html, resolve(distDir, slug, 'index.html'), `${slug}: dist/${slug}/index.html created`);
  }

  // Article pages
  for (const { slug, html } of articlePages) {
    await writePage(html, resolve(distDir, slug, 'index.html'), `${slug}: dist/${slug}/index.html created`);
  }

  // Privacy pages
  for (const { slug, html } of privacyPages) {
    await writePage(html, resolve(distDir, slug, 'index.html'), `${slug}: dist/${slug}/index.html created`);
  }
}

await inlineCriticalCSS();

// ---------------------------------------------------------------------------
// 404 page — Vercel serves this with HTTP 404 status automatically
// ---------------------------------------------------------------------------
const notFoundHtml = indexHtml
  .replace('<div id="root"></div>', `<div id="root"><div style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 1.5rem"><p style="font-size:6rem;font-weight:bold;color:var(--primary);margin-bottom:1rem;font-family:var(--font-display)">404</p><h1 style="font-size:1.5rem;font-weight:600;color:var(--foreground);margin-bottom:0.5rem">Page not found</h1><p style="color:var(--muted-foreground);margin-bottom:2rem;max-width:28rem">The page you're looking for doesn't exist or has been moved.</p><a href="/" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.75rem 1.5rem;border-radius:0.75rem;background:var(--primary);color:var(--primary-foreground);font-weight:500;text-decoration:none">← Back to home</a></div></div>`)
  .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, nofollow" />')
  .replace(/<title>[^<]*<\/title>/, '<title>404 — Page not found | santifer.io</title>');

// Add noindex if no robots meta exists
if (!notFoundHtml.includes('name="robots"')) {
  const withNoindex = notFoundHtml.replace('</head>', '<meta name="robots" content="noindex, nofollow" /></head>');
  writeFileSync(resolve(distDir, '404.html'), withNoindex, 'utf-8');
} else {
  writeFileSync(resolve(distDir, '404.html'), notFoundHtml, 'utf-8');
}
console.log('[prerender] 404: dist/404.html created');

// ---------------------------------------------------------------------------
// Hydration structure validation
// ---------------------------------------------------------------------------
function validateHydrationStructure(html: string, label: string) {
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/);
  if (!rootMatch || !rootMatch[1].trim()) return; // empty root = OK (fallback)
  const content = rootMatch[1];

  // Must NOT contain <link> tags (React 19 SSR artifacts)
  if (/<link\s/.test(content)) {
    console.error(`[hydration-check] FAIL ${label}: <link> tags found inside #root — will cause hydration mismatch`);
    process.exit(1);
  }

  // Must have <div> wrapper (PageTransition)
  if (!content.includes('<div')) {
    console.error(`[hydration-check] FAIL ${label}: missing <div> wrapper (PageTransition) inside #root`);
    process.exit(1);
  }
}

// Validate home pages
validateHydrationStructure(injectedEs, 'home-es');
validateHydrationStructure(enPage, 'home-en');

// Validate about pages
for (const { slug, html } of aboutPages) {
  validateHydrationStructure(html, slug);
}

// Validate article pages
for (const { slug, html } of articlePages) {
  validateHydrationStructure(html, slug);
}

// Validate privacy pages
for (const { slug, html } of privacyPages) {
  validateHydrationStructure(html, slug);
}

console.log('[hydration-check] All pages pass structural validation');
console.log('[prerender] Done.');
