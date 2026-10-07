import { cn } from '../utils/cn';
import PageHero from '../components/PageHero';
import PageFinalCta from '../components/PageFinalCta';
import Container from '../components/UI/Container';
import SectionHeader from '../components/UI/SectionHeader';
import FaqAccordion from '../components/FaqAccordion';
import InquiryForm from '../components/InquiryForm';
import MethodNote from '../components/MethodNote';
import { toCta } from '../api/cta';
import type { AcademyPageData } from '../api/types';

const WHATSAPP_URL = 'https://wa.me/96176577070';

const Academy = ({ data }: { data: AcademyPageData }) => {

  const trainedIntro = data.trainedByKure.intro;
  const trainedParagraphs =
    trainedIntro?.description
      ?.split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean) ?? [];

  const faqItems = data.faq.categories.flatMap((category) => category.faqs);

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

      {trainedIntro && (
        <section className='bg-white px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[900px]'>
              {trainedIntro.eyebrow && (
                <p className='mb-[18px] text-[11px] font-medium uppercase tracking-[0.22em] text-brand'>
                  {trainedIntro.eyebrow}
                </p>
              )}
              <h2 className='mb-5 text-[clamp(1.2rem,3vw,1.8rem)] font-medium text-theme-primary'>
                {trainedIntro.title}
              </h2>
              {trainedParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className='mb-4 text-[17px] leading-relaxed text-theme-secondary last:mb-0'
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {data.whatWeTeach.intro && (
        <section className='bg-theme-sage px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[900px]'>
              <SectionHeader
                align='left'
                eyebrow={data.whatWeTeach.intro.eyebrow ?? undefined}
                title={data.whatWeTeach.intro.title}
                subtitle={data.whatWeTeach.intro.description ?? undefined}
                titleClassName='mb-4'
                subtitleClassName='mb-10 max-w-[640px] text-[15px]'
              />

              <div className='mb-10 grid gap-5 md:grid-cols-2'>
                {data.whatWeTeach.formats.map((format) => {
                  const featured = Boolean(
                    format.content?.toUpperCase().includes('B') ||
                      format.title.toLowerCase().includes('course')
                  );

                  return (
                    <div
                      key={format.id}
                      className={cn(
                        'rounded border-l-[3px] border-brand px-7 py-7',
                        featured
                          ? 'bg-theme-ink text-white'
                          : 'bg-white text-theme-primary'
                      )}
                    >
                      {format.content && (
                        <p className='mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-brand'>
                          {format.content}
                        </p>
                      )}
                      <h3 className='mb-2 text-[24px] font-medium'>
                        {format.title}
                      </h3>
                      {format.description && (
                        <p
                          className={cn(
                            'text-sm leading-relaxed',
                            featured ? 'text-white/85' : 'text-theme-secondary'
                          )}
                        >
                          {format.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className='grid gap-[18px] md:grid-cols-2'>
                {data.whatWeTeach.categories.map((program) => (
                  <div
                    key={program.id}
                    className='rounded border border-brand/10 bg-white p-7'
                  >
                    {program.content && (
                      <p className='mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-brand'>
                        {program.content}
                      </p>
                    )}
                    <h3 className='mb-2 text-[22px] font-medium text-theme-primary'>
                      {program.title}
                    </h3>
                    {program.description && (
                      <p className='mb-4 text-sm leading-relaxed text-theme-secondary'>
                        {program.description}
                      </p>
                    )}
                    {data.whatWeTeach.categoryFooter?.content && (
                      <p className='text-[12px] uppercase tracking-[0.08em] text-theme-secondary'>
                        {data.whatWeTeach.categoryFooter.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {data.whatWeTeach.note?.content && (
                <div
                  className='mt-8 text-center text-[13px] italic text-theme-secondary [&_p]:m-0'
                  dangerouslySetInnerHTML={{
                    __html: data.whatWeTeach.note.content,
                  }}
                />
              )}
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
              {data.howItWorks.items.map((step) => (
                <div key={step.id} className='text-center'>
                  <div className='mb-5 text-[78px] font-medium italic leading-none text-brand'>
                    {step.sortOrder}
                  </div>
                  <h3 className='mb-3 text-2xl font-medium'>{step.title}</h3>
                  <p className='text-[15px] leading-relaxed text-white/70'>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {data.certification.intro && (
        <section className='bg-white px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[720px]'>
              <SectionHeader
                align='left'
                eyebrow={data.certification.intro.eyebrow ?? undefined}
                title={data.certification.intro.title}
                titleClassName='mb-6'
              />
              {data.certification.content?.content && (
                <div
                  className='mb-10 space-y-4 text-[16px] leading-relaxed text-theme-secondary [&_em]:text-[14px] [&_em]:italic [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-theme-primary'
                  dangerouslySetInnerHTML={{
                    __html: data.certification.content.content,
                  }}
                />
              )}

              {data.certification.methodNote?.content && (
                <MethodNote html={data.certification.methodNote.content} />
              )}
            </div>
          </Container>
        </section>
      )}

      {data.enrollment.intro && (
        <section className='bg-theme-sage px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[900px]'>
              <SectionHeader
                align='left'
                eyebrow={data.enrollment.intro.eyebrow ?? undefined}
                title={data.enrollment.intro.title}
                titleClassName='mb-10'
              />
              <div className='mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-5'>
                {data.enrollment.items.map((step) => (
                  <div
                    key={step.id}
                    className='rounded bg-white px-5 py-6 text-center'
                  >
                    <div className='mb-3 text-[42px] font-medium italic leading-none text-brand'>
                      {step.sortOrder}
                    </div>
                    <h3 className='mb-2 text-base font-medium text-theme-primary'>
                      {step.title}
                    </h3>
                    <p className='text-[13px] leading-relaxed text-theme-secondary'>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
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
                eyebrow={data.faq.categories[0]?.label ?? 'Common questions'}
                title={data.faq.categories[0]?.title ?? 'Academy FAQ.'}
                titleClassName='mb-10'
              />
              <FaqAccordion items={faqItems} />
            </div>
          </Container>
        </section>
      )}

      <section className='bg-theme-sage px-5 section-py md:px-10'>
        <Container>
          <div className='mx-auto max-w-[720px]'>
            <SectionHeader
              align='left'
              eyebrow='Register your interest'
              title='Reserve your spot.'
              subtitle="We'll respond with next workshop dates and details."
              titleClassName='mb-4'
              subtitleClassName='mb-8'
            />
            <InquiryForm
              whatsappUrl={WHATSAPP_URL}
              messagePrefix="Hi KURE, I'm interested in KURE Academy."
              submitLabel='Send Registration →'
              fields={[
                {
                  name: 'name',
                  label: 'Full name',
                  placeholder: 'Your name',
                  required: true,
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
                  name: 'profession',
                  label: 'Current profession',
                  type: 'select',
                  options: [
                    'Licensed massage therapist',
                    'Physiotherapist',
                    'Beauty professional',
                    'Yoga instructor',
                    'Personal trainer',
                    'Student',
                    'Other',
                  ],
                },
                {
                  name: 'experience',
                  label: 'Years of experience',
                  type: 'select',
                  options: ['0–2', '3–5', '6–10', '10+'],
                },
                {
                  name: 'timeframe',
                  label: 'Preferred timeframe',
                  type: 'select',
                  options: ['Next 30 days', '30–90 days', '90+ days'],
                },
                {
                  name: 'interest',
                  label: 'Workshops of interest',
                  type: 'textarea',
                  placeholder: 'Which workshops are you most interested in?',
                },
              ]}
            />
          </div>
        </Container>
      </section>

      {data.sectionOutro && primaryCta && (
        <PageFinalCta
          title={data.sectionOutro.title}
          titleEmphasis={data.sectionOutro.titleAccent ?? undefined}
          subtitle={data.sectionOutro.description ?? undefined}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta ?? undefined}
          borderTop
        />
      )}
    </div>
  );
};

export default Academy;
