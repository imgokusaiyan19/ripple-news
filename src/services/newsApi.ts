// Real-time news service using NewsAPI
const NEWS_API_KEY = 'demo'; // Replace with actual API key when Supabase is connected
const NEWS_API_BASE = 'https://newsapi.org/v2';

// For demo purposes, we'll enhance our mock data with more realistic features
import { NewsArticle } from '@/types/news';

export interface TrendingTopic {
  keyword: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  trend: 'up' | 'down' | 'stable';
}

export interface BreakingNews {
  id: string;
  title: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  category: string;
}

// Enhanced mock data with AI features
export const enhancedMockNews: NewsArticle[] = [
  {
    title: "OpenAI Announces Revolutionary GPT-5 with Real-Time Reasoning Capabilities",
    description: "The latest AI model demonstrates unprecedented reasoning abilities and real-time learning, marking a significant leap in artificial intelligence development.",
    url: "https://example.com/openai-gpt5",
    urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    source: "AI Weekly",
    category: "technology",
    author: "Dr. Sarah Chen",
    readingTime: 4,
    sentiment: 'positive',
    credibilityScore: 95,
    socialShares: 2847,
    relatedArticles: ['ai-breakthrough-2024', 'machine-learning-trends']
  },
  {
    title: "Tesla Stock Surges 15% Following Autonomous Vehicle Fleet Approval",
    description: "Regulatory approval for Tesla's fully autonomous vehicle fleet sends stock prices soaring as investors anticipate revolutionary changes in transportation.",
    url: "https://example.com/tesla-autonomous",
    urlToImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600",
    publishedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    source: "Financial Herald",
    category: "business",
    author: "Michael Rodriguez",
    readingTime: 3,
    sentiment: 'positive',
    credibilityScore: 92,
    socialShares: 1523,
    relatedArticles: ['autonomous-vehicles-future', 'tesla-innovations']
  },
  {
    title: "Climate Summit Reaches Historic Agreement on Carbon Neutrality",
    description: "World leaders unite in landmark climate agreement, setting ambitious targets for global carbon neutrality by 2035, surpassing previous commitments.",
    url: "https://example.com/climate-summit",
    urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4e84d43d?w=600",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: "Global Environment Today",
    category: "politics",
    author: "Dr. Elena Martinez",
    readingTime: 6,
    sentiment: 'positive',
    credibilityScore: 98,
    socialShares: 3421,
    relatedArticles: ['climate-change-solutions', 'green-energy-future']
  },
  {
    title: "Revolutionary Cancer Treatment Shows 94% Success Rate in Clinical Trials",
    description: "Breakthrough immunotherapy treatment demonstrates remarkable success in treating advanced-stage cancers, offering new hope for patients worldwide.",
    url: "https://example.com/cancer-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: "Medical Breakthroughs Journal",
    category: "health",
    author: "Dr. Amanda Kim",
    readingTime: 5,
    sentiment: 'positive',
    credibilityScore: 96,
    socialShares: 4567,
    relatedArticles: ['cancer-research-2024', 'immunotherapy-advances']
  },
  {
    title: "Cryptocurrency Market Experiences Major Volatility Amid Regulation News",
    description: "Digital currencies see significant price fluctuations following announcements of new regulatory frameworks from major economic powers.",
    url: "https://example.com/crypto-volatility",
    urlToImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: "Crypto Finance News",
    category: "business",
    author: "Robert Chen",
    readingTime: 4,
    sentiment: 'neutral',
    credibilityScore: 88,
    socialShares: 2156,
    relatedArticles: ['cryptocurrency-regulations', 'digital-finance-trends']
  }
];

export const breakingNews: BreakingNews[] = [
  {
    id: '1',
    title: "BREAKING: Major Tech Companies Form AI Safety Alliance",
    urgency: 'high',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    category: 'technology'
  },
  {
    id: '2', 
    title: "Global Markets Open Higher Following Economic Data Release",
    urgency: 'medium',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    category: 'business'
  }
];

export const trendingTopics: TrendingTopic[] = [
  { keyword: "Artificial Intelligence", count: 156, sentiment: 'positive', trend: 'up' },
  { keyword: "Climate Change", count: 134, sentiment: 'neutral', trend: 'up' },
  { keyword: "Cryptocurrency", count: 98, sentiment: 'neutral', trend: 'down' },
  { keyword: "Space Exploration", count: 87, sentiment: 'positive', trend: 'up' },
  { keyword: "Renewable Energy", count: 76, sentiment: 'positive', trend: 'stable' },
  { keyword: "Electric Vehicles", count: 65, sentiment: 'positive', trend: 'up' }
];

// Simulated real-time news fetching
export const fetchRealTimeNews = async (category?: string): Promise<NewsArticle[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In production, this would call the actual NewsAPI
  // const response = await fetch(`${NEWS_API_BASE}/top-headlines?category=${category}&apiKey=${NEWS_API_KEY}`);
  // const data = await response.json();
  
  // For now, return enhanced mock data with some randomization
  const shuffled = [...enhancedMockNews].sort(() => Math.random() - 0.5);
  return category && category !== 'all' 
    ? shuffled.filter(article => article.category === category)
    : shuffled;
};

export const fetchBreakingNews = async (): Promise<BreakingNews[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return breakingNews;
};

export const fetchTrendingTopics = async (): Promise<TrendingTopic[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return trendingTopics;
};