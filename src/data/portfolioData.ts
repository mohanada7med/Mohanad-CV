export type Language = 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';

export type ProjectCategory =
  | 'Brand Story'
  | 'UGC & Hooks'
  | 'Food & Beverage'
  | 'Tech & Lifestyle'
  | 'Fashion & Urban'
  | 'Local Places & Experiences';

export interface Project {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  brand: string;
  brand_ar: string;
  category: ProjectCategory;
  category_ar: string;
  thumbnail: string;
  video_url: string;
  external_url?: string;
  description_en: string;
  description_ar: string;
  creative_concept_en: string;
  creative_concept_ar: string;
  campaign_objective_en: string;
  campaign_objective_ar: string;
  results_en?: string;
  results_ar?: string;
  duration: string;
  aspect_ratio: '9:16' | '16:9';
  year: string;
  featured: boolean;
  tags: string[];
}

export interface BrandPartner {
  id: string;
  name: string;
  name_ar: string;
  sector_en: string;
  sector_ar: string;
  description_en: string;
  description_ar: string;
  badge: string;
  featuredProjectId?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title_en: string;
  title_ar: string;
  short_desc_en: string;
  short_desc_ar: string;
  deliverables_en: string[];
  deliverables_ar: string[];
  icon_name?: string;
  color?: string;
}

export interface EducationItem {
  id: string;
  year: string;
  degree_en: string;
  degree_ar: string;
  institution_en: string;
  institution_ar: string;
  location_en: string;
  location_ar: string;
  description_en: string;
  description_ar: string;
  focus_areas_en: string[];
  focus_areas_ar: string[];
  badge: string;
  color: string;
}

export interface ExperienceItem {
  id: string;
  period_en: string;
  period_ar: string;
  role_en: string;
  role_ar: string;
  company_en: string;
  company_ar: string;
  type_en: string;
  type_ar: string;
  description_en: string;
  description_ar: string;
  highlights_en: string[];
  highlights_ar: string[];
  color: string;
  badge_en: string;
  badge_ar: string;
}

export interface CertificationItem {
  id: string;
  title_en: string;
  title_ar: string;
  issuer_en: string;
  issuer_ar: string;
  year: string;
  credential_en: string;
  credential_ar: string;
  skills: string[];
  badge_color: string;
}

export interface SkillItem {
  name_en: string;
  name_ar: string;
  role_en: string;
  role_ar: string;
  level: string;
  level_percent: number;
  tools: string[];
  color: string;
  icon: string;
}

export interface TimelineMilestone {
  year: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  tag_en?: string;
  tag_ar?: string;
  icon?: string;
}

export interface ProcessStep {
  number: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  tag_en: string;
  tag_ar: string;
}

/**
 * Portfolio content is intentionally based on genuine personal and professional background.
 * Genuine collaborations: B.Laban, Qasr Napoli, Bella, Yango Play.
 * Creator based in Assiut, Egypt, active since 2019.
 */
