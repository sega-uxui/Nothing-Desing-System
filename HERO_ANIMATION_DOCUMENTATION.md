# Hero Animation Documentation

## Overview

The hero section features a sophisticated bottom-to-top staggered animation using GSAP with smooth, professional easing. This documentation covers all animation properties, timing, easing options, and choreography patterns.

## Design Principles

- **Bottom-to-Top Motion**: All elements animate upward creating natural flow
- **Smooth Easing**: Professional yet approachable feel with natural deceleration
- **Staggered Timing**: Elements appear in hierarchical sequence
- **Accessibility**: Respects `prefers-reduced-motion` settings
- **Performance**: Optimized for 60fps smooth animation

## Current Animation Implementation

### Element Selection
```javascript
const elements = containerRef.current.querySelectorAll('[data-hero-animate]');
```

### Initial States (All Elements)
```javascript
gsap.set(elements, {
  opacity: 0,
  y: 60,           // Bottom-to-top distance
  filter: "blur(8px)" // Subtle blur effect
});
```

### Animation Properties by Element

#### 1. Beta Badge
- **Selector**: `[data-hero-animate]` containing "Now in beta"
- **Initial Scale**: 0.95
- **Duration**: 0.7s
- **Easing**: `power2.inOut`
- **Start Time**: 0.0s
- **Transforms**: opacity: 0→1, y: 60→0, scale: 0.95→1, filter: blur(8px)→blur(0px)

#### 2. Hero Title (H1)
- **Selector**: `h1[data-hero-animate]`
- **Initial Scale**: 0.98
- **Duration**: 1.0s
- **Easing**: `power2.inOut`
- **Start Time**: 0.15s
- **Transforms**: opacity: 0→1, y: 60→0, scale: 0.98→1, filter: blur(1px)→blur(0px)

#### 3. Main Subtitle
- **Selector**: `p[data-hero-animate]` containing "minimal"
- **Duration**: 0.9s
- **Easing**: `power2.inOut`
- **Start Time**: 0.35s (0.15s + 0.2s offset)
- **Transforms**: opacity: 0→1, y: 60→0, filter: blur(1px)→blur(0px)

#### 4. Button Container
- **Selector**: `div[data-hero-animate]` containing buttons
- **Initial Scale**: 0.98
- **Duration**: 0.8s
- **Easing**: `power2.inOut`
- **Start Time**: 0.55s (0.15s + 0.4s offset)
- **Transforms**: opacity: 0→1, y: 60→0, scale: 0.98→1, filter: blur(1px)→blur(0px)

#### 5. Individual Buttons
- **Selector**: `button` within container
- **Initial Y**: 20px (relative to container)
- **Duration**: 0.6s
- **Easing**: `power2.inOut`
- **Start Time**: 0.65s + (btnIndex × 0.08s)
- **Transforms**: opacity: 0→1, y: 20→0

#### 6. Footer Text
- **Selector**: `p[data-hero-animate]` containing "Free to use"
- **Duration**: 0.8s
- **Easing**: `power2.inOut`
- **Start Time**: 0.75s (0.15s + 0.6s offset)
- **Transforms**: opacity: 0→1, y: 60→0, filter: blur(1px)→blur(0px)

#### 7. Background Image
- **Selector**: `img` within hero section
- **Duration**: 2.0s
- **Easing**: `power2.inOut`
- **Start Time**: 0.0s (concurrent)
- **Transforms**: scale: 1.05→1, y: 30→0

## Easing Options

### Current Easing: `power2.inOut`
- **Cubic Bezier**: cubic-bezier(0.45, 0, 0.55, 1)
- **Characteristics**: Smooth acceleration and deceleration
- **Best For**: Professional, balanced interfaces
- **Feel**: Natural, comfortable, predictable

### Alternative Easing Options

#### 1. `power3.out` (Snappy)
- **Cubic Bezier**: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Characteristics**: Quick start, smooth finish
- **Best For**: Modern, energetic brands
- **Feel**: Decisive, responsive

#### 2. `quart.out` (Sophisticated)
- **Cubic Bezier**: cubic-bezier(0.25, 1, 0.5, 1)
- **Characteristics**: Smooth, confident motion
- **Best For**: Premium, luxury interfaces
- **Feel**: Elegant, refined

#### 3. `sine.inOut` (Gentle)
- **Cubic Bezier**: cubic-bezier(0.37, 0, 0.63, 1)
- **Characteristics**: Very gentle, organic
- **Best For**: Minimal, calm interfaces
- **Feel**: Ultra-smooth, subtle

#### 4. `quint.out` (Bold)
- **Cubic Bezier**: cubic-bezier(0.22, 1, 0.36, 1)
- **Characteristics**: Strong start, confident finish
- **Best For**: Hero content, attention-grabbing
- **Feel**: Bold, impactful

#### 5. `back.out(1.7)` (Playful)
- **Characteristics**: Overshoots slightly, then settles
- **Best For**: Friendly, approachable brands
- **Feel**: Playful, energetic

## Timing Diagram

