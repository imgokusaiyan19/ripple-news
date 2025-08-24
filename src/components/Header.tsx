import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, Bell, User, Heart, Settings, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdvancedSearch, SearchFilters } from './AdvancedSearch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onSearch: (query: string) => void;
  onAdvancedSearch: (filters: SearchFilters) => void;
  onLoginClick: () => void;
  isAuthenticated: boolean;
  userEmail?: string;
}

export const Header = ({ onSearch, onAdvancedSearch, onLoginClick, isAuthenticated, userEmail }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center space-x-2">
              <motion.div 
                className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Zap className="text-white h-4 w-4" />
              </motion.div>
              <h1 className="text-xl font-playfair font-semibold text-foreground">
                NewsFlow
              </h1>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-2"
              >
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                  LIVE
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="flex space-x-2">
              <form onSubmit={handleSearch} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search breaking news, topics, sources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full bg-muted/50 border-0 focus:bg-background transition-colors"
                />
              </form>
              
              <AdvancedSearch 
                onSearch={onAdvancedSearch}
                initialFilters={defaultFilters}
              />
            </div>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center"
                    >
                      <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                        3
                      </Badge>
                    </motion.div>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" size="sm" className="relative">
                        <User className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{userEmail}</p>
                        <p className="w-[200px] truncate text-xs text-muted-foreground">
                          Premium Member
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Preferences
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      Saved Articles
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={onLoginClick} variant="default" size="sm" className="bg-primary hover:bg-primary-hover">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Get Premium
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};