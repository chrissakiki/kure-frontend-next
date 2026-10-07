'use client';

import React, { useState } from 'react';
import { cn } from '../utils/cn';
import { IoCloseSharp } from 'react-icons/io5';
import { useBookingOptions } from '../context/BookingOptionsProvider';
import type { BookingService } from '../api/types';

const MIN_TIME = '08:00';
const MAX_TIME = '20:00';
const WHATSAPP_BOOKING = 'https://wa.me/96176577070';

const getDefaultDateTime = () => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  let time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  if (time < MIN_TIME) time = MIN_TIME;
  if (time > MAX_TIME) time = MAX_TIME;
  return { date, time };
};

const fieldBase =
  'w-full border border-black/[0.08] bg-white px-3.5 py-3 text-[15px] text-theme-primary transition-[border-color,box-shadow] duration-200 placeholder:text-theme-light focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15';

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <span className='mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-theme-secondary'>
    {children}
  </span>
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type: string;
  placeholder?: string;
  hint?: string;
};

const Input = ({
  label,
  type,
  placeholder,
  hint,
  className,
  ...props
}: InputProps) => (
  <div className='flex w-full flex-col'>
    <FieldLabel>{label}</FieldLabel>
    <input
      type={type}
      placeholder={placeholder}
      className={cn(fieldBase, className)}
      {...props}
    />
    {hint ? (
      <p className='mt-1.5 text-[12px] leading-relaxed text-theme-secondary'>
        {hint}
      </p>
    ) : null}
  </div>
);

type BookingValues = {
  full_name: string;
  location: string;
  service: string;
  package: string;
  date: string;
  time: string;
};

const validateBooking = (v: BookingValues): string | null => {
  if (!v.full_name?.trim()) return 'Please enter your full name.';
  if (!v.location) return 'Please select a location.';
  if (!v.service) return 'Please select a service.';
  if (!v.date) return 'Please select a date.';
  if (!v.time) return 'Please select a time.';
  if (!v.package) return 'Please select a package.';
  const picked = new Date(`${v.date}T12:00:00`);
  if (Number.isNaN(picked.getTime())) return 'Please enter a valid date.';
  if (picked.getDay() === 0)
    return 'We are closed on Sundays. Please choose another date.';
  if (v.time < MIN_TIME || v.time > MAX_TIME) {
    return 'Please choose a time between 8:00 AM and 8:00 PM.';
  }
  return null;
};

const durationsFor = (services: BookingService[], serviceId: string) => {
  const row = services.find((s) => s.id === serviceId);
  if (!row) return [];
  if (row.durations.length) return row.durations;
  return row.defaultDuration ? [row.defaultDuration] : [];
};

