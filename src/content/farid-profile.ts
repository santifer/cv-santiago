export type Lang = "es" | "en";

export const faridProfile = {
  name: "Farid Sayago",
  fullName: "Farid Sayago Villamizar",
  domain: "sayagos.tech",
  location: "Colombia",
  apiBaseUrl: "https://api.sayagos.tech",
  email: "farid.s.villa@gmail.com",
  socials: {
    github: "https://github.com/faridsz0605",
    linkedin: "https://www.linkedin.com/in/faridsayago/",
    x: "https://x.com/farids0805",
    instagram: "https://www.instagram.com/farid_sayago7/",
  },
  hero: {
    eyebrow: "Hello, I'm Farid",
    title: "Building human-made workflows for an AI-powered world.",
    description:
      "I'm an MLOps and data engineer from Colombia building reliable pipelines, cloud infrastructure, and AI systems that stay useful after the demo ends.",
    featuredProject: {
      title: "Wiener Tickets",
      href: "https://github.com/faridsz0605/wiener-tickets",
      summary:
        "An end-to-end MLOps pipeline for IT support ticket classification.",
      role: [
        "Pipeline architecture",
        "Model training workflow",
        "Docker-ready deployment path",
      ],
      process: [
        "Data ingestion and cleaning",
        "Feature engineering",
        "Supervised classification",
        "Experiment tracking",
        "Retraining strategy",
      ],
      status: "In progress",
    },
  },
  metrics: [
    { value: "1+", label: "Years of Data Experience" },
    { value: "2+", label: "Papers Written/Collaborated" },
    { value: "30+", label: "Certifications" },
    { value: "5+", label: "Ongoing Projects" },
  ],
  projects: [
    {
      number: "#01",
      title: "wiener-git",
      status: "Live",
      href: "https://github.com/faridsz0605/wiener-git",
      image: "/images/project1.webp",
      description:
        "A Python implementation of Git internals built from scratch to understand content-addressable storage, object serialization, and CLI design beyond tutorial-level knowledge.",
      stack: ["Python", "CLI", "Git internals"],
      featured: true,
    },
    {
      number: "#02",
      title: "WHTTP",
      status: "In progress",
      href: "https://github.com/faridsz0605/whttp",
      image: "/images/project2.webp",
      description:
        "An HTTP/1.1 server written in C to practice raw socket I/O, parsing boundaries, response formatting, and security-aware request handling.",
      stack: ["C", "HTTP", "Sockets"],
      featured: false,
    },
    {
      number: "#03",
      title: "Wiener Tickets",
      status: "In progress",
      href: "https://github.com/faridsz0605/wiener-tickets",
      image: "/images/project3.webp",
      description:
        "A reproducible MLOps pipeline for ticket classification with data ingestion, feature engineering, supervised training, and retraining strategy.",
      stack: ["Python", "MLOps", "Docker"],
      featured: false,
    },
  ],
  experience: [
    {
      title: "Data Analyst",
      company: "Intcomex",
      date: "July 2025 – February 2026",
      review:
        "Connected data analysis directly with Human Capital business needs, payroll/compliance reporting, ETL preparation, OLAP cube queries, and dashboards leaders could actually use.",
      responsibilities: [
        "Automated dashboards from OLAP cube queries for Human Capital, Finance, and Accounting teams.",
        "Delivered data modeling and analysis with operational impact across 14+ countries.",
        "Built ETL pipelines with Python and delivered insights via Power BI with documented workflows.",
      ],
    },
    {
      title: "Lead Investigator",
      company: "Universidad Santo Tomás",
      date: "June 2022 – January 2026",
      review:
        "Delivered research systems with analytical rigor, reproducible models, and practical insight for academic publication workflows.",
      responsibilities: [
        "Designed and implemented econometric models for academic publications using R and Python.",
        "Delivered research insights through Business Intelligence visualizations.",
        "Developed statistical sampling instruments and parameterization tools.",
      ],
    },
    {
      title: "Associate Investigator",
      company: "Universidad Santo Tomás",
      date: "June 2024 – January 2025",
      review:
        "Built big-data research workflows with Dask, automation, and ethical AI standards for foreign trade analysis.",
      responsibilities: [
        "Built Big Data processing scripts for foreign trade research using Dask and Python.",
        "Applied ethical AI standards within the research workflow.",
        "Automated data pipelines to handle large-scale external trade datasets.",
      ],
    },
    {
      title: "BI Analyst",
      company: "Kimberly-Clark",
      date: "May 2026 – May 2027",
      review:
        "Analyzed Latin American market opportunities and supported decision-making with dashboards, AI-powered insights, and automated data pipelines.",
      responsibilities: [
        "Searched for commercial opportunities in the Latin American market through data analysis and dashboards.",
        "Built AI-powered solutions for market research and consumer insights using machine-learning workflows.",
        "Automated data pipelines for accurate and timely analysis with Python, SQL, and cloud tooling.",
      ],
    },
  ],
  skills: [
    {
      name: "Linux systems administration",
      note: "Operational tooling and daily Linux-first workflows.",
    },
    {
      name: "ML workflows & API design",
      note: "ML workflows, API seams, and production-minded Python systems.",
    },
    {
      name: "AWS & Cloud",
      note: "Cloud infrastructure patterns for resilient data and AI services.",
    },
    {
      name: "Dockerization & Orchestration",
      note: "Containerized environments and orchestration-ready deployment paths. Familiar with Dev ops culture and CI/CD pipelines",
    },
    {
      name: "Git & Version Control",
      note: "Clean history, reproducible delivery, and low-level Git understanding.",
    },
  ],
  technologies: [
    "Python",
    "SQL",
    "Power BI",
    "AWS",
    "PyTorch",
    "Machine Learning",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Linux",
    "Dask",
    "R",
    "Django",
    "FastAPI",
    "Flask",
    "PostgreSQL",
    "Anthropic",
    "Model Context Protocol",
  ],
  certifications: [
    "AI Software Engineer",
    "Data Engineer",
    "IBM Python",
    "Análisis y Visualización de Datos",
    "Inglés Avanzado C1",
  ],
  platziCourses: [
    "Curso de Introducción a AWS: Fundamentos de Cloud Computing",
    "Curso de Inglés Avanzado C1: Argumentos y Discusiones",
    "Curso de Introducción al Desarrollo Backend",
    "Curso de Introducción a la Terminal y Línea de Comandos",
    "Curso de Herramientas de Inteligencia Artificial para Equipos de Datos",
    "Curso de Funciones Matemáticas para Data Science e Inteligencia Artificial",
    "Curso Básico de Cálculo Diferencial para Data Science e Inteligencia Artificial",
    "Curso de Fundamentos de Matemáticas",
    "Curso Básico de Computadores e Informática",
  ],
  abilities: [
    {
      title: "Quality Focus",
      desc: "Delivering high-impact results through a relentless drive for mastery and an uncompromising eye for detail.",
    },
    {
      title: "Assertive Communication",
      desc: "Keeping stakeholders updated at every step to ensure transparency and clarity.",
    },
    {
      title: "Power Documentation",
      desc: "Markdown-based documentation integrated with Notion to centralize knowledge, track team progress in real time, and keep stakeholders aligned.",
    },
  ],
  fieldNote: {
    title: "MLOps Field Notes: Start Small, Stay Reliable",
    slug: "mlops-field-notes",
    description:
      "A practical first note on building reliable machine-learning workflows without over-engineering the system from day one.",
    date: "2026-05-01",
    tags: ["MLOps", "Python", "Infrastructure"],
    heroImage: "/images/project1.webp",
  },
} as const;

export function getSeo() {
  return {
    title: "Farid Sayago — MLOps Engineer · Data Pipelines · AI Systems",
    description:
      "MLOps and data engineer from Colombia building reliable pipelines, cloud infrastructure, and AI systems that stay useful after the demo ends.",
    url: "https://sayagos.tech",
  };
}
