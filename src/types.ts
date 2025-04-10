// Action Types
import {CoreMessage, LanguageModelUsage} from "ai";

type BaseAction = {
  action: "search" | "answer" | "reflect" | "visit" | "coding";
  think: string;
};

// SERPQuery 类型已移至 src/services/search/types.ts
import { SERPQuery } from './services/search/types';
export { SERPQuery };

export type SearchAction = BaseAction & {
  action: "search";
  searchRequests: string[];
};

export type Reference = {
    exactQuote: string;
    url: string;
    title: string;
    dateTime?: string;
  }

export type AnswerAction = BaseAction & {
  action: "answer";
  answer: string;
  references: Array<Reference>;
  isFinal?: boolean;
  mdAnswer?: string;
};


export type KnowledgeItem = {
  question: string,
  answer: string,
  references?: Array<Reference> | Array<any>;
  type: 'qa' | 'side-info' | 'chat-history' | 'url' | 'coding',
  updated?: string,
  sourceCode?: string,
}

export type ReflectAction = BaseAction & {
  action: "reflect";
  questionsToAnswer: string[];
};

export type VisitAction = BaseAction & {
  action: "visit";
  URLTargets: number[] | string[];
};

export type CodingAction = BaseAction & {
  action: "coding";
  codingIssue: string;
};

export type StepAction = SearchAction | AnswerAction | ReflectAction | VisitAction | CodingAction;

export type EvaluationType = 'definitive' | 'freshness' | 'plurality' | 'attribution' | 'completeness' | 'strict';

export type RepeatEvaluationType = {
    type: EvaluationType;
    numEvalsRequired: number;
}

// Following Vercel AI SDK's token counting interface
export interface TokenUsage {
  tool: string;
  usage: LanguageModelUsage;
}

// 这些搜索响应接口已移至 src/services/search/types.ts


export interface ReadResponse {
  code: number;
  status: number;
  data?: {
    title: string;
    description: string;
    url: string;
    content: string;
    usage: { tokens: number; };
    links: Array<[string, string]>; // [anchor, url]
  };
  name?: string;
  message?: string;
  readableMessage?: string;
}


export type EvaluationResponse = {
  pass: boolean;
  think: string;
  type?: EvaluationType;
  freshness_analysis?: {
    days_ago: number;
    max_age_days?: number;
  };
  plurality_analysis?: {
    minimum_count_required: number;
    actual_count_provided: number;
  };
  exactQuote?: string;
  completeness_analysis?: {
    aspects_expected: string,
    aspects_provided: string,
  },
  improvement_plan?: string;
};

export type CodeGenResponse = {
  think: string;
  code: string;
}

export type ErrorAnalysisResponse = {
  recap: string;
  blame: string;
  improvement: string;
};


// 搜索相关类型已移至 src/services/search/types.ts
import { 
  UnNormalizedSearchSnippet, 
  SearchSnippet, 
  BoostedSearchSnippet 
} from './services/search/types';

export { 
  UnNormalizedSearchSnippet, 
  SearchSnippet, 
  BoostedSearchSnippet 
};

// OpenAI API Types
export interface Model {
  id: string;
  object: 'model';
  created: number;
  owned_by: string;
}

export type PromptPair = { system: string, user: string };

export type ResponseFormat = {
  type: 'json_schema' | 'json_object';
  json_schema?: any;
}

export interface ChatCompletionRequest {
  model: string;
  messages: Array<CoreMessage>;
  stream?: boolean;
  reasoning_effort?: 'low' | 'medium' | 'high';
  max_completion_tokens?: number;

  budget_tokens?: number;
  max_attempts?: number;

  response_format?: ResponseFormat;
  no_direct_answer?: boolean;
  max_returned_urls?: number;

  boost_hostnames?: string[];
  bad_hostnames?: string[];
  only_hostnames?: string[];
}

export interface URLAnnotation {
  type: 'url_citation',
  url_citation: Reference
}

export interface ChatCompletionResponse {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string;
  system_fingerprint: string;
  choices: Array<{
    index: number;
    message: {
      role: 'assistant';
      content: string;
      type: 'text' | 'think' | 'json' | 'error';
      annotations?: Array<URLAnnotation>;
    };
    logprobs: null;
    finish_reason: 'stop' | 'error';
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  visitedURLs?: string[];
  readURLs?: string[];
  numURLs?: number;
}

export interface ChatCompletionChunk {
  id: string;
  object: 'chat.completion.chunk';
  created: number;
  model: string;
  system_fingerprint: string;
  choices: Array<{
    index: number;
    delta: {
      role?: 'assistant';
      content?: string;
      type?: 'text' | 'think' | 'json' | 'error';
      url?: string;
      annotations?: Array<URLAnnotation>;
    };
    logprobs: null;
    finish_reason: null | 'stop' | 'thinking_end' | 'error';
  }>;
  usage?: any;
  visitedURLs?: string[];
  readURLs?: string[];
  numURLs?: number;
}

// Tracker Types
import {TokenTracker} from './utils/token-tracker';
import {ActionTracker} from './utils/action-tracker';

export interface TrackerContext {
  tokenTracker: TokenTracker;
  actionTracker: ActionTracker;
}
