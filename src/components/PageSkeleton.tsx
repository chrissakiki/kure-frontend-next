import Container from './UI/Container';

const pulse = 'animate-pulse rounded bg-black/[0.06]';

type PageSkeletonProps = {
  variant?: 'hero' | 'legal' | 'faq';
};

const PageSkeleton = ({ variant = 'hero' }: PageSkeletonProps) => {
  if (variant === 'legal' || variant === 'faq') {
    return (
      <div className='flex flex-col' aria-busy aria-live='polite'>
        <section className='bg-theme-sage px-5 pb-16 pt-[100px] text-center md:px-10'>
          <Container>
            <div className={`mx-auto mb-[18px] h-3 w-24 ${pulse}`} />
            <div className={`mx-auto mb-4 h-12 w-[min(100%,420px)] ${pulse}`} />
            <div className={`mx-auto h-4 w-[min(100%,320px)] ${pulse}`} />
          </Container>
        </section>

        <section className='bg-white px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[720px] space-y-5'>
              {Array.from({ length: variant === 'faq' ? 4 : 6 }).map((_, i) => (
                <div key={i} className='space-y-3'>
                  <div className={`h-5 w-2/5 ${pulse}`} />
                  <div className={`h-3 w-full ${pulse}`} />
                  <div className={`h-3 w-11/12 ${pulse}`} />
                  <div className={`h-3 w-4/5 ${pulse}`} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className='flex flex-col' aria-busy aria-live='polite'>
      <section className='relative flex min-h-[50vh] items-center overflow-hidden bg-[#1a1a1a] px-5 section-py md:px-10'>
        <Container cn='relative z-10 w-full'>
          <div className={`mb-6 h-3 w-28 bg-white/15 ${pulse}`} />
          <div className={`mb-3 h-14 w-[min(100%,520px)] bg-white/15 ${pulse}`} />
          <div className={`mb-8 h-14 w-[min(100%,380px)] bg-white/15 ${pulse}`} />
          <div className={`mb-8 h-4 w-[min(100%,480px)] bg-white/10 ${pulse}`} />
          <div className='flex gap-3.5'>
            <div className={`h-11 w-40 bg-white/15 ${pulse}`} />
            <div className={`h-11 w-36 bg-white/10 ${pulse}`} />
          </div>
        </Container>
      </section>

      <section className='bg-white px-5 section-py md:px-10'>
        <Container>
          <div className={`mb-3 h-3 w-32 ${pulse}`} />
          <div className={`mb-10 h-8 w-64 ${pulse}`} />
          <div className='grid gap-[22px] md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='rounded border border-brand/10 bg-theme-sage p-7'
              >
                <div className={`mb-3 h-3 w-full ${pulse}`} />
                <div className={`mb-3 h-3 w-11/12 ${pulse}`} />
                <div className={`mb-6 h-3 w-4/5 ${pulse}`} />
                <div className={`mb-2 h-3 w-24 ${pulse}`} />
                <div className={`h-2.5 w-32 ${pulse}`} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PageSkeleton;
