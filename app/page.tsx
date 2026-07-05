import GradientBackground from "@/components/GradientBackground";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import WorkCard from "@/components/WorkCard";

const SERVICES = [
  {
    num: "01",
    title: "Video Production",
    body: "Concept to final cut. Brand films, product launches, and documentaries shot with cinematic craft and zero filler.",
  },
  {
    num: "02",
    title: "Commercials & Advertising",
    body: "TV spots, social-first ads, and performance creative engineered to stop thumbs and move numbers.",
  },
  {
    num: "03",
    title: "Brand & Campaign Strategy",
    body: "Positioning, messaging, and campaign architecture — so every frame ladders up to a story worth remembering.",
  },
  {
    num: "04",
    title: "Post & Motion Design",
    body: "Editing, color, sound, VFX, and motion graphics that give your footage a pulse and your brand a signature.",
  },
];

// Paste a YouTube link into `video` (any format: youtube.com/watch?v=...,
// youtu.be/..., or a Shorts link) and that square becomes playable.
// Leave it as "" to show the card without a play button.
const WORK = [
  { tag: "Brand Film", title: "Neon District", client: "Streetwear launch", theme: "work-card-1", video: "" },
  { tag: "TV Spot", title: "Full Volume", client: "Audio hardware", theme: "work-card-2", video: "" },
  { tag: "Social Campaign", title: "48 Hours In", client: "Travel platform", theme: "work-card-3", video: "" },
  { tag: "Product Launch", title: "First Light", client: "EV startup", theme: "work-card-4", video: "" },
  { tag: "Documentary", title: "Makers of the City", client: "Cultural fund", theme: "work-card-5", video: "" },
  { tag: "Music Video", title: "Static Bloom", client: "Recording artist", theme: "work-card-6", video: "" },
];

const PROCESS = [
  {
    step: "Discover",
    body: "We dig into your brand, audience, and goals until the brief writes itself.",
  },
  {
    step: "Script & Storyboard",
    body: "Concepts, scripts, and boards you can react to — before a single light is rigged.",
  },
  {
    step: "Shoot",
    body: "Tight crews, cinema glass, and directors who protect the idea on set.",
  },
  {
    step: "Post & Launch",
    body: "Edit, color, sound, and versioning for every platform. Then we ship it loud.",
  },
];

const PRINCIPLES = [
  {
    title: "No AI. Anywhere.",
    body: "We do not use AI to write scripts or make videos. People write the words. People shoot the film. People do the edit. That is the whole point of hiring us.",
  },
  {
    title: "The owner runs every project.",
    body: "MYNKA is owner-run. I am in every project from the first call to the final cut. Nothing goes to a client before I have seen it myself.",
  },
  {
    title: "No blind outsourcing.",
    body: "Your project does not get passed to a team overseas you will never meet. The people you talk to are the people who do the work.",
  },
];

const STATS = [
  { value: "120+", label: "Projects delivered" },
  { value: "38", label: "Brands partnered" },
  { value: "9", label: "Industry awards" },
  { value: "4.2×", label: "Avg. campaign ROI" },
];

export default function Home() {
  return (
    <>
      <GradientBackground />
      <Nav />
      <main id="top">
        {/* HERO */}
        <section className="hero" data-palette>
          <Reveal>
            <p className="eyebrow">Video Production × Advertising</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="hero-title">
              We make brands
              <br />
              <em>impossible</em> to ignore.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="hero-sub">
              MYNKA is a video production and advertising agency. We turn bold
              ideas into films, commercials, and campaigns that people actually
              watch — and remember.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">
                See the work
              </a>
              <a href="#contact" className="btn btn-ghost">
                Start a project
              </a>
            </div>
          </Reveal>
          <div className="hero-scroll-hint" aria-hidden="true">
            <span>Scroll</span>
            <div className="hero-scroll-line" />
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i}>
                Brand Films — Commercials — Social Campaigns — Product Launches
                — Music Videos — Documentaries —&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <section className="section" id="services" data-palette>
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="section-title">
              Full-stack storytelling,
              <br />
              from brief to broadcast.
            </h2>
          </Reveal>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.num} delay={i * 100}>
                <article className="service-card">
                  <span className="service-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section className="section" id="work" data-palette>
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title">
              Stories we&apos;ve told.
              <br />
              Numbers we&apos;ve moved.
            </h2>
          </Reveal>
          <div className="work-grid">
            {WORK.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 100}>
                <WorkCard {...w} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="section" id="process" data-palette>
          <Reveal>
            <p className="eyebrow">Our process</p>
            <h2 className="section-title">
              A process built
              <br />
              for momentum.
            </h2>
          </Reveal>
          <ol className="process-list">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 100}>
                <li className="process-item">
                  <span className="process-index">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{p.step}</h3>
                    <p>{p.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="stats-row">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="stat">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="section" id="how-we-work" data-palette>
          <Reveal>
            <p className="eyebrow">Our promise</p>
            <h2 className="section-title">How we work.</h2>
          </Reveal>
          <div className="principles">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="principle-item">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact" data-palette>
          <Reveal>
            <p className="eyebrow">Let&apos;s talk</p>
            <h2 className="contact-title">
              Got a story
              <br />
              worth telling?
            </h2>
            <p className="hero-sub contact-sub">
              Tell us what you&apos;re building. We&apos;ll bring the cameras,
              the strategy, and the audacity.
            </p>
            <a href="mailto:hello@mynka.agency" className="btn btn-primary btn-large">
              hello@mynka.agency
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <span className="footer-logo">MYNKA</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} MYNKA. Video production &amp; advertising.
        </span>
        <div className="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://vimeo.com" target="_blank" rel="noreferrer">Vimeo</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </>
  );
}
