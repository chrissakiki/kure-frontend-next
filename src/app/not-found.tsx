import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/UI/Container';
import { buildPageTitle } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: buildPageTitle('Page not found') },
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className='bg-white px-5 py-24 md:px-10'>
      <Container>
        <h1 className='mb-4 text-center text-[clamp(2rem,5vw,3rem)] font-medium text-theme-primary'>
          Page not found
        </h1>
        <p className='mb-8 text-center text-[15px] text-theme-secondary'>
          The page you are looking for does not exist.
        </p>
        <div className='text-center'>
          <Link
            href='/'
            className='inline-block bg-brand px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover'
          >
            Back home
          </Link>
        </div>
      </Container>
    </section>
  );
}
