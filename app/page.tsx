import GradientBackground from "@/components/GradientBackground";
import HeroWordmark from "@/components/HeroWordmark";
import Nav from "@/components/Nav";
import ProcessRoadmap from "@/components/ProcessRoadmap";
import Reveal from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import WorkCard from "@/components/WorkCard";
import { getYouTubeId } from "@/components/youtube";
import { getClientLogos } from "@/components/logos";

// Paste a YouTube link here and the header video slot under the MYNKA
// wordmark will play it (muted, looping). Leave "" for the placeholder.
const HERO_VIDEO = "";

const SERVICES = [
  {
    num: "01",
    title: "Video Production",
    body: "No-one reads text these days, your business needs videos. VSL's, Manifestos, Testimonials, How-to's. We tell your story.",
  },
  {
    num: "02",
    title: "Commercials & Advertising",
    body: "It's a social first world, and that's what we believe in. We will produce and run social ads better than anyone in the space",
  },
  {
    num: "03",
    title: "Brand & Campaign Strategy",
    body: "This one is my favorite, I get to interrogate you with questions to later tell you what your business does. And sometimes make a logo and colors to match",
  },
  {
    num: "04",
    title: "Consulting",
    body: "Wanna do it yourself, but need a bit of a hand? Shoot me an email, we'll grab coffee and I'll tell you all I know",
  },
];

// Paste a YouTube link into `video` (any format: youtube.com/watch?v=...,
// youtu.be/..., or a Shorts link) and that square becomes playable.
// Leave it as "" to show the card without a play button.
const WORK = [
  { tag: "Brand Film", title: "Birth of a Cabinet Door", client: "Panhandle Door", theme: "work-card-1", video: "" },
  { tag: "Organic Content", title: "Big Logs", client: "Caribou Creek", theme: "work-card-2", video: "" },
  { tag: "Social Campaign", title: "Framing America", client: "Mayor Construction", theme: "work-card-3", video: "" },
  { tag: "Product Commercial", title: "It Floats", client: "Power Batt", theme: "work-card-4", video: "" },
  { tag: "Impact Story", title: "You are a Light", client: "Generation Alive", theme: "work-card-5", video: "" },
  { tag: "Educational", title: "How to Work", client: "Noble Healthcare", theme: "work-card-6", video: "" },
];

// Paste a YouTube link into `video` for each client testimonial.
// The box becomes playable once a link is in.
const TESTIMONIALS = [
  {
    num: "01",
    name: "Client Name",
    role: "Role, Company",
    quote: "They made the whole shoot easy. The film did its job.",
    theme: "testi-1",
    video: "",
  },
  {
    num: "02",
    name: "Client Name",
    role: "Role, Company",
    quote: "Clear plan, clear price, and a result we still use.",
    theme: "testi-2",
    video: "",
  },
  {
    num: "03",
    name: "Client Name",
    role: "Role, Company",
    quote: "One call with the owner and we knew we were set.",
    theme: "testi-3",
    video: "",
  },
];

const PROCESS = [
  {
    step: "Discover",
    body: "We dig into your brand, audience, and goals to understand you better than you do.",
  },
  {
    step: "Launch Fast",
    body: "Run ads to get you clients, because that's what you care about",
  },
  {
    step: "Make Art",
    body: "Produce content and ads that perfectly fit your brand and work together for you",
  },
  {
    step: "Post & Launch",
    body: "This is when you get to work, because if we've done our job, you should have plenty of it",
  },
];

const PRINCIPLES = [
  {
    title: "No AI. Anywhere*",
    body: "I might have made this website with AI, but we never let AI do the creative work, your brand is your baby and our promise is only real people will lay hand on it.",
  },
  {
    title: "US Based, US ran.",
    body: "I'm Andrii Mynka, the Founder of MYNKA. and I get to touch and oversee every project. Your business is curated, and never blindly outsourced",
  },
  {
    title: "We Deliver. On Time.",
    body: "When I started my first agency I was late on pretty much every project, and no business wants to receive a product like that. At MYNKA. we deliver before deadlines. Every time.",
  },
];

const STATS = [
  { value: "120+", label: "Projects delivered" },
  { value: "38", label: "Brands partnered" },
  { value: "100M+", label: "Views generated" },
];

export default function Home() {
  const logos = getClientLogos();
  return (
    <>
      <GradientBackground />
      <Nav />
      <main id="top">
        {/* HERO */}
        <section className="hero" data-palette>
          <HeroWordmark />
          <Reveal delay={150} className="hero-video-reveal">
            {getYouTubeId(HERO_VIDEO) ? (
              <div className="hero-video">
                <iframe
                  className="work-video"
                  src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(HERO_VIDEO)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(HERO_VIDEO)}&controls=0&rel=0`}
                  title="MYNKA showreel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="hero-video">
                
              </div>
            )}
          </Reveal>
        </section>

        {/* STATEMENT */}
        <section className="section statement">
          <Reveal>
            <h2 className="hero-title">
              We make brands
              <br />
              <em>impossible</em> to ignore.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="hero-sub">
              MYNKA is a video production and advertising agency. We turn bold
              ideas into films, commercials, and campaigns that people actually
              watch — and remember.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">
                See the work
              </a>
              <a href="#contact" className="btn btn-ghost">
                Start a project
              </a>
            </div>
          </Reveal>
        </section>

        {/* CLIENT LOGO MARQUEE */}
        {logos.length > 0 && (
          <div className="marquee logo-marquee" aria-label="Our clients">
            <div className="marquee-track logo-track">
              {[...logos, ...logos].map((logo, i) => (
                <img
                  key={i}
                  className="client-logo"
                  src={logo.src}
                  alt={logo.alt}
                  aria-hidden={i >= logos.length}
                />
              ))}
            </div>
          </div>
        )}

        {/* SERVICES */}
        <section className="section" id="services" data-palette>
          <Reveal>
            <h2 className="section-title">
              You need it,
              <br />
              We do it.
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
            <h2 className="section-title">
              Some things we do.
              <br />
              In case you&apos;re not sold yet.
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

        {/* TESTIMONIALS */}
        <section className="section" id="testimonials" data-palette>
          <Reveal>
            <h2 className="section-title">
              Hear it from
              <br />
              the people we filmed for.
            </h2>
          </Reveal>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.num} delay={i * 100}>
                <TestimonialCard {...t} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="section" id="process" data-palette>
          <Reveal>
            <h2 className="section-title">
              You work fast
              <br />
              We work faster.
            </h2>
          </Reveal>
          <div className="process-wrap">
            <ProcessRoadmap />
            <ol className="process-list">
              {PROCESS.map((p, i) => (
                <Reveal key={p.step} delay={i * 100}>
                  <li className="process-item">
                    <span className="process-index">{i + 1}</span>
                    <div>
                      <h3>{p.step}</h3>
                      <p>{p.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
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
            <h2 className="contact-title">
              Got a story
              <br />
              worth telling?
            </h2>
            <p className="hero-sub contact-sub">
              Tell us what you&apos;re building. And we will send it to the moon. (Not literally, unless you're building spaceships)
            </p>
            <a href="mailto:andrey@mtmcreative.me" className="btn btn-primary btn-large">
              andrii@mynka.us
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <span className="footer-logo">
          MYNKA<span className="nav-logo-dot">.</span>
        </span>
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
