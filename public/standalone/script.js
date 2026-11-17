/* =========================================================
   صحيفة مِـرْقَـاب الإلكترونية - المنطق التفاعلي (Vanilla JS)
   ========================================================= */

const CATEGORIES = [
  { id: 'all', name: 'الرئيسية' },
  { id: 'minya', name: 'أخبار المنيا' },
  { id: 'university', name: 'الجامعات' },
  { id: 'street', name: 'نبض الشارع' },
  { id: 'politics', name: 'السياسة' },
  { id: 'economy', name: 'الاقتصاد' },
  { id: 'sports', name: 'الرياضة' },
  { id: 'accidents', name: 'الحوادث' },
  { id: 'health', name: 'الصحة' },
  { id: 'culture', name: 'الثقافي' },
  { id: 'solutions', name: 'صحافة الحلول' },
  { id: 'data', name: 'صحافة البيانات' },
  { id: 'videos', name: 'فيديوهات' }
];

const MINYA_CENTERS = [
  'العدوة',
  'مغاغة',
  'بني مزار',
  'مطاي',
  'سمالوط',
  'المنيا',
  'أبو قرقاص',
  'ملوي',
  'ديرمواس'
];

const BREAKING_NEWS = [
  'افتتاح المرحلة الجديدة من محور سمالوط على النيل وتقليص زمن الرحلة بين شرق وغرب المنيا',
  'جامعة المنيا تطلق حاضنة «مرقاب» للصحافة الرقمية وريادة الأعمال بكلية الآداب',
  'تطوير شامل لمستشفى ملوي التخصصي وإضافة 45 سرير عناية مركزة لخدمة جنوب المحافظة',
  'زيادة صادرات النباتات العطرية والطبية من مراكز المنيا بنسبة 34% خلال العام الجاري'
];

