import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  Clapperboard,
  Code2,
  Sparkles,
  Workflow,
} from "lucide-react";

import CTAButton from "../components/CTAButton";

const portrait = {
  src: "/images/about/vlad-maidanskyi-portrait.jpg",
  alt: "Portrait of Vlad Maidanskyi in a black shirt against a dark studio backdrop.",
};

const expertise = [
  {
    title: "Websites that explain the offer",
    description:
      "Landing pages, business sites, and lightweight web experiences built around clarity, speed, and the next action.",
    icon: Code2,
  },
  {
    title: "Video that makes the work visible",
    description:
      "Production, editing, pacing, color, motion details, and platform-ready cutdowns that turn real work into usable content.",
    icon: Clapperboard,
  },
  {
    title: "Content systems that keep showing up",
    description:
      "Planning, batching, recurring shoots, and repeatable assets so the brand does not go quiet between launches.",
    icon: Camera,
  },
  {
    title: "AI and workflow support",
    description:
      "Simple automations and practical internal systems that reduce repetitive work without making the business harder to run.",
    icon: Workflow,
  },
];

const principles = [
  "Plain-language positioning before polish",
  "Visual assets that support sales conversations",
  "Fast, responsive pages with clear conversion paths",
  "Reusable systems instead of one-off content chaos",
];

const targetClients = [
  "Local service businesses",
  "Construction and trades businesses",
  "Real estate and property-adjacent brands",
  "Founders, creators, and personal brands",
  "Lean teams that need agency-level taste without agency drag",
];

function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-shell">
        <div className="about-hero">
          <div className="about-hero-copy about-reveal">
            <p className="section-eyebrow">About</p>
            <h1 className="about-hero-title">
              I build digital presence that makes businesses easier to understand
              and easier to choose.
            </h1>
            <p className="about-hero-intro">
              I am Vlad Maidanskyi, a digital systems creator working across
              websites, video, content, and practical automation. My work sits
              where creative production meets business clarity: sharper pages,
              better proof, and assets your team can actually use.
            </p>

            <div className="about-hero-actions">
              <CTAButton to="/work">See Selected Work</CTAButton>
              <CTAButton to="/contact" variant="secondary">
                Start a Project
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
              </CTAButton>
            </div>
          </div>

          <div
            className="about-portrait-wrap about-reveal"
            style={{ "--about-delay": "120ms" }}
          >
            <div className="about-portrait-orbit" aria-hidden="true" />
            <figure className="about-portrait-card">
              <img
                src={portrait.src}
                alt={portrait.alt}
                className="about-portrait-image"
                width="1333"
                height="2000"
                decoding="async"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>

        <div className="about-signal-strip about-reveal" style={{ "--about-delay": "180ms" }}>
          <p>One operator</p>
          <p>Client-facing clarity</p>
          <p>Premium visual execution</p>
        </div>

        <div className="about-section-heading about-reveal" style={{ "--about-delay": "220ms" }}>
          <p className="section-eyebrow">What I do</p>
          <h2>Four practical ways I make a brand feel sharper.</h2>
        </div>

        <div className="about-expertise-grid">
          {expertise.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="about-expertise-card about-reveal"
                style={{ "--about-delay": `${260 + index * 70}ms` }}
              >
                <span className="about-card-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>

        <div className="about-story-grid">
          <article className="about-thinking-card about-reveal">
            <span className="about-card-icon" aria-hidden="true">
              <Sparkles size={22} strokeWidth={2} />
            </span>
            <h2>How I think about the work</h2>
            <p>
              A good digital presence should make the business feel more
              trustworthy in the first few seconds. That means the offer is easy
              to read, the visuals feel real, and every page or edit has a job
              beyond looking nice.
            </p>
            <p>
              I do not treat websites, videos, and workflows as separate
              islands. They should point in the same direction, support the same
              sales story, and make the next move obvious.
            </p>
          </article>

          <aside
            className="about-principles-card about-reveal"
            style={{ "--about-delay": "110ms" }}
          >
            <h2>What I protect on every project</h2>
            <ul>
              {principles.map((item) => (
                <li key={item}>
                  <CheckCircle2 aria-hidden="true" size={18} strokeWidth={2.2} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="about-client-band about-reveal">
          <div>
            <p className="section-eyebrow">Best fit</p>
            <h2>For businesses that need clearer presence, not more noise.</h2>
          </div>
          <div className="about-client-list">
            {targetClients.map((client) => (
              <span key={client}>{client}</span>
            ))}
          </div>
        </div>

        <div className="about-final-cta about-reveal">
          <div>
            <p className="section-eyebrow">Next step</p>
            <h2>Tell me what needs to look clearer, sell better, or run smoother.</h2>
          </div>
          <div className="about-final-actions">
            <CTAButton to="/contact">Start a Project</CTAButton>
            <CTAButton to="/recruiters" variant="ghost">
              Recruiter Portfolio
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
