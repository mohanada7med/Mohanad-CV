export type Language = 'en' | 'ar';

export interface Project {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  brand: string;
  brand_ar: string;
  category: 'Brand Story' | 'UGC & Hooks' | 'Food & Beverage' | 'Tech & Lifestyle' | 'Fashion & Urban';
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

export const PORTFOLIO_DATA = {
  creator: {
    name_en: "Mohanad Ahmed",
    name_ar: "مهند أحمد",
    role_en: "Content Creator • UGC Specialist • Video Storyteller",
    role_ar: "صانع محتوى • متخصص UGC • راوي قصص فيديو",
    location_en: "Assiut, Egypt",
    location_ar: "أسيوط، مصر",
    audience_count: "100K+",
    since_year: "2019",
    portrait_image: "/assets/images/creator_portrait.jpg",
    bts_image: "/assets/images/bts_production.jpg",
    email: "mohanad.contact.creative@gmail.com",
    whatsapp: "+201023456789", // Egyptian format for direct link
    socials: {
      tiktok: "https://www.tiktok.com",
      instagram: "https://www.instagram.com",
      whatsapp: "https://wa.me/201023456789",
      youtube: "https://www.youtube.com",
      behance: "https://www.behance.net",
    }
  },

  brands: [
    {
      id: "b-laban",
      name: "B.Laban",
      name_ar: "بلبن",
      sector_en: "Viral Dessert & Food Retail",
      sector_ar: "حلويات تريند ومنتجات ألبان",
      description_en: "Collaborated on high-speed macro food videography and viral short-form launch reels capturing iconic dessert layering.",
      description_ar: "تعاون في تصوير سينمائي ماكرو لحلويات بلبن وتغطية الإطلاقات التريند بأسلوب ريلز سريع وجذاب.",
      badge: "Viral Hits",
      featuredProjectId: "blaban-pistachio-rush"
    },
    {
      id: "el-araby",
      name: "ElAraby Group",
      name_ar: "مجموعة العربي",
      sector_en: "Consumer Tech & Smart Living",
      sector_ar: "أجهزة منزلية وإلكترونيات",
      description_en: "Produced creative demonstration reels highlighting smart kitchen technology with dynamic lighting and relatable home scenarios.",
      description_ar: "إنتاج محتوى فيديو إبداعي يبرز مميزات الأجهزة الذكية ومواقف منزلية واقعية بتصوير عالي الجودة.",
      badge: "Tech Storytelling",
      featuredProjectId: "elaraby-smart-kitchen"
    },
    {
      id: "van-doti",
      name: "Van Doti",
      name_ar: "فان دوتي",
      sector_en: "Artisanal Waffles & Confectionery",
      sector_ar: "وافل بلجيكي وحلويات",
      description_en: "Crafted irresistible 3-second hook UGC videos showcasing warm Belgian waffles, slow-motion drizzles, and customer reactions.",
      description_ar: "صناعة فيديوهات UGC بافتتاحيات تخطف العين (Hooks) تركز على ذوبان الشوكولاتة وردود الفعل الحقيقية.",
      badge: "High-Hook UGC",
      featuredProjectId: "vandoti-waffle-indulgence"
    },
    {
      id: "moqsar-napoli",
      name: "Moqsar Napoli",
      name_ar: "مقصر نابولي",
      sector_en: "Urban Fashion & Tailored Streetwear",
      sector_ar: "أزياء عصرية وملابس شبابية",
      description_en: "Directed fast-paced cinematic fashion reels blending modern street culture with tailored Italian silhouettes.",
      description_ar: "إخراج ريلز فاشن سريعة وحركية تمزج بين الستايل الإيطالي والطاقة الشبابية في شوارع المدينة.",
      badge: "Street Cinematic",
      featuredProjectId: "moqsar-streetwear-drop"
    },
    {
      id: "domty",
      name: "Domty",
      name_ar: "دومتي",
      sector_en: "FMCG, Dairy & Beverages",
      sector_ar: "صناعات غذائية وألبان وعصائر",
      description_en: "Developed vibrant lifestyle video reels focusing on fresh morning routines, pure ingredients, and family table energy.",
      description_ar: "تطوير ريلز لايف ستايل مبهجة تركز على طاقة الصباح والمكونات الطبيعية ولمّة العيلة.",
      badge: "Lifestyle Energy",
      featuredProjectId: "domty-morning-burst"
    },
    {
      id: "jotun",
      name: "Jotun",
      name_ar: "جوتن",
      sector_en: "Architectural Paints & Textures",
      sector_ar: "دهانات معمارية وديكور",
      description_en: "Created visually rich interior transformation reels showcasing color palettes, textured wall finishes, and room makeovers.",
      description_ar: "إنتاج محتوى بصري فاخر يوثق تحول المساحات المعمارية باستخدام تناغم الألوان وتأثيرات الدهان المميزة.",
      badge: "Design Aesthetic",
      featuredProjectId: "jotun-palette-reveal"
    }
  ] as BrandPartner[],

  projects: [
    {
      id: "blaban-pistachio-rush",
      slug: "b-laban-pistachio-rush",
      title_en: "The Viral Pistachio Cascade",
      title_ar: "شلال الفستق والكونافا التريند",
      brand: "B.Laban",
      brand_ar: "بلبن",
      category: "Food & Beverage",
      category_ar: "أغذية ومشروبات",
      thumbnail: "/assets/images/blaban_dessert.jpg",
      video_url: "/assets/images/blaban_dessert.jpg",
      description_en: "A sensory-driven short-form video designed to halt viewers mid-scroll through high-speed macro texture shots and authentic sound design.",
      description_ar: "فيديو قصير حسي يوقف إبهام المستخدم في أول ثانيتين من خلال لقطات ماكرو مفرطة الحيوية ومؤثرات صوتية تثير الشهية.",
      creative_concept_en: "Contrast the loud crunch of golden kunafa with the slow, hypnotic pour of emerald pistachio cream in extreme macro.",
      creative_concept_ar: "المفارقة الحسية بين قرمشة الكنافة الذهبية وتدفق صوص الفستق البطيء بتقريب ماكرو سينمائي.",
      campaign_objective_en: "Build intense anticipation and crave-ability for the new seasonal jar dessert across TikTok & Instagram Reels.",
      campaign_objective_ar: "خلق حالة من الرغبة والتريند للمنتج الموسمي الجديد على تيك توك وإنستجرام ريلز.",
      results_en: "High retention rate through 100% completion in the first 5 seconds.",
      results_ar: "معدل استبقاء ومشاهدة كاملة مرتفع جداً في الثواني الخمس الأولى.",
      duration: "0:24",
      aspect_ratio: "9:16",
      year: "2024",
      featured: true,
      tags: ["Macro Videography", "Food Storytelling", "Viral Hook", "Sound Design"]
    },
    {
      id: "elaraby-smart-kitchen",
      slug: "elaraby-smart-kitchen-cook",
      title_en: "Precision Cook: 15-Minute Feast",
      title_ar: "طبخ ذكي في ١٥ دقيقة فقط",
      brand: "ElAraby Group",
      brand_ar: "مجموعة العربي",
      category: "Tech & Lifestyle",
      category_ar: "تكنولوجيا ولايف ستايل",
      thumbnail: "/assets/images/elaraby_tech.jpg",
      video_url: "/assets/images/elaraby_tech.jpg",
      description_en: "Relatable consumer storytelling demonstrating how modern smart appliances turn weeknight cooking stress into effortless dining.",
      description_ar: "قصة واقعية تبيّن إزاي الأجهزة الذكية بتحوّل حيرة الطبخ بعد يوم شغل طويل لتجربة سريعة وممتعة وبدون مجهود.",
      creative_concept_en: "Split-screen pacing contrasting chaotic manual cooking with the seamless single-touch intelligence of the appliance.",
      creative_concept_ar: "مقارنة حركية بين فوضى الطبخ التقليدي وسهولة الضغطة الواحدة على الشاشة الذكية.",
      campaign_objective_en: "Highlight convenience, modern design, and time-saving features for young couples and busy professionals.",
      campaign_objective_ar: "إبراز سهولة الاستخدام وتوفير الوقت والتصميم العصري المناسب لجيل الشباب.",
      results_en: "Generated enthusiastic comment conversations on appliance features and ease of use.",
      results_ar: "تفاعل كبير في التعليقات حول تفاصيل الاستخدام وسهولة التنظيف.",
      duration: "0:35",
      aspect_ratio: "9:16",
      year: "2024",
      featured: true,
      tags: ["Commercial UGC", "Smart Living", "Product Demo", "Lighting"]
    },
    {
      id: "vandoti-waffle-indulgence",
      slug: "van-doti-bubble-waffle",
      title_en: "The 3-Second Bubble Crunch",
      title_ar: "قرمشة البابل وافل في ٣ ثواني",
      brand: "Van Doti",
      brand_ar: "فان دوتي",
      category: "UGC & Hooks",
      category_ar: "UGC وافتتاحيات جذابة",
      thumbnail: "/assets/images/vandoti_waffle.jpg",
      video_url: "/assets/images/vandoti_waffle.jpg",
      description_en: "High-octane UGC opening with an audible snap and warm chocolate drizzle, building immediate viewer engagement.",
      description_ar: "فيديو UGC بنبض سريع يبتدئ بصوت القرمشة الحقيقي وسقوط الشوكولاتة الدافئة لشد الانتباه فوراً.",
      creative_concept_en: "First-person perspective order-to-bite journey with natural lighting and unedited audio hooks.",
      creative_concept_ar: "تجربة واقعية من منظور الزائر (POV) من لحظة الاستلام لأول قطمة مع صوت طبيعي نقي.",
      campaign_objective_en: "Drive local foot traffic to branch locations and spur organic user saves.",
      campaign_objective_ar: "زيادة الزيارات للفروع وحفظ الفيديو لتجربة الأصناف الجديدة.",
      duration: "0:19",
      aspect_ratio: "9:16",
      year: "2024",
      featured: false,
      tags: ["POV Video", "Audio Hooks", "Dessert UGC", "Fast Pacing"]
    },
    {
      id: "moqsar-streetwear-drop",
      slug: "moqsar-napoli-winter-drop",
      title_en: "Midnight Stride: Winter Collection",
      title_ar: "خطوات منتصف الليل: كولكشن الشتاء",
      brand: "Moqsar Napoli",
      brand_ar: "مقصر نابولي",
      category: "Fashion & Urban",
      category_ar: "أزياء وموضة",
      thumbnail: "/assets/images/moqsar_streetwear.jpg",
      video_url: "/assets/images/moqsar_streetwear.jpg",
      description_en: "Atmospheric fashion film shot in rain-slicked city streets, blending Italian cut tailoring with contemporary street energy.",
      description_ar: "فيلم أزياء سينمائي في شوارع ممطرة ليلاً، يربط بين فخامة التفصيل الإيطالي والستايل الشبابي العصري.",
      creative_concept_en: "Neon color grade reflecting on wet asphalt synchronized with custom bass-heavy rhythmic edit cuts.",
      creative_concept_ar: "انعكاس أضواء النيون على الأرض المبللة بالتناغم مع انتقالات سريعة على إيقاع الموسيقى.",
      campaign_objective_en: "Elevate brand perception from casual clothing store to lifestyle fashion staple.",
      campaign_objective_ar: "ترسيخ صورة البراند كعلامة أزياء شبابية رائدة تعبّر عن التميز والجرأة.",
      duration: "0:28",
      aspect_ratio: "9:16",
      year: "2023",
      featured: true,
      tags: ["Color Grading", "Fashion Film", "Beat Matching", "Urban Mood"]
    },
    {
      id: "domty-morning-burst",
      slug: "domty-morning-table",
      title_en: "Pure Morning Energy",
      title_ar: "طاقة الصباح والبدايات الحقيقية",
      brand: "Domty",
      brand_ar: "دومتي",
      category: "Brand Story",
      category_ar: "قصص البراندات",
      thumbnail: "/assets/images/domty_dairy.jpg",
      video_url: "/assets/images/domty_dairy.jpg",
      description_en: "A warm, sunlit breakfast reel celebrating authentic Egyptian morning routines, farm-fresh milk, and vibrant family breakfast tables.",
      description_ar: "ريل دافئ ومشرق يحتفي بالروتين الصباحي المصري الأصيل، والحليب الطبيعي، ولمة الفطار اللي بتدي طاقة لليوم.",
      creative_concept_en: "Natural window light catching condensation beads on cold bottles paired with genuine family laughter.",
      creative_concept_ar: "التقاط قطرات الندى على الزجاج في ضوء الشمس الصباحي مع أصوات ولمحات عفوية واقعية.",
      campaign_objective_en: "Strengthen emotional resonance as Egypt's trusted everyday breakfast essential.",
      campaign_objective_ar: "تعزيز الرابط العاطفي مع العائلة كعنصر أساسي لا غنى عنه على مائدة الإفطار اليومية.",
      duration: "0:30",
      aspect_ratio: "9:16",
      year: "2023",
      featured: false,
      tags: ["Lifestyle Reel", "Warm Cinematic", "Natural Light", "Brand Trust"]
    },
    {
      id: "jotun-palette-reveal",
      slug: "jotun-terracotta-harmony",
      title_en: "The Texture of Space",
      title_ar: "هارموني الألوان وتحوّل المكان",
      brand: "Jotun",
      brand_ar: "جوتن",
      category: "Brand Story",
      category_ar: "قصص البراندات",
      thumbnail: "/assets/images/jotun_palette.jpg",
      video_url: "/assets/images/jotun_palette.jpg",
      description_en: "Artistic video documenting a blank living space transforming into an architectural sanctuary using earthy terracotta and sage hues.",
      description_ar: "توثيق فني لتحول غرفة فارغة لمساحة معمارية أنيقة ودافئة عبر تناغم درجات الطمي والسيج من جوتن.",
      creative_concept_en: "A seamless single-brushstroke transition that bridges the raw plaster wall to the fully furnished interior.",
      creative_concept_ar: "حركة فرشاة واحدة ممتدة تعبر من الجدار الأولي إلى المساحة المؤثثة المكتملة بانسيابية.",
      campaign_objective_en: "Inspire homeowners and interior enthusiasts to explore bold texture and premium paint finishes.",
      campaign_objective_ar: "إلهام أصحاب البيوت ومحبي الديكور لاختيار درجات ألوان جريئة تضفي هوية للمكان.",
      duration: "0:32",
      aspect_ratio: "9:16",
      year: "2024",
      featured: false,
      tags: ["Architectural Reel", "Color Harmony", "Transitions", "Interior Mood"]
    }
  ] as Project[],

  services: [
    {
      id: "short-form",
      number: "01",
      title_en: "Short-Form Video Production",
      title_ar: "إنتاج الفيديوهات القصيرة",
      short_desc_en: "End-to-end Reels, TikToks, and YouTube Shorts engineered with strong opening hooks, crisp audio, and seamless pacing.",
      short_desc_ar: "إنتاج متكامل لريلز وتيك توك وشورتس مبني على افتتاحيات تشد الانتباه (Hooks) ومونتاج إيقاعي يضمن استمرار المشاهدة.",
      deliverables_en: ["Script & Visual Concept", "4K Vertical Shooting", "Dynamic Motion Graphics", "Sound Design & Mix"],
      deliverables_ar: ["السيناريو والفكرة البصرية", "تصوير عمودي بدقة 4K", "مؤثرات بصرية حركية", "هندسة صوت ومؤثرات"]
    },
    {
      id: "brand-collabs",
      number: "02",
      title_en: "Brand Storytelling & Sponsorships",
      title_ar: "حكايات البراندات والرعايات",
      short_desc_en: "Integrating consumer brands into authentic creator storylines without feeling like a scripted television advertisement.",
      short_desc_ar: "دمج منتجات وعلامات البراندات في سياق واقعي جذاب يوصل الرسالة التسويقية بدون ما يحس المشاهد بملل الإعلانات التقليدية.",
      deliverables_en: ["Brand Alignment Strategy", "Hook Formulations", "Organic Creator Presence", "Platform Optimization"],
      deliverables_ar: ["خطة توافق هوية البراند", "صياغة الهوك المناسب", "ظهور عفوي ومؤثر للمنتج", "تكييف المحتوى لكل منصة"]
    },
    {
      id: "ugc-content",
      number: "03",
      title_en: "UGC-Style Content Creation",
      title_ar: "محتوى الـ UGC الأصيل",
      short_desc_en: "User-Generated Content tailored for performance marketing and paid ad campaigns that builds instant consumer trust.",
      short_desc_ar: "محتوى بأسلوب المستخدم الحقيقي مصمم للحملات الإعلانية الممولة وبناء الثقة الفورية مع الجمهور والعملاء المحتملين.",
      deliverables_en: ["Unboxing & First Impressions", "Problem-to-Solution Arcs", "Multiple Hook Variants", "Ad Ready Formats"],
      deliverables_ar: ["فتح الصندوق والانطباع الأول", "سرد المشكلة والحل العملي", "نسخ متعددة للافتتاحية (Hooks)", "صيغ جاهزة للحملات الممولة"]
    },
    {
      id: "product-demo",
      number: "04",
      title_en: "Product Promotion & Macro Demos",
      title_ar: "استعراض المنتجات وتصوير الماكرو",
      short_desc_en: "Showcasing textures, craftsmanship, and key selling points through specialized lighting and high-speed detail shots.",
      short_desc_ar: "إبراز جودة التصنيع وتفاصيل المنتج الدقيقة من خلال إضاءة استوديو متخصصة ولقطات تقريبية (Macro) شديدة الوضوح.",
      deliverables_en: ["Macro Detail Videography", "Feature Demonstrations", "Texture & Quality Focus", "Fast Explainer Pacing"],
      deliverables_ar: ["تصوير ماكرو فائق الدقة", "شرح عملي للمميزات", "التركيز على ملمس وجودة الخامة", "شرح سلس وسريع"]
    },
    {
      id: "on-location",
      number: "05",
      title_en: "On-Location & Event Coverage",
      title_ar: "التغطيات الميدانية والفعاليات",
      short_desc_en: "Dynamic on-site shooting for new store openings, restaurant launches, festivals, and venue experiences.",
      short_desc_ar: "تصوير ميداني حيوي لافتتاح الفروع والمطاعم والفعاليات الكبرى مع التقاط روح المكان وطاقة الزوار.",
      deliverables_en: ["Same-Day Fast Turnaround", "Crowd & Atmosphere Energy", "Interactive Visitor Moments", "B-Roll Story Layering"],
      deliverables_ar: ["تسليم سريع في نفس اليوم", "نقل طاقة المكان وتفاعل الحضور", "لقطات عفوية حية", "توليف سينمائي للقطات الجانبية"]
    },
    {
      id: "editing-polishing",
      number: "06",
      title_en: "Creative Video Shooting & Editing",
      title_ar: "التصوير والمونتاج الإبداعي",
      short_desc_en: "Professional cinematography, color grading, sound design, and kinetic typography for raw footage or brand assets.",
      short_desc_ar: "خدمات تصوير احترافي وتلوين سينمائي وتصميم صوتي ومونتاج إيقاعي متقدم يرفع من جودة أي مادة مصورة.",
      deliverables_en: ["Color Grading & LUTs", "Sound FX Architecture", "Subtitles & Kinetic Type", "Speed Ramps & Whip Transitions"],
      deliverables_ar: ["تلوين سينمائي مدروس", "مكتبة مؤثرات صوتية احترافية", "كتابة نصوص متحركة وواضحة", "انتقالات بصرية ذكية"]
    }
  ] as ServiceItem[],

  timeline: [
    {
      year: "2019",
      title_en: "The First Frame",
      title_ar: "البداية وأول فيديو",
      description_en: "Picked up the camera in Assiut with a simple philosophy: capture honest stories that make people pause and feel something real.",
      description_ar: "البداية في أسيوط بحماس وشغف كبير: صناعة قصص بسيطة وصادقة تخلي اللي يشوفها يقف ويحس بحاجة حقيقية."
    },
    {
      year: "2021",
      title_en: "Expanding to Commercial UGC",
      title_ar: "الانتقال للمحتوى التجاري والـ UGC",
      description_en: "Began crafting dedicated short-form commercial content for food brands and local innovators, mastering the art of the 3-second hook.",
      description_ar: "البدء في تصوير ريلز تجارية لبراندات الأكل والمشاريع المحلية، مع التركيز على علم 'الخطاف البصري' في أول ٣ ثواني."
    },
    {
      year: "2023",
      title_en: "100K Community & Major Brands",
      title_ar: "١٠٠ ألف متابع وشراكات كبرى",
      description_en: "Crossed 100,000+ organic combined followers across TikTok and Instagram, partnering with household names like B.Laban and ElAraby Group.",
      description_ar: "تخطي حاجز ١٠٠ ألف متابع حقيقي عبر تيك توك وإنستجرام، والتعاون مع براندات وطنية كبرى مثل بلبن ومجموعة العربي."
    },
    {
      year: "2024 - 2026",
      title_en: "Creative Direction & Cinematic Short-Form",
      title_ar: "الإخراج الإبداعي والإنتاج السينمائي",
      description_en: "Directing high-impact video campaigns for national brands including Domty, Jotun, and fashion innovators with end-to-end creative control.",
      description_ar: "إخراج حملات ريلز كبرى لعلامات بارزة مثل دومتي وجوتن ومقصر نابولي برؤية إخراجية سينمائية متكاملة."
    }
  ] as TimelineMilestone[],

  process: [
    {
      number: "01",
      title_en: "Discover",
      title_ar: "الاستكشاف",
      tag_en: "Brief & Audience",
      tag_ar: "الهدف والجمهور",
      description_en: "Deep dive into your product, brand DNA, competitive landscape, and the exact audience mindset we want to capture.",
      description_ar: "فهم عميق للمنتج وهوية البراند، دراسة المنافسين، وتحديد الجمهور المستهدف بدقة وما يثير اهتمامهم."
    },
    {
      number: "02",
      title_en: "Concept",
      title_ar: "الفكرة والهوك",
      tag_en: "The Golden Hook",
      tag_ar: "افتتاحية تشد العين",
      description_en: "Developing 3 bespoke creative angles with high-retention opening hooks designed to stop thumbs in under 2 seconds.",
      description_ar: "ابتكار ٣ زوايا إبداعية مختلفة مع افتتاحيات قوية (Hooks) مصممة لوقف التمرير السريع في أقل من ثانيتين."
    },
    {
      number: "03",
      title_en: "Story",
      title_ar: "القصة والسيناريو",
      tag_en: "Short-Form Flow",
      tag_ar: "تسلسل سريع ومقنع",
      description_en: "Scripting a concise, energetic narrative arc where the product shines naturally as the hero of the experience.",
      description_ar: "كتابة سيناريو مكثف وسلس يربط المشاهد عاطفياً ويجعل المنتج هو البطل الطبيعي للتجربة بدون مبالغة."
    },
    {
      number: "04",
      title_en: "Produce",
      title_ar: "التصوير والإنتاج",
      tag_en: "Cinematography",
      tag_ar: "إضاءة وعدسات مخصصة",
      description_en: "Shooting with cinema-grade cameras, motorized gimbals, specialized lighting, and macro lenses for maximum visual punch.",
      description_ar: "التصوير بمعدات سينمائية وإضاءة احترافية وعدسات ماكرو تظهر أدق التفاصيل بأعلى جودة بصرية."
    },
    {
      number: "05",
      title_en: "Edit",
      title_ar: "المونتاج والصوت",
      tag_en: "Pacing & Sound",
      tag_ar: "إيقاع حركي ومؤثرات",
      description_en: "Sculpting the cut with micro-transitions, bespoke sound effects, color grading, and on-brand typography overlays.",
      description_ar: "بناء المونتاج بإيقاع مدروس، تلوين سينمائي، هندسة مؤثرات صوتية واقعية، وإضافة نصوص متحركة جذابة."
    },
    {
      number: "06",
      title_en: "Deliver",
      title_ar: "التسليم والنشر",
      tag_en: "Platform Ready",
      tag_ar: "جاهز للنشر الفوري",
      description_en: "Exporting optimized 9:16 vertical masters with customized thumbnails, caption recommendations, and posting guidance.",
      description_ar: "تسليم الفيديوهات بالصيغ المعتمدة للمنصات بأعلى جودة مع اقتراح العناوين والكوفر الأنسب للنشر."
    }
  ] as ProcessStep[],

  stats: [
    { value: "100K+", label_en: "Combined Community", label_ar: "متابع عبر المنصات", sub_en: "TikTok & Instagram Organic", sub_ar: "جمهور حقيقي ومتفاعل" },
    { value: "2019", label_en: "Creating Stories Since", label_ar: "صناعة محتوى من", sub_en: "Years of Visual Evolution", sub_ar: "سنوات من التطور المستمر" },
    { value: "6+", label_en: "Household Brand Collabs", label_ar: "براندات كبرى موثقة", sub_en: "National & Regional Leaders", sub_ar: "شراكات مع أسماء رائدة" },
    { value: "100%", label_en: "Short-Form Dedication", label_ar: "تركيز كامل على الريلز", sub_en: "Engineered For Retention", sub_ar: "محتوى مبني على الاستبقاء" }
  ],

  ui: {
    en: {
      nav_work: "Work",
      nav_brands: "Brands",
      nav_showreel: "Showreel",
      nav_about: "About",
      nav_services: "Services",
      nav_process: "Process",
      nav_contact: "Contact",
      nav_cta: "Let's Talk",
      sound_toggle_on: "Audio Active",
      sound_toggle_off: "Sound FX Off",
      hero_badge: "100K+ AUDIENCE • SHORT-FORM STORYTELLER",
      hero_title_line1: "SCROLL STOPPING",
      hero_title_line2: "IS AN ART.",
      hero_intro: "I turn everyday moments, products, and ideas into short-form stories people actually want to watch.",
      hero_cta_explore: "EXPLORE THE WORK",
      hero_cta_create: "LET'S CREATE SOMETHING",
      hero_scroll_prompt: "SCROLL TO EXPERIENCE",
      brands_heading: "THE BRANDS BEHIND THE STORIES.",
      brands_sub: "Real campaigns created in collaboration with industry pioneers, food innovators, and market leaders.",
      work_heading: "LESS TALK. MORE WORK.",
      work_sub: "A curated selection of short-form campaigns engineered for attention, emotion, and retention.",
      filter_all: "All Work",
      filter_food: "Food & Beverage",
      filter_tech: "Tech & Lifestyle",
      filter_ugc: "UGC & Hooks",
      filter_fashion: "Fashion & Urban",
      filter_story: "Brand Stories",
      btn_view_project: "Watch Project",
      btn_close: "Close",
      showreel_heading: "THIS IS WHAT I DO.",
      showreel_sub: "Step into an interactive 3D spatial reel gallery. Click and drag to orbit through cinematic short-form frames.",
      showreel_instruction: "DRAG TO ROTATE 3D GALLERY • CLICK TO PLAY",
      about_heading: "THE CAMERA IS JUST THE TOOL.",
      about_sub: "Storytelling is the foundation. Based in Assiut, Egypt, creating visual experiences for brands everywhere.",
      about_p1: "Since 2019, I've believed that short-form video shouldn't look like generic background noise. Whether it's the hypnotic pour of pistachio cream or the kinetic pulse of urban fashion, every second on screen has to earn its place.",
      about_p2: "I handle concepts, shooting, and editing with a director's eye and an authentic creator's voice — bringing brands into the feeds of over 100,000 real people.",
      timeline_title: "CREATIVE EVOLUTION",
      services_heading: "WHAT WE CAN CREATE TOGETHER.",
      services_sub: "Tailored visual solutions built specifically for short-form retention and organic audience love.",
      process_heading: "FROM IDEA TO FINAL REEL.",
      process_sub: "A disciplined 6-stage workflow engineered to produce captivating content on schedule.",
      contact_heading: "YOUR NEXT CAMPAIGN COULD START HERE.",
      contact_sub: "Have a product, a campaign, or an idea worth telling? Let's turn it into content people want to watch.",
      form_name: "Your Name",
      form_company: "Brand or Company",
      form_email: "Email Address",
      form_phone: "WhatsApp / Phone",
      form_project_type: "Project Type",
      form_type_ugc: "UGC & Hook Campaign",
      form_type_brand: "Brand Commercial Reel",
      form_type_product: "Product Macro Showcase",
      form_type_full: "Full Production & Direction",
      form_budget: "Estimated Budget",
      form_budget_1: "Under $1,000 / EGP 50,000",
      form_budget_2: "$1,000 - $3,000 / EGP 50k - 150k",
      form_budget_3: "$3,000+ / EGP 150k+",
      form_message: "Tell me about your idea or product",
      form_message_placeholder: "What are you launching? Who is your audience? When do you need it?",
      form_submit_whatsapp: "Generate Direct WhatsApp Message",
      form_submit_email: "Send Email Inquiry",
      form_copied_email: "Email Copied to Clipboard!",
      footer_rights: "All rights reserved. Designed & built for Mohanad Ahmed.",
      footer_location: "Assiut, Egypt — Available Worldwide"
    },
    ar: {
      nav_work: "الأعمال",
      nav_brands: "البراندات",
      nav_showreel: "الشوريل 3D",
      nav_about: "عني",
      nav_services: "الخدمات",
      nav_process: "خطوات العمل",
      nav_contact: "تواصل معي",
      nav_cta: "يلا نتواصل",
      sound_toggle_on: "الصوت مفعل",
      sound_toggle_off: "مؤثرات الصوت مغلقة",
      hero_badge: "جمهور +١٠٠ ألف • راوي قصص بالفيديو",
      hero_title_line1: "مش كل فيديو",
      hero_title_line2: "يستاهل يتشاف.",
      hero_intro: "بحوّل الأفكار والمنتجات والمواقف العادية لفيديوهات تشد الانتباه وتخلّي الناس تكمل للآخر.",
      hero_cta_explore: "شوف شغلي",
      hero_cta_create: "يلا نعمل حاجة مختلفة",
      hero_scroll_prompt: "انزل واستكشف التجربة",
      brands_heading: "براندات جمعنا معاها حكايات.",
      brands_sub: "حملات حقيقية تم إنتاجها بالتعاون مع علامات رائدة في السوق المصري في مجالات الأغذية والأجهزة والأزياء.",
      work_heading: "الكلام كتير. خلّي الشغل يتكلم.",
      work_sub: "مجموعة مختارة من حملات الريلز المصممة بذكاء لخطف الانتباه، وتوليد المشاعر، وتحقيق أعلى استبقاء.",
      filter_all: "كل الأعمال",
      filter_food: "أغذية ومشروبات",
      filter_tech: "تكنولوجيا ولايف ستايل",
      filter_ugc: "UGC وافتتاحيات",
      filter_fashion: "أزياء وموضة",
      filter_story: "قصص البراندات",
      btn_view_project: "مشاهدة المشروع",
      btn_close: "إغلاق",
      showreel_heading: "وده اللي بعرف أعمله.",
      showreel_sub: "ادخل معرض الشوريل ثلاثي الأبعاد التفاعلي. حرّك واسحب الماوس أو اللمس للتنقل بين شاشات العرض.",
      showreel_instruction: "اسحب للتدوير في الفضاء ثلاثي الأبعاد • اضغط لتشغيل الفيديو",
      about_heading: "الكاميرا مجرد أداة. الحكاية هي الأساس.",
      about_sub: "القوة في القصة وطريقة حكيها. من أسيوط، بصنع تجارب بصرية لبراندات في كل مكان.",
      about_p1: "من ٢٠١٩ وأنا مؤمن إن الفيديوهات القصيرة مش مجرد صوت في الخلفية. سواء كان سكب صوص الفستق الساحر أو طاقة الشارع في إعلان أزياء، كل ثانية على الشاشة لازم تستحق إن المشاهد يقف عندها.",
      about_p2: "بتولى تطوير الأفكار والتصوير والمونتاج بعين المخرج وروح صانع المحتوى الحقيقي — وده اللي بنى مجتمع من أكثر من ١٠٠ ألف متابع حقيقي.",
      timeline_title: "محطات الرحلة",
      services_heading: "نقدر نعمل إيه مع بعض.",
      services_sub: "حلول بصرية مصممة خصيصاً لتحقيق أعلى نسب مشاهدة وتفاعل وبناء حب حقيقي بين الجمهور والبراند.",
      process_heading: "من أول الفكرة لحد الريل الأخير.",
      process_sub: "خطوات واضحة ومنظمة من ٦ مراحل لضمان خروج المحتوى بأعلى مستوى وفي الوقت المحدد.",
      contact_heading: "الحكاية الجاية ممكن تبدأ من هنا.",
      contact_sub: "عندك منتج أو فكرة أو حملة؟ يلا نحولها لمحتوى الناس تحب تشوفه وتتكلم عنه.",
      form_name: "الاسم",
      form_company: "اسم البراند أو الشركة",
      form_email: "البريد الإلكتروني",
      form_phone: "رقم الواتساب / الهاتف",
      form_project_type: "نوع المشروع المطلوب",
      form_type_ugc: "حملة UGC بافتتاحيات قوية",
      form_type_brand: "ريل إعلاني متكامل للبراند",
      form_type_product: "استعراض منتج بتقنية الماكرو",
      form_type_full: "إنتاج وإخراج إبداعي كامل",
      form_budget: "الميزانية التقريبية",
      form_budget_1: "أقل من ٥٠ ألف جنيه مصري",
      form_budget_2: "من ٥٠ إلى ١٥٠ ألف جنيه",
      form_budget_3: "أكثر من ١٥٠ ألف جنيه",
      form_message: "تفاصيل فكرتك أو منتجك",
      form_message_placeholder: "إيه المنتج اللي عاوزين نسوق له؟ مين جمهورك؟ وإيه الموعد المستهدف؟",
      form_submit_whatsapp: "تجهيز رسالة واتساب مباشرة",
      form_submit_email: "إرسال استفسار عبر الإيميل",
      form_copied_email: "تم نسخ الإيميل بنجاح!",
      footer_rights: "جميع الحقوق محفوظة. صُمم ونُفذ لمهند أحمد.",
      footer_location: "أسيوط، مصر — متاح للتعاون محلياً ودولياً"
    }
  }
};
