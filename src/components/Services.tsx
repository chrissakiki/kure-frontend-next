import Link from 'next/link';
import Container from './UI/Container';
import SectionHeader from './UI/SectionHeader';
import RevealImage from './RevealImage';
import type { SectionIntro, ServiceCategory } from '../api/types';

type ServicesProps = {
  intro: SectionIntro | null;
  items: ServiceCategory[];
};

const Services = ({ intro, items }: ServicesProps) => {
  if (!intro || !items.length) return null;

  return (
    <section className='bg-white px-5 section-py md:px-10'>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow ?? undefined}
          title={intro.title}
          subtitle={intro.description ?? undefined}
        />

        <div className='grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4'>
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/rituals/${item.slug}`}
              className='group relative cursor-pointer overflow-hidden rounded'
            >
              <RevealImage
                src={item.imageUrl ?? ''}
                alt={item.name}
                className='aspect-[4/5] bg-theme-ink'
                imgClassName='h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
              >
                <div className='absolute inset-0 bg-black/35' aria-hidden />
                <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent via-[#101010]/40 to-[#101010]/90 p-7 text-white'>
                  <span className='mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-brand'>
                    {item.eyebrow}
                  </span>
                  <h3 className='mb-2.5 text-[28px] font-medium leading-[1.05] text-white'>
                    {item.name}
                  </h3>
                  <p className='mb-3 max-w-[320px] text-[13px] leading-snug text-white/85'>
                    {item.cardBlurb ?? item.subtitle}
                  </p>
                  {item.priceSummary && (
                    <div className='text-[15px] font-medium text-brand'>
                      {item.priceSummary}
                    </div>
                  )}
                </div>
              </RevealImage>
            </Link>
          ))}
        </div>

        <div className='mt-10 text-center'>
          <Link
            href='/services'
            className='inline-block border border-[#101010] bg-transparent px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-[#101010] transition-all duration-300 hover:bg-theme-ink hover:text-white'
          >
            View All Services
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Services;
