import { useState } from "react";
import {
  ArrowRight, Flash, ShieldCheck, Internet, StatsReport,
  CodeBrackets, MultiplePages, NavArrowDown,
  Quote, Check
} from "iconoir-react";
import { Section, Group, mono } from "./Shared";

// ── Hero ──────────────────────────────────────────────────────────────
function HeroShowcase() {
  return (
    <div className="border border-[var(--t-border)] rounded-sm p-8 text-center hero-animated" style={{ 
      background: "linear-gradient(to bottom, var(--t-bg-subtle), var(--t-bg-card))",
      animation: "clipWipe 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      opacity: 0,
      clipPath: "inset(0 100% 0 0)"
    }}>
      <div style={{
        ...mono,
        animation: "contentReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards",
        opacity: 0,
        transform: "translateX(-10px)"
      }} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--t-bg-muted)] text-[var(--t-fg-muted)] text-xs rounded-full mb-4 hero-content">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Now in beta · v2.0
      </div>
      <h1
        style={{ 
          fontFamily: "var(--ds-font-display)", 
          color: "var(--t-fg)",
          animation: "contentReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards",
          opacity: 0,
          transform: "translateX(-10px)"
        }}
        className="text-4xl mb-3 leading-tight hero-content"
      >
        Ship faster with<br />
        <em>better components</em>
      </h1>
      <p style={{ 
        ...mono, 
        color: "var(--t-fg-muted)",
        animation: "contentReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards",
        opacity: 0,
        transform: "translateX(-10px)"
      }} className="text-xs max-w-xs mx-auto leading-relaxed mb-6 hero-content">
        A minimal, production-ready design system built for modern web applications.
        Start building in minutes, not months.
      </p>
      <div className="flex items-center justify-center gap-2 hero-content" style={{
        animation: "contentReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards",
        opacity: 0,
        transform: "translateX(-10px)"
      }}>
        <button style={mono} className="px-4 py-2 bg-neutral-950 text-white text-xs rounded-sm hover:bg-neutral-800 flex items-center gap-1.5">
          Get started <ArrowRight width={12} height={12} />
        </button>
        <button style={mono} className="px-4 py-2 border border-neutral-200 text-neutral-700 text-xs rounded-sm hover:bg-neutral-50">
          View docs
        </button>
      </div>
      <p style={{ 
        ...mono, 
        color: "var(--t-fg-subtle)",
        animation: "contentReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards",
        opacity: 0,
        transform: "translateX(-10px)"
      }} className="text-xs mt-3 hero-content">Free to use · MIT license · No attribution required</p>
      
      <style>{`
        @keyframes clipWipe {
          to { 
            opacity: 1; 
            clip-path: inset(0 0 0 0); 
          }
        }
        
        @keyframes contentReveal {
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .hero-animated,
          .hero-content {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── Feature Grid ──────────────────────────────────────────────────────
function FeatureGridShowcase() {
  const features = [
    { icon: Flash, title: "Fast by default", desc: "Zero runtime CSS-in-JS. Tailwind-native tokens with instant hot reload." },
    { icon: ShieldCheck, title: "Accessible", desc: "WCAG 2.1 AA compliant. Radix UI primitives with full keyboard support." },
    { icon: MultiplePages, title: "Composable", desc: "Every component is built to compose. Mix, extend, and override with ease." },
    { icon: CodeBrackets, title: "Type-safe", desc: "Full TypeScript support. Strict types, no implicit any, excellent DX." },
    { icon: Internet, title: "i18n ready", desc: "RTL support, locale-aware formatting, and seamless localization hooks." },
    { icon: StatsReport, title: "Data rich", desc: "Charts, tables, KPIs, and timelines that look great out of the box." },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <div key={f.title} className="border border-[var(--t-border)] rounded-sm p-3 bg-[var(--t-bg-card)] hover:border-[var(--t-border-strong)] transition-colors">
            <div className="w-7 h-7 bg-[var(--t-bg-muted)] rounded-sm flex items-center justify-center mb-2">
              <Icon width={13} height={13} className="text-neutral-700" />
            </div>
            <h4 style={{ fontFamily: "var(--ds-font-display)", color: "var(--t-fg)" }} className="text-sm mb-1">{f.title}</h4>
            <p style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs leading-relaxed">{f.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Logo Strip ────────────────────────────────────────────────────────
function LogoStripShowcase() {
  const logos = ["Linear", "Vercel", "Stripe", "Notion", "Figma", "Loom", "Raycast"];
  return (
    <div className="border border-[var(--t-border)] rounded-sm p-4 bg-[var(--t-bg-subtle)]">
      <p style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs uppercase tracking-wider text-center mb-4">
        Trusted by teams at
      </p>
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {logos.map((logo) => (
          <div key={logo} style={{ fontFamily: "var(--ds-font-display)", color: "var(--t-fg-subtle)" }} className="text-sm font-medium hover:text-[var(--t-fg)] transition-colors cursor-default">
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Pricing Table ─────────────────────────────────────────────────────
function PricingShowcase() {
  const [annual, setAnnual] = useState(true);
  const tiers = [
    {
      name: "Hobby",
      price: annual ? "0" : "0",
      desc: "For personal projects",
      features: ["5 components", "Community support", "MIT license"],
      cta: "Get started",
      highlight: false,
    },
    {
      name: "Pro",
      price: annual ? "19" : "24",
      desc: "For growing teams",
      features: ["Unlimited components", "Priority support", "Figma kit", "Custom themes"],
      cta: "Start free trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For large orgs",
      features: ["Everything in Pro", "SSO", "SLA", "Dedicated support"],
      cta: "Contact sales",
      highlight: false,
    },
  ];
  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span style={mono} className="text-xs text-neutral-600">Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`w-9 h-5 rounded-full transition-colors relative ${annual ? "bg-neutral-950" : "bg-neutral-200"}`}
        >
          <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform shadow-sm ${annual ? "translate-x-[18px]" : "translate-x-0.5"}`} />
        </button>
        <span style={mono} className="text-xs text-neutral-600">Annual</span>
        {annual && <span style={mono} className="text-xs px-1.5 py-0.5 bg-green-50 text-green-700 rounded-full">Save 20%</span>}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`border rounded-sm p-4 ${
              tier.highlight
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-[var(--t-border)] bg-[var(--t-bg-card)]"
            }`}
          >
            <div style={mono} className={`text-xs uppercase tracking-wider mb-2 ${tier.highlight ? "text-neutral-400" : "text-neutral-500"}`}>
              {tier.name}
            </div>
            <div className="flex items-baseline gap-0.5 mb-1">
              {tier.price !== "Custom" && <span style={mono} className={`text-sm ${tier.highlight ? "text-neutral-400" : "text-neutral-500"}`}>$</span>}
              <span style={{ fontFamily: "var(--ds-font-display)" }} className={`text-2xl ${tier.highlight ? "text-white" : "text-[var(--t-fg)]"}`}>
                {tier.price}
              </span>
              {tier.price !== "Custom" && <span style={mono} className={`text-xs ${tier.highlight ? "text-neutral-500" : "text-neutral-400"}`}>/mo</span>}
            </div>
            <p style={mono} className={`text-xs mb-3 ${tier.highlight ? "text-neutral-400" : "text-neutral-500"}`}>{tier.desc}</p>
            <div className="space-y-1.5 mb-4">
              {tier.features.map((f) => (
                <div key={f} className="flex items-center gap-1.5">
                  <Check width={10} height={10} className={tier.highlight ? "text-green-400" : "text-green-600"} />
                  <span style={mono} className={`text-xs ${tier.highlight ? "text-neutral-300" : "text-neutral-600"}`}>{f}</span>
                </div>
              ))}
            </div>
            <button
              style={mono}
              className={`w-full py-1.5 text-xs rounded-sm transition-colors ${
                tier.highlight
                  ? "bg-white text-neutral-950 hover:bg-neutral-100"
                  : "border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Testimonial ───────────────────────────────────────────────────────
function TestimonialShowcase() {
  const testimonials = [
    {
      quote: "This design system cut our development time in half. The tokens are perfectly thought out.",
      name: "Sarah Chen",
      role: "Head of Design",
      company: "Linear",
      initials: "SC",
      color: "bg-blue-600",
    },
    {
      quote: "Finally a system that looks good AND has proper accessibility built in. Remarkable.",
      name: "James Park",
      role: "Engineering Lead",
      company: "Vercel",
      initials: "JP",
      color: "bg-neutral-900",
    },
    {
      quote: "We shipped our design system to 5 teams in 2 weeks using this as the foundation.",
      name: "Mia Torres",
      role: "Product Manager",
      company: "Stripe",
      initials: "MT",
      color: "bg-violet-600",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {testimonials.map((t) => (
        <div key={t.name} className="border border-[var(--t-border)] rounded-sm p-4 bg-[var(--t-bg-card)]">
          <Quote width={14} height={14} className="text-neutral-200 mb-2" />
          <p style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs leading-relaxed mb-3">{t.quote}</p>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
              <span style={mono} className="text-xs text-white">{t.initials}</span>
            </div>
            <div>
              <div style={{ ...mono, color: "var(--t-fg)" }} className="text-xs">{t.name}</div>
              <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs">{t.role} · {t.company}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── FAQ Accordion ─────────────────────────────────────────────────────
function FAQShowcase() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = [
    { q: "Is this free to use?", a: "Yes, completely free for personal and commercial use under the MIT license." },
    { q: "Does it work with Next.js and Remix?", a: "Absolutely. It's framework-agnostic and works with any React-based stack." },
    { q: "Can I use my own design tokens?", a: "Yes. All tokens are CSS custom properties, easily overridden in your own stylesheet." },
    { q: "Is there a Figma kit available?", a: "Yes, the Figma kit is available on Pro and Enterprise plans with full coverage." },
  ];
  return (
    <div className="border border-[var(--t-border)] rounded-sm divide-y divide-[var(--t-border-subtle)] max-w-lg bg-[var(--t-bg-card)]">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[var(--t-bg-subtle)] transition-colors"
          >
            <span style={{ ...mono, color: "var(--t-fg)" }} className="text-xs">{faq.q}</span>
            <NavArrowDown
              width={13}
              height={13}
              className={`text-neutral-400 transition-transform flex-shrink-0 ml-4 ${openIdx === i ? "rotate-180" : ""}`}
            />
          </button>
          {openIdx === i && <p style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs px-4 pb-3 leading-relaxed">{faq.a}</p>}
        </div>
      ))}
    </div>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────
function CTABannerShowcase() {
  return (
    <div className="bg-neutral-950 rounded-sm p-6 flex items-center justify-between gap-4">
      <div>
        <h3 style={{ fontFamily: "var(--ds-font-display)" }} className="text-xl text-white mb-1">
          Ready to build something great?
        </h3>
        <p style={mono} className="text-xs text-neutral-400">
          Join 2,000+ teams using this design system in production.
        </p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button style={mono} className="px-4 py-2 bg-[var(--t-bg-card)] text-[var(--t-fg)] text-xs rounded-sm hover:bg-[var(--t-bg-subtle)] flex items-center gap-1.5">
          Get started <ArrowRight width={12} height={12} />
        </button>
        <button style={mono} className="px-4 py-2 border border-neutral-700 text-white text-xs rounded-sm hover:border-neutral-500">
          View docs
        </button>
      </div>
    </div>
  );
}

// ── Content Card ──────────────────────────────────────────────────────
function ContentCardShowcase() {
  const cards = [
    {
      tag: "Case Study",
      title: "How Acme rebuilt their design system in 6 weeks",
      excerpt: "A deep dive into the token architecture, component strategy, and team workflows that made it possible.",
      author: "Sarah Chen",
      date: "Apr 12, 2026",
      readTime: "8 min read",
      initials: "SC",
      color: "bg-blue-600",
    },
    {
      tag: "Blog",
      title: "The case for monospaced UI typography",
      excerpt: "Why more teams are choosing monospace fonts for their design systems, and how to do it well.",
      author: "James Park",
      date: "Apr 8, 2026",
      readTime: "5 min read",
      initials: "JP",
      color: "bg-neutral-800",
    },
    {
      tag: "Guide",
      title: "Design tokens: a practical primer",
      excerpt: "From primitive values to semantic aliases—everything you need to know about token architecture.",
      author: "Mia Torres",
      date: "Mar 29, 2026",
      readTime: "12 min read",
      initials: "MT",
      color: "bg-violet-600",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map((card) => (
        <div key={card.title} className="border border-[var(--t-border)] rounded-sm bg-[var(--t-bg-card)] hover:border-[var(--t-border-strong)] transition-colors cursor-pointer group">
          <div className="h-20 bg-[var(--t-bg-muted)] rounded-t-sm" />
          <div className="p-3">
            <span style={mono} className="text-xs uppercase tracking-wider text-neutral-400">{card.tag}</span>
            <h4
              style={{ fontFamily: "var(--ds-font-display)", color: "var(--t-fg)" }}
              className="text-sm mt-1 mb-1.5 leading-tight group-hover:text-[var(--t-fg-muted)] transition-colors"
            >
              {card.title}
            </h4>
            <p style={mono} className="text-xs text-neutral-500 leading-relaxed mb-3">{card.excerpt}</p>
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
              <div className={`w-5 h-5 rounded-full ${card.color} flex items-center justify-center`}>
                <span style={mono} className="text-xs text-white">{card.initials}</span>
              </div>
              <div>
                <span style={mono} className="text-xs text-neutral-700">{card.author}</span>
                <span style={mono} className="text-xs text-neutral-400"> · {card.date} · {card.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LandingSection() {
  return (
    <Section id="landing" label="07 · Landing Sections" title="Page-level Blocks">
      <Group label="Hero · Headline · Sub · CTA pair">
        <HeroShowcase />
      </Group>

      <Group label="Feature Grid · Icon + Title + Blurb cards">
        <FeatureGridShowcase />
      </Group>

      <Group label="Logo Strip · Trust / Social proof bar">
        <LogoStripShowcase />
      </Group>

      <Group label="Pricing Table · Toggle · Tier cards">
        <PricingShowcase />
      </Group>

      <Group label="Testimonial · Quote · Avatar · Company">
        <TestimonialShowcase />
      </Group>

      <Group label="FAQ Accordion · Expand / Collapse Q&A">
        <FAQShowcase />
      </Group>

      <Group label="CTA Banner · Conversion bottom block">
        <CTABannerShowcase />
      </Group>

      <Group label="Content Card · Blog · Case study · Press">
        <ContentCardShowcase />
      </Group>
    </Section>
  );
}