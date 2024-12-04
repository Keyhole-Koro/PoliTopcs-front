export interface Article {
  id: number;
  title: string;
  date: string;
  category: string;
  summary: string;
  description: string;
  dialogs: Dialog[];
  keywords: string[];
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