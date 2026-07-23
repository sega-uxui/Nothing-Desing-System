import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Flash, ShieldCheck, Internet, StatsReport,
  CodeBrackets, MultiplePages, Quote, Menu, X, Check,
} from "iconoir-react";
import { type ThemeId } from "./themes";
import { useGSAPAnimations, useScrollAnimations } from "../animations";
import { gsap } from "gsap";
import heroBg from "../../assets/freepik_crea-una-imagen-horizonta_2836189948.png";
import heroBgDark from "../../assets/freepik_crea-una-imagen-horizonta_2837241596.png";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { NewsCard } from "./ui/news-card";
import { SkipLink } from "./ui/skip-link";

const mono = {
  fontFamily: "var(--ds-font-body)",
  fontFeatureSettings: '"tnum", "lnum", "kern", "liga", "dlig"',
  letterSpacing: "0.01em",
  lineHeight: 1.6
} as const;

const disp = {
  fontFamily: "var(--ds-font-display)",
  fontFeatureSettings: '"kern", "liga", "dlig", "hlig"',
  letterSpacing: "-0.01em",
  lineHeight: 1.2
} as const;

const heading = {
  fontFamily: "var(--ds-font-display)",
  fontFeatureSettings: '"kern", "liga", "dlig", "hlig"',
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  fontWeight: 400
} as const;

const body = {
  fontFamily: "var(--ds-font-body)",
  fontFeatureSettings: '"tnum", "lnum", "kern", "liga", "dlig"',
  letterSpacing: "0.005em",
  lineHeight: 1.7,
  fontWeight: 400
} as const;

