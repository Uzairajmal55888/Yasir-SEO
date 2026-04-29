// ============================================================
//  YASIR SEO — script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR SCROLL EFFECT ─────────────────────────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    backTopVisible();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 2. HAMBURGER MENU ───────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
  });
  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) navMenu.classList.remove('open');
  });

  /* ── 3. ACTIVE NAV LINK (highlight on scroll) ────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav-menu a[href^="#"]');
  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY + 120 >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
  const navStyle = document.createElement('style');
  navStyle.textContent = `#nav-menu a.active { color: var(--gold) !important; }`;
  document.head.appendChild(navStyle);

  /* ── 4. SCROLL-TRIGGERED ANIMATIONS (custom AOS) ─────── */
  const aosEls = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => entry.target.classList.add('aos-in'), parseInt(delay));
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  aosEls.forEach(el => aosObserver.observe(el));

  /* ── 5. COUNT-UP ANIMATION ───────────────────────────── */
  const countEls = document.querySelectorAll('.stat-num[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => countObserver.observe(el));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out-expo
      const eased = 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
  }

  /* ── 6. BACK TO TOP BUTTON ───────────────────────────── */
  const backTop = document.getElementById('back-top');
  function backTopVisible() {
    if (window.scrollY > 400) {
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('visible');
    }
  }
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 7. SMOOTH SCROLL for anchor links ───────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 8. CONTACT FORM HANDLER ─────────────────────────── */
  window.handleFormSubmit = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Simulate async (replace with actual email service / Formspree / EmailJS)
    setTimeout(() => {
      btn.textContent = '✅ Message Sent!';
      success.style.display = 'block';
      e.target.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message 🚀';
        btn.disabled = false;
        success.style.display = 'none';
      }, 5000);
    }, 1500);
  };

  /* ── 9. HERO CARD FLOAT ANIMATION ────────────────────── */
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    let t = 0;
    const floatCard = () => {
      t += 0.015;
      heroCard.style.transform = `translateY(${Math.sin(t) * 8}px)`;
      requestAnimationFrame(floatCard);
    };
    floatCard();
  }

  /* ── 10. CURSOR GLOW (desktop only) ──────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
      #cursor-glow {
        position: fixed;
        width: 320px; height: 320px;
        background: radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 0;
        transition: opacity 0.3s;
      }
    `;
    document.head.appendChild(glowStyle);
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

});
