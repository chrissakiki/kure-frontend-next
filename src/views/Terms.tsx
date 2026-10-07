import Container from '../components/UI/Container';
import PageStatus from '../components/PageStatus';
import type { LegalPageData } from '../api/types';

const Terms = ({ data }: { data: LegalPageData }) => {

  const hero = data.hero;
  const metaLine = hero?.highlights?.length
    ? hero.highlights.join(' · ')
    : null;

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
            {hero?.title ?? 'Terms & Conditions'}
            {hero?.titleAccent && (
              <>
                {' '}
                <em className='italic text-brand'>{hero.titleAccent}</em>
              </>
            )}
          </h1>
          {metaLine && (
            <p className='text-[15px] text-theme-secondary'>{metaLine}</p>
          )}
        </Container>
      </section>

      <section className='bg-white px-5 section-py md:px-10'>
        <Container>
          <div className='mx-auto max-w-[720px] text-theme-primary'>
            {data.legalDocument?.content ? (
              <div
                className='legal-html'
                dangerouslySetInnerHTML={{
                  __html: data.legalDocument.content,
                }}
              />
            ) : (
              <PageStatus empty />
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Terms;
