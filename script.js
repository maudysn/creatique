const form = document.getElementById("analysisForm");
const result = document.getElementById("result");
const header = document.querySelector("header");

const languages = {
  id: {
    name: "Bahasa Indonesia",
    flag: "🇮🇩",
    eyebrow: "ANALISIS BAHASA BERBASIS AI",
    headline: "Setiap kata memiliki makna.",
    description: "Analisis, evaluasi, dan sempurnakan komunikasi pemasaran digital melalui pendekatan pragmatik.",
    start: "Mulai Analisis",
    analyzer: "Penganalisis Teks",
    intro: "Mari pahami makna di balik pesan pemasaran Anda.",
    marketing: "Teks Pemasaran",
    marketingPlaceholder: "Tempelkan teks pemasaran di sini...",
    product: "Produk atau Jasa",
    productPlaceholder: "Jelaskan produk atau jasa Anda",
    brand: "Karakteristik Merek",
    brandPlaceholder: "Contoh: Elegan, ramah, profesional",
    audience: "Target Audiens",
    audiencePlaceholder: "Siapa target audiens Anda?",
    platform: "Platform Publikasi",
    platformPlaceholder: "Pilih platform",
    goal: "Tujuan Pemasaran",
    goalPlaceholder: "Pilih tujuan",
    analyze: "Analisis Teks Saya",
    loading: "CREATIQUE sedang menganalisis teks Anda... ✨",
    result: "Hasil Analisis Pragmatik",
    errorInput: "Silakan masukkan teks pemasaran terlebih dahulu.",
    error: "Maaf, terjadi kesalahan.",
    footer: "Di mana bahasa bertemu makna.",
    platforms: ["Instagram", "TikTok", "Situs Web", "Email", "Lokapasar Online", "Lainnya"],
    goals: ["Memberikan Informasi", "Promosi", "Persuasi", "Membangun Kesadaran Merek", "Mendorong Pembelian"]
  },

  en: {
    name: "English",
    flag: "🇬🇧",
    eyebrow: "AI-POWERED LANGUAGE ANALYSIS",
    headline: "Every word has meaning.",
    description: "Analyze, evaluate, and refine your digital marketing communication through the lens of pragmatics.",
    start: "Start Analyzing",
    analyzer: "Text Analyzer",
    intro: "Let's understand the meaning behind your marketing message.",
    marketing: "Marketing Text",
    marketingPlaceholder: "Paste your marketing text here...",
    product: "Product or Service",
    productPlaceholder: "Describe your product or service",
    brand: "Brand Characteristics",
    brandPlaceholder: "e.g. Elegant, friendly, professional",
    audience: "Target Audience",
    audiencePlaceholder: "Who is your audience?",
    platform: "Publication Platform",
    platformPlaceholder: "Choose a platform",
    goal: "Marketing Objective",
    goalPlaceholder: "Choose an objective",
    analyze: "Analyze My Text",
    loading: "CREATIQUE is analyzing your text... ✨",
    result: "Your Pragmatic Analysis",
    errorInput: "Please enter your marketing text first.",
    error: "Sorry, something went wrong.",
    footer: "Where language meets meaning.",
    platforms: ["Instagram", "TikTok", "Website", "Email", "Online Marketplace", "Other"],
    goals: ["Informing", "Promoting", "Persuading", "Building Brand Awareness", "Encouraging Purchase"]
  },

  ms: {
    name: "Bahasa Melayu",
    flag: "🇲🇾",
    eyebrow: "ANALISIS BAHASA BERKUASA AI",
    headline: "Setiap kata mempunyai makna.",
    description: "Analisis, nilai dan perbaik komunikasi pemasaran digital melalui pendekatan pragmatik.",
    start: "Mula Menganalisis",
    analyzer: "Penganalisis Teks",
    intro: "Mari fahami makna di sebalik mesej pemasaran anda.",
    marketing: "Teks Pemasaran",
    marketingPlaceholder: "Tampalkan teks pemasaran anda di sini...",
    product: "Produk atau Perkhidmatan",
    productPlaceholder: "Terangkan produk atau perkhidmatan anda",
    brand: "Ciri-ciri Jenama",
    brandPlaceholder: "Contoh: Elegan, mesra, profesional",
    audience: "Sasaran Audiens",
    audiencePlaceholder: "Siapakah sasaran audiens anda?",
    platform: "Platform Penerbitan",
    platformPlaceholder: "Pilih platform",
    goal: "Objektif Pemasaran",
    goalPlaceholder: "Pilih objektif",
    analyze: "Analisis Teks Saya",
    loading: "CREATIQUE sedang menganalisis teks anda... ✨",
    result: "Hasil Analisis Pragmatik",
    errorInput: "Sila masukkan teks pemasaran terlebih dahulu.",
    error: "Maaf, berlaku ralat.",
    footer: "Tempat bahasa bertemu makna.",
    platforms: ["Instagram", "TikTok", "Laman Web", "E-mel", "Pasaran Dalam Talian", "Lain-lain"],
    goals: ["Memberi Maklumat", "Promosi", "Memujuk", "Membina Kesedaran Jenama", "Menggalakkan Pembelian"]
  },

  ja: {
    name: "日本語",
    flag: "🇯🇵",
    eyebrow: "AIによる言語分析",
    headline: "すべての言葉に意味がある。",
    description: "語用論の観点からデジタルマーケティングのコミュニケーションを分析・評価・改善します。",
    start: "分析を始める",
    analyzer: "テキスト分析",
    intro: "マーケティングメッセージの背後にある意味を理解しましょう。",
    marketing: "マーケティングテキスト",
    marketingPlaceholder: "ここにテキストを入力してください...",
    product: "商品・サービス",
    productPlaceholder: "商品またはサービスを説明してください",
    brand: "ブランドの特徴",
    brandPlaceholder: "例：上品、親しみやすい、プロフェッショナル",
    audience: "ターゲット層",
    audiencePlaceholder: "対象となるユーザーは誰ですか？",
    platform: "掲載プラットフォーム",
    platformPlaceholder: "プラットフォームを選択",
    goal: "マーケティング目標",
    goalPlaceholder: "目標を選択",
    analyze: "テキストを分析する",
    loading: "CREATIQUEが分析しています... ✨",
    result: "語用論分析の結果",
    errorInput: "マーケティングテキストを入力してください。",
    error: "エラーが発生しました。",
    footer: "言語と意味が出会う場所。",
    platforms: ["Instagram", "TikTok", "ウェブサイト", "メール", "オンラインマーケット", "その他"],
    goals: ["情報提供", "宣伝", "説得", "ブランド認知度の向上", "購入促進"]
  },

  ko: {
    name: "한국어",
    flag: "🇰🇷",
    eyebrow: "AI 기반 언어 분석",
    headline: "모든 단어에는 의미가 있습니다.",
    description: "화용론적 관점에서 디지털 마케팅 커뮤니케이션을 분석하고 평가하며 개선합니다.",
    start: "분석 시작하기",
    analyzer: "텍스트 분석기",
    intro: "마케팅 메시지에 담긴 의미를 이해해 보세요.",
    marketing: "마케팅 텍스트",
    marketingPlaceholder: "여기에 마케팅 텍스트를 입력하세요...",
    product: "제품 또는 서비스",
    productPlaceholder: "제품 또는 서비스를 설명하세요",
    brand: "브랜드 특성",
    brandPlaceholder: "예: 우아함, 친근함, 전문적",
    audience: "타깃 고객",
    audiencePlaceholder: "주요 고객은 누구인가요?",
    platform: "게시 플랫폼",
    platformPlaceholder: "플랫폼 선택",
    goal: "마케팅 목표",
    goalPlaceholder: "목표 선택",
    analyze: "텍스트 분석하기",
    loading: "CREATIQUE가 텍스트를 분석하고 있습니다... ✨",
    result: "화용론 분석 결과",
    errorInput: "마케팅 텍스트를 입력해 주세요.",
    error: "오류가 발생했습니다.",
    footer: "언어와 의미가 만나는 곳.",
    platforms: ["Instagram", "TikTok", "웹사이트", "이메일", "온라인 마켓플레이스", "기타"],
    goals: ["정보 제공", "홍보", "설득", "브랜드 인지도 향상", "구매 유도"]
  },

  zh: {
    name: "中文",
    flag: "🇨🇳",
    eyebrow: "AI语言分析",
    headline: "每个词语都有意义。",
    description: "通过语用学视角分析、评估和优化数字营销传播内容。",
    start: "开始分析",
    analyzer: "文本分析器",
    intro: "让我们理解营销信息背后的含义。",
    marketing: "营销文本",
    marketingPlaceholder: "请在此粘贴营销文本...",
    product: "产品或服务",
    productPlaceholder: "描述您的产品或服务",
    brand: "品牌特征",
    brandPlaceholder: "例如：优雅、友好、专业",
    audience: "目标受众",
    audiencePlaceholder: "您的目标受众是谁？",
    platform: "发布平台",
    platformPlaceholder: "选择平台",
    goal: "营销目标",
    goalPlaceholder: "选择目标",
    analyze: "分析我的文本",
    loading: "CREATIQUE正在分析您的文本... ✨",
    result: "语用分析结果",
    errorInput: "请先输入营销文本。",
    error: "抱歉，发生了错误。",
    footer: "语言与意义相遇的地方。",
    platforms: ["Instagram", "TikTok", "网站", "电子邮件", "在线市场", "其他"],
    goals: ["提供信息", "推广", "说服", "提升品牌知名度", "促进购买"]
  },

  ar: {
    name: "العربية",
    flag: "🇸🇦",
    eyebrow: "تحليل اللغة بالذكاء الاصطناعي",
    headline: "كل كلمة تحمل معنى.",
    description: "حلّل وقيّم وطوّر اتصالات التسويق الرقمي من منظور التداولية.",
    start: "ابدأ التحليل",
    analyzer: "محلل النصوص",
    intro: "لنفهم المعنى وراء رسالتك التسويقية.",
    marketing: "النص التسويقي",
    marketingPlaceholder: "الصق النص التسويقي هنا...",
    product: "المنتج أو الخدمة",
    productPlaceholder: "صف منتجك أو خدمتك",
    brand: "خصائص العلامة التجارية",
    brandPlaceholder: "مثال: أنيق، ودود، احترافي",
    audience: "الجمهور المستهدف",
    audiencePlaceholder: "من هو جمهورك المستهدف؟",
    platform: "منصة النشر",
    platformPlaceholder: "اختر منصة",
    goal: "الهدف التسويقي",
    goalPlaceholder: "اختر هدفاً",
    analyze: "حلّل النص",
    loading: "يقوم CREATIQUE بتحليل النص... ✨",
    result: "نتائج التحليل التداولي",
    errorInput: "يرجى إدخال النص التسويقي أولاً.",
    error: "عذراً، حدث خطأ.",
    footer: "حيث تلتقي اللغة بالمعنى.",
    platforms: ["Instagram", "TikTok", "موقع إلكتروني", "البريد الإلكتروني", "السوق الإلكتروني", "أخرى"],
    goals: ["تقديم المعلومات", "الترويج", "الإقناع", "بناء الوعي بالعلامة التجارية", "تشجيع الشراء"]
  },

  es: {
    name: "Español",
    flag: "🇪🇸",
    eyebrow: "ANÁLISIS DEL LENGUAJE CON IA",
    headline: "Cada palabra tiene significado.",
    description: "Analiza, evalúa y mejora la comunicación de marketing digital desde la perspectiva de la pragmática.",
    start: "Comenzar análisis",
    analyzer: "Analizador de texto",
    intro: "Comprendamos el significado detrás de tu mensaje de marketing.",
    marketing: "Texto de marketing",
    marketingPlaceholder: "Pega tu texto de marketing aquí...",
    product: "Producto o servicio",
    productPlaceholder: "Describe tu producto o servicio",
    brand: "Características de la marca",
    brandPlaceholder: "Ej.: Elegante, amigable, profesional",
    audience: "Público objetivo",
    audiencePlaceholder: "¿Quién es tu público objetivo?",
    platform: "Plataforma de publicación",
    platformPlaceholder: "Elige una plataforma",
    goal: "Objetivo de marketing",
    goalPlaceholder: "Elige un objetivo",
    analyze: "Analizar mi texto",
    loading: "CREATIQUE está analizando tu texto... ✨",
    result: "Tu análisis pragmático",
    errorInput: "Introduce primero tu texto de marketing.",
    error: "Lo sentimos, ocurrió un error.",
    footer: "Donde el lenguaje encuentra el significado.",
    platforms: ["Instagram", "TikTok", "Sitio web", "Correo electrónico", "Mercado en línea", "Otro"],
    goals: ["Informar", "Promocionar", "Persuadir", "Crear reconocimiento de marca", "Fomentar la compra"]
  },

  fr: {
    name: "Français",
    flag: "🇫🇷",
    eyebrow: "ANALYSE LINGUISTIQUE PAR IA",
    headline: "Chaque mot a un sens.",
    description: "Analysez, évaluez et améliorez votre communication marketing numérique à travers la pragmatique.",
    start: "Commencer l'analyse",
    analyzer: "Analyseur de texte",
    intro: "Comprenons le sens de votre message marketing.",
    marketing: "Texte marketing",
    marketingPlaceholder: "Collez votre texte marketing ici...",
    product: "Produit ou service",
    productPlaceholder: "Décrivez votre produit ou service",
    brand: "Caractéristiques de la marque",
    brandPlaceholder: "Ex. : Élégant, convivial, professionnel",
    audience: "Public cible",
    audiencePlaceholder: "Qui est votre public cible ?",
    platform: "Plateforme de publication",
    platformPlaceholder: "Choisir une plateforme",
    goal: "Objectif marketing",
    goalPlaceholder: "Choisir un objectif",
    analyze: "Analyser mon texte",
    loading: "CREATIQUE analyse votre texte... ✨",
    result: "Votre analyse pragmatique",
    errorInput: "Veuillez d'abord saisir votre texte marketing.",
    error: "Désolé, une erreur s'est produite.",
    footer: "Là où la langue rencontre le sens.",
    platforms: ["Instagram", "TikTok", "Site web", "E-mail", "Marché en ligne", "Autre"],
    goals: ["Informer", "Promouvoir", "Persuader", "Développer la notoriété de la marque", "Encourager l'achat"]
  },

  de: {
    name: "Deutsch",
    flag: "🇩🇪",
    eyebrow: "KI-GESTÜTZTE SPRACHANALYSE",
    headline: "Jedes Wort hat eine Bedeutung.",
    description: "Analysieren, bewerten und verbessern Sie Ihre digitale Marketingkommunikation aus pragmatischer Sicht.",
    start: "Analyse starten",
    analyzer: "Textanalysator",
    intro: "Lassen Sie uns die Bedeutung Ihrer Marketingbotschaft verstehen.",
    marketing: "Marketingtext",
    marketingPlaceholder: "Fügen Sie hier Ihren Marketingtext ein...",
    product: "Produkt oder Dienstleistung",
    productPlaceholder: "Beschreiben Sie Ihr Produkt oder Ihre Dienstleistung",
    brand: "Markenmerkmale",
    brandPlaceholder: "z. B. Elegant, freundlich, professionell",
    audience: "Zielgruppe",
    audiencePlaceholder: "Wer ist Ihre Zielgruppe?",
    platform: "Veröffentlichungsplattform",
    platformPlaceholder: "Plattform auswählen",
    goal: "Marketingziel",
    goalPlaceholder: "Ziel auswählen",
    analyze: "Meinen Text analysieren",
    loading: "CREATIQUE analysiert Ihren Text... ✨",
    result: "Ihre pragmatische Analyse",
    errorInput: "Bitte geben Sie zuerst Ihren Marketingtext ein.",
    error: "Entschuldigung, ein Fehler ist aufgetreten.",
    footer: "Wo Sprache auf Bedeutung trifft.",
    platforms: ["Instagram", "TikTok", "Website", "E-Mail", "Online-Marktplatz", "Sonstiges"],
    goals: ["Informieren", "Bewerben", "Überzeugen", "Markenbekanntheit aufbauen", "Kauf fördern"]
  }
};