const ARTICLES = [
  {
    id: 'art-lead-1',
    category: 'minya',
    kicker: 'تغطية ميدانية موسعة',
    title: 'محور سمالوط وكورنيش المنيا الجديد: كيف أعادت مشروعات الطرق رسم خريطة التنمية في عروس الصعيد؟',
    summary: 'جولة صحفية ترصد الأثر المباشر للمحاور العرضية الجديدة على حركة التجارة والسياحة والنقل بين مراكز المنيا التسعة.',
    image: './images/merqab_hero_lead_1794431697836.jpg',
    imageCaption: 'مشهد جوي يوثق انسيابية الحركة المرورية على كورنيش النيل ومحاور العبور في المنيا',
    location: 'سمالوط · المنيا',
    author: 'نورهان عيد',
    publishedAt: 'اليوم · 09:30 ص',
    isLead: true,
    content: [
      'لم تعد المسافة بين شرق النيل وغربه في محافظة المنيا رحلة تستغرق ساعات من الانتظار، فقد أسهم تشغيل محور سمالوط الحر وامتداد كورنيش النيل في خلق شريان تنموي يربط المناطق الزراعية بالظهير الصحراوي الشرقي والغربي.',
      'وأكد سائقو النقل وأصحاب المشروعات الصغيرة بمركزي مطاي وبني مزار أن المحور اختصر زمن نقل المحاصيل الاستراتيجية بأكثر من 50%، ما قلل الفاقد اليومي ورفع تنافسية المنتجات المنياوية في أسواق القاهرة والإسكندرية.',
      'وعلى الصعيد السياحي، فتح الطريق الجديد مساراً ميسراً للوصول إلى دير السيدة العذراء بجبل الطير ومنطقة تل العمارنة الأثرية، بما يعزز موقع المحافظة على خريطة السياحة الثقافية والدينية.'
    ]
  },
  {
    id: 'art-uni-1',
    category: 'university',
    kicker: 'جامعة المنيا',
    title: 'كلية الآداب بجامعة المنيا تحتضن ملتقى الصحافة الاستقصائية بمشاركة طلاب شعبة الصحافة',
    summary: 'مناقشة مشروعات التخرج الصحفية التي تعتمد على التحقق الرقمي وصحافة البيانات لخدمة قضايا الصعيد.',
    image: './images/merqab_university_1794431700257.jpg',
    imageCaption: 'طلاب قسم الإعلام بكلية الآداب جامعة المنيا خلال جلسات التحرير الرقمي',
    location: 'جامعة المنيا',
    author: 'نورهان عيد',
    publishedAt: 'اليوم · 11:00 ص',
    content: [
      'شهدت قاعة المؤتمرات بكلية الآداب في جامعة المنيا انطلاق أعمال الملتقى السنوي للصحافة الرقمية بمشاركة أساتذة قسم الإعلام والصحفيين الميدانيين.',
      'وأشادت اللجنة العلمية بمستوى بوابات التخرج الطلابية التي تجمع بين التغطية المحلية لمراكز المحافظة والالتزام بميثاق الشرف الصحفي والتحقق من المصادر.'
    ]
  },
  {
    id: 'art-street-1',
    category: 'street',
    kicker: 'نبض الشارع',
    title: 'في أسواق ملوي وأبو قرقاص: مبادرات مجتمعية لضبط أسعار السلع الأساسية ودعم الأسر المنتجة',
    summary: 'رصد ميداني لتجربة المنافذ التشاركية التي أطلقها شباب المراكز بالتعاون مع الغرفة التجارية بالمنيا.',
    image: './images/merqab_street_life_1794431700006.jpg',
    imageCaption: 'حركة البيع والشراء في أحد الأسواق المطورة بجنوب محافظة المنيا',
    location: 'ملوي · أبو قرقاص',
    author: 'فريق مرقاب الميداني',
    publishedAt: 'منذ ساعتين',
    content: [
      'في قلب مدينة ملوي وقرى أبو قرقاص، نجحت مبادرات شبابية في ربط المزارعين مباشرة بالمستهلكين عبر منافذ بيع منظمة دون حلقات وساطة.',
      'وأشار المواطنون إلى أن التجربة وفرت فارقاً سعرياً ملموساً يتراوح بين 15% و22% في الخضروات والسلع الغذائية اليومية.'
    ]
  },
  {
    id: 'art-culture-1',
    category: 'culture',
    kicker: 'وثائقي وتراث',
    title: 'من تل العمارنة إلى البهنسا وتونا الجبل: ذاكرة المنيا المعمارية والروحية في ملف وثائقي خاص',
    summary: 'رحلة مصورة بين عاصمة إخناتون وأرض البقيع الثاني وجبانة تونا الجبل توثق كنوز عروس الصعيد.',
    image: './images/merqab_minya_culture_1794431699863.jpg',
    imageCaption: 'واجهة أثرية تاريخية توثق امتداد الحضارة المصرية في محافظة المنيا',
    location: 'ديرمواس · بني مزار',
    author: 'قسم الثقافي والوثائقي',
    publishedAt: 'أمس',
    content: [
      'تجمع محافظة المنيا بين طبقات تاريخية متعاقبة قلما تجتمع في إقليم واحد؛ فمن مقابر بني حسن وتل العمارنة بمركز ديرمواس، إلى تونا الجبل في ملوي، وصولاً إلى قرية البهنسا التاريخية بمركز بني مزار.',
      'ويرصد التقرير جهود ترميم المواقع الأثرية ودمج المجتمع المحلي في الحفاظ على الهوية البصرية والحرف التراثية المرتبطة بالسياحة المستدامة.'
    ]
  },
  {
    id: 'art-pol-1',
    category: 'politics',
    kicker: 'السياسة والتنمية',
    title: 'توسيع برامج الحماية الاجتماعية وتوجيه استثمارات جديدة للبنية التحتية في صعيد مصر',
    summary: 'قراءة في أولويات الموازنة العامة الجديدة لرفع كفاءة الخدمات الحكومية وميكنة المراكز التكنولوجية بالمحافظات.',
    image: './images/merqab_hero_lead_1794431697836.jpg',
    location: 'القاهرة · المنيا',
    author: 'محرر الشؤون السياسية',
    publishedAt: 'منذ 3 ساعات',
    content: [
      'تواصل مؤسسات الدولة التوسع في التحول الرقمي داخل الوحدات المحلية لتقليل زمن إنهاء تراخيص البناء والخدمات الجماهيرية بالمحافظات.',
      'كما تركز البرامج البرلمانية والتنفيذية على متابعة معدلات تنفيذ مشروعات مياه الشرب والصرف الصحي بقرى حياة كريمة.'
    ]
  },
  {
    id: 'art-eco-1',
    category: 'economy',
    kicker: 'الاقتصاد الأخضر',
    title: 'المنيا عاصمة النباتات الطبية والعطرية: قفزة تصديرية بنسبة 34% ومصانع جديدة للقيمة المضافة',
    summary: 'كيف تحول البردقوش والنعناع والبابونج المنياوي من تصدير خام إلى صناعات زيوت وتعبئة مطلوبة عالمياً.',
    image: './images/merqab_street_life_1794431700006.jpg',
    location: 'مغاغة · العدوة',
    author: 'قسم الاقتصاد',
    publishedAt: 'منذ 4 ساعات',
    content: [
      'تستحوذ محافظة المنيا على نسبة كبرى من إنتاج مصر للنباتات الطبية والعطرية، خاصة في مراكز العدوة ومغاغة وبني مزار.',
      'وساعدت وحدات التجفيف الشمسي والتصنيع الزراعي الحديثة في مضاعفة العائد الاقتصادي للمزارعين وتوفير فرص عمل موسمية ودائمة للشباب والفتيات.'
    ]
  },
  {
    id: 'art-sports-1',
    category: 'sports',
    kicker: 'الرياضة المصرية',
    title: 'نادي المنيا يواصل استعداداته القوية ومراكز الشباب بالمحافظة تحتضن دوري المواهب الناشئة',
    summary: 'تطوير الملاعب الخماسية وتكثيف معسكرات الإعداد لاكتشاف مواهب كرة القدم وألعاب القوى في الصعيد.',
    image: './images/merqab_university_1794431700257.jpg',
    location: 'استاد المنيا',
    author: 'القسم الرياضي',
    publishedAt: 'منذ 5 ساعات',
    content: [
      'يكثف الجهاز الفني لنادي المنيا تدريباته استعداداً لمواجهات الدوري الحاسمة، وسط دعم جماهيري واسع من أبناء المحافظة.',
      'بالتوازي، انطلقت تصفيات دوري مراكز الشباب بمشاركة فرق من العدوة شمالاً حتى ديرمواس جنوباً.'
    ]
  },
  {
    id: 'art-acc-1',
    category: 'accidents',
    kicker: 'الحوادث والسلامة',
    title: 'رفع درجة الاستعداد على الطريق الصحراوي الشرقي بالمنيا ونشر نقاط إسعاف ورادارات ذكية',
    summary: 'خطة مرورية متكاملة للحد من الحوادث خلال ساعات الشبورة المائية وتأمين حركة السفر بين المحافظات.',
    image: './images/merqab_hero_lead_1794431697836.jpg',
    location: 'المنيا',
    author: 'محرر الحوادث',
    publishedAt: 'منذ 6 ساعات',
    content: [
      'أعلنت إدارة مرور المنيا بالتنسيق مع هيئة الإسعاف تعزيز التمركزات الأمنية والمرورية على مداخل الطريق الصحراوي الشرقي والغربي.',
      'كما تم تركيب لوحات إرشادية مضيئة لتحذير السائقين في المنحنيات وتفعيل غرف العمليات لسرعة الاستجابة للطوارئ.'
    ]
  },
  {
    id: 'art-health-1',
    category: 'health',
    kicker: 'القطاع الصحي',
    title: 'مستشفى ملوي التخصصي وجامعة المنيا يطلقان قوافل طبية أسبوعية مجانية لقرى الظهير الصحراوي',
    summary: 'توفير فحوصات المبادرات الرئاسية وصرف الأدوية وإجراء جراحات العيون والقساطر مجاناً للأسر الأولى بالرعاية.',
    image: './images/merqab_university_1794431700257.jpg',
    location: 'ملوي · المنيا',
    author: 'قسم الصحة',
    publishedAt: 'منذ 7 ساعات',
    content: [
      'استقبلت القوافل الطبية المجانية أكثر من 3200 مواطن في قرى جنوب وشمال المنيا خلال الأسبوع الماضي، مع تحويل الحالات الحرجة لمستشفيات جامعة المنيا وملوي التخصصي.',
      'وشملت القوافل عيادات الباطنة والأطفال والرمد والتحاليل المعملية والتوعية الصحية.'
    ]
  },
  {
    id: 'art-sol-1',
    category: 'solutions',
    kicker: 'صحافة الحلول',
    title: 'وحدات التجفيف الشمسي في قرى المنيا: كيف أوقفت 18 جمعية أهلية هدر محصول الطماطم والنباتات العطرية؟',
    summary: 'تحقيق يوثق تحول الفائض الزراعي الموسمي من خسارة متكررة إلى منتج مجفف عالي القيمة يفتح أبواب التصدير.',
    image: './images/merqab_street_life_1794431700006.jpg',
    location: 'مغاغة · سمالوط',
    author: 'نورهان عيد',
    publishedAt: 'اليوم · 10:15 ص',
    solutionMeta: {
      problem: 'تلف نحو 28% من محاصيل الطماطم والنباتات العطرية خلال ذروة الحصاد بسبب غياب التخزين المبرد.',
      response: 'إنشاء 18 وحدة تجفيف شمسية تشاركية داخل القرى بتكلفة منخفضة تعتمد على الطاقة النظيفة.',
      impact: 'تراجع الفاقد إلى أقل من 5% وارتفاع صافي دخل 640 أسرة ريفية بنسبة 42%.',
      limitations: 'تحتاج الوحدات إلى توسيع خطوط التعبئة المعتمدة دولياً للوصول المباشر لأسواق أوروبا.'
    },
    content: [
      'على أطراف مركز مغاغة، لم يعد المزارع يخشى انخفاض الأسعار وقت ذروة الجني؛ فبعد تأسيس وحدات التجفيف الشمسي المشتركة، بات الفائض يتحول خلال 72 ساعة إلى شرائح مجففة مطلوبة في المصانع.',
      'واعتمدت التجربة على تدريب فتيات القرية على معايير الفرز والنظافة الغذائية، وهو ما خلق سلسلة قيمة محلية متكاملة قابلة للتكرار في باقي مراكز الصعيد.'
    ]
  },
  {
    id: 'art-sol-2',
    category: 'solutions',
    kicker: 'صحافة الحلول',
    title: 'مدرسة الحرف الرقمية ببني مزار: نموذج عملي لربط خريجي الدبلومات بسوق العمل عن بُعد',
    summary: 'تجربة تدريبية مجانية نجحت في تأهيل 420 شاباً وفتاة في التصميم والبرمجة والتجارة الإلكترونية خلال عامين.',
    image: './images/merqab_university_1794431700257.jpg',
    location: 'بني مزار',
    author: 'فريق التحقيقات',
    publishedAt: 'أمس',
    solutionMeta: {
      problem: 'ارتفاع بطالة خريجي التعليم الفني في القرى لبعدهم عن مراكز التدريب المهني الحديثة.',
      response: 'تحويل قاعات مراكز الشباب غير المستغلة إلى معامل تدريب رقمي بإشراف متطوعين من خريجي الجامعات.',
      impact: 'التحاق 68% من المتدربين بوظائف حرة أو شركات إقليمية خلال 6 أشهر من التخرج.',
      limitations: 'ضعف سرعة الإنترنت الأرضي في بعض العزب النائية يمثل التحدي الأبرز أمام التوسع.'
    },
    content: [
      'أثبتت المبادرة في بني مزار أن التدريب التطبيقي المستمر داخل القرى يمكنه سد الفجوة الرقمية دون انتظار انتقال الشباب إلى العاصمة.',
      'ويعتمد البرنامج على مشاريع عملية حقيقية لتسويق منتجات الحرف اليدوية والأثاث المنياوي عبر المتاجر الإلكترونية.'
    ]
  },
  {
    id: 'art-data-1',
    category: 'data',
    kicker: 'صحافة البيانات',
    title: 'خريطة مشروعات «حياة كريمة» في المنيا بالأرقام: 192 قرية و5 مراكز في صدارة التنفيذ',
    summary: 'تحليل رقمي للبيانات الرسمية يكشف توزيع مشروعات الصرف الصحي والتعليم والمجمعات الخدمية عبر مراكز المحافظة.',
    image: './images/merqab_hero_lead_1794431697836.jpg',
    location: 'المنيا',
    author: 'وحدة بيانات مرقاب',
    publishedAt: 'اليوم · 08:45 ص',
    dataHighlight: {
      metricLabel: 'نسبة الإنجاز الإجمالية بالمرحلة الأولى في المنيا',
      metricValue: '91.4%',
      source: 'التقرير الإحصائي لمبادرة حياة كريمة 2026'
    },
    content: [
      'تُظهر البيانات الرسمية المجمعة لمشروعات المرحلة الأولى في 5 مراكز بمحافظة المنيا (العدوة، مغاغة، أبو قرقاص، ملوي، ديرمواس) تقدماً كبيراً في البنية الأساسية للقرى الأكثر احتياجاً.',
      'وتصدرت مشروعات مياه الشرب والصرف الصحي والمدارس الجديدة قائمة الاستثمارات المنفذة بنسبة تجاوزت 62% من إجمالي المخصصات.'
    ]
  },
  {
    id: 'art-data-2',
    category: 'data',
    kicker: 'صحافة البيانات',
    title: 'تحليل إحصائي: التحول الرقمي في جامعة المنيا يرفع المعاملات الإلكترونية إلى 88% خلال 4 سنوات',
    summary: 'رصد بالبيانات لتطور المنصات التعليمية والاختبارات الإلكترونية وبوابات الدفع والتحصيل داخل الحرم الجامعي.',
    image: './images/merqab_university_1794431700257.jpg',
    location: 'جامعة المنيا',
    author: 'وحدة بيانات مرقاب',
    publishedAt: 'منذ يومين',
    dataHighlight: {
      metricLabel: 'معدل الخدمات الطلابية المميكنة بجامعة المنيا',
      metricValue: '88%',
      source: 'مركز معلومات جامعة المنيا 2026'
    },
    content: [
      'قارنت وحدة بيانات «مرقاب» حجم المعاملات الورقية مقابل الإلكترونية بين عامي 2022 و2026 داخل كليات جامعة المنيا.',
      'وكشفت الأرقام عن تراجع زمن استخراج الشهادات والنتائج من 7 أيام في المتوسط إلى أقل من 24 ساعة عبر البوابات الرقمية.'
    ]
  }
];

