'use client';

import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { config } from './cookieconsent-config';

/**
 * CookieConsent component that initializes the Enterwell/vanilla-cookieconsent plugin.
 * Should be mounted once in the root layout.
 */
export default function CookieConsentComponent() {
    useEffect(() => {
        // Only run on client side
        if (typeof window !== 'undefined') {
            // Dynamic import to avoid SSR issues
            import('vanilla-cookieconsent').then((CookieConsent) => {
                CookieConsent.run(config);
            });
        }
    }, []);

    return null; // This component does not render anything itself, the plugin injects HTML to body
}
