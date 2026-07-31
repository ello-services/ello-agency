// ============================================
// ELLO AGENCY - MAIN JAVASCRIPT
// ============================================

// ---------- THEME TOGGLE ----------
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "light" ? "🌙" : "☀️";
  localStorage.setItem("ello-theme", theme);
}

// Load saved theme
const savedTheme = localStorage.getItem("ello-theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

themeBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// ---------- MOBILE MENU ----------
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// ---------- TYPED CODE SIGNATURE ----------
const codeLines = [
  { t: 'const ', c: 'c1' }, { t: 'agency', c: '' }, { t: ' = ', c: 'c1' }, { t: 'build', c: 'c2' }, { t: '(app);\n', c: '' },
  { t: 'agency', c: '' }, { t: '.deploy(', c: 'c1' }, { t: '"vercel"', c: 'c2' }, { t: ');\n', c: 'c1' },
  { t: '// idea → product, in weeks\n', c: 'c1' },
  { t: 'status', c: '' }, { t: ' = ', c: 'c1' }, { t: '"shipped"', c: 'c2' }, { t: ';', c: '' }
];

const typedEl = document.getElementById('typedCode');
if (typedEl) {
  let li = 0, ci = 0, buffer = '';
 
  function typeStep() {
    if (li >= codeLines.length) {
      typedEl.innerHTML = buffer + '<span class="cursor"></span>';
      return;
    }
   
    const seg = codeLines[li];
    if (ci === 0) buffer += `<span class="${seg.c}">`;
    ci++;
   
    const partial = seg.t.slice(0, ci);
    typedEl.innerHTML = buffer + partial.replace(/\n/g, '<br>') + '</span><span class="cursor"></span>';
   
    if (ci >= seg.t.length) {
      buffer += seg.t.replace(/\n/g, '<br>') + '</span>';
      li++;
      ci = 0;
      setTimeout(typeStep, 60);
    } else {
      setTimeout(typeStep, 22);
    }
  }
 
  typeStep();
}

// ---------- DATA ----------
const coreServices = [
  ['green', '', 'Website Development', 'Custom websites built with modern tech. Fast, secure, and designed to convert visitors into customers.', ['React & Next.js', 'Responsive design', 'SEO optimized', 'CMS integration']],
  ['black', '🛒', 'E-commerce & Shopify', 'Online stores that sell. From Shopify setups to custom e-commerce platforms with advanced features.', ['Shopify development', 'Payment gateways', 'Inventory management', 'Conversion optimization']],
  ['white', '⚙️', 'Custom SaaS Platforms', 'Full-stack software built to run your business. Admin dashboards, user management, and scalable architecture.', ['User authentication', 'Admin dashboards', 'API development', 'Cloud deployment']],
  ['green', '📝', 'WordPress Development', 'Scalable, easy-to-manage websites built on WordPress. Perfect for blogs, corporate sites, and content-heavy platforms.', ['Custom themes', 'Plugin integration', 'WooCommerce', 'Easy content management']],
  ['black', '🤖', 'AI & WhatsApp Automation', 'Smart AI voice agents and WhatsApp bots that handle support, book appointments, and qualify leads 24/7.', ['AI Voice Agents', 'WhatsApp API Bots', 'Lead Qualification', 'CRM Integration']]
];

const coreGrid = document.getElementById('coreServicesGrid');
if (coreGrid) {
  coreGrid.innerHTML = ''; // Clear existing to prevent duplicates
  coreServices.forEach(([theme, icon, title, desc, items]) => {
    coreGrid.insertAdjacentHTML('beforeend', `
      <div class="core-card core-${theme} reveal">
        <div class="icon">${icon}</div>
        <h3>${title}</h3>
        <p>${desc}</p>
        <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
        <a href="services.html" class="core-link">Learn more →</a>
      </div>
    `);
  });
}

// ---------- PROCESS STEPS ----------
const steps = [
  ['Discovery & Planning', 'We learn your business, goals, and users. Then we map out the scope, timeline, and tech stack — so there are no surprises later.'],
  ['Design & Prototyping', 'We design the UI/UX in Figma, iterate with your feedback, and build clickable prototypes so you can see the product before we code it.'],
  ['Development & Testing', 'We build with clean, maintainable code. You get weekly demos, access to staging, and full transparency into progress.'],
  ['Launch & Support', 'We deploy to production, train your team, and provide ongoing support. Your success doesn\'t end at launch — it starts there.']
];

const processList = document.getElementById('processList');
if (processList) {
  steps.forEach(([title, desc], i) => {
    processList.insertAdjacentHTML('beforeend', `
      <div class="process-item reveal">
        <div class="process-num">0${i + 1}</div>
        <div>
          <h3>${title}</h3>
          <p>${desc}</p>
        </div>
      </div>
    `);
  });
}

// ---------- PORTFOLIO ----------
const portfolio = [
  ['E-commerce', 'Northline Retail', 'Custom e-commerce platform with advanced inventory management and multi-vendor support.', 'Next.js', 'Node.js', 'MongoDB', '+180%', 'Sales', '2.1s', 'Load time'],
  ['Shopify', 'Aurelle Skin', 'Shopify store with custom theme, subscription model, and integrated loyalty program.', 'Shopify', 'Liquid', 'JavaScript', '+240%', 'Conversions', '45%', 'Repeat buyers'],
  ['SaaS Platform', 'KappCore', 'Full-stack SaaS platform with user management, billing, and real-time analytics dashboard.', 'React', 'Express', 'PostgreSQL', '500+', 'Active users', '99.9%', 'Uptime']
];

const pfGrid = document.getElementById('portfolioGrid');
if (pfGrid) {
  portfolio.forEach(([cat, name, desc, tech1, tech2, tech3, val1, label1, val2, label2]) => {
    pfGrid.insertAdjacentHTML('beforeend', `
      <div class="pf-card reveal">
        <div class="pf-thumb">
          <span>${cat}</span>
        </div>
        <div class="pf-body">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="pf-tech">
            <span>${tech1}</span>
            <span>${tech2}</span>
            <span>${tech3}</span>
          </div>
          <div class="pf-results">
            <div class="result-item">
              <span class="result-value">${val1}</span>
              <span class="result-label">${label1}</span>
            </div>
            <div class="result-item">
              <span class="result-value">${val2}</span>
              <span class="result-label">${label2}</span>
            </div>
          </div>
          <a href="projects.html" class="pf-link">View Case Study →</a>
        </div>
      </div>
    `);
  });
}

// ---------- PRICING PLANS ----------
const plans = [
  ['Starter', 'PKR 12,000', '/project', false, ['5-page website', 'Responsive design', 'Contact form', 'Basic SEO', '1-week delivery', '1 revision', '1 month hosting', 'Email support']],
  ['Growth', 'PKR 25,000', '/project', true, ['10-page website or e-commerce', 'Custom design & animations', 'CMS integration', 'Advanced SEO', '2-week delivery', '2 revisions', '3 months hosting', 'Priority support', 'Analytics setup']],
  ['Premium', 'PKR 35,000', '/project', false, ['Unlimited pages', 'Premium custom design', 'Custom animations', 'Full SEO & speed optimization', '3-week delivery', 'Unlimited revisions', '6 months hosting', '24/7 support', 'E-commerce ready']]
];

const priceGrid = document.getElementById('pricingGrid');
if (priceGrid) {
  plans.forEach(([name, price, unit, featured, items]) => {
    priceGrid.insertAdjacentHTML('beforeend', `
      <div class="price-card reveal ${featured ? 'featured' : ''}">
        ${featured ? '<div class="tag">Most Popular</div>' : ''}
        <h3>${name}</h3>
        <div class="amount">${price}<span>${unit}</span></div>
        <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
        <a href="contact.html" class="btn ${featured ? 'btn-primary' : 'btn-ghost'} btn-block">Get Started</a>
      </div>
    `);
  });
}

// ---------- TESTIMONIALS ----------
const testimonials = [
  ['Ello delivered exactly what we needed — a fast, modern website that actually converts. The team was responsive, professional, and the final product exceeded our expectations.', 'Ahmed Khan', 'CEO, Northline Retail', 12],
  ['Working with Ello was seamless. They understood our vision from day one and built a Shopify store that\'s not just beautiful, but drives real sales. Highly recommend.', 'Sarah Ali', 'Founder, Aurelle Skin', 33],
  ['The custom platform Ello built for us handles everything — user management, billing, analytics. It\'s rock-solid and scales perfectly as we grow. Worth every rupee.', 'Usman Malik', 'CTO, KappCore', 47],
  ['Professional, transparent, and incredibly skilled. Ello delivered our project on time and on budget. The ongoing support has been exceptional.', 'Fatima Hassan', 'Director, Lumea Studio', 22]
];

const testGrid = document.getElementById('testGrid');
if (testGrid) {
  function renderTestCard([quote, name, role, imgId]) {
    return `
      <div class="test-card">
        <p class="quote">"${quote}"</p>
        <div class="test-who">
          <img class="avatar-img" src="https://i.pravatar.cc/72?img=${imgId}" alt="${name}" loading="lazy">
          <div>
            <b>${name}</b>
            <span>${role}</span>
          </div>
        </div>
      </div>
    `;
  }
 
  // Render twice for infinite loop
  testimonials.concat(testimonials).forEach(t => {
    testGrid.insertAdjacentHTML('beforeend', renderTestCard(t));
  });
}

// ---------- FAQ ----------
const faqs = [
  ['How long does a typical project take?', 'Most projects launch in 10–20 days. Simple websites take 1–2 weeks, e-commerce stores 2–3 weeks, and custom platforms 4–8 weeks depending on complexity.'],
  ['What technologies do you use?', 'We work with React, Next.js, Node.js, MongoDB, PostgreSQL, Shopify, and modern cloud platforms. We choose the best stack for your specific needs.'],
  ['Do you provide ongoing support?', 'Yes. We offer maintenance plans that include hosting, updates, security patches, and 24/7 WhatsApp support. We\'re here for the long term.'],
  ['Can you work with existing websites?', 'Absolutely. We can redesign, rebuild, or add features to your existing site. We\'ll audit your current setup and recommend the best path forward.'],
  ['What\'s your pricing structure?', 'We offer fixed-price projects and monthly retainers. You\'ll get a clear quote upfront with no hidden fees. Payment is split into milestones.']
];

// Dynamically generate FAQs if container exists (used on index.html)
const faqList = document.getElementById('faqList');
if (faqList) {
  faqs.forEach(([q, a]) => {
    faqList.insertAdjacentHTML('beforeend', `
      <div class="faq-item reveal">
        <button class="faq-q">${q}<span class="plus">+</span></button>
        <div class="faq-a"><p>${a}</p></div>
      </div>
    `);
  });
}

// FAQ Accordion — runs on ALL pages (index.html, pricing.html, etc.)
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const ans = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
   
    // Close all other open FAQs
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
   
    // Toggle the clicked one
    if (!isOpen) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});

