function initCounters() {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]:not(.is-counted)');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-counted');
        const target = Number(el.dataset.counter ?? '0');
        const suffix = el.dataset.counterSuffix ?? '';
        el.textContent = `${target}${suffix}`;
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
        obs.unobserve(el);
      }
    },
    { threshold: 0.3 }
  );

  counters.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initCounters);
document.addEventListener('astro:page-load', initCounters);
