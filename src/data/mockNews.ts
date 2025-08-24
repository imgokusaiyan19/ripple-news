import { NewsArticle } from '@/types/news';

// Mock news data for demonstration
export const mockNewsArticles: NewsArticle[] = [
  {
    title: "Breakthrough in Quantum Computing Achieved by Tech Giants",
    description: "Major technology companies announce significant advancement in quantum computing capabilities, potentially revolutionizing data processing and encryption.",
    url: "https://example.com/quantum-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: "TechNews Daily",
    category: "technology",
    author: "Dr. Sarah Chen"
  },
  {
    title: "Global Markets React to Central Bank Policy Changes",
    description: "International stock markets show mixed reactions following central bank announcements regarding interest rate adjustments and monetary policy shifts.",
    url: "https://example.com/market-reaction",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: "Financial Times",
    category: "business",
    author: "Michael Rodriguez"
  },
  {
    title: "Championship Final Draws Record Television Audience",
    description: "The highly anticipated championship game breaks viewership records, with millions of fans tuning in worldwide to witness the historic match.",
    url: "https://example.com/championship-record",
    urlToImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: "Sports Network",
    category: "sports",
    author: "James Wilson"
  },
  {
    title: "New Study Reveals Surprising Health Benefits of Mediterranean Diet",
    description: "Researchers publish comprehensive study showing additional health benefits of Mediterranean diet beyond previously known cardiovascular advantages.",
    url: "https://example.com/mediterranean-study",
    urlToImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: "Health & Science Journal",
    category: "health",
    author: "Dr. Elena Martinez"
  },
  {
    title: "Blockbuster Movie Sequel Dominates Global Box Office",
    description: "The latest installment in the popular franchise sets new opening weekend records across international markets, exceeding industry expectations.",
    url: "https://example.com/blockbuster-sequel",
    urlToImage: "https://images.unsplash.com/photo-1489599363747-d65a2fb5c1e5?w=400",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: "Entertainment Weekly",
    category: "entertainment",
    author: "Lisa Thompson"
  },
  {
    title: "Congressional Committee Announces Infrastructure Investigation",
    description: "Bipartisan committee launches comprehensive investigation into national infrastructure spending and efficiency across multiple government departments.",
    url: "https://example.com/infrastructure-investigation",
    urlToImage: "https://images.unsplash.com/photo-1563736418-62a7b3171b7c?w=400",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: "Political Tribune",
    category: "politics",
    author: "Robert Anderson"
  },
  {
    title: "AI Innovation Transforms Medical Diagnosis Accuracy",
    description: "Artificial intelligence systems demonstrate unprecedented accuracy in medical imaging analysis, promising to revolutionize diagnostic procedures.",
    url: "https://example.com/ai-medical-diagnosis",
    urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    source: "Medical Innovation Today",
    category: "technology",
    author: "Dr. Amanda Kim"
  },
  {
    title: "Renewable Energy Sector Posts Record Growth Numbers",
    description: "Solar and wind energy industries report unprecedented growth figures for the quarter, surpassing fossil fuel investments for the first time.",
    url: "https://example.com/renewable-growth",
    urlToImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400",
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    source: "Energy Business Review",
    category: "business",
    author: "Thomas Green"
  },
  {
    title: "Olympic Training Facility Reveals Advanced Technology Integration",
    description: "State-of-the-art training center showcases cutting-edge technology designed to enhance athlete performance and reduce injury risk.",
    url: "https://example.com/olympic-technology",
    urlToImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    source: "Olympic News Network",
    category: "sports",
    author: "Maria Garcia"
  }
];

// Function to get articles by category
export const getArticlesByCategory = (category: string): NewsArticle[] => {
  if (category === 'all') {
    return mockNewsArticles;
  }
  return mockNewsArticles.filter(article => article.category === category);
};

// Function to search articles
export const searchArticles = (query: string): NewsArticle[] => {
  if (!query.trim()) {
    return mockNewsArticles;
  }
  
  const searchTerm = query.toLowerCase();
  return mockNewsArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.description?.toLowerCase().includes(searchTerm) ||
    article.category.toLowerCase().includes(searchTerm) ||
    article.source.toLowerCase().includes(searchTerm)
  );
};