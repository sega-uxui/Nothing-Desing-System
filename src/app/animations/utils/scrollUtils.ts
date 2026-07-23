import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animations } from '../presets/animations';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const createScrollTrigger = (
    elements: HTMLElement | HTMLElement[],
    animationConfig: gsap.TweenVars,
    triggerOptions?: ScrollTrigger.Vars
) => {
    return gsap.to(elements, {
        ...animationConfig,
        scrollTrigger: {
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            ...triggerOptions,
        },
    });
};

export const scrollReveal = (
    elements: HTMLElement[],
    direction: 'up' | 'down' | 'left' | 'right' = 'up',
    triggerOptions?: ScrollTrigger.Vars
) => {
    if (prefersReducedMotion()) {
        return gsap.set(elements, { opacity: 1, x: 0, y: 0 });
    }

    const directions = {
        up: { y: 50 },
        down: { y: -50 },
        left: { x: 50 },
        right: { x: -50 },
    };

    return gsap.fromTo(
        elements,
        {
            opacity: 0,
            ...directions[direction],
        },
        {
            opacity: 1,
            y: 0,
            x: 0,
            duration: animations.scrollReveal.duration,
            ease: animations.scrollReveal.ease,
            scrollTrigger: {
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse',
                ...triggerOptions,
            },
        }
    );
};

export const parallaxScroll = (
    element: HTMLElement,
    speed: number = 0.5,
    triggerOptions?: ScrollTrigger.Vars
) => {
    if (prefersReducedMotion()) {
        return gsap.set(element, { yPercent: 0 });
    }

    return gsap.to(element, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            ...triggerOptions,
        },
    });
};

export const pinSection = (
    element: HTMLElement,
    duration: string = '100%',
    pinSpacing: boolean = true
) => {
    return ScrollTrigger.create({
        trigger: element,
        pin: true,
        pinSpacing,
        start: 'top top',
        end: `+=${duration}`,
    });
};

export const scrollProgress = (
    element: HTMLElement,
    progressCallback: (progress: number) => void
) => {
    return ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            progressCallback(self.progress);
        },
    });
};

export const staggerScrollReveal = (
    elements: HTMLElement[],
    stagger: number = 0.1,
    direction: 'up' | 'down' | 'left' | 'right' = 'up'
) => {
    if (prefersReducedMotion()) {
        return gsap.set(elements, { opacity: 1, x: 0, y: 0 });
    }

    const directions = {
        up: { y: 30 },
        down: { y: -30 },
        left: { x: 30 },
        right: { x: -30 },
    };

    return gsap.fromTo(
        elements,
        {
            opacity: 0,
            ...directions[direction],
        },
        {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.6,
            ease: animations.scrollReveal.ease,
            stagger,
            scrollTrigger: {
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};

export const scaleOnScroll = (
    elements: HTMLElement[],
    fromScale: number = 0.8,
    toScale: number = 1
) => {
    if (prefersReducedMotion()) {
        return gsap.set(elements, { opacity: 1, scale: toScale });
    }

    return gsap.fromTo(
        elements,
        {
            opacity: 0,
            scale: fromScale,
        },
        {
            opacity: 1,
            scale: toScale,
            duration: 0.8,
            ease: animations.scaleIn.ease,
            scrollTrigger: {
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};

export const rotateOnScroll = (
    element: HTMLElement,
    fromRotation: number = 0,
    toRotation: number = 360
) => {
    if (prefersReducedMotion()) {
        return gsap.set(element, { rotation: toRotation });
    }

    return gsap.fromTo(
        element,
        {
            rotation: fromRotation,
        },
        {
            rotation: toRotation,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        }
    );
};

export const fadeSequence = (
    sections: HTMLElement[],
    onEnter?: (index: number) => void,
    onLeave?: (index: number) => void
) => {
    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => {
                gsap.to(section, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: animations.fadeInUp.ease,
                });
                onEnter?.(index);
            },
            onLeave: () => {
                gsap.to(section, {
                    opacity: 0.3,
                    y: -20,
                    duration: 0.4,
                    ease: animations.fadeOut.ease,
                });
                onLeave?.(index);
            },
            onEnterBack: () => {
                gsap.to(section, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: animations.fadeInUp.ease,
                });
            },
            onLeaveBack: () => {
                gsap.to(section, {
                    opacity: 0.3,
                    y: 20,
                    duration: 0.4,
                    ease: animations.fadeOut.ease,
                });
            },
        });
    });
};

// Cleanup function to kill all ScrollTrigger instances
export const cleanupScrollTriggers = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};