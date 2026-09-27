/* =============================================
   SELVAMANI M — PREMIUM PORTFOLIO JAVASCRIPT
   ============================================= */

'use strict';

// ========== NORMAL INSTANT PAGE OPEN ==========
window.addEventListener('DOMContentLoaded', () => {
  initAllAnimations();
});

// ========== MOUSE GLOW & CURSOR ==========
const mouseGlow = document.getElementById('mouse-glow');
const cursorDot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouseGlow.style.left = mouseX + 'px';
  mouseGlow.style.top = mouseY + 'px';
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

document.addEventListener('mousedown', () => {
  cursorDot.style.transform = 'translate(-50%, -50%) scale(1.8)';
  cursorDot.style.opacity = '0.6';
});
document.addEventListener('mouseup', () => {
  cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
  cursorDot.style.opacity = '1';
});

// Hide on mobile
if ('ontouchstart' in window) {
  if (mouseGlow) mouseGlow.style.display = 'none';
  if (cursorDot) cursorDot.style.display = 'none';
}

// ========== PARTICLES ==========
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;

  const COLORS = ['#DB9558', '#97A87A', '#A8BBA3', '#c47e42'];
  const particles = [];
  const COUNT = Math.min(50, Math.floor(W / 25));

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.4 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    // Draw connection lines
    particles.forEach((p, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = '#97A87A';
          ctx.globalAlpha = (1 - dist / 120) * 0.18;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    });

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
  });
}

// ========== NAVBAR ==========
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky nav style
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top
    if (scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }

    // Active nav highlight
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 120;
      if (scrollY >= top) current = s.getAttribute('id');
    });
    navLinkItems.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  });

  // Hamburger menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close nav on link click
  navLinkItems.forEach(l => {
    l.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
  const mobileResume = document.querySelector('.nav-mobile-resume');
  if (mobileResume) {
    mobileResume.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  }

  // Back to top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========== TYPING ANIMATION ==========
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const words = [
    'SEO Expert',
    'Digital Marketing Executive',
    'Technical SEO Specialist',
    'Performance Marketer',
    'Content Strategist'
  ];
  let wordIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const word = words[wordIdx];
    if (isDeleting) {
      el.textContent = word.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = word.substring(0, charIdx + 1);
      charIdx++;
    }

    if (!isDeleting && charIdx === word.length) {
      setTimeout(() => { isDeleting = true; }, 1600);
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }

    const speed = isDeleting ? 60 : 100;
    setTimeout(type, speed);
  }
  type();
}

// ========== SCROLL REVEAL ==========
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(() => el.classList.add('revealed'), delay);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ========== ANIMATED COUNTERS ==========
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
  let start = 0;
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    start = Math.floor(eased * target);
    el.textContent = start;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

// ========== SKILL BARS ==========
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const width = entry.target.dataset.width;
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 200);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => observer.observe(f));
}

// ========== PROJECT MODALS ==========
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(event, id) {
  if (event.target === event.currentTarget) {
    closeModalBtn(id);
  }
}

