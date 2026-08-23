/**
 * Nisha Acupuncture & Hijama Clinic - Main Application Controller
 * Madurai, Tamil Nadu
 */

window.currentLang = localStorage.getItem('nisha_clinic_lang') || 'en';
window.currentTheme = localStorage.getItem('nisha_clinic_theme') || 'light';

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  init() {
    this.applyTheme(window.currentTheme);
    this.applyLanguage(window.currentLang);
    this.renderTreatmentsGrid();
    this.renderDoctorSection();
    this.renderHygieneProtocols();
    this.renderPricingPackages();
    this.renderTestimonials();
    this.renderFAQs();
    this.updateLiveStatus();
    this.initInteractiveSubsystems();
    this.bindNavigationAndUI();
    this.bindReviewSubmission();
  },

  initInteractiveSubsystems() {
    window.meridianExplorer = new MeridianExplorer();
    window.sunnahCalendar = new SunnahCalendar();
    window.bookingWizard = new BookingWizard();
  },

  applyTheme(theme) {
    window.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nisha_clinic_theme', theme);
    
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun text-gold"></i>' : '<i class="fa-solid fa-moon text-primary"></i>';
    }
  },

  toggleTheme() {
    const nextTheme = window.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  },

  applyLanguage(lang) {
    window.currentLang = lang;
    localStorage.setItem('nisha_clinic_lang', lang);
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-en]').forEach(el => {
      if (lang === 'ta' && el.dataset.ta) {
        el.innerHTML = el.dataset.ta;
      } else if (lang === 'en' && el.dataset.en) {
        el.innerHTML = el.dataset.en;
      }
    });

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
      langToggleBtn.querySelector('.lang-label').textContent = lang === 'en' ? 'தமிழ்' : 'English';
    }

    this.renderTreatmentsGrid();
    this.renderDoctorSection();
    this.renderHygieneProtocols();
    this.renderPricingPackages();
    this.renderTestimonials();
    this.renderFAQs();

    if (window.meridianExplorer) window.meridianExplorer.render();
    if (window.sunnahCalendar) window.sunnahCalendar.render();
  },

  toggleLanguage() {
    const nextLang = window.currentLang === 'en' ? 'ta' : 'en';
    this.applyLanguage(nextLang);
  },

  updateLiveStatus() {
    const badge = document.getElementById('clinic-live-status');
    if (!badge) return;

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const mins = now.getMinutes();
    const timeVal = hour + mins / 60;
    const isTa = window.currentLang === 'ta';

    let isOpen = false;
    let statusText = "";

    if (day === 0) { // Sunday
      if (timeVal >= 10 && timeVal < 14) {
        isOpen = true;
        statusText = isTa ? "திறந்துள்ளது (முன்பதிவு மட்டும்)" : "Open (Sunday Prior Appointments)";
      } else {
        statusText = isTa ? "ஞாயிறு முன்பதிவு மட்டும்" : "Sunday By Prior Appointment Only";
      }
    } else { // Mon-Sat
      if (timeVal >= 9 && timeVal < 20.5) {
        isOpen = true;
        statusText = isTa ? "இப்போது திறந்துள்ளது • இரவு 8:30 வரை" : "Open Now • Closes 8:30 PM";
      } else {
        statusText = isTa ? "இப்போது மூடப்பட்டுள்ளது • காலை 9:00க்கு திறக்கும்" : "Closed Now • Opens 9:00 AM Mon-Sat";
      }
    }

    badge.className = `live-status-pill ${isOpen ? 'status-open' : 'status-limited'}`;
    badge.innerHTML = `
      <span class="pulse-indicator"></span>
      <span class="status-text">${statusText}</span>
    `;
  },

  renderTreatmentsGrid() {
    const container = document.getElementById('treatments-grid-container');
    if (!container) return;
    const isTa = window.currentLang === 'ta';

    container.innerHTML = CLINIC_DATA.treatments.map(t => `
      <div class="treatment-card" id="treatment-${t.id}">
        <div class="treatment-img-wrap">
          <img src="${t.image}" alt="${t.name}" loading="lazy" class="treatment-img">
          <span class="treatment-time-badge"><i class="fa-solid fa-clock"></i> ${t.duration}</span>
          ${t.featured ? `<span class="featured-badge">${isTa ? 'சிறப்பு சிகிச்சை' : 'Popular Choice'}</span>` : ''}
        </div>
        <div class="treatment-card-content">
          <div class="price-header">
            <h3 class="treatment-title">${isTa ? t.nameTa : t.name}</h3>
            <div class="start-price"><small>${isTa ? 'கட்டணம்' : 'From'}</small> <span>${t.startingPrice}</span></div>
          </div>
          <p class="treatment-desc">${isTa ? t.shortDescTa : t.shortDesc}</p>
          
          <div class="treatment-indications">
            <strong><i class="fa-solid fa-circle-check text-emerald"></i> ${isTa ? 'பரிந்துரைக்கப்படும் பிரச்சனைகள்:' : 'Key Indications:'}</strong>
            <ul>
              ${t.idealFor.slice(0, 3).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <div class="treatment-card-actions">
            <button class="btn btn-primary btn-sm book-treatment-btn" data-service="${t.id}">
              <i class="fa-solid fa-calendar-plus"></i> <span>${isTa ? 'முன்பதிவு செய்க' : 'Book Consultation'}</span>
            </button>
            <a href="https://wa.me/${CLINIC_DATA.info.whatsapp}?text=${encodeURIComponent('Hello Dr. Nisha, I want to know more about ' + t.name)}" target="_blank" class="btn btn-outline-primary btn-sm">
              <i class="fa-brands fa-whatsapp text-emerald"></i> <span>${isTa ? 'வாட்ஸ்அப்' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.book-treatment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.bookingWizard) {
          window.bookingWizard.openWithPrefill({ serviceId: btn.dataset.service });
        }
      });
    });
  },

  renderDoctorSection() {
    const docContainer = document.getElementById('doctor-profile-details');
    if (!docContainer) return;
    const isTa = window.currentLang === 'ta';
    const doc = CLINIC_DATA.doctor;

    docContainer.innerHTML = `
      <div class="doctor-badge-chip">
        <i class="fa-solid fa-award text-gold"></i> <span>${isTa ? doc.experienceTa : doc.experience}</span>
      </div>
      <h2 class="doc-title">${isTa ? doc.nameTa : doc.name}</h2>
      <p class="doc-designation">${isTa ? doc.titleTa : doc.title}</p>
      
      <p class="doc-bio">${isTa ? doc.bioTa : doc.bio}</p>

      <div class="doc-credentials-list">
        <h4><i class="fa-solid fa-shield-halved text-emerald"></i> ${isTa ? 'மருத்துவ தகுதிகள் மற்றும் அங்கீகாரங்கள்:' : 'Clinical Certifications & Memberships:'}</h4>
        <ul>
          ${doc.certifications.map(c => `<li><i class="fa-solid fa-check text-emerald"></i> ${c}</li>`).join('')}
        </ul>
      </div>

      <div class="doc-action-cta">
        <button class="btn btn-primary" data-action="book">
          <i class="fa-solid fa-calendar-check"></i> <span>${isTa ? 'டாக்டருடன் ஆலோசனை முன்பதிவு' : 'Schedule Doctor Consultation'}</span>
        </button>
        <a href="tel:${CLINIC_DATA.info.phoneRaw}" class="btn btn-outline-primary">
          <i class="fa-solid fa-phone-volume text-primary"></i> <span>${CLINIC_DATA.info.phone}</span>
        </a>
      </div>
    `;
  },

  renderHygieneProtocols() {
    const container = document.getElementById('hygiene-cards-container');
    if (!container) return;
    const isTa = window.currentLang === 'ta';

    container.innerHTML = CLINIC_DATA.hygieneProtocols.map(h => `
      <div class="hygiene-card">
        <span class="hygiene-num">${h.step}</span>
        <h4 class="hygiene-title">${isTa ? h.titleTa : h.title}</h4>
        <p class="hygiene-desc">${h.desc}</p>
      </div>
    `).join('');
  },

  renderPricingPackages() {
    const container = document.getElementById('pricing-cards-container');
    if (!container) return;
    const isTa = window.currentLang === 'ta';

    container.innerHTML = CLINIC_DATA.pricingPackages.map(p => `
      <div class="pricing-card ${p.highlight ? 'popular-card' : ''}">
        ${p.highlight ? `<div class="popular-ribbon">${isTa ? 'அதிகம் தேர்வு செய்யப்படுவது' : 'Most Recommended'}</div>` : ''}
        <span class="pricing-badge">${p.badge}</span>
        <h3 class="pricing-plan-title">${isTa ? p.nameTa : p.name}</h3>
        
        <div class="pricing-cost">
          <span class="price-val">${p.price}</span>
          ${p.originalPrice ? `<span class="original-val">${p.originalPrice}</span>` : ''}
          <span class="period">/ ${p.validity}</span>
        </div>

        <p class="pricing-for"><small><strong>${isTa ? 'பொருத்தமானது:' : 'Best for:'}</strong> ${p.recommendedFor}</small></p>

        <ul class="pricing-features">
          ${p.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
        </ul>

        <button class="btn ${p.highlight ? 'btn-gold' : 'btn-outline-primary'} btn-block book-pkg-btn" data-pkg="${p.name}">
          <i class="fa-solid fa-sparkles"></i> <span>${isTa ? 'இப்போது புக் செய்க' : 'Choose This Plan'}</span>
        </button>
      </div>
    `).join('');

    container.querySelectorAll('.book-pkg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.bookingWizard) {
          window.bookingWizard.openWithPrefill({ notes: `Selected Package: ${btn.dataset.pkg}` });
        }
      });
    });
  },

  renderTestimonials() {
    const container = document.getElementById('testimonials-grid-container');
    if (!container) return;
    const isTa = window.currentLang === 'ta';

    container.innerHTML = CLINIC_DATA.testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testi-stars">
          ${Array(t.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
          <span class="verified-tag"><i class="fa-solid fa-check-double"></i> ${isTa ? 'உறுதிப்படுத்தப்பட்ட நோயாளி' : 'Verified Recovery'}</span>
        </div>
        <p class="testi-text">"${isTa && t.textTa ? t.textTa : t.text}"</p>
        <div class="testi-author">
          <div class="author-avatar">${t.name.charAt(0)}</div>
          <div class="author-info">
            <strong>${t.name}</strong>
            <small class="text-gold font-semibold">${t.condition}</small>
            <small class="text-muted"><i class="fa-solid fa-location-dot"></i> ${t.location}</small>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderFAQs() {
    const container = document.getElementById('faqs-accordion-container');
    if (!container) return;
    const isTa = window.currentLang === 'ta';

    container.innerHTML = CLINIC_DATA.faqs.map((f, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <button class="faq-question-btn">
          <span>${isTa ? f.qTa : f.q}</span>
          <i class="fa-solid fa-chevron-down faq-icon"></i>
        </button>
        <div class="faq-answer-panel">
          <p>${isTa ? f.aTa : f.a}</p>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.faq-question-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.parentElement;
        const isActive = parent.classList.contains('active');
        container.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        if (!isActive) {
          parent.classList.add('active');
        }
      });
    });
  },

  bindNavigationAndUI() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.toggleLanguage());
    }

    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('primary-nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
      });
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          menuToggle.classList.remove('active');
        });
      });
    }
  },

  bindReviewSubmission() {
    const form = document.getElementById('new-review-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rev-patient-name').value.trim();
      const condition = document.getElementById('rev-condition').value.trim();
      const text = document.getElementById('rev-feedback').value.trim();
      const rating = parseInt(document.getElementById('rev-rating').value, 10) || 5;

      if (!name || !text) return;

      const newReview = {
        name,
        location: "Madurai Patient",
        condition: condition || "Holistic Care",
        rating,
        date: "Just now",
        text,
        textTa: text
      };

      CLINIC_DATA.testimonials.unshift(newReview);
      this.renderTestimonials();
      form.reset();
      
      const successNotice = document.getElementById('review-success-msg');
      if (successNotice) {
        successNotice.style.display = 'block';
        setTimeout(() => { successNotice.style.display = 'none'; }, 4000);
      }
    });
  }
};
