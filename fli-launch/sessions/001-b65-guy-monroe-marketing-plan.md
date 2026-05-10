---
id: 001-b65-guy-monroe-marketing-plan
project_code: b65
internal_label: b65-guy-monroe-marketing-plan-context-engineering
status: completed
analysis_session:
content_session:
created: 2026-04-30
updated: 2026-04-30
---

# b65

## INPUTS

- **project_code**: b65
- **full_project_code**: b65-guy-monroe-marketing-plan
- **internal_label**: b65-guy-monroe-marketing-plan-context-engineering
- **focal_point_note**:
- **audience_keywords**:
- **related_videos**:

**Transcript** (26 segments, fetched from filesystem — FliHub API does not yet expose transcript text content):

**01-1-intro**: Are you an expert who can watch someone for 15 minutes and know exactly what to tweak or advice to give to take them to the next level? That's the superpower of an expert coach and today...

**01-2-intro**: In this video I want to show you how you could connect with 150 potentially target individuals and create maybe an outreach report or some sort of connection that gets you a foot in the door. Today we're going to use Claude Code and Context Engineering. I'm Happy Dave, let's get into it.

**02-1-scenario**: So a little bit of a back story. We're today working with Guy Munro and he is someone who I work with for my public speaking on YouTube and also a little bit of singing lessons and he came to me recently and said David I'd like to target this group of people they were plastic surgeons. I've already had a look at what they do online. They really do need a public speaking coach but I just don't know how to automate and reach out to 150 or more of these professional people. So I said to him why don't we use context engineering and see if we can automate the marketing workflow.

**03-1**: Now as you can see Guy has done a lot of work. He's put together a spreadsheet with 150 people that he would like to connect with and he's already done a lot of the useful work up front. He's done prompt engineering in ChatGPT. He's worked out the sort of charisma points and the scorecards that he needs to evaluate different people on. He's done a couple of variations of that. He's also gone and checked out a couple of the plastic surgeons online. He's worked out whether they're good or whether they're a little bit average. And from there he started building these reports and all these reports were done in ChatGPT. And after that he developed a couple of prompts so that he could potentially turn it into HTML. He's given me the HTML in a Word document which is a little bit difficult to work with. But I said to him, look, why don't we start again and let's see if we can automate the complete process for evaluating each of the 150 plastic surgeons going through and simplifying the process for him to evaluate them. Maybe in a couple of days time have 150 really hot leads.

**03-2**: So today we're going to work in Visual Studio and what I've done is I've downloaded all the documents he's given me. I've asked it to do a little bit of a flow chart for me. So if we have a look at it over here we can see that he has a lead generation phase where he's built his list of plastic surgeons in a CSV file. From there he started doing a little bit of research with a particular prompt that searches the internet and finds out individual information about each plastic surgeon. Now this is a bit of a slow process. It works really well, the prompts that he's done, but he's only done two at the moment to get detailed information. From there he uses a scorecard sort of system to work out. From there he then goes online and watches some of their videos to see what their charisma index is. And I also want to do it in such a way that if he wants to go and add his own video commentary for each of these doctors he can do that. We'll have a side by side placement in the report so that we can see the online presence of the original surgeon versus his opinion of some of the tweaks and changes that could happen.

**04-1-surgeon-list**: So to get started, what I want to do is leave these documents that I got from Guy in the raw folder, but I want to take some of the others and put them into a working directory for now. So I'm just going to go into Cloud Code and I'm going to paste in, can you take the custom documents and just organize them. And the great thing is, it was smart enough just to move the documents I'd been making myself, left all the raw ones.

**04-2-surgeon-list**: Now the first thing I want to do is take this really raw information that we've got here, come up with a little bit of a schema or a structure for what it should be and start segmenting out each doctor into their own folder, their own file. So Claude has come up with a schema, it understands the columns, the number of surgeons, the basic information that's going on here, it's even come up with some naming conventions that we could use for the file names.

