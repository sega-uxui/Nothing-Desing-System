import { Elastic, Power1, Power2, Power3, Power4, Sine, Back, Bounce, Circ, Expo, Quad, Quart, Quint } from 'gsap';

export const easings = {
    // Power easings
    power1In: Power1.easeIn,
    power1Out: Power1.easeOut,
    power1InOut: Power1.easeInOut,

    power2In: Power2.easeIn,
    power2Out: Power2.easeOut,
    power2InOut: Power2.easeInOut,

    power3In: Power3.easeIn,
    power3Out: Power3.easeOut,
    power3InOut: Power3.easeInOut,

    power4In: Power4.easeIn,
    power4Out: Power4.easeOut,
    power4InOut: Power4.easeInOut,

    // Sine easings
    sineIn: Sine.easeIn,
    sineOut: Sine.easeOut,
    sineInOut: Sine.easeInOut,

    // Back easings
    backIn: Back.easeIn,
    backOut: Back.easeOut,
    backInOut: Back.easeInOut,

    // Elastic easings
    elasticIn: Elastic.easeIn,
    elasticOut: Elastic.easeOut,
    elasticInOut: Elastic.easeInOut,

    // Bounce easings
    bounceIn: Bounce.easeIn,
    bounceOut: Bounce.easeOut,
    bounceInOut: Bounce.easeInOut,

    // Circ easings
    circIn: Circ.easeIn,
    circOut: Circ.easeOut,
    circInOut: Circ.easeInOut,

    // Expo easings
    expoIn: Expo.easeIn,
    expoOut: Expo.easeOut,
    expoInOut: Expo.easeInOut,

    // Quad easings
    quadIn: Quad.easeIn,
    quadOut: Quad.easeOut,
    quadInOut: Quad.easeInOut,

    // Quart easings
    quartIn: Quart.easeIn,
    quartOut: Quart.easeOut,
    quartInOut: Quart.easeInOut,

    // Quint easings
    quintIn: Quint.easeIn,
    quintOut: Quint.easeOut,
    quintInOut: Quint.easeInOut,

    // Custom named easings for common use cases
    smooth: Power2.easeInOut,
    snappy: Power3.easeOut,
    bouncy: Bounce.easeOut,
    elastic: Elastic.easeOut,
    dramatic: Back.easeOut,
    subtle: Sine.easeInOut,
    quick: Power1.easeOut,
    slow: Power4.easeInOut,

    // Recommended natural deceleration curves (impeccable standards)
    natural: Quart.easeOut,        // cubic-bezier(0.25, 1, 0.5, 1) - Smooth, confident
    confident: Quint.easeOut,      // cubic-bezier(0.22, 1, 0.36, 1) - Slightly snappier
    decisive: Expo.easeOut,        // cubic-bezier(0.16, 1, 0.3, 1) - Confident, decisive
    
    // Brand-specific easings for professional yet approachable feel
    brandEntrance: Quint.easeOut,   // Confident entrance for hero content
    brandHover: Quart.easeOut,     // Smooth, professional hover states
    brandFeedback: Power3.easeOut, // Quick, responsive feedback
    brandTransition: Power2.easeInOut, // Smooth state transitions
};