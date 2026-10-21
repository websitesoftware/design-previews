# WebsiteSoft marketing site: the prompt

This file has two parts:

1. **How the site was made**: a short summary of how it was built with AI, and what we learned
   about prompting.
2. **The build prompt**: one self-contained prompt that rebuilds the finished site from scratch.
   Paste everything below the line into any AI coding tool (Claude Code, Cursor, Copilot, ChatGPT and
   so on).

Every prompt from the development chat, in order, is in [chat.md](chat.md). Ready-made instructions for building the full site or a single section are in the [prompt library README](../README.md#how-to-use-a-build-prompt).

## How the site was made

Built with Claude Code over three days (14–16 October 2026), in about 56 prompts. Most of them were
short corrections; the site took shape in eight steps:

| Step | What we asked for | What changed |
| --- | --- | --- |
| 1 | A full brief: content, visual direction, tech stack, a "website builds itself" scroll animation, and the list of services to confirm before building | The first working site, with 22 services |
| 2 | Match the impact of the team's design previews, remove "white-label" wording, and avoid the generic AI look | Scroll-driven 3D and rewritten copy |
| 3 | Make it warm and human, one continuous story, with every technology from the previews | Hand-drawn icons, one story, 74 technologies |
| 4 | Show each technology working inside the background website, plus five themes to compare | The background website and the theme switcher |
| 5 | A written review of what was broken, turned into a rework plan | One 3D scene, one camera, a website that never leaves the screen |
| 6 | The brand blue as small accents, and options for the animation before building | Brand accents and the full-screen finale |
| 7 | Detail work: stack walkthrough, freight quote, simulator, orb, footer, a full UI check | The interactions in section 6 of the prompt |
| 8 | Sharp, interactive architecture cards | Texture-painted floor cards with eased hover |

### What made the prompts work

- **Start with a complete brief.** Content, look, motion, stack and a definition of done in one
  prompt, with a checkpoint ("show me the services list before building").
- **Name what's wrong and what you want instead.** "Remove the pill badges and the 46 / 74 counter;
  show each technology working inside the site" works far better than "make it less AI-looking".
- **Ask for a review, then a plan.** The biggest improvement came from pasting a critique ("what's not
  working") followed by a numbered rework plan.
- **Ask for options before a big change.** Comparing a few animated mockups first avoided building
  the wrong thing.
- **Be exact about small fixes.** Name the element and the problem ("the 't' in the footer isn't fully
  filled").
- **Ask for a full check after a batch of changes.** Screen sizes, overlap, build and lint; it caught
  four layout bugs.
- **Write the final result down.** The prompt below is the result of all of the above, written as
  one brief. Starting from it saves most of the back-and-forth.

---

# Build the WebsiteSoft marketing website

You are building the marketing website for **WebsiteSoft**, a web and software engineering company
founded in 2007, with engineers in London (UK hours) and a delivery team in India (a second shift).
Build it as a single-page Next.js site whose signature is one continuous, scroll-driven 3D story:
**a website builds itself on screen, goes live, and then grows into a complete running system**
while the visitor scrolls.

Work through the steps in order. After each step, run the site and check it before moving on.

## 1. Goal and positioning

- **Who WebsiteSoft is:** an engineering company that designs, builds and runs websites, CMS
  platforms (Sitecore, Umbraco, Optimizely, headless), custom .NET software, integrations and AI.
  It is **not** a white-label reseller or a marketing agency. Never use the words "white-label",
  "marketer" or "reseller".
- **Who the site is for:** heads of digital, product owners and operations directors at mid-size and
  large UK organisations that already run a website or CMS and need it rebuilt, connected, modernised
  or supported.
- **What the visitor should feel:** "these people are senior engineers, they are calm, and they will
  still be here years after launch".
- **Tone of the copy:** a confident senior engineer talking plainly. Short sentences. Concrete facts
  (weeks, numbers, named technologies). Warm and human, never salesy.
  - Banned words: unlock, elevate, seamless, cutting-edge, empower, revolutionise, next-level,
    synergy, leverage, world-class.
  - Use British English (colour, optimise, modernise).
- **The one idea behind the design:** "We build websites, so the page shows a website being built."
  Everything on the page serves that one story.

## 2. Tech stack and project setup

Use exactly these packages and versions (from `package.json`):

| Package | Version |
| --- | --- |
| next | 16.4.0 (App Router) |
| react, react-dom | 19.3.0 |
| typescript | ^5 |
| tailwindcss, @tailwindcss/turbopack | ^4 |
| three | ^0.186.1 (types: @types/three ^0.186.0) |
| @react-three/fiber | ^9.8.1 |
| @react-three/drei | ^10.7.9 |
| gsap (with ScrollTrigger) | ^3.15.0 |
| lenis | ^1.3.26 |
| eslint, eslint-config-next | ^9, 16.4.0 |

Setup rules:
- Next.js 16 has breaking changes from older versions. Read the docs in `node_modules/next/dist/docs/`
  before writing code, and follow any deprecation notices.
- Scripts: `dev`, `build`, `start`, `lint`. The site must run with `npm run dev` and build cleanly
  with `npm run build`, with no TypeScript or lint errors.
- Fonts come from `next/font/google`. Only the default theme's font is preloaded; the other themes'
  fonts load when a visitor switches to them.
- Folder layout:
  - `src/app`: `layout.tsx`, `page.tsx`, `globals.css`, `icon.svg`, `robots.ts`, `sitemap.ts`,
    and `api/contact/route.ts`
  - `src/content`: all copy and data (`site.ts`, `process.ts`, `services.ts`, `about.ts`, `work.ts`,
    `tech.ts`, `scenes.ts`, `themes.ts`), so text can be edited without touching components
  - `src/components/layout`: Header, Footer, Loader, SmoothScroll, StoryHud, ThemeSwitcher
  - `src/components/sections`: Story, Services, Work, Principles, Testimonials, Faq, Contact,
    ContactForm
  - `src/components/three`: the 3D scene, the camera "shot" solver and the scroll director
  - `src/components/site`: the fictional client website shown inside the 3D scene
  - `src/components/ui`: Button, Logo, Icon, SectionIntro, BrowserFrame
  - `src/lib`: GSAP setup, the shared story state, theme helpers

## 3. Design system

### Brand colour (taken from the WebsiteSoft LinkedIn brand)

- `--brand: #2f7cf6`, `--brand-cyan: #38c8ff`, `--brand-deep: #1f4fe0`
- `--brand-grad: linear-gradient(120deg, #38c8ff, #2f7cf6 55%, #1f4fe0)`
- Use the brand blue **minimally**, only for:
  - primary buttons (gradient fill, white text, soft blue shadow, brighter on hover)
  - the logo mark and the word "soft" in the logo
  - the cursor and caret that travel through the story, and the travelling dots on the floor
  - active highlights (the stack underline, active steps, the "Request quote" button)
- Never use it for large backgrounds or body text.

### Logo

A 26 × 26 px SVG: a slightly hand-drawn rounded square outline (current colour, 45% opacity), a
hand-drawn "W" stroke in brand blue, and a small brand-blue dot at the lower right. Next to it, the
word "Website" in the display font with "soft" in italic brand blue.

### Themes and the theme switcher

Five complete themes, set by `data-theme` on `<html>`. Each theme defines background, raised
background, surface, line, strong line, foreground, muted, subtle, accent, an "em" colour (italic
words), paper, ink, grid colours, a display font and a body font. **Monochrome is the default.**

| Theme | Background / text / accent | Display font + body font | Scheme |
| --- | --- | --- | --- |
| Monochrome (default) | `#0c0c0c` / `#f2f2f2` / `#ffffff` | Schibsted Grotesk (700, tight -0.045em tracking) for both | dark |
| Editorial | `#f6f3ee` / `#161412` / `#b3341c` vermilion | Newsreader + Source Sans 3 | light |
| Deep navy | `#0b1626` / `#eef1f6` / `#d6a85a` brass | DM Serif Display + IBM Plex Sans | dark |
| Ivory & black | `#f3ede0` / `#0e0d0b` / `#8c6a2f` antique gold | Bodoni Moda + Jost | light |
| Forest | `#0f1f17` / `#efe9db` / `#e2a052` amber | Fraunces (soft) + Figtree | dark |

- Map the theme variables to Tailwind v4 colour tokens (`bg-bg`, `text-fg`, `text-muted`,
  `border-line`, `bg-brand` and so on) with `@theme`, so every component uses tokens, never raw colours.
- Theme switcher: a round button in the header with three colour swatches and the theme name (name
  hidden below 1280 px). It opens a menu of the five themes, closes on Escape or an outside click,
  saves the choice in `localStorage` under `ws-theme`, and fires a `ws:theme` event so the 3D scene
  re-reads its colours.
- A tiny inline script in `<head>` applies the saved theme before first paint, so there is no flash
  of the wrong theme.
- The 3D scene reads all of its colours from the active theme's CSS variables.

### Typography and layout

- Display headings: the theme's display font, huge and tight (hero up to 12rem; chapter titles up to
  13rem). The last line of most headings is set in *italic* in the theme's "em" colour (`--t-em`). In
  Monochrome that is `#f2f2f2`, the same near-white as the text, **not grey**; only the italic style
  sets it apart.
- Labels: 0.74rem, 600 weight, 0.12em letter-spacing, uppercase, subtle colour.
- Numbers (01, 02…): display font, italic, accent colour.
- Container: max-width 92rem, side padding 1.25rem (mobile), 2rem (≥ 640 px), 3.5rem (≥ 1024 px).
- **Reading column** (`story-col`): on screens ≥ 1024 px it is `min(30rem, max(31vw, 21rem))` wide,
  on the left or right. The 3D website takes up the rest of the screen on the other side.
- Each section starts with a thin top rule, a number and a label, for example "02 · What we do".

### Icons

A custom hand-drawn icon set (24 × 24 SVG): slightly loose strokes, rounded ends, and one small
accent-coloured dot per icon. The strokes draw themselves in when they scroll into view. No stock
icon libraries.

## 4. Page structure, section by section

The page is one long scroll, in this order. Copy is given as it should appear.

### 4.0 Loader (first visit, motion on, JavaScript on)

A full-screen panel: "Websitesoft" in italic at top left, "Est. 2007 — London / India" at top right,
"Drawing the *first line*" in large display type at the bottom, with a counter running 000 → 100%
and a progress bar over 1.5 seconds. The lines then slide up, and the panel wipes away upwards and
starts the hero animation. A CSS fail-safe hides the loader after 6 seconds no matter what.

### 4.1 Header

Fixed at the top: the logo (links to top), nav links (Process, Services, Work, How we work, FAQ),
the theme switcher and a "Start a project" button. On mobile, a menu button opens a full-screen menu
that locks scrolling and closes on Escape.

### 4.2 Hero (section id `story`)

- Eyebrow (with a small pulsing accent dot): "Web & software engineering · London + India · Since 2007"
- Headline, three masked lines: "Software / that stays / *built.*"
- Lede: "We design, build and run websites, CMS platforms and custom software on Sitecore, Umbraco
  and .NET — and we still pick up the phone years after launch."
- One primary button: "Start a project" → `#contact`
- Scroll cue (desktop only): a thin animated line and "Keep scrolling. We'll build it while you watch."
- Entrance: eyebrow, then headline lines rising out of their masks one after another, then lede,
  button and cue.

### 4.3 The process: five pinned chapters

Each chapter is a 175vh-tall block with a sticky, full-height frame. The text sits in the reading
column on the left; the 3D build happens beside it. Each chapter shows: a big number (01–05), an
icon, "Title · When", a masked headline, a thin rule, a summary and three outputs labelled a., b., c.

| # | Title · When | Headline | Summary | Outputs |
| --- | --- | --- | --- | --- |
| 01 | Discover · Weeks 1–2 | A blank page / and the right / *question.* | Before anyone opens an editor we pin down what has to change, who it's for and how we'll know it worked. You meet the engineers who will write the code, not an account manager. | Goals and measures · Audit of what exists · A scope you can sign |
| 02 | Design · Weeks 2–4 | Structure / first. Style / *second.* | Content models and wireframes before colour. The layout locks to a grid, becomes a clickable prototype, and gets tested by real users before it gets built. | Content model · Wireframes · Clickable prototype |
| 03 | Build · Weekly releases | Every line / *read twice.* | We write our own code and nothing merges until a second engineer has reviewed it. You get a working build every week, not a status report. | Weekly builds · Peer review · Automated tests |
| 04 | Launch · Go-live | Go-live / should be / *boring.* | Redirects mapped, performance and accessibility measured, editors trained, cut-over rehearsed. By launch day the interesting part is already over. | Pre-launch QA · Zero-downtime release · Editor training |
| 05 | Support · Years, not weeks | Then we / *stay.* | Monitoring, patches and steady improvements from the team that wrote it. Or take it in-house whenever you like — the code is documented, and it's yours. | Uptime monitoring · Security patching · Continuous improvement |

Each chapter's text enters with scroll (number, label, headline lines, rule, summary, outputs) and
exits upwards as the next one arrives. All of it is scrubbed to scroll, so scrolling back reverses it.

### 4.4 Services: "02 · What we do"

Intro: "The page was / *the easy part.*" — "Behind it sit the CMS your editors live in, the devices it
runs on, the systems it talks to, the AI inside it and the platform that keeps it up. Keep scrolling:
the same site grows into all of it."

Then five chapters. Each one opens with its title filling the screen (a 170vh block; the title up to
13rem, centred, with a kicker above it), followed by its services in the reading column. Each
service row has a rule that draws in, a name that rises in, a short summary and a list of what it
covers. The text column alternates sides: Content left, Devices right, Integrations left,
Intelligence right, Live left.

**A · Content** — kicker "Your editors run it". Intro: "Websites on platforms your editors run
themselves. Changing a sentence should not need a developer."
1. **Sitecore & XM Cloud** — Sitecore platforms structured properly from the first template, ready to
   scale. *Templates & components · Multisite & multilingual · XM Cloud · Headless*
2. **Umbraco development** — New Umbraco builds, version upgrades and long-term support on .NET.
   *New builds · Version upgrades · Block Grid & doc types · Custom packages*
3. **Headless CMS** — One source of content feeding your website, apps and every other channel.
   *Content APIs · Next.js front ends · Omnichannel delivery · Editor preview*
4. **CMS setup & content architecture** — Content models and a clear content tree, so editors move
   fast and nothing breaks. *Content modelling · Reusable components · Roles · Editor training*
5. **Content management** — Multilingual, multi-site estates that stay organised as they grow.
   *Multilingual · Multi-site · Search & tagging · Umbraco · Sitecore · Optimizely*
6. **Workflows, permissions & governance** — Draft, review, approve, publish — with the right people
   at each step and a record of who did what. *Approval workflows · Role-based access · Audit trails ·
   Email & Teams alerts*
7. **CMS & site migration** — Moving platforms as a planned project, keeping content, integrations and
   rankings intact. *Content & media mapping · 301 redirects · SEO protected · Zero-downtime cut-over*

**B · Devices** — kicker "One product, every screen". Intro: "The same product on every screen: the
website, the web app, the phone and the desktop."
1. **Website design & build** — Considered UX, a responsive build and the technical SEO that helps
   people find you. *UI/UX design · Responsive build · SEO foundations · Speed & security*
2. **Web applications** — Portals, dashboards and booking journeys shaped around your users.
   *Customer portals · Dashboards · Booking journeys · Accessible UI*
3. **Mobile applications** — iOS and Android apps from a single codebase, ready for the app stores.
   *.NET MAUI · React Native · PWA · Offline support · Store release*

**C · Integrations** — kicker "Everything plugged in". Intro: "Custom software and the systems behind
the site, sharing the same live data."
1. **Custom software engineering** — End-to-end delivery: discovery, architecture, tested code and a
   clean handover. *Discovery & architecture · Tested code · Weekly releases · Documented handover*
2. **.NET & C# applications** — Modern .NET applications and desktop software — and upgrades from .NET
   Framework. *.NET 8+ & .NET Core · Framework upgrades · WPF desktop apps · Performance tuning*
3. **Back-end development** — The APIs, services and databases that quietly power everything else.
   *REST & GraphQL · Database design · Jobs & queues · Security & auth*
4. **API & systems integration** — Your website, CRM, ERP and payments sharing the same live data,
   automatically. *Forms to CRM · Product & price sync · Payment gateways · Monitoring & retries*
5. **Cloud & DevOps** — Hosting, pipelines and monitoring that keep things running — plus real-time,
   3D and WebXR builds. *Azure & AWS · CI/CD pipelines · Backups & recovery · Real-time · 3D · WebXR*

**D · Intelligence** — kicker "AI inside the same site". Intro: "AI added to the systems you already
run, with guardrails, review steps and a person making the final call."
1. **AI integration** — Search, chat and editor assistance connected to your CMS through a secure .NET
   layer. *Semantic search · Chat on approved content · Drafting, tagging, translation · Guardrails &
   cost control*
2. **AI tools** — Internal assistants and agents that take repetitive work off your team's plate.
   *Internal assistants · Task agents · Document & deck generation · QA bots*
3. **AI QA tool** (marked "In development") — Point it at a URL. It crawls, tests and hands back a
   short list of fixes ranked by impact. *Functional & responsive · Broken links & console errors ·
   Accessibility · Performance & SEO*
4. **Automation** — Workflows, syncs, tests and reports that run on their own, on schedule.
   *Workflow automation · System-to-system sync · Automated testing · Scheduled reports*

**E · Live** — kicker "Running for real". Intro: "Most of a system's life happens after launch. We
modernise what you have and keep it fast, secure and online."
1. **Legacy modernisation & transformation** — Keep what works, upgrade what doesn't — step by step,
   without starting again. *System audits · Framework → modern .NET · Process discovery · Cloud migration*
2. **Performance & accessibility** — Sites that load quickly and work for everyone, checked and kept
   that way. *Core Web Vitals · WCAG audits · Monitoring · Regular reviews*
3. **Support & maintenance** — Updates, patches, small changes and QA on every release, from a team
   that knows your code. *Updates & patches · Content & feature changes · Security reviews · Release QA*

That is **22 services**. Hovering a service shows its first technology at work in the 3D website.

### 4.5 Selected work: "03 · Selected work"

Heading "Real systems, / *real paths.*" with "Four projects from fields we know well, each built the
way you just watched. Client names are placeholders until approved." On desktop the section pins and
the four projects travel sideways (horizontal scroll driven by vertical scroll, with a thin progress
bar). Each project frame swings in from `rotateY(-24°) rotateX(6°) scale(0.84)` and settles flat as it
reaches the centre. On mobile the projects stack vertically. Each project has a sector, title,
summary, two results and a stack list, plus a drawn UI mock (no stock photos):

| Client (placeholder) | Sector | Title | Results | Stack |
| --- | --- | --- | --- | --- |
| Harbourline | Ferry & freight | A booking journey rebuilt for mobile | +34% mobile bookings · 1.4s largest paint | Umbraco, .NET, Next.js, Azure |
| Meridian Cover | Insurance | Legacy CMS to XM Cloud, rankings intact | 3,800 pages migrated · 0 ranking drops | Sitecore, XM Cloud, Headless, SEO |
| Apex Motion | Simulation | Control software and a 3D showroom | 60fps in-browser 3D · 1 shared codebase | WPF, C#, Three.js, WebXR |
| Calder & Finch | Property | AI search that understands what people mean | −58% zero-result searches · 100% answers sourced | Umbraco, Azure OpenAI, RAG, .NET |

Summaries: "A five-step booking flow cut to three, rebuilt on Umbraco and .NET with a Next.js front
end and live sailing availability." / "Twelve regional sites moved to Sitecore XM Cloud with approval
workflows, audit trails and every old URL redirected." / "A WPF desktop shell for driving simulators,
plus a browser-based 3D showroom that runs on headsets through WebXR." / "Semantic search and an
assistant that only answers from approved content, added to an existing Umbraco site — no rebuild."

### 4.6 How we work: "04 · How we work"

Label meta "Six rules, nineteen years". Heading "Small enough to / *know your code.*" Intro: "Build
cost is paid once. Ownership cost is paid every year after, so we make decisions for the years after
launch day."

**Six rules**, each lighting up word by word as it crosses the screen:
1. **We write the code we ship.** Fewer third-party packages means fewer surprises when someone else
   pushes an update. You get software we fully understand.
2. **Two engineers read every line.** Nothing merges until a second developer has reviewed it. It
   costs us a little time and saves you a lot of it.
3. **The engineer you brief builds it.** No hand-offs between sales, design and delivery. The people
   in the first meeting are the people writing the code.
4. **You own everything.** Clean architecture, documentation and a handover any competent team could
   pick up. No lock-in, ever.
5. **Your day, plus a second shift.** Senior engineers on UK hours and a delivery team in India, so
   work keeps moving overnight.
6. **AI advises. People decide.** We use AI where it measurably helps, with review steps built in. A
   person makes every call that matters.

**Four stats** that count up once: 19 "Years shipping software, since 2007" · 22 "Services, one team" ·
2 "Delivery hubs: UK and India" · 100% "Of code peer-reviewed before merge".

**The stack, all 74 of it** — a scroll-driven walkthrough (see section 6.2). 11 rows, in this order,
each with one featured technology (in bold):

| Row | Technologies |
| --- | --- |
| Content platforms | Sitecore, XM Cloud, **Umbraco**, Optimizely, Headless CMS |
| Front end | React, **Next.js**, TypeScript, WebGL, Three.js, WebXR |
| Back end & APIs | .NET, C#, **ASP.NET Core**, WPF, Node.js, Go, Rust, GraphQL, gRPC, REST APIs |
| Data | SQL Server, **PostgreSQL**, Redis, Kafka, ClickHouse, dbt, Snowflake |
| Business systems | **CRM**, ERP, Payments, Telephony, WhatsApp, Microsoft Teams |
| Mobile | Swift, Kotlin, **React Native**, Flutter, .NET MAUI, PWA |
| Applied AI | **OpenAI**, Anthropic, Azure OpenAI, Copilot Studio, LangGraph, PyTorch, vLLM, pgvector, Python, RAG |
| Automation & QA | **Playwright**, Temporal, Airflow, n8n, GitHub Actions, Power Automate |
| Cloud & infrastructure | Azure, AWS, GCP, Cloudflare, **Kubernetes**, Docker, Terraform, Pulumi, ArgoCD |
| Observability | **Grafana**, OpenTelemetry, Datadog, Metabase, Core Web Vitals |
| Security & identity | **OAuth / OIDC**, Vault, SOC 2 controls, OWASP ASVS |

### 4.7 Testimonials: "05 · In clients' words"

One quote at a time with numbered dot buttons to switch. Clearly marked as placeholders ("Client
name", "Company name").
- "They restructured our CMS instead of selling us a rebuild. Editors now publish in minutes, and our
  developers finally get to work on new features." — Head of Digital
- "The same two engineers were with us from the first workshop to launch day. When something came up,
  we spoke to the person who wrote the code." — Operations Director
- "The calmest go-live we've had. Every redirect was mapped and our search traffic didn't move." —
  Digital Product Owner

### 4.8 FAQ: "06 · Questions"

Heading "Straight *answers.*" with "The questions we hear most. If yours isn't here, ask. You'll get a
direct reply from an engineer." Native `<details>` accordions:
- **Do we actually need a new website?** Often, no. Restructuring your current CMS, connecting it to
  your other systems or adding AI to what you already have is frequently quicker and cheaper. We'll
  tell you which it is.
- **Can you take over an existing Sitecore or Umbraco site?** Yes. We upgrade, restructure and support
  existing Sitecore, XM Cloud and Umbraco platforms, and extend them with .NET where needed. We start
  with an audit so there are no surprises.
- **How do you add AI without risking our data?** Through a secure .NET layer with access controls.
  Only the data that's needed leaves your systems, answers are grounded in approved content, and people
  review output before it matters.
- **How long does a typical project take?** Discovery takes one to two weeks and you'll click through
  a prototype within a month. From there we release working software every week until launch.
- **What happens after launch?** The same team stays on for monitoring, patches and improvements. You
  can also take the code in-house at any time. It's documented and it's yours.

### 4.9 Contact and finale: "07 · Contact"

1. Intro in the reading column: label meta "Free proof of concept", heading "Bring us / *the hard
   part.*", text "Everything you scrolled past is running behind one website. The fresh tab beside
   you is for whatever comes next. Tell us what you run today and what has to change; an engineer will
   reply." and the email address as a large italic link (`enquiries@websitesoft.co.uk`), sized with
   `clamp()` so it never overflows its column.
2. A 160vh spacer during which the 3D "What should we build next?" tab zooms until it fills the
   whole screen (see 5.6).
3. The form card rises over it. **The card is as wide as the page container** (max 92rem, same side
   padding as every section). It has the raised background, a 1px line border, 2rem rounded corners and
   padding of 1.5rem (mobile), 2.5rem (≥ 640 px) or 3.5rem (≥ 1024 px). On ≥ 1024 px it is a 12-column
   grid: the intro takes 4 columns on the left and the form takes 8 on the right. It covers the option
   buttons on the tab behind it completely; nothing from the tab peeks out beside the card. The intro
   reads "Start with a *proof of concept.*" — "Not ready to commit? Meet the engineer who'd build it
   and see something working first. No charge." Below that come the UK hours and second shift details.
   The form:
   - Name * · Work email * · Company · "What do you need?" (multi-select chips: Website / CMS, Custom
     software, Integrations, AI, Support, Not sure yet) · "Tell us about it *" (placeholder "What you
     run today, what needs to change, any deadlines.") · "Send enquiry" button ("Sending…" while
     sending, then a "Received" confirmation).
   - `POST /api/contact` validates: name (1–200 chars), email (valid format, max 320), message
     (1–5000), up to 10 interests. It returns 400/422 with a plain-English error, otherwise
     `{ ok: true }`. For now it logs the enquiry on the server; a comment explains how to forward it to
     email or a CRM using environment variables.

### 4.10 Footer

Logo, "Web and software engineering since 2007. Websites, CMS platforms, custom software and AI,
built to be owned.", a Services column (the five chapters), a Company column (the nav links), a
Contact column (email, LinkedIn, "London, UK · India"), a huge wordmark "Website*soft*" across the
bottom, and a bottom bar with "© 2026 WebsiteSoft. All rights reserved." and "*Designed and
engineered in-house.*" The wordmark:
- No outline stroke (display fonts draw letters as overlapping shapes, and a stroke shows every
  hidden join).
- "Website" fills left to right from 7% to 22% foreground in 2.4 s. "soft" fills with the brand
  gradient in 1.6 s, starting 0.9 s after "Website" **starts** (so the two overlap).
- The italic "soft" gets 0.3em of right padding (with a matching negative margin) so the leaning "t"
  is filled completely.
- The fill **replays every time** the footer scrolls back into view, **for both parts**: "Website"
  and "soft" both reset instantly to empty once the wordmark is mostly off screen, and both play
  again when it is mostly on screen. Do this with a class (for example `is-in`) on the wordmark, added
  by an IntersectionObserver and removed again. Put the transition only on the `.is-in` state, so
  removing the class resets the fill with no animation.

### 4.11 Story progress line (HUD)

A small fixed line near the bottom of the screen that names what the background is doing right now:
Blank canvas → Grid → Wireframe → Design → Launch → Live, then the name of the current scene (for
example "Umbraco", "CRM · ERP · Payments"), then Work, How we work, Your project, Proof of concept.
The name slides in when it changes. It is hidden on the blank hero and once the finale fills the
screen.

### 4.12 SEO metadata

- Title "WebsiteSoft | Web & software engineering since 2007"; the description from section 1; locale
  en-GB; Open Graph and Twitter cards.
- Canonical `/`, `robots.ts`, `sitemap.ts`, and JSON-LD of type `ProfessionalService` (name, URL,
  email, founding date 2007, area served GB).
- Site URL `https://websitesoft.co.uk`. The theme colour is `#0c0c0c`.

## 5. The scroll story and the 3D scene

### 5.1 How it is wired

- **One fixed, full-screen WebGL canvas** (React Three Fiber, loaded client-side only), behind all the
  content. It has `pointer-events: none`, so the page stays scrollable and clickable.
- **One clock:** GSAP's ticker drives Lenis, ScrollTrigger, the story value and the 3D scene, so they
  never drift apart.
- **One story value `p`, from 0 to 14**, made by a "scroll director". Any element can claim a stretch
  of the story with `data-act="6"` (the value reached at the end of its stretch), plus
  `data-act-start` / `data-act-end` to set where the ramp starts and ends, and `data-dim` to dim the
  scene behind it. Between stretches the value holds still, so the scene never jumps or rewinds on its
  own. `p` eases towards the scroll target (rate about 3.2 per second).
- The `data-act` values the sections claim, in page order (the Services intro, "The page was the
  easy part.", claims none, so the story holds at 5 while it scrolls past): hero 0, process chapters 1–5, each
  service chapter title `start + 0.2` and its list `start + 1` (5–10), Selected work 11, How we work
  11.6, Testimonials 11.9 (`data-dim="0.4"`), FAQ 12.4 (`data-dim="0.6"`), contact intro 13, the
  finale spacer 13.6 and the form 14.
- Keep the shared state in one small module (`story`): `p`, target, dim, mouse position, reduced
  motion, the hovered scene and the stack scene.
- **One camera, one scene:** the grid floor, the site being built, the live website, the devices and
  the floor of systems all live in the same 3D world.

### 5.2 Story map

| p | Beat | What happens |
| --- | --- | --- |
| 0 | Blank canvas | A blinking brand-blue caret on an empty grid floor. Building starts within the first scroll; no dead space after the hero. |
| 0 → 1 | Discover / Grid | The caret becomes a cursor. It traces the page frame (top, right, bottom, left) and sweeps along the top as 12 column guides unroll. Small measurement notes are projected onto the page. |
| 1 → 2 | Design / Wireframe | Wireframe blocks (nav, headline, body, button, hero image, three cards, footer) drop in where the cursor places them, snapping to the 12-column grid. |
| 2 → 3 | Build | The blocks extrude, particles of "code" stream into them, and the finished design paints onto them (one canvas texture: each block shows its own part of it). |
| 3 → 4 | Launch | The page stands up and goes live. The cursor rests on the call to action while this happens. |
| 4 → 5 | Live / Support | The real HTML website takes over on exactly the same spot, pixel for pixel. Browser chrome (with URL bar) and a status bar unfold around it. **From here it never leaves the screen.** |
| 5 → 10 | Services chapters | Content (5), Devices (6), Integrations (7), Intelligence (8), Live (9). The site turns into each scene in turn. |
| 10 → 11 | Selected work | The site steps back, wider and turned 22°, and **fades to 15% opacity** (over 10.0 → 10.12, back to full over 10.9 → 11.05), so the project frames are the only thing you read. Nothing from the site may show through or beside the case studies at full strength. |
| 11 → 12.4 | How we work, testimonials | The site shows "One system, running" and replays events. The stack walkthrough drives it. |
| 12.4 → 13 | Your project | The site becomes a fresh, empty tab: "What should we build next?" |
| 13.05 → 13.6 | Finale | The fresh tab zooms until it fills the screen. |
| 13.6 → 14 | Proof of concept | The contact form rises over the full-screen tab. |

### 5.2a The build (p 0 → 4), step by step

The opening build is a **real 3D model**, not the HTML site. Build it with three.js meshes and lines,
and keep it **lying flat on the floor** (in the floor plane, facing up) until Launch. The camera looks
**down at it from a low, moving angle**; it is never seen head-on as a flat rectangle before p = 3.

- **The floor:** an infinite grid (drei `<Grid infiniteGrid>`), 0.5-unit cells and 3-unit sections,
  thin lines in the theme's `--t-grid` / `--t-grid-strong` colours (in Monochrome `#171717` /
  `#242424`, so it is barely visible), fading out with distance (fade distance about 90), plus scene fog
  in the background colour from about 22 to 68 units away. The floor must stay quiet: a texture, not
  a feature.
- **Camera stations** (field of view 32°), eased between whole values of p. Positions are
  [x, y, z], and the page lies flat at the origin:

  | p | Camera position | Looks at | What it shows |
  | --- | --- | --- | --- |
  | 0 | [0, 6.5, 15.5] | [0, 0.6, 0] | The caret on the empty floor |
  | 1 | [9.5, 8, 17] | [0, 0, 0] | A three-quarter view of the frame and columns |
  | 2 | [0.01, 21, 7.5] | [0, 0, 0.3] | Almost straight down onto the wireframe |
  | 3 | [-13, 8.5, 13.5] | [0, 0.6, 0] | A low view from the other side as blocks extrude |
  | 4 | [0, 4.4, 23] | [0, 4.0, 0] | Head-on to the standing page |

  On desktop, aim the camera past the subject so the page sits to the right of the text column. On
  narrow screens, dolly out (up to 2.4×) so it still fits, and aim it into the top part of the screen.
- **p = 0, the hero:** a brand-blue caret (a thin upright bar, 1.4 units tall, blinking about 1.6 times
  a second) stands on the floor. A thin brand-blue ring on the floor around it keeps expanding and
  fading every 2.6 seconds. It shrinks away as scrolling starts.
- **0 → 1:** the brand-blue arrow cursor traces the page outline (12 × 7.5 units) on the floor: top,
  right, bottom, left. Then it sweeps across the top as 12 column guides (filled strips with gutters)
  unroll. Small labels such as "1440 px wide" and "12 columns · 24 gutter" are projected next to it.
- **1 → 2:** solid light blocks (not outlines) drop onto the grid one after another, each where the
  cursor places it: nav bar, headline (two bars), body text, button, hero image, three cards, footer.
- **2 → 3:** the blocks extrude upwards into boxes, white particles of "code" stream into them, and the
  finished design paints onto their tops. Draw the whole design once on a canvas (logo, nav,
  "Software that stays built.", text lines, button, the hero sphere, three cards); each block shows its
  own rectangle of that canvas.
- **3.05 → 3.95:** the page stands up: it rotates from flat (−90°) to upright while rising to
  [0, 4.2, −0.6], and a base plate fades in behind it. The cursor rests on the call-to-action button.
- **4.3 → 4.6:** the HTML website fades in on exactly the same rectangle, and the 3D model is hidden
  once the HTML covers it (p > 4.62). Then the browser chrome and status bar unfold around it.

### 5.3 The website at the centre of the story

- It is a fictional ferry and freight company, **"yourbrand"** (`yourbrand.co.uk`), drawn as real HTML
  at a fixed 1280 × 800 px and placed in the 3D scene with drei's `<Html transform>`. Map it onto a
  12 × 7.5 world-unit rectangle, so 1 CSS px = 12/1280 world units. Centre it at **[0, 4.2, −0.4]**
  (bottom edge at y = 0.45). That is 0.2 units in front of where the 3D page finishes standing up
  ([0, 4.2, −0.6]), so the HTML cleanly covers the model. Use these same numbers everywhere.
  - Give `<Html>` a fixed portal container. Without one, the content can render empty.
- The client site has:
  - nav "yourbrand" with Sailings, Freight and a Contact pill
  - the headline "Software that stays built."
  - two text lines and a blue "Start a project →" button
  - a soft sphere as the hero image (a motif that returns in the assistant and the "live" signal),
    in a light grey rounded box. **Its colour is the theme's accent** (a radial gradient from the
    accent mixed with white to the accent mixed with black). In Monochrome it is white and grey.
    **Never brand blue.**
  - three cards: Sailings, Freight, Holidays
- **Size on screen:** the site fills the whole space beside the reading column: from the column edge
  plus a gap (max(40 px, 3% of the screen width)) to the screen edge minus max(16 px, 2.5%), and from
  96 px below the top to 80 px above the bottom, scaled to fit while keeping its 16:10 aspect ratio. On
  a 1440 × 900 screen it is about 900 px wide. Never leave it small in the middle of empty space.
- **The browser frame** has two parts. Browser chrome (44 px) shows three grey dots and the URL. A
  status bar (52 px) runs along the bottom. Between them is the working area: an optional tool panel
  on the left, the site in the middle (it narrows as panels open, by animating the panel width), and
  an optional panel on the right. Overlays sit on top of the site area only, never on the chrome or
  status bar. Each scene uses this layout:

  | Layout | Scenes |
  | --- | --- |
  | Left panel | Umbraco (400 px, dark navy backoffice), Sitecore (300 px, "Pages") |
  | Right panel | Headless (340 px), Agents (400 px), Models (400 px), Testing (360 px), Automation (360 px), Cloud (380 px), Monitoring (400 px) |
  | The site split in two | Optimizely (versions A and B side by side) |
  | Overlay covering the site area | Databases, Data pipeline, Freight quote (white pages), Your project (fresh tab) |
  | Floating window or card over the site | WPF simulator (760 px window, centred, site dimmed behind), Assistant (440 × 520 px chat, bottom-right), Security (420 px sign-in dialog, centred) |
  | Changes inside the site, plus toasts | Web, Mobile, Three.js, APIs, Messaging, Infrastructure, One system |

- The status bar names the technologies at work. **Technologies appear where they are used** (the
  CMS sidebar, the status bar, the model picker), never as a paragraph or a row of badges.
- **The cursor** (an arrow, brand blue) keeps working inside the site: clicking Publish, dragging
  components, typing questions. It is the same pointer that drew the grid at the start.
- Everything inside a scene is driven by `t` (0 → 1, how far through the scene the reader is), so
  scrolling back plays it in reverse.

### 5.4 Chapter transitions (full-screen)

**The chapter title screen** (the 170vh block in 4.4) is a sticky, full-height frame with its content
**centred vertically and horizontally**. Behind the title, a radial veil in the background colour (88%
opaque in the middle, fading to 55% at the edges) dims the full-screen site, so the title is always
readable. The title uses the normal foreground colour, with no blend modes. Above it: the chapter icon
and "Chapter 1 of 5 · 7 services". Below it: the kicker in italic. The title must have scrolled
completely off screen before the chapter's first scene starts. It must never sit under the header or
overlap the site in its side position.

Each chapter runs from `start` to `start + 1`:
- **0 → 0.074:** the previous scene holds while the chapter title rises.
- **0.074 → 0.104:** the site zooms until it fills the whole screen, behind the big chapter title.
- **up to 0.148:** it holds full screen, already showing the new chapter's first scene.
- **0.148 → 0.2:** it pulls back to its place beside the reading column, in its new form.
- **0.2 → 1:** the chapter's scenes, evenly spaced. The camera settles into each scene's framing over
  the first quarter of that scene.

### 5.5 The scenes, one per technology group (24 in total, covering all 74 technologies)

Every technology appears in exactly one scene.

**Content** (text on the left, site on the right)
1. **Umbraco** (`yourbrand.co.uk/umbraco`): a dark navy Umbraco backoffice slides in on the left. The
   cursor clicks the Headline field, which is retyped to "Spring sailings are open.", then clicks
   "Save and publish". The button turns green ("Published ✓") and the live headline changes with a
   brief blue flash. The camera dollies into the backoffice while it is edited and back out for the
   published page. Status: "Umbraco 13 on .NET 8 · Editing Home → Home published just now".
2. **Sitecore XM Cloud** (`pages.sitecorecloud.io/editor?site=yourbrand`): a Pages panel lists the
   components Hero, Promo, Cards and Footer. The cursor drags "Promo" into a dashed drop zone on the
   page, where it becomes a blue "20% off spring sailings" banner. Status steps: Draft → Approved →
   Published to Experience Edge.
3. **Optimizely** (`app.optimizely.com/experiments/hero-cta`): the site splits into versions A ("Find
   out more", dark button) and B ("Book a sailing", blue button). Their conversion bars grow to 3.1%
   and 4.6%; B wins and expands to full width. Status: "B rolled out to everyone".
4. **Headless CMS**: a content-entry panel on the right (Headline, Image). The headline changes once
   and ticks appear for Website, App and Kiosk, one after another: "One entry, every channel".

**Devices** (text on the right)
5. **React · Next.js · TypeScript**: the status bar steps through Committed → Built → Deployed, then a
   new search bar (Portsmouth · Caen · Fri 08:15 · Search) slides into the site. The camera pulls back
   to show the device line-up.
6. **Mobile apps** (Swift · Kotlin · React Native · Flutter · .NET MAUI · PWA): a tablet (768 × 1024)
   showing the responsive site and a phone (390 × 844) showing the app rise from the floor beside the
   site. A "Book faster in the app · Get the app →" banner appears. Status: "Building 4.2 → 4.2 live in
   both stores". The devices only appear in the web and mobile scenes.
   **Placement:** both devices are drawn at 0.55 of the site's pixel scale (1 CSS px = 0.009375 ×
   0.55 world units), so the tablet is 3.96 × 5.28 units and the phone 2.01 × 4.35. Their bottom edges
   sit on the same line as the bottom of the site (y = 0.45). There is a **clear gap** between each
   device and the site, and **no device overlaps the site**. Device centres, in world units:
   - **Phone, on the left:** x = −7.81 (its right edge is 0.8 units left of the site's left edge at
     x = −6), y = 2.63, z = 0.8, turned 0.16 rad (about 9°) towards the centre.
   - **Tablet, on the right:** x = 8.88 (its left edge is 0.9 units right of the site's right edge at
     x = 6), y = 3.09, z = 0.5, turned −0.12 rad (about 7°) towards the centre.

   The devices shot frames the box from the phone's left edge to the tablet's right edge, plus 0.2
   units on each side, so all three fit together.
7. **Desktop · WPF on .NET 8**: a "Simulator control" desktop window rises over the site. A tilted
   motion plate keeps moving in real time, and its **Pitch and Roll readings are large, high-contrast
   and update live** with the plate.
8. **Three.js · WebGL · WebXR** (`yourbrand.co.uk/configure`): the headline becomes "Build your
   cabin." A 3D cube spins in the hero; the cursor clicks three finish swatches (wood, sage,
   charcoal), then "View in headset" → "Viewing in headset".

**Integrations** (text on the left). The camera **tilts down about 30°** to the floor in front of the
site, where seven system cards lie, each connected to the site by a line:

| Card | Technologies | Scene |
| --- | --- | --- |
| API | .NET · ASP.NET Core · C# · REST · GraphQL | api |
| Services | Node.js · Go · Rust · gRPC | api |
| Databases | SQL Server · PostgreSQL · Redis | data |
| Data pipeline | Kafka · dbt · ClickHouse · Snowflake | streams |
| Business systems | CRM · ERP · Payments | business |
| Messaging | Telephony · WhatsApp · Microsoft Teams | comms |
| Infrastructure | Terraform · Pulumi · Docker | infra |

**Floor layout:** the site keeps standing upright where it is (centre [0, 4.2, −0.4], so its bottom
edge is 0.45 units above the floor; the status bar sits just above the floor). The cards
lie flat on the floor **in front of it**, at the same scale as the site (1280 px = 12 units), so each
card is 440 × 260 px = 4.1 × 2.4 units: about a third of the site's width, with titles you can read.
- The site stands at z = −0.4. The near row of cards is at z = 2.6, centred at x = −7.2, −2.4, 2.4
  and 7.2: API, Services, Databases, Data pipeline.
- The far row is at z = 5.8 (closer to the camera), centred at x = −4.8, 0 and 4.8: Business systems,
  Messaging, Infrastructure.
- Each card's line runs from its back edge, across the floor to the base of the site, then up into
  the window.
- The shot frames the box from x −9.6 to 9.6 and from 1.6 units below the floor to just above the top
  of the site, pitched down about 30°. The site fills the top half of the frame and the cards fill the
  bottom half. Nothing floats in empty space.
- No card may sit under the reading column. On narrower desktops (for example 1024 px), if the near
  cards at x = ±7.2 would end up behind the text, widen the framed box just enough that they don't.

Meanwhile the site shows its side of each connection:
9. **APIs** (`/book`): the search bar's "Book" button turns green ("Booked"), with a toast: "Confirmed
   in 84 ms".
10. **Databases** (`/account`): "Your bookings" with three trips; the load time drops from "38 ms,
    first visit, from the database" to "0.4 ms, second visit, from cache".
11. **Data pipeline** (`/ops`): a "Revenue by day" bar chart grows, and "This week" counts up to
    £1.24m with "↑ 12% on last week".
12. **CRM · ERP · Payments** (`/freight/quote`): a "Freight quote" form with five fields typed in one by
    one: Company "Harbour Foods Ltd", Email "ops@harbourfoods.co.uk", Route "Portsmouth → Caen", Cargo
    "12 pallets · chilled", Sailing "Fri 14 Nov · 08:15". All fields have a fixed height so nothing
    jumps. **The blue "Request quote" button is visible from the start**; the cursor clicks it and it
    turns green ("Sent ✓"). Then three results appear in turn: CRM "New lead · Harbour Foods / Assigned
    to Priya, freight sales", ERP "Order SO-10482 · £2,340", Payments "Deposit paid · £468". Tagline:
    "One enquiry. Every system gets it, nobody retypes it."
13. **Telephony · WhatsApp · Teams**: toast "Call routed to Bookings", a green WhatsApp bubble "Your
    08:15 sailing is confirmed.", a purple Teams card "Refund £86" whose button the cursor clicks:
    "Approve" → "Approved".
14. **Infrastructure**: "planning 12 resources" → "created 12 resources from code", with a toast:
    "Moved to new infrastructure. No downtime."

**Intelligence** (text on the right)
15. **Assistant** (`/help`): an "Ask yourbrand" chat panel rises. The question "Can I take my dog on
    the ferry?" is typed in; the answer "Yes. Dogs travel in pet-friendly cabins; add one when you book."
    appears with "Source: Pets on board". The model picker switches between Anthropic, OpenAI and Azure
    OpenAI. Status: "RAG over 4 approved pages in pgvector". The camera dollies into the chat.
16. **Agents** (`/claims`): "Claim #4471 · damaged luggage" works through Read the claim → Check
    receipts → Suggest payout → Hand to a person, ending with a Teams card: "Ready for your approval:
    £120 payout." (LangGraph, Copilot Studio)
17. **Models**: a "Claim triage model" loss curve falls, accuracy counts from 52% to 94%, then "Serving
    live" at about 1,840 requests a minute. (Python, PyTorch, vLLM)
18. **Testing**: Playwright runs in Chromium, Firefox and WebKit (6/6 each, "18 of 18 passed"), with a
    blue scan line sweeping the page.
19. **Automation**: a flow lights up step by step: New order → Invoice → Stock → Email → Done, ending
    with "Run 1,290 · nobody touched it". (n8n, Power Automate, Temporal, Airflow, GitHub Actions)

**Live** (text on the left)
20. **Cloud · Kubernetes**: visitors grow to ×3.0, the pods grow from 4 to 12, then "Response time
    steady". (Azure, AWS, GCP, Kubernetes, ArgoCD, Cloudflare)
21. **Monitoring**: the checkout response time spikes red ("Alert"), then "Fixed in 4 min"; Core Web
    Vitals tick green: LCP 1.2 s, INP 90 ms, CLS 0.02. (Grafana, OpenTelemetry, Datadog, Metabase)
22. **Security** (`id.yourbrand.co.uk/authorize`): a sign-in dialog types "sam@yourbrand.co.uk" and
    clicks "Continue with SSO", then toasts "Signed in as Sam" and "Secrets rotated · controls
    passing". (OAuth / OIDC, Vault, OWASP ASVS, SOC 2)

**After the chapters**
23. **One system**: the headline "Built to last. Changed in minutes." with a pulsing live dot; toasts
    cycle through "Headline published", "Booking confirmed in 84 ms", "Lead created in CRM", "Assistant
    answered, with source", "Scaled to 12 pods", "Secrets rotated". Status: "Content · Devices ·
    Integrations · Intelligence · Live — one system, running".
24. **Your project** (`your-project.co.uk`): a fresh white tab. "What should we build next?" types
    itself in; three dashed options fade in: "A website", "Software", "Something with AI". Beside it, in
    its own 260 px column, the **liquid orb** (see 6.4). Everything is centred in a 900 px grid, so it
    is balanced on 4:3 and widescreen displays alike.

### 5.6 The camera

- After launch, every moment is a **shot**: a box in the world to frame (the whole site, part of the
  site, the device line-up or the floor), the side of the screen it goes on, and a yaw/pitch angle.
  The camera is solved from the shot every frame so the box exactly fills the space beside the reading
  column (measured from the real DOM) at any screen size. Shots blend with eased mixing; nothing cuts.
- Small angles keep it alive: the site turns 5–10° towards the text, and the floor shots pitch about 30°.
- "Full" shots cover the whole viewport, keeping the site's aspect ratio.
- On mobile and portrait screens, the subject sits in the top 42% of the screen (at least 280 px
  tall), with 12 px margins, and the text sits below it on a solid card.
- Subtle parallax follows the mouse (none with reduced motion).
- Read and write camera vectors with their own dedicated objects; don't reuse one scratch vector for
  two jobs in the same frame.

## 6. Interactions

### 6.1 Floor cards (Integrations)

- **Sharp at any angle:** draw each card (rounded border, title, technology line) onto a canvas
  texture at 3× resolution with anisotropic filtering. Don't use HTML for them: HTML in CSS 3D blurs,
  and borders turn dotted at steep angles.
- **Draw order:** lines first, then the travelling dots, then the cards on top (cards ignore depth
  testing). A dot runs along its own line and is hidden under any card, never drawn over a card's text.
- **Travelling dots:** while a card's scene is on, brand-blue dots leave the card one after another,
  run up its line into the browser window, and repeat.
- **Hover:** because the canvas sits under the content and receives no pointer events, find the card
  under the pointer by ray-casting from the mouse position against the floor. Hovering a card:
  - lights that card (a highlight overlay fades in)
  - highlights its line
  - replays its dots from the card to the window
  - switches the site to that card's scene
  Moving onto a card takes over at once. Leaving waits about 260 ms, so crossing the gap between two
  cards hands over smoothly instead of flashing back to the scroll scene. All highlights ease in and
  out every frame; nothing switches abruptly.

### 6.2 Stack walkthrough (How we work)

- As the user scrolls, the row crossing the reading line becomes active. The active row is fully
  bright; other rows drop to 32% opacity.
- In the active row, the **featured technology** turns full foreground colour with a 2 px brand-gradient
  underline drawing in from left to right (0.7 s). The other names in that row turn subtle.
- The 3D site beside it shows that row's featured technology at work (Umbraco → the Umbraco scene,
  Next.js → the deploy scene, and so on), and scrolling through the row plays that scene's progress.
