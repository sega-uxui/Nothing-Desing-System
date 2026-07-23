import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { animateThemeTransition, createThemeMorph, animateColorShift } from '../utils/themeUtils';
import { animations } from '../presets/animations';

interface ThemeColors {
    mainBg: string;
    sidebarBg: string;
    sidebarBorder: string;
    mainBorder: string;
    mainText: string;
    sidebarText: string;
    sidebarActiveBg: string;
    sidebarActiveText: string;
    sidebarHoverBg: string;
    sidebarHoverText: string;
    [key: string]: string;
}

interface UseThemeTransitionOptions {
    duration?: number;
    ease?: string;
    stagger?: number;
}

export const useThemeTransition = (options: UseThemeTransitionOptions = {}) => {
    const {
        duration = animations.themeTransition.duration,
        ease = animations.themeTransition.ease,
        stagger = 0.02,
    } = options;

    const containerRef = useRef<HTMLElement>(null);
    const currentThemeRef = useRef<ThemeColors | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const transitionTheme = useCallback((
        element: HTMLElement,
        fromTheme: ThemeColors,
        toTheme: ThemeColors,
        onComplete?: () => void
    ) => {
        // Kill any existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        // Create new timeline
        timelineRef.current = gsap.timeline({
            onComplete,
        });

        // Animate main background
        timelineRef.current.to(element, {
            backgroundColor: toTheme.mainBg,
            duration,
            ease,
        }, 0);

        // Animate sidebar elements
        const sidebarElements = element.querySelectorAll('[data-sidebar]');
        if (sidebarElements.length > 0) {
            timelineRef.current.to(sidebarElements, {
                backgroundColor: toTheme.sidebarBg,
                borderColor: toTheme.sidebarBorder,
                duration,
                ease,
                stagger,
            }, 0);
        }

        // Animate text elements
        const textElements = element.querySelectorAll('[data-text]');
        if (textElements.length > 0) {
            timelineRef.current.to(textElements, {
                color: toTheme.mainText,
                duration,
                ease,
                stagger: stagger * 0.5,
            }, 0.1);
        }

        // Animate border elements
        const borderElements = element.querySelectorAll('[data-border]');
        if (borderElements.length > 0) {
            timelineRef.current.to(borderElements, {
                borderColor: toTheme.mainBorder,
                duration,
                ease,
                stagger,
            }, 0);
        }

        // Animate sidebar specific elements
        const sidebarTextElements = element.querySelectorAll('[data-sidebar-text]');
        if (sidebarTextElements.length > 0) {
            timelineRef.current.to(sidebarTextElements, {
                color: toTheme.sidebarText,
                duration,
                ease,
                stagger: stagger * 0.7,
            }, 0.05);
        }

        // Animate active elements
        const activeElements = element.querySelectorAll('[data-active]');
        if (activeElements.length > 0) {
            timelineRef.current.to(activeElements, {
                backgroundColor: toTheme.sidebarActiveBg,
                color: toTheme.sidebarActiveText,
                duration,
                ease,
            }, 0.1);
        }

        currentThemeRef.current = toTheme;
        return timelineRef.current;
    }, [duration, ease, stagger]);

    const smoothColorTransition = useCallback((
        elements: HTMLElement[],
        fromColors: string[],
        toColors: string[],
        customDuration?: number
    ) => {
        const tl = gsap.timeline();

        elements.forEach((element, index) => {
            tl.to(element, {
                color: toColors[index],
                duration: customDuration || duration,
                ease,
            }, index * stagger);
        });

        return tl;
    }, [duration, ease, stagger]);

    const morphElements = useCallback((
        elements: HTMLElement[],
        properties: Record<string, any>[],
        customDuration?: number
    ) => {
        const tl = gsap.timeline();

        elements.forEach((element, index) => {
            tl.to(element, {
                ...properties[index],
                duration: customDuration || duration,
                ease,
            }, index * stagger);
        });

        return tl;
    }, [duration, ease, stagger]);

    const transitionWithClass = useCallback((
        element: HTMLElement,
        fromClass: string,
        toClass: string,
        onComplete?: () => void
    ) => {
        // Remove old class
        element.classList.remove(fromClass);

        // Add new class
        element.classList.add(toClass);

        // Animate the transition
        const tl = gsap.timeline({
            onComplete,
        });

        // Animate computed styles
        const computedStyle = window.getComputedStyle(element);
        const targetStyle = window.getComputedStyle(element.cloneNode(true) as HTMLElement);

        tl.fromTo(
            element,
            {
                backgroundColor: computedStyle.backgroundColor,
                color: computedStyle.color,
                borderColor: computedStyle.borderColor,
            },
            {
                backgroundColor: targetStyle.backgroundColor,
                color: targetStyle.color,
                borderColor: targetStyle.borderColor,
                duration,
                ease,
            }
        );

        return tl;
    }, [duration, ease]);

    const createThemePulse = useCallback((
        element: HTMLElement,
        color: string,
        intensity: number = 0.3
    ) => {
        const tl = gsap.timeline();

        tl.to(element, {
            boxShadow: `0 0 30px ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`,
            duration: duration * 0.5,
            ease,
        })
            .to(element, {
                boxShadow: '0 0 0 rgba(0,0,0,0)',
                duration: duration * 0.5,
                ease,
            });

        return tl;
    }, [duration, ease]);

    const staggerThemeElements = useCallback((
        container: HTMLElement,
        theme: ThemeColors,
        elementSelectors: string[]
    ) => {
        const tl = gsap.timeline();

        elementSelectors.forEach((selector, index) => {
            const elements = container.querySelectorAll(selector);
            if (elements.length > 0) {
                tl.to(elements, {
                    backgroundColor: theme.sidebarBg,
                    color: theme.sidebarText,
                    borderColor: theme.sidebarBorder,
                    duration,
                    ease,
                    stagger: stagger * 0.5,
                }, index * stagger * 0.3);
            }
        });

        return tl;
    }, [duration, ease, stagger]);

    const animateThemeSwitch = useCallback((
        fromTheme: ThemeColors,
        toTheme: ThemeColors,
        onComplete?: () => void
    ) => {
        if (!containerRef.current) return null;

        return transitionTheme(containerRef.current, fromTheme, toTheme, onComplete);
    }, [transitionTheme]);

    // Auto-setup theme transition with data attributes
    const setupDataAttributes = useCallback(() => {
        if (!containerRef.current) return;

        // Add data attributes to elements based on their current styles
        const allElements = containerRef.current.querySelectorAll('*');

        allElements.forEach((element) => {
            const htmlElement = element as HTMLElement;
            const computedStyle = window.getComputedStyle(htmlElement);

            // Check if element has background color (likely a container)
            if (computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
                computedStyle.backgroundColor !== 'transparent') {
                htmlElement.setAttribute('data-sidebar', '');
            }

            // Check if element has text color
            if (computedStyle.color && computedStyle.color !== 'rgb(0, 0, 0)') {
                htmlElement.setAttribute('data-text', '');
            }

            // Check if element has border
            if (computedStyle.borderTopWidth !== '0px') {
                htmlElement.setAttribute('data-border', '');
            }
        });
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, []);

    // Auto-setup on mount
    useEffect(() => {
        if (containerRef.current) {
            setupDataAttributes();
        }
    }, [setupDataAttributes]);

    return {
        containerRef,
        transitionTheme,
        smoothColorTransition,
        morphElements,
        transitionWithClass,
        createThemePulse,
        staggerThemeElements,
        animateThemeSwitch,
        setupDataAttributes,
        currentTheme: currentThemeRef.current,
        timeline: timelineRef.current,
    };
};