function closeModalBtn(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ========== MAGNETIC BUTTONS ==========
function initMagneticButtons() {
  if ('ontouchstart' in window) return;
  const btns = document.querySelectorAll('.magnetic-btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ========== RIPPLE EFFECT ==========
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ========== CONTACT FORM WITH STRICT VALIDATION & 24H RESPONSE MODAL ==========
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput    = document.getElementById('cf-name');
  const emailInput   = document.getElementById('cf-email');
  const phoneInput   = document.getElementById('cf-phone');
  const messageInput = document.getElementById('cf-message');
  const submitBtn    = form.querySelector('.form-submit');

  const nameError    = document.getElementById('name-error');
  const emailError   = document.getElementById('email-error');
  const phoneError   = document.getElementById('phone-error');
  const messageError = document.getElementById('message-error');

  const fgName    = document.getElementById('fg-name');
  const fgEmail   = document.getElementById('fg-email');
  const fgPhone   = document.getElementById('fg-phone');
  const fgMessage = document.getElementById('fg-message');

  function setError(group, errEl, message) {
    if (group) group.classList.add('has-error');
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('show');
    }
  }

  function clearError(group, errEl) {
    if (group) group.classList.remove('has-error');
    if (errEl) {
      errEl.classList.remove('show');
    }
  }

  // 1. Name: ONLY LETTERS & SPACES (strictly blocks numbers from being typed)
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      const cleaned = e.target.value.replace(/[0-9]/g, '');
      if (e.target.value !== cleaned) {
        e.target.value = cleaned;
      }
      clearError(fgName, nameError);
    });
  }

  // 2. Email: clear validation on type
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      clearError(fgEmail, emailError);
    });
  }

  // 3. Phone: ONLY NUMBERS (strictly blocks words, alphabets, and symbols other than +)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      const cleaned = e.target.value.replace(/[^0-9+\s\-]/g, '');
      if (e.target.value !== cleaned) {
        e.target.value = cleaned;
      }
      clearError(fgPhone, phoneError);
    });
  }

  // 4. Message: clear error on type
  if (messageInput) {
    messageInput.addEventListener('input', () => {
      clearError(fgMessage, messageError);
    });
  }

  // Thank You modal listeners
  const tyCloseBtn = document.getElementById('thankyou-close');
  const tyOkBtn    = document.getElementById('ty-ok-btn');
  const tyModal    = document.getElementById('thankyou-modal');

  if (tyCloseBtn) tyCloseBtn.addEventListener('click', () => closeModalBtn('thankyou-modal'));
  if (tyOkBtn) tyOkBtn.addEventListener('click', () => closeModalBtn('thankyou-modal'));
  if (tyModal) {
    tyModal.addEventListener('click', (e) => {
      if (e.target === tyModal) closeModalBtn('thankyou-modal');
    });
  }

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name (letters only, min 2 characters)
    const nameVal = (nameInput ? nameInput.value.trim() : '');
    if (!nameVal || nameVal.length < 2) {
      setError(fgName, nameError, 'Please enter your name using letters only (numbers are not allowed).');
      isValid = false;
    } else if (/[0-9]/.test(nameVal)) {
      setError(fgName, nameError, 'Numbers are not allowed in name. Please use letters only.');
      isValid = false;
    } else {
      clearError(fgName, nameError);
    }

    // Validate Email (must contain @ and valid domain)
    const emailVal = (emailInput ? emailInput.value.trim() : '');
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailVal || !emailRegex.test(emailVal) || !emailVal.includes('@')) {
      setError(fgEmail, emailError, "Please enter a valid email address with '@' (e.g. name@example.com).");
      isValid = false;
    } else {
      clearError(fgEmail, emailError);
    }

    // Validate Phone (digits only, at least 10 numbers)
    const phoneVal = (phoneInput ? phoneInput.value.trim() : '');
    const phoneDigits = phoneVal.replace(/\D/g, '');
    if (!phoneVal || phoneDigits.length < 10) {
      setError(fgPhone, phoneError, 'Please enter a valid phone number using numbers only (at least 10 digits).');
      isValid = false;
    } else if (/[a-zA-Z]/.test(phoneVal)) {
      setError(fgPhone, phoneError, 'Words and letters are not allowed in phone number.');
      isValid = false;
    } else {
      clearError(fgPhone, phoneError);
    }

    // Validate Message
    const messageVal = (messageInput ? messageInput.value.trim() : '');
    if (!messageVal || messageVal.length < 5) {
      setError(fgMessage, messageError, 'Please enter your message (minimum 5 characters).');
      isValid = false;
    } else {
      clearError(fgMessage, messageError);
    }

    if (!isValid) {
      const firstError = form.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Disable button & show spinner
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
      submitBtn.disabled = true;
    }

    // Send data to selvamani444r@gmail.com
    fetch('https://formsubmit.co/ajax/selvamani444r@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        Name: nameVal,
        Email: emailVal,
        Phone: phoneVal,
        Message: messageVal,
        _subject: `New Portfolio Inquiry from ${nameVal}`,
        _replyto: emailVal,
        _template: 'table'
      })
    }).catch((err) => {
      console.log('Delivery notice:', err);
    });

    // Also send via EmailJS if available
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: nameVal,
        reply_to: emailVal,
        phone: phoneVal,
        message: messageVal,
        to_email: 'selvamani444r@gmail.com'
      }).catch(err => console.log('EmailJS notice:', err));
    }

    // Reset button & form, then show Thank You Modal
    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
      }
      openModal('thankyou-modal');
    }, 600);
  });
}

