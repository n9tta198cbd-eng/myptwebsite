/* Единая точка регистрации GSAP-плагинов.
   ScrollTrigger входит в основной пакет gsap и бесплатен с 3.13. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// registerPlugin идемпотентен — повторные вызовы безопасны.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
