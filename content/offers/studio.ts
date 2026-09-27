import { LINKS, PERSONA } from '../profile';
import { definePage } from '../types';

/* Archetype: agency or studio abroad that needs an art director with AI pipelines.
   Language: English, calm and precise, focused on reliability and speed. */

export default definePage({
  slug: 'studio',
  lang: 'en',
  title: 'Art director for hire — N9TTA',
  description: 'Art direction, visual systems and custom AI pipelines for studios and agencies.',

  sections: [
    {
      type: 'hero',
      variant: 'statement',
      eyebrow: 'For studios and agencies',
      title: 'An art director who ships the pipeline, not just the moodboard.',
      lead: 'Concept, visual system and custom AI tooling in one person, with a studio team behind when the scope grows.',
      actions: [
        { label: 'Book a call', href: LINKS.telegram },
        { label: 'See work', href: '#works' },
      ],
    },

    {
      type: 'pain',
      heading: 'Sound familiar?',
      items: [
        { pain: 'Our AI output looks generic and inconsistent', answer: 'I build pipelines around the concept, not the other way round: 1000+ consistent 4K frames for a music video on a free API.' },
        { pain: 'We need senior direction, not another pair of hands', answer: 'Five years of art direction, currently leading Elysium Studio and the 32inches brand.' },
      ],
    },

    { type: 'works', nav: 'Work', heading: 'Selected work', cases: ['case-gazgolder', 'case-glebkostin', 'case-elysium'] },

    { ...PERSONA.en, nav: 'About' },

    {
      type: 'faq',
      heading: 'FAQ',
      items: [
        { q: 'Do you work remotely across time zones?', a: '[write] Your availability window.' },
        { q: 'How do you bill?', a: '[write] Hourly, per project or retainer.' },
      ],
    },
  ],

  contact: {
    label: 'Contact',
    heading: 'Tell me about the project',
    primary: { label: 'Message on Telegram', href: LINKS.telegram },
  },
});
