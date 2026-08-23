/**
 * Interactive Acupuncture Meridian & Body Pain Point Explorer
 * Nisha Acupuncture & Hijama Clinic, Madurai
 */

class MeridianExplorer {
  constructor() {
    this.activeView = 'back';
    this.activePointId = 'lower-back-sciatica';
    this.container = document.getElementById('meridian-explorer-container');
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.attachEvents();
    this.selectZone(this.activePointId);
  }

  render() {
    const isTa = window.currentLang === 'ta';
    
    this.container.innerHTML = `
      <div class="meridian-wrapper">
        <div class="meridian-header-bar">
          <div class="view-toggle-pills">
            <button class="pill-btn ${this.activeView === 'back' ? 'active' : ''}" data-view="back">
              <i class="fa-solid fa-street-view"></i> <span>${isTa ? 'பின்புற பார்வை (Back View)' : 'Posterior / Back View'}</span>
            </button>
            <button class="pill-btn ${this.activeView === 'front' ? 'active' : ''}" data-view="front">
              <i class="fa-solid fa-person"></i> <span>${isTa ? 'முன்புற பார்வை (Front View)' : 'Anterior / Front View'}</span>
            </button>
          </div>
          <div class="meridian-badge">
            <span class="live-pulse-dot"></span>
            <span>${isTa ? 'நேரலை உடல் புள்ளி வரைபடம்' : 'Interactive Anatomical Meridian Map'}</span>
          </div>
        </div>

        <div class="meridian-workspace">
          <!-- Anatomical SVG Graphic Canvas -->
          <div class="meridian-canvas-box">
            <div class="body-canvas-legend">
              <span class="legend-item"><span class="dot acu"></span> ${isTa ? 'அக்குபஞ்சர் புள்ளிகள்' : 'Acupoints (TCM)'}</span>
              <span class="legend-item"><span class="dot hijama"></span> ${isTa ? 'ஹிஜாமா கப்பிங் புள்ளிகள்' : 'Hijama Cupping Zones'}</span>
            </div>

            <div class="interactive-svg-wrap">
              <svg viewBox="0 0 320 540" class="human-body-svg" id="human-body-svg">
                <defs>
                  <linearGradient id="bodyGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0b4d34" />
                    <stop offset="100%" stop-color="#062e1f" />
                  </linearGradient>
                </defs>

                <!-- Stylized Human Silhouette -->
                <g class="body-silhouette">
                  <!-- Head & Neck -->
                  <path d="M 160 30 C 142 30 132 45 132 68 C 132 90 144 105 152 110 L 152 125 L 142 130 C 122 135 100 155 95 185 L 85 270 C 83 285 92 295 98 290 L 108 215 L 118 200 L 122 300 L 126 380 L 116 490 C 114 505 130 515 138 505 L 150 405 L 158 335 L 162 335 L 170 405 L 182 505 C 190 515 206 505 204 490 L 194 380 L 198 300 L 202 200 L 212 215 L 222 290 C 228 295 237 285 235 270 L 225 185 C 220 155 198 135 178 130 L 168 125 L 168 110 C 176 105 188 90 188 68 C 188 45 178 30 160 30 Z"
                        class="body-path" fill="url(#bodyGradLight)" stroke="#059669" stroke-width="2" opacity="0.92"/>
                  
                  <!-- Spine / Meridian Line indication -->
                  <path d="M 160 115 L 160 330" stroke="#facc15" stroke-width="2" stroke-dasharray="4,4" />
                </g>

                <!-- Interactive Hotspots (Back View) -->
                <g class="hotspots-group back-hotspots ${this.activeView === 'back' ? 'visible' : 'hidden'}">
                  <!-- Head & Neck -->
                  <g class="hotspot-node" data-id="head-migraine" transform="translate(160, 68)">
                    <circle r="16" class="hotspot-pulse" />
                    <circle r="8" class="hotspot-core" />
                    <text y="3" text-anchor="middle" class="hotspot-label">1</text>
                  </g>

                  <!-- Cervical & Trapezius -->
                  <g class="hotspot-node" data-id="neck-cervical" transform="translate(160, 130)">
                    <circle r="18" class="hotspot-pulse" />
                    <circle r="9" class="hotspot-core" />
                    <text y="3" text-anchor="middle" class="hotspot-label">2</text>
                  </g>

                  <!-- Shoulders / Frozen Shoulder -->
                  <g class="hotspot-node" data-id="shoulder-frozen" transform="translate(112, 155)">
                    <circle r="15" class="hotspot-pulse" />
                    <circle r="7.5" class="hotspot-core" />
                    <text y="3" text-anchor="middle" class="hotspot-label">3</text>
                  </g>
                  <g class="hotspot-node" data-id="shoulder-frozen" transform="translate(208, 155)">
                    <circle r="15" class="hotspot-pulse" />
                    <circle r="7.5" class="hotspot-core" />
                    <text y="3" text-anchor="middle" class="hotspot-label">3</text>
                  </g>

                  <!-- Lower Back & Sciatica -->
                  <g class="hotspot-node" data-id="lower-back-sciatica" transform="translate(160, 260)">
                    <circle r="22" class="hotspot-pulse" />
                    <circle r="10" class="hotspot-core highlight" />
                    <text y="3.5" text-anchor="middle" class="hotspot-label">4</text>
                  </g>

                  <!-- Knees & Joint Pain -->
                  <g class="hotspot-node" data-id="knee-joints" transform="translate(142, 415)">
                    <circle r="16" class="hotspot-pulse" />
                    <circle r="8" class="hotspot-core" />
                    <text y="3" text-anchor="middle" class="hotspot-label">5</text>
                  </g>
                  <g class="hotspot-node" data-id="knee-joints" transform="translate(178, 415)">
                    <circle r="16" class="hotspot-pulse" />
                    <circle r="8" class="hotspot-core" />
                    <text y="3" text-anchor="middle" class="hotspot-label">5</text>
                  </g>
                </g>

                <!-- Interactive Hotspots (Front View) -->
                <g class="hotspots-group front-hotspots ${this.activeView === 'front' ? 'visible' : 'hidden'}">
                  <!-- Head / Sinus / Insomnia -->
                  <g class="hotspot-node" data-id="head-migraine" transform="translate(160, 65)">
                    <circle r="16" class="hotspot-pulse" />
                    <circle r="8" class="hotspot-core" />
                    <text y="3" text-anchor="middle" class="hotspot-label">1</text>
                  </g>

                  <!-- Abdomen & Digestion / PCOD -->
                  <g class="hotspot-node" data-id="abdomen-metabolism" transform="translate(160, 230)">
                    <circle r="22" class="hotspot-pulse" />
                    <circle r="10" class="hotspot-core highlight" />
                    <text y="3.5" text-anchor="middle" class="hotspot-label">6</text>
                  </g>

                  <!-- Front Knee Joint -->
                  <g class="hotspot-node" data-id="knee-joints" transform="translate(142, 410)">
                    <circle r="16" class="hotspot-pulse" />
                    <circle r="8" class="hotspot-core" />
                    <text y="3" text-anchor="middle" class="hotspot-label">5</text>
                  </g>
                  <g class="hotspot-node" data-id="knee-joints" transform="translate(178, 410)">
                    <circle r="16" class="hotspot-pulse" />
                    <circle r="8" class="hotspot-core" />
                    <text y="3" text-anchor="middle" class="hotspot-label">5</text>
                  </g>
                </g>
              </svg>
            </div>
            
            <div class="interactive-guide-tip">
              <i class="fa-solid fa-wand-magic-sparkles text-primary"></i> 
              <span>${isTa ? 'உடலில் உள்ள எண்களை தொட்டு வலி நிவாரண புள்ளிகளை காண்க' : 'Click numbered points on the body to reveal therapeutic acupoints & recovery stats'}</span>
            </div>
          </div>

          <!-- Diagnostic Details Card -->
          <div class="meridian-details-card" id="meridian-details-panel">
            <!-- Dynamic Content Injected Here -->
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // View Toggles
    const viewButtons = this.container.querySelectorAll('.pill-btn');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.activeView = view;
        this.render();
        this.attachEvents();
        this.selectZone(this.activePointId);
      });
    });

    // Hotspot clicks
    const nodes = this.container.querySelectorAll('.hotspot-node');
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const id = node.dataset.id;
        this.selectZone(id);
      });
    });
  }

  selectZone(zoneId) {
    this.activePointId = zoneId;
    const isTa = window.currentLang === 'ta';
    const zoneData = CLINIC_DATA.bodyPainMap.find(item => item.id === zoneId) || CLINIC_DATA.bodyPainMap[0];
    
    // Update active highlight class on SVG nodes
    const nodes = this.container.querySelectorAll('.hotspot-node');
    nodes.forEach(n => {
      if (n.dataset.id === zoneId) {
        n.classList.add('active-selected');
      } else {
        n.classList.remove('active-selected');
      }
    });

    const panel = document.getElementById('meridian-details-panel');
    if (!panel) return;

    panel.innerHTML = `
      <div class="zone-details-header">
        <span class="zone-badge"><i class="fa-solid fa-heart-pulse"></i> ${isTa ? 'தேர்ந்தெடுக்கப்பட்ட பகுதி' : 'Selected Pain Zone'}</span>
        <h3 class="zone-title">${zoneData.bodyPart}</h3>
      </div>

      <div class="zone-symptoms-list">
        <h4><i class="fa-solid fa-circle-check text-emerald"></i> ${isTa ? 'குணப்படுத்தப்படும் பிரச்சனைகள்:' : 'Treatable Conditions & Symptoms:'}</h4>
        <div class="symptom-tags">
          ${zoneData.symptoms.map(sym => `<span class="symptom-chip">${sym}</span>`).join('')}
        </div>
      </div>

      <div class="zone-meridian-points-grid">
        <div class="point-box acu-box">
          <div class="point-box-title">
            <span class="indicator acu"></span>
            <strong>${isTa ? 'அக்குபஞ்சர் புள்ளிகள்' : 'Key Acupoints (TCM)'}</strong>
          </div>
          <div class="point-chips">
            ${zoneData.acupoints.map(p => `<code>${p}</code>`).join('')}
          </div>
        </div>

        <div class="point-box hijama-box">
          <div class="point-box-title">
            <span class="indicator hijama"></span>
            <strong>${isTa ? 'ஹிஜாமா கப்பிங் புள்ளிகள்' : 'Target Hijama Cupping Points'}</strong>
          </div>
          <div class="point-chips">
            ${zoneData.hijamaPoints.map(p => `<code>${p}</code>`).join('')}
          </div>
        </div>
      </div>

      <div class="zone-recovery-metrics">
        <div class="metric-item">
          <div class="metric-val">${zoneData.sessionsAvg}</div>
          <div class="metric-lbl">${isTa ? 'சராசரி அமர்வுகள்' : 'Avg. Treatment Plan'}</div>
        </div>
        <div class="metric-item">
          <div class="metric-val text-emerald">${zoneData.reliefRate.split(' ')[0]}</div>
          <div class="metric-lbl">${isTa ? 'வெற்றி விகிதம்' : 'Patient Recovery Rate'}</div>
        </div>
      </div>

      <div class="zone-action-bar">
        <button class="btn btn-primary btn-block trigger-book-btn" data-service="${zoneData.recommendedService}" data-symptom="${zoneData.symptoms[0]}">
          <i class="fa-solid fa-calendar-plus"></i>
          <span>${isTa ? 'இந்த பிரச்சனைக்கு முன்பதிவு செய்க' : 'Book Consultation for ' + zoneData.bodyPart.split('(')[0]}</span>
        </button>
      </div>
    `;

    // Hook up trigger book button
    const bookBtn = panel.querySelector('.trigger-book-btn');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        if (window.bookingWizard) {
          window.bookingWizard.openWithPrefill({
            serviceId: bookBtn.dataset.service,
            symptom: bookBtn.dataset.symptom
          });
        }
      });
    }
  }
}

window.MeridianExplorer = MeridianExplorer;
