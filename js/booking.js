/**
 * Smart Multi-Step Appointment Booking System
 * Nisha Acupuncture & Hijama Clinic, Madurai
 * Contact: +91 96884 18786
 */

class BookingWizard {
  constructor() {
    this.modal = document.getElementById('booking-modal');
    this.currentStep = 1;
    this.bookingData = {
      serviceId: 'classical-acupuncture',
      serviceName: 'Classical & Master Tung Acupuncture',
      date: this.getTomorrowDate(),
      timeSlot: '10:30 AM - 11:30 AM (Morning)',
      slotType: 'morning',
      patientName: '',
      patientPhone: '',
      patientAge: '',
      patientGender: 'Female',
      symptoms: '',
      doctorName: 'Dr. Nisha S. MD(Acu)',
      referenceId: ''
    };
    this.init();
  }

  init() {
    if (!this.modal) return;
    this.bindGlobalTriggers();
  }

  getTomorrowDate() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  bindGlobalTriggers() {
    document.querySelectorAll('[data-action="book"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const service = btn.dataset.service;
        this.openWithPrefill({ serviceId: service });
      });
    });

    this.modal.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
  }

  openWithPrefill(options = {}) {
    if (options.serviceId) {
      this.bookingData.serviceId = options.serviceId;
      const sObj = CLINIC_DATA.treatments.find(t => t.id === options.serviceId);
      if (sObj) this.bookingData.serviceName = sObj.name;
    }
    if (options.symptom) {
      this.bookingData.symptoms = options.symptom;
    }
    if (options.notes) {
      this.bookingData.symptoms = options.notes;
    }
    this.currentStep = 1;
    this.renderStep();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  nextStep() {
    if (this.validateStep(this.currentStep)) {
      if (this.currentStep === 3) {
        this.generateReferenceId();
        this.saveBookingLocal();
      }
      this.currentStep++;
      this.renderStep();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.renderStep();
    }
  }

  validateStep(step) {
    const isTa = window.currentLang === 'ta';
    if (step === 1) {
      const selectedRadio = this.modal.querySelector('input[name="service_option"]:checked');
      if (!selectedRadio) {
        alert(isTa ? 'தயவுசெய்து ஒரு சிகிச்சையை தேர்வு செய்யவும்.' : 'Please select a treatment service.');
        return false;
      }
      this.bookingData.serviceId = selectedRadio.value;
      const sObj = CLINIC_DATA.treatments.find(t => t.id === selectedRadio.value);
      if (sObj) this.bookingData.serviceName = isTa ? sObj.nameTa : sObj.name;
      return true;
    }

    if (step === 2) {
      const dateInput = this.modal.querySelector('#booking-date-input');
      const timeSlotSelect = this.modal.querySelector('#booking-time-slot');
      if (!dateInput || !dateInput.value) {
        alert(isTa ? 'தயவுசெய்து தேதியை தேர்வு செய்யவும்.' : 'Please select an appointment date.');
        return false;
      }
      this.bookingData.date = dateInput.value;
      this.bookingData.timeSlot = timeSlotSelect.value;
      return true;
    }

    if (step === 3) {
      const name = this.modal.querySelector('#patient-name-input').value.trim();
      const phone = this.modal.querySelector('#patient-phone-input').value.trim();
      const age = this.modal.querySelector('#patient-age-input').value.trim();
      const gender = this.modal.querySelector('input[name="patient_gender"]:checked')?.value || 'Not Specified';
      const symptoms = this.modal.querySelector('#patient-symptoms-input').value.trim();

      if (!name) {
        alert(isTa ? 'உங்கள் பெயரை உள்ளிடவும்.' : 'Please enter patient name.');
        return false;
      }
      if (!phone || phone.length < 10) {
        alert(isTa ? 'சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்.' : 'Please enter a valid 10-digit phone number.');
        return false;
      }

      this.bookingData.patientName = name;
      this.bookingData.patientPhone = phone;
      this.bookingData.patientAge = age;
      this.bookingData.patientGender = gender;
      this.bookingData.symptoms = symptoms || (isTa ? 'பொது பரிசோதனை & வலி நிவாரணம்' : 'General Consultation & Pain Relief');
      return true;
    }

    return true;
  }

  generateReferenceId() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.bookingData.referenceId = `NSH-${new Date().getFullYear()}-${randomNum}`;
  }

  saveBookingLocal() {
    try {
      const existing = JSON.parse(localStorage.getItem('nisha_clinic_bookings') || '[]');
      existing.unshift(this.bookingData);
      localStorage.setItem('nisha_clinic_bookings', JSON.stringify(existing));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }

  renderStep() {
    const isTa = window.currentLang === 'ta';
    const container = this.modal.querySelector('.wizard-content-container');
    if (!container) return;

    let html = '';

    // Step 1: Select Service
    if (this.currentStep === 1) {
      html = `
        <div class="wizard-step-body">
          <div class="step-progress-indicator">
            <span class="step-item active">1. ${isTa ? 'சிகிச்சை தேர்வு' : 'Select Treatment'}</span>
            <span class="step-item">2. ${isTa ? 'தேதி & நேரம்' : 'Date & Time'}</span>
            <span class="step-item">3. ${isTa ? 'நோயாளி விவரம்' : 'Patient Details'}</span>
            <span class="step-item">4. ${isTa ? 'உறுதிப்படுத்தல்' : 'Confirmation'}</span>
          </div>

          <h3 class="step-heading">${isTa ? 'உங்களுக்கு தேவையான சிகிச்சையை தேர்வு செய்க' : 'Choose Your Preferred Holistic Therapy'}</h3>
          <p class="step-subheading">${isTa ? 'ஒவ்வொரு சிகிச்சையும் தனிநபர் சுகாதாரம் மற்றும் சர்வதேச தரத்துடன் செய்யப்படுகிறது.' : 'All procedures conducted in 100% sterile environment with certified single-use tools.'}</p>

          <div class="services-radio-grid">
            ${CLINIC_DATA.treatments.map(t => `
              <label class="service-radio-card ${this.bookingData.serviceId === t.id ? 'selected' : ''}">
                <input type="radio" name="service_option" value="${t.id}" ${this.bookingData.serviceId === t.id ? 'checked' : ''}>
                <div class="card-inner">
                  <div class="card-icon-area">
                    <i class="fa-solid fa-staff-snake"></i>
                  </div>
                  <div class="card-details">
                    <h4>${isTa ? t.nameTa : t.name}</h4>
                    <p class="service-desc">${isTa ? t.shortDescTa : t.shortDesc}</p>
                    <div class="meta-row">
                      <span class="duration text-muted"><i class="fa-solid fa-clock"></i> ${t.duration}</span>
                      <span class="price-tag">${isTa ? 'தொடக்க கட்டணம்' : 'From'} ${t.startingPrice}</span>
                    </div>
                  </div>
                </div>
              </label>
            `).join('')}
          </div>

          <div class="wizard-footer-buttons">
            <button type="button" class="btn btn-secondary close-modal-btn">${isTa ? 'ரத்து செய்க' : 'Cancel'}</button>
            <button type="button" class="btn btn-primary next-step-btn">
              <span>${isTa ? 'அடுத்த படி: தேதி தேர்வு' : 'Next: Select Date & Time'}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    }

    // Step 2: Select Date & Time
    else if (this.currentStep === 2) {
      html = `
        <div class="wizard-step-body">
          <div class="step-progress-indicator">
            <span class="step-item completed"><i class="fa-solid fa-check"></i> 1</span>
            <span class="step-item active">2. ${isTa ? 'தேதி & நேரம்' : 'Date & Time'}</span>
            <span class="step-item">3. ${isTa ? 'விவரம்' : 'Details'}</span>
            <span class="step-item">4. ${isTa ? 'உறுதி' : 'Confirm'}</span>
          </div>

          <h3 class="step-heading">${isTa ? 'வருகை தேதி மற்றும் நேரத்தை தேர்வு செய்க' : 'Select Preferred Appointment Slot'}</h3>
          <p class="step-subheading">${isTa ? 'ஞாயிற்றுக்கிழமை முன்கூட்டியே பதிவு செய்தவர்களுக்கு மட்டுமே அனுமதிக்கப்படும்.' : 'Sunday clinic slots available strictly upon advance online reservation.'}</p>

          <div class="slot-selection-form" style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem;">
            <div class="form-group">
              <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;"><i class="fa-solid fa-calendar-days text-primary"></i> ${isTa ? 'சிகிச்சை தேதி (Date):' : 'Preferred Date:'}</label>
              <input type="date" id="booking-date-input" class="form-control" value="${this.bookingData.date}" min="${new Date().toISOString().split('T')[0]}">
            </div>

            <div class="form-group">
              <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;"><i class="fa-solid fa-clock text-primary"></i> ${isTa ? 'நேர இடைவெளி (Available Time Slots):' : 'Available Time Window:'}</label>
              <select id="booking-time-slot" class="form-control select-control">
                <optgroup label="${isTa ? 'காலை அமர்வுகள் (Morning Slots)' : 'Morning Slots (9:00 AM - 1:00 PM)'}">
                  <option value="09:30 AM - 10:30 AM (Morning)">09:30 AM - 10:30 AM</option>
                  <option value="10:30 AM - 11:30 AM (Morning)" selected>10:30 AM - 11:30 AM</option>
                  <option value="11:30 AM - 12:30 PM (Morning)">11:30 AM - 12:30 PM</option>
                </optgroup>
                <optgroup label="${isTa ? 'மதிய அமர்வுகள் (Afternoon Slots)' : 'Afternoon Slots (2:00 PM - 5:00 PM)'}">
                  <option value="02:30 PM - 03:30 PM (Afternoon)">02:30 PM - 03:30 PM</option>
                  <option value="03:30 PM - 04:30 PM (Afternoon)">03:30 PM - 04:30 PM</option>
                </optgroup>
                <optgroup label="${isTa ? 'மாலை அமர்வுகள் (Evening Slots)' : 'Evening Slots (5:00 PM - 8:30 PM)'}">
                  <option value="05:30 PM - 06:30 PM (Evening)">05:30 PM - 06:30 PM</option>
                  <option value="06:30 PM - 07:30 PM (Evening)">06:30 PM - 07:30 PM</option>
                  <option value="07:30 PM - 08:30 PM (Evening)">07:30 PM - 08:30 PM</option>
                </optgroup>
              </select>
            </div>

            <div style="display: flex; align-items: center; gap: 0.85rem; padding: 1rem; background: var(--bg-surface-subtle); border-radius: var(--radius-sm); border: 1px solid var(--border-card);">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary); color: #ffffff; display: flex; align-items: center; justify-content: center;">
                <i class="fa-solid fa-user-doctor"></i>
              </div>
              <div>
                <strong style="display: block; font-size: 0.95rem;">${isTa ? CLINIC_DATA.doctor.nameTa : CLINIC_DATA.doctor.name}</strong>
                <small style="color: var(--text-muted);">${isTa ? CLINIC_DATA.doctor.titleTa : CLINIC_DATA.doctor.title}</small>
              </div>
            </div>
          </div>

          <div class="wizard-footer-buttons">
            <button type="button" class="btn btn-secondary prev-step-btn"><i class="fa-solid fa-arrow-left"></i> ${isTa ? 'பின்செல்' : 'Back'}</button>
            <button type="button" class="btn btn-primary next-step-btn">
              <span>${isTa ? 'அடுத்த படி: நோயாளி விவரம்' : 'Next: Patient Details'}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    }

    // Step 3: Patient Info
    else if (this.currentStep === 3) {
      html = `
        <div class="wizard-step-body">
          <div class="step-progress-indicator">
            <span class="step-item completed"><i class="fa-solid fa-check"></i> 1</span>
            <span class="step-item completed"><i class="fa-solid fa-check"></i> 2</span>
            <span class="step-item active">3. ${isTa ? 'விவரம்' : 'Patient Details'}</span>
            <span class="step-item">4. ${isTa ? 'உறுதி' : 'Confirm'}</span>
          </div>

          <h3 class="step-heading">${isTa ? 'நோயாளி மற்றும் பிரச்சனை விவரங்களை உள்ளிடவும்' : 'Patient Information & Medical Symptoms'}</h3>
          <p class="step-subheading">${isTa ? 'உங்கள் உடல் நல தகவல்கள் ரகசியமாக பாதுகாக்கப்படும்.' : 'Your clinical consultation details remain strictly confidential.'}</p>

          <div class="patient-form-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 2rem;">
            <div class="form-group" style="grid-column: span 2;">
              <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;"><i class="fa-solid fa-user text-primary"></i> ${isTa ? 'நோயாளி பெயர் (Patient Full Name): *' : 'Patient Full Name: *'}</label>
              <input type="text" id="patient-name-input" class="form-control" placeholder="${isTa ? 'எ.கா: சுந்தர் ராமன்' : 'e.g. Sundar Raman'}" value="${this.bookingData.patientName}" required>
            </div>

            <div class="form-group">
              <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;"><i class="fa-solid fa-phone text-primary"></i> ${isTa ? 'மொபைல் எண் (WhatsApp Phone): *' : 'WhatsApp Phone Number: *'}</label>
              <input type="tel" id="patient-phone-input" class="form-control" placeholder="${isTa ? '10 இலக்க எண்' : '10-digit mobile number'}" value="${this.bookingData.patientPhone}" required>
            </div>

            <div class="form-group">
              <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;"><i class="fa-solid fa-hashtag text-primary"></i> ${isTa ? 'வயது (Age):' : 'Age:'}</label>
              <input type="number" id="patient-age-input" class="form-control" placeholder="e.g. 42" value="${this.bookingData.patientAge}">
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;"><i class="fa-solid fa-venus-mars text-primary"></i> ${isTa ? 'பாலினம் (Gender):' : 'Gender:'}</label>
              <div style="display: flex; gap: 1rem;">
                <label style="flex: 1; display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; background: var(--bg-surface-subtle); border: 1px solid var(--border-card); border-radius: var(--radius-sm); cursor: pointer; font-size: 0.9rem; font-weight: 600;">
                  <input type="radio" name="patient_gender" value="Female" ${this.bookingData.patientGender === 'Female' ? 'checked' : ''}>
                  <span>${isTa ? 'பெண் (Female - Dedicated Privacy)' : 'Female (Dedicated Privacy)'}</span>
                </label>
                <label style="flex: 1; display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; background: var(--bg-surface-subtle); border: 1px solid var(--border-card); border-radius: var(--radius-sm); cursor: pointer; font-size: 0.9rem; font-weight: 600;">
                  <input type="radio" name="patient_gender" value="Male" ${this.bookingData.patientGender === 'Male' ? 'checked' : ''}>
                  <span>${isTa ? 'ஆண் (Male)' : 'Male'}</span>
                </label>
              </div>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;"><i class="fa-solid fa-notes-medical text-primary"></i> ${isTa ? 'முக்கிய பிரச்சனை / அறிகுறிகள் (Primary Symptoms):' : 'Primary Symptoms / Reason for Visit:'}</label>
              <textarea id="patient-symptoms-input" class="form-control" rows="2" placeholder="${isTa ? 'எ.கா: சியாட்டிகா இடுப்பு வலி, ஒற்றைத் தலைவலி, கழுத்து வலி...' : 'e.g. Sciatica back pain, migraine, knee osteoarthritis, Sunnah detox...'}">${this.bookingData.symptoms}</textarea>
            </div>
          </div>

          <div class="wizard-footer-buttons">
            <button type="button" class="btn btn-secondary prev-step-btn"><i class="fa-solid fa-arrow-left"></i> ${isTa ? 'பின்செல்' : 'Back'}</button>
            <button type="button" class="btn btn-primary next-step-btn">
              <span>${isTa ? 'முன்பதிவை உறுதி செய்க' : 'Confirm & Generate Pass'}</span>
              <i class="fa-solid fa-circle-check"></i>
            </button>
          </div>
        </div>
      `;
    }

    // Step 4: Digital Pass Confirmation
    else if (this.currentStep === 4) {
      const whatsappMsg = encodeURIComponent(
        `Hello Dr. Nisha,\nI would like to confirm my appointment at Nisha Acupuncture & Hijama Clinic.\n\n` +
        `🔖 *Pass ID:* ${this.bookingData.referenceId}\n` +
        `👤 *Patient:* ${this.bookingData.patientName} (${this.bookingData.patientGender}, Age ${this.bookingData.patientAge || 'N/A'})\n` +
        `🩺 *Service:* ${this.bookingData.serviceName}\n` +
        `📅 *Date:* ${this.bookingData.date}\n` +
        `⏰ *Time Slot:* ${this.bookingData.timeSlot}\n` +
        `📍 *Location:* EB Colony Main Road, SS Colony/Arasaradi, Madurai-625014\n` +
        `📝 *Symptoms:* ${this.bookingData.symptoms}\n\n` +
        `Please confirm my slot. Thank you!`
      );

      html = `
        <div class="wizard-step-body confirmation-step">
          <div class="confirmation-badge-header">
            <div class="conf-icon-glow">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <h3>${isTa ? 'முன்பதிவு வெற்றிகரமாக முடிந்தது!' : 'Appointment Successfully Registered!'}</h3>
            <p>${isTa ? 'உங்கள் டிஜிட்டல் அப்பாயிண்ட்மென்ட் பாஸ் உருவாக்கப்பட்டுள்ளது.' : 'Your official digital appointment pass is ready.'}</p>
          </div>

          <!-- Digital Clinic Pass Card -->
          <div class="digital-pass-card" id="printable-clinic-pass">
            <div class="pass-header">
              <div class="pass-brand">
                <h4>${isTa ? CLINIC_DATA.info.nameTa : CLINIC_DATA.info.name}</h4>
                <small>${CLINIC_DATA.info.address}</small>
              </div>
              <div class="pass-ref">
                <span style="display: block; font-size: 0.72rem; font-weight: 700; color: var(--color-accent-emerald);">PASS ID</span>
                <strong>${this.bookingData.referenceId}</strong>
              </div>
            </div>

            <div class="pass-body">
              <div class="pass-row">
                <div class="pass-item">
                  <span class="label">${isTa ? 'நோயாளி பெயர்:' : 'Patient Name:'}</span>
                  <span class="val font-bold">${this.bookingData.patientName}</span>
                </div>
                <div class="pass-item">
                  <span class="label">${isTa ? 'தொடர்பு எண்:' : 'Contact:'}</span>
                  <span class="val font-semibold">${this.bookingData.patientPhone}</span>
                </div>
              </div>

              <div class="pass-row">
                <div class="pass-item">
                  <span class="label">${isTa ? 'சிகிச்சை:' : 'Treatment:'}</span>
                  <span class="val text-primary font-bold">${this.bookingData.serviceName}</span>
                </div>
                <div class="pass-item">
                  <span class="label">${isTa ? 'மருத்துவர்:' : 'Consultant:'}</span>
                  <span class="val font-semibold">${this.bookingData.doctorName}</span>
                </div>
              </div>

              <div class="pass-row highlight-box">
                <div class="pass-item">
                  <span class="label">${isTa ? 'தேதி (Date):' : 'Appointment Date:'}</span>
                  <span class="val text-primary font-bold">${this.bookingData.date}</span>
                </div>
                <div class="pass-item">
                  <span class="label">${isTa ? 'நேரம் (Time Slot):' : 'Time Window:'}</span>
                  <span class="val text-primary font-bold">${this.bookingData.timeSlot}</span>
                </div>
              </div>

              <div class="pass-notes" style="margin-top: 0.75rem; padding-top: 0.5rem; border-top: 1px solid var(--border-subtle);">
                <small><strong>${isTa ? 'அறிகுறிகள்:' : 'Symptoms:'}</strong> ${this.bookingData.symptoms}</small>
              </div>
            </div>

            <div class="pass-footer">
              <small><i class="fa-solid fa-circle-info text-primary"></i> ${isTa ? 'தயவுசெய்து சிகிச்சைக்கு 10 நிமிடங்கள் முன்பாக கிளினிக்கிற்கு வரவும்.' : 'Please arrive 10 mins before your scheduled time. Fast 2 hrs prior for Hijama.'}</small>
              <small class="phone-foot font-bold text-primary"><i class="fa-solid fa-phone"></i> ${CLINIC_DATA.info.phone}</small>
            </div>
          </div>

          <!-- Direct WhatsApp Instant Sync CTA -->
          <div class="confirmation-actions">
            <a href="https://wa.me/${CLINIC_DATA.info.whatsapp}?text=${whatsappMsg}" target="_blank" class="btn btn-whatsapp btn-block">
              <i class="fa-brands fa-whatsapp" style="font-size: 1.25rem;"></i>
              <span>${isTa ? 'வாட்ஸ்அப் மூலம் உடனடியாக மருத்துவருக்கு அனுப்பவும்' : 'Send & Confirm via WhatsApp (+91 96884 18786)'}</span>
            </a>

            <div class="secondary-pass-actions">
              <button type="button" class="btn btn-outline-primary print-pass-btn" onclick="window.print()">
                <i class="fa-solid fa-print"></i>
                <span>${isTa ? 'பாஸ் பிரிண்ட் / சேவ்' : 'Print / Save Pass'}</span>
              </button>
              <button type="button" class="btn btn-secondary close-modal-btn">
                <span>${isTa ? 'நிறைவு' : 'Close'}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
    this.attachStepEvents();
  }

  attachStepEvents() {
    const nextBtn = this.modal.querySelector('.next-step-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextStep());
    }

    const prevBtn = this.modal.querySelector('.prev-step-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevStep());
    }

    this.modal.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    const serviceCards = this.modal.querySelectorAll('.service-radio-card');
    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        serviceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
  }
}

window.BookingWizard = BookingWizard;
