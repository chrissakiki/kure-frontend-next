import type { ReactNode } from 'react';
import AosInit from '../AosInit';
import ScrollToTop from '../ScrollToTop';
import Whatsapp from '../Whatsapp';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='min-h-screen'>
      <AosInit />
      <ScrollToTop />
      <Header />
      {children}
      <Footer />
      <Menu />
      <Whatsapp />
    </div>
  );
};

export default Layout;
