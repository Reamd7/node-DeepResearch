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
1C1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/agent.ts
1C2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/app.ts
1C4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/config.ts
1C6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/types.ts
1Cd1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/broken-ch-fixer.ts
1Cd2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/code-sandbox.ts
1Cd3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/dedup.ts
1Cd4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/error-analyzer.ts
1Cd5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/evaluator.ts
1Cd6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/grounding.ts
1Cd7: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/jina-classify-spam.ts
1Cd8: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/jina-dedup.ts
1Cd9: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/jina-latechunk.ts
1Cd10: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/jina-rerank.ts
1Cd11: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/md-fixer.ts
1Cd12: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/query-rewriter.ts
1Cd13: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/read.ts
1Ce: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils
1Ce1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/action-tracker.ts
1Ce2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/date-tools.ts
1Ce3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/i18n.json
1Ce4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/safe-generator.ts
1Ce5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/schemas.ts
1Ce6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/text-tools.ts
1Ce7: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/token-tracker.ts
1Ce8: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/url-tools.ts
2Ca1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/base-provider.ts
2Ca3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/search-service.ts
2Ca4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/types.ts
2Da2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/evaluator.test.ts
2Da3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/read.test.ts
2Da4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/search.test.ts
3Aa1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/__tests__/search-service.test.ts
3Ab1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/brave-provider.ts
3Ab2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/duck-provider.ts
3Ab4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/jina-provider.ts
3Ab5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/searxng-provider.ts
3Ab6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/serper-provider.ts
---KEY_DEFINITIONS_END---

last_KEY_edit: Assigned keys: 1C1, 1C2, 1C4, 1C6, 1Cd1, 1Cd2, 1Cd3, 1Cd4, 1Cd5, 1Cd6, 1Cd7, 1Cd8, 1Cd9, 1Cd10, 1Cd11, 1Cd12, 1Cd13, 1Ce, 1Ce1, 1Ce2, 1Ce3, 1Ce4, 1Ce5, 1Ce6, 1Ce7, 1Ce8, 2Ca1, 2Ca3, 2Ca4, 2Da2, 2Da3, 2Da4, 3Aa1, 3Ab1, 3Ab2, 3Ab4, 3Ab5, 3Ab6
last_GRID_edit: Applied suggestions (2025-04-10T18:48:28.376088)

---GRID_START---
X 1C1 1C2 1C4 1C6 1Cd1 1Cd2 1Cd3 1Cd4 1Cd5 1Cd6 1Cd7 1Cd8 1Cd9 1Cd10 1Cd11 1Cd12 1Cd13 1Ce 1Ce1 1Ce2 1Ce3 1Ce4 1Ce5 1Ce6 1Ce7 1Ce8 2Ca1 2Ca3 2Ca4 2Da2 2Da3 2Da4 3Aa1 3Ab1 3Ab2 3Ab4 3Ab5 3Ab6
1C1 = op37
1C2 = pop36
1C4 = ppop35
1C6 = p3op34
1Cd1 = p4op33
1Cd2 = p5op32
1Cd3 = p6op31
1Cd4 = p7op30
1Cd5 = p8op29
1Cd6 = p9op28
1Cd7 = p10op27
1Cd8 = p11op26
1Cd9 = p12op25
1Cd10 = p13op24
1Cd11 = p14op23
1Cd12 = p15op22
1Cd13 = p16op21
1Ce = p17op20
1Ce1 = <<p>p14op4>sp13
1Ce2 = <pp>p15op5<p12
1Ce3 = p20op17
1Ce4 = <<>pp<4p6<p5o<p>p13
1Ce5 = <pp>p<p<<p3<p<<p5>opp<p12
1Ce6 = <pp><p3<p5<p3<p4op<p12
1Ce7 = <<p>pp<pp<3p<pp<pspp<ppop<<p<9
1Ce8 = <pp>p6>p>>pp>pp>pp>>popp>p9
2Ca1 = p26op11
2Ca3 = p27op10
2Ca4 = p28op9
2Da2 = p29op8
2Da3 = p30op7
2Da4 = p31op6
3Aa1 = p32op5
3Ab1 = p33op4
3Ab2 = p34op3
3Ab4 = p35opp
3Ab5 = p36op
3Ab6 = p37o
---GRID_END---

---mini_tracker_end---
