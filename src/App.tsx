import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { faridProfile, getSeo } from "./content/farid-profile";

function SectionKicker({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="farid-kicker">
      <span className="farid-dot" /> {index} {children}
    </div>
  );
}

function useHomeSeo() {
  useEffect(() => {
    const seo = getSeo();
    document.title = seo.title;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("description", seo.description);
    setMeta("author", faridProfile.fullName);

    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = seo.url;
  }, []);
}

function Hero() {
  return (
    <section id="hero" className="farid-hero">
      <div className="farid-hero-layout">
        <header className="farid-hero-copy">
          <div className="mono-label">
            <span className="farid-dot" /> {faridProfile.hero.eyebrow}
          </div>
          <h1 className="farid-display farid-hero-title">
            {faridProfile.hero.title}
          </h1>
          <p className="farid-hero-description">
            {faridProfile.hero.description}
          </p>
          <div className="farid-actions">
            <a href="#work" className="farid-button-primary">
              View Work <span aria-hidden="true">↘</span>
            </a>
            <a href="#contact" className="farid-button-secondary">
              Let's Talk <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <div className="farid-hero-visual">
          <div className="farid-orb" aria-hidden="true">
            <div className="farid-orb-grid" />
            <span>ML</span>
            <span>ETL</span>
            <span>AWS</span>
            <span>AI</span>
          </div>

          <article className="terminal-window">
            <div className="terminal-bar">
              <div className="terminal-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span>
                Featured Project: {faridProfile.hero.featuredProject.title}
              </span>
              <a
                href={faridProfile.hero.featuredProject.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                ~/projects/wiener-tickets
              </a>
            </div>
            <div className="terminal-body">
              <p>
                <span className="terminal-prompt">›</span>{" "}
                {faridProfile.hero.featuredProject.summary}
              </p>
              <div>
                <p>
                  <b>› MY ROLE</b>
                </p>
                <ul>
                  {faridProfile.hero.featuredProject.role.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p>
                  <b>› PROCESS</b>
                </p>
                <ol>
                  {faridProfile.hero.featuredProject.process.map(
                    (item, index) => (
                      <li key={item}>
                        <strong>{String(index + 1).padStart(2, "0")}</strong>{" "}
                        {item}
                      </li>
                    ),
                  )}
                </ol>
              </div>
            </div>
            <footer className="terminal-footer">
              <span>
                <span className="terminal-prompt">›</span> STATUS:{" "}
                <b>{faridProfile.hero.featuredProject.status}</b>
              </span>
              <a
                href={faridProfile.hero.featuredProject.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project →
              </a>
            </footer>
          </article>
        </div>
      </div>
      <div className="farid-metrics">
        {faridProfile.metrics.map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="farid-section">
      <SectionKicker index="01">Selected Work</SectionKicker>
      <div className="farid-section-heading">
        <h2 className="farid-display">Systems with evidence.</h2>
      </div>
      <div className="farid-project-grid">
        {faridProfile.projects.map((project) => (
          <article
            key={project.title}
            className={`farid-project-card ${project.featured ? "featured" : ""}`}
          >
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="farid-project-media"
            >
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                width={1200}
                height={750}
                loading={project.featured ? "eager" : "lazy"}
                fetchPriority={project.featured ? "high" : "auto"}
                decoding="async"
              />
            </a>
            <div className="farid-project-content">
              <div className="farid-card-meta">
                <span>{project.number}</span>
                <span>{project.status}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="farid-tags">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-link"
              >
                View Repository →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="farid-section">
      <SectionKicker index="02">Experience</SectionKicker>
      <div className="farid-section-heading">
        <h2 className="farid-display">Data work for real operations.</h2>
      </div>
      <div className="farid-timeline">
        {faridProfile.experience.map((job, index) => (
          <article
            key={`${job.company}-${job.title}`}
            className="farid-experience-card"
          >
            <div className="farid-card-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{job.date}</span>
            </div>
            <h3>{job.title}</h3>
            <p className="farid-company">{job.company}</p>
            <p>{job.review}</p>
            <ul>
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="farid-section">
      <SectionKicker index="03">Skills / Certifications</SectionKicker>
      <div className="farid-section-heading">
        <h2 className="farid-display">
          Technical systems, proved on real work.
        </h2>
      </div>
      <div className="farid-skill-grid">
        {faridProfile.skills.map((skill, index) => (
          <article key={skill.name} className="farid-skill-card">
            <div className="farid-card-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>Core</span>
            </div>
            <h3>{skill.name}</h3>
            <p>{skill.note}</p>
          </article>
        ))}
      </div>
      <div className="farid-learning-grid">
        <article className="glass-panel">
          <h3>Certifications</h3>
          <div className="farid-tags">
            {faridProfile.certifications.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
        <article className="glass-panel">
          <h3>Platzi Learning</h3>
          <ul className="farid-course-list">
            {faridProfile.platziCourses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="glass-panel">
          <h3>Technology Map</h3>
          <div className="farid-tags">
            {faridProfile.technologies.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function FieldNotes() {
  return (
    <section id="field-notes" className="farid-section">
      <SectionKicker index="04">Field Notes</SectionKicker>
      <div className="farid-section-heading">
        <h2 className="farid-display">Workflows that write themselves.</h2>
      </div>
      <a href="/blog/mlops-field-notes" className="farid-note-card">
        <span>{faridProfile.fieldNote.date}</span>
        <h3>{faridProfile.fieldNote.title}</h3>
        <p>{faridProfile.fieldNote.description}</p>
        <div className="farid-tags">
          {faridProfile.fieldNote.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </a>
    </section>
  );
}

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSent(false);
    try {
      if (!formRef.current) return;
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );
      formRef.current.reset();
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="farid-section">
      <SectionKicker index="05">Contact</SectionKicker>
      <div className="contact-grid">
        <aside className="terminal-window">
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span />
              <span />
              <span />
            </div>
            <span>Contact protocol</span>
            <span>online</span>
          </div>
          <div className="terminal-body">
            <p>
              <span className="terminal-prompt">›</span> Available for AI, data,
              and cloud engineering collaborations.
            </p>
            <div className="farid-protocol">
              <p>Response pattern</p>
              <ol>
                <li>Scope and constraints</li>
                <li>Technical feasibility</li>
                <li>Delivery path</li>
              </ol>
            </div>
          </div>
        </aside>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="farid-contact-form glass-panel"
        >
          <label>
            Your name
            <input name="name" placeholder="Ada Lovelace" required />
          </label>
          <label>
            Your email
            <input
              name="email"
              type="email"
              placeholder="ada@example.com"
              required
            />
          </label>
          <label>
            Project context
            <textarea
              name="message"
              placeholder="Tell me what you are building, what is broken, or what needs to scale."
              rows={6}
              required
            />
          </label>
          <button type="submit" className="farid-button-primary">
            {loading ? "Sending..." : "Send Message"} <span>↗</span>
          </button>
          {sent && <p className="farid-success">Message sent.</p>}
        </form>
      </div>
    </section>
  );
}

export default function App() {
  useHomeSeo();
  return (
    <main className="farid-shell">
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <FieldNotes />
      <Contact />
    </main>
  );
}