let currentLanguage = localStorage.getItem("creatiqueLanguage") || "id";

const languageSelect = document.createElement("select");
languageSelect.id = "languageSelect";
languageSelect.setAttribute("aria-label", "Select language");

Object.entries(languages).forEach(([code, language]) => {
  const option = document.createElement("option");
  option.value = code;
  option.textContent = `${language.flag} ${language.name}`;
  languageSelect.appendChild(option);
});

header.appendChild(languageSelect);

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function setLanguage(code) {
  if (!languages[code]) code = "id";

  currentLanguage = code;
  localStorage.setItem("creatiqueLanguage", code);

  const t = languages[code];

  document.documentElement.lang = code;
  document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
  languageSelect.value = code;

  setText(".eyebrow", t.eyebrow);
  document.querySelector(".hero h1").innerHTML =
    t.headline.replace(".", "<span>.</span>");
  document.querySelector(".hero > p:not(.eyebrow)").textContent = t.description;
  document.querySelector(".hero a").textContent = t.start;
  setText(".analyzer h2", t.analyzer);
  document.querySelector(".analyzer > p").textContent = t.intro;

  const labels = document.querySelectorAll("#analysisForm label");
  const labelTexts = [
    t.marketing, t.product, t.brand, t.audience, t.platform, t.goal
  ];
  labels.forEach((label, index) => {
    label.textContent = labelTexts[index];
  });

  document.getElementById("marketingText").placeholder = t.marketingPlaceholder;
  document.getElementById("product").placeholder = t.productPlaceholder;
  document.getElementById("brand").placeholder = t.brandPlaceholder;
  document.getElementById("audience").placeholder = t.audiencePlaceholder;

  const platform = document.getElementById("platform");
  platform.options[0].textContent = t.platformPlaceholder;
  t.platforms.forEach((value, index) => {
    platform.options[index + 1].textContent = value;
  });

  const goal = document.getElementById("goal");
  goal.options[0].textContent = t.goalPlaceholder;
  t.goals.forEach((value, index) => {
    goal.options[index + 1].textContent = value;
  });

  document.querySelector("#analysisForm button").textContent = t.analyze;
  document.querySelector("footer p:last-child").textContent = t.footer;

  if (result.dataset.hasResult !== "true") {
    result.innerHTML = "";
  }
}