- **Hovering or focusing any technology name** hands the highlight to it: it gets the same white text
  and blue underline, the featured name steps back, and the site switches to that technology's scene.
  Each name is a button, so this also works with the keyboard.
- Rows are compact (about 24 px of vertical padding), with no badges, pills or counters.

### 6.3 Pinned and sticky sections

- Process chapters: sticky full-height frames inside 175vh blocks.
- Service chapter titles: 170vh blocks with the title filling the screen.
- Selected work: pinned on desktop, with horizontal travel scrubbed to scroll.
- Contact: a 160vh spacer for the finale zoom, then the form.

### 6.4 Live elements

- **Simulator:** the plate moves in real time while the scene is on (driven by time, not scroll).
  Pitch and Roll are shown in large, light, tabular numbers on the dark window.
- **Liquid orb:** as the reader scrolls on into the finale, the orb on the "What should we build
  next?" tab grows and its surface morphs into a slow, smooth liquid ripple (an SVG blob), keeping a
  soft white material, a highlight and a floor shadow that widens with it. It lives in its own column,
  so however big it gets it never covers the heading or the three option buttons. With reduced
  motion, it shows a static sphere.

### 6.5 Smaller details

- Masked headline lines rise into view. Each line has two wrappers (one for the entrance, one for the
  exit), so scroll-scrubbed timelines never fight over the same transform.
