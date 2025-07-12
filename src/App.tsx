import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { RecipeBrowser } from './components/RecipeBrowser';
import { ShoppingList } from './components/ShoppingList';
import { Profile } from './components/Profile';
import { sampleRecipes, getCurrentWeekPlan } from './data/sampleData';
import { 
  ViewMode, 
  WeeklyPlan, 
  Recipe, 
  MealType, 
  MealPlan, 
  ShoppingList as ShoppingListType,
  ShoppingListItem,
  StoreType 
} from './types';

function App() {
  const [activeView, setActiveView] = useState<ViewMode>('planner');
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(getCurrentWeekPlan());
  const [recipes] = useState<Recipe[]>(sampleRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingListType | null>(null);
  const [userPostcode] = useState('2000');

  // Generate unique ID for meals
  const generateMealId = () => {
    return `meal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Add meal to weekly plan
  const handleMealAdd = (date: string, mealType: MealType, recipe: Recipe) => {
    const newMeal: MealPlan = {
      id: generateMealId(),
      date,
      mealType,
      recipeId: recipe.id,
      servings: recipe.servings,
      notes: '',
    };

    setWeeklyPlan(prev => ({
      ...prev,
      meals: [...prev.meals, newMeal],
      updatedAt: new Date().toISOString(),
    }));

    // Clear shopping list when meals change
    setShoppingList(null);
  };

  // Remove meal from weekly plan
  const handleMealRemove = (mealId: string) => {
    setWeeklyPlan(prev => ({
      ...prev,
      meals: prev.meals.filter(meal => meal.id !== mealId),
      updatedAt: new Date().toISOString(),
    }));

    // Clear shopping list when meals change
    setShoppingList(null);
  };

  // Generate shopping list from weekly plan
  const handleGenerateShoppingList = () => {
    const allIngredients: ShoppingListItem[] = [];
    let totalCost = 0;

    // Collect all ingredients from planned meals
    weeklyPlan.meals.forEach(meal => {
      const recipe = recipes.find(r => r.id === meal.recipeId);
      if (recipe) {
        recipe.ingredients.forEach(ingredient => {
          // Scale ingredient amount based on servings
          const scaledAmount = (ingredient.amount * meal.servings) / recipe.servings;
          
          // Estimate price (mock pricing)
          let estimatedPrice = 0;
          switch (ingredient.category) {
            case 'meat':
            case 'seafood':
              estimatedPrice = scaledAmount * 0.03; // $30/kg
              break;
            case 'poultry':
              estimatedPrice = scaledAmount * 0.015; // $15/kg
              break;
            case 'vegetables':
            case 'fruits':
              estimatedPrice = scaledAmount * 0.006; // $6/kg
              break;
            case 'dairy':
              estimatedPrice = scaledAmount * 0.01; // $10/kg
              break;
            default:
              estimatedPrice = scaledAmount * 0.005; // $5/kg
          }

          const shoppingItem: ShoppingListItem = {
            id: `item_${ingredient.id}_${meal.id}`,
            ingredientId: ingredient.id,
            name: ingredient.name,
            amount: scaledAmount,
            unit: ingredient.unit,
            category: ingredient.category,
            storeType: ingredient.storeType,
            estimatedPrice,
            purchased: false,
            notes: ingredient.notes,
          };

          allIngredients.push(shoppingItem);
          totalCost += estimatedPrice;
        });
      }
    });

    // Combine duplicate ingredients
    const combinedIngredients: { [key: string]: ShoppingListItem } = {};
    
    allIngredients.forEach(item => {
      const key = `${item.name}_${item.unit}`;
      if (combinedIngredients[key]) {
        combinedIngredients[key].amount += item.amount;
        combinedIngredients[key].estimatedPrice += item.estimatedPrice;
      } else {
        combinedIngredients[key] = { ...item };
      }
    });

    const finalItems = Object.values(combinedIngredients);

    const newShoppingList: ShoppingListType = {
      id: `shopping_${Date.now()}`,
      weeklyPlanId: weeklyPlan.id,
      items: finalItems,
      storeRecommendations: [
        {
          storeType: 'supermarket',
          storeName: 'Coles Bondi Junction',
          items: finalItems.filter(item => item.storeType === 'supermarket'),
          totalCost: finalItems
            .filter(item => item.storeType === 'supermarket')
            .reduce((sum, item) => sum + item.estimatedPrice, 0),
          distance: 2.5,
          address: '500 Oxford Street, Bondi Junction NSW 2022',
          postcode: '2022',
        },
        {
          storeType: 'butcher',
          storeName: 'Victor Churchill Butcher',
          items: finalItems.filter(item => item.storeType === 'butcher'),
          totalCost: finalItems
            .filter(item => item.storeType === 'butcher')
            .reduce((sum, item) => sum + item.estimatedPrice, 0),
          distance: 3.2,
          address: '132 Queen Street, Woollahra NSW 2025',
          postcode: '2025',
        },
        {
          storeType: 'asian-market',
          storeName: 'Dragon Mart Asian Supermarket',
          items: finalItems.filter(item => item.storeType === 'asian-market'),
          totalCost: finalItems
            .filter(item => item.storeType === 'asian-market')
            .reduce((sum, item) => sum + item.estimatedPrice, 0),
          distance: 4.1,
          address: '8 Quay Street, Haymarket NSW 2000',
          postcode: '2000',
        },
      ].filter(rec => rec.items.length > 0),
      totalEstimatedCost: totalCost,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setShoppingList(newShoppingList);
    setWeeklyPlan(prev => ({
      ...prev,
      shoppingListGenerated: true,
      updatedAt: new Date().toISOString(),
    }));

    // Switch to shopping list view
    setActiveView('shopping');
  };

  // Toggle shopping list item
  const handleShoppingItemToggle = (itemId: string) => {
    if (!shoppingList) return;

    setShoppingList(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        items: prev.items.map(item =>
          item.id === itemId
            ? { ...item, purchased: !item.purchased }
            : item
        ),
        updatedAt: new Date().toISOString(),
      };
    });
  };

  // Handle recipe selection
  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(selectedRecipe?.id === recipe.id ? null : recipe);
  };

  // Handle store selection (placeholder)
  const handleStoreSelect = (storeType: StoreType) => {
    console.log('Selected store type:', storeType);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'planner':
        return (
          <WeeklyPlanner
            weeklyPlan={weeklyPlan}
            recipes={recipes}
            onMealAdd={handleMealAdd}
            onMealRemove={handleMealRemove}
            onGenerateShoppingList={handleGenerateShoppingList}
          />
        );
      case 'recipes':
        return (
          <RecipeBrowser
            recipes={recipes}
            onRecipeSelect={handleRecipeSelect}
            selectedRecipe={selectedRecipe}
          />
        );
      case 'shopping':
        return (
          <ShoppingList
            shoppingList={shoppingList}
            onItemToggle={handleShoppingItemToggle}
            onStoreSelect={handleStoreSelect}
          />
        );
      case 'profile':
        return <Profile />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation
        activeView={activeView}
        onViewChange={setActiveView}
        userPostcode={userPostcode}
        shoppingListCount={shoppingList?.items.length || 0}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveView()}
      </main>

      {/* Recipe Selection Sidebar for Planner */}
      {activeView === 'planner' && (
        <div className="fixed right-4 top-20 bottom-4 w-80 bg-card border border-border rounded-lg shadow-lg p-4 overflow-hidden z-40 hidden xl:flex flex-col">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span>🍽️</span>
            Select Recipe to Add
          </h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
            {recipes.slice(0, 10).map(recipe => (
              <div
                key={recipe.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                  selectedRecipe?.id === recipe.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => handleRecipeSelect(recipe)}
              >
                <h4 className="font-medium text-sm">{recipe.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {recipe.prepTime}m • {recipe.servings} serves • {recipe.difficulty}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm">
                    {recipe.cuisine === 'Australian' ? '🇦🇺' : 
                     recipe.cuisine === 'Asian' ? '🥢' : 
                     recipe.cuisine === 'European' ? '🍝' : '🍽️'}
                  </span>
                  <span className="text-xs text-muted-foreground">{recipe.cuisine}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;