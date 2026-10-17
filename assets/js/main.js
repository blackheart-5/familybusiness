const CONTACT = {
  phones: ["+233 (0) 55 015 6745", "+233 (0) 26 649 2105"],
  email: "info@erdichfoods.com",
  web: "www.erdichfoodsghana.com",
  address: "Amarhia, off Adenta Dodowa Road, P.O. Box 309, Kanda, Ghana",
};

const telHref = (p) => "tel:" + p.replace(/\(0\)|[^\d+]/g, "");

const ICONS = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>',
};

/* Header & footer (shared by every page) */
function renderChrome() {
  const page = document.body.dataset.page;
  const links = [
    ["index.html", "Home", "home"],
    ["products.html", "Products", "products"],
    ["dcleo-yogurt.html", "D-cleo Yogurt", "yogurt"],
    ["index.html#about", "About", "about"],
  ];
  const header = document.querySelector("[data-header]");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <nav class="nav container" aria-label="Main">
        <a class="logo" href="index.html"><img src="assets/img/erdich-logo.png" alt="Erdich Foods" width="289" height="76"></a>
        <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">${ICONS.menu}</button>
        <ul class="nav-links">
          ${links.map(([href, label, key]) => `<li><a href="${href}"${key === page ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}
          <li><a class="btn btn-primary" href="index.html#contact">Contact us</a></li>
        </ul>
      </nav>`;
    const toggle = header.querySelector(".nav-toggle");
    const menu = header.querySelector(".nav-links");
    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.innerHTML = open ? ICONS.close : ICONS.menu;
    };
    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const footer = document.querySelector("[data-footer]");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <span class="footer-logo"><img src="assets/img/erdich-logo.png" alt="Erdich Foods"></span>
            <p>Wholesome, delicious food and antioxidant drinks for families, individuals, schools, institutions and events — proudly made in Ghana.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>${links.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}<li><a href="index.html#contact">Contact</a></li></ul>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              <li><a href="dcleo-yogurt.html">D-cleo Yogurt</a></li>
              <li><a href="dcleo-yogurt.html?line=wheat">With Wheat Berries</a></li>
              <li><a href="products.html">All products</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              ${CONTACT.phones.map((p) => `<li><a href="${telHref(p)}">${p}</a></li>`).join("")}
              <li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
              <li>${CONTACT.address}</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Erdich Foods. All rights reserved.</span>
          <span><span class="ghana-flag" aria-hidden="true"><i style="background:#CE1126"></i><i style="background:#FCD116"></i><i style="background:#006B3F"></i></span>Proudly made in Ghana</span>
        </div>
      </div>`;
  }
}

/* Product cards */
function productCard(p) {
  if (p.placeholder) {
    return `
      <article class="product-card placeholder" data-cat="${p.category}">
        <div class="media">${ICONS.sun}</div>
        <div class="body">
          <span class="cat">${p.category}</span>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <span class="more">Stay tuned</span>
        </div>
      </article>`;
  }
  return `
    <a class="product-card" href="${p.href}" data-cat="${p.category}">
      <div class="media" style="--card-bg:${p.bg}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="body">
        <span class="cat">${p.category}</span>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        ${p.swatches ? `<div class="swatches" aria-label="${p.swatches.length} flavours">${p.swatches.map((c) => `<i style="background:${c}"></i>`).join("")}</div>` : ""}
        <span class="more">View product →</span>
      </div>
    </a>`;
}

function renderProducts() {
  document.querySelectorAll("[data-products]").forEach((grid) => {
    const limit = Number(grid.dataset.limit) || PRODUCTS.length;
    grid.innerHTML = PRODUCTS.slice(0, limit).map(productCard).join("");
  });

  const filters = document.querySelector("[data-filters]");
  if (!filters) return;
  const cats = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  filters.innerHTML = cats.map((c, i) => `<button class="filter${i === 0 ? " active" : ""}" data-cat="${c}">${c}</button>`).join("");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    filters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    document.querySelectorAll("[data-products] .product-card").forEach((card) => {
      card.hidden = btn.dataset.cat !== "All" && card.dataset.cat !== btn.dataset.cat;
    });
  });
}

/* Flavour showcase (home + yogurt page) */
function initShowcase() {
  const root = document.querySelector("[data-showcase]");
  if (!root) return;
  const img = root.querySelector("[data-showcase-img]");
  const title = root.querySelector("[data-flavor-name]");
  const note = root.querySelector("[data-flavor-note]");
  const tabs = root.querySelector("[data-flavor-tabs]");
  const lineBtns = root.querySelectorAll("[data-line]");

  const params = new URLSearchParams(location.search);
  const state = {
    flavor: YOGURT_FLAVORS.some((f) => f.id === params.get("flavor")) ? params.get("flavor") : YOGURT_FLAVORS[0].id,
    line: params.get("line") === "wheat" ? "wheat" : "classic",
  };

  tabs.innerHTML = YOGURT_FLAVORS.map((f) =>
    `<button class="flavor-tab" data-flavor="${f.id}" aria-pressed="false"><i style="background:${f.color}"></i>${f.name}</button>`
  ).join("");

  // Preload so switching is instant
  YOGURT_FLAVORS.forEach((f) => ["", "-wheat"].forEach((s) => { new Image().src = `assets/img/yogurt-${f.id}${s}.jpg`; }));

  function update(animate) {
    const f = YOGURT_FLAVORS.find((x) => x.id === state.flavor);
    const src = `assets/img/yogurt-${f.id}${state.line === "wheat" ? "-wheat" : ""}.jpg`;
    const label = state.line === "wheat" ? `${f.name} with Wheat Berries` : f.name;
    root.style.setProperty("--flavor", f.color);
    if (title) title.textContent = label;
    if (note) note.textContent = state.line === "wheat" ? `${f.note} Blended with wheat berries for a satisfying light meal.` : f.note;
    tabs.querySelectorAll(".flavor-tab").forEach((t) => t.setAttribute("aria-pressed", t.dataset.flavor === f.id));
    lineBtns.forEach((b) => b.setAttribute("aria-pressed", b.dataset.line === state.line));
    const swap = () => { img.src = src; img.alt = `D-cleo Yogurt — ${label}`; img.classList.remove("fading"); };
    if (animate) { img.classList.add("fading"); setTimeout(swap, 200); } else swap();
  }

  tabs.addEventListener("click", (e) => {
    const t = e.target.closest(".flavor-tab");
    if (t) { state.flavor = t.dataset.flavor; update(true); }
  });
  lineBtns.forEach((b) => b.addEventListener("click", () => { state.line = b.dataset.line; update(true); }));
  update(false);
}

/* Flavour cards grid (yogurt page) */
function renderFlavorGrid() {
  const grid = document.querySelector("[data-flavor-grid]");
  if (!grid) return;
  grid.innerHTML = YOGURT_FLAVORS.map((f) => `
    <a class="product-card" href="?flavor=${f.id}#showcase">
      <div class="media" style="--card-bg:${f.color}"><img src="assets/img/yogurt-${f.id}.jpg" alt="D-cleo ${f.name} Yogurt" loading="lazy"></div>
      <div class="body"><span class="cat">330ml · Probiotic</span><h3>${f.name}</h3><p>${f.note}</p></div>
    </a>`).join("");
  grid.addEventListener("click", (e) => {
    const card = e.target.closest("a");
    if (!card) return;
    e.preventDefault();
    const id = new URL(card.href).searchParams.get("flavor");
    document.querySelector(`[data-flavor="${id}"]`)?.click();
    document.getElementById("showcase").scrollIntoView({ behavior: "smooth" });
  });
}

/* Contact form → opens the visitor's email app, pre-filled */
function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = `${d.get("topic")} — ${d.get("name")}`;
    const body = `${d.get("message")}\n\n${d.get("name")}\n${d.get("phone") || ""}\n${d.get("email")}`;
    location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

renderChrome();
renderProducts();
initShowcase();
renderFlavorGrid();
initContactForm();
initReveal();
