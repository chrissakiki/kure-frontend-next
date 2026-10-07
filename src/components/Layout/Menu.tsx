'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useAppContext } from '../../context/AppProvider';
import { IoCloseSharp } from 'react-icons/io5';
import Container from '../UI/Container';
import menuData from '../../../data/menu.json';
import Link from 'next/link';
import NavLink from '../NavLink';
import Modal from '../UI/Modal';
import Booking from '../Booking';

/** Primary nav — exclude legal pages (footer only) */
const legalPaths = new Set(['/terms', '/privacy']);
const navLinks = menuData.filter((item) => !legalPaths.has(item.path));

const Menu = () => {
  const { showMenu, setShowMenu } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[60] w-full bg-white duration-300',
          {
            'opacity-100': showMenu,
            'pointer-events-none opacity-0': !showMenu,
          }
        )}
      >
        <Container cn='flex h-full flex-col'>
          <div className='flex w-full shrink-0 items-center justify-between py-3'>
            <div className='aspect-[2.14] w-[7.25rem] shrink-0' aria-hidden />
            <button
              type='button'
              aria-label='Close menu'
              className='grid cursor-pointer place-items-center rounded-2xl border border-zinc-200/90 bg-white p-2.5 text-zinc-900 shadow-sm ring-1 ring-black/[0.04] transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md active:scale-[0.97]'
              onClick={() => setShowMenu(false)}
            >
              <IoCloseSharp
                size={26}
                className={cn('text-zinc-900 duration-300', {
                  '-rotate-180': !showMenu,
                })}
              />
            </button>
          </div>

          <div className='flex min-h-0 flex-1 flex-col items-center gap-6 overflow-y-auto pb-16 pt-6 sm:gap-8 sm:pt-8'>
            {navLinks.map((item, idx) => (
              <NavLink
                key={idx}
                href={item?.path}
                className={({ isActive }) =>
                  cn(
                    'text-[1.5rem] duration-500 md:text-[2.5rem]',
                    isActive
                      ? 'text-brand'
                      : 'text-theme-primary hover:text-brand',
                    {
                      'opacity-0': !showMenu,
                      'opacity-100': showMenu,
                    }
                  )
                }
                onClick={() => setShowMenu(false)}
              >
                {item?.title}
              </NavLink>
            ))}

            <button
              type='button'
              className={cn(
                'mt-2 bg-brand px-8 py-3.5 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-hover',
                {
                  'opacity-0': !showMenu,
                  'opacity-100': showMenu,
                }
              )}
              onClick={() => {
                setShowMenu(false);
                setShowModal(true);
              }}
            >
              Book Now
            </button>

            <Link
              href='/brochure/kure2026.pdf'
              target='_blank'
              className={cn(
                'text-[1.1rem] capitalize text-theme-secondary underline hover:text-brand md:text-[1.4rem]',
                {
                  'opacity-0': !showMenu,
                  'opacity-100': showMenu,
                }
              )}
              onClick={() => setShowMenu(false)}
            >
              Kure&apos;s brochure
            </Link>
          </div>
        </Container>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Booking setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default Menu;
