import { Link } from 'react-router-dom'
import { faridProfile, getSeo } from './content/farid-profile'

export default function FaridFieldNotes() {
  const seo = getSeo()
  return (
    <main className="farid-shell farid-article">
      <article className="farid-article-card">
        <Link to="/" className="terminal-link">← Back to portfolio</Link>
        <p className="mono-label">{faridProfile.fieldNote.date} · {faridProfile.fieldNote.tags.join(' / ')}</p>
        <h1 className="farid-display">{faridProfile.fieldNote.title}</h1>
        <p className="farid-article-lede">{faridProfile.fieldNote.description}</p>
        <img
          src={faridProfile.fieldNote.heroImage}
          alt="Terminal-style preview for Farid Sayago's MLOps field note"
          className="farid-article-hero-image"
          width={1400}
          height={781}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        <h2>The biggest mistake</h2>
        <p>The biggest mistake in early MLOps work is pretending you need enterprise-scale infrastructure before you have enterprise-scale problems.</p>
        <p>You do not need a massive platform to begin. You need a workflow that is boring, observable, and repeatable.</p>

        <h2>The baseline that matters</h2>
        <p>A reliable small-team ML workflow should answer four questions:</p>
        <ul>
          <li>Where did the data come from?</li>
          <li>Which code produced the model?</li>
          <li>Which parameters changed?</li>
          <li>Can the same run be reproduced tomorrow?</li>
        </ul>
        <p>If those questions are hard to answer, adding Kubernetes, feature stores, or orchestration layers will not save the project. It just gives the chaos more places to hide.</p>

        <h2>Start with discipline</h2>
        <ol>
          <li>Version your source code.</li>
          <li>Store configuration outside the training script.</li>
          <li>Log metrics and artifacts.</li>
          <li>Keep datasets and model outputs traceable.</li>
          <li>Document every assumption while it is still fresh.</li>
        </ol>
        <p>That last point is where Obsidian shines. Notes become part of the engineering system instead of an afterthought.</p>

        <h2>What comes next</h2>
        <p>Once the workflow is understandable, automation becomes much easier. CI checks, scheduled training, model validation, and deployment gates should grow from a stable foundation — not from panic.</p>
        <p>Small systems can be serious systems. They just need taste, restraint, and consistency.</p>

        <footer><a href={seo.url} className="terminal-link">{seo.url.replace('https://', '')}</a></footer>
      </article>
    </main>
  )
}
