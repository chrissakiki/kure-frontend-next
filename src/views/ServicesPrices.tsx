'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '../utils/cn';
import PageHero from '../components/PageHero';
import PageFinalCta from '../components/PageFinalCta';
import Container from '../components/UI/Container';
import SectionHeader from '../components/UI/SectionHeader';
import Modal from '../components/UI/Modal';
import Booking from '../components/Booking';
import BrandMark from '../components/BrandMark';
import { toCta } from '../api/cta';
import type { ServicesPageData } from '../api/types';

const ServicesPrices = ({ data }: { data: ServicesPageData }) => {
  const [showModal, setShowModal] = useState(false);

  const primaryCta = toCta(
    data.sectionOutro?.primaryCtaLabel,
    data.sectionOutro?.primaryCtaHref
  );
  const secondaryCta = toCta(
    data.sectionOutro?.secondaryCtaLabel,
    data.sectionOutro?.secondaryCtaHref
  );

  return (
    <div className='flex flex-col'>
      <PageHero hero={data.hero} />

      <section className='bg-theme-ink px-5 py-11 text-white md:px-10'>
        <Container>
          <p className='mb-5 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-brand'>
            Four signature categories
          </p>
          <div className='flex flex-wrap items-center justify-center gap-4 md:gap-6'>
            {data.categories.map((cat, idx) => (
              <div key={cat.id} className='flex items-center gap-4 md:gap-6'>
                {idx > 0 && (
                  <BrandMark variant='divider' className='hidden text-[16px] sm:inline-block' />
                )}
                <a
                  href={`#category-${cat.slug}`}
                  className='border-b border-brand pb-1 text-[17px] italic tracking-[0.05em] text-white transition-colors hover:text-brand'
                >
                  {String(idx + 1).padStart(2, '0')} · {cat.name}
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {data.categories.map((cat, idx) => {
        const altBg = idx % 2 === 1;
        const symbol = cat.currency.symbol;

        return (
          <section
            key={cat.id}
            id={`category-${cat.slug}`}
            className={cn(
              'px-5 section-py md:px-10',
              altBg ? 'bg-theme-sage' : 'bg-white'
            )}
          >
            <Container>
              <SectionHeader
                eyebrow={cat.eyebrow}
                title={cat.name}
                subtitle={cat.subtitle}
                subtitleClassName='mb-12'
              />

              <div className='grid gap-8 lg:grid-cols-[1.4fr_1fr]'>
                <div className='space-y-0'>
                  {cat.services.map((item) => (
                    <div
                      key={item.id}
                      className='border-b border-black/[0.06] py-5'
                    >
                      <div className='flex flex-wrap items-center gap-2'>
                        <h4 className='text-xl font-medium text-theme-primary'>
                          {item.name}
                        </h4>
                        {item.badge && (
                          <span className='bg-brand/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-brand'>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className='mt-1.5 text-[14px] leading-relaxed text-theme-secondary'>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className='h-fit rounded border border-brand/15 bg-white p-7'>
                  {cat.prices.map((row) => (
                    <div
                      key={row.id}
                      className='flex items-center justify-between border-b border-black/[0.06] py-3.5'
                    >
                      <span className='text-[14px] text-theme-secondary'>
                        {row.label}
                        {row.description ? ` · ${row.description}` : ''}
                      </span>
                      <span className='text-[22px] font-medium text-theme-primary'>
                        {symbol}
                        {row.price}
                      </span>
                    </div>
                  ))}
                  {cat.note && (
                    <p className='mt-4 text-[12px] leading-relaxed text-theme-secondary'>
                      {cat.note}
                    </p>
                  )}
                  {cat.addons.map((addon) => (
                    <p
                      key={addon.id}
                      className='mt-3 text-[13px] leading-relaxed text-theme-primary'
                    >
                      <strong>{addon.name}</strong>
                      {addon.description ? ` — ${addon.description}` : ''}{' '}
                      <span className='text-brand'>
                        +{symbol}
                        {addon.price}
                      </span>
                    </p>
                  ))}
                  <button
                    type='button'
                    onClick={() => setShowModal(true)}
                    className='mt-6 w-full bg-brand py-3 text-center text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-hover'
                  >
                    Book This Category →
                  </button>
                  <Link
                    href={`/rituals/${cat.slug}`}
                    className='mt-3 block w-full border border-[#101010] py-3 text-center text-xs font-medium uppercase tracking-[0.08em] text-[#101010] transition-colors hover:bg-theme-ink hover:text-white'
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {data.receiveCare.intro && (
        <section className='bg-white px-5 section-py md:px-10'>
          <Container>
            <SectionHeader
              eyebrow={data.receiveCare.intro.eyebrow ?? undefined}
              title={data.receiveCare.intro.title}
              titleClassName='mb-10'
            />
            <div className='grid gap-[22px] md:grid-cols-3'>
              {data.receiveCare.items.map((item) => (
                <div
                  key={item.id}
                  className='rounded bg-theme-sage px-7 py-8'
                >
                  <h3 className='mb-2.5 text-[22px] font-medium text-theme-primary'>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className='text-sm leading-relaxed text-theme-secondary'>
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {data.receiveCare.note?.content && (
              <div
                className='mt-8 text-center text-[13px] italic text-theme-secondary'
                dangerouslySetInnerHTML={{
                  __html: data.receiveCare.note.content,
                }}
              />
            )}
          </Container>
        </section>
      )}

      {data.kureStandard.intro && (
        <section className='bg-theme-ink px-5 section-py text-white md:px-10'>
          <Container>
            <div className='mx-auto max-w-[720px] text-center'>
              <SectionHeader
                eyebrow={data.kureStandard.intro.eyebrow ?? undefined}
                title={
                  <>
                    {data.kureStandard.intro.title}{' '}
                    {data.kureStandard.intro.titleAccent && (
                      <em className='italic text-brand'>
                        {data.kureStandard.intro.titleAccent}
                      </em>
                    )}
                  </>
                }
                theme='dark'
                titleClassName='mb-10'
              />
              {data.kureStandard.content?.content && (
                <div
                  className='space-y-6 text-left text-[19px] italic leading-relaxed text-white/90 [&_p]:mb-6 [&_p:last-child]:mb-0'
                  dangerouslySetInnerHTML={{
                    __html: data.kureStandard.content.content,
                  }}
                />
              )}
              {data.kureStandard.stats.length > 0 && (
                <div className='mt-10 grid grid-cols-3 gap-6 border-t border-brand/35 pt-8'>
                  {data.kureStandard.stats.map((stat) => (
                    <div key={stat.id} className='text-center'>
                      <div className='mb-2 text-[32px] font-semibold leading-none text-brand'>
                        {stat.value}
                      </div>
                      <div className='text-[11px] uppercase tracking-[0.15em] text-white/60'>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {data.sectionOutro && primaryCta && (
        <PageFinalCta
          title={data.sectionOutro.title}
          titleEmphasis={data.sectionOutro.titleAccent ?? undefined}
          subtitle={data.sectionOutro.description ?? undefined}
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

export default ServicesPrices;