const DATA_DATASETS = [
  {
    id: 'ds-projects',
    tabLabel: 'مشروعات حياة كريمة',
    title: 'توزيع نسب الإنجاز في مشروعات البنية التحتية بمراكز المنيا (%)',
    source: 'بيانات مديرية التخطيط ومحافظة المنيا (2026)',
    unit: '%',
    points: [
      { label: 'أبو قرقاص', value: 94 },
      { label: 'ملوي', value: 92 },
      { label: 'مغاغة', value: 90 },
      { label: 'ديرمواس', value: 89 },
      { label: 'العدوة', value: 86 }
    ]
  },
  {
    id: 'ds-exports',
    tabLabel: 'صادرات النباتات العطرية',
    title: 'تطور صادرات المنيا من النباتات الطبية والعطرية (ألف طن)',
    source: 'الغرفة التجارية بالمنيا والمجلس التصديري (2022–2026)',
    unit: ' ألف طن',
    points: [
      { label: '2026 (مقدّر)', value: 98 },
      { label: '2025', value: 84 },
      { label: '2024', value: 73 },
      { label: '2023', value: 61 },
      { label: '2022', value: 52 }
    ]
  },
  {
    id: 'ds-digital',
    tabLabel: 'التحول الرقمي الجامعي',
    title: 'مؤشر الخدمات الإلكترونية والاختبارات المميكنة بجامعة المنيا (%)',
    source: 'مركز تكنولوجيا المعلومات - جامعة المنيا',
    unit: '%',
    points: [
      { label: 'سداد المصروفات إلكترونياً', value: 96 },
      { label: 'إعلان النتائج والبيانات', value: 93 },
      { label: 'الاختبارات الإلكترونية', value: 85 },
      { label: 'الأرشيف الأكاديمي والرسائل', value: 79 }
    ]
  }
];

