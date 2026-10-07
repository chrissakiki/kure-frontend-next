import type { Metadata } from 'next';

export const SITE_URL = 'https://getkured.co';
export const SITE_NAME = 'Kure Wellness';

export const HOME_META_DESCRIPTION =
  'Book massage, Lymphatic drainage, body sculpting and wellness treatments at Kure Dbaye and Verdun at home. Trusted care since 2018.';

const PRIORITY_SERVICES =
  'Lymphatic Drainage, Brazilian Sculpting, Couples Massage, Madero Therapy, Stretching Therapy, Sports Massage';

const HOME_HERO_INTRO =
  'Premium massage therapy, sculpting, lymphatic, facial, and recovery — practiced by trained hands and delivered at home, at KURE Dbayeh, and at KURE Verdun.';

export const HOME_TITLE = 'Kure Lebanon | Wellness Spaces & In-Home Treatments';

export const buildPageTitle = (pageLabel: string): string => {
  return `Kure Lebanon | ${pageLabel}`;
};

export const buildServicesPageDescription = (): string => {
  return `${PRIORITY_SERVICES}. ${HOME_HERO_INTRO} Trusted care since 2018.`;
};

export type RouteMetaTags = {
  title: string;
  description: string;
  path: string;
};

/** Static SEO copy — previously from heroes / services JSON. */
const PAGE_META: Record<string, { title: string; description: string }> = {
  '/about': {
    title: 'About',
    description:
      "From one therapist to Lebanon's leading wellness ecosystem — the story of KURE.",
  },
  '/services': {
    title: 'Services & Prices',
    description: buildServicesPageDescription(),
  },
  '/locations': {
    title: 'Locations',
    description:
      'KURE Dbayeh, KURE Verdun, and in-home coverage across Lebanon — same trained hands, same standards, wherever you are.',
  },
  '/packages': {
    title: 'Packages',
    description:
      'Prepay for 5 or 10 sessions and save on every visit. Priority booking. Extended validity. Consistency is where results happen.',
  },
  '/vouchers': {
    title: 'Gift Vouchers',
    description:
      'Give someone you love the gift of care — a signature session, a facial ritual, or a package to enjoy at their own rhythm.',
  },
  '/corporate-events': {
    title: 'Corporate & Events',
    description:
      'Wellness for the way your team works — and the moments worth remembering. On-site programs for offices, curated experiences for gatherings.',
  },
  '/academy': {
    title: 'KURE Academy',
    description:
      'Learn the KURE method. Practical wellness workshops for therapists, wellness professionals, and anyone drawn to the art of bodywork.',
  },
  '/testimonials': {
    title: 'Testimonials',
    description:
      'Real reviews from real KURE clients — one-off sessions, packages, corporate programs, events, and Academy graduates.',
  },
  '/faq': {
    title: 'FAQ',
    description:
      'Answers about booking, packages, in-home visits, and what to expect at KURE Dbayeh, Verdun, or at home.',
  },
  '/careers': {
    title: 'Careers',
    description:
      "KURE is Lebanon's premium wellness house — two clinics, an in-home service across nine regions, and a growing training academy. If you take your craft seriously, we do too.",
  },
  '/terms': {
    title: 'Terms & Conditions',
    description: 'Terms and conditions for booking and using KURE services.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'How KURE collects, uses, and protects your personal information.',
  },
};

const RITUAL_META: Record<string, { title: string; description: string }> = {
  facial: {
    title: 'Facial Lifting Massages',
    description:
      'Facial Madero wood, Facial Iced Madero. Madero-inspired lifting techniques for tone, lift, and radiance. Book at KURE Dbayeh, Verdun, or at home. From $45. Trusted care since 2018.',
  },
  shaping: {
    title: 'Slimming & Drainage',
    description:
      'Lymphatic Drainage, Manual Cellulite Removal, Madero Wood Therapy, Iced Madero Therapy, Brazilian Sculpting, Gut Therapy. Body sculpting, cellulite reduction, and lymphatic drainage — visible results, session by session. Book at KURE Dbayeh, Verdun, or at home. From $65. Trusted care since 2018.',
  },
  body: {
    title: 'Body Massages',
    description:
      'Relaxing Massage, Deep Tissue Massage, Pregnancy Massage, In-Home Couples Massage. Full-body relaxation, tension release, and specialized care — tailored to your rhythm. Book at KURE Dbayeh, Verdun, or at home. From $65. Trusted care since 2018.',
  },
  sports: {
    title: 'Sports Recovery',
    description:
      'Stretching Therapy, Sports Massage. Targeted recovery for athletes and active bodies — faster recovery, better performance. Book at KURE Dbayeh, Verdun, or at home. From $55. Trusted care since 2018.',
  },
};

/** Single source of truth — meta per URL path. */
export const getMetaForPath = (pathname: string): RouteMetaTags => {
  if (pathname === '/') {
    return {
      title: HOME_TITLE,
      description: HOME_META_DESCRIPTION,
      path: '/',
    };
  }

  const ritualMatch = pathname.match(/^\/rituals\/([^/]+)$/);
  if (ritualMatch) {
    const ritual = RITUAL_META[ritualMatch[1]];
    if (ritual) {
      return {
        title: buildPageTitle(ritual.title),
        description: ritual.description,
        path: pathname,
      };
    }
  }

  const page = PAGE_META[pathname];
  if (page) {
    return {
      title: buildPageTitle(page.title),
      description: page.description,
      path: pathname,
    };
  }

  return {
    title: HOME_TITLE,
    description: HOME_META_DESCRIPTION,
    path: pathname,
  };
};

export const absoluteUrl = (path: string): string => {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
};

export const pageMetadata = (path: string): Metadata => {
  const meta = getMetaForPath(path);
  const url = absoluteUrl(meta.path);

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'Kure Lebanon',
  url: `${SITE_URL}/`,
  description: HOME_META_DESCRIPTION,
};
