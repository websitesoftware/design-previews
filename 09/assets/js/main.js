(() => {
  const $ = (s) => document.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const mobile = () => innerWidth < 900;

  // ---------- logo fold (letters) ----------
  $('#wmLetters').innerHTML = [...'WebsiteSoft'].map((c, i) => { const key = i === 0 || i === 7; const d = key ? 0 : i < 7 ? (7 - i) * 32 : (i - 7) * 45; return `<span class="c ${key ? 'k' : 'q'}${i >= 7 ? ' s' : ''}" style="--d:${d}ms">${c}</span>`; }).join('');
  const brand = $('#brand');
  const shortQ = matchMedia('(min-width:900px)');
  const fitCh4 = () => { const c = document.getElementById('ch4'); if (!c) return; Object.assign(c.dataset, shortQ.matches ? { shift: '.23', y: innerHeight < 760 ? '.95' : '1.05', scale: innerHeight < 760 ? '.82' : '.66' } : { shift: '0', y: '.55', scale: '.78' }); };
  fitCh4(); shortQ.addEventListener('change', fitCh4); addEventListener('resize', fitCh4);

  // ---------- services ----------
  const services = [
    ['Legacy Sitecore versions, XM Cloud', 'Support, upgrades and migrations for legacy Sitecore versions, plus structured, scalable builds on XM Cloud.', ['Sitecore XP / XM', 'XM Cloud', '.NET', 'Headless'], ['Legacy Sitecore support and upgrades', 'Sitecore XP / XM to XM Cloud', 'Templates and standard values', 'Reusable components', 'Multisite and multilingual', 'XM Cloud and headless']],
    ['Umbraco CMS', 'Umbraco builds, upgrades and support on .NET.', ['Umbraco', '.NET', 'Razor', 'Block Grid'], ['New Umbraco builds', 'Version upgrades', 'Document types and compositions', 'Ongoing support']],
    ['CMS workflows & permissions', 'Roles, approvals and publishing that keep content safe and fast.', ['Sitecore workflows', 'Umbraco user groups', '.NET', 'Teams'], ['Draft, review, approve, publish', 'Roles, not individuals', 'Audit trails', 'Approval alerts to email or Teams']],
    ['Content architecture', 'Content structured for growth, so editors don\'t need developers.', ['Templates', 'Document types', 'Headless', 'Multisite'], ['Content models', 'Reusable components', 'A clear content tree', 'Editor training']],
    ['CMS migration', 'Planned migrations that keep content, integrations and search rankings.', ['Sitecore', 'Umbraco', 'Redirects', 'SEO'], ['Content mapping', 'Front end rebuilt for the new platform', 'Redirects and SEO', 'Post-launch checks']],
    ['Headless CMS', 'One content source for websites, apps and other channels.', ['XM Cloud', 'Umbraco Delivery API', 'Next.js', 'GraphQL'], ['Content APIs', 'Next.js front ends', 'Omnichannel delivery', 'Preview for editors']],
    ['.NET & .NET Core apps', 'Secure, scalable custom applications in C#.', ['.NET', '.NET Core', 'C#', 'SQL Server'], ['Web applications', 'APIs and back ends', 'Code reviewed before it ships', 'Built to own for years']],
    ['API & systems integration', 'Your website, CRM, ERP and tools sharing data automatically.', ['REST', 'CRM', 'ERP', 'Webhooks'], ['Website forms to CRM', 'Product and pricing sync', 'Retries and monitoring', 'Secure access control']],
    ['AI integration', 'AI added to your existing CMS and systems, without a rebuild.', ['Azure OpenAI', '.NET', 'RAG', 'AI search'], ['Semantic search', 'Chatbots on approved content', 'Drafting and smart tagging', 'Human review built in']],
    ['AI QA tool', 'Automated website testing that turns hundreds of results into one prioritised report.', ['Playwright', 'AI', 'Screenshots', 'Reports'], ['Functional and form tests', 'Broken links and console errors', 'Accessibility, performance and SEO', 'AI-grouped findings with evidence']],
    ['Web applications', 'Portals, dashboards and tools built around how you work.', ['React', 'Next.js', 'ASP.NET Core', 'TypeScript'], ['Customer portals', 'Internal dashboards', 'Responsive on every screen', 'Accessible UI']],
    ['Custom web software, built for your business', 'Custom websites and web software, designed and built around how your business works: fast, responsive and easy to find.', ['Custom software', 'UI/UX', '.NET', 'SEO'], ['Custom web software', 'UI/UX design', 'Responsive build', 'SEO, speed and security']],
    ['Legacy modernisation', 'Keep what works, upgrade what doesn\'t, without starting from scratch.', ['.NET Framework', 'Modern .NET', 'Azure', 'CMS upgrades'], ['System audits', 'Step-by-step upgrades', 'Framework to modern .NET', 'CMS restructuring']],
    ['Performance & accessibility', 'Sites that stay fast, reliable and usable by everyone.', ['Core Web Vitals', 'WCAG', 'Lighthouse', 'Monitoring'], ['Speed improvements', 'WCAG checks', 'Monitoring', 'Regular audits']],
    ['Support & maintenance', 'Building is only the beginning. We keep it healthy.', ['Support', 'Security', 'QA', 'Hosting'], ['Updates and patches', 'Content and feature changes', 'Security reviews', 'Quality checks every release']],
  ];
  const IMGS = {'team-desks': 'assets/img/team-desks.jpg', 'pair-coding': 'assets/img/pair-coding.jpg', 'whiteboard-pair': 'assets/img/whiteboard-pair.jpg', 'meeting-table': 'assets/img/meeting-table.jpg', 'coding-plant': 'assets/img/coding-plant.jpg', 'team-whiteboard': 'assets/img/team-whiteboard.jpg', 'sunlit-meeting': 'assets/img/sunlit-meeting.jpg', 'laptops-table': 'assets/img/laptops-table.jpg', 'office-desk': 'assets/img/office-desk.jpg', 'kanban': 'assets/img/kanban.jpg', 'code-screen': 'assets/img/code-screen.jpg', 'whiteboard-team': 'assets/img/whiteboard-team.jpg'};
  document.querySelectorAll('img[data-img]').forEach((im) => { im.src = IMGS[im.dataset.img]; });
  let sub = false, svcHover = -1, svcFront = 0;
  const slug = (n) => n.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const pad2 = (i) => String(i + 1).padStart(2, '0');
  const WHY = [
    'Most Sitecore sites get hard to manage because the content was never structured for growth. We plan the structure first, then build.',
    'Umbraco is flexible and sits on .NET, so it extends cleanly into integrations, workflows and AI when you need them.',
    'Without clear roles and approvals, mistakes go live and editors wait on developers for simple changes. A workflow built into the CMS fixes both.',
    'When content and design are built as one unit, changing a sentence means changing the build. Good structure lets editors work without a ticket.',
    'A migration is a project, not a file transfer. Content is mapped, front ends are rebuilt and search rankings are protected.',
    'One content source can feed your website, apps and other channels through APIs, without copying content around.',
    'Custom applications give you exactly what your business needs, written in code we understand and can support for years.',
    'Without an API, teams retype the same change into several systems. Connected systems share the same live data, securely.',
    'Your CMS keeps managing content. A secure .NET layer connects it to AI services for search, assistance and recommendations.',
    'Most QA time goes on repeating checks and reading results. This tool runs the checks and turns raw results into a short, ordered list.',
    'Portals, dashboards and internal tools that fit how your team works, rather than forcing your team to fit a package.',
    'A website should look good on launch day and stay fast, secure, findable and easy to manage as the business grows.',
    'You rarely need to start again. We audit what you have, keep what works and upgrade the rest step by step.',
    'Fast, accessible sites keep visitors and reach everyone. We check, fix and keep monitoring.',
    'Building the site is only the beginning. Updates, security reviews and quality checks keep it healthy.'
  ];
  const FITS = { 0: ['#/cms', 'Websites & CMS'], 1: ['#/cms', 'Websites & CMS'], 2: ['#/cms', 'Websites & CMS'], 3: ['#/cms', 'Websites & CMS'], 4: ['#/cms', 'Websites & CMS'], 5: ['#/cms', 'Websites & CMS'], 7: ['#/integrations', 'Integrations'], 8: ['#/ai', 'AI integration'], 9: ['#/ai-qa', 'AI QA tool'] };
  const PIMG = ['team-whiteboard', 'coding-plant', 'meeting-table', 'whiteboard-pair', 'kanban', 'code-screen', 'pair-coding', 'laptops-table', 'sunlit-meeting', 'code-screen', 'team-desks', 'office-desk', 'whiteboard-team', 'laptops-table', 'team-desks'];
  const VAR = ['nat', '', 'warm', 'nat arch'];
  const PILLARS = [
    { k: 'Websites & CMS', d: 'Sitecore, XM Cloud and Umbraco builds, designed so your own team can run them.', s: [0, 1, 11, 5] },
    { k: 'Content & governance', d: 'How content is structured, approved and moved between platforms.', s: [3, 2, 4] },
    { k: 'Software & integration', d: 'Custom .NET software, and the connections between your systems.', s: [6, 10, 7, 12] },
    { k: 'AI', d: 'AI added around your existing platforms, with people still in charge.', s: [8, 9] },
    { k: 'Quality & care', d: 'Keeping what we build fast, accessible and healthy after launch.', s: [13, 14] }
  ];
  const pillars = $('#pillars');
  const pRow = (i) => `<a class="prow" href="#/services/${slug(services[i][0])}"><b>${services[i][0]}</b><span>${services[i][1]}</span><i>→</i></a>`;
  pillars.innerHTML = `<div class="ptabs" role="tablist">${PILLARS.map((p, i) => `<button type="button" class="pt" role="tab" data-i="${i}">${p.k}</button>`).join('')}</div><div class="ppanel" id="ppanel" aria-live="polite"></div>`;
  const ptabs = [...pillars.querySelectorAll('.pt')];
  function showPillar(i) { const p = PILLARS[i]; ptabs.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i); }); $('#ppanel').innerHTML = `<p class="pd">${p.d}</p>${p.s.map(pRow).join('')}`; }
  ptabs.forEach((b) => b.addEventListener('click', () => showPillar(+b.dataset.i)));
  showPillar(0);

  // ---------- pages (hash routes) ----------
  const A = (h, t, c = 'sec') => `<a class="btn ${c}" href="${h}">${t}</a>`;
  const fig = (n, v, cap) => `<figure class="ph ${v}"><span class="hud"></span><img src="${IMGS[n]}" alt="${cap}"><figcaption>${cap}</figcaption></figure>`;
  const crumb = (...x) => `<nav class="crumb" aria-label="Breadcrumb"><a href="#/">Home</a>${x.map(([h, t]) => h ? `<span>/</span><a href="${h}">${t}</a>` : `<span>/</span><span>${t}</span>`).join('')}</nav>`;
  const hero = (cr, k, h1, lede, acts, f) => `<div class="pg-hero${f ? '' : ' solo'}"><div>${cr}<h1 style="margin-top:26px">${h1}</h1><p class="lede">${lede}</p><div class="acts">${acts}</div></div>${f || ''}</div>`;
  const sec = (k, h, lede, body) => `<section class="ps"><span class="kicker"><i></i>${k}</span><h2>${h}</h2>${lede ? `<p class="lede">${lede}</p>` : ''}${body}</section>`;
  const cards = (arr, cols = 3, num = true) => `<div class="g${cols}">${arr.map(([t, p, href], i) => `<${href ? `a href="${href}"` : 'div'} class="card"><h3>${t}</h3><p>${p}</p>${href ? '<span class="go">Read more →</span>' : ''}</${href ? 'a' : 'div'}>`).join('')}</div>`;
  const tabs = (items) => `<div class="tabs" data-tabs><div class="tbar" role="tablist">${items.map(([k], i) => `<button type="button" class="tb${i ? '' : ' on'}" role="tab" data-t="${i}">${k}</button>`).join('')}</div>${items.map(([, b], i) => `<div class="tp"${i ? ' hidden' : ''}>${b}</div>`).join('')}</div>`;
  const flow = (arr) => `<div class="flow">${arr.map((x, i) => `${i ? '<i>→</i>' : ''}<span>${x}</span>`).join('')}</div>`;
  const ul = (arr, bad) => `<ul class="ul2${bad ? ' bad' : ''}">${arr.map((x) => `<li>${x}</li>`).join('')}</ul>`;
  const chips = (arr) => `<div class="chips">${arr.map((x) => `<span>${x}</span>`).join('')}</div>`;
  const cta = (h = 'Tell us what you want to improve.', p = 'Tell us what you use today and we will suggest a practical way forward.') => `<section class="cta-band"><h2>${h}</h2><p>${p}</p><div class="acts">${A('#/contact', 'Start a conversation →', 'pri')}${A('#/services', 'See all services')}</div></section>`;

  const P = {};
  P.services = () => ({ t: 'Services', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'Services']), 'Services', 'Everything we build, <span class="grad">under one roof.</span>', 'CMS platforms, custom .NET software, integrations and AI, planned together so they work as one. Open any service for its own page.', A('#/contact', 'Tell us your project →', 'pri') + A('#/solutions', 'See solutions'), fig('team-whiteboard', 'nat', 'Planning together'))}
    ${PILLARS.map((p, pi) => sec('Services', p.k, p.d, `<div class="g2">${p.s.map((i) => `<a class="card" href="#/services/${slug(services[i][0])}"><h3 style="margin-top:0">${services[i][0]}</h3><p>${services[i][1]}</p><span class="go">Open service →</span></a>`).join('')}</div>`)).join('')}
    ${cta()}</div></div>` });

  P.service = (s) => { const i = services.findIndex((x) => slug(x[0]) === s); if (i < 0) return null; const [n, d, st, dl] = services[i]; const pl = PILLARS.find((p) => p.s.includes(i)); const rel = pl.s.filter((x) => x !== i).slice(0, 3); const fit = FITS[i];
    return { t: n, h: `<div class="pg"><div class="wrap">${hero(crumb(['#/services', 'Services'], [0, n]), pl.k, n, d, A('#/contact', 'Talk to us about this →', 'pri') + (fit ? A(fit[0], `More on ${fit[1]}`) : A('#/services', 'All services')), fig(PIMG[i], VAR[i % 4], n))}
    ${sec('What we do', 'What this includes', '', `<div class="g4">${dl.map((x, k) => `<div class="card"><h3>${x}</h3></div>`).join('')}</div>`)}
    ${sec('Why it matters', 'Why businesses ask for this', '', `<div class="call">${WHY[i]}</div>`)}
    ${sec('Typical stack', 'Technology we use', '', chips(st))}
    ${sec('Related', 'Related services', '', cards(rel.map((x) => [services[x][0], services[x][1], `#/services/${slug(services[x][0])}`]), 3, false))}
    ${cta()}</div></div>` }; };

  P.cms = () => ({ t: 'Websites & CMS', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'Websites & CMS']), 'Websites & CMS', 'A CMS your team <span class="grad">can actually use.</span>', '"Can you just change the text on that page?" should not take a week. We structure Sitecore, XM Cloud and Umbraco so content sits apart from layout, and editors publish without raising a ticket.', A('#/contact', 'Plan your CMS project →', 'pri') + A('#/services/sitecore-and-xm-cloud', 'Sitecore & XM Cloud'), fig('whiteboard-pair', 'nat arch', 'Structuring content'))}
    ${tabs([
      ['Structure', `<h3 class="th">Scalable starts with structure, not pages</h3><p class="lede">Sites get hard to manage when content was never structured for growth. We plan four layers first.</p>${cards([['Templates', 'The blueprint: fields defined once, with base templates and standard values.'], ['Content items', 'Every item comes from a template, so editors work one way, with no copy and paste.'], ['Reusable components', 'Build once, use everywhere. One update shows on every page that uses it.'], ['Content tree', 'A clear hierarchy by site, section and language, ready for multisite growth.']], 4)}<p class="lede" style="margin-top:18px"><b>Quick check:</b> can your editors add a new page without asking a developer? If not, the structure needs attention.</p>`],
      ['Workflow', `<h3 class="th">Who can publish, and who signs off?</h3>${flow(['Draft: authors create, cannot publish', 'Review: editors check tone and brand', 'Approve: legal or marketing signs off', 'Publish: authorised publishers only'])}${cards([['Roles, not individuals', 'Access through CMS roles keeps setup simple as the team grows.'], ['Workflow matches risk', 'A blog post and a pricing page need different approval steps.'], ['Visible ownership', 'Every section of the content tree has an owner and an audit trail.']], 3, false)}<p class="lede" style="margin-top:18px">Built in Sitecore, XM Cloud and Umbraco user groups, with optional email or Teams notifications and links to your CRM or asset library.</p>`],
      ['Who changes what', `<h3 class="th">One website, different teams</h3><p class="lede">Marketing, HR, product, support and legal all need to update the site. Without a clear workflow, one shared CMS becomes a bottleneck or a risk.</p><div class="two"><div><h3>Problems we are asked to fix</h3>${ul(['Everyone has full admin access', 'Important pages go live without review', 'Simple updates wait days for approval', 'Teams rely on developers for basic changes', 'No one knows who changed what, or when', 'Former staff or agencies still have access'], 1)}</div><div><h3>What you get instead</h3>${ul(['The right access for every team, and nothing more', 'Approvals that protect key content without slowing routine work', 'Multiple sites, brands or regions in one CMS', 'Headless delivery when content must reach several channels'])}</div></div>`],
      ['Migration', `<h3 class="th">CMS migration is not copying pages</h3>${cards([['"It is just copying pages"', 'Content must be mapped and restructured for the new platform.'], ['"The design stays, so it is quick"', 'Templates are CMS-specific, so the front end is usually rebuilt.'], ['"A new CMS fixes our problems"', 'Only if you know what to fix. Otherwise the problems move with the content.']], 3, false)}<div class="acts" style="margin-top:20px">${A('#/services/cms-migration', 'How we run a migration →')}</div>`],
      ['CMS or custom?', `<h3 class="th">Where does a CMS end and custom development begin?</h3><p class="lede">A CMS manages content well. Stretch it further and you get stacked plugins, workarounds one developer understands and a site that gets harder to change.</p><div class="call">Let the CMS do what it is good at, and build the specific parts of your business properly alongside it.<small>We plan both sides together, so they work as one.</small></div>`]
    ])}
    ${cta()}</div></div>` });

