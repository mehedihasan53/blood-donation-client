// SEO and meta tag management utilities

export const SEO_CONFIG = {
    defaultTitle: 'BloodConnect - Save Lives Through Blood Donation',
    titleTemplate: '%s | BloodConnect',
    defaultDescription: 'Join BloodConnect, a life-saving blood donation platform connecting donors with recipients. Find blood donors, create donation requests, and help save lives in your community.',
    siteUrl: 'https://snazzy-salamander-1be15f.netlify.app',
    defaultImage: '/assets/banner.png',
    twitterHandle: '@bloodconnect',
    fbAppId: '123456789'
};

// Update document title
export const updateTitle = (title) => {
    if (title) {
        document.title = SEO_CONFIG.titleTemplate.replace('%s', title);
    } else {
        document.title = SEO_CONFIG.defaultTitle;
    }
};

// Update meta tags
export const updateMetaTags = (meta = {}) => {
    const {
        title = SEO_CONFIG.defaultTitle,
        description = SEO_CONFIG.defaultDescription,
        image = SEO_CONFIG.defaultImage,
        url = window.location.href,
        type = 'website',
        keywords = 'blood donation, blood donors, emergency blood, save lives, healthcare'
    } = meta;

    // Update or create meta tags
    const metaTags = [
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        { name: 'author', content: 'BloodConnect Team' },

        // Open Graph
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: `${SEO_CONFIG.siteUrl}${image}` },
        { property: 'og:url', content: url },
        { property: 'og:type', content: type },
        { property: 'og:site_name', content: 'BloodConnect' },
        { property: 'fb:app_id', content: SEO_CONFIG.fbAppId },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: SEO_CONFIG.twitterHandle },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: `${SEO_CONFIG.siteUrl}${image}` },

        // Additional SEO
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#DC2626' }
    ];

    metaTags.forEach(({ name, property, content }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        let element = document.querySelector(selector);

        if (!element) {
            element = document.createElement('meta');
            if (name) element.setAttribute('name', name);
            if (property) element.setAttribute('property', property);
            document.head.appendChild(element);
        }

        element.setAttribute('content', content);
    });

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
};

// Generate structured data (JSON-LD)
export const generateStructuredData = (type, data) => {
    const baseStructure = {
        '@context': 'https://schema.org',
        '@type': type
    };

    let structuredData = { ...baseStructure };

    switch (type) {
        case 'Organization':
            structuredData = {
                ...structuredData,
                name: 'BloodConnect',
                description: SEO_CONFIG.defaultDescription,
                url: SEO_CONFIG.siteUrl,
                logo: `${SEO_CONFIG.siteUrl}/assets/fav.png`,
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+880-XXX-XXXX',
                    contactType: 'Emergency',
                    availableLanguage: ['English', 'Bengali']
                },
                sameAs: [
                    'https://facebook.com/bloodconnect',
                    'https://twitter.com/bloodconnect'
                ],
                ...data
            };
            break;

        case 'WebSite':
            structuredData = {
                ...structuredData,
                name: 'BloodConnect',
                url: SEO_CONFIG.siteUrl,
                potentialAction: {
                    '@type': 'SearchAction',
                    target: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
                    'query-input': 'required name=search_term_string'
                },
                ...data
            };
            break;

        case 'MedicalOrganization':
            structuredData = {
                ...structuredData,
                name: 'BloodConnect',
                description: 'Blood donation and emergency blood request platform',
                medicalSpecialty: 'Hematology',
                serviceType: 'Blood Donation Services',
                ...data
            };
            break;
    }

    // Insert or update structured data
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
};

// Page-specific SEO configurations
export const PAGE_SEO = {
    home: {
        title: 'Home',
        description: 'BloodConnect - The leading blood donation platform connecting donors with recipients. Join our community and help save lives.',
        keywords: 'blood donation, blood donors, emergency blood, save lives, healthcare, community'
    },

    search: {
        title: 'Search Blood Donors',
        description: 'Find blood donors in your area. Search by blood group, location, and availability to connect with life-saving donors.',
        keywords: 'find blood donors, search donors, blood group, emergency blood'
    },

    donate: {
        title: 'Make a Donation',
        description: 'Support BloodConnect with a monetary donation to help us maintain and improve our life-saving platform.',
        keywords: 'donate money, support, funding, healthcare donation'
    },

    dashboard: {
        title: 'Dashboard',
        description: 'Manage your blood donation requests, view statistics, and track your contributions to saving lives.',
        keywords: 'dashboard, manage requests, blood donation management'
    },

    login: {
        title: 'Login',
        description: 'Login to your BloodConnect account to access donation requests, search for donors, and manage your profile.',
        keywords: 'login, sign in, account access'
    },

    register: {
        title: 'Join as Blood Donor',
        description: 'Register as a blood donor and join our community of life-savers. Create your profile and start helping those in need.',
        keywords: 'register, sign up, become donor, join community'
    }
};

// Enhanced DynamicTitle component with SEO
export const useSEO = (pageKey, customMeta = {}) => {
    React.useEffect(() => {
        const pageSEO = PAGE_SEO[pageKey] || {};
        const meta = { ...pageSEO, ...customMeta };

        updateTitle(meta.title);
        updateMetaTags(meta);

        // Generate structured data for specific pages
        if (pageKey === 'home') {
            generateStructuredData('Organization');
            generateStructuredData('WebSite');
        }
    }, [pageKey, customMeta]);
};