const INITIAL_VIDEOS = [
  {
    id: 'vid-1',
    title: 'جولة مصورة على كورنيش النيل بالمنيا ومحور سمالوط الجديد',
    categoryLabel: 'أخبار المنيا',
    duration: '04:15',
    reporter: 'كاميرا مرقاب - نورهان عيد',
    publishedAt: 'اليوم',
    thumbnailUrl: './images/merqab_hero_lead_1794431697836.jpg',
    sourceType: 'mp4',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'تقرير مصور يرصد التحول العمراني والمروري في شوارع المنيا والمحاور التنموية الحديثة.',
    isUserAdded: false
  },
  {
    id: 'vid-2',
    title: 'لقاء مع طلاب قسم الإعلام بجامعة المنيا حول صحافة المستقبل',
    categoryLabel: 'الجامعات',
    duration: '03:40',
    reporter: 'وحدة الفيديو الجامعي',
    publishedAt: 'منذ يوم',
    thumbnailUrl: './images/merqab_university_1794431700257.jpg',
    sourceType: 'mp4',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'حوارات ميدانية مع شباب الصحفيين بكلية الآداب حول استخدام البيانات والتقارير المصورة.',
    isUserAdded: false
  },
  {
    id: 'vid-3',
    title: 'قصة نجاح وحدات التجفيف الشمسي في قرى مغاغة (صحافة الحلول)',
    categoryLabel: 'صحافة الحلول',
    duration: '05:10',
    reporter: 'فريق التحقيقات المصورة',
    publishedAt: 'منذ يومين',
    thumbnailUrl: './images/merqab_street_life_1794431700006.jpg',
    sourceType: 'mp4',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'كيف تحولت فواقد المحاصيل إلى صناعة مجتمعية تدر دخلاً مستداماً للأسر الريفية.',
    isUserAdded: false
  },
  {
    id: 'vid-4',
    title: 'وثائقي قصير: أسرار تل العمارنة والبهنسا وتونا الجبل في المنيا',
    categoryLabel: 'وثائقي',
    duration: '06:25',
    reporter: 'القسم الوثائقي',
    publishedAt: 'منذ 3 أيام',
    thumbnailUrl: './images/merqab_minya_culture_1794431699863.jpg',
    sourceType: 'mp4',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'إطلالة بصرية على أبرز المعالم الأثرية والتاريخية التي تحتضنها عروس الصعيد.',
    isUserAdded: false
  }
];

/* ------------------ الحالة العامة ------------------ */
const state = {
  activeCategory: 'all',
  selectedCenter: '',
  searchQuery: '',
  activeMinyaCenterPill: 'الكل',
  activeMultiDept: 'university',
  activeDatasetId: DATA_DATASETS[0].id,
  articleFontSize: 16,
  currentArticleId: null,
  videoMode: 'url',
  selectedFileUrl: '',
  selectedFileName: '',
  bookmarks: loadStorage('merqab_standalone_bookmarks', ['art-lead-1']),
  customVideos: loadStorage('merqab_standalone_videos', []).filter(
    (v) => v.sourceType !== 'local' && !String(v.videoUrl).startsWith('blob:')
  )
};

function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage quota errors
  }
}

/* ------------------ التواريخ ومواقيت الصلاة التلقائية للمنيا ------------------ */
function getDailyMinyaPrayerTimes(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date - startOfYear) / 86400000);
  const seasonalRad = ((dayOfYear - 80) / 365) * 2 * Math.PI;

  const toMinutes = (h, m) => h * 60 + m;
  const formatTime = (mins) => {
    const wrapped = ((Math.round(mins) % 1440) + 1440) % 1440;
    const h24 = Math.floor(wrapped / 60);
    const m = wrapped % 60;
    const period = h24 >= 12 ? 'م' : 'ص';
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
  };

  const fajr = toMinutes(4, 30) - Math.sin(seasonalRad) * 58;
  const sunrise = toMinutes(5, 55) - Math.sin(seasonalRad) * 48;
  const dhuhr = toMinutes(12, 0) - Math.sin((dayOfYear / 365) * 4 * Math.PI) * 10;
  const asr = dhuhr + 195 + Math.sin(seasonalRad) * 22;
  const maghrib = toMinutes(17, 55) + Math.sin(seasonalRad) * 55;
  const isha = maghrib + 78 + Math.sin(seasonalRad) * 12;

  return [
    { key: 'fajr', name: 'الفجر', minutes: Math.round(fajr), time: formatTime(fajr) },
    { key: 'sunrise', name: 'الشروق', minutes: Math.round(sunrise), time: formatTime(sunrise) },
    { key: 'dhuhr', name: 'الظهر', minutes: Math.round(dhuhr), time: formatTime(dhuhr) },
    { key: 'asr', name: 'العصر', minutes: Math.round(asr), time: formatTime(asr) },
    { key: 'maghrib', name: 'المغرب', minutes: Math.round(maghrib), time: formatTime(maghrib) },
    { key: 'isha', name: 'العشاء', minutes: Math.round(isha), time: formatTime(isha) }
  ];
}

