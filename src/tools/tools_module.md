# Module: tools

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
1Bb2: /Users/gemini/Documents/ai-infra/node-DeepResearch/jina-ai/src/lib/billing.ts
1C1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/agent.ts
1C4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/config.ts
1C6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/types.ts
1Ca1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/__tests__/agent.test.ts
1Cd: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools
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
1Ce4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/safe-generator.ts
1Ce5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/schemas.ts
1Ce6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/text-tools.ts
1Ce7: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/token-tracker.ts
1Ce8: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/url-tools.ts
2Ca1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/base-provider.ts
2Da: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__
2Da1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/error-analyzer.test.ts
2Da2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/evaluator.test.ts
2Da3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/read.test.ts
2Da4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/search.test.ts
3Ab1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/brave-provider.ts
3Ab2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/duck-provider.ts
3Ab4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/jina-provider.ts
3Ab5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/searxng-provider.ts
3Ab6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/serper-provider.ts
---KEY_DEFINITIONS_END---

last_KEY_edit: Assigned keys: 1Bb2, 1C1, 1C4, 1C6, 1Ca1, 1Cd, 1Cd1, 1Cd2, 1Cd3, 1Cd4, 1Cd5, 1Cd6, 1Cd7, 1Cd8, 1Cd9, 1Cd10, 1Cd11, 1Cd12, 1Cd13, 1Ce4, 1Ce5, 1Ce6, 1Ce7, 1Ce8, 2Ca1, 2Da, 2Da1, 2Da2, 2Da3, 2Da4, 3Ab1, 3Ab2, 3Ab4, 3Ab5, 3Ab6
last_GRID_edit: Applied suggestions (2025-04-10T18:48:28.367376)

---GRID_START---
X 1Bb2 1C1 1C4 1C6 1Ca1 1Cd 1Cd1 1Cd2 1Cd3 1Cd4 1Cd5 1Cd6 1Cd7 1Cd8 1Cd9 1Cd10 1Cd11 1Cd12 1Cd13 1Ce4 1Ce5 1Ce6 1Ce7 1Ce8 2Ca1 2Da 2Da1 2Da2 2Da3 2Da4 3Ab1 3Ab2 3Ab4 3Ab5 3Ab6
1Bb2 = op34
1C1 = pop33
1C4 = ppop32
1C6 = p3op31
1Ca1 = p4op30
1Cd = p5op29
1Cd1 = p<>>ppop14>p13
1Cd2 = p<p>p3op11>>p14
1Cd3 = p8op10>pp>p12
1Cd4 = p<p>p5op9>>p5<p8
1Cd5 = p<p>p6op8>3p5<p7
1Cd6 = p<>p8op10>psp6spss
1Cd7 = Sp>p9oSpSppSp3><p6spSps
1Cd8 = s<>p9SosSppsp3>p9Spp
1Cd9 = pp>>p9sop5>pp<p11
1Cd10 = Sp>p9SSpoppSp3><p5sspSps
1Cd11 = p<>>p12op3>>p13
1Cd12 = p<p>p13op>>p14
1Cd13 = Sp>><p7SspSppop3><p4<p3Spp
1Ce4 = p19op15
1Ce5 = p20op14
1Ce6 = p21op13
1Ce7 = p22op12
1Ce8 = p23op11
2Ca1 = p24op10
2Da = p25op9
2Da1 = p26op8
2Da2 = p27op7
2Da3 = p28op6
2Da4 = p29op5
3Ab1 = p30op4
3Ab2 = p31op3
3Ab4 = p32opp
3Ab5 = p33op
3Ab6 = p34o
---GRID_END---

---mini_tracker_end---
