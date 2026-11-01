// Static site generator for jrgruntworks.com. No dependencies.
// Usage: npm run build   (writes HTML, sitemap.xml, robots.txt, llms.txt into /public)

const fs = require('fs');
const path = require('path');
const { business: B, published, modified, updatedLabel, services, cities, home } = require('./site');

const OUT = path.join(__dirname, '..', 'public');

// ---------------------------------------------------------------- helpers

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Escaped text with [label](/path) internal links.
const rich = (s) => esc(s).replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>');

// Plain text for schema (strip link markup).
const plain = (s) => String(s).replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '$1');

const url = (slug) => B.siteUrl + (slug ? '/' + slug : '/');

const jsonld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const cityBySlug = Object.fromEntries(cities.map((c) => [c.slug, c]));

// ---------------------------------------------------------------- schema

const businessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Plumber',
  '@id': B.siteUrl + '/#business',
  name: B.name,
  alternateName: B.shortName,
  url: url(''),
  logo: B.siteUrl + '/assets/icon-512.png',
  image: B.siteUrl + '/assets/og-image.jpg',
  telephone: B.tel,
  email: B.email,
  founder: B.owners.map((n) => ({ '@type': 'Person', name: n })),
  address: { '@type': 'PostalAddress', addressLocality: B.city, addressRegion: B.state, postalCode: B.zip, addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: B.geo.lat, longitude: B.geo.lng },
  areaServed: B.serviceArea.map((c) => ({ '@type': 'City', name: `${c}, MN` })),
  priceRange: '$$',
  ...(B.licenseNumber ? { hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: `Minnesota plumbing license ${B.licenseNumber}` } } : {}),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Plumbing services',
    itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: url(s.slug) } })),
  },
});

const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
});

const articleSchema = (headline, slug) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  url: url(slug),
  datePublished: published,
  dateModified: modified,
  author: { '@type': 'Organization', name: B.name, url: url('') },
  publisher: { '@id': B.siteUrl + '/#business' },
});

const breadcrumbSchema = (name, slug) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: url('') },
    ...(slug ? [{ '@type': 'ListItem', position: 2, name, item: url(slug) }] : []),
  ],
});

const serviceSchema = (name, slug, areas) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  url: url(slug),
  serviceType: name,
  provider: { '@id': B.siteUrl + '/#business' },
  areaServed: areas.map((c) => ({ '@type': 'City', name: `${c}, MN` })),
});

// ---------------------------------------------------------------- partials

const header = () => `
<header class="site-header">
  <a class="brand" href="/" aria-label="${esc(B.shortName)} home">
    <img src="/assets/logo-white.png" alt="" width="52" height="52">
    <span class="brand-name">${esc(B.shortName)}</span>
  </a>
  <nav class="nav" aria-label="Main">
    <a href="/#services">Services</a>
    <a href="/#areas">Areas</a>
    <a href="#quote">Free Estimate</a>
  </nav>
  <a class="btn btn-call header-call" href="tel:${B.tel}">${esc(B.phone)}</a>
</header>`;

const hero = ({ eyebrow, h1, quick, extra }) => `
<section class="hero">
  <div class="hero-inner">
    <div class="hero-copy">
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h1>${esc(h1)}</h1>
      <p class="byline">By ${esc(B.shortName)} · Last updated: ${esc(updatedLabel)}</p>
      <div class="quick-answer">
        <span class="quick-answer-label">Quick answer</span>
        <p>${rich(quick.text)}${extra ? ' ' + rich(extra) : ''}</p>
        <ul>${quick.bullets.map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${rich(v)}</li>`).join('')}</ul>
      </div>
      <div class="hero-ctas">
        <a class="btn btn-call" href="tel:${B.tel}">Call ${esc(B.phone)}</a>
        <a class="btn btn-ghost" href="sms:${B.tel}">Text us a photo</a>
        <a class="btn btn-ghost" href="#quote">Free estimate</a>
      </div>
    </div>
    <div class="hero-badge">
      <img src="/assets/logo-white.png" alt="J &amp; R Grunt Werks logo: crossed adjustable wrench and pipe wrench" width="400" height="400" fetchpriority="high">
      <p class="credentials">Licensed · Bonded · Insured</p>
    </div>
  </div>
