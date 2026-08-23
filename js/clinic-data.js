/**
 * Nisha Acupuncture & Hijama Clinic - Core Data & Multilingual Content
 * Madurai, Tamil Nadu
 */

const CLINIC_DATA = {
  info: {
    name: "Nisha Acupuncture & Hijama Clinic",
    nameTa: "நிஷா அக்குபஞ்சர் மற்றும் ஹிஜாமா கிளினிக்",
    tagline: "Natural Healing • Certified Holistic Pain Relief • Authentic Hijama Cupping",
    taglineTa: "இயற்கை சிகிச்சை • முழுமையான வலி நிவாரணம் • பாரம்பரிய ஹிஜாமா சிகிச்சை",
    phone: "+91 96884 18786",
    phoneRaw: "+919688418786",
    whatsapp: "919688418786",
    email: "care@nishaacupuncture.com",
    address: "EB Colony Main Road, SS Colony / Arasaradi / Iyer Bungalow Area, Madurai - 625014, Tamil Nadu",
    addressTa: "இபி காலனி மெயின் ரோடு, எஸ்.எஸ் காலனி / அரசரடி / ஐயர் பங்களா, மதுரை - 625014, தமிழ்நாடு",
    landmark: "Near EB Colony Arch, Accessible from SS Colony 1st Street & Arasaradi Main Road",
    landmarkTa: "இபி காலனி ஆர்ச் அருகில், எஸ்.எஸ் காலனி மற்றும் அரசரடி மெயின் ரோடு வழித்தடம்",
    hours: {
      weekday: "9:00 AM - 8:30 PM",
      saturday: "9:00 AM - 8:30 PM",
      sunday: "10:00 AM - 2:00 PM (Prior Appointment Only)",
      sunnahDays: "Special Extended Shifts on 17th, 19th & 21st Hijri"
    },
    rating: 4.9,
    reviewsCount: 284,
    established: "2014",
    patientsHealed: "12,500+"
  },

  doctor: {
    name: "Dr. Nisha S. MD(Acu), BAMS(Alt), CHC",
    nameTa: "டாக்டர். நிஷா S. MD(Acu), BAMS(Alt), CHC",
    title: "Senior Holistic Acupuncturist & Certified Master Hijama Specialist",
    titleTa: "மூத்த அக்குபஞ்சர் மற்றும் சான்றளிக்கப்பட்ட மாஸ்டர் ஹிஜாமா சிறப்பு மருத்துவர்",
    experience: "12+ Years Clinical Excellence in Madurai",
    experienceTa: "மதுரையில் 12+ ஆண்டுகள் மருத்துவ அனுபவம்",
    bio: "Specializing in Master Tung classical acupuncture, medical wet cupping (Hijama), and deep meridian rehabilitation for chronic musculoskeletal and neurological ailments.",
    bioTa: "நாள்பட்ட மூட்டு, தசை, நரம்பு வலிகள் மற்றும் உடல் நச்சு நீக்கத்திற்கு மாஸ்டர் டங் அக்குபஞ்சர் மற்றும் முறையான ஹிஜாமா சிகிச்சை அளிப்பதில் தேர்ச்சி பெற்றவர்.",
    certifications: [
      "Board Certified Acupuncture Practitioner (TCM & Master Tung)",
      "Certified Medical Hijama (Wet Cupping) Practitioner (UK & Indo Standards)",
      "Specialist in Pain Management & Post-Stroke Rehabilitation",
      "Member of International Association of Hijama Therapy"
    ]
  },

  treatments: [
    {
      id: "classical-acupuncture",
      name: "Classical & Master Tung Acupuncture",
      nameTa: "பாரம்பரிய & மாஸ்டர் டங் அக்குபஞ்சர்",
      shortDesc: "Hair-thin sterile Japanese needles activating energy meridians to trigger natural endorphin pain relief and organ balance.",
      shortDescTa: "மெல்லிய மலட்டு ஊசிகள் மூலம் உடலின் ஆற்றல் புள்ளிகளை தூண்டி நரம்பு மற்றும் நாள்பட்ட வலிகளை முழுமையாக குணப்படுத்தும் முறை.",
      duration: "45 - 60 Mins",
      idealFor: ["Sciatica & Lumbar Disc Herniation", "Cervical Spondylosis & Neck Pain", "Migraine & Chronic Headaches", "Paralysis & Bell's Palsy Rehab", "Knee Arthritis & Joint Pain"],
      benefits: ["Zero side effects", "Natural endorphin release", "Restores nerve conduction", "Long-term lasting relief"],
      image: "assets/images/acupuncture_treatment.jpg",
      startingPrice: "₹500",
      featured: true
    },
    {
      id: "wet-cupping-hijama",
      name: "Clinical Hijama (Wet Cupping Therapy)",
      nameTa: "மருத்துவ முறை ஹிஜாமா (ஈரக்கப்பிங்)",
      shortDesc: "Authentic Sunnah-compliant medical detox using 100% single-use disposable vacuum cups and sterile micro-incisions to extract stagnant toxic blood.",
      shortDescTa: "உடலில் தேங்கியுள்ள நச்சுக் குருதியை 100% தூய்மையான ஒருமுறை பயன்படுத்தும் கப்கள் மூலம் வெளியேற்றும் அசல் நபிவழி நச்சு நீக்க சிகிச்சை.",
      duration: "45 Mins",
      idealFor: ["Full Body Toxin Cleanse & Immunity", "High Uric Acid & Gout", "Back Pain & Muscle Spasms", "Skin Eczema & Blood Purification", "Lethargy, Fatigue & Heavy Head"],
      benefits: ["Stimulates lymphatic drainage", "Reduces systemic inflammation", "Immediate feeling of lightness", "Complies with Sunnah calendar"],
      image: "assets/images/hijama_cupping.jpg",
      startingPrice: "₹700",
      featured: true
    },
    {
      id: "dry-fire-cupping",
      name: "Dry & Moving Fire Cupping",
      nameTa: "டிரை மற்றும் ஃபயர் கப்பிங் சிகிச்சை",
      shortDesc: "Non-invasive suction therapy combined with herbal oil glides to break fascia adhesions and improve deep microcirculation.",
      shortDescTa: "எண்ணெய் மசாஜ் மற்றும் காற்று வெற்றிட கப்கள் மூலம் தசை இறுக்கம் மற்றும் ரத்த ஓட்டத்தை சீராக்கும் எளிய சிகிச்சை.",
      duration: "30 - 45 Mins",
      idealFor: ["Athletic Muscle Knots & Sprains", "Shoulder & Upper Back Stiffness", "Cellulite & Lymphatic Stagnation", "Digestive Sluggishness"],
      benefits: ["Instant muscle knot release", "Non-invasive, no cuts", "Promotes cellular oxygenation", "Deep relaxation"],
      image: "assets/images/hijama_cupping.jpg",
      startingPrice: "₹500",
      featured: false
    },
    {
      id: "moxibustion-therapy",
      name: "Warm Herbal Moxibustion (Moxa)",
      nameTa: "மூலிகை மாக்ஸிபஸ்டன் வெப்ப சிகிச்சை",
      shortDesc: "Thermal therapy burning pure aged mugwort herb over specific acupoints to dispel cold dampness, nourish Qi, and heal degenerative joints.",
      shortDescTa: "உடலில் உள்ள குளிர்ச்சி மற்றும் வாதத்தை நீக்கி, மூட்டுகளுக்கு புத்துயிர் அளிக்கும் மூலிகை வெப்ப அக்குபஞ்சர் முறை.",
      duration: "30 Mins",
      idealFor: ["Rheumatoid & Osteoarthritis", "Chronic Cold Extremities", "Menstrual Cramps & Infertility Qi", "Asthma & Sinusitis"],
      benefits: ["Deep penetrating soothing heat", "Boosts core metabolic fire", "Immunity booster", "Soothes osteo-degenerative pain"],
      image: "assets/images/moxibustion_therapy.jpg",
      startingPrice: "₹450",
      featured: false
    },
    {
      id: "pain-rehab-combo",
      name: "Comprehensive Integrated Pain Package",
      nameTa: "ஒருங்கிணைந்த முழுமையான வலி நிவாரண சிகிச்சை",
      shortDesc: "Synergistic protocol combining Acupuncture, targeted Hijama, Moxibustion, and Acupressure for complex chronic disorders.",
      shortDescTa: "அக்குபஞ்சர், ஹிஜாமா மற்றும் மாக்ஸிபஸ்டன் ஆகிய மூன்றையும் இணைத்து வழங்கப்படும் தீவிர நாள்பட்ட நோய்களுக்கான சிறப்பு சிகிச்சை.",
      duration: "75 Mins",
      idealFor: ["Severe Sciatica / Slipped Disc", "Multi-Joint Osteoarthritis", "Frozen Shoulder (Stage 2/3)", "Post-Operative Chronic Stiffness"],
      benefits: ["Fastest recovery trajectory", "Multidimensional tissue healing", "Customized dietary & posture guidance"],
      image: "assets/images/hero_clinic_serene.jpg",
      startingPrice: "₹1,200",
      featured: true
    }
  ],

  bodyPainMap: [
    {
      id: "head-migraine",
      bodyPart: "Head & Face (தலை மற்றும் முகம்)",
      symptoms: ["Migraine & Throbbing Headaches", "Sinusitis & Nasal Block", "Insomnia & Sleep Apnea", "Bell's Palsy / Facial Nerve Weakness", "Eye Strain & Stress"],
      acupoints: ["GB20 (Fengchi)", "Yintang (Third Eye)", "Taiyang", "LI4 (Hegu)", "DU20 (Baihui)"],
      hijamaPoints: ["Kahil (Neck Base)", "Akhda'ain (Lateral Neck)", "Yafook (Crown)"],
      sessionsAvg: "3 - 5 Sessions",
      reliefRate: "94% Patients Report Long-term Relief",
      recommendedService: "classical-acupuncture"
    },
    {
      id: "neck-cervical",
      bodyPart: "Neck & Cervical Spine (கழுத்து மற்றும் தோள்பட்டை)",
      symptoms: ["Cervical Spondylosis", "Neck Stiffness & Trapezius Spasms", "Tingling Numbness Radiating to Arms", "Tech Neck & Posture Strain"],
      acupoints: ["GB21 (Jianjing)", "SI14", "BL10 (Tianzhu)", "LU7", "SI3"],
      hijamaPoints: ["Kahil (Inter-scapular / C7)", "Upper Shoulder Cups (1, 55, 22)"],
      sessionsAvg: "4 - 6 Sessions",
      reliefRate: "92% Full Mobility Restored",
      recommendedService: "pain-rehab-combo"
    },
    {
      id: "shoulder-frozen",
      bodyPart: "Shoulder & Upper Limbs (தோள்பட்டை மற்றும் கைகள்)",
      symptoms: ["Frozen Shoulder (Adhesive Capsulitis)", "Rotator Cuff Tendinitis", "Tennis / Golfer's Elbow", "Carpal Tunnel Syndrome"],
      acupoints: ["LI15 (Jianyu)", "SJ14", "SI9", "LI11 (Quchi)", "Master Tung 77-01"],
      hijamaPoints: ["Shoulder Blade Apex", "Deltoid Margin"],
      sessionsAvg: "5 - 7 Sessions",
      reliefRate: "89% Pain-free Range of Motion",
      recommendedService: "pain-rehab-combo"
    },
    {
      id: "lower-back-sciatica",
      bodyPart: "Lower Back & Sciatic Nerve (இடுப்பு மற்றும் சியாட்டிகா)",
      symptoms: ["L4-L5 / L5-S1 Disc Bulge", "Sciatica Shooting Pain to Legs", "Lumbar Muscle Spasms & Stiffness", "Coccyx / Tailbone Pain"],
      acupoints: ["BL23 (Shenshu)", "BL25 (Dachangshu)", "GB30 (Huantiao)", "BL40 (Weizhong)", "Yaoyan"],
      hijamaPoints: ["Lumbar Region (Points 11, 12, 13)", "Sacral Apex (Point 54)"],
      sessionsAvg: "5 - 8 Sessions",
      reliefRate: "96% Avoided Surgical Intervention",
      recommendedService: "pain-rehab-combo"
    },
    {
      id: "knee-joints",
      bodyPart: "Knee & Leg Joints (முழங்கால் மற்றும் மூட்டுகள்)",
      symptoms: ["Knee Osteoarthritis", "Meniscus & Ligament Strain", "Gout & Swollen Ankle Joint", "Plantar Fasciitis / Heel Pain"],
      acupoints: ["ST35 (Dubi - Eye of Knee)", "Xiyan", "SP9 (Yinlingquan)", "GB34 (Yanglingquan)", "ST36 (Zusanli)", "KD3 (Taixi)"],
      hijamaPoints: ["Peripatellar Cups", "Popliteal Detox Point"],
      sessionsAvg: "4 - 6 Sessions",
      reliefRate: "91% Joint Lubrication & Mobility Boost",
      recommendedService: "moxibustion-therapy"
    },
    {
      id: "abdomen-metabolism",
      bodyPart: "Abdomen & Internal Balance (வயிறு & மகளிர் நலம்)",
      symptoms: ["PCOD / PCOS & Irregular Cycles", "Severe Menstrual Dysmenorrhea", "IBS, Acid Reflux & Bloating", "Fatty Liver & High Cholesterol", "Metabolic Weight Sluggishness"],
      acupoints: ["CV12 (Zhongwan)", "ST25 (Tianshu)", "CV6 (Qihai)", "SP6 (Sanyinjiao)", "LR3 (Taichong)"],
      hijamaPoints: ["Upper Abdominal Meridian Support", "Lower Sacral Points (49, 125, 126)"],
      sessionsAvg: "3 - 5 Sessions",
      reliefRate: "88% Hormonal & Digestive Regularity",
      recommendedService: "wet-cupping-hijama"
    }
  ],

  hygieneProtocols: [
    {
      step: "01",
      title: "100% Single-Use Sterile Cups",
      titleTa: "100% ஒருமுறை மட்டும் பயன்படுத்தப்படும் கப்கள்",
      desc: "Each Hijama cup is individually hermetically sealed in medical blister packaging and discarded immediately after one treatment in bio-hazard bins. No recycled cups ever."
    },
    {
      step: "02",
      title: "Single-Use Japanese Surgical Needles",
      titleTa: "ஜப்பானிய அறுவைசிகிச்சை தர ஊசிகள்",
      desc: "Highest grade surgical stainless steel acupuncture needles, micro-polished for virtually painless entry, sterilized via Gamma radiation."
    },
    {
      step: "03",
      title: "Double Medical Disinfection Prep",
      titleTa: "இருமுறை தோல் சுத்திகரிப்பு முறை",
      desc: "Hospital-grade Chlorhexidine and isopropyl alcohol sterilization before and after treatment to ensure completely infection-free skin healing."
    },
    {
      step: "04",
      title: "Air Purification & Soothing Atmosphere",
      titleTa: "தூய காற்று மற்றும் அமைதியான சூழல்",
      desc: "HEPA air filtration, calming essential oils, bamboo ambiance, and private curtained treatment cubicles for men and women with dedicated privacy."
    }
  ],

  testimonials: [
    {
      name: "M. Abdul Rahman",
      location: "SS Colony, Madurai",
      condition: "Severe Sciatica & Lumbar Disc Pain",
      rating: 5,
      date: "2 weeks ago",
      text: "I was suffering from excruciating sciatica pain radiating down to my left leg for over 9 months. I was recommended surgery by ortho doctors. Dr. Nisha's integrated acupuncture and hijama sessions gave me 80% relief within 4 visits. Today I walk normally with zero pain. True blessing in Madurai!",
      textTa: "கடந்த 9 மாதங்களாக கடுமையான சியாட்டிகா இடுப்பு வலியால் அவதிப்பட்டேன். டாக்டர் நிஷாவின் அக்குபஞ்சர் மற்றும் ஹிஜாமா சிகிச்சை மூலம் 4 அமர்வுகளிலேயே 80% வலி நீங்கியது. இப்போது சுலபமாக நடக்க முடிகிறது."
    },
    {
      name: "K. Meenakshi Sundaram",
      location: "Iyer Bungalow, Madurai",
      condition: "Chronic Knee Osteoarthritis",
      rating: 5,
      date: "1 month ago",
      text: "At 58 years, climbing stairs in my house was almost impossible due to knee swelling and joint friction. The Moxibustion and Acupuncture treatment here reduced my joint stiffness drastically. Dr. Nisha takes time to explain every point with great patience.",
      textTa: "58 வயதில் மாடிப்படி ஏறுவது முழங்கால் வலியால் மிக கடினமாக இருந்தது. இங்கு எடுத்த அக்குபஞ்சர் மற்றும் மாக்ஸிபஸ்டன் சிகிச்சை முழங்கால் வீக்கத்தையும் வலியையும் வியக்கத்தக்க வகையில் குறைத்தது."
    },
    {
      name: "S. Fathima Begum",
      location: "Arasaradi, Madurai",
      condition: "Sunnah Hijama & Migraine Detox",
      rating: 5,
      date: "3 weeks ago",
      text: "I come regularly for Sunnah Hijama days (17th, 19th & 21st). The hygiene standard is exceptional — sealed fresh cups opened in front of us, painless micro-scratching, and female therapist privacy. My heavy migraines vanished completely.",
      textTa: "சுன்னத் ஹிஜாமா நாட்களுக்காக தொடர்ந்து வருகிறேன். கப்கள் அனைத்தும் கண் முன்னரே பிரிக்கப்படும் அளவுக்கு தூய்மை அருமை. தலைவலி மற்றும் உடல் சோர்வு முற்றிலும் நீங்கிவிட்டது."
    },
    {
      name: "R. Karthikeyan",
      location: "EB Colony Main Rd, Madurai",
      condition: "Cervical Spondylosis & Frozen Shoulder",
      rating: 5,
      date: "Recent Patient",
      text: "Sitting at a desk for 10 hours daily froze my right shoulder and created unbearable neck spasms. 5 sessions of acupuncture + dry cupping restored 100% arm movement without taking any painkiller tablets. Highly recommend Nisha Clinic!",
      textTa: "கணினி பணியால் ஏற்பட்ட கழுத்து மற்றும் தோள்பட்டை இறுக்கம் 5 அமர்வு சிகிச்சையிலேயே மாத்திரைகள் ஏதுமின்றி முற்றிலும் சரியானது."
    }
  ],

  pricingPackages: [
    {
      name: "Essential Single Session",
      nameTa: "அடிப்படை ஒற்றை அமர்வு",
      price: "₹600",
      validity: "Per Session",
      features: [
        "Comprehensive Pulse & Tongue Diagnosis",
        "Targeted Acupuncture (Needles included)",
        "Post-treatment Herbal Acupressure",
        "Lifestyle & Diet Consultation"
      ],
      badge: "Ideal for Quick Relief",
      recommendedFor: "Acute sprains, mild headaches & muscle knots"
    },
    {
      name: "Sunnah Hijama Detox Session",
      nameTa: "சுன்னத் ஹிஜாமா டிடாக்ஸ் அமர்வு",
      price: "₹850",
      validity: "Per Full Detox Session",
      features: [
        "Up to 8-10 Single-Use Sterile Medical Cups",
        "Sunnah Meridian Point Activation",
        "Antiseptic Skin Dressing & Black Seed Oil",
        "Herbal Detox Green Tea Post-Session"
      ],
      badge: "Most Popular",
      highlight: true,
      recommendedFor: "Blood detox, migraine, chronic fatigue & immunity"
    },
    {
      name: "Chronic Pain Recovery Package",
      nameTa: "நாள்பட்ட வலி நிவாரண தொகுப்பு (5 அமர்வுகள்)",
      price: "₹2,799",
      originalPrice: "₹3,500",
      validity: "5 Comprehensive Sessions",
      features: [
        "Acupuncture + Wet/Dry Cupping Combo",
        "Herbal Moxibustion Heat Therapy included",
        "Priority Sunnah slot reservations",
        "Personalized Exercise & Ergonomic Plan",
        "20% Savings over individual sessions"
      ],
      badge: "Best Value Recovery",
      recommendedFor: "Sciatica, Disc Bulge, Cervical Spondylosis, Arthritis"
    }
  ],

  faqs: [
    {
      q: "Does Acupuncture hurt? How thin are the needles?",
      qTa: "அக்குபஞ்சர் ஊசி போடும் போது வலிக்குமா? ஊசிகள் எவ்வளவு மெல்லியவை?",
      a: "Acupuncture needles are hair-thin (0.20mm - 0.25mm) and flexible — about 20 times thinner than a typical medical injection needle! Most patients feel only a tiny tingling or warming sensation (De-Qi), and frequently fall asleep peacefully during the session.",
      aTa: "அக்குபஞ்சர் ஊசிகள் நமது தலைமுடியை விட மிக மெல்லியவை (0.20 மி.மீ). சாதாரண தடுப்பூசிகளைப் போல் வலியே இருக்காது. ஒரு சிறு எறும்பு கடிப்பது போன்ற உணர்வு மட்டுமே இருக்கும்; பெரும்பாலான நோயாளிகள் சிகிச்சை நேரத்தில் அமைதியாக தூங்கிவிடுவர்."
    },
    {
      q: "What is Hijama (Wet Cupping) and how safe is the hygiene here?",
      qTa: "ஹிஜாமா (ஈரக்கப்பிங்) என்றால் என்ன? இங்கு சுகாதாரம் எவ்வாறு பேணப்படுகிறது?",
      a: "Hijama is a medical cupping therapy that extracts sluggish, toxic capillary blood laden with dead cells and metabolic waste. At Nisha Clinic, we follow hospital-grade sterilization: 100% single-use disposable cups opened in front of you, surgical lancets, and biological waste disposal.",
      aTa: "ஹிஜாமா என்பது உடலில் தேங்கியுள்ள இறந்த அணுக்கள் மற்றும் நச்சுக் குருதியை வெளியேற்றும் உன்னத சிகிச்சை. நிஷா கிளினிக்கில் 100% ஒருமுறை மட்டுமே பயன்படுத்தப்படும் முத்திரையிடப்பட்ட கப்கள் உங்கள் கண் முன்னரே பிரிக்கப்பட்டு பயன்படுத்தப்படுகின்றன."
    },
    {
      q: "What are the recommended Sunnah days for Hijama in Islamic tradition?",
      qTa: "இஸ்லாமிய மரபில் ஹிஜாமா எடுக்க சிறந்த சுன்னத் நாட்கள் யாவை?",
      a: "Prophetic tradition recommends Hijama on the 17th, 19th, and 21st days of the Islamic Lunar (Hijri) month, especially when these dates fall on Monday, Tuesday, or Thursday. However, for severe or emergency pain (e.g. sciatica, acute migraines), Hijama can be performed safely on any day.",
      aTa: "இஸ்லாமிய சந்திர மாதத்தின் 17, 19 மற்றும் 21-ஆம் நாட்கள் மிகச் சிறந்த சுன்னத் நாட்களாகும். எனினும் நாள்பட்ட அல்லது தீவிர வலிக்கு எந்த நாளிலும் ஹிஜாமா செய்து நிவாரணம் பெறலாம்."
    },
    {
      q: "How many sessions are typically required for chronic pain like Sciatica or Arthritis?",
      qTa: "சியாட்டிகா அல்லது மூட்டு வலிக்கு எத்தனை அமர்வுகள் தேவைப்படும்?",
      a: "Acute pain (recent sprains) often resolves in 1-3 sessions. Chronic conditions like sciatica, cervical spondylosis, or knee osteoarthritis typically require 4 to 8 sessions for long-lasting tissue regeneration and nerve stabilization.",
      aTa: "சமீபத்திய வலிகள் 1 முதல் 3 அமர்வுகளில் சரியாகும். நாள்பட்ட சியாட்டிகா, டிஸ்க் பிரச்சனை, மூட்டு தேய்மானம் போன்றவற்றுக்கு 4 முதல் 8 அமர்வுகள் பரிந்துரைக்கப்படுகிறது."
    },
    {
      q: "What precautions should I take before and after Hijama?",
      qTa: "ஹிஜாமா எடுப்பதற்கு முன்னும் பின்னும் என்ன முன்னெச்சரிக்கைகள் தேவை?",
      a: "Before Hijama: Fast from heavy meals for 2 to 3 hours (light water/honey is fine). After Hijama: Stay warm, drink warm water or pomegranate juice, avoid heavy strenuous workouts and dairy/red meat for 24 hours to maximize detoxification.",
      aTa: "முன் தயாரிப்பு: 2-3 மணி நேரம் கனமான உணவு உண்பதை தவிர்க்கவும். சிகிச்சை பின்: வெதுவெதுப்பான நீர் அருந்தவும், 24 மணி நேரத்திற்கு கடின உடற்பயிற்சி மற்றும் அசைவ உணவுகளை தவிர்ப்பது நல்லது."
    }
  ]
};

// Expose to window
window.CLINIC_DATA = CLINIC_DATA;
