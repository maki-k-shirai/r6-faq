export type FAQ = {
  id: number;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  updated_at: string;
  related_links?: Array<{ label: string; href: string }>;
};
