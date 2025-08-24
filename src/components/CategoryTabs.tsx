import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Laptop,
  TrendingUp,
  Trophy,
  Heart,
  Clapperboard,
  Vote,
  Globe
} from 'lucide-react';

export interface NewsCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  count?: number;
}

export const newsCategories: NewsCategory[] = [
  { id: 'all', name: 'All News', icon: Globe, count: 142 },
  { id: 'technology', name: 'Technology', icon: Laptop, count: 28 },
  { id: 'business', name: 'Business', icon: TrendingUp, count: 34 },
  { id: 'sports', name: 'Sports', icon: Trophy, count: 19 },
  { id: 'health', name: 'Health', icon: Heart, count: 15 },
  { id: 'entertainment', name: 'Entertainment', icon: Clapperboard, count: 22 },
  { id: 'politics', name: 'Politics', icon: Vote, count: 24 },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-4">
        <Tabs value={activeCategory} onValueChange={onCategoryChange}>
          <TabsList className="h-auto p-0 bg-transparent w-full justify-start">
            <div className="flex space-x-2 overflow-x-auto pb-3 pt-3">
              {newsCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className={`
                      inline-flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200
                      hover:scale-105 whitespace-nowrap
                      ${isActive 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-background text-foreground border-border hover:bg-muted'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{category.name}</span>
                    {category.count && (
                      <Badge 
                        variant="secondary" 
                        className={`ml-1 text-xs ${isActive ? 'bg-white/20 text-white' : ''}`}
                      >
                        {category.count}
                      </Badge>
                    )}
                  </TabsTrigger>
                );
              })}
            </div>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};