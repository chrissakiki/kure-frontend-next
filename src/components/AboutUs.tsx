import Container from './UI/Container';

const AboutUs = () => {
  return (
    <div className=' bg-theme-primary '>
      <Container>
        <div className='grid place-items-center gap-2 md:px-5 py-10 md:py-16' data-aos='fade-in'>
          <h3 className='text-[1.2rem] sm:text-[1.8rem] lg:text-[2.2rem] font-bold text-brand text-center uppercase'>
            SAVOIR-FAIRE COMBINING MANUAL SKILLS AND TECHNOLOGIES
          </h3>
          <p className='text-[0.9rem] sm:text-[1.1rem] lg:text-[1.2rem]  font-normal text-center text-theme-primary leading-normal tracking-[0.06rem]'>
            Indulge into our anti-aging, luxurious experience and a consultation
            with our professional guidance to meet your skin goals while using
            our high performance treatments and unique effective products.
          </p>
        </div>
      </Container>
      <div className='border border-theme h-[1px] w-full '/>
    </div>
  );
};

export default AboutUs;
