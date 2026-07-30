window.addEventListener('DOMContentLoaded', () => {
  // Show intro for 2.5 seconds (2500 milliseconds) then fade out
  setTimeout(() => {
    const introScreen = document.getElementById('intro-screen');
    if (introScreen) {
      introScreen.classList.add('fade-out');
    }
  }, 2500); 
});
// ── Mobile menu ──
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    menuBtn.classList.add('open');
    navLinks.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menuBtn.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  menuBtn.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });
  navOverlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ── Scroll reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // ── Skill bars ──
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('#skills').forEach(el => barObserver.observe(el));

  // ── Counter animation ──
  function animateCount(el, target) {
    let count = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { count = target; clearInterval(timer); }
      el.textContent = Math.floor(count) + '+';
    }, 40);
  }
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          animateCount(el, parseInt(el.dataset.count));
        });
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('#home').forEach(el => countObserver.observe(el));

  // ── Send message ──
  function handleSend() {
    const btn = document.querySelector('#contact .btn-primary');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#10b981';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; }, 3000);
  }

  // ── Nav active state ──
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    allNavLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--pink)' : '';
    });
  });