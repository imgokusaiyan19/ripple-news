import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Zap, TrendingUp } from 'lucide-react';
import { BreakingNews } from '@/services/newsApi';

interface BreakingNewsBannerProps {
  breakingNews: BreakingNews[];
  onNewsClick: (news: BreakingNews) => void;
}

export const BreakingNewsBanner = ({ breakingNews, onNewsClick }: BreakingNewsBannerProps) => {
  if (breakingNews.length === 0) return null;

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      case 'high':
        return <Zap className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-4 overflow-x-auto">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Zap className="h-5 w-5" />
            </motion.div>
            <span className="font-bold text-sm">BREAKING</span>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto">
            {breakingNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                onClick={() => onNewsClick(news)}
                className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors flex-shrink-0"
              >
                <Badge className={`${getUrgencyColor(news.urgency)} text-white border-0`}>
                  {getUrgencyIcon(news.urgency)}
                </Badge>
                <span className="text-sm font-medium whitespace-nowrap">
                  {news.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};