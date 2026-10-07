export const LOCALES = ["tr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export type Dictionary = {
  readonly languageName: string;
  readonly metadata: { readonly title: string; readonly description: string };
  readonly nav: {
    readonly home: string;
    readonly products: string;
    readonly customPrint: string;
    readonly about: string;
    readonly faq: string;
    readonly guide: string;
    readonly contact: string;
    readonly startRequest: string;
    readonly primary: string;
    readonly mobile: string;
    readonly close: string;
    readonly switchTo: string;
  };
  readonly footer: {
    readonly description: string;
    readonly explore: string;
    readonly contact: string;
    readonly contactOptions: string;
    readonly tagline: string;
  };
  readonly home: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly explore: string;
    readonly customCta: string;
    readonly catalogEyebrow: string;
    readonly featuredTitle: string;
    readonly featuredIntro: string;
    readonly viewAll: string;
    readonly noProducts: string;
    readonly categoriesEyebrow: string;
    readonly categoriesTitle: string;
    readonly categoriesIntro: string;
    readonly processEyebrow: string;
    readonly processTitle: string;
    readonly process: readonly {
      readonly title: string;
      readonly text: string;
    }[];
    readonly customEyebrow: string;
    readonly customTitle: string;
    readonly customText: string;
    readonly customStart: string;
    readonly customPaths: readonly {
      readonly title: string;
      readonly text: string;
      readonly action: string;
    }[];
    readonly guideEyebrow: string;
    readonly guideTitle: string;
    readonly guideText: string;
    readonly guideAction: string;
    readonly whyEyebrow: string;
    readonly whyTitle: string;
    readonly whyIntro: string;
    readonly benefits: readonly {
      readonly title: string;
      readonly text: string;
    }[];
    readonly finalEyebrow: string;
    readonly finalTitle: string;
    readonly finalText: string;
    readonly contact: string;
  };
  readonly guide: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly sections: readonly {
      readonly title: string;
      readonly topics: readonly {
        readonly title: string;
        readonly text: string;
        readonly points: readonly string[];
      }[];
    }[];
  };
  readonly catalog: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly loading: string;
    readonly search: string;
    readonly category: string;
    readonly all: string;
    readonly product: string;
    readonly products: string;
    readonly clear: string;
    readonly noMatch: string;
    readonly noMatchText: string;
    readonly reset: string;
  };
  readonly product: {
    readonly view: string;
    readonly details: string;
    readonly customizable: string;
    readonly availableColors: string;
    readonly askWhatsapp: string;
    readonly askAbout: string;
    readonly price: string;
    readonly category: string;
    readonly material: string;
    readonly dimensions: string;
    readonly printTime: string;
    readonly customAvailable: string;
    readonly standardDesign: string;
    readonly model: string;
    readonly modelAvailable: string;
    readonly comingSoon: string;
    readonly gallery: string;
    readonly photos: string;
    readonly image: string;
    readonly showImage: string;
    readonly overview: string;
    readonly aboutProduct: string;
    readonly specifications: string;
    readonly productDetails: string;
    readonly related: string;
    readonly back: string;
    readonly invalidTitle: string;
    readonly invalidText: string;
    readonly available: string;
    readonly quote: string;
  };
  readonly viewer: {
    readonly previewLabel: string;
    readonly comingSoon: string;
    readonly noModel: string;
    readonly preparing: string;
    readonly autoRotate: string;
    readonly pauseRotate: string;
    readonly startRotate: string;
    readonly reset: string;
    readonly instructions: string;
    readonly loading: string;
    readonly loadError: string;
    readonly tryAgain: string;
    readonly webglError: string;
    readonly contextError: string;
    readonly color: string;
  };
  readonly custom: {
    readonly title: string;
    readonly intro: string;
    readonly processEyebrow: string;
    readonly process: readonly {
      readonly title: string;
      readonly text: string;
    }[];
    readonly formTitle: string;
    readonly required: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly optional: string;
    readonly quantity: string;
    readonly color: string;
    readonly colorPlaceholder: string;
    readonly material: string;
    readonly chooseMaterial: string;
    readonly dimensions: string;
    readonly dimensionsPlaceholder: string;
    readonly description: string;
    readonly descriptionPlaceholder: string;
    readonly file: string;
    readonly attach: string;
    readonly chooseFile: string;
    readonly removeFile: string;
    readonly accepted: string;
    readonly submit: string;
    readonly preparing: string;
    readonly demoComplete: string;
    readonly successTitle: string;
    readonly successText: string;
    readonly another: string;
    readonly errors: {
      readonly name: string;
      readonly email: string;
      readonly validEmail: string;
      readonly description: string;
      readonly quantity: string;
      readonly material: string;
      readonly file: string;
    };
  };
  readonly about: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly focusEyebrow: string;
    readonly focusTitle: string;
    readonly cards: readonly {
      readonly title: string;
      readonly text: string;
    }[];
    readonly startEyebrow: string;
    readonly startTitle: string;
  };
  readonly faq: {
    readonly title: string;
    readonly intro: string;
    readonly eyebrow: string;
    readonly items: readonly {
      readonly question: string;
      readonly answer: string;
    }[];
    readonly ctaTitle: string;
    readonly ctaText: string;
    readonly cta: string;
  };
  readonly contact: {
    readonly title: string;
    readonly intro: string;
    readonly eyebrow: string;
    readonly available: string;
    readonly customRequest: string;
    readonly customText: string;
    readonly request: string;
    readonly noConfig: string;
  };
  readonly inquiry: {
    readonly greeting: string;
    readonly interestLine: string;
    readonly colorLabel: string;
    readonly materialLabel: string;
    readonly productLabel: string;
  };
  readonly categories: Readonly<Record<string, string>>;
  readonly materials: Readonly<Record<string, string>>;
};

