import { cn } from '../utils/cn';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import Container from '../components/UI/Container';
import SectionHeader from '../components/UI/SectionHeader';
import { toCta } from '../api/cta';
import type { CareersPageData } from '../api/types';
import type { ReactNode } from 'react';

const DEFAULT_APPLY_WHATSAPP = 'https://wa.me/96179424701';
const SITE_PHONE = '+961 79 424 701';
const SITE_EMAIL = 'support@getkured.co';
const SITE_INSTAGRAM = '@kure.lb';
const SITE_INSTAGRAM_URL =
  'https://www.instagram.com/kureacademy?igsh=OWtic3pnYWR4bjll';

const withAccent = (title: string, accent?: string | null): ReactNode => {
  if (!accent) return title;
  const idx = title.indexOf(accent);
  if (idx < 0) {
    return (
      <>
        {title} <em className='italic text-brand'>{accent}</em>
      </>
    );
  }
  return (
    <>
      {title.slice(0, idx)}
      <em className='italic text-brand'>{accent}</em>
      {title.slice(idx + accent.length)}
    </>
  );
};

const statusLabel = (status: string) => {
  if (status === 'ACTIVELY_HIRING') return 'Actively hiring';
  if (status === 'TALENT_POOL') return 'Talent pool';
  return status.replace(/_/g, ' ').toLowerCase();
};

const joinList = (items: string[] | string | null | undefined) => {
  if (!items) return '';
  if (typeof items === 'string') return items;
  return items.filter(Boolean).join(' · ');
};

