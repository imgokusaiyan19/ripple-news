import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Share2, 
  ExternalLink, 
  Clock, 
  User,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { NewsArticle } from '@/types/news';

interface NewsCardProps {
  article: NewsArticle;
  onSave: (article: NewsArticle) => void;
  onShare: (article: NewsArticle) => void;
  isSaved?: boolean;
}

export const NewsCard = ({ article, onSave, onShare, isSaved = false }: NewsCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getCategoryStyle = (category: string) => {
    const styles = {
      technology: 'category-tech',
      business: 'category-business',
      sports: 'category-sports',
      health: 'category-health',
      entertainment: 'category-entertainment',
      politics: 'category-politics',
    };
    return styles[category as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <Card className="news-card overflow-hidden h-full flex flex-col bg-gradient-card">
      <CardHeader className="p-0">
        {article.urlToImage && !imageError ? (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            <div className="absolute top-3 left-3">
              <Badge className={`${getCategoryStyle(article.category)} border`}>
                {article.category}
              </Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-hero flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <ExternalLink className="w-8 h-8" />
              </div>
              <p className="text-sm">No image available</p>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 text-foreground">
            {article.title}
          </h3>
          
          {article.description && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">
              {article.description}
            </p>
          )}
        </div>

        <div className="space-y-3 mt-auto">
          {/* Source and Time */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span className="truncate">{article.source}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(article.publishedAt)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSave(article)}
                className="h-8 px-2 hover:bg-muted"
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 text-primary" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(article)}
                className="h-8 px-2 hover:bg-muted"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(article.url, '_blank')}
              className="h-8 px-3 text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Read More
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};