languageSelect.addEventListener("change", event => {
  setLanguage(event.target.value);
});

setLanguage(currentLanguage);

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const t = languages[currentLanguage];

  const marketingText = document.getElementById("marketingText").value.trim();
  const product = document.getElementById("product").value;
  const brand = document.getElementById("brand").value;
  const audience = document.getElementById("audience").value;
  const platform = document.getElementById("platform").value;
  const goal = document.getElementById("goal").value;

  if (!marketingText) {
    result.textContent = t.errorInput;
    return;
  }

  result.dataset.hasResult = "false";
  result.textContent = t.loading;

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        marketingText,
        product,
        brand,
        audience,
        platform,
        goal,
        outputLanguage: currentLanguage
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || t.error);
    }

    const highlights = Array.isArray(data.pragmaticHighlights)
  ? data.pragmaticHighlights
  : [];

const interpretations = Array.isArray(data.audienceInterpretations)
  ? data.audienceInterpretations
  : [];

const categoryNames = {
  speech_act: "Tindak Tutur",
  implicature: "Implikatur",
  presupposition: "Praanggapan",
  politeness: "Kesantunan Berbahasa"
};

const highlightHTML = highlights.length
  ? highlights.map((item, index) => {
      const category = categoryNames[item.category] || item.category || "Pragmatik";

      return `
        <details class="highlight-card">
          <summary>
            <span class="highlight-number">${index + 1}</span>
            <span class="highlight-quote">"${escapeHTML(item.quote || "")}"</span>
            <span class="category-badge">${escapeHTML(category)}</span>
          </summary>

          <div class="highlight-explanation">
            <h4>Penjelasan Linguistik</h4>
            <p>${escapeHTML(item.explanation || "-")}</p>

            <h4>Fungsi Komunikatif</h4>
            <p>${escapeHTML(item.function || "-")}</p>
          </div>
        </details>
      `;
    }).join("")
  : "<p>Belum ditemukan bukti pragmatik yang cukup kuat.</p>";

