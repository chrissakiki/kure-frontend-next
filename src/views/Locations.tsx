import Link from 'next/link';
import PageHero from '../components/PageHero';
import PageFinalCta from '../components/PageFinalCta';
import Container from '../components/UI/Container';
import SectionHeader from '../components/UI/SectionHeader';
import BrandMark from '../components/BrandMark';
import { toCta } from '../api/cta';
import type { LocationsPageData } from '../api/types';

const Locations = ({ data }: { data: LocationsPageData }) => {

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

      <section className='bg-white px-5 section-py md:px-10'>
        <Container>
          {data.houses.intro && (
            <SectionHeader
              eyebrow={data.houses.intro.eyebrow ?? undefined}
              title={data.houses.intro.title}
              subtitle={data.houses.intro.description ?? undefined}
              titleClassName='mb-10'
            />
          )}

          <div className='grid gap-[22px] md:grid-cols-2'>
            {data.houses.items.map((branch) => {
              const cta = toCta(branch.ctaLabel, branch.ctaHref);

              return (
                <div
                  key={branch.id}
                  className='relative rounded border border-brand/10 bg-white p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10'
                >
                  {branch.imageUrl && (
                    <div
                      className='mb-6 aspect-[16/10] overflow-hidden rounded bg-cover bg-center'
                      style={{ backgroundImage: `url(${branch.imageUrl})` }}
                    />
                  )}
                  <h3 className='mb-1.5 text-[28px] font-medium text-theme-primary'>
                    {branch.name}
                  </h3>
                  {branch.subtitle && (
                    <p className='mb-5 min-h-[42px] text-[13px] text-theme-secondary'>
                      {branch.subtitle}
                    </p>
                  )}
                  <ul className='mb-6'>
                    {branch.perks.map((feature) => (
                      <li
                        key={feature}
                        className='flex items-center gap-2.5 border-b border-black/[0.06] py-[7px] text-[13px]'
                      >
                        <BrandMark variant='check' className='text-[15px]' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {cta &&
                    (cta.action === 'link' && cta.href ? (
                      cta.href.startsWith('http') ? (
                        <a
                          href={cta.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='block w-full bg-theme-ink py-[13px] text-center text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#333]'
                        >
                          {cta.label}
                        </a>
                      ) : (
                        <Link
                          href={cta.href}
                          className='block w-full bg-theme-ink py-[13px] text-center text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#333]'
                        >
                          {cta.label}
                        </Link>
                      )
                    ) : null)}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {data.coverage.intro && (
        <section className='bg-theme-sage px-5 section-py md:px-10'>
          <Container>
            <SectionHeader
              eyebrow={data.coverage.intro.eyebrow ?? undefined}
              title={data.coverage.intro.title}
              subtitle={data.coverage.intro.description ?? undefined}
            />

            <div className='mb-9 flex flex-wrap justify-center gap-3'>
              {data.coverage.items.map((area) => (
                <div
                  key={area.id}
                  className='inline-flex items-center rounded-full border border-brand/20 bg-white px-6 py-3 text-[13px] font-medium text-[#101010] transition-all duration-300 hover:border-[#101010] hover:bg-theme-ink hover:text-white'
                >
                  <BrandMark variant='pin' className='mr-1.5 text-[14px]' />
                  {area.title}
                </div>
              ))}
            </div>

            {data.coverage.note?.content && (
              <div
                className='text-center text-[15px] text-theme-secondary [&_a]:text-brand [&_a]:underline [&_a]:decoration-brand/40 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-brand'
                dangerouslySetInnerHTML={{ __html: data.coverage.note.content }}
              />
            )}
          </Container>
        </section>
      )}

      {data.bookingArrival.intro && (
        <section className='bg-white px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[900px]'>
              <SectionHeader
                align='left'
                eyebrow={data.bookingArrival.intro.eyebrow ?? undefined}
                title={data.bookingArrival.intro.title}
                titleClassName='mb-8'
              />
              <div className='space-y-6 text-[16px] leading-relaxed text-theme-primary [&_strong]:font-semibold'>
                {data.bookingArrival.items.map((item) =>
                  item.content ? (
                    <div
                      key={item.id}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  ) : (
                    <p key={item.id}>
                      <strong>{item.title}</strong>
                      {item.description ? ` — ${item.description}` : ''}
                    </p>
                  )
                )}
              </div>
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
    </div>
  );
};

export default Locations;
