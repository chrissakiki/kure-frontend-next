'use client';

import { useState } from 'react';
import Container from './UI/Container';
import SectionHeader from './UI/SectionHeader';
import Modal from './UI/Modal';
import Booking from './Booking';
import type { SectionIntro, StepItem } from '../api/types';

type HowItWorkProps = {
  intro: SectionIntro | null;
  items: StepItem[];
};

const HowItWork = ({ intro, items }: HowItWorkProps) => {
  const [showModal, setShowModal] = useState(false);

  if (!intro || !items.length) return null;

  return (
    <>
      <section className='bg-theme-ink px-5 section-py text-white md:px-10'>
        <Container>
          <SectionHeader
            eyebrow={intro.eyebrow ?? undefined}
            title={intro.title}
            subtitle={intro.description ?? undefined}
            theme='dark'
            subtitleClassName='mb-8'
          />

          <div className='mt-[30px] grid gap-[50px] md:grid-cols-3'>
            {items.map((step) => (
              <div key={step.id} className='text-center'>
                <div className='mb-5 text-[78px] font-medium italic leading-none text-brand'>
                  {String(step.sortOrder).padStart(2, '0')}
                </div>
                <h3 className='mb-3 text-2xl font-medium text-white'>
                  {step.title}
                </h3>
                <p className='text-[15px] leading-relaxed text-white/70'>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className='mt-[50px] text-center'>
            <button
              type='button'
              onClick={() => setShowModal(true)}
              className='bg-brand px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover'
            >
              Book Your Session
            </button>
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

export default HowItWork;
