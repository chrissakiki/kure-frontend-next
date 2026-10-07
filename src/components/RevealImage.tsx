'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../utils/cn';

type RevealImageProps = {
  src: string;
  alt: string;
  imgClassName?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Reserves layout with a muted placeholder, then fades in the image
 * and any overlay children together — so text never appears before the photo.
 */
const RevealImage = ({
  src,
  alt,
  imgClassName,
  className,
  children,
}: RevealImageProps) => {
  const [seenSrc, setSeenSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  if (src !== seenSrc) {
    setSeenSrc(src);
    setLoaded(false);
  }

  return (
    <div className={cn('relative overflow-hidden bg-theme-sage', className)}>
      <img
        ref={(node) => {
          if (node?.complete && node.naturalWidth > 0) setLoaded(true);
        }}
        src={src}
        alt={alt}
        loading='lazy'
        decoding='async'
        onLoad={() => setLoaded(true)}
        className={cn(
          'transition-opacity duration-500 ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName
        )}
      />
      {children != null && (
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-500 ease-out',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden={!loaded}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default RevealImage;