// ---------- CONTACT FORM ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Gather form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      // Send to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        const formFieldsWrap = document.getElementById('formFieldsWrap');
        const formSuccess = document.getElementById('formSuccess');
        if (formFieldsWrap) formFieldsWrap.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('show');
        contactForm.reset();
      } else {
        alert('Failed to send: ' + result.message);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    } catch (error) {
      alert('Network error. Please try again.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ---------- WHATSAPP FLOAT ----------
const waFloat = document.getElementById('waFloat');
if (waFloat) {
  waFloat.addEventListener('click', (e) => {
    e.preventDefault();
    window.open('https://wa.me/19177225695', '_blank');
  });
}

// ---------- HEADER SCROLL STATE ----------
const headerEl = document.querySelector('header');
if (headerEl) {
  window.addEventListener('scroll', () => {
    headerEl.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ---------- STAGGERED SCROLL REVEAL ----------
document.querySelectorAll('.grid-3, .portfolio-grid, .grid-pricing, .process-list, .core-services').forEach(parent => {
  Array.from(parent.children).forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
  });
});

// ---------- INTERSECTION OBSERVER FOR REVEAL ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---------- ANIMATED COUNTERS ----------
function animateCount(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/^([^\d])(\d+)(.)$/);
  if (!match) return;
 
  const [, prefix, num, suffix] = match;
  const target = parseInt(num, 10);
  const start = performance.now();
  const duration = 1100;
 
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
 
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.hero-meta b').forEach(animateCount);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const heroMetaEl = document.querySelector('.hero-meta');
if (heroMetaEl) counterObserver.observe(heroMetaEl);

// ---------- CARD TILT ----------
function addTilt(selector, strength) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateY(-4px)`;
    });
   
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

addTilt('.card', 6);
addTilt('.pf-card', 5);
addTilt('.price-card', 4);
addTilt('.signature', 3);

// ---------- MAGNETIC BUTTONS ----------
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const mx = (e.clientX - r.left - r.width / 2) * 0.25;
    const my = (e.clientY - r.top - r.height / 2) * 0.35;
    btn.style.transform = `translate(${mx}px, ${my}px)`;
  });
 
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ---------- SMOOTH ACTIVE NAV ----------
const navLinks = document.querySelectorAll("header nav a");
window.addEventListener("scroll", () => {
  let current = "";
  document.querySelectorAll("section").forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });
 
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});