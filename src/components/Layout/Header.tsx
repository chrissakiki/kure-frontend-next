'use client';

import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Container from '../UI/Container';
import { useAppContext } from '../../context/AppProvider';
import { cn } from '../../utils/cn';
import NavLink from '../NavLink';
import Modal from '../UI/Modal';
import Booking from '../Booking';
import menuData from '../../../data/menu.json';

/** Primary nav — exclude legal pages (footer / mobile menu only) */
const legalPaths = new Set(['/terms', '/privacy']);
const navLinks = menuData.filter((item) => !legalPaths.has(item.path));

const Header = () => {
  const { showMenu, setShowMenu } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className='sticky top-0 z-50 border-b border-black/[0.06] bg-white/80 shadow-[0_1px_0_rgba(0,0,0,0.04),0_10px_28px_-6px_rgba(15,23,42,0.08)] backdrop-blur-xl'>
        <Container>
          <div className='flex w-full items-center justify-between gap-4 py-4'>
            <NavLink
              href='/'
              className='shrink-0 transition-opacity duration-300 hover:opacity-90'
            >
              <img
                src='/assets/images/logo.png'
                alt='Kure'
                className='aspect-[2.14] w-[7.25rem]'
              />
            </NavLink>

            <nav className='hidden min-w-0 flex-1 items-center justify-end gap-x-3 gap-y-1 xl:flex 2xl:gap-x-4'>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  href={link.path}
                  className={({ isActive }) =>
                    cn(
                      'whitespace-nowrap text-[11px] tracking-[0.02em] transition-colors duration-200 2xl:text-xs',
                      isActive
                        ? 'font-medium text-brand'
                        : 'font-normal text-theme-primary hover:text-brand'
                    )
                  }
                >
                  {link.title}
                </NavLink>
              ))}
              <button
                type='button'
                onClick={() => setShowModal(true)}
                className='shrink-0 bg-brand px-[18px] py-2.5 text-[12px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover 2xl:px-[22px] 2xl:text-[13px]'
              >
                Book Now
              </button>
            </nav>

            <button
              type='button'
              aria-label='Open menu'
              className='grid cursor-pointer place-items-center rounded-2xl border border-zinc-200/90 bg-white p-2.5 text-zinc-900 shadow-sm ring-1 ring-black/[0.04] transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md active:scale-[0.97] xl:hidden'
              onClick={() => setShowMenu(true)}
            >
              <FiMenu
                size={26}
                strokeWidth={2}
                className={cn('duration-300', {
                  'pointer-events-none rotate-90 opacity-0': showMenu,
                  'opacity-100': !showMenu,
                })}
              />
            </button>
          </div>
        </Container>
      </header>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Booking setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default Header;
