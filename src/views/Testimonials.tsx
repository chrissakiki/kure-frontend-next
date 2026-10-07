import PageHero from '../components/PageHero';
import PageFinalCta from '../components/PageFinalCta';
import Container from '../components/UI/Container';
import SectionHeader from '../components/UI/SectionHeader';
import { toCta } from '../api/cta';
import type { TestimonialsPageData } from '../api/types';

const Testimonials = ({ data }: { data: TestimonialsPageData }) => {

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
      <PageHero hero={data.hero} minHeightClass='min-h-[50vh]' />

      {data.testimonialCategories.map((section, index) => {
        if (!section.testimonials.length) return null;
        const alt = index % 2 === 1;

        return (
          <section
            key={section.id}
            className={`px-5 section-py md:px-10 ${
              alt ? 'bg-theme-sage' : 'bg-white'
            }`}
          >
            <Container>
              <SectionHeader
                eyebrow={section.label}
                title={section.title}
                titleClassName='mb-10'
              />
              <div className='grid gap-[22px] md:grid-cols-2 lg:grid-cols-3'>
                {section.testimonials.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded border border-brand/10 p-7 ${
                      alt ? 'bg-white' : 'bg-theme-sage'
                    }`}
                  >
                    <p className='mb-6 text-[16px] italic leading-relaxed text-theme-primary'>
                      &ldquo;{item.content}&rdquo;
                    </p>
                    <div>
                      <div className='text-[14px] font-medium text-theme-primary'>
                        {item.name}
                      </div>
                      <div className='mt-1 text-[12px] uppercase tracking-[0.1em] text-theme-secondary'>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

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

export default Testimonials;