P.ai = () => ({ t: 'AI integration', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'AI integration']), 'AI integration', 'AI around your CMS, <span class="grad">not instead of it.</span>', 'Your Umbraco or Sitecore site does not need replacing to benefit from AI. A secure .NET layer connects it to AI services, so content, search and editing get smarter without a rebuild.', A('#/contact', 'Is my site ready for AI? →', 'pri') + A('#/services/ai-integration', 'AI integration service'), fig('code-screen', 'warm', 'Secure .NET layer'))}
    ${tabs([
      ['How it works', `<h3 class="th">Four steps, no rebuild</h3>${flow(['Your CMS manages content', 'A .NET backend calls an AI service through an API', 'The AI returns a response', 'Your site uses it for a smarter experience'])}<div class="call">An AI-assisted content lifecycle<small>Create, optimise, tag, personalise, publish, analyse, improve. The CMS is the platform; AI is the intelligence layer around it.</small></div>`],
      ['Where AI helps', `<h3 class="th">Eight practical uses</h3>${cards([['Content creation', 'First drafts for pages, blogs, product text and FAQs.'], ['Optimisation', 'SEO, readability, meta data, headings and accessibility suggestions.'], ['Smart tagging', 'Topics, categories and metadata assigned automatically.'], ['Personalisation', 'Content matched to interests, location and engagement.'], ['Multilingual', 'Translate and adapt content while keeping brand tone.'], ['Semantic search', 'Understands intent: "homes for a growing family" finds matching listings.'], ['Recommendations', 'Related articles, products or pages for what a visitor is viewing.'], ['Governance', 'Spot outdated, duplicate or inconsistent content.']], 4)}`],
      ['Done responsibly', `<h3 class="th">What to consider first</h3>${cards([['Keep your CMS', 'Add AI without replacing the site.'], ['Integrate securely', 'APIs and backend services manage all AI traffic.'], ['Protect your data', 'Access controls, and no unnecessary sensitive data sent to AI.'], ['Human oversight', 'Review AI output before it informs important decisions.'], ['Plan for scale', 'API costs, response times, error handling.']], 3, false)}`]
    ])}
    ${cta('Is your website ready for AI?', 'Tell us what you want to improve and we will explore a practical way to add AI to your existing platform.')}</div></div>` });

P.integrations = () => ({ t: 'Integrations & .NET', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'Integrations & .NET']), 'Integrations & .NET', 'Your systems should <span class="grad">talk to each other.</span>', 'Behind every website sits a CRM, ERP, stock and marketing tools. Update once in your CMS and every system follows, so £49.00 never becomes £4.90.', A('#/contact', 'Connect your systems →', 'pri') + A('#/services/api-and-systems-integration', 'API integration service'), fig('laptops-table', 'nat', 'Connected systems'))}
    ${tabs([
      ['How it works', `<h3 class="th">From a website form to your CRM</h3>${flow(['Customer submits a form', 'Secure API reaches a .NET back end', 'It validates and connects to your CRM or system', 'Records and workflows update automatically'])}<h3 style="margin-top:30px">Update once, everywhere</h3>${flow(['Change it once in the CMS', 'The API sends it in seconds', 'CRM, stock, accounts and email follow'])}`],
      ['Why it matters', `<h3 class="th">What integration changes</h3>${cards([['Less manual work', 'No retyping, fewer errors.'], ['Enquiries reach sales', 'Leads go straight into the CRM.'], ['Data stays in sync', 'Products, pricing and availability connected.'], ['Marketing workflows', 'Enquiry and consent data shared appropriately.'], ['Consistent records', 'Website, customers and systems agree.'], ['Scale without rebuilding', 'Add tools as you grow.']], 3)}`],
      ['Done properly', `<h3 class="th">What we plan for</h3>${cards([['API security', 'Authentication, authorisation, access control.'], ['Data validation', 'Checked before it reaches another system.'], ['Error handling', 'Failures detected, retried, monitored.'], ['Data ownership', 'One system owns each type of data.'], ['Performance', 'Background processing keeps the site fast.']], 3, false)}${chips(['.NET', '.NET Core', 'C#', 'REST APIs', 'CRM', 'ERP', 'Headless', 'SQL Server', 'Azure'])}`]
    ])}
    ${cta('Still copying data between systems?', 'Tell us what you use today and we will suggest a practical way to connect it.')}</div></div>` });