```
Time (s): 0.0   0.15  0.35  0.55  0.65  0.75  0.73  0.81  2.0
         |     |     |     |     |     |     |     |     |
Badge:   [====]                             
Title:         [==========]                   
Sub:                 [=========]              
Buttons:              [=======]                
  Btn1:                    [=====]             
  Btn2:                       [=====]          
Footer:                     [=======]          
BG:      [========================]           
```

## Choreography Patterns

### Current Pattern: Hierarchical Stagger
1. **Context First**: Beta badge establishes context
2. **Primary Message**: Hero title grabs attention
3. **Supporting Info**: Subtitle provides details
4. **Call to Action**: Buttons encourage interaction
5. **Trust Signals**: Footer text builds confidence
6. **Atmosphere**: Background creates depth

### Stagger Timing Formula
```javascript
startTime = (elementIndex * 0.15) + customOffset
```

### Element Hierarchy
1. **Contextual Elements** (Badge): 0.0s
2. **Primary Content** (Title): 0.15s
3. **Secondary Content** (Subtitle): 0.35s
4. **Interactive Elements** (Buttons): 0.55s
5. **Supporting Info** (Footer): 0.75s

## Recommended Improvements

### 1. Stable Duration Pattern
**Issue**: Variable durations (0.6s - 1.0s) create inconsistency
**Solution**: Standardize to 0.8s for all elements

```javascript
// Before (Variable)
duration: element.tagName === 'H1' ? 1.0 : 0.7

// After (Stable)
duration: 0.8 // All elements
```

### 2. Pure Stagger Timing
**Issue**: Complex offsets make maintenance difficult
**Solution**: Simple index-based staggering

```javascript
// Before (Complex)
index * 0.15 + customOffset

// After (Simple)
elementIndex * 0.12
```

### 3. Consistent Properties
**Issue**: Different transforms per element
**Solution**: Same property set for all elements

```javascript
// Standardized transforms
{
  opacity: [0, 1],
  y: [60, 0],
  scale: [0.98, 1],
  filter: ["blur(1px)", "blur(0px)"]
}
```

## Implementation Guide

### Basic Setup
```javascript
const { createTimeline } = useGSAPAnimations();
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (containerRef.current) {
    const timeline = createTimeline();
    const elements = containerRef.current.querySelectorAll('[data-hero-animate]');
    
    // Set initial states
    gsap.set(elements, {
      opacity: 0,
      y: 60,
      filter: "blur(1px)"
    });
    
    // Animate elements
    elements.forEach((element, index) => {
      timeline.to(element, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.inOut"
      }, index * 0.12);
    });
  }
}, [createTimeline]);
```

### Custom Easing Selection
```javascript
const easingOptions = {
  professional: "power2.inOut",
  modern: "power3.out", 
  premium: "quart.out",
  gentle: "sine.inOut",
  bold: "quint.out"
};

const selectedEasing = easingOptions[brandPersonality];
```

## Performance Considerations

### Optimization Tips
1. **Use `will-change` sparingly** - Only for complex transforms
2. **Avoid layout thrashing** - Batch DOM reads/writes
3. **Prefer opacity/transform** - Most performant properties
4. **Respect reduced motion** - Check `prefers-reduced-motion`
5. **Clean up animations** - Kill tweens on unmount

### Accessibility
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Simple fade instead of complex animation
  gsap.to(elements, { opacity: 1, duration: 0.3 });
} else {
  // Full animation sequence
  // ... existing animation code
}
```

## Customization Options

### Duration Variations
- **Fast**: 0.5s (Quick, energetic)
- **Standard**: 0.8s (Balanced, professional)
- **Slow**: 1.2s (Deliberate, elegant)

### Stagger Variations
- **Tight**: 0.08s (Rapid succession)
- **Standard**: 0.12s (Natural flow)
- **Spacious**: 0.2s (Dramatic reveal)

### Distance Variations
- **Subtle**: y: 30px (Gentle motion)
- **Standard**: y: 60px (Balanced impact)
- **Dramatic**: y: 100px (Strong entrance)

## Troubleshooting

### Common Issues
1. **Janky Animation**: Check for layout thrashing
2. **Elements Not Appearing**: Verify `[data-hero-animate]` attributes
3. **Inconsistent Timing**: Check for conflicting animations
4. **Performance Issues**: Reduce number of simultaneous animations

### Debug Tools
```javascript
// Add to timeline for debugging
timeline.addLabel("badgeStart", 0);
timeline.addLabel("titleStart", 0.15);
timeline.addLabel("subtitleStart", 0.35);

// Log timeline progress
timeline.eventCallback("onUpdate", () => {
  console.log("Progress:", timeline.progress());
});
```

## Future Enhancements

### Planned Improvements
1. **Scroll-triggered animations** for dynamic reveals
2. **Intersection Observer** for performance optimization
3. **Spring physics** for more natural motion
4. **Gesture-based** interactions for mobile
5. **Theme-aware** animation variations

### Advanced Patterns
1. **Cascade effects** for complex layouts
2. **Morphing animations** between states
3. **Particle systems** for atmospheric effects
4. **3D transforms** for depth perception
5. **SVG path animations** for custom shapes

---

*Last Updated: 2026-05-08*
*Version: 1.0*
*Framework: GSAP 3.x*
*Compatible: React 18+*