import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import { getBlogPost } from './content/blog'
import { getArticleSeo } from './public-surface/seo'

interface BlogPostPageProps {
  slug?: string
}

export default function BlogPostPage({ slug: explicitSlug }: BlogPostPageProps) {
  const params = useParams()
  const slug = explicitSlug || params.slug || ''
  const post = getBlogPost(slug)

  useEffect(() => {
    if (!post) return
    const seo = getArticleSeo(`/blog/${post.slug}`)
    if (!seo) return
    document.title = seo.title
    const description = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (description) description.content = seo.description
  }, [post])

  if (!post) {
    return (
      <main className="farid-shell farid-not-found">
        <h1 className="farid-display">Post not found</h1>
        <p>This note is still private, unpublished, or the URL is wrong.</p>
        <Link to="/blog" className="farid-button-primary">Back to blog</Link>
      </main>
    )
  }

  return (
    <main className="farid-shell farid-article">
      <article className="farid-article-card">
        <Link to="/blog" className="terminal-link">← Back to all notes</Link>
        <p className="mono-label">{post.displayDate} · {post.readingTime} · {post.tags.join(' / ')}</p>
        <h1 className="farid-display">{post.title}</h1>
        <p className="farid-article-lede">{post.description}</p>
        {post.heroImage ? (
          <img
            src={post.heroImage}
            alt={`Terminal-style preview for Farid Sayago's field note: ${post.title}`}
            className="farid-article-hero-image"
            width={1400}
            height={781}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        ) : null}

        <div className="farid-blog-prose">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  )
}