// ── Navigation Header ─────────────────────────────────────────────────────
function NavigationHeader({ mobileMenuOpen, setMobileMenuOpen }: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const navItems = ["Features", "Pricing", "Testimonials", "FAQ", "Blog"];

  return (
    <header className="sticky top-0 z-50 border-b bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm flex-shrink-0 bg-primary transition-colors duration-300" />
            <span style={disp} className="text-lg text-foreground">
              Design System
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={mono}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button style={mono} className="hidden md:inline-flex text-xs">
              Get Started
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X width={20} height={20} /> : <Menu width={20} height={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                style={mono}
                className="block py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────
function HeroSection({ themeId }: { themeId: ThemeId }) {
  const bgImage = themeId === 'dark' ? heroBgDark : heroBg;
  const { createTimeline, prefersReducedMotion } = useGSAPAnimations();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('[data-hero-animate]');
      const bgImageEl = containerRef.current.querySelector('img');

      // Respect reduced motion: snap straight to the final state, no motion
      if (prefersReducedMotion()) {
        gsap.set(elements, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
        elements.forEach((element) => {
          const buttons = element.querySelectorAll('button');
          if (buttons.length) gsap.set(buttons, { opacity: 1, y: 0 });
        });
        if (bgImageEl) gsap.set(bgImageEl, { scale: 1, y: 0 });
        return;
      }

      // Product-optimized hero entrance - fast and functional
      const timeline = createTimeline();

      // Set consistent initial states for all elements
      gsap.set(elements, {
        opacity: 0,
        y: 30,
        scale: 0.98,
        filter: "blur(8px)",
      });

      // Product-optimized staggered animation - faster timing for task-focused users
      elements.forEach((element, index) => {
        const el = element as HTMLElement;

        // Special handling for individual buttons within container
        if (el.querySelector('button')) {
          // Set initial state for buttons
          const buttons = el.querySelectorAll('button');
          gsap.set(buttons, {
            opacity: 0,
            y: 10, // Reduced distance for product UI
          });

          // Animate container and buttons together with product timing
          timeline.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.25,
            ease: "power2.out",
          }, index * 0.08);

          // Animate buttons with container - product-optimized timing
          buttons.forEach((button, btnIndex) => {
            timeline.to(button, {
              opacity: 1,
              y: 0,
              duration: 0.15, // Fast feedback for product UI
              ease: "power2.out",
            }, index * 0.08 + 0.03 + (btnIndex * 0.02)); // Tighter stagger
          });
        } else {
          // Standard animation for all other elements
          timeline.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.25,
            ease: "power2.out",
          }, index * 0.08);
        }
      });

      // Background animation - faster for product UI
      if (bgImageEl) {
        gsap.fromTo(bgImageEl,
          { scale: 1.02, y: 15 },
          {
            scale: 1,
            y: 0,
            duration: 0.5, // Much faster for product UI
            ease: "power2.out"
          }
        );
      }
    }
  }, [createTimeline, prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden text-foreground transition-colors duration-300">
      {/* Background image layer */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Gradient overlay: transparent at top → theme bg from mid to bottom */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: `linear-gradient(to bottom, transparent 0%, transparent 40%, var(--background) 100%)`,
        }}
      />

      {/* Content */}
      <div ref={containerRef} className="relative py-20 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-7xl mx-auto text-center">
          <Badge
            data-hero-animate
            variant="secondary"
            className="mb-6 gap-1.5 rounded-full border-transparent bg-primary/10 px-3 py-1 text-primary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span style={mono} className="text-xs">Now in beta · v2.0</span>
          </Badge>

          <h1
            data-hero-animate
            style={heading}
            className="text-5xl md:text-6xl mb-6 text-foreground"
          >
            Ship faster with<br />
            <em className="text-primary italic">better components</em>
          </h1>

          <p
            data-hero-animate
            style={body}
            className="text-sm md:text-base max-w-2xl mx-auto mb-8 text-muted-foreground"
          >
            A minimal, production-ready design system built for modern web applications.
            Start building in minutes, not months.
          </p>

          <div
            data-hero-animate
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <Button data-hover-scale="1.05" style={mono} className="text-sm gap-2">
              Get started <ArrowRight width={16} height={16} />
            </Button>
            <Button data-hover-scale="1.05" variant="outline" style={mono} className="text-sm">
              View docs
            </Button>
          </div>

          <p
            data-hero-animate
            style={mono}
            className="text-xs text-muted-foreground"
          >
            Free to use · MIT license · No attribution required
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Logo Strip ───────────────────────────────────────────────────────────
function LogoStrip({ themeId }: { themeId: ThemeId }) {
  const { containerRef, staggerReveal } = useScrollAnimations();

  const logos = [
    { name: "Linear", slug: "linear" },
    { name: "Vercel", slug: "vercel" },
    { name: "Stripe", slug: "stripe" },
    { name: "Notion", slug: "notion" },
    { name: "Figma", slug: "figma" },
    { name: "Loom", slug: "loom" },
    { name: "Raycast", slug: "raycast" }
  ];

  useEffect(() => {
    if (containerRef.current) {
      const logoElements = containerRef.current.querySelectorAll('[data-logo-animate]');
      if (logoElements.length > 0) {
        staggerReveal(Array.from(logoElements) as HTMLElement[], 0.1, 'up');
      }
    }
  }, [staggerReveal]);

  return (
    <section
      ref={containerRef}
      className="py-12 px-6 bg-background transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <p
          data-scroll-reveal="up"
          style={mono}
          className="text-xs uppercase tracking-wider text-center mb-10 text-muted-foreground"
        >
          Trusted by teams at
        </p>
        <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
          {logos.map((logo) => (
            <div
              key={logo.name}
              data-logo-animate
              className="group relative flex items-center justify-center"
              title={logo.name}
            >
              <img
                src={`https://cdn.simpleicons.org/${logo.slug}`}
                alt={logo.name}
                className="h-6 w-auto transition-all duration-300"
                style={{
                  filter: themeId === 'dark' ? 'invert(1) brightness(2) grayscale(1) opacity(0.4)' : 'grayscale(1) opacity(0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = themeId === 'dark' ? 'invert(1) brightness(2) grayscale(1) opacity(1)' : 'grayscale(1) opacity(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = themeId === 'dark' ? 'invert(1) brightness(2) grayscale(1) opacity(0.4)' : 'grayscale(1) opacity(0.4)';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features Section ─────────────────────────────────────────────────────
function FeaturesSection() {
  const { addBrandHover } = useGSAPAnimations();
  const { containerRef, reveal, staggerReveal: scrollStaggerReveal } = useScrollAnimations();

  const features = [
    { icon: Flash, title: "Fast by default", desc: "Zero runtime CSS-in-JS. Tailwind-native tokens with instant hot reload." },
    { icon: ShieldCheck, title: "Accessible", desc: "WCAG 2.1 AA compliant. Radix UI primitives with full keyboard support." },
    { icon: MultiplePages, title: "Composable", desc: "Every component is built to compose. Mix, extend, and override with ease." },
    { icon: CodeBrackets, title: "Type-safe", desc: "Full TypeScript support. Strict types, no implicit any, excellent DX." },
    { icon: Internet, title: "i18n ready", desc: "RTL support, locale-aware formatting, and seamless localization hooks." },
    { icon: StatsReport, title: "Data rich", desc: "Charts, tables, KPIs, and timelines that look great out of the box." },
  ];

  useEffect(() => {
    if (containerRef.current) {
      const header = containerRef.current.querySelector('[data-features-header]');
      if (header) {
        reveal(header as HTMLElement, 'up');
      }

      const featureCards = containerRef.current.querySelectorAll('[data-feature-card]');
      scrollStaggerReveal(Array.from(featureCards) as HTMLElement[], 0.15, 'up');

      featureCards.forEach((card) => {
        addBrandHover(card as HTMLElement, 'card');
      });
    }
  }, [reveal, scrollStaggerReveal, addBrandHover]);

  return (
    <section id="features" className="py-20 px-6 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-features-header>
          <h2 style={heading} className="text-4xl mb-4 text-foreground">
            Everything you need to build fast
          </h2>
          <p style={body} className="text-sm md:text-base max-w-2xl mx-auto text-muted-foreground">
            From primitive tokens to complex patterns, every component is designed to work together seamlessly.
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} data-feature-card className="p-6 bg-muted transition-all duration-250">
                <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4 bg-primary/10">
                  <Icon width={20} height={20} className="text-primary" />
                </div>
                <h3 style={disp} className="text-xl mb-2 text-foreground">
                  {f.title}
                </h3>
                <p style={mono} className="text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials Section ─────────────────────────────────────────────────
function TestimonialsSection() {
  const { addBrandHover } = useGSAPAnimations();
  const { containerRef, reveal, staggerReveal: scrollStaggerReveal } = useScrollAnimations();

  const testimonials = [
    {
      quote: "This design system cut our development time in half. The tokens are perfectly thought out.",
      name: "Sarah Chen",
      role: "Head of Design",
      company: "Linear",
      initials: "SC",
      variant: "accent" as const,
    },
    {
      quote: "Finally a system that looks good AND has proper accessibility built in. Remarkable.",
      name: "James Park",
      role: "Engineering Lead",
      company: "Vercel",
      initials: "JP",
      variant: "neutral" as const,
    },
    {
      quote: "We shipped our design system to 5 teams in 2 weeks using this as the foundation.",
      name: "Mia Torres",
      role: "Product Manager",
      company: "Stripe",
      initials: "MT",
      variant: "accent" as const,
    },
  ];

  useEffect(() => {
    if (containerRef.current) {
      const header = containerRef.current.querySelector('[data-testimonials-header]');
      if (header) {
        reveal(header as HTMLElement, 'up');
      }

      const testimonialCards = containerRef.current.querySelectorAll('[data-testimonial-card]');
      scrollStaggerReveal(Array.from(testimonialCards) as HTMLElement[], 0.2, 'up');

      testimonialCards.forEach((card) => {
        addBrandHover(card as HTMLElement, 'card');
      });
    }
  }, [reveal, scrollStaggerReveal, addBrandHover]);

  return (
    <section id="testimonials" className="py-20 px-6 bg-muted transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-testimonials-header>
          <h2 style={disp} className="text-4xl mb-4 text-foreground">
            Loved by teams everywhere
          </h2>
          <p style={mono} className="text-sm max-w-2xl mx-auto text-muted-foreground">
            See what developers and designers are saying about their experience with our design system.
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((tst) => (
            <Card key={tst.name} data-testimonial-card className="p-6 bg-background transition-all duration-250">
              <Quote width={24} height={24} className="mb-4 text-muted-foreground" />
              <p style={mono} className="text-sm leading-relaxed mb-6 text-muted-foreground">
                {tst.quote}
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="flex-shrink-0">
                  <AvatarFallback
                    className={tst.variant === "accent" ? "bg-primary text-primary-foreground" : "bg-foreground text-background"}
                  >
                    {tst.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div style={mono} className="text-sm font-medium text-foreground">
                    {tst.name}
                  </div>
                  <div style={mono} className="text-xs text-muted-foreground">
                    {tst.role} · {tst.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing Section ───────────────────────────────────────────────────────
function PricingSection() {
  const [annual, setAnnual] = useState(true);

  const tiers = [
    {
      name: "Hobby",
      price: "0",
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
    <section id="pricing" className="py-20 px-6 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 style={disp} className="text-4xl mb-4 text-foreground">
            Simple, transparent pricing
          </h2>
          <p style={mono} className="text-sm max-w-2xl mx-auto mb-8 text-muted-foreground">
            Choose the plan that fits your needs. All plans include our core component library.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span style={mono} className="text-sm text-foreground">Monthly</span>
            <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" />
            <span style={mono} className="text-sm text-foreground">Annual</span>
            {annual && (
              <Badge variant="secondary" className="rounded-full border-transparent bg-primary/10 text-primary">
                <span style={mono} className="text-xs">Save 20%</span>
              </Badge>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`p-8 transition-all duration-200 hover:scale-105 ${tier.highlight
                ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary"
                : "bg-muted"
                }`}
            >
              <div
                style={mono}
                className={`text-xs uppercase tracking-wider mb-2 ${tier.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}
              >
                {tier.name}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                {tier.price !== "Custom" && (
                  <span style={mono} className={`text-sm ${tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>$</span>
                )}
                <span style={disp} className="text-4xl">
                  {tier.price}
                </span>
                {tier.price !== "Custom" && (
                  <span style={mono} className={`text-sm ${tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>/mo</span>
                )}
              </div>
              <p style={mono} className={`text-sm mb-6 ${tier.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {tier.desc}
              </p>
              <div className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check width={16} height={16} className={tier.highlight ? "text-primary-foreground" : "text-primary"} />
                    <span style={mono} className="text-sm">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant={tier.highlight ? "secondary" : "outline"}
                className="w-full"
                style={mono}
              >
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ Section ───────────────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    { q: "Is this free to use?", a: "Yes, completely free for personal and commercial use under the MIT license." },
    { q: "Does it work with Next.js and Remix?", a: "Absolutely. It's framework-agnostic and works with any React-based stack." },
    { q: "Can I use my own design tokens?", a: "Yes. All tokens are CSS custom properties, easily overridden in your own stylesheet." },
    { q: "Is there a Figma kit available?", a: "Yes, the Figma kit is available on Pro and Enterprise plans with full coverage." },
    { q: "How do I get started?", a: "Install the package, import the components, and start building. Full documentation available." },
    { q: "Can I contribute to the project?", a: "Yes! We welcome contributions. Check our GitHub repository for guidelines." },
  ];

  return (
    <section id="faq" className="py-20 px-6 bg-muted transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 style={disp} className="text-4xl mb-4 text-foreground">
            Frequently asked questions
          </h2>
          <p style={mono} className="text-sm max-w-2xl mx-auto text-muted-foreground">
            Got questions? We've got answers. If you don't see your question here, feel free to reach out.
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border rounded-sm bg-background px-6 last:border-b"
            >
              <AccordionTrigger style={mono} className="text-sm font-medium text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent style={mono} className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ── Blog Section ───────────────────────────────────────────────────────────
function BlogSection() {
  const { addBrandHover } = useGSAPAnimations();
  const { containerRef, reveal, staggerReveal: scrollStaggerReveal } = useScrollAnimations();

  const posts = [
    {
      tag: "Case Study",
      title: "How Acme rebuilt their design system in 6 weeks",
      excerpt: "A deep dive into the token architecture, component strategy, and team workflows that made it possible.",
      author: "Sarah Chen",
      date: "Apr 12, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=640&q=60",
    },
    {
      tag: "Blog",
      title: "The case for monospaced UI typography",
      excerpt: "Why more teams are choosing monospace fonts for their design systems, and how to do it well.",
      author: "James Park",
      date: "Apr 8, 2026",
      readTime: "5 min read",
    },
    {
      tag: "Guide",
      title: "Design tokens: a practical primer",
      excerpt: "From primitive values to semantic aliases—everything you need to know about token architecture.",
      author: "Mia Torres",
      date: "Mar 29, 2026",
      readTime: "12 min read",
    },
  ];

  useEffect(() => {
    if (containerRef.current) {
      const header = containerRef.current.querySelector('[data-blog-header]');
      if (header) {
        reveal(header as HTMLElement, 'up');
      }

      const blogCards = containerRef.current.querySelectorAll('[data-blog-card]');
      scrollStaggerReveal(Array.from(blogCards) as HTMLElement[], 0.2, 'up');

      blogCards.forEach((card) => {
        addBrandHover(card as HTMLElement, 'card');
      });
    }
  }, [reveal, scrollStaggerReveal, addBrandHover]);

  return (
    <section id="blog" className="py-20 px-6 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-blog-header>
          <h2 style={disp} className="text-4xl mb-4 text-foreground">
            Latest from the blog
          </h2>
          <p style={mono} className="text-sm max-w-2xl mx-auto text-muted-foreground">
            Tips, tutorials, and insights from our team of design system experts.
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.title} data-blog-card>
              <NewsCard
                image={post.image}
                tag={post.tag}
                title={post.title}
                source={`${post.author} · ${post.date}`}
                time={post.readTime}
                onClick={() => {}}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────────────────
function CTASection() {
  const { reveal, scaleReveal } = useScrollAnimations();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      scaleReveal(containerRef.current, 0.9, 1);

      const title = containerRef.current.querySelector('[data-cta-title]');
      const description = containerRef.current.querySelector('[data-cta-description]');
      const buttons = containerRef.current.querySelector('[data-cta-buttons]');

      if (title) reveal(title as HTMLElement, 'up');
      if (description) reveal(description as HTMLElement, 'up');
      if (buttons) reveal(buttons as HTMLElement, 'up');
    }
  }, [reveal, scaleReveal]);

  return (
    <section className="py-20 px-6 bg-muted transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div
          ref={containerRef}
          className="rounded-2xl p-12 text-center transition-all duration-200 hover:scale-105 bg-primary text-primary-foreground"
        >
          <h2 data-cta-title style={disp} className="text-4xl mb-4">
            Ready to build something great?
          </h2>
          <p data-cta-description style={mono} className="text-lg mb-8 opacity-90">
            Join 2,000+ teams using this design system in production.
          </p>
          <div data-cta-buttons className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              style={mono}
              className="gap-2 bg-background text-primary hover:bg-background/90"
            >
              Get started <ArrowRight width={16} height={16} />
            </Button>
            <Button
              variant="outline"
              style={mono}
              className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
            >
              View docs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-6 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-sm flex-shrink-0 bg-primary" />
              <span style={disp} className="text-lg text-foreground">
                Design System
              </span>
            </div>
            <p style={mono} className="text-xs leading-relaxed text-muted-foreground">
              A minimal, production-ready design system built for modern web applications.
            </p>
          </div>

          <div>
            <h4 style={mono} className="text-sm font-medium mb-4 text-foreground">Product</h4>
            <ul className="space-y-2">
              {["Components", "Tokens", "Themes", "Icons"].map((item) => (
                <li key={item}>
                  <a href="#" style={mono} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={mono} className="text-sm font-medium mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2">
              {["Documentation", "Blog", "GitHub", "Figma"].map((item) => (
                <li key={item}>
                  <a href="#" style={mono} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={mono} className="text-sm font-medium mb-4 text-foreground">Company</h4>
            <ul className="space-y-2">
              {["About", "Contact", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <a href="#" style={mono} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div style={mono} className="text-xs text-muted-foreground">
              © 2026 Design System. Built with IBM Plex Mono + EB Garamond · MIT License
            </div>
            <div className="flex items-center gap-6">
              {["Twitter", "GitHub", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={mono}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main Landing Page Component ─────────────────────────────────────────────
export default function LandingPage({ themeId }: {
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const anchor = e.currentTarget as HTMLAnchorElement;
      const target = document.querySelector(anchor.getAttribute('href')!);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' as ScrollLogicalPosition });
        // Focus the target element for better accessibility
        (target as HTMLElement).focus();
      }
    };

    // Keyboard navigation for mobile menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div
      data-theme={themeId}
      className="min-h-screen bg-background text-foreground transition-colors duration-300"
      style={{ fontFamily: "var(--ds-font-body)" }}
    >
      <SkipLink />
      <NavigationHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main id="main-content">
        <HeroSection themeId={themeId} />
        <LogoStrip themeId={themeId} />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
