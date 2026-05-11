import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBlogPosts } from './content/blog'
import { getBlogIndexSeo } from './public-surface/seo'

export default function BlogIndexPage() {
  const posts = getBlogPosts()

  useEffect(() => {
    const seo = getBlogIndexSeo()
    document.title = seo.title
    const description = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (description) description.content = seo.description
  }, [])

  return (
    <main className="farid-shell farid-article">
      <section className="farid-blog-index">
        <Link to="/" className="terminal-link">← Back to portfolio</Link>
        <p className="mono-label">Engineering field notes</p>
        <h1 className="farid-display">Blog</h1>
        <p className="farid-article-lede">
          Notes from Farid's data science path: Python, MLOps, analytics, and the mistakes worth writing down.
        </p>

        {posts.length === 0 ? (
          <article className="farid-note-card">
            <span>No public notes yet</span>
            <h2>Drafts stay in Obsidian until they are ready.</h2>
            <p>Published notes appear here after the blog sync workflow runs.</p>
          </article>
        ) : (
          <div className="farid-blog-grid">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} className="farid-note-card" key={post.slug}>
                <span>{post.displayDate} · {post.readingTime}</span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <div className="farid-tags" aria-label="Post tags">
                  {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
