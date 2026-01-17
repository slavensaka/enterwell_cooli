import { CookieConsentConfig } from 'vanilla-cookieconsent';

export const config: CookieConsentConfig = {
    guiOptions: {
        consentModal: {
            layout: 'box',
            position: 'middle center', // Coolinarika ima centralni modal
            equalWeightButtons: false,
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            position: 'right',
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            readOnly: true
        },
        analytics: {
            autoClear: {
                cookies: [
                    {
                        name: /^_ga/,
                    },
                    {
                        name: '_gid',
                    }
                ]
            }
        }
    },
    language: {
        default: 'hr',
        autoDetect: 'browser',
        translations: {
            hr: {
                consentModal: {
                    title: 'Poštujemo Vašu privatnost!',
                    description: 'Koristimo vlastite kolačiće i kolačiće trećih strana kako bismo vam mogli prikazati web stranicu te razumjeti kako je koristite, s ciljem poboljšanja korisničkog iskustva i razvoja naših proizvoda. Klikom na „Prihvaćam sve“ učitat će se svi kolačići. Klikom na „Prihvaćam samo nužne“ učitat će se samo oni kolačići koji su neophodni za ispravno funkcioniranje web stranice (ti kolačići ne mogu se isključiti). Ako želite odabrati vrstu kolačića, kliknite na Postavke kolačića.',
                    acceptAllBtn: 'Prihvaćam sve',
                    acceptNecessaryBtn: 'Prihvaćam samo nužne',
                    showPreferencesBtn: 'Postavke kolačića',
                    footer: `
                        <a href="https://www.coolinarika.com/pravila-privatnosti" target="_blank">Pravila privatnosti</a>
                        <a href="https://www.coolinarika.com/uvjeti-koristenja" target="_blank">Uvjeti korištenja</a>
                        <a href="https://www.coolinarika.com/kolacici" target="_blank">Pravila o korištenju kolačića</a>
                    `
                },
                preferencesModal: {
                    title: 'Postavke kolačića',
                    acceptAllBtn: 'Prihvaćam sve',
                    acceptNecessaryBtn: 'Prihvaćam samo nužne',
                    savePreferencesBtn: 'Spremi postavke',
                    closeIconLabel: 'Zatvori',
                    sections: [
                        {
                            title: 'Neophodni kolačići',
                            description: 'Ovi kolačići su neophodni za funkcioniranje web stranice.',
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Analitički kolačići',
                            description: 'Ovi kolačići nam pomažu razumjeti kako koristite našu web stranicu.',
                            linkedCategory: 'analytics'
                        }
                    ]
                }
            },
            en: { // Keeping English just in case, mirroring the content
                consentModal: {
                    title: 'We respect your privacy!',
                    description: 'We use our own and third-party cookies to display the website and understand how you use it, with the aim of improving user experience and developing our products. Clicking "Accept all" will load all cookies. Clicking "Accept only necessary" will load only those cookies essential for the proper functioning of the website (these cookies cannot be turned off). If you want to select the type of cookies, click on Cookie Settings.',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Accept only necessary',
                    showPreferencesBtn: 'Cookie Settings',
                    footer: '<a href="/privacy-policy">Privacy Policy</a>'
                },
                preferencesModal: {
                    title: 'Cookie Preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Accept only necessary',
                    savePreferencesBtn: 'Save preferences',
                    closeIconLabel: 'Close',
                    sections: [
                        {
                            title: 'Necessary Cookies',
                            description: 'These cookies are essential for the proper functioning of the website.',
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Analytics Cookies',
                            description: 'These cookies help us understand how you use our website.',
                            linkedCategory: 'analytics'
                        }
                    ]
                }
            }
        }
    }
};
