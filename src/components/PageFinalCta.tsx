'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from './UI/Container';
import Modal from './UI/Modal';
import Booking from './Booking';

type Cta = {
  label: string;
  action: 'book' | 'link';
  href?: string;
};

type PageFinalCtaProps = {
  title: string;
  titleEmphasis?: string;
  subtitle?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  borderTop?: boolean;
};

const btnPrimary =
  'bg-brand px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-brand-hover';
const btnSecondary =
  'bg-theme-ink px-[26px] py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-[#333]';

const renderLinkCta = (cta: Cta, className: string) => {
  const href = cta.href ?? '/';
  if (href.startsWith('http') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {cta.label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {cta.label}
    </Link>
  );
};

const PageFinalCta = ({
  title,
  titleEmphasis,
  subtitle,
  primaryCta,
  secondaryCta,
  borderTop = false,
}: PageFinalCtaProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className={`bg-theme-sage px-5 section-py text-center md:px-10 ${borderTop ? 'border-t border-ink/10' : ''}`}>
        <Container>
          <h2 className='mx-auto mb-[22px] max-w-[800px] text-[clamp(2.75rem,6vw,4.25rem)] font-medium leading-[1.05] text-theme-primary'>
            {title}{' '}
            {titleEmphasis && (
              <em className='italic text-brand'>{titleEmphasis}</em>
            )}
          </h2>
          {subtitle && (
            <p className='mx-auto mb-9 max-w-[520px] text-[17px] text-theme-secondary'>
              {subtitle}
            </p>
          )}
          <div className='flex flex-wrap justify-center gap-3.5'>
            {primaryCta.action === 'book' ? (
              <button
                type='button'
                onClick={() => setShowModal(true)}
                className={btnPrimary}
              >
                {primaryCta.label}
              </button>
            ) : (
              renderLinkCta(primaryCta, btnPrimary)
            )}
            {secondaryCta &&
              (secondaryCta.action === 'book' ? (
                <button
                  type='button'
                  onClick={() => setShowModal(true)}
                  className={btnSecondary}
                >
                  {secondaryCta.label}
                </button>
              ) : (
                renderLinkCta(secondaryCta, btnSecondary)
              ))}
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

export default PageFinalCta;
