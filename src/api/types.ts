export type SitePage =
  | 'HOME'
  | 'SERVICES'
  | 'PACKAGES'
  | 'GIFT_VOUCHERS'
  | 'LOCATIONS'
  | 'CORPORATE'
  | 'ACADEMY'
  | 'ABOUT'
  | 'CAREERS'
  | 'TESTIMONIALS'
  | 'FAQ'
  | 'TERMS'
  | 'PRIVACY';

export type Hero = {
  id: string;
  page: SitePage;
  eyebrow: string | null;
  title: string;
  titleAccent: string | null;
  tagline: string | null;
  description: string | null;
  notice: string | null;
  imageUrl: string | null;
  primaryCtaLabel: string | null;
  primaryCtaHref: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaHref: string | null;
  highlights: string[];
  isActive: boolean;
};

export type SectionOutro = {
  id: string;
  page: SitePage;
  eyebrow: string | null;
  title: string;
  titleAccent: string | null;
  description: string | null;
  primaryCtaLabel: string | null;
  primaryCtaHref: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaHref: string | null;
  isActive: boolean;
};

export type SectionIntro = {
  id: string;
  page: SitePage;
  sectionKey: string;
  eyebrow: string | null;
  title: string;
  titleAccent: string | null;
  description: string | null;
  isActive: boolean;
};