const english: Dictionary = {
  languageName: "English",
  metadata: {
    title: "3D Print Catalog",
    description: "Explore 3D printed products and request a custom print.",
  },
  nav: {
    home: "Home",
    products: "Products",
    customPrint: "Custom Print",
    about: "About",
    faq: "FAQ",
    guide: "Guide",
    contact: "Contact",
    startRequest: "Start a request",
    primary: "Primary navigation",
    mobile: "Mobile navigation",
    close: "Close navigation",
    switchTo: "Switch to",
  },
  footer: {
    description:
      "Explore 3D printed products or start a custom print request for a model or idea of your own.",
    explore: "Explore",
    contact: "Contact",
    contactOptions: "Contact options",
    tagline: "3D printed products and custom print requests.",
  },
  home: {
    eyebrow: "Made for the physical world",
    title: "Turn ideas into products you can hold.",
    intro:
      "Discover thoughtfully made 3D printed products, or bring your own model and idea to life with a custom print.",
    explore: "Explore products",
    customCta: "Request a custom print",
    catalogEyebrow: "Catalog",
    featuredTitle: "Featured products",
    featuredIntro:
      "A small selection of ready-to-print pieces for everyday use, play, and display.",
    viewAll: "View all products",
    noProducts: "Products will appear here as they are added to the catalog.",
    categoriesEyebrow: "Browse by type",
    categoriesTitle: "Find a starting point",
    categoriesIntro:
      "Explore the catalog by category, then choose the size, color, and finish that suit your project.",
    processEyebrow: "A simple process",
    processTitle: "From choice to finished print.",
    process: [
      {
        title: "Choose a product or send your idea",
        text: "Start with a catalog item, a model you already have, or a concept you would like to make.",
      },
      {
        title: "Customize",
        text: "Select the options that matter for your piece, from material and color to the details of your request.",
      },
      {
        title: "Get it printed",
        text: "Your selection is prepared for printing and turned into a physical product.",
      },
    ],
    customEyebrow: "Custom printing",
    customTitle: "Have a model or an idea of your own?",
    customText:
      "Send a ready-made 3D model or describe what you want to create. A custom request gives you a clear place to start the conversation.",
    customStart: "Start a custom request",
    customPaths: [
      {
        title: "My model is ready",
        text: "Share an STL, 3MF, OBJ, or STEP file and the details that matter for your print.",
        action: "Send my model",
      },
      {
        title: "I only have an idea",
        text: "Describe what you want to make, how it will be used, and any dimensions you already know.",
        action: "Describe my idea",
      },
    ],
    guideEyebrow: "Printing guide",
    guideTitle: "Make clearer choices before you request a print.",
    guideText:
      "A practical introduction to materials, files, quality, and preparing an order.",
    guideAction: "Read the guide",
    whyEyebrow: "Why 3D printing",
    whyTitle: "A practical way to make more specific things",
    whyIntro:
      "3D printing is useful when the form, quantity, or personal details of an object matter.",
    benefits: [
      {
        title: "Customization",
        text: "Adjust a design to fit a preference, a space, or a particular use.",
      },
      {
        title: "Rapid production",
        text: "Move from a prepared digital model to a printed object without traditional tooling.",
      },
      {
        title: "Low-volume making",
        text: "Produce a small number of specific pieces when a large production run is not needed.",
      },
    ],
    finalEyebrow: "Ready when you are",
    finalTitle: "Find a product or start with your own idea.",
    finalText:
      "Browse the catalog, request a custom print, or get in touch with a question.",
    contact: "Contact",
  },
  guide: {
    eyebrow: "3D printing guide",
    title: "The essentials for planning a 3D print.",
    intro:
      "Use these short notes to understand common materials, file formats, print quality, and the details that help prepare a useful request.",
    sections: [
      {
        title: "Basics",
        topics: [
          {
            title: "What is 3D printing?",
            text: "A digital model is built layer by layer into a physical object.",
            points: [
              "It starts with a 3D model.",
              "Material is added in thin layers.",
              "Shape, material, and settings affect the result.",
            ],
          },
          {
            title: "What are STL and 3MF files?",
            text: "Both formats describe a printable 3D model, with different levels of project detail.",
            points: [
              "STL is a widely used mesh format.",
              "3MF can include more print settings and metadata.",
              "OBJ and STEP are also useful for some projects.",
            ],
          },
          {
            title: "What affects the price of a 3D print?",
            text: "The amount of material, print time, complexity, and requested quantity all contribute.",
            points: [
              "Larger parts generally use more material.",
              "Fine details can increase print time.",
              "Material and finishing choices can change the estimate.",
            ],
          },
        ],
      },
      {
        title: "Materials and use",
        topics: [
          {
            title: "PLA, PETG, and TPU: what is the difference?",
            text: "These common materials suit different needs for appearance, durability, and flexibility.",
            points: [
              "PLA is common for display pieces and general use.",
              "PETG is often considered when added durability is useful.",
              "TPU is flexible and suited to parts that need to bend.",
            ],
          },
          {
            title: "Should I choose a functional or decorative print?",
            text: "How a piece will be used helps determine its material and the detail that matters most.",
            points: [
              "Decorative pieces prioritize appearance.",
              "Functional parts should account for fit and everyday use.",
              "Share the intended use with the request.",
            ],
          },
          {
            title: "Which material should I choose?",
            text: "The right material depends on the object, its environment, and what it needs to do.",
            points: [
              "Describe heat, movement, or outdoor exposure if relevant.",
              "Mention whether a part must flex or carry weight.",
              "A material preference can be discussed before printing.",
            ],
          },
        ],
      },
      {
        title: "Quality and preparation",
        topics: [
          {
            title: "Layer height and surface quality",
            text: "Thinner layers can show smoother curves, while thicker layers can shorten print time.",
            points: [
              "Layer lines are a normal part of many 3D prints.",
              "Curved surfaces can benefit from finer layers.",
              "The intended use helps balance finish and production time.",
            ],
          },
          {
            title: "How do I prepare a model for printing?",
            text: "A little project context helps identify practical issues before a print is planned.",
            points: [
              "Include the file and its intended dimensions.",
              "Point out areas where fit or strength matters.",
              "Add reference images or notes for any important details.",
            ],
          },
        ],
      },
    ],
  },
  catalog: {
    eyebrow: "Catalog",
    title: "Products",
    intro:
      "Explore printed models, functional parts, and customizable designs.",
    loading: "Preparing product filters…",
    search: "Search products",
    category: "Product category",
    all: "All",
    product: "product",
    products: "products",
    clear: "Clear filters",
    noMatch: "No products match your current filters.",
    noMatchText: "Try another search term or clear the selected category.",
    reset: "Reset filters",
  },
  product: {
    view: "View product",
    details: "View details for",
    customizable: "Customizable",
    availableColors: "Available colors",
    askWhatsapp: "Message on WhatsApp",
    askAbout: "Ask about this product",
    price: "Price",
    category: "Category",
    material: "Material",
    dimensions: "Dimensions",
    printTime: "Estimated print time",
    customAvailable: "Available",
    standardDesign: "Standard design",
    model: "3D model",
    modelAvailable: "Available",
    comingSoon: "Coming soon",
    gallery: "Gallery",
    photos: "Product photos",
    image: "image",
    showImage: "Show image",
    overview: "Overview",
    aboutProduct: "About this product",
    specifications: "Specifications",
    productDetails: "Product details",
    related: "You may also like",
    back: "Products",
    invalidTitle: "Product not found",
    invalidText:
      "This product may be unavailable or the link may be incorrect.",
    available: "Available",
    quote: "Request a quote",
  },
  viewer: {
    previewLabel: "Product 3D preview",
    comingSoon: "3D preview coming soon",
    noModel: "This product does not have an interactive model available yet.",
    preparing: "Preparing 3D viewer…",
    autoRotate: "Auto rotate",
    pauseRotate: "Pause automatic rotation",
    startRotate: "Start automatic rotation",
    reset: "Reset view",
    instructions: "Drag to rotate · Scroll or pinch to zoom",
    loading: "Loading 3D model…",
    loadError: "The model file could not be loaded.",
    tryAgain: "Try again",
    webglError: "Check browser WebGL support and try again.",
    contextError:
      "The 3D preview was interrupted. Restart the viewer to continue.",
    color: "Model color",
  },
  custom: {
    title: "Request a custom print",
    intro:
      "Send your own model or describe an idea. We can review the requirements and confirm printing details with you.",
    processEyebrow: "How it works",
    process: [
      {
        title: "Send your model or idea",
        text: "Share a file or explain what you would like to make.",
      },
      {
        title: "Requirements are reviewed",
        text: "The model, material, quantity, and dimensions are considered.",
      },
      {
        title: "Printing details are confirmed",
        text: "The practical details are discussed before printing.",
      },
    ],
    formTitle: "Tell us about your project",
    required: "Fields marked with an asterisk are required for this demo.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    optional: "Optional",
    quantity: "Quantity",
    color: "Preferred color",
    colorPlaceholder: "For example, matte black",
    material: "Preferred material",
    chooseMaterial: "Choose a material",
    dimensions: "Approximate dimensions",
    dimensionsPlaceholder: "For example, 120 × 80 × 40 mm",
    description: "Project description",
    descriptionPlaceholder:
      "What would you like to print? Include its purpose, important measurements, and the details that matter.",
    file: "Model file",
    attach: "Attach a model file",
    chooseFile: "Choose file",
    removeFile: "Remove selected file",
    accepted: "Supported formats: STL, 3MF, OBJ, STEP.",
    submit: "Preview request",
    preparing: "Preparing demo…",
    demoComplete: "Demo complete",
    successTitle: "Your request is ready for review.",
    successText:
      "This is a preview of the request flow. No project details or files have been sent or stored yet.",
    another: "Start another demo request",
    errors: {
      name: "Enter your name.",
      email: "Enter your email address.",
      validEmail: "Enter a valid email address.",
      description: "Describe your project in at least 10 characters.",
      quantity: "Enter a quantity of at least 1.",
      material: "Choose a preferred material.",
      file: "Choose an STL, 3MF, OBJ, or STEP file.",
    },
  },
  about: {
    eyebrow: "About 3D printing",
    title: "Digital ideas, made physical.",
    intro:
      "This catalog is a place to explore 3D printed products and begin a custom production request. It brings together hobby pieces, practical objects, prototypes, and parts designed for a specific use.",
    focusEyebrow: "What it is for",
    focusTitle: "A flexible way to make specific things.",
    cards: [
      {
        title: "Products for everyday use",
        text: "Browse objects for play, display, organization, and other practical needs.",
      },
      {
        title: "Custom production and prototyping",
        text: "Start from an existing model or an early idea when a standard product is not the right fit.",
      },
      {
        title: "Functional parts",
        text: "Explore parts, accessories, and small objects made for a particular space, task, or project.",
      },
    ],
    startEyebrow: "Start here",
    startTitle: "Find a product or make something of your own.",
  },
  faq: {
    title: "Frequently Asked Questions",
    intro:
      "Answers to common questions about custom 3D printing, materials, models, colors, and production details.",
    eyebrow: "Questions and answers",
    items: [
      {
        question: "What materials can be printed?",
        answer:
          "Material options depend on the project and its intended use. The custom print request form lists the currently available preferences, and the final choice can be discussed before printing.",
      },
      {
        question: "Can I choose a custom color?",
        answer:
          "You can share a preferred color in your request. Color availability and the best material for the project can be confirmed as part of the print details.",
      },
      {
        question: "Can I send my own STL file?",
        answer:
          "Yes. You can attach an STL file to a custom print request, along with any details that help explain how you want the finished piece to be used.",
      },
      {
        question: "How long does printing take?",
        answer:
          "Print time depends on the model's size, shape, material, quantity, and selected settings. A more specific timeline can be discussed after the project is reviewed.",
      },
      {
        question: "Can you create custom designs?",
        answer:
          "You can describe a new idea in a custom print request. Whether a design can be prepared depends on the requirements and details of the project.",
      },
      {
        question: "What file formats are accepted?",
        answer: "The request form accepts STL, 3MF, OBJ, and STEP files.",
      },
      {
        question: "What sizes can be printed?",
        answer:
          "Printable size depends on the model and available setup. Share approximate dimensions so the requirements can be reviewed.",
      },
      {
        question: "Will the physical color exactly match the screen?",
        answer:
          "Screens and materials can show colors differently. A displayed color is a guide, and the final result may vary slightly.",
      },
    ],
    ctaTitle: "Have another question?",
    ctaText: "Send the details of your model or idea and start a conversation.",
    cta: "Start a custom request",
  },
  contact: {
    title: "Contact",
    intro:
      "Choose the channel that suits your question. For a model or idea, the custom print request is the best place to start.",
    eyebrow: "Get in touch",
    available: "Available contact options",
    customRequest: "Custom Print Request",
    customText:
      "Share a model or idea and include the details needed for a useful review.",
    request: "Start a request",
    noConfig:
      "Contact details are not configured for this friend test. The custom print form is a preview and does not send a request yet.",
  },
  inquiry: {
    greeting: "Hello,",
    interestLine: "I'm interested in the {productName}.",
    colorLabel: "Color",
    materialLabel: "Material",
    productLabel: "Product",
  },
  categories: {
    Toys: "Toys",
    Fidget: "Fidget",
    Decoration: "Decoration",
    Functional: "Functional",
    Custom: "Custom",
    Other: "Other",
  },
  materials: {
    PLA: "PLA",
    PETG: "PETG",
    TPU: "TPU",
    ABS: "ABS",
    ASA: "ASA",
    Resin: "Resin",
    Other: "Other",
  },
};

