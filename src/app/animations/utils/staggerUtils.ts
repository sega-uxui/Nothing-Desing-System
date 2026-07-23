import { gsap } from 'gsap';
import { animations } from '../presets/animations';

export const createStaggerAnimation = (
    elements: HTMLElement[],
    animationConfig: typeof animations.staggerFadeIn,
    position?: number | string
) => {
    return gsap.fromTo(
        elements,
        animationConfig.from,
        {
            ...animationConfig.to,
            duration: animationConfig.duration,
            ease: animationConfig.ease,
            stagger: animationConfig.stagger,
        },
        position
    );
};

export const staggerReveal = (
    elements: HTMLElement[],
    direction: 'up' | 'down' | 'left' | 'right' = 'up',
    stagger: number = 0.1
) => {
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
            ease: animations.fadeInUp.ease,
            stagger,
        }
    );
};

export const staggerScale = (
    elements: HTMLElement[],
    fromScale: number = 0.8,
    toScale: number = 1,
    stagger: number = 0.08
) => {
    return gsap.fromTo(
        elements,
        {
            opacity: 0,
            scale: fromScale,
        },
        {
            opacity: 1,
            scale: toScale,
            duration: 0.5,
            ease: animations.scaleIn.ease,
            stagger,
        }
    );
};

export const cascadeAnimation = (
    elements: HTMLElement[],
    baseAnimation: gsap.TweenVars,
    stagger: number = 0.1
) => {
    return gsap.to(elements, {
        ...baseAnimation,
        stagger: {
            each: stagger,
            from: 'start',
        },
    });
};

export const waveAnimation = (
    elements: HTMLElement[],
    animationConfig: gsap.TweenVars,
    waveDelay: number = 0.05
) => {
    return gsap.to(elements, {
        ...animationConfig,
        stagger: {
            each: waveDelay,
            from: 'center',
        },
    });
};

export const randomStagger = (
    elements: HTMLElement[],
    animationConfig: gsap.TweenVars,
    maxDelay: number = 0.3
) => {
    return gsap.to(elements, {
        ...animationConfig,
        stagger: {
            each: 0,
            from: 'random',
            amount: maxDelay,
        },
    });
};

export const sequentialStagger = (
    elements: HTMLElement[],
    animations: gsap.TweenVars[],
    stagger: number = 0.1
) => {
    const timeline = gsap.timeline();

    elements.forEach((element, index) => {
        const animation = animations[index % animations.length];
        timeline.to(
            element,
            {
                ...animation,
                duration: animation.duration || 0.5,
                ease: animation.ease || 'power2.out',
            },
            index * stagger
        );
    });

    return timeline;
};