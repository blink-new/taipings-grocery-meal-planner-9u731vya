import { useState } from 'react';
import { Calendar, Plus, Clock, Users, ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { WeeklyPlan, MealPlan, Recipe, MealType } from '../types';

interface WeeklyPlannerProps {
  weeklyPlan: WeeklyPlan;
  recipes: Recipe[];
  onMealAdd: (date: string, mealType: MealType, recipe: Recipe) => void;
  onMealRemove: (mealId: string) => void;
  onGenerateShoppingList: () => void;
}

export function WeeklyPlanner({
  weeklyPlan,
  recipes,
  onMealAdd,
  onMealRemove,
  onGenerateShoppingList,
}: WeeklyPlannerProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [targetDay, setTargetDay] = useState<string>('');
  const [targetMeal, setTargetMeal] = useState<MealType>('dinner');

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];

  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  const getWeekDates = () => {
    const startDate = new Date(weeklyPlan.weekStartDate);
    return daysOfWeek.map((day, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index);
      return {
        day,
        date: date.toISOString().split('T')[0],
        dayNum: date.getDate(),
        month: date.toLocaleDateString('en-AU', { month: 'short' }),
      };
    });
  };

  const getMealsForDay = (date: string) => {
    return weeklyPlan.meals.filter(meal => meal.date === date);
  };

  const getMealForType = (date: string, mealType: MealType) => {
    return weeklyPlan.meals.find(meal => 
      meal.date === date && meal.mealType === mealType
    );
  };

  const getRecipeById = (recipeId: string) => {
    return recipes.find(recipe => recipe.id === recipeId);
  };

  const handleDrop = (date: string, mealType: MealType) => {
    if (selectedRecipe) {
      onMealAdd(date, mealType, selectedRecipe);
      setSelectedRecipe(null);
    }
  };

  const getMealTypeIcon = (mealType: MealType) => {
    switch (mealType) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      case 'snack': return '🍎';
    }
  };

  const weekDates = getWeekDates();
  const totalMeals = weeklyPlan.meals.length;
  const totalRecipes = new Set(weeklyPlan.meals.map(m => m.recipeId)).size;

  return (
    <div className="space-y-6">
      {/* Week Overview */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Weekly Meal Planner
          </h2>
          <p className="text-muted-foreground mt-1">
            Week of {new Date(weeklyPlan.weekStartDate).toLocaleDateString('en-AU', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {totalMeals} meals planned • {totalRecipes} unique recipes
            </div>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {weeklyPlan.meals.filter(m => m.mealType === 'breakfast').length} Breakfasts
              </Badge>
              <Badge variant="outline" className="text-xs">
                {weeklyPlan.meals.filter(m => m.mealType === 'lunch').length} Lunches
              </Badge>
              <Badge variant="outline" className="text-xs">
                {weeklyPlan.meals.filter(m => m.mealType === 'dinner').length} Dinners
              </Badge>
            </div>
          </div>
          
          <Button 
            onClick={onGenerateShoppingList}
            className="bg-primary hover:bg-primary/90"
            disabled={totalMeals === 0}
          >
            <ChefHat className="w-4 h-4 mr-2" />
            Generate Shopping List
          </Button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {weekDates.map(({ day, date, dayNum, month }) => (
          <Card key={date} className="day-column">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-center">
                <div className="text-foreground">{day}</div>
                <div className="text-lg font-semibold text-primary">
                  {dayNum}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  {month}
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-2">
              {mealTypes.map(mealType => {
                const meal = getMealForType(date, mealType);
                const recipe = meal ? getRecipeById(meal.recipeId) : null;
                
                return (
                  <div
                    key={mealType}
                    className={`p-3 rounded-md border-2 border-dashed min-h-[80px] transition-all ${
                      selectedRecipe 
                        ? 'border-primary/50 bg-primary/5 hover:border-primary hover:bg-primary/10' 
                        : 'border-muted-foreground/20 hover:border-primary/30'
                    }`}
                    onClick={() => selectedRecipe && handleDrop(date, mealType)}
                  >
                    {recipe ? (
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <Badge 
                            variant="outline" 
                            className={`meal-${mealType} text-xs`}
                          >
                            {getMealTypeIcon(mealType)} {mealType}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              meal && onMealRemove(meal.id);
                            }}
                          >
                            ×
                          </Button>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm leading-tight">
                            {recipe.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{recipe.prepTime}m</span>
                            <Users className="w-3 h-3" />
                            <span>{meal.servings || recipe.servings}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Badge 
                          variant="outline" 
                          className={`meal-${mealType} text-xs mb-2`}
                        >
                          {getMealTypeIcon(mealType)} {mealType}
                        </Badge>
                        {selectedRecipe ? (
                          <div className="text-center">
                            <Plus className="w-4 h-4 mx-auto mb-1" />
                            <div className="text-xs">Drop recipe here</div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-xs">No meal planned</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Recipe Info */}
      {selectedRecipe && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedRecipe.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedRecipe.prepTime} minutes • {selectedRecipe.servings} servings
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setSelectedRecipe(null)}
              >
                Cancel Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}