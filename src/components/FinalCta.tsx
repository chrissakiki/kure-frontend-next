'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from './UI/Container';
import Modal from './UI/Modal';
import Booking from './Booking';
import { toCta } from '../api/cta';
import type { SectionOutro } from '../api/types';

type FinalCtaProps = {
  outro: SectionOutro | null;
};

const FinalCta = ({ outro }: FinalCtaProps) => {
  const [showModal, setShowModal] = useState(false);

  if (!outro) return null;

  const primaryCta = toCta(outro.primaryCtaLabel, outro.primaryCtaHref);
  const secondaryCta = toCta(outro.secondaryCtaLabel, outro.secondaryCtaHref);

  return (
    <>
      <section className='bg-theme-sage px-5 section-py text-center md:px-10'>
        <Container>
          <h2 className='mx-auto mb-[22px] max-w-[800px] text-[clamp(2.75rem,6vw,4.25rem)] font-medium leading-[1.05] text-theme-primary'>
            {outro.title}{' '}
            {outro.titleAccent && (
              <em className='italic text-brand'>{outro.titleAccent}</em>
            )}
          </h2>
          {outro.description && (
            <p className='mx-auto mb-9 max-w-[520px] text-[17px] text-theme-secondary'>
              {outro.description}
            </p>
          )}
          <div className='flex flex-wrap justify-center gap-3.5'>
            {primaryCta?.action === 'book' ? (
              <button
                type='button'
                onClick={() => setShowModal(true)}
                className='bg-brand px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover'
              >
                {primaryCta.label}
              </button>
            ) : primaryCta ? (
              <Link
                href={primaryCta.href ?? '/'}
                className='bg-brand px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover'
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta && (
              <Link
                href={secondaryCta.href ?? '/services'}
                className='bg-theme-ink px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-[#333]'
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </Container>
      </section>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Booking setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default FinalCta;
