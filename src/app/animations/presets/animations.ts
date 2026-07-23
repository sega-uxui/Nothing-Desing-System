import { easings } from './easings';

export const animations = {
    // Entrance animations (brand-enhanced)
    fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: 0.5,
        ease: easings.natural,
    },

    fadeInUp: {
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0 },
        duration: 0.7,
        ease: easings.confident,
    },

    // Hero entrance animations (product register: fast and functional)
    heroFadeInUp: {
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0 },
        duration: 0.25,
        ease: easings.decisive,
    },

    heroScaleIn: {
        from: { opacity: 0, scale: 0.98 },
        to: { opacity: 1, scale: 1 },
        duration: 0.2,
        ease: easings.decisive,
    },

    // Staggered content reveals (orchestrated page-load sequences)
    staggeredReveal: {
        from: { opacity: 0, y: 25 },
        to: { opacity: 1, y: 0 },
        duration: 0.6,
        ease: easings.natural,
        stagger: 0.15,
    },

    fadeInDown: {
        from: { opacity: 0, y: -30 },
        to: { opacity: 1, y: 0 },
        duration: 0.8,
        ease: easings.smooth,
    },

    fadeInLeft: {
        from: { opacity: 0, x: -30 },
        to: { opacity: 1, x: 0 },
        duration: 0.8,
        ease: easings.smooth,
    },

    fadeInRight: {
        from: { opacity: 0, x: 30 },
        to: { opacity: 1, x: 0 },
        duration: 0.8,
        ease: easings.smooth,
    },

    scaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
        duration: 0.6,
        ease: easings.backOut,
    },

    slideInUp: {
        from: { y: '100%' },
        to: { y: 0 },
        duration: 0.6,
        ease: easings.smooth,
    },

    // Exit animations
    fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
        duration: 0.4,
        ease: easings.smooth,
    },

    fadeOutUp: {
        from: { opacity: 1, y: 0 },
        to: { opacity: 0, y: -30 },
        duration: 0.6,
        ease: easings.smooth,
    },

    fadeOutDown: {
        from: { opacity: 1, y: 0 },
        to: { opacity: 0, y: 30 },
        duration: 0.6,
        ease: easings.smooth,
    },

    scaleOut: {
        from: { opacity: 1, scale: 1 },
        to: { opacity: 0, scale: 0.8 },
        duration: 0.4,
        ease: easings.smooth,
    },

    // Hover animations (brand-enhanced)
    hoverScale: {
        scale: 1.02,
        duration: 0.2,
        ease: easings.brandHover,
    },

    hoverLift: {
        y: -3,
        duration: 0.25,
        ease: easings.natural,
    },

    hoverGlow: {
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        duration: 0.3,
        ease: easings.brandHover,
    },

    // Product-specific micro-interactions (fast, functional feedback)
    buttonHover: {
        scale: 1.02,
        duration: 0.15,
        ease: easings.decisive,
    },

    buttonActive: {
        scale: 0.98,
        duration: 0.1,
        ease: easings.decisive,
    },

    cardHover: {
        scale: 1.01,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        duration: 0.25,
        ease: easings.smooth,
    },

    logoHover: {
        scale: 1.05,
        duration: 0.2,
        ease: easings.decisive,
    },

    // Feedback animations (quick, responsive)
    successPulse: {
        scale: [1, 1.1, 1],
        duration: 0.4,
        ease: easings.brandFeedback,
    },

    errorShake: {
        x: [-4, 4, -4, 4, 0],
        duration: 0.3,
        ease: easings.brandFeedback,
    },

    loadingPulse: {
        opacity: [0.4, 1, 0.4],
        duration: 1.5,
        ease: easings.subtle,
        repeat: -1,
    },

    // Button animations
    buttonPress: {
        scale: 0.95,
        duration: 0.1,
        ease: easings.smooth,
    },

    buttonRelease: {
        scale: 1,
        duration: 0.2,
        ease: easings.elastic,
    },

    // Stagger animations
    staggerFadeIn: {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
        duration: 0.6,
        ease: easings.smooth,
        stagger: 0.1,
    },

    staggerScaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
        duration: 0.5,
        ease: easings.backOut,
        stagger: 0.08,
    },

    // Page transitions
    pageTransition: {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 },
        duration: 0.8,
        ease: easings.smooth,
    },

    // Sidebar animations
    sidebarSlide: {
        from: { x: '-100%' },
        to: { x: 0 },
        duration: 0.5,
        ease: easings.smooth,
    },

    // Theme transition
    themeTransition: {
        duration: 0.3,
        ease: easings.smooth,
    },

    // Loading animations (product-optimized)
    skeletonPulse: {
        opacity: [0.3, 0.6, 0.3],
        duration: 1.5,
        ease: easings.subtle,
        repeat: -1,
    },

    buttonLoading: {
        rotation: 360,
        duration: 1,
        ease: easings.smooth,
        repeat: -1,
    },

    cardLoading: {
        scale: 1.02,
        duration: 0.8,
        ease: easings.subtle,
        repeat: -1,
        yoyo: true,
    },

    pulse: {
        scale: 1.05,
        duration: 1,
        ease: easings.sineInOut,
        repeat: -1,
        yoyo: true,
    },

    spin: {
        rotation: 360,
        duration: 2,
        ease: easings.smooth,
        repeat: -1,
    },

    // Micro-interactions
    shake: {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: easings.smooth,
    },

    bounce: {
        y: [0, -20, 0],
        duration: 0.6,
        ease: easings.bouncy,
    },

    // Card animations
    cardFlip: {
        rotationY: 180,
        duration: 0.8,
        ease: easings.smooth,
    },

    cardReveal: {
        from: { opacity: 0, rotationX: -90 },
        to: { opacity: 1, rotationX: 0 },
        duration: 0.8,
        ease: easings.smooth,
    },

    // Navigation animations (product-optimized)
    navItemHover: {
        x: 3,
        duration: 0.15,
        ease: easings.decisive,
    },

    navIndicator: {
        duration: 0.2,
        ease: easings.decisive,
    },

    mobileMenuSlide: {
        from: { x: '-100%' },
        to: { x: 0 },
        duration: 0.25,
        ease: easings.decisive,
    },

    tabSwitch: {
        duration: 0.2,
        ease: easings.decisive,
    },

    // Form animations (product-optimized)
    inputFocus: {
        scale: 1.01,
        duration: 0.15,
        ease: easings.decisive,
    },

    inputError: {
        x: [-3, 3, -3, 3, 0],
        duration: 0.3,
        ease: easings.decisive,
    },

    inputSuccess: {
        scale: [1, 1.02, 1],
        duration: 0.25,
        ease: easings.decisive,
    },

    toggleSwitch: {
        duration: 0.2,
        ease: easings.decisive,
    },

    // Modal animations
    modalOpen: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
        duration: 0.4,
        ease: easings.backOut,
    },

    modalClose: {
        from: { opacity: 1, scale: 1 },
        to: { opacity: 0, scale: 0.8 },
        duration: 0.3,
        ease: easings.smooth,
    },

    // Scroll animations
    scrollReveal: {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
        duration: 0.8,
        ease: easings.smooth,
    },

    parallax: {
        duration: 1,
        ease: easings.smooth,
    },
};