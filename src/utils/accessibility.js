// Accessibility utilities and helpers

// Screen reader announcements
export const announceToScreenReader = (message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
};

// Focus management
export const focusElement = (selector, delay = 0) => {
    setTimeout(() => {
        const element = document.querySelector(selector);
        if (element) {
            element.focus();
        }
    }, delay);
};

// Trap focus within a container (for modals)
export const trapFocus = (container) => {
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }

        if (e.key === 'Escape') {
            // Close modal or return focus
            const closeButton = container.querySelector('[data-close]');
            if (closeButton) closeButton.click();
        }
    };

    container.addEventListener('keydown', handleTabKey);

    // Focus first element
    if (firstElement) firstElement.focus();

    // Return cleanup function
    return () => {
        container.removeEventListener('keydown', handleTabKey);
    };
};

// Color contrast checker
export const checkColorContrast = (foreground, background) => {
    // Simplified contrast ratio calculation
    const getLuminance = (color) => {
        const rgb = color.match(/\d+/g);
        if (!rgb) return 0;

        const [r, g, b] = rgb.map(c => {
            c = parseInt(c) / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
        ratio,
        AA: ratio >= 4.5,
        AAA: ratio >= 7
    };
};

// Keyboard navigation helpers
export const handleArrowNavigation = (e, items, currentIndex, onSelect) => {
    let newIndex = currentIndex;

    switch (e.key) {
        case 'ArrowDown':
            newIndex = (currentIndex + 1) % items.length;
            e.preventDefault();
            break;
        case 'ArrowUp':
            newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
            e.preventDefault();
            break;
        case 'Home':
            newIndex = 0;
            e.preventDefault();
            break;
        case 'End':
            newIndex = items.length - 1;
            e.preventDefault();
            break;
        case 'Enter':
        case ' ':
            if (onSelect) onSelect(items[currentIndex]);
            e.preventDefault();
            break;
    }

    return newIndex;
};

// ARIA label generators
export const generateAriaLabel = {
    bloodGroup: (group) => `Blood group ${group}`,
    status: (status) => `Request status: ${status}`,
    date: (date) => `Date: ${new Date(date).toLocaleDateString()}`,
    user: (name, role) => `${name}, ${role}`,
    action: (action, target) => `${action} ${target}`,
    navigation: (current, total) => `Page ${current} of ${total}`,
    loading: (action) => `Loading ${action}, please wait`,
    error: (message) => `Error: ${message}`,
    success: (message) => `Success: ${message}`
};

// Reduced motion detection
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// High contrast mode detection
export const prefersHighContrast = () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
};

// Screen reader detection (basic)
export const isScreenReaderActive = () => {
    // This is a basic check - more sophisticated detection would be needed for production
    return window.navigator.userAgent.includes('NVDA') ||
        window.navigator.userAgent.includes('JAWS') ||
        window.speechSynthesis?.speaking;
};