- Hand-drawn icon strokes draw themselves in when they enter the screen.
- Service rows: the rule draws, the name rises and the details fade in.
- Primary buttons: the arrow nudges right on hover.

## 7. Things to avoid

- Purple-blue gradients, glowing blobs, neon glows, glassmorphism cards, rows of stock icons.
- Pill badges and chips for technologies ("Joining the system now" and the like), stack counters
  ("46 / 74 connected") and progress percentages.
- Node-network animations (dots and lines connecting to a floating website).
- Code snippets, code editors or terminals in the background website.
- A small window in a corner, or empty and washed-out frames. The website takes up roughly 60–70% of
  the space beside the text and always looks full.
- Separate mockups per section. It is always the **same** website, changing.
- The same fade-up on every element. Each motion has a purpose.
- Lists of technology names in running text.
- Stock photos.
- Extra labels and counters that aren't in this prompt, such as "01 · The process", "02 / 05" or step
  counters in the HUD. Use only the labels given here.
- A bright, prominent floor grid. It is a faint texture that fades into the fog.
- Showing the opening build as a flat rectangle facing the camera, or as outlines only. It lies on the
  floor, the blocks are solid, and the design is painted on before it stands up (see 5.2a).
- The wording "white-label", "marketer" or "reseller", and the banned words in section 1.
- Text and 3D overlapping at any screen size.

