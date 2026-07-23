import React, { useRef, useEffect } from "react";
import { Code, Play, Flash, Eye, Settings, Database } from "iconoir-react";
import { useGSAPAnimations, useScrollAnimations, useHoverAnimations } from "../../animations";

const mono = { fontFamily: "var(--ds-font-body)" } as const;
const disp = { fontFamily: "var(--ds-font-display)" } as const;

export function AnimationsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { fadeInUp, scaleIn, createTimeline } = useGSAPAnimations();
    const { reveal, staggerReveal } = useScrollAnimations();
    const { addScaleHover, addLiftHover, addButtonHover } = useHoverAnimations();

    useEffect(() => {
        // Demo animations for the documentation
        if (containerRef.current) {
            const demoElements = containerRef.current.querySelectorAll('[data-demo]');
            demoElements.forEach((el, index) => {
                setTimeout(() => {
                    fadeInUp(el as HTMLElement);
                }, index * 100);
            });

            // Initialize hover animations for demo cards
            const hoverCards = containerRef.current.querySelectorAll('[data-hover-scale], [data-hover-lift], [data-hover-card]');
            hoverCards.forEach((element) => {
                const htmlElement = element as HTMLElement;

                if (htmlElement.dataset.hoverScale) {
                    const scale = parseFloat(htmlElement.dataset.hoverScale || '1.05');
                    addScaleHover(htmlElement, scale);
                } else if (htmlElement.dataset.hoverLift) {
                    const lift = parseFloat(htmlElement.dataset.hoverLift || '-5');
                    addLiftHover(htmlElement, lift);
                } else if (htmlElement.dataset.hoverCard) {
                    addScaleHover(htmlElement, 1.05);
                }
            });
        }
    }, [fadeInUp, addScaleHover, addLiftHover]);

    return (
        <div
            id="animations"
            ref={containerRef}
            className="px-8 py-8"
            style={{ backgroundColor: "var(--ds-color-surface)" }}
        >
            {/* Header */}
            <div className="mb-8" data-demo>
                <div style={{ ...mono, color: "var(--ds-color-text-muted)" }} className="text-[10px] uppercase tracking-[0.2em] mb-2">
                    GSAP Animations
                </div>
                <h1 style={{ ...disp, color: "var(--ds-color-text)" }} className="text-3xl mb-4">
                    Animation Documentation
                </h1>
                <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-sm leading-relaxed max-w-3xl">
                    Comprehensive animation system built with GSAP. Includes scroll-triggered animations, hover effects,
                    theme transitions, and micro-interactions. All animations are performance-optimized and fully customizable.
                </p>
            </div>

            {/* Complete Implementation Overview */}
            <div className="mb-12" data-demo>
                <h2 style={{ ...disp, color: "var(--ds-color-text)" }} className="text-xl mb-6 flex items-center gap-2">
                    <Database width={20} height={20} />
                    Complete Implementation Overview
                </h2>

                <div className="space-y-6">
                    <div className="p-6 rounded-lg border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-3">✅ 1. GSAP Integration</h3>
                        <ul style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs space-y-1 ml-4">
                            <li>• Installed `gsap` and `@gsap/react` packages</li>
                            <li>• Configured TypeScript support for GSAP</li>
                            <li>• Set up proper React integration</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-lg border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-3">✅ 2. Animation Infrastructure</h3>
                        <ul style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs space-y-1 ml-4">
                            <li>• <strong>Animation Presets</strong>: 40+ pre-built animations (fadeIn, scaleIn, slideIn, hover effects, etc.)</li>
                            <li>• <strong>Easing Functions</strong>: Professional easing library with 40+ easing options</li>
                            <li>• <strong>Utility Functions</strong>: Reusable helpers for theme transitions, stagger effects, scroll animations</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-lg border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-3">✅ 3. React Hooks System</h3>
                        <ul style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs space-y-1 ml-4">
                            <li>• <strong>useGSAPAnimations</strong>: Core animation management with fadeIn, scaleIn, stagger effects</li>
                            <li>• <strong>useScrollAnimations</strong>: Scroll-triggered animations with ScrollTrigger integration</li>
                            <li>• <strong>useHoverAnimations</strong>: Interactive hover effects for buttons, cards, UI elements</li>
                            <li>• <strong>useThemeTransition</strong>: Smooth theme switching animations</li>
                            <li>• <strong>usePageTransition</strong>: Page transition animations for navigation</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-lg border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-3">✅ 4. Data-Attribute System</h3>
                        <ul style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs space-y-1 ml-4">
                            <li>• <code>data-scroll-reveal="up|down|left|right"</code> - Automatic scroll animations</li>
                            <li>• <code>data-hover-scale="1.1"</code> - Scale effects on hover</li>
                            <li>• <code>data-hover-lift="-5"</code> - Lift effects on hover</li>
                            <li>• <code>data-hover-glow="shadow"</code> - Glow effects on hover</li>
                            <li>• <code>data-hover-card</code> - Combined card hover effects</li>
                            <li>• <code>data-scroll-stagger="0.1"</code> - Staggered animations</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-lg border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-3">✅ 5. Enhanced UI Components</h3>
                        <ul style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs space-y-1 ml-4">
                            <li>• Navigation buttons with lift effects on hover</li>
                            <li>• Theme switcher with scale animations</li>
                            <li>• Section scroll animations (fade in as you scroll)</li>
                            <li>• Interactive hover states throughout the interface</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-lg border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-3">✅ 6. Performance Optimizations</h3>
                        <ul style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs space-y-1 ml-4">
                            <li>• Hardware-accelerated CSS transforms</li>
                            <li>• Automatic cleanup on component unmount</li>
                            <li>• Efficient ScrollTrigger management</li>
                            <li>• Throttled hover events</li>
                            <li>• Memory leak prevention</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Animation Hooks */}
            <div className="mb-12" data-demo>
                <h2 style={{ ...disp, color: "var(--ds-color-text)" }} className="text-xl mb-6 flex items-center gap-2">
                    <Code width={20} height={20} />
                    Animation Hooks
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* useGSAPAnimations */}
                    <div
                        data-hover-card
                        className="p-6 rounded-lg border"
                        style={{
                            backgroundColor: "var(--ds-color-surface-elevated)",
                            borderColor: "var(--ds-color-border)",
                        }}
                    >
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">
                            useGSAPAnimations
                        </h3>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mb-4">
                            Core animation management with fadeIn, scaleIn, stagger effects, and timeline creation.
                        </p>
                        <div style={{ ...mono, color: "var(--ds-color-text-muted)" }} className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded">
                            {`const { fadeInUp, scaleIn, stagger } = useGSAPAnimations();`}
                        </div>
                    </div>

                    {/* useScrollAnimations */}
                    <div
                        data-hover-card
                        className="p-6 rounded-lg border"
                        style={{
                            backgroundColor: "var(--ds-color-surface-elevated)",
                            borderColor: "var(--ds-color-border)",
                        }}
                    >
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">
                            useScrollAnimations
                        </h3>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mb-4">
                            Scroll-triggered animations with ScrollTrigger integration for reveal effects.
                        </p>
                        <div style={{ ...mono, color: "var(--ds-color-text-muted)" }} className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded">
                            {`const { reveal, staggerReveal } = useScrollAnimations();`}
                        </div>
                    </div>

                    {/* useHoverAnimations */}
                    <div
                        data-hover-card
                        className="p-6 rounded-lg border"
                        style={{
                            backgroundColor: "var(--ds-color-surface-elevated)",
                            borderColor: "var(--ds-color-border)",
                        }}
                    >
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">
                            useHoverAnimations
                        </h3>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mb-4">
                            Interactive hover effects for buttons, cards, and UI elements.
                        </p>
                        <div style={{ ...mono, color: "var(--ds-color-text-muted)" }} className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded">
                            {`const { addScaleHover, addLiftHover } = useHoverAnimations();`}
                        </div>
                    </div>

                    {/* useThemeTransition */}
                    <div
                        data-hover-card
                        className="p-6 rounded-lg border"
                        style={{
                            backgroundColor: "var(--ds-color-surface-elevated)",
                            borderColor: "var(--ds-color-border)",
                        }}
                    >
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">
                            useThemeTransition
                        </h3>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mb-4">
                            Smooth theme switching animations with color transitions.
                        </p>
                        <div style={{ ...mono, color: "var(--ds-color-text-muted)" }} className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded">
                            {`const { animateThemeSwitch } = useThemeTransition();`}
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Attributes */}
            <div className="mb-12" data-demo>
                <h2 style={{ ...disp, color: "var(--ds-color-text)" }} className="text-xl mb-6 flex items-center gap-2">
                    <Settings width={20} height={20} />
                    Data Attributes
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <code style={{ ...mono, color: "var(--ds-color-text)" }} className="text-xs">data-scroll-reveal="up"</code>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mt-2">
                            Reveals element on scroll from specified direction
                        </p>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <code style={{ ...mono, color: "var(--ds-color-text)" }} className="text-xs">data-hover-scale="1.1"</code>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mt-2">
                            Scales element on hover by specified amount
                        </p>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <code style={{ ...mono, color: "var(--ds-color-text)" }} className="text-xs">data-hover-lift="-5"</code>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mt-2">
                            Lifts element on hover by specified pixels
                        </p>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <code style={{ ...mono, color: "var(--ds-color-text)" }} className="text-xs">data-hover-glow="shadow"</code>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mt-2">
                            Adds glow effect on hover
                        </p>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <code style={{ ...mono, color: "var(--ds-color-text)" }} className="text-xs">data-scroll-stagger="0.1"</code>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mt-2">
                            Staggers scroll animations by specified delay
                        </p>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <code style={{ ...mono, color: "var(--ds-color-text)" }} className="text-xs">data-hover-card</code>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mt-2">
                            Applies card hover effects
                        </p>
                    </div>
                </div>
            </div>

            {/* Animation Presets */}
            <div className="mb-12" data-demo>
                <h2 style={{ ...disp, color: "var(--ds-color-text)" }} className="text-xl mb-6 flex items-center gap-2">
                    <Database width={20} height={20} />
                    Animation Presets
                </h2>

                <div className="space-y-4">
                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">Entrance Animations</h3>
                        <div style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs">
                            fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleIn, slideInUp
                        </div>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">Hover Effects</h3>
                        <div style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs">
                            hoverScale, hoverLift, hoverGlow, buttonPress, buttonRelease
                        </div>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">Stagger Animations</h3>
                        <div style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs">
                            staggerFadeIn, staggerScaleIn, cascadeAnimation, waveAnimation
                        </div>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">Micro-interactions</h3>
                        <div style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs">
                            shake, bounce, pulse, spin, inputFocus, inputError
                        </div>
                    </div>
                </div>
            </div>

            {/* Usage Examples */}
            <div className="mb-12" data-demo>
                <h2 style={{ ...disp, color: "var(--ds-color-text)" }} className="text-xl mb-6 flex items-center gap-2">
                    <Play width={20} height={20} />
                    Usage Examples
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">Basic Scroll Animation</h3>
                        <div style={{ ...mono, color: "var(--ds-color-text-muted)" }} className="text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <pre>{`// Using data attributes (recommended)