function updateDateAndPrayerUI() {
  const now = new Date();

  const gregEl = document.getElementById('gregorianDate');
  const hijriEl = document.getElementById('hijriDate');
  if (gregEl) {
    gregEl.textContent = new Intl.DateTimeFormat('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(now);
  }
  if (hijriEl) {
    try {
      hijriEl.textContent = new Intl.DateTimeFormat('ar-EG-u-ca-islamic-umalqura', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(now);
    } catch {
      hijriEl.textContent = '';
    }
  }

  const prayers = getDailyMinyaPrayerTimes(now);
  const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  let nextPrayer = prayers.find((p) => p.minutes * 60 > currentSeconds);
  let diffSeconds = 0;

  if (nextPrayer) {
    diffSeconds = nextPrayer.minutes * 60 - currentSeconds;
  } else {
    nextPrayer = prayers[0];
    diffSeconds = (24 * 3600 - currentSeconds) + nextPrayer.minutes * 60;
  }

  const h = Math.floor(diffSeconds / 3600);
  const m = Math.floor((diffSeconds % 3600) / 60);
  const s = diffSeconds % 60;

  const nextNameEl = document.getElementById('nextPrayerName');
  const countdownEl = document.getElementById('nextPrayerCountdown');
  if (nextNameEl) nextNameEl.textContent = nextPrayer.name;
  if (countdownEl) {
    countdownEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  const gridEl = document.getElementById('prayerTimesGrid');
  if (gridEl) {
    gridEl.innerHTML = prayers
      .map(
        (p) => `
        <div class="prayer-slot ${p.key === nextPrayer.key ? 'is-next' : ''}">
          <span class="prayer-slot-name">${p.name}</span>
          <span class="prayer-slot-time tabular-nums">${p.time}</span>
        </div>`
      )
      .join('');
  }
}

/* ------------------ التهيئة والعرض ------------------ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  populateStaticMenus();
  renderBreakingTicker();
  updateDateAndPrayerUI();
  setInterval(updateDateAndPrayerUI, 1000);

  renderAll();
  bindEvents();
});

function initTheme() {
  const savedTheme = loadStorage('merqab_standalone_theme', 'light');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  updateThemeButtonLabel();
}

function updateThemeButtonLabel() {
  const label = document.getElementById('themeToggleText');
  if (label) {
    label.textContent = document.documentElement.classList.contains('dark')
      ? 'الوضع النهاري'
      : 'الوضع الليلي';
  }
}

function populateStaticMenus() {
  const centerSelect = document.getElementById('centerSelect');
  if (centerSelect) {
    MINYA_CENTERS.forEach((center) => {
      const opt = document.createElement('option');
      opt.value = center;
      opt.textContent = `مركز ${center}`;
      centerSelect.appendChild(opt);
    });
  }

  const footerLinks = document.getElementById('footerCategories');
  if (footerLinks) {
    footerLinks.innerHTML = CATEGORIES.slice(1)
      .map(
        (cat) => `<button type="button" class="footer-link-btn" data-cat="${cat.id}">• ${cat.name}</button>`
      )
      .join('');
  }
}

function renderBreakingTicker() {
  const el = document.getElementById('breakingTicker');
  if (!el) return;
  el.innerHTML = BREAKING_NEWS.map(
    (headline) => `<button type="button" class="ticker-item-btn">${escapeHtml(headline)}</button>`
  ).join('');
}

function renderAll() {
  renderCategoryTabs();
  updateBookmarkBadge();

  const isFiltering =
    state.activeCategory !== 'all' || state.selectedCenter !== '' || state.searchQuery.trim() !== '';

  const homeWrapper = document.getElementById('homeSectionsWrapper');
  const filteredSection = document.getElementById('filteredResultsSection');
  const filterBar = document.getElementById('activeFilterBar');

  if (isFiltering) {
    homeWrapper.classList.add('hidden');
    filterBar.classList.remove('hidden');

    const catName = CATEGORIES.find((c) => c.id === state.activeCategory)?.name || '';
    const filterParts = [];
    if (state.activeCategory !== 'all') filterParts.push(`القسم: ${catName}`);
    if (state.selectedCenter) filterParts.push(`مركز: ${state.selectedCenter}`);
    if (state.searchQuery.trim()) filterParts.push(`بحث: "${escapeHtml(state.searchQuery.trim())}"`);

    if (state.activeCategory === 'videos') {
      filteredSection.classList.add('hidden');
      // Show videos section standalone in filtered mode
      homeWrapper.classList.remove('hidden');
      Array.from(homeWrapper.children).forEach((child) => {
        if (child.id !== 'videosSection') child.classList.add('hidden');
        else child.classList.remove('hidden');
      });
      const vids = getFilteredVideos();
      document.getElementById('activeFilterText').textContent = `${filterParts.join(' · ')} (${vids.length} فيديو)`;
      renderVideosGrid(vids);
    } else {
      Array.from(homeWrapper.children).forEach((child) => child.classList.remove('hidden'));
      filteredSection.classList.remove('hidden');
      const matched = getFilteredArticles();
      document.getElementById('activeFilterText').textContent = `${filterParts.join(' · ')} (${matched.length} خبر)`;
      document.getElementById('filteredSectionTitle').textContent =
        state.activeCategory !== 'all'
          ? `أرشيف قسم: ${catName}`
          : state.selectedCenter
          ? `أخبار مركز ${state.selectedCenter}`
          : `نتائج البحث عن: ${state.searchQuery}`;
      renderArticleCards(document.getElementById('filteredArticlesGrid'), matched);
    }
  } else {
    homeWrapper.classList.remove('hidden');
    Array.from(homeWrapper.children).forEach((child) => child.classList.remove('hidden'));
    filteredSection.classList.add('hidden');
    filterBar.classList.add('hidden');

    renderLeadHero();
    renderMinyaSection();
    renderMultiDeptSection();
    renderSolutionsSection();
    renderDataSection();
    renderVideosGrid(getAllVideos());
  }
}

function renderCategoryTabs() {
  const container = document.getElementById('categoryTabs');
  if (!container) return;
  container.innerHTML = CATEGORIES.map(
    (cat) => `
      <button
        type="button"
        class="nav-tab-btn ${state.activeCategory === cat.id && !state.selectedCenter ? 'active' : ''}"
        data-cat="${cat.id}"
      >
        ${cat.name}
      </button>`
  ).join('');
}

function renderLeadHero() {
  const container = document.getElementById('leadHeroGrid');
  if (!container) return;
  const lead = ARTICLES.find((a) => a.isLead) || ARTICLES[0];
  const companions = ARTICLES.filter((a) => a.id !== lead.id).slice(0, 3);

  container.innerHTML = `
    <article class="hero-main-card" data-article-id="${lead.id}">
      <div class="hero-media">
        <img src="${lead.image}" alt="${escapeHtml(lead.title)}" />
      </div>
      <div class="hero-body">
        <div class="meta-line">
          <span class="meta-kicker">${escapeHtml(lead.kicker)}</span>
          <span class="sep">·</span>
          <span>${escapeHtml(lead.location)}</span>
          <span class="sep">·</span>
          <span>${escapeHtml(lead.publishedAt)}</span>
        </div>
        <h2 class="hero-headline">${escapeHtml(lead.title)}</h2>
        <p class="hero-summary">${escapeHtml(lead.summary)}</p>
      </div>
    </article>

    <div class="hero-sidebar">
      ${companions
        .map(
          (art) => `
          <article class="companion-card" data-article-id="${art.id}">
            <div class="meta-line">
              <span class="meta-kicker">${escapeHtml(art.kicker)}</span>
              <span class="sep">·</span>
              <span>${escapeHtml(art.publishedAt)}</span>
            </div>
            <h3 class="companion-title">${escapeHtml(art.title)}</h3>
            <p class="companion-summary">${escapeHtml(art.summary)}</p>
          </article>`
        )
        .join('')}
    </div>
  `;
}

function renderMinyaSection() {
  const pillsEl = document.getElementById('minyaCentersPills');
  const gridEl = document.getElementById('minyaArticlesGrid');
  if (!pillsEl || !gridEl) return;

  const pillChoices = ['الكل', 'المنيا', 'سمالوط', 'ملوي', 'بني مزار', 'مغاغة', 'أبو قرقاص'];
  pillsEl.innerHTML = pillChoices
    .map(
      (name) => `
      <button type="button" class="seg-btn ${state.activeMinyaCenterPill === name ? 'active' : ''}" data-minya-pill="${name}">
        ${name}
      </button>`
    )
    .join('');

  let list = ARTICLES.filter(
    (a) => a.location.includes('المنيا') || a.category === 'minya' || a.category === 'culture'
  );
  if (state.activeMinyaCenterPill !== 'الكل') {
    const sub = list.filter(
      (a) => a.location.includes(state.activeMinyaCenterPill) || a.title.includes(state.activeMinyaCenterPill)
    );
    if (sub.length > 0) list = sub;
  }
  renderArticleCards(gridEl, list.slice(0, 3));
}

function renderMultiDeptSection() {
  const tabsEl = document.getElementById('multiDeptTabs');
  const gridEl = document.getElementById('multiDeptGrid');
  if (!tabsEl || !gridEl) return;

  const depts = [
    { id: 'university', name: 'الجامعات' },
    { id: 'street', name: 'نبض الشارع' },
    { id: 'politics', name: 'السياسة' },
    { id: 'economy', name: 'الاقتصاد' },
    { id: 'sports', name: 'الرياضة' },
    { id: 'accidents', name: 'الحوادث' },
    { id: 'health', name: 'الصحة' },
    { id: 'culture', name: 'الثقافي' }
  ];

  tabsEl.innerHTML = depts
    .map(
      (d) => `
      <button type="button" class="seg-btn ${state.activeMultiDept === d.id ? 'active' : ''}" data-dept-tab="${d.id}">
        ${d.name}
      </button>`
    )
    .join('');

  const deptArticles = ARTICLES.filter((a) => a.category === state.activeMultiDept);
  renderArticleCards(gridEl, deptArticles.length > 0 ? deptArticles : ARTICLES.slice(0, 3));
}

function renderSolutionsSection() {
  const gridEl = document.getElementById('solutionsGrid');
  if (!gridEl) return;
  const items = ARTICLES.filter((a) => a.category === 'solutions');
  gridEl.innerHTML = items
    .map(
      (art) => `
      <article class="solution-card" data-article-id="${art.id}">
        <div class="meta-line">
          <span class="meta-kicker">${escapeHtml(art.location)}</span>
          <span class="sep">·</span>
          <span>بقلم: ${escapeHtml(art.author)}</span>
        </div>
        <h3 class="card-title">${escapeHtml(art.title)}</h3>
        <p class="card-summary">${escapeHtml(art.summary)}</p>
        ${
          art.solutionMeta
            ? `
          <div class="solution-pillars">
            <div><span class="pillar-label problem">المشكلة</span>${escapeHtml(art.solutionMeta.problem)}</div>
            <div><span class="pillar-label response">الحل الميداني</span>${escapeHtml(art.solutionMeta.response)}</div>
            <div><span class="pillar-label impact">الأثر الموثق</span>${escapeHtml(art.solutionMeta.impact)}</div>
            <div><span class="pillar-label limits">التحديات</span>${escapeHtml(art.solutionMeta.limitations)}</div>
          </div>`
            : ''
        }
      </article>`
    )
    .join('');
}

function renderDataSection() {
  const tabsEl = document.getElementById('datasetTabs');
  const chartEl = document.getElementById('dataChartContainer');
  const colEl = document.getElementById('dataArticlesCol');
  if (!tabsEl || !chartEl || !colEl) return;

  tabsEl.innerHTML = DATA_DATASETS.map(
    (ds) => `
      <button type="button" class="seg-btn ${state.activeDatasetId === ds.id ? 'active' : ''}" data-dataset="${ds.id}">
        ${ds.tabLabel}
      </button>`
  ).join('');

  const activeDs = DATA_DATASETS.find((d) => d.id === state.activeDatasetId) || DATA_DATASETS[0];
  const maxVal = Math.max(...activeDs.points.map((p) => p.value), 1);

  chartEl.innerHTML = `
    <div class="chart-header">
      <div>
        <h3 class="chart-title">${escapeHtml(activeDs.title)}</h3>
        <div class="chart-source">المصدر: ${escapeHtml(activeDs.source)}</div>
      </div>
    </div>
    <div class="bars-list">
      ${activeDs.points
        .map((pt) => {
          const pct = Math.round((pt.value / maxVal) * 100);
          return `
            <div>
              <div class="bar-row-top">
                <span>${escapeHtml(pt.label)}</span>
                <span class="tabular-nums">${pt.value}${activeDs.unit}</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${pct}%"></div>
              </div>
            </div>`;
        })
        .join('')}
    </div>
  `;

  const dataArticles = ARTICLES.filter((a) => a.category === 'data');
  colEl.innerHTML = dataArticles
    .map(
      (art) => `
      <article class="article-card" data-article-id="${art.id}">
        <div class="card-body">
          <div class="meta-line">
            <span class="meta-kicker">${escapeHtml(art.kicker)}</span>
            <span class="sep">·</span>
            <span>${escapeHtml(art.publishedAt)}</span>
          </div>
          <h3 class="card-title">${escapeHtml(art.title)}</h3>
          <p class="card-summary">${escapeHtml(art.summary)}</p>
          ${
            art.dataHighlight
              ? `
            <div class="data-stat-highlight">
              <span class="chart-source">${escapeHtml(art.dataHighlight.metricLabel)}</span>
              <strong class="data-big-num tabular-nums">${escapeHtml(art.dataHighlight.metricValue)}</strong>
            </div>`
              : ''
          }
        </div>
      </article>`
    )
    .join('');
}

function getAllVideos() {
  return [...state.customVideos, ...INITIAL_VIDEOS];
}

function getFilteredVideos() {
  const q = state.searchQuery.trim().toLowerCase();
  const list = getAllVideos();
  if (!q) return list;
  return list.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.categoryLabel.toLowerCase().includes(q)
  );
}

function renderVideosGrid(videos) {
  const gridEl = document.getElementById('videosGrid');
  if (!gridEl) return;

  if (videos.length === 0) {
    gridEl.innerHTML = `<p style="grid-column: 1 / -1; color: #a8a29e;">لا توجد فيديوهات تطابق بحثك حالياً.</p>`;
    return;
  }

  gridEl.innerHTML = videos
    .map(
      (vid) => `
      <article class="video-card" data-video-id="${vid.id}">
        <div>
          <div class="video-thumb">
            <img src="${vid.thumbnailUrl}" alt="${escapeHtml(vid.title)}" />
            <div class="video-play-badge">▶ تشغيل الفيديو</div>
            <span class="video-duration tabular-nums">${escapeHtml(vid.duration)}</span>
          </div>
          <div class="video-body">
            <span class="video-cat">${escapeHtml(vid.categoryLabel)}</span>
            <h3 class="video-title">${escapeHtml(vid.title)}</h3>
          </div>
        </div>
        <div class="video-meta">
          <span>${escapeHtml(vid.reporter)}</span>
          ${
            vid.isUserAdded
              ? `<button type="button" class="video-delete-mini" data-delete-video="${vid.id}">حذف</button>`
              : `<span>${escapeHtml(vid.publishedAt)}</span>`
          }
        </div>
      </article>`
    )
    .join('');
}

function renderArticleCards(container, list) {
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = `<p>لا توجد أخبار تطابق التصفية الحالية.</p>`;
    return;
  }
  container.innerHTML = list
    .map(
      (art) => `
      <article class="article-card" data-article-id="${art.id}">
        <div>
          <div class="card-media">
            <img src="${art.image}" alt="${escapeHtml(art.title)}" />
          </div>
          <div class="card-body">
            <div class="meta-line">
              <span class="meta-kicker">${escapeHtml(art.kicker)}</span>
              <span class="sep">·</span>
              <span>${escapeHtml(art.location)}</span>
              <span class="sep">·</span>
              <span>${escapeHtml(art.publishedAt)}</span>
            </div>
            <h3 class="card-title">${escapeHtml(art.title)}</h3>
            <p class="card-summary">${escapeHtml(art.summary)}</p>
          </div>
        </div>
        <div class="card-footer">
          <span>بقلم: ${escapeHtml(art.author)}</span>
          <span class="read-more-hint">اقرأ التقرير ←</span>
        </div>
      </article>`
    )
    .join('');
}

function getFilteredArticles() {
  const q = state.searchQuery.trim().toLowerCase();
  return ARTICLES.filter((art) => {
    if (state.activeCategory !== 'all' && art.category !== state.activeCategory) return false;
    if (
      state.selectedCenter &&
      !art.location.includes(state.selectedCenter) &&
      !art.title.includes(state.selectedCenter) &&
      art.category !== 'minya'
    ) {
      return false;
    }
    if (q) {
      const hay = `${art.title} ${art.summary} ${art.location} ${art.content.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/* ------------------ الأحداث والنوافذ ------------------ */
function bindEvents() {
  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    saveStorage('merqab_standalone_theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    updateThemeButtonLabel();
  });

  document.getElementById('brandHomeLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    resetFilters();
  });

  document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFilters);

  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderAll();
  });

  document.getElementById('centerSelect')?.addEventListener('change', (e) => {
    state.selectedCenter = e.target.value;
    if (state.selectedCenter) state.activeCategory = 'all';
    renderAll();
  });

  document.addEventListener('click', (e) => {
    const target = e.target;

    const catBtn = target.closest('[data-cat]');
    if (catBtn) {
      state.activeCategory = catBtn.dataset.cat;
      state.selectedCenter = '';
      document.getElementById('centerSelect').value = '';
      renderAll();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const pillBtn = target.closest('[data-minya-pill]');
    if (pillBtn) {
      state.activeMinyaCenterPill = pillBtn.dataset.minyaPill;
      renderMinyaSection();
      return;
    }

    const deptBtn = target.closest('[data-dept-tab]');
    if (deptBtn) {
      state.activeMultiDept = deptBtn.dataset.deptTab;
      renderMultiDeptSection();
      return;
    }

    const dsBtn = target.closest('[data-dataset]');
    if (dsBtn) {
      state.activeDatasetId = dsBtn.dataset.dataset;
      renderDataSection();
      return;
    }

    const delVidBtn = target.closest('[data-delete-video]');
    if (delVidBtn) {
      e.stopPropagation();
      deleteVideo(delVidBtn.dataset.deleteVideo);
      return;
    }

    const vidCard = target.closest('[data-video-id]');
    if (vidCard) {
      openVideoPlayer(vidCard.dataset.videoId);
      return;
    }

    const artCard = target.closest('[data-article-id]');
    if (artCard) {
      openArticleModal(artCard.dataset.articleId);
      return;
    }

    const tickerBtn = target.closest('.ticker-item-btn');
    if (tickerBtn) {
      openArticleModal(ARTICLES[0].id);
      return;
    }

    const shareBtn = target.closest('[data-share]');
    if (shareBtn) {
      handleArticleShare(shareBtn.dataset.share);
      return;
    }
  });

  // Article Modal controls
  document.getElementById('closeArticleModalBtn')?.addEventListener('click', () => {
    document.getElementById('articleModal').classList.add('hidden');
  });
  document.getElementById('fontPlusBtn')?.addEventListener('click', () => {
    state.articleFontSize = Math.min(22, state.articleFontSize + 2);
    applyArticleFontSize();
  });
  document.getElementById('fontMinusBtn')?.addEventListener('click', () => {
    state.articleFontSize = Math.max(14, state.articleFontSize - 2);
    applyArticleFontSize();
  });
  document.getElementById('modalBookmarkBtn')?.addEventListener('click', () => {
    if (!state.currentArticleId) return;
    toggleBookmark(state.currentArticleId);
    updateModalBookmarkText();
  });

  // Video Player Modal controls
  document.getElementById('closePlayerModalBtn')?.addEventListener('click', closeVideoPlayer);
  document.getElementById('deleteVideoBtn')?.addEventListener('click', (e) => {
    const id = e.currentTarget.dataset.videoId;
    if (id) {
      deleteVideo(id);
      closeVideoPlayer();
    }
  });

  // Add Video Modal controls
  document.getElementById('openAddVideoBtn')?.addEventListener('click', () => {
    document.getElementById('addVideoError').classList.add('hidden');
    document.getElementById('addVideoModal').classList.remove('hidden');
  });
  document.getElementById('closeAddVideoBtn')?.addEventListener('click', closeAddVideoModal);
  document.getElementById('cancelAddVideoBtn')?.addEventListener('click', closeAddVideoModal);

  document.getElementById('modeUrlBtn')?.addEventListener('click', () => switchVideoMode('url'));
  document.getElementById('modeFileBtn')?.addEventListener('click', () => switchVideoMode('file'));

  document.getElementById('videoFileInput')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (state.selectedFileUrl) URL.revokeObjectURL(state.selectedFileUrl);
    state.selectedFileUrl = URL.createObjectURL(file);
    state.selectedFileName = file.name;
    const titleInput = document.getElementById('videoTitleInput');
    if (titleInput && !titleInput.value.trim()) {
      titleInput.value = file.name.replace(/\.[^/.]+$/, '');
    }
  });

  document.getElementById('addVideoForm')?.addEventListener('submit', handleAddVideoSubmit);

  // Bookmarks Modal controls
  document.getElementById('bookmarksToggleBtn')?.addEventListener('click', openBookmarksModal);
  document.getElementById('closeBookmarksBtn')?.addEventListener('click', () => {
    document.getElementById('bookmarksModal').classList.add('hidden');
  });

  // Backdrop click close
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        if (backdrop.id === 'videoPlayerModal') closeVideoPlayer();
        else backdrop.classList.add('hidden');
      }
    });
  });
}

