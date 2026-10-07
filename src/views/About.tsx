import PageHero from '../components/PageHero';
import PageFinalCta from '../components/PageFinalCta';
import Container from '../components/UI/Container';
import SectionHeader from '../components/UI/SectionHeader';
import { toCta } from '../api/cta';
import type { AboutPageData } from '../api/types';

const aboutHtmlClass =
  'about-html [&_.content-section+_.content-section]:mt-12 [&_.content-quote]:mt-10 [&_.content-quote]:text-center [&_.content-quote]:text-[22px] [&_.content-quote]:italic [&_.content-quote]:leading-relaxed [&_.content-quote]:text-brand [&_.content-quote_p]:mb-0 [&_.content-quote_p+p]:mt-1 [&_.content-highlight]:text-[22px] [&_.content-highlight]:italic [&_.content-highlight]:text-brand [&_.content-closing]:text-[20px] [&_.content-closing]:italic [&_.content-closing]:text-theme-primary [&_h2]:mb-5 [&_h2]:text-[clamp(1.75rem,3vw,2.25rem)] [&_h2]:font-medium [&_h2]:text-theme-primary [&_p]:mb-4 [&_p]:text-[17px] [&_p]:leading-relaxed [&_p]:text-theme-secondary [&_p:last-child]:mb-0';

const About = ({ data }: { data: AboutPageData }) => {

  const story = data.contentBlocks.STORY;
  const missionVision = data.contentBlocks.MISSION_VISION;
  const lookingAhead = data.contentBlocks.LOOKING_AHEAD;

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

      {(story || missionVision) && (
        <section className='bg-white px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[720px] space-y-12'>
              {story?.content && (
                <div
                  className={aboutHtmlClass}
                  dangerouslySetInnerHTML={{ __html: story.content }}
                />
              )}
              {missionVision?.content && (
                <div
                  className={aboutHtmlClass}
                  dangerouslySetInnerHTML={{ __html: missionVision.content }}
                />
              )}
            </div>
          </Container>
        </section>
      )}

      {data.ecosystem.intro && (
        <section className='bg-theme-sage px-5 section-py md:px-10'>
          <Container>
            <SectionHeader
              eyebrow={data.ecosystem.intro.eyebrow ?? undefined}
              title={data.ecosystem.intro.title}
              subtitle={data.ecosystem.intro.description ?? undefined}
              titleClassName='mb-3'
              subtitleClassName='mb-12 max-w-[520px] italic'
            />
            <div className='grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3'>
              {data.ecosystem.items.map((pillar) => (
                <div
                  key={pillar.id}
                  className='rounded border border-brand/10 bg-white px-7 py-8'
                >
                  <h3 className='mb-2.5 text-[20px] font-medium text-theme-primary'>
                    {pillar.title}
                  </h3>
                  {pillar.description && (
                    <p className='text-sm leading-relaxed text-theme-secondary'>
                      {pillar.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {data.milestones.intro && (
        <section className='bg-white px-5 section-py md:px-10'>
          <Container>
            <SectionHeader
              eyebrow={data.milestones.intro.eyebrow ?? undefined}
              title={data.milestones.intro.title}
              titleClassName='mb-12'
            />
            <div className='grid grid-cols-2 gap-8 md:grid-cols-5'>
              {data.milestones.stats.map((stat) => (
                <div key={stat.id} className='text-center'>
                  <div className='mb-2 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-none text-brand'>
                    {stat.value}
                  </div>
                  <div className='text-[11px] uppercase tracking-[0.15em] text-theme-secondary'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            {data.milestones.intro.description && (
              <p className='mx-auto mt-12 max-w-[560px] text-center text-[15px] italic text-theme-secondary'>
                {data.milestones.intro.description}
              </p>
            )}
          </Container>
        </section>
      )}

      {lookingAhead?.content && (
        <section className='bg-theme-sage px-5 section-py md:px-10'>
          <Container>
            <div
              className={`mx-auto max-w-[720px] text-center ${aboutHtmlClass}`}
              dangerouslySetInnerHTML={{ __html: lookingAhead.content }}
            />
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
          borderTop
        />
      )}
    </div>
  );
};

export default About;
