'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from './UI/Container';
import Modal from './UI/Modal';
import Booking from './Booking';
import { toCta } from '../api/cta';
import type { Hero } from '../api/types';
import BrandMark from './BrandMark';

type HeroProps = {
  hero: Hero | null;
};

const HeroBanner = ({ hero }: HeroProps) => {
  const [showModal, setShowModal] = useState(false);

  if (!hero?.title) return null;

  const primaryCta = toCta(hero.primaryCtaLabel, hero.primaryCtaHref);
  const secondaryCta = toCta(hero.secondaryCtaLabel, hero.secondaryCtaHref);

  return (
    <>
      <section className='relative flex min-h-[82vh] items-center overflow-hidden px-5 text-white md:px-10 pb-[60px] pt-[40px] md:py-[160px]'>
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
          <h1 className='mb-5 max-w-[800px] text-[clamp(2.75rem,8vw,5.5rem)] font-medium leading-[0.95] text-white'>
            {hero.title}
            {hero.titleAccent && (
              <>
                <br />
                <em className='italic text-brand'>{hero.titleAccent}</em>
              </>
            )}
          </h1>
          {hero.description && (
            <p className='mb-10 max-w-[560px] text-lg font-light leading-relaxed text-white/85'>
              {hero.description}
            </p>
          )}
          <div className='flex flex-wrap gap-3.5'>
            {primaryCta?.action === 'book' ? (
              <button
                type='button'
                onClick={() => setShowModal(true)}
                className='bg-brand px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover'
              >
                {primaryCta.label}
              </button>
            ) : primaryCta ? (
              <Link
                href={primaryCta.href ?? '/'}
                className='bg-brand px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover'
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta?.action === 'book' ? (
              <button
                type='button'
                onClick={() => setShowModal(true)}
                className='border border-brand bg-transparent px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-all duration-300 hover:bg-brand hover:text-white'
              >
                {secondaryCta.label}
              </button>
            ) : secondaryCta ? (
              <Link
                href={secondaryCta.href ?? '/'}
                className='border border-brand bg-transparent px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-all duration-300 hover:bg-brand hover:text-white'
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
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

        <div
          className='pointer-events-none absolute bottom-0 left-0 right-0 z-[5] translate-y-px text-white'
          aria-hidden
        >
          <svg
            className='block h-10 w-full transform-gpu sm:h-14 md:h-16'
            viewBox='0 0 1440 81'
            preserveAspectRatio='none'
            fill='currentColor'
          >
            <path
              d='M0,48 C240,78 480,18 720,38 C960,58 1200,8 1440,28 L1440,81 L0,81 Z'
              stroke='currentColor'
              strokeWidth='3'
            />
          </svg>
        </div>
      </section>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Booking setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default HeroBanner;
