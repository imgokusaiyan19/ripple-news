import { NewsCard } from './NewsCard';
import { NewsArticle } from '@/types/news';
import { Skeleton } from '@/components/ui/skeleton';

interface NewsGridProps {
  articles: NewsArticle[];
  isLoading: boolean;
  onSaveArticle: (article: NewsArticle) => void;
  onShareArticle: (article: NewsArticle) => void;
  savedArticles: Set<string>;
}

export const NewsGrid = ({ 
  articles, 
  isLoading, 
  onSaveArticle, 
  onShareArticle, 
  savedArticles 
}: NewsGridProps) => {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="space-y-3 stagger-fade-in">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-muted-foreground">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📰</span>
          </div>
          <h3 className="text-lg font-medium mb-2">No articles found</h3>
          <p className="text-sm">Try adjusting your search or category filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={`${article.url}-${index}`} className="stagger-fade-in">
            <NewsCard
              article={article}
              onSave={onSaveArticle}
              onShare={onShareArticle}
              isSaved={savedArticles.has(article.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};