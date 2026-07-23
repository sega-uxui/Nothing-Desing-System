import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { animations } from '../presets/animations';
import { easings } from '../presets/easings';

interface UseGSAPAnimationsOptions {
    dependencies?: any[];
    revertOnCleanup?: boolean;
}

export const useGSAPAnimations = (options: UseGSAPAnimationsOptions = {}) => {
    const { dependencies = [], revertOnCleanup = true } = options;
    const containerRef = useRef<HTMLElement>(null);
    const animationsRef = useRef<gsap.core.Tween[]>([]);

    const animate = useCallback((
        element: HTMLElement | HTMLElement[],
        animationConfig: gsap.TweenVars
    ) => {
        const tween = gsap.to(element, {
            ...animationConfig,
            onComplete: animationConfig.onComplete,
            onUpdate: animationConfig.onUpdate,
        });

        animationsRef.current.push(tween);
        return tween;
    }, []);

    const animateFrom = useCallback((
        element: HTMLElement | HTMLElement[],
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars
    ) => {
        const tween = gsap.fromTo(element, fromVars, toVars);
        animationsRef.current.push(tween);
        return tween;
    }, []);

    const killAnimations = useCallback(() => {
        animationsRef.current.forEach(tween => tween.kill());
        animationsRef.current = [];
    }, []);

    const createTimeline = useCallback((vars?: gsap.TimelineVars) => {
        const timeline = gsap.timeline(vars);
        animationsRef.current.push(timeline as any);
        return timeline;
    }, []);

    // Stagger animation helper
    const stagger = useCallback((
        elements: HTMLElement[],
        animationConfig: gsap.TweenVars,
        staggerOptions: number | gsap.StaggerVars = 0.1
    ) => {
        return animate(elements, {
            ...animationConfig,
            stagger: staggerOptions,
        });
    }, [animate]);

    // Common animation presets
    const fadeIn = useCallback((element: HTMLElement | HTMLElement[]) => {
        return animateFrom(element, animations.fadeIn.from, animations.fadeIn.to);
    }, [animateFrom]);

    const fadeInUp = useCallback((element: HTMLElement | HTMLElement[]) => {
        return animateFrom(element, animations.fadeInUp.from, animations.fadeInUp.to);
    }, [animateFrom]);

    const scaleIn = useCallback((element: HTMLElement | HTMLElement[]) => {
        return animateFrom(element, animations.scaleIn.from, animations.scaleIn.to);
    }, [animateFrom]);

    const slideInUp = useCallback((element: HTMLElement | HTMLElement[]) => {
        return animateFrom(element, animations.slideInUp.from, animations.slideInUp.to);
    }, [animateFrom]);

    // Check for reduced motion preference
    const prefersReducedMotion = useCallback(() => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    // Brand-specific animation methods
    const heroFadeInUp = useCallback((element: HTMLElement | HTMLElement[]) => {
        if (prefersReducedMotion()) {
            return animateFrom(element, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        }
        return animateFrom(element, animations.heroFadeInUp.from, animations.heroFadeInUp.to);
    }, [animateFrom, prefersReducedMotion]);

    const heroScaleIn = useCallback((element: HTMLElement | HTMLElement[]) => {
        if (prefersReducedMotion()) {
            return animateFrom(element, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        }
        return animateFrom(element, animations.heroScaleIn.from, animations.heroScaleIn.to);
    }, [animateFrom, prefersReducedMotion]);

    const staggeredReveal = useCallback((elements: HTMLElement[], customStagger?: number) => {
        const staggerConfig = {
            ...animations.staggeredReveal,
            stagger: customStagger || animations.staggeredReveal.stagger,
        };
        
        if (prefersReducedMotion()) {
            return animate(elements, { opacity: 1, duration: 0.3 });
        }
        
        return animateFrom(elements, staggerConfig.from, staggerConfig.to);
    }, [animate, animateFrom, prefersReducedMotion]);

    // Enhanced hover animations with brand personality
    const addBrandHover = useCallback((
        element: HTMLElement,
        animationType: 'button' | 'card' | 'logo' = 'button'
    ) => {
        const hoverConfigs = {
            button: animations.buttonHover,
            card: animations.cardHover,
            logo: animations.logoHover,
        };

        const hoverConfig = hoverConfigs[animationType];
        const handleMouseEnter = () => {
            if (!prefersReducedMotion()) {
                gsap.to(element, hoverConfig);
            }
        };

        const handleMouseLeave = () => {
            if (!prefersReducedMotion()) {
                gsap.to(element, {
                    scale: 1,
                    y: 0,
                    rotation: 0,
                    boxShadow: '0 0 0 rgba(0,0,0,0)',
                    duration: 0.2,
                    ease: easings.natural,
                });
            }
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [prefersReducedMotion]);

    // Feedback animations for user actions
    const showSuccess = useCallback((element: HTMLElement) => {
        if (!prefersReducedMotion()) {
            const timeline = gsap.timeline();
            timeline.to(element, { scale: 1.1, duration: 0.2, ease: easings.brandFeedback });
            timeline.to(element, { scale: 1, duration: 0.2, ease: easings.brandFeedback });
            return timeline;
        }
    }, [prefersReducedMotion]);

    const showError = useCallback((element: HTMLElement) => {
        if (!prefersReducedMotion()) {
            const timeline = gsap.timeline();
            timeline.to(element, { x: -4, duration: 0.075, ease: easings.brandFeedback });
            timeline.to(element, { x: 4, duration: 0.075, ease: easings.brandFeedback });
            timeline.to(element, { x: -4, duration: 0.075, ease: easings.brandFeedback });
            timeline.to(element, { x: 4, duration: 0.075, ease: easings.brandFeedback });
            timeline.to(element, { x: 0, duration: 0.075, ease: easings.brandFeedback });
            return timeline;
        }
    }, [prefersReducedMotion]);

    // Loading states
    const startLoading = useCallback((element: HTMLElement) => {
        if (!prefersReducedMotion()) {
            const timeline = gsap.timeline({ repeat: -1, yoyo: true });
            timeline.to(element, { opacity: 1, duration: 0.75, ease: easings.subtle });
            timeline.to(element, { opacity: 0.4, duration: 0.75, ease: easings.subtle });
            return timeline;
        }
    }, [prefersReducedMotion]);

    const stopLoading = useCallback((element: HTMLElement) => {
        gsap.killTweensOf(element);
    }, []);

    // Original hover method (kept for backward compatibility)
    const addHover = useCallback((
        element: HTMLElement,
        hoverConfig: gsap.TweenVars,
        outConfig?: gsap.TweenVars
    ) => {
        const handleMouseEnter = () => {
            if (!prefersReducedMotion()) {
                gsap.to(element, hoverConfig);
            }
        };

        const handleMouseLeave = () => {
            if (!prefersReducedMotion()) {
                gsap.to(element, outConfig || {
                    scale: 1,
                    y: 0,
                    boxShadow: '0 0 0 rgba(0,0,0,0)'
                });
            }
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [prefersReducedMotion]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (revertOnCleanup) {
                killAnimations();
            }
        };
    }, [revertOnCleanup, killAnimations]);

    return {
        containerRef,
        animate,
        animateFrom,
        stagger,
        createTimeline,
        killAnimations,
        fadeIn,
        fadeInUp,
        scaleIn,
        slideInUp,
        addHover,
        // Brand-specific animations
        heroFadeInUp,
        heroScaleIn,
        staggeredReveal,
        addBrandHover,
        showSuccess,
        showError,
        startLoading,
        stopLoading,
        prefersReducedMotion,
        animations: animationsRef.current,
    };
};