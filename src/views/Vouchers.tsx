import { cn } from '../utils/cn';
import PageHero from '../components/PageHero';
import PageFinalCta from '../components/PageFinalCta';
import Container from '../components/UI/Container';
import SectionHeader from '../components/UI/SectionHeader';
import InquiryForm from '../components/InquiryForm';
import BrandMark from '../components/BrandMark';
import { toCta } from '../api/cta';
import type { GiftVouchersPageData } from '../api/types';

const WHATSAPP_ORDER = 'https://wa.me/96176577070';

const Vouchers = ({ data }: { data: GiftVouchersPageData }) => {

  const orderUrl = `${WHATSAPP_ORDER}?text=${encodeURIComponent(
    "Hi KURE, I'd like to order a gift voucher"
  )}`;

  const primaryCta = toCta(
    data.sectionOutro?.primaryCtaLabel,
    data.sectionOutro?.primaryCtaHref
  );
  const secondaryCta = toCta(
    data.sectionOutro?.secondaryCtaLabel,
    data.sectionOutro?.secondaryCtaHref
  );

  const voucherTypeOptions = data.options.items
    .map((v) => (v.price ? `${v.name} (${v.price})` : v.name))
    .concat(['Custom amount']);

  return (
    <div className='flex flex-col'>
      <PageHero hero={data.hero} />

      <section className='bg-theme-sage px-5 section-py md:px-10'>
        <Container>
          {data.options.intro && (
            <SectionHeader
              eyebrow={data.options.intro.eyebrow ?? undefined}
              title={data.options.intro.title}
              subtitle={data.options.intro.description ?? undefined}
            />
          )}

          <div className='grid gap-[22px] md:grid-cols-3'>
            {data.options.items.map((voucher) => {
              const featured = Boolean(voucher.badge);

              return (
                <div
                  key={voucher.id}
                  className={cn(
                    'relative rounded border p-8 transition-transform duration-300 hover:-translate-y-1 md:px-8 md:py-10',
                    featured
                      ? 'border-2 border-brand bg-theme-ink text-white'
                      : 'border-brand/10 bg-white'
                  )}
                >
                  {voucher.badge && (
                    <div className='absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand px-[18px] py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white'>
                      {voucher.badge}
                    </div>
                  )}
                  <h3
                    className={cn(
                      'mb-1.5 text-[28px] font-medium',
                      featured ? 'text-white' : 'text-theme-primary'
                    )}
                  >
                    {voucher.name}
                  </h3>
                  {voucher.subtitle && (
                    <p
                      className={cn(
                        'mb-[18px] min-h-[42px] text-[13px]',
                        featured ? 'text-white/70' : 'text-theme-secondary'
                      )}
                    >
                      {voucher.subtitle}
                    </p>
                  )}
                  {(voucher.price || voucher.priceNote) && (
                    <div
                      className={cn(
                        'mb-[22px] text-[38px] font-medium leading-none',
                        featured ? 'text-white' : 'text-theme-primary'
                      )}
                    >
                      {voucher.price}
                      {voucher.priceNote && (
                        <small
                          className={cn(
                            'text-[13px] font-normal',
                            featured ? 'text-white/60' : 'text-theme-secondary'
                          )}
                        >
                          {voucher.priceNote}
                        </small>
                      )}
                    </div>
                  )}
                  <ul className='mb-[26px]'>
                    {voucher.perks.map((feature) => (
                      <li
                        key={feature}
                        className={cn(
                          'flex items-center gap-2.5 border-b py-[7px] text-[13px]',
                          featured ? 'border-white/10' : 'border-black/[0.06]'
                        )}
                      >
                        <BrandMark variant='check' className='text-[15px]' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={orderUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cn(
                      'block w-full py-[13px] text-center text-xs font-medium uppercase tracking-[0.08em] transition-colors',
                      featured
                        ? 'bg-brand text-white hover:bg-brand-hover'
                        : 'bg-theme-ink text-white hover:bg-[#333]'
                    )}
                  >
                    {voucher.ctaLabel ?? 'Order This Voucher →'}
                  </a>
                </div>
              );
            })}
          </div>

          {data.options.note?.content && (
            <div
              className='mt-8 text-center text-[13px] italic text-theme-secondary [&_p]:m-0'
              dangerouslySetInnerHTML={{ __html: data.options.note.content }}
            />
          )}
        </Container>
      </section>

      {data.policy.intro && (
        <section className='bg-white px-5 section-py md:px-10'>
          <Container>
            <div className='mx-auto max-w-[720px]'>
              <SectionHeader
                align='left'
                eyebrow={data.policy.intro.eyebrow ?? undefined}
                title={data.policy.intro.title}
                titleClassName='mb-8'
              />
              <ul className='space-y-0'>
                {data.policy.items.map((policy) => (
                  <li
                    key={policy.id}
                    className='flex items-center gap-3 border-b border-black/[0.06] py-3.5 text-[15px] leading-relaxed text-theme-primary'
                  >
                    <BrandMark variant='check' className='text-[15px]' />
                    <span>
                      {policy.description ? (
                        <>
                          {policy.title && (
                            <strong className='font-medium'>{policy.title}</strong>
                          )}
                          {policy.title && policy.description ? ' — ' : ''}
                          {policy.description}
                        </>
                      ) : (
                        policy.title
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {data.steps.intro && (
        <section className='bg-theme-ink px-5 section-py text-white md:px-10'>
          <Container>
            <SectionHeader
              eyebrow={data.steps.intro.eyebrow ?? undefined}
              title={data.steps.intro.title}
              theme='dark'
              titleClassName='mb-12'
            />
            <div className='mx-auto mt-[30px] grid max-w-[900px] gap-[50px] md:grid-cols-3'>
              {data.steps.items.map((item) => (
                <div key={item.id} className='text-center'>
                  <div className='mb-5 text-[78px] font-medium italic leading-none text-brand'>
                    {item.sortOrder}
                  </div>
                  <h3 className='mb-3 text-2xl font-medium'>{item.title}</h3>
                  <p className='text-[15px] leading-relaxed text-white/70'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className='bg-theme-sage px-5 section-py md:px-10'>
        <Container>
          <div className='mx-auto max-w-[720px]'>
            <SectionHeader
              align='left'
              eyebrow='Request a voucher'
              title='Order or request a voucher.'
              subtitle="Tell us what you'd like to gift and who it's for — we'll respond within 24 hours with confirmation, payment link, and delivery timing."
              titleClassName='mb-4'
              subtitleClassName='mb-8'
            />
            <InquiryForm
              whatsappUrl={WHATSAPP_ORDER}
              messagePrefix='Hi KURE, I would like to order a gift voucher.'
              submitLabel='Send Voucher Request →'
              note={`Prefer to order faster? WhatsApp us at 96176577070 — we'll handle it in minutes.`}
              fields={[
                {
                  name: 'name',
                  label: 'Full name',
                  placeholder: 'Your name',
                  required: true,
                },
                {
                  name: 'email',
                  label: 'Email address',
                  type: 'email',
                  placeholder: 'you@email.com',
                  required: true,
                },
                {
                  name: 'phone',
                  label: 'Phone number',
                  type: 'tel',
                  placeholder: '+961...',
                  required: true,
                },
                {
                  name: 'recipient',
                  label: "Recipient's name",
                  placeholder: 'Who is it for?',
                },
                {
                  name: 'type',
                  label: 'Voucher type',
                  type: 'select',
                  options: voucherTypeOptions,
                  fullWidth: true,
                },
                {
                  name: 'custom',
                  label: 'Custom amount (if applicable)',
                  placeholder: 'e.g., $150',
                },
                {
                  name: 'delivery',
                  label: 'Delivery format',
                  type: 'select',
                  options: [
                    'Digital (email PDF)',
                    'Printed (KURE packaging)',
                    'Both',
                  ],
                },
                {
                  name: 'date',
                  label: 'Preferred delivery date',
                  placeholder: "Or 'ASAP'",
                },
                {
                  name: 'message',
                  label: 'Personal message on the voucher',
                  type: 'textarea',
                  placeholder: 'A short note to the recipient...',
                },
                {
                  name: 'notes',
                  label: 'Occasion / notes for us',
                  type: 'textarea',
                  placeholder:
                    'Birthday, anniversary, thank-you gift, or anything we should know...',
                },
              ]}
            />
          </div>
        </Container>
      </section>

      {data.sectionOutro && primaryCta && (
        <PageFinalCta
          title={data.sectionOutro.title}
          titleEmphasis={data.sectionOutro.titleAccent ?? undefined}
          subtitle={data.sectionOutro.description ?? undefined}
          primaryCta={
            primaryCta.action === 'link' && !primaryCta.href?.startsWith('http')
              ? { label: primaryCta.label, action: 'link', href: orderUrl }
              : primaryCta
          }
          secondaryCta={secondaryCta ?? undefined}
          borderTop
        />
      )}
    </div>
  );
};

export default Vouchers;
