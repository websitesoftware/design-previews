# WebsiteSoft marketing site: the development chat

Every prompt from the development of this site with Claude Code, 14–16 October 2026, in order
(54 prompts). Each prompt is rewritten in clear English with the same meaning and technical details.
Notes in *italics* describe screenshots, pasted logs and the result of each step.

To rebuild the finished site in one go, use [build-prompt.md](build-prompt.md) instead. ★ marks
prompts that worked especially well.

**Contents**

1. [The first build](#1-the-first-build)
2. [Making it look less AI-generated](#2-making-it-look-less-ai-generated)
3. [The background website and themes](#3-the-background-website-and-themes)
4. [One connected 3D story](#4-one-connected-3d-story)
5. [The finale, brand and animation options](#5-the-finale-brand-and-animation-options)
6. [Sharing the demo and the team's previews](#6-sharing-the-demo-and-the-teams-previews)
7. [Console warnings and the GitHub repository](#7-console-warnings-and-the-github-repository)
8. [Detail fixes](#8-detail-fixes)
9. [Hero ideas](#9-hero-ideas)
10. [Final checks and commits](#10-final-checks-and-commits)
11. [The architecture floor](#11-the-architecture-floor)

---

## 1. The first build

### Prompt 1: the brief ★

```text
You are building a marketing website for our company, WebsiteSoft, a web development agency.

## Reference prototypes

https://claude.ai/artifact/Uucf9u8ivPtVc1GJVTtWfH
https://claude.ai/artifact/PFrh3vHbpYgPeDZAAmAbYM
https://claude.ai/artifact/Ez1biTJBj8ynwr4gCni8rM
https://claude.ai/artifact/SbikkURLFfPhuwtXc7jnSa
https://claude.ai/artifact/JMPixgW1oMPeGRoj1xrVoR

For each link:
1. Visit it and study the page structure, section order and content strategy, and how it presents services, process, case studies, testimonials and calls to action.
2. Write a short summary of what works well, what doesn't, and any patterns worth adopting.
3. Don't copy their design, code, images or text. Use them as inspiration and write original content for WebsiteSoft.

## Content

The reference prototypes already list every service WebsiteSoft provides. Visit every link and extract the complete list of services, with what each one covers. Don't add services that aren't mentioned there, and don't drop any.

Then write original marketing copy for the site covering:
- Hero: a clear value proposition for a web development agency
- Services: every service found in the prototypes, each with a short original description
- Our process: discover → design → build → launch → support
- Selected work and case studies (realistic placeholders)
- Why us and our tech stack
- Testimonials (clearly marked as placeholders)
- A contact / call-to-action section and footer

Before building, show me the extracted list of services so I can confirm it's complete.

## Visual direction

The reference sites are too colourful. I want the opposite:
- A minimal, premium, modern look, like a high-end studio or developer-tool brand
- A mostly dark or neutral palette with one restrained accent colour
- Strong typography, generous whitespace and subtle grid and line details
- It should look polished and intentional, not like a template

## Signature animation: "the website builds itself"

We build websites, so the scroll experience should tell that story. As the user scrolls, show a website being built:
- Start with a blank canvas or grid → wireframe boxes appear → the layout snaps into place → typography and colours fill in → images and components load → a finished, live-looking page
- Tie each build stage to the content section it sits beside (for example, the "Design" step of our process shows wireframes, and "Build" shows code turning into UI)
- Add smaller touches elsewhere: code snippets typing in, cursor and selection boxes, components sliding into a layout, a browser window frame
- Keep the animations smooth (60 fps) and subtle rather than flashy, and respect `prefers-reduced-motion`

## Tech

- Next.js (App Router), TypeScript and Tailwind CSS
- GSAP with ScrollTrigger and/or Framer Motion for animation, and Lenis for smooth scrolling
- Install any other dependencies you need
- Fully responsive (mobile, tablet and desktop), accessible and SEO-ready (metadata, semantic HTML)
- A clean component structure, so sections can be reused and edited easily

## Deliverable

A complete, working demo I can run locally with `npm run dev`. It should look finished and ready to present. When it's done:
1. Run it, check every section at desktop and mobile widths, and fix any layout or animation bugs.
2. Give me a short summary of the design decisions, the list of sections, and how to swap in real content and images.
```

*Result:* Claude extracted 22 services and asked for confirmation (the answers: confirm the list, fold
3D into Cloud & DevOps, build in a new sibling folder), then built the first version of the site.

## 2. Making it look less AI-generated

### Prompt 2: match the design previews ★

```text
The current design looks AI-generated. Please revise it:

1. Remove every "white-label" and "marketer" reference from the site: copy, headings, metadata, everything. We are an engineering company, not a white-label reseller.

2. Go to https://websitesoftware.github.io/design-previews/04/ and scroll through the whole page at full-screen size. Our animation looks AI-made and has nowhere near that level of impact. Then go through the other previews (01, 02, 03, 05, 06 and 07 at https://websitesoftware.github.io/design-previews/) and study how their animation and design look on a full screen: the scroll-driven 3D scenes, camera movement, pacing, typography and overall polish.

3. Rework our animation and design so they are at least as strong as those previews:
   - Full-viewport, scroll-driven, cinematic motion (Three.js / React Three Fiber, GSAP ScrollTrigger and Lenis; install whatever you need)
   - Choreographed with purpose, not the same fade-up on every element
   - No generic AI-site look: no purple-blue gradients, glowing blobs, glassmorphism card grids or rows of stock icons
   - Copy that sounds like a confident senior engineer, with no AI clichés ("unlock", "elevate", "seamless", "cutting-edge")

4. Run it, check it at full-screen desktop and mobile sizes, fix any issues, then tell me what you changed and how our site now compares with the previews.
```

*Result:* a scroll-driven 3D build (React Three Fiber) and rewritten copy.

### Prompt 3: warm, human, one story

```text
I've seen the new design (screenshot attached). Here is my feedback, plus some new requirements.

The icons and typography still look AI-generated. I want them to feel warm, attractive and human: something that genuinely feels good to look at, not generic.

At the moment all the animations feel dull. I want one continuous scroll animation, from top to bottom, that tells a story. Add a website-building animation in the background that progresses with every scroll, so the site visibly builds itself as the user moves down the page. As it builds, it should show how all the complex technologies we work with connect together into one working system by the end of the page.

For the technologies, go back through all the design previews and collect every technology, platform and service they mention. Use that full list in the story, so each one appears at the right point and links into the rest.

On top of that, add content-specific animations wherever a section needs them. Everything should feel smooth and connected: one story from the first screen to the last, rather than separate effects for each section.
```

*Result:* hand-drawn icons, warmer type, one scroll-driven story and 74 technologies collected from the
previews.

### Prompt 4: moving to a new session

```text
I'm stopping the original session. Please take over the redesign here, and review its latest changes first.
```

*Result:* the work continued in a fresh session, which first reviewed what the old one had changed.

## 3. The background website and themes

### Prompt 5: technologies working inside the site, plus themes ★

```text
Replace the node-network animation. I don't want nodes and lines connecting to a floating website. Instead, the background website itself should change as the user scrolls, and show each technology actually working inside it.

For example, when the Umbraco section comes up, the background website should turn into an Umbraco experience: content being edited in the backoffice and published to the live page. Do the same for every technology we work with. Each one should appear inside the background website in a way that shows what it does, not just as a name or logo. It should look original and realistic, like a real product being built and changed, not a generic AI animation.

Remove the "46 / 74 connected" stack counter and the pill badges (the "Joining the system now" chips and similar tags). They look AI-generated. Present the technologies in a cleaner, more crafted way.

I also don't like the current colour theme. Create four or five classic themes for the site (for example: classic light editorial, deep navy, warm ivory and black, forest green, and monochrome), and add a theme switcher so I can compare them. Each theme should feel complete, with the typography, accent colour and background website animation all matching.
```

*Screenshot: the site at the time, with the node network and the counter.*
*Result:* a background browser window showing each technology at work, five themes (Editorial, Deep
navy, Ivory & black, Forest, Monochrome) and a theme switcher.

### Prompt 6: simpler, livelier, no overlap

```text
Revise the background scrolling website:

1. Simplify it. It changes too much content as I scroll, and there's far more text than a user can read. Cut the content down to a few clear visual cues per technology, so each change can be understood at a glance.

2. Remove the coding parts (code snippets, editors and terminals) from the background website entirely.

3. Make it more animated and interactive. At the moment it stays fixed in the same spot on the right. Move it around as the user scrolls (shift its position, scale, rotation and angle between sections) so it feels alive and guides the eye through the story. Add subtle interactivity too, such as reacting to the cursor or to hover.

4. Fix the overlapping content. On several screens, the text and the background website overlap. Make sure every section is readable at all common screen sizes, with no overlap between the foreground content and the background animation.
```

*Result:* simpler scenes with no code, a window that moves and reacts to the cursor, and an automated
overlap check at nine screen sizes.

## 4. One connected 3D story

### Prompt 7: review and rework ★

This prompt was a review of the site written with another AI chat; the review and the rework plan
were pasted in together.

```text
I've reviewed the whole site. Here is what I found, followed by the changes I want.

## Review

The process section (01 to 04) is the strongest part: a blank grid, then a wireframe, then the finished page. After that, the story falls apart.

What's not working:
1. The window is too small and too empty. In Services it takes up about a third of the screen, sits in one corner and is mostly blank (the headless CMS, the simulator and the AI window show almost nothing). In the Umbraco scene, the second window is cut off at the right edge.
2. The story breaks after "Then we stay". The website built through 01 to 04 fades out, and each service then gets its own small mockup. Nothing carries over, so it feels like separate slides.
3. There's dead space at the start. Right after the hero there are about two screens of empty grid with a faint ring, and that's exactly where people decide whether to keep scrolling.
4. The two worlds don't talk to each other. The 3D floor grid and the flat 2D browser windows move independently; there's no single camera.
5. The technology list is a paragraph. "On screen, in order: OpenAI, Anthropic…" in italics reads like a caption, not a showcase.
6. Some moments are washed out. In section 05 the window is so faded it looks broken.

## Ideas

- One hero object for the whole page. The website built in 01 to 04 should never disappear. It becomes the main character: it grows, moves and transforms through every service, so the user sees one product evolving from a blank page into a live system.
- A big, pinned stage. The window should take up 60 to 70% of the screen and stay pinned while the text scrolls past, like Apple's product pages. Alternate the text between left and right, so the window moves across the screen between chapters.
- One 3D camera. Put the grid floor and the window in the same Three.js scene. The camera dollies in to focus (for example, into the Umbraco backoffice), pulls back to show desktop, tablet and phone side by side for apps, and tilts down to the floor for architecture and integrations.
- A connecting thread. The red caret in the hero becomes a cursor that travels through the whole story. It draws the grid, drags in components, clicks "Publish" in Umbraco and types the question to the AI assistant. The red sphere can be a recurring motif too.
- Chapters as a build sequence: blank page → grid → wireframe → design → content (CMS: Umbraco, Sitecore, headless) → devices (web apps, mobile) → integrations (panels plugging in from APIs, cloud, data) → intelligence (AI working inside the same site) → live (traffic, uptime, the site running for real).
- Full-screen transitions. Between the big disciplines, the window zooms until it fills the screen and becomes the background of the next chapter, then pulls back into a new form.
- Technologies inside the window. Instead of a paragraph, each technology appears where it's used in the window: in the CMS sidebar, in a deploy bar, as the model name in the AI chat.

## The rework

Rework the site into one connected, smooth 3D story:

1. One hero object. The website built in sections 01–04 must never disappear. It stays on screen for the entire page and transforms through every service, so it reads as one product evolving from a blank page into a live system.

2. Make it big. The window should take up 60–70% of the viewport and stay pinned while the text scrolls past. Alternate the text between left and right from chapter to chapter, so the window moves across the screen. Nothing should be clipped at any screen size, and every screen should look full and intentional, never blank.

3. One 3D camera. Put the grid floor and the website window in the same Three.js / React Three Fiber scene, driven by scroll with GSAP ScrollTrigger and Lenis. Dolly in to focus on details (for example, inside the Umbraco backoffice), pull back to show desktop, tablet and phone together for apps, and tilt down towards the floor for integrations and architecture. All motion should be smooth and eased.

4. A connecting thread. The red caret from the hero becomes a cursor that travels through the whole story: it draws the grid, drags in components, clicks Publish in Umbraco and types into the AI assistant. Reuse the red sphere as a recurring motif.

5. Chapter order: blank page → grid → wireframe → design → content (CMS) → devices (web and mobile apps) → integrations (APIs, cloud and data panels plugging in) → intelligence (AI working inside the same site) → live (the site running for real).

6. Full-screen transitions between the major disciplines. The window zooms until it fills the screen, becomes the background of the next chapter, then pulls back into its new form.

7. Show each technology inside the window where it's used (in the CMS sidebar, the deploy bar, or as the AI model name), not as a paragraph of names.

8. Remove the empty space after the hero. Start building within the first scroll.

Run it at full-screen desktop and mobile sizes, fix any overlap or clipping, and tell me what changed.
```

*Result:* the current architecture. The built website stays on screen all the way down, inside one 3D
scene with one camera, across five chapters (Content, Devices, Integrations, Intelligence, Live).

### Prompt 8

```text
Commit the one-story 3D rework in websitesoft-site.
```

## 5. The finale, brand and animation options

### Prompt 9: the finale

```text
After this section (see the screenshot), when I scroll further down, I want the "What should we build next?" screen to expand to full screen with an animation, and then the "Start with a proof of concept" section to appear.
```

*Screenshot: the contact section, with the "What should we build next?" tab beside it.*
*Result:* the tab zooms to fill the screen, then the proof-of-concept form rises over it.

### Prompt 10: brand accents and animation options ★

```text
I've attached screenshots of our company LinkedIn page so you can see our brand theme: the colours, logo, typography and the style of our posts. Bring that theme into the current website, but keep it minimal. Use it for subtle accents (key highlights, buttons, the cursor and caret), not across the whole site.

I've also attached screenshots of the current website. For these screens, I want different variants of the background window animation. Give me a few distinct directions, shown visually as screenshots or quick mockups, so I can compare them and pick one before you build it.
```

*Screenshots: the WebsiteSoft LinkedIn page and posts (a blue-to-cyan W logo, navy, a bold sans
serif), and four screens of the current site.*
*Result:* brand blue on the buttons, logo, cursor and caret; five animated mockups of directions for
the window.

### Prompt 11

```text
Before making any changes, publish the variants as an artifact and show it to me.
```

*Result:* the five directions published as one page to compare.

## 6. Sharing the demo and the team's previews

### Prompts 12–15: a message for sharing the demo

```text
Write a message for sharing the marketing website. I'm sharing a video demo of it, so keep it to one or two sentences.
```

```text
No, present it as a concept and design for the marketing website, because it isn't the final selected design yet.
```

```text
Something like this: "Hi everyone, I've created this website design using Claude. Have a look and let me know your thoughts. Would love to hear your feedback!"
```

```text
Just say it's a concept design for the marketing website.
```

### Prompts 16–21: the team's design previews

```text
What is this? Just explain it to me first.
```

*Pasted: an internal team note about the redesign previews: where the previews and the private repo
live, and how to add your own design direction. Summarised here, not copied, because the note asks for
its links to stay inside the team.*

```text
Can we do the same, so that ours is published at a path like /myidea?
```

```text
Look at https://github.com/websitesoftware/design-previews and tell me: is this the repository link?
```

```text
So what happens to all of our code?
```

```text
Will all of my code be pushed to GitHub, every .tsx file and everything else, or only the preview?
```

```text
What have other people done?
```

*Result:* explanations only; nothing changed in the site.

## 7. Console warnings and the GitHub repository

### Prompt 22

```text
Forget the above; just commit all the work.
```

### Prompts 23–25: hydration warnings

```text
I'm seeing two issues in the browser.
```

*Pasted: two React hydration warnings from the browser console (attributes in the server HTML that
didn't match the client), plus a GSAP "target not found" warning and a three.js deprecation notice.*

```text
I'm still seeing two errors in Chrome.
```

*Pasted: the same hydration warnings again, this time pointing at the loader's "Websitesoft" text.*

```text
It's already open in Chrome in incognito mode.
```

*Screenshot: the site open in a Chrome incognito window.*
*Result:* the warnings were caused by a browser extension adding attributes to the page (extensions
can still run in incognito); the GSAP warning was fixed.

### Prompts 26–29: the new repository

```text
Push the code to this repository.
```

*Screenshot: a new, empty GitHub repository.*

```text
I've deleted the earlier repository.
```

```text
The repository is https://github.com/websitesoftware/websitesoft-site
```

```text
Go ahead.
```

*Result:* the project pushed to `websitesoftware/websitesoft-site`.

## 8. Detail fixes

### Prompt 30: footer wordmark

```text
Make the footer wordmark sharper and softer. Look at the edges of the "W" and the "e": they have stray lines. Make them clean.
```

*Screenshot: the footer "Websitesoft" wordmark with stray outline lines inside the W and e.*

### Prompt 31

```text
(Pasted error, no message.)
```

*Pasted: a hydration warning on the footer wordmark (`is-in` class added before React hydrated).*
*Result:* the scroll entrance animations now wait until the page has hydrated.

### Prompts 32–33: the stack walkthrough ★

```text
Rework the "The stack, all 74 of it" section into a scroll-driven walkthrough.

As the user scrolls, step through the stack one row at a time, in order: Content platforms → Front end → Back end & APIs → Data → Business systems → Mobile → and every row after that. For each row, highlight one featured technology: for example Umbraco for Content platforms, Next.js for Front end, ASP.NET Core for Back end & APIs, and so on for every row.

The highlighted technology should stand out cleanly: full white text, with a subtle underline or fill animating in. The other names in that row stay dimmed, and inactive rows stay quieter, so it's always obvious which technology the user is looking at. Keep it minimal, with no badges, pills or counters.

At the same time, the browser window on the right should change to show that technology at work, using the CMS and site build we already have. For example, Umbraco shows the backoffice editing and publishing the page, as it does now, and Next.js shows the same site being committed, built and deployed. Each step should flow smoothly into the next, so it feels like one site being built and evolving as you move down the stack, not separate slides.
```

*Screenshots: the stack list beside the browser window.*

```text
There's too much space between the rows of the stack.
```

*Screenshot: the stack rows with large gaps.*
*Result:* each row features one technology and drives the site; the rows are tighter.

### Prompt 34: freight quote

```text
For the freight quote, I want more content on the CMS screen. It already has Company and Email, but I'd like two or three more fields, and they should be relevant to a freight quote.
```

*Screenshot: the freight quote scene with only Company and Email.*

### Prompts 35–37: footer fill and the quote button

```text
The "t" isn't completely filled. Also, the fill animation only plays once: if I scroll up and then come back to the bottom, the fill transition doesn't play again.

For the CRM lead form above: at the moment the "Request quote" button appears only after every field is filled in. Instead, keep the button visible from the start; then it gets clicked and the request is sent.
```

*Screenshot: the wordmark, with part of the "t" in "soft" still grey.*

```text
The "t" at the end still isn't completely filled with blue. I also want the fill animation on both parts: "Website" should fill in grey and "Soft" in blue.
```

*Screenshot: the wordmark after the first fix.*

```text
I want "Soft" to play its fill animation in blue every time we scroll to the footer, as well.
```

*Result:* the wordmark fills "Website" in grey and "soft" in brand blue, the whole "t" included, every
time it scrolls into view; Route, Cargo and Sailing fields were added to the quote, the button is
visible from the start, and CRM, ERP and payment results appear once it's sent.

### Prompt 38: hovering the stack

```text
For this section, the pre-selected technology that each row stops on works well. What I want now: when users hover over another technology themselves, it should get the blue underline and become active, in the same way as the pre-selected highlight.
```

*Screenshot: the stack walkthrough with a featured technology highlighted.*
*Result:* hovering any name takes over the highlight and the scene.

## 9. Hero ideas

### Prompts 39–42

```text
Give me five or six more ideas for the hero animation.
```

*Screenshot: the current hero.*

```text
Show me more ideas.
```

```text
Show me a few more.
```

```text
Hmm. I'd like something that feels warm and pleasant, and relates to the idea of a journey.
```

*Result:* 23 animated hero ideas across four rounds, the last five warm and journey-themed (a winding
path, first light, setting sail, a constellation, a paper map). None has been built yet.

## 10. Final checks and commits

### Prompt 43: simulator and finale orb ★

```text
Two fixes:

1. Simulator control window (WPF on .NET 8): the Pitch and Roll numbers (-3°, -9°) are almost invisible, dark grey on a dark background. Make them clearly readable with high-contrast text, and animate them so they update live as the tilted plate moves.

2. The "What should we build next?" section: animate the sphere above the heading on scroll. As the user scrolls down, the sphere should grow bigger and its surface should morph into a smooth, flowing wave shape, like rippling liquid, while keeping its soft white material and lighting. The motion should be tied to scroll, smooth and eased, and the sphere should never cover the heading or the three option buttons. Respect prefers-reduced-motion with a static fallback.
```

*Screenshots: the simulator window, and the "What should we build next?" tab.*
*Result:* live, readable Pitch and Roll readings; a liquid orb that grows and ripples with scroll.

### Prompt 44: full check

```text
Run a full check of all the changes on this branch, and look for any broken or asymmetric UI.
```

*Result:* typecheck, lint, build and overlap checks; four layout fixes (stack wrapping at 1024 px, the
finale centred on 4:3 screens, the contact email fitting its column, devices timing).

### Prompt 45: default theme

```text
Make Monochrome the default theme when the project first runs.
```

### Prompts 46–48: commit and push

```text
Commit all the current changes and push them to GitHub.
```

```text
On GitHub, the commit "Polish stack walkthrough, finale and live scenes; default…" shows two authors: me (ripudaman-websitesoft) and Claude. Remove Claude.
```

*Result:* the commit messages were rewritten without the AI co-author line.

```text
GitHub is showing "Compare & pull request". Should I create the pull request and merge it?
```

*Screenshot: the GitHub banner offering to compare and open a pull request.*

## 11. The architecture floor

### Prompts 49–50: sharp cards

```text
Create a new branch, then look at this: the text and borders of the cards (API, Services, Databases and so on) aren't sharp. When I zoom in, everything looks clear.
```

*Screenshot: the Integrations floor with blurry cards.*

```text
The card borders still look dotted, and the text inside the cards still isn't sharp.
```

*Screenshot: the cards close up.*
*Result:* the cards are painted as 3D textures instead of HTML, so they stay sharp at an angle.

### Prompts 51–52: travelling dot and hover ★

```text
The architecture section looks good. Two changes:

1. Fix the travelling dot. The dot that moves along the line towards the window is drawn on top of other cards. In the screenshot it sits over the Services card, covering its content. It should stay on its own connection line, run behind the cards or be clipped to the line's path, and never overlap a card's text.

2. Make the cards interactive. When the user hovers over any card (API, Services, Databases, Data pipeline, Business systems, Messaging, Infrastructure), replay that card's connection animation: highlight its line and send the travelling dot from the card up to the browser window.

By "dot" I mean the travelling dot.
```

*Screenshots: a dot drawn over the Services card.*

```text
The animation doesn't ease in and out smoothly when I move from one card to another.
```

*Result:* the cards cover the lines and dots; hovering a card replays its connection; the highlight eases
between cards.

### Prompt 53

```text
Commit the changes with a commit message, and do nothing else.
```

### Prompt 54: HTML in the terminal

```text
Why am I seeing this HTML in the terminal?
```

*Pasted: the `npm run build` output, then the dev server log with a hydration warning about
`cz-shortcut-listen` on `<body>`.*
*Result:* explained (the ColorZilla browser extension adds that attribute); `<body>` now ignores
attributes added by extensions.