**04-3-surgeon-list**: So we have a recommended file structure it's not quite what we want I'll just do a different prompt here can we get a different folder structure in that I would like each individual doctor to have their own folder I want them all to be prefixed with an indexed number so the first doctor would be zero zero one and then after that in lowercase just the name of the report.

**04-4-surgeon-list**: So as this was going along we ended up with this red and green area. If you see this what you're seeing is a comparison between an old structure and a new structure. The next thing it went on to do was to build this prompts and workflow document. The good thing is that Guy had already done a fair bit of work with ChatGPT around the prompts he wanted to get research information out of so we now have our own document here that we can go and look at.

**04-5-surgeon-list**: As we research each of the individual people, the doctors, we're going to build up a little bit of a fact sheet based on their public profile. From that, we'll be able to go through and do a bit of a scorecard, like do an assessment of whether they're good at public speaking, any challenges that they need to improve on. From that, we can create an assessment or a presence report. The presence report is currently saying markdown but we'll probably do it in a JSON structure so that it's much easier for future machine tools to generate stuff such as the HTML report or the PDF report.

**04-6-surgeon-list**: And so when we look at what it's currently got, we've got the idea of a fact sheet just being a placeholder for information, we've got the example that we could work with, one from England, one from Australia, just to see how well this system works out. After that, there's building the scorecard. And then finally, there'll be the Presence Report — all the information about where this particular doctor might show up in public appearances, any memberships that they might have, anything in the media.

**05-1-guy**: Now the next thing we're going to do is test this out with a couple of sample surgeons from other countries just to see how the information goes through. Now I've brought Guy in next to me to work with me.

**05-2-guy**: Hi, I'm Guy Minow, the charisma coach, and my work is about seeking out people that I can help with their charisma and their confidence and their public speaking. And with David's help, I'm able to locate those people, reach out to them and give them the support that they need.

**06-1-test**: So you've just heard from Guy. What I thought we'd do now is try and test out this system. I've just put in this prompt that says find me a couple of top plastic surgeons we want a couple in Sydney Australia and a couple in London and from that we'll take this information off the internet and put it into a new file we've called it testplasticsurgeon.csv and what we'll do is work through the two to four different plastic surgeons we've got to see if our prompts are actually accurate.

**06-2-test**: So the web search has gone off and found four plastic surgeons. We've got two from Sydney Australia, Jeremy Hunt and Ellis Choi, and we've got two from London. We've got phone numbers, we've got websites and we've got email addresses and this is just standard publicly available information. What we'd like to do now is go in deeper and find out what their YouTube presence is, their LinkedIn presence or any other sort of media information that might be available where we've seen them talking.

**07-1-update-claude**: So, I just want to point out a little house cleaning phase that I've done. I've gone and looked at the Claude document, which was a little bit out of date. It's now been brought up to date. So it worked out that the dots folder is the source of truth. The raw folder is where everything started from. It's not meant to be used anymore unless I explicitly ask for it.

**08-1-research-prompt**: Now, what I want to do is test how good this workflow is at maybe researching details about a surgeon, and we're going to work with the test surgeons first, which is all publicly available data. We know where to find it. We know that it's going to read the research prompt, and we can see that it's going to do a bunch of web search and fetch. It's identified a couple of blockers that might happen, such as it can't access the website, or the surgeon has no useful information.

**08-2-research-prompt**: So what we can see is that we've got two files being created. We've got the fact sheet number one and we've got the presence report number three. The idea here is that you need this basic information from the original CSV file plus the basic research before we can start doing an assessment and the assessment is the scorecard. This is where Guy would go in and have a look at videos, watch them and using the scorecard work out does this client or potential client need help in certain areas.

**08-3-research-prompt**: So, from here it's worked out and read through the documentation. And it's decided to come up with two options that we could try. I don't agree that it's two different purposes — I'll want all this information together if I was to do a report. I need the contact details if you're going to do an outreach, plus we need the presence information. So I've essentially told it to go with option B, which is combining into one.

