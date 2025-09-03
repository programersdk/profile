 // Mobile menu toggle
      (function () {
        const toggle = document.getElementById('menu-toggle');
        const header = document.querySelector('.site-header');
        const nav = document.getElementById('main-nav');

        function setExpanded(val) {
          toggle.setAttribute('aria-expanded', String(val));
          header.classList.toggle('nav-open', val);
        }

        toggle.addEventListener('click', function () {
          const expanded = toggle.getAttribute('aria-expanded') === 'true';
          setExpanded(!expanded);
        });

        // close mobile menu when a nav link is clicked
        nav.addEventListener('click', function (e) {
          if (e.target.tagName === 'A' && window.innerWidth <= 720) setExpanded(false);
        });

        // keep state in sync on resize
        window.addEventListener('resize', function () {
          if (window.innerWidth > 720) setExpanded(false);
        });
      })();

  // Header scroll: add subtle shadow when scrolled
  (function () {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let last = 0;
    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      if (y > 24) header.classList.add('scrolled'); else header.classList.remove('scrolled');
      last = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // Contact form handler (local validation, no network)
  (function () {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name').trim();
      const email = data.get('email').trim();
      const message = data.get('message').trim();

      if (!name || !email || !message) {
        status.hidden = false;
        status.textContent = 'Please fill in name, email and message.';
        status.style.color = '#b00020';
        return;
      }

      // Mock send
      status.hidden = false;
      status.style.color = '#000';
      status.textContent = 'Thanks — your message has been received (demo mode).';
      form.reset();

      setTimeout(() => {
        status.hidden = true;
        status.textContent = '';
      }, 4000);
    });
  })();

  // IntersectionObserver reveal for subtle entrance animations
  (function () {
    if (!('IntersectionObserver' in window)) return;

    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // apply revealed state
        el.classList.add('revealed');
        // stagger children if requested
        const children = el.querySelectorAll('.reveal[data-delay]');
        if (children.length) {
          children.forEach((c, i) => c.style.transitionDelay = (i * 80) + 'ms');
        }
        obs.unobserve(el);
      });
    }, { threshold: 0.12 });

    items.forEach(el => io.observe(el));
  })();