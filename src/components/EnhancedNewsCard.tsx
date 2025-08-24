import { useState } from 'react';
import { motion } from 'framer-motion';
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
  BookmarkCheck,
  TrendingUp,
  Shield,
  Eye,
  MessageCircle
} from 'lucide-react';
import { NewsArticle } from '@/types/news';

interface EnhancedNewsCardProps {
  article: NewsArticle;
  onSave: (article: NewsArticle) => void;
  onShare: (article: NewsArticle) => void;
  isSaved?: boolean;
  index?: number;
}

export const EnhancedNewsCard = ({ article, onSave, onShare, isSaved = false, index = 0 }: EnhancedNewsCardProps) => {
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

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getCredibilityColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
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

  const formatSocialShares = (shares?: number) => {
    if (!shares) return '0';
    if (shares < 1000) return shares.toString();
    if (shares < 1000000) return `${(shares / 1000).toFixed(1)}k`;
    return `${(shares / 1000000).toFixed(1)}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="news-card overflow-hidden h-full flex flex-col bg-gradient-card hover:shadow-2xl transition-all duration-300 border border-border/50 group">
        <CardHeader className="p-0 relative">
          {article.urlToImage && !imageError ? (
            <div className="relative aspect-video overflow-hidden">
              <motion.img
                src={article.urlToImage}
                alt={article.title}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
              
              {/* Enhanced overlay with gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Category and metrics badges */}
              <div className="absolute top-3 left-3 flex space-x-2">
                <Badge className={`${getCategoryStyle(article.category)} border shadow-sm`}>
                  {article.category}
                </Badge>
                {article.credibilityScore && (
                  <Badge className="bg-white/90 text-gray-700 border-0 shadow-sm">
                    <Shield className="w-3 h-3 mr-1" />
                    {article.credibilityScore}%
                  </Badge>
                )}
              </div>

              {/* Reading time and sentiment */}
              <div className="absolute top-3 right-3 flex space-x-2">
                {article.readingTime && (
                  <Badge className="bg-black/50 text-white border-0 backdrop-blur-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readingTime}m
                  </Badge>
                )}
              </div>
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
            <h3 className="font-semibold text-lg leading-tight mb-3 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            
            {article.description && (
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                {article.description}
              </p>
            )}
          </div>

          <div className="space-y-4 mt-auto">
            {/* Enhanced metadata */}
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

            {/* Social engagement and sentiment */}
            {(article.socialShares || article.sentiment) && (
              <div className="flex items-center justify-between text-xs">
                {article.socialShares && (
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    <span>{formatSocialShares(article.socialShares)} shares</span>
                  </div>
                )}
                {article.sentiment && (
                  <div className={`flex items-center space-x-1 ${getSentimentColor(article.sentiment)}`}>
                    <div className={`w-2 h-2 rounded-full ${
                      article.sentiment === 'positive' ? 'bg-green-500' :
                      article.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                    }`} />
                    <span className="capitalize">{article.sentiment}</span>
                  </div>
                )}
              </div>
            )}

            {/* Enhanced actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSave(article)}
                    className="h-8 px-2 hover:bg-muted group-hover:bg-primary/10"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-primary" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </Button>
                </motion.div>
                
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onShare(article)}
                    className="h-8 px-2 hover:bg-muted group-hover:bg-primary/10"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(article.url, '_blank')}
                  className="h-8 px-3 text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-200 border-primary/20 hover:border-primary"
                >
                  Read More
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};