**08-4-research-prompt**: So, the next thing I want to do here is I want to look at the master prompt. I actually want to check whether it's any good. I usually use this from the terminal with the dangerous permission which gives it full write access. Now for yourself, if you're doing this and you don't know what you're doing, you might want to check everything individually but you'll get a little bit more confident once you understand what Claude can and can't do.

**08-5-research-prompt**: So, we've got a basic report in Markdown around this particular person. The important thing for me is whenever I notice something like a gap, because with the gap, what we're trying to assess is could we have filled the gap ourselves by improving our prompts? I love this iteration process where you do something with a good prompt, but then you use feedback from the system to improve the prompt. And when you're doing something 150 times, which is the plan, we will get better over time.

**08-6-research-prompt**: Now, I've specifically told it to move on to the next surgeon rather than move on in the workflow, so we're moving on to number two, which is Dr. Ellis Choi, and it's doing a bunch of web searches at the moment. The reason for this is that we could move forward in the flow and perfect some things there, but it might be better to have really good starter prompts as we go.

**08-7-research-prompt**: And there it is finished. We've got the next doctor. We've got one red cross — just missing information, not a prompt failure. If we click over here, we can see information all collected around Dr Ellis Choi. And actually a bunch of gaps that maybe other areas that could be talked about in any sort of marketing document.

**08-8-research-prompt**: So I've just got it moving on to number three but as I did I asked it to just confirm wherever there was anything missing. It's given a complete list and given ideas for prompt enhancement. We can see a bunch of new updates happening for both the research prompt.

**08-9-research-prompt**: Now I just want to point out that it's still in the middle of doing all the research for the third surgeon but I've queued up ahead of time the next person so the fourth surgeon should get researched but at the same time I also said do a gap analysis on the prompt. So the great thing is as we're going we can move ahead with our searching while also backfilling each of the prompts with new information.

**09-1-outro**: So, at the conclusion of this, we've started to build a basic analysis tool using simple context engineering, Claude code to do some of the automation. As we were going, we're building out different prompt files, data files, and also statistic files to hold the different information. In the next video, what we'll do is, after we've done some human analysis on the data, we'll start building some context reports. I'm Appy Dave, see you in the next video.

## ANALYSIS

### 1. Core idea
How to use Claude Code and Context Engineering to build an automated prospect research and outreach pipeline — demonstrated live with real client Guy Monroe targeting 150 plastic surgeons.

### 2. Key value / promise
Viewers learn how to turn a raw spreadsheet of 150 cold leads into individual research reports, scorecards, and presence assessments — work that would take weeks manually, done in a couple of days with AI.

### 3. Hook angles
- "How to research 150 prospects automatically using Claude Code"
- "What a charisma coach + context engineering produces in one session"
- "The AI system that evaluates 150 surgeons so you don't have to"
- "From cold CSV to warm leads: automating expert outreach end-to-end"
- "Why prompt engineering isn't enough — context engineering is the upgrade"
- "I built a lead research machine in one live session"
- "How to find and reach 150 ideal clients with AI automation"
- "The coach's AI playbook: research, score, report, outreach — automated"
- "Stop manually researching prospects — here's the whole pipeline"
- "Real client work, real data: building Guy Monroe's outreach system"
- "The iteration loop that improves your prompts while they run"
- "From flat CSV to per-person HTML presence reports in one build session"
- "How a public speaking coach is using Claude Code to find 150 dream clients"
- "Building AI systems that get smarter as they process real data"
- "Context Engineering meets real business: the automated marketing workflow"

### 4. Audience hints
- Coaches and consultants who want to scale prospect outreach
- Claude Code users looking for real-world use cases
- Business owners who have a lead list and don't know how to work it efficiently
- AppyDave regulars (AI practitioners, developers building with Claude)
- People who have tried ChatGPT for research but hit limitations