function resetFilters() {
  state.activeCategory = 'all';
  state.selectedCenter = '';
  state.searchQuery = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('centerSelect').value = '';
  renderAll();
}

function openArticleModal(articleId) {
  const art = ARTICLES.find((a) => a.id === articleId);
  if (!art) return;
  state.currentArticleId = art.id;

  document.getElementById('modalArticleKicker').textContent = art.kicker;
  document.getElementById('modalArticleTitle').textContent = art.title;
  document.getElementById('modalArticleMeta').textContent = `بقلم: ${art.author} · ${art.location} · ${art.publishedAt}`;
  document.getElementById('modalArticleSummary').textContent = art.summary;

  const figEl = document.getElementById('modalArticleFigure');
  figEl.innerHTML = art.image
    ? `<img src="${art.image}" alt="${escapeHtml(art.title)}" />${
        art.imageCaption ? `<figcaption>${escapeHtml(art.imageCaption)}</figcaption>` : ''
      }`
    : '';

  const contentEl = document.getElementById('modalArticleContent');
  contentEl.innerHTML = art.content.map((p) => `<p>${escapeHtml(p)}</p>`).join('');
  applyArticleFontSize();

  const specialEl = document.getElementById('modalSpecialMeta');
  if (art.solutionMeta) {
    specialEl.innerHTML = `
      <div class="solution-pillars" style="margin-bottom: 16px;">
        <div><span class="pillar-label problem">المشكلة المرصودة</span>${escapeHtml(art.solutionMeta.problem)}</div>
        <div><span class="pillar-label response">الحل الميداني</span>${escapeHtml(art.solutionMeta.response)}</div>
        <div><span class="pillar-label impact">الأثر الموثق</span>${escapeHtml(art.solutionMeta.impact)}</div>
        <div><span class="pillar-label limits">التحديات</span>${escapeHtml(art.solutionMeta.limitations)}</div>
      </div>`;
  } else if (art.dataHighlight) {
    specialEl.innerHTML = `
      <div class="data-stat-highlight" style="margin-bottom: 16px;">
        <div>
          <strong>${escapeHtml(art.dataHighlight.metricLabel)}</strong>
          <div class="chart-source">المصدر: ${escapeHtml(art.dataHighlight.source)}</div>
        </div>
        <strong class="data-big-num tabular-nums">${escapeHtml(art.dataHighlight.metricValue)}</strong>
      </div>`;
  } else {
    specialEl.innerHTML = '';
  }

  updateModalBookmarkText();
  document.getElementById('copyShareBtn').textContent = 'نسخ الرابط';
  document.getElementById('articleModal').classList.remove('hidden');
}

