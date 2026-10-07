'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from './UI/Container';
import SectionHeader from './UI/SectionHeader';
import Modal from './UI/Modal';
import Booking from './Booking';
import { cn } from '../utils/cn';
import { toCta } from '../api/cta';
import type { OfferCard, SectionIntro } from '../api/types';
import BrandMark from './BrandMark';

type TiersProps = {
  intro: SectionIntro | null;
  items: OfferCard[];
};

const Tiers = ({ intro, items }: TiersProps) => {
  const [showModal, setShowModal] = useState(false);

  if (!intro || !items.length) return null;

  return (
    <>
      <section className='bg-theme-sage px-5 section-py md:px-10'>
        <Container>
          <SectionHeader
            eyebrow={intro.eyebrow ?? undefined}
            title={intro.title}
            subtitle={intro.description ?? undefined}
          />

          <div className='grid gap-[22px] md:grid-cols-3'>
            {items.map((tier) => {
              const featured = Boolean(tier.badge);
              const cta = toCta(tier.ctaLabel, tier.ctaHref);

              return (
                <div
                  key={tier.id}
                  className={cn(
                    'relative rounded border p-8 transition-transform duration-300 hover:-translate-y-1 md:px-8 md:py-10',
                    featured
                      ? 'border-2 border-brand bg-theme-ink text-white'
                      : 'border-brand/10 bg-white'
                  )}
                >
                  {tier.badge && (
                    <div className='absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand px-[18px] py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white'>
                      {tier.badge}
                    </div>
                  )}
                  <h3
                    className={cn(
                      'mb-1.5 text-[28px] font-medium',
                      featured ? 'text-white' : 'text-theme-primary'
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      'mb-[18px] min-h-[42px] text-[13px]',
                      featured ? 'text-white/70' : 'text-theme-secondary'
                    )}
                  >
                    {tier.subtitle}
                  </p>
                  {(tier.price || tier.priceNote) && (
                    <div
                      className={cn(
                        'mb-[22px] text-[38px] font-medium leading-none',
                        featured ? 'text-white' : 'text-theme-primary'
                      )}
                    >
                      {tier.price}
                      {tier.priceNote && (
                        <small
                          className={cn(
                            'text-[13px] font-normal',
                            featured ? 'text-white/60' : 'text-theme-secondary'
                          )}
                        >
                          {tier.priceNote}
                        </small>
                      )}
                    </div>
                  )}
                  <ul className='mb-[26px]'>
                    {tier.perks.map((feature) => (
                      <li
                        key={feature}
                        className={cn(
                          'flex items-center gap-2.5 border-b py-[7px] text-[13px]',
                          featured ? 'border-white/10' : 'border-black/[0.06]'
                        )}
                      >
                        <BrandMark variant='check' className='text-[15px]' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {cta?.action === 'book' ? (
                    <button
                      type='button'
                      onClick={() => setShowModal(true)}
                      className={cn(
                        'block w-full py-[13px] text-center text-xs font-medium uppercase tracking-[0.08em] transition-colors',
                        featured
                          ? 'bg-brand text-white hover:bg-brand-hover'
                          : 'bg-theme-ink text-white hover:bg-[#333]'
                      )}
                    >
                      {cta.label}
                    </button>
                  ) : cta ? (
                    <Link
                      href={cta.href ?? '/packages'}
                      className={cn(
                        'block w-full py-[13px] text-center text-xs font-medium uppercase tracking-[0.08em] transition-colors',
                        featured
                          ? 'bg-brand text-white hover:bg-brand-hover'
                          : 'bg-theme-ink text-white hover:bg-[#333]'
                      )}
                    >
                      {cta.label}
                    </Link>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Booking setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default Tiers;
