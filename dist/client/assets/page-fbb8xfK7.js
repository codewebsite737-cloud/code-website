import{r as e}from"./rolldown-runtime-S-ySWqyJ.js";import{i as t,r as n}from"./framework-CXnKph_e.js";import{t as r}from"./link-DCg9QRoA.js";var i=e(t(),1),a=[{id:`website`,icon:`◇`,title:`Website`,description:`Landing pages, company sites, portfolios`,example:`Create a modern restaurant website with online booking`},{id:`web-app`,icon:`⌘`,title:`Web app`,description:`Interactive tools, SaaS, portals`,example:`Build a task manager for a small creative team`},{id:`mobile-app`,icon:`▯`,title:`Mobile app`,description:`Responsive app prototypes for phones`,example:`Design a mobile fitness app with daily workouts`},{id:`dashboard`,icon:`▦`,title:`Dashboard`,description:`Analytics, admin, finance panels`,example:`Make a sales dashboard with metrics and recent orders`},{id:`store`,icon:`▱`,title:`Online store`,description:`Products, carts, offers, checkout UI`,example:`Create a premium skincare shop with a working cart`},{id:`other`,icon:`✦`,title:`Something else`,description:`Describe any browser-based idea`,example:`Create an interactive event invitation with an RSVP form`}],o={website:`Website`,"web-app":`Web app`,"mobile-app":`Mobile app`,dashboard:`Dashboard`,store:`Online store`,other:`Digital experience`};function s(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function c(e,t){let n=e.replace(/\s+/g,` `).trim();return n.length>t?`${n.slice(0,t-1).trim()}…`:n}function l(e){return/[\u0600-\u06ff]/u.test(e)?`rtl`:`ltr`}function u(e){let t=e.toLowerCase();return[{pattern:/restaurant|cafe|coffee|food|چێشت|خواردن|قاوە/u,name:`Savor`,noun:`hospitality`},{pattern:/finance|bank|money|crypto|پارە|بانک|دارایی/u,name:`Ledger`,noun:`finance`},{pattern:/fitness|gym|health|workout|وەرزش|تەندروستی/u,name:`Pulse`,noun:`wellness`},{pattern:/school|learn|course|education|فێر|قوتاب|خوێندن/u,name:`Learnly`,noun:`education`},{pattern:/house|home|real estate|property|خانوو|موڵک/u,name:`Haven`,noun:`real estate`},{pattern:/travel|hotel|trip|گەشت|هوتێل/u,name:`Roam`,noun:`travel`},{pattern:/beauty|skin|salon|cosmetic|جوانکاری|پێست/u,name:`Aura`,noun:`beauty`},{pattern:/music|audio|podcast|گۆرانی|مۆسیقا/u,name:`Echo`,noun:`audio`},{pattern:/code|developer|software|tech|کۆد|تکنەلۆژیا/u,name:`Nexa`,noun:`technology`}].find(e=>e.pattern.test(t))??{name:`Northstar`,noun:`modern business`}}function ee(e){let t=e.toLowerCase();return/green|emerald|nature|سەوز/u.test(t)?{accent:`#36d399`,accent2:`#0ea56d`,glow:`#36d39935`}:/blue|ocean|sky|شین/u.test(t)?{accent:`#52a8ff`,accent2:`#2864e8`,glow:`#438dff38`}:/orange|gold|warm|پرتەقاڵی|زێڕین/u.test(t)?{accent:`#ffad57`,accent2:`#e36b2c`,glow:`#ff914138`}:/pink|rose|پەمەیی|گوڵی/u.test(t)?{accent:`#ff79b7`,accent2:`#c94998`,glow:`#f05cb13a`}:{accent:`#9b87ff`,accent2:`#6c4de6`,glow:`#795dff40`}}function te(e,t){return e.normalize(`NFKD`).toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``).slice(0,42)||`sky-${t}`}function d(e,t){let n=t?[[`#features`,`تایبەتمەندییەکان`],[`#work`,`کارەکان`],[`#contact`,`پەیوەندی`]]:[[`#features`,`Features`],[`#work`,`Work`],[`#contact`,`Contact`]];return`<header class="site-nav">
  <a class="brand" href="#" aria-label="${s(e)} home"><span>✦</span>${s(e)}</a>
  <button class="menu-button" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
  <nav class="nav-links" aria-label="Main navigation">
    ${n.map(([e,t])=>`<a href="${e}">${t}</a>`).join(`
    `)}
  </nav>
</header>`}function f(e,t,n){let r=n?{eyebrow:`دیزاینی زیرەک، ئەنجامی ڕاستەقینە`,heading:`${e} بیرۆکەکان دەگۆڕێت بۆ ئەزموونێکی ناوازە.`,body:`وێبسایتێکی خێرا، جوان و گونجاو بۆ هەموو ئامێرەکان؛ دروستکراوە لەسەر داواکارییەکەت.`,primary:`دەست پێ بکە`,secondary:`بینینی کارەکان`,section:`هەموو شتێک بۆ گەشەکردن`,cta:`ئامادەیت بیرۆکەکەت ببێتە ڕاستی؟`}:{eyebrow:`Thoughtful design, real outcomes`,heading:`${e} turns bold ideas into memorable digital experiences.`,body:`A fast, accessible and responsive website shaped around your brief and ready for your next iteration.`,primary:`Start a project`,secondary:`Explore our work`,section:`Everything you need to grow`,cta:`Ready to turn your idea into something real?`};return`<div class="site-frame">
  ${d(e,n)}
  <main>
    <section class="hero-section">
      <div class="hero-copy">
        <span class="eyebrow">${r.eyebrow}</span>
        <h1>${s(r.heading)}</h1>
        <p>${r.body}</p>
        <div class="button-row">
          <button class="primary-button" data-toast="${n?`سوپاس! بە زووترین کات پەیوەندیت پێوە دەکەین.`:`Thanks! We’ll be in touch shortly.`}">${r.primary}<span>↗</span></button>
          <a class="secondary-button" href="#work">${r.secondary}</a>
        </div>
        <p class="brief-note">${s(c(t,140))}</p>
      </div>
      <div class="hero-visual" aria-label="Decorative product visual">
        <div class="visual-card visual-card-main">
          <span class="visual-label">01 / ${s(e)}</span>
          <div class="visual-orb"></div>
          <strong>Ideas<br />in motion.</strong>
        </div>
        <div class="visual-card visual-card-small"><i></i><span>Built to stand out</span></div>
      </div>
    </section>

    <section class="feature-section" id="features">
      <div class="section-heading"><span>02</span><h2>${r.section}</h2></div>
      <div class="feature-grid">
        <article><span>◇</span><h3>${n?`ستراتیژی`:`Clear strategy`}</h3><p>${n?`بڕیاری دروست لە بنەڕەتەوە.`:`Focused decisions that support every screen.`}</p></article>
        <article><span>✦</span><h3>${n?`دیزاینی تایبەت`:`Distinct design`}</h3><p>${n?`ناسنامەیەک کە لەبیر ناکرێت.`:`A memorable identity with thoughtful details.`}</p></article>
        <article><span>↗</span><h3>${n?`خێرایی`:`Fast by default`}</h3><p>${n?`ئەزموونێکی خێرا لەسەر هەر ئامێرێک.`:`Responsive performance on every device.`}</p></article>
      </div>
    </section>

    <section class="work-section" id="work">
      <div class="work-card large"><span>Selected work</span><h3>${e} / Digital launch</h3><i></i></div>
      <div class="work-card"><span>Approach</span><h3>Simple. Useful. Human.</h3><p>Designed around the people who will actually use it.</p></div>
    </section>

    <section class="closing-cta" id="contact">
      <span>Let’s build</span><h2>${r.cta}</h2>
      <button class="primary-button" data-toast="${n?`نامەکەت تۆمار کرا.`:`Your request is ready to go.`}">${r.primary}<span>→</span></button>
    </section>
  </main>
  <footer><span>© 2026 ${s(e)}</span><span>Designed with intention.</span></footer>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`}function p(e,t,n){return`<div class="product-shell app-product">
  <aside class="product-sidebar">
    <a class="brand" href="#"><span>✦</span>${s(e)}</a>
    <nav aria-label="App navigation">
      <button class="active"><span>⌂</span>${n?`سەرەکی`:`Overview`}</button>
      <button><span>✓</span>${n?`ئەرکەکان`:`My tasks`}</button>
      <button><span>♢</span>${n?`تیم`:`Team`}</button>
      <button><span>▦</span>${n?`ڕاپۆرت`:`Reports`}</button>
    </nav>
    <div class="account-chip"><i>SK</i><div><b>${n?`هەژماری من`:`My workspace`}</b><small>Free plan</small></div></div>
  </aside>
  <main class="product-main">
    <header class="product-head">
      <div><span class="eyebrow">${n?`ڕۆژ باش`:`Good morning`}</span><h1>${n?`ئەمڕۆ چی دروست دەکەین؟`:`What will we make today?`}</h1></div>
      <button class="primary-button" id="newTaskButton">＋ ${n?`ئەرکی نوێ`:`New task`}</button>
    </header>
    <p class="brief-banner"><span>✦</span>${s(c(t,150))}</p>
    <section class="metric-grid">
      <article><span>${n?`ئەرکی تەواو`:`Completed`}</span><strong>24</strong><small>↑ 18% this week</small></article>
      <article><span>${n?`لە بەردەوامی`:`In progress`}</span><strong>08</strong><small>3 due today</small></article>
      <article><span>${n?`ئەندامانی تیم`:`Team members`}</span><strong>06</strong><small>All active</small></article>
    </section>
    <section class="app-grid">
      <article class="task-board">
        <div class="card-head"><h2>${n?`ئەرکەکانی ئەمڕۆ`:`Today’s focus`}</h2><span>4 tasks</span></div>
        <div id="taskList">
          <label class="task-row"><input type="checkbox" checked /><span><b>Prepare launch brief</b><small>Product design · 10:00</small></span><i>Done</i></label>
          <label class="task-row"><input type="checkbox" /><span><b>Review onboarding flow</b><small>Research · 12:30</small></span><i>Today</i></label>
          <label class="task-row"><input type="checkbox" /><span><b>Share prototype with team</b><small>Collaboration · 15:00</small></span><i>Today</i></label>
        </div>
      </article>
      <article class="progress-card">
        <div class="card-head"><h2>${n?`پێشکەوتن`:`Weekly progress`}</h2><span>72%</span></div>
        <div class="progress-ring"><strong>72<small>%</small></strong></div>
        <p>18 of 25 tasks completed</p>
        <div class="avatar-row"><i>AR</i><i>LN</i><i>SK</i><i>+3</i></div>
      </article>
    </section>
  </main>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`}function m(e,t,n){let r=n?[`ش`,`ی`,`د`,`س`,`چ`,`پ`,`ه`]:[`M`,`T`,`W`,`T`,`F`,`S`,`S`];return`<div class="product-shell dashboard-product">
  <aside class="product-sidebar">
    <a class="brand" href="#"><span>✦</span>${s(e)}</a>
    <nav aria-label="Dashboard navigation">
      <button class="active"><span>▦</span>${n?`پوختە`:`Overview`}</button>
      <button><span>⌁</span>${n?`فرۆشتن`:`Sales`}</button>
      <button><span>♢</span>${n?`کڕیار`:`Customers`}</button>
      <button><span>⚙</span>${n?`ڕێکخستن`:`Settings`}</button>
    </nav>
    <div class="account-chip"><i>SK</i><div><b>${n?`بەڕێوەبەر`:`Admin`}</b><small>${e}</small></div></div>
  </aside>
  <main class="product-main">
    <header class="product-head">
      <div><span class="eyebrow">${n?`داشبۆردی کار`:`Business dashboard`}</span><h1>${n?`بەخێربێیتەوە`:`Welcome back`}</h1></div>
      <button class="date-button">Jul 21 — Jul 28⌄</button>
    </header>
    <p class="brief-banner"><span>✦</span>${s(c(t,150))}</p>
    <section class="metric-grid four">
      <article><span>${n?`داهات`:`Revenue`}</span><strong>$84.2K</strong><small>↑ 12.5%</small></article>
      <article><span>${n?`داواکاری`:`Orders`}</span><strong>1,429</strong><small>↑ 8.2%</small></article>
      <article><span>${n?`کڕیار`:`Customers`}</span><strong>892</strong><small>↑ 5.1%</small></article>
      <article><span>${n?`گۆڕان`:`Conversion`}</span><strong>4.82%</strong><small>↑ 0.6%</small></article>
    </section>
    <section class="dashboard-grid">
      <article class="chart-card">
        <div class="card-head"><div><h2>${n?`پوختەی فرۆشتن`:`Sales overview`}</h2><small>Last seven days</small></div><span>● Revenue</span></div>
        <div class="bar-chart" aria-label="Weekly revenue chart">
          ${[48,64,43,78,69,92,81].map((e,t)=>`<div><i style="height:${e}%"></i><span>${r[t]}</span></div>`).join(``)}
        </div>
      </article>
      <article class="source-card">
        <div class="card-head"><h2>${n?`سەرچاوەکان`:`Traffic sources`}</h2><span>•••</span></div>
        <div class="donut"><strong>42K<small>visits</small></strong></div>
        <ul><li><i></i>Organic <b>48%</b></li><li><i></i>Direct <b>31%</b></li><li><i></i>Social <b>21%</b></li></ul>
      </article>
    </section>
    <section class="table-card">
      <div class="card-head"><h2>${n?`داواکارییە نوێیەکان`:`Recent orders`}</h2><button data-toast="Report exported successfully">Export</button></div>
      <div class="data-table">
        <div class="table-row table-title"><span>Customer</span><span>Product</span><span>Status</span><span>Total</span></div>
        <div class="table-row"><span><i class="customer-icon">AM</i> Ava Morgan</span><span>Studio plan</span><span><b class="status paid">Paid</b></span><span>$420</span></div>
        <div class="table-row"><span><i class="customer-icon">DL</i> Dilan Lee</span><span>Pro workspace</span><span><b class="status pending">Pending</b></span><span>$280</span></div>
        <div class="table-row"><span><i class="customer-icon">RK</i> Roj Karim</span><span>Team plan</span><span><b class="status paid">Paid</b></span><span>$640</span></div>
      </div>
    </section>
  </main>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`}function h(e,t,n){return`<div class="site-frame store-product">
  <header class="site-nav store-nav">
    <a class="brand" href="#"><span>✦</span>${s(e)}</a>
    <button class="menu-button" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <nav class="nav-links" aria-label="Store navigation"><a href="#shop">${n?`کۆگا`:`Shop`}</a><a href="#story">${n?`چیرۆک`:`Our story`}</a><a href="#contact">${n?`پەیوەندی`:`Contact`}</a></nav>
    <button class="cart-button" type="button" data-toast="${n?`سەبەتەکەت ئامادەیە.`:`Your cart is ready.`}">${n?`سەبەتە`:`Cart`} <span id="cartCount">0</span></button>
  </header>
  <main>
    <section class="store-hero">
      <div><span class="eyebrow">${n?`کۆمەڵەی نوێی ٢٠٢٦`:`The 2026 collection`}</span><h1>${n?`شتە سادەکان، بە جوانی دروستکراون.`:`Everyday essentials, made beautifully.`}</h1><p>${s(c(t,150))}</p><a class="primary-button" href="#shop">${n?`ئێستا بازاڕ بکە`:`Shop the collection`} <span>→</span></a></div>
      <div class="product-spotlight"><span>New</span><div class="product-shape"></div><strong>Form 01</strong><small>Designed for daily rituals</small></div>
    </section>
    <section class="shop-section" id="shop">
      <div class="section-heading"><span>01</span><h2>${n?`هەڵبژێردراوەکان`:`Featured pieces`}</h2></div>
      <div class="product-grid">
        ${[[`Arc Lamp`,`$128`,`one`],[`Soft Form`,`$84`,`two`],[`Daily Set`,`$96`,`three`]].map(([e,t,r])=>`<article><div class="product-image ${r}"><span>New</span><i></i></div><div><h3>${e}</h3><span>${t}</span></div><button class="add-cart" data-product="${e}">${n?`زیادکردن بۆ سەبەتە`:`Add to cart`}</button></article>`).join(``)}
      </div>
    </section>
    <section class="store-story" id="story"><span>02 / Our philosophy</span><h2>${n?`کەمتر، بەڵام باشتر.`:`Fewer things. Better made.`}</h2><p>${n?`هەر بەرهەمێک بە وردی هەڵدەبژێرین بۆ ئەوەی ساڵانێکی زۆر لەگەڵت بێت.`:`We select every piece for its function, material and ability to stay useful for years.`}</p></section>
  </main>
  <footer id="contact"><span>© 2026 ${s(e)}</span><span>Secure checkout · Easy returns</span></footer>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`}function g(e,t,n){return`<main class="mobile-demo">
  <section class="mobile-copy">
    <a class="brand" href="#"><span>✦</span>${s(e)}</a>
    <span class="eyebrow">${n?`پرۆتۆتایپی ئەپی مۆبایل`:`Mobile app prototype`}</span>
    <h1>${n?`ڕۆژەکەت، بە شێوەیەکی سادەتر.`:`Your day, in a calmer rhythm.`}</h1>
    <p>${s(c(t,170))}</p>
    <div class="button-row"><button class="primary-button" data-toast="Prototype link copied">Share prototype <span>↗</span></button><span class="prototype-note">Interactive browser prototype</span></div>
  </section>
  <section class="phone-wrap" aria-label="Interactive mobile app preview">
    <div class="phone-shell">
      <div class="phone-status"><span>9:41</span><span>● ◔ ▰</span></div>
      <div class="phone-content">
        <div class="phone-greeting"><div><small>${n?`ڕۆژ باش`:`Good morning`}</small><h2>${n?`ئامادەی دەستپێکردنیت؟`:`Ready to begin?`}</h2></div><i>SK</i></div>
        <article class="daily-card"><span>${n?`پلانی ئەمڕۆ`:`Today’s plan`}</span><strong>07 <small>activities</small></strong><div><i style="width:68%"></i></div><p>68% complete · Keep going</p></article>
        <div class="phone-section-head"><h3>${n?`چالاکییەکان`:`Your activities`}</h3><button>See all</button></div>
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
</main>`}function _(e,t,n){return`<div class="site-frame concept-product">
  ${d(e,n)}
  <main>
    <section class="concept-hero">
      <span class="eyebrow">${n?`بیرۆکەیەک، بێ سنوور`:`One idea, no template`}</span>
      <h1>${n?`با شتێکی نوێ دروست بکەین.`:`Let’s make something unexpected.`}</h1>
      <p>${s(c(t,190))}</p>
      <div class="concept-actions"><button class="primary-button" data-toast="${n?`بیرۆکەکەت تۆمار کرا.`:`Your idea has been saved.`}">${n?`دەستپێکردن`:`Start exploring`} <span>↗</span></button><small>Interactive concept · v1.0</small></div>
    </section>
    <section class="idea-board">
      <article class="idea-card feature"><span>01</span><h2>${n?`بیرۆکە`:`The idea`}</h2><p>${s(c(t,220))}</p><div class="idea-orbit"><i></i><i></i><i></i></div></article>
      <article class="idea-card"><span>02</span><h2>${n?`ئەزموون`:`The experience`}</h2><p>${n?`سادە، خێرا و گونجاو بۆ هەموو شاشەکان.`:`Responsive, focused, and designed to invite interaction.`}</p></article>
      <article class="idea-card"><span>03</span><h2>${n?`هەنگاوی داهاتوو`:`Next step`}</h2><button data-toast="Next iteration unlocked">Unlock iteration →</button></article>
    </section>
  </main>
  <div class="toast-message" role="status" aria-live="polite"></div>
</div>`}function v(e){let t=ee(e),n=/light|bright|white|سپێ|ڕووناک/u.test(e.toLowerCase());return`:root {
  color-scheme: ${n?`light`:`dark`};
  --bg: ${n?`#f4f2ed`:`#080a0f`};
  --panel: ${n?`#ffffff`:`#11141b`};
  --panel-soft: ${n?`#e9e7e1`:`#171a22`};
  --text: ${n?`#15161a`:`#f4f4f6`};
  --muted: ${n?`#60636d`:`#979ba7`};
  --line: ${n?`#d9d6ce`:`#292d37`};
  --accent: ${t.accent};
  --accent-2: ${t.accent2};
  --glow: ${t.glow};
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
`}function ne(e){return`const toast = document.querySelector('.toast-message');
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
    showToast((button.getAttribute('data-product') || 'Item') + ${e?`' زیاد کرا بۆ سەبەتە'`:`' added to cart'`});
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
  showToast(${e?`'ئەرکێکی نوێ زیاد کرا'`:`'New task added'`});
});`}function re(e,t){let n=l(t),r=n===`rtl`,i=u(t).name,a={website:f(i,t,r),"web-app":p(i,t,r),"mobile-app":g(i,t,r),dashboard:m(i,t,r),store:h(i,t,r),other:_(i,t,r)},s=te(i,e);return{name:s,summary:r?`${o[e]} ـێکی responsive دروست کرا و هەموو فایل و preview ـەکە نوێ کرایەوە.`:`Built a responsive ${o[e].toLowerCase()} and refreshed every project file and the live preview.`,files:{"index.html":`<div dir="${n}">\n${a[e]}\n</div>`,"styles.css":v(t),"app.js":ne(r),"package.json":JSON.stringify({name:s,version:`1.0.0`,private:!0,scripts:{dev:`vite`,build:`vite build`},dependencies:{vite:`latest`}},null,2)}}}function ie(e){if(!e||typeof e!=`object`)throw Error(`The AI response was not a project.`);let t=e,n=[`index.html`,`styles.css`,`app.js`,`package.json`];if(!t.files||n.some(e=>typeof t.files?.[e]!=`string`))throw Error(`The AI response did not include all four project files.`);let r=Object.fromEntries(n.map(e=>[e,String(t.files?.[e]).slice(0,8e4)]));if(Object.values(r).join(``).length>22e4)throw Error(`The generated project was too large to preview safely.`);return{name:(typeof t.name==`string`?t.name.toLowerCase().replace(/[^a-z0-9_-]+/g,`-`).replace(/^-+|-+$/g,``).slice(0,42):``)||`skycode-project`,summary:typeof t.summary==`string`?c(t.summary,280):`Server Cloud AI generated a new project.`,files:r}}var ae=12e5,oe=14e3,se={draft:`skycode_workspace_draft`},y=class extends Error{constructor(e,t,n){super(t),this.code=e,this.signInPath=n,this.name=`ManagedAiError`}};async function ce(){let{response:e,data:t}=await de(`/api/ai`,{cache:`no-store`,headers:{Accept:`application/json`}},1e4);if(!e.ok)throw new y(`STATUS_UNAVAILABLE`,`Cloud AI status is temporarily unavailable.`);return t}async function le({category:e,files:t,request:n}){let r=Object.fromEntries(Object.entries(t).map(([e,t])=>[e,ue(e,t)])),{response:i,data:a}=await de(`/api/ai`,{method:`POST`,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify({category:e,currentFiles:r,prompt:n})},82e3);if(!i.ok||!a.project)throw new y(a.code??`CLOUD_AI_FAILED`,a.error??`Cloud AI could not complete this request.`,a.signInPath);return ie(a.project)}function ue(e,t){if(t.length<=oe)return t;let n=e===`index.html`?`
<!-- SkyCode omitted the unchanged middle for a faster AI request. -->
`:e===`package.json`?`
`:`
/* SkyCode omitted the unchanged middle for a faster AI request. */
`,r=oe-n.length,i=Math.ceil(r*.68);return`${t.slice(0,i)}${n}${t.slice(t.length-(r-i))}`}async function de(e,t,n){let r=new AbortController,i=window.setTimeout(()=>r.abort(),n);try{let n=await fetch(e,{...t,signal:r.signal}),i=await n.text();if(i.length>ae)throw new y(`RESPONSE_SIZE`,`Cloud AI returned an unexpectedly large response.`);let a;try{a=JSON.parse(i)}catch{throw new y(`INVALID_RESPONSE`,`Cloud AI returned an invalid response.`)}return{response:n,data:a}}catch(e){throw e instanceof y?e:e instanceof DOMException&&e.name===`AbortError`?new y(`CLIENT_TIMEOUT`,`Cloud AI timed out. Instant Builder is still available.`):new y(`NETWORK`,`Cloud AI could not be reached. Instant Builder is still available.`)}finally{window.clearTimeout(i)}}var b=n(),fe={files:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`path`,{d:`M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z`}),(0,b.jsx)(`path`,{d:`M14 2v6h6`})]}),search:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`circle`,{cx:`11`,cy:`11`,r:`7`}),(0,b.jsx)(`path`,{d:`m20 20-4-4`})]}),git:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`circle`,{cx:`6`,cy:`4`,r:`2`}),(0,b.jsx)(`circle`,{cx:`18`,cy:`6`,r:`2`}),(0,b.jsx)(`circle`,{cx:`6`,cy:`20`,r:`2`}),(0,b.jsx)(`path`,{d:`M6 6v12M18 8c0 5-12 3-12 8`})]}),blocks:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`rect`,{x:`3`,y:`3`,width:`7`,height:`7`,rx:`1`}),(0,b.jsx)(`rect`,{x:`14`,y:`3`,width:`7`,height:`7`,rx:`1`}),(0,b.jsx)(`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1`}),(0,b.jsx)(`rect`,{x:`14`,y:`14`,width:`7`,height:`7`,rx:`1`})]}),spark:(0,b.jsx)(`path`,{d:`m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3ZM18.5 16l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z`}),play:(0,b.jsx)(`path`,{d:`m9 7 8 5-8 5V7Z`}),refresh:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`path`,{d:`M20 11a8 8 0 1 0-2.3 5.7`}),(0,b.jsx)(`path`,{d:`M20 4v7h-7`})]}),external:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`path`,{d:`M14 4h6v6`}),(0,b.jsx)(`path`,{d:`M10 14 20 4`}),(0,b.jsx)(`path`,{d:`M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5`})]}),terminal:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`path`,{d:`m5 7 4 4-4 4`}),(0,b.jsx)(`path`,{d:`M11 17h8`})]}),database:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`ellipse`,{cx:`12`,cy:`5`,rx:`8`,ry:`3`}),(0,b.jsx)(`path`,{d:`M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5`}),(0,b.jsx)(`path`,{d:`M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6`})]}),alert:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`path`,{d:`M12 3 2.8 20h18.4L12 3Z`}),(0,b.jsx)(`path`,{d:`M12 9v5`}),(0,b.jsx)(`path`,{d:`M12 17.5h.01`})]}),logs:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`path`,{d:`M8 6h12M8 12h12M8 18h12`}),(0,b.jsx)(`circle`,{cx:`4`,cy:`6`,r:`.8`,fill:`currentColor`,stroke:`none`}),(0,b.jsx)(`circle`,{cx:`4`,cy:`12`,r:`.8`,fill:`currentColor`,stroke:`none`}),(0,b.jsx)(`circle`,{cx:`4`,cy:`18`,r:`.8`,fill:`currentColor`,stroke:`none`})]}),chevron:(0,b.jsx)(`path`,{d:`m9 18 6-6-6-6`}),send:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`path`,{d:`m22 2-7 20-4-9-9-4Z`}),(0,b.jsx)(`path`,{d:`M22 2 11 13`})]}),close:(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(`path`,{d:`M6 6l12 12M18 6 6 18`})}),layout:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`rect`,{x:`3`,y:`4`,width:`18`,height:`16`,rx:`2`}),(0,b.jsx)(`path`,{d:`M14 4v16M14 11h7`})]})};function x({name:e,size:t=18}){return(0,b.jsx)(`svg`,{"aria-hidden":`true`,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,strokeLinejoin:`round`,children:fe[e]})}function pe({tone:e}){return(0,b.jsx)(`span`,{className:`file-icon ${e}`,children:{html:`◇`,css:`#`,js:`JS`,json:`{}`}[e]})}function me({open:e,selectedCategory:t,buildPrompt:n,aiMode:i,cloudConnected:o,cloudConfigured:s,cloudAuthenticated:c,cloudConnecting:l,cloudModel:u,aiWorking:ee,onClose:te,onSelectCategory:d,onPromptChange:f,onAiModeChange:p,onConnectCloudAi:m,onDisconnectCloudAi:h,onSubmit:g}){if(!e)return null;let _=a.find(e=>e.id===t);return(0,b.jsx)(`div`,{className:`ai-builder-overlay`,role:`presentation`,children:(0,b.jsxs)(`section`,{className:`ai-builder-dialog`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`ai-builder-title`,children:[(0,b.jsxs)(`div`,{className:`builder-topline`,children:[(0,b.jsxs)(r,{className:`builder-brand`,href:`/`,"aria-label":`SkyCode home`,children:[(0,b.jsx)(`span`,{className:`logo-mark`,children:(0,b.jsx)(`i`,{})}),(0,b.jsx)(`strong`,{children:`SkyCode`})]}),(0,b.jsx)(`span`,{className:`free-builder-badge`,children:`FREE BUILDER`}),(0,b.jsx)(`button`,{className:`builder-close`,onClick:te,"aria-label":`Close build wizard`,children:`×`})]}),t?(0,b.jsxs)(`div`,{className:`builder-prompt-step`,children:[(0,b.jsx)(`button`,{className:`builder-back`,onClick:()=>d(null),children:`← Back`}),(0,b.jsx)(`span`,{className:`builder-step`,children:`STEP 2 OF 2`}),(0,b.jsxs)(`div`,{className:`selected-category`,children:[(0,b.jsx)(`span`,{children:_?.icon}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`b`,{children:_?.title}),(0,b.jsx)(`small`,{children:_?.description})]})]}),(0,b.jsx)(`h1`,{id:`ai-builder-title`,children:`Describe your idea`}),(0,b.jsx)(`p`,{children:`Include the purpose, style, colors, sections, and functions you want. You can write in Kurdish or English.`}),(0,b.jsxs)(`div`,{className:`builder-prompt-input`,children:[(0,b.jsx)(`textarea`,{autoFocus:!0,value:n,onChange:e=>f(e.target.value),onKeyDown:e=>{e.key===`Enter`&&(e.metaKey||e.ctrlKey)&&(e.preventDefault(),g())},placeholder:_?.example,maxLength:3e3}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`button`,{onClick:()=>f(_?.example??``),children:`Use example`}),(0,b.jsxs)(`span`,{children:[n.length,`/3000`]})]})]}),(0,b.jsxs)(`div`,{className:`engine-heading`,children:[(0,b.jsx)(`span`,{children:`Choose how to build`}),(0,b.jsx)(`small`,{children:`You can switch later`})]}),(0,b.jsxs)(`div`,{className:`engine-options`,children:[(0,b.jsxs)(`button`,{className:i===`instant`?`active`:``,onClick:()=>p(`instant`),children:[(0,b.jsx)(`span`,{className:`engine-icon`,children:`⚡`}),(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`b`,{children:[`Instant Builder `,(0,b.jsx)(`em`,{children:`RECOMMENDED`})]}),(0,b.jsx)(`p`,{children:`Always free, no account, runs immediately in your browser.`})]}),(0,b.jsx)(`i`,{children:i===`instant`?`✓`:``})]}),(0,b.jsxs)(`button`,{className:i===`cloud`&&o?`active cloud`:`cloud`,onClick:()=>{o?p(`cloud`):m()},disabled:l,children:[(0,b.jsx)(`span`,{className:`engine-icon`,children:`☁`}),(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`b`,{children:[`Server Cloud AI `,o&&(0,b.jsx)(`em`,{children:`READY`})]}),o&&u&&(0,b.jsx)(`small`,{className:`cloud-model-name`,children:u===`poolside/laguna-s-2.1:free`?`Poolside · Laguna S 2.1 · Free`:u===`openai/gpt-oss-20b:free`?`OpenAI · gpt-oss-20b · Free`:u}),(0,b.jsx)(`p`,{children:o?`Uses the protected backend API key and per-user quota.`:s?c?`Activate stronger model-powered edits.`:`Sign in with ChatGPT to protect usage and cost.`:`Backend ready; add the server API key to activate it.`})]}),(0,b.jsx)(`i`,{children:i===`cloud`&&o?`✓`:l?`…`:`↗`})]})]}),(0,b.jsx)(`p`,{className:`cloud-privacy-note`,children:o?(0,b.jsxs)(b.Fragment,{children:[`Prompts and current project files pass through SkyCode's protected backend to OpenRouter. The API key never enters the browser.`,` `,(0,b.jsx)(`button`,{onClick:h,children:`Disconnect`})]}):`Instant Builder remains free and local. Server Cloud AI requires sign-in and is protected by rate and daily limits.`}),(0,b.jsxs)(`button`,{className:`build-project-button`,disabled:!n.trim()||ee||i===`cloud`&&!o,onClick:g,children:[(0,b.jsx)(x,{name:`spark`,size:17}),ee?`Building your project…`:`Build my project`,(0,b.jsx)(`span`,{children:`→`})]}),(0,b.jsx)(`small`,{className:`builder-shortcut`,children:`Ctrl / ⌘ + Enter to build`})]}):(0,b.jsxs)(`div`,{className:`builder-category-step`,children:[(0,b.jsx)(`span`,{className:`builder-step`,children:`STEP 1 OF 2`}),(0,b.jsx)(`h1`,{id:`ai-builder-title`,children:`What do you want to build?`}),(0,b.jsx)(`p`,{children:`Choose a project type first. Sky AI will shape the files, layout, and interactions around it.`}),(0,b.jsx)(`div`,{className:`category-grid`,children:a.map(e=>(0,b.jsxs)(`button`,{onClick:()=>d(e.id),children:[(0,b.jsx)(`span`,{children:e.icon}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`b`,{children:e.title}),(0,b.jsx)(`small`,{children:e.description})]}),(0,b.jsx)(`i`,{children:`→`})]},e.id))}),(0,b.jsxs)(`div`,{className:`builder-trust-row`,children:[(0,b.jsx)(`span`,{children:`✓ No payment`}),(0,b.jsx)(`span`,{children:`✓ No login for Instant Builder`}),(0,b.jsx)(`span`,{children:`✓ Live sandbox preview`})]})]})]})})}var he=[`nav`,`header`,`main > section`,`main > article`,`body > section`,`body > article`,`aside`,`footer`].join(`,`);function ge(e,t){return e.replace(RegExp(`</${t}`,`gi`),`<\\/${t}`)}function _e(){return`
    (() => {
      const selector = ${JSON.stringify(he)};
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
  `}function ve(e,t={}){let n=ge(e[`styles.css`],`style`),r=ge(e[`app.js`],`script`),i=t.sectionEditor?`<style>
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
    </style>`:``,a=t.sectionEditor?`<script>${ge(_e(),`script`)}<\/script>`:``;return`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; object-src 'none'; media-src 'none'; frame-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'"><style>${n}</style>${i}</head><body>${e[`index.html`]}<script>${r}<\/script>${a}</body></html>`}var ye=[`nav`,`header`,`main > section`,`main > article`,`body > section`,`body > article`,`aside`,`footer`].join(`,`),S=`data-skycode-target`,be=`script,style,link,iframe,object,embed,base,meta`;function C(e){return new DOMParser().parseFromString(`<!doctype html><html><body>${e}</body></html>`,`text/html`)}function w(e){return Array.from(e.body.querySelectorAll(ye))}function T(e,t){let n=w(e)[t];if(!n)throw Error(`This section is no longer available. Refresh the preview and select it again.`);return n}function E(e){if(e.length>5e4)throw Error(`A single section must be smaller than 50 KB.`);let t=document.createElement(`template`);t.innerHTML=e.trim();let n=Array.from(t.content.children);if(n.length!==1||!(n[0]instanceof HTMLElement))throw Error(`Section HTML must contain exactly one root element.`);let r=n[0];if(r.matches(be)||r.querySelector(be))throw Error(`Scripts, frames, global styles, and external resources are not allowed inside a section.`);for(let e of[r,...Array.from(r.querySelectorAll(`*`))])for(let t of Array.from(e.attributes)){let e=t.name.toLowerCase(),n=t.value.trim().toLowerCase();if(e.startsWith(`on`))throw Error(`Inline event handlers are not allowed in section HTML.`);if((e===`href`||e===`src`||e===`action`)&&n.startsWith(`javascript:`))throw Error(`JavaScript URLs are not allowed in section HTML.`)}return r.removeAttribute(S),r}function xe(e,t,n){let r=C(e),i=T(r,t),a=E(n);return i.replaceWith(r.importNode(a,!0)),r.body.innerHTML.trim()}function Se(e,t){let n=C(e);return T(n,t).setAttribute(S,`selected-section`),n.body.innerHTML.trim()}function Ce(e){let t=C(e).body.querySelector(`[${S}="selected-section"]`);if(!t)throw Error(`Cloud AI did not return the selected section safely.`);return t.removeAttribute(S),E(t.outerHTML).outerHTML}function we(e){let t=E(e),n=t.querySelector(`h1, h2, h3`),r=t.querySelector(`p`),i=t.querySelector(`button, a`),a=i?.tagName===`A`;return{heading:n?.textContent?.trim()??``,body:r?.textContent?.trim()??``,buttonLabel:i?.textContent?.trim()??``,buttonHref:a&&i?i.getAttribute(`href`)??``:``,hasHeading:!!n,hasBody:!!r,hasButton:!!i,buttonSupportsLink:a}}function Te(e,t){let n=E(e),r=n.querySelector(`h1, h2, h3`),i=n.querySelector(`p`),a=n.querySelector(`button, a`);if(r&&t.hasHeading&&(r.textContent=t.heading),i&&t.hasBody&&(i.textContent=t.body),a&&t.hasButton&&(a.textContent=t.buttonLabel,a.tagName===`A`)){let e=t.buttonHref.trim();e?a.setAttribute(`href`,e):a.removeAttribute(`href`)}return E(n.outerHTML).outerHTML}function Ee(){return{accent:``,alignment:`keep`,background:``,padding:`keep`,radius:`keep`,textColor:``}}function De(e,t){let n=E(e);t.background&&(n.style.background=t.background),t.textColor&&(n.style.color=t.textColor),t.accent&&(n.style.setProperty(`--accent`,t.accent),n.style.setProperty(`--primary`,t.accent)),t.alignment!==`keep`&&(n.style.textAlign=t.alignment);let r={compact:`clamp(24px, 5vw, 52px)`,balanced:`clamp(48px, 8vw, 96px)`,spacious:`clamp(72px, 12vw, 152px)`};t.padding!==`keep`&&(n.style.paddingBlock=r[t.padding]);let i={none:`0`,soft:`16px`,rounded:`32px`,pill:`64px`};return t.radius!==`keep`&&(n.style.borderRadius=i[t.radius],t.radius!==`none`&&(n.style.overflow=`hidden`)),E(n.outerHTML).outerHTML}function Oe(e,t){let n=C(e),r=T(n,t);return r.after(r.cloneNode(!0)),n.body.innerHTML.trim()}function ke(e,t,n){let r=C(e),i=T(r,t),a=w(r).filter(e=>e.parentElement===i.parentElement),o=a.indexOf(i),s=n===`up`?a[o-1]:a[o+1];if(!s)throw Error(n===`up`?`This section is already first in its group.`:`This section is already last in its group.`);return n===`up`?s.before(i):s.after(i),r.body.innerHTML.trim()}function Ae(e,t){let n=C(e);return T(n,t).remove(),n.body.innerHTML.trim()}var je=[[/\b(orange|amber)\b|پرتەقاڵی|نارنجی/i,`#ff5a1f`],[/\b(blue|cyan)\b|شین/i,`#2797ff`],[/\b(green|emerald)\b|سەوز/i,`#24b47e`],[/\b(purple|violet)\b|مۆر/i,`#8b5cf6`],[/\b(pink|rose)\b|پەمەیی/i,`#ec4899`]];function Me(e,t){let n=E(e),r=t.trim(),i=!1,a=r.match(/["“](.+?)["”]/)?.[1]?.trim()??r.match(/'(.*?)'/)?.[1]?.trim();if(a){let e=/\b(button|cta)\b|دوگمە/i.test(r)?n.querySelector(`button, a`):n.querySelector(`h1, h2, h3, p, button, a`);e&&(e.textContent=a,i=!0)}let o=je.find(([e])=>e.test(r))?.[1];if(o&&(n.style.setProperty(`--accent`,o),n.style.setProperty(`--primary`,o),n.style.borderColor=`${o}66`,/\b(background|fill)\b|پاشبنەما/i.test(r)&&(n.style.background=`linear-gradient(135deg, ${o}24, transparent 72%)`),i=!0),/\b(compact|smaller|small)\b|بچووک|کۆمپاکت/i.test(r)){n.style.paddingBlock=`clamp(24px, 5vw, 56px)`;let e=n.querySelector(`h1, h2, h3`);e&&(e.style.fontSize=`clamp(1.75rem, 4vw, 3.5rem)`),i=!0}if(/\b(larger|bigger|large)\b|گەورە/i.test(r)){n.style.paddingBlock=`clamp(64px, 11vw, 144px)`;let e=n.querySelector(`h1, h2, h3`);e&&(e.style.fontSize=`clamp(2.5rem, 7vw, 6.5rem)`),i=!0}if(/\b(center|centered)\b|ناوەڕاست/i.test(r)&&(n.style.textAlign=`center`,n.style.marginInline=`auto`,i=!0),/\b(rounded|round|card)\b|خڕ|کارت/i.test(r)&&(n.style.borderRadius=`clamp(20px, 4vw, 48px)`,n.style.overflow=`hidden`,i=!0),/\b(dark|black)\b|تاریک|ڕەش/i.test(r)?(n.style.backgroundColor=`#0b0c10`,n.style.color=`#f7f7f5`,i=!0):/\b(light|white)\b|ڕووناک|سپی/i.test(r)&&(n.style.backgroundColor=`#f7f4ee`,n.style.color=`#171717`,i=!0),!i)throw Error(`Instant section edits support quoted text and focused style directions such as “orange”, “compact”, “larger”, “centered”, “rounded”, “dark”, or “light”. You can also edit the HTML directly.`);return E(n.outerHTML).outerHTML}var Ne={files:`Files`,search:`Search`,git:`Source Control`,database:`Database`},Pe={terminal:{label:`Terminal`,icon:`terminal`},problems:{label:`Problems`,icon:`alert`},logs:{label:`Logs`,icon:`logs`}},Fe={ai:320,preview:440,utility:190},Ie=`skycode:workspace-panel-layout:v1`,Le=`skycode:workspace-layout-version:v1`;function Re(e,t,n){return Math.min(Math.max(e,t),Math.max(t,n))}function ze(e,t,n,r,i,a){return e===`ai`?{...t,ai:Re(Math.round(t.ai+n),250,Math.min(520,i-t.preview-380-48))}:e===`preview`?{...t,preview:Re(Math.round(t.preview-n),300,Math.min(680,i-t.ai-380-48))}:{...t,utility:Re(Math.round(t.utility-r),120,Math.min(380,a-410))}}var D=[{title:`Understanding your request`,detail:`Reading your prompt and the current project files.`},{title:`Planning the solution`,detail:`Choosing the structure, components, and safest changes.`},{title:`Creating project files`,detail:`Writing and checking HTML, CSS, JavaScript, and configuration.`},{title:`Updating secure preview`,detail:`Applying the result to your restricted live preview.`}],Be=new Set(`async.await.break.case.catch.class.const.continue.default.else.export.extends.false.finally.for.from.function.if.import.in.let.new.null.return.switch.this.throw.true.try.typeof.undefined.var.while`.split(`.`));function Ve(e){let t=/(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Za-z][\w-]*|#[\dA-Fa-f]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|s|ms)?\b|--[\w-]+|[A-Za-z-]+(?=\s*:)|[.#][A-Za-z_-][\w-]*(?=[\s,{])|\b[A-Za-z_$][\w$]*\b)/g,n=[],r=0,i=0;for(let a of e.matchAll(t)){let t=a.index??0,o=a[0];t>r&&n.push(e.slice(r,t));let s=`plain`;o.startsWith(`<!--`)||o.startsWith(`/*`)||o.startsWith(`//`)?s=`comment`:/^["'`]/.test(o)?s=`string`:Be.has(o)?s=`keyword`:/^<\/?/.test(o)?s=`tag`:/^#[\dA-Fa-f]{3,8}$/.test(o)?s=`color`:/^\d/.test(o)?s=`number`:o.startsWith(`--`)||/^[A-Za-z-]+$/.test(o)?s=`property`:/^[.#]/.test(o)&&(s=`selector`),n.push((0,b.jsx)(`span`,{className:`syntax-${s}`,children:o},`${i}-${t}`)),i+=1,r=t+o.length}return r<e.length&&n.push(e.slice(r)),n}var O={"index.html":`<main class="hero">
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
</main>`,"styles.css":`:root {
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
}`,"app.js":`const button = document.querySelector('#startButton');

button?.addEventListener('click', () => {
  button.innerHTML = 'Let’s build something <span>→</span>';
});`,"package.json":`{
  "name": "northstar-studio",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "vite": "latest"
  }
}`},k=[{name:`index.html`,tone:`html`},{name:`styles.css`,tone:`css`},{name:`app.js`,tone:`js`},{name:`package.json`,tone:`json`}];function He(){let[e,t]=(0,i.useState)(O),[n,r]=(0,i.useState)(O),[o,s]=(0,i.useState)(`index.html`),[c,l]=(0,i.useState)(`files`),[u,ee]=(0,i.useState)(`terminal`),[te,d]=(0,i.useState)(!1),[f,p]=(0,i.useState)(`preview`),[m,h]=(0,i.useState)(`preview`),[g,_]=(0,i.useState)(`studio`),[v,ne]=(0,i.useState)(Fe),[ie,ae]=(0,i.useState)(!1),[oe,ue]=(0,i.useState)(null),[de,fe]=(0,i.useState)(!0),[he,ge]=(0,i.useState)(!0),[_e,ye]=(0,i.useState)(!1),[S,be]=(0,i.useState)(!1),[C,w]=(0,i.useState)(!1),[T,E]=(0,i.useState)(``),[je,Be]=(0,i.useState)(``),[He,Ue]=(0,i.useState)(O),[We,Ge]=(0,i.useState)([{message:`Initial workspace`,time:`Now`}]),[A,Ke]=(0,i.useState)(``),[qe,Je]=(0,i.useState)(`northstar-studio`),[Ye,j]=(0,i.useState)(`Saved`),[Xe,M]=(0,i.useState)(0),[Ze,Qe]=(0,i.useState)(!1),[$e,et]=(0,i.useState)(``),[N,tt]=(0,i.useState)(!1),[P,nt]=(0,i.useState)(0),[F,rt]=(0,i.useState)(`instant`),[I,it]=(0,i.useState)(!1),[at,ot]=(0,i.useState)(!1),[st,ct]=(0,i.useState)(!1),[lt,ut]=(0,i.useState)(!1),[dt,ft]=(0,i.useState)(``),[pt,L]=(0,i.useState)(!0),[R,mt]=(0,i.useState)(null),[ht,gt]=(0,i.useState)(``),[_t,vt]=(0,i.useState)(``),[yt,bt]=(0,i.useState)(``),[z,xt]=(0,i.useState)(!0),[B,St]=(0,i.useState)(null),[Ct,V]=(0,i.useState)(``),[wt,H]=(0,i.useState)(``),[U,Tt]=(0,i.useState)(!1),[W,Et]=(0,i.useState)(`content`),[G,K]=(0,i.useState)(null),[q,J]=(0,i.useState)(Ee),[Dt,Ot]=(0,i.useState)(`desktop`),[kt,At]=(0,i.useState)([]),[jt,Mt]=(0,i.useState)([]),[Nt,Pt]=(0,i.useState)([]),[Ft,Y]=(0,i.useState)([{kind:`muted`,text:`SkyCode browser preview`},{kind:`good`,text:`✓ Restricted preview ready`},{kind:`muted`,text:`Network access blocked by preview policy`}]),[It,Lt]=(0,i.useState)([{role:`assistant`,text:`Choose what you want to build, describe it, and I’ll generate all four files with a live preview.`,engine:`instant`}]),Rt=(0,i.useRef)(null),zt=(0,i.useRef)(null),Bt=(0,i.useRef)(null),Vt=(0,i.useRef)(null),X=k.filter(t=>e[t.name]!==He[t.name]),Ht=(0,i.useMemo)(()=>{let t=T.trim().toLowerCase();return t?Object.entries(e).flatMap(([e,n])=>n.split(`
`).flatMap((n,r)=>n.toLowerCase().includes(t)?[{name:e,line:r+1,preview:n.trim()||`(blank line)`}]:[])).slice(0,40):[]},[e,T]),Ut={"index.html":[`main.hero`,`nav`,`section.hero-copy`,`div.orb-one`,`div.orb-two`],"styles.css":[`:root`,`.hero`,`nav`,`.hero-copy`,`h1`,`button`,`.orb`],"app.js":[`button`,`click listener`],"package.json":[`name`,`scripts`,`dependencies`]},Wt=e[o].split(`
`),Z=k.some(t=>e[t.name]!==n[t.name]),Gt=(0,i.useMemo)(()=>ve(n,{sectionEditor:z}),[n,z]),Kt=(0,i.useMemo)(()=>{let t=[],n=e=>(e.match(/{/g)?.length??0)===(e.match(/}/g)?.length??0);/<[a-z][\s\S]*>/i.test(e[`index.html`])||t.push({kind:`error`,file:`index.html`,text:`No valid HTML element was detected.`}),n(e[`styles.css`])||t.push({kind:`error`,file:`styles.css`,text:`CSS contains unbalanced braces.`}),n(e[`app.js`])||t.push({kind:`warning`,file:`app.js`,text:`JavaScript contains unbalanced braces.`});try{JSON.parse(e[`package.json`])}catch{t.push({kind:`error`,file:`package.json`,text:`package.json is not valid JSON.`})}return Z&&t.push({kind:`notice`,file:o,text:`Changes are waiting to be run in the secure preview.`}),t},[o,e,Z]);(0,i.useEffect)(()=>{let e=window.sessionStorage.getItem(se.draft);if(e)try{let n=JSON.parse(e);n.files&&[`index.html`,`styles.css`,`app.js`,`package.json`].every(e=>typeof n.files?.[e]==`string`)&&(t(n.files),r(n.files),Ue(n.baselineFiles??n.files)),Ke(typeof n.projectId==`string`?n.projectId:``),typeof n.projectName==`string`&&Je(n.projectName),(n.saveStatus===`Saved`||n.saveStatus===`Unsaved`)&&j(n.saveStatus),n.category&&mt(n.category),typeof n.buildPrompt==`string`&&gt(n.buildPrompt),typeof n.projectBrief==`string`&&vt(n.projectBrief),typeof n.onboardingOpen==`boolean`&&L(n.onboardingOpen)}catch{window.sessionStorage.removeItem(se.draft)}finally{window.sessionStorage.removeItem(se.draft)}ce().then(e=>{ct(e.authenticated),ot(e.configured),it(e.available),ft(e.model??``),e.available&&rt(`cloud`)}).catch(()=>{ct(!1),ot(!1),it(!1),ft(``)})},[]),(0,i.useEffect)(()=>{let e=new URLSearchParams(window.location.search).get(`project`);if(!e)return;L(!1);let n=!1;return fetch(`/api/projects?id=${encodeURIComponent(e)}`,{cache:`no-store`}).then(async e=>{let t=await e.json();if(!e.ok||!t.project)throw Error(t.error??`Project could not be loaded.`);return t.project}).then(e=>{if(n)return;let i=Object.fromEntries(Object.entries(e.files).filter(([e,t])=>e in O&&typeof t==`string`)),o={...O,...i};t(o),r(o),Ue(o),Ke(e.id),Je(e.name),a.some(t=>t.id===e.template)&&mt(e.template),j(`Saved`),Q(`Project loaded`)}).catch(e=>{n||Q(e instanceof Error?e.message:`Project could not be loaded.`)}),()=>{n=!0}},[]),(0,i.useEffect)(()=>{if(!N){nt(0);return}let e=window.setInterval(()=>{nt(e=>Math.min(e+1,D.length-1))},850);return()=>window.clearInterval(e)},[N]),(0,i.useEffect)(()=>{let e=window.localStorage.getItem(Le);(e===`studio`||e===`classic`)&&_(e)},[]),(0,i.useEffect)(()=>{try{let e=window.localStorage.getItem(Ie);if(e){let t=JSON.parse(e);typeof t.ai==`number`&&typeof t.preview==`number`&&typeof t.utility==`number`&&ne({ai:Re(t.ai,250,520),preview:Re(t.preview,300,680),utility:Re(t.utility,120,380)})}}catch{window.localStorage.removeItem(Ie)}finally{ae(!0)}},[]),(0,i.useEffect)(()=>{ie&&window.localStorage.setItem(Ie,JSON.stringify(v))},[ie,v]),(0,i.useEffect)(()=>{function n(n){if(n.source!==Bt.current?.contentWindow||!n.data||typeof n.data!=`object`)return;let i=n.data;if(i.source!==`skycode-preview`)return;if(i.type===`sections-ready`&&Array.isArray(i.sections)){At(i.sections.slice(0,201).filter(e=>Number.isInteger(e.index)&&typeof e.label==`string`&&typeof e.tag==`string`).map(e=>({index:Number(e.index),label:String(e.label).slice(0,80),tag:String(e.tag).slice(0,20)})));return}if(i.type===`section-deselected`){St(null),K(null),V(``),H(``);return}if(i.type===`section-action`&&Number.isInteger(i.index)&&[`move-up`,`move-down`,`duplicate`].includes(i.action??``)){if(Z){Q(`Run pending code changes before arranging sections.`);return}try{let n=Number(i.index),a=i.action===`duplicate`?Oe(e[`index.html`],n):ke(e[`index.html`],n,i.action===`move-up`?`up`:`down`),o=i.action===`duplicate`?`Section duplicated`:`Section moved`,c={...e,"index.html":a};Mt(t=>[...t.slice(-19),e[`index.html`]]),Pt([]),t(c),r(c),s(`index.html`),j(`Unsaved`),M(e=>e+1),St(null),K(null),J(Ee()),V(``),H(``),Y(e=>[...e,{kind:`good`,text:`✓ ${o}`},{kind:`muted`,text:`Other preview sections were preserved`}]),Q(o)}catch(e){Q(e instanceof Error?e.message:`The section could not be arranged.`)}return}if(i.type!==`section-selected`)return;if(Z){bt(`Run pending code changes before selecting a section.`),window.setTimeout(()=>bt(``),2200);return}let a=i.section;if(!a||!Number.isInteger(a.index)||Number(a.index)<0||Number(a.index)>200||typeof a.label!=`string`||typeof a.tag!=`string`||typeof a.html!=`string`||a.html.length>5e4)return;let o={index:Number(a.index),label:a.label.slice(0,80),tag:a.tag.slice(0,20),html:a.html,path:Array.isArray(a.path)?a.path.filter(e=>typeof e==`string`).slice(0,4).map(e=>e.slice(0,54)):[]};St(o),K(we(o.html)),J(Ee()),Et(`content`),H(o.html),V(``)}return window.addEventListener(`message`,n),()=>window.removeEventListener(`message`,n)},[e,Z]),(0,i.useEffect)(()=>{St(null),K(null),J(Ee()),V(``),H(``)},[n]);function qt(){Ze||(h(`preview`),p(`preview`),Qe(!0),r({...e}),M(e=>e+1),Y(e=>[...e,{kind:`muted`,text:`Refreshing restricted browser preview…`}]),window.setTimeout(()=>{Qe(!1),Y(e=>[...e,{kind:`good`,text:`✓ Preview updated`}]),Q(`Preview updated`)},650))}function Jt(){St(null),K(null),J(Ee()),V(``),H(``)}function Yt(n,i){let a={...e,"index.html":n};Mt(t=>[...t.slice(-19),e[`index.html`]]),Pt([]),t(a),r(a),s(`index.html`),j(`Unsaved`),M(e=>e+1),Jt(),Y(e=>[...e,{kind:`good`,text:`✓ ${i}`},{kind:`muted`,text:`Other preview sections were preserved`}]),Q(i)}function Xt(t,n){if(!B)return;let r=B.label;Yt(xe(e[`index.html`],B.index,t),n===`manual`?`Selected section updated`:`Selected section regenerated`),Lt(e=>[...e,{role:`assistant`,text:`Updated only the selected ${r.toLowerCase()} section. Every other section was preserved.`,changedCount:1,engine:n===`cloud`?`cloud`:`instant`}])}function Zt(){if(!(!B||U))try{Xt(wt,`manual`)}catch(e){Q(e instanceof Error?e.message:`Section HTML is not valid.`)}}function Qt(){if(!(!B||!G||U))try{Xt(Te(B.html,G),`manual`)}catch(e){Q(e instanceof Error?e.message:`Section content could not be updated.`)}}function $t(){if(!(!B||U))try{Xt(De(B.html,q),`manual`)}catch(e){Q(e instanceof Error?e.message:`Section design could not be updated.`)}}function en(t){if(!(!B||U)&&!(t===`delete`&&!window.confirm(`Delete the ${B.label} section? You can undo this action.`)))try{Yt(t===`duplicate`?Oe(e[`index.html`],B.index):t===`delete`?Ae(e[`index.html`],B.index):ke(e[`index.html`],B.index,t===`move-up`?`up`:`down`),{"move-up":`Section moved up`,"move-down":`Section moved down`,duplicate:`Section duplicated`,delete:`Section deleted`}[t])}catch(e){Q(e instanceof Error?e.message:`The section could not be arranged.`)}}function tn(){let n=jt.at(-1);if(!n){Q(`No section change to undo.`);return}let i={...e,"index.html":n};Mt(e=>e.slice(0,-1)),Pt(t=>[...t.slice(-19),e[`index.html`]]),t(i),r(i),j(`Unsaved`),M(e=>e+1),Jt(),Y(e=>[...e,{kind:`good`,text:`↶ Section change undone`}]),Q(`Section change undone`)}function nn(){let n=Nt.at(-1);if(!n){Q(`No section change to redo.`);return}let i={...e,"index.html":n};Pt(e=>e.slice(0,-1)),Mt(t=>[...t.slice(-19),e[`index.html`]]),t(i),r(i),j(`Unsaved`),M(e=>e+1),Jt(),Y(e=>[...e,{kind:`good`,text:`↷ Section change restored`}]),Q(`Section change restored`)}function rn(e){Bt.current?.contentWindow?.postMessage({source:`skycode-workspace`,type:`select-section`,index:e},`*`)}async function an(){if(!B||U)return;let t=Ct.trim();if(!t){Q(`Describe the change for this section first.`);return}if(t.length>1200){Q(`Section instructions are limited to 1,200 characters.`);return}Tt(!0),tt(!0),nt(0);try{let n,r=`instant`;if(F===`cloud`&&I){let i={...e,"index.html":Se(e[`index.html`],B.index)},a=[`Update ONLY the HTML element marked data-skycode-target="selected-section".`,`Preserve that marker in the returned index.html.`,`Do not alter any content outside the marked element.`,`Keep styles for this change inline on elements inside the selected section.`,`Requested section change: ${t}`].join(`
`);n=Ce((await le({category:R??`website`,request:a,files:i})).files[`index.html`]),r=`cloud`}else await new Promise(e=>window.setTimeout(e,500)),n=Me(B.html,t);Xt(n,r)}catch(e){Q(e instanceof Error?e.message:`The selected section could not be updated.`)}finally{Tt(!1),tt(!1)}}function on(){!z&&Z&&qt(),xt(e=>!e),Jt()}function sn(){s(`index.html`),h(`code`),p(`code`)}function cn(){Jt(),Bt.current?.contentWindow?.postMessage({source:`skycode-workspace`,type:`clear-section-selection`},`*`)}function Q(e){bt(e),window.setTimeout(()=>bt(``),2200)}function ln(){try{return window.sessionStorage.setItem(se.draft,JSON.stringify({files:e,baselineFiles:He,projectId:A,projectName:qe,saveStatus:Ye===`Saving`?`Unsaved`:Ye,category:R,buildPrompt:ht,projectBrief:_t,onboardingOpen:pt})),!0}catch{return!1}}async function un(){if(Ye!==`Saving`){j(`Saving`);try{let t=await fetch(`/api/projects`,{method:A?`PUT`:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({...A?{id:A}:{},name:qe,template:R??`web`,files:e})}),n=await t.json();if(t.status===401){if(j(`Unsaved`),!ln())throw Error(`Sign-in is required, and this browser could not preserve the draft.`);let e=`${window.location.pathname}${window.location.search}`;window.location.assign(`/signin-with-chatgpt?return_to=${encodeURIComponent(e)}`);return}if(!t.ok||!n.project)throw Error(n.error??`Project could not be saved.`);A||(Ke(n.project.id),window.history.replaceState(null,``,`/workspace?project=${encodeURIComponent(n.project.id)}`)),j(`Saved`),Q(`Project saved securely`)}catch(e){j(`Unsaved`),Q(e instanceof Error?e.message:`Project could not be saved.`)}}}async function dn(){if(!A){Q(`Save the project before copying its private link.`);return}try{await navigator.clipboard.writeText(window.location.href),Q(`Private project link copied`)}catch{Q(`Copy the current address to keep this private project link.`)}}function fn(){let t=new Blob([ve(e)],{type:`text/html;charset=utf-8`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`${qe.replace(/[^a-zA-Z0-9_-]/g,`-`)||`skycode-project`}.html`,document.body.appendChild(r),r.click(),r.remove(),window.setTimeout(()=>URL.revokeObjectURL(n),1e3),Q(`Static project exported`)}async function pn(e){if(!e)return;let n=k.find(t=>t.name===e.name)?.name;if(!n){Q(`Import index.html, styles.css, app.js, or package.json.`);return}if(e.size>18e4){Q(`Imported files must be smaller than 180 KB.`);return}try{let r=await e.text();if(new TextEncoder().encode(r).byteLength>18e4)throw Error(`Imported files must be smaller than 180 KB.`);t(e=>({...e,[n]:r})),s(n),j(`Unsaved`),Q(`${n} imported`)}catch(e){Q(e instanceof Error?e.message:`File import failed.`)}finally{Rt.current&&(Rt.current.value=``)}}function mn(e){l(e),d(t=>e===c?!t:!0),w(!1)}function hn(e){s(e),h(`code`),p(`code`),d(!1)}function gn(e){h(e),p(e),e===`preview`&&Z&&qt()}function _n(e){_(e),window.localStorage.setItem(Le,e),Q(e===`studio`?`Version 1 studio layout`:`Version 2 classic layout`)}function vn(){let t=je.trim();!t||X.length===0||(Ue({...e}),Ge(e=>[{message:t.slice(0,80),time:`Now`},...e.map((e,t)=>({...e,time:t===0?`Earlier`:e.time}))]),Be(``),Y(e=>[...e,{kind:`good`,text:`✓ Local checkpoint: ${t.slice(0,42)}`}]),Q(`Local checkpoint created`))}function yn(e){t(t=>({...t,[e]:He[e]})),s(e),j(`Unsaved`),Q(`${e} restored to the last checkpoint`)}function bn(){mt(null),gt(``),L(!0),d(!1)}function xn(){if(!R){bn();return}L(!1),p(`ai`),window.requestAnimationFrame(()=>{document.querySelector(`.prompt-box textarea`)?.focus()})}async function Sn(){if(!lt){ut(!0);try{let e=await ce();if(ct(e.authenticated),ot(e.configured),ft(e.model??``),!e.authenticated){if(!ln())throw Error(`The browser could not preserve this workspace draft.`);window.location.assign(`/signin-with-chatgpt?return_to=%2Fworkspace`);return}if(!e.configured){it(!1),Q(`Cloud AI backend is ready. Add the server API key to activate it.`);return}it(!0),rt(`cloud`),Q(`Protected server Cloud AI is ready`)}catch(e){Q(e instanceof Error?e.message:`Cloud AI connection could not start.`)}finally{ut(!1)}}}function Cn(){it(!1),rt(`instant`),Q(`Switched to Instant Builder`)}async function wn(t,n){return le({category:t,request:n,files:e})}async function Tn(e=$e,n,i=!1){let a=e.trim();if(!a||N)return;if(a.length>3e3){Q(`Prompts are limited to 3,000 characters.`);return}let o=n??R;if(!o){gt(a),et(``),L(!0);return}et(``),Lt(e=>[...e,{role:`user`,text:a}]),tt(!0);let c=F===`cloud`&&I?`cloud`:`instant`,l=``,u=i||!_t?a:`${_t}\nRequested update: ${a}`;try{let e;if(c===`cloud`)try{e=await wn(o,a)}catch(t){if(t instanceof y&&t.code===`AUTH_REQUIRED`)throw ln()&&t.signInPath&&window.location.assign(t.signInPath),t;l=t instanceof Error?t.message:`The server Cloud AI model was unavailable.`,e=re(o,u),c=`fallback`}else await new Promise(e=>window.setTimeout(e,2200)),e=re(o,u);nt(D.length-1),await new Promise(e=>window.setTimeout(e,320)),i&&(Ke(``),Ue(O),vt(a),window.history.replaceState(null,``,`/workspace`)),t(e.files),r(e.files),h(`preview`),p(`preview`),Je(e.name),mt(o),s(`index.html`),j(`Unsaved`),M(e=>e+1),Y(e=>[...e,{kind:`good`,text:c===`cloud`?`✓ Server Cloud AI generated 4 files`:c===`fallback`?`✓ Instant builder completed the cloud request`:`✓ Instant builder generated 4 files locally`},{kind:`muted`,text:`Preview updated automatically`}]),Lt(t=>[...t,{role:`assistant`,text:c===`fallback`?`Server Cloud AI was unavailable (${l.slice(0,120)}), so the instant builder completed your project instead. ${e.summary}`:e.summary,changedCount:4,engine:c}]),Q(c===`cloud`?`Server Cloud AI project generated`:`Project generated free on this device`)}catch(e){Lt(t=>[...t,{role:`assistant`,text:e instanceof Error?`I couldn’t generate the project: ${e.message}`:`I couldn’t generate the project. Please try again.`,engine:c}])}finally{tt(!1)}}function En(){!R||!ht.trim()||N||(L(!1),Tn(ht,R,!0))}function Dn(e,t){t.pointerType===`mouse`&&t.button!==0||(t.preventDefault(),t.currentTarget.setPointerCapture(t.pointerId),Vt.current={panel:e,pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,sizes:v},ue(e))}function On(e){let t=Vt.current;if(!t||t.pointerId!==e.pointerId)return;e.preventDefault();let n=t.panel===`ai`&&g===`studio`?t.startX-e.clientX:e.clientX-t.startX;ne(ze(t.panel,t.sizes,n,e.clientY-t.startY,window.innerWidth,window.innerHeight))}function $(e){let t=Vt.current;!t||t.pointerId!==e.pointerId||(e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId),Vt.current=null,ue(null))}function kn(e,t){let n=0,r=0,i=t.shiftKey?40:16;if(e===`utility`)if(t.key===`ArrowUp`)r=-i;else if(t.key===`ArrowDown`)r=i;else return;else if(t.key===`ArrowLeft`)n=-i;else if(t.key===`ArrowRight`)n=i;else return;t.preventDefault(),e===`ai`&&g===`studio`&&(n*=-1),ne(t=>ze(e,t,n,r,window.innerWidth,window.innerHeight))}function An(e){ne(t=>e?{...t,[e]:Fe[e]}:Fe),Q(e?`Panel size reset`:`Workspace layout reset`)}return(0,b.jsxs)(`main`,{className:`workspace`,"data-layout-version":g,children:[(0,b.jsxs)(`header`,{className:`topbar`,children:[(0,b.jsxs)(`div`,{className:`project-identity`,children:[(0,b.jsx)(`div`,{className:`logo-mark`,children:(0,b.jsx)(`span`,{})}),(0,b.jsx)(`strong`,{children:`SkyCode`}),(0,b.jsx)(`span`,{className:`crumb`,children:`/`}),(0,b.jsxs)(`button`,{className:`project-name`,onClick:bn,children:[qe,` `,(0,b.jsx)(`span`,{children:`⌄`})]}),(0,b.jsxs)(`button`,{className:`save-state ${Ye.toLowerCase()}`,onClick:un,children:[(0,b.jsx)(`i`,{}),` `,Ye]})]}),(0,b.jsxs)(`div`,{className:`workspace-canvas-switcher`,role:`tablist`,"aria-label":`Center workspace view`,children:[(0,b.jsxs)(`button`,{className:m===`preview`?`active`:``,role:`tab`,"aria-selected":m===`preview`,onClick:()=>gn(`preview`),children:[`Preview`,Z&&(0,b.jsx)(`i`,{})]}),(0,b.jsx)(`button`,{className:m===`code`?`active`:``,role:`tab`,"aria-selected":m===`code`,onClick:()=>gn(`code`),children:`Code`})]}),(0,b.jsxs)(`div`,{className:`top-actions`,children:[(0,b.jsxs)(`button`,{className:`ai-launch-button${I?` cloud-ready`:``}`,onClick:xn,title:I?`Open Sky AI · Server Cloud ready`:`Open Sky AI`,children:[(0,b.jsx)(x,{name:`spark`,size:15}),(0,b.jsx)(`span`,{children:`Sky AI`}),I&&(0,b.jsx)(`i`,{"aria-hidden":`true`})]}),(0,b.jsxs)(`div`,{className:`layout-version-switcher`,"aria-label":`Workspace layout version`,children:[(0,b.jsx)(`button`,{className:g===`studio`?`active`:``,"aria-pressed":g===`studio`,onClick:()=>_n(`studio`),title:`New studio workspace`,children:`V1`}),(0,b.jsx)(`button`,{className:g===`classic`?`active`:``,"aria-pressed":g===`classic`,onClick:()=>_n(`classic`),title:`Previous SkyCode workspace`,children:`V2`})]}),(0,b.jsxs)(`button`,{className:`layout-reset-button`,onClick:()=>An(),title:`Reset panel sizes`,children:[(0,b.jsx)(x,{name:`layout`,size:15}),(0,b.jsx)(`span`,{children:`Reset layout`})]}),(0,b.jsxs)(`div`,{className:`avatars`,"aria-label":`Project collaborators`,children:[(0,b.jsx)(`span`,{children:`SK`}),(0,b.jsx)(`span`,{children:`AI`})]}),(0,b.jsx)(`button`,{className:`ghost-button`,onClick:dn,children:`Copy link`}),(0,b.jsxs)(`button`,{className:`run-button`,onClick:qt,children:[(0,b.jsx)(x,{name:`play`,size:15}),` `,Ze?`Running…`:Z?`Run changes`:`Run`]}),(0,b.jsx)(`button`,{className:`deploy-button`,onClick:fn,children:`Export`}),(0,b.jsxs)(`details`,{className:`workspace-overflow-menu`,children:[(0,b.jsx)(`summary`,{"aria-label":`Open workspace actions`,children:`•••`}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`strong`,{children:`Workspace`}),(0,b.jsxs)(`button`,{onClick:xn,children:[(0,b.jsx)(x,{name:`spark`,size:15}),` Open Sky AI`]}),(0,b.jsxs)(`button`,{onClick:()=>gn(`preview`),children:[(0,b.jsx)(x,{name:`layout`,size:15}),` Live preview`]}),(0,b.jsxs)(`button`,{onClick:()=>gn(`code`),children:[(0,b.jsx)(x,{name:`terminal`,size:15}),` Code editor`]}),(0,b.jsxs)(`button`,{onClick:qt,children:[(0,b.jsx)(x,{name:`play`,size:15}),` Run project`]}),(0,b.jsxs)(`button`,{onClick:fn,children:[(0,b.jsx)(x,{name:`files`,size:15}),` Export project`]}),(0,b.jsxs)(`button`,{onClick:dn,children:[(0,b.jsx)(x,{name:`external`,size:15}),` Copy workspace link`]}),(0,b.jsx)(`span`,{}),(0,b.jsx)(`strong`,{children:`Layout`}),(0,b.jsxs)(`button`,{onClick:()=>_n(`studio`),children:[(0,b.jsx)(x,{name:`layout`,size:15}),` Studio layout (V1)`]}),(0,b.jsxs)(`button`,{onClick:()=>_n(`classic`),children:[(0,b.jsx)(x,{name:`layout`,size:15}),` Classic layout (V2)`]}),(0,b.jsxs)(`button`,{onClick:()=>An(),children:[(0,b.jsx)(x,{name:`refresh`,size:15}),` Reset panel sizes`]})]})]})]})]}),(0,b.jsxs)(`div`,{className:`app-shell${oe?` is-resizing`:``}`,"data-mobile-view":f,"data-layout-version":g,"data-canvas-mode":m,"data-resizing":oe??void 0,style:{"--ai-panel-width":`${v.ai}px`,"--preview-panel-width":`${v.preview}px`,"--utility-panel-height":`${v.utility}px`},children:[(0,b.jsxs)(`aside`,{className:`activity-bar`,children:[(0,b.jsx)(`div`,{children:Object.keys(Ne).map(e=>(0,b.jsxs)(`button`,{className:c===e?`active`:``,"aria-label":Ne[e],"aria-pressed":c===e,title:Ne[e],onClick:()=>mn(e),children:[(0,b.jsx)(x,{name:e}),(0,b.jsx)(`span`,{className:`activity-label`,children:Ne[e]}),e===`git`&&X.length>0&&(0,b.jsx)(`span`,{className:`activity-count`,children:X.length})]},e))}),(0,b.jsx)(`button`,{className:`profile-button`,"aria-label":`Open project dashboard`,onClick:()=>{window.location.href=`/dashboard`},children:`SK`})]}),(0,b.jsxs)(`aside`,{className:`explorer activity-panel ${te?`mobile-open`:``}`,children:[(0,b.jsxs)(`div`,{className:`panel-title`,children:[(0,b.jsx)(`span`,{children:Ne[c].toUpperCase()}),(0,b.jsxs)(`div`,{className:`panel-controls`,children:[c===`files`&&(0,b.jsx)(`button`,{"aria-label":`File options`,"aria-expanded":C,onClick:()=>w(e=>!e),children:`•••`}),(0,b.jsx)(`button`,{className:`panel-close`,"aria-label":`Close panel`,onClick:()=>d(!1),children:`×`}),C&&(0,b.jsxs)(`div`,{className:`panel-menu`,children:[(0,b.jsx)(`button`,{onClick:()=>{un(),w(!1)},children:`Save project`}),(0,b.jsx)(`button`,{onClick:()=>{fn(),w(!1)},children:`Export HTML`}),(0,b.jsx)(`button`,{onClick:()=>{fe(!1),ge(!1),w(!1)},children:`Collapse folders`})]})]})]}),c===`files`&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`button`,{className:`tree-heading`,"aria-expanded":de,onClick:()=>fe(e=>!e),children:[(0,b.jsx)(`span`,{className:de?`tree-caret expanded`:`tree-caret`,children:(0,b.jsx)(x,{name:`chevron`,size:13})}),(0,b.jsx)(`strong`,{children:qe.toUpperCase()})]}),de&&(0,b.jsxs)(`div`,{className:`file-tree`,children:[(0,b.jsxs)(`button`,{className:`folder-row`,"aria-expanded":he,onClick:()=>ge(e=>!e),children:[(0,b.jsx)(`span`,{children:he?`⌄`:`›`}),(0,b.jsx)(`b`,{children:`⌗`}),` src`]}),he&&k.slice(0,3).map(e=>(0,b.jsxs)(`button`,{className:o===e.name?`selected`:``,onClick:()=>hn(e.name),children:[(0,b.jsx)(pe,{tone:e.tone}),e.name,X.some(t=>t.name===e.name)&&(0,b.jsx)(`i`,{className:`change-dot`})]},e.name)),(0,b.jsxs)(`button`,{className:o===`package.json`?`selected root-file`:`root-file`,onClick:()=>hn(`package.json`),children:[(0,b.jsx)(pe,{tone:`json`}),` package.json`,X.some(e=>e.name===`package.json`)&&(0,b.jsx)(`i`,{className:`change-dot`})]})]}),(0,b.jsxs)(`div`,{className:`explorer-footer`,children:[(0,b.jsxs)(`button`,{onClick:()=>ye(e=>!e),"aria-expanded":_e,children:[(0,b.jsx)(`span`,{children:`OUTLINE`}),(0,b.jsx)(`span`,{children:_e?`⌄`:`›`})]}),_e&&(0,b.jsx)(`div`,{className:`outline-list`,children:Ut[o].map(e=>(0,b.jsxs)(`button`,{onClick:()=>Q(`${e} selected in ${o}`),children:[(0,b.jsx)(`span`,{children:`◇`}),e]},e))}),(0,b.jsxs)(`button`,{onClick:()=>be(e=>!e),"aria-expanded":S,children:[(0,b.jsx)(`span`,{children:`TIMELINE`}),(0,b.jsx)(`span`,{children:S?`⌄`:`›`})]}),S&&(0,b.jsx)(`div`,{className:`timeline-list`,children:We.map((e,t)=>(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`i`,{}),(0,b.jsx)(`span`,{children:e.message}),(0,b.jsx)(`small`,{children:e.time})]},`${e.message}-${t}`))})]})]}),c===`search`&&(0,b.jsxs)(`div`,{className:`search-workspace-panel`,children:[(0,b.jsx)(`label`,{htmlFor:`workspace-search`,children:`SEARCH ACROSS FILES`}),(0,b.jsxs)(`div`,{className:`search-input-wrap`,children:[(0,b.jsx)(x,{name:`search`,size:14}),(0,b.jsx)(`input`,{id:`workspace-search`,type:`search`,value:T,onChange:e=>E(e.target.value),placeholder:`Search code…`,autoComplete:`off`}),T&&(0,b.jsx)(`button`,{"aria-label":`Clear search`,onClick:()=>E(``),children:`×`})]}),(0,b.jsx)(`div`,{className:`search-summary`,children:T?`${Ht.length} result${Ht.length===1?``:`s`}`:`Type to search every project file`}),(0,b.jsxs)(`div`,{className:`search-results`,children:[Ht.map((e,t)=>(0,b.jsxs)(`button`,{onClick:()=>hn(e.name),children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(pe,{tone:k.find(t=>t.name===e.name)?.tone??`html`}),e.name,(0,b.jsxs)(`small`,{children:[`:`,e.line]})]}),(0,b.jsx)(`p`,{children:e.preview})]},`${e.name}-${e.line}-${t}`)),T&&Ht.length===0&&(0,b.jsxs)(`div`,{className:`panel-empty`,children:[(0,b.jsx)(x,{name:`search`}),(0,b.jsxs)(`p`,{children:[`No code matched “`,T,`”.`]})]})]})]}),c===`git`&&(0,b.jsxs)(`div`,{className:`source-panel`,children:[(0,b.jsxs)(`div`,{className:`source-heading`,children:[(0,b.jsx)(`span`,{children:`LOCAL CHANGES`}),(0,b.jsx)(`b`,{children:X.length})]}),(0,b.jsxs)(`div`,{className:`commit-box`,children:[(0,b.jsx)(`input`,{value:je,onChange:e=>Be(e.target.value),onKeyDown:e=>{e.key===`Enter`&&vn()},placeholder:`Checkpoint message`,maxLength:80}),(0,b.jsx)(`button`,{disabled:!je.trim()||X.length===0,onClick:vn,children:`Commit checkpoint`})]}),(0,b.jsxs)(`div`,{className:`source-files`,children:[X.map(e=>(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`button`,{onClick:()=>hn(e.name),children:[(0,b.jsx)(pe,{tone:e.tone}),(0,b.jsx)(`span`,{children:e.name}),(0,b.jsx)(`b`,{children:`M`})]}),(0,b.jsx)(`button`,{"aria-label":`Revert ${e.name}`,onClick:()=>yn(e.name),children:`↶`})]},e.name)),X.length===0&&(0,b.jsxs)(`div`,{className:`panel-empty source-clean`,children:[(0,b.jsx)(`span`,{children:`✓`}),(0,b.jsx)(`p`,{children:`No local changes`}),(0,b.jsx)(`small`,{children:`Edit a file to see it here.`})]})]}),(0,b.jsxs)(`div`,{className:`source-history`,children:[(0,b.jsx)(`span`,{children:`CHECKPOINT HISTORY`}),We.map((e,t)=>(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`i`,{}),(0,b.jsx)(`p`,{children:e.message}),(0,b.jsx)(`small`,{children:e.time})]},`${e.message}-${t}`))]})]}),c===`database`&&(0,b.jsxs)(`div`,{className:`tools-panel`,children:[(0,b.jsx)(`p`,{className:`panel-description`,children:`Protected project storage and backend tools.`}),(0,b.jsxs)(`button`,{onClick:()=>void un(),children:[(0,b.jsx)(`span`,{className:`tool-icon save`,children:`✓`}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`b`,{children:`Save project`}),(0,b.jsx)(`small`,{children:`Store files securely`})]}),(0,b.jsx)(`span`,{children:`›`})]}),(0,b.jsxs)(`button`,{onClick:()=>{window.location.href=`/dashboard`},children:[(0,b.jsx)(`span`,{className:`tool-icon`,children:`▦`}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`b`,{children:`Project dashboard`}),(0,b.jsx)(`small`,{children:`Manage saved projects`})]}),(0,b.jsx)(`span`,{children:`›`})]}),(0,b.jsxs)(`div`,{className:`tool-status`,children:[(0,b.jsx)(`i`,{}),(0,b.jsx)(`span`,{children:`Private project records`}),(0,b.jsx)(`b`,{children:st?`Connected`:`Sign in to save`})]})]})]}),(0,b.jsxs)(`section`,{className:`editor-column`,children:[(0,b.jsxs)(`div`,{className:`editor-tabs`,children:[(0,b.jsxs)(`div`,{className:`tab active`,children:[(0,b.jsx)(pe,{tone:k.find(e=>e.name===o)?.tone??`html`}),o,(0,b.jsx)(x,{name:`close`,size:12})]}),(0,b.jsx)(`span`,{className:`editor-spacer`})]}),(0,b.jsxs)(`div`,{className:`breadcrumb`,children:[(0,b.jsx)(`span`,{children:`src`}),(0,b.jsx)(`span`,{children:`›`}),(0,b.jsx)(`span`,{children:o}),o===`index.html`&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`span`,{children:`›`}),(0,b.jsx)(`span`,{children:`main.hero`})]})]}),(0,b.jsxs)(`div`,{className:`code-editor`,children:[(0,b.jsx)(`div`,{className:`line-numbers`,"aria-hidden":`true`,children:Wt.map((e,t)=>(0,b.jsx)(`span`,{children:t+1},t))}),(0,b.jsxs)(`div`,{className:`code-input`,children:[(0,b.jsx)(`pre`,{ref:zt,"aria-hidden":`true`,children:(0,b.jsx)(`code`,{children:Ve(e[o])})}),(0,b.jsx)(`textarea`,{"aria-label":`${o} code editor`,spellCheck:!1,value:e[o],onScroll:e=>{zt.current&&(zt.current.scrollTop=e.currentTarget.scrollTop,zt.current.scrollLeft=e.currentTarget.scrollLeft)},onChange:e=>{let n=e.currentTarget.value;t(e=>({...e,[o]:n})),j(`Unsaved`)}})]})]}),m===`code`&&(0,b.jsxs)(`div`,{className:`terminal-panel`,children:[(0,b.jsxs)(`div`,{className:`terminal-head`,children:[(0,b.jsx)(`div`,{children:(0,b.jsx)(`span`,{className:`terminal-section-label`,children:`ACTIVITY`})}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{children:`browser sandbox`}),(0,b.jsx)(`button`,{"aria-label":`Clear activity`,onClick:()=>Y([]),children:`Clear`})]})]}),(0,b.jsx)(`div`,{className:`terminal-body`,children:Ft.length?Ft.slice(-5).map((e,t)=>(0,b.jsx)(`div`,{className:e.kind,children:e.text},`${e.text}-${t}`)):(0,b.jsx)(`div`,{className:`muted`,children:`Activity cleared. Run the preview to create a new entry.`})})]})]}),(0,b.jsxs)(`aside`,{className:`right-column`,children:[(0,b.jsxs)(`section`,{className:`preview-panel`,children:[(0,b.jsxs)(`div`,{className:`preview-head`,children:[(0,b.jsxs)(`div`,{className:`preview-tabs`,children:[(0,b.jsx)(`span`,{className:`active`,children:`Secure preview`}),z&&(0,b.jsx)(`span`,{className:`section-mode-label`,children:`Section edit`})]}),(0,b.jsx)(`div`,{className:`preview-device-switcher`,"aria-label":`Preview size`,children:[`desktop`,`tablet`,`phone`].map(e=>(0,b.jsx)(`button`,{className:Dt===e?`active`:``,"aria-label":`${e} preview`,"aria-pressed":Dt===e,onClick:()=>Ot(e),title:`${e[0].toUpperCase()}${e.slice(1)} preview`,children:e===`desktop`?`▰`:`▯`},e))}),(0,b.jsxs)(`div`,{className:`preview-actions`,children:[(0,b.jsx)(`button`,{onClick:tn,disabled:!jt.length,"aria-label":`Undo section change`,title:`Undo section change`,children:`↶`}),(0,b.jsx)(`button`,{onClick:nn,disabled:!Nt.length,"aria-label":`Redo section change`,title:`Redo section change`,children:`↷`}),(0,b.jsx)(`button`,{className:`section-mode-toggle${z?` active`:``}`,"aria-pressed":z,onClick:on,title:z?`Turn off section selection`:`Select and edit one preview section`,children:z?`Edit on`:`Edit`}),(0,b.jsx)(`button`,{onClick:qt,"aria-label":`Refresh preview`,children:(0,b.jsx)(x,{name:`refresh`,size:14})})]})]}),(0,b.jsxs)(`div`,{className:`address-bar`,children:[(0,b.jsx)(`span`,{className:`status-dot${Ze?` running`:Z?` pending`:``}`}),z&&kt.length?(0,b.jsxs)(`label`,{className:`section-navigator`,children:[(0,b.jsx)(`span`,{children:`Jump to`}),(0,b.jsxs)(`select`,{"aria-label":`Jump to a page section`,value:B?.index??``,onChange:e=>rn(Number(e.target.value)),children:[(0,b.jsx)(`option`,{value:``,disabled:!0,children:`Choose section`}),kt.map((e,t)=>(0,b.jsxs)(`option`,{value:e.index,children:[t+1,`. `,e.label]},`${e.index}-${e.label}`))]})]}):(0,b.jsx)(`span`,{children:Ze?`Updating preview…`:Z?`Changes ready — press Run`:z?`Click a boxed section to edit only that section`:`Preview up to date`}),(0,b.jsx)(`span`,{className:`preview-lock`,"aria-label":`Network-restricted preview`,children:`◆`})]}),(0,b.jsxs)(`div`,{className:`preview-canvas`,"data-preview-device":Dt,children:[(0,b.jsx)(`iframe`,{ref:Bt,title:`Live project preview`,srcDoc:Gt,sandbox:`allow-scripts`,referrerPolicy:`no-referrer`},Xe),B&&(0,b.jsxs)(`aside`,{className:`section-inspector section-tab-${W}`,"aria-label":`Edit ${B.label} section`,children:[(0,b.jsxs)(`div`,{className:`section-inspector-head`,children:[(0,b.jsx)(`div`,{children:(0,b.jsxs)(`strong`,{children:[B.label,(0,b.jsxs)(`small`,{children:[`<`,B.tag,`>`]})]})}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`button`,{className:`section-code-toggle${W===`code`?` active`:``}`,"aria-label":`Edit section HTML`,onClick:()=>Et(`code`),title:`Edit section HTML`,children:`</>`}),(0,b.jsxs)(`details`,{className:`section-more-menu`,children:[(0,b.jsx)(`summary`,{"aria-label":`More section actions`,title:`More section actions`,children:`•••`}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`button`,{onClick:()=>en(`move-up`),children:`↑ Move up`}),(0,b.jsx)(`button`,{onClick:()=>en(`move-down`),children:`↓ Move down`}),(0,b.jsx)(`button`,{onClick:()=>en(`duplicate`),children:`⧉ Duplicate`}),(0,b.jsx)(`button`,{className:`danger`,onClick:()=>en(`delete`),children:`× Delete`}),(0,b.jsx)(`button`,{onClick:sn,children:`Open full code`})]})]}),(0,b.jsx)(`button`,{className:`section-inspector-close`,"aria-label":`Close section editor`,onClick:cn,children:`×`})]})]}),(0,b.jsx)(`div`,{className:`section-inspector-tabs`,role:`tablist`,"aria-label":`Section editor`,children:[`content`,`design`,`ai`].map(e=>(0,b.jsx)(`button`,{role:`tab`,"aria-selected":W===e,className:W===e?`active`:``,onClick:()=>Et(e),children:e===`ai`?`AI edit`:`${e[0].toUpperCase()}${e.slice(1)}`},e))}),(0,b.jsxs)(`div`,{className:`section-inspector-body`,children:[W===`content`&&G&&(0,b.jsxs)(`div`,{className:`section-content-editor`,role:`tabpanel`,children:[(0,b.jsxs)(`div`,{className:`section-tab-intro`,children:[(0,b.jsx)(`strong`,{children:`Edit visible content`}),(0,b.jsx)(`span`,{children:`Simple fields keep the structure safe.`})]}),G.hasHeading&&(0,b.jsxs)(`label`,{children:[(0,b.jsx)(`span`,{children:`Heading`}),(0,b.jsx)(`input`,{value:G.heading,maxLength:180,onChange:e=>K(t=>t&&{...t,heading:e.target.value})})]}),G.hasBody&&(0,b.jsxs)(`label`,{children:[(0,b.jsx)(`span`,{children:`Body text`}),(0,b.jsx)(`textarea`,{value:G.body,maxLength:900,onChange:e=>K(t=>t&&{...t,body:e.target.value})})]}),G.hasButton&&(0,b.jsxs)(`div`,{className:`section-field-grid`,children:[(0,b.jsxs)(`label`,{children:[(0,b.jsx)(`span`,{children:`Button label`}),(0,b.jsx)(`input`,{value:G.buttonLabel,maxLength:80,onChange:e=>K(t=>t&&{...t,buttonLabel:e.target.value})})]}),G.buttonSupportsLink&&(0,b.jsxs)(`label`,{children:[(0,b.jsx)(`span`,{children:`Button link`}),(0,b.jsx)(`input`,{value:G.buttonHref,maxLength:400,placeholder:`#contact`,onChange:e=>K(t=>t&&{...t,buttonHref:e.target.value})})]})]}),!G.hasHeading&&!G.hasBody&&!G.hasButton&&(0,b.jsx)(`div`,{className:`section-empty-state`,children:`No standard text fields found. Use AI edit or Code for this section.`}),(0,b.jsx)(`button`,{className:`section-primary-action`,disabled:U,onClick:Qt,children:`Apply content`})]}),W===`design`&&(0,b.jsxs)(`div`,{className:`section-design-editor`,role:`tabpanel`,children:[(0,b.jsxs)(`div`,{className:`section-tab-intro`,children:[(0,b.jsx)(`strong`,{children:`Style this section`}),(0,b.jsx)(`span`,{children:`Responsive choices—no CSS knowledge needed.`})]}),(0,b.jsxs)(`fieldset`,{children:[(0,b.jsx)(`legend`,{children:`Background`}),(0,b.jsx)(`div`,{className:`section-color-options`,children:[[``,`Keep`],[`#fff7f1`,`Cream`],[`#ff5a1f`,`Orange`],[`#0b0c10`,`Dark`],[`#eaf4ff`,`Sky`]].map(([e,t])=>(0,b.jsxs)(`button`,{className:q.background===e?`active`:``,onClick:()=>J(t=>({...t,background:e})),title:t,children:[(0,b.jsx)(`i`,{style:{background:e||`linear-gradient(135deg,#fff 50%,#222 50%)`}}),(0,b.jsx)(`span`,{children:t})]},t))})]}),(0,b.jsxs)(`fieldset`,{children:[(0,b.jsx)(`legend`,{children:`Alignment`}),(0,b.jsx)(`div`,{className:`section-segmented-control`,children:[`keep`,`left`,`center`,`right`].map(e=>(0,b.jsx)(`button`,{className:q.alignment===e?`active`:``,onClick:()=>J(t=>({...t,alignment:e})),children:e},e))})]}),(0,b.jsxs)(`details`,{className:`section-advanced-style`,children:[(0,b.jsx)(`summary`,{children:`More style options`}),(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`fieldset`,{children:[(0,b.jsx)(`legend`,{children:`Text color`}),(0,b.jsx)(`div`,{className:`section-color-options compact`,children:[[``,`Keep`],[`#171717`,`Ink`],[`#ffffff`,`White`],[`#6b7280`,`Muted`]].map(([e,t])=>(0,b.jsxs)(`button`,{className:q.textColor===e?`active`:``,onClick:()=>J(t=>({...t,textColor:e})),children:[(0,b.jsx)(`i`,{style:{background:e||`linear-gradient(135deg,#fff 50%,#222 50%)`}}),(0,b.jsx)(`span`,{children:t})]},t))})]}),(0,b.jsxs)(`fieldset`,{children:[(0,b.jsx)(`legend`,{children:`Accent`}),(0,b.jsx)(`div`,{className:`section-color-options compact`,children:[[``,`Keep`],[`#ff5a1f`,`Orange`],[`#8b5cf6`,`Purple`],[`#24b47e`,`Green`],[`#2797ff`,`Blue`]].map(([e,t])=>(0,b.jsxs)(`button`,{className:q.accent===e?`active`:``,onClick:()=>J(t=>({...t,accent:e})),children:[(0,b.jsx)(`i`,{style:{background:e||`linear-gradient(135deg,#fff 50%,#222 50%)`}}),(0,b.jsx)(`span`,{children:t})]},t))})]}),[{key:`padding`,label:`Vertical spacing`,options:[`keep`,`compact`,`balanced`,`spacious`]},{key:`radius`,label:`Corners`,options:[`keep`,`none`,`soft`,`rounded`,`pill`]}].map(e=>(0,b.jsxs)(`fieldset`,{children:[(0,b.jsx)(`legend`,{children:e.label}),(0,b.jsx)(`div`,{className:`section-segmented-control`,children:e.options.map(t=>(0,b.jsx)(`button`,{className:q[e.key]===t?`active`:``,onClick:()=>J(n=>({...n,[e.key]:t})),children:t},t))})]},e.key))]})]}),(0,b.jsx)(`button`,{className:`section-primary-action`,disabled:U,onClick:$t,children:`Apply design`})]}),W===`ai`&&(0,b.jsxs)(`div`,{className:`section-ai-editor`,role:`tabpanel`,children:[(0,b.jsxs)(`div`,{className:`section-tab-intro`,children:[(0,b.jsx)(`strong`,{children:`Describe the result`}),(0,b.jsx)(`span`,{children:`AI is locked to this selected section.`})]}),(0,b.jsx)(`div`,{className:`section-suggestion-list`,children:[`Make it orange and rounded`,`Make it compact and centered`].map(e=>(0,b.jsx)(`button`,{onClick:()=>V(e),children:e},e))}),(0,b.jsxs)(`label`,{className:`section-instruction`,children:[(0,b.jsx)(`span`,{children:`Change only this section`}),(0,b.jsx)(`textarea`,{autoFocus:!0,value:Ct,onChange:e=>V(e.target.value),maxLength:1200,placeholder:`Try: Make it more compact, or change the title to “Build faster”.`})]}),(0,b.jsxs)(`div`,{className:`section-inspector-actions`,children:[(0,b.jsx)(`small`,{children:F===`cloud`&&I?`Protected Cloud AI`:`Instant focused edit`}),(0,b.jsx)(`button`,{disabled:U||!Ct.trim(),onClick:()=>void an(),children:U?`Updating…`:`Update this section`})]})]}),W===`code`&&(0,b.jsxs)(`div`,{className:`section-html-editor`,role:`tabpanel`,children:[(0,b.jsxs)(`div`,{className:`section-tab-intro`,children:[(0,b.jsx)(`strong`,{children:`Section HTML`}),(0,b.jsx)(`span`,{children:`Scripts, frames, and unsafe handlers are blocked.`})]}),(0,b.jsx)(`textarea`,{"aria-label":`${B.label} HTML`,spellCheck:!1,value:wt,onChange:e=>H(e.target.value)}),(0,b.jsx)(`button`,{className:`section-primary-action`,disabled:U,onClick:Zt,children:`Apply HTML`})]})]})]})]})]}),(0,b.jsxs)(`section`,{className:`ai-panel`,children:[(0,b.jsxs)(`div`,{className:`ai-head`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{className:`ai-icon`,children:(0,b.jsx)(x,{name:`spark`,size:15})}),(0,b.jsx)(`strong`,{children:`Sky AI`}),(0,b.jsx)(`span`,{className:`ai-engine-status ${F}`,children:F===`cloud`&&I?`SERVER CLOUD`:`INSTANT FREE`})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`button`,{onClick:bn,"aria-label":`Start a new AI build`,children:`＋`}),(0,b.jsx)(`button`,{onClick:()=>{I?rt(e=>e===`cloud`?`instant`:`cloud`):L(!0)},"aria-label":`Switch AI engine`,children:F===`cloud`?`☁`:`⌁`})]})]}),(0,b.jsxs)(`div`,{className:`messages`,children:[It.map((e,t)=>(0,b.jsxs)(`div`,{className:`message ${e.role}`,children:[(0,b.jsx)(`span`,{className:`message-avatar`,children:e.role===`user`?`SK`:(0,b.jsx)(x,{name:`spark`,size:13})}),(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`b`,{children:[e.role===`user`?`You`:`Sky AI`,e.role===`assistant`&&e.engine&&(0,b.jsx)(`em`,{className:`message-engine ${e.engine}`,children:e.engine===`cloud`?`Cloud`:e.engine===`fallback`?`Local fallback`:`On-device`})]}),(0,b.jsx)(`p`,{children:e.text}),e.role===`assistant`&&e.changedCount&&(0,b.jsxs)(`div`,{className:`change-card`,children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`i`,{children:e.changedCount}),` files changed`]}),(0,b.jsx)(`button`,{onClick:qt,children:`Review changes`})]})]})]},t)),N&&(0,b.jsxs)(`div`,{className:`ai-progress-card`,role:`status`,"aria-live":`polite`,children:[(0,b.jsxs)(`div`,{className:`ai-progress-summary`,children:[(0,b.jsx)(`span`,{className:`ai-progress-spinner`,children:(0,b.jsx)(x,{name:`spark`,size:14})}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`strong`,{children:D[P].title}),(0,b.jsx)(`p`,{children:D[P].detail})]}),(0,b.jsxs)(`span`,{className:`ai-progress-count`,children:[P+1,`/`,D.length]})]}),(0,b.jsx)(`div`,{className:`ai-progress-track`,"aria-hidden":`true`,children:(0,b.jsx)(`i`,{style:{width:`${(P+1)/D.length*100}%`}})}),(0,b.jsx)(`div`,{className:`ai-progress-steps`,children:D.map((e,t)=>(0,b.jsxs)(`span`,{className:t<P?`complete`:t===P?`active`:``,children:[(0,b.jsx)(`i`,{children:t<P?`✓`:t+1}),e.title]},e.title))})]})]}),(0,b.jsxs)(`div`,{className:`prompt-area`,children:[(0,b.jsxs)(`div`,{className:`suggestions`,children:[(0,b.jsx)(`button`,{onClick:bn,children:`＋ New build`}),(0,b.jsx)(`button`,{onClick:()=>Tn(`Add a premium purple glow`),children:`Add premium glow`}),(0,b.jsx)(`button`,{onClick:()=>Tn(`Improve the CTA button`),children:`Improve CTA`})]}),(0,b.jsxs)(`div`,{className:`prompt-box`,children:[(0,b.jsx)(`textarea`,{"aria-label":`Ask Sky AI`,placeholder:`Ask Sky AI to build, edit, or explain…`,value:$e,onChange:e=>et(e.target.value),maxLength:3e3,onKeyDown:e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),Tn())}}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`input`,{ref:Rt,className:`file-import-input`,type:`file`,accept:`.html,.css,.js,.json`,onChange:e=>void pn(e.target.files?.[0])}),(0,b.jsx)(`button`,{className:`attach-button`,"aria-label":`Import a supported project file`,onClick:()=>Rt.current?.click(),children:`＋`}),(0,b.jsxs)(`button`,{className:`prompt-engine`,onClick:()=>{I?rt(e=>e===`cloud`?`instant`:`cloud`):L(!0)},children:[F===`cloud`&&I?`Server cloud`:`Instant free`,` `,(0,b.jsx)(`b`,{children:`⌄`})]}),(0,b.jsx)(`button`,{className:`send-button`,disabled:N,onClick:()=>void Tn(),"aria-label":`Send prompt`,children:(0,b.jsx)(x,{name:`send`,size:14})})]})]}),(0,b.jsx)(`small`,{children:`Instant mode costs nothing and needs no login. Always review generated code.`})]})]})]}),m===`code`&&(0,b.jsxs)(`section`,{className:`bottom-dock`,"aria-label":`Developer tools`,children:[(0,b.jsxs)(`div`,{className:`bottom-dock-tabs`,children:[(0,b.jsx)(`div`,{children:Object.keys(Pe).map(e=>(0,b.jsxs)(`button`,{className:u===e?`active`:``,"aria-pressed":u===e,onClick:()=>ee(e),children:[(0,b.jsx)(x,{name:Pe[e].icon,size:14}),Pe[e].label,e===`problems`&&(0,b.jsx)(`span`,{className:`bottom-tab-count`,children:Kt.length})]},e))}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{children:`browser sandbox`}),(u===`terminal`||u===`logs`)&&(0,b.jsx)(`button`,{className:`bottom-clear-button`,onClick:()=>Y([]),children:`Clear`})]})]}),(0,b.jsxs)(`div`,{className:`bottom-dock-content`,children:[u===`terminal`&&(0,b.jsx)(`div`,{className:`dock-terminal-view`,children:Ft.length?Ft.slice(-10).map((e,t)=>(0,b.jsxs)(`div`,{className:e.kind,children:[(0,b.jsx)(`span`,{children:`skycode $`}),(0,b.jsx)(`p`,{children:e.text})]},`${e.text}-${t}`)):(0,b.jsx)(`div`,{className:`dock-empty`,children:`Terminal cleared. Run the preview to create new activity.`})}),u===`problems`&&(0,b.jsx)(`div`,{className:`dock-problems-view`,children:Kt.length?Kt.map((e,t)=>(0,b.jsxs)(`button`,{onClick:()=>{hn(e.file),p(`code`)},children:[(0,b.jsx)(`span`,{className:`problem-mark ${e.kind}`,children:e.kind===`error`?`×`:e.kind===`warning`?`!`:`i`}),(0,b.jsx)(`strong`,{children:e.file}),(0,b.jsx)(`p`,{children:e.text})]},`${e.file}-${e.text}-${t}`)):(0,b.jsxs)(`div`,{className:`dock-empty dock-clean`,children:[(0,b.jsx)(`span`,{children:`✓`}),`No problems detected in the current project files.`]})}),u===`logs`&&(0,b.jsx)(`div`,{className:`dock-logs-view`,children:Ft.length?Ft.map((e,t)=>(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{children:String(t+1).padStart(2,`0`)}),(0,b.jsx)(`b`,{className:e.kind,children:e.kind===`good`?`SUCCESS`:`INFO`}),(0,b.jsx)(`p`,{children:e.text})]},`${e.text}-${t}`)):(0,b.jsx)(`div`,{className:`dock-empty`,children:`No workspace logs yet.`})})]})]}),(0,b.jsx)(`div`,{className:`resize-handle resize-handle-ai`,role:`separator`,"aria-label":`Resize AI assistant`,"aria-orientation":`vertical`,"aria-valuemin":250,"aria-valuemax":520,"aria-valuenow":v.ai,tabIndex:0,title:`Drag to resize AI · Double-click to reset`,onPointerDown:e=>Dn(`ai`,e),onPointerMove:On,onPointerUp:$,onPointerCancel:$,onLostPointerCapture:$,onKeyDown:e=>kn(`ai`,e),onDoubleClick:()=>An(`ai`),children:(0,b.jsx)(`span`,{"aria-hidden":`true`})}),(0,b.jsx)(`div`,{className:`resize-handle resize-handle-preview`,role:`separator`,"aria-label":`Resize live preview`,"aria-orientation":`vertical`,"aria-valuemin":300,"aria-valuemax":680,"aria-valuenow":v.preview,tabIndex:0,title:`Drag to resize Preview · Double-click to reset`,onPointerDown:e=>Dn(`preview`,e),onPointerMove:On,onPointerUp:$,onPointerCancel:$,onLostPointerCapture:$,onKeyDown:e=>kn(`preview`,e),onDoubleClick:()=>An(`preview`),children:(0,b.jsx)(`span`,{"aria-hidden":`true`})}),(0,b.jsx)(`div`,{className:`resize-handle resize-handle-utility`,role:`separator`,"aria-label":`Resize bottom project tools`,"aria-orientation":`horizontal`,"aria-valuemin":120,"aria-valuemax":380,"aria-valuenow":v.utility,tabIndex:0,title:`Drag to resize project tools · Double-click to reset`,onPointerDown:e=>Dn(`utility`,e),onPointerMove:On,onPointerUp:$,onPointerCancel:$,onLostPointerCapture:$,onKeyDown:e=>kn(`utility`,e),onDoubleClick:()=>An(`utility`),children:(0,b.jsx)(`span`,{"aria-hidden":`true`})})]}),(0,b.jsxs)(`nav`,{className:`mobile-workspace-nav`,"aria-label":`Workspace sections`,children:[(0,b.jsxs)(`button`,{className:f===`ai`?`active`:``,onClick:()=>p(`ai`),children:[(0,b.jsx)(x,{name:`spark`,size:18}),(0,b.jsx)(`span`,{children:`AI`})]}),(0,b.jsxs)(`button`,{className:f===`code`?`active`:``,onClick:()=>p(`code`),children:[(0,b.jsx)(x,{name:`terminal`,size:18}),(0,b.jsx)(`span`,{children:`Code`})]}),(0,b.jsxs)(`button`,{className:f===`preview`?`active`:``,onClick:()=>p(`preview`),children:[(0,b.jsx)(x,{name:`layout`,size:18}),(0,b.jsx)(`span`,{children:`Preview`})]}),(0,b.jsxs)(`button`,{className:f===`files`?`active`:``,onClick:()=>{l(`files`),p(`files`)},children:[(0,b.jsx)(x,{name:`files`,size:18}),(0,b.jsx)(`span`,{children:`Files`})]}),(0,b.jsxs)(`button`,{className:f===`tools`?`active`:``,onClick:()=>p(`tools`),children:[(0,b.jsx)(x,{name:`terminal`,size:18}),(0,b.jsx)(`span`,{children:`Tools`})]})]}),(0,b.jsxs)(`footer`,{className:`statusbar`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{children:`⑂ main*`}),(0,b.jsx)(`span`,{children:`↻`}),(0,b.jsx)(`span`,{children:`ⓧ 0`}),(0,b.jsx)(`span`,{children:`△ 0`})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{children:`Spaces: 2`}),(0,b.jsx)(`span`,{children:`UTF-8`}),(0,b.jsxs)(`span`,{children:[`{ }`,` Prettier`]}),(0,b.jsx)(`span`,{children:`⌁ JavaScript`}),(0,b.jsx)(`span`,{children:`◉ Connected`})]})]}),(0,b.jsx)(me,{open:pt,selectedCategory:R,buildPrompt:ht,aiMode:F,cloudConnected:I,cloudConfigured:at,cloudAuthenticated:st,cloudConnecting:lt,cloudModel:dt,aiWorking:N,onClose:()=>L(!1),onSelectCategory:mt,onPromptChange:gt,onAiModeChange:rt,onConnectCloudAi:()=>void Sn(),onDisconnectCloudAi:Cn,onSubmit:En}),yt&&(0,b.jsxs)(`div`,{className:`toast`,children:[(0,b.jsx)(`span`,{children:`✓`}),yt]})]})}export{He as default};