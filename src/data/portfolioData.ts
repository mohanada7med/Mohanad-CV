export type Language = 'en' | 'ar';

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
}

export interface TimelineMilestone {
  year: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
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
 * Portfolio content is intentionally limited to known background details.
 * Replace the local media paths with real approved project assets.
 * Do not publish project-specific performance claims unless you can verify them.
 */
export const PORTFOLIO_DATA = {
  creator: {
    name_en: 'Mohanad Ahmed',
    name_ar: 'مهند أحمد',
    role_en: 'Content Creator • Video Creator • Storyteller',
    role_ar: 'صانع محتوى • صانع فيديوهات • راوي حكايات',
    location_en: 'Assiut, Egypt',
    location_ar: 'أسيوط، مصر',
    audience_count: '',
    since_year: '2019',
    portrait_image: '/assets/images/mohanad_action_pose.jpg',
    bts_image: '/assets/images/bts_production.jpg',
    email: 'ahmdmohanad28@gmail.com',
    whatsapp: '',
    socials: {
      // Add your exact profile URLs before displaying these links in the UI.
      tiktok: '',
      instagram: '',
      whatsapp: '',
      youtube: '',
      behance: '',
    },
  },

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
    },
    {
      id: 'editing',
      number: '05',
      title_en: 'Video Editing',
      title_ar: 'مونتاج الفيديوهات',
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
    },
    {
      year: 'Early Journey',
      title_en: 'Working with Local Businesses',
      title_ar: 'شغل مع أماكن ومشروعات في أسيوط',
      description_en:
        'Worked on photography and video content for local venues and businesses, including Qasr Napoli and Bella.',
      description_ar:
        'اشتغلت في التصوير وصناعة المحتوى لأماكن ومشروعات في أسيوط، منها قصر نابولي وبيلا.',
    },
    {
      year: 'Ongoing',
      title_en: 'From Photography to Storytelling',
      title_ar: 'من التصوير لحكاية كاملة',
      description_en:
        'Expanded into video creation and content collaborations, including work associated with B.Laban and Yango Play.',
      description_ar:
        'وسّعت شغلي من التصوير لصناعة الفيديوهات وحكي القصص، واشتغلت على محتوى مرتبط ببلبن ويانجو بلاي.',
    },
    {
      year: 'Today',
      title_en: 'Stories from Assiut and Beyond',
      title_ar: 'حكايات من أسيوط ولكل مكان',
      description_en:
        'Creating content with a personal point of view, bringing together people, places, businesses, and stories worth sharing.',
      description_ar:
        'بصنع محتوى من وجهة نظري، وبحاول أحكي حكايات الناس والأماكن والمشروعات بشكل بسيط وقريب من الجمهور.',
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
    },
    {
      value: 'Assiut',
      label_en: 'Home Base',
      label_ar: 'مكاني وبدايتي',
      sub_en: 'Stories from Upper Egypt',
      sub_ar: 'حكايات من أسيوط والصعيد',
    },
    {
      value: 'Video',
      label_en: 'My Main Medium',
      label_ar: 'أداتي الأساسية',
      sub_en: 'Short-form content and visual stories',
      sub_ar: 'فيديوهات قصيرة وحكايات بصرية',
    },
    {
      value: 'People',
      label_en: 'My Point of View',
      label_ar: 'الناس هي الحكاية',
      sub_en: 'Places, people, and real experiences',
      sub_ar: 'أماكن وناس وتجارب حقيقية',
    },
  ],

  ui: {
    en: {
      nav_work: 'Work',
      nav_brands: 'Collaborations',
      nav_about: 'About',
      nav_services: 'Services',
      nav_process: 'Process',
      nav_contact: 'Contact',
      nav_cta: "Let's Talk",
      sound_toggle_on: 'Audio On',
      sound_toggle_off: 'Sound Off',
      hero_badge: 'CONTENT CREATOR • ASSIUT, EGYPT • SINCE 2019',
      hero_title_line1: 'EVERY PLACE',
      hero_title_line2: 'HAS A STORY.',
      hero_intro:
        'I’m Mohanad — a content creator from Assiut. I turn people, places, products, and everyday moments into visual stories worth watching.',
      hero_cta_explore: 'EXPLORE MY WORK',
      hero_cta_create: 'LET’S CREATE TOGETHER',
      hero_scroll_prompt: 'SCROLL TO EXPLORE',
      brands_heading: 'PEOPLE I’VE WORKED WITH.',
      brands_sub:
        'A selection of brands and local businesses connected to my photography and video work.',
      work_heading: 'A FEW STORIES I’VE HELPED TELL.',
      work_sub:
        'Selected photography and video projects. Each project should use the original published work and verified details.',
      filter_all: 'All Work',
      filter_food: 'Food & Beverage',
      filter_tech: 'Tech & Lifestyle',
      filter_ugc: 'UGC & Hooks',
      filter_fashion: 'Fashion & Urban',
      filter_story: 'Brand Stories',
      btn_view_project: 'View Project',
      btn_close: 'Close',
      about_heading: 'THE CAMERA STARTED IT. THE STORY KEEPS ME GOING.',
      about_sub:
        'I started in Assiut in 2019 and grew from photography into video and content creation.',
      about_p1:
        'I’m interested in the details people might pass by: a place’s atmosphere, a product’s character, or a small moment that can become a good story. I like content that feels clear, human, and made for the people watching it.',
      about_p2:
        'My work includes photography and video content for local businesses and collaborations with brands. This portfolio brings selected work together in one place.',
      timeline_title: 'THE JOURNEY SO FAR',
      services_heading: 'WHAT I CAN HELP YOU CREATE.',
      services_sub:
        'Practical content services for brands, businesses, places, and ideas that deserve to be seen.',
      process_heading: 'FROM THE FIRST IDEA TO THE FINAL VIDEO.',
      process_sub:
        'A straightforward process that keeps the idea, production, and final delivery aligned.',
      contact_heading: 'HAVE A STORY TO TELL?',
      contact_sub:
        'Tell me about your business, product, or idea, and let’s discuss the right kind of content.',
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
      form_message_placeholder:
        'What do you want to create? Who is it for, and when do you need it?',
      form_submit_whatsapp: 'Prepare WhatsApp Message',
      form_submit_email: 'Prepare Email Inquiry',
      form_copied_email: 'Email copied',
      footer_rights: 'All rights reserved. Mohanad Ahmed.',
      footer_location: 'Assiut, Egypt — Open to suitable collaborations',
    },
    ar: {
      nav_work: 'شغلي',
      nav_brands: 'تعاونات',
      nav_about: 'عني',
      nav_services: 'الخدمات',
      nav_process: 'بنشتغل إزاي',
      nav_contact: 'تواصل معايا',
      nav_cta: 'يلا نتكلم',
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
      brands_heading: 'اشتغلت مع مين؟',
      brands_sub:
        'مجموعة من البراندات والمشروعات المحلية اللي ارتبط بيها شغلي في التصوير وصناعة الفيديو.',
      work_heading: 'شوية حكايات من شغلي.',
      work_sub:
        'نماذج من شغل التصوير والفيديو. كل مشروع لازم يعرض العمل الأصلي وتفاصيله المؤكدة.',
      filter_all: 'كل الشغل',
      filter_food: 'أكل ومشروبات',
      filter_tech: 'تكنولوجيا ولايف ستايل',
      filter_ugc: 'UGC وافتتاحيات',
      filter_fashion: 'أزياء وموضة',
      filter_story: 'حكايات البراندات',
      btn_view_project: 'شوف المشروع',
      btn_close: 'إغلاق',
      about_heading: 'الكاميرا كانت البداية. والحكاية هي اللي مكملة.',
      about_sub:
        'بدأت في أسيوط سنة 2019 بالتصوير، وبعدها وسّعت شغلي للفيديو وصناعة المحتوى.',
      about_p1:
        'بحب التفاصيل اللي ممكن الناس تعدّي من جنبها من غير ما تاخد بالها: روح مكان، أو شخصية منتج، أو موقف بسيط ممكن يتحول لحكاية حلوة. بالنسبة لي، المحتوى الناجح لازم يكون واضح وإنساني وقريب من الناس اللي بتتفرج.',
      about_p2:
        'اشتغلت في التصوير وصناعة الفيديوهات لمشروعات محلية، وكمان في تعاونات مع براندات. البورتفوليو ده بيجمع نماذج من الشغل في مكان واحد.',
      timeline_title: 'رحلتي لحد دلوقتي',
      services_heading: 'نقدر نعمل إيه مع بعض؟',
      services_sub:
        'خدمات محتوى عملية للبراندات والمشروعات والأماكن والأفكار اللي تستاهل الناس تشوفها.',
      process_heading: 'من أول فكرة لحد الفيديو النهائي.',
      process_sub:
        'خطوات واضحة تخلّي الفكرة والتصوير والتسليم ماشيين في نفس الاتجاه.',
      contact_heading: 'عندك حكاية عايز توصلها؟',
      contact_sub:
        'احكيلي عن مشروعك أو منتجك أو فكرتك، ونشوف أنسب نوع محتوى ليها.',
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
      form_message_placeholder:
        'عايز تعمل إيه؟ مين الجمهور المستهدف؟ ومحتاج المحتوى إمتى؟',
      form_submit_whatsapp: 'جهّز رسالة واتساب',
      form_submit_email: 'جهّز رسالة إيميل',
      form_copied_email: 'تم نسخ الإيميل',
      footer_rights: 'جميع الحقوق محفوظة لمهند أحمد.',
      footer_location: 'أسيوط، مصر — متاح للتعاون في المشاريع المناسبة',
    },
  },
};
