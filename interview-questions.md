# Portfolio Case Study Interview Guide
## Eduardo Nogueira — UX Design Portfolio

This is a conversational interview guide. The goal is not to complete a form — it is to get Eduardo talking in specifics. Every question here targets a gap between what is currently written and what a senior reader would need to believe the story. Start broad, follow the thread, and push for examples whenever the answer stays general.

---

## PROJECT 1: Upday News App Redesign

**Why these questions matter:** The current case study describes what changed but not what Eduardo thought before the data challenged him. The most compelling part of this story — the moment analytics forced a pivot — is almost entirely absent. These questions are designed to surface the thinking before the thinking.

---

**Start here — the moment before:**

Walk me through what you thought this project was going to be when you first got the brief. Before you saw any data — what did you assume the problem was?

When you saw that 80% of users only ever touched the top feed — what was your gut reaction? What had you been planning to do that you immediately stopped planning to do?

**Dig into the personas:**

You developed three user personas — News Seeker, Explorer, and Passive Reader. I want to understand how those actually worked in practice. Can you point to one specific design decision and tell me: "this decision exists because of this persona"? Which persona ended up mattering most?

**The navigation decision:**

You went from 5 tabs to 4. Walk me through that. What were the 5? What was the argument for each one that got cut? Discover and Local — who wanted to keep those, and what was the argument?

**The typeface decision:**

Roboto was replaced with two new typefaces. Which ones? Why those specifically? What were you looking at when you decided Roboto wasn't right? What did you consider and reject?

**The color rollout:**

The accessibility failure on the old blue — how did that surface? Did someone flag it or did you find it? And the phased rollout of the new color — what did that actually look like? How many phases? What triggered moving from one phase to the next?

**Games:**

Games in a news app — whose idea was that? What was the hypothesis? I'm curious whether there was any internal resistance, and if so, what form it took. How did you feel about it personally?

**The aggregator argument you lost:**

You had data that supported keeping local news, and management cut it anyway. What data did you bring? What was the counter-argument that won? If you had that meeting again with more authority, what would you do differently?

**Survival conditions:**

You've described this as working under survival conditions. What does that actually mean in concrete terms — team size, timeline, what you didn't have?

**The honest ones:**

What shipped in this project that you're most proud of that isn't in the case study at all?

And — what shipped that you think was a mistake?

---

## PROJECT 2: Media Player SDK

**Why these questions matter:** The current case study states the user problems (PiP, audio drop-off) as if they were always obvious. The more interesting story is how Eduardo found those problems in a project that was framed as a cost exercise, and how he made the case for doing UX work at all. That story is currently missing.

---

**Start here — the discovery:**

The project brief was cost consolidation. When did you first realize there were actual user experience problems worth fixing here? Was that your own observation, or did someone else surface it?

The audio drop-off — what did the data actually look like? Do you remember the number? At what point in the user journey were people leaving? When you saw it, did it feel significant or did you have to make a case that it mattered?

**Making the case:**

How did you convince management that this cost-cutting project should also fix user problems? What specifically did you say or show? What was the reaction?

**The co-design process:**

You worked with one designer from WELT and one from Bild. What did those sessions actually look like? What kinds of decisions were made in the room together versus by you alone? Were there disagreements between the two brand teams about direction?

**The architecture decision:**

Shared behavioral core, flexible visual layer — when did that become the obvious solution? What other approaches did you consider before landing there? What does each brand's version actually look like on top of the shared core — what are the specific visual differences?

**The tradeoff you lived with:**

No primary user testing — you've acknowledged that. What would you have tested if you'd had the time? What uncertainty did you ship with?

**After launch:**

What happened after it shipped that surprised you? What do users still need that didn't make it in?

---

## PROJECT 3: Blatt Design System

**Why these questions matter:** The case study currently describes what Blatt became. What's missing is what it was before it worked — the attempts that stalled, the moment skepticism turned, and what "education before governance" actually looked like in a room with a real team.

---

**Start here — what didn't work first:**

Before the pilot team model, what did you try? What was your first approach to getting adoption? How long did it take before you realized that wasn't going to work?

**The pilot team:**

Walk me through the pilot. One designer per brand — how were they selected? What did you actually do with them in the early months? When was the moment you felt like it was starting to work?

**The Claude demo:**

Tell me about that room. Who was there? What exactly did you show them? What was the reaction in the moment — and how quickly did things change after that meeting?