</section>`;

const whoSection = (who) => `
<section class="section who">
  <h2>${esc(who.q)}</h2>
  <p>${rich(who.a)}</p>
</section>`;

const serviceCards = (cityName) => `
<section class="section" id="services">
  <h2>${cityName ? `Plumbing services in ${esc(cityName)}` : 'Plumbing services'}</h2>
  <div class="cards">
    ${services.map((s) => `
    <a class="card" href="/${s.slug}">
      <h3>${esc(s.cardName)}</h3>
      <p>${esc(s.cardText)}</p>
      <span class="card-more">${esc(s.name)} →</span>
    </a>`).join('')}
  </div>
</section>`;

const contentSections = (sections) => sections.map((s) => `
<section class="section">
  <h2>${esc(s.h2)}</h2>
  ${(s.p || []).map((p) => `<p>${rich(p)}</p>`).join('\n  ')}
  ${s.list ? `<ul class="checklist">${s.list.map((li) => `<li>${rich(li)}</li>`).join('')}</ul>` : ''}
</section>`).join('');

const whyUs = () => `
<section class="section why">
  <h2>Why homeowners call J &amp; R Grunt Werks</h2>
  <ul class="why-grid">
    <li><strong>Licensed, bonded, insured</strong><span>A Minnesota-licensed plumbing company. Not a handyman guessing at it.</span></li>
    <li><strong>Local owners</strong><span>John Kimble and Ryan Dickelman, based in Carlos. You talk to the people doing the work.</span></li>
    <li><strong>Done in one visit</strong><span>We focus on jobs we can finish in a day, so you are not living with a half-done project.</span></li>
    <li><strong>Price before work</strong><span>Free estimates and a confirmed price before we start. No surprises.</span></li>
  </ul>
</section>`;

const faqSection = (faqs, heading = 'Frequently asked questions') => `
<section class="section faq">
  <h2>${esc(heading)}</h2>
  ${faqs.map((f) => `
  <div class="faq-item">
    <h3>${esc(f.q)}</h3>
    <p>${rich(f.a)}</p>
  </div>`).join('')}
</section>`;

const areasSection = (exclude) => `
<section class="section areas" id="areas">
  <h2>Service area</h2>
  <p>Based in Carlos, MN and serving Douglas County and nearby: ${B.serviceArea.map(esc).join(', ')}, and the surrounding lakes.</p>
  <ul class="pill-list">
    <li><a href="/">Carlos</a></li>
    ${cities.filter((c) => c.slug !== exclude).map((c) => `<li><a href="/${c.slug}">Plumber in ${esc(c.name)}</a></li>`).join('\n    ')}
  </ul>
</section>`;

const serviceOptions = () => [
  ...services.map((s) => [s.slug, s.cardName]),
  ['other', 'Something else'],
].map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('');

const quoteForm = (pageKey, cityName) => `
<section class="section quote" id="quote">
  <h2>Get a free estimate${cityName ? ` in ${esc(cityName)}` : ''}</h2>
  <p>The fastest way to reach us is to call or text <a href="tel:${B.tel}"><strong>${esc(B.phone)}</strong></a>. A photo of the problem helps. Or send the form and we will get back to you.</p>
  <form id="leadForm" class="lead-form" novalidate>
    <input type="hidden" name="page" value="${esc(pageKey)}">
    <div class="hp" aria-hidden="true"><label>Company <input type="text" name="company" tabindex="-1" autocomplete="off"></label></div>
    <div class="field"><label for="name">Name</label><input id="name" name="name" autocomplete="name" required></div>
    <div class="field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel" required></div>
    <div class="field"><label for="email">Email <span class="optional">(optional)</span></label><input id="email" name="email" type="email" autocomplete="email"></div>
    <div class="field"><label for="city">Town</label><input id="city" name="city" autocomplete="address-level2" value="${cityName ? esc(cityName) : ''}" placeholder="e.g. Carlos, Alexandria, Miltona"></div>
    <div class="field field-full"><label for="service">What do you need?</label>
      <select id="service" name="service" required><option value="" disabled selected>Choose one…</option>${serviceOptions()}</select></div>
    <div class="field field-full"><label for="message">Tell us about the job <span class="optional">(optional)</span></label>
      <textarea id="message" name="message" rows="4" placeholder="e.g. 40 gal electric water heater leaking at the bottom, about 12 years old"></textarea></div>
    <button class="btn btn-call" type="submit">Request free estimate</button>
    <p id="formMessage" class="form-message" role="status" aria-live="polite"></p>
  </form>
