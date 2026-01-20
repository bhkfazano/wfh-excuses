export type ExcuseCategory = 'tech' | 'pet' | 'health' | 'absurd';

export interface Excuse {
  id: string;
  text: string;
  category: ExcuseCategory;
  icon: string;
}

export interface HistoryItem extends Excuse {
  timestamp: number;
}