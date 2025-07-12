export interface Recipe {
  id: string;
  title: string;
  description: string;
  image?: string;
  prepTime: number; // minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: 'Australian' | 'Asian' | 'European' | 'Mediterranean' | 'Indian' | 'Mexican' | 'Other';
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: IngredientCategory;
  storeType: StoreType;
  notes?: string;
}

export type IngredientCategory = 
  | 'meat'
  | 'poultry'
  | 'seafood'
  | 'dairy'
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'pantry'
  | 'spices'
  | 'frozen'
  | 'bakery'
  | 'beverages'
  | 'condiments'
  | 'snacks'
  | 'asian-ingredients'
  | 'other';

export type StoreType = 
  | 'supermarket'
  | 'butcher'
  | 'poultry'
  | 'seafood'
  | 'bakery'
  | 'asian-market'
  | 'deli'
  | 'farmers-market'
  | 'specialty';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealPlan {
  id: string;
  date: string; // YYYY-MM-DD
  mealType: MealType;
  recipeId: string;
  servings: number;
  notes?: string;
}

export interface WeeklyPlan {
  id: string;
  weekStartDate: string; // YYYY-MM-DD (Monday)
  meals: MealPlan[];
  shoppingListGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingList {
  id: string;
  weeklyPlanId: string;
  items: ShoppingListItem[];
  storeRecommendations: StoreRecommendation[];
  totalEstimatedCost: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingListItem {
  id: string;
  ingredientId: string;
  name: string;
  amount: number;
  unit: string;
  category: IngredientCategory;
  storeType: StoreType;
  estimatedPrice: number;
  purchased: boolean;
  notes?: string;
}

export interface StoreRecommendation {
  storeType: StoreType;
  storeName: string;
  distance?: number; // km
  items: ShoppingListItem[];
  totalCost: number;
  address?: string;
  postcode?: string;
}

export interface AustralianStore {
  id: string;
  name: string;
  chain: 'Coles' | 'Woolworths' | 'IGA' | 'ALDI' | 'Other';
  type: StoreType;
  address: string;
  postcode: string;
  suburb: string;
  state: 'NSW' | 'VIC' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'NT' | 'ACT';
  phone?: string;
  hours?: {
    [key: string]: string; // day: hours
  };
}

export interface FilterOptions {
  cuisine: string[];
  difficulty: string[];
  maxPrepTime: number;
  minServings: number;
  maxServings: number;
  dietary: string[];
  ingredients: string[];
}

export type ViewMode = 'planner' | 'recipes' | 'shopping' | 'profile';

export interface AppState {
  currentWeek: string; // YYYY-MM-DD
  activeView: ViewMode;
  weeklyPlan: WeeklyPlan | null;
  recipes: Recipe[];
  shoppingList: ShoppingList | null;
  userPostcode: string;
  nearbyStores: AustralianStore[];
}