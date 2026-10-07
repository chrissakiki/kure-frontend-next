import PageFinalCta from '../components/PageFinalCta';
import Container from '../components/UI/Container';
import SectionHeader from '../components/UI/SectionHeader';
import FaqAccordion from '../components/FaqAccordion';
import { toCta } from '../api/cta';
import type { FaqPageData } from '../api/types';

const Faq = ({ data }: { data: FaqPageData }) => {

  const hero = data.hero;
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
      <section className='bg-theme-sage px-5 pb-16 pt-[100px] text-center md:px-10'>
        <Container>
          {hero?.eyebrow && (
            <p className='mb-[18px] text-[11px] font-medium uppercase tracking-[0.22em] text-brand'>
              {hero.eyebrow}
            </p>
          )}
          <h1 className='mb-4 text-[clamp(2.75rem,6vw,3.5rem)] font-medium leading-[1.05] text-theme-primary'>
            {hero?.title ?? 'Questions,'}{' '}
            {hero?.titleAccent && (
              <em className='italic text-brand'>{hero.titleAccent}</em>
            )}
          </h1>
          {hero?.description && (
            <p className='mx-auto max-w-[520px] text-[15px] text-theme-secondary'>
              {hero.description}
            </p>
          )}
        </Container>
      </section>

      {data.faqCategories.map((section, index) => {
        if (!section.faqs.length) return null;
        const alt = index % 2 === 1;

        return (
          <section
            key={section.id}
            className={`px-5 section-py md:px-10 ${
              alt ? 'bg-theme-sage' : 'bg-white'
            }`}
          >
            <Container>
              <div className='mx-auto max-w-[720px]'>
                <SectionHeader
                  align='left'
                  eyebrow={section.label}
                  title={section.title}
                  titleClassName='mb-8'
                />
                <FaqAccordion items={section.faqs} />
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
        />
      )}
    </div>
  );
};

export default Faq;
