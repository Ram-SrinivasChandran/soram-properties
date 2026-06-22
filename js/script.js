/* ============================================================
   SWARNAM PROPERTIES — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar: scroll behaviour ── */
  const navbar   = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }
  });

  /* ── Mobile menu toggle ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  /* ── Back to top ── */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Smooth scroll for all internal anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* ── Stats counter animation ── */
  const runCounter = (el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = target / (duration / 16);
    let current    = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  };

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(runCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) statsObserver.observe(statsSection);

  /* ── Scroll-in fade animations ── */
  const animItems = document.querySelectorAll(
    '.property-card, .why-card, .testimonial-card, .stat-card, .about-grid, .contact-grid'
  );

  animItems.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${(i % 3) * 0.1}s, transform 0.55s ease ${(i % 3) * 0.1}s`;
  });

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animItems.forEach(el => fadeObserver.observe(el));

  /* ── Contact form submission ── */
  const contactForm  = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');

  /* Sign up free at formspree.io, create a form, and paste your endpoint here */
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykqydvo';

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name  = contactForm.querySelector('#name').value.trim();
      const phone = contactForm.querySelector('#phone').value.trim();

      if (!name || !phone) {
        alert('Please fill in your Name and Phone Number.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled  = true;

      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm)
      })
        .then(res => {
          if (!res.ok) throw new Error('Submission failed');
          contactForm.reset();
          formSuccess.classList.add('show');
          setTimeout(() => formSuccess.classList.remove('show'), 6000);
        })
        .catch(() => {
          alert('Sorry, something went wrong sending your enquiry. Please call us directly.');
        })
        .finally(() => {
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Enquiry';
          submitBtn.disabled  = false;
        });
    });
  }

});