</section>`;

const nearbySection = (slugs) => `
<section class="section nearby">
  <h2>Also serving nearby</h2>
  <ul class="pill-list">
    ${slugs.map((s) => cityBySlug[s]).map((c) => `<li><a href="/${c.slug}">Plumber in ${esc(c.name)}</a></li>`).join('\n    ')}
    <li><a href="/">Plumber in Carlos</a></li>
  </ul>
</section>`;

const footer = () => `
<footer class="site-footer">
  <img src="/assets/logo-white.png" alt="" width="96" height="96" loading="lazy">
  <p class="footer-name">${esc(B.name)}</p>
  <p>${esc(B.owners.join(' & '))} · ${esc(B.city)}, ${esc(B.state)}</p>
  <p><a href="tel:${B.tel}">${esc(B.phone)}</a> · <a href="mailto:${B.email}">${esc(B.email)}</a></p>
  <p class="credentials">Licensed · Bonded · Insured${B.licenseNumber ? ` · MN License ${esc(B.licenseNumber)}` : ''}</p>
  <p class="footer-links">${services.map((s) => `<a href="/${s.slug}">${esc(s.cardName)}</a>`).join(' · ')}</p>
  <p class="footer-links">${cities.map((c) => `<a href="/${c.slug}">${esc(c.name)}</a>`).join(' · ')}</p>
  <p class="small">&copy; <span id="year">2026</span> ${esc(B.name)}</p>
</footer>
<div class="mobile-bar">
  <a href="tel:${B.tel}">Call</a>
  <a href="sms:${B.tel}">Text</a>
  <a href="#quote">Estimate</a>
</div>`;

const layout = ({ slug, title, description, schemas, body }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<link rel="canonical" href="${url(slug)}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<meta name="theme-color" content="#1f2a1f">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(B.shortName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url(slug)}">
<meta property="og:image" content="${B.siteUrl}/assets/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Bebas+Neue&family=Montserrat:wght@600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
${schemas.map(jsonld).join('\n')}
</head>
<body>
${header()}
<main>
${body}
</main>
${footer()}
<script src="/script.js" defer></script>
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
`;

// ---------------------------------------------------------------- pages

const pages = [];

// Home (Carlos)
{
  const faqs = [{ q: home.who.q, a: home.who.a }, ...home.faqs];
  pages.push({
    slug: '',
    html: layout({
      slug: '',
      title: home.title,
      description: home.description,
      schemas: [businessSchema(), faqSchema(faqs), articleSchema(home.h1, ''), breadcrumbSchema()],
      body: [
        hero({ eyebrow: 'Plumbing · Carlos, MN', h1: home.h1, quick: home.quick }),
        whoSection(home.who),
        serviceCards(),
        whyUs(),
        areasSection(),
        faqSection(faqs),
        quoteForm('home'),
      ].join('\n'),
    }),
  });
}

// Service pages
for (const s of services) {
  const faqs = [{ q: s.who.q, a: s.who.a }, ...s.faqs];
  pages.push({
    slug: s.slug,
    html: layout({
      slug: s.slug,
      title: s.title,
      description: s.description,
      schemas: [businessSchema(), serviceSchema(s.name, s.slug, B.serviceArea), faqSchema(faqs), articleSchema(s.h1, s.slug), breadcrumbSchema(s.name, s.slug)],
      body: [
        hero({ eyebrow: s.name, h1: s.h1, quick: s.quick }),
        whoSection(s.who),
        contentSections(s.sections),
        whyUs(),
        faqSection(faqs),
        quoteForm(s.slug),
        areasSection(),
      ].join('\n'),
    }),
  });
}