### 5. Identity / tribal keywords
- Context Engineering (primary tribal term — David's core brand concept)
- Claude Code (tool identity)
- Prompt engineering (adjacent, positioned as the less sophisticated version)
- AI automation / marketing automation
- Second brain (implicit — system accumulates knowledge as it runs)
- Vibe coding (adjacent — live coding feel)

### 6. Audience classification
- **Automation**: Primary — the entire video is an automation build
- **BMAD**: Secondary — David's community is present in framing but BMAD is not the subject
- **AI Agents**: Secondary — the pipeline has agentic qualities but isn't framed as multi-agent
- **Founders**: Secondary — Guy Monroe is founder-adjacent; applicable but not the lens

### 7. Emotional tone
Empowering and practical. Collaborative energy — David and Guy working together iterating on a real problem. The viewer leaves feeling capable: "I could build something like this." Optimistic about AI applied to real business friction. The "messy but improving" iteration style makes it feel honest rather than polished.

### 8. Main topic keywords
- context engineering
- Claude Code
- AI outreach automation
- lead research automation
- prospect evaluation
- marketing automation
- AI-powered research pipeline
- business development automation

### 9. Key takeaways
- Claude Code + Context Engineering can automate research across 150+ prospects
- Start from existing materials (spreadsheets, prompts, docs) and let AI organise and extend them
- Prompt iteration — improve the prompt while it runs on real data — is more valuable than getting it right first time
- A scorecard + presence report system can be fully automated with the right structure
- Per-person folders + indexed files make AI-generated research browsable and machine-readable

### 10. Questions posed or answered
- How do you reach 150 targeted prospects without doing it all manually?
- Can AI automate research and evaluation of potential clients end-to-end?
- How do you build a system that improves its own prompts as it processes data?
- What's the practical difference between prompt engineering and context engineering?
- How do you turn a flat CSV of leads into structured per-person research reports?
- What happens when an expert coach pairs with AI automation?

### 11. Unique angle
Real client, real data, real friction. This isn't a tutorial with toy examples — it's David working live with Guy Monroe using Guy's actual spreadsheet of 150 plastic surgeons. The video shows the messy iterative reality (wrong folder structures, prompt gaps, live corrections) and frames that iteration as the *method*, not a mistake. Most AI tutorials show the happy path; this shows how you actually get there.

### 12. Related content signals
- **Explicit next video**: building context reports after human analysis of the research outputs
- **Claude Code series**: tooling overlap with any Claude Code tutorial
- **BMAD / context engineering**: conceptual throughline with David's core brand
- **Agent Workflow Builder**: pipeline and workflow automation theme
- **"Build with AI for a client" format**: recurring content pattern for David

## HOOKS

1. [capability_demo] **"How I automated research on 150 prospects in one session using Claude Code"** — shows the viewer exactly what becomes possible; the 150 number is concrete and surprising ✓ SELECTED
2. [problem_solution] **"You've got a list of leads. You have no idea how to research them all. Here's the fix."** — speaks directly to the pain of having a spreadsheet but no scalable process
3. [qualifying_question] **"Are you an expert who could transform someone's career in 15 minutes — but can't reach enough people to make that count?"** — opens with the intro hook verbatim; targets coaches with untapped scale
4. [i_tried_x] **"I built an AI outreach system live with a real client and real data — here's what actually happened"** — first-person, honest, signals authenticity over polished tutorial
5. [x_vs_y] **"ChatGPT prompts vs Context Engineering — why one of them scales to 150 people and one doesn't"** — positions David's approach as the upgrade; taps the existing ChatGPT audience ✓ SELECTED
6. [contrarian_take] **"Stop personalising outreach manually. AI can do it better at 150x the scale."** — challenges the conventional "personalisation takes time" assumption
7. [capability_demo] **"From a flat CSV to per-person HTML presence reports — fully automated"** — specific, technical, appeals to builders who want to know the end state
8. [only_one_worked] **"Guy had tried ChatGPT. He had spreadsheets. He had prompts. None of it scaled. This did."** — elimination framing; Guy's prior attempts are the foil ✓ SELECTED
9. [problem_solution] **"The research bottleneck that stops coaches from scaling their outreach — and the AI pipeline that removes it"** — names the bottleneck explicitly before offering the solution
10. [i_tried_x] **"I handed a charisma coach an AI research pipeline and watched what happened"** — collaboration framing; Guy's reaction is part of the story
11. [qualifying_question] **"Could you turn 150 cold leads into warm prospects in 2 days? You can now."** — capability framing as a question; the answer is already yes
12. [capability_demo] **"The iterate-while-it-runs technique — improving your AI prompts as they process real data"** — highlights the unique methodology; appeals to prompt engineers
13. [contrarian_take] **"A template will kill your AI research. Here's what to use instead."** — David explicitly avoided templates in the video; this makes that choice the hook
14. [x_vs_y] **"Manual research vs AI pipeline — 2 surgeons vs 150 surgeons, same effort"** — the scale contrast is the entire value proposition in one line
15. [problem_solution] **"You know who your ideal clients are. Getting in front of 150 of them is the problem. Context Engineering is the solution."**— bridges the gap between knowing your market and reaching it

## TITLES

- **Audience signal classification**: Context Engineering → Primary (title); Claude Code → Primary (title); Prompt engineering → Secondary (description/comparison only); AI automation → Secondary (description and tags); BMAD → Hidden (not this video's subject); AI Agents → Hidden (pipeline not framed as agent-based); Founders → Secondary (description only)

- **Hook 1 — capability_demo**: "How I automated research on 150 prospects in one session using Claude Code"
  1. How I Automated Research on 150 Prospects in One Claude Code Session
  2. I Used Claude Code to Research 150 Leads Automatically — Here's How
  3. Automate Prospect Research With Claude Code (150 Leads, One Session)
  4. Claude Code Automated 150 Prospect Research Reports — Step by Step
  5. How to Research 150 Ideal Clients Automatically Using Claude Code
  6. I Built an AI Prospect Research Pipeline in One Session — Full Walkthrough
  7. 150 Prospects, One Session: Automated Research With Claude Code
  8. How Claude Code Turns a CSV Into 150 Research Reports Automatically
  9. Context Engineering + Claude Code = 150 Prospects Researched Automatically
  10. From Zero to 150 Researched Leads: The Claude Code Pipeline That Did It

- **Hook 5 — x_vs_y**: "ChatGPT prompts vs Context Engineering — why one of them scales to 150 people and one doesn't"
  1. ChatGPT Prompts vs Context Engineering: Which Scales to 150 Prospects?
  2. Why ChatGPT Prompts Can't Scale Your Outreach (And Context Engineering Can)
  3. Context Engineering vs Prompt Engineering: The Difference When You Have 150 Leads
  4. ChatGPT vs Claude Code + Context Engineering — The Scaling Problem Explained
  5. Why Your ChatGPT Prompts Stop Working at Scale (And What Replaces Them)
  6. From ChatGPT to Context Engineering: How a Coach Reached 150 Dream Clients
  7. The Real Difference Between Prompt Engineering and Context Engineering at Scale
  8. ChatGPT Got Us Started. Context Engineering Got Us to 150 Prospects.
  9. This Is Why Context Engineering Beats Prompt Engineering for Outreach at Scale
  10. Prompt Engineering Has a Ceiling — Here's What Breaks Through It

- **Hook 8 — only_one_worked**: "Guy had tried ChatGPT. He had spreadsheets. He had prompts. None of it scaled. This did."
  1. He Had ChatGPT, Spreadsheets, and Prompts. None of It Scaled. This Did. ✓ SELECTED
  2. Why Nothing Worked for Guy's Outreach — Until We Built This AI Pipeline
  3. ChatGPT Wasn't Enough. Here's the System That Actually Scaled to 150 Leads.
  4. Guy Tried Everything. Only Context Engineering Got Him to 150 Prospects.
  5. The Outreach System That Worked When Everything Else Didn't
  6. When ChatGPT Isn't Enough: Building the AI Pipeline That Actually Scales
  7. He Had All the Tools But No System — Here's What Changed
  8. From Stuck to 150 Prospects: Why the Last Piece Was Context Engineering
  9. None of His Existing Tools Could Handle 150 Leads. This One Can.
  10. The AI Outreach System That Replaced Everything He Was Already Using

## THUMBNAILS

- **Hook 1 — capability_demo**
  - Concept A: Split screen — left: plain CSV spreadsheet with hundreds of rows; right: polished per-person folder structure with presence reports. Bold number "150" dominates. Text overlay options: "150 Prospects. 1 Session." / "Automated Research at Scale"
  - Concept B: David at terminal, progress counter ticking toward 150, Claude Code visible in background. Energetic, real-work feel. Text overlay options: "How I Research 150 People Automatically" / "Claude Code Does the Work"

- **Hook 5 — x_vs_y**
  - Concept A: Two-panel split. Left: ChatGPT box with red X label "STOPPED AT 10". Right: Claude Code terminal, green checkmarks, "150 ✓". Visual contrast is the message. Text overlay options: "ChatGPT vs Context Engineering" / "One Scales. One Doesn't."
  - Concept B: David pointing to two paths — one labelled "Prompts (stuck)" with dead-end arrow, one labelled "Context Engineering" with forward arrows. Direct to camera, casual. Text overlay options: "Why Prompts Stop Working at 150" / "The Upgrade That Scales"

- **Hook 8 — only_one_worked**
  - Concept A: Crossed-out stack of icons (ChatGPT logo, spreadsheet, prompt doc) with a single glowing pipeline system below. Elimination energy. Text overlay options: "He Tried Everything. This Worked." / "None of It Scaled. This Did." ✓ SELECTED
  - Concept B: Before/after. Left side: scattered disconnected tools, no system. Right side: 150 structured folders, clean pipeline. Text overlay options: "The System That Actually Scaled" / "When ChatGPT Isn't Enough"

## CHAPTERS

1. 0:00 — What If You Could Reach 150 Ideal Clients Automatically?
2. 1:45 — The Brief: Guy Monroe's 150 Plastic Surgeons Problem
3. 3:30 — What Guy Had Already Built (And Why It Wasn't Enough)
4. 5:15 — Organising the Raw Data: Schema, Folders, and Naming Conventions
5. 10:00 — Guy Monroe Introduces Himself and the Charisma Coach Vision
6. 12:30 — Test Run: Finding Real Surgeons With AI Web Search
7. 15:00 — Keeping the Docs Clean: Updating Claude's Source of Truth
8. 16:15 — Building and Iterating the Research Prompt on Live Data
9. 23:30 — What's Next: Human Review, Then Context Reports at Scale

## DESCRIPTION

- **Synopsis (above-fold)**: Guy Monroe, a charisma and public speaking coach, had 150 plastic surgeons to reach — and a pile of ChatGPT prompts that couldn't get him there. In this video, we build a complete automated prospect research pipeline using Claude Code and Context Engineering: CSV in, per-person presence reports out, at scale.

- **Chapters**:
  - 0:00 — What If You Could Reach 150 Ideal Clients Automatically?
  - 1:45 — The Brief: Guy Monroe's 150 Plastic Surgeons Problem
  - 3:30 — What Guy Had Already Built (And Why It Wasn't Enough)
  - 5:15 — Organising the Raw Data: Schema, Folders, and Naming Conventions
  - 10:00 — Guy Monroe Introduces Himself and the Charisma Coach Vision
  - 12:30 — Test Run: Finding Real Surgeons With AI Web Search
  - 15:00 — Keeping the Docs Clean: Updating Claude's Source of Truth
  - 16:15 — Building and Iterating the Research Prompt on Live Data
  - 23:30 — What's Next: Human Review, Then Context Reports at Scale

- **Related videos**: [RELATED VIDEOS — paste here]

- **Affiliate links**: [AFFILIATE LINKS — paste here]

- **Legal disclosure**: [LEGAL DISCLOSURE — paste here]

- **CTA**: [CTA — paste here]

- **Brand block**: [BRAND BLOCK — paste here]

- **YouTube keyword tags**: context engineering, Claude Code, AI outreach automation, prospect research automation, lead research AI, marketing automation AI, Claude Code tutorial, automated lead generation, AI for coaches, prompt engineering vs context engineering, AI marketing workflow, automated prospect evaluation, business development AI, AI automation tutorial, context engineering tutorial

## EXPORT

- **Title A** (selected — primary): He Had ChatGPT, Spreadsheets, and Prompts. None of It Scaled. This Did.
- **Title B** (A/B option): ChatGPT Prompts vs Context Engineering: Which Scales to 150 Prospects?
- **Title C** (A/B option): How I Automated Research on 150 Prospects in One Claude Code Session

- **Thumbnail direction** (selected — Hook 8-A): Crossed-out stack of icons (ChatGPT logo, spreadsheet, prompt doc) with a single glowing pipeline system below. Elimination energy. Text overlay: "None of It Scaled. This Did."

- **Description (YouTube-formatted)**:

  Guy Monroe, a charisma and public speaking coach, had 150 plastic surgeons to reach — and a pile of ChatGPT prompts that couldn't get him there. In this video, we build a complete automated prospect research pipeline using Claude Code and Context Engineering: CSV in, per-person presence reports out, at scale.

  0:00 — What If You Could Reach 150 Ideal Clients Automatically?
  1:45 — The Brief: Guy Monroe's 150 Plastic Surgeons Problem
  3:30 — What Guy Had Already Built (And Why It Wasn't Enough)
  5:15 — Organising the Raw Data: Schema, Folders, and Naming Conventions
  10:00 — Guy Monroe Introduces Himself and the Charisma Coach Vision
  12:30 — Test Run: Finding Real Surgeons With AI Web Search
  15:00 — Keeping the Docs Clean: Updating Claude's Source of Truth
  16:15 — Building and Iterating the Research Prompt on Live Data
  23:30 — What's Next: Human Review, Then Context Reports at Scale

  [RELATED VIDEOS — paste here]

  [AFFILIATE LINKS — paste here]

  [LEGAL DISCLOSURE — paste here]

  [CTA — paste here]

  [BRAND BLOCK — paste here]

- **YouTube keyword tags**: context engineering, Claude Code, AI outreach automation, prospect research automation, lead research AI, marketing automation AI, Claude Code tutorial, automated lead generation, AI for coaches, prompt engineering vs context engineering, AI marketing workflow, automated prospect evaluation, business development AI, AI automation tutorial, context engineering tutorial

## ACTIVITY_LOG

- 2026-04-30 — Session created. Status: `awaiting-input`.
- 2026-04-30 — Transcript fetched from FliHub filesystem (`/recording-transcripts/*.txt`). Note: FliHub API (`/api/projects/:code/transcript-sync`) returns sync status only, not text content — a dedicated text endpoint does not yet exist. Internal label derived: `b65-guy-monroe-marketing-plan-context-engineering`. Status advanced to `running-analysis`.
- 2026-04-30 — `fetching-transcript` agent updated with hybrid path (pre-loaded transcript check before API call). FliHub API gap logged: needs a `GET /:code/transcript-text` endpoint to expose content properly.
- 2026-04-30 — `running-analysis` complete. 12 analysis prompts run against transcript. Status advanced to `generating-hooks`.
- 2026-04-30 — `generating-hooks` complete. 15 hooks generated across 5 hook types. Status advanced to `awaiting-hook-selection` (Gate 2).
