import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animations } from '../presets/animations';
import {
    scrollReveal,
    staggerScrollReveal,
    scaleOnScroll,
    parallaxScroll,
    cleanupScrollTriggers
} from '../utils/scrollUtils';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationsOptions {
    refreshOnUpdate?: boolean;
    scrub?: boolean;
    trigger?: string | HTMLElement;
    start?: string;
    end?: string;
    toggleActions?: string;
}

export const useScrollAnimations = (options: UseScrollAnimationsOptions = {}) => {
    const {
        refreshOnUpdate = true,
        scrub = false,
        trigger,
        start = 'top 80%',
        end = 'bottom 20%',
        toggleActions = 'play none none reverse',
    } = options;

    const containerRef = useRef<HTMLElement>(null);
    const triggersRef = useRef<ScrollTrigger[]>([]);

    const reveal = useCallback((
        elements: HTMLElement | HTMLElement[],
        direction: 'up' | 'down' | 'left' | 'right' = 'up',
        customOptions?: UseScrollAnimationsOptions
    ) => {
        const elementArray = Array.isArray(elements) ? elements : [elements];
        const tween = scrollReveal(elementArray, direction, {
            scrub,
            start: customOptions?.start || start,
            end: customOptions?.end || end,
            toggleActions: customOptions?.toggleActions || toggleActions,
        });

        // Get the ScrollTrigger instance from the tween
        const trigger = tween.scrollTrigger;
        if (trigger) {
            triggersRef.current.push(trigger);
        }
        return tween;
    }, [scrub, start, end, toggleActions]);

    const staggerReveal = useCallback((
        elements: HTMLElement[],
        stagger: number = 0.1,
        direction: 'up' | 'down' | 'left' | 'right' = 'up'
    ) => {
        const tween = staggerScrollReveal(elements, stagger, direction);
        const trigger = tween.scrollTrigger;
        if (trigger) {
            triggersRef.current.push(trigger);
        }
        return tween;
    }, []);

    const scaleReveal = useCallback((
        elements: HTMLElement | HTMLElement[],
        fromScale: number = 0.8,
        toScale: number = 1
    ) => {
        const elementArray = Array.isArray(elements) ? elements : [elements];
        const tween = scaleOnScroll(elementArray, fromScale, toScale);
        const trigger = tween.scrollTrigger;
        if (trigger) {
            triggersRef.current.push(trigger);
        }
        return tween;
    }, []);

    const parallax = useCallback((
        element: HTMLElement,
        speed: number = 0.5,
        customOptions?: UseScrollAnimationsOptions
    ) => {
        const tween = parallaxScroll(element, speed, {
            start: customOptions?.start || 'top bottom',
            end: customOptions?.end || 'bottom top',
            scrub: customOptions?.scrub !== undefined ? customOptions.scrub : true,
        });

        const trigger = tween.scrollTrigger;
        if (trigger) {
            triggersRef.current.push(trigger);
        }
        return tween;
    }, []);

    const createCustomTrigger = useCallback((
        element: HTMLElement | HTMLElement[],
        animationConfig: gsap.TweenVars,
        triggerOptions?: ScrollTrigger.Vars
    ) => {
        const trigger = ScrollTrigger.create({
            trigger: triggerOptions?.trigger || element,
            start: triggerOptions?.start || start,
            end: triggerOptions?.end || end,
            scrub: triggerOptions?.scrub || scrub,
            toggleActions: triggerOptions?.toggleActions || toggleActions,
            animation: gsap.to(element, animationConfig),
            ...triggerOptions,
        });

        triggersRef.current.push(trigger);
        return trigger;
    }, [start, end, scrub, toggleActions]);

    const pinElement = useCallback((
        element: HTMLElement,
        duration: string = '100%',
        pinSpacing: boolean = true
    ) => {
        const trigger = ScrollTrigger.create({
            trigger: element,
            pin: true,
            pinSpacing,
            start: 'top top',
            end: `+=${duration}`,
        });

        triggersRef.current.push(trigger);
        return trigger;
    }, []);

    const watchProgress = useCallback((
        element: HTMLElement,
        callback: (progress: number) => void
    ) => {
        const trigger = ScrollTrigger.create({
            trigger: element,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                callback(self.progress);
            },
        });

        triggersRef.current.push(trigger);
        return trigger;
    }, []);

    const createTimeline = useCallback((
        triggerElement: HTMLElement,
        timeline: gsap.core.Timeline,
        triggerOptions?: ScrollTrigger.Vars
    ) => {
        const trigger = ScrollTrigger.create({
            trigger: triggerElement,
            start: triggerOptions?.start || start,
            end: triggerOptions?.end || end,
            scrub: triggerOptions?.scrub || scrub,
            animation: timeline,
            ...triggerOptions,
        });

        triggersRef.current.push(trigger);
        return trigger;
    }, [start, end, scrub]);

    // Auto-animate elements with data attributes
    const animateWithDataAttributes = useCallback(() => {
        if (!containerRef.current) return;

        // Animate elements with data-scroll-reveal
        const revealElements = containerRef.current.querySelectorAll('[data-scroll-reveal]');
        revealElements.forEach((element) => {
            const direction = (element as HTMLElement).dataset.scrollReveal as any || 'up';
            reveal(element as HTMLElement, direction);
        });

        // Animate elements with data-scroll-stagger
        const staggerElements = containerRef.current.querySelectorAll('[data-scroll-stagger]');
        if (staggerElements.length > 0) {
            const staggerValue = (containerRef.current as HTMLElement).dataset.scrollStagger || '0.1';
            staggerReveal(Array.from(staggerElements) as HTMLElement[], parseFloat(staggerValue));
        }

        // Animate elements with data-scroll-parallax
        const parallaxElements = containerRef.current.querySelectorAll('[data-scroll-parallax]');
        parallaxElements.forEach((element) => {
            const speed = parseFloat((element as HTMLElement).dataset.scrollParallax || '0.5');
            parallax(element as HTMLElement, speed);
        });
    }, [reveal, staggerReveal, parallax]);

    // Refresh all ScrollTrigger instances
    const refresh = useCallback(() => {
        ScrollTrigger.refresh();
    }, []);

    // Kill all triggers
    const killTriggers = useCallback(() => {
        triggersRef.current.forEach(trigger => trigger.kill());
        triggersRef.current = [];
    }, []);

    // Auto-setup on mount
    useEffect(() => {
        if (containerRef.current) {
            animateWithDataAttributes();
        }

        return () => {
            killTriggers();
        };
    }, [animateWithDataAttributes, killTriggers]);

    // Refresh on update if enabled
    useEffect(() => {
        if (refreshOnUpdate) {
            const timer = setTimeout(() => {
                refresh();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [refreshOnUpdate, refresh]);

    return {
        containerRef,
        reveal,
        staggerReveal,
        scaleReveal,
        parallax,
        createCustomTrigger,
        pinElement,
        watchProgress,
        createTimeline,
        refresh,
        killTriggers,
        animateWithDataAttributes,
        triggers: triggersRef.current,
    };
};