export type OfferCard = {
  id: string;
  page: SitePage;
  sectionKey: string;
  name: string;
  imageUrl: string | null;
  subtitle: string | null;
  badge: string | null;
  price: string | null;
  priceNote: string | null;
  perks: string[];
  ctaLabel: string | null;
  ctaHref: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type FeatureItem = {
  id: string;
  page: SitePage;
  sectionKey: string;
  title: string;
  description: string | null;
  content: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type StepItem = {
  id: string;
  page: SitePage;
  sectionKey: string;
  title: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
};

export type MilestoneStat = {
  id: string;
  page: SitePage;
  sectionKey: string;
  value: string;
  label: string;
  sortOrder: number;
  isActive: boolean;
};

export type ContentNote = {
  id: string;
  page: SitePage;
  sectionKey: string;
  content: string;
  isActive: boolean;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
  categoryId: string;
};

export type FaqCategory = {
  id: string;
  page: string;
  label: string;
  title: string;
  sortOrder: number;
  isActive: boolean;
  faqs: Faq[];
};

export type Testimonial = {
  id: string;
  name: string;
  content: string;
  subtitle: string;
  sortOrder: number;
  isActive: boolean;
  categoryId: string;
};

export type TestimonialCategory = {
  id: string;
  label: string;
  title: string;
  sortOrder: number;
  isActive: boolean;
  testimonials: Testimonial[];
};

export type LegalDocument = {
  id: string;
  page: SitePage;
  content: string;
  isActive: boolean;
};

export type Currency = {
  id: string;
  code: string;
  symbol: string;
  name: string;
  isActive: boolean;
};

export type ServiceItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  imageUrl: string | null;
  badge: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type CategoryPrice = {
  id: string;
  categoryId: string;
  label: string;
  description: string | null;
  price: number;
  kind: 'SINGLE' | 'PACKAGE';
  sortOrder: number;
  isActive: boolean;
};

export type CategoryAddon = {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  price: number;
  sortOrder: number;
  isActive: boolean;
};

export type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
  eyebrow: string;
  titleAccent: string | null;
  subtitle: string;
  introEyebrow: string | null;
  tagline: string | null;
  pricingSubtitle: string | null;
  note: string | null;
  cardBlurb: string | null;
  imageUrl: string | null;
  highlights: string[];
  currencyId: string;
  currency: Currency;
  sortOrder: number;
  isActive: boolean;
  services: ServiceItem[];
  prices: CategoryPrice[];
  addons: CategoryAddon[];
  servicesLine?: string;
  priceSummary?: string | null;
};

export type FaqPageData = {
  page: 'FAQ';
  hero: Hero | null;
  faqCategories: FaqCategory[];
  sectionOutro: SectionOutro | null;
};

export type TestimonialsPageData = {
  page: 'TESTIMONIALS';
  hero: Hero | null;
  testimonialCategories: TestimonialCategory[];
  sectionOutro: SectionOutro | null;
};

export type LegalPageData = {
  page: 'TERMS' | 'PRIVACY';
  hero: Hero | null;
  legalDocument: LegalDocument | null;
};

export type HomePageData = {
  page: 'HOME';
  hero: Hero | null;
  milestones: { stats: MilestoneStat[] };
  packages: { intro: SectionIntro | null; items: OfferCard[] };
  categories: {
    intro: SectionIntro | null;
    items: ServiceCategory[];
  };
  howItWorks: { intro: SectionIntro | null; items: StepItem[] };
  coverage: {
    intro: SectionIntro | null;
    items: FeatureItem[];
    note: ContentNote | null;
  };
  beyond: { intro: SectionIntro | null; items: OfferCard[] };
  testimonials: { intro: SectionIntro | null; items: Testimonial[] };
  sectionOutro: SectionOutro | null;
};

export type ServicesPageData = {
  page: 'SERVICES';
  hero: Hero | null;
  categories: ServiceCategory[];
  receiveCare: {
    intro: SectionIntro | null;
    items: FeatureItem[];
    note: ContentNote | null;
  };
  kureStandard: {
    intro: SectionIntro | null;
    content: ContentNote | null;
    stats: MilestoneStat[];
  };
  sectionOutro: SectionOutro | null;
};

export type ServiceCategoryPageData = {
  page: 'SERVICES';
  category: ServiceCategory;
  standard: { intro: SectionIntro | null };
  sectionOutro: SectionOutro | null;
};

export type PackagesPageData = {
  page: 'PACKAGES';
  hero: Hero | null;
  sizes: {
    intro: SectionIntro | null;
    items: OfferCard[];
    note: ContentNote | null;
  };
  benefits: { intro: SectionIntro | null; items: FeatureItem[] };
  howItWorks: { intro: SectionIntro | null; items: StepItem[] };
  faq: { intro: SectionIntro | null; categories: FaqCategory[] };
  sectionOutro: SectionOutro | null;
};

export type ContentBlock = {
  id: string;
  page: SitePage;
  sectionKey: string;
  content: string;
  isActive: boolean;
};

export type JobOpening = {
  id: string;
  title: string;
  status: 'ACTIVELY_HIRING' | 'TALENT_POOL' | string;
  employmentTypes: string[];
  locations: string[];
  description: string;
  sortOrder: number;
  isActive: boolean;
};

export type GiftVouchersPageData = {
  page: 'GIFT_VOUCHERS';
  hero: Hero | null;
  options: { intro: SectionIntro | null; items: OfferCard[]; note: ContentNote | null };
  policy: { intro: SectionIntro | null; items: FeatureItem[] };
  steps: { intro: SectionIntro | null; items: StepItem[] };
  sectionOutro: SectionOutro | null;
};

export type LocationsPageData = {
  page: 'LOCATIONS';
  hero: Hero | null;
  houses: { intro: SectionIntro | null; items: OfferCard[] };
  coverage: { intro: SectionIntro | null; items: FeatureItem[]; note: ContentNote | null };
  bookingArrival: { intro: SectionIntro | null; items: FeatureItem[] };
  sectionOutro: SectionOutro | null;
};

export type CorporatePageData = {
  page: 'CORPORATE';
  hero: Hero | null;
  occasions: { intro: SectionIntro | null; items: OfferCard[] };
  corporateWellness: { intro: SectionIntro | null; items: FeatureItem[] };
  wellnessEvents: { intro: SectionIntro | null; items: FeatureItem[] };
  onSiteDelivery: {
    intro: SectionIntro | null;
    inclusions: FeatureItem[];
    scales: MilestoneStat[];
  };
  whyPartners: { intro: SectionIntro | null; items: FeatureItem[] };
};

export type AcademyPageData = {
  page: 'ACADEMY';
  hero: Hero | null;
  trainedByKure: { intro: SectionIntro | null };
  whatWeTeach: {
    intro: SectionIntro | null;
    formats: FeatureItem[];
    categories: FeatureItem[];
    categoryFooter: ContentNote | null;
    note: ContentNote | null;
  };
  howItWorks: { intro: SectionIntro | null; items: StepItem[] };
  certification: {
    intro: SectionIntro | null;
    content: ContentNote | null;
    methodNote: ContentNote | null;
  };
  enrollment: { intro: SectionIntro | null; items: StepItem[] };
  faq: { categories: FaqCategory[] };
  sectionOutro: SectionOutro | null;
};

export type AboutPageData = {
  page: 'ABOUT';
  hero: Hero | null;
  contentBlocks: Record<string, ContentBlock>;
  ecosystem: { intro: SectionIntro | null; items: FeatureItem[] };
  milestones: { intro: SectionIntro | null; stats: MilestoneStat[] };
  sectionOutro: SectionOutro | null;
};

export type CareersPageData = {
  page: 'CAREERS';
  hero: Hero | null;
  whyWorkHere: { intro: SectionIntro | null; items: StepItem[] };
  openRoles: { intro: SectionIntro | null; items: JobOpening[] };
  academyPathway: { intro: SectionIntro | null; items: StepItem[] };
  howToApply: { intro: SectionIntro | null; items: StepItem[] };
  sectionOutro: SectionOutro | null;
};

export type BookingLocation = {
  id: string;
  name: string;
  type: 'HOUSE' | 'IN_HOME';
  sortOrder: number;
};

export type BookingService = {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  durations: string[];
  defaultDuration: string | null;
  sortOrder: number;
};

export type BookingAddon = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  categoryId: string;
  categoryName: string;
};

export type BookingOptionsData = {
  locations: BookingLocation[];
  services: BookingService[];
  addons: BookingAddon[];
};