function applyArticleFontSize() {
  const prose = document.getElementById('modalArticleContent');
  if (prose) prose.style.fontSize = `${state.articleFontSize}px`;
}

function handleArticleShare(platform) {
  const art = ARTICLES.find((a) => a.id === state.currentArticleId);
  if (!art) return;
  const pageUrl = window.location.href;
  const shareText = `${art.title} - عبر صحيفة مرقاب الإلكترونية`;

  if (platform === 'copy') {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${pageUrl}`).catch(() => {});
    }
    const btn = document.getElementById('copyShareBtn');
    if (btn) btn.textContent = 'تم النسخ';
    return;
  }

  const urls = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${pageUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(art.title)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`
  };

  if (urls[platform]) {
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  }
}

/* ------------------ المحفوظات ------------------ */
function toggleBookmark(articleId) {
  if (state.bookmarks.includes(articleId)) {
    state.bookmarks = state.bookmarks.filter((id) => id !== articleId);
  } else {
    state.bookmarks = [articleId, ...state.bookmarks];
  }
  saveStorage('merqab_standalone_bookmarks', state.bookmarks);
  updateBookmarkBadge();
}

function updateBookmarkBadge() {
  const el = document.getElementById('bookmarksCount');
  if (el) el.textContent = String(state.bookmarks.length);
}