**Education before governance — what that actually means:**

The workshops — what did they cover? What did you teach? What changed in how designers worked after going through them?

**The tools you built:**

Token Studio — why wasn't it enough? What specifically did it do that frustrated you, and what does your replacement plugin do differently? And the CSS conversion scripts — what was a developer's workflow before those scripts, and what is it now?

**The GitHub repository:**

You maintain the WELT design system repository. What does that actually involve day to day? What would break if you stopped?

**Where it is now:**

What's the current state of Blatt? Is it actively growing? What's the biggest challenge at this moment?

**The fragility question:**

What would make it fail? What's the thing you haven't solved that you think about?

Can you give me a specific recent example of the tension between design freedom and system consistency — something that happened in the last few months?

---

## PROJECT 4: Figma Content Plugin

**Why these questions matter:** This is the tightest case study but it's missing two things: the specific moment that made this the day Eduardo finally built it (versus every other day he had the same problem), and the concrete downstream effects — what exactly did colleagues build after seeing it.

---

**Start here — that afternoon:**

What were you working on when you finally decided to build it? What was the mockup? What made that the day — what had just broken, or what was different about that moment versus the hundred other times you'd hit the same problem?

**The decision to keep it simple:**

One button. What did you sketch out or think about that you decided to cut? What would a more complex version of this plugin have looked like?

**How it works:**

For someone who isn't a designer — where does the plugin pull content from? What happens technically when you press the button?

**The 10x number:**

How did you arrive at 10x faster? Was that measured, estimated, a feeling? How did you figure that out?

**Validation:**

Did you ask colleagues if they had the same problem before you built it, or did you build it and then find out? How did they react when you first showed them?

**The downstream effects:**

You've said this sparked a wider movement of designer-built tooling. Give me one specific example — what did a colleague build, and when?

**The keygen aesthetic:**

Where did that reference come from? Why that specifically, not something else? (And then you moved to a terminal aesthetic — what drove that change?)

**The reaction to a designer shipping code:**

Was there any pushback — from anyone — about a designer writing and shipping a plugin? How did your colleagues and your manager respond?

**The honest limitation:**

What's the one thing this plugin still can't do that you wish it could?

---

## THINGS TO WATCH FOR

These are patterns Eduardo may default to, and how to follow up when they appear.

---

**Vague attribution to "the team."**

Watch for: "We decided to..." / "The team felt that..." / "We ran workshops..."

Follow up with: "When you say 'we' — what was your specific role in that decision? What did you push for that might not have happened if you hadn't been there?"

The goal is not to discount collaboration — it's to identify where Eduardo's specific judgment shaped an outcome.

---

**Restating the brief as the insight.**

Watch for: "The brief was to improve retention, so we focused on retention."

Follow up with: "What did you think the problem was before you saw the data? What changed your understanding?"

The most interesting insight is always the one that contradicted the initial assumption. If Eduardo describes a project where his first hypothesis was correct and nothing surprised him, keep pushing — something surprised him.

---

**Outcomes without mechanism.**

Watch for: "We achieved a 10% retention increase." Full stop.

Follow up with: "What do you think actually drove that? If you had to bet on the one change that moved the number, what would it be?"

Even if the answer is uncertain, the reasoning Eduardo reaches for is more interesting than the metric itself.

---

**Performing humility about decisions he actually made.**

Watch for: "It wasn't really my call — that was a business decision." / "I didn't have the authority to change that."

Follow up with: "But you were in the room. What did you say? What did you advocate for?"

Eduardo has strong opinions — the case studies reveal this. When he deflects to authority or org structure, it's worth gently naming that deflection and asking what he actually argued for.

---

**Generic process language.**

Watch for: "We did user research and iterated based on feedback."

Follow up with: "What specifically did a user say or do that changed what you were designing? Can you give me one moment?"

If he can't give a specific moment, that's useful information too — it tells you the research didn't actually drive the decisions, and the case study should be honest about that rather than gesturing at a process that wasn't the real driver.

---

**Skipping the wrong turns.**

Watch for: A smooth narrative where every decision led logically to the next.

Follow up with: "What did you try before that? What stalled? What did you throw away?"

Every real project has a version that didn't work. If Eduardo describes a project without any false starts, he's either compressing a messy process into a clean story (likely) or hasn't thought about what "not working" looked like in that context (push harder).