export const PORTFOLIO_DATA = {
  creator: {
    name_en: 'Mohanad Ahmed',
    name_ar: 'مهند أحمد',
    nickname_en: 'The Visual Storyteller',
    nickname_ar: 'راوي الحكايات البصرية',
    role_en: 'Content Creator • Video Creator • Storyteller',
    role_ar: 'صانع محتوى • صانع فيديوهات • راوي حكايات',
    location_en: 'Assiut, Egypt',
    location_ar: 'أسيوط، مصر',
    since_year: '2019',
    portrait_image: '/assets/images/mohanad_action_pose.jpg',
    avatar_image: '/assets/images/mohanad_cartoon_avatar.jpg',
    bts_image: '/assets/images/bts_production.jpg',
    email: 'ahmdmohanad28@gmail.com',
    whatsapp: '',
    socials: {
      tiktok: '',
      instagram: '',
      whatsapp: '',
      youtube: '',
      behance: '',
    },
  },

  // EDUCATION & FOUNDATION
  education: [
    {
      id: 'cinematic-storytelling',
      year: '2019 — Present',
      degree_en: 'Self-Directed Cinematography & Visual Storytelling Mastery',
      degree_ar: 'دراسة وممارسة حرة في التصوير السينمائي وصناعة المحتوى',
      institution_en: 'Independent Field Studies & Masterclasses',
      institution_ar: 'دراسة وتدريب حر وورش عمل متخصصة',
      location_en: 'Egypt',
      location_ar: 'مصر',
      description_en:
        'Continuous deep-dive into digital cinematography, lighting setup, narrative pacing, and post-production workflows for short-form media.',
      description_ar:
        'تعلم وتطبيق عملي مستمر لأساسيات التصوير السينمائي، توزيع الإضاءة، إيقاع السرد القصصي، ومونتاج الفيديوهات الرقمية الحديثة.',
      focus_areas_en: ['Camera Blocking', 'Lighting Rigs', 'Color Science', 'Short-Form Retention'],
      focus_areas_ar: ['تكوين الكادر', 'هندسة الإضاءة', 'علم الألوان', 'سيكولوجية جذب الانتباه'],
      badge: 'CRAFT MASTERY',
      color: '#ccff00',
    },
    {
      id: 'digital-production',
      year: 'Practical Experience',
      degree_en: 'Hands-On Commercial Production & Directing',
      degree_ar: 'تدريب ميداني وإنتاج إعلاني ومحتوى تجاري',
      institution_en: 'On-Location Commercial Sets',
      institution_ar: 'تصوير وإنتاج ميداني لمشروعات حقيقية',
      location_en: 'Assiut & Across Egypt',
      location_ar: 'أسيوط ومحافظات مصر',
      description_en:
        'Direct on-set experience directing commercial video shoots, coordinating product captures, and delivering finished assets for client campaigns.',
      description_ar:
        'خبرة عملية مباشرة في مواقع العمل لتصوير الفيديوهات الإعلانية، وتنسيق لقطات المنتجات والأماكن، وتسليم مواد بصرية جاهزة للنشر.',
      focus_areas_en: ['Set Directing', 'Venue Coverage', 'Product Filming', 'Client Delivery'],
      focus_areas_ar: ['إدارة موقع التصوير', 'تغطية الأماكن', 'تصوير المنتجات', 'تسليم المشاريع'],
      badge: 'FIELD PRODUCTION',
      color: '#4dd2ff',
    },
  ] as EducationItem[],

  // EXPERIENCE
  experience: [
    {
      id: 'exp-commercial-creator',
      period_en: '2021 — Present',
      period_ar: '2021 — حتى الآن',
      role_en: 'Commercial Video Creator & Content Producer',
      role_ar: 'صانع فيديوهات إعلانية ومحتوى للبراندات',
      company_en: 'Independent / Commercial Collaborations',
      company_ar: 'عمل حر / تعاونات مع علامات تجارية',
      type_en: 'Creative Production',
      type_ar: 'إنتاج إبداعي',
      description_en:
        'Creating high-retention short-form videos and visual content for established food & beverage brands, venues, and digital entertainment services.',
      description_ar:
        'صناعة فيديوهات قصيرة ومحتوى بصري جذاب لبراندات حلويات ومطاعم وأماكن ومنصات ترفيه رقمي.',
      highlights_en: [
        'Short-form food videography with engaging pacing for B.Laban.',
        'Digital entertainment video content collaborations for Yango Play.',
        'High-speed creative ideation, shooting, color grading, and export.',
      ],
      highlights_ar: [
        'تصوير ومونتاج فيديوهات حلويات بإيقاع سريع وجذاب لـ بلبن.',
        'صناعة محتوى فيديو لمنصة الترفيه الرقمي يانجو بلاي.',
        'تنفيذ متكامل من أول الفكرة للتصوير والمونتاج وتجهيز النشر.',
      ],
      color: '#ccff00',
      badge_en: 'DIRECTOR & CREATOR',
      badge_ar: 'صانع محتوى ومخرج',
    },
    {
      id: 'exp-venue-storyteller',
      period_en: '2019 — Present',
      period_ar: '2019 — حتى الآن',
      role_en: 'Venue & Local Business Visual Storyteller',
      role_ar: 'مصور وموثق بصري للأماكن والمشروعات المحلية',
      company_en: 'Local Venues & Businesses (Assiut)',
      company_ar: 'مشروعات وأماكن محلية بأسيوط',
      type_en: 'Visual Storytelling',
      type_ar: 'سرد بصري',
      description_en:
        'Capturing the authentic ambiance, architecture, hospitality, and distinct identity of popular venues and commercial establishments in Assiut.',
      description_ar:
        'توثيق أجواء الأماكن وديكوراتها وتجربة الزائر من خلال تصوير فوتوغرافي وفيديوهات تعكس الطابع الخاص لكل مكان.',
      highlights_en: [
        'Complete visual photography and atmosphere coverage for Qasr Napoli.',
        'Product & brand content photography for Bella in Assiut.',
        'Highlighting Upper Egypt places with fresh, contemporary aesthetics.',
      ],
      highlights_ar: [
        'تغطية تصويرية فوتوغرافية متكاملة تبرز ديكور وأجواء قصر نابولي.',
        'تصوير منتجات ومحتوى بصري لبيلا في أسيوط.',
        'إبراز هوية وروح أماكن الصعيد بأسلوب بصري عصري ونقي.',
      ],
      color: '#ffd93d',
      badge_en: 'VENUE STORYTELLING',
      badge_ar: 'توثيق الأماكن',
    },
    {
      id: 'exp-photographer-origins',
      period_en: '2019 — 2021',
      period_ar: '2019 — 2021',
      role_en: 'Still Photographer & Visual Experimenter',
      role_ar: 'مصور فوتوغرافي وبداية صناعة الصورة',
      company_en: 'Assiut Base',
      company_ar: 'أسيوط، مصر',
      type_en: 'Photography',
      type_ar: 'تصوير فوتوغرافي',
      description_en:
        'Began the journey behind the lens with street, portrait, and architectural photography, honing precision in composition and natural light.',
      description_ar:
        'بداية الرحلة من خلف العدسة مع تصوير الشارع والوجوه والأماكن، وصقل مهارات تكوين الكادر واستغلال الضوء الطبيعي.',
      highlights_en: [
        'Mastered manual camera exposure, optics, and framing geometry.',
        'Transitioned seamlessly from still frames into cinematic moving video.',
      ],
      highlights_ar: [
        'إتقان التحكم في إعدادات الكاميرا والعدسات وزوايا التكوين.',
        'الانتقال بسلاسة من الصورة الثابتة إلى الصورة السينمائية المتحركة.',
      ],
      color: '#ff4d8d',
      badge_en: 'FOUNDATIONAL CRAFT',
      badge_ar: 'البداية والتأسيس',
    },
  ] as ExperienceItem[],

  // CERTIFICATIONS & ACCREDITED COMPETENCIES
  certifications: [
    {
      id: 'cert-4k-cinema',
      title_en: '4K Commercial Camera Operation',
      title_ar: 'تشغيل وضبط كاميرات الـ 4K التجارية',
      issuer_en: 'Field Production Competency',
      issuer_ar: 'كفاءة إنتاج ميداني معتمدة',
      year: '2023',
      credential_en: 'Full-Frame 4K, Log profiles, high frame-rate capture',
      credential_ar: 'تصوير فل فريم 4K وتصوير بطيء وبروفايلات سينمائية',
      skills: ['4K Video', 'S-Log / Log Profiles', 'Frame Rates', 'Lens Optics'],
      badge_color: '#ccff00',
    },
    {
      id: 'cert-davinci-color',
      title_en: 'DaVinci Resolve & Premiere Pro Post-Production',
      title_ar: 'المونتاج وتصحيح الألوان (DaVinci & Premiere)',
      issuer_en: 'Post-Production Standards',
      issuer_ar: 'معايير ما بعد الإنتاج الاحترافية',
      year: '2022',
      credential_en: 'Pacing assembly, audio cleanup, primary & secondary color balance',
      credential_ar: 'ترتيب وتجميع اللقطات، موازنة الألوان، وضبط نقاء الصوت',
      skills: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Color Balance', 'Sound Polish'],
      badge_color: '#4dd2ff',
    },
    {
      id: 'cert-short-form-hooks',
      title_en: 'Short-Form Retention & Visual Hooks Strategy',
      title_ar: 'هندسة الافتتاحيات وإيقاع الفيديوهات القصيرة',
      issuer_en: 'Digital Media Strategy',
      issuer_ar: 'استراتيجيات المحتوى الرقمي',
      year: '2024',
      credential_en: 'Structuring 0-3 second visual hooks, tempo shifts, and clean messaging',
      credential_ar: 'بناء الافتتاحية في أول 3 ثوانٍ وضبط سرعة المشاهد وسلاسة الرسالة',
      skills: ['Visual Hooks', 'Pacing Design', 'Reels / TikTok Format', 'CTA Hand-off'],
      badge_color: '#ffd93d',
    },
    {
      id: 'cert-commercial-lighting',
      title_en: 'On-Location Lighting & Product Setup',
      title_ar: 'توزيع الإضاءة الميدانية وتصوير المنتجات',
      issuer_en: 'Lighting Practical Standards',
      issuer_ar: 'معايير الإضاءة العملية',
      year: '2023',
      credential_en: 'Diffused key lights, softboxes, high-CRI food and venue illumination',
      credential_ar: 'إضاءة سوفت ومشتتات ضوء لإبراز تفاصيل الطعام والمنتجات',
      skills: ['Softbox Lighting', 'High CRI', 'Food Videography', 'Venue Ambiance'],
      badge_color: '#ff4d8d',
    },
  ] as CertificationItem[],

  // SKILLS MATRIX
  skills: [
    {
      name_en: 'Short-Form Video & Reels',
      name_ar: 'صناعة الفيديوهات القصيرة والريلز',
      role_en: 'Social Video Architecture',
      role_ar: 'بناء محتوى السوشيال ميديا',
      level: 'Advanced',
      level_percent: 94,
      tools: ['Vertical 9:16', 'TikTok / Reels', 'Pacing Rhythm', 'Hook Design'],
      color: '#ccff00',
      icon: 'Film',
    },
    {
      name_en: 'Camera Operation & Cinematography',
      name_ar: 'التصوير السينمائي وإدارة الكاميرا',
      role_en: 'Framing, Lighting & Movement',
      role_ar: 'الكادر والإضاءة وحركة الكاميرا',
      level: 'Advanced',
      level_percent: 92,
      tools: ['4K Camera Systems', 'Fast Prime Lenses', '3-Axis Gimbals', 'Natural Light'],
      color: '#4dd2ff',
      icon: 'Camera',
    },
    {
      name_en: 'Video Editing & Montage',
      name_ar: 'المونتاج وتركيب اللقطات',
      role_en: 'Story Assembly & Flow',
      role_ar: 'بناء القصة وتدفق المشاهد',
      level: 'Proficient',
      level_percent: 90,
      tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Sound Design', 'Dynamic Cuts'],
      color: '#ffd93d',
      icon: 'Layers',
    },
    {
      name_en: 'Color Grading & Visual Tone',
      name_ar: 'تصحيح وتدريج الألوان',
      role_en: 'Atmosphere & Brand Mood',
      role_ar: 'خلق جو بصري يلائم هوية المكان',
      level: 'Proficient',
      level_percent: 88,
      tools: ['Log Color Pipelines', 'LUT Matching', 'Skin Tone Balance', 'Food Saturation'],
      color: '#ff4d8d',
      icon: 'Sparkles',
    },
    {
      name_en: 'Venue & Commercial Photography',
      name_ar: 'التصوير الفوتوغرافي للأماكن والمنتجات',
      role_en: 'Architectural & Product Visuals',
      role_ar: 'إبراز تفاصيل الديكور والمنتج',
      level: 'Advanced',
      level_percent: 95,
      tools: ['Venue Interiors', 'Food Macro Shots', 'Commercial Composition', 'Sharp Optics'],
      color: '#ffffff',
      icon: 'Target',
    },
    {
      name_en: 'UGC & Relatable Creator Content',
      name_ar: 'محتوى صانع المحتوى التلقائي (UGC)',
      role_en: 'Human & Authentic Voice',
      role_ar: 'تقديم عفوي وقريب من المشاهد',
      level: 'Advanced',
      level_percent: 91,
      tools: ['Creator-Led Reviews', 'Product Unboxing', 'Lifestyle Narrative', 'Organic Energy'],
      color: '#ccff00',
      icon: 'Zap',
    },
  ] as SkillItem[],

  brands: [
    {
      id: 'b-laban',
      name: 'B.Laban',
      name_ar: 'بلبن',
      sector_en: 'Food & Dessert',
      sector_ar: 'أكل وحلويات',
      description_en:
        'Video content work for a well-known Egyptian dessert brand, with a focus on presenting the product in an engaging short-form format.',
      description_ar:
        'شغل فيديوهات لبراند حلويات مصري معروف، مع التركيز على تقديم المنتج بشكل جذاب يناسب المحتوى القصير.',
      badge: 'Food Content',
      featuredProjectId: 'blaban-video',
    },
    {
      id: 'qasr-napoli',
      name: 'Qasr Napoli',
      name_ar: 'قصر نابولي',
      sector_en: 'Restaurant & Hospitality',
      sector_ar: 'مطاعم وضيافة',
      description_en:
        'Photography and visual content work for a local venue in Assiut.',
      description_ar:
        'تصوير وصناعة محتوى بصري لمكان معروف في أسيوط.',
      badge: 'Local Business',
      featuredProjectId: 'qasr-napoli-content',
    },
    {
      id: 'bella',
      name: 'Bella',
      name_ar: 'بيلا',
      sector_en: 'Local Business',
      sector_ar: 'مشروعات محلية',
      description_en:
        'Photography work creating visual content for a local business in Assiut.',
      description_ar:
        'شغل تصوير وصناعة محتوى بصري لمشروع محلي في أسيوط.',
      badge: 'Photography',
      featuredProjectId: 'bella-content',
    },
    {
      id: 'yango-play',
      name: 'Yango Play',
      name_ar: 'يانجو بلاي',
      sector_en: 'Digital Entertainment',
      sector_ar: 'ترفيه رقمي',
      description_en:
        'Video content collaboration connected to a digital entertainment platform.',
      description_ar:
        'تعاون في صناعة فيديوهات مرتبطة بمنصة للترفيه الرقمي.',
      badge: 'Digital Content',
      featuredProjectId: 'yango-play-video',
    },
  ] as BrandPartner[],

  projects: [
    {
      id: 'blaban-video',
      slug: 'blaban-video',
      title_en: 'B.Laban — Short-Form Video',
      title_ar: 'فيديوهات بلبن',
      brand: 'B.Laban',
      brand_ar: 'بلبن',
      category: 'Food & Beverage',
      category_ar: 'أكل وحلويات',
      thumbnail: '/assets/images/blaban_dessert.jpg',
      video_url: '/assets/videos/blaban-video.mp4',
      description_en:
        'Short-form video work for a dessert brand, presenting the product through clear visuals and an engaging pace.',
      description_ar:
        'شغل فيديوهات قصيرة لبراند حلويات، بتقديم بصري واضح وإيقاع مناسب لطبيعة المحتوى على السوشيال ميديا.',
      creative_concept_en:
        'Make the product the focus through close-up shots, deliberate framing, and a concise visual sequence.',
      creative_concept_ar:
        'التركيز على المنتج بلقطات قريبة، وكادرات مدروسة، وتسلسل بصري مختصر.',
      campaign_objective_en:
        'Present the product in an engaging format suitable for social media.',
      campaign_objective_ar:
        'تقديم المنتج بشكل جذاب يناسب منصات التواصل الاجتماعي.',
      duration: '0:35',
      aspect_ratio: '9:16',
      year: '2023',
      featured: true,
      tags: ['Food Video', 'Short-Form', 'Product Focus'],
      results_en: 'Macro dessert videography and engaging pacing designed for social engagement.',
      results_ar: 'تصوير دقيق لحلويات بلبن بإيقاع سريع وجذاب مناسب لتفاعل السوشيال ميديا.',
    },
    {
      id: 'qasr-napoli-content',
      slug: 'qasr-napoli',
      title_en: 'Qasr Napoli — Photography',
      title_ar: 'تصوير قصر نابولي',
      brand: 'Qasr Napoli',
      brand_ar: 'قصر نابولي',
      category: 'Local Places & Experiences',
      category_ar: 'أماكن وتجارب',
      thumbnail: '/assets/images/moqsar_streetwear.jpg',
      video_url: '/assets/videos/qasr-napoli.mp4',
      description_en:
        'Photography work for a local Assiut venue, capturing the place and presenting its atmosphere through visual content.',
      description_ar:
        'شغل تصوير لقصر نابولي في أسيوط، لإبراز المكان وأجوائه من خلال محتوى بصري مناسب للسوشيال ميديا.',
      creative_concept_en:
        'Use thoughtful framing and a clear visual story to help viewers get a feel for the venue.',
      creative_concept_ar:
        'استخدام كادرات مدروسة وحكاية بصرية بسيطة تنقل للمشاهد إحساس المكان.',
      campaign_objective_en:
        'Create visual material that introduces the venue and its atmosphere.',
      campaign_objective_ar:
        'تقديم محتوى بصري يعرّف الناس بالمكان وأجوائه.',
      duration: '0:45',
      aspect_ratio: '9:16',
      year: '2023',
      featured: true,
      tags: ['Photography', 'Local Business', 'Visual Storytelling'],
      results_en: 'Complete venue photography capturing ambient lighting, interior spaces, and hospitality vibe.',
      results_ar: 'تغطية تصويرية شاملة تبرز الديكور والإضاءة وجلسات المكان وطابعه الخاص.',
    },
    {
      id: 'bella-content',
      slug: 'bella-content',
      title_en: 'Bella — Visual Content',
      title_ar: 'تصوير ومحتوى بيلا',
      brand: 'Bella',
      brand_ar: 'بيلا',
      category: 'Brand Story',
      category_ar: 'محتوى للبراندات',
      thumbnail: '/assets/images/vandoti_waffle.jpg',
      video_url: '/assets/videos/bella.mp4',
      description_en:
        'Visual content work for a local business in Assiut, with an emphasis on presenting the business in a clear and appealing way.',
      description_ar:
        'شغل تصوير ومحتوى بصري لبيلا في أسيوط، مع التركيز على إظهار المكان أو المنتج بصورة واضحة وجذابة.',
      creative_concept_en:
        'Build a simple visual narrative around the business and the experience it offers.',
      creative_concept_ar:
        'بناء حكاية بصرية بسيطة حوالين المكان أو التجربة اللي بيقدمها.',
      campaign_objective_en:
        'Create social-ready visual content for the business.',
      campaign_objective_ar:
        'تجهيز محتوى بصري مناسب للنشر على السوشيال ميديا.',
      duration: '0:30',
      aspect_ratio: '9:16',
      year: '2024',
      featured: true,
      tags: ['Visual Content', 'Photography', 'Assiut'],
      results_en: 'Clean, appetizing product visuals ready for marketing campaigns and social media feeds.',
      results_ar: 'لقطات منتجات نقية وجذابة مجهزة للاستخدام في الحملات الإعلانية وحسابات السوشيال ميديا.',
    },
    {
      id: 'yango-play-video',
      slug: 'yango-play-video',
      title_en: 'Yango Play — Video Content',
      title_ar: 'فيديوهات يانجو بلاي',
      brand: 'Yango Play',
      brand_ar: 'يانجو بلاي',
      category: 'Tech & Lifestyle',
      category_ar: 'تكنولوجيا وترفيه',
      thumbnail: '/assets/images/elaraby_tech.jpg',
      video_url: '/assets/videos/yango-play.mp4',
      description_en:
        'Video content collaboration for a digital entertainment platform, bringing fresh energy and relatable everyday scenarios.',
      description_ar:
        'تعاون في صناعة محتوى فيديو لمنصة ترفيه رقمي، بطابع شبابي قريب من مواقف الحياة اليومية للمشاهدين.',
      creative_concept_en:
        'Connect digital streaming features with relatable lifestyle situations in a dynamic, vertical video style.',
      creative_concept_ar:
        'ربط مزايا المنصة الترفيهية بمواقف يومية مألوفة، بأسلوب فيديو رأسي حركي وممتع.',
      campaign_objective_en:
        'Highlight the entertainment experience in a creator-led, authentic voice.',
      campaign_objective_ar:
        'تسليط الضوء على تجربة الترفيه بصوت صانع محتوى طبيعي وتلقائي.',
      duration: '0:40',
      aspect_ratio: '9:16',
      year: '2024',
      featured: true,
      tags: ['Video Content', 'Digital Entertainment', 'Short-Form'],
      results_en: 'Creator-driven entertainment video production tailored for social platforms.',
      results_ar: 'إنتاج محتوى فيديو ترفيهي بروح صانع المحتوى مخصص لمنصات السوشيال ميديا.',
    },
  ] as Project[],

  services: [
    {
      id: 'short-form',
      number: '01',
      title_en: 'Short-Form Video Creation',
      title_ar: 'صناعة الفيديوهات القصيرة',
      short_desc_en:
        'Creating Reels and short videos that communicate an idea quickly and keep the story clear and engaging.',
      short_desc_ar:
        'صناعة ريلز وفيديوهات قصيرة توصل الفكرة بسرعة، وتحكيها بشكل بسيط وجذاب.',
      deliverables_en: [
        'Creative Idea',
        'Video Shooting',
        'Editing & Pacing',
        'Social Media Export',
      ],
      deliverables_ar: [
        'الفكرة الإبداعية',
        'تصوير الفيديو',
        'المونتاج وضبط الإيقاع',
        'تجهيز الفيديو للنشر',
      ],
      icon_name: 'Film',
      color: '#ccff00',
    },
    {
      id: 'brand-content',
      number: '02',
      title_en: 'Brand & Business Content',
      title_ar: 'محتوى للبراندات والمشروعات',
      short_desc_en:
        'Visual content that introduces a business, highlights its products, and gives people a reason to care.',
      short_desc_ar:
        'محتوى بصري يعرّف الناس بالمشروع، ويبرز منتجاته، ويوصل فكرته بطريقة قريبة منهم.',
      deliverables_en: [
        'Content Direction',
        'Product or Venue Coverage',
        'Short-Form Video',
        'Platform-Ready Files',
      ],
      deliverables_ar: [
        'تحديد اتجاه المحتوى',
        'تصوير المنتجات أو المكان',
        'فيديوهات قصيرة',
        'ملفات جاهزة للنشر',
      ],
      icon_name: 'Target',
      color: '#4dd2ff',
    },
    {
      id: 'ugc',
      number: '03',
      title_en: 'UGC-Style Videos',
      title_ar: 'فيديوهات بأسلوب UGC',
      short_desc_en:
        'Creator-style videos designed to feel direct, relatable, and natural rather than overly scripted.',
      short_desc_ar:
        'فيديوهات بروح صانع المحتوى، تكون قريبة من الناس وطبيعية من غير إحساس الإعلان التقليدي.',
      deliverables_en: [
        'Concept & Hook',
        'Creator-Led Presentation',
        'Product Demonstration',
        'Edited Vertical Video',
      ],
      deliverables_ar: [
        'الفكرة والافتتاحية',
        'تقديم بأسلوب صانع المحتوى',
        'عرض المنتج',
        'فيديو عمودي بعد المونتاج',
      ],
      icon_name: 'Zap',
      color: '#ffd93d',
    },
    {
      id: 'on-location',
      number: '04',
      title_en: 'On-Location Coverage',
      title_ar: 'التصوير والتغطيات الميدانية',
      short_desc_en:
        'Capturing the atmosphere of places, businesses, launches, and experiences through video and photography.',
      short_desc_ar:
        'تصوير أجواء الأماكن والمشروعات والافتتاحات والتجارب بالفيديو والصور.',
      deliverables_en: [
        'On-Site Shooting',
        'Atmosphere & Detail Shots',
        'Short Recap Video',
        'Edited Visual Assets',
      ],
      deliverables_ar: [
        'تصوير في موقع العمل',
        'لقطات للأجواء والتفاصيل',
        'فيديو ملخص قصير',
        'صور وفيديوهات بعد التعديل',
      ],
      icon_name: 'Camera',
      color: '#ff4d8d',
    },
    {
      id: 'editing',
      number: '05',
      title_en: 'Video Editing & Post-Production',
      title_ar: 'مونتاج وهندسة الفيديوهات',
      short_desc_en:
        'Turning raw footage into a coherent video with purposeful pacing, clean cuts, sound, and captions when needed.',
      short_desc_ar:
        'تحويل اللقطات الخام لفيديو متماسك بإيقاع مناسب، وقطعات نظيفة، وصوت ونصوص عند الحاجة.',
      deliverables_en: [
        'Video Assembly',
        'Color Correction',
        'Sound Cleanup',
        'Captions & Titles',
      ],
      deliverables_ar: [
        'ترتيب وتجميع اللقطات',
        'تصحيح الألوان',
        'تحسين الصوت',
        'كتابة النصوص والعناوين',
      ],
      icon_name: 'Layers',
      color: '#ffffff',
    },
  ] as ServiceItem[],

  timeline: [
    {
      year: '2019',
      title_en: 'The First Frame',
      title_ar: 'البداية من ورا الكاميرا',
      description_en:
        'Started creating visual content in Assiut, beginning with photography and learning how to tell stories through images.',
      description_ar:
        'بدأت رحلتي في أسيوط سنة 2019 من التصوير، ومع الوقت اتعلمت إزاي الصورة تحكي حكاية وتوصل إحساس.',
      tag_en: 'First Shutter Click',
      tag_ar: 'أول لقطة فوتوغرافية',
    },
    {
      year: '2021',
      title_en: 'Working with Local Businesses',
      title_ar: 'شغل مع أماكن ومشروعات في أسيوط',
      description_en:
        'Worked on photography and video content for local venues and businesses, including Qasr Napoli and Bella.',
      description_ar:
        'اشتغلت في التصوير وصناعة المحتوى لأماكن ومشروعات في أسيوط، منها قصر نابولي وبيلا.',
      tag_en: 'Local Venues',
      tag_ar: 'مشروعات محلية',
    },
    {
      year: '2023',
      title_en: 'From Photography to Storytelling',
      title_ar: 'من التصوير لحكاية كاملة',
      description_en:
        'Expanded into video creation and content collaborations, including work associated with B.Laban and Yango Play.',
      description_ar:
        'وسّعت شغلي من التصوير لصناعة الفيديوهات وحكي القصص، واشتغلت على محتوى مرتبط ببلبن ويانجو بلاي.',
      tag_en: 'Brand Collaborations',
      tag_ar: 'تعاونات كبرى',
    },
    {
      year: 'Today',
      title_en: 'Stories from Assiut and Beyond',
      title_ar: 'حكايات من أسيوط ولكل مكان',
      description_en:
        'Creating content with a personal point of view, bringing together people, places, businesses, and stories worth sharing.',
      description_ar:
        'بصنع محتوى من وجهة نظري، وبحاول أحكي حكايات الناس والأماكن والمشروعات بشكل بسيط وقريب من الجمهور.',
      tag_en: 'Continuous Story',
      tag_ar: 'الحكاية مستمرة',
    },
  ] as TimelineMilestone[],

  process: [
    {
      number: '01',
      title_en: 'Understand',
      title_ar: 'نفهم المطلوب',
      tag_en: 'Goal & Audience',
      tag_ar: 'الهدف والجمهور',
      description_en:
        'Understand the business, the message, the audience, and what the video needs to achieve.',
      description_ar:
        'نفهم المشروع والرسالة والجمهور، وإيه المطلوب من الفيديو بالضبط.',
    },
    {
      number: '02',
      title_en: 'Find the Idea',
      title_ar: 'نطلع بالفكرة',
      tag_en: 'Concept & Hook',
      tag_ar: 'الفكرة والافتتاحية',
      description_en:
        'Choose a clear angle and an opening that gives viewers a reason to keep watching.',
      description_ar:
        'نختار زاوية واضحة للفيديو وبداية تشد المشاهد وتخليه يكمل.',
    },
    {
      number: '03',
      title_en: 'Plan the Story',
      title_ar: 'نرتب الحكاية',
      tag_en: 'Simple Structure',
      tag_ar: 'ترتيب المشاهد',
      description_en:
        'Organize the shots and message so the video feels natural, focused, and easy to follow.',
      description_ar:
        'نرتب اللقطات والرسالة عشان الفيديو يطلع طبيعي ومركز وسهل المتابعة.',
    },
    {
      number: '04',
      title_en: 'Shoot',
      title_ar: 'نصور',
      tag_en: 'On Location',
      tag_ar: 'تصوير وتنفيذ',
      description_en:
        'Capture the footage with attention to framing, light, details, and the feeling of the place or product.',
      description_ar:
        'نصور مع الاهتمام بالكادر والإضاءة والتفاصيل والإحساس اللي المكان أو المنتج محتاج يوصله.',
    },
    {
      number: '05',
      title_en: 'Edit',
      title_ar: 'نمنتج',
      tag_en: 'Pacing & Sound',
      tag_ar: 'إيقاع وصوت',
      description_en:
        'Shape the footage into a clear story with suitable pacing, sound, and finishing touches.',
      description_ar:
        'نحوّل اللقطات لحكاية واضحة بإيقاع مناسب وصوت ولمسات نهائية.',
    },
    {
      number: '06',
      title_en: 'Deliver',
      title_ar: 'نسلّم المحتوى',
      tag_en: 'Ready to Publish',
      tag_ar: 'جاهز للنشر',
      description_en:
        'Deliver the agreed files in the formats and dimensions needed for the selected platforms.',
      description_ar:
        'نسلّم الملفات المتفق عليها بالمقاسات والصيغ المناسبة للمنصات المطلوبة.',
    },
  ] as ProcessStep[],

  stats: [
    {
      value: '2019',
      label_en: 'Started Creating',
      label_ar: 'بداية الرحلة',
      sub_en: 'Photography to video storytelling',
      sub_ar: 'من التصوير لحكاية بالفيديو',
      color: '#ccff00',
    },
    {
      value: 'Assiut',
      label_en: 'Home Base',
      label_ar: 'مكاني وبدايتي',
      sub_en: 'Stories from Upper Egypt',
      sub_ar: 'حكايات من أسيوط والصعيد',
      color: '#ffd93d',
    },
    {
      value: '4K',
      label_en: 'Production Standard',
      label_ar: 'معيار الجودة',
      sub_en: 'Crisp video & tailored lighting',
      sub_ar: 'فيديو بدقة ونقاء عالي وإضاءة مدروسة',
      color: '#4dd2ff',
    },
    {
      value: 'Story',
      label_en: 'Core Philosophy',
      label_ar: 'فلسفتي الأساسية',
      sub_en: 'People and places come first',
      sub_ar: 'الناس والأماكن هي الحكاية الحقيقية',
      color: '#ff4d8d',
    },
  ],

  ui: {
    en: {
      episodes: {
        intro: 'Act 01 • The Intro',
        about: 'Act 02 • The Story',
        education: 'Act 03 • The Craft Lab',
        experience: 'Act 04 • On Location',
        skills: 'Act 05 • The Arsenal',
        projects: 'Act 06 • The Cinema',
        certifications: 'Act 07 • The Badges',
        timeline: 'Act 08 • The Reel Journey',
        contact: 'Act 09 • The Hotline',
      },
      nav_work: 'Work',
      nav_brands: 'Collaborations',
      nav_about: 'About',
      nav_education: 'Education',
      nav_experience: 'Experience',
      nav_services: 'Services',
      nav_skills: 'Skills',
      nav_certifications: 'Badges',
      nav_timeline: 'Journey',
      nav_contact: 'Contact',
      nav_cta: "Let's Talk",
      theme_light: 'Daylight Studio',
      theme_dark: 'Midnight Cinema',
      sound_toggle_on: 'Sound On',
      sound_toggle_off: 'Sound Off',
      hero_badge: 'CONTENT CREATOR • ASSIUT, EGYPT • SINCE 2019',
      hero_title_line1: 'EVERY PLACE',
      hero_title_line2: 'HAS A STORY.',
      hero_intro:
        'I’m Mohanad — a content creator from Assiut. I turn people, places, products, and everyday moments into visual stories worth watching.',
      hero_cta_explore: 'EXPLORE MY WORK',
      hero_cta_create: 'LET’S CREATE TOGETHER',
      hero_scroll_prompt: 'SCROLL TO EXPLORE',
      about_heading: 'THE CAMERA STARTED IT. THE STORY KEEPS ME GOING.',
      about_sub:
        'I started in Assiut in 2019 and grew from photography into video and content creation.',
      about_p1:
        'I’m interested in the details people might pass by: a place’s atmosphere, a product’s character, or a small moment that can become a good story. I like content that feels clear, human, and made for the people watching it.',
      about_p2:
        'My work includes photography and video content for local businesses and collaborations with brands. This portfolio brings selected work together in one place.',
      education_heading: 'EDUCATION & CREATIVE CRAFT',
      education_sub: 'The foundations, field studies, and continuous technical learning that shape every frame.',
      experience_heading: 'PRODUCTION SETS & EXPERIENCE',
      experience_sub: 'From on-location venue storytelling in Assiut to commercial brand collaborations.',
      skills_heading: 'THE CREATIVE WEAPONRY & SKILLS',
      skills_sub: 'A visual breakdown of the gear, tools, and technical competencies deployed on set.',
      projects_heading: 'SELECTED REELS & STORIES',
      projects_sub: 'Selected photography and video projects with real verified deliverables.',
      filter_all: 'All Work',
      filter_food: 'Food & Beverage',
      filter_tech: 'Tech & Lifestyle',
      filter_ugc: 'UGC & Hooks',
      filter_fashion: 'Fashion & Urban',
      filter_story: 'Brand Stories',
      btn_view_project: 'View Project',
      btn_close: 'Close',
      work_heading: 'A Few Stories I’ve Helped Tell.',
      work_sub: 'Selected photography and video projects with genuine verified deliverables.',

      certifications_heading: 'ACCREDITED BADGES & STANDARDS',
      certifications_sub: 'Verified technical standards across camera operation, color science, and editing.',
      timeline_heading: 'THE VISUAL JOURNEY TIMELINE',
      timeline_sub: 'A cartoon chronicle from the first shutter click in Assiut in 2019 to current productions.',
      contact_heading: 'HAVE A STORY TO TELL?',
      contact_sub: 'Tell me about your business, product, or idea, and let’s discuss the right kind of content.',
      form_name: 'Your Name',
      form_company: 'Brand or Business',
      form_email: 'Email Address',
      form_phone: 'WhatsApp / Phone',
      form_project_type: 'What do you need?',
      form_type_ugc: 'UGC-Style Video',
      form_type_brand: 'Brand or Business Video',
      form_type_product: 'Product Showcase',
      form_type_full: 'Shooting and Editing',
      form_budget: 'Estimated Budget',
      form_budget_1: 'Let’s discuss',
      form_budget_2: 'EGP 10,000–50,000',
      form_budget_3: 'EGP 50,000+',
      form_message: 'Tell me about your project',
      form_message_placeholder: 'What do you want to create? Who is it for, and when do you need it?',
      form_submit_whatsapp: 'Send via WhatsApp',
      form_submit_email: 'Send Direct Email',
      form_copied_email: 'Email copied to clipboard!',
      footer_rights: 'All rights reserved. Mohanad Ahmed.',
      footer_location: 'Assiut, Egypt — Open to suitable collaborations',
    },
    ar: {
      episodes: {
        intro: 'المشهد 01 • البداية',
        about: 'المشهد 02 • حكاية الرحلة',
        education: 'المشهد 03 • التعلم والتأسيس',
        experience: 'المشهد 04 • مواقع العمل',
        skills: 'المشهد 05 • أدوات الصنعة',
        projects: 'المشهد 06 • سينما المشاريع',
        certifications: 'المشهد 07 • الكفاءات والأوسمة',
        timeline: 'المشهد 08 • شريط الرحلة',
        contact: 'المشهد 09 • الخط المباشر',
      },
      nav_work: 'شغلي',
      nav_brands: 'تعاونات',
      nav_about: 'عني',
      nav_education: 'التعليم والتأسيس',
      nav_experience: 'الخبرات',
      nav_services: 'الخدمات',
      nav_skills: 'المهارات والعتاد',
      nav_certifications: 'الأوسمة',
      nav_timeline: 'شريط الرحلة',
      nav_contact: 'تواصل معايا',
      nav_cta: 'يلا نتكلم',
      theme_light: 'استوديو نهار',
      theme_dark: 'سينما ليل',
      sound_toggle_on: 'الصوت شغال',
      sound_toggle_off: 'الصوت مقفول',
      hero_badge: 'صانع محتوى • أسيوط، مصر • من 2019',
      hero_title_line1: 'كل مكان',
      hero_title_line2: 'وراه حكاية.',
      hero_intro:
        'أنا مهند، صانع محتوى من أسيوط. بحوّل الناس والأماكن والمنتجات والتفاصيل اليومية لحكايات بصرية تستاهل تتشاف.',
      hero_cta_explore: 'شوف شغلي',
      hero_cta_create: 'يلا نعمل حاجة مع بعض',
      hero_scroll_prompt: 'انزل واكتشف الحكاية',
      about_heading: 'الكاميرا كانت البداية. والحكاية هي اللي مكملة.',
      about_sub:
        'بدأت في أسيوط سنة 2019 بالتصوير، وبعدها وسّعت شغلي للفيديو وصناعة المحتوى.',
      about_p1:
        'بحب التفاصيل اللي ممكن الناس تعدّي من جنبها من غير ما تاخد بالها: روح مكان، أو شخصية منتج، أو موقف بسيط ممكن يتحول لحكاية حلوة. بالنسبة لي، المحتوى الناجح لازم يكون واضح وإنساني وقريب من الناس اللي بتتفرج.',
      about_p2:
        'اشتغلت في التصوير وصناعة الفيديوهات لمشروعات محلية، وكمان في تعاونات مع براندات. البورتفوليو ده بيجمع نماذج من الشغل في مكان واحد.',
      education_heading: 'التعليم والتأسيس الإبداعي',
      education_sub: 'الأساس المعرفي والتطبيقي المستمر الذي يبني كادر كل لقطة.',
      experience_heading: 'مواقع التصوير والخبرة الميدانية',
      experience_sub: 'من توثيق الأماكن في أسيوط إلى إنتاج فيديوهات تجارية للبراندات.',
      skills_heading: 'المهارات والعتاد وأدوات الصنعة',
      skills_sub: 'عرض تفاعلي لأدوات العمل والكاميرات وبرامج ما بعد الإنتاج.',
      projects_heading: 'معرض المشاريع والريلز',
      projects_sub: 'نماذج من شغل التصوير والفيديو مع براندات وأماكن حقيقية.',
      filter_all: 'كل الشغل',
      filter_food: 'أكل ومشروبات',
      filter_tech: 'تكنولوجيا ولايف ستايل',
      filter_ugc: 'UGC وافتتاحيات',
      filter_fashion: 'أزياء وموضة',
      filter_story: 'حكايات البراندات',
      btn_view_project: 'شوف المشروع',
      btn_close: 'إغلاق',
      work_heading: 'نماذج من الأعمال والمشاريع',
      work_sub: 'أعمال تصوير وفيديوهات مع براندات وأماكن حقيقية بدون مبالغة.',

      certifications_heading: 'الأوسمة والكفاءات الفنية',
      certifications_sub: 'معايير تقنية معتمدة في تشغيل الكاميرات، تصحيح الألوان، والمونتاج.',
      timeline_heading: 'شريط الرحلة من 2019',
      timeline_sub: 'حكاية مصورة ترصد المحطات الأساسية من أول لقطة في أسيوط إلى اليوم.',
      contact_heading: 'عندك حكاية عايز توصلها؟',
      contact_sub: 'احكيلي عن مشروعك أو منتجك أو فكرتك، ونشوف أنسب نوع محتوى ليها.',
      form_name: 'اسمك',
      form_company: 'اسم البراند أو المشروع',
      form_email: 'البريد الإلكتروني',
      form_phone: 'رقم الواتساب أو الموبايل',
      form_project_type: 'محتاج إيه؟',
      form_type_ugc: 'فيديو بأسلوب UGC',
      form_type_brand: 'فيديو لبراند أو مشروع',
      form_type_product: 'استعراض منتج',
      form_type_full: 'تصوير ومونتاج',
      form_budget: 'الميزانية التقريبية',
      form_budget_1: 'نتفق عليها حسب المطلوب',
      form_budget_2: 'من 10,000 إلى 50,000 جنيه',
      form_budget_3: 'أكتر من 50,000 جنيه',
      form_message: 'احكيلي عن مشروعك',
      form_message_placeholder: 'عايز تعمل إيه؟ مين الجمهور المستهدف؟ ومحتاج المحتوى إمتى؟',
      form_submit_whatsapp: 'تواصل عبر واتساب',
      form_submit_email: 'إرسال إيميل مباشر',
      form_copied_email: 'تم نسخ الإيميل بنجاح!',
      footer_rights: 'جميع الحقوق محفوظة لمهند أحمد.',
      footer_location: 'أسيوط، مصر — متاح للتعاون في المشاريع المناسبة',
    },
  },
};
