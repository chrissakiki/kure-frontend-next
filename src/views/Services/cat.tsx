'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '../../utils/cn';
import PageFinalCta from '../../components/PageFinalCta';
import RevealImage from '../../components/RevealImage';
import Booking from '../../components/Booking';
import Container from '../../components/UI/Container';
import SectionHeader from '../../components/UI/SectionHeader';
import Modal from '../../components/UI/Modal';
import { toCta } from '../../api/cta';
import type { ServiceCategoryPageData } from '../../api/types';
import BrandMark from '../../components/BrandMark';

const Service = ({ data }: { data: ServiceCategoryPageData }) => {
  const [showModal, setShowModal] = useState(false);

  const { category, standard, sectionOutro } = data;
  const symbol = category.currency.symbol;
  const primaryCta = toCta(
    sectionOutro?.primaryCtaLabel,
    sectionOutro?.primaryCtaHref
  );
  const secondaryCta = toCta(
    sectionOutro?.secondaryCtaLabel,
    sectionOutro?.secondaryCtaHref
  );

  const titleLead = category.titleAccent
    ? category.name.replace(new RegExp(`\\s*${category.titleAccent}$`), '')
    : category.name;

  return (
    <div className='flex flex-col'>
      <section className='relative flex min-h-[70vh] items-center overflow-hidden px-5 section-py text-white md:px-10'>
        <div className='absolute inset-0' aria-hidden>
          {category.imageUrl && (
            <div
              className='absolute inset-0 bg-cover bg-center brightness-[0.5] saturate-[0.9]'
              style={{ backgroundImage: `url(${category.imageUrl})` }}
            />
          )}
          <div className='absolute inset-0 bg-gradient-to-r from-[#101010]/[0.72] via-[#101010]/40 to-[#101010]/15' />
        </div>

        <Container cn='relative z-10'>
          <p className='mb-6 text-xs font-medium uppercase tracking-[0.22em] text-brand'>
            {category.eyebrow}
          </p>
          <h1 className='mb-5 max-w-[800px] text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[0.95] text-white'>
            {titleLead}{' '}
            {category.titleAccent && (
              <em className='italic text-brand'>{category.titleAccent}</em>
            )}
          </h1>
          <p className='mb-8 max-w-[560px] text-lg font-light leading-relaxed text-white/85'>
            {category.subtitle}
          </p>
          <div className='flex flex-wrap gap-3.5'>
            <button
              type='button'
              onClick={() => setShowModal(true)}
              className='bg-brand px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover'
            >
              Book This Category →
            </button>
            <Link
              href='/services'
              className='border border-brand bg-transparent px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-all duration-300 hover:bg-brand hover:text-white'
            >
              All Services
            </Link>
          </div>
          {category.highlights.length > 0 && (
            <div className='mt-11 flex max-w-[780px] flex-wrap items-center gap-8 border-t border-brand/35 pt-6'>
              {category.highlights.map((label) => (
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
      </section>

      <section className='bg-theme-sage px-5 section-py md:px-10'>
        <Container>
          <header className='mx-auto mb-14 max-w-[720px]'>
            <SectionHeader
              eyebrow={category.introEyebrow ?? undefined}
              title={category.tagline ?? category.name}
              subtitle={category.subtitle}
              subtitleClassName='mb-0'
            />
          </header>

          <div
            className={cn(
              'grid gap-[18px]',
              category.services.length === 1 && 'mx-auto max-w-md',
              category.services.length === 2 &&
                'mx-auto max-w-3xl sm:grid-cols-2',
              category.services.length >= 3 && 'sm:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {category.services.map((item) => (
              <article
                key={item.id}
                className='group relative overflow-hidden rounded'
              >
                <RevealImage
                  src={item.imageUrl ?? ''}
                  alt={item.name}
                  className='aspect-[4/5] bg-theme-ink'
                  imgClassName='h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                >
                  <div className='absolute inset-0 bg-black/25' aria-hidden />
                  <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent via-[#101010]/35 to-[#101010]/92 p-7 text-white'>
                    {item.badge && (
                      <span className='mb-2 w-fit bg-brand/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-white'>
                        {item.badge}
                      </span>
                    )}
                    <h3 className='mb-2 text-[22px] font-medium leading-[1.1] text-white md:text-[24px]'>
                      {item.name}
                    </h3>
                    <p className='mb-3 text-[13px] leading-snug text-white/85'>
                      {item.description}
                    </p>
                  </div>
                </RevealImage>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className='bg-white px-5 section-py md:px-10'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start'>
            <div>
              <SectionHeader
                align='left'
                eyebrow='Investment'
                title='Pricing & packages'
                subtitle={
                  category.pricingSubtitle ??
                  'Single sessions when you need them — packages when you want consistency and better value.'
                }
                subtitleClassName='mb-8 max-w-[520px]'
              />

              <div className='space-y-0'>
                {category.prices.map((row) => (
                  <div
                    key={row.id}
                    className='flex items-center justify-between border-b border-black/[0.06] py-4'
                  >
                    <span className='text-[15px] text-theme-secondary'>
                      {row.label}
                      {row.description ? ` · ${row.description}` : ''}
                    </span>
                    <span className='text-[22px] font-medium text-theme-primary'>
                      {row.priceTo != null
                        ? `${symbol}${row.price} / ${symbol}${row.priceTo}`
                        : `${symbol}${row.price}`}
                    </span>
                  </div>
                ))}
              </div>

              {category.note && (
                <p className='mt-5 text-[13px] leading-relaxed text-theme-secondary'>
                  {category.note}
                </p>
              )}
            </div>

            <div className='rounded border border-brand/15 bg-theme-sage p-7 md:p-8'>
              <p className='mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-brand'>
                At a glance
              </p>
              <ul className='mb-6 space-y-3'>
                {category.highlights.map((line) => (
                  <li
                    key={line}
                    className='flex items-center gap-2.5 border-b border-black/[0.06] pb-3 text-[14px] leading-relaxed text-theme-primary last:border-0'
                  >
                    <BrandMark variant='check' className='text-[15px]' />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              {category.addons.length > 0 && (
                <div className='mb-6 border-t border-black/[0.06] pt-5'>
                  <p className='mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-brand'>
                    Add-ons
                  </p>
                  {category.addons.map((addon) => (
                    <p
                      key={addon.id}
                      className='mb-2.5 text-[13px] leading-relaxed text-theme-primary'
                    >
                      <strong>{addon.name}</strong>
                      {addon.description ? ` — ${addon.description}` : ''}{' '}
                      <span className='text-brand'>
                        +{symbol}
                        {addon.price}
                      </span>
                    </p>
                  ))}
                </div>
              )}

              <button
                type='button'
                onClick={() => setShowModal(true)}
                className='w-full bg-brand py-3 text-center text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-hover'
              >
                Book Now →
              </button>
              <Link
                href='/packages'
                className='mt-3 block w-full border border-[#101010] py-3 text-center text-xs font-medium uppercase tracking-[0.08em] text-[#101010] transition-colors hover:bg-theme-ink hover:text-white'
              >
                View Packages →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {standard.intro && (
        <section className='bg-theme-ink px-5 section-py text-white md:px-10'>
          <Container>
            <div className='mx-auto max-w-[720px] text-center'>
              <SectionHeader
                theme='dark'
                eyebrow={standard.intro.eyebrow ?? undefined}
                title={
                  <>
                    {standard.intro.title}{' '}
                    {standard.intro.titleAccent && (
                      <em className='italic text-brand'>
                        {standard.intro.titleAccent}
                      </em>
                    )}
                  </>
                }
                titleClassName='mb-8'
              />
              {standard.intro.description && (
                <p className='text-[18px] italic leading-relaxed text-white/90 md:text-[19px]'>
                  {standard.intro.description}
                </p>
              )}
            </div>
          </Container>
        </section>
      )}

      {sectionOutro && primaryCta && (
        <PageFinalCta
          title={sectionOutro.title}
          titleEmphasis={sectionOutro.titleAccent ?? undefined}
          subtitle={sectionOutro.description ?? undefined}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta ?? undefined}
        />
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Booking setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};

export default Service;
