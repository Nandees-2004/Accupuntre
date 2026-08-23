/**
 * Sunnah Hijama Lunar Calendar & Countdown Engine
 * Nisha Acupuncture & Hijama Clinic, Madurai
 */

class SunnahCalendar {
  constructor() {
    this.container = document.getElementById('sunnah-calendar-container');
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  // Generates realistic upcoming Sunnah dates based on current month
  getUpcomingSunnahDates() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    // Calculate approximate upcoming lunar 17th, 19th, 21st windows
    const dates = [];
    const baseDate = new Date(currentYear, currentMonth, 15);
    
    // Day 17
    const day17 = new Date(currentYear, currentMonth, 17);
    const day19 = new Date(currentYear, currentMonth, 19);
    const day21 = new Date(currentYear, currentMonth, 21);

    // If current date is past the 21st, project next month's sunnah days
    let targetMonthOffset = 0;
    if (now.getDate() > 21) {
      targetMonthOffset = 1;
    }

    const mDate17 = new Date(currentYear, currentMonth + targetMonthOffset, 17);
    const mDate19 = new Date(currentYear, currentMonth + targetMonthOffset, 19);
    const mDate21 = new Date(currentYear, currentMonth + targetMonthOffset, 21);

    return [
      {
        hijriDay: 17,
        hijriLabel: "17th Hijri (சுன்னத் 17)",
        gregorianDate: mDate17,
        dayName: mDate17.toLocaleDateString('en-US', { weekday: 'long' }),
        dayNameTa: this.getTamilDay(mDate17.getDay()),
        formattedDate: mDate17.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: mDate17 >= now ? 'upcoming' : 'completed',
        isBestDay: [1, 2, 4].includes(mDate17.getDay()) // Mon, Tue, Thu
      },
      {
        hijriDay: 19,
        hijriLabel: "19th Hijri (சுன்னத் 19)",
        gregorianDate: mDate19,
        dayName: mDate19.toLocaleDateString('en-US', { weekday: 'long' }),
        dayNameTa: this.getTamilDay(mDate19.getDay()),
        formattedDate: mDate19.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: mDate19 >= now ? 'upcoming' : 'completed',
        isBestDay: [1, 2, 4].includes(mDate19.getDay())
      },
      {
        hijriDay: 21,
        hijriLabel: "21st Hijri (சுன்னத் 21)",
        gregorianDate: mDate21,
        dayName: mDate21.toLocaleDateString('en-US', { weekday: 'long' }),
        dayNameTa: this.getTamilDay(mDate21.getDay()),
        formattedDate: mDate21.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: mDate21 >= now ? 'upcoming' : 'completed',
        isBestDay: [1, 2, 4].includes(mDate21.getDay())
      }
    ];
  }

  getTamilDay(dayIdx) {
    const days = ["ஞாயிறு", "திங்கள் (சிறந்தது)", "செவ்வாய் (சிறந்தது)", "புதன்", "வியாழன் (சிறந்தது)", "வெள்ளி", "சனி"];
    return days[dayIdx];
  }

