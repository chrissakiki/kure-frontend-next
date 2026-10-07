'use client';

import { useState } from 'react';
import { cn } from '../utils/cn';
import PageHero from '../components/PageHero';
import PageFinalCta from '../components/PageFinalCta';
import FaqAccordion from '../components/FaqAccordion';
import Container from '../components/UI/Container';
import SectionHeader from '../components/UI/SectionHeader';
import Modal from '../components/UI/Modal';
import Booking from '../components/Booking';
import BrandMark from '../components/BrandMark';
import { getPackageBenefitIcon } from '../components/packageBenefitIcons';
import { toCta } from '../api/cta';
import type { PackagesPageData } from '../api/types';

const Packages = ({ data }: { data: PackagesPageData }) => {
  const [showModal, setShowModal] = useState(false);

  const primaryCta = toCta(
    data.sectionOutro?.primaryCtaLabel,
    data.sectionOutro?.primaryCtaHref
  );
  const secondaryCta = toCta(
    data.sectionOutro?.secondaryCtaLabel,
    data.sectionOutro?.secondaryCtaHref
  );

  const faqItems = data.faq.categories.flatMap((category) => category.faqs);

  return (
    <div className='flex flex-col'>
      <PageHero hero={data.hero} />

      <section className='bg-theme-sage px-5 section-py md:px-10'>
        <Container>
          {data.sizes.intro && (
            <SectionHeader
              eyebrow={data.sizes.intro.eyebrow ?? undefined}
              title={data.sizes.intro.title}
              subtitle={data.sizes.intro.description ?? undefined}
            />
          )}

          <div className='grid gap-[22px] md:grid-cols-2 xl:grid-cols-3'>
            {data.sizes.items.map((tier) => {
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
                            featured
                              ? 'text-white/60'
                              : 'text-theme-secondary'
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
                          featured
                            ? 'border-white/10'
                            : 'border-black/[0.06]'
                        )}
                      >
                        <BrandMark variant='check' className='text-[15px]' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {cta && (
                    <button
                      type='button'
                      onClick={() => {
                        if (cta.action === 'book') setShowModal(true);
                      }}
                      className={cn(
                        'block w-full py-[13px] text-center text-xs font-medium uppercase tracking-[0.08em] transition-colors',
                        featured
                          ? 'bg-brand text-white hover:bg-brand-hover'
                          : 'bg-theme-ink text-white hover:bg-[#333]'
                      )}
                    >
                      {cta.label}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {data.sizes.note?.content && (
            <div
              className='legal-notice mt-[30px]'
              dangerouslySetInnerHTML={{ __html: data.sizes.note.content }}
            />
          )}
        </Container>
      </section>

      {data.benefits.intro && (
        <section className='bg-white px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[720px]'>
              <SectionHeader
                align='left'
                eyebrow={data.benefits.intro.eyebrow ?? undefined}
                title={data.benefits.intro.title}
                titleClassName='mb-10'
              />
            </div>
            <div className='mx-auto grid max-w-[900px] gap-[22px] sm:grid-cols-2 lg:grid-cols-3'>
              {data.benefits.items.map((benefit) => {
                const Icon = getPackageBenefitIcon(
                  benefit.title,
                  benefit.sortOrder
                );

                return (
                  <div
                    key={benefit.id}
                    className='rounded border border-brand/15 bg-white px-[26px] py-[30px] text-center'
                  >
                    <div className='mb-3.5 flex justify-center text-[28px] leading-none text-brand'>
                      <Icon aria-hidden strokeWidth={1.5} />
                    </div>
                    <h3 className='mb-2.5 text-[20px] font-medium text-theme-primary'>
                      {benefit.title}
                    </h3>
                    {benefit.description && (
                      <p className='text-sm leading-relaxed text-theme-secondary'>
                        {benefit.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {data.howItWorks.intro && (
        <section className='bg-theme-ink px-5 section-py text-white md:px-10'>
          <Container>
            <SectionHeader
              eyebrow={data.howItWorks.intro.eyebrow ?? undefined}
              title={data.howItWorks.intro.title}
              theme='dark'
              titleClassName='mb-12'
            />
            <div className='mx-auto mt-[30px] grid max-w-[900px] gap-[50px] md:grid-cols-3'>
              {data.howItWorks.items.map((item) => (
                <div key={item.id} className='text-center'>
                  <div className='mb-5 text-[78px] font-medium italic leading-none text-brand'>
                    {item.sortOrder}
                  </div>
                  <h3 className='mb-3 text-2xl font-medium'>{item.title}</h3>
                  <p className='text-[15px] leading-relaxed text-white/70'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {faqItems.length > 0 && (
        <section className='bg-white px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[720px]'>
              <SectionHeader
                align='left'
                eyebrow={data.faq.intro?.eyebrow ?? data.faq.categories[0]?.label}
                title={data.faq.intro?.title ?? data.faq.categories[0]?.title ?? 'FAQ'}
                titleClassName='mb-10'
              />
              <FaqAccordion items={faqItems} />
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

export default Packages;
