'use client';

import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';
import type { Case } from '@/content/cases';
import type { WorksBlock } from '@/content/types';
import CaseModal from '../CaseModal';
import TarotCard from '../TarotCard';
import Section from './Section';

/* Карты «раздаются» каскадом снизу, stagger 0.08s. */
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* Кейсы уже отобраны и переведены на сервере (pickCases) — сюда приходит готовый список. */
export default function Works({
  block,
  id,
  label,
  cases,
}: {
  block: WorksBlock;
  id: string;
  label: string;
  cases: Case[];
}) {
  const [active, setActive] = useState<Case | null>(null);

  return (
    <Section id={id} label={label} heading={block.heading} lead={block.lead}>
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={gridVariants}
        className="mx-auto grid max-w-[1080px] grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3"
      >
        {cases.map((item) => (
          <li key={item.id}>
            <TarotCard item={item} onOpen={() => setActive(item)} />
          </li>
        ))}
      </motion.ul>

      <CaseModal item={active} onClose={() => setActive(null)} />
    </Section>
  );
}
