export interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: string;
  category: string;
  content?: string;
  author?: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface UserPreferences {
  favoriteCategories: string[];
  savedArticles: string[];
  notificationSettings: {
    breaking: boolean;
    daily: boolean;
    weekly: boolean;
  };
}