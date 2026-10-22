# Prompt library

One folder per site, with the prompts used to build it with AI.

| Site | Build prompt | Development chat |
| --- | --- | --- |
| WebsiteSoft marketing site | [build-prompt.md](websitesoft-site/build-prompt.md) | [chat.md](websitesoft-site/chat.md) |

## What each folder contains

- **`build-prompt.md`**: one self-contained, step-by-step prompt that rebuilds the finished site from
  scratch with any AI coding tool. It covers the goal, tech stack, design system, page structure,
  animations, interactions, things to avoid, accessibility and a done checklist. It describes the
  final result, not the back-and-forth. At the top, a short summary of how the site was made and what
  we learned about prompting.
- **`chat.md`**: every prompt from the development chat, in order, rewritten in clear English, with a
  note on what each one changed. Use it to see how the site evolved and which prompts worked.

## How to use a build prompt

Use a fresh AI session (Claude Code, Cursor, Copilot, ChatGPT and so on) in an **empty folder**.
Give it only the build prompt: the part of `build-prompt.md` below the first `---` line. Don't give
it the original code or the chat file, or it will copy instead of following the prompt.

### Build the full site

Paste this, followed by the build prompt:

```text
Build this website from scratch in this empty folder, following the prompt below exactly. Work through the steps in order, run the site after each step, and at the end go through the "Done checklist" and tell me which items pass and which don't.

[paste the build prompt here]
```

### Build one section

Name the section and the parts of the prompt that describe it. For example, the "How we work"
section of the WebsiteSoft site:

```text
Using the prompt below, build only the "How we work" section (section 4.6, with the stack walkthrough in 6.2) as a standalone Next.js page. Use the same tech stack, design system and Monochrome theme. Skip the 3D scene; show a simple placeholder box where the website would be.

[paste the build prompt here]
```

Other sections work the same way. Use the section numbers in the build prompt: 4.2 hero, 4.4
services, 4.5 selected work, 4.7 testimonials, 4.8 FAQ, 4.9 contact, 4.10 footer.

### Check the result

Run both sites side by side, go through the Done checklist at the end of the build prompt, and note
anything that differs. Where the AI went wrong, make that part of the prompt more specific and test
again.

## Adding a site

1. Create `prompts/<site-name>/` with the same two files.
2. For `chat.md`, copy your prompts in order. In Claude Code, every session is saved as a transcript
   (`%USERPROFILE%\.claude\projects\<project-folder>\*.jsonl`). Rewrite them in clear English without
   changing their meaning, describe screenshots in a line, and summarise long pasted logs.
3. For `build-prompt.md`, describe the finished site from the code, not from the chat: exact versions,
   colours, copy and behaviour. Fold any fix that changed how the site works into the description.
4. Check it: an AI given only the build prompt should be able to build the same site.
5. Leave out anything private: passwords, keys, tokens, personal details and internal notes.