## 8. Performance, accessibility and mobile

### Performance

- Aim for 60 fps.
- Load the 3D scene client-side only. Check for WebGL first, and fall back to the plain page without it.
- Re-render React only when the scene actually changes (round scene progress to a step). Per-frame
  motion is written straight to the DOM or three.js objects, not through React state.
- Preload only the default theme's font.
- Don't render invisible HTML objects: fade them in and out, and hide them completely at zero opacity.

### Accessibility

- Use semantic landmarks (`header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`) and a
  "Skip to content" link.
- Show visible focus rings (2 px accent outline, 3 px offset).
- Make all controls real buttons and links; the stack names and testimonial dots are buttons with
  labels. Mark the 3D canvas and decorative layers `aria-hidden`.
- **`prefers-reduced-motion`:** no Lenis, no loader, no scrubbed entrances, no parallax. The story
  value jumps straight to its target, the liquid orb is static, and all CSS animations and transitions
  are cut to near zero. Everything renders in its final, readable state.
- Without JavaScript, all content is visible. Motion styles only apply when a `motion-ok` class is
  added before first paint.
- Hydration:
  - Start the scroll-entrance observer only after the page has hydrated (fire a `ws:hydrated` event
    from the last component on the page), so React never meets a class it didn't render.
  - Put `suppressHydrationWarning` on `<html>` and `<body>`, because browser extensions add attributes
    to them.

