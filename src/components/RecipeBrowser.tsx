import { useState } from 'react';
import { Search, Filter, Clock, Users, Star, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Recipe, FilterOptions } from '../types';

interface RecipeBrowserProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  selectedRecipe: Recipe | null;
}

export function RecipeBrowser({ 
  recipes, 
  onRecipeSelect, 
  selectedRecipe 
}: RecipeBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    cuisine: [],
    difficulty: [],
    maxPrepTime: 120,
    minServings: 1,
    maxServings: 8,
    dietary: [],
    ingredients: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  const cuisineTypes = ['Australian', 'Asian', 'European', 'Mediterranean', 'Indian', 'Mexican', 'Other'];
  const difficultyLevels = ['Easy', 'Medium', 'Hard'];

  const filteredRecipes = recipes.filter(recipe => {
    // Text search
    if (searchQuery && !recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }

    // Cuisine filter
    if (filters.cuisine.length > 0 && !filters.cuisine.includes(recipe.cuisine)) {
      return false;
    }

    // Difficulty filter
    if (filters.difficulty.length > 0 && !filters.difficulty.includes(recipe.difficulty)) {
      return false;
    }

    // Prep time filter
    if (recipe.prepTime > filters.maxPrepTime) {
      return false;
    }

    // Servings filter
    if (recipe.servings < filters.minServings || recipe.servings > filters.maxServings) {
      return false;
    }

    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCuisineIcon = (cuisine: string) => {
    switch (cuisine) {
      case 'Australian': return '🇦🇺';
      case 'Asian': return '🥢';
      case 'European': return '🍝';
      case 'Mediterranean': return '🫒';
      case 'Indian': return '🍛';
      case 'Mexican': return '🌮';
      default: return '🍽️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Recipe Browser</h2>
          <p className="text-muted-foreground mt-1">
            Discover delicious Australian and international recipes
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {filteredRecipes.length} of {recipes.length} recipes
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes, ingredients, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Cuisine Type</label>
                  <Select 
                    value={filters.cuisine[0] || ''} 
                    onValueChange={(value) => 
                      setFilters(prev => ({ 
                        ...prev, 
                        cuisine: value ? [value] : [] 
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any cuisine</SelectItem>
                      {cuisineTypes.map(cuisine => (
                        <SelectItem key={cuisine} value={cuisine}>
                          {getCuisineIcon(cuisine)} {cuisine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <Select 
                    value={filters.difficulty[0] || ''} 
                    onValueChange={(value) => 
                      setFilters(prev => ({ 
                        ...prev, 
                        difficulty: value ? [value] : [] 
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any difficulty</SelectItem>
                      {difficultyLevels.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Max Prep Time</label>
                  <Select 
                    value={filters.maxPrepTime.toString()} 
                    onValueChange={(value) => 
                      setFilters(prev => ({ 
                        ...prev, 
                        maxPrepTime: parseInt(value) 
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFilters({
                  cuisine: [],
                  difficulty: [],
                  maxPrepTime: 120,
                  minServings: 1,
                  maxServings: 8,
                  dietary: [],
                  ingredients: [],
                })}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <Card 
            key={recipe.id}
            className={`recipe-card ${selectedRecipe?.id === recipe.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => onRecipeSelect(recipe)}
          >
            <CardHeader className="p-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-lg flex items-center justify-center">
                <div className="text-4xl opacity-60">
                  {getCuisineIcon(recipe.cuisine)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg leading-tight">
                  {recipe.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {recipe.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.prepTime}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>
                
                <Badge className={getDifficultyColor(recipe.difficulty)}>
                  {recipe.difficulty}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-sm">{getCuisineIcon(recipe.cuisine)}</span>
                  <span className="text-sm text-muted-foreground">{recipe.cuisine}</span>
                </div>
                
                {selectedRecipe?.id === recipe.id ? (
                  <Badge variant="default" className="text-xs">
                    Selected
                  </Badge>
                ) : (
                  <Button size="sm" variant="ghost" className="h-8 px-2">
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {recipe.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {recipe.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{recipe.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 opacity-20">🍽️</div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No recipes found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
}