export type FileName = "index.html" | "styles.css" | "app.js" | "package.json";
export type WorkspaceFiles = Record<FileName, string>;
export type ProjectCategory =
  | "website"
  | "web-app"
  | "mobile-app"
  | "dashboard"
  | "store"
  | "other";

export type GeneratedProject = {
  name: string;
  summary: string;
  files: WorkspaceFiles;
};

export const categoryOptions: {
  id: ProjectCategory;
  icon: string;
  title: string;
  description: string;
  example: string;
}[] = [
  {
    id: "website",
    icon: "◇",
    title: "Website",
    description: "Landing pages, company sites, portfolios",
    example: "Create a modern restaurant website with online booking",
  },
  {
    id: "web-app",
    icon: "⌘",
    title: "Web app",
    description: "Interactive tools, SaaS, portals",
    example: "Build a task manager for a small creative team",
  },
  {
    id: "mobile-app",
    icon: "▯",
    title: "Mobile app",
    description: "Responsive app prototypes for phones",
    example: "Design a mobile fitness app with daily workouts",
  },
  {
    id: "dashboard",
    icon: "▦",
    title: "Dashboard",
    description: "Analytics, admin, finance panels",
    example: "Make a sales dashboard with metrics and recent orders",
  },
  {
    id: "store",
    icon: "▱",
    title: "Online store",
    description: "Products, carts, offers, checkout UI",
    example: "Create a premium skincare shop with a working cart",
  },
  {
    id: "other",
    icon: "✦",
    title: "Something else",
    description: "Describe any browser-based idea",
    example: "Create an interactive event invitation with an RSVP form",
  },
];

