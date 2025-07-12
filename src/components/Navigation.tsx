import { Calendar, ChefHat, ShoppingCart, User, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ViewMode } from '../types';

interface NavigationProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  userPostcode?: string;
  shoppingListCount?: number;
}

export function Navigation({ 
  activeView, 
  onViewChange, 
  userPostcode = '2000',
  shoppingListCount = 0 
}: NavigationProps) {
  const navItems = [
    {
      view: 'planner' as ViewMode,
      label: 'Weekly Planner',
      icon: Calendar,
      description: 'Plan your meals for the week',
    },
    {
      view: 'recipes' as ViewMode,
      label: 'Recipe Browser',
      icon: ChefHat,
      description: 'Discover Australian recipes',
    },
    {
      view: 'shopping' as ViewMode,
      label: 'Shopping List',
      icon: ShoppingCart,
      description: 'Your store-categorized list',
      badge: shoppingListCount > 0 ? shoppingListCount : undefined,
    },
    {
      view: 'profile' as ViewMode,
      label: 'Profile',
      icon: User,
      description: 'Settings and preferences',
    },
  ];

  return (
    <header className="gradient-bg border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Taiping's Grocery
                </h1>
                <p className="text-xs text-muted-foreground">
                  Australian Meal Planning
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeView === item.view;
              
              return (
                <Button
                  key={item.view}
                  variant={isActive ? 'default' : 'ghost'}
                  className="relative h-10 px-4 text-sm font-medium"
                  onClick={() => onViewChange(item.view)}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.label}
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="ml-2 px-1.5 py-0.5 text-xs min-w-[1.25rem] h-5"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Location and Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{userPostcode}</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs font-medium"
            >
              Change Location
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-1 overflow-x-auto">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeView === item.view;
              
              return (
                <Button
                  key={item.view}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="relative flex-shrink-0 text-xs"
                  onClick={() => onViewChange(item.view)}
                >
                  <IconComponent className="w-4 h-4 mr-1" />
                  {item.label}
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="ml-1 px-1 py-0 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}