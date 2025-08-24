import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Calendar, 
  TrendingUp, 
  Shield,
  Clock,
  X 
} from 'lucide-react';
import { newsCategories } from './CategoryTabs';

export interface SearchFilters {
  query: string;
  categories: string[];
  dateRange: 'today' | 'week' | 'month' | 'year' | 'all';
  sortBy: 'relevance' | 'date' | 'popularity' | 'credibility';
  sentiment: 'all' | 'positive' | 'negative' | 'neutral';
  minCredibility: number;
  readingTime: [number, number];
  hasImage: boolean;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
}

const defaultFilters: SearchFilters = {
  query: '',
  categories: [],
  dateRange: 'all',
  sortBy: 'relevance',
  sentiment: 'all',
  minCredibility: 0,
  readingTime: [1, 10],
  hasImage: false,
};

export const AdvancedSearch = ({ onSearch, initialFilters }: AdvancedSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    
    // Count active filters
    let count = 0;
    if (updated.query) count++;
    if (updated.categories.length > 0) count++;
    if (updated.dateRange !== 'all') count++;
    if (updated.sentiment !== 'all') count++;
    if (updated.minCredibility > 0) count++;
    if (updated.hasImage) count++;
    setActiveFiltersCount(count);
  };

  const handleSearch = () => {
    onSearch(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setActiveFiltersCount(0);
  };

  const toggleCategory = (categoryId: string) => {
    const categories = filters.categories.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...filters.categories, categoryId];
    updateFilters({ categories });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="relative hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Filter className="h-4 w-4 mr-2" />
          Advanced
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-playfair flex items-center space-x-2">
            <Search className="h-5 w-5 text-primary" />
            <span>Advanced Search</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Query */}
          <div className="space-y-2">
            <Label htmlFor="search-query">Search Keywords</Label>
            <Input
              id="search-query"
              placeholder="Enter keywords, topics, or phrases..."
              value={filters.query}
              onChange={(e) => updateFilters({ query: e.target.value })}
              className="text-sm"
            />
          </div>

          <Separator />

          {/* Categories */}
          <div className="space-y-3">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2">
              {newsCategories.filter(cat => cat.id !== 'all').map((category) => {
                const isSelected = filters.categories.includes(category.id);
                const Icon = category.icon;
                
                return (
                  <motion.div
                    key={category.id}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      }`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {category.name}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Date Range and Sort */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={filters.dateRange} onValueChange={(value: any) => updateFilters({ dateRange: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={filters.sortBy} onValueChange={(value: any) => updateFilters({ sortBy: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Latest First</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="credibility">Highest Credibility</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Sentiment Analysis */}
          <div className="space-y-3">
            <Label>Sentiment Filter</Label>
            <div className="flex space-x-2">
              {[
                { value: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
                { value: 'positive', label: 'Positive', color: 'bg-green-100 text-green-700' },
                { value: 'neutral', label: 'Neutral', color: 'bg-blue-100 text-blue-700' },
                { value: 'negative', label: 'Negative', color: 'bg-red-100 text-red-700' },
              ].map((sentiment) => (
                <Badge
                  key={sentiment.value}
                  variant={filters.sentiment === sentiment.value ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    filters.sentiment === sentiment.value 
                      ? 'bg-primary text-primary-foreground' 
                      : `hover:bg-muted ${sentiment.color}`
                  }`}
                  onClick={() => updateFilters({ sentiment: sentiment.value as any })}
                >
                  {sentiment.label}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Credibility Score */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <Label>Minimum Credibility Score: {filters.minCredibility}%</Label>
            </div>
            <Slider
              value={[filters.minCredibility]}
              onValueChange={([value]) => updateFilters({ minCredibility: value })}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          {/* Reading Time */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <Label>Reading Time: {filters.readingTime[0]}-{filters.readingTime[1]} minutes</Label>
            </div>
            <Slider
              value={filters.readingTime}
              onValueChange={(value) => updateFilters({ readingTime: value as [number, number] })}
              max={20}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <Separator />

          {/* Additional Filters */}
          <div className="space-y-3">
            <Label>Additional Filters</Label>
            <div className="flex items-center space-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={filters.hasImage}
                  onCheckedChange={(checked) => updateFilters({ hasImage: checked })}
                />
                <Label className="text-sm">Articles with images only</Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={clearFilters} size="sm">
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)} size="sm">
                Cancel
              </Button>
              <Button onClick={handleSearch} size="sm" className="bg-primary hover:bg-primary-hover">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};