  render() {
    const isTa = window.currentLang === 'ta';
    const sunnahDays = this.getUpcomingSunnahDates();
    const nextUpcoming = sunnahDays.find(d => d.status === 'upcoming') || sunnahDays[0];

    // Calculate days remaining
    const diffTime = Math.max(0, nextUpcoming.gregorianDate.getTime() - new Date().getTime());
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    this.container.innerHTML = `
      <div class="sunnah-calendar-card glass-panel">
        <div class="sunnah-top-banner">
          <div class="banner-left">
            <span class="crescent-badge"><i class="lucide-moon"></i> ${isTa ? 'நபிவழி சுன்னத் ஹிஜாமா காலண்டர்' : 'Sunnah Lunar Hijama Calendar'}</span>
            <h3 class="sunnah-title">${isTa ? 'வரவிருக்கும் சுன்னத் ஹிஜாமா தினங்கள்' : 'Recommended Prophetic Sunnah Days (17, 19, 21)'}</h3>
            <p class="sunnah-subtitle">
              ${isTa ? 
                'இஸ்லாமிய சந்திர மாதத்தின் 17, 19 மற்றும் 21-ஆம் நாட்களில் நச்சு நீக்கம் மிகச் சிறந்தது. குறிப்பாக திங்கள், செவ்வாய், வியாழன் கிழமைகள் அதிக நன்மை பயக்கும்.' : 
                'In prophetic medicine, cupping on the 17th, 19th, and 21st of the lunar month provides optimal detoxification, blood pressure balance, and vitality boost.'}
            </p>
          </div>
          <div class="banner-countdown">
            <div class="countdown-circle">
              <span class="countdown-number">${daysRemaining}</span>
              <span class="countdown-label">${isTa ? 'நாட்கள் மீதம்' : 'Days Away'}</span>
            </div>
            <div class="next-target-text">${isTa ? 'அடுத்த சுன்னத் நாள்: ' : 'Next: '}${nextUpcoming.formattedDate}</div>
          </div>
        </div>

        <div class="sunnah-cards-grid">
          ${sunnahDays.map(day => `
            <div class="sunnah-day-box ${day.isBestDay ? 'prime-day' : ''} ${day.status === 'upcoming' ? 'active-slot' : ''}">
              ${day.isBestDay ? `<span class="prime-tag"><i class="lucide-star"></i> ${isTa ? 'மிகச்சிறந்த நாள்' : 'Highly Recommended'}</span>` : ''}
              <div class="hijri-day-pill">${day.hijriLabel}</div>
              <div class="sunnah-greg-date">${day.formattedDate}</div>
              <div class="sunnah-day-name"><i class="lucide-calendar"></i> ${isTa ? day.dayNameTa : day.dayName}</div>
              
              <div class="sunnah-benefits-mini">
                <small><i class="lucide-shield-check"></i> ${isTa ? 'முழு உடல் நச்சு நீக்கம் & தூய்மை' : 'Capillary Detox & Immunity'}</small>
              </div>

              <button class="btn btn-sm btn-outline-gold book-sunnah-btn" data-date="${day.formattedDate}" data-hijri="${day.hijriLabel}">
                <i class="lucide-check-circle"></i>
                <span>${isTa ? 'இந்த நாளில் புக் செய்க' : 'Reserve Sunnah Slot'}</span>
              </button>
            </div>
          `).join('')}
        </div>

        <div class="sunnah-fasting-guide">
          <div class="guide-col">
            <strong><i class="lucide-clock"></i> ${isTa ? 'முன் தயாரிப்பு:' : 'Pre-Hijama Care:'}</strong>
            <span>${isTa ? 'சிகிச்சைக்கு முன் 2-3 மணி நேரம் லேசான விரதம் (நீர் அல்லது தேன் அருந்தலாம்).' : 'Fast from heavy food 2-3 hours prior. Hydrate well with water or honey.'}</span>
          </div>
          <div class="guide-col">
            <strong><i class="lucide-heart-pulse"></i> ${isTa ? 'பெண்களுக்கு தனியுரிமை:' : 'Privacy Assurance:'}</strong>
            <span>${isTa ? 'பெண்களுக்கு தனி சிகிச்சை அறை மற்றும் பெண் உதவியாளர்கள் வசதி உண்டு.' : 'Dedicated private female treatment rooms with certified female therapists.'}</span>
          </div>
        </div>
      </div>
    `;

    // Attach click events to reserve buttons
    const btns = this.container.querySelectorAll('.book-sunnah-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.bookingWizard) {
          window.bookingWizard.openWithPrefill({
            serviceId: 'wet-cupping-hijama',
            notes: `Sunnah Hijama Slot: ${btn.dataset.hijri} (${btn.dataset.date})`
          });
        }
      });
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

window.SunnahCalendar = SunnahCalendar;
