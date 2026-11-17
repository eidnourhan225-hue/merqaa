export type CategoryId =
  | 'all'
  | 'minya'
  | 'universities'
  | 'street'
  | 'solutions'
  | 'data'
  | 'videos'
  | 'politics'
  | 'economy'
  | 'sports'
  | 'accidents'
  | 'health'
  | 'culture';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortDesc: string;
  iconName?: string;
  colorClass: string;
}

export interface ArticleComment {
  id: string;
  userName: string;
  avatar?: string;
  date: string;
  content: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  kicker?: string; // مانشيت فرعي أو كيكر
  summary: string;
  content: string[]; // فقرات الخبر
  category: CategoryId;
  subCategory?: string; // مثلاً: جامعة المنيا، مركز ملوي، دوري المحترفين
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readingTimeMinutes: number;
  imageUrl: string;
  imageCaption?: string;
  isLead?: boolean; // الخبر الرئيسي
  isBreaking?: boolean; // خبر عاجل
  isTrending?: boolean; // الأكثر رواجاً
  viewsCount: number;
  tags: string[];
  comments: ArticleComment[];
  location?: string;
  quote?: {
    text: string;
    author: string;
  };
  solutionMeta?: {
    problem: string;
    response: string;
    impact: string;
    limitations: string;
  };
  dataHighlight?: {
    metricLabel: string;
    metricValue: string;
    source: string;
  };
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  categoryLabel: string;
  reporter: string;
  duration: string;
  publishedAt: string;
  sourceType: 'youtube' | 'mp4' | 'local';
  videoUrl: string; // YouTube embed/watch URL, MP4 URL, or local blob/data URL
  thumbnailUrl?: string;
  viewsCount: number;
  isUserAdded?: boolean;
}

export interface DataPoint {
  label: string;
  value: number;
  unit: string;
  note?: string;
}

export interface DataJournalismDataset {
  id: string;
  title: string;
  subtitle: string;
  source: string;
  updatedAt: string;
  keyStatValue: string;
  keyStatLabel: string;
  points: DataPoint[];
}

export interface MinyaCenter {
  id: string;
  name: string;
  tagline: string;
  famousFor: string;
  newsCount: number;
}

export interface PrayerTime {
  name: string;
  time: string;
  englishKey: string;
  isNext?: boolean;
}

export interface MarketRate {
  item: string;
  buyPrice: string;
  sellPrice: string;
  change: string;
  isUp: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  id: string;
  question: string;
  category: string;
  totalVotes: number;
  options: PollOption[];
}