function mailtoFallback(name, email, phone, message) {
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body    = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
  );
  window.location.href = `mailto:selvamani444r@gmail.com?subject=${subject}&body=${body}`;
}

// ========== PROCESS STEPS PARALLAX ==========
function initProcessParallax() {
  const steps = document.querySelectorAll('.process-step');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.2 });
  steps.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateX(-30px)';
    s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(s);
  });
}

// ========== PARALLAX HERO ==========
function initParallax() {
  const hero = document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content');
  if (!hero || !heroContent || 'ontouchstart' in window) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  });
}

// ========== TOOL CARDS STAGGER ==========
function initToolCards() {
  const cards = document.querySelectorAll('.tool-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, idx * 80);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(c => observer.observe(c));
}

// ========== GRADIENT BORDER ROTATION ==========
function initRotatingBorders() {
  let angle = 0;
  function animate() {
    angle += 0.5;
    document.querySelectorAll('.timeline-card.current').forEach(card => {
      card.style.background = `white`;
      card.style.boxShadow = `
        0 0 30px rgba(99,102,241,0.12),
        0 8px 24px rgba(99,102,241,0.08)
      `;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ========== SERVICE CARD TILT ==========
function initCardTilt() {
  if ('ontouchstart' in window) return;
  document.querySelectorAll('.service-card, .why-card, .achievement-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ========== NAV ACTIONS — HIRE BUTTON ==========
function initNavHireVisibility() {
  const btnHire = document.querySelector('.nav-actions .btn-hire');
  if (!btnHire) return;

  function update() {
    if (window.innerWidth > 900) {
      btnHire.style.display = 'inline-flex';
    } else {
      btnHire.style.display = 'none';
    }
  }

  update();
  window.addEventListener('resize', update);
  window.addEventListener('scroll', update);
}

// ========== ACTIVE SECTION HIGHLIGHT ==========
function initActiveHighlight() {
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkItems.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === '#' + entry.target.id) {
            l.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

// ========== STAT CARD HOVER ==========
function initStatHover() {
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.background = 'linear-gradient(135deg, rgba(99,102,241,0.04), rgba(124,58,237,0.04))';
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
}

// ========== HERO GLOW FOLLOW ==========
function initHeroGlowFollow() {
  const hero = document.querySelector('.hero-section');
  if (!hero || 'ontouchstart' in window) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.background = `
      radial-gradient(ellipse 50% 50% at ${x}% ${y}%, rgba(99,102,241,0.1), transparent 70%),
      #fff
    `;
  });
  hero.addEventListener('mouseleave', () => {
    hero.style.background = '';
  });
}

// ========== FLOATING ICONS MOUSE INTERACTION ==========
function initFloatingIconsInteraction() {
  const icons = document.querySelectorAll('.fi');
  if ('ontouchstart' in window) return;

  document.addEventListener('mousemove', (e) => {
    icons.forEach((icon, i) => {
      const speed = (i % 3 + 1) * 0.005;
      const dx = (e.clientX - window.innerWidth / 2) * speed;
      const dy = (e.clientY - window.innerHeight / 2) * speed;
      icon.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  });
}

// ========== NUMBERS PULSE ON HOVER ==========
function initStatPulse() {
  document.querySelectorAll('.stat-num').forEach(num => {
    const parent = num.closest('.stat-card');
    if (!parent) return;
    parent.addEventListener('mouseenter', () => {
      num.style.transition = 'transform 0.3s ease';
      num.style.transform = 'scale(1.15)';
    });
    parent.addEventListener('mouseleave', () => {
      num.style.transform = 'scale(1)';
    });
  });
}

// ========== PROJECT CARD IMAGE ZOOM ==========
function initProjectZoom() {
  document.querySelectorAll('.project-card').forEach(card => {
    const img = card.querySelector('.pc-image');
    if (!img) return;
    card.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.04)';
      img.style.transition = 'transform 0.4s ease';
    });
    card.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
}

// ========== HEADER SECTION ANIMATED GRADIENT ==========
function initSectionHeaderAnimation() {
  const lines = document.querySelectorAll('.section-line');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = '60px';
        entry.target.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    });
  }, { threshold: 0.5 });
  lines.forEach(l => {
    l.style.width = '0';
    observer.observe(l);
  });
}

// ========== CONTACT FORM INPUT EFFECTS ==========
function initFormEffects() {
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
      const label = input.nextElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.style.color = '#DB9558';
      }
    });
    input.addEventListener('blur', () => {
      const label = input.nextElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.style.color = '';
      }
    });
  });
}

