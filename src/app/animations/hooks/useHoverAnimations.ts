import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { animations } from '../presets/animations';

interface UseHoverAnimationsOptions {
    scale?: number;
    y?: number;
    boxShadow?: string;
    duration?: number;
    ease?: string;
}

export const useHoverAnimations = (options: UseHoverAnimationsOptions = {}) => {
    const {
        scale = animations.hoverScale.scale,
        y = animations.hoverLift.y,
        boxShadow = animations.hoverGlow.boxShadow,
        duration = animations.hoverScale.duration,
        ease = animations.hoverScale.ease,
    } = options;

    const containerRef = useRef<HTMLElement>(null);
    const hoverElementsRef = useRef<Map<HTMLElement, () => void>>(new Map());

    const addHover = useCallback((
        element: HTMLElement,
        hoverConfig?: UseHoverAnimationsOptions,
        outConfig?: UseHoverAnimationsOptions
    ) => {
        const hoverVars = {
            scale: hoverConfig?.scale || scale,
            y: hoverConfig?.y || y,
            boxShadow: hoverConfig?.boxShadow || boxShadow,
            duration: hoverConfig?.duration || duration,
            ease: hoverConfig?.ease || ease,
        };

        const outVars = {
            scale: 1,
            y: 0,
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            duration: outConfig?.duration || duration,
            ease: outConfig?.ease || ease,
        };

        const handleMouseEnter = () => {
            gsap.to(element, hoverVars);
        };

        const handleMouseLeave = () => {
            gsap.to(element, outVars);
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        // Store cleanup function
        const cleanup = () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };

        hoverElementsRef.current.set(element, cleanup);
        return cleanup;
    }, [scale, y, boxShadow, duration, ease]);

    const addScaleHover = useCallback((
        element: HTMLElement,
        hoverScale: number = scale,
        customDuration?: number
    ) => {
        return addHover(element, {
            scale: hoverScale,
            duration: customDuration || duration,
        });
    }, [addHover, scale, duration]);

    const addLiftHover = useCallback((
        element: HTMLElement,
        liftY: number = y,
        customDuration?: number
    ) => {
        return addHover(element, {
            y: liftY,
            duration: customDuration || duration,
        });
    }, [addHover, y, duration]);

    const addGlowHover = useCallback((
        element: HTMLElement,
        glowBoxShadow: string = boxShadow,
        customDuration?: number
    ) => {
        return addHover(element, {
            boxShadow: glowBoxShadow,
            duration: customDuration || duration,
        });
    }, [addHover, boxShadow, duration]);

    const addButtonHover = useCallback((
        element: HTMLElement,
        pressScale: number = animations.buttonPress.scale
    ) => {
        const handleMouseDown = () => {
            gsap.to(element, {
                scale: pressScale,
                duration: animations.buttonPress.duration,
                ease: animations.buttonPress.ease,
            });
        };

        const handleMouseUp = () => {
            gsap.to(element, {
                scale: 1,
                duration: animations.buttonRelease.duration,
                ease: animations.buttonRelease.ease,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                scale: 1,
                duration: animations.buttonRelease.duration,
                ease: animations.buttonRelease.ease,
            });
        };

        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('mouseup', handleMouseUp);
        element.addEventListener('mouseleave', handleMouseLeave);

        const cleanup = () => {
            element.removeEventListener('mousedown', handleMouseDown);
            element.removeEventListener('mouseup', handleMouseUp);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };

        hoverElementsRef.current.set(element, cleanup);
        return cleanup;
    }, []);

    const addCardHover = useCallback((
        element: HTMLElement,
        options: {
            scale?: number;
            y?: number;
            rotation?: number;
            boxShadow?: string;
        } = {}
    ) => {
        const hoverConfig = {
            scale: options.scale || 1.02,
            y: options.y || -8,
            rotation: options.rotation || 0,
            boxShadow: options.boxShadow || '0 20px 40px rgba(0,0,0,0.15)',
            duration: 0.3,
            ease: 'power2.out',
        };

        const outConfig = {
            scale: 1,
            y: 0,
            rotation: 0,
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            duration: 0.3,
            ease: 'power2.out',
        };

        return addHover(element, hoverConfig, outConfig);
    }, [addHover]);

    const addImageHover = useCallback((
        element: HTMLElement,
        options: {
            scale?: number;
            brightness?: number;
        } = {}
    ) => {
        const hoverConfig = {
            scale: options.scale || 1.1,
            brightness: options.brightness || 1.1,
            duration: 0.4,
            ease: 'power2.out',
        };

        const outConfig = {
            scale: 1,
            brightness: 1,
            duration: 0.4,
            ease: 'power2.out',
        };

        const handleMouseEnter = () => {
            gsap.to(element, hoverConfig);
        };

        const handleMouseLeave = () => {
            gsap.to(element, outConfig);
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        const cleanup = () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };

        hoverElementsRef.current.set(element, cleanup);
        return cleanup;
    }, []);

    const addTextHover = useCallback((
        element: HTMLElement,
        options: {
            color?: string;
            scale?: number;
            underline?: boolean;
        } = {}
    ) => {
        const hoverConfig: any = {
            scale: options.scale || 1.05,
            duration: 0.2,
            ease: 'power2.out',
        };

        if (options.color) {
            hoverConfig.color = options.color;
        }

        if (options.underline) {
            hoverConfig.textDecoration = 'underline';
        }

        const outConfig: any = {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
        };

        if (options.color) {
            // Store original color
            const originalColor = window.getComputedStyle(element).color;
            outConfig.color = originalColor;
        }

        if (options.underline) {
            outConfig.textDecoration = 'none';
        }

        const handleMouseEnter = () => {
            gsap.to(element, hoverConfig);
        };

        const handleMouseLeave = () => {
            gsap.to(element, outConfig);
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        const cleanup = () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };

        hoverElementsRef.current.set(element, cleanup);
        return cleanup;
    }, []);

    const removeHover = useCallback((element: HTMLElement) => {
        const cleanup = hoverElementsRef.current.get(element);
        if (cleanup) {
            cleanup();
            hoverElementsRef.current.delete(element);
        }
    }, []);

    const removeAllHovers = useCallback(() => {
        hoverElementsRef.current.forEach(cleanup => cleanup());
        hoverElementsRef.current.clear();
    }, []);

    // Auto-setup hover effects with data attributes
    const setupDataAttributes = useCallback(() => {
        if (!containerRef.current) return;

        // Elements with data-hover-scale
        const scaleElements = containerRef.current.querySelectorAll('[data-hover-scale]');
        scaleElements.forEach((element) => {
            const scaleValue = parseFloat((element as HTMLElement).dataset.hoverScale || '1.05');
            addScaleHover(element as HTMLElement, scaleValue);
        });

        // Elements with data-hover-lift
        const liftElements = containerRef.current.querySelectorAll('[data-hover-lift]');
        liftElements.forEach((element) => {
            const liftValue = parseFloat((element as HTMLElement).dataset.hoverLift || '-5');
            addLiftHover(element as HTMLElement, liftValue);
        });

        // Elements with data-hover-glow
        const glowElements = containerRef.current.querySelectorAll('[data-hover-glow]');
        glowElements.forEach((element) => {
            const glowValue = (element as HTMLElement).dataset.hoverGlow;
            addGlowHover(element as HTMLElement, glowValue);
        });

        // Elements with data-hover-card
        const cardElements = containerRef.current.querySelectorAll('[data-hover-card]');
        cardElements.forEach((element) => {
            addCardHover(element as HTMLElement);
        });

        // Elements with data-hover-button
        const buttonElements = containerRef.current.querySelectorAll('[data-hover-button]');
        buttonElements.forEach((element) => {
            addButtonHover(element as HTMLElement);
        });
    }, [addScaleHover, addLiftHover, addGlowHover, addCardHover, addButtonHover]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            removeAllHovers();
        };
    }, [removeAllHovers]);

    // Auto-setup on mount
    useEffect(() => {
        if (containerRef.current) {
            setupDataAttributes();
        }
    }, [setupDataAttributes]);

    return {
        containerRef,
        addHover,
        addScaleHover,
        addLiftHover,
        addGlowHover,
        addButtonHover,
        addCardHover,
        addImageHover,
        addTextHover,
        removeHover,
        removeAllHovers,
        setupDataAttributes,
    };
};