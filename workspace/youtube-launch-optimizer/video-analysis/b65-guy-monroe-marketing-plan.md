---
id: b65-guy-monroe-marketing-plan
project_code: b65-guy-monroe-marketing-plan
title: Guy Monroe Marketing Plan
state: p11
created_at: 2026-05-10
updated_at: 2026-05-10
transcript_source: http://localhost:5101/api/query/projects/b65-guy-monroe-marketing-plan/export?format=text
transcript_hash: aa74b08482766dcceb1442dbb2b1f72770423fddc7dcc846d71f39d2726d0c70
transcript_word_count: 384
transcript_attached_at: 2026-05-10
---

# Guy Monroe Marketing Plan

## P01_CORE_IDEA

AppyDave walks through building an automated marketing outreach pipeline — using Claude Code and context engineering — to help charisma coach Guy Monroe research 150 plastic surgeons from public data, generate structured presence reports for each prospect, and iteratively refine the underlying prompts so Guy can efficiently identify and approach high-value coaching leads at scale.

## P02_KEY_VALUE

Viewers learn how to build an automated prospect research pipeline using Claude Code — turning a 150-person CSV of plastic surgeons into individual structured presence reports by designing iterative web-search prompts, organizing per-prospect output folders, and running a gap-analysis feedback loop that progressively refines prompt quality with each run, so a solo coach can produce 150 personalised outreach-ready dossiers without doing manual research one-by-one.

- Set up a per-prospect folder and file naming convention from a CSV source list inside Claude Code
- Build a web-search research prompt that extracts each prospect's public-facing data (YouTube, LinkedIn, media appearances, credentials)
- Use a gap-analysis feedback loop to identify missing data fields and automatically improve the prompt after each run
- Generate a combined presence report per prospect (contact details + online presence + coaching opportunity gaps) ready for personalised outreach
- Validate the full pipeline on neutral test prospects before running it across 150 real targets

## P03_HOOK_ANGLES

| # | Hook | Type |
|---|------|------|
| 1 | Automated 150 prospect research reports with Claude Code | Outcome promise |
| 2 | CSV list + context engineering = 150 personalised sales dossiers | Capability demo |
| 3 | Stop researching leads manually — let AI build 150 dossiers at once | Pain to solution |
| 4 | A charisma coach needed 150 custom outreach reports. Here's how. | Curiosity gap |
| 5 | Context engineering turns a prospect list into a full sales pipeline | Capability demo |
| 6 | Most coaches research leads one by one. This builds 150 at once. | Contrarian take |
| 7 | Are you still manually researching every prospect on your list? | Qualifying question |
| 8 | Built a full AI research pipeline for 150 plastic surgeon prospects | Scope statement |
| 9 | The gap-analysis loop that makes your AI prompts smarter every run | Process reveal |
| 10 | Solo coach → 150 warm leads in days using Claude Code | Outcome promise |
| 11 | If you have a niche prospect list, Claude Code can do the research for you | Identity callout |
| 12 | Why I use AI for prospect research instead of hiring a VA | Contrarian take |
| 13 | From spreadsheet to personalised outreach dossier — fully automated | Process reveal |
| 14 | Claude Code + web search = a tireless prospect research machine | Capability demo |
| 15 | The prompt feedback loop that self-improves as it runs 150 times | Curiosity gap |
| 16 | Expert coaches know who needs help. Now they can find 150 leads fast. | Identity callout |
| 17 | Building an automated lead qualification machine for a niche market | Problem-desire |
| 18 | Your cold outreach pipeline shouldn't be built by hand | Contrarian take |

## P04_AUDIENCE_HINTS

**Technical level: intermediate.** The video assumes viewers are comfortable opening a terminal, working with VS Code, handling CSV files, and writing natural-language prompts to Claude Code. No hand-holding on those fundamentals. At the same time, no custom code is written — the entire pipeline is driven through Claude Code prompts and folder conventions — so traditional software development experience is not required.

**Explicit audience:**
- Expert coaches and consultants who can assess a client in minutes but struggle to scale that expertise to a large prospect list
- Solopreneurs who already have a curated CSV prospect list and want to automate per-prospect research without hiring a VA
- People who have dabbled with ChatGPT prompt engineering for outreach but hit a ceiling on automation and repeatability

