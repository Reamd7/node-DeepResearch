# Module: src

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
1Ab3: /Users/gemini/Documents/ai-infra/node-DeepResearch/jina-ai/src/lib/env-config.ts
1B: /Users/gemini/Documents/ai-infra/node-DeepResearch/src
1B1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/agent.ts
1B2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/app.ts
1B3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/cli.ts
1B4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/config.ts
1B5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/server.ts
1B6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/types.ts
1Ba: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/__tests__
1Ba1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/__tests__/agent.test.ts
1Ba3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/__tests__/server.test.ts
1Bb: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/evals
1Bb1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/evals/batch-evals.ts
1Bc: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools
1Bc1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/brave-search.ts
1Bc2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/broken-ch-fixer.ts
1Bc3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/code-sandbox.ts
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
1Bd: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils
1Bd1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/action-tracker.ts
1Bd2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/date-tools.ts
1Bd4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/safe-generator.ts
1Bd5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/schemas.ts
1Bd6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/text-tools.ts
1Bd7: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/token-tracker.ts
1Bd8: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/utils/url-tools.ts
2Ca1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/error-analyzer.test.ts
2Ca2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/tools/__tests__/evaluator.test.ts
---KEY_DEFINITIONS_END---

last_KEY_edit: Assigned keys: 1Ab3, 1B, 1B1, 1B2, 1B3, 1B4, 1B5, 1B6, 1Ba, 1Ba1, 1Ba3, 1Bb, 1Bb1, 1Bc, 1Bc1, 1Bc2, 1Bc3, 1Bc5, 1Bc6, 1Bc7, 1Bc8, 1Bc9, 1Bc10, 1Bc11, 1Bc12, 1Bc13, 1Bc14, 1Bc15, 1Bc16, 1Bd, 1Bd1, 1Bd2, 1Bd4, 1Bd5, 1Bd6, 1Bd7, 1Bd8, 2Ca1, 2Ca2
last_GRID_edit: Applied suggestions (2025-04-10T15:48:25.628703)

---GRID_START---
X 1Ab3 1B 1B1 1B2 1B3 1B4 1B5 1B6 1Ba 1Ba1 1Ba3 1Bb 1Bb1 1Bc 1Bc1 1Bc2 1Bc3 1Bc5 1Bc6 1Bc7 1Bc8 1Bc9 1Bc10 1Bc11 1Bc12 1Bc13 1Bc14 1Bc15 1Bc16 1Bd 1Bd1 1Bd2 1Bd4 1Bd5 1Bd6 1Bd7 1Bd8 2Ca1 2Ca2
1Ab3 = op38
1B = pop37
1B1 = ppo<<>p>p<pp<p>6p>pp>3p>p>7pp
1B2 = pp>opp<>pp<p13sp5>p>pp>p3
1B3 = pp>pop7sp26
1B4 = Sp<ppop6<p<<p3<7p<<p3<p4<<
1B5 = p3>ppop32
1B6 = pp<<p3op4<p<5p3<p<5p><p<<><pp
1Ba = p8op30
1Ba1 = p9op29
1Ba3 = p10op28
1Bb = p11op27
1Bb1 = p12op26
1Bc = p13op25
1Bc1 = p14op24
1Bc2 = p15op23
1Bc3 = p16op22
1Bc5 = p17op21
1Bc6 = p18op20
1Bc7 = p19op19
1Bc8 = p20op18
1Bc9 = p21op17
1Bc10 = p22op16
1Bc11 = p23op15
1Bc12 = p24op14
1Bc13 = p25op13
1Bc14 = p26op12
1Bc15 = p27op11
1Bc16 = p28op10
1Bd = p29op9
1Bd1 = p30op8
1Bd2 = p31op7
1Bd4 = p32op6
1Bd5 = p33op5
1Bd6 = p34op4
1Bd7 = p35op3
1Bd8 = p36opp
2Ca1 = p37op
2Ca2 = p38o
---GRID_END---

---mini_tracker_end---
