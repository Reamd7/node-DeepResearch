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
1Ab2: /Users/gemini/Documents/ai-infra/node-DeepResearch/jina-ai/src/lib/billing.ts
1B1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/agent.ts
1B2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/app.ts
1B4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/config.ts
1B6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/types.ts
1Ba1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/__tests__/agent.test.ts
1Bc: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools
1Bc1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/brave-search.ts
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
1Bc16: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/serper-search.ts
1Bd4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/safe-generator.ts
1Bd5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/schemas.ts
1Bd6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/text-tools.ts
1Bd7: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/token-tracker.ts
1Bd8: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/url-tools.ts
2Ca: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__
2Ca1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/error-analyzer.test.ts
2Ca2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/evaluator.test.ts
2Ca3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/read.test.ts
2Ca4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/search.test.ts
---KEY_DEFINITIONS_END---

last_KEY_edit: Assigned keys: 1Ab2, 1B1, 1B2, 1B4, 1B6, 1Ba1, 1Bc, 1Bc1, 1Bc2, 1Bc3, 1Bc4, 1Bc5, 1Bc6, 1Bc7, 1Bc8, 1Bc9, 1Bc10, 1Bc11, 1Bc12, 1Bc13, 1Bc14, 1Bc15, 1Bc16, 1Bd4, 1Bd5, 1Bd6, 1Bd7, 1Bd8, 2Ca, 2Ca1, 2Ca2, 2Ca3, 2Ca4
last_GRID_edit: Applied suggestions (2025-04-10T15:48:25.649752)

---GRID_START---
X 1Ab2 1B1 1B2 1B4 1B6 1Ba1 1Bc 1Bc1 1Bc2 1Bc3 1Bc4 1Bc5 1Bc6 1Bc7 1Bc8 1Bc9 1Bc10 1Bc11 1Bc12 1Bc13 1Bc14 1Bc15 1Bc16 1Bd4 1Bd5 1Bd6 1Bd7 1Bd8 2Ca 2Ca1 2Ca2 2Ca3 2Ca4
1Ab2 = op32
1B1 = pop31
1B2 = ppop30
1B4 = p3op29
1B6 = p4op28
1Ba1 = p5op27
1Bc = p6op26
1Bc1 = p<p>>ppop10sp3Sp10
1Bc2 = p<p>>p3op16>p7
1Bc3 = p<pp>p4op13>>p8
1Bc4 = p10op12>pp>p6
1Bc5 = p<pp>p6op11>>p4<p3
1Bc6 = p<pp>p7op10>3p4<pp
1Bc7 = p<p>p9op12>p6
1Bc8 = Spp>p10oSpSSppSp4><p4s
1Bc9 = s<p>p10SosSSppsp4>p5s
1Bc10 = p3>>p10sop7>pp<p5
1Bc11 = Spp>p10SSpoSppSsp3><p4S
1Bc12 = S<s>><psp6SSpSoppSSp3>p4S<
1Bc13 = p<p>>p14op4>>p7
1Bc14 = p<pp>p15opp>>p8
1Bc15 = Spp>><p8SspSSppop4><p3<s
1Bc16 = p<p>>ppSp9sSp3op10
1Bd4 = p23op9
1Bd5 = p24op8
1Bd6 = p25op7
1Bd7 = p26op6
1Bd8 = p27op5
2Ca = p28op4
2Ca1 = p29op3
2Ca2 = p30opp
2Ca3 = p31op
2Ca4 = p32o
---GRID_END---

---mini_tracker_end---