**Implicit audience:**
- Claude Code early adopters exploring context engineering for business workflows (not just code)
- Coaches, trainers, and service professionals in niche B2B markets (e.g., public speaking, charisma, executive performance) who are technically curious but not developers
- Anyone running manual lead research one-by-one who senses there must be a faster way
- Viewers already subscribed to AppyDave who follow Claude Code automation tutorials and are interested in real client use-cases rather than toy demos

## P05_IDENTITY_KEYWORDS

- **Claude Code** — the primary tool throughout; strong signal for the Claude Code early-adopter community
- **context engineering** — explicitly named in the intro and used to distinguish the approach from generic prompt writing; signals advanced LLM practitioner identity
- **prompt engineering** — referenced as what Guy had already done in ChatGPT; marks membership in the broader AI-for-business community
- **second brain** — mentioned as the destination for Guy's decision-point documentation; signals PKM / Tiago Forte productivity community
- **CLAUDE.md** — referred to as "the system prompt" and "the source of truth" for the workflow; signals Claude Code power-user identity
- **charisma coach** — Guy's specific niche and identity label; signals the executive-performance / public-speaking coaching community
- **charisma index** — Guy's proprietary scoring concept; tribal shorthand within his coaching methodology
- **scorecard** — the evaluation framework used to assess prospects; signals B2B sales-methodology and coaching-assessment communities
- **AppyDave** — the creator's brand; signals membership in the AppyDave subscriber community
- **dangerous permission** — Claude Code's `--dangerously-skip-permissions` flag; insider shorthand that signals Claude Code power users
- **solopreneur** — implied throughout (solo coach automating work without a VA); signals the indie-operator / one-person-business community
- **hot leads** — sales-pipeline language used to describe the 150-report output; signals B2B outreach and growth-hacking communities

## P06_AUDIENCE_CLASSIFICATION

| Term | Strength | Placement | Reasoning |
|------|----------|-----------|-----------|
| Claude Code | primary | title | Named in the intro as the primary tool and used throughout every chapter — the entire pipeline is driven through Claude Code. Drives title and thumbnail directly. |
| context engineering | primary | title | Explicitly called out in the intro sentence ("Today we're going to use Claude Code and Context Engineering") as the distinguishing methodology — not just prompt writing. Strong identity signal for advanced LLM practitioners. |
| gap analysis loop | secondary | badge | The iterative prompt-improvement feedback loop is the core technical innovation shown across chapters 8–9, but it supports the Claude Code / context engineering story rather than leading it. Badge-level signal for the "self-improving AI workflow" sub-community. |
| prompt engineering | secondary | badge | Referenced as what Guy had already done in ChatGPT — positions the viewer who's outgrown basic prompting. Present throughout but not the main subject; useful as a discovery/search badge. |
| CLAUDE.md | secondary | badge | Referred to explicitly as "the system prompt" and "the source of truth" kept in sync throughout the workflow. Strong insider tribal signal for Claude Code power users; too niche for the title. |
| dangerous permission | secondary | badge | The `--dangerously-skip-permissions` flag is mentioned by name as the way AppyDave normally runs Claude Code. Pure insider shorthand — tribal signal for Claude Code power users, not title material. |
| second brain | secondary | badge | Mentioned once as the destination for Guy's decision-point documentation. Signals the PKM / Tiago Forte productivity community. Too peripheral for title or thumbnail. |
| charisma coach | secondary | badge | Guy introduces himself as "the charisma coach" on camera. Signals the executive-performance / public-speaking coaching community as a use-case audience. The video is not primarily about coaching — it uses coaching as the worked example. |
| solopreneur | secondary | badge | Never spoken aloud but implied throughout (solo coach doing 150-prospect outreach without a VA). Signals the indie-operator / one-person-business community. Worth surfacing as a badge. |
| scorecard | secondary | badge | Part of Guy's evaluation workflow — mentioned in the scenario and workflow steps. Signals B2B sales-methodology and coaching-assessment communities but too embedded in the specific client workflow to drive placement beyond badge. |
| ChatGPT | secondary | badge | Positioned as the tool Guy had outgrown — mentioned as prior state. Signals the audience who've hit the ceiling of ChatGPT automation and are looking for the next level. Discovery value as badge. |
| hot leads | secondary | none | Used once ("150 really hot leads") as an aspirational output descriptor. Sales-pipeline language that signals the B2B outreach community, but too colloquial and vague for a title or structured badge. |
| charisma index | hidden | none | Guy's proprietary scoring concept. Mentioned in passing as part of his existing framework but never explained or demonstrated on-screen. No audience would search for or identify with this term from this video alone. |
| plastic surgeons | hidden | none | The specific niche of Guy's prospect list — not an audience identity term. Viewers are attracted by the automation method, not by an interest in plastic surgery. Niche detail useful in description but not placement. |

