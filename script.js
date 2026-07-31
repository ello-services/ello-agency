// ============================================
// ELLO AGENCY - MAIN JAVASCRIPT
// ============================================

// ---------- THEME TOGGLE ----------
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "light" ? "☀️" : "";
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

// ---------- DATA ----------
const coreServices = [
  ['green', '🌐', 'Website Development', 'Custom websites built with modern tech. Fast, secure, and designed to convert visitors into customers.', ['React & Next.js', 'Responsive design', 'SEO optimized', 'CMS integration']],
  ['black', '🛒', 'E-commerce & Shopify', 'Online stores that sell. From Shopify setups to custom e-commerce platforms with advanced features.', ['Shopify development', 'Payment gateways', 'Inventory management', 'Conversion optimization']],
  ['white', '⚙️', 'Custom SaaS Platforms', 'Full-stack software built to run your business. Admin dashboards, user management, and scalable architecture.', ['User authentication', 'Admin dashboards', 'API development', 'Cloud deployment']],
  ['green', '📝', 'WordPress Development', 'Scalable, easy-to-manage websites built on WordPress. Perfect for blogs, corporate sites, and content-heavy platforms.', ['Custom themes', 'Plugin integration', 'WooCommerce', 'Easy content management']],
  ['black', '🤖', 'AI & WhatsApp Automation', 'Smart AI voice agents and WhatsApp bots that handle support, book appointments, and qualify leads 24/7.', ['AI Voice Agents', 'WhatsApp API Bots', 'Lead Qualification', 'CRM Integration']]
];

const coreGrid = document.getElementById('coreServicesGrid');
if (coreGrid) {
  coreGrid.innerHTML = '';
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

// ... rest of the file is clean

// ---------- CONTACT FORM ----------
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

    console.log('Sending data:', data); // Debug log

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Response:', result); // Debug log

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
      console.error('Error:', error);
      alert('Network error. Please try again.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ... rest of the functions