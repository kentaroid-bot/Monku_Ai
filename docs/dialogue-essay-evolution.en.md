# From What We Tell AI Not to Do to What We Can Grow Together

How the revised Dialogue Essay skill took shape

This essay grew out of a dialogue between [Kentaroid](https://x.com/Kenoidart), founder of monku.ai, and Codex. At his request, the body refers to him as “Kenoidart.” The first part preserves his ideas, copyedited and organized by Codex; the second presents Codex’s assessment and synthesis. Gemini’s evaluation and prompt proposal are identified as its contributions. **This account of the revision was written using the Dialogue Essay skill revised through that same dialogue.**

## Human thought: drawing something out has value, even when the words are not yours

How should we receive writing produced by AI? For Kenoidart, what mattered was what the dialogue had brought out.

> What I aim to do is draw previously unknown knowledge out of AI through dialogue.

Asking AI merely to polish an idea stays close to the starting point. Letting AI examine and evaluate it freely, then questioning the response, can lead to an understanding the person did not already have. He saw value in that possibility.

If the resulting words came from AI, he had no intention of hiding their origin. Kenoidart said, “I have no intention of pretending that I wrote it,” and added, “I can say that I was good at drawing it out.” Choosing questions, engaging with responses, and going deeper: could that work also be recognized as part of the achievement?

Making the contributions transparent would allow readers to judge the ideas. It could also help them learn how to cooperate with AI to advance their understanding. For Kenoidart, a record of dialogue could preserve both its content and its method of collaboration.

### More information should still be readable

While supporting the proposal to preserve attribution and the course of the dialogue, Kenoidart added another condition: the information needed a structure that people could comfortably read.

As procedural explanations accumulate, an essay can begin to resemble a work report. The discussion therefore moved toward a structure in which the main text carries the argument, while readers who want to check details can turn to supplementary material. Briefly retain the exchanges that changed the understanding; keep essential evidence in the text and detailed history elsewhere.

### The prompt used the same style

After that approach was added to the skill, Kenoidart noticed something about the instructions themselves. The recurrent AI phrasing that had bothered him—qualifications beginning with “however” or “on the other hand” and ending in a negative—resembled the rigid instructions people give AI.

Perhaps people had piled on prohibitions to prevent mistakes, and that style had found its way back into answers to people. Kenoidart saw an amusing irony in that possibility. He then pointed out that the skill Codex had just written used that very form.

Could instructions asking for a readable essay themselves be written readably? That question led to a prompt centered on purpose and the desired flow, followed by a comparison with the existing version.

### Preserve the person’s wording, too

Gemini’s proposed hybrid prompt ended with a constraint labeled “Do not alter the original text.” When Codex suggested “preserve the meaning,” Kenoidart proposed a compromise: “preserve the original text as much as possible.”

Even when the meaning is the same, a person’s wording carries something of their ideas and the character of their thinking. The dialogue moved toward an editorial principle: retain the qualities of the original while making it easier to read. Kenoidart valued that proposal and asked for a revised skill and a record of how it came about.

## Codex’s assessment: explain the intended work first

I, Codex, see the central improvement as recognizing human contribution beyond supplying an initial idea. In this case, the observation about prompt structure and the request to preserve the person’s wording changed the design. The structure proposed by AI and the person’s revisions to it both contributed to the result.

### What the A/B examples showed

The preliminary comparison used a fictional dialogue about a library: AI prepares book recommendations so librarians can spend more time talking with visitors. When AI proposes replacing those conversations too, the speaker, Aoki, restores the original purpose. The discussion develops into a proposal to reserve conversation time in advance.

A used the detailed existing instructions; B used a shorter prompt centered on purpose and the desired flow. Both outputs distinguished the person’s intent from AI’s proposals and treated the benefits as an untested idea. A explained the roles explicitly, while B used an opening question and a brief quotation to make the turning point stand out.

I created both outputs and evaluated them in the same conversation. This was neither an independent generation trial nor a blinded human evaluation. The prompts also differed in length and detail, so the outputs cannot isolate the effect of prohibitions. What we obtained at this stage was a pair of concrete editorial examples to read side by side.

### Gemini’s evaluation and third proposal

Kenoidart gave Gemini the example dialogue, prompts A and B, and outputs A and B, then shared its evaluation. Gemini favored B’s opening and presentation of the turning point. It proposed keeping purpose central and placing constraints in a separate layer.

That assessment offers a useful lead for improving how a reader enters the essay. Gemini also proposed a causal explanation: placing positive instructions alongside prohibitions could divide attention. We recorded this as a hypothesis to investigate. We did not measure internal attention allocation or examine the training origins of the style. Gemini’s contribution was another model’s evaluation of existing outputs, distinct from a new generation experiment.

The hybrid prompt shared next put purpose, input, workflow, and style first, followed by two constraints. The revision used that arrangement as a starting point while preserving necessary functions of the existing skill.

### What went into the revision

The skill now begins with purpose, then materials and publication names, followed by the process of developing an essay. Its basic flow is “question → human idea → AI examination → where the dialogue arrives.” Boundaries concerning meaning, attribution, and evidence are grouped separately.

For the original wording, it adopts this principle:

> Retain the person’s words and distinctive expressions as much as possible, adjusting wording, repetition, and paragraph order for readability. Preserve the person’s claims, value judgments, and degree of confidence throughout the edit.

When a person later adopts an AI proposal, the account preserves that sequence. It also distinguishes an understanding that is new to the person from a discovery that is new to the world. The skill retains different roles for different material—testing a hypothesis or interpreting a response to a work of art—without turning every conversation into a research plan.

For readability, essential evidence and conditions that change the conclusion’s meaning stay in the main text. Detailed methods and history can go into supplementary material when needed. The final check asks both whether a first-time reader can follow the argument and whether an interested reader can trace the evidence.

## Synthesis: dialogue can improve the instructions themselves

The starting point was that a person’s ability to draw insight from AI has value. Making that contribution visible calls for transparency and readability. The skill asking for both was then reconsidered on the same terms.

The revised version states the purpose first, organizes the necessary boundaries, and preserves the qualities of the person’s original wording. It has undergone format validation and editorial review and has been applied to this account of its own development. General effects on output quality remain a question for independent runs under matched conditions and evaluation by readers.

A person asks, AI proposes, and the person’s next question changes the proposal. What this account preserves is how that exchange developed not only ideas, but also a tool for supporting the next dialogue.

## Sources and comparison records

- [Revised skill and installation instructions](https://github.com/kentaroid-bot/dialogue-essay)
- [A/B input, prompts, outputs, and preliminary assessment](https://github.com/kentaroid-bot/dialogue-essay/tree/main/evaluations/prompt-style)
- [Assessment of Gemini’s evaluation](https://github.com/kentaroid-bot/dialogue-essay/blob/main/evaluations/prompt-style/gemini-review.md)
- [Preserved Gemini hybrid proposal](https://github.com/kentaroid-bot/dialogue-essay/blob/main/evaluations/prompt-style/prompt-c-gemini-original.md)
- [The original development report](/essays/dialogue-essay/en/)

September 13, 2026 · Applied Projects. Human quotations are translated from statements in this conversation; the prompt quotation is translated from the revised instructions. This is an edited account of the dialogue, not a verbatim transcript. Confirmation of the publication name is separate from the person’s approval that the finished essay preserves their meaning.