## P07_EMOTIONAL_TONE

The video carries a tone of **practical enthusiasm** — a grounded, confident "look what this can do" energy rooted in a genuine client scenario rather than hype or aspiration. AppyDave is solving a real problem for a real person on screen, which gives the content warmth and credibility. The viewer finishes feeling **capable and motivated**: the real-world framing (an actual coach, an actual 150-person list, an actual gap-analysis loop running live) makes the automation feel attainable rather than distant, and the methodical pacing signals that this is something they could build themselves.

- **Collegial warmth** — working with Guy Monroe as a genuine collaboration rather than treating him as a props-and-use-case, which humanises the tutorial
- **Methodical confidence** — step-by-step without hand-holding; the pacing respects the viewer's intelligence and signals competence rather than performance
- **Quiet excitement** — the gap-analysis feedback loop self-improving with each run is presented matter-of-factly, but the novelty lands as a genuine "aha" moment
- **Pragmatic optimism** — there is no fluff or grand promises; the closing sentiment is that this is a working system you can replicate, not a vision you should aspire to

## P08_TOPIC_KEYWORDS

- AI prospect research automation
- Claude Code workflow automation
- automated lead generation AI
- context engineering tutorial
- prompt engineering for sales outreach
- B2B lead research tool
- AI marketing pipeline
- gap analysis prompt optimization
- CSV to outreach automation
- web search AI agent

## P09_TAKEAWAYS

- You can build a 150-prospect research pipeline in Claude Code without writing a single line of code — just prompts, a CSV, and folder conventions.
- A gap-analysis feedback loop lets your AI prompts self-improve with every run, so the 150th report is more complete than the first.
- Context engineering isn't just prompt writing — keeping CLAUDE.md as your single source of truth is what makes the automation repeatable and scalable.
- A solo coach can produce 150 personalised outreach dossiers from a CSV prospect list without hiring a VA or doing manual research one-by-one.
- Always validate your pipeline on neutral test prospects before running it at scale — one real dry run surfaces more gaps than ten planning sessions.

## P10_QUESTIONS

**Questions posed (rhetorical / framing):**

- Are you an expert who can watch someone for 15 minutes and know exactly what to tweak or advice to give — but can't scale that expertise to 150 people? (opening hook framing the expert-coach problem)
- Could we have filled the gaps in the research ourselves by improving our prompts? (reflective question posed mid-workflow to frame the gap-analysis loop)
- Should the output be a separate fact sheet and presence report, or should they be combined into one document? (design-decision question posed to frame the consolidation choice)
- Does this doctor have useful digital presence, or should we mark them as insufficient and move on? (framing question surfaced during gap-analysis for the "no video content" scenario)
- Would the target client benefit from help with TikTok, social media, or online presence? (implied outreach-opportunity question surfaced from gaps in each doctor's presence report)

**Questions answered:**

- How do you automate prospect research for 150 people without hiring a VA or doing it manually one-by-one? (answered: build a Claude Code pipeline driven by a CSV, per-prospect folders, and a research prompt)
- How do you set up a consistent folder and file naming convention for a large prospect list? (answered: prefix each folder with a zero-padded index number, then the prospect's name in lowercase)
- How do you build a research prompt that extracts a prospect's public-facing data from the web? (answered: design an iterative prompt referencing the CSV fields, web search, and a fact-sheet/presence-report output schema)
- How do you improve a research prompt when it produces incomplete results? (answered: use a gap-analysis feedback loop — identify missing fields after each run, ask Claude to rewrite its own prompt to fill those gaps, then re-run)
- Should the AI output use a rigid template or a flexible guideline for formatting? (answered: guidelines only — templates constrain LLM output; use formatting conventions like section separators rather than fixed structures)
- How do you keep CLAUDE.md useful as a project scales without letting it bloat? (answered: keep it as the indexed system prompt and source of truth, updating it as folders and conventions change, but avoid embedding full prompt text inside it)
- How do you validate the pipeline before running it against 150 real prospects? (answered: test on neutral publicly available data — plastic surgeons from different countries not in the target list — then iterate before going live)
- What should a combined presence report contain? (answered: contact details from CSV + public online presence + recognition and credentials + identified gaps in digital footprint, all in one document)


## P11_UNIQUE_ANGLE

null

## P12_RELATED_SIGNALS

null
