function initReveal() {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: '-100px' }
  );

  elements.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);
document.addEventListener('astro:page-load', initReveal);