### Mobile and responsive

- Breakpoints: 640, 768, 1024 and 1280 px.
- Below 1024 px, the text sits in a solid card (`bg/90`, rounded) at the bottom of the screen, and the
  3D website is framed above it.
- Tablet and phone layouts must not clip anything. The contact email wraps (`overflow-wrap: anywhere`).
- No horizontal page scrolling (`overflow-x: clip` on body).

## 9. Done checklist

The build matches this site when every item below is true. Check each one in a real browser.

**Build and code**
- [ ] `npm run dev` runs, `npm run build` succeeds, and `npm run lint` and TypeScript report no errors.
- [ ] The browser console shows no errors or hydration warnings (with extensions disabled).
- [ ] All copy lives in `src/content`; there are 22 services in 5 groups and 74 technologies in 11 rows.

**Look**
- [ ] The site opens in the Monochrome theme. The switcher offers all five themes, remembers the choice
      after a reload, and the 3D scene recolours to match.
- [ ] Brand blue appears only on buttons, the logo, the cursor and caret, the dots and active highlights.
- [ ] None of the things in section 7 appear anywhere.

**The story**
- [ ] The first scroll after the hero already starts drawing the grid; there is no empty screen.
- [ ] The page is built in 3D (grid → wireframe → design → launch), then the real HTML website takes
      over on the same spot and **stays on screen until the finale**.
