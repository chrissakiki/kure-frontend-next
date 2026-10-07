'use client';

import type { FormEvent } from 'react';

type Field = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  fullWidth?: boolean;
};

type InquiryFormProps = {
  fields: Field[];
  submitLabel: string;
  whatsappUrl: string;
  messagePrefix: string;
  note?: string;
};

const InquiryForm = ({
  fields,
  submitLabel,
  whatsappUrl,
  messagePrefix,
  note,
}: InquiryFormProps) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [messagePrefix, ''];
    fields.forEach((field) => {
      const value = String(data.get(field.name) ?? '').trim();
      if (value) lines.push(`${field.label}: ${value}`);
    });
    const url = `${whatsappUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const inputClass =
    'w-full border border-black/10 bg-white px-4 py-3 text-[14px] text-theme-primary outline-none transition-colors focus:border-brand';

  return (
    <form onSubmit={onSubmit} className='space-y-5'>
      <div className='grid gap-5 md:grid-cols-2'>
        {fields.map((field) => {
          const span =
            field.fullWidth || field.type === 'textarea'
              ? 'md:col-span-2'
              : '';

          return (
            <div key={field.name} className={span}>
              <label className='mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-theme-secondary'>
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  rows={4}
                  className={inputClass}
                />
              ) : field.type === 'select' ? (
                <select
                  name={field.name}
                  required={field.required}
                  className={inputClass}
                  defaultValue={field.options?.[0] ?? ''}
                >
                  {(field.options ?? []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.type ?? 'text'}
                  required={field.required}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              )}
            </div>
          );
        })}
      </div>
      <button
        type='submit'
        className='w-full bg-brand py-3.5 text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-colors hover:bg-brand-hover'
      >
        {submitLabel}
      </button>
      {note && (
        <p className='text-center text-[13px] italic text-theme-secondary'>
          {note}
        </p>
      )}
    </form>
  );
};

export default InquiryForm;
