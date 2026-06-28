// HermesPacks storefront interactions
// Keep content visible by default. Animations must never hide product cards if IntersectionObserver fails.

// Smooth scroll for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const selector = this.getAttribute('href');
    const target = selector && document.querySelector(selector);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.pageYOffset > 100
      ? '0 4px 20px rgba(0,0,0,0.3)'
      : 'none';
  }, { passive: true });
}

// Progressive enhancement: fade content in only by adding classes, never by hiding inline.
const revealTargets = document.querySelectorAll('.product-card, .step-card, .faq-item, .testimonial-card');
revealTargets.forEach(el => el.classList.add('is-visible'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => observer.observe(el));
}

// All Access hover glow
const allAccessCard = document.querySelector('.all-access');
if (allAccessCard) {
  allAccessCard.addEventListener('mouseenter', () => {
    allAccessCard.style.boxShadow = '0 0 40px rgba(245, 158, 11, 0.3)';
  });
  allAccessCard.addEventListener('mouseleave', () => {
    allAccessCard.style.boxShadow = '';
  });
}

// Button ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn { position: relative; overflow: hidden; }
  .btn .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: hp-ripple 0.6s ease-out;
    background: rgba(255,255,255,0.3);
    pointer-events: none;
  }
  @keyframes hp-ripple { to { transform: scale(2); opacity: 0; } }
`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

console.log('HermesPacks storefront loaded');
