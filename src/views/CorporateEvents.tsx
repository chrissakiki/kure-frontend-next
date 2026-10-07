import PageHero from '../components/PageHero';
import Container from '../components/UI/Container';
import SectionHeader from '../components/UI/SectionHeader';
import InquiryForm from '../components/InquiryForm';
import BrandMark from '../components/BrandMark';
import type { CorporatePageData } from '../api/types';

const CorporateEvents = ({ data }: { data: CorporatePageData }) => {

  return (
    <div className='flex flex-col'>
      <PageHero hero={data.hero} />

      <section className='bg-theme-sage px-5 section-py md:px-10'>
        <Container>
          {data.occasions.intro && (
            <SectionHeader
              eyebrow={data.occasions.intro.eyebrow ?? undefined}
              title={data.occasions.intro.title}
              subtitle={data.occasions.intro.description ?? undefined}
              titleClassName='mb-10'
            />
          )}
          <div className='grid gap-[22px] md:grid-cols-2'>
            {data.occasions.items.map((occasion) => (
              <div
                key={occasion.id}
                className='rounded border border-brand/10 bg-white p-8 md:p-10'
              >
                <h3 className='mb-2 text-[28px] font-medium text-theme-primary'>
                  {occasion.name}
                </h3>
                {occasion.subtitle && (
                  <p className='mb-6 text-[14px] text-theme-secondary'>
                    {occasion.subtitle}
                  </p>
                )}
                <ul className='mb-8'>
                  {occasion.perks.map((item) => (
                    <li
                      key={item}
                      className='flex items-center gap-2.5 border-b border-black/[0.06] py-[7px] text-[13px]'
                    >
                      <BrandMark variant='check' className='text-[15px]' />
                      {item}
                    </li>
                  ))}
                </ul>
                {occasion.ctaLabel && occasion.ctaHref && (
                  <a
                    href={occasion.ctaHref}
                    className='block w-full bg-theme-ink py-[13px] text-center text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#333]'
                  >
                    {occasion.ctaLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {data.corporateWellness.intro && (
        <section
          id='corporate-wellness'
          className='scroll-mt-24 bg-white px-5 section-py md:px-10'
        >
          <Container>
            <div className='mx-auto max-w-[900px]'>
              <SectionHeader
                align='left'
                eyebrow={data.corporateWellness.intro.eyebrow ?? undefined}
                title={data.corporateWellness.intro.title}
                subtitle={data.corporateWellness.intro.description ?? undefined}
                subtitleClassName='mb-10 max-w-[640px]'
              />
              <div className='grid gap-[18px] md:grid-cols-3'>
                {data.corporateWellness.items.map((program) => (
                  <div
                    key={program.id}
                    className='rounded bg-theme-sage px-6 py-7'
                  >
                    <h3 className='mb-2.5 text-[20px] font-medium text-theme-primary'>
                      {program.title}
                    </h3>
                    {program.description && (
                      <p className='text-sm leading-relaxed text-theme-secondary'>
                        {program.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {data.wellnessEvents.intro && (
        <section
          id='wellness-events'
          className='scroll-mt-24 bg-theme-ink px-5 section-py text-white md:px-10'
        >
          <Container>
            <SectionHeader
              eyebrow={data.wellnessEvents.intro.eyebrow ?? undefined}
              title={data.wellnessEvents.intro.title}
              theme='dark'
              subtitle={data.wellnessEvents.intro.description ?? undefined}
              subtitleClassName='mb-12 max-w-[560px]'
            />
            <div className='grid grid-cols-2 gap-3.5 md:grid-cols-4'>
              {data.wellnessEvents.items.map((event) => (
                <div
                  key={event.id}
                  className='rounded border border-brand/30 bg-white/[0.05] px-4 py-6 text-center'
                >
                  <h3 className='text-[15px] font-medium text-white'>
                    {event.title}
                  </h3>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {data.onSiteDelivery.intro && (
        <section className='bg-theme-sage px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[900px]'>
              <SectionHeader
                align='left'
                eyebrow={data.onSiteDelivery.intro.eyebrow ?? undefined}
                title={data.onSiteDelivery.intro.title}
                subtitle={data.onSiteDelivery.intro.description ?? undefined}
                titleClassName='mb-5'
              />
              <ul className='mb-10 space-y-0'>
                {data.onSiteDelivery.inclusions.map((item) => (
                  <li
                    key={item.id}
                    className='flex items-center gap-3 border-b border-black/[0.06] py-3.5 text-[15px] leading-relaxed text-theme-secondary'
                  >
                    <BrandMark variant='check' className='text-[15px]' />
                    {item.title}
                    {item.description ? ` — ${item.description}` : ''}
                  </li>
                ))}
              </ul>
              <div className='grid grid-cols-2 gap-3.5 md:grid-cols-4'>
                {data.onSiteDelivery.scales.map((item) => (
                  <div
                    key={item.id}
                    className='rounded bg-white px-4 py-5 text-center'
                  >
                    <div className='mb-1 text-[22px] font-medium text-brand'>
                      {item.value}
                    </div>
                    <div className='text-[11px] uppercase tracking-[0.12em] text-theme-secondary'>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className='bg-white px-5 section-py md:px-10'>
        <Container>
          <div className='mx-auto max-w-[720px]'>
            <SectionHeader
              align='left'
              eyebrow="Let's design it together"
              title='Plan your program or event.'
              subtitle="Whether it's a corporate program or a private gathering — tell us the essentials and we'll respond within 24 hours."
              titleClassName='mb-4'
              subtitleClassName='mb-8'
            />
            <InquiryForm
              whatsappUrl={'https://wa.me/96176577070'}
              messagePrefix="Hi KURE, I'm interested in Corporate & Events."
              submitLabel='Send Inquiry →'
              note={`Prefer to chat? WhatsApp us on +961 76 577 070.`}
              fields={[
                {
                  name: 'type',
                  label: 'Inquiry type',
                  type: 'select',
                  options: [
                    'Corporate Wellness',
                    'Wellness Event (Bridal / Birthday / Private)',
                    'Corporate Retreat',
                    'Sports & Community Event',
                    'Not sure yet',
                  ],
                },
                {
                  name: 'date',
                  label: 'Preferred date / timeframe',
                  placeholder: 'e.g., Q3 2026, or a specific date',
                },
                {
                  name: 'name',
                  label: 'Full name',
                  placeholder: 'Your name',
                  required: true,
                },
                {
                  name: 'company',
                  label: 'Company / Occasion',
                  placeholder: 'Company name or event',
                },
                {
                  name: 'email',
                  label: 'Email address',
                  type: 'email',
                  placeholder: 'you@email.com',
                  required: true,
                },
                {
                  name: 'phone',
                  label: 'Phone number',
                  type: 'tel',
                  placeholder: '+961...',
                  required: true,
                },
                {
                  name: 'size',
                  label: 'Group size',
                  type: 'select',
                  options: ['1–20', '21–50', '51–100', '100+'],
                },
                {
                  name: 'location',
                  label: 'Location / Venue',
                  placeholder: "City, venue, or 'to be confirmed'",
                },
                {
                  name: 'details',
                  label: 'Tell us more',
                  type: 'textarea',
                  placeholder:
                    'Team needs, event vibe, services of interest, budget range...',
                },
              ]}
            />
          </div>
        </Container>
      </section>

      {data.whyPartners.intro && (
        <section className='border-b border-brand/10 bg-theme-ink px-5 section-py text-white md:px-10'>
          <Container>
            <p className='mb-10 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-brand'>
              {data.whyPartners.intro.eyebrow ?? data.whyPartners.intro.title}
            </p>
            <ul className='mx-auto grid max-w-[960px] gap-4 sm:grid-cols-2'>
              {data.whyPartners.items.map((item) => (
                <li
                  key={item.id}
                  className='flex items-center gap-4 rounded border border-brand/30 bg-white/[0.05] px-6 py-5'
                >
                  <BrandMark variant='badge' className='text-[15px]' />
                  <p className='text-[14px] leading-relaxed text-white/80'>
                    {item.title}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </div>
  );
};

export default CorporateEvents;
