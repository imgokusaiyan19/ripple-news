import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { CategoryTabs } from '@/components/CategoryTabs';
import { NewsGrid } from '@/components/NewsGrid';
import { EnhancedNewsCard } from '@/components/EnhancedNewsCard';
import { AuthModal } from '@/components/AuthModal';
import { BreakingNewsBanner } from '@/components/BreakingNewsBanner';
import { TrendingSidebar } from '@/components/TrendingSidebar';
import { SearchFilters } from '@/components/AdvancedSearch';
import { NewsArticle } from '@/types/news';
import { 
  enhancedMockNews, 
  fetchRealTimeNews, 
  fetchBreakingNews, 
  fetchTrendingTopics,
  BreakingNews,
  TrendingTopic 
} from '@/services/newsApi';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());
  const [breakingNews, setBreakingNews] = useState<BreakingNews[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters | null>(null);
  const { toast } = useToast();

  // Real-time news fetching
  const loadNews = async (category: string = 'all', filters?: SearchFilters) => {
    setIsLoading(true);
    try {
      const newsData = await fetchRealTimeNews(category !== 'all' ? category : undefined);
      
      let filteredNews = newsData;
      
      // Apply advanced filters if provided
      if (filters) {
        filteredNews = applyAdvancedFilters(newsData, filters);
      }
      
      setArticles(filteredNews);
    } catch (error) {
      console.error('Error loading news:', error);
      toast({
        variant: "destructive",
        title: "Error loading news",
        description: "Failed to fetch latest news. Using cached data.",
      });
      setArticles(enhancedMockNews);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply advanced search filters
  const applyAdvancedFilters = (articles: NewsArticle[], filters: SearchFilters): NewsArticle[] => {
    let filtered = [...articles];

    // Query filter
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query) ||
        article.source.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(article => filters.categories.includes(article.category));
    }

    // Sentiment filter
    if (filters.sentiment !== 'all') {
      filtered = filtered.filter(article => article.sentiment === filters.sentiment);
    }

    // Credibility filter
    if (filters.minCredibility > 0) {
      filtered = filtered.filter(article => 
        (article.credibilityScore || 0) >= filters.minCredibility
      );
    }

    // Reading time filter
    filtered = filtered.filter(article => {
      const readingTime = article.readingTime || 5;
      return readingTime >= filters.readingTime[0] && readingTime <= filters.readingTime[1];
    });

    // Image filter
    if (filters.hasImage) {
      filtered = filtered.filter(article => article.urlToImage);
    }

    // Sort articles
    switch (filters.sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.socialShares || 0) - (a.socialShares || 0));
        break;
      case 'credibility':
        filtered.sort((a, b) => (b.credibilityScore || 0) - (a.credibilityScore || 0));
        break;
      default: // relevance
        // Keep original order for relevance
        break;
    }

    return filtered;
  };

  // Load breaking news and trending topics
  const loadMetaData = async () => {
    try {
      const [breaking, trending] = await Promise.all([
        fetchBreakingNews(),
        fetchTrendingTopics()
      ]);
      setBreakingNews(breaking);
      setTrendingTopics(trending);
    } catch (error) {
      console.error('Error loading metadata:', error);
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery('');
    setCurrentFilters(null);
    loadNews(category);
  };

  // Handle simple search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = enhancedMockNews.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description?.toLowerCase().includes(query.toLowerCase()) ||
        article.source.toLowerCase().includes(query.toLowerCase())
      );
      setArticles(filtered);
    } else {
      loadNews(activeCategory, currentFilters);
    }
  };

  // Handle advanced search
  const handleAdvancedSearch = (filters: SearchFilters) => {
    setCurrentFilters(filters);
    setSearchQuery(filters.query);
    loadNews(activeCategory, filters);
    toast({
      title: "Search applied",
      description: "Advanced filters have been applied to your news feed.",
    });
  };

  // Handle trending topic click
  const handleTrendingTopicClick = (topic: string) => {
    handleSearch(topic);
    toast({
      title: "Trending topic selected",
      description: `Showing news about "${topic}"`,
    });
  };

  // Handle breaking news click
  const handleBreakingNewsClick = (news: BreakingNews) => {
    handleSearch(news.title);
    toast({
      title: "Breaking news selected",
      description: `Showing articles related to: ${news.title}`,
    });
  };

  // Handle authentication
  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    toast({
      title: "Welcome to NewsFlow Premium!",
      description: "You now have access to advanced features and personalized news.",
    });
  };

  // Handle save article
  const handleSaveArticle = (article: NewsArticle) => {
    const newSavedArticles = new Set(savedArticles);
    
    if (savedArticles.has(article.url)) {
      newSavedArticles.delete(article.url);
      toast({
        title: "Article removed",
        description: "Article removed from your saved list.",
      });
    } else {
      newSavedArticles.add(article.url);
      toast({
        title: "Article saved",
        description: "Article added to your saved list.",
      });
    }
    
    setSavedArticles(newSavedArticles);
  };

  // Handle share article
  const handleShareArticle = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description || '',
        url: article.url,
      });
    } else {
      navigator.clipboard.writeText(article.url);
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard.",
      });
    }
  };

  // Load initial data
  useEffect(() => {
    loadNews();
    loadMetaData();
    
    // Set up real-time updates every 5 minutes
    const interval = setInterval(() => {
      loadMetaData();
      if (!currentFilters && !searchQuery) {
        loadNews(activeCategory);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [activeCategory, currentFilters, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Breaking News Banner */}
      <BreakingNewsBanner 
        breakingNews={breakingNews}
        onNewsClick={handleBreakingNewsClick}
      />
      
      <Header
        onSearch={handleSearch}
        onAdvancedSearch={handleAdvancedSearch}
        onLoginClick={() => setIsAuthModalOpen(true)}
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
      />
      
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <motion.div 
                    key={index} 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="aspect-video bg-muted rounded-lg animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                    <div className="flex justify-between">
                      <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
                      <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📰</span>
                </div>
                <h3 className="text-lg font-medium mb-2">No articles found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or category filters.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <EnhancedNewsCard
                    key={`${article.url}-${index}`}
                    article={article}
                    onSave={handleSaveArticle}
                    onShare={handleShareArticle}
                    isSaved={savedArticles.has(article.url)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80">
            <TrendingSidebar 
              trendingTopics={trendingTopics}
              onTopicClick={handleTrendingTopicClick}
            />
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
