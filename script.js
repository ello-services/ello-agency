// THEME TOGGLE
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "light" ? "☀️" : "🌙";
  localStorage.setItem("ello-theme", theme);
}

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

// MOBILE MENU
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

// CORE SERVICES
const coreServices = [
  ['green', '🌐', 'Website Development', 'Custom websites built with modern tech.', ['React & Next.js', 'Responsive design', 'SEO optimized', 'CMS integration']],
  ['black', '🛒', 'E-commerce & Shopify', 'Online stores that sell.', ['Shopify development', 'Payment gateways', 'Inventory management', 'Conversion optimization']],
  ['white', '⚙️', 'Custom SaaS Platforms', 'Full-stack software for your business.', ['User authentication', 'Admin dashboards', 'API development', 'Cloud deployment']],
  ['green', '📝', 'WordPress Development', 'Scalable websites on WordPress.', ['Custom themes', 'Plugin integration', 'WooCommerce', 'Easy content management']],
  ['black', '', 'AI & WhatsApp Automation', 'Smart AI agents and WhatsApp bots.', ['AI Voice Agents', 'WhatsApp API Bots', 'Lead Qualification', 'CRM Integration']]
];

const coreGrid = document.getElementById('coreServicesGrid');
if (coreGrid) {
  coreGrid.innerHTML = '';
  coreServices.forEach(([theme, icon, title, desc, items]) => {
    coreGrid.insertAdjacentHTML('beforeend', `
      <div class="core-card core-${theme}">
        <div class="icon">${icon}</div>
        <h3>${title}</h3>
        <p>${desc}</p>
        <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
        <a href="services.html" class="core-link">Learn more →</a>
      </div>
    `);
  });
}

// PROCESS STEPS
const steps = [
  ['Discovery & Planning', 'We learn your business, goals, and users.'],
  ['Design & Prototyping', 'We design the UI/UX in Figma.'],
  ['Development & Testing', 'We build with clean, maintainable code.'],
  ['Launch & Support', 'We deploy and provide ongoing support.']
];

const processList = document.getElementById('processList');
if (processList) {
  steps.forEach(([title, desc], i) => {
    processList.insertAdjacentHTML('beforeend', `
      <div class="process-item">
        <div class="process-num">0${i + 1}</div>
        <div>
          <h3>${title}</h3>
          <p>${desc}</p>
        </div>
      </div>
    `);
  });
}

// PORTFOLIO - WITH REAL IMAGES ADDED
const portfolio = [
  ['E-commerce', 'Northline Retail', 'Custom e-commerce platform with advanced inventory management.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', 'Next.js', 'Node.js', 'MongoDB', '+180%', 'Sales', '2.1s', 'Load time'],
  ['Shopify', 'Aurelle Skin', 'Shopify store with custom theme and subscription model.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop', 'Shopify', 'Liquid', 'JavaScript', '+240%', 'Conversions', '45%', 'Repeat buyers'],
  ['SaaS Platform', 'KappCore', 'Full-stack SaaS platform with user management and billing.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', 'React', 'Express', 'PostgreSQL', '500+', 'Active users', '99.9%', 'Uptime']
];

const pfGrid = document.getElementById('portfolioGrid');
if (pfGrid) {
  portfolio.forEach(([cat, name, desc, img, tech1, tech2, tech3, val1, label1, val2, label2]) => {
    pfGrid.insertAdjacentHTML('beforeend', `
      <div class="pf-card">
        <div class="pf-thumb">
          <img src="${img}" alt="${name}" loading="lazy">
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

// PRICING
const plans = [
  ['Starter', 'PKR 12,000', '/project', false, ['5-page website', 'Responsive design', 'Contact form', 'Basic SEO', '1-week delivery']],
  ['Growth', 'PKR 25,000', '/project', true, ['10-page website', 'Custom design', 'CMS integration', 'Advanced SEO', '2-week delivery']],
  ['Premium', 'PKR 35,000', '/project', false, ['Unlimited pages', 'Premium design', 'Full SEO', '3-week delivery', '24/7 support']]
];

const priceGrid = document.getElementById('pricingGrid');
if (priceGrid) {
  plans.forEach(([name, price, unit, featured, items]) => {
    priceGrid.insertAdjacentHTML('beforeend', `
      <div class="price-card ${featured ? 'featured' : ''}">
        ${featured ? '<div class="tag">Most Popular</div>' : ''}
        <h3>${name}</h3>
        <div class="amount">${price}<span>${unit}</span></div>
        <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
        <a href="contact.html" class="btn ${featured ? 'btn-primary' : 'btn-ghost'} btn-block">Get Started</a>
      </div>
    `);
  });
}

// TESTIMONIALS
const testimonials = [
  ['Ello delivered exactly what we needed.', 'Ahmed Khan', 'CEO, Northline Retail', 12],
  ['Working with Ello was seamless.', 'Sarah Ali', 'Founder, Aurelle Skin', 33],
  ['The custom platform is rock-solid.', 'Usman Malik', 'CTO, KappCore', 47],
  ['Professional and incredibly skilled.', 'Fatima Hassan', 'Director, Lumea Studio', 22]
];

const testGrid = document.getElementById('testGrid');
if (testGrid) {
  testimonials.concat(testimonials).forEach(([quote, name, role, imgId]) => {
    testGrid.insertAdjacentHTML('beforeend', `
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
    `);
  });
}

// FAQ
const faqs = [
  ['How long does a typical project take?', 'Most projects launch in 10–20 days.'],
  ['What technologies do you use?', 'React, Next.js, Node.js, MongoDB, Shopify.'],
  ['Do you provide ongoing support?', 'Yes, we offer maintenance plans.'],
  ['Can you work with existing websites?', 'Absolutely, we can redesign or add features.'],
  ['What\'s your pricing structure?', 'Fixed-price projects with clear quotes.']
];

const faqList = document.getElementById('faqList');
if (faqList) {
  faqs.forEach(([q, a]) => {
    faqList.insertAdjacentHTML('beforeend', `
      <div class="faq-item">
        <button class="faq-q">${q}<span class="plus">+</span></button>
        <div class="faq-a"><p>${a}</p></div>
      </div>
    `);
  });
}

document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const ans = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    
    if (!isOpen) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});

// CONTACT FORM
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
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

// WHATSAPP FLOAT
const waFloat = document.getElementById('waFloat');
if (waFloat) {
  waFloat.addEventListener('click', (e) => {
    e.preventDefault();
    window.open('https://wa.me/19144551903', '_blank');
  });
}

// HEADER SCROLL
const headerEl = document.querySelector('header');
if (headerEl) {
  window.addEventListener('scroll', () => {
    headerEl.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// REVEAL ON SCROLL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));