# Six More Tips for Better Coding With Agents (March 2026 Edition)

*This one's for a friend who sent me Steve Yegge's [Six New Tips for Better Coding With Agents](https://steve-yegge.medium.com/six-new-tips-for-better-coding-with-agents-d4e9c86e42a9) and proudly declared it fresh and relevant. That article was published in December 2025. It's now March 2026. In AI time, that's roughly three geological epochs. The advice still holds — go read it — but a lot has happened since.*

-----

I've been living inside Claude Code essentially full-time for the past few months, and I've watched the whole agentic coding ecosystem grow up around it at a dizzying pace. New tools drop weekly. Best practices that were cutting-edge in December are table stakes now. The people who are really flying have moved on to a whole new set of patterns, and the gap between them and everyone else is widening fast.

Steve's six tips were great. The Rule of Five, swarm where you can, code health as a first-class concern — all still true, all still worth following. But there's a second layer of technique that's emerged on top of that foundation in just the past few months. Here's what I've noticed.

-----

**1. Git Worktrees Are the Single Biggest Productivity Unlock Nobody Is Using**

If you're still running one Claude Code session at a time — waiting for it to finish before you start the next task — you are leaving an enormous amount of throughput on the table. The fix is sitting right there in your Git installation, ignored since 2015: worktrees.

A git worktree lets you check out multiple branches of the same repo into separate directories simultaneously. They share one `.git` folder, so there's no disk waste, no state drift, no "which clone is current" confusion. And in the age of agentic coding, they are absolutely transformative.

Here's what the workflow looks like. You have a bug to fix, a feature to add, and a set of tests that need to be written. Normally you'd sequence these. With worktrees, you spin up three directories — `fix/pagination`, `feature/auth`, `add/api-tests` — launch a Claude Code agent in each, and go make coffee. You come back to three finished branches ready for review.

Boris Cherny, who built Claude Code at Anthropic, calls worktrees his number one productivity tip. He runs three to five simultaneously on a regular basis. That's the guy who made the tool telling you how he uses it. The signal doesn't get clearer than that.

The gotchas are real but manageable: each worktree needs its own `npm install`, shared databases can cause race conditions between agents, and IDE support is still catching up (VS Code only added native worktree support in mid-2025). There's already a small ecosystem of tooling — `git-wt`, Superset IDE (which launched in March 2026 and hit the GitHub trending list almost immediately) — building on top of this primitive to make it less manual.

The fundamental point stands regardless of tooling: sequential agent execution is a bottleneck that you don't have to accept. The technology to run five agents in parallel has been in Git since the Obama administration. Start using it.

-----

**2. Your CLAUDE.md is Probably Bloated and Actively Hurting You**

Everyone knows you need a CLAUDE.md. The problem is that almost everyone's CLAUDE.md is too long, too vague, and stuffed with things that belong in a linter config, not an agent prompt.

Here's the uncomfortable truth: frontier models can follow roughly 150 to 200 instructions with reasonable consistency. Claude Code's own system prompt already uses around 50 of those slots before you write a single line. That means your CLAUDE.md is competing directly with the agent's core behaviors for a limited attention budget.

Every line you add is a line fighting for cognitive space. And the most common things people put in these files — code style rules, formatting preferences, obvious architectural notes — are exactly the wrong things. LLMs are in-context learners. If your codebase consistently uses named exports and two-space indentation, the agent will pick that up from looking at a few files. You don't need to tell it. Use a linter. That's what linters are for.

What you *do* need in CLAUDE.md: the one-line project summary, the non-obvious gotchas that would cost a new engineer a week to discover, your deployment and testing commands, and any architectural decisions that are deliberate but counterintuitive. Keep it under 300 lines. The 300-line target isn't arbitrary — it's about leaving enough context window for the actual work.

The other thing that's emerged in the past few months is the concept of progressive disclosure through skills. Instead of dumping everything into CLAUDE.md upfront, you write skills that get loaded on demand when relevant. A SKILL.md in your `src/auth/` subdirectory loads automatically when the agent is working on auth code, and not before. The main CLAUDE.md stays lean. The specialized context shows up exactly when it's needed. This is the right architecture.

One more thing: if you're using multiple AI tools — Cursor, Copilot, Gemini CLI, all of which have their own config file formats — don't copy-paste the same instructions into five different files. Maintain an `AGENTS.md` as your source of truth and point the tool-specific files at it. Your future self will thank you.

-----

**3. The Interview-First Pattern Changes Everything**

Steve's tips focused heavily on what happens during and after implementation. Here's a tip for what to do before.

Stop telling your agent what to build. Start asking it to interview you.

It sounds weird. But the pattern from Anthropic's own docs goes like this: you give Claude a one-line description of what you want — "I want to build a payment processor integration" — and then you say: *interview me using the AskUserQuestion tool. Ask about the hard parts I haven't thought through. Don't ask obvious questions. Keep going until we've covered everything, then write a spec to SPEC.md.*

What happens next is genuinely surprising the first few times. The agent asks about edge cases you hadn't considered, surfaces tradeoffs you were going to have to discover the hard way, and forces you to make architectural decisions upfront instead of mid-implementation. Then you take that spec and start a fresh session to actually build it.

That "fresh session" part matters a lot. The spec session accumulates a lot of context about what you were *considering*. The implementation session only needs to know what you *decided*. Separating them keeps the implementation context clean and focused. It's the same principle behind Steve's swarming advice — context isolation improves quality.

The interview pattern also surfaces something deeper: most of the bugs agents produce aren't coding mistakes. They're spec mistakes. The agent built exactly what you described, but what you described wasn't quite what you meant. The interview-first pattern catches that gap before any code gets written.

-----

**4. Context is Infrastructure. Manage It Like Infrastructure.**

This one connects several threads from Steve's article into a single principle.

Context window management is not a prompting trick. It is the central engineering discipline of agentic development. The shape of your context — what's in it, in what order, at what point in the session — determines almost everything about output quality.

A few things have crystallized in the past few months:

*Use `/clear` aggressively.* Between different tasks, clear the context. Don't let the agent carry over mental state from one problem into the next. The cognitive equivalent of "that old fix we tried earlier" showing up in new code is a real failure mode.

*Use subagents to isolate expensive reads.* If you need a security review, don't do it in your main session after it's already filled with implementation context. Spawn a subagent with a clean context, a specialized system prompt, and access only to the tools it needs. Claude Code supports this natively now — you define subagents in `.claude/agents/` with their own models, tools, and permission scopes. A Haiku-grade subagent doing a grep-heavy code scan is both faster and cheaper than Sonnet doing it in a context already cluttered with a long conversation.

*The writer/reviewer pattern is underused.* Have one agent write the code. Have a separate agent — fresh context, no idea what the first one was thinking — review it. The reviewer will find things the writer can't find, because the writer is anchored to its own implementation decisions. This mirrors how good engineering teams work, and it works for the same reasons.

Taken together, these aren't separate tips. They're facets of one principle: context is infrastructure. Design it. Don't let it accumulate passively.

-----

**5. Hooks Turn Your Agent From a Freelancer Into an Employee**

Claude Code hooks were the feature I slept on the longest, and I was wrong to.

Hooks are handlers that run outside the agentic loop in response to specific events. Pre-tool-use. Post-tool-use. On stop. They're scripts or HTTP calls that fire when the agent does something, and they can inspect or redirect what's happening.

The obvious use case is enforcement: run your linter and formatter automatically after every file edit, before the agent even has a chance to move on. No more "please also run prettier" in your prompts. No more formatting drift in vibe-coded codebases. The hook does it deterministically, every time, and presents any errors back to the agent to fix.

But the more interesting use cases are operational. You can set up a hook that plays a sound when a long-running task finishes, so you don't have to stare at a terminal. You can set up a hook that posts to Slack when an agent completes a task, so your team knows what shipped. You can use hooks to enforce security boundaries — if the agent tries to write to a production config file, the hook can intercept, log, and block.

The underlying insight here is something Steve gestured at with the "Agent UX matters" tip: you want agents to work within defined behavioral boundaries, not just be prompted to stay within them. Prompts can be ignored or drifted away from. Hooks are deterministic. Build the guardrails into the infrastructure, not into the conversation.

-----

**6. The Models Are Still Getting Better. Plan Accordingly.**

Steve made this point and I want to hammer it because I keep meeting smart engineers who think it's stopped being true.

Three months ago, some projects were clearly too hard for agents. Elisp in Emacs was Steve's example. I had my own equivalent — a multi-layer distributed system with three levels of IPC that Claude kept fumbling at the boundaries. I shelved it in November.

I dusted it off two weeks ago on a whim. Claude 3.7 and Sonnet 4.5 handled it without complaint. The boundaries that were causing the model to get progressively dumber in November are just… less of a problem now. The cognition is sharper. The reasoning across abstraction layers has improved.

The implication is something you should build into your planning: keep a backlog of "too hard for AI" problems. Not as a list of complaints, but as a benchmark. Every model release, pull out one or two of them and try again. You will be surprised how regularly things fall off that list. And if you build something slightly ahead of what today's models can handle well, you get a little extra shelf life out of it — it gets dramatically better over the next two releases without you doing any additional work.

The flip side, and this matters: don't use "agents aren't ready for this yet" as an excuse to not learn the workflow. The gap between someone who has been doing agentic development for six months and someone who starts today is real and growing. The tools are going to keep improving. The people who've spent the time building intuitions and habits are going to pull further ahead, not have those advantages neutralized. You want to be in the first group.

The throughput numbers that are starting to come out of teams doing this seriously should be clarifying. Case studies are showing developers shipping at twice their previous pace, with companies reporting hundreds of thousands of engineering hours redirected from manual work. Those aren't AI vendor marketing numbers — those are internal benchmarks from teams who did the boring work of learning how to wield these tools.

-----

**Wrap-Up**

Steve's December tips are a foundation. These are the next floor. Worktrees for parallelism. Lean CLAUDE.md for clear context. Interview-first for better specs. Deliberate context architecture for quality. Hooks for deterministic behavior. And constant calibration of your expectations against models that are still — genuinely, measurably — improving.

The engineers who will be 10x productive next year are building these habits now. Not the flashy stuff. The boring infrastructure of good agentic development. CLAUDE.md files that actually work. Worktree setups that eliminate waiting. Context discipline that keeps output quality high over long sessions.

It's still early. The tools are messy and the workflows are manual. But the people who figure it out, even imperfectly, are already separating from the pack.

Go build something.
