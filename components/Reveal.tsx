'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = { children: ReactNode; className?: string; delay?: number; y?: number };

/** Framer Motion scroll reveal – fades & lifts content once it enters the viewport. */
export default function Reveal({ children, className, delay = 0, y = 48 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
