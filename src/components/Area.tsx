import Container from './UI/Container';
import SectionHeader from './UI/SectionHeader';
import BrandMark from './BrandMark';
import type { ContentNote, FeatureItem, SectionIntro } from '../api/types';

type AreaProps = {
  intro: SectionIntro | null;
  items: FeatureItem[];
  note: ContentNote | null;
};

const Area = ({ intro, items, note }: AreaProps) => {
  if (!intro) return null;

  return (
    <section className='bg-theme-sage px-5 section-py md:px-10'>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow ?? undefined}
          title={intro.title}
          subtitle={intro.description ?? undefined}
        />

        <div className='mb-9 flex flex-wrap justify-center gap-3'>
          {items.map((item) => (
            <div
              key={item.id}
              className='inline-flex cursor-default items-center rounded-full border border-brand/20 bg-white px-6 py-3 text-[13px] font-medium text-[#101010] transition-all duration-300 hover:border-[#101010] hover:bg-theme-ink hover:text-white'
            >
              <BrandMark variant='pin' className='mr-1.5 text-[14px]' />
              {item.title}
            </div>
          ))}
        </div>

        {note?.content && (
          <div
            className='text-center text-[15px] text-theme-secondary [&_a]:text-brand [&_a]:underline [&_a]:decoration-brand/40 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-brand'
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        )}
      </Container>
    </section>
  );
};

export default Area;
