'use client';

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from './UI/Container';
import type { MilestoneStat } from '../api/types';

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className='text-center'>
    <div className='mb-2.5 text-[2.5rem] font-semibold leading-none text-brand'>
      {value}
    </div>
    <div className='text-xs font-medium uppercase tracking-[0.08em] leading-snug text-theme-primary'>
      {label}
    </div>
  </div>
);

type TrustBarProps = {
  stats: MilestoneStat[];
};

const TrustBar = ({ stats }: TrustBarProps) => {
  if (!stats.length) return null;

  return (
    <section className='bg-white px-5 py-[60px] md:px-10'>
      <Container>
        <div className='md:hidden'>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={16}
            loop
            speed={650}
            autoplay={{
              delay: 2400,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {stats.map((item) => (
              <SwiperSlide key={item.id}>
                <StatItem value={item.value} label={item.label} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='mx-auto hidden max-w-[1150px] md:grid md:grid-cols-5 md:gap-[30px]'>
          {stats.map((item) => (
            <StatItem key={item.id} value={item.value} label={item.label} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustBar;
