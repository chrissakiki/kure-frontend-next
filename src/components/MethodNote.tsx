import { useMemo, type ReactNode } from 'react';
import BrandMark from './BrandMark';
import { cn } from '../utils/cn';

type MethodNoteProps = {
  html: string;
  className?: string;
};

const cleanHtml = (html: string) => html.replace(/◆\s*/g, '').trim();

const inlineHtml = (html: string) => ({ __html: html });

/** Academy method note — shield for IP heading, ban for prohibitions. */
const MethodNote = ({ html, className }: MethodNoteProps) => {
  const blocks = useMemo(() => {
    if (typeof DOMParser === 'undefined') return [] as ReactNode[];

    const doc = new DOMParser().parseFromString(cleanHtml(html), 'text/html');
    const nodes: ReactNode[] = [];

    Array.from(doc.body.children).forEach((el, index) => {
      const tag = el.tagName.toLowerCase();

      if (tag === 'ul') {
        nodes.push(
          <ul key={`ul-${index}`} className='mb-4 list-none space-y-2.5 p-0'>
            {Array.from(el.querySelectorAll('li')).map((li, liIndex) => (
              <li
                key={`li-${index}-${liIndex}`}
                className='flex items-center gap-2.5 text-theme-primary'
              >
                <BrandMark variant='ban' className='text-[16px]' />
                <span>{li.textContent}</span>
              </li>
            ))}
          </ul>
        );
        return;
      }

      if (tag === 'p') {
        const isHeading =
          index === 0 || el.classList.contains('method-heading');
        const inner = el.innerHTML;

        if (isHeading) {
          nodes.push(
            <p
              key={`p-${index}`}
              className='mb-4 flex items-center gap-2.5 text-theme-primary'
            >
              <BrandMark variant='shield' className='text-[18px]' />
              <span dangerouslySetInnerHTML={inlineHtml(inner)} />
            </p>
          );
          return;
        }

        nodes.push(
          <p
            key={`p-${index}`}
            className='mb-4 last:mb-0'
            dangerouslySetInnerHTML={inlineHtml(inner)}
          />
        );
      }
    });

    return nodes;
  }, [html]);

  return (
    <div
      className={cn(
        'rounded border border-brand/20 bg-theme-sage p-8 text-left text-[15px] leading-relaxed text-theme-secondary [&_strong]:text-theme-primary',
        className
      )}
    >
      {blocks}
    </div>
  );
};

export default MethodNote;
