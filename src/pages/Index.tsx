import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CategoryTabs } from '@/components/CategoryTabs';
import { NewsGrid } from '@/components/NewsGrid';
import { AuthModal } from '@/components/AuthModal';
import { NewsArticle } from '@/types/news';
import { mockNewsArticles, getArticlesByCategory, searchArticles } from '@/data/mockNews';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [articles, setArticles] = useState<NewsArticle[]>(mockNewsArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Simulate loading articles
  const loadArticles = (category: string, query?: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredArticles;
      
      if (query) {
        filteredArticles = searchArticles(query);
      } else {
        filteredArticles = getArticlesByCategory(category);
      }
      
      setArticles(filteredArticles);
      setIsLoading(false);
    }, 500);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery('');
    loadArticles(category);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      loadArticles(activeCategory, query);
    } else {
      loadArticles(activeCategory);
    }
  };

  // Handle authentication
  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    // In a real app, you'd store this in localStorage or a state management solution
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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(article.url);
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard.",
      });
    }
  };

  // Load initial articles
  useEffect(() => {
    loadArticles('all');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onLoginClick={() => setIsAuthModalOpen(true)}
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
      />
      
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <NewsGrid
        articles={articles}
        isLoading={isLoading}
        onSaveArticle={handleSaveArticle}
        onShareArticle={handleShareArticle}
        savedArticles={savedArticles}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
