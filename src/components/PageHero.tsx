'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from './UI/Container';
import Modal from './UI/Modal';
import Booking from './Booking';
import { toCta } from '../api/cta';
import type { Hero } from '../api/types';
import BrandMark from './BrandMark';

type PageHeroProps = {
  hero: Hero | null;
  minHeightClass?: string;
  showWave?: boolean;
};

const PageHero = ({
  hero,
  minHeightClass = 'min-h-[55vh]',
  showWave = false,
}: PageHeroProps) => {
  const [showModal, setShowModal] = useState(false);

  if (!hero?.title) return null;

  const primaryCta = toCta(hero.primaryCtaLabel, hero.primaryCtaHref);
  const secondaryCta = toCta(hero.secondaryCtaLabel, hero.secondaryCtaHref);

  const renderCta = (
    cta: NonNullable<typeof primaryCta>,
    variant: 'primary' | 'secondary'
  ) => {
    const className =
      variant === 'primary'
        ? 'bg-brand px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover'
        : 'border border-brand bg-transparent px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-all duration-300 hover:bg-brand hover:text-white';

    if (cta.action === 'book') {
      return (
        <button
          key={cta.label}
          type='button'
          onClick={() => setShowModal(true)}
          className={className}
        >
          {cta.label}
        </button>
      );
    }

    const href = cta.href ?? '/';

    if (href.startsWith('#')) {
      return (
        <a key={cta.label} href={href} className={className}>
          {cta.label}
        </a>
      );
    }

    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a
          key={cta.label}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className={className}
        >
          {cta.label}
        </a>
      );
    }

    return (
      <Link key={cta.label} href={href} className={className}>
        {cta.label}
      </Link>
    );
  };

  return (
    <>
      <section
        className={`relative flex ${minHeightClass} items-center overflow-hidden px-5 section-py text-white md:px-10`}
      >
        <div className='absolute inset-0' aria-hidden>
          {hero.imageUrl && (
            <div
              className='absolute inset-0 bg-cover bg-center brightness-[0.5] saturate-[0.9]'
              style={{ backgroundImage: `url(${hero.imageUrl})` }}
            />
          )}
          <div className='absolute inset-0 bg-gradient-to-r from-[#101010]/[0.72] via-[#101010]/40 to-[#101010]/15' />
        </div>

        <Container cn='relative z-10'>
          {hero.eyebrow && (
            <p className='mb-6 text-xs font-medium uppercase tracking-[0.22em] text-brand'>
              {hero.eyebrow}
            </p>
          )}
          <h1
            className={`max-w-[800px] text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[0.95] text-white ${hero.tagline ? 'mb-3' : 'mb-5'}`}
          >
            {hero.title}
            {hero.titleAccent && (
              <>
                <br />
                <em className='italic text-brand'>{hero.titleAccent}</em>
              </>
            )}
          </h1>
          {hero.tagline && (
            <p className='mb-5 text-[13px] font-normal uppercase tracking-[0.2em] text-brand'>
              {hero.tagline}
            </p>
          )}
          {hero.description && (
            <p className='mb-8 max-w-[560px] text-lg font-light leading-relaxed text-white/85'>
              {hero.description}
            </p>
          )}
          {hero.notice && (
            <p className='mb-6 inline-block border border-brand bg-brand/15 px-4 py-2 text-xs italic text-brand'>
              {hero.notice}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className='flex flex-wrap gap-3.5'>
              {primaryCta && renderCta(primaryCta, 'primary')}
              {secondaryCta && renderCta(secondaryCta, 'secondary')}
            </div>
          )}
          {hero.highlights.length > 0 && (
            <div className='mt-11 flex max-w-[780px] flex-wrap items-center gap-8 border-t border-brand/35 pt-6'>
              {hero.highlights.map((label) => (
                <div key={label} className='inline-flex items-center gap-2'>
                  <BrandMark variant='shield' className='text-[14px]' />
                  <span className='text-xs font-medium uppercase tracking-[0.12em] text-white/85'>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Container>

        {showWave && (
          <div
            className='pointer-events-none absolute bottom-0 left-0 right-0 z-[5] text-white'
            aria-hidden
          >
            <svg
              className='block h-10 w-full sm:h-14 md:h-16'
              viewBox='0 0 1440 80'
              preserveAspectRatio='none'
              fill='currentColor'
            >
              <path d='M0,48 C240,78 480,18 720,38 C960,58 1200,8 1440,28 L1440,80 L0,80 Z' />
            </svg>
          </div>
        )}
      </section>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Booking setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default PageHero;