function updateModalBookmarkText() {
  const btn = document.getElementById('modalBookmarkBtn');
  if (!btn || !state.currentArticleId) return;
  btn.textContent = state.bookmarks.includes(state.currentArticleId) ? 'تم الحفظ' : 'حفظ الخبر';
}

function openBookmarksModal() {
  const listEl = document.getElementById('bookmarksList');
  const saved = ARTICLES.filter((a) => state.bookmarks.includes(a.id));
  if (saved.length === 0) {
    listEl.innerHTML = `<p>لا توجد أخبار محفوظة حالياً.</p>`;
  } else {
    listEl.innerHTML = saved
      .map(
        (art) => `
        <div class="bookmark-row">
          <div class="bookmark-row-title" data-article-id="${art.id}">${escapeHtml(art.title)}</div>
          <button type="button" class="secondary-btn" data-remove-bm="${art.id}">إزالة</button>
        </div>`
      )
      .join('');

    listEl.querySelectorAll('[data-remove-bm]').forEach((btn) => {
      btn.addEventListener('click', () => {
        toggleBookmark(btn.dataset.removeBm);
        openBookmarksModal();
      });
    });
  }
  document.getElementById('bookmarksModal').classList.remove('hidden');
}

/* ------------------ الفيديو وإضافة فيديوهات جديدة ------------------ */
function extractYouTubeId(url) {
  const match = url
    .trim()
    .match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function switchVideoMode(mode) {
  state.videoMode = mode;
  document.getElementById('modeUrlBtn').classList.toggle('active', mode === 'url');
  document.getElementById('modeFileBtn').classList.toggle('active', mode === 'file');
  document.getElementById('urlInputGroup').classList.toggle('hidden', mode !== 'url');
  document.getElementById('fileInputGroup').classList.toggle('hidden', mode !== 'file');
}

function closeAddVideoModal() {
  document.getElementById('addVideoModal').classList.add('hidden');
}

function handleAddVideoSubmit(e) {
  e.preventDefault();
  const errEl = document.getElementById('addVideoError');
  errEl.classList.add('hidden');

  const title = document.getElementById('videoTitleInput').value.trim();
  const categoryLabel = document.getElementById('videoCatInput').value;
  const duration = document.getElementById('videoDurationInput').value.trim() || '03:00';
  const reporter = document.getElementById('videoReporterInput').value.trim() || 'فريق مرقاب';
  const description = document.getElementById('videoDescInput').value.trim() || title;

  if (!title) {
    errEl.textContent = 'يرجى كتابة عنوان الفيديو.';
    errEl.classList.remove('hidden');
    return;
  }

  let newVideo = null;

  if (state.videoMode === 'url') {
    const rawUrl = document.getElementById('videoUrlInput').value.trim();
    if (!rawUrl) {
      errEl.textContent = 'يرجى إدخال رابط يوتيوب أو رابط فيديو مباشر.';
      errEl.classList.remove('hidden');
      return;
    }
    const ytId = extractYouTubeId(rawUrl);
    newVideo = {
      id: `vid-user-${Date.now()}`,
      title,
      categoryLabel,
      duration,
      reporter,
      publishedAt: 'الآن',
      thumbnailUrl: ytId
        ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
        : './images/merqab_hero_lead_1794431697836.jpg',
      sourceType: ytId ? 'youtube' : 'mp4',
      videoUrl: ytId ? `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1` : rawUrl,
      description,
      isUserAdded: true
    };
  } else {
    if (!state.selectedFileUrl) {
      errEl.textContent = 'يرجى اختيار ملف فيديو من الجهاز أولاً.';
      errEl.classList.remove('hidden');
      return;
    }
    newVideo = {
      id: `vid-local-${Date.now()}`,
      title,
      categoryLabel,
      duration,
      reporter,
      publishedAt: 'الآن',
      thumbnailUrl: './images/merqab_university_1794431700257.jpg',
      sourceType: 'local',
      videoUrl: state.selectedFileUrl,
      description,
      isUserAdded: true
    };
  }

  state.customVideos = [newVideo, ...state.customVideos];
  saveStorage(
    'merqab_standalone_videos',
    state.customVideos.filter((v) => v.sourceType !== 'local')
  );

  e.target.reset();
  state.selectedFileUrl = '';
  state.selectedFileName = '';
  closeAddVideoModal();
  renderAll();
  openVideoPlayer(newVideo.id);
}

function openVideoPlayer(videoId) {
  const vid = getAllVideos().find((v) => v.id === videoId);
  if (!vid) return;

  document.getElementById('playerVideoCategory').textContent = `${vid.categoryLabel} · ${vid.publishedAt}`;
  document.getElementById('playerVideoTitle').textContent = vid.title;
  document.getElementById('playerVideoDesc').textContent = vid.description;
  document.getElementById('playerVideoMeta').textContent = `إعداد: ${vid.reporter} · المدة: ${vid.duration}`;

  const delBtn = document.getElementById('deleteVideoBtn');
  if (vid.isUserAdded) {
    delBtn.classList.remove('hidden');
    delBtn.dataset.videoId = vid.id;
  } else {
    delBtn.classList.add('hidden');
    delBtn.dataset.videoId = '';
  }

  const stage = document.getElementById('videoPlayerContainer');
  if (vid.sourceType === 'youtube') {
    stage.innerHTML = `<iframe src="${vid.videoUrl}" title="${escapeHtml(vid.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    stage.innerHTML = `<video src="${vid.videoUrl}" poster="${vid.thumbnailUrl}" controls autoplay playsinline></video>`;
  }

  document.getElementById('videoPlayerModal').classList.remove('hidden');
}

function closeVideoPlayer() {
  document.getElementById('videoPlayerContainer').innerHTML = '';
  document.getElementById('videoPlayerModal').classList.add('hidden');
}

function deleteVideo(videoId) {
  const target = state.customVideos.find((v) => v.id === videoId);
  if (target && target.sourceType === 'local' && String(target.videoUrl).startsWith('blob:')) {
    URL.revokeObjectURL(target.videoUrl);
  }
  state.customVideos = state.customVideos.filter((v) => v.id !== videoId);
  saveStorage(
    'merqab_standalone_videos',
    state.customVideos.filter((v) => v.sourceType !== 'local')
  );
  renderAll();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
