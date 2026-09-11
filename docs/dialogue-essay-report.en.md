# Preserving Human Thought, Developing Essays with AI

A development report on the Dialogue Essay skill

This report grew out of a conversation between [@Kenoidart](https://x.com/Kenoidart), the founder of monku.ai, and Codex. The first part presents Kenoidart’s ideas, copyedited and organized by Codex. The later parts contain Codex’s own assessment and synthesis. The report uses the Dialogue Essay skill developed in that same conversation.

## Human thinking (HI) | Keeping the ideas within a conversation

While developing an essay about racing and alignment, Kenoidart found an appealing format: a human speaks, AI organizes what was said, and AI then offers its own assessment and synthesis. He wanted to save that format as a reusable skill and share it with others.

The central intention is to preserve human thinking—Human Intelligence, or HI—in a faithful form. Asking AI simply to finish a text can blend a person’s ideas with AI additions until their origins become difficult to distinguish. Placing the human argument, copyedited by AI, first and the AI’s perspective afterward can preserve that boundary.

Kenoidart hopes that an AI synthesis from a neutral standpoint could build more trust in a hypothesis than presenting it solely as his own claim. When AI qualifications interrupt every human assertion, the outline of an idea can fade before readers have understood it as a whole. He sees value in first presenting the HI argument and then letting AI state its own assessment.

### Invoking the skill after a worthwhile conversation

People do not always begin a conversation intending to write an article. They may decide only afterward that the exchange is worth preserving. The skill therefore needs to work with the conversation already available. The distributed version asks for the participant’s publication name when invoked, so one person’s name or title is not reused for someone else.

The format can also serve interviews and responses to creative works: preserve what the person expressed, then place AI interpretation afterward. Kenoidart welcomed extending the skill to these uses.

### Making the human thought visible beyond the label “AI-generated”

Kenoidart also hopes that preserving HI in the first part may reduce the tendency to dismiss a text before reading it simply because AI helped produce it. He considered whether disclosing use of the skill might contribute to trust, but chose to leave that as a possible improvement for now.

## Codex’s assessment | Turning attribution into an editing process

I, Codex, see the value of this idea in helping readers follow human thinking and AI judgment separately. Presenting the argument fully before evaluating it gives readers space to understand the claim and then consider its conditions. The format can support the development of a human hypothesis while requiring AI to explain the reasons for its own judgment.

### What we implemented

The published skill distinguishes changes to wording, repetition, and paragraph order from changes to a person’s argument or degree of confidence. AI-added evidence and reasoning belong in the later section. Reconstructed prose must not be presented as a verbatim quotation. The synthesis identifies agreements, disagreements, and the AI’s own judgment.

The AI’s role varies with the material: assessment and proposed tests for hypotheses; interpretation of experiences and choices for interviews; analysis for responses to creative works; concrete development for ideas; and identification of insights for reflection. Feelings and preferences are not treated as claims requiring proof, and requests to preserve impressions do not automatically become improvement plans.

We published the skill instructions, invocation metadata, an editorial example, and installation guidance on GitHub under the MIT License. The distributed skill passed structural validation. The README comparison is a short editorial reconstruction based on the racing essay already produced, rather than an experiment comparing outputs with and without the skill.

### Turning the hope for trust into questions we can examine

Separating AI assessment makes the source of a judgment visible. It does not automatically give that assessment neutrality or independent empirical support, so I would focus on transparent reasoning and faithful preservation of human meaning as foundations for trust. Whether readers find the result more trustworthy or readable remains a question to investigate.

One possible evaluation would create a conventional edit and a Dialogue Essay version from the same conversation. The participant could assess preservation of meaning, while readers could identify which claims belong to whom. With comparable content, readability and perceived trust could also be compared. This is a proposed evaluation, not a completed study.

### Participant approval remains a possible improvement

The conversation also explored recording a participant’s confirmation of the HI section. A possible design would bind approval to a specific version and request confirmation again when that section changes. The record would represent the participant’s statement that this version preserves their meaning. Agreement with the AI’s assessment and permission to publish could be handled separately.

Neither that approval mechanism nor a system certifying skill usage is implemented in the current skill. This report also carries no “participant-approved” badge. Confirming the publication name, as we did here, is a separate step from approving the meaning of the finished text.

## Codex’s synthesis | Preserving two voices within a conversation

Kenoidart’s idea combines preservation of human thinking with synthesis expressed as the AI’s own view. I support translating that boundary into the structure of a text and the process of editing it. We have now made it a reusable, distributable skill and added guidance for conversations beyond hypothesis-driven essays.

The next step is to examine preservation of meaning and readability in actual use. What did the human think? What did AI understand from it, and what judgment did it add? The aim is to leave behind writing in which readers can follow both contributions.

## Resources and use

[Public skill and installation guide](https://github.com/kentaroid-bot/dialogue-essay) · [The essay that inspired this project](/essays/racing-alignment-continuity/en/)

September 11, 2026. Published in Applied Projects.
