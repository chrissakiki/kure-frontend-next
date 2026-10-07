import { get } from './client';
import type {
  AboutPageData,
  AcademyPageData,
  BookingOptionsData,
  CareersPageData,
  CorporatePageData,
  FaqPageData,
  GiftVouchersPageData,
  HomePageData,
  LegalPageData,
  LocationsPageData,
  PackagesPageData,
  ServiceCategoryPageData,
  ServicesPageData,
  TestimonialsPageData,
} from './types';

export const getFaqPage = () => get<FaqPageData>('/pages/faq');

export const getTestimonialsPage = () =>
  get<TestimonialsPageData>('/pages/testimonials');

export const getTermsPage = () => get<LegalPageData>('/pages/terms');

export const getPrivacyPage = () => get<LegalPageData>('/pages/privacy');

export const getHomePage = () => get<HomePageData>('/pages/home');

export const getServicesPage = () => get<ServicesPageData>('/pages/services');

export const getServiceCategoryPage = (slug: string) =>
  get<ServiceCategoryPageData>(`/pages/services/${slug}`);

export const getPackagesPage = () => get<PackagesPageData>('/pages/packages');

export const getGiftVouchersPage = () =>
  get<GiftVouchersPageData>('/pages/gift-vouchers');

export const getLocationsPage = () =>
  get<LocationsPageData>('/pages/locations');

export const getCorporatePage = () =>
  get<CorporatePageData>('/pages/corporate');

export const getAcademyPage = () => get<AcademyPageData>('/pages/academy');

export const getAboutPage = () => get<AboutPageData>('/pages/about');

export const getCareersPage = () => get<CareersPageData>('/pages/careers');

export const getBookingOptions = () =>
  get<BookingOptionsData>('/booking/options');