const Careers = ({ data }: { data: CareersPageData }) => {

  const applyBase =
    data.sectionOutro?.primaryCtaHref || DEFAULT_APPLY_WHATSAPP;

  const roleApplyUrl = (roleTitle: string) => {
    const base = applyBase.split('?')[0] || DEFAULT_APPLY_WHATSAPP;
    return `${base}?text=${encodeURIComponent(
      `Hi KURE, I'd like to apply for the ${roleTitle} role. Here is my CV / background:`
    )}`;
  };

  const pathwayParagraphs =
    data.academyPathway.intro?.description
      ?.split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean) ?? [];

  const primaryCta = toCta(
    data.sectionOutro?.primaryCtaLabel,
    data.sectionOutro?.primaryCtaHref
  );
  const applyCtaLabel = primaryCta?.label
    ? primaryCta.label.includes('→')
      ? primaryCta.label
      : `${primaryCta.label} →`
    : null;

  return (
    <div className='flex flex-col'>
      <PageHero hero={data.hero} minHeightClass='min-h-[70vh]' />

      {data.whyWorkHere.intro && (
        <section className='bg-theme-sage px-5 section-py md:px-10'>
          <Container>
            <SectionHeader
              eyebrow={data.whyWorkHere.intro.eyebrow ?? undefined}
              title={withAccent(
                data.whyWorkHere.intro.title,
                data.whyWorkHere.intro.titleAccent
              )}
              subtitle={data.whyWorkHere.intro.description ?? undefined}
              titleClassName='mb-4'
            />

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {data.whyWorkHere.items.map((benefit) => (
                <div
                  key={benefit.id}
                  className='rounded border border-brand/15 bg-white px-[30px] py-10'
                >
                  <div className='mb-[18px] text-[46px] font-normal italic leading-none text-brand'>
                    {benefit.sortOrder}
                  </div>
                  <h3 className='mb-3 text-[22px] font-medium text-theme-primary'>
                    {benefit.title}
                  </h3>
                  <p className='text-[13.5px] leading-relaxed text-theme-secondary'>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {data.openRoles.intro && (
        <section id='roles' className='scroll-mt-24 bg-white px-5 section-py md:px-10'>
          <Container>
            <SectionHeader
              eyebrow={data.openRoles.intro.eyebrow ?? undefined}
              title={withAccent(
                data.openRoles.intro.title,
                data.openRoles.intro.titleAccent
              )}
              subtitle={data.openRoles.intro.description ?? undefined}
              titleClassName='mb-4'
            />

            <div className='mx-auto max-w-[900px]'>
              {data.openRoles.items.map((role) => {
                const employment = joinList(role.employmentTypes);
                const locations = joinList(role.locations);
                const isHiring = role.status === 'ACTIVELY_HIRING';

                return (
                  <div
                    key={role.id}
                    className='grid grid-cols-1 items-center gap-6 border-b border-black/[0.08] py-[34px] last:border-b-0 md:grid-cols-[1fr_auto] md:gap-8'
                  >
                    <div>
                      <h3 className='mb-2 text-[26px] font-medium text-theme-primary'>
                        {role.title}
                      </h3>
                      <div className='mb-3 flex flex-wrap gap-2.5'>
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em]',
                            isHiring
                              ? 'bg-brand/20 text-brand-hover'
                              : 'bg-black/[0.04] text-theme-secondary'
                          )}
                        >
                          {statusLabel(role.status)}
                        </span>
                        {employment && (
                          <span className='rounded-full bg-brand/[0.08] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-brand'>
                            {employment}
                          </span>
                        )}
                        {locations && (
                          <span className='rounded-full bg-brand/[0.08] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-brand'>
                            {locations}
                          </span>
                        )}
                      </div>
                      <p className='max-w-[560px] text-[14px] leading-relaxed text-theme-secondary'>
                        {role.description}
                      </p>
                    </div>
                    <a
                      href={roleApplyUrl(role.title)}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='justify-self-start whitespace-nowrap bg-theme-ink px-[22px] py-3 text-[12px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand md:justify-self-end'
                    >
                      Apply →
                    </a>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {data.academyPathway.intro && (
        <section className='bg-theme-ink px-5 section-py text-white md:px-10'>
          <Container>
            <div className='mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-2 lg:gap-16'>
              <div>
                <SectionHeader
                  align='left'
                  theme='dark'
                  eyebrow={data.academyPathway.intro.eyebrow ?? undefined}
                  title={withAccent(
                    data.academyPathway.intro.title,
                    data.academyPathway.intro.titleAccent
                  )}
                  subtitle={pathwayParagraphs[0]}
                  subtitleClassName='mb-[18px] max-w-none text-[15.5px] font-light leading-[1.75] text-white/80'
                />
                {pathwayParagraphs.slice(1).map((paragraph) => (
                  <p
                    key={paragraph}
                    className='mb-6 text-[15.5px] font-light leading-[1.75] text-white/80'
                  >
                    {paragraph}
                  </p>
                ))}
                <Link
                  href='/academy'
                  className='inline-block border border-brand bg-transparent px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand hover:text-white'
                >
                  Explore Academy →
                </Link>
              </div>

              <div className='rounded border border-brand/40 bg-white/[0.05] px-[34px] py-10 backdrop-blur'>
                {data.academyPathway.items.map((step) => (
                  <div
                    key={step.id}
                    className='flex items-start gap-5 border-b border-brand/15 py-4 last:border-b-0'
                  >
                    <div className='min-w-[44px] text-[36px] font-normal italic leading-none text-brand'>
                      {step.sortOrder}
                    </div>
                    <div>
                      <h4 className='mb-1.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-white'>
                        {step.title}
                      </h4>
                      <p className='text-[13px] leading-relaxed text-white/70'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {data.howToApply.intro && (
        <section id='apply' className='scroll-mt-24 bg-theme-sage px-5 section-py md:px-10'>
          <Container>
            <SectionHeader
              eyebrow={data.howToApply.intro.eyebrow ?? undefined}
              title={withAccent(
                data.howToApply.intro.title,
                data.howToApply.intro.titleAccent
              )}
              subtitle={data.howToApply.intro.description ?? undefined}
              titleClassName='mb-4'
            />

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {data.howToApply.items.map((step) => (
                <div
                  key={step.id}
                  className='rounded border border-brand/10 bg-white px-[26px] py-[34px] text-center'
                >
                  <div className='mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-theme-ink text-[20px] font-medium italic text-brand'>
                    {step.sortOrder}
                  </div>
                  <h3 className='mb-2.5 text-[20px] font-medium text-theme-primary'>
                    {step.title}
                  </h3>
                  <p className='text-[13px] leading-relaxed text-theme-secondary'>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {data.sectionOutro && primaryCta && applyCtaLabel && (
        <section className='border-b border-white/10 bg-theme-ink px-5 section-py text-center text-white md:px-10'>
          <Container>
            {data.sectionOutro.eyebrow && (
              <p className='mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-brand'>
                {data.sectionOutro.eyebrow}
              </p>
            )}
            <h2 className='mx-auto mb-[22px] max-w-[800px] text-[clamp(2.75rem,6vw,4.25rem)] font-medium leading-[1.05] text-white'>
              {data.sectionOutro.title}{' '}
              {data.sectionOutro.titleAccent && (
                <em className='italic text-brand'>
                  {data.sectionOutro.titleAccent}
                </em>
              )}
            </h2>
            {data.sectionOutro.description && (
              <p className='mx-auto mb-9 max-w-[560px] text-[17px] font-light leading-relaxed text-white/70'>
                {data.sectionOutro.description}
              </p>
            )}
            <a
              href={primaryCta.href || DEFAULT_APPLY_WHATSAPP}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-brand px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover'
            >
              {applyCtaLabel}
            </a>

            <div className='mx-auto mt-16 grid max-w-[900px] gap-10 border-t border-white/10 pt-12 sm:grid-cols-3 sm:gap-8'>
              <div>
                <p className='mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand'>
                  WhatsApp
                </p>
                <a
                  href={DEFAULT_APPLY_WHATSAPP}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[18px] italic text-brand transition-opacity hover:opacity-80'
                >
                  {SITE_PHONE}
                </a>
              </div>
              <div>
                <p className='mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand'>
                  Email
                </p>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className='text-[18px] italic text-brand transition-opacity hover:opacity-80'
                >
                  {SITE_EMAIL}
                </a>
              </div>
              <div>
                <p className='mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand'>
                  Instagram
                </p>
                <a
                  href={SITE_INSTAGRAM_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[18px] italic text-brand transition-opacity hover:opacity-80'
                >
                  {SITE_INSTAGRAM}
                </a>
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};

export default Careers;