const Booking = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const data = useBookingOptions();
  const loading = false;
  const error = data
    ? null
    : 'Booking options are unavailable right now.';
  const services = data?.services ?? [];
  const locations = data?.locations ?? [];

  const [values, setValues] = useState<BookingValues>(() => {
    const { date, time } = getDefaultDateTime();
    const firstService = services[0];
    return {
      full_name: '',
      location: locations[0]?.name ?? '',
      service: firstService?.id ?? '',
      package:
        firstService?.defaultDuration ?? firstService?.durations[0] ?? '',
      date,
      time,
    };
  });
  const [formError, setFormError] = useState<string | null>(null);

  const durations = durationsFor(services, values.service);
  const selectedService = services.find((s) => s.id === values.service);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormError(null);
    const { name, value } = e.target;

    if (name === 'service') {
      const opts = durationsFor(services, value);
      setValues((prev) => ({
        ...prev,
        service: value,
        package: opts[0] ?? '',
      }));
      return;
    }

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const err = validateBooking(values);
    if (err) {
      setFormError(err);
      return;
    }
    setFormError(null);

    const service = services.find((s) => s.id === values.service);
    const message = encodeURIComponent(
      `Hi, I'm ${values.full_name} and I would like to book an appointment. \nLocation: ${values.location} \nService: ${service?.name ?? ''}. \nPackage: ${values.package}. \nDate: ${values.date} | ${values.time}`
    );

    window.open(`${WHATSAPP_BOOKING}?text=${message}`);
  };

  const addonSummary =
    data?.addons.length && data.addons.length > 0
      ? data.addons
          .map((a) => a.name)
          .filter((name, i, arr) => arr.indexOf(name) === i)
          .slice(0, 3)
          .join(', ')
      : null;

  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[500px] flex-col overflow-hidden bg-white shadow-[0_24px_80px_rgba(16,16,16,0.28)]',
        'max-h-[min(92dvh,calc(100svh-1.25rem))]'
      )}
    >
      <div className='relative shrink-0 overflow-hidden bg-theme-ink px-6 pb-6 pt-6 text-white sm:px-7 sm:pt-7'>
        <div
          className='pointer-events-none absolute inset-0 opacity-40'
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 100% 0%, rgba(146,170,109,0.45), transparent 55%)',
          }}
        />
        <button
          type='button'
          aria-label='Close'
          className='absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center text-white/70 transition-colors hover:bg-white/10 hover:text-white'
          onClick={() => setShowModal(false)}
        >
          <IoCloseSharp size={20} />
        </button>

        <div className='relative pr-10'>
          <p className='mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-brand'>
            Book a session
          </p>
          <h2 className='text-[clamp(1.5rem,4vw,1.85rem)] font-medium leading-[1.15]'>
            Reserve your <em className='italic text-brand'>ritual</em>
          </h2>
          <p className='mt-2.5 max-w-[320px] text-[13px] leading-relaxed text-white/70'>
            Tell us what you need — we confirm on WhatsApp within business
            hours.
          </p>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto overscroll-y-contain px-6 py-5 sm:px-7 sm:py-6 [scrollbar-gutter:stable]'>
        {loading ? (
          <p className='text-[14px] text-theme-secondary'>Loading options…</p>
        ) : error ? (
          <div
            role='alert'
            className='border border-red-200 bg-red-50 px-4 py-3 text-[13px] leading-relaxed text-red-800'
          >
            {error}
          </div>
        ) : (
          <>
            {formError ? (
              <div
                role='alert'
                aria-live='polite'
                className='mb-5 border border-red-200 bg-red-50 px-4 py-3 text-[13px] leading-relaxed text-red-800'
              >
                {formError}
              </div>
            ) : null}

            <div className='flex flex-col gap-5'>
              <Input
                name='full_name'
                label='Full name'
                type='text'
                placeholder='Your full name'
                value={values.full_name}
                onChange={handleChange}
                autoComplete='name'
              />

              <div className='grid gap-5 sm:grid-cols-2'>
                <div className='flex flex-col'>
                  <FieldLabel>Location</FieldLabel>
                  <select
                    name='location'
                    value={values.location}
                    onChange={handleChange}
                    className={cn(fieldBase, 'cursor-pointer')}
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col'>
                  <FieldLabel>Service</FieldLabel>
                  <select
                    name='service'
                    value={values.service}
                    onChange={handleChange}
                    className={cn(fieldBase, 'cursor-pointer')}
                  >
                    {services.map((serv) => (
                      <option key={serv.id} value={serv.id}>
                        {serv.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <FieldLabel>Duration</FieldLabel>
                {durations.length > 1 ? (
                  <div className='flex flex-wrap gap-2'>
                    {durations.map((opt) => {
                      const active = values.package === opt;
                      return (
                        <button
                          key={opt}
                          type='button'
                          onClick={() => {
                            setFormError(null);
                            setValues((prev) => ({ ...prev, package: opt }));
                          }}
                          className={cn(
                            'border px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors duration-200',
                            active
                              ? 'border-brand bg-brand text-white'
                              : 'border-black/[0.1] bg-white text-theme-primary hover:border-brand/50'
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className='border border-black/[0.06] bg-theme-sage px-3.5 py-3 text-[15px] text-theme-primary'>
                    {values.package ||
                      selectedService?.defaultDuration ||
                      '—'}
                  </p>
                )}
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <Input
                  name='date'
                  label='Date'
                  type='date'
                  value={values.date}
                  onChange={handleChange}
                />
                <Input
                  name='time'
                  label='Time'
                  type='time'
                  value={values.time}
                  onChange={handleChange}
                />
              </div>
              <p className='-mt-2 text-[12px] leading-relaxed text-theme-secondary'>
                Closed Sundays · operating hours 8:00 AM – 8:00 PM
              </p>

              <div className='border border-brand/15 bg-theme-sage px-4 py-4'>
                <p className='text-[11px] font-medium uppercase tracking-[0.16em] text-brand'>
                  Optional add-ons
                </p>
                <p className='mt-2 text-[13px] leading-relaxed text-theme-primary'>
                  {addonSummary
                    ? `${addonSummary} — available as a supplement to other treatments.`
                    : '+20 min treatments for $20 — stretching, gun massage, or hand & foot reflexology.'}
                </p>
                <p className='mt-1 text-[12px] text-theme-secondary'>
                  Available as a supplement to other treatments.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className='shrink-0 border-t border-black/[0.06] bg-white px-6 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-4 sm:px-7 sm:pb-5'>
        <button
          type='button'
          onClick={handleSubmit}
          disabled={loading || !!error || !data}
          className='w-full bg-brand py-3.5 text-[13px] font-medium uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50'
        >
          Continue on WhatsApp →
        </button>
        <p className='mt-3 text-center text-[11px] leading-relaxed text-theme-secondary'>
          Opens WhatsApp with your booking details ready to send.
        </p>
      </div>
    </div>
  );
};

export default Booking;
