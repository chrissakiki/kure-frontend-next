import Container from '../UI/Container';
import Link from 'next/link';

const experienceLinks = [
  { title: 'Home', path: '/' },
  { title: 'Services & Prices', path: '/services' },
  { title: 'Packages', path: '/packages' },
  { title: 'Gift Vouchers', path: '/vouchers' },
  { title: 'Locations', path: '/locations' },
];

const companyLinks = [
  { title: 'About KURE', path: '/about' },
  { title: 'Corporate & Events', path: '/corporate-events' },
  { title: 'KURE Academy', path: '/academy' },
  { title: 'Careers', path: '/careers' },
  { title: 'Testimonials', path: '/testimonials' },
  { title: 'FAQ', path: '/faq' },
  { title: 'Terms & Conditions', path: '/terms' },
  { title: 'Privacy Policy', path: '/privacy' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-theme-ink px-5 pb-7 pt-[70px] text-white/70 md:px-10'>
      <Container>
        <div className='mb-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12'>
          <div className='lg:col-span-2'>
            <img
              src='/assets/images/logo.png'
              alt='Kure'
              loading='lazy'
              decoding='async'
              className='aspect-[2.14] w-[9.375rem] brightness-0 invert'
            />
            <p className='mt-3.5 mb-5 text-xl italic text-brand'>
              Wellness, delivered.
            </p>
            <p className='max-w-[300px] text-[13px] leading-relaxed text-white/50'>
              Premium massage therapy — science-based, protocol-driven,
              delivered at your home or in our curated wellness houses across
              Lebanon.
            </p>
          </div>

          <div>
            <h4 className='mb-5 text-[11px] font-medium uppercase tracking-[0.15em] text-brand'>
              Experience
            </h4>
            <ul className='space-y-2.5'>
              {experienceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className='text-[13px] text-white/70 transition-colors duration-200 hover:text-brand'
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='mb-5 text-[11px] font-medium uppercase tracking-[0.15em] text-brand'>
              Company
            </h4>
            <ul className='space-y-2.5'>
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className='text-[13px] text-white/70 transition-colors duration-200 hover:text-brand'
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='mb-5 text-[11px] font-medium uppercase tracking-[0.15em] text-brand'>
              Connect
            </h4>
            <ul className='space-y-2.5'>
              <li>
                <a
                  href='tel:+96176577070'
                  className='text-[13px] text-white/70 transition-colors duration-200 hover:text-brand'
                >
                  +961 76 577 070
                </a>
              </li>
              <li>
                <a
                  href='mailto:support@getkured.co'
                  className='text-[13px] text-white/70 transition-colors duration-200 hover:text-brand'
                >
                  support@getkured.co
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com/kure.lb'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[13px] text-white/70 transition-colors duration-200 hover:text-brand'
                >
                  @kure.lb
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col items-start justify-between gap-3 border-t border-white/[0.08] pt-6 text-[11px] tracking-[0.05em] text-white/40 sm:flex-row sm:items-center'>
          <div>© {year} KURE. All rights reserved.</div>
          <div>Lebanon · 8 years of care</div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