// ========== PAGE TRANSITION ==========
function initPageTransition() {
  // Normal clean instantaneous transitions without blocking loaders
}

// ========== SCROLL PROGRESS BAR ==========
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:3px; width:0%;
    background:linear-gradient(90deg,#DB9558,#97A87A,#A8BBA3);
    z-index:10001; transition:width 0.1s;
    pointer-events:none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docH) * 100;
    bar.style.width = scrolled + '%';
  });
}

// ========== FOOTER LINK ACTIVE ==========
function initFooterLinks() {
  document.querySelectorAll('.footer-links-col a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========== SKILL CARD GLOW ==========
function initSkillGlow() {
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(99,102,241,0.06), white 70%)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
}

// ========== EDUCATION CARD ENTER ==========
function initEduCards() {
  const cards = document.querySelectorAll('.edu-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, idx * 150);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(c => observer.observe(c));
}

// ========== READ MORE TOGGLES ==========
function initReadMoreToggles() {
  document.querySelectorAll('.read-more-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSelector = btn.getAttribute('data-target');
      const container = document.querySelector(targetSelector);
      if (!container) return;

      const isMobile = window.innerWidth <= 768;
      const isExpanded = btn.classList.contains('expanded');

      if (!isExpanded) {
        // Reveal standard hidden items
        container.querySelectorAll('.item-hidden').forEach(item => {
          item.classList.remove('item-hidden');
          item.classList.add('item-revealed');
        });

        // Reveal mobile-specific hidden items
        container.querySelectorAll('.item-hidden-mobile').forEach(item => {
          item.classList.remove('item-hidden-mobile');
          item.classList.add('item-revealed-mobile');
        });

        // Trigger skill bars if in skills
        if (targetSelector === '#skills') {
          container.querySelectorAll('.skill-fill').forEach(bar => {
            const width = bar.dataset.width;
            bar.style.width = width + '%';
          });
        }

        btn.classList.add('expanded');
        btn.querySelector('i').className = 'fas fa-minus';
        btn.querySelector('span').textContent = 'Show Less';
      } else {
        // Hide standard items
        container.querySelectorAll('.item-revealed').forEach(item => {
          item.classList.remove('item-revealed');
          item.classList.add('item-hidden');
        });

        // Hide mobile-specific items
        container.querySelectorAll('.item-revealed-mobile').forEach(item => {
          item.classList.remove('item-revealed-mobile');
          item.classList.add('item-hidden-mobile');
        });

        btn.classList.remove('expanded');
        btn.querySelector('i').className = 'fas fa-plus';
        const sectionName = targetSelector.replace('#', '');
        btn.querySelector('span').textContent = `Read More ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`;
      }
    });
  });
}

// ========== INIT ALL ==========
function initAllAnimations() {
  initParticles();
  initNavbar();
  initTyping();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initMagneticButtons();
  initRipple();
  initContactForm();
  initProcessParallax();
  initParallax();
  initRotatingBorders();
  initCardTilt();
  initActiveHighlight();
  initStatHover();
  initHeroGlowFollow();
  initFloatingIconsInteraction();
  initStatPulse();
  initProjectZoom();
  initSectionHeaderAnimation();
  initFormEffects();
  initPageTransition();
  initScrollProgress();
  initFooterLinks();
  initSkillGlow();
  initEduCards();
  initNavHireVisibility();
  initReadMoreToggles();
}

// Expose global modal functions
window.openModal = openModal;
window.closeModal = closeModal;
window.closeModalBtn = closeModalBtn;