const categoryNames: Record<ProjectCategory, string> = {
  website: "Website",
  "web-app": "Web app",
  "mobile-app": "Mobile app",
  dashboard: "Dashboard",
  store: "Online store",
  other: "Digital experience",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function truncate(value: string, length: number) {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > length ? `${clean.slice(0, length - 1).trim()}…` : clean;
}

function detectDirection(prompt: string) {
  return /[\u0600-\u06ff]/u.test(prompt) ? "rtl" : "ltr";
}

function detectDomain(prompt: string) {
  const normalized = prompt.toLowerCase();
  const domains = [
    { pattern: /restaurant|cafe|coffee|food|چێشت|خواردن|قاوە/u, name: "Savor", noun: "hospitality" },
    { pattern: /finance|bank|money|crypto|پارە|بانک|دارایی/u, name: "Ledger", noun: "finance" },
    { pattern: /fitness|gym|health|workout|وەرزش|تەندروستی/u, name: "Pulse", noun: "wellness" },
    { pattern: /school|learn|course|education|فێر|قوتاب|خوێندن/u, name: "Learnly", noun: "education" },
    { pattern: /house|home|real estate|property|خانوو|موڵک/u, name: "Haven", noun: "real estate" },
    { pattern: /travel|hotel|trip|گەشت|هوتێل/u, name: "Roam", noun: "travel" },
    { pattern: /beauty|skin|salon|cosmetic|جوانکاری|پێست/u, name: "Aura", noun: "beauty" },
    { pattern: /music|audio|podcast|گۆرانی|مۆسیقا/u, name: "Echo", noun: "audio" },
    { pattern: /code|developer|software|tech|کۆد|تکنەلۆژیا/u, name: "Nexa", noun: "technology" },
  ];
  return domains.find((domain) => domain.pattern.test(normalized)) ?? {
    name: "Northstar",
    noun: "modern business",
  };
}

function detectPalette(prompt: string) {
  const normalized = prompt.toLowerCase();
  if (/green|emerald|nature|سەوز/u.test(normalized)) {
    return { accent: "#36d399", accent2: "#0ea56d", glow: "#36d39935" };
  }
  if (/blue|ocean|sky|شین/u.test(normalized)) {
    return { accent: "#52a8ff", accent2: "#2864e8", glow: "#438dff38" };
  }
  if (/orange|gold|warm|پرتەقاڵی|زێڕین/u.test(normalized)) {
    return { accent: "#ffad57", accent2: "#e36b2c", glow: "#ff914138" };
  }
  if (/pink|rose|پەمەیی|گوڵی/u.test(normalized)) {
    return { accent: "#ff79b7", accent2: "#c94998", glow: "#f05cb13a" };
  }
  return { accent: "#9b87ff", accent2: "#6c4de6", glow: "#795dff40" };
}

function projectSlug(name: string, category: ProjectCategory) {
  const slug = name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return slug || `sky-${category}`;
}

function navigation(name: string, rtl: boolean) {
  const links = rtl
    ? [["#features", "تایبەتمەندییەکان"], ["#work", "کارەکان"], ["#contact", "پەیوەندی"]]
    : [["#features", "Features"], ["#work", "Work"], ["#contact", "Contact"]];
  return `<header class="site-nav">
  <a class="brand" href="#" aria-label="${escapeHtml(name)} home"><span>✦</span>${escapeHtml(name)}</a>
  <button class="menu-button" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
  <nav class="nav-links" aria-label="Main navigation">
    ${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join("\n    ")}
  </nav>
</header>`;
}

function websiteMarkup(name: string, prompt: string, rtl: boolean) {
  const copy = rtl
    ? {
        eyebrow: "دیزاینی زیرەک، ئەنجامی ڕاستەقینە",
        heading: `${name} بیرۆکەکان دەگۆڕێت بۆ ئەزموونێکی ناوازە.`,
        body: "وێبسایتێکی خێرا، جوان و گونجاو بۆ هەموو ئامێرەکان؛ دروستکراوە لەسەر داواکارییەکەت.",
        primary: "دەست پێ بکە",
        secondary: "بینینی کارەکان",
        section: "هەموو شتێک بۆ گەشەکردن",
        cta: "ئامادەیت بیرۆکەکەت ببێتە ڕاستی؟",
      }
    : {
        eyebrow: "Thoughtful design, real outcomes",
        heading: `${name} turns bold ideas into memorable digital experiences.`,
        body: "A fast, accessible and responsive website shaped around your brief and ready for your next iteration.",
        primary: "Start a project",
        secondary: "Explore our work",
        section: "Everything you need to grow",
        cta: "Ready to turn your idea into something real?",
      };
  return `<div class="site-frame">
  ${navigation(name, rtl)}
  <main>
    <section class="hero-section">
      <div class="hero-copy">
        <span class="eyebrow">${copy.eyebrow}</span>
        <h1>${escapeHtml(copy.heading)}</h1>
        <p>${copy.body}</p>
        <div class="button-row">
          <button class="primary-button" data-toast="${rtl ? "سوپاس! بە زووترین کات پەیوەندیت پێوە دەکەین." : "Thanks! We’ll be in touch shortly."}">${copy.primary}<span>↗</span></button>
          <a class="secondary-button" href="#work">${copy.secondary}</a>
        </div>
        <p class="brief-note">${escapeHtml(truncate(prompt, 140))}</p>
      </div>
      <div class="hero-visual" aria-label="Decorative product visual">
        <div class="visual-card visual-card-main">
          <span class="visual-label">01 / ${escapeHtml(name)}</span>
          <div class="visual-orb"></div>
          <strong>Ideas<br />in motion.</strong>
        </div>
        <div class="visual-card visual-card-small"><i></i><span>Built to stand out</span></div>
      </div>
    </section>

    <section class="feature-section" id="features">
      <div class="section-heading"><span>02</span><h2>${copy.section}</h2></div>
      <div class="feature-grid">
        <article><span>◇</span><h3>${rtl ? "ستراتیژی" : "Clear strategy"}</h3><p>${rtl ? "بڕیاری دروست لە بنەڕەتەوە." : "Focused decisions that support every screen."}</p></article>
        <article><span>✦</span><h3>${rtl ? "دیزاینی تایبەت" : "Distinct design"}</h3><p>${rtl ? "ناسنامەیەک کە لەبیر ناکرێت." : "A memorable identity with thoughtful details."}</p></article>
        <article><span>↗</span><h3>${rtl ? "خێرایی" : "Fast by default"}</h3><p>${rtl ? "ئەزموونێکی خێرا لەسەر هەر ئامێرێک." : "Responsive performance on every device."}</p></article>
      </div>
    </section>

    <section class="work-section" id="work">
      <div class="work-card large"><span>Selected work</span><h3>${name} / Digital launch</h3><i></i></div>
      <div class="work-card"><span>Approach</span><h3>Simple. Useful. Human.</h3><p>Designed around the people who will actually use it.</p></div>
    </section>

    <section class="closing-cta" id="contact">
      <span>Let’s build</span><h2>${copy.cta}</h2>
      <button class="primary-button" data-toast="${rtl ? "نامەکەت تۆمار کرا." : "Your request is ready to go."}">${copy.primary}<span>→</span></button>
    </section>
  </main>
  <footer><span>© 2026 ${escapeHtml(name)}</span><span>Designed with intention.</span></footer>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`;
}

function webAppMarkup(name: string, prompt: string, rtl: boolean) {
  return `<div class="product-shell app-product">
  <aside class="product-sidebar">
    <a class="brand" href="#"><span>✦</span>${escapeHtml(name)}</a>
    <nav aria-label="App navigation">
      <button class="active"><span>⌂</span>${rtl ? "سەرەکی" : "Overview"}</button>
      <button><span>✓</span>${rtl ? "ئەرکەکان" : "My tasks"}</button>
      <button><span>♢</span>${rtl ? "تیم" : "Team"}</button>
      <button><span>▦</span>${rtl ? "ڕاپۆرت" : "Reports"}</button>
    </nav>
    <div class="account-chip"><i>SK</i><div><b>${rtl ? "هەژماری من" : "My workspace"}</b><small>Free plan</small></div></div>
  </aside>
  <main class="product-main">
    <header class="product-head">
      <div><span class="eyebrow">${rtl ? "ڕۆژ باش" : "Good morning"}</span><h1>${rtl ? "ئەمڕۆ چی دروست دەکەین؟" : "What will we make today?"}</h1></div>
      <button class="primary-button" id="newTaskButton">＋ ${rtl ? "ئەرکی نوێ" : "New task"}</button>
    </header>
    <p class="brief-banner"><span>✦</span>${escapeHtml(truncate(prompt, 150))}</p>
    <section class="metric-grid">
      <article><span>${rtl ? "ئەرکی تەواو" : "Completed"}</span><strong>24</strong><small>↑ 18% this week</small></article>
      <article><span>${rtl ? "لە بەردەوامی" : "In progress"}</span><strong>08</strong><small>3 due today</small></article>
      <article><span>${rtl ? "ئەندامانی تیم" : "Team members"}</span><strong>06</strong><small>All active</small></article>
    </section>
    <section class="app-grid">
      <article class="task-board">
        <div class="card-head"><h2>${rtl ? "ئەرکەکانی ئەمڕۆ" : "Today’s focus"}</h2><span>4 tasks</span></div>
        <div id="taskList">
          <label class="task-row"><input type="checkbox" checked /><span><b>Prepare launch brief</b><small>Product design · 10:00</small></span><i>Done</i></label>
          <label class="task-row"><input type="checkbox" /><span><b>Review onboarding flow</b><small>Research · 12:30</small></span><i>Today</i></label>
          <label class="task-row"><input type="checkbox" /><span><b>Share prototype with team</b><small>Collaboration · 15:00</small></span><i>Today</i></label>
        </div>
      </article>
      <article class="progress-card">
        <div class="card-head"><h2>${rtl ? "پێشکەوتن" : "Weekly progress"}</h2><span>72%</span></div>
        <div class="progress-ring"><strong>72<small>%</small></strong></div>
        <p>18 of 25 tasks completed</p>
        <div class="avatar-row"><i>AR</i><i>LN</i><i>SK</i><i>+3</i></div>
      </article>
    </section>
  </main>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`;
}

function dashboardMarkup(name: string, prompt: string, rtl: boolean) {
  const monthLabels = rtl ? ["ش", "ی", "د", "س", "چ", "پ", "ه"] : ["M", "T", "W", "T", "F", "S", "S"];
  return `<div class="product-shell dashboard-product">
  <aside class="product-sidebar">
    <a class="brand" href="#"><span>✦</span>${escapeHtml(name)}</a>
    <nav aria-label="Dashboard navigation">
      <button class="active"><span>▦</span>${rtl ? "پوختە" : "Overview"}</button>
      <button><span>⌁</span>${rtl ? "فرۆشتن" : "Sales"}</button>
      <button><span>♢</span>${rtl ? "کڕیار" : "Customers"}</button>
      <button><span>⚙</span>${rtl ? "ڕێکخستن" : "Settings"}</button>
    </nav>
    <div class="account-chip"><i>SK</i><div><b>${rtl ? "بەڕێوەبەر" : "Admin"}</b><small>${name}</small></div></div>
  </aside>
  <main class="product-main">
    <header class="product-head">
      <div><span class="eyebrow">${rtl ? "داشبۆردی کار" : "Business dashboard"}</span><h1>${rtl ? "بەخێربێیتەوە" : "Welcome back"}</h1></div>
      <button class="date-button">Jul 21 — Jul 28⌄</button>
    </header>
    <p class="brief-banner"><span>✦</span>${escapeHtml(truncate(prompt, 150))}</p>
    <section class="metric-grid four">
      <article><span>${rtl ? "داهات" : "Revenue"}</span><strong>$84.2K</strong><small>↑ 12.5%</small></article>
      <article><span>${rtl ? "داواکاری" : "Orders"}</span><strong>1,429</strong><small>↑ 8.2%</small></article>
      <article><span>${rtl ? "کڕیار" : "Customers"}</span><strong>892</strong><small>↑ 5.1%</small></article>
      <article><span>${rtl ? "گۆڕان" : "Conversion"}</span><strong>4.82%</strong><small>↑ 0.6%</small></article>
    </section>
    <section class="dashboard-grid">
      <article class="chart-card">
        <div class="card-head"><div><h2>${rtl ? "پوختەی فرۆشتن" : "Sales overview"}</h2><small>Last seven days</small></div><span>● Revenue</span></div>
        <div class="bar-chart" aria-label="Weekly revenue chart">
          ${[48, 64, 43, 78, 69, 92, 81].map((height, index) => `<div><i style="height:${height}%"></i><span>${monthLabels[index]}</span></div>`).join("")}
        </div>
      </article>
      <article class="source-card">
        <div class="card-head"><h2>${rtl ? "سەرچاوەکان" : "Traffic sources"}</h2><span>•••</span></div>
        <div class="donut"><strong>42K<small>visits</small></strong></div>
        <ul><li><i></i>Organic <b>48%</b></li><li><i></i>Direct <b>31%</b></li><li><i></i>Social <b>21%</b></li></ul>
      </article>
    </section>
    <section class="table-card">
      <div class="card-head"><h2>${rtl ? "داواکارییە نوێیەکان" : "Recent orders"}</h2><button data-toast="Report exported successfully">Export</button></div>
      <div class="data-table">
        <div class="table-row table-title"><span>Customer</span><span>Product</span><span>Status</span><span>Total</span></div>
        <div class="table-row"><span><i class="customer-icon">AM</i> Ava Morgan</span><span>Studio plan</span><span><b class="status paid">Paid</b></span><span>$420</span></div>
        <div class="table-row"><span><i class="customer-icon">DL</i> Dilan Lee</span><span>Pro workspace</span><span><b class="status pending">Pending</b></span><span>$280</span></div>
        <div class="table-row"><span><i class="customer-icon">RK</i> Roj Karim</span><span>Team plan</span><span><b class="status paid">Paid</b></span><span>$640</span></div>
      </div>
    </section>
  </main>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`;
}

function storeMarkup(name: string, prompt: string, rtl: boolean) {
  return `<div class="site-frame store-product">
  <header class="site-nav store-nav">
    <a class="brand" href="#"><span>✦</span>${escapeHtml(name)}</a>
    <button class="menu-button" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <nav class="nav-links" aria-label="Store navigation"><a href="#shop">${rtl ? "کۆگا" : "Shop"}</a><a href="#story">${rtl ? "چیرۆک" : "Our story"}</a><a href="#contact">${rtl ? "پەیوەندی" : "Contact"}</a></nav>
    <button class="cart-button" type="button" data-toast="${rtl ? "سەبەتەکەت ئامادەیە." : "Your cart is ready."}">${rtl ? "سەبەتە" : "Cart"} <span id="cartCount">0</span></button>
  </header>
  <main>
    <section class="store-hero">
      <div><span class="eyebrow">${rtl ? "کۆمەڵەی نوێی ٢٠٢٦" : "The 2026 collection"}</span><h1>${rtl ? "شتە سادەکان، بە جوانی دروستکراون." : "Everyday essentials, made beautifully."}</h1><p>${escapeHtml(truncate(prompt, 150))}</p><a class="primary-button" href="#shop">${rtl ? "ئێستا بازاڕ بکە" : "Shop the collection"} <span>→</span></a></div>
      <div class="product-spotlight"><span>New</span><div class="product-shape"></div><strong>Form 01</strong><small>Designed for daily rituals</small></div>
    </section>
    <section class="shop-section" id="shop">
      <div class="section-heading"><span>01</span><h2>${rtl ? "هەڵبژێردراوەکان" : "Featured pieces"}</h2></div>
      <div class="product-grid">
        ${[
          ["Arc Lamp", "$128", "one"],
          ["Soft Form", "$84", "two"],
          ["Daily Set", "$96", "three"],
        ].map(([product, price, shape]) => `<article><div class="product-image ${shape}"><span>New</span><i></i></div><div><h3>${product}</h3><span>${price}</span></div><button class="add-cart" data-product="${product}">${rtl ? "زیادکردن بۆ سەبەتە" : "Add to cart"}</button></article>`).join("")}
      </div>
    </section>
    <section class="store-story" id="story"><span>02 / Our philosophy</span><h2>${rtl ? "کەمتر، بەڵام باشتر." : "Fewer things. Better made."}</h2><p>${rtl ? "هەر بەرهەمێک بە وردی هەڵدەبژێرین بۆ ئەوەی ساڵانێکی زۆر لەگەڵت بێت." : "We select every piece for its function, material and ability to stay useful for years."}</p></section>
  </main>
  <footer id="contact"><span>© 2026 ${escapeHtml(name)}</span><span>Secure checkout · Easy returns</span></footer>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`;
}

function mobileMarkup(name: string, prompt: string, rtl: boolean) {
  return `<main class="mobile-demo">
  <section class="mobile-copy">
    <a class="brand" href="#"><span>✦</span>${escapeHtml(name)}</a>
    <span class="eyebrow">${rtl ? "پرۆتۆتایپی ئەپی مۆبایل" : "Mobile app prototype"}</span>
    <h1>${rtl ? "ڕۆژەکەت، بە شێوەیەکی سادەتر." : "Your day, in a calmer rhythm."}</h1>
    <p>${escapeHtml(truncate(prompt, 170))}</p>
    <div class="button-row"><button class="primary-button" data-toast="Prototype link copied">Share prototype <span>↗</span></button><span class="prototype-note">Interactive browser prototype</span></div>
  </section>
  <section class="phone-wrap" aria-label="Interactive mobile app preview">
    <div class="phone-shell">
      <div class="phone-status"><span>9:41</span><span>● ◔ ▰</span></div>
      <div class="phone-content">
        <div class="phone-greeting"><div><small>${rtl ? "ڕۆژ باش" : "Good morning"}</small><h2>${rtl ? "ئامادەی دەستپێکردنیت؟" : "Ready to begin?"}</h2></div><i>SK</i></div>
        <article class="daily-card"><span>${rtl ? "پلانی ئەمڕۆ" : "Today’s plan"}</span><strong>07 <small>activities</small></strong><div><i style="width:68%"></i></div><p>68% complete · Keep going</p></article>
        <div class="phone-section-head"><h3>${rtl ? "چالاکییەکان" : "Your activities"}</h3><button>See all</button></div>
        <div class="activity-list">
          <button class="phone-activity active" data-phone-view="focus"><i>✦</i><span><b>Daily focus</b><small>20 minute session</small></span><strong>→</strong></button>
          <button class="phone-activity" data-phone-view="progress"><i>↗</i><span><b>Progress</b><small>View weekly insights</small></span><strong>→</strong></button>
          <button class="phone-activity" data-phone-view="library"><i>◇</i><span><b>Library</b><small>12 saved routines</small></span><strong>→</strong></button>
        </div>
      </div>
      <nav class="phone-tabs" aria-label="Mobile navigation"><button class="active" data-phone-tab="home">⌂<span>Home</span></button><button data-phone-tab="explore">⌕<span>Explore</span></button><button data-phone-tab="stats">▦<span>Stats</span></button><button data-phone-tab="profile">○<span>Profile</span></button></nav>
    </div>
  </section>
  <div class="toast-message" role="status" aria-live="polite"></div>
</main>`;
}

function otherMarkup(name: string, prompt: string, rtl: boolean) {
  return `<div class="site-frame concept-product">
  ${navigation(name, rtl)}
  <main>
    <section class="concept-hero">
      <span class="eyebrow">${rtl ? "بیرۆکەیەک، بێ سنوور" : "One idea, no template"}</span>
      <h1>${rtl ? "با شتێکی نوێ دروست بکەین." : "Let’s make something unexpected."}</h1>
      <p>${escapeHtml(truncate(prompt, 190))}</p>
      <div class="concept-actions"><button class="primary-button" data-toast="${rtl ? "بیرۆکەکەت تۆمار کرا." : "Your idea has been saved."}">${rtl ? "دەستپێکردن" : "Start exploring"} <span>↗</span></button><small>Interactive concept · v1.0</small></div>
    </section>
    <section class="idea-board">
      <article class="idea-card feature"><span>01</span><h2>${rtl ? "بیرۆکە" : "The idea"}</h2><p>${escapeHtml(truncate(prompt, 220))}</p><div class="idea-orbit"><i></i><i></i><i></i></div></article>
      <article class="idea-card"><span>02</span><h2>${rtl ? "ئەزموون" : "The experience"}</h2><p>${rtl ? "سادە، خێرا و گونجاو بۆ هەموو شاشەکان." : "Responsive, focused, and designed to invite interaction."}</p></article>
      <article class="idea-card"><span>03</span><h2>${rtl ? "هەنگاوی داهاتوو" : "Next step"}</h2><button data-toast="Next iteration unlocked">Unlock iteration →</button></article>
    </section>
  </main>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`;
}

function createStyles(prompt: string) {
  const palette = detectPalette(prompt);
  const light = /light|bright|white|سپێ|ڕووناک/u.test(prompt.toLowerCase());
  const background = light ? "#f4f2ed" : "#080a0f";
  const panel = light ? "#ffffff" : "#11141b";
  const panelSoft = light ? "#e9e7e1" : "#171a22";
  const text = light ? "#15161a" : "#f4f4f6";
  const muted = light ? "#60636d" : "#979ba7";
  const line = light ? "#d9d6ce" : "#292d37";
  return `:root {
  color-scheme: ${light ? "light" : "dark"};
  --bg: ${background};
  --panel: ${panel};
  --panel-soft: ${panelSoft};
  --text: ${text};
  --muted: ${muted};
  --line: ${line};
  --accent: ${palette.accent};
  --accent-2: ${palette.accent2};
  --glow: ${palette.glow};
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: var(--bg);
  color: var(--text);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { min-width: 320px; margin: 0; background: var(--bg); color: var(--text); }
button, input { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
button:focus-visible, a:focus-visible, input:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
a { color: inherit; text-decoration: none; }
.site-frame { min-height: 100vh; overflow: hidden; background: radial-gradient(circle at 72% 9%, var(--glow), transparent 31%), var(--bg); }
.site-nav { width: min(1180px, calc(100% - 40px)); height: 76px; display: flex; align-items: center; gap: 34px; margin: 0 auto; border-bottom: 1px solid var(--line); }
.brand { display: inline-flex; align-items: center; gap: 9px; color: var(--text); font-size: 17px; font-weight: 800; letter-spacing: -.045em; }
.brand > span { width: 28px; height: 28px; display: grid; place-items: center; border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent); border-radius: 9px; background: color-mix(in srgb, var(--accent) 18%, var(--panel)); color: var(--accent); }
.nav-links { display: flex; align-items: center; gap: 27px; margin-left: auto; }
[dir="rtl"] .nav-links { margin-right: auto; margin-left: 0; }
.nav-links a { color: var(--muted); font-size: 13px; transition: color .2s ease; }
.nav-links a:hover { color: var(--text); }
.menu-button { display: none; margin-left: auto; border: 0; background: transparent; color: var(--text); font-size: 22px; }
.hero-section { width: min(1180px, calc(100% - 40px)); min-height: 670px; display: grid; grid-template-columns: 1.15fr .85fr; align-items: center; gap: 60px; margin: 0 auto; padding: 72px 0 90px; }
.eyebrow { color: var(--accent); font-size: 11px; font-weight: 750; letter-spacing: .14em; text-transform: uppercase; }
.hero-copy h1, .concept-hero h1, .mobile-copy h1 { max-width: 760px; margin: 19px 0 23px; font-size: clamp(45px, 6.3vw, 88px); line-height: .97; letter-spacing: -.065em; }
.hero-copy > p, .concept-hero > p, .mobile-copy > p { max-width: 610px; margin: 0; color: var(--muted); font-size: 17px; line-height: 1.7; }
.button-row { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 31px; }
.primary-button, .secondary-button { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 24px; padding: 0 19px; border: 0; border-radius: 999px; cursor: pointer; }
.primary-button { background: var(--text); color: var(--bg); font-weight: 760; box-shadow: 0 13px 35px color-mix(in srgb, var(--accent) 20%, transparent); transition: transform .2s ease, box-shadow .2s ease; }
.primary-button:hover { transform: translateY(-2px); box-shadow: 0 18px 42px color-mix(in srgb, var(--accent) 30%, transparent); }
.secondary-button { border: 1px solid var(--line); color: var(--muted); }
.brief-note { max-width: 570px !important; margin-top: 29px !important; padding-left: 14px; border-left: 2px solid var(--accent); color: var(--muted) !important; font-size: 12px !important; }
[dir="rtl"] .brief-note { padding-right: 14px; padding-left: 0; border-right: 2px solid var(--accent); border-left: 0; }
.hero-visual { position: relative; min-height: 460px; }
.visual-card { position: absolute; overflow: hidden; border: 1px solid color-mix(in srgb, var(--line) 88%, white 12%); background: linear-gradient(145deg, var(--panel-soft), var(--panel)); box-shadow: 0 28px 100px #00000050; }
.visual-card-main { inset: 10px 0 30px 35px; padding: 28px; border-radius: 40px 9px 40px 9px; transform: rotate(2deg); }
.visual-label { position: relative; z-index: 2; color: var(--muted); font-size: 10px; letter-spacing: .13em; text-transform: uppercase; }
.visual-card-main strong { position: absolute; bottom: 38px; left: 30px; z-index: 2; font-size: clamp(35px, 5vw, 64px); line-height: .9; letter-spacing: -.06em; }
.visual-orb { position: absolute; top: 45px; right: -70px; width: 330px; height: 330px; border-radius: 50%; background: radial-gradient(circle at 32% 30%, #ffffffb8, var(--accent) 24%, var(--accent-2) 62%, #160f32 100%); box-shadow: 0 0 90px var(--glow); }
.visual-card-small { right: -20px; bottom: 0; width: 190px; display: flex; align-items: center; gap: 11px; padding: 17px; border-radius: 15px; transform: rotate(-4deg); color: var(--muted); font-size: 11px; }
.visual-card-small i { width: 30px; height: 30px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 25px var(--glow); }
.feature-section, .work-section, .closing-cta, .shop-section, .store-story { width: min(1180px, calc(100% - 40px)); margin: 0 auto; padding: 90px 0; border-top: 1px solid var(--line); }
.section-heading { display: grid; grid-template-columns: 80px 1fr; align-items: start; margin-bottom: 45px; }
.section-heading span { color: var(--accent); font-size: 11px; }
.section-heading h2 { max-width: 640px; margin: 0; font-size: clamp(32px, 5vw, 62px); line-height: 1; letter-spacing: -.055em; }
.feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-left: 80px; }
[dir="rtl"] .feature-grid { margin-right: 80px; margin-left: 0; }
.feature-grid article { min-height: 225px; padding: 25px; border: 1px solid var(--line); border-radius: 18px; background: color-mix(in srgb, var(--panel) 86%, transparent); }
.feature-grid article > span { width: 39px; height: 39px; display: grid; place-items: center; border-radius: 12px; background: color-mix(in srgb, var(--accent) 15%, var(--panel)); color: var(--accent); }
.feature-grid h3 { margin: 52px 0 10px; font-size: 19px; }
.feature-grid p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.6; }
.work-section { display: grid; grid-template-columns: 1.45fr .75fr; gap: 14px; }
.work-card { min-height: 370px; position: relative; overflow: hidden; padding: 28px; border: 1px solid var(--line); border-radius: 20px; background: var(--panel); }
.work-card.large { background: linear-gradient(145deg, color-mix(in srgb, var(--accent) 22%, var(--panel)), var(--panel)); }
.work-card span { color: var(--muted); font-size: 11px; }
.work-card h3 { position: relative; z-index: 2; max-width: 380px; margin: 25px 0; font-size: clamp(28px, 4vw, 52px); line-height: 1; letter-spacing: -.05em; }
.work-card p { color: var(--muted); line-height: 1.7; }
.work-card i { position: absolute; right: -70px; bottom: -110px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle at 34% 30%, white, var(--accent) 16%, var(--accent-2) 55%, transparent 57%); filter: drop-shadow(0 0 30px var(--glow)); }
.closing-cta { min-height: 480px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.closing-cta > span { color: var(--accent); font-size: 11px; letter-spacing: .13em; text-transform: uppercase; }
.closing-cta h2 { max-width: 780px; margin: 22px 0 34px; font-size: clamp(38px, 6vw, 72px); line-height: 1; letter-spacing: -.06em; }
footer { width: min(1180px, calc(100% - 40px)); min-height: 80px; display: flex; align-items: center; justify-content: space-between; gap: 20px; margin: 0 auto; border-top: 1px solid var(--line); color: var(--muted); font-size: 11px; }

.product-shell { min-height: 100vh; display: grid; grid-template-columns: 230px 1fr; background: radial-gradient(circle at 65% -20%, var(--glow), transparent 28%), var(--bg); }
.product-sidebar { min-height: 100vh; display: flex; flex-direction: column; padding: 25px 16px 18px; border-right: 1px solid var(--line); background: color-mix(in srgb, var(--panel) 82%, transparent); }
[dir="rtl"] .product-sidebar { border-right: 0; border-left: 1px solid var(--line); }
.product-sidebar .brand { margin: 0 8px 44px; }
.product-sidebar nav { display: grid; gap: 6px; }
.product-sidebar nav button { width: 100%; min-height: 42px; display: flex; align-items: center; gap: 12px; padding: 0 13px; border: 0; border-radius: 10px; background: transparent; color: var(--muted); text-align: left; cursor: pointer; }
.product-sidebar nav button.active, .product-sidebar nav button:hover { background: color-mix(in srgb, var(--accent) 12%, var(--panel)); color: var(--text); }
.product-sidebar nav button span { width: 20px; color: var(--accent); }
.account-chip { display: flex; align-items: center; gap: 10px; margin-top: auto; padding: 11px; border: 1px solid var(--line); border-radius: 12px; }
.account-chip > i, .phone-greeting > i { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 9px; background: var(--accent); color: #fff; font-size: 10px; font-style: normal; font-weight: 800; }
.account-chip div { display: grid; gap: 2px; }
.account-chip b { font-size: 11px; }.account-chip small { color: var(--muted); font-size: 9px; }
.product-main { min-width: 0; padding: 32px clamp(20px, 4vw, 58px) 48px; }
.product-head { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.product-head h1 { margin: 7px 0 0; font-size: clamp(28px, 4vw, 45px); letter-spacing: -.05em; }
.product-head .primary-button { min-height: 41px; }
.brief-banner { display: flex; gap: 9px; margin: 27px 0 18px; padding: 12px 14px; border: 1px solid color-mix(in srgb, var(--accent) 25%, var(--line)); border-radius: 11px; background: color-mix(in srgb, var(--accent) 7%, var(--panel)); color: var(--muted); font-size: 11px; line-height: 1.5; }
.brief-banner span { color: var(--accent); }
.metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px; }
.metric-grid.four { grid-template-columns: repeat(4, 1fr); }
.metric-grid article { min-width: 0; display: grid; gap: 8px; padding: 19px; border: 1px solid var(--line); border-radius: 15px; background: var(--panel); }
.metric-grid article > span { color: var(--muted); font-size: 10px; }.metric-grid strong { font-size: clamp(24px, 3vw, 38px); letter-spacing: -.04em; }.metric-grid small { color: #4dcc91; font-size: 9px; }
.app-grid, .dashboard-grid { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(220px, .75fr); gap: 13px; margin-top: 13px; }
.task-board, .progress-card, .chart-card, .source-card, .table-card { padding: 20px; border: 1px solid var(--line); border-radius: 15px; background: var(--panel); }
.card-head { min-height: 28px; display: flex; align-items: flex-start; justify-content: space-between; gap: 15px; }
.card-head h2 { margin: 0; font-size: 14px; }.card-head span, .card-head small { color: var(--muted); font-size: 9px; }
.task-row { display: grid; grid-template-columns: 18px 1fr auto; align-items: center; gap: 9px; padding: 16px 2px; border-bottom: 1px solid var(--line); cursor: pointer; }
.task-row input { accent-color: var(--accent); }.task-row span { display: grid; gap: 4px; }.task-row b { font-size: 11px; }.task-row small { color: var(--muted); font-size: 9px; }.task-row > i { padding: 4px 6px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 10%, var(--panel)); color: var(--accent); font-size: 8px; font-style: normal; }
.task-row:has(input:checked) b { color: var(--muted); text-decoration: line-through; }
.progress-card { display: flex; flex-direction: column; align-items: center; }
.progress-card .card-head { width: 100%; }.progress-ring, .donut { width: 135px; height: 135px; display: grid; place-items: center; margin: 26px auto 15px; border-radius: 50%; background: conic-gradient(var(--accent) 0 72%, var(--panel-soft) 72%); }
.progress-ring::before, .donut::before { content: ""; grid-area: 1/1; width: 105px; height: 105px; border-radius: 50%; background: var(--panel); }
.progress-ring strong, .donut strong { z-index: 1; grid-area: 1/1; font-size: 30px; }.progress-ring small, .donut small { font-size: 10px; }.progress-card > p { color: var(--muted); font-size: 10px; }
.avatar-row { display: flex; margin-top: 14px; }.avatar-row i { width: 27px; height: 27px; display: grid; place-items: center; margin-left: -5px; border: 2px solid var(--panel); border-radius: 50%; background: var(--panel-soft); color: var(--muted); font-size: 7px; font-style: normal; }
.date-button, .table-card button { padding: 9px 12px; border: 1px solid var(--line); border-radius: 9px; background: var(--panel); color: var(--muted); cursor: pointer; }
.bar-chart { height: 235px; display: flex; align-items: end; gap: clamp(10px, 3vw, 25px); padding: 35px 8px 0; border-bottom: 1px solid var(--line); }
.bar-chart div { height: 100%; flex: 1; display: flex; flex-direction: column; justify-content: end; align-items: center; gap: 8px; }
.bar-chart i { width: 100%; max-width: 35px; border-radius: 7px 7px 2px 2px; background: linear-gradient(var(--accent), var(--accent-2)); box-shadow: 0 0 17px var(--glow); }
.bar-chart span { color: var(--muted); font-size: 8px; }
.donut { background: conic-gradient(var(--accent) 0 48%, var(--accent-2) 48% 79%, #54515f 79%); }.donut strong { display: grid; text-align: center; }.donut strong small { color: var(--muted); font-weight: 400; }
.source-card ul { display: grid; gap: 8px; padding: 0; list-style: none; }.source-card li { display: grid; grid-template-columns: 8px 1fr auto; gap: 7px; color: var(--muted); font-size: 9px; }.source-card li i { border-radius: 50%; background: var(--accent); }.source-card li:nth-child(2) i { background: var(--accent-2); }.source-card li:nth-child(3) i { background: #54515f; }.source-card li b { color: var(--text); }
.table-card { margin-top: 13px; }.data-table { overflow-x: auto; }.table-row { min-width: 560px; display: grid; grid-template-columns: 1.2fr 1fr .7fr .45fr; align-items: center; padding: 13px 4px; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 10px; }.table-title { color: var(--muted); font-size: 8px; text-transform: uppercase; }.customer-icon { width: 25px; height: 25px; display: inline-grid; place-items: center; margin-right: 6px; border-radius: 7px; background: var(--panel-soft); color: var(--accent); font-size: 7px; font-style: normal; }.status { padding: 4px 7px; border-radius: 999px; font-size: 8px; }.status.paid { background: #35c98418; color: #4dd495; }.status.pending { background: #ffb54a18; color: #e9aa4d; }

.store-nav .cart-button { min-height: 36px; padding: 0 12px; border: 1px solid var(--line); border-radius: 999px; background: var(--panel); color: var(--text); cursor: pointer; }.cart-button span { display: inline-grid; place-items: center; min-width: 19px; height: 19px; margin-left: 6px; border-radius: 50%; background: var(--accent); color: #fff; font-size: 9px; }
.store-hero { width: min(1180px, calc(100% - 40px)); min-height: 620px; display: grid; grid-template-columns: 1fr .8fr; align-items: center; gap: 65px; margin: 0 auto; padding: 65px 0; }.store-hero h1 { max-width: 650px; margin: 20px 0; font-size: clamp(45px, 6vw, 80px); line-height: .96; letter-spacing: -.065em; }.store-hero p { max-width: 550px; margin: 0 0 30px; color: var(--muted); line-height: 1.7; }.product-spotlight { min-height: 460px; position: relative; display: flex; flex-direction: column; justify-content: end; overflow: hidden; padding: 28px; border: 1px solid var(--line); border-radius: 240px 240px 25px 25px; background: linear-gradient(150deg, color-mix(in srgb, var(--accent) 18%, var(--panel)), var(--panel)); }.product-spotlight > span { position: absolute; top: 35px; right: 35px; z-index: 2; padding: 5px 8px; border-radius: 999px; background: var(--text); color: var(--bg); font-size: 8px; }.product-shape { position: absolute; top: 70px; left: 50%; width: 190px; height: 260px; border-radius: 46% 46% 29% 29%; background: linear-gradient(130deg, #ffffff, var(--accent) 48%, var(--accent-2)); box-shadow: 0 30px 90px var(--glow); transform: translateX(-50%) rotate(6deg); }.product-spotlight strong, .product-spotlight small { position: relative; z-index: 2; }.product-spotlight strong { font-size: 24px; }.product-spotlight small { margin-top: 5px; color: var(--muted); }
.product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }.product-grid article { padding: 10px 10px 14px; border: 1px solid var(--line); border-radius: 17px; background: var(--panel); }.product-image { height: 280px; position: relative; display: grid; place-items: center; overflow: hidden; border-radius: 11px; background: var(--panel-soft); }.product-image > span { position: absolute; top: 12px; left: 12px; z-index: 2; color: var(--muted); font-size: 8px; text-transform: uppercase; }.product-image i { width: 115px; height: 160px; border-radius: 50% 50% 20% 20%; background: linear-gradient(140deg, white, var(--accent) 58%, var(--accent-2)); box-shadow: 0 24px 55px var(--glow); transform: rotate(7deg); }.product-image.two i { width: 150px; height: 150px; border-radius: 50%; transform: none; }.product-image.three i { width: 140px; height: 170px; border-radius: 15px 60px 15px 60px; transform: rotate(-7deg); }.product-grid article > div:nth-child(2) { display: flex; justify-content: space-between; padding: 15px 3px 10px; }.product-grid h3 { margin: 0; font-size: 14px; }.product-grid article > div span { color: var(--muted); font-size: 11px; }.add-cart { width: 100%; min-height: 38px; border: 1px solid var(--line); border-radius: 9px; background: transparent; color: var(--text); cursor: pointer; }.add-cart:hover { border-color: var(--accent); color: var(--accent); }.store-story { text-align: center; }.store-story > span { color: var(--accent); font-size: 10px; letter-spacing: .13em; }.store-story h2 { margin: 25px 0 17px; font-size: clamp(38px, 6vw, 75px); letter-spacing: -.06em; }.store-story p { max-width: 620px; margin: 0 auto; color: var(--muted); line-height: 1.7; }

.mobile-demo { min-height: 100vh; display: grid; grid-template-columns: 1fr .85fr; align-items: center; gap: 70px; overflow: hidden; padding: 60px max(24px, calc((100vw - 1100px) / 2)); background: radial-gradient(circle at 70% 35%, var(--glow), transparent 30%), var(--bg); }.mobile-copy .brand { margin-bottom: 95px; }.mobile-copy h1 { font-size: clamp(45px, 6vw, 78px); }.prototype-note { color: var(--muted); font-size: 10px; }.phone-wrap { display: grid; place-items: center; perspective: 900px; }.phone-shell { width: min(345px, 85vw); height: 690px; display: grid; grid-template-rows: 32px 1fr 65px; overflow: hidden; border: 7px solid color-mix(in srgb, var(--text) 18%, var(--panel)); border-radius: 43px; background: var(--panel); box-shadow: 0 45px 120px #0008, 0 0 75px var(--glow); transform: rotateY(-5deg) rotateX(2deg); }.phone-status { display: flex; align-items: center; justify-content: space-between; padding: 4px 20px 0; font-size: 8px; font-weight: 700; }.phone-content { overflow: auto; padding: 18px 18px 10px; }.phone-greeting { display: flex; align-items: center; justify-content: space-between; }.phone-greeting small { color: var(--muted); font-size: 9px; }.phone-greeting h2 { margin: 4px 0 0; font-size: 19px; letter-spacing: -.04em; }.daily-card { margin-top: 21px; padding: 18px; border-radius: 21px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #fff; box-shadow: 0 20px 45px var(--glow); }.daily-card > span { font-size: 9px; opacity: .8; }.daily-card strong { display: block; margin: 12px 0 17px; font-size: 42px; letter-spacing: -.05em; }.daily-card strong small { font-size: 10px; font-weight: 500; letter-spacing: 0; }.daily-card > div { height: 4px; overflow: hidden; border-radius: 99px; background: #ffffff38; }.daily-card > div i { display: block; height: 100%; border-radius: inherit; background: white; }.daily-card p { margin: 8px 0 0; font-size: 8px; opacity: .78; }.phone-section-head { display: flex; align-items: center; justify-content: space-between; margin-top: 22px; }.phone-section-head h3 { margin: 0; font-size: 12px; }.phone-section-head button { border: 0; background: transparent; color: var(--accent); font-size: 8px; }.activity-list { display: grid; gap: 7px; margin-top: 10px; }.phone-activity { display: grid; grid-template-columns: 35px 1fr auto; align-items: center; gap: 10px; padding: 10px; border: 1px solid var(--line); border-radius: 13px; background: var(--panel-soft); color: var(--text); text-align: left; cursor: pointer; }.phone-activity > i { width: 35px; height: 35px; display: grid; place-items: center; border-radius: 11px; background: color-mix(in srgb, var(--accent) 16%, var(--panel)); color: var(--accent); font-style: normal; }.phone-activity > span { display: grid; gap: 3px; }.phone-activity b { font-size: 10px; }.phone-activity small { color: var(--muted); font-size: 7px; }.phone-activity > strong { color: var(--muted); }.phone-activity.active { border-color: color-mix(in srgb, var(--accent) 50%, var(--line)); }.phone-tabs { display: grid; grid-template-columns: repeat(4, 1fr); align-items: center; border-top: 1px solid var(--line); }.phone-tabs button { display: grid; place-items: center; gap: 3px; border: 0; background: transparent; color: var(--muted); cursor: pointer; }.phone-tabs button span { font-size: 7px; }.phone-tabs button.active { color: var(--accent); }

.concept-product { background: radial-gradient(circle at 50% 28%, var(--glow), transparent 32%), var(--bg); }.concept-hero { width: min(1180px, calc(100% - 40px)); min-height: 520px; display: flex; flex-direction: column; justify-content: center; margin: 0 auto; padding: 70px 0; text-align: center; }.concept-hero h1, .concept-hero > p { margin-right: auto; margin-left: auto; }.concept-actions { display: flex; align-items: center; justify-content: center; gap: 17px; margin-top: 32px; }.concept-actions small { color: var(--muted); }.idea-board { width: min(1180px, calc(100% - 40px)); display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 13px; margin: 0 auto; padding-bottom: 90px; }.idea-card { min-height: 290px; position: relative; overflow: hidden; padding: 25px; border: 1px solid var(--line); border-radius: 18px; background: var(--panel); }.idea-card > span { color: var(--accent); font-size: 9px; }.idea-card h2 { margin: 65px 0 14px; font-size: 28px; letter-spacing: -.045em; }.idea-card p { position: relative; z-index: 2; color: var(--muted); font-size: 12px; line-height: 1.65; }.idea-card button { margin-top: 35px; border: 0; background: transparent; color: var(--accent); cursor: pointer; }.idea-card.feature { background: linear-gradient(140deg, color-mix(in srgb, var(--accent) 16%, var(--panel)), var(--panel)); }.idea-orbit { position: absolute; right: -75px; bottom: -95px; width: 250px; height: 250px; border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent); border-radius: 50%; }.idea-orbit i { position: absolute; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 30px var(--glow); }.idea-orbit i:nth-child(1) { top: 20px; left: 55px; }.idea-orbit i:nth-child(2) { top: 105px; left: -8px; transform: scale(.55); }.idea-orbit i:nth-child(3) { right: 25px; bottom: 38px; transform: scale(.75); }

.toast-message { position: fixed; right: 18px; bottom: 18px; z-index: 20; max-width: min(330px, calc(100% - 36px)); padding: 12px 15px; border: 1px solid color-mix(in srgb, var(--accent) 35%, var(--line)); border-radius: 11px; background: var(--panel); color: var(--text); font-size: 11px; box-shadow: 0 18px 50px #0007; opacity: 0; transform: translateY(12px); pointer-events: none; transition: opacity .2s ease, transform .2s ease; }.toast-message.show { opacity: 1; transform: translateY(0); }

@media (max-width: 850px) {
  .site-nav { height: 65px; }
  .menu-button { display: block; }
  .site-nav .nav-links { position: absolute; top: 65px; right: 20px; z-index: 10; min-width: 180px; display: none; flex-direction: column; align-items: stretch; gap: 0; padding: 8px; border: 1px solid var(--line); border-radius: 12px; background: var(--panel); box-shadow: 0 20px 50px #0007; }
  .site-nav .nav-links.open { display: flex; }.site-nav .nav-links a { padding: 10px; }
  .hero-section, .store-hero, .mobile-demo { grid-template-columns: 1fr; }
  .hero-section { padding-top: 55px; }.hero-visual { min-height: 420px; }
  .feature-grid { grid-template-columns: 1fr; margin-left: 0; }[dir="rtl"] .feature-grid { margin-right: 0; }
  .work-section { grid-template-columns: 1fr; }
  .product-shell { grid-template-columns: 70px 1fr; }.product-sidebar { padding: 20px 10px; }.product-sidebar .brand { margin: 0 auto 42px; font-size: 0; }.product-sidebar nav button { justify-content: center; padding: 0; font-size: 0; }.product-sidebar nav button span { width: auto; font-size: 17px; }.account-chip { justify-content: center; padding: 8px; }.account-chip div { display: none; }
  .metric-grid.four { grid-template-columns: repeat(2, 1fr); }
  .app-grid, .dashboard-grid { grid-template-columns: 1fr; }
  .product-grid, .idea-board { grid-template-columns: 1fr; }
  .mobile-demo { padding-top: 45px; }.mobile-copy .brand { margin-bottom: 60px; }.phone-shell { transform: none; }
}

@media (max-width: 560px) {
  .site-nav, .hero-section, .feature-section, .work-section, .closing-cta, .shop-section, .store-story, .store-hero, .concept-hero, .idea-board, footer { width: min(100% - 28px, 1180px); }
  .hero-copy h1, .concept-hero h1, .mobile-copy h1, .store-hero h1 { font-size: 42px; }
  .visual-card-main { left: 0; }.visual-orb { right: -100px; }.visual-card-small { right: 0; }
  .section-heading { grid-template-columns: 42px 1fr; }.feature-section, .work-section, .closing-cta, .shop-section, .store-story { padding: 65px 0; }
  .product-main { padding: 22px 12px 38px; }.product-head { align-items: flex-start; }.product-head .primary-button { width: 38px; overflow: hidden; padding: 0; font-size: 0; }.product-head .primary-button::first-letter { font-size: 18px; }
  .metric-grid { grid-template-columns: 1fr 1fr; }.metric-grid article { padding: 14px; }.metric-grid strong { font-size: 23px; }
  .bar-chart { gap: 8px; }.table-card { padding: 14px; }
  .store-nav .nav-links + .cart-button { margin-left: auto; }.product-spotlight { min-height: 390px; }
  .product-image { height: 230px; }.mobile-demo { padding-right: 14px; padding-left: 14px; }.phone-shell { height: 660px; }
  footer { align-items: flex-start; flex-direction: column; justify-content: center; }
}
`;
}

function createScript(rtl: boolean) {
  return `const toast = document.querySelector('.toast-message');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('[data-toast]').forEach((button) => {
  button.addEventListener('click', () => showToast(button.getAttribute('data-toast') || 'Done'));
});

let cartItems = 0;
document.querySelectorAll('.add-cart').forEach((button) => {
  button.addEventListener('click', () => {
    cartItems += 1;
    const count = document.querySelector('#cartCount');
    if (count) count.textContent = String(cartItems);
    showToast((button.getAttribute('data-product') || 'Item') + ${rtl ? "' زیاد کرا بۆ سەبەتە'" : "' added to cart'"});
  });
});

document.querySelectorAll('.product-sidebar nav button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.product-sidebar nav button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

document.querySelectorAll('[data-phone-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-phone-tab]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    showToast((button.textContent || '').trim() + ' opened');
  });
});

document.querySelectorAll('[data-phone-view]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-phone-view]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

const newTaskButton = document.querySelector('#newTaskButton');
newTaskButton?.addEventListener('click', () => {
  const taskList = document.querySelector('#taskList');
  if (!taskList) return;
  const label = document.createElement('label');
  label.className = 'task-row';
  label.innerHTML = '<input type="checkbox" /><span><b>New project task</b><small>Just added · Today</small></span><i>New</i>';
  taskList.append(label);
  showToast(${rtl ? "'ئەرکێکی نوێ زیاد کرا'" : "'New task added'"});
});`;
}

export function generateLocalProject(
  category: ProjectCategory,
  prompt: string,
): GeneratedProject {
  const direction = detectDirection(prompt);
  const rtl = direction === "rtl";
  const domain = detectDomain(prompt);
  const name = domain.name;
  const htmlByCategory: Record<ProjectCategory, string> = {
    website: websiteMarkup(name, prompt, rtl),
    "web-app": webAppMarkup(name, prompt, rtl),
    "mobile-app": mobileMarkup(name, prompt, rtl),
    dashboard: dashboardMarkup(name, prompt, rtl),
    store: storeMarkup(name, prompt, rtl),
    other: otherMarkup(name, prompt, rtl),
  };
  const slug = projectSlug(name, category);
  return {
    name: slug,
    summary: rtl
      ? `${categoryNames[category]} ـێکی responsive دروست کرا و هەموو فایل و preview ـەکە نوێ کرایەوە.`
      : `Built a responsive ${categoryNames[category].toLowerCase()} and refreshed every project file and the live preview.`,
    files: {
      "index.html": `<div dir="${direction}">\n${htmlByCategory[category]}\n</div>`,
      "styles.css": createStyles(prompt),
      "app.js": createScript(rtl),
      "package.json": JSON.stringify(
        {
          name: slug,
          version: "1.0.0",
          private: true,
          scripts: { dev: "vite", build: "vite build" },
          dependencies: { vite: "latest" },
        },
        null,
        2,
      ),
    },
  };
}

export function validateCloudProject(value: unknown): GeneratedProject {
  if (!value || typeof value !== "object") {
    throw new Error("The AI response was not a project.");
  }
  const candidate = value as {
    name?: unknown;
    summary?: unknown;
    files?: Partial<Record<FileName, unknown>>;
  };
  const requiredFiles: FileName[] = ["index.html", "styles.css", "app.js", "package.json"];
  if (!candidate.files || requiredFiles.some((name) => typeof candidate.files?.[name] !== "string")) {
    throw new Error("The AI response did not include all four project files.");
  }
  const files = Object.fromEntries(
    requiredFiles.map((name) => [name, String(candidate.files?.[name]).slice(0, 80000)]),
  ) as WorkspaceFiles;
  if (Object.values(files).join("").length > 220000) {
    throw new Error("The generated project was too large to preview safely.");
  }
  const cleanName =
    typeof candidate.name === "string"
      ? candidate.name.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 42)
      : "";
  return {
    name: cleanName || "skycode-project",
    summary:
      typeof candidate.summary === "string"
        ? truncate(candidate.summary, 280)
        : "Server Cloud AI generated a new project.",
    files,
  };
}

export function parseCloudResponse(content: string) {
  const withoutFence = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");
  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");
  if (start < 0 || end <= start) {
    throw new Error("The free model returned an incomplete project.");
  }
  return JSON.parse(withoutFence.slice(start, end + 1)) as unknown;
}