- [ ] Each services chapter opens with the site filling the screen behind the title, then pulls back
      to the side opposite the text, and the side alternates from chapter to chapter.
- [ ] Every one of the 24 scenes plays as described in 5.5, and plays in reverse when scrolling back.
- [ ] At p = 0 a blinking blue caret with an expanding ring stands on a faint grid. From p = 0.5 to 3.5
      the page lies on the floor, seen from a low, moving angle: frame and columns, then solid blocks,
      then extruded blocks with the design painted on, then it stands up.
- [ ] On a 1440 × 900 screen the site is about 900 px wide beside the text, and its hero sphere is
      the theme accent (white in Monochrome), not blue.
- [ ] Each chapter title is centred on screen over a dimmed site, readable, and gone before the first
      scene; it never sits under the header.
- [ ] Each scene uses the layout in the table in 5.3 (left panel, right panel, overlay or floating window).
- [ ] The site fades right back behind Selected work.
- [ ] The phone (left) and tablet (right) stand clear of the site, with a gap and no overlap.
- [ ] The proof-of-concept card is as wide as the page container and hides the tab's buttons.
- [ ] The camera tilts down to the floor of seven sharp cards for Integrations, and shows the tablet
      and phone for Devices.
- [ ] "What should we build next?" zooms to full screen, then "Start with a proof of concept" rises
      over it.

**Interactions**
- [ ] Hovering a floor card lights it and its line, sends dots to the window and switches the scene.
      Moving between cards eases smoothly, and no dot ever covers a card's text.
- [ ] The stack walkthrough highlights one featured technology per row while scrolling; hovering any
      other name takes over the highlight and the scene.
- [ ] The freight quote shows five fields, the "Request quote" button is visible from the start, and
      the CRM, ERP and Payments results appear after it is sent.
- [ ] The simulator's Pitch and Roll numbers are easy to read and change live.
- [ ] The finale orb grows and ripples with scroll and never touches the heading or the buttons.
- [ ] The footer wordmark fills ("Website" grey, then "soft" blue, including the whole "t") every
      time you scroll back to it. **Both** parts empty out when you scroll away and refill when you
      return.

**Screens and accessibility**
- [ ] No text overlaps the 3D website at 390, 768, 1024, 1280, 1366, 1440 and 1920 px widths, or on a
      4:3 screen.
- [ ] With reduced motion turned on, the page is calm, complete and readable.
- [ ] The whole page works with the keyboard alone, with visible focus.
- [ ] The contact form rejects a missing name, an invalid email or an empty message with a clear
      message, and accepts a valid enquiry.
