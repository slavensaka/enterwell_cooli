'use client';

import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { config } from './cookieconsent-config';

/**
 * CookieConsent component that initializes the Enterwell/vanilla-cookieconsent plugin.
 * Should be mounted once in the root layout.
 */
export default function CookieConsentComponent() {
    useEffect(() => {
        // Initialize the cookie consent plugin
        CookieConsent.run(config);
    }, []);

    return null; // This component does not render anything itself, the plugin injects HTML to body
}
