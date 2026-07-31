import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { t as Link } from "./link-ZKziRYeH.js";
//#region app/workspace/project-generator.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var categoryOptions = [
	{
		id: "website",
		icon: "◇",
		title: "Website",
		description: "Landing pages, company sites, portfolios",
		example: "Create a modern restaurant website with online booking"
	},
	{
		id: "web-app",
		icon: "⌘",
		title: "Web app",
		description: "Interactive tools, SaaS, portals",
		example: "Build a task manager for a small creative team"
	},
	{
		id: "mobile-app",
		icon: "▯",
		title: "Mobile app",
		description: "Responsive app prototypes for phones",
		example: "Design a mobile fitness app with daily workouts"
	},
	{
		id: "dashboard",
		icon: "▦",
		title: "Dashboard",
		description: "Analytics, admin, finance panels",
		example: "Make a sales dashboard with metrics and recent orders"
	},
	{
		id: "store",
		icon: "▱",
		title: "Online store",
		description: "Products, carts, offers, checkout UI",
		example: "Create a premium skincare shop with a working cart"
	},
	{
		id: "other",
		icon: "✦",
		title: "Something else",
		description: "Describe any browser-based idea",
		example: "Create an interactive event invitation with an RSVP form"
	}
];
var categoryNames = {
	website: "Website",
	"web-app": "Web app",
	"mobile-app": "Mobile app",
	dashboard: "Dashboard",
	store: "Online store",
	other: "Digital experience"
};
function escapeHtml(value) {
	return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
}
function truncate(value, length) {
	const clean = value.replace(/\s+/g, " ").trim();
	return clean.length > length ? `${clean.slice(0, length - 1).trim()}…` : clean;
}
function detectDirection(prompt) {
	return /[\u0600-\u06ff]/u.test(prompt) ? "rtl" : "ltr";
}
function detectDomain(prompt) {
	const normalized = prompt.toLowerCase();
	return [
		{
			pattern: /restaurant|cafe|coffee|food|چێشت|خواردن|قاوە/u,
			name: "Savor",
			noun: "hospitality"
		},
		{
			pattern: /finance|bank|money|crypto|پارە|بانک|دارایی/u,
			name: "Ledger",
			noun: "finance"
		},
		{
			pattern: /fitness|gym|health|workout|وەرزش|تەندروستی/u,
			name: "Pulse",
			noun: "wellness"
		},
		{
			pattern: /school|learn|course|education|فێر|قوتاب|خوێندن/u,
			name: "Learnly",
			noun: "education"
		},
		{
			pattern: /house|home|real estate|property|خانوو|موڵک/u,
			name: "Haven",
			noun: "real estate"
		},
		{
			pattern: /travel|hotel|trip|گەشت|هوتێل/u,
			name: "Roam",
			noun: "travel"
		},
		{
			pattern: /beauty|skin|salon|cosmetic|جوانکاری|پێست/u,
			name: "Aura",
			noun: "beauty"
		},
		{
			pattern: /music|audio|podcast|گۆرانی|مۆسیقا/u,
			name: "Echo",
			noun: "audio"
		},
		{
			pattern: /code|developer|software|tech|کۆد|تکنەلۆژیا/u,
			name: "Nexa",
			noun: "technology"
		}
	].find((domain) => domain.pattern.test(normalized)) ?? {
		name: "Northstar",
		noun: "modern business"
	};
}
function detectPalette(prompt) {
	const normalized = prompt.toLowerCase();
	if (/green|emerald|nature|سەوز/u.test(normalized)) return {
		accent: "#36d399",
		accent2: "#0ea56d",
		glow: "#36d39935"
	};
	if (/blue|ocean|sky|شین/u.test(normalized)) return {
		accent: "#52a8ff",
		accent2: "#2864e8",
		glow: "#438dff38"
	};
	if (/orange|gold|warm|پرتەقاڵی|زێڕین/u.test(normalized)) return {
		accent: "#ffad57",
		accent2: "#e36b2c",
		glow: "#ff914138"
	};
	if (/pink|rose|پەمەیی|گوڵی/u.test(normalized)) return {
		accent: "#ff79b7",
		accent2: "#c94998",
		glow: "#f05cb13a"
	};
	return {
		accent: "#9b87ff",
		accent2: "#6c4de6",
		glow: "#795dff40"
	};
}
function projectSlug(name, category) {
	return name.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 42) || `sky-${category}`;
}
function navigation(name, rtl) {
	const links = rtl ? [
		["#features", "تایبەتمەندییەکان"],
		["#work", "کارەکان"],
		["#contact", "پەیوەندی"]
	] : [
		["#features", "Features"],
		["#work", "Work"],
		["#contact", "Contact"]
	];
	return `<header class="site-nav">
  <a class="brand" href="#" aria-label="${escapeHtml(name)} home"><span>✦</span>${escapeHtml(name)}</a>
  <button class="menu-button" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
  <nav class="nav-links" aria-label="Main navigation">
    ${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join("\n    ")}
  </nav>
</header>`;
}
function websiteMarkup(name, prompt, rtl) {
	const copy = rtl ? {
		eyebrow: "دیزاینی زیرەک، ئەنجامی ڕاستەقینە",
		heading: `${name} بیرۆکەکان دەگۆڕێت بۆ ئەزموونێکی ناوازە.`,
		body: "وێبسایتێکی خێرا، جوان و گونجاو بۆ هەموو ئامێرەکان؛ دروستکراوە لەسەر داواکارییەکەت.",
		primary: "دەست پێ بکە",
		secondary: "بینینی کارەکان",
		section: "هەموو شتێک بۆ گەشەکردن",
		cta: "ئامادەیت بیرۆکەکەت ببێتە ڕاستی؟"
	} : {
		eyebrow: "Thoughtful design, real outcomes",
		heading: `${name} turns bold ideas into memorable digital experiences.`,
		body: "A fast, accessible and responsive website shaped around your brief and ready for your next iteration.",
		primary: "Start a project",
		secondary: "Explore our work",
		section: "Everything you need to grow",
		cta: "Ready to turn your idea into something real?"
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
function webAppMarkup(name, prompt, rtl) {
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
function dashboardMarkup(name, prompt, rtl) {
	const monthLabels = rtl ? [
		"ش",
		"ی",
		"د",
		"س",
		"چ",
		"پ",
		"ه"
	] : [
		"M",
		"T",
		"W",
		"T",
		"F",
		"S",
		"S"
	];
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
          ${[
		48,
		64,
		43,
		78,
		69,
		92,
		81
	].map((height, index) => `<div><i style="height:${height}%"></i><span>${monthLabels[index]}</span></div>`).join("")}
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
function storeMarkup(name, prompt, rtl) {
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
		[
			"Arc Lamp",
			"$128",
			"one"
		],
		[
			"Soft Form",
			"$84",
			"two"
		],
		[
			"Daily Set",
			"$96",
			"three"
		]
	].map(([product, price, shape]) => `<article><div class="product-image ${shape}"><span>New</span><i></i></div><div><h3>${product}</h3><span>${price}</span></div><button class="add-cart" data-product="${product}">${rtl ? "زیادکردن بۆ سەبەتە" : "Add to cart"}</button></article>`).join("")}
      </div>
    </section>
    <section class="store-story" id="story"><span>02 / Our philosophy</span><h2>${rtl ? "کەمتر، بەڵام باشتر." : "Fewer things. Better made."}</h2><p>${rtl ? "هەر بەرهەمێک بە وردی هەڵدەبژێرین بۆ ئەوەی ساڵانێکی زۆر لەگەڵت بێت." : "We select every piece for its function, material and ability to stay useful for years."}</p></section>
  </main>
  <footer id="contact"><span>© 2026 ${escapeHtml(name)}</span><span>Secure checkout · Easy returns</span></footer>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`;
}
function mobileMarkup(name, prompt, rtl) {
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
function otherMarkup(name, prompt, rtl) {
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
function createStyles(prompt) {
	const palette = detectPalette(prompt);
	const light = /light|bright|white|سپێ|ڕووناک/u.test(prompt.toLowerCase());
	return `:root {
  color-scheme: ${light ? "light" : "dark"};
  --bg: ${light ? "#f4f2ed" : "#080a0f"};
  --panel: ${light ? "#ffffff" : "#11141b"};
  --panel-soft: ${light ? "#e9e7e1" : "#171a22"};
  --text: ${light ? "#15161a" : "#f4f4f6"};
  --muted: ${light ? "#60636d" : "#979ba7"};
  --line: ${light ? "#d9d6ce" : "#292d37"};
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
function createScript(rtl) {
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
function generateLocalProject(category, prompt) {
	const direction = detectDirection(prompt);
	const rtl = direction === "rtl";
	const name = detectDomain(prompt).name;
	const htmlByCategory = {
		website: websiteMarkup(name, prompt, rtl),
		"web-app": webAppMarkup(name, prompt, rtl),
		"mobile-app": mobileMarkup(name, prompt, rtl),
		dashboard: dashboardMarkup(name, prompt, rtl),
		store: storeMarkup(name, prompt, rtl),
		other: otherMarkup(name, prompt, rtl)
	};
	const slug = projectSlug(name, category);
	return {
		name: slug,
		summary: rtl ? `${categoryNames[category]} ـێکی responsive دروست کرا و هەموو فایل و preview ـەکە نوێ کرایەوە.` : `Built a responsive ${categoryNames[category].toLowerCase()} and refreshed every project file and the live preview.`,
		files: {
			"index.html": `<div dir="${direction}">\n${htmlByCategory[category]}\n</div>`,
			"styles.css": createStyles(prompt),
			"app.js": createScript(rtl),
			"package.json": JSON.stringify({
				name: slug,
				version: "1.0.0",
				private: true,
				scripts: {
					dev: "vite",
					build: "vite build"
				},
				dependencies: { vite: "latest" }
			}, null, 2)
		}
	};
}
function validateCloudProject(value) {
	if (!value || typeof value !== "object") throw new Error("The AI response was not a project.");
	const candidate = value;
	const requiredFiles = [
		"index.html",
		"styles.css",
		"app.js",
		"package.json"
	];
	if (!candidate.files || requiredFiles.some((name) => typeof candidate.files?.[name] !== "string")) throw new Error("The AI response did not include all four project files.");
	const files = Object.fromEntries(requiredFiles.map((name) => [name, String(candidate.files?.[name]).slice(0, 8e4)]));
	if (Object.values(files).join("").length > 22e4) throw new Error("The generated project was too large to preview safely.");
	return {
		name: (typeof candidate.name === "string" ? candidate.name.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 42) : "") || "skycode-project",
		summary: typeof candidate.summary === "string" ? truncate(candidate.summary, 280) : "Server Cloud AI generated a new project.",
		files
	};
}
//#endregion
//#region app/workspace/cloud-ai.ts
var MAX_RESPONSE_CHARACTERS = 12e5;
var MAX_CONTEXT_FILE_CHARACTERS = 14e3;
var cloudStorageKeys = { draft: "skycode_workspace_draft" };
var ManagedAiError = class extends Error {
	constructor(code, message, signInPath) {
		super(message);
		this.code = code;
		this.signInPath = signInPath;
		this.name = "ManagedAiError";
	}
};
async function getManagedAiStatus() {
	const { response, data } = await fetchJson("/api/ai", {
		cache: "no-store",
		headers: { Accept: "application/json" }
	}, 1e4);
	if (!response.ok) throw new ManagedAiError("STATUS_UNAVAILABLE", "Cloud AI status is temporarily unavailable.");
	return data;
}
async function generateCloudProject({ category, files, request }) {
	const currentFiles = Object.fromEntries(Object.entries(files).map(([name, content]) => [name, compactContextFile(name, content)]));
	const { response, data } = await fetchJson("/api/ai", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			category,
			currentFiles,
			prompt: request
		})
	}, 82e3);
	if (!response.ok || !data.project) throw new ManagedAiError(data.code ?? "CLOUD_AI_FAILED", data.error ?? "Cloud AI could not complete this request.", data.signInPath);
	return validateCloudProject(data.project);
}
function compactContextFile(name, content) {
	if (content.length <= MAX_CONTEXT_FILE_CHARACTERS) return content;
	const marker = name === "index.html" ? "\n<!-- SkyCode omitted the unchanged middle for a faster AI request. -->\n" : name === "package.json" ? "\n" : "\n/* SkyCode omitted the unchanged middle for a faster AI request. */\n";
	const available = MAX_CONTEXT_FILE_CHARACTERS - marker.length;
	const headLength = Math.ceil(available * .68);
	return `${content.slice(0, headLength)}${marker}${content.slice(content.length - (available - headLength))}`;
}
async function fetchJson(url, init, timeoutMs) {
	const controller = new AbortController();
	const timer = window.setTimeout(() => controller.abort(), timeoutMs);
	try {
		const response = await fetch(url, {
			...init,
			signal: controller.signal
		});
		const raw = await response.text();
		if (raw.length > MAX_RESPONSE_CHARACTERS) throw new ManagedAiError("RESPONSE_SIZE", "Cloud AI returned an unexpectedly large response.");
		let data;
		try {
			data = JSON.parse(raw);
		} catch {
			throw new ManagedAiError("INVALID_RESPONSE", "Cloud AI returned an invalid response.");
		}
		return {
			response,
			data
		};
	} catch (error) {
		if (error instanceof ManagedAiError) throw error;
		if (error instanceof DOMException && error.name === "AbortError") throw new ManagedAiError("CLIENT_TIMEOUT", "Cloud AI timed out. Instant Builder is still available.");
		throw new ManagedAiError("NETWORK", "Cloud AI could not be reached. Instant Builder is still available.");
	} finally {
		window.clearTimeout(timer);
	}
}
//#endregion
//#region app/workspace/components/WorkspaceIcons.tsx
var import_jsx_runtime = require_jsx_runtime();
var iconPaths = {
	files: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 2v6h6" })] }),
	search: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "11",
		cy: "11",
		r: "7"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m20 20-4-4" })] }),
	git: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "6",
			cy: "4",
			r: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "18",
			cy: "6",
			r: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "6",
			cy: "20",
			r: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 6v12M18 8c0 5-12 3-12 8" })
	] }),
	blocks: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "3",
			y: "3",
			width: "7",
			height: "7",
			rx: "1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "14",
			y: "3",
			width: "7",
			height: "7",
			rx: "1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "3",
			y: "14",
			width: "7",
			height: "7",
			rx: "1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "14",
			y: "14",
			width: "7",
			height: "7",
			rx: "1"
		})
	] }),
	spark: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3ZM18.5 16l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" }),
	play: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 7 8 5-8 5V7Z" }),
	refresh: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 11a8 8 0 1 0-2.3 5.7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 4v7h-7" })] }),
	external: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 4h6v6" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 14 20 4" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" })
	] }),
	terminal: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m5 7 4 4-4 4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11 17h8" })] }),
	database: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: "12",
			cy: "5",
			rx: "8",
			ry: "3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" })
	] }),
	alert: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3 2.8 20h18.4L12 3Z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 9v5" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 17.5h.01" })
	] }),
	logs: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 6h12M8 12h12M8 18h12" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "4",
			cy: "6",
			r: ".8",
			fill: "currentColor",
			stroke: "none"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "4",
			cy: "12",
			r: ".8",
			fill: "currentColor",
			stroke: "none"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "4",
			cy: "18",
			r: ".8",
			fill: "currentColor",
			stroke: "none"
		})
	] }),
	chevron: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" }),
	send: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m22 2-7 20-4-9-9-4Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 2 11 13" })] }),
	close: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 6l12 12M18 6 6 18" }) }),
	layout: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: "3",
		y: "4",
		width: "18",
		height: "16",
		rx: "2"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 4v16M14 11h7" })] })
};
function Icon({ name, size = 18 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		"aria-hidden": "true",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.7",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: iconPaths[name]
	});
}
function FileIcon({ tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `file-icon ${tone}`,
		children: {
			html: "◇",
			css: "#",
			js: "JS",
			json: "{}"
		}[tone]
	});
}
//#endregion
//#region app/workspace/components/BuildWizard.tsx
function BuildWizard({ open, selectedCategory, buildPrompt, aiMode, cloudConnected, cloudConfigured, cloudAuthenticated, cloudConnecting, cloudModel, aiWorking, onClose, onSelectCategory, onPromptChange, onAiModeChange, onConnectCloudAi, onDisconnectCloudAi, onSubmit }) {
	if (!open) return null;
	const selectedCategoryOption = categoryOptions.find((option) => option.id === selectedCategory);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ai-builder-overlay",
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "ai-builder-dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "ai-builder-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "builder-topline",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "builder-brand",
						href: "/",
						"aria-label": "SkyCode home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "logo-mark",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SkyCode" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "free-builder-badge",
						children: "FREE BUILDER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "builder-close",
						onClick: onClose,
						"aria-label": "Close build wizard",
						children: "×"
					})
				]
			}), !selectedCategory ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "builder-category-step",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "builder-step",
						children: "STEP 1 OF 2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						id: "ai-builder-title",
						children: "What do you want to build?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose a project type first. Sky AI will shape the files, layout, and interactions around it." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "category-grid",
						children: categoryOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onSelectCategory(option.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option.icon }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: option.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: option.description })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "→" })
							]
						}, option.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "builder-trust-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ No payment" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ No login for Instant Builder" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Live sandbox preview" })
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "builder-prompt-step",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "builder-back",
						onClick: () => onSelectCategory(null),
						children: "← Back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "builder-step",
						children: "STEP 2 OF 2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "selected-category",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedCategoryOption?.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: selectedCategoryOption?.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selectedCategoryOption?.description })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						id: "ai-builder-title",
						children: "Describe your idea"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Include the purpose, style, colors, sections, and functions you want. You can write in Kurdish or English." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "builder-prompt-input",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							autoFocus: true,
							value: buildPrompt,
							onChange: (event) => onPromptChange(event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
									event.preventDefault();
									onSubmit();
								}
							},
							placeholder: selectedCategoryOption?.example,
							maxLength: 3e3
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onPromptChange(selectedCategoryOption?.example ?? ""),
							children: "Use example"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [buildPrompt.length, "/3000"] })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "engine-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Choose how to build" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "You can switch later" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "engine-options",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: aiMode === "instant" ? "active" : "",
							onClick: () => onAiModeChange("instant"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "engine-icon",
									children: "⚡"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["Instant Builder ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "RECOMMENDED" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Always free, no account, runs immediately in your browser." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: aiMode === "instant" ? "✓" : "" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: aiMode === "cloud" && cloudConnected ? "active cloud" : "cloud",
							onClick: () => {
								if (cloudConnected) onAiModeChange("cloud");
								else onConnectCloudAi();
							},
							disabled: cloudConnecting,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "engine-icon",
									children: "☁"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["Server Cloud AI ", cloudConnected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "READY" })] }),
									cloudConnected && cloudModel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
										className: "cloud-model-name",
										children: cloudModel === "poolside/laguna-s-2.1:free" ? "Poolside · Laguna S 2.1 · Free" : cloudModel === "openai/gpt-oss-20b:free" ? "OpenAI · gpt-oss-20b · Free" : cloudModel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: cloudConnected ? "Uses the protected backend API key and per-user quota." : !cloudConfigured ? "Backend ready; add the server API key to activate it." : !cloudAuthenticated ? "Sign in with ChatGPT to protect usage and cost." : "Activate stronger model-powered edits." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: aiMode === "cloud" && cloudConnected ? "✓" : cloudConnecting ? "…" : "↗" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "cloud-privacy-note",
						children: cloudConnected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Prompts and current project files pass through SkyCode's protected backend to OpenRouter. The API key never enters the browser.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onDisconnectCloudAi,
								children: "Disconnect"
							})
						] }) : "Instant Builder remains free and local. Server Cloud AI requires sign-in and is protected by rate and daily limits."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "build-project-button",
						disabled: !buildPrompt.trim() || aiWorking || aiMode === "cloud" && !cloudConnected,
						onClick: onSubmit,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "spark",
								size: 17
							}),
							aiWorking ? "Building your project…" : "Build my project",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "builder-shortcut",
						children: "Ctrl / ⌘ + Enter to build"
					})
				]
			})]
		})
	});
}
//#endregion
//#region app/workspace/preview-document.ts
var PREVIEW_SECTION_SELECTOR$1 = [
	"nav",
	"header",
	"main > section",
	"main > article",
	"body > section",
	"body > article",
	"aside",
	"footer"
].join(",");
function escapeEmbeddedClosingTag(source, tagName) {
	return source.replace(new RegExp(`</${tagName}`, "gi"), `<\\/${tagName}`);
}
function buildSectionEditorBridge() {
	return `
    (() => {
      const selector = ${JSON.stringify(PREVIEW_SECTION_SELECTOR$1)};
      const candidates = Array.from(document.body.querySelectorAll(selector));
      let selectedIndex = -1;
      const labels = {
        ASIDE: "Sidebar",
        FOOTER: "Footer",
        HEADER: "Header",
        NAV: "Navigation",
        ARTICLE: "Content",
        SECTION: "Section"
      };

      const labelFor = (element) => {
        const clue = [
          element.getAttribute("aria-label"),
          element.id,
          element.className
        ].filter(Boolean).join(" ").toLowerCase();
        if (clue.includes("hero")) return "Hero";
        if (clue.includes("feature")) return "Features";
        if (clue.includes("price")) return "Pricing";
        if (clue.includes("testimonial") || clue.includes("review")) return "Testimonials";
        if (clue.includes("contact")) return "Contact";
        if (clue.includes("cta") || clue.includes("call-to-action")) return "Call to action";
        return labels[element.tagName] || "Section";
      };

      const pathFor = (element) => {
        const path = [];
        let current = element;
        while (current && current !== document.body && path.length < 4) {
          let label = current.tagName.toLowerCase();
          if (current.id) label += "#" + current.id;
          else if (typeof current.className === "string" && current.className.trim()) {
            label += "." + current.className.trim().split(/\\s+/).slice(0, 2).join(".");
          }
          path.unshift(label.slice(0, 54));
          current = current.parentElement;
        }
        return path;
      };

      const cleanMarkup = (element) => {
        const clone = element.cloneNode(true);
        [clone, ...clone.querySelectorAll("*")].forEach((node) => {
          node.removeAttribute("data-skycode-section-index");
          node.removeAttribute("data-skycode-section-label");
          node.classList.remove("skycode-section-selected");
        });
        return clone.outerHTML;
      };

      candidates.forEach((element, index) => {
        element.setAttribute("data-skycode-section-index", String(index));
        element.setAttribute("data-skycode-section-label", labelFor(element));
      });
      document.documentElement.classList.add("skycode-section-mode");

      const toolbar = document.createElement("div");
      toolbar.className = "skycode-section-toolbar";
      toolbar.setAttribute("role", "toolbar");
      toolbar.setAttribute("aria-label", "Selected section actions");
      toolbar.innerHTML = [
        '<strong class="skycode-toolbar-label">Section</strong>',
        '<span class="skycode-toolbar-divider"></span>',
        '<button type="button" data-action="move-up" aria-label="Move section up" title="Move up">↑</button>',
        '<button type="button" data-action="move-down" aria-label="Move section down" title="Move down">↓</button>',
        '<button type="button" data-action="duplicate" aria-label="Duplicate section" title="Duplicate">⧉</button>'
      ].join("");
      document.body.appendChild(toolbar);

      const positionToolbar = () => {
        if (selectedIndex < 0) {
          toolbar.classList.remove("visible");
          return;
        }
        const selected = candidates[selectedIndex];
        if (!selected) return;
        const rect = selected.getBoundingClientRect();
        const toolbarRect = toolbar.getBoundingClientRect();
        const left = Math.max(
          8,
          Math.min(rect.left + 8, window.innerWidth - toolbarRect.width - 8)
        );
        const top = rect.top > toolbarRect.height + 12
          ? rect.top - toolbarRect.height - 8
          : Math.min(window.innerHeight - toolbarRect.height - 8, rect.top + 8);
        toolbar.style.left = left + "px";
        toolbar.style.top = Math.max(8, top) + "px";
        toolbar.classList.add("visible");
      };

      const emitSelection = (index) => {
        const target = candidates[index];
        if (!target) return;
        selectedIndex = index;
        candidates.forEach((element) =>
          element.classList.remove("skycode-section-selected")
        );
        target.classList.add("skycode-section-selected");
        toolbar.querySelector(".skycode-toolbar-label").textContent =
          target.getAttribute("data-skycode-section-label") || "Section";
        positionToolbar();
        window.parent.postMessage({
          source: "skycode-preview",
          type: "section-selected",
          section: {
            index,
            label: target.getAttribute("data-skycode-section-label") || "Section",
            tag: target.tagName.toLowerCase(),
            html: cleanMarkup(target),
            path: pathFor(target)
          }
        }, "*");
      };

      const clearSelection = (notifyParent) => {
        selectedIndex = -1;
        candidates.forEach((element) =>
          element.classList.remove("skycode-section-selected")
        );
        toolbar.classList.remove("visible");
        if (notifyParent) {
          window.parent.postMessage({
            source: "skycode-preview",
            type: "section-deselected"
          }, "*");
        }
      };

      toolbar.addEventListener("click", (event) => {
        const button = event.target instanceof Element
          ? event.target.closest("button[data-action]")
          : null;
        if (!button || selectedIndex < 0) return;
        event.preventDefault();
        event.stopPropagation();
        window.parent.postMessage({
          source: "skycode-preview",
          type: "section-action",
          action: button.getAttribute("data-action"),
          index: selectedIndex
        }, "*");
      });

      document.addEventListener("click", (event) => {
        const target = event.target instanceof Element
          ? event.target.closest("[data-skycode-section-index]")
          : null;
        if (!target) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        emitSelection(Number(target.getAttribute("data-skycode-section-index")));
      }, true);

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && selectedIndex >= 0) {
          event.preventDefault();
          clearSelection(true);
        }
      });
      window.addEventListener("scroll", positionToolbar, true);
      window.addEventListener("resize", positionToolbar);

      window.addEventListener("message", (event) => {
        if (event.source !== window.parent) return;
        if (!event.data || event.data.source !== "skycode-workspace") return;
        if (event.data.type === "clear-section-selection") {
          clearSelection(false);
          return;
        }
        if (
          event.data.type === "select-section" &&
          Number.isInteger(event.data.index) &&
          candidates[event.data.index]
        ) {
          candidates[event.data.index].scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          emitSelection(event.data.index);
        }
      });

      window.parent.postMessage({
        source: "skycode-preview",
        type: "sections-ready",
        sections: candidates.map((element, index) => ({
          index,
          label: element.getAttribute("data-skycode-section-label") || "Section",
          tag: element.tagName.toLowerCase()
        }))
      }, "*");
    })();
  `;
}
function buildPreviewDocument(files, options = {}) {
	const embeddedStyles = escapeEmbeddedClosingTag(files["styles.css"], "style");
	const embeddedScript = escapeEmbeddedClosingTag(files["app.js"], "script");
	const editorStyles = options.sectionEditor ? `<style>
      .skycode-section-mode [data-skycode-section-index] {
        cursor: pointer !important;
        outline: 2px solid transparent;
        outline-offset: -2px;
        transition: outline-color .16s ease, box-shadow .16s ease;
      }
      .skycode-section-mode [data-skycode-section-index]:hover {
        outline-color: rgba(255, 107, 53, .9);
        outline-offset: -2px;
        box-shadow: inset 0 0 0 1px rgba(255, 107, 53, .2);
      }
      .skycode-section-mode .skycode-section-selected {
        outline: 3px solid #ff5a1f !important;
        outline-offset: -3px !important;
        box-shadow: inset 0 0 0 2px rgba(255, 90, 31, .22) !important;
      }
      .skycode-section-toolbar {
        all: initial;
        min-height: 34px;
        position: fixed;
        z-index: 2147483647;
        display: none;
        align-items: center;
        gap: 3px;
        padding: 4px;
        border: 1px solid rgba(255, 255, 255, .16);
        border-radius: 10px;
        background: rgba(15, 16, 20, .96);
        color: #f6f7f9;
        box-shadow: 0 12px 32px rgba(0, 0, 0, .42);
        font: 600 12px/1 Inter, ui-sans-serif, system-ui, sans-serif;
        backdrop-filter: blur(18px);
      }
      .skycode-section-toolbar.visible {
        display: flex;
      }
      .skycode-section-toolbar strong {
        all: initial;
        max-width: 150px;
        overflow: hidden;
        padding: 0 7px;
        color: #f6f7f9;
        font: 700 11px/1 Inter, ui-sans-serif, system-ui, sans-serif;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .skycode-section-toolbar .skycode-toolbar-divider {
        all: initial;
        width: 1px;
        height: 18px;
        margin-right: 2px;
        background: rgba(255, 255, 255, .13);
      }
      .skycode-section-toolbar button {
        all: initial;
        width: 27px;
        height: 27px;
        border-radius: 7px;
        color: #d9dbe2;
        font: 700 15px/27px Inter, ui-sans-serif, system-ui, sans-serif;
        text-align: center;
        cursor: pointer;
      }
      .skycode-section-toolbar button:hover {
        background: rgba(255, 90, 31, .2);
        color: #fff;
      }
    </style>` : "";
	const editorScript = options.sectionEditor ? `<script>${escapeEmbeddedClosingTag(buildSectionEditorBridge(), "script")}<\/script>` : "";
	return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; object-src 'none'; media-src 'none'; frame-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'"><style>${embeddedStyles}</style>${editorStyles}</head><body>${files["index.html"]}<script>${embeddedScript}<\/script>${editorScript}</body></html>`;
}
//#endregion
//#region app/workspace/section-editor.ts
var PREVIEW_SECTION_SELECTOR = [
	"nav",
	"header",
	"main > section",
	"main > article",
	"body > section",
	"body > article",
	"aside",
	"footer"
].join(",");
var SECTION_TARGET_ATTRIBUTE = "data-skycode-target";
var forbiddenSectionElements = "script,style,link,iframe,object,embed,base,meta";
function parseBody(source) {
	return new DOMParser().parseFromString(`<!doctype html><html><body>${source}</body></html>`, "text/html");
}
function sectionCandidates(document) {
	return Array.from(document.body.querySelectorAll(PREVIEW_SECTION_SELECTOR));
}
function selectedSectionOrThrow(document, sectionIndex) {
	const selected = sectionCandidates(document)[sectionIndex];
	if (!selected) throw new Error("This section is no longer available. Refresh the preview and select it again.");
	return selected;
}
function parseSectionRoot(markup) {
	if (markup.length > 5e4) throw new Error("A single section must be smaller than 50 KB.");
	const template = document.createElement("template");
	template.innerHTML = markup.trim();
	const roots = Array.from(template.content.children);
	if (roots.length !== 1 || !(roots[0] instanceof HTMLElement)) throw new Error("Section HTML must contain exactly one root element.");
	const root = roots[0];
	if (root.matches(forbiddenSectionElements) || root.querySelector(forbiddenSectionElements)) throw new Error("Scripts, frames, global styles, and external resources are not allowed inside a section.");
	for (const element of [root, ...Array.from(root.querySelectorAll("*"))]) for (const attribute of Array.from(element.attributes)) {
		const name = attribute.name.toLowerCase();
		const value = attribute.value.trim().toLowerCase();
		if (name.startsWith("on")) throw new Error("Inline event handlers are not allowed in section HTML.");
		if ((name === "href" || name === "src" || name === "action") && value.startsWith("javascript:")) throw new Error("JavaScript URLs are not allowed in section HTML.");
	}
	root.removeAttribute(SECTION_TARGET_ATTRIBUTE);
	return root;
}
function replacePreviewSection(source, sectionIndex, replacementMarkup) {
	const sourceDocument = parseBody(source);
	const selected = selectedSectionOrThrow(sourceDocument, sectionIndex);
	const replacement = parseSectionRoot(replacementMarkup);
	selected.replaceWith(sourceDocument.importNode(replacement, true));
	return sourceDocument.body.innerHTML.trim();
}
function markPreviewSection(source, sectionIndex) {
	const sourceDocument = parseBody(source);
	selectedSectionOrThrow(sourceDocument, sectionIndex).setAttribute(SECTION_TARGET_ATTRIBUTE, "selected-section");
	return sourceDocument.body.innerHTML.trim();
}
function extractMarkedSection(source) {
	const selected = parseBody(source).body.querySelector(`[${SECTION_TARGET_ATTRIBUTE}="selected-section"]`);
	if (!selected) throw new Error("Cloud AI did not return the selected section safely.");
	selected.removeAttribute(SECTION_TARGET_ATTRIBUTE);
	return parseSectionRoot(selected.outerHTML).outerHTML;
}
function readSectionContent(sectionMarkup) {
	const root = parseSectionRoot(sectionMarkup);
	const heading = root.querySelector("h1, h2, h3");
	const body = root.querySelector("p");
	const button = root.querySelector("button, a");
	const buttonSupportsLink = button?.tagName === "A";
	return {
		heading: heading?.textContent?.trim() ?? "",
		body: body?.textContent?.trim() ?? "",
		buttonLabel: button?.textContent?.trim() ?? "",
		buttonHref: buttonSupportsLink && button ? button.getAttribute("href") ?? "" : "",
		hasHeading: Boolean(heading),
		hasBody: Boolean(body),
		hasButton: Boolean(button),
		buttonSupportsLink
	};
}
function updateSectionContent(sectionMarkup, content) {
	const root = parseSectionRoot(sectionMarkup);
	const heading = root.querySelector("h1, h2, h3");
	const body = root.querySelector("p");
	const button = root.querySelector("button, a");
	if (heading && content.hasHeading) heading.textContent = content.heading;
	if (body && content.hasBody) body.textContent = content.body;
	if (button && content.hasButton) {
		button.textContent = content.buttonLabel;
		if (button.tagName === "A") {
			const href = content.buttonHref.trim();
			if (href) button.setAttribute("href", href);
			else button.removeAttribute("href");
		}
	}
	return parseSectionRoot(root.outerHTML).outerHTML;
}
function emptySectionDesignDraft() {
	return {
		accent: "",
		alignment: "keep",
		background: "",
		padding: "keep",
		radius: "keep",
		textColor: ""
	};
}
function updateSectionDesign(sectionMarkup, design) {
	const root = parseSectionRoot(sectionMarkup);
	if (design.background) root.style.background = design.background;
	if (design.textColor) root.style.color = design.textColor;
	if (design.accent) {
		root.style.setProperty("--accent", design.accent);
		root.style.setProperty("--primary", design.accent);
	}
	if (design.alignment !== "keep") root.style.textAlign = design.alignment;
	const paddingValues = {
		compact: "clamp(24px, 5vw, 52px)",
		balanced: "clamp(48px, 8vw, 96px)",
		spacious: "clamp(72px, 12vw, 152px)"
	};
	if (design.padding !== "keep") root.style.paddingBlock = paddingValues[design.padding];
	const radiusValues = {
		none: "0",
		soft: "16px",
		rounded: "32px",
		pill: "64px"
	};
	if (design.radius !== "keep") {
		root.style.borderRadius = radiusValues[design.radius];
		if (design.radius !== "none") root.style.overflow = "hidden";
	}
	return parseSectionRoot(root.outerHTML).outerHTML;
}
function duplicatePreviewSection(source, sectionIndex) {
	const sourceDocument = parseBody(source);
	const selected = selectedSectionOrThrow(sourceDocument, sectionIndex);
	selected.after(selected.cloneNode(true));
	return sourceDocument.body.innerHTML.trim();
}
function movePreviewSection(source, sectionIndex, direction) {
	const sourceDocument = parseBody(source);
	const selected = selectedSectionOrThrow(sourceDocument, sectionIndex);
	const siblings = sectionCandidates(sourceDocument).filter((candidate) => candidate.parentElement === selected.parentElement);
	const siblingIndex = siblings.indexOf(selected);
	const target = direction === "up" ? siblings[siblingIndex - 1] : siblings[siblingIndex + 1];
	if (!target) throw new Error(direction === "up" ? "This section is already first in its group." : "This section is already last in its group.");
	if (direction === "up") target.before(selected);
	else target.after(selected);
	return sourceDocument.body.innerHTML.trim();
}
function deletePreviewSection(source, sectionIndex) {
	const sourceDocument = parseBody(source);
	selectedSectionOrThrow(sourceDocument, sectionIndex).remove();
	return sourceDocument.body.innerHTML.trim();
}
var colorInstructions = [
	[/\b(orange|amber)\b|پرتەقاڵی|نارنجی/i, "#ff5a1f"],
	[/\b(blue|cyan)\b|شین/i, "#2797ff"],
	[/\b(green|emerald)\b|سەوز/i, "#24b47e"],
	[/\b(purple|violet)\b|مۆر/i, "#8b5cf6"],
	[/\b(pink|rose)\b|پەمەیی/i, "#ec4899"]
];
function transformSectionLocally(sectionMarkup, instruction) {
	const root = parseSectionRoot(sectionMarkup);
	const cleanInstruction = instruction.trim();
	let changed = false;
	const quotedText = cleanInstruction.match(/["“](.+?)["”]/)?.[1]?.trim() ?? cleanInstruction.match(/'(.*?)'/)?.[1]?.trim();
	if (quotedText) {
		const textTarget = /\b(button|cta)\b|دوگمە/i.test(cleanInstruction) ? root.querySelector("button, a") : root.querySelector("h1, h2, h3, p, button, a");
		if (textTarget) {
			textTarget.textContent = quotedText;
			changed = true;
		}
	}
	const requestedColor = colorInstructions.find(([pattern]) => pattern.test(cleanInstruction))?.[1];
	if (requestedColor) {
		root.style.setProperty("--accent", requestedColor);
		root.style.setProperty("--primary", requestedColor);
		root.style.borderColor = `${requestedColor}66`;
		if (/\b(background|fill)\b|پاشبنەما/i.test(cleanInstruction)) root.style.background = `linear-gradient(135deg, ${requestedColor}24, transparent 72%)`;
		changed = true;
	}
	if (/\b(compact|smaller|small)\b|بچووک|کۆمپاکت/i.test(cleanInstruction)) {
		root.style.paddingBlock = "clamp(24px, 5vw, 56px)";
		const heading = root.querySelector("h1, h2, h3");
		if (heading) heading.style.fontSize = "clamp(1.75rem, 4vw, 3.5rem)";
		changed = true;
	}
	if (/\b(larger|bigger|large)\b|گەورە/i.test(cleanInstruction)) {
		root.style.paddingBlock = "clamp(64px, 11vw, 144px)";
		const heading = root.querySelector("h1, h2, h3");
		if (heading) heading.style.fontSize = "clamp(2.5rem, 7vw, 6.5rem)";
		changed = true;
	}
	if (/\b(center|centered)\b|ناوەڕاست/i.test(cleanInstruction)) {
		root.style.textAlign = "center";
		root.style.marginInline = "auto";
		changed = true;
	}
	if (/\b(rounded|round|card)\b|خڕ|کارت/i.test(cleanInstruction)) {
		root.style.borderRadius = "clamp(20px, 4vw, 48px)";
		root.style.overflow = "hidden";
		changed = true;
	}
	if (/\b(dark|black)\b|تاریک|ڕەش/i.test(cleanInstruction)) {
		root.style.backgroundColor = "#0b0c10";
		root.style.color = "#f7f7f5";
		changed = true;
	} else if (/\b(light|white)\b|ڕووناک|سپی/i.test(cleanInstruction)) {
		root.style.backgroundColor = "#f7f4ee";
		root.style.color = "#171717";
		changed = true;
	}
	if (!changed) throw new Error("Instant section edits support quoted text and focused style directions such as “orange”, “compact”, “larger”, “centered”, “rounded”, “dark”, or “light”. You can also edit the HTML directly.");
	return parseSectionRoot(root.outerHTML).outerHTML;
}
//#endregion
//#region app/workspace/page.tsx
var activityLabels = {
	files: "Files",
	search: "Search",
	git: "Source Control",
	database: "Database"
};
var bottomPanelLabels = {
	terminal: {
		label: "Terminal",
		icon: "terminal"
	},
	problems: {
		label: "Problems",
		icon: "alert"
	},
	logs: {
		label: "Logs",
		icon: "logs"
	}
};
var defaultPanelSizes = {
	ai: 320,
	preview: 440,
	utility: 190
};
var panelLayoutStorageKey = "skycode:workspace-panel-layout:v1";
var workspaceLayoutStorageKey = "skycode:workspace-layout-version:v1";
function clampPanelSize(value, minimum, maximum) {
	return Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
}
function resizePanels(panel, start, deltaX, deltaY, viewportWidth, viewportHeight) {
	const minimumCodeWidth = 380;
	const activityRailWidth = 48;
	if (panel === "ai") return {
		...start,
		ai: clampPanelSize(Math.round(start.ai + deltaX), 250, Math.min(520, viewportWidth - start.preview - minimumCodeWidth - activityRailWidth))
	};
	if (panel === "preview") return {
		...start,
		preview: clampPanelSize(Math.round(start.preview - deltaX), 300, Math.min(680, viewportWidth - start.ai - minimumCodeWidth - activityRailWidth))
	};
	return {
		...start,
		utility: clampPanelSize(Math.round(start.utility - deltaY), 120, Math.min(380, viewportHeight - 410))
	};
}
var aiStatusSteps = [
	{
		title: "Understanding your request",
		detail: "Reading your prompt and the current project files."
	},
	{
		title: "Planning the solution",
		detail: "Choosing the structure, components, and safest changes."
	},
	{
		title: "Creating project files",
		detail: "Writing and checking HTML, CSS, JavaScript, and configuration."
	},
	{
		title: "Updating secure preview",
		detail: "Applying the result to your restricted live preview."
	}
];
var codeKeywords = new Set([
	"async",
	"await",
	"break",
	"case",
	"catch",
	"class",
	"const",
	"continue",
	"default",
	"else",
	"export",
	"extends",
	"false",
	"finally",
	"for",
	"from",
	"function",
	"if",
	"import",
	"in",
	"let",
	"new",
	"null",
	"return",
	"switch",
	"this",
	"throw",
	"true",
	"try",
	"typeof",
	"undefined",
	"var",
	"while"
]);
function renderHighlightedCode(code) {
	const tokenPattern = /(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Za-z][\w-]*|#[\dA-Fa-f]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|s|ms)?\b|--[\w-]+|[A-Za-z-]+(?=\s*:)|[.#][A-Za-z_-][\w-]*(?=[\s,{])|\b[A-Za-z_$][\w$]*\b)/g;
	const output = [];
	let cursor = 0;
	let tokenIndex = 0;
	for (const match of code.matchAll(tokenPattern)) {
		const index = match.index ?? 0;
		const token = match[0];
		if (index > cursor) output.push(code.slice(cursor, index));
		let tone = "plain";
		if (token.startsWith("<!--") || token.startsWith("/*") || token.startsWith("//")) tone = "comment";
		else if (/^["'`]/.test(token)) tone = "string";
		else if (codeKeywords.has(token)) tone = "keyword";
		else if (/^<\/?/.test(token)) tone = "tag";
		else if (/^#[\dA-Fa-f]{3,8}$/.test(token)) tone = "color";
		else if (/^\d/.test(token)) tone = "number";
		else if (token.startsWith("--") || /^[A-Za-z-]+$/.test(token)) tone = "property";
		else if (/^[.#]/.test(token)) tone = "selector";
		output.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `syntax-${tone}`,
			children: token
		}, `${tokenIndex}-${index}`));
		tokenIndex += 1;
		cursor = index + token.length;
	}
	if (cursor < code.length) output.push(code.slice(cursor));
	return output;
}
var starterFiles = {
	"index.html": `<main class="hero">
  <nav>
    <a class="brand" href="#">Northstar</a>
    <div class="nav-links">
      <a href="#work">Work</a>
      <a href="#about">About</a>
    </div>
  </nav>

  <section class="hero-copy">
    <span class="eyebrow">Independent creative studio</span>
    <h1>We turn bold ideas into digital experiences.</h1>
    <p>Strategy, identity and interfaces made for ambitious teams.</p>
    <button id="startButton">Start a project <span>↗</span></button>
  </section>

  <div class="orb orb-one"></div>
  <div class="orb orb-two"></div>
</main>`,
	"styles.css": `:root {
  color-scheme: dark;
  font-family: Inter, ui-sans-serif, system-ui;
  background: #080a0f;
  color: #f7f8fb;
}

* { box-sizing: border-box; }
body { margin: 0; background: #080a0f; }

.hero {
  min-height: 100vh;
  padding: 32px 7vw;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 74% 28%, #5e36d955, transparent 27%),
    linear-gradient(135deg, #0d1018, #080a0f 58%);
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.brand { color: white; font-weight: 750; letter-spacing: -.04em; }
.nav-links { display: flex; gap: 28px; }
a { color: #a8acb8; text-decoration: none; font-size: 14px; }

.hero-copy {
  max-width: 720px;
  margin-top: 16vh;
  position: relative;
  z-index: 2;
}

.eyebrow {
  color: #8d72ff;
  font-size: 12px;
  letter-spacing: .16em;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(48px, 7.4vw, 104px);
  line-height: .94;
  letter-spacing: -.065em;
  margin: 24px 0;
  max-width: 940px;
}

p { color: #a8acb8; font-size: 18px; line-height: 1.6; max-width: 520px; }

button {
  margin-top: 24px;
  border: 0;
  border-radius: 999px;
  background: #f5f2ff;
  color: #101116;
  padding: 15px 20px;
  font-weight: 700;
  cursor: pointer;
}

button span { padding-left: 28px; }

.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(1px);
}
.orb-one {
  width: 360px; height: 360px;
  right: -60px; bottom: -80px;
  background: linear-gradient(135deg, #8f70ff, #4020b8);
  box-shadow: 0 0 100px #6d4cff55;
}
.orb-two {
  width: 110px; height: 110px;
  right: 32%; top: 22%;
  border: 1px solid #ffffff30;
}`,
	"app.js": `const button = document.querySelector('#startButton');

button?.addEventListener('click', () => {
  button.innerHTML = 'Let’s build something <span>→</span>';
});`,
	"package.json": `{
  "name": "northstar-studio",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "vite": "latest"
  }
}`
};
var fileMeta = [
	{
		name: "index.html",
		tone: "html"
	},
	{
		name: "styles.css",
		tone: "css"
	},
	{
		name: "app.js",
		tone: "js"
	},
	{
		name: "package.json",
		tone: "json"
	}
];
function Home() {
	const [files, setFiles] = (0, import_react.useState)(starterFiles);
	const [previewFiles, setPreviewFiles] = (0, import_react.useState)(starterFiles);
	const [activeFile, setActiveFile] = (0, import_react.useState)("index.html");
	const [activePanel, setActivePanel] = (0, import_react.useState)("files");
	const [activeBottomPanel, setActiveBottomPanel] = (0, import_react.useState)("terminal");
	const [mobilePanelOpen, setMobilePanelOpen] = (0, import_react.useState)(false);
	const [mobileView, setMobileView] = (0, import_react.useState)("preview");
	const [canvasMode, setCanvasMode] = (0, import_react.useState)("preview");
	const [layoutVersion, setLayoutVersion] = (0, import_react.useState)("studio");
	const [panelSizes, setPanelSizes] = (0, import_react.useState)(defaultPanelSizes);
	const [panelLayoutReady, setPanelLayoutReady] = (0, import_react.useState)(false);
	const [resizingPanel, setResizingPanel] = (0, import_react.useState)(null);
	const [projectExpanded, setProjectExpanded] = (0, import_react.useState)(true);
	const [srcExpanded, setSrcExpanded] = (0, import_react.useState)(true);
	const [outlineOpen, setOutlineOpen] = (0, import_react.useState)(false);
	const [timelineOpen, setTimelineOpen] = (0, import_react.useState)(false);
	const [optionsOpen, setOptionsOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [commitMessage, setCommitMessage] = (0, import_react.useState)("");
	const [baselineFiles, setBaselineFiles] = (0, import_react.useState)(starterFiles);
	const [commits, setCommits] = (0, import_react.useState)([{
		message: "Initial workspace",
		time: "Now"
	}]);
	const [projectId, setProjectId] = (0, import_react.useState)("");
	const [projectName, setProjectName] = (0, import_react.useState)("northstar-studio");
	const [saveStatus, setSaveStatus] = (0, import_react.useState)("Saved");
	const [runCount, setRunCount] = (0, import_react.useState)(0);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [aiWorking, setAiWorking] = (0, import_react.useState)(false);
	const [aiStatusIndex, setAiStatusIndex] = (0, import_react.useState)(0);
	const [aiMode, setAiMode] = (0, import_react.useState)("instant");
	const [cloudConnected, setCloudConnected] = (0, import_react.useState)(false);
	const [cloudConfigured, setCloudConfigured] = (0, import_react.useState)(false);
	const [cloudAuthenticated, setCloudAuthenticated] = (0, import_react.useState)(false);
	const [cloudConnecting, setCloudConnecting] = (0, import_react.useState)(false);
	const [cloudModel, setCloudModel] = (0, import_react.useState)("");
	const [onboardingOpen, setOnboardingOpen] = (0, import_react.useState)(true);
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)(null);
	const [buildPrompt, setBuildPrompt] = (0, import_react.useState)("");
	const [projectBrief, setProjectBrief] = (0, import_react.useState)("");
	const [toast, setToast] = (0, import_react.useState)("");
	const [sectionEditMode, setSectionEditMode] = (0, import_react.useState)(true);
	const [selectedSection, setSelectedSection] = (0, import_react.useState)(null);
	const [sectionInstruction, setSectionInstruction] = (0, import_react.useState)("");
	const [sectionHtmlDraft, setSectionHtmlDraft] = (0, import_react.useState)("");
	const [sectionWorking, setSectionWorking] = (0, import_react.useState)(false);
	const [sectionInspectorTab, setSectionInspectorTab] = (0, import_react.useState)("content");
	const [sectionContentDraft, setSectionContentDraft] = (0, import_react.useState)(null);
	const [sectionDesignDraft, setSectionDesignDraft] = (0, import_react.useState)(emptySectionDesignDraft);
	const [previewDevice, setPreviewDevice] = (0, import_react.useState)("desktop");
	const [previewSections, setPreviewSections] = (0, import_react.useState)([]);
	const [sectionUndoStack, setSectionUndoStack] = (0, import_react.useState)([]);
	const [sectionRedoStack, setSectionRedoStack] = (0, import_react.useState)([]);
	const [logs, setLogs] = (0, import_react.useState)([
		{
			kind: "muted",
			text: "SkyCode browser preview"
		},
		{
			kind: "good",
			text: "✓ Restricted preview ready"
		},
		{
			kind: "muted",
			text: "Network access blocked by preview policy"
		}
	]);
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		text: "Choose what you want to build, describe it, and I’ll generate all four files with a live preview.",
		engine: "instant"
	}]);
	const importFileRef = (0, import_react.useRef)(null);
	const codeHighlightRef = (0, import_react.useRef)(null);
	const previewFrameRef = (0, import_react.useRef)(null);
	const panelDragRef = (0, import_react.useRef)(null);
	const changedFiles = fileMeta.filter((file) => files[file.name] !== baselineFiles[file.name]);
	const searchResults = (0, import_react.useMemo)(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return [];
		return Object.entries(files).flatMap(([name, content]) => content.split("\n").flatMap((line, index) => line.toLowerCase().includes(query) ? [{
			name,
			line: index + 1,
			preview: line.trim() || "(blank line)"
		}] : [])).slice(0, 40);
	}, [files, searchQuery]);
	const outlineItems = {
		"index.html": [
			"main.hero",
			"nav",
			"section.hero-copy",
			"div.orb-one",
			"div.orb-two"
		],
		"styles.css": [
			":root",
			".hero",
			"nav",
			".hero-copy",
			"h1",
			"button",
			".orb"
		],
		"app.js": ["button", "click listener"],
		"package.json": [
			"name",
			"scripts",
			"dependencies"
		]
	};
	const lines = files[activeFile].split("\n");
	const previewHasChanges = fileMeta.some((file) => files[file.name] !== previewFiles[file.name]);
	const srcDoc = (0, import_react.useMemo)(() => buildPreviewDocument(previewFiles, { sectionEditor: sectionEditMode }), [previewFiles, sectionEditMode]);
	const workspaceProblems = (0, import_react.useMemo)(() => {
		const problems = [];
		const hasBalancedBraces = (value) => (value.match(/{/g)?.length ?? 0) === (value.match(/}/g)?.length ?? 0);
		if (!/<[a-z][\s\S]*>/i.test(files["index.html"])) problems.push({
			kind: "error",
			file: "index.html",
			text: "No valid HTML element was detected."
		});
		if (!hasBalancedBraces(files["styles.css"])) problems.push({
			kind: "error",
			file: "styles.css",
			text: "CSS contains unbalanced braces."
		});
		if (!hasBalancedBraces(files["app.js"])) problems.push({
			kind: "warning",
			file: "app.js",
			text: "JavaScript contains unbalanced braces."
		});
		try {
			JSON.parse(files["package.json"]);
		} catch {
			problems.push({
				kind: "error",
				file: "package.json",
				text: "package.json is not valid JSON."
			});
		}
		if (previewHasChanges) problems.push({
			kind: "notice",
			file: activeFile,
			text: "Changes are waiting to be run in the secure preview."
		});
		return problems;
	}, [
		activeFile,
		files,
		previewHasChanges
	]);
	(0, import_react.useEffect)(() => {
		const draftValue = window.sessionStorage.getItem(cloudStorageKeys.draft);
		if (draftValue) try {
			const draft = JSON.parse(draftValue);
			if (draft.files && [
				"index.html",
				"styles.css",
				"app.js",
				"package.json"
			].every((name) => typeof draft.files?.[name] === "string")) {
				setFiles(draft.files);
				setPreviewFiles(draft.files);
				setBaselineFiles(draft.baselineFiles ?? draft.files);
			}
			setProjectId(typeof draft.projectId === "string" ? draft.projectId : "");
			if (typeof draft.projectName === "string") setProjectName(draft.projectName);
			if (draft.saveStatus === "Saved" || draft.saveStatus === "Unsaved") setSaveStatus(draft.saveStatus);
			if (draft.category) setSelectedCategory(draft.category);
			if (typeof draft.buildPrompt === "string") setBuildPrompt(draft.buildPrompt);
			if (typeof draft.projectBrief === "string") setProjectBrief(draft.projectBrief);
			if (typeof draft.onboardingOpen === "boolean") setOnboardingOpen(draft.onboardingOpen);
		} catch {
			window.sessionStorage.removeItem(cloudStorageKeys.draft);
		} finally {
			window.sessionStorage.removeItem(cloudStorageKeys.draft);
		}
		getManagedAiStatus().then((status) => {
			setCloudAuthenticated(status.authenticated);
			setCloudConfigured(status.configured);
			setCloudConnected(status.available);
			setCloudModel(status.model ?? "");
			if (status.available) setAiMode("cloud");
		}).catch(() => {
			setCloudAuthenticated(false);
			setCloudConfigured(false);
			setCloudConnected(false);
			setCloudModel("");
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const requestedId = new URLSearchParams(window.location.search).get("project");
		if (!requestedId) return;
		setOnboardingOpen(false);
		let cancelled = false;
		fetch(`/api/projects?id=${encodeURIComponent(requestedId)}`, { cache: "no-store" }).then(async (response) => {
			const data = await response.json();
			if (!response.ok || !data.project) throw new Error(data.error ?? "Project could not be loaded.");
			return data.project;
		}).then((project) => {
			if (cancelled) return;
			const supportedFiles = Object.fromEntries(Object.entries(project.files).filter(([name, content]) => name in starterFiles && typeof content === "string"));
			const loadedFiles = {
				...starterFiles,
				...supportedFiles
			};
			setFiles(loadedFiles);
			setPreviewFiles(loadedFiles);
			setBaselineFiles(loadedFiles);
			setProjectId(project.id);
			setProjectName(project.name);
			if (categoryOptions.some((option) => option.id === project.template)) setSelectedCategory(project.template);
			setSaveStatus("Saved");
			showToast("Project loaded");
		}).catch((error) => {
			if (!cancelled) showToast(error instanceof Error ? error.message : "Project could not be loaded.");
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!aiWorking) {
			setAiStatusIndex(0);
			return;
		}
		const statusTimer = window.setInterval(() => {
			setAiStatusIndex((current) => Math.min(current + 1, aiStatusSteps.length - 1));
		}, 850);
		return () => window.clearInterval(statusTimer);
	}, [aiWorking]);
	(0, import_react.useEffect)(() => {
		const savedVersion = window.localStorage.getItem(workspaceLayoutStorageKey);
		if (savedVersion === "studio" || savedVersion === "classic") setLayoutVersion(savedVersion);
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			const savedLayout = window.localStorage.getItem(panelLayoutStorageKey);
			if (savedLayout) {
				const parsed = JSON.parse(savedLayout);
				if (typeof parsed.ai === "number" && typeof parsed.preview === "number" && typeof parsed.utility === "number") setPanelSizes({
					ai: clampPanelSize(parsed.ai, 250, 520),
					preview: clampPanelSize(parsed.preview, 300, 680),
					utility: clampPanelSize(parsed.utility, 120, 380)
				});
			}
		} catch {
			window.localStorage.removeItem(panelLayoutStorageKey);
		} finally {
			setPanelLayoutReady(true);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!panelLayoutReady) return;
		window.localStorage.setItem(panelLayoutStorageKey, JSON.stringify(panelSizes));
	}, [panelLayoutReady, panelSizes]);
	(0, import_react.useEffect)(() => {
		function receivePreviewMessage(event) {
			if (event.source !== previewFrameRef.current?.contentWindow) return;
			if (!event.data || typeof event.data !== "object") return;
			const data = event.data;
			if (data.source !== "skycode-preview") return;
			if (data.type === "sections-ready" && Array.isArray(data.sections)) {
				setPreviewSections(data.sections.slice(0, 201).filter((section) => Number.isInteger(section.index) && typeof section.label === "string" && typeof section.tag === "string").map((section) => ({
					index: Number(section.index),
					label: String(section.label).slice(0, 80),
					tag: String(section.tag).slice(0, 20)
				})));
				return;
			}
			if (data.type === "section-deselected") {
				setSelectedSection(null);
				setSectionContentDraft(null);
				setSectionInstruction("");
				setSectionHtmlDraft("");
				return;
			}
			if (data.type === "section-action" && Number.isInteger(data.index) && [
				"move-up",
				"move-down",
				"duplicate"
			].includes(data.action ?? "")) {
				if (previewHasChanges) {
					showToast("Run pending code changes before arranging sections.");
					return;
				}
				try {
					const index = Number(data.index);
					const updatedIndex = data.action === "duplicate" ? duplicatePreviewSection(files["index.html"], index) : movePreviewSection(files["index.html"], index, data.action === "move-up" ? "up" : "down");
					const description = data.action === "duplicate" ? "Section duplicated" : "Section moved";
					const updatedFiles = {
						...files,
						"index.html": updatedIndex
					};
					setSectionUndoStack((current) => [...current.slice(-19), files["index.html"]]);
					setSectionRedoStack([]);
					setFiles(updatedFiles);
					setPreviewFiles(updatedFiles);
					setActiveFile("index.html");
					setSaveStatus("Unsaved");
					setRunCount((count) => count + 1);
					setSelectedSection(null);
					setSectionContentDraft(null);
					setSectionDesignDraft(emptySectionDesignDraft());
					setSectionInstruction("");
					setSectionHtmlDraft("");
					setLogs((current) => [
						...current,
						{
							kind: "good",
							text: `✓ ${description}`
						},
						{
							kind: "muted",
							text: "Other preview sections were preserved"
						}
					]);
					showToast(description);
				} catch (error) {
					showToast(error instanceof Error ? error.message : "The section could not be arranged.");
				}
				return;
			}
			if (data.type !== "section-selected") return;
			if (previewHasChanges) {
				setToast("Run pending code changes before selecting a section.");
				window.setTimeout(() => setToast(""), 2200);
				return;
			}
			const section = data.section;
			if (!section || !Number.isInteger(section.index) || Number(section.index) < 0 || Number(section.index) > 200 || typeof section.label !== "string" || typeof section.tag !== "string" || typeof section.html !== "string" || section.html.length > 5e4) return;
			const nextSection = {
				index: Number(section.index),
				label: section.label.slice(0, 80),
				tag: section.tag.slice(0, 20),
				html: section.html,
				path: Array.isArray(section.path) ? section.path.filter((item) => typeof item === "string").slice(0, 4).map((item) => item.slice(0, 54)) : []
			};
			setSelectedSection(nextSection);
			setSectionContentDraft(readSectionContent(nextSection.html));
			setSectionDesignDraft(emptySectionDesignDraft());
			setSectionInspectorTab("content");
			setSectionHtmlDraft(nextSection.html);
			setSectionInstruction("");
		}
		window.addEventListener("message", receivePreviewMessage);
		return () => window.removeEventListener("message", receivePreviewMessage);
	}, [files, previewHasChanges]);
	(0, import_react.useEffect)(() => {
		setSelectedSection(null);
		setSectionContentDraft(null);
		setSectionDesignDraft(emptySectionDesignDraft());
		setSectionInstruction("");
		setSectionHtmlDraft("");
	}, [previewFiles]);
	function runProject() {
		if (running) return;
		setCanvasMode("preview");
		setMobileView("preview");
		setRunning(true);
		setPreviewFiles({ ...files });
		setRunCount((count) => count + 1);
		setLogs((current) => [...current, {
			kind: "muted",
			text: "Refreshing restricted browser preview…"
		}]);
		window.setTimeout(() => {
			setRunning(false);
			setLogs((current) => [...current, {
				kind: "good",
				text: "✓ Preview updated"
			}]);
			showToast("Preview updated");
		}, 650);
	}
	function resetSectionInspectorState() {
		setSelectedSection(null);
		setSectionContentDraft(null);
		setSectionDesignDraft(emptySectionDesignDraft());
		setSectionInstruction("");
		setSectionHtmlDraft("");
	}
	function commitSectionDocument(updatedIndex, description) {
		const updatedFiles = {
			...files,
			"index.html": updatedIndex
		};
		setSectionUndoStack((current) => [...current.slice(-19), files["index.html"]]);
		setSectionRedoStack([]);
		setFiles(updatedFiles);
		setPreviewFiles(updatedFiles);
		setActiveFile("index.html");
		setSaveStatus("Unsaved");
		setRunCount((count) => count + 1);
		resetSectionInspectorState();
		setLogs((current) => [
			...current,
			{
				kind: "good",
				text: `✓ ${description}`
			},
			{
				kind: "muted",
				text: "Other preview sections were preserved"
			}
		]);
		showToast(description);
	}
	function applySectionReplacement(replacementMarkup, source) {
		if (!selectedSection) return;
		const selectedLabel = selectedSection.label;
		commitSectionDocument(replacePreviewSection(files["index.html"], selectedSection.index, replacementMarkup), source === "manual" ? "Selected section updated" : "Selected section regenerated");
		setMessages((current) => [...current, {
			role: "assistant",
			text: `Updated only the selected ${selectedLabel.toLowerCase()} section. Every other section was preserved.`,
			changedCount: 1,
			engine: source === "cloud" ? "cloud" : "instant"
		}]);
	}
	function applySectionHtml() {
		if (!selectedSection || sectionWorking) return;
		try {
			applySectionReplacement(sectionHtmlDraft, "manual");
		} catch (error) {
			showToast(error instanceof Error ? error.message : "Section HTML is not valid.");
		}
	}
	function applySectionContentChanges() {
		if (!selectedSection || !sectionContentDraft || sectionWorking) return;
		try {
			applySectionReplacement(updateSectionContent(selectedSection.html, sectionContentDraft), "manual");
		} catch (error) {
			showToast(error instanceof Error ? error.message : "Section content could not be updated.");
		}
	}
	function applySectionDesignChanges() {
		if (!selectedSection || sectionWorking) return;
		try {
			applySectionReplacement(updateSectionDesign(selectedSection.html, sectionDesignDraft), "manual");
		} catch (error) {
			showToast(error instanceof Error ? error.message : "Section design could not be updated.");
		}
	}
	function arrangeSelectedSection(action) {
		if (!selectedSection || sectionWorking) return;
		if (action === "delete" && !window.confirm(`Delete the ${selectedSection.label} section? You can undo this action.`)) return;
		try {
			commitSectionDocument(action === "duplicate" ? duplicatePreviewSection(files["index.html"], selectedSection.index) : action === "delete" ? deletePreviewSection(files["index.html"], selectedSection.index) : movePreviewSection(files["index.html"], selectedSection.index, action === "move-up" ? "up" : "down"), {
				"move-up": "Section moved up",
				"move-down": "Section moved down",
				duplicate: "Section duplicated",
				delete: "Section deleted"
			}[action]);
		} catch (error) {
			showToast(error instanceof Error ? error.message : "The section could not be arranged.");
		}
	}
	function undoSectionChange() {
		const previous = sectionUndoStack.at(-1);
		if (!previous) {
			showToast("No section change to undo.");
			return;
		}
		const updatedFiles = {
			...files,
			"index.html": previous
		};
		setSectionUndoStack((current) => current.slice(0, -1));
		setSectionRedoStack((current) => [...current.slice(-19), files["index.html"]]);
		setFiles(updatedFiles);
		setPreviewFiles(updatedFiles);
		setSaveStatus("Unsaved");
		setRunCount((count) => count + 1);
		resetSectionInspectorState();
		setLogs((current) => [...current, {
			kind: "good",
			text: "↶ Section change undone"
		}]);
		showToast("Section change undone");
	}
	function redoSectionChange() {
		const next = sectionRedoStack.at(-1);
		if (!next) {
			showToast("No section change to redo.");
			return;
		}
		const updatedFiles = {
			...files,
			"index.html": next
		};
		setSectionRedoStack((current) => current.slice(0, -1));
		setSectionUndoStack((current) => [...current.slice(-19), files["index.html"]]);
		setFiles(updatedFiles);
		setPreviewFiles(updatedFiles);
		setSaveStatus("Unsaved");
		setRunCount((count) => count + 1);
		resetSectionInspectorState();
		setLogs((current) => [...current, {
			kind: "good",
			text: "↷ Section change restored"
		}]);
		showToast("Section change restored");
	}
	function selectPreviewSection(index) {
		previewFrameRef.current?.contentWindow?.postMessage({
			source: "skycode-workspace",
			type: "select-section",
			index
		}, "*");
	}
	async function regenerateSelectedSection() {
		if (!selectedSection || sectionWorking) return;
		const instruction = sectionInstruction.trim();
		if (!instruction) {
			showToast("Describe the change for this section first.");
			return;
		}
		if (instruction.length > 1200) {
			showToast("Section instructions are limited to 1,200 characters.");
			return;
		}
		setSectionWorking(true);
		setAiWorking(true);
		setAiStatusIndex(0);
		try {
			let replacement;
			let source = "instant";
			if (aiMode === "cloud" && cloudConnected) {
				const markedFiles = {
					...files,
					"index.html": markPreviewSection(files["index.html"], selectedSection.index)
				};
				const scopedRequest = [
					"Update ONLY the HTML element marked data-skycode-target=\"selected-section\".",
					"Preserve that marker in the returned index.html.",
					"Do not alter any content outside the marked element.",
					"Keep styles for this change inline on elements inside the selected section.",
					`Requested section change: ${instruction}`
				].join("\n");
				replacement = extractMarkedSection((await generateCloudProject({
					category: selectedCategory ?? "website",
					request: scopedRequest,
					files: markedFiles
				})).files["index.html"]);
				source = "cloud";
			} else {
				await new Promise((resolve) => window.setTimeout(resolve, 500));
				replacement = transformSectionLocally(selectedSection.html, instruction);
			}
			applySectionReplacement(replacement, source);
		} catch (error) {
			showToast(error instanceof Error ? error.message : "The selected section could not be updated.");
		} finally {
			setSectionWorking(false);
			setAiWorking(false);
		}
	}
	function toggleSectionEditing() {
		if (!sectionEditMode && previewHasChanges) runProject();
		setSectionEditMode((enabled) => !enabled);
		resetSectionInspectorState();
	}
	function openSelectedSectionCode() {
		setActiveFile("index.html");
		setCanvasMode("code");
		setMobileView("code");
	}
	function closeSectionInspector() {
		resetSectionInspectorState();
		previewFrameRef.current?.contentWindow?.postMessage({
			source: "skycode-workspace",
			type: "clear-section-selection"
		}, "*");
	}
	function showToast(message) {
		setToast(message);
		window.setTimeout(() => setToast(""), 2200);
	}
	function persistWorkspaceDraft() {
		try {
			window.sessionStorage.setItem(cloudStorageKeys.draft, JSON.stringify({
				files,
				baselineFiles,
				projectId,
				projectName,
				saveStatus: saveStatus === "Saving" ? "Unsaved" : saveStatus,
				category: selectedCategory,
				buildPrompt,
				projectBrief,
				onboardingOpen
			}));
			return true;
		} catch {
			return false;
		}
	}
	async function saveProject() {
		if (saveStatus === "Saving") return;
		setSaveStatus("Saving");
		try {
			const response = await fetch("/api/projects", {
				method: projectId ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...projectId ? { id: projectId } : {},
					name: projectName,
					template: selectedCategory ?? "web",
					files
				})
			});
			const data = await response.json();
			if (response.status === 401) {
				setSaveStatus("Unsaved");
				if (!persistWorkspaceDraft()) throw new Error("Sign-in is required, and this browser could not preserve the draft.");
				const returnTo = `${window.location.pathname}${window.location.search}`;
				window.location.assign(`/signin-with-chatgpt?return_to=${encodeURIComponent(returnTo)}`);
				return;
			}
			if (!response.ok || !data.project) throw new Error(data.error ?? "Project could not be saved.");
			if (!projectId) {
				setProjectId(data.project.id);
				window.history.replaceState(null, "", `/workspace?project=${encodeURIComponent(data.project.id)}`);
			}
			setSaveStatus("Saved");
			showToast("Project saved securely");
		} catch (error) {
			setSaveStatus("Unsaved");
			showToast(error instanceof Error ? error.message : "Project could not be saved.");
		}
	}
	async function copyWorkspaceLink() {
		if (!projectId) {
			showToast("Save the project before copying its private link.");
			return;
		}
		try {
			await navigator.clipboard.writeText(window.location.href);
			showToast("Private project link copied");
		} catch {
			showToast("Copy the current address to keep this private project link.");
		}
	}
	function exportProject() {
		const blob = new Blob([buildPreviewDocument(files)], { type: "text/html;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${projectName.replace(/[^a-zA-Z0-9_-]/g, "-") || "skycode-project"}.html`;
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
		showToast("Static project exported");
	}
	async function importWorkspaceFile(file) {
		if (!file) return;
		const target = fileMeta.find((item) => item.name === file.name)?.name;
		if (!target) {
			showToast("Import index.html, styles.css, app.js, or package.json.");
			return;
		}
		if (file.size > 18e4) {
			showToast("Imported files must be smaller than 180 KB.");
			return;
		}
		try {
			const content = await file.text();
			if (new TextEncoder().encode(content).byteLength > 18e4) throw new Error("Imported files must be smaller than 180 KB.");
			setFiles((current) => ({
				...current,
				[target]: content
			}));
			setActiveFile(target);
			setSaveStatus("Unsaved");
			showToast(`${target} imported`);
		} catch (error) {
			showToast(error instanceof Error ? error.message : "File import failed.");
		} finally {
			if (importFileRef.current) importFileRef.current.value = "";
		}
	}
	function selectPanel(panel) {
		setActivePanel(panel);
		setMobilePanelOpen((open) => panel === activePanel ? !open : true);
		setOptionsOpen(false);
	}
	function openFile(name) {
		setActiveFile(name);
		setCanvasMode("code");
		setMobileView("code");
		setMobilePanelOpen(false);
	}
	function switchCanvas(mode) {
		setCanvasMode(mode);
		setMobileView(mode);
		if (mode === "preview" && previewHasChanges) runProject();
	}
	function switchLayout(version) {
		setLayoutVersion(version);
		window.localStorage.setItem(workspaceLayoutStorageKey, version);
		showToast(version === "studio" ? "Version 1 studio layout" : "Version 2 classic layout");
	}
	function commitChanges() {
		const cleanMessage = commitMessage.trim();
		if (!cleanMessage || changedFiles.length === 0) return;
		setBaselineFiles({ ...files });
		setCommits((current) => [{
			message: cleanMessage.slice(0, 80),
			time: "Now"
		}, ...current.map((commit, index) => ({
			...commit,
			time: index === 0 ? "Earlier" : commit.time
		}))]);
		setCommitMessage("");
		setLogs((current) => [...current, {
			kind: "good",
			text: `✓ Local checkpoint: ${cleanMessage.slice(0, 42)}`
		}]);
		showToast("Local checkpoint created");
	}
	function revertFile(name) {
		setFiles((current) => ({
			...current,
			[name]: baselineFiles[name]
		}));
		setActiveFile(name);
		setSaveStatus("Unsaved");
		showToast(`${name} restored to the last checkpoint`);
	}
	function openBuildWizard() {
		setSelectedCategory(null);
		setBuildPrompt("");
		setOnboardingOpen(true);
		setMobilePanelOpen(false);
	}
	function openAiAssistant() {
		if (!selectedCategory) {
			openBuildWizard();
			return;
		}
		setOnboardingOpen(false);
		setMobileView("ai");
		window.requestAnimationFrame(() => {
			document.querySelector(".prompt-box textarea")?.focus();
		});
	}
	async function connectCloudAi() {
		if (cloudConnecting) return;
		setCloudConnecting(true);
		try {
			const status = await getManagedAiStatus();
			setCloudAuthenticated(status.authenticated);
			setCloudConfigured(status.configured);
			setCloudModel(status.model ?? "");
			if (!status.authenticated) {
				if (!persistWorkspaceDraft()) throw new Error("The browser could not preserve this workspace draft.");
				window.location.assign(`/signin-with-chatgpt?return_to=${encodeURIComponent("/workspace")}`);
				return;
			}
			if (!status.configured) {
				setCloudConnected(false);
				showToast("Cloud AI backend is ready. Add the server API key to activate it.");
				return;
			}
			setCloudConnected(true);
			setAiMode("cloud");
			showToast("Protected server Cloud AI is ready");
		} catch (error) {
			showToast(error instanceof Error ? error.message : "Cloud AI connection could not start.");
		} finally {
			setCloudConnecting(false);
		}
	}
	function disconnectCloudAi() {
		setCloudConnected(false);
		setAiMode("instant");
		showToast("Switched to Instant Builder");
	}
	async function generateWithCloud(category, request) {
		return generateCloudProject({
			category,
			request,
			files
		});
	}
	async function sendPrompt(value = prompt, categoryOverride, createNewProject = false) {
		const cleanPrompt = value.trim();
		if (!cleanPrompt || aiWorking) return;
		if (cleanPrompt.length > 3e3) {
			showToast("Prompts are limited to 3,000 characters.");
			return;
		}
		const category = categoryOverride ?? selectedCategory;
		if (!category) {
			setBuildPrompt(cleanPrompt);
			setPrompt("");
			setOnboardingOpen(true);
			return;
		}
		setPrompt("");
		setMessages((current) => [...current, {
			role: "user",
			text: cleanPrompt
		}]);
		setAiWorking(true);
		let engine = aiMode === "cloud" && cloudConnected ? "cloud" : "instant";
		let cloudFailure = "";
		const localRequest = createNewProject || !projectBrief ? cleanPrompt : `${projectBrief}\nRequested update: ${cleanPrompt}`;
		try {
			let generated;
			if (engine === "cloud") try {
				generated = await generateWithCloud(category, cleanPrompt);
			} catch (error) {
				if (error instanceof ManagedAiError && error.code === "AUTH_REQUIRED") {
					if (persistWorkspaceDraft() && error.signInPath) window.location.assign(error.signInPath);
					throw error;
				}
				cloudFailure = error instanceof Error ? error.message : "The server Cloud AI model was unavailable.";
				generated = generateLocalProject(category, localRequest);
				engine = "fallback";
			}
			else {
				await new Promise((resolve) => window.setTimeout(resolve, 2200));
				generated = generateLocalProject(category, localRequest);
			}
			setAiStatusIndex(aiStatusSteps.length - 1);
			await new Promise((resolve) => window.setTimeout(resolve, 320));
			if (createNewProject) {
				setProjectId("");
				setBaselineFiles(starterFiles);
				setProjectBrief(cleanPrompt);
				window.history.replaceState(null, "", "/workspace");
			}
			setFiles(generated.files);
			setPreviewFiles(generated.files);
			setCanvasMode("preview");
			setMobileView("preview");
			setProjectName(generated.name);
			setSelectedCategory(category);
			setActiveFile("index.html");
			setSaveStatus("Unsaved");
			setRunCount((count) => count + 1);
			setLogs((current) => [
				...current,
				{
					kind: "good",
					text: engine === "cloud" ? "✓ Server Cloud AI generated 4 files" : engine === "fallback" ? "✓ Instant builder completed the cloud request" : "✓ Instant builder generated 4 files locally"
				},
				{
					kind: "muted",
					text: "Preview updated automatically"
				}
			]);
			setMessages((current) => [...current, {
				role: "assistant",
				text: engine === "fallback" ? `Server Cloud AI was unavailable (${cloudFailure.slice(0, 120)}), so the instant builder completed your project instead. ${generated.summary}` : generated.summary,
				changedCount: 4,
				engine
			}]);
			showToast(engine === "cloud" ? "Server Cloud AI project generated" : "Project generated free on this device");
		} catch (error) {
			setMessages((current) => [...current, {
				role: "assistant",
				text: error instanceof Error ? `I couldn’t generate the project: ${error.message}` : "I couldn’t generate the project. Please try again.",
				engine
			}]);
		} finally {
			setAiWorking(false);
		}
	}
	function submitBuildWizard() {
		if (!selectedCategory || !buildPrompt.trim() || aiWorking) return;
		setOnboardingOpen(false);
		sendPrompt(buildPrompt, selectedCategory, true);
	}
	function startPanelResize(panel, event) {
		if (event.pointerType === "mouse" && event.button !== 0) return;
		event.preventDefault();
		event.currentTarget.setPointerCapture(event.pointerId);
		panelDragRef.current = {
			panel,
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			sizes: panelSizes
		};
		setResizingPanel(panel);
	}
	function continuePanelResize(event) {
		const drag = panelDragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		event.preventDefault();
		const horizontalDelta = drag.panel === "ai" && layoutVersion === "studio" ? drag.startX - event.clientX : event.clientX - drag.startX;
		setPanelSizes(resizePanels(drag.panel, drag.sizes, horizontalDelta, event.clientY - drag.startY, window.innerWidth, window.innerHeight));
	}
	function finishPanelResize(event) {
		const drag = panelDragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
		panelDragRef.current = null;
		setResizingPanel(null);
	}
	function resizePanelWithKeyboard(panel, event) {
		let deltaX = 0;
		let deltaY = 0;
		const step = event.shiftKey ? 40 : 16;
		if (panel === "utility") if (event.key === "ArrowUp") deltaY = -step;
		else if (event.key === "ArrowDown") deltaY = step;
		else return;
		else if (event.key === "ArrowLeft") deltaX = -step;
		else if (event.key === "ArrowRight") deltaX = step;
		else return;
		event.preventDefault();
		if (panel === "ai" && layoutVersion === "studio") deltaX *= -1;
		setPanelSizes((current) => resizePanels(panel, current, deltaX, deltaY, window.innerWidth, window.innerHeight));
	}
	function resetPanelSize(panel) {
		setPanelSizes((current) => panel ? {
			...current,
			[panel]: defaultPanelSizes[panel]
		} : defaultPanelSizes);
		showToast(panel ? "Panel size reset" : "Workspace layout reset");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "workspace",
		"data-layout-version": layoutVersion,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "topbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "project-identity",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "logo-mark",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SkyCode" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "crumb",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "project-name",
								onClick: openBuildWizard,
								children: [
									projectName,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⌄" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `save-state ${saveStatus.toLowerCase()}`,
								onClick: saveProject,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									" ",
									saveStatus
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "workspace-canvas-switcher",
						role: "tablist",
						"aria-label": "Center workspace view",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: canvasMode === "preview" ? "active" : "",
							role: "tab",
							"aria-selected": canvasMode === "preview",
							onClick: () => switchCanvas("preview"),
							children: ["Preview", previewHasChanges && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: canvasMode === "code" ? "active" : "",
							role: "tab",
							"aria-selected": canvasMode === "code",
							onClick: () => switchCanvas("code"),
							children: "Code"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "top-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `ai-launch-button${cloudConnected ? " cloud-ready" : ""}`,
								onClick: openAiAssistant,
								title: cloudConnected ? "Open Sky AI · Server Cloud ready" : "Open Sky AI",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "spark",
										size: 15
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sky AI" }),
									cloudConnected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "layout-version-switcher",
								"aria-label": "Workspace layout version",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: layoutVersion === "studio" ? "active" : "",
									"aria-pressed": layoutVersion === "studio",
									onClick: () => switchLayout("studio"),
									title: "New studio workspace",
									children: "V1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: layoutVersion === "classic" ? "active" : "",
									"aria-pressed": layoutVersion === "classic",
									onClick: () => switchLayout("classic"),
									title: "Previous SkyCode workspace",
									children: "V2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "layout-reset-button",
								onClick: () => resetPanelSize(),
								title: "Reset panel sizes",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "layout",
									size: 15
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset layout" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "avatars",
								"aria-label": "Project collaborators",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SK" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "ghost-button",
								onClick: copyWorkspaceLink,
								children: "Copy link"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "run-button",
								onClick: runProject,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "play",
										size: 15
									}),
									" ",
									running ? "Running…" : previewHasChanges ? "Run changes" : "Run"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "deploy-button",
								onClick: exportProject,
								children: "Export"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "workspace-overflow-menu",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
									"aria-label": "Open workspace actions",
									children: "•••"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Workspace" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: openAiAssistant,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "spark",
											size: 15
										}), " Open Sky AI"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => switchCanvas("preview"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "layout",
											size: 15
										}), " Live preview"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => switchCanvas("code"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "terminal",
											size: 15
										}), " Code editor"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: runProject,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "play",
											size: 15
										}), " Run project"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: exportProject,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "files",
											size: 15
										}), " Export project"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: copyWorkspaceLink,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "external",
											size: 15
										}), " Copy workspace link"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Layout" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => switchLayout("studio"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "layout",
											size: 15
										}), " Studio layout (V1)"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => switchLayout("classic"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "layout",
											size: 15
										}), " Classic layout (V2)"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => resetPanelSize(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "refresh",
											size: 15
										}), " Reset panel sizes"]
									})
								] })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `app-shell${resizingPanel ? " is-resizing" : ""}`,
				"data-mobile-view": mobileView,
				"data-layout-version": layoutVersion,
				"data-canvas-mode": canvasMode,
				"data-resizing": resizingPanel ?? void 0,
				style: {
					"--ai-panel-width": `${panelSizes.ai}px`,
					"--preview-panel-width": `${panelSizes.preview}px`,
					"--utility-panel-height": `${panelSizes.utility}px`
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "activity-bar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: Object.keys(activityLabels).map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: activePanel === name ? "active" : "",
							"aria-label": activityLabels[name],
							"aria-pressed": activePanel === name,
							title: activityLabels[name],
							onClick: () => selectPanel(name),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "activity-label",
									children: activityLabels[name]
								}),
								name === "git" && changedFiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "activity-count",
									children: changedFiles.length
								})
							]
						}, name)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "profile-button",
							"aria-label": "Open project dashboard",
							onClick: () => {
								window.location.href = "/dashboard";
							},
							children: "SK"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: `explorer activity-panel ${mobilePanelOpen ? "mobile-open" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "panel-title",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activityLabels[activePanel].toUpperCase() }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "panel-controls",
									children: [
										activePanel === "files" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											"aria-label": "File options",
											"aria-expanded": optionsOpen,
											onClick: () => setOptionsOpen((open) => !open),
											children: "•••"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "panel-close",
											"aria-label": "Close panel",
											onClick: () => setMobilePanelOpen(false),
											children: "×"
										}),
										optionsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "panel-menu",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														saveProject();
														setOptionsOpen(false);
													},
													children: "Save project"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														exportProject();
														setOptionsOpen(false);
													},
													children: "Export HTML"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														setProjectExpanded(false);
														setSrcExpanded(false);
														setOptionsOpen(false);
													},
													children: "Collapse folders"
												})
											]
										})
									]
								})]
							}),
							activePanel === "files" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "tree-heading",
									"aria-expanded": projectExpanded,
									onClick: () => setProjectExpanded((expanded) => !expanded),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: projectExpanded ? "tree-caret expanded" : "tree-caret",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "chevron",
											size: 13
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: projectName.toUpperCase() })]
								}),
								projectExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "file-tree",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "folder-row",
											"aria-expanded": srcExpanded,
											onClick: () => setSrcExpanded((expanded) => !expanded),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: srcExpanded ? "⌄" : "›" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "⌗" }),
												" src"
											]
										}),
										srcExpanded && fileMeta.slice(0, 3).map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: activeFile === file.name ? "selected" : "",
											onClick: () => openFile(file.name),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileIcon, { tone: file.tone }),
												file.name,
												changedFiles.some((changed) => changed.name === file.name) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "change-dot" })
											]
										}, file.name)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: activeFile === "package.json" ? "selected root-file" : "root-file",
											onClick: () => openFile("package.json"),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileIcon, { tone: "json" }),
												" package.json",
												changedFiles.some((changed) => changed.name === "package.json") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "change-dot" })
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "explorer-footer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setOutlineOpen((open) => !open),
											"aria-expanded": outlineOpen,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OUTLINE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: outlineOpen ? "⌄" : "›" })]
										}),
										outlineOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "outline-list",
											children: outlineItems[activeFile].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => showToast(`${item} selected in ${activeFile}`),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "◇" }), item]
											}, item))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setTimelineOpen((open) => !open),
											"aria-expanded": timelineOpen,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TIMELINE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: timelineOpen ? "⌄" : "›" })]
										}),
										timelineOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "timeline-list",
											children: commits.map((commit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: commit.message }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: commit.time })
											] }, `${commit.message}-${index}`))
										})
									]
								})
							] }),
							activePanel === "search" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "search-workspace-panel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "workspace-search",
										children: "SEARCH ACROSS FILES"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "search-input-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: "search",
												size: 14
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "workspace-search",
												type: "search",
												value: searchQuery,
												onChange: (event) => setSearchQuery(event.target.value),
												placeholder: "Search code…",
												autoComplete: "off"
											}),
											searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												"aria-label": "Clear search",
												onClick: () => setSearchQuery(""),
												children: "×"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "search-summary",
										children: searchQuery ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"}` : "Type to search every project file"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "search-results",
										children: [searchResults.map((result, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => openFile(result.name),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileIcon, { tone: fileMeta.find((file) => file.name === result.name)?.tone ?? "html" }),
												result.name,
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [":", result.line] })
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: result.preview })]
										}, `${result.name}-${result.line}-${index}`)), searchQuery && searchResults.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "panel-empty",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "search" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"No code matched “",
												searchQuery,
												"”."
											] })]
										})]
									})
								]
							}),
							activePanel === "git" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "source-panel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "source-heading",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LOCAL CHANGES" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: changedFiles.length })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "commit-box",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: commitMessage,
											onChange: (event) => setCommitMessage(event.target.value),
											onKeyDown: (event) => {
												if (event.key === "Enter") commitChanges();
											},
											placeholder: "Checkpoint message",
											maxLength: 80
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											disabled: !commitMessage.trim() || changedFiles.length === 0,
											onClick: commitChanges,
											children: "Commit checkpoint"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "source-files",
										children: [changedFiles.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => openFile(file.name),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileIcon, { tone: file.tone }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: file.name }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "M" })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											"aria-label": `Revert ${file.name}`,
											onClick: () => revertFile(file.name),
											children: "↶"
										})] }, file.name)), changedFiles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "panel-empty source-clean",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No local changes" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Edit a file to see it here." })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "source-history",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CHECKPOINT HISTORY" }), commits.map((commit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: commit.message }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: commit.time })
										] }, `${commit.message}-${index}`))]
									})
								]
							}),
							activePanel === "database" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "tools-panel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "panel-description",
										children: "Protected project storage and backend tools."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => void saveProject(),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tool-icon save",
												children: "✓"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Save project" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Store files securely" })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "›" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											window.location.href = "/dashboard";
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tool-icon",
												children: "▦"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Project dashboard" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Manage saved projects" })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "›" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "tool-status",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Private project records" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: cloudAuthenticated ? "Connected" : "Sign in to save" })
										]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "editor-column",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "editor-tabs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "tab active",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileIcon, { tone: fileMeta.find((file) => file.name === activeFile)?.tone ?? "html" }),
										activeFile,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "close",
											size: 12
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "editor-spacer" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "breadcrumb",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "src" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "›" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activeFile }),
									activeFile === "index.html" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "›" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "main.hero" })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "code-editor",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "line-numbers",
									"aria-hidden": "true",
									children: lines.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: index + 1 }, index))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "code-input",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
										ref: codeHighlightRef,
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: renderHighlightedCode(files[activeFile]) })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										"aria-label": `${activeFile} code editor`,
										spellCheck: false,
										value: files[activeFile],
										onScroll: (event) => {
											if (!codeHighlightRef.current) return;
											codeHighlightRef.current.scrollTop = event.currentTarget.scrollTop;
											codeHighlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
										},
										onChange: (event) => {
											const nextValue = event.currentTarget.value;
											setFiles((current) => ({
												...current,
												[activeFile]: nextValue
											}));
											setSaveStatus("Unsaved");
										}
									})]
								})]
							}),
							canvasMode === "code" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "terminal-panel",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "terminal-head",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "terminal-section-label",
										children: "ACTIVITY"
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "browser sandbox" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": "Clear activity",
										onClick: () => setLogs([]),
										children: "Clear"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "terminal-body",
									children: logs.length ? logs.slice(-5).map((log, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: log.kind,
										children: log.text
									}, `${log.text}-${index}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "muted",
										children: "Activity cleared. Run the preview to create a new entry."
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "right-column",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "preview-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "preview-head",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "preview-tabs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "active",
												children: "Secure preview"
											}), sectionEditMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "section-mode-label",
												children: "Section edit"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "preview-device-switcher",
											"aria-label": "Preview size",
											children: [
												"desktop",
												"tablet",
												"phone"
											].map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: previewDevice === device ? "active" : "",
												"aria-label": `${device} preview`,
												"aria-pressed": previewDevice === device,
												onClick: () => setPreviewDevice(device),
												title: `${device[0].toUpperCase()}${device.slice(1)} preview`,
												children: device === "desktop" ? "▰" : device === "tablet" ? "▯" : "▯"
											}, device))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "preview-actions",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: undoSectionChange,
													disabled: !sectionUndoStack.length,
													"aria-label": "Undo section change",
													title: "Undo section change",
													children: "↶"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: redoSectionChange,
													disabled: !sectionRedoStack.length,
													"aria-label": "Redo section change",
													title: "Redo section change",
													children: "↷"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: `section-mode-toggle${sectionEditMode ? " active" : ""}`,
													"aria-pressed": sectionEditMode,
													onClick: toggleSectionEditing,
													title: sectionEditMode ? "Turn off section selection" : "Select and edit one preview section",
													children: sectionEditMode ? "Edit on" : "Edit"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: runProject,
													"aria-label": "Refresh preview",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
														name: "refresh",
														size: 14
													})
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "address-bar",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `status-dot${running ? " running" : previewHasChanges ? " pending" : ""}` }),
										sectionEditMode && previewSections.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "section-navigator",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jump to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												"aria-label": "Jump to a page section",
												value: selectedSection?.index ?? "",
												onChange: (event) => selectPreviewSection(Number(event.target.value)),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													disabled: true,
													children: "Choose section"
												}), previewSections.map((section, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: section.index,
													children: [
														index + 1,
														". ",
														section.label
													]
												}, `${section.index}-${section.label}`))]
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: running ? "Updating preview…" : previewHasChanges ? "Changes ready — press Run" : sectionEditMode ? "Click a boxed section to edit only that section" : "Preview up to date" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "preview-lock",
											"aria-label": "Network-restricted preview",
											children: "◆"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "preview-canvas",
									"data-preview-device": previewDevice,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
										ref: previewFrameRef,
										title: "Live project preview",
										srcDoc,
										sandbox: "allow-scripts",
										referrerPolicy: "no-referrer"
									}, runCount), selectedSection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
										className: `section-inspector section-tab-${sectionInspectorTab}`,
										"aria-label": `Edit ${selectedSection.label} section`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "section-inspector-head",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [selectedSection.label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
													"<",
													selectedSection.tag,
													">"
												] })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: `section-code-toggle${sectionInspectorTab === "code" ? " active" : ""}`,
														"aria-label": "Edit section HTML",
														onClick: () => setSectionInspectorTab("code"),
														title: "Edit section HTML",
														children: "</>"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
														className: "section-more-menu",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
															"aria-label": "More section actions",
															title: "More section actions",
															children: "•••"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => arrangeSelectedSection("move-up"),
																children: "↑ Move up"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => arrangeSelectedSection("move-down"),
																children: "↓ Move down"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => arrangeSelectedSection("duplicate"),
																children: "⧉ Duplicate"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																className: "danger",
																onClick: () => arrangeSelectedSection("delete"),
																children: "× Delete"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: openSelectedSectionCode,
																children: "Open full code"
															})
														] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: "section-inspector-close",
														"aria-label": "Close section editor",
														onClick: closeSectionInspector,
														children: "×"
													})
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "section-inspector-tabs",
												role: "tablist",
												"aria-label": "Section editor",
												children: [
													"content",
													"design",
													"ai"
												].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													role: "tab",
													"aria-selected": sectionInspectorTab === tab,
													className: sectionInspectorTab === tab ? "active" : "",
													onClick: () => setSectionInspectorTab(tab),
													children: tab === "ai" ? "AI edit" : `${tab[0].toUpperCase()}${tab.slice(1)}`
												}, tab))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "section-inspector-body",
												children: [
													sectionInspectorTab === "content" && sectionContentDraft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "section-content-editor",
														role: "tabpanel",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "section-tab-intro",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Edit visible content" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Simple fields keep the structure safe." })]
															}),
															sectionContentDraft.hasHeading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Heading" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																value: sectionContentDraft.heading,
																maxLength: 180,
																onChange: (event) => setSectionContentDraft((current) => current ? {
																	...current,
																	heading: event.target.value
																} : current)
															})] }),
															sectionContentDraft.hasBody && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Body text" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																value: sectionContentDraft.body,
																maxLength: 900,
																onChange: (event) => setSectionContentDraft((current) => current ? {
																	...current,
																	body: event.target.value
																} : current)
															})] }),
															sectionContentDraft.hasButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "section-field-grid",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Button label" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																	value: sectionContentDraft.buttonLabel,
																	maxLength: 80,
																	onChange: (event) => setSectionContentDraft((current) => current ? {
																		...current,
																		buttonLabel: event.target.value
																	} : current)
																})] }), sectionContentDraft.buttonSupportsLink && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Button link" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																	value: sectionContentDraft.buttonHref,
																	maxLength: 400,
																	placeholder: "#contact",
																	onChange: (event) => setSectionContentDraft((current) => current ? {
																		...current,
																		buttonHref: event.target.value
																	} : current)
																})] })]
															}),
															!sectionContentDraft.hasHeading && !sectionContentDraft.hasBody && !sectionContentDraft.hasButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "section-empty-state",
																children: "No standard text fields found. Use AI edit or Code for this section."
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																className: "section-primary-action",
																disabled: sectionWorking,
																onClick: applySectionContentChanges,
																children: "Apply content"
															})
														]
													}),
													sectionInspectorTab === "design" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "section-design-editor",
														role: "tabpanel",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "section-tab-intro",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Style this section" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Responsive choices—no CSS knowledge needed." })]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Background" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "section-color-options",
																children: [
																	["", "Keep"],
																	["#fff7f1", "Cream"],
																	["#ff5a1f", "Orange"],
																	["#0b0c10", "Dark"],
																	["#eaf4ff", "Sky"]
																].map(([color, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	className: sectionDesignDraft.background === color ? "active" : "",
																	onClick: () => setSectionDesignDraft((current) => ({
																		...current,
																		background: color
																	})),
																	title: label,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: color || "linear-gradient(135deg,#fff 50%,#222 50%)" } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
																}, label))
															})] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Alignment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "section-segmented-control",
																children: [
																	"keep",
																	"left",
																	"center",
																	"right"
																].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	className: sectionDesignDraft.alignment === option ? "active" : "",
																	onClick: () => setSectionDesignDraft((current) => ({
																		...current,
																		alignment: option
																	})),
																	children: option
																}, option))
															})] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
																className: "section-advanced-style",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "More style options" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Text color" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "section-color-options compact",
																		children: [
																			["", "Keep"],
																			["#171717", "Ink"],
																			["#ffffff", "White"],
																			["#6b7280", "Muted"]
																		].map(([color, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																			className: sectionDesignDraft.textColor === color ? "active" : "",
																			onClick: () => setSectionDesignDraft((current) => ({
																				...current,
																				textColor: color
																			})),
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: color || "linear-gradient(135deg,#fff 50%,#222 50%)" } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
																		}, label))
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "section-color-options compact",
																		children: [
																			["", "Keep"],
																			["#ff5a1f", "Orange"],
																			["#8b5cf6", "Purple"],
																			["#24b47e", "Green"],
																			["#2797ff", "Blue"]
																		].map(([color, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																			className: sectionDesignDraft.accent === color ? "active" : "",
																			onClick: () => setSectionDesignDraft((current) => ({
																				...current,
																				accent: color
																			})),
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: color || "linear-gradient(135deg,#fff 50%,#222 50%)" } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
																		}, label))
																	})] }),
																	[{
																		key: "padding",
																		label: "Vertical spacing",
																		options: [
																			"keep",
																			"compact",
																			"balanced",
																			"spacious"
																		]
																	}, {
																		key: "radius",
																		label: "Corners",
																		options: [
																			"keep",
																			"none",
																			"soft",
																			"rounded",
																			"pill"
																		]
																	}].map((control) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: control.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "section-segmented-control",
																		children: control.options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			className: sectionDesignDraft[control.key] === option ? "active" : "",
																			onClick: () => setSectionDesignDraft((current) => ({
																				...current,
																				[control.key]: option
																			})),
																			children: option
																		}, option))
																	})] }, control.key))
																] })]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																className: "section-primary-action",
																disabled: sectionWorking,
																onClick: applySectionDesignChanges,
																children: "Apply design"
															})
														]
													}),
													sectionInspectorTab === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "section-ai-editor",
														role: "tabpanel",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "section-tab-intro",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Describe the result" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI is locked to this selected section." })]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "section-suggestion-list",
																children: ["Make it orange and rounded", "Make it compact and centered"].map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => setSectionInstruction(suggestion),
																	children: suggestion
																}, suggestion))
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
																className: "section-instruction",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Change only this section" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																	autoFocus: true,
																	value: sectionInstruction,
																	onChange: (event) => setSectionInstruction(event.target.value),
																	maxLength: 1200,
																	placeholder: "Try: Make it more compact, or change the title to “Build faster”."
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "section-inspector-actions",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: aiMode === "cloud" && cloudConnected ? "Protected Cloud AI" : "Instant focused edit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	disabled: sectionWorking || !sectionInstruction.trim(),
																	onClick: () => void regenerateSelectedSection(),
																	children: sectionWorking ? "Updating…" : "Update this section"
																})]
															})
														]
													}),
													sectionInspectorTab === "code" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "section-html-editor",
														role: "tabpanel",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "section-tab-intro",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Section HTML" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scripts, frames, and unsafe handlers are blocked." })]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																"aria-label": `${selectedSection.label} HTML`,
																spellCheck: false,
																value: sectionHtmlDraft,
																onChange: (event) => setSectionHtmlDraft(event.target.value)
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																className: "section-primary-action",
																disabled: sectionWorking,
																onClick: applySectionHtml,
																children: "Apply HTML"
															})
														]
													})
												]
											})
										]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "ai-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ai-head",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ai-icon",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: "spark",
												size: 15
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sky AI" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `ai-engine-status ${aiMode}`,
											children: aiMode === "cloud" && cloudConnected ? "SERVER CLOUD" : "INSTANT FREE"
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: openBuildWizard,
										"aria-label": "Start a new AI build",
										children: "＋"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (cloudConnected) setAiMode((mode) => mode === "cloud" ? "instant" : "cloud");
											else setOnboardingOpen(true);
										},
										"aria-label": "Switch AI engine",
										children: aiMode === "cloud" ? "☁" : "⌁"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "messages",
									children: [messages.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `message ${message.role}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "message-avatar",
											children: message.role === "user" ? "SK" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: "spark",
												size: 13
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [message.role === "user" ? "You" : "Sky AI", message.role === "assistant" && message.engine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
												className: `message-engine ${message.engine}`,
												children: message.engine === "cloud" ? "Cloud" : message.engine === "fallback" ? "Local fallback" : "On-device"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message.text }),
											message.role === "assistant" && message.changedCount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "change-card",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: message.changedCount }), " files changed"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: runProject,
													children: "Review changes"
												})]
											})
										] })]
									}, index)), aiWorking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ai-progress-card",
										role: "status",
										"aria-live": "polite",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "ai-progress-summary",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ai-progress-spinner",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
															name: "spark",
															size: 14
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: aiStatusSteps[aiStatusIndex].title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: aiStatusSteps[aiStatusIndex].detail })] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "ai-progress-count",
														children: [
															aiStatusIndex + 1,
															"/",
															aiStatusSteps.length
														]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "ai-progress-track",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${(aiStatusIndex + 1) / aiStatusSteps.length * 100}%` } })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "ai-progress-steps",
												children: aiStatusSteps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: index < aiStatusIndex ? "complete" : index === aiStatusIndex ? "active" : "",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: index < aiStatusIndex ? "✓" : index + 1 }), step.title]
												}, step.title))
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "prompt-area",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "suggestions",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: openBuildWizard,
													children: "＋ New build"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => sendPrompt("Add a premium purple glow"),
													children: "Add premium glow"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => sendPrompt("Improve the CTA button"),
													children: "Improve CTA"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "prompt-box",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												"aria-label": "Ask Sky AI",
												placeholder: "Ask Sky AI to build, edit, or explain…",
												value: prompt,
												onChange: (event) => setPrompt(event.target.value),
												maxLength: 3e3,
												onKeyDown: (event) => {
													if (event.key === "Enter" && !event.shiftKey) {
														event.preventDefault();
														sendPrompt();
													}
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													ref: importFileRef,
													className: "file-import-input",
													type: "file",
													accept: ".html,.css,.js,.json",
													onChange: (event) => void importWorkspaceFile(event.target.files?.[0])
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "attach-button",
													"aria-label": "Import a supported project file",
													onClick: () => importFileRef.current?.click(),
													children: "＋"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													className: "prompt-engine",
													onClick: () => {
														if (cloudConnected) setAiMode((mode) => mode === "cloud" ? "instant" : "cloud");
														else setOnboardingOpen(true);
													},
													children: [
														aiMode === "cloud" && cloudConnected ? "Server cloud" : "Instant free",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "⌄" })
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "send-button",
													disabled: aiWorking,
													onClick: () => void sendPrompt(),
													"aria-label": "Send prompt",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
														name: "send",
														size: 14
													})
												})
											] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Instant mode costs nothing and needs no login. Always review generated code." })
									]
								})
							]
						})]
					}),
					canvasMode === "code" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "bottom-dock",
						"aria-label": "Developer tools",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bottom-dock-tabs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: Object.keys(bottomPanelLabels).map((panel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: activeBottomPanel === panel ? "active" : "",
								"aria-pressed": activeBottomPanel === panel,
								onClick: () => setActiveBottomPanel(panel),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: bottomPanelLabels[panel].icon,
										size: 14
									}),
									bottomPanelLabels[panel].label,
									panel === "problems" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bottom-tab-count",
										children: workspaceProblems.length
									})
								]
							}, panel)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "browser sandbox" }), (activeBottomPanel === "terminal" || activeBottomPanel === "logs") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "bottom-clear-button",
								onClick: () => setLogs([]),
								children: "Clear"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bottom-dock-content",
							children: [
								activeBottomPanel === "terminal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "dock-terminal-view",
									children: logs.length ? logs.slice(-10).map((log, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: log.kind,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "skycode $" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: log.text })]
									}, `${log.text}-${index}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "dock-empty",
										children: "Terminal cleared. Run the preview to create new activity."
									})
								}),
								activeBottomPanel === "problems" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "dock-problems-view",
									children: workspaceProblems.length ? workspaceProblems.map((problem, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											openFile(problem.file);
											setMobileView("code");
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `problem-mark ${problem.kind}`,
												children: problem.kind === "error" ? "×" : problem.kind === "warning" ? "!" : "i"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: problem.file }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: problem.text })
										]
									}, `${problem.file}-${problem.text}-${index}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "dock-empty dock-clean",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }), "No problems detected in the current project files."]
									})
								}),
								activeBottomPanel === "logs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "dock-logs-view",
									children: logs.length ? logs.map((log, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(index + 1).padStart(2, "0") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
											className: log.kind,
											children: log.kind === "good" ? "SUCCESS" : "INFO"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: log.text })
									] }, `${log.text}-${index}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "dock-empty",
										children: "No workspace logs yet."
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "resize-handle resize-handle-ai",
						role: "separator",
						"aria-label": "Resize AI assistant",
						"aria-orientation": "vertical",
						"aria-valuemin": 250,
						"aria-valuemax": 520,
						"aria-valuenow": panelSizes.ai,
						tabIndex: 0,
						title: "Drag to resize AI · Double-click to reset",
						onPointerDown: (event) => startPanelResize("ai", event),
						onPointerMove: continuePanelResize,
						onPointerUp: finishPanelResize,
						onPointerCancel: finishPanelResize,
						onLostPointerCapture: finishPanelResize,
						onKeyDown: (event) => resizePanelWithKeyboard("ai", event),
						onDoubleClick: () => resetPanelSize("ai"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "resize-handle resize-handle-preview",
						role: "separator",
						"aria-label": "Resize live preview",
						"aria-orientation": "vertical",
						"aria-valuemin": 300,
						"aria-valuemax": 680,
						"aria-valuenow": panelSizes.preview,
						tabIndex: 0,
						title: "Drag to resize Preview · Double-click to reset",
						onPointerDown: (event) => startPanelResize("preview", event),
						onPointerMove: continuePanelResize,
						onPointerUp: finishPanelResize,
						onPointerCancel: finishPanelResize,
						onLostPointerCapture: finishPanelResize,
						onKeyDown: (event) => resizePanelWithKeyboard("preview", event),
						onDoubleClick: () => resetPanelSize("preview"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "resize-handle resize-handle-utility",
						role: "separator",
						"aria-label": "Resize bottom project tools",
						"aria-orientation": "horizontal",
						"aria-valuemin": 120,
						"aria-valuemax": 380,
						"aria-valuenow": panelSizes.utility,
						tabIndex: 0,
						title: "Drag to resize project tools · Double-click to reset",
						onPointerDown: (event) => startPanelResize("utility", event),
						onPointerMove: continuePanelResize,
						onPointerUp: finishPanelResize,
						onPointerCancel: finishPanelResize,
						onLostPointerCapture: finishPanelResize,
						onKeyDown: (event) => resizePanelWithKeyboard("utility", event),
						onDoubleClick: () => resetPanelSize("utility"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mobile-workspace-nav",
				"aria-label": "Workspace sections",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: mobileView === "ai" ? "active" : "",
						onClick: () => setMobileView("ai"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "spark",
							size: 18
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: mobileView === "code" ? "active" : "",
						onClick: () => setMobileView("code"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "terminal",
							size: 18
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Code" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: mobileView === "preview" ? "active" : "",
						onClick: () => setMobileView("preview"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "layout",
							size: 18
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preview" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: mobileView === "files" ? "active" : "",
						onClick: () => {
							setActivePanel("files");
							setMobileView("files");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "files",
							size: 18
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Files" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: mobileView === "tools" ? "active" : "",
						onClick: () => setMobileView("tools"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "terminal",
							size: 18
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tools" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "statusbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⑂ main*" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↻" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ⓧ 0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "△ 0" })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Spaces: 2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UTF-8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [`{ }`, " Prettier"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⌁ JavaScript" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "◉ Connected" })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildWizard, {
				open: onboardingOpen,
				selectedCategory,
				buildPrompt,
				aiMode,
				cloudConnected,
				cloudConfigured,
				cloudAuthenticated,
				cloudConnecting,
				cloudModel,
				aiWorking,
				onClose: () => setOnboardingOpen(false),
				onSelectCategory: setSelectedCategory,
				onPromptChange: setBuildPrompt,
				onAiModeChange: setAiMode,
				onConnectCloudAi: () => void connectCloudAi(),
				onDisconnectCloudAi: disconnectCloudAi,
				onSubmit: submitBuildWizard
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "toast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }), toast]
			})
		]
	});
}
//#endregion
export { Home as default };