// City pages
for (const c of cities) {
  const who = {
    q: `Who is a licensed plumber in ${c.name}, MN?`,
    a: `J & R Grunt Werks, a licensed, bonded, and insured plumbing company based in Carlos, MN, serves ${c.name} (${c.areaNote}). Owners John Kimble and Ryan Dickelman handle water heater repair and replacement, leak repair, faucet and toilet installation, and small remodel plumbing, and most jobs are done in one visit.`,
  };
  const faqs = [
    who,
    { q: `How much does a plumber cost in ${c.name}, MN?`, a: `It depends on the job. J & R Grunt Werks gives free estimates in ${c.name} and confirms the price before any work starts. Call or text 320-815-0900 with a description or photo of the problem.` },
    { q: `What plumbing services do you offer in ${c.name}?`, a: `In ${c.name}, J & R Grunt Werks repairs and replaces electric water heaters, fixes leaks and frozen pipes, installs faucets, toilets, sinks, and garbage disposals, and handles small bathroom and kitchen remodel plumbing.` },
    ...c.extraFaqs,
    { q: `Can you finish my job in one visit?`, a: `Most water heater replacements, leak repairs, and fixture installs that J & R Grunt Werks does in ${c.name} are finished in a single visit.` },
  ];
  const title = `Plumber in ${c.name}, MN | Water Heaters, Leaks & Fixtures | J & R Grunt Werks`;
  const h1 = `Licensed Plumber in ${c.name}, MN`;
  pages.push({
    slug: c.slug,
    html: layout({
      slug: c.slug,
      title,
      description: c.description,
      schemas: [businessSchema(), serviceSchema(`Plumbing services in ${c.name}, MN`, c.slug, [c.name]), faqSchema(faqs), articleSchema(h1, c.slug), breadcrumbSchema(`Plumber in ${c.name}, MN`, c.slug)],
      body: [
        hero({
          eyebrow: `Plumbing · ${c.name}, MN`,
          h1,
          quick: {
            text: `J & R Grunt Werks is a licensed, bonded, and insured plumber serving ${c.name}, MN, with water heater repair and replacement, leak repair, fixture installation, and small remodel plumbing. Most jobs are done in one visit.`,
            bullets: [
              ['Service area', c.areaNote],
              ['Services', 'Water heaters, leaks, fixtures, small remodels'],
              ['Credentials', 'Licensed, bonded, and insured in Minnesota'],
              ['Pricing', 'Free estimate, price confirmed before work starts'],
            ],
          },
          extra: c.quickExtra,
        }),
        whoSection(who),
        contentSections([c.local]),
        serviceCards(c.name),
        whyUs(),
        faqSection(faqs, `${c.name} plumbing FAQ`),
        quoteForm(c.slug, c.name),
        nearbySection(c.nearby),
      ].join('\n'),
    }),
  });
}

// ---------------------------------------------------------------- write

for (const p of pages) {
  const file = p.slug ? path.join(OUT, p.slug, 'index.html') : path.join(OUT, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, p.html);
}

fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${url(p.slug)}</loc><lastmod>${modified}</lastmod><priority>${p.slug ? '0.8' : '1.0'}</priority></url>`).join('\n')}
</urlset>
`);

fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${B.siteUrl}/sitemap.xml
`);

// llms.txt: plain-language summary for AI assistants and answer engines.
fs.writeFileSync(path.join(OUT, 'llms.txt'), `# ${B.name}

> ${plain(home.quick.text)}

- Phone (call or text): ${B.phone}
- Email: ${B.email}
- Owners: ${B.owners.join(', ')}
- Based in: ${B.city}, ${B.state} ${B.zip}
- Licensed, bonded, and insured in Minnesota
- Service area: ${B.serviceArea.join(', ')}, and the surrounding lakes area (Douglas County, MN and nearby)

## Services

${services.map((s) => `- [${s.name}](${url(s.slug)}): ${s.cardText}`).join('\n')}

## Towns served

- [Carlos, MN](${url('')})
${cities.map((c) => `- [${c.name}, MN](${url(c.slug)})`).join('\n')}
`);

console.log(`Built ${pages.length} pages into ${path.relative(process.cwd(), OUT) || OUT}`);
