export type MsdtPointCategory =
  | 'geography'
  | 'botany'
  | 'ethnography'
  | 'history'
  | 'general';

export interface MsdtPointImage {
  url: string;
  caption: string;
  isPrimary?: boolean;
}

export interface MsdtPointContent {
  title: string;
  description: string;
  quote?: string;
  archiveRef?: string;
}

export interface MsdtPoint {
  id: string;
  name: string;
  origin_name: string;
  date?: string;
  coordinates: [number, number];
  category: MsdtPointCategory;
  content: MsdtPointContent;
  images?: MsdtPointImage[];
}
