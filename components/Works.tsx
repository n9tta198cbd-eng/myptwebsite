'use client';

import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';
import { cases, type Case } from '@/lib/cases';
import CaseModal from './CaseModal';
import TarotCard from './TarotCard';
import Divider from './ornaments/Divider';
import DrawnOrnament from './ui/DrawnOrnament';
import ScrambleHeading from './ui/ScrambleHeading';

/* Карты «раздаются» каскадом снизу, stagger 0.08s. */
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Works() {
  const [active, setActive] = useState<Case | null>(null);

  return (
    <section id="works" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <header className="flex flex-col items-center text-center">
          <span className="label text-blood">N° 01 — 06</span>
          <ScrambleHeading
            text="Работы"
            className="mt-3 font-antiqua text-section leading-[0.95]"
          />
        </header>

        <DrawnOrnament className="mt-10 flex justify-center">
          <Divider />
        </DrawnOrnament>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
          className="mx-auto mt-14 grid max-w-[1080px] grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3"
        >
          {cases.map((item) => (
            <li key={item.id}>
              <TarotCard item={item} onOpen={() => setActive(item)} />
            </li>
          ))}
        </motion.ul>
      </div>

      <CaseModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}
