# Module: utils

## Purpose & Responsibility
{1-2 paragraphs on module purpose & responsibility}

## Interfaces
* `{InterfaceName}`: {purpose}
* `{Method1}`: {description}
* `{Method2}`: {description}
* Input: [Data received]
* Output: [Data provided]
...

## Implementation Details
* Files: [List with 1-line descriptions]
* Important algorithms: [List with 1-line descriptions]
* Data Models
    * `{Model1}`: {description}
    * `{Model2}`: {description}

## Current Implementation Status
* Completed: [List of completed items]
* In Progress: [Current work]
* Pending: [Future work]

## Implementation Plans & Tasks
* `implementation_plan_{filename1}.md`
* [Task1]: {brief description}
* [Task2]: {brief description}
* `implementation_plan_{filename2}.md`
* [Task1]: {brief description}
* [Task2]: {brief description} 
...

## Mini Dependency Tracker
---mini_tracker_start---

---KEY_DEFINITIONS_START---
Key Definitions:
1B1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/agent.ts
1B2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/app.ts
1B4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/config.ts
1B6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/types.ts
1Bc2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/broken-ch-fixer.ts
1Bc3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/code-sandbox.ts
1Bc4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/dedup.ts
1Bc5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/error-analyzer.ts
1Bc6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/evaluator.ts
1Bc7: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/grounding.ts
1Bc8: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/jina-classify-spam.ts
1Bc9: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/jina-dedup.ts
1Bc10: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/jina-latechunk.ts
1Bc11: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/jina-rerank.ts
1Bc12: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/jina-search.ts
1Bc13: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/md-fixer.ts
1Bc14: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/query-rewriter.ts
1Bc15: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/read.ts
1Bd: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils
1Bd1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/action-tracker.ts
1Bd2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/date-tools.ts
1Bd3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/i18n.json
1Bd4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/safe-generator.ts
1Bd5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/schemas.ts
1Bd6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/text-tools.ts
1Bd7: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/token-tracker.ts
1Bd8: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/url-tools.ts
2Ca2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/evaluator.test.ts
2Ca3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/read.test.ts
2Ca4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/search.test.ts
---KEY_DEFINITIONS_END---

last_KEY_edit: Assigned keys: 1B1, 1B2, 1B4, 1B6, 1Bc2, 1Bc3, 1Bc4, 1Bc5, 1Bc6, 1Bc7, 1Bc8, 1Bc9, 1Bc10, 1Bc11, 1Bc12, 1Bc13, 1Bc14, 1Bc15, 1Bd, 1Bd1, 1Bd2, 1Bd3, 1Bd4, 1Bd5, 1Bd6, 1Bd7, 1Bd8, 2Ca2, 2Ca3, 2Ca4
last_GRID_edit: Applied suggestions (2025-04-10T15:48:25.660883)

---GRID_START---
X 1B1 1B2 1B4 1B6 1Bc2 1Bc3 1Bc4 1Bc5 1Bc6 1Bc7 1Bc8 1Bc9 1Bc10 1Bc11 1Bc12 1Bc13 1Bc14 1Bc15 1Bd 1Bd1 1Bd2 1Bd3 1Bd4 1Bd5 1Bd6 1Bd7 1Bd8 2Ca2 2Ca3 2Ca4
1B1 = op29
1B2 = pop28
1B4 = ppop27
1B6 = p3op26
1Bc2 = p4op25
1Bc3 = p5op24
1Bc4 = p6op23
1Bc5 = p7op22
1Bc6 = p8op21
1Bc7 = p9op20
1Bc8 = p10op19
1Bc9 = p11op18
1Bc10 = p12op17
1Bc11 = p13op16
1Bc12 = p14op15
1Bc13 = p15op14
1Bc14 = p16op13
1Bc15 = p17op12
1Bd = p18op11
1Bd1 = <<p>p15op4>sp4
1Bd2 = <pp>p16op5<p3
1Bd3 = p21op8
1Bd4 = <<>pp<4p7<p5o<p>p4
1Bd5 = <pp>p<p<<p3<pp<<p5>opp<p3
1Bd6 = <pp><p3<p6<p3<p4op<p3
1Bd7 = <<p>pp<pp<3p<<pp<pspp<ppop<3
1Bd8 = <pp>p6>p>>p3>pp>pp>>pop3
2Ca2 = p27opp
2Ca3 = p28op
2Ca4 = p29o
---GRID_END---

---mini_tracker_end---
