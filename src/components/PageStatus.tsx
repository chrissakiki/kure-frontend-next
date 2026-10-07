import Container from './UI/Container';

type PageStatusProps = {
  error?: string | null;
  empty?: boolean;
};

const PageStatus = ({ error, empty }: PageStatusProps) => {
  if (!error && !empty) return null;

  return (
    <section className='bg-white px-5 py-24 md:px-10'>
      <Container>
        <p className='text-center text-[15px] text-theme-secondary'>
          {error || 'Nothing to show yet.'}
        </p>
      </Container>
    </section>
  );
};

export default PageStatus;