<div data-scroll-reveal="up">Content</div>

// Using hooks programmatically
const { reveal } = useScrollAnimations();
useEffect(() => {
  reveal(elementRef.current, 'up');
}, []);`}</pre>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">Hover Effects</h3>
                        <div style={{ ...mono, color: "var(--ds-color-text-muted)" }} className="text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <pre>{`// Using data attributes
<button data-hover-scale="1.1">Button</button>

// Using hooks
const { addScaleHover } = useHoverAnimations();
useEffect(() => {
  addScaleHover(buttonRef.current, 1.1);
}, []);`}</pre>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">Custom Animation</h3>
                        <div style={{ ...mono, color: "var(--ds-color-text-muted)" }} className="text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                            <pre>{`const { animate } = useGSAPAnimations();

useEffect(() => {
  animate(element, {
    x: 100,
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  });
}, []);`}</pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Tips */}
            <div className="mb-12" data-demo>
                <h2 style={{ ...disp, color: "var(--ds-color-text)" }} className="text-xl mb-6 flex items-center gap-2">
                    <Flash width={20} height={20} />
                    Performance Tips
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">Hardware Acceleration</h3>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs">
                            Use transform and opacity properties for better performance. GSAP automatically optimizes these.
                        </p>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">Cleanup</h3>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs">
                            All hooks automatically clean up animations on unmount to prevent memory leaks.
                        </p>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">ScrollTrigger</h3>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs">
                            ScrollTrigger instances are automatically managed and refreshed when needed.
                        </p>
                    </div>

                    <div className="p-4 rounded border" style={{ borderColor: "var(--ds-color-border)" }}>
                        <h3 style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold mb-2">Throttling</h3>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs">
                            Hover events are automatically throttled to prevent performance issues with rapid interactions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Live Demo */}
            <div data-demo>
                <h2 style={{ ...disp, color: "var(--ds-color-text)" }} className="text-xl mb-6 flex items-center gap-2">
                    <Eye width={20} height={20} />
                    Live Demo
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        data-hover-scale="1.05"
                        className="p-6 rounded-lg border text-center cursor-pointer"
                        style={{
                            backgroundColor: "var(--ds-color-surface-elevated)",
                            borderColor: "var(--ds-color-border)",
                        }}
                    >
                        <div style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold">
                            Hover Scale
                        </div>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mt-2">
                            Hover over this card
                        </p>
                    </div>

                    <div
                        data-hover-lift="-8"
                        className="p-6 rounded-lg border text-center cursor-pointer"
                        style={{
                            backgroundColor: "var(--ds-color-surface-elevated)",
                            borderColor: "var(--ds-color-border)",
                        }}
                    >
                        <div style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold">
                            Hover Lift
                        </div>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mt-2">
                            This card lifts on hover
                        </p>
                    </div>

                    <div
                        data-hover-card
                        className="p-6 rounded-lg border text-center cursor-pointer"
                        style={{
                            backgroundColor: "var(--ds-color-surface-elevated)",
                            borderColor: "var(--ds-color-border)",
                        }}
                    >
                        <div style={{ ...mono, color: "var(--ds-color-text)" }} className="text-sm font-semibold">
                            Card Effect
                        </div>
                        <p style={{ ...mono, color: "var(--ds-color-text-secondary)" }} className="text-xs mt-2">
                            Combined hover effects
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}