const turkish: Dictionary = {
  ...english,
  languageName: "Türkçe",
  metadata: {
    title: "3D Baskı Kataloğu",
    description: "3D baskı ürünlerini keşfedin ve özel baskı talebi oluşturun.",
  },
  nav: {
    home: "Ana sayfa",
    products: "Ürünler",
    customPrint: "Özel Baskı",
    about: "Hakkında",
    faq: "SSS",
    guide: "Rehber",
    contact: "İletişim",
    startRequest: "Talep oluştur",
    primary: "Ana navigasyon",
    mobile: "Mobil navigasyon",
    close: "Navigasyonu kapat",
    switchTo: "Dile geçiş yap",
  },
  footer: {
    description:
      "3D baskı ürünlerini keşfedin veya kendi modeliniz ya da fikriniz için özel baskı talebi oluşturun.",
    explore: "Keşfet",
    contact: "İletişim",
    contactOptions: "İletişim seçenekleri",
    tagline: "3D baskı ürünleri ve özel baskı talepleri.",
  },
  home: {
    ...english.home,
    eyebrow: "Fiziksel dünya için üretildi",
    title: "Fikirleri elinizde tutabileceğiniz ürünlere dönüştürün.",
    intro:
      "Özenle hazırlanan 3D baskı ürünlerini keşfedin veya kendi modelinizi ve fikrinizi özel baskıyla hayata geçirin.",
    explore: "Ürünleri keşfet",
    customCta: "Özel baskı talebi oluştur",
    catalogEyebrow: "Katalog",
    featuredTitle: "Öne çıkan ürünler",
    featuredIntro:
      "Günlük kullanım, oyun ve sergileme için baskıya hazır ürünlerden bir seçki.",
    viewAll: "Tüm ürünleri gör",
    noProducts: "Kataloğa ürün eklendikçe burada görünecek.",
    categoriesEyebrow: "Türe göre keşfet",
    categoriesTitle: "Bir başlangıç noktası bulun",
    categoriesIntro:
      "Kataloğu kategoriye göre inceleyin; projenize uygun boyut, renk ve seçimi belirleyin.",
    processEyebrow: "Basit bir süreç",
    processTitle: "Seçimden tamamlanmış baskıya.",
    process: [
      {
        title: "Bir ürün seçin veya fikrinizi gönderin",
        text: "Katalogdan bir ürünle, sahip olduğunuz bir modelle veya hayata geçirmek istediğiniz bir fikirle başlayın.",
      },
      {
        title: "Özelleştirin",
        text: "Malzeme ve renkten talebinizin ayrıntılarına kadar ürününüz için önemli seçenekleri belirleyin.",
      },
      {
        title: "Baskınızı alın",
        text: "Seçiminiz baskıya hazırlanır ve fiziksel bir ürüne dönüşür.",
      },
    ],
    customEyebrow: "Özel baskı",
    customTitle: "Kendi modeliniz veya fikriniz mi var?",
    customText:
      "Hazır bir 3D model gönderin veya oluşturmak istediğinizi anlatın. Özel baskı talebi, görüşmeye başlamak için net bir alan sunar.",
    customStart: "Özel talep başlat",
    customPaths: [
      {
        title: "Modelim hazır",
        text: "STL, 3MF, OBJ veya STEP dosyanızı ve baskınız için önemli ayrıntıları paylaşın.",
        action: "Modelimi gönder",
      },
      {
        title: "Sadece fikrim var",
        text: "Ne üretmek istediğinizi, nerede kullanacağınızı ve bildiğiniz ölçüleri anlatın.",
        action: "Fikrimi anlat",
      },
    ],
    guideEyebrow: "Baskı rehberi",
    guideTitle: "Baskı talebinden önce daha net seçimler yapın.",
    guideText:
      "Malzemeler, dosyalar, kalite ve sipariş hazırlığı için pratik bir başlangıç.",
    guideAction: "Rehberi incele",
    whyEyebrow: "Neden 3D baskı",
    whyTitle: "Daha özel şeyler üretmenin pratik bir yolu",
    whyIntro:
      "3D baskı; bir nesnenin biçimi, miktarı veya kişisel ayrıntıları önemli olduğunda kullanışlıdır.",
    benefits: [
      {
        title: "Özelleştirme",
        text: "Bir tasarımı tercihinize, alanınıza veya belirli bir kullanıma uyacak şekilde düzenleyin.",
      },
      {
        title: "Hızlı üretim",
        text: "Hazırlanmış bir dijital modelden geleneksel kalıplar olmadan basılı bir nesneye geçin.",
      },
      {
        title: "Düşük adetli üretim",
        text: "Büyük bir üretim serisine ihtiyaç olmadığında az sayıda özel parça üretin.",
      },
    ],
    finalEyebrow: "Hazır olduğunuzda",
    finalTitle: "Bir ürün bulun veya kendi fikrinizle başlayın.",
    finalText:
      "Kataloğa göz atın, özel baskı talebi oluşturun veya sorunuz için iletişime geçin.",
    contact: "İletişim",
  },
  guide: {
    eyebrow: "3D baskı rehberi",
    title: "3D baskı planlamak için temel bilgiler.",
    intro:
      "Yaygın malzemeleri, dosya formatlarını, baskı kalitesini ve faydalı bir talep hazırlamaya yardımcı ayrıntıları bu kısa notlarla öğrenin.",
    sections: [
      {
        title: "Temel bilgiler",
        topics: [
          {
            title: "3D Baskı Nedir?",
            text: "Dijital bir model, katman katman fiziksel bir nesneye dönüştürülür.",
            points: [
              "Süreç bir 3D modelle başlar.",
              "Malzeme ince katmanlar halinde eklenir.",
              "Biçim, malzeme ve ayarlar sonucu etkiler.",
            ],
          },
          {
            title: "STL ve 3MF Dosyaları Nedir?",
            text: "Her iki format da basılabilir 3D modeli tanımlar; ancak proje ayrıntısı düzeyleri farklıdır.",
            points: [
              "STL yaygın kullanılan bir mesh formatıdır.",
              "3MF daha fazla baskı ayarı ve bilgi içerebilir.",
              "OBJ ve STEP de bazı projeler için kullanılabilir.",
            ],
          },
          {
            title: "3D Baskı Fiyatını Neler Etkiler?",
            text: "Malzeme miktarı, baskı süresi, karmaşıklık ve adet fiyatı etkiler.",
            points: [
              "Büyük parçalar genellikle daha fazla malzeme kullanır.",
              "İnce ayrıntılar baskı süresini uzatabilir.",
              "Malzeme ve bitiş tercihleri teklifi değiştirebilir.",
            ],
          },
        ],
      },
      {
        title: "Malzemeler ve kullanım",
        topics: [
          {
            title: "PLA, PETG ve TPU Arasındaki Farklar",
            text: "Bu yaygın malzemeler görünüm, dayanıklılık ve esneklik bakımından farklı ihtiyaçlara uygundur.",
            points: [
              "PLA sergileme ürünleri ve genel kullanım için yaygındır.",
              "PETG ek dayanıklılığın yararlı olduğu durumlarda tercih edilebilir.",
              "TPU esnektir; bükülmesi gereken parçalar için uygundur.",
            ],
          },
          {
            title: "Fonksiyonel Parça mı Dekoratif Baskı mı?",
            text: "Ürünün nasıl kullanılacağı, malzeme ve önemli ayrıntıları belirlemeye yardımcı olur.",
            points: [
              "Dekoratif baskılarda görünüm önceliklidir.",
              "Fonksiyonel parçalarda uyum ve günlük kullanım hesaba katılmalıdır.",
              "Talepte kullanım amacını paylaşın.",
            ],
          },
          {
            title: "Hangi Malzemeyi Seçmeliyim?",
            text: "Doğru malzeme; nesneye, bulunduğu ortama ve beklenen kullanıma bağlıdır.",
            points: [
              "İlgiliyse ısı, hareket veya dış ortamı belirtin.",
              "Parçanın esnemesi ya da yük taşıması gerekip gerekmediğini yazın.",
              "Malzeme tercihi baskıdan önce konuşulabilir.",
            ],
          },
        ],
      },
      {
        title: "Kalite ve hazırlık",
        topics: [
          {
            title: "Katman Yüksekliği ve Yüzey Kalitesi",
            text: "İnce katmanlar daha pürüzsüz eğriler sunabilir; kalın katmanlar baskı süresini kısaltabilir.",
            points: [
              "Katman çizgileri birçok 3D baskının doğal parçasıdır.",
              "Eğrisel yüzeyler daha ince katmandan yararlanabilir.",
              "Kullanım amacı, bitiş ve süre dengesini belirler.",
            ],
          },
          {
            title: "Modelinizi Baskıya Nasıl Hazırlarsınız?",
            text: "Biraz proje bilgisi, baskı planlanmadan önce pratik konuların anlaşılmasına yardımcı olur.",
            points: [
              "Dosyayı ve hedef ölçülerini ekleyin.",
              "Uyum veya dayanım gereken alanları belirtin.",
              "Önemli ayrıntılar için referans görseller veya notlar ekleyin.",
            ],
          },
        ],
      },
    ],
  },
  catalog: {
    ...english.catalog,
    eyebrow: "Katalog",
    title: "Ürünler",
    intro:
      "Baskılı modelleri, işlevsel parçaları ve özelleştirilebilir tasarımları keşfedin.",
    loading: "Ürün filtreleri hazırlanıyor…",
    search: "Ürünlerde ara",
    category: "Ürün kategorisi",
    all: "Tümü",
    product: "ürün",
    products: "ürün",
    clear: "Filtreleri temizle",
    noMatch: "Mevcut filtrelerle eşleşen ürün yok.",
    noMatchText:
      "Başka bir arama terimi deneyin veya seçili kategoriyi temizleyin.",
    reset: "Filtreleri sıfırla",
  },
  product: {
    ...english.product,
    view: "Ürünü gör",
    details: "{name} detaylarını gör",
    customizable: "Özelleştirilebilir",
    availableColors: "Mevcut renkler",
    askWhatsapp: "WhatsApp'tan yaz",
    askAbout: "Bu ürün hakkında sor",
    price: "Fiyat",
    category: "Kategori",
    material: "Malzeme",
    dimensions: "Boyutlar",
    printTime: "Tahmini baskı süresi",
    customAvailable: "Mevcut",
    standardDesign: "Standart tasarım",
    model: "3D model",
    modelAvailable: "Mevcut",
    comingSoon: "Yakında",
    gallery: "Galeri",
    photos: "Ürün fotoğrafları",
    image: "görsel",
    showImage: "Görseli göster",
    overview: "Genel bakış",
    aboutProduct: "Bu ürün hakkında",
    specifications: "Özellikler",
    productDetails: "Ürün detayları",
    related: "Bunları da beğenebilirsiniz",
    back: "Ürünler",
    invalidTitle: "Ürün bulunamadı",
    invalidText: "Bu ürün kullanılamıyor veya bağlantı hatalı olabilir.",
    available: "Mevcut",
    quote: "Fiyat teklifi alın",
  },
  viewer: {
    ...english.viewer,
    previewLabel: "Ürün 3D ön izlemesi",
    comingSoon: "3D ön izleme yakında",
    noModel: "Bu ürün için henüz etkileşimli model bulunmuyor.",
    preparing: "3D görüntüleyici hazırlanıyor…",
    autoRotate: "Otomatik döndür",
    pauseRotate: "Otomatik döndürmeyi duraklat",
    startRotate: "Otomatik döndürmeyi başlat",
    reset: "Görünümü sıfırla",
    instructions:
      "Döndürmek için sürükleyin · Yakınlaştırmak için kaydırın veya sıkıştırın",
    loading: "3D model yükleniyor…",
    loadError: "Model dosyası yüklenemedi.",
    tryAgain: "Tekrar dene",
    webglError: "Tarayıcının WebGL desteğini kontrol edip tekrar deneyin.",
    contextError:
      "3D ön izleme kesildi. Devam etmek için görüntüleyiciyi yeniden başlatın.",
    color: "Model rengi",
  },
  custom: {
    ...english.custom,
    title: "Özel baskı talebi",
    intro:
      "Kendi modelinizi gönderin veya fikrinizi anlatın. Gereksinimleri inceleyip baskı ayrıntılarını sizinle netleştirebiliriz.",
    processEyebrow: "Nasıl çalışır",
    process: [
      {
        title: "Modelinizi veya fikrinizi gönderin",
        text: "Bir dosya paylaşın ya da ne üretmek istediğinizi açıklayın.",
      },
      {
        title: "Gereksinimler incelenir",
        text: "Model, malzeme, miktar ve boyutlar değerlendirilir.",
      },
      {
        title: "Baskı ayrıntıları netleştirilir",
        text: "Pratik ayrıntılar baskıdan önce görüşülür.",
      },
    ],
    formTitle: "Projenizi anlatın",
    required: "Yıldızla işaretlenen alanlar bu demo için zorunludur.",
    name: "Ad",
    email: "E-posta",
    phone: "Telefon",
    optional: "İsteğe bağlı",
    quantity: "Miktar",
    color: "Tercih edilen renk",
    colorPlaceholder: "Örneğin mat siyah",
    material: "Tercih edilen malzeme",
    chooseMaterial: "Malzeme seçin",
    dimensions: "Yaklaşık boyutlar",
    dimensionsPlaceholder: "Örneğin 120 × 80 × 40 mm",
    description: "Proje açıklaması",
    descriptionPlaceholder:
      "Ne üretmek istediğinizi, kullanım amacını, önemli ölçüleri ve gerekli ayrıntıları yazın.",
    file: "Model dosyası",
    attach: "Model dosyası ekle",
    chooseFile: "Dosya seç",
    removeFile: "Seçili dosyayı kaldır",
    accepted: "Desteklenen formatlar: STL, 3MF, OBJ, STEP.",
    submit: "Talebi ön izle",
    preparing: "Demo hazırlanıyor…",
    demoComplete: "Demo tamamlandı",
    successTitle: "Talebiniz incelemeye hazır.",
    successText:
      "Bu, talep akışının bir ön izlemesidir. Proje ayrıntıları veya dosyalar gönderilmedi ve saklanmadı.",
    another: "Başka bir demo talebi başlat",
    errors: {
      name: "Adınızı girin.",
      email: "E-posta adresinizi girin.",
      validEmail: "Geçerli bir e-posta adresi girin.",
      description: "Projenizi en az 10 karakterle açıklayın.",
      quantity: "En az 1 miktar girin.",
      material: "Tercih edilen malzemeyi seçin.",
      file: "STL, 3MF, OBJ veya STEP dosyası seçin.",
    },
  },
  about: {
    ...english.about,
    eyebrow: "3D baskı hakkında",
    title: "Dijital fikirleri fiziksel hale getirin.",
    intro:
      "Bu katalog, 3D baskı ürünlerini keşfetmek ve özel üretim talebi başlatmak için bir alandır. Hobi ürünlerini, pratik nesneleri, prototipleri ve belirli bir kullanım için tasarlanan parçaları bir araya getirir.",
    focusEyebrow: "Ne için kullanılır",
    focusTitle: "Özel şeyler üretmenin esnek bir yolu.",
    cards: [
      {
        title: "Günlük kullanım ürünleri",
        text: "Oyun, sergileme, düzenleme ve diğer pratik ihtiyaçlar için nesneleri keşfedin.",
      },
      {
        title: "Özel üretim ve prototipleme",
        text: "Standart bir ürün uygun olmadığında mevcut bir modelden veya erken bir fikirden başlayın.",
      },
      {
        title: "İşlevsel parçalar",
        text: "Belirli bir alan, görev veya proje için üretilen parçaları ve aksesuarları inceleyin.",
      },
    ],
    startEyebrow: "Buradan başlayın",
    startTitle: "Bir ürün bulun veya kendi fikrinizi üretin.",
  },
  faq: {
    ...english.faq,
    title: "Sık Sorulan Sorular",
    intro:
      "Özel 3D baskı, malzemeler, modeller, renkler ve üretim ayrıntıları hakkında sık sorulan soruların yanıtları.",
    eyebrow: "Sorular ve yanıtlar",
    items: [
      {
        question: "Hangi malzemeler basılabilir?",
        answer:
          "Malzeme seçenekleri projeye ve kullanım amacına göre değişir. Özel baskı formu mevcut tercihleri gösterir; son seçim baskıdan önce görüşülebilir.",
      },
      {
        question: "Özel bir renk seçebilir miyim?",
        answer:
          "Talebinizde tercih ettiğiniz rengi belirtebilirsiniz. Renk bulunabilirliği ve proje için uygun malzeme baskı ayrıntıları görüşülürken netleştirilebilir.",
      },
      {
        question: "Kendi STL dosyamı gönderebilir miyim?",
        answer:
          "Evet. STL dosyanızı, bitmiş parçanın nasıl kullanılacağını açıklayan ayrıntılarla birlikte özel baskı talebine ekleyebilirsiniz.",
      },
      {
        question: "Baskı ne kadar sürer?",
        answer:
          "Baskı süresi modelin boyutuna, biçimine, malzemesine, miktarına ve seçilen ayarlara bağlıdır. Proje incelendikten sonra daha net bir süre görüşülebilir.",
      },
      {
        question: "Özel tasarımlar oluşturabilir misiniz?",
        answer:
          "Özel baskı talebinde yeni fikrinizi anlatabilirsiniz. Bir tasarımın hazırlanıp hazırlanamayacağı projenin gereksinimlerine ve ayrıntılarına bağlıdır.",
      },
      {
        question: "Hangi dosya formatları kabul edilir?",
        answer: "Talep formu STL, 3MF, OBJ ve STEP dosyalarını kabul eder.",
      },
      {
        question: "Hangi boyutlarda baskı yapılabilir?",
        answer:
          "Baskı boyutu modele ve mevcut kuruluma bağlıdır. Gereksinimlerin incelenebilmesi için yaklaşık boyutları paylaşın.",
      },
      {
        question: "Fiziksel renk ekrandakiyle tamamen aynı olur mu?",
        answer:
          "Ekranlar ve malzemeler renkleri farklı gösterebilir. Görüntülenen renk bir rehberdir; sonuç biraz farklılık gösterebilir.",
      },
    ],
    ctaTitle: "Başka bir sorunuz mu var?",
    ctaText:
      "Modelinizin veya fikrinizin ayrıntılarını göndererek görüşmeye başlayın.",
    cta: "Özel talep başlat",
  },
  contact: {
    ...english.contact,
    title: "İletişim",
    intro:
      "Sorunuza uygun iletişim kanalını seçin. Bir model veya fikir için özel baskı talebiyle başlamak en iyi yoldur.",
    eyebrow: "İletişime geçin",
    available: "Mevcut iletişim seçenekleri",
    customRequest: "Özel Baskı Talebi",
    customText:
      "Bir model veya fikir paylaşın ve yararlı bir inceleme için gereken ayrıntıları ekleyin.",
    request: "Talep başlat",
    noConfig:
      "Bu arkadaş testi için iletişim bilgileri henüz yapılandırılmadı. Özel baskı formu bir ön izlemedir ve henüz talep göndermez.",
  },
  inquiry: {
    greeting: "Merhaba,",
    interestLine: "{productName} ürünüyle ilgileniyorum.",
    colorLabel: "Renk",
    materialLabel: "Malzeme",
    productLabel: "Ürün",
  },
  categories: {
    Toys: "Oyuncaklar",
    Fidget: "Stres oyuncakları",
    Decoration: "Dekorasyon",
    Functional: "Fonksiyonel",
    Custom: "Özel üretim",
    Other: "Diğer",
  },
  materials: {
    PLA: "PLA",
    PETG: "PETG",
    TPU: "TPU",
    ABS: "ABS",
    ASA: "ASA",
    Resin: "Reçine",
    Other: "Diğer",
  },
};

export const dictionaries = {
  tr: turkish,
  en: english,
} as const satisfies Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
