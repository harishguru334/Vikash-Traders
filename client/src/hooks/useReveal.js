import { useEffect } from 'react';

/**
 * One observer for the whole page. Elements with .reveal fade in once.
 * Pass a changing `dep` (e.g. how many products have loaded) so sections
 * rendered after the first paint get observed too.
 * Anyone with reduced motion turned on simply sees everything already visible.
 */
export default function useReveal(dep) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = document.querySelectorAll('.reveal:not(.is-visible)');

    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px' }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [dep]);
}