const audienceHTML = interpretations.length
  ? interpretations.map(item => `
      <article class="audience-card">
        <h3>${escapeHTML(item.audience || "Audiens")}</h3>

        <div class="audience-item">
          <h4>Makna Tersurat</h4>
          <p>${escapeHTML(item.explicitMeaning || "-")}</p>
        </div>

        <div class="audience-item">
          <h4>Makna Tersirat</h4>
          <p>${escapeHTML(item.impliedMeaning || "-")}</p>
        </div>

        <div class="audience-item">
          <h4>Kemungkinan Respons</h4>
          <p>${escapeHTML(item.possibleResponse || "-")}</p>
        </div>

        <div class="audience-item">
          <h4>Potensi Salah Tafsir</h4>
          <p>${escapeHTML(item.interpretationRisk || "-")}</p>
        </div>
      </article>
    `).join("")
  : "<p>Belum tersedia interpretasi audiens.</p>";

result.innerHTML = `
  <h2>${t.result}</h2>

  <div class="analysis-content">
    ${escapeHTML(data.analysis || "").replace(/\n/g, "<br>")}
  </div>

  <section class="feature-section">
    <div class="feature-heading">
      <span class="feature-label">01 / LINGUISTIC EVIDENCE</span>
      <h2>Pragmatic Highlight</h2>
      <p>
        Temukan bukti penggunaan bahasa dan fenomena
        pragmatik dalam teks pemasaran.
      </p>
    </div>

    <div class="highlight-list">
      ${highlightHTML}
    </div>
  </section>

  <section class="feature-section">
    <div class="feature-heading">
      <span class="feature-label">02 / AUDIENCE PERSPECTIVE</span>
      <h2>Audience Interpretation</h2>
      <p>
        Pelajari kemungkinan cara audiens memahami
        pesan pemasaran.
      </p>
    </div>

    <div class="audience-grid">
      ${audienceHTML}
    </div>
  </section>
`;

result.dataset.hasResult = "true";

} catch (error) {
  result.innerHTML = `
    <p>${t.error}</p>
    <p>${escapeHTML(error.message)}</p>
  `;
}
});
      <h2>${t.result}</h2>
      <div class="analysis-content">${escapeHTML(data.analysis).replace(/\n/g, "<br>")}</div>
    `;

    result.dataset.hasResult = "true";

  } catch (error) {
    result.innerHTML = `
      <p>${t.error}</p>
      <p>${escapeHTML(error.message)}</p>
    `;
  }
});

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
                }
