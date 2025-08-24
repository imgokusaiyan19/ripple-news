import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { TrendingTopic } from '@/services/newsApi';

interface TrendingSidebarProps {
  trendingTopics: TrendingTopic[];
  onTopicClick: (topic: string) => void;
}

export const TrendingSidebar = ({ trendingTopics, onTopicClick }: TrendingSidebarProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <Card className="border-2 border-primary/10 bg-gradient-card shadow-elevated">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-playfair flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Trending Topics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.keyword}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onTopicClick(topic.keyword)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">
                    {topic.keyword}
                  </span>
                  {getTrendIcon(topic.trend)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {topic.count} articles
                  </span>
                  <Badge className={`text-xs ${getSentimentColor(topic.sentiment)} border`}>
                    {topic.sentiment}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Live News Ticker */}
      <Card className="border-2 border-accent/10 bg-gradient-card shadow-elevated">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-playfair flex items-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 bg-red-500 rounded-full"
            />
            <span>Live Updates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground"
            >
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                2m ago
              </span>
              <p className="mt-1">Stock markets showing positive momentum...</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground"
            >
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                5m ago
              </span>
              <p className="mt-1">Tech sector announces major partnership...</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};