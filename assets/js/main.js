// Sticky header with scroll state
const header = document.querySelector('.site-header');
let lastY = 0;
function onScroll() {
  const y = window.scrollY;
  if (header) header.classList.toggle('scrolled', y > 24);
  lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
}

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const src = item.getAttribute('href') || item.dataset.lightbox;
    if (lightboxImg && src) {
      lightboxImg.src = src;
      lightbox.classList.add('open');
    }
  });
});
if (lightbox) {
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
    if (lightboxImg) lightboxImg.src = '';
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox?.classList.contains('open')) {
    lightbox.classList.remove('open');
  }
});

// Gallery filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
