import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { animations } from '../presets/animations';

interface UsePageTransitionOptions {
    duration?: number;
    ease?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    onEnter?: () => void;
    onExit?: () => void;
}

export const usePageTransition = (options: UsePageTransitionOptions = {}) => {
    const {
        duration = animations.pageTransition.duration,
        ease = animations.pageTransition.ease,
        direction = 'right',
        onEnter,
        onExit,
    } = options;

    const containerRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const getDirectionVars = useCallback(() => {
        const directions = {
            left: { x: -50 },
            right: { x: 50 },
            up: { y: -50 },
            down: { y: 50 },
        };
        return directions[direction];
    }, [direction]);

    const enter = useCallback(() => {
        if (!containerRef.current) return;

        // Kill any existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const directionVars = getDirectionVars();

        // Set initial state
        gsap.set(containerRef.current, {
            opacity: 0,
            ...directionVars,
        });

        // Create enter animation
        timelineRef.current = gsap.timeline({
            onComplete: onEnter,
        });

        timelineRef.current.to(containerRef.current, {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            ease,
        });

        return timelineRef.current;
    }, [duration, ease, getDirectionVars, onEnter]);

    const exit = useCallback(() => {
        if (!containerRef.current) return;

        const directionVars = getDirectionVars();

        // Create exit animation
        timelineRef.current = gsap.timeline({
            onComplete: onExit,
        });

        timelineRef.current.to(containerRef.current, {
            opacity: 0,
            ...directionVars,
            duration: duration * 0.7, // Slightly faster exit
            ease,
        });

        return timelineRef.current;
    }, [duration, ease, getDirectionVars, onExit]);

    const transition = useCallback((fromElement: HTMLElement, toElement: HTMLElement) => {
        const tl = gsap.timeline();

        // Exit animation for old page
        tl.to(fromElement, {
            opacity: 0,
            x: -30,
            duration: duration * 0.5,
            ease,
        });

        // Enter animation for new page
        tl.fromTo(
            toElement,
            {
                opacity: 0,
                x: 30,
            },
            {
                opacity: 1,
                x: 0,
                duration,
                ease,
            },
            '-=0.3' // Slight overlap
        );

        return tl;
    }, [duration, ease]);

    const fadeTransition = useCallback((fromElement: HTMLElement, toElement: HTMLElement) => {
        const tl = gsap.timeline();

        // Fade out old page
        tl.to(fromElement, {
            opacity: 0,
            duration: duration * 0.4,
            ease,
        });

        // Fade in new page
        tl.fromTo(
            toElement,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: duration * 0.6,
                ease,
            },
            '-=0.2'
        );

        return tl;
    }, [duration, ease]);

    const slideTransition = useCallback((
        fromElement: HTMLElement,
        toElement: HTMLElement,
        slideDirection: 'left' | 'right' = 'left'
    ) => {
        const tl = gsap.timeline();
        const slideDistance = window.innerWidth;

        const slideVars = slideDirection === 'left'
            ? { x: -slideDistance }
            : { x: slideDistance };

        // Slide out old page
        tl.to(fromElement, {
            ...slideVars,
            duration,
            ease,
        });

        // Slide in new page from opposite direction
        tl.fromTo(
            toElement,
            {
                x: -slideVars.x,
            },
            {
                x: 0,
                duration,
                ease,
            },
            '-=0.5'
        );

        return tl;
    }, [duration, ease]);

    // Auto-enter on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            enter();
        }, 100); // Small delay to ensure DOM is ready

        return () => {
            clearTimeout(timer);
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, [enter]);

    return {
        containerRef,
        enter,
        exit,
        transition,
        fadeTransition,
        slideTransition,
        timeline: timelineRef.current,
    };
};