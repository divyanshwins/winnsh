// ============================================
// KAAFIDESIGNS — interactions
// ============================================

// ---------- CUSTOM CURSOR ----------
(function() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  function tick() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();

  const hoverSel = 'a, button, .service-cell, .creator-row, .principle, .svc-item, .work-card, .cta-block .big-link, .email-link, .copy-btn';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverSel)) document.body.classList.add('cursor-hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverSel) && !e.relatedTarget?.closest(hoverSel)) {
      document.body.classList.remove('cursor-hovering');
    }
  });
})();

// ---------- REVEAL ON SCROLL ----------
(function() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => io.observe(el));
})();

// ---------- COPY EMAIL ----------
(function() {
  const btn = document.querySelector('.copy-btn');
  if (!btn) return;
  const email = btn.dataset.email;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
      const original = btn.textContent;
      btn.textContent = 'COPIED ✓';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1800);
    });
  });
})();

// ---------- WORK PAGE FILTER ----------
(function() {
  const filterButtons = document.querySelectorAll('.creator-filter button');
  const cards = document.querySelectorAll('.work-card');
  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach((card, i) => {
        const match = filter === 'all' || card.dataset.creator === filter;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.style.animation = 'none';
          // Force reflow then re-apply animation
          void card.offsetWidth;
          card.style.animation = `cardIn 0.6s var(--ease-out) ${Math.min(i, 12) * 0.04}s both`;
        }
      });

      // Re-process IG embeds for any that became visible
      if (window.instgrm) window.instgrm.Embeds.process();
    });
  });
})();

// ---------- ACTIVE NAV LINK ----------
(function() {
  const links = document.querySelectorAll('.nav-links a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
