export interface Article {
  id: number;
  title: string;
  date: string;
  category: string;
  summary: string;
  description: string;
  keywords: string[]; // Add keywords field
}