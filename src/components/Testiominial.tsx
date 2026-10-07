import Container from './UI/Container';
import SectionHeader from './UI/SectionHeader';
import type { SectionIntro, Testimonial } from '../api/types';

type TestimonialProps = {
  intro: SectionIntro | null;
  items: Testimonial[];
};

const Testiominial = ({ intro, items }: TestimonialProps) => {
  if (!intro || !items.length) return null;

  return (
    <section className='bg-white px-5 section-py md:px-10'>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow ?? undefined}
          title={intro.title}
          subtitle={intro.description ?? undefined}
          subtitleClassName='mb-5'
        />

        <div className='mt-5 grid gap-7 md:grid-cols-3'>
          {items.map((item) => (
            <div
              key={item.id}
              className='relative rounded bg-theme-sage px-[30px] py-9'
            >
              <span
                className='absolute left-[22px] top-2.5 text-[78px] leading-none text-brand/50'
                aria-hidden
              >
                “
              </span>
              <p className='relative z-10 mb-6 text-[16px] font-medium italic leading-snug text-[#101010]'>
                {item.content}
              </p>
              <div className='flex items-center justify-between border-t border-brand/20 pt-4'>
                <div className='text-sm font-medium text-[#101010]'>
                  {item.name}
                </div>
                <div className='text-[11px] tracking-[0.05em] text-theme-secondary'>
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testiominial;