P['ai-qa'] = () => ({ t: 'AI QA tool', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'AI QA tool']), 'AI QA tool', 'From one URL to <span class="grad">a prioritised QA report.</span>', 'A site can look perfect and still have broken links, console errors or accessibility issues. Our AI QA tool crawls a site, runs the checks, collects evidence and turns hundreds of raw results into a short list ordered by impact.', A('#/contact', 'Ask about early access →', 'pri') + '<span class="badge o" style="align-self:center">In development</span>', fig('code-screen', 'nat', 'Checks, then evidence'))}
    ${sec('The process', 'Eight connected steps', 'Most QA time is spent repeating and reading, not testing.', `<div class="qa-track" id="qaTrack2"></div><div class="qa-now" aria-live="polite" style="margin-top:14px"><b id="qaT2"></b><p id="qaD2"></p></div>`)}
    <div class="two" style="margin-top:56px"><div><h3>What it checks</h3>${chips(['Functional', 'Responsive layouts', 'Broken links', 'Console errors', 'Accessibility', 'Performance & SEO'])}<p class="lede" style="margin-top:18px">A red mark is not a finding. We capture the page, element, console output and a screenshot from that moment.</p><div class="call" style="margin-top:18px">It is a place to start.<small>AI adds context. People decide.</small></div></div><div class="report"><div class="rh"><span>QA report · <b>example</b></span><span>Illustration</span></div><ul><li><span class="sev h">High</span><span>Quote form fails on mobile</span><small>/quote</small></li><li><span class="sev h">High</span><span>Console errors after release</span><small>/checkout</small></li><li><span class="sev m">Medium</span><span>Low colour contrast</span><small>/pricing</small></li><li><span class="sev m">Medium</span><span>Broken links</span><small>site-wide</small></li><li><span class="sev l">Low</span><span>Missing meta descriptions</span><small>several pages</small></li></ul></div></div>
    ${cta('Do your releases wait on manual checking?', 'We are building this tool now. Tell us about your website and we will tell you where it can help.')}</div></div>`, after: () => { const T = $('#qaTrack2'); if (!T) return; T.innerHTML = qaSteps.map(([n], i) => `<button type="button" class="qs" data-i="${i}"><i>${String(i + 1).padStart(2, '0')}</i>${n}</button>`).join(''); const E = [...T.children]; const show = (i) => { E.forEach((e, k) => { e.classList.toggle('on', k === i); e.classList.toggle('done', k < i); }); $('#qaT2').textContent = qaSteps[i][1]; $('#qaD2').textContent = qaSteps[i][2]; }; E.forEach((e) => e.addEventListener('click', () => show(+e.dataset.i))); show(0); } });

const SOL = [
  ['Editors wait on developers', 'Restructured content lets editors add and change pages themselves.', '#/cms', 'Content architecture'],
  ['Pages go live without review', 'Roles, approvals and audit trails matched to risk.', '#/cms', 'CMS workflows'],
  ['Enquiries sit in an inbox', 'Forms flow through a secure API into your CRM.', '#/integrations', 'Integrations'],
  ['Data is split across systems', 'One update reaches CMS, CRM, stock, accounts and email.', '#/integrations', 'API integration'],
  ['AI without replacing the CMS', 'Search, chatbots and editor help through a secure .NET layer.', '#/ai', 'AI integration'],
  ['Planning a CMS migration', 'Content mapped, front end rebuilt, rankings protected.', '#/services/cms-migration', 'CMS migration'],
  ['Releases wait on manual checks', 'AI QA crawls, tests and reports what matters, with evidence.', '#/ai-qa', 'AI QA tool'],
  ['An old system holds us back', 'Keep what works, upgrade the rest step by step.', '#/services/legacy-modernisation', 'Legacy modernisation'],
  ['Unsure what belongs in the CMS', 'We plan the CMS and custom parts together.', '#/cms', 'CMS or custom']
];
P.solutions = () => ({ t: 'Solutions', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'Solutions']), 'Solutions', 'Real problems, <span class="grad">practical fixes.</span>', 'The situations businesses bring to us most often, and how we solve them. Find yours and open the page.', A('#/contact', 'Describe your situation →', 'pri') + A('#/services', 'See all services'), fig('meeting-table', 'warm arch', 'Discovery with clients'))}
    <div class="g3" style="margin-top:64px">${SOL.map(([t, p, h, tag], i) => `<a class="card" href="${h}"><span class="ix">${tag}</span><h3>${t}</h3><p>${p}</p><span class="go">See how →</span></a>`).join('')}</div>
    <div class="call">You do not always need a new website.<small>Often the smartest move is to keep what works, upgrade what does not, and make everything work together.</small></div>
    ${cta()}</div></div>` });

