# Keeping the World Going When One Car Stops: sources and editorial record

September 11, 2026. Supplement to the published essay.

[English essay](racing-alignment-continuity.en.md) / [Japanese research draft](research/ai-racing-risk/alignment-design-comparison-revised.ja.md)

## Editorial approach

The boundaries between the hypothesis introduced by [@Kenoidart](https://x.com/Kenoidart), who leads MonkuAi, the observations organized by Codex, Codex's assessment, and the conclusion have been preserved. The essay is organized around mutual support, containment of failure, and continuity after shutdown. The numerical forecast appears once, in Part I. No new empirical results were added. F1 figures and cases were retained from the original investigation; external sources were not reinvestigated during this edit.

## Counting definitions

“Completion” means running through to the end of the race, distinct from official classification. DNS entries are excluded from starts. Norris in Austria 2024 is counted as a retirement even though the results list “+7 laps.” Russell in Belgium is counted as completing because his disqualification came after running; Hülkenberg in Brazil is counted as not completing because his black-flag disqualification occurred during the race. [FIA Austria report](https://www.fia.com/news/f1-george-russell-takes-surprise-austria-win-verstappen-and-norris-collide), [F1 on Russell's disqualification](https://www.formula1.com/en/latest/article/breaking-russell-disqualified-from-belgian-grand-prix-for-underweight-car-as.2NIuo4cHgOl1LgplIkGG5D), [F1 on Hülkenberg's black flag](https://www.formula1.com/en/latest/article/hulkenberg-rues-small-mistake-with-huge-consequence-after-being-black.2gn7X4tpeSKZ2JaxQRlTmD).

The difference between the earlier “50 retirements / 476 starts” and this analysis's “51 non-completions / 476 starts” is the inclusion of disqualification during the race. Selecting the top ten by final championship points introduces a relationship between finishing and scoring. The approximately 8% figure is not treated as a rate for randomly selected drivers or AI companies.

## Source data and reproduction

Materials are stored in `docs/research/ai-racing-risk/`.

- [Saved official results](research/ai-racing-risk/official-2024.json)
- [Analysis script](research/ai-racing-risk/analyze-continuity.py)
- [Classification of every result](research/ai-racing-risk/continuity-audit-2024.csv)
- [Race-level counts](research/ai-racing-risk/continuity-races-2024.csv)
- [Top-ten driver counts](research/ai-racing-risk/continuity-drivers-top10-2024.csv)
- [Summary](research/ai-racing-risk/continuity-summary-2024.json)

Running `python3 analyze-continuity.py` in that directory reproduces the counts. This edit has not changed the source data or analysis outputs. The original draft reports approximately 8.03% when giving each of the top ten drivers equal weight. The essay uses the pooled, start-weighted figure of 19/238, approximately 7.98%.

## Interruption and cancellation cases

The essay retains Bahrain 2020 and Monaco 2024 as examples of resumption; Belgium 2021 as an example of no subsequent restart that day; and Emilia-Romagna 2023 as an example of cancellation before the start. Belgium 2021 has an official result, but is not counted as completed in the same sense as a Grand Prix with normal competitive running.

The original draft also discusses the 2014 Japanese Grand Prix, which ended early under the final red flag following Jules Bianchi's accident. [Official F1 report: Japan 2014](https://www.formula1.com/en/latest/article/race-hamilton-wins-rain-affected-race-in-japan.FOQ9DKAeOj9aMaFMy2Ado).

These cases do not constitute an exhaustive frequency study of interruptions or cancellations across all years. No rate of interruption, termination, pre-start cancellation, or permanent inability to resume the sport has been calculated.

## Handoff to future research

The problem to connect with Alignment Asymmetry Study is a coordination protocol that limits the pathways from one company's alignment breakdown to the loss of collective corrective capacity, without concentrating final authority in a central actor.

Possible deliverables include a model of actors, shared resources, permissions, and connections; procedures from anomaly detection through reduced authority, exit, alternatives, and reconnection; and a comparative experimental design. Weak coordination, central coordination, and decentralized protocol coordination should be compared under resources and hazards that are as similar as possible.

Tests should include shared infrastructure failures, uncooperative actors, attackers using the protocol, loss of necessary supplies due to shutdown, and concentration of final decision-making authority. The publication draft makes the mutual-support proposal more concrete by suggesting comparisons among human-only, AI-only, and collaborative conditions. The proposed experiments have not been conducted; no request to implement them in another project has been dispatched as part of this work.

Numerical evaluation requires defining the transition's duration, authority, exposure to danger, recurrence and learning, and shared dependencies among actors. Rather than mechanically multiplying company failure rates under an assumption of independence, measure whether others can remain active conditional on one company's failure. Avoid double-counting civilization-scale authority and its effects as if they were separate conditions. The tentative forecast is a subject for testing, not a predetermined experimental conclusion.
