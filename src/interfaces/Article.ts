export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  description: string;
  dialogs: Dialog[];
  participants: participants[];
  tags: string[];
  keywords: string[];
  terms: Term[];
}

export interface participants {
  name: string,
  summary: string
}

export interface Term {
  term: string;
  definition: string;
}

export interface Dialog {
  id: number;
  speaker: string;
  summary: string;
  response_to: ResponseTo[];
}

export interface ResponseTo {
  dialog_id: number;
  reaction: Reaction;
}

export enum Reaction {
  AGREE = "agree",
  DISAGREE = "disagree",
  NEUTRAL = "neutral"
}