import Link from 'next/link';
import Container from './UI/Container';
import SectionHeader from './UI/SectionHeader';
import { toCta } from '../api/cta';
import type { OfferCard, SectionIntro } from '../api/types';
import BrandMark from './BrandMark';

type ByKureProps = {
  intro: SectionIntro | null;
  items: OfferCard[];
};

const ByKure = ({ intro, items }: ByKureProps) => {
  if (!intro || !items.length) return null;

  return (
    <section className='bg-theme-ink px-5 section-py text-white md:px-10'>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow ?? undefined}
          title={intro.title}
          subtitle={intro.description ?? undefined}
          theme='dark'
          subtitleClassName='mb-5'
        />

        <div className='mt-5 grid gap-[22px] md:grid-cols-3'>
          {items.map((card) => {
            const cta = toCta(card.ctaLabel, card.ctaHref);
            const href = cta?.href ?? '/';
            const isExternal = href.startsWith('http');
            const className =
              'group relative flex min-h-[500px] cursor-pointer flex-col justify-between overflow-hidden rounded bg-cover bg-center p-8 text-white transition-transform duration-300 hover:-translate-y-1.5';

            const inner = (
              <>
                <div className='absolute inset-0 bg-black/40' aria-hidden />
                <div
                  className='absolute inset-0 bg-gradient-to-b from-brand/50 via-[#101010]/50 to-[#101010]/92'
                  aria-hidden
                />
                <div className='relative z-10'>
                  {card.badge && (
                    <div className='mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/85'>
                      {card.badge}
                    </div>
                  )}
                  <h3 className='mb-1 text-[30px] font-medium leading-none text-white'>
                    {card.name}
                  </h3>
                  {card.priceNote && (
                    <div className='mb-[22px] text-[13px] font-normal uppercase tracking-[0.2em] text-brand'>
                      {card.priceNote}
                    </div>
                  )}
                  {card.subtitle && (
                    <p className='mb-5 text-sm leading-snug text-white/85'>
                      {card.subtitle}
                    </p>
                  )}
                  <ul>
                    {card.perks.map((feature) => (
                      <li
                        key={feature}
                        className='flex items-center gap-2.5 border-b border-white/[0.08] py-1.5 text-[13px] text-white/90'
                      >
                        <BrandMark variant='check' className='text-[15px]' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {cta && (
                  <span className='relative z-10 mt-5 inline-flex items-center justify-center border border-brand bg-white/[0.08] px-[18px] py-3 text-center text-xs font-medium uppercase tracking-[0.08em] text-white transition-all duration-300 group-hover:bg-brand group-hover:text-white'>
                    {cta.label}
                  </span>
                )}
              </>
            );

            if (isExternal) {
              return (
                <a
                  key={card.id}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={className}
                  style={
                    card.imageUrl
                      ? { backgroundImage: `url(${card.imageUrl})` }
                      : undefined
                  }
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link
                key={card.id}
                href={href}
                className={className}
                style={
                  card.imageUrl
                    ? { backgroundImage: `url(${card.imageUrl})` }
                    : undefined
                }
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ByKure;
