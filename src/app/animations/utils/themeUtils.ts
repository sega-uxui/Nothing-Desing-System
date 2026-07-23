import { gsap } from 'gsap';
import { animations } from '../presets/animations';

interface ThemeColors {
    mainBg: string;
    sidebarBg: string;
    sidebarBorder: string;
    mainBorder: string;
    mainText: string;
    sidebarText: string;
    [key: string]: string;
}

export const animateThemeTransition = (
    element: HTMLElement,
    fromTheme: ThemeColors,
    toTheme: ThemeColors,
    onComplete?: () => void
) => {
    const timeline = gsap.timeline({
        onComplete,
        ...animations.themeTransition,
    });

    // Animate background colors
    timeline.to(element, {
        backgroundColor: toTheme.mainBg,
        duration: animations.themeTransition.duration,
        ease: animations.themeTransition.ease,
    });

    // Animate sidebar elements
    const sidebarElements = element.querySelectorAll('[data-sidebar]');
    sidebarElements.forEach((el) => {
        timeline.to(
            el,
            {
                backgroundColor: toTheme.sidebarBg,
                borderColor: toTheme.sidebarBorder,
                duration: animations.themeTransition.duration,
                ease: animations.themeTransition.ease,
            },
            0
        );
    });

    // Animate text colors
    const textElements = element.querySelectorAll('[data-text]');
    textElements.forEach((el) => {
        timeline.to(
            el,
            {
                color: toTheme.mainText,
                duration: animations.themeTransition.duration,
                ease: animations.themeTransition.ease,
            },
            0
        );
    });

    // Animate borders
    const borderElements = element.querySelectorAll('[data-border]');
    borderElements.forEach((el) => {
        timeline.to(
            el,
            {
                borderColor: toTheme.mainBorder,
                duration: animations.themeTransition.duration,
                ease: animations.themeTransition.ease,
            },
            0
        );
    });

    return timeline;
};

export const createThemeMorph = (
    element: HTMLElement,
    properties: Record<string, string>,
    duration: number = 0.3
) => {
    return gsap.to(element, {
        ...properties,
        duration,
        ease: animations.themeTransition.ease,
    });
};

export const animateColorShift = (
    elements: HTMLElement[],
    fromColor: string,
    toColor: string,
    duration: number = 0.3
) => {
    return gsap.to(elements, {
        color: toColor,
        backgroundColor: toColor,
        borderColor: toColor,
        duration,
        ease: animations.themeTransition.ease,
    });
};