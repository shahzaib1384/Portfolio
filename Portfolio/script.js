/* ============================================================
   SHAHZAIB HAIDER PORTFOLIO — SCRIPT.JS
   Handles: loader, particles, typing, scroll, tilt,
            filter, stats counter, form, reveal animations
   ============================================================ */

'use strict';

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  document.body.classList.add('loading');

  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    // Kick off hero entry animations
    document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
    startCounters();
  }, 2000);
});

/* ===== SCROLL PROGRESS BAR ===== */
window.addEventListener('scroll', () => {
  const scrollTop    = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress     = (scrollTop / scrollHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});

/* ===== NAVBAR: scroll state + active link ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky style
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    const offsetTop = section.offsetTop - 120;
    if (window.scrollY >= offsetTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ===== HAMBURGER MENU ===== */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// Close on nav-link click
mobileMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

/* ===== HERO CANVAS — NEURAL NETWORK PARTICLES ===== */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const ctx    = canvas.getContext('2d');

  let W, H, particles, animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r:  Math.random() * 1.8 + 0.5,
        // Color: blue or cyan or purple
        hue: [200, 210, 220][Math.floor(Math.random() * 3)],
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxD = 130;

        if (dist < maxD) {
          const opacity = (1 - dist / maxD) * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 123, 255, ${opacity})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.7)`;
      ctx.fill();

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  createParticles(100);
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    createParticles(100);
    draw();
  });
})();

/* ===== TYPING EFFECT ===== */
(function initTyping() {
  const el     = document.getElementById('typed-text');
  const phrases = [
    'ML & deep learning',
    'NLP & privacy tooling',
    'Computer vision (ViT / CNN)',
    'Full-stack (React / FastAPI)',
    'LSTM forecasting',
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;
  const speed   = { type: 80, delete: 40, pause: 2000 };

  function type() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, speed.pause);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? speed.delete : speed.type);
  }

  setTimeout(type, 1000);
})();

/* ===== SCROLL REVEAL ===== */
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate skill bars when skills section is visible
        if (entry.target.classList.contains('skill-category')) {
          animateSkillBars(entry.target);
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    // Skip hero (animated on load)
    if (!el.closest('#hero')) observer.observe(el);
  });
})();

/* ===== SKILL BAR ANIMATION ===== */
function animateSkillBars(container) {
  container.querySelectorAll('.skill-fill').forEach(fill => {
    const target = fill.dataset.width;
    setTimeout(() => {
      fill.style.width = target + '%';
    }, 200);
  });
}

/* ===== STATS COUNTER ===== */
function startCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target   = parseInt(el.dataset.target);
    const duration = 1600;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  });
}

/* ===== PROJECT FILTER ===== */
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cats = card.dataset.cat || '';
        const show = filter === 'all' || cats.includes(filter);

        if (show) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

/* ===== 3D TILT EFFECT ===== */
(function initTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  const MAX = 10; // max degrees

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const mouseX = e.clientX - cx;
      const mouseY = e.clientY - cy;

      const rotateX = -(mouseY / (rect.height / 2)) * MAX;
      const rotateY =  (mouseX / (rect.width  / 2)) * MAX;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ===== MOVING GLOW ON PROJECT CARDS ===== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    const glow = card.querySelector('.project-card-glow');
    if (glow) {
      glow.style.left = (x - 100) + 'px';
      glow.style.top  = (y - 100) + 'px';
    }
  });
});

/* ===== CONTACT FORM → shahzaib1384@gmail.com (FormSubmit AJAX) ===== */
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const form    = this;
  const btn     = document.getElementById('contact-submit');
  const label   = btn.querySelector('.btn-submit-label');
  const success = document.getElementById('form-success');
  const errBox  = document.getElementById('form-error');

  success.classList.remove('show');
  errBox.classList.remove('show');
  errBox.textContent = '';

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !subject || !message) {
    errBox.textContent = 'Please fill in all fields.';
    errBox.classList.add('show');
    return;
  }

  const honey = form.querySelector('input[name="_honey"]');
  if (honey && honey.value) {
    return;
  }

  const payload = {
    name,
    email,
    subject,
    message,
    _subject: `[Portfolio] ${subject}`,
    _replyto: email,
    _template: 'table',
  };

  btn.disabled = true;
  if (label) label.textContent = 'Sending…';
  const icon = btn.querySelector('i');
  if (icon) icon.className = 'ri-loader-4-line';

  fetch(form.action, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(function (res) {
      return res.text().then(function (text) {
        var data = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch (e) {
          if (!res.ok) throw new Error('Could not send the message. Please try again.');
        }
        if (!res.ok) {
          throw new Error(data.message || data.error || 'Request failed');
        }
        if (data.success === false) {
          throw new Error(data.message || 'Could not send the message.');
        }
        return data;
      });
    })
    .then(function () {
      success.classList.add('show');
      form.reset();
      setTimeout(function () {
        success.classList.remove('show');
      }, 8000);
    })
    .catch(function (err) {
      errBox.textContent =
        err.message ||
        'Could not send right now. Email me at shahzaib1384@gmail.com or try again in a moment.';
      errBox.classList.add('show');
    })
    .finally(function () {
      btn.disabled = false;
      if (label) label.textContent = 'Send Message';
      if (icon) icon.className = 'ri-send-plane-2-line';
    });
});

/* ===== SMOOTH SCROLL for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== PARALLAX (optional decorative orbs) ===== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const speed = 0.05 + i * 0.03;
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

/* ===== INJECT FADE-IN KEYFRAME ===== */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: none; }
  }
`;
document.head.appendChild(style);
