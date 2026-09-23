'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';

/** Matted "plate" photograph with a GSAP scroll-scrubbed zoom. */
export default function ZoomImage({ src, alt, position = '50% 50%' }: { src: string; alt: string; position?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.plate__zoom',
        { scale: 1.15 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    },
    { scope: ref },
  );

  return (
    <div className="plate-frame" ref={ref}>
      <div className="plate__zoom">
        <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 50vw" className="plate" style={{ objectFit: 'cover', objectPosition: position }} />
      </div>
    </div>
  );
}
