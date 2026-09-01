function initGalleries() {
  document.querySelectorAll<HTMLElement>('.js-gallery').forEach((root) => {
    if (root.dataset.galleryInit) return;
    root.dataset.galleryInit = 'true';

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-gallery-item]'));
    const lightbox = root.querySelector<HTMLElement>('.js-gallery-lightbox');
    const image = root.querySelector<HTMLImageElement>('.js-gallery-image');
    const closeBtn = root.querySelector<HTMLElement>('.js-gallery-close');
    const prevBtn = root.querySelector<HTMLElement>('.js-gallery-prev');
    const nextBtn = root.querySelector<HTMLElement>('.js-gallery-next');
    if (!lightbox || !image || items.length === 0) return;

    let current = 0;

    const show = (index: number) => {
      current = (index + items.length) % items.length;
      const item = items[current];
      image.src = item.dataset.src ?? '';
      image.alt = item.dataset.alt ?? '';
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = '';
    };

    items.forEach((item, i) => {
      item.addEventListener('click', () => show(i));
    });

    closeBtn?.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      show(current - 1);
    });
    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      show(current + 1);
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('hidden')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  });
}

document.addEventListener('DOMContentLoaded', initGalleries);
document.addEventListener('astro:page-load', initGalleries);