P.about = () => ({ t: 'About', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'About']), 'About WebsiteSoft', 'Web & software development <span class="grad">since 2007.</span>', 'We design, build and connect business software. No bloated packages and no shortcuts: software built to last, on Sitecore, Umbraco and .NET, with AI where it helps.', A('#/contact', 'Work with us →', 'pri') + A('#/services', 'What we do'), fig('team-desks', 'nat', 'Building, every day'))}
    ${sec('How we build', 'Software you will be happy to own for years', 'Build cost is a one-off. Ownership cost is forever.', cards([['We write our own code', 'Not hundreds of packages. Fewer security risks, and nothing breaks on someone else\'s update.'], ['Every line is reviewed', 'Nothing ships until another developer has read it. It costs a day. It saves you a year.'], ['Built to last', 'Clean architecture and a handover any competent team could pick up.']], 3))}
    <div class="two" style="margin-top:72px"><div><h3>A team that learns on live projects</h3>${ul(['Real deadlines teach faster than any course', 'Every change is read, discussed and improved', 'Many developers started as trainees', 'UK and India: your day, plus a second shift'])}${chips(['Sitecore', 'Umbraco', '.NET', 'Azure', 'React', 'AI'])}</div><div class="mosaic" style="grid-template-rows:200px;grid-template-columns:repeat(2,minmax(0,1fr))">${fig('pair-coding', 'nat', 'Code review')}${fig('coding-plant', 'warm', 'Our own code')}</div></div>
    ${cta()}</div></div>` });


  P.contact = () => ({ t: 'Contact', h: `<div class="pg"><div class="wrap">${hero(crumb([0, 'Contact']), 'Let\'s talk', 'Got a technology challenge? <span class="grad">Let\'s talk.</span>', 'Tell us what you use today and what you want to improve. We will suggest a practical way forward.', '', fig('sunlit-meeting', 'nat', 'Start with a conversation'))}
    <div class="two" style="margin-top:56px"><div><h3>Send us a note</h3><form class="form" id="cform"><label>Your name<input name="n" autocomplete="name" required></label><label>Email<input name="e" type="email" autocomplete="email" required></label><label>What do you want to improve?<textarea name="m" rows="5" required></textarea></label><div class="acts"><button class="btn pri" type="submit">Open in my email app →</button></div></form></div>
    <div><h3>Or reach us directly</h3><ul class="ul2"><li>Email: <a href="mailto:enquiries@websitesoft.co.uk">enquiries@websitesoft.co.uk</a></li><li><a href="https://lnkd.in/gSV8kf5B" target="_blank" rel="noopener">WhatsApp us ↗</a></li><li><a href="https://www.linkedin.com/company/websitesoft" target="_blank" rel="noopener">WebsiteSoft on LinkedIn ↗</a></li></ul>
    <h3 style="margin-top:34px">Quick answers</h3><details open><summary>Do we need a new website?</summary><p>Often not. Restructuring your current CMS, connecting it to your other systems or adding AI to what you already have is frequently the smarter move.</p></details><details><summary>Can you work with our existing Sitecore or Umbraco site?</summary><p>Yes. We upgrade, restructure and support existing Sitecore, XM Cloud and Umbraco platforms.</p></details><details><summary>How do you add AI safely?</summary><p>Through a secure .NET layer with access controls, avoiding unnecessary sensitive data, and with people reviewing AI output.</p></details></div></div></div></div>`, after: () => { const f = $('#cform'); if (f) f.addEventListener('submit', (e) => { e.preventDefault(); const d = new FormData(f); location.href = `mailto:enquiries@websitesoft.co.uk?subject=${encodeURIComponent('Website enquiry from ' + d.get('n'))}&body=${encodeURIComponent(d.get('m') + '\n\n' + d.get('n') + ' (' + d.get('e') + ')')}`; }); } });

  const homeEl = $('#home'), pagesEl = $('#pages');
  const metaD = document.querySelector('meta[name="description"]'), ogT = document.querySelector('meta[property="og:title"]'), ogD = document.querySelector('meta[property="og:description"]');
  const META0 = { t: document.title, d: metaD.content };
  function setMeta(page) {
    const t = page ? document.title : META0.t;
    const lede = page && pagesEl.querySelector('.lede');
    const d = page && lede ? lede.textContent.trim().slice(0, 158) : META0.d;
    if (!page) document.title = META0.t;
    metaD.content = d; ogT.content = t; ogD.content = d;
  }
  function route() {
    const h = location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
    let page = null, key = '';
    if (h) { const [a, b] = h.split('/'); key = a; page = a === 'services' && b ? P.service(b) : P[a] && P[a](); }
    sub = !!page;
    homeEl.hidden = sub; pagesEl.hidden = !sub; document.body.classList.toggle('sub', sub);
    if (sub) { pagesEl.innerHTML = page.h; document.title = `${page.t} | WebsiteSoft`; if (page.after) page.after(); pagesEl.querySelectorAll('[data-tabs]').forEach((w) => { const bs = [...w.querySelectorAll('.tb')], ps = [...w.querySelectorAll('.tp')]; bs.forEach((b, i) => b.addEventListener('click', () => { bs.forEach((x, k) => x.classList.toggle('on', k === i)); ps.forEach((x, k) => (x.hidden = k !== i)); })); }); } else { document.title = 'WebsiteSoft | Web & software development since 2007'; }
    navA.forEach((a) => a.classList.toggle('on', sub && a.getAttribute('href') === '#/' + key)); lastCh = -1;
    setMeta(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (typeof collectFade === 'function') collectFade();
  }
  addEventListener('hashchange', route);

  // ---------- AI QA steps ----------
  const qaSteps = [['URL', 'Enter a URL', 'Start from a single address. No scripts to write.'], ['Crawl', 'Crawl the site', 'Every page, form and link is discovered automatically.'], ['Test', 'Run the checks', 'Functional, responsive, accessibility, performance and SEO.'], ['Detect', 'Detect issues', 'Broken links, console errors and failing forms are flagged.'], ['Evidence', 'Collect evidence', 'The page, element, console output and a screenshot from that moment.'], ['Analyse', 'Analyse with AI', 'AI groups 300+ raw results into a short list ordered by impact.'], ['Report', 'Share the report', 'One clear, prioritised report your developers can act on.'], ['Retest', 'Fix and retest', 'Run it again after each release to protect quality.']];
  const qaTrack = $('#qaTrack');
  qaTrack.innerHTML = qaSteps.map(([n], i) => `<button type="button" class="qs" data-i="${i}"><i>${String(i + 1).padStart(2, '0')}</i>${n}</button>`).join('');
  const qsEls = [...qaTrack.children]; let qi = 0, qaHold = 0;
  const qaShow = (i) => { qi = i; qsEls.forEach((e, k) => { e.classList.toggle('on', k === i); e.classList.toggle('done', k < i); }); $('#qaT').textContent = qaSteps[i][1]; $('#qaD').textContent = qaSteps[i][2]; };
  qsEls.forEach((e) => e.addEventListener('click', () => { qaShow(+e.dataset.i); qaHold = 3; }));
  qaShow(0); if (!reduce) setInterval(() => { if (qaHold > 0) { qaHold--; return; } qaShow((qi + 1) % qaSteps.length); }, 2200);

  // ---------- numbers ----------
  const techCount = new Set(services.flatMap((x) => x[2]).concat([...document.querySelectorAll('.stackrow span')].map((e) => e.textContent))).size;
  const statVals = { years: new Date().getFullYear() - 2007, services: services.length, tech: techCount };
  const statEls = [...document.querySelectorAll('#stats b')];
  const runStats = () => statEls.forEach((el) => { const to = statVals[el.dataset.to] ?? +el.dataset.to; if (reduce) { el.textContent = to; return; } const t0 = performance.now(); const step = (now) => { const k = Math.min(1, (now - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); });
  new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { runStats(); o.disconnect(); } }), { threshold: .4 }).observe($('#stats'));

  // ---------- migration bar ----------
  let mig = 0; setInterval(() => { mig = mig >= 100 ? 0 : Math.min(100, mig + 3 + Math.round(Math.random() * 5)); $('#migBar').style.setProperty('--p', mig / 100); $('#migPct').textContent = mig + '%'; }, reduce ? 99999 : 260);

  // ---------- small UI ----------
  $('#voice').innerHTML = Array.from({ length: 26 }, (_, k) => `<i style="--k:${k};--h:${30 + Math.round(Math.abs(Math.sin(k * .7)) * 70)}%"></i>`).join('');
  const wfEls = [...document.querySelectorAll('#wf span')], wfNotes = ['Author creates. Can\'t publish.', 'Editor checks accuracy, tone and brand.', 'Legal or marketing lead signs off.', 'Only authorised publishers go live.'];
  let wfi = 0; const wfTick = () => { wfEls.forEach((e, k) => { e.classList.toggle('on', k === wfi); e.classList.toggle('done', k < wfi); }); $('#wfNote').textContent = wfNotes[wfi]; wfi = (wfi + 1) % 4; }; wfTick(); if (!reduce) setInterval(wfTick, 1500);
  const prices = ['£49.00', '£52.50', '£47.99', '£55.00']; let pi = 0;
  const syncTick = () => { pi = (pi + 1) % prices.length; const p = prices[pi]; $('#syncP').textContent = p; document.querySelectorAll('.sats span').forEach((el, k) => setTimeout(() => { el.querySelector('b').textContent = p; el.classList.remove('hit'); void el.offsetWidth; el.classList.add('hit'); }, 300 + k * 160)); };
  if (!reduce) setInterval(syncTick, 2600);
  const lines = ['crawling 214 pages', 'testing forms and links', '3 console errors found', 'grouping 300+ results by impact', 'report ready: 12 priority fixes'];
  let li = 0; setInterval(() => { li = (li + 1) % lines.length; $('#say').textContent = lines[li]; }, 2200);
  const fmt = (tz) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz });
  const uk = fmt('Europe/London'), ind = fmt('Asia/Kolkata');
  const tick = () => { const d = new Date(); $('#tUK').textContent = uk.format(d); $('#tIN').textContent = ind.format(d); };
  tick(); setInterval(tick, 15000);
  $('#copy').addEventListener('click', (e) => { const b = e.currentTarget; navigator.clipboard.writeText('enquiries@websitesoft.co.uk').then(() => { b.textContent = 'Copied'; setTimeout(() => (b.textContent = 'Copy'), 1600); }).catch(() => { const r = document.createRange(); r.selectNodeContents($('#email')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }); });
  document.querySelectorAll('.wc').forEach((c) => {
    c.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse' || reduce) return; const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`; c.style.setProperty('--mx', `${(x + .5) * 100}%`); c.style.setProperty('--my', `${(y + .5) * 100}%`); });
    c.addEventListener('pointerleave', () => (c.style.transform = ''));
  });

  // ---------- chapters ----------
  const chs = [...document.querySelectorAll('#home .chapter')];
  const navA = [...document.querySelectorAll('#nav a')];
  let cur = 0;
  function currentChapter() { const mid = innerHeight * .5; let k = 0; chs.forEach((c, i) => { const r = c.getBoundingClientRect(); if (r.top <= mid) k = i; }); return k; }
  const go = (d) => chs[clamp(cur + d, 0, chs.length - 1)].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  $('#cPrev').onclick = () => go(-1); $('#cNext').onclick = () => go(1);
  const cw = $('#cWave'), cx = cw.getContext('2d');
  function drawWave(t, p) {
    const W = cw.width, H = cw.height, n = 46, bw = W / n; cx.clearRect(0, 0, W, H);
    const g = cx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, '#5eead4'); g.addColorStop(.5, '#3b82f6'); g.addColorStop(1, '#8b5cf6');
    for (let i = 0; i < n; i++) {
      const a = reduce ? .5 : Math.abs(Math.sin(t * 3 + i * .45) * Math.sin(t * 1.1 + i * .17));
      const h = Math.max(4, (.18 + a * .82) * H * (i / n <= p ? 1 : .45));
      cx.fillStyle = i / n <= p ? g : 'rgba(124,170,255,.22)';
      cx.beginPath(); cx.roundRect ? cx.roundRect(i * bw + 1, (H - h) / 2, bw - 3, h, 3) : cx.rect(i * bw + 1, (H - h) / 2, bw - 3, h); cx.fill();
    }
  }

  // ---------- content dissolves under the header and the chapter bar ----------
  const fadeSel = 'main h1,main h2,main p,main li,main .kicker,main .pills,main .mini,main .row,main .mock,main .stackrow,main .fc,main .step,main .wc,main .clk,main .stats>div,main .sv,main .svbar,main .svcstack,main .svstrip,main .cp,main .quote,main .ph,main .ic,main details,main .report,main .qa-track,main .qa-now,main .checks,main .tstrip';
  let fadeEls = [];
  const collectFade = () => { fadeEls = [...document.querySelectorAll(fadeSel)].filter((e) => !e.parentElement.closest(fadeSel)); lastDissolveY = -1; };
  collectFade(); setTimeout(collectFade, 1500);
  var lastDissolveY = -1, lastDissolveH = -1;
  function dissolve() {
    if (scrollY < 60) { for (const e of fadeEls) { if (e.style.opacity || e.style.filter) { e.style.opacity = ''; e.style.filter = ''; } } return; }
    if (scrollY === lastDissolveY && innerHeight === lastDissolveH) return; lastDissolveY = scrollY; lastDissolveH = innerHeight;
    const H = innerHeight, top = 74, topBand = 110, bot = H - 90, botBand = 120;
    const rects = fadeEls.map((e) => e.getBoundingClientRect());
    for (let n = 0; n < fadeEls.length; n++) {
      const e = fadeEls[n], r = rects[n];
      if (r.bottom < -20 || r.top > H + 20) continue;
      const a = Math.min(1, Math.max(0, (r.top + Math.min(r.height, 60) * .5 - top) / topBand));
      const b = Math.min(1, Math.max(0, (bot - (r.bottom - Math.min(r.height, 60) * .5)) / botBand));
      const q = Math.min(a, r.height > H * .6 ? 1 : b), k = q * q * (3 - 2 * q);
      const v = k > .995 ? '' : String(k.toFixed(3));
      if (e.style.opacity !== v) { e.style.opacity = v; }
    }
  }
  const NAVMAP = { services: 'services', ch1: 'cms', ch2: 'ai', ch3: 'integrations', ch4: 'about', culture: 'about', ch5: 'solutions', aiqa: 'ai-qa', ch6: 'about' };
  var lastCh = -1, lastChY = -1, brandCompact = null;
  function ui(t) {
    const cmp = scrollY > 80; if (cmp !== brandCompact) { brandCompact = cmp; brand.classList.toggle('compact', cmp); }
    if (sub) return;
    if (scrollY !== lastChY) { lastChY = scrollY; cur = currentChapter(); }
    if (cur !== lastCh) {
      lastCh = cur; const nk = NAVMAP[chs[cur].id]; navA.forEach((a) => a.classList.toggle('on', !!nk && a.getAttribute('href') === '#/' + nk)); $('#cLbl').innerHTML = `<b>${String(cur).padStart(2, "0")}</b>${chs[cur].dataset.name}`;
    }
    const p = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    drawWave(t, p);
  }

  // ---------- loader ----------
  const pctEl = $('#pct'); let pct = 0;
  const pctTimer = setInterval(() => { pct = Math.min(99, pct + 7 + Math.random() * 9); pctEl.textContent = String(Math.floor(pct)).padStart(2, '0'); }, 90);
  const finish = () => { clearInterval(pctTimer); pctEl.textContent = '100'; setTimeout(() => $('#loader').classList.add('done'), 300); };

  // ---------- 3D stage ----------
  let three = null;
  try { if (window.THREE) three = buildStage(); } catch (e) { console.error(e); }
  if (!three) $('#stage').remove();
  let cursorFx = null;
  if (matchMedia('(pointer: fine)').matches) document.documentElement.classList.add('fx-cursor');
  if (!cursorFx) $('#cursorFx').remove();

  function buildRing() {
    const dot = document.createElement('div'); dot.className = 'cdot'; const glow = document.createElement('div'); glow.className = 'cglow';
    dot.setAttribute('aria-hidden', 'true'); glow.setAttribute('aria-hidden', 'true'); document.body.append(glow, dot);
    document.documentElement.classList.add('fx-cursor');
    let x = 0, y = 0, gx = 0, gy = 0, hov = false, vis = false, txt = false;
    addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; x = e.clientX; y = e.clientY; if (!vis) { gx = x; gy = y; vis = true; } txt = !!e.target.closest('input,textarea'); hov = !!e.target.closest('a,button,summary,.card,.prow,.pt');
      dot.style.opacity = txt ? 0 : 1; glow.style.opacity = txt ? 0 : 1; dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; dot.classList.toggle('h', hov); });
    document.documentElement.addEventListener('mouseleave', () => { vis = false; dot.style.opacity = 0; glow.style.opacity = 0; });
    return { frame() { gx += (x - gx) * .16; gy += (y - gy) * .16; glow.style.transform = `translate(${gx}px,${gy}px) translate(-50%,-50%) scale(${hov ? 1.5 : 1})`; } };
  }
  function buildCursor() {
    const cv = $('#cursorFx'); document.documentElement.classList.add('fx-cursor');
    const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    r.setPixelRatio(Math.min(devicePixelRatio, 2));
    const sc = new THREE.Scene();
    let W = innerWidth, H = innerHeight;
    const cam = new THREE.OrthographicCamera(0, W, 0, -H, -500, 500);
    const fit = () => { W = innerWidth; H = innerHeight; r.setSize(W, H, false); cam.right = W; cam.bottom = -H; cam.updateProjectionMatrix(); };
    addEventListener('resize', fit); fit();
    sc.add(new THREE.HemisphereLight(0xbfe0ff, 0x1a1050, 1.1));
    const kl = new THREE.DirectionalLight(0xffffff, .95); kl.position.set(-1, 1, 2); sc.add(kl);
    // crystal core with the logo gradient
    const geo = new THREE.OctahedronGeometry(9, 0).toNonIndexed();
    const pos = geo.attributes.position, col = new Float32Array(pos.count * 3), c = new THREE.Color(), cT = new THREE.Color(0xffffff), cV = new THREE.Color(0xc7d2fe);
    for (let i = 0; i < pos.count; i++) { c.copy(cT).lerp(cV, (pos.getY(i) / 9 + 1) / 2 * .6 + (pos.getX(i) / 9 + 1) / 4 * .8); col.set([c.r, c.g, c.b], i * 3); }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3)); geo.computeVertexNormals();
    const core = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: .25, metalness: .2, emissive: 0xffffff, emissiveIntensity: .18 }));
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.OctahedronGeometry(9.4, 0)), new THREE.LineBasicMaterial({ color: 0x0b1b4f, transparent: true, opacity: .85 }));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(16, .9, 8, 64), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .9 }));
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(21, .6, 8, 64, Math.PI * 1.2), new THREE.MeshBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: .55 }));
    const shade = new THREE.Mesh(new THREE.CircleGeometry(13, 32), new THREE.MeshBasicMaterial({ color: 0x050c26, transparent: true, opacity: .45 })); shade.position.z = -20;
    const gc = document.createElement('canvas'); gc.width = gc.height = 64; const gx = gc.getContext('2d'); const gr = gx.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.3, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); gx.fillStyle = gr; gx.fillRect(0, 0, 64, 64);
    const gtex = new THREE.CanvasTexture(gc);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: gtex, color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); glow.scale.set(46, 46, 1);
    const g = new THREE.Group(); [shade, glow, core, edges, ring, ring2].forEach((o) => g.add(o)); sc.add(g); g.visible = false;
    // comet trail
    const TN = 46, tp = new Float32Array(TN * 3), tc = new Float32Array(TN * 3);
    const tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.BufferAttribute(tp, 3)); tg.setAttribute('color', new THREE.BufferAttribute(tc, 3));
    const trail = new THREE.Points(tg, new THREE.PointsMaterial({ size: 14, sizeAttenuation: false, map: gtex, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); trail.frustumCulled = false; sc.add(trail);
    let px = W / 2, py = H / 2, x = px, y = py, inside = false, hot = 0, hotT = 0, pulse = 0;
    addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; px = e.clientX; py = e.clientY; if (!inside) { x = px; y = py; for (let i = 0; i < TN; i++) tp.set([x, -y, 0], i * 3); } inside = true; hotT = e.target.closest && e.target.closest('a,button,.sv,input') ? 1 : 0; }, { passive: true });
    document.addEventListener('pointerleave', () => (inside = false));
    addEventListener('blur', () => (inside = false));
    addEventListener('pointerdown', () => (pulse = 1));
    const cols = [new THREE.Color(0xffffff), new THREE.Color(0xeef2ff), new THREE.Color(0xc7d2fe), new THREE.Color(0x94a3b8)];
    return { frame(t) {
      x = lerp(x, px, reduce ? 1 : .45); y = lerp(y, py, reduce ? 1 : .45);
      hot = lerp(hot, hotT, .15); pulse = Math.max(0, pulse - .06);
      g.visible = inside; trail.visible = inside && !reduce;
      g.position.set(x, -y, 0);
      const s = 1 + hot * .35 + pulse * .5; g.scale.setScalar(s);
      core.rotation.set(t * 1.3, t * 1.7, 0); edges.rotation.copy(core.rotation);
      ring.rotation.set(1.1 + Math.sin(t * 1.2) * .3, t * 1.4, 0); ring.scale.setScalar(1 + hot * .5);
      ring2.rotation.set(-.6, 0, -t * 2.2); ring2.scale.setScalar(1 + hot * .7);
      ring.material.opacity = .75 - hot * .2; glow.material.opacity = .3 + hot * .3 + pulse * .4;
      tp.copyWithin(3, 0, (TN - 1) * 3); tp.set([x, -y, 0], 0);
      for (let i = 0; i < TN; i++) { const f = Math.pow(1 - i / TN, 1.6), k = i / TN * 3, j = Math.min(2, Math.floor(k)); c.copy(cols[j]).lerp(cols[j + 1], k - j); tc.set([c.r * f, c.g * f, c.b * f], i * 3); }
      tg.attributes.position.needsUpdate = true; tg.attributes.color.needsUpdate = true;
      r.render(sc, cam);
    } };
  }
  setTimeout(finish, reduce ? 0 : 1600);

  const t0 = performance.now();
  let lastNow = 0, slow = 0, lowered = false;
  function loop(now) { const ft = now - (lastNow || now); lastNow = now;
    if (!lowered && window.__wsR && ft > 0 && ft < 200) { slow = ft > 25 ? slow + 1 : Math.max(0, slow - 2); if (slow > 45) { lowered = true; window.__wsR.setPixelRatio(1); dispatchEvent(new Event('resize')); } }
    if (document.hidden) { requestAnimationFrame(loop); return; }
    const t = Math.max(0, (now - t0) / 1000); ui(t); if (three && !sub) three.frame(t); if (cursorFx) cursorFx.frame(t); requestAnimationFrame(loop); }
  route();
  requestAnimationFrame(loop);

  function buildStage() {
    const canvas = $('#stage');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); window.__wsR = renderer;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 140); camera.position.set(0, 0, 12);

    // studio environment for glossy reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = new THREE.Scene();
    env.add(new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshBasicMaterial({ color: 0x0b1a4d, side: THREE.BackSide })));
    [[0x7cc4ff, 8, 6, 6, 10, 2], [0x8b5cf6, -9, 2, 4, 6, 6], [0x5eead4, 2, -8, 5, 10, 1], [0xffffff, 0, 9, -4, 14, 1.4]].forEach(([c, x, y, z, s, k]) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s * .5), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); });
    scene.environment = pmrem.fromScene(env, .04).texture;
    scene.add(new THREE.HemisphereLight(0x9fc4ff, 0x0b1033, .55));
    const key = new THREE.DirectionalLight(0xffffff, .85); key.position.set(4, 6, 8); scene.add(key);
    const rim = new THREE.DirectionalLight(0x8b5cf6, .65); rim.position.set(-6, 2, -4); scene.add(rim);

    const C = { teal: new THREE.Color(0x5eead4), sky: new THREE.Color(0x7cc4ff), blue: new THREE.Color(0x3b82f6), violet: new THREE.Color(0x7c3aed) };
    const glossy = (color, extra = {}) => new THREE.MeshPhysicalMaterial(Object.assign({ color, roughness: .33, metalness: .1, clearcoat: .65, clearcoatRoughness: .22, envMapIntensity: .42 }, extra));
    const models = {};
    const mk = (name) => { const g = new THREE.Group(); scene.add(g); models[name] = g; return g; };

    // --- W mark (two glossy V tubes) ---
    function buildW(g) {
      const v = (px, py, z) => new THREE.Vector3((px - 50) / 10, (50 - py) / 10 + .2, z), R = .75;
      const colorize = (geo, fn) => { const p = geo.attributes.position, c = new Float32Array(p.count * 3), t = new THREE.Color(); for (let i = 0; i < p.count; i++) { fn(p.getX(i), p.getY(i), t); c.set([t.r, t.g, t.b], i * 3); } geo.setAttribute('color', new THREE.BufferAttribute(c, 3)); };
      const m = glossy(0xffffff, { vertexColors: true });
      const stroke = (pts, fn, r = R, mat = m) => { const grp = new THREE.Group();
        for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; const geo = new THREE.CylinderGeometry(r, r, a.distanceTo(b), 48, 1, true); geo.applyMatrix4(new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(.5), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()), new THREE.Vector3(1, 1, 1))); if (fn) colorize(geo, fn); grp.add(new THREE.Mesh(geo, mat)); }
        pts.forEach((p) => { const s = new THREE.SphereGeometry(r, 48, 24); s.translate(p.x, p.y, p.z); if (fn) colorize(s, fn); grp.add(new THREE.Mesh(s, mat)); }); return grp; };
      const fG = (x, y, c) => c.copy(C.teal).lerp(C.blue, clamp((2.8 - y) / 5.6));
      const bG = (x, y, c) => c.copy(C.blue).lerp(C.violet, clamp(((x + .8) / 4.6 + (2.8 - y) / 5.6) / 2));
      const hl = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .7 });
      const back = stroke([v(42, 41, -.5), v(62, 80, -.5), v(87, 24, -.5)], bG), front = stroke([v(13, 24, .5), v(34, 80, .5), v(53, 36, .5)], fG);
      back.add(stroke([v(49, 45, -.5 + R * .92), v(42, 64, -.5 + R * .92)], null, .06, hl)); front.add(stroke([v(20, 34, .5 + R * .92), v(29, 58, .5 + R * .92)], null, .06, hl));
      g.add(back); g.add(front); g.userData.front = front; g.userData.back = back;
      g.scale.setScalar(.62);
    }
    buildW(mk('w')); buildW(mk('w2'));

    // --- browser screens ---
    function uiTex(kind) {
      const c = document.createElement('canvas'); c.width = 640; c.height = 420; const x = c.getContext('2d');
      const rr = (a, b, w, h, r, f) => { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); x.fillStyle = f; x.fill(); };
      rr(0, 0, 640, 420, 26, '#0b1b4f'); rr(0, 0, 640, 56, 0, '#12286e');
      ['#fb7185', '#fbbf24', '#34d399'].forEach((f, i) => { x.beginPath(); x.arc(30 + i * 24, 28, 7, 0, 7); x.fillStyle = f; x.fill(); });
      rr(120, 16, 380, 24, 12, '#0b1b4f');
      const g = x.createLinearGradient(0, 0, 640, 0); g.addColorStop(0, '#5eead4'); g.addColorStop(.5, '#3b82f6'); g.addColorStop(1, '#8b5cf6');
      if (kind === 0) { rr(36, 86, 330, 150, 16, g); x.globalAlpha = .85; [0, 1, 2].forEach((i) => rr(390, 92 + i * 34, 210 - i * 50, 14, 7, '#7cc4ff')); rr(390, 200, 110, 34, 12, '#ffffff'); x.globalAlpha = 1; [0, 1, 2].forEach((i) => rr(36 + i * 196, 264, 176, 120, 14, '#16307a')); }
      if (kind === 1) { x.font = '500 22px monospace'; const lines = [['#c4b5fd', 'export async function '], ['#7cc4ff', 'quote'], ['#c8d6f5', '(id) {'], ['#5f74a8', '  // fetch and price'], ['#c8d6f5', '  const q = await db.get(id);'], ['#5eead4', "  return price(q, 'GBP');"], ['#c8d6f5', '}']];
        let y = 100; lines.forEach(([col, s], i) => { if (i === 1 || i === 2) return; x.fillStyle = col; x.fillText(s, 40, y); y += 40; }); x.fillStyle = '#7cc4ff'; x.fillText('quote', 40 + x.measureText('export async function ').width, 100); }
      if (kind === 2) { [0, 1, 2].forEach((i) => { rr(36 + i * 196, 84, 176, 90, 14, '#16307a'); x.fillStyle = '#93a7d6'; x.font = '500 18px sans-serif'; x.fillText(['Orders', 'Sync', 'Release'][i], 56 + i * 196, 118); x.fillStyle = '#ffffff'; x.font = '700 28px sans-serif'; x.fillText(['Live', 'Healthy', 'Friday'][i], 56 + i * 196, 154); });
        rr(36, 196, 568, 190, 14, '#16307a'); x.strokeStyle = g; x.lineWidth = 5; x.beginPath(); [30, 46, 40, 80, 70, 110, 96, 140, 128, 160].forEach((v, i) => { const px = 60 + i * 58, py = 360 - v; i ? x.lineTo(px, py) : x.moveTo(px, py); }); x.stroke(); }
      const t = new THREE.CanvasTexture(c); t.anisotropy = 8; return t;
    }
    (() => { const g = mk('screens');
      const geo = new THREE.BoxGeometry(4.2, 2.76, .06);
      [[2, -1.6, -1.3, -1.2, .3], [1, 1.5, 1.1, -.4, -.2], [0, 0, 0, .7, 0]].forEach(([k, x, y, z, ry]) => {
        const tex = uiTex(k);
        const mats = [0, 1, 2, 3].map(() => new THREE.MeshStandardMaterial({ color: 0x16307a, roughness: .4 })); mats.push(new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: .38, roughness: .35 })); mats.push(new THREE.MeshStandardMaterial({ color: 0x0b1b4f }));
        const m = new THREE.Mesh(geo, mats); m.position.set(x, y, z); m.rotation.y = ry - .35; m.userData.base = m.position.clone(); g.add(m);
        const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .5 })); m.add(edge);
      });
      g.userData.anim = (t) => g.children.forEach((m, i) => { m.position.y = m.userData.base.y + Math.sin(t * 1.1 + i * 1.7) * .12; });
      g.rotation.x = .08; g.scale.setScalar(.92);
    })();

    // --- AI core with a voice ring ---
    (() => { const g = mk('ai');
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 4), glossy(0x0b1a4d, { emissive: 0x1d4ed8, emissiveIntensity: .24, metalness: .4 })); g.add(core);
      const wire = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.19, 1)), new THREE.LineBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .6 })); g.add(wire);
      const glowC = document.createElement('canvas'); glowC.width = glowC.height = 128; const gx = glowC.getContext('2d'); const rg = gx.createRadialGradient(64, 64, 0, 64, 64, 64); rg.addColorStop(0, 'rgba(124,196,255,.9)'); rg.addColorStop(.35, 'rgba(59,130,246,.35)'); rg.addColorStop(1, 'rgba(59,130,246,0)'); gx.fillStyle = rg; gx.fillRect(0, 0, 128, 128);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(glowC), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })); glow.scale.set(5, 5, 1); g.add(glow);
      const rings = [[1.75, .03, 0x5eead4, 1.2, .4], [2.05, .022, 0x8b5cf6, -.9, -.6]].map(([r, tk, c, s, tilt]) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, tk, 12, 120), new THREE.MeshBasicMaterial({ color: c })); m.rotation.set(Math.PI / 2 + tilt, tilt * .5, 0); m.userData.s = s; g.add(m);
        for (let i = 0; i < 5; i++) { const n = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); const a = i / 5 * Math.PI * 2; n.position.set(Math.cos(a) * r, Math.sin(a) * r, 0); m.add(n); } return m; });
      const bars = [], NB = 84, ringR = 2.75;
      const barGeo = new THREE.BoxGeometry(.07, 1, .07); barGeo.translate(0, .5, 0);
      for (let i = 0; i < NB; i++) { const a = i / NB * Math.PI * 2; const col = C.teal.clone().lerp(C.blue, (i % (NB / 2)) / (NB / 2)).lerp(C.violet, i > NB / 2 ? .5 : 0);
        const b = new THREE.Mesh(barGeo, new THREE.MeshBasicMaterial({ color: col })); b.position.set(Math.cos(a) * ringR, Math.sin(a) * ringR, 0); b.rotation.z = a - Math.PI / 2; g.add(b); bars.push(b); }
      g.userData.anim = (t) => { core.rotation.y = t * .3; wire.rotation.y = -t * .2; wire.rotation.x = t * .1; rings.forEach((r) => (r.rotation.z = t * r.userData.s * .5));
        const talk = .5 + .5 * Math.sin(t * 1.3);
        bars.forEach((b, i) => { b.scale.y = .12 + Math.abs(Math.sin(t * 5 + i * .55) * Math.sin(t * 1.7 + i * .21)) * (.35 + .75 * talk); });
        glow.material.opacity = .7 + talk * .3; };
      g.scale.setScalar(.8);
    })();

    // --- twisting cube (3x3x3) ---
    (() => { const g = mk('cube'); const holder = new THREE.Group(); g.add(holder);
      const S = .66, cubies = [];
      const geo = new THREE.BoxGeometry(S * .94, S * .94, S * .94); const eg = new THREE.EdgesGeometry(geo);
      for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
        const t = clamp((x + 1) / 4 + (1 - y) / 4); const col = t < .5 ? C.teal.clone().lerp(C.blue, t * 2) : C.blue.clone().lerp(C.violet, (t - .5) * 2);
        const m = new THREE.Mesh(geo, glossy(col, { transparent: true, opacity: .92 })); m.position.set(x * S * 1.04, y * S * 1.04, z * S * 1.04);
        m.add(new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .35 }))); holder.add(m); cubies.push(m);
      }
      const pivot = new THREE.Group(); holder.add(pivot);
      let move = null, nextAt = 0;
      const axes = ['x', 'y', 'z'];
      g.userData.anim = (t) => { holder.rotation.y = t * .25; holder.rotation.x = .45 + Math.sin(t * .4) * .1;
        if (reduce) return;
        if (!move && t > nextAt) { const ax = axes[Math.floor(Math.random() * 3)], layer = Math.floor(Math.random() * 3) - 1, dir = Math.random() < .5 ? 1 : -1;
          pivot.rotation.set(0, 0, 0); pivot.updateMatrixWorld();
          cubies.forEach((c) => { if (Math.round(c.position[ax] / (S * 1.04)) === layer) pivot.attach(c); });
          move = { ax, dir, start: t }; }
        if (move) { const k = clamp((t - move.start) / .6); const e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; pivot.rotation[move.ax] = e * move.dir * Math.PI / 2;
          if (k >= 1) { pivot.updateMatrixWorld(); [...pivot.children].forEach((c) => { holder.attach(c); c.position.set(Math.round(c.position.x / (S * 1.04)) * S * 1.04, Math.round(c.position.y / (S * 1.04)) * S * 1.04, Math.round(c.position.z / (S * 1.04)) * S * 1.04); c.rotation.set(Math.round(c.rotation.x / (Math.PI / 2)) * Math.PI / 2, Math.round(c.rotation.y / (Math.PI / 2)) * Math.PI / 2, Math.round(c.rotation.z / (Math.PI / 2)) * Math.PI / 2); }); move = null; nextAt = t + .35; } } };
      g.scale.setScalar(1.15);
    })();

    // --- three steps with a hopping orb ---
    (() => { const g = mk('steps');
      const label = (txt) => { const c = document.createElement('canvas'); c.width = 256; c.height = 64; const x = c.getContext('2d'); x.font = '600 30px Sora, sans-serif'; x.fillStyle = '#eef4ff'; x.textAlign = 'center'; x.fillText(txt, 128, 42); const t = new THREE.CanvasTexture(c); const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false })); s.scale.set(1.6, .4, 1); return s; };
      const P = [[-1.9, -1.3], [0, -.25], [1.9, .8]], cols = [C.teal, C.blue, C.violet];
      const tops = P.map(([x, y], i) => { const m = new THREE.Mesh(new THREE.BoxGeometry(1.7, .3, 1.7), glossy(cols[i].clone().multiplyScalar(.85), { transparent: true, opacity: .95 })); m.position.set(x, y, 0); g.add(m);
        m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .45 })));
        const l = label(['WRITE', 'REVIEW', 'SHIP'][i]); l.position.set(x, y - .55, .9); g.add(l); return new THREE.Vector3(x, y + .15, 0); });
      const orb = new THREE.Mesh(new THREE.SphereGeometry(.26, 32, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x7cc4ff, emissiveIntensity: .9 })); g.add(orb);
      const ol = new THREE.PointLight(0x7cc4ff, 1, 4); orb.add(ol);
      g.userData.anim = (t) => { const cyc = (t * .7) % 3, i = Math.floor(cyc), f = cyc - i; const a = tops[i], b = tops[(i + 1) % 3];
        if (i < 2) { const e = f < .7 ? 0 : (f - .7) / .3; orb.position.lerpVectors(a, b, e); orb.position.y += .26 + Math.sin(e * Math.PI) * 1.1 + (e === 0 ? Math.abs(Math.sin(f * 9)) * .12 : 0); }
        else { const e = f; orb.position.set(lerp(tops[2].x, tops[0].x, e), lerp(tops[2].y, tops[0].y, e) + .26 + Math.sin(e * Math.PI) * .6, Math.sin(e * Math.PI) * 1.4); }
        g.rotation.y = -.35 + Math.sin(t * .4) * .12; };
      g.rotation.x = .25; g.scale.setScalar(.82); g.position.x = -.4;
    })();

    // --- wire globe with a UK–India link ---
    (() => { const g = mk('globe'); const R = 2.1; const holder = new THREE.Group(); g.add(holder);
      holder.add(new THREE.Mesh(new THREE.SphereGeometry(R * .985, 48, 32), glossy(0x0b1a4d, { transparent: true, opacity: .85, metalness: .3 })));
      const lm = new THREE.LineBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .32 });
      for (let la = -60; la <= 60; la += 30) { const pts = []; for (let i = 0; i <= 64; i++) { const a = i / 64 * Math.PI * 2, r = R * Math.cos(la * Math.PI / 180); pts.push(new THREE.Vector3(Math.cos(a) * r, R * Math.sin(la * Math.PI / 180), Math.sin(a) * r)); } holder.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lm)); }
      for (let lo = 0; lo < 180; lo += 30) { const pts = []; for (let i = 0; i <= 64; i++) { const a = i / 64 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * R * Math.cos(lo * Math.PI / 180), Math.sin(a) * R, Math.cos(a) * R * Math.sin(lo * Math.PI / 180))); } holder.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lm)); }
      const ll = (lat, lon, r = R) => { const p = (90 - lat) * Math.PI / 180, t = (lon + 180) * Math.PI / 180; return new THREE.Vector3(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t)); };
      const uk = ll(51.5, -.1), inn = ll(18.6, 73.8);
      [[uk, 0x5eead4], [inn, 0x8b5cf6]].forEach(([p, c]) => { const m = new THREE.Mesh(new THREE.SphereGeometry(.09, 16, 8), new THREE.MeshBasicMaterial({ color: c })); m.position.copy(p); holder.add(m); const ring = new THREE.Mesh(new THREE.RingGeometry(.14, .18, 32), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide, transparent: true })); ring.position.copy(p.clone().multiplyScalar(1.01)); ring.lookAt(p.clone().multiplyScalar(2)); holder.add(ring); ring.userData.pulse = true; });
      const curve = new THREE.QuadraticBezierCurve3(uk, uk.clone().add(inn).multiplyScalar(.5).normalize().multiplyScalar(R * 1.55), inn);
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, .025, 8), new THREE.MeshBasicMaterial({ color: 0x7cc4ff })); holder.add(tube);
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); holder.add(pulse);
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(R * 1.32, .012, 6, 160), new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: .6 })); orbit.rotation.x = Math.PI / 2.3; g.add(orbit);
      const sat = new THREE.Mesh(new THREE.SphereGeometry(.08, 12, 8), new THREE.MeshBasicMaterial({ color: 0x5eead4 })); orbit.add(sat);
      holder.rotation.set(.45, -2.2, 0);
      g.userData.anim = (t) => { holder.rotation.y = -2.2 + Math.sin(t * .25) * .35; pulse.position.copy(curve.getPoint((t * .35) % 1)); const a = t * .6; sat.position.set(Math.cos(a) * R * 1.32, Math.sin(a) * R * 1.32, 0);
        holder.children.forEach((c) => { if (c.userData.pulse) { const k = (t * .8) % 1; c.scale.setScalar(1 + k * 1.8); c.material.opacity = 1 - k; } }); };
    })();

    // --- service orbit: a ring of tiles round a small W ---
    (() => { const g = mk('orbit'); const holder = new THREE.Group(); holder.rotation.x = .3; g.add(holder);
      const labels = ['Sitecore', 'Umbraco', 'Workflows', 'Content', 'Migration', 'Headless', '.NET  C#', 'APIs', 'AI', 'AI QA', 'Web apps', 'Custom web', 'Modernise', 'Speed', 'Support'];
      const n = labels.length, R = 3.45;
      const stops = ['#5eead4', '#7cc4ff', '#3b82f6', '#8b5cf6'];
      const tex = (label, i) => { const c = document.createElement('canvas'); c.width = 320; c.height = 200; const x = c.getContext('2d');
        const rr = (a, b, w, h, r) => { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); };
        const gr = x.createLinearGradient(0, 0, 320, 200); const k = i / (n - 1) * (stops.length - 1), j = Math.min(stops.length - 2, Math.floor(k)); gr.addColorStop(0, stops[j]); gr.addColorStop(1, stops[j + 1]);
        rr(0, 0, 320, 200, 28); x.fillStyle = gr; x.fill(); rr(6, 6, 308, 188, 23); x.fillStyle = '#0b1b4f'; x.fill();
        x.fillStyle = gr; x.font = '500 22px monospace'; 
        x.fillStyle = '#ffffff'; x.font = '600 44px Sora, sans-serif'; x.textAlign = 'center'; x.fillText(label, 160, 128);
        rr(110, 152, 100, 6, 3); x.fillStyle = gr; x.fill();
        const t = new THREE.CanvasTexture(c); t.anisotropy = 8; return t; };
      const geo = new THREE.BoxGeometry(1.36, .85, .07);
      const side = new THREE.MeshStandardMaterial({ color: 0x1d3a8a, roughness: .4 }), backM = new THREE.MeshStandardMaterial({ color: 0x0b1b4f, roughness: .6 });
      const tiles = labels.map((l, i) => { const t = tex(l, i); const front = new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: .38, roughness: .35 });
        const m = new THREE.Mesh(geo, [side, side, side, side, front, backM]); const a = i / n * Math.PI * 2; m.position.set(Math.sin(a) * R, 0, Math.cos(a) * R); m.rotation.y = a; holder.add(m); return m; });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(R, .015, 6, 160), new THREE.MeshBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .5 })); ring.rotation.x = Math.PI / 2; ring.position.y = -.6; holder.add(ring);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(R * .55, .012, 6, 120), new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: .5 })); ring2.rotation.x = Math.PI / 2; ring2.position.y = -.6; holder.add(ring2);
      const w = new THREE.Group(); buildW(w); w.scale.setScalar(.55); w.position.y = .4; g.add(w);
      let ang = 0;
      g.userData.anim = (t) => {
        if (svcHover >= 0) { const target = -svcHover / n * Math.PI * 2; let d = target - ang; d = ((d + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI; ang += d * .09; }
        else if (t > 0) ang -= .0035;
        holder.rotation.y = ang;
        svcFront = ((Math.round(-ang / (Math.PI * 2) * n) % n) + n) % n;
        tiles.forEach((m, i) => m.scale.setScalar(lerp(m.scale.x, i === svcFront ? 1.2 : 1, .15)));
        w.rotation.y = t * .6;
      };
    })();

    // ---------- one continuous space: stations along a flight path ----------
    const SP = 15, D = 12, N = chs.length;
    const FOGC = 0x050c26;
    scene.fog = new THREE.FogExp2(FOGC, .021);

    // per-model materials, made fadeable
    Object.values(models).forEach((g) => {
      const mats = [];
      g.traverse((o) => { if (!o.material) return; (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (mats.includes(m)) return; m.userData.base = m.opacity; m.transparent = true; mats.push(m); }); });
      g.userData.mats = mats;
      g.userData.baseScale = g.scale.x; g.userData.baseRy = g.rotation.y; g.userData.baseRx = g.rotation.x;
      g.visible = true;
    });
    // station index of each model
    const stationOf = {}; chs.forEach((c, i) => { if (c.dataset.model && c.dataset.model !== 'none') stationOf[c.dataset.model] = i; });

    // light trails: two ribbons in the logo colours that run through every chapter
    const zEnd = -(N - 1) * SP - 30;
    const glowTexC = document.createElement('canvas'); glowTexC.width = glowTexC.height = 64; const gtx = glowTexC.getContext('2d'); const grd = gtx.createRadialGradient(32, 32, 0, 32, 32, 32); grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(.3, 'rgba(255,255,255,.35)'); grd.addColorStop(1, 'rgba(255,255,255,0)'); gtx.fillStyle = grd; gtx.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(glowTexC);
    const trails = [[0, C.teal, C.blue], [Math.PI, C.violet, C.sky]].map(([ph, c1, c2]) => {
      const pts = [];
      for (let z = D + 95; z >= zEnd; z -= 2.5) { const k = z * .11 + ph; pts.push(new THREE.Vector3(Math.sin(k) * (7.6 + Math.sin(z * .05) * 2.2), Math.cos(k * .8) * 2.6 - .8, z)); }
      const curve = new THREE.CatmullRomCurve3(pts);
      const paint = (geo) => { const p = geo.attributes.position, col = new Float32Array(p.count * 3), c = new THREE.Color(); for (let i = 0; i < p.count; i++) { const t = .5 + .5 * Math.sin(p.getZ(i) * .06); c.copy(c1).lerp(c2, t); col.set([c.r, c.g, c.b], i * 3); } geo.setAttribute('color', new THREE.BufferAttribute(col, 3)); };
      const core = new THREE.TubeGeometry(curve, 1100, .026, 8); paint(core);
      const halo = new THREE.TubeGeometry(curve, 1100, .2, 10); paint(halo);
      const trailMat = (op) => new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uOp: { value: op } },
        vertexShader: 'attribute vec3 color; varying vec3 vC; varying float vD; void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position,1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }',
        fragmentShader: 'uniform float uOp; varying vec3 vC; varying float vD; void main(){ float a = smoothstep(3.0, 11.0, vD) * (1.0 - smoothstep(38.0, 60.0, vD)); gl_FragColor = vec4(vC, uOp * a); }' });
      scene.add(new THREE.Mesh(core, trailMat(.6)));
      scene.add(new THREE.Mesh(halo, trailMat(.035)));
      const sparks = Array.from({ length: 14 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: i % 2 ? c1 : c2, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })); s.scale.set(.45, .45, 1); scene.add(s); return { s, o: i / 14 }; });
      return { curve, sparks };
    });

    // gates you fly through between chapters
    const gates = [];
    for (let i = 0; i < N - 1; i++) {
      const g = new THREE.Group(); g.position.set(0, -.2, D - (i + .5) * SP); scene.add(g);
      const r = 7.6;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, .025, 6, 180), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x8b5cf6 : 0x5eead4, transparent: true, opacity: .35, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(ring);
      const tp = []; for (let k = 0; k < 120; k++) { const a = k / 120 * Math.PI * 2, l = k % 10 === 0 ? .55 : .2; tp.push(Math.cos(a) * (r - .15), Math.sin(a) * (r - .15), 0, Math.cos(a) * (r - .15 - l), Math.sin(a) * (r - .15 - l), 0); }
      const tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.Float32BufferAttribute(tp, 3));
      g.add(new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .22 })));
      const arc = new THREE.Mesh(new THREE.TorusGeometry(r + .35, .05, 6, 60, Math.PI * .55), new THREE.MeshBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .5, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(arc);
      g.userData = { ring, arc, s: i % 2 ? -1 : 1 };
      gates.push(g);
    }

    for (let i = 1; i <= 4; i++) {
      const g = new THREE.Group(); g.position.set(0, -.2, D + 6 + i * 16); scene.add(g);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(7.6, .025, 6, 180), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x8b5cf6 : 0x5eead4, transparent: true, opacity: .35, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(ring);
      const arc = new THREE.Mesh(new THREE.TorusGeometry(7.95, .05, 6, 60, Math.PI * .55), new THREE.MeshBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: .5, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(arc);
      g.userData = { ring, arc, s: i % 2 ? -1 : 1 }; gates.push(g);
    }

    // floating code symbols
    const glyphs = ['</>', '{ }', 'C#', '.NET', '=>', '( )', '[ ]', 'AI', '::', '01', '#', '&&'];
    const glyphTex = glyphs.map((g) => { const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d'); x.font = '600 76px "JetBrains Mono", monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ffffff'; x.shadowColor = 'rgba(124,196,255,.9)'; x.shadowBlur = 18; x.fillText(g, 128, 66); return new THREE.CanvasTexture(c); });
    const glyphCols = [0x5eead4, 0x7cc4ff, 0x3b82f6, 0x8b5cf6];
    const floaters = Array.from({ length: mobile() ? 26 : 54 }, (_, i) => {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glyphTex[i % glyphTex.length], color: glyphCols[i % 4], transparent: true, opacity: .32, depthWrite: false, blending: THREE.AdditiveBlending }));
      const side = i % 2 ? 1 : -1, sc = .9 + Math.random() * 1.4;
      sp.position.set(side * (5.5 + Math.random() * 7), -3.5 + Math.random() * 8, D + 80 - Math.random() * (D + 80 - zEnd + 10)); sp.scale.set(sc * 2, sc, 1);
      sp.userData = { y: sp.position.y, ph: Math.random() * 6.28 }; scene.add(sp); return sp; });


    // click bursts
    const BN = 700, bPos = new Float32Array(BN * 3), bCol = new Float32Array(BN * 3), bVel = new Float32Array(BN * 3), bLife = new Float32Array(BN); let bHead = 0;
    const bGeo = new THREE.BufferGeometry(); bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3)); bGeo.setAttribute('color', new THREE.BufferAttribute(bCol, 3));
    const burst = new THREE.Points(bGeo, new THREE.PointsMaterial({ size: .14, map: glowTex, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); burst.frustumCulled = false; scene.add(burst);
    const burstCols = [C.teal, C.sky, C.blue, C.violet];
    addEventListener('click', (e) => {
      if (reduce || e.target.closest('a,button,input,textarea,.mock,.wc,.clk,.stats,.svcstack,.cbar,header')) return;
      const nx = e.clientX / innerWidth * 2 - 1, ny = -(e.clientY / innerHeight) * 2 + 1;
      const v = new THREE.Vector3(nx, ny, .5).unproject(camera).sub(camera.position).normalize();
      const at = camera.position.clone().add(v.multiplyScalar(8));
      for (let k = 0; k < 90; k++) { const i = bHead; bHead = (bHead + 1) % BN;
        const th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1), sp = 2.2 + Math.random() * 3.2;
        bPos.set([at.x, at.y, at.z], i * 3); bVel.set([Math.sin(ph) * Math.cos(th) * sp, Math.sin(ph) * Math.sin(th) * sp, Math.cos(ph) * sp], i * 3); bLife[i] = 1;
        const c = burstCols[k % 4]; bCol.set([c.r, c.g, c.b], i * 3); }
    });
    let lastT = 0;

    // drifting dust and a floor grid that fades into the fog
    const DN = mobile() ? 900 : 1800, dp = new Float32Array(DN * 3);
    for (let i = 0; i < DN; i++) dp.set([(Math.random() - .5) * 34, (Math.random() - .5) * 18, D + 90 - Math.random() * (D + 90 - zEnd)], i * 3);
    const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    const dust = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0x9fc4ff, size: .05, transparent: true, opacity: .7, depthWrite: false })); scene.add(dust);
    const grid = new THREE.GridHelper(360, 180, 0x3b82f6, 0x1e3a8a); grid.material.transparent = true; grid.material.opacity = .22; grid.position.set(0, -5.2, (D + 90 + zEnd) / 2); scene.add(grid);

    // ---------- scroll → continuous position along the path ----------
    function scrollPos() {
      const vh = innerHeight, mid = vh / 2;
      const r = chs.map((c) => { const b = c.getBoundingClientRect(); const h = Math.min(b.height, vh); return { a: b.top + h / 2, z: b.bottom - h / 2 }; });
      const has = chs.map((c) => !!c.dataset.model && c.dataset.model !== 'none');
      const hold = (k) => { while (k > 0 && !has[k]) k--; return k; };
      if (mid <= r[0].a) return 0;
      for (let i = 0; i < r.length; i++) {
        if (mid >= r[i].a && mid <= r[i].z) return hold(i);
        if (i < r.length - 1 && mid > r[i].z && mid < r[i + 1].a) { const f = (mid - r[i].z) / (r[i + 1].a - r[i].z), e = f * f * (3 - 2 * f), a = hold(i), b = has[i + 1] ? i + 1 : a; return a + (b - a) * e; }
      }
      return hold(r.length - 1);
    }
    let camZ = reduce ? D : D + 82, mx = 0, my = 0, smx = 0, smy = 0;
    addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
    function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); }
    addEventListener('resize', resize); resize();
    const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
    camera.far = 140; camera.updateProjectionMatrix();

    return { frame(t) {
      const m = mobile();
      const s = scrollPos();
      const target = D - s * SP;
      const kz = reduce ? 1 : t < 1.9 ? 0 : t < 5 ? .03 : .085;
      camZ = lerp(camZ, target, kz);
      smx = lerp(smx, mx, .05); smy = lerp(smy, my, .05);
      const frac = s - Math.floor(s), dir = Math.floor(s) % 2 ? -1 : 1;
      camera.position.set(reduce ? 0 : smx * .7, reduce ? 0 : -smy * .45, camZ);
      camera.lookAt(camera.position.x * .4, camera.position.y * .4, camZ - 10);
      camera.rotateZ(reduce ? 0 : Math.sin(frac * Math.PI) * .07 * dir);
      const halfH = D * Math.tan(17 * Math.PI / 180), halfW = halfH * camera.aspect;

      Object.entries(models).forEach(([name, g]) => {
        const i = stationOf[name]; if (i === undefined) { g.visible = false; return; }
        const ch = chs[i], ud = g.userData;
        const zS = -i * SP, d = camZ - zS;                     // distance ahead of the camera
        const fade = sstep(3.5, 8, d) * (1 - sstep(D + SP * .3, D + SP * .8, d));
        g.visible = fade > .005;
        if (!g.visible) return;
        let x = m ? 0 : +(ch.dataset.shift || 0) * 2 * halfW, y = m ? (name === 'w' ? 2.0 : 2.6) : +(ch.dataset.y || 0);
        const past = Math.max(0, D - d);                      // how far we have flown past its resting spot
        const len = Math.hypot(x, y) || 1, ox = Math.abs(x) + Math.abs(y) < .3 ? 0 : x / len, oy = Math.abs(x) + Math.abs(y) < .3 ? 1 : y / len;
        x += ox * past * .55; y += oy * past * .55;
        let fitSc = 0;
        if (name === 'w' && !m) {
          const pills = document.querySelector('#ch0 .pills');
          if (pills) {
            const pillsTop = pills.getBoundingClientRect().top + scrollY, topPx = 88, gap = 16;
            const avail = Math.max(110, pillsTop - gap - topPx);
            const ppu = innerHeight / (2 * D * Math.tan(17 * Math.PI / 180));
            const wantPx = Math.min(avail, 300, ud.baseScale * +(ch.dataset.scale || 1) * 7.1 * ppu);
            fitSc = wantPx / (7.1 * ppu);
            y = (innerHeight / 2 - (topPx + avail / 2 + Math.max(0, avail - wantPx) / 2 * .6)) / ppu + Math.min(scrollY, innerHeight * 1.2) / ppu * (D / Math.max(1, d));
          }
        }
        g.position.set(x, y, zS);
        const sc = fitSc || ud.baseScale * +(ch.dataset.scale || 1) * (name === 'w2' ? .95 : 1) * (m ? .62 : 1);
        g.scale.setScalar(sc);
        g.rotation.y = ud.baseRy + (reduce ? 0 : (d - D) * .07 + smx * .4 + (name.startsWith('w') ? Math.sin(t * .5) * .25 : 0));
        g.rotation.x = ud.baseRx + (reduce ? 0 : smy * .2);
        if (name.startsWith('w') && !reduce) { const sp = past * .35 + Math.max(0, d - D) * .18; ud.front.position.x = -sp; ud.back.position.x = sp; g.position.y += Math.sin(t * 1.1) * .1; }
        ud.mats.forEach((mt) => (mt.opacity = mt.userData.base * fade));
        if (ud.anim) ud.anim(reduce ? 0 : t);
      });

      trails.forEach((tr, k) => tr.sparks.forEach((sp) => { const u = (((reduce ? sp.o : sp.o + t * (.012 + k * .004)) % 1) + 1) % 1; sp.s.position.copy(tr.curve.getPoint(u)); }));
      gates.forEach((g) => { const d = camZ - g.position.z; const f = sstep(-2, 2, d) * (1 - sstep(30, 44, d)); g.visible = f > .01; g.userData.ring.material.opacity = .35 * f; g.userData.arc.material.opacity = .55 * f; g.rotation.z = reduce ? 0 : t * .08 * g.userData.s; });
      if (!reduce) dust.rotation.z = t * .006;
      const dt = Math.min(.05, Math.max(0, t - lastT)); lastT = t;
      // floaters
      floaters.forEach((f) => { const d = camZ - f.position.z; f.material.opacity = .32 * sstep(2, 8, d) * (1 - sstep(40, 60, d)); if (!reduce) { f.position.y = f.userData.y + Math.sin(t * .6 + f.userData.ph) * .35; f.material.rotation = Math.sin(t * .3 + f.userData.ph) * .15; } });
      // bursts
      for (let i = 0; i < BN; i++) { if (bLife[i] <= 0) continue; bLife[i] -= dt * .9; const j = i * 3;
        bVel[j + 1] -= dt * 1.4; bVel[j] *= .985; bVel[j + 1] *= .985; bVel[j + 2] *= .985;
        bPos[j] += bVel[j] * dt; bPos[j + 1] += bVel[j + 1] * dt; bPos[j + 2] += bVel[j + 2] * dt;
        if (bLife[i] <= 0) { bCol[j] = bCol[j + 1] = bCol[j + 2] = 0; } else { const k = bLife[i] / Math.max(.001, bLife[i] + dt * .9); bCol[j] *= k; bCol[j + 1] *= k; bCol[j + 2] *= k; } }
      bGeo.attributes.position.needsUpdate = true; bGeo.attributes.color.needsUpdate = true;
      renderer.render(scene, camera);
    } };
  }
})();
