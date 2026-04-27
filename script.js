// ─── 1. MOBILE MENU TOGGLE ────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── 2. SMOOTH SCROLL FOR NAV LINKS ──────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── 3. STICKY NAVBAR ON SCROLL ──────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ─── 4. BUTTON HOVER RIPPLE ANIMATION ────────────
document.querySelectorAll('.btn-primary, .btn-cta').forEach(btn => {
  btn.addEventListener('mousedown', function (e) {
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height) * 1.5;
    const x    = e.clientX - rect.left - size / 2;
    const y    = e.clientY - rect.top  - size / 2;

    Object.assign(ripple.style, {
      position:   'absolute',
      width:      size + 'px',
      height:     size + 'px',
      left:       x + 'px',
      top:        y + 'px',
      background: 'rgba(255,255,255,0.18)',
      borderRadius: '50%',
      transform:  'scale(0)',
      pointerEvents: 'none',
      animation:  'ripple 0.55s ease-out forwards',
    });

    // Ensure parent is positioned for ripple containment
    if (getComputedStyle(this).position === 'static') {
      this.style.position = 'relative';
    }
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// Inject ripple keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: scale(1); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ─── 5. FADE-IN HERO CONTENT ON PAGE LOAD ─────────
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Slight delay so animation fires after page paint
window.addEventListener('load', () => {
  setTimeout(() => {
    fadeEls.forEach(el => observer.observe(el));
  }, 100);
});