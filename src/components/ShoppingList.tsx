import { useState } from 'react';
import { ShoppingCart, MapPin, DollarSign, CheckCircle, Circle, Store } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { ShoppingList as ShoppingListType, ShoppingListItem, StoreRecommendation, StoreType } from '../types';

interface ShoppingListProps {
  shoppingList: ShoppingListType | null;
  onItemToggle: (itemId: string) => void;
  onStoreSelect: (storeType: StoreType) => void;
}

export function ShoppingList({ 
  shoppingList, 
  onItemToggle, 
  onStoreSelect 
}: ShoppingListProps) {
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [showPurchased, setShowPurchased] = useState(false);

  if (!shoppingList) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            Shopping List
          </h2>
          <p className="text-muted-foreground mt-1">
            Generate a shopping list from your weekly meal plan
          </p>
        </div>
        
        <Card className="text-center py-12">
          <CardContent>
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No shopping list generated
            </h3>
            <p className="text-muted-foreground mb-4">
              Add some meals to your weekly planner, then generate a shopping list to see all your ingredients organized by Australian store types.
            </p>
            <Button variant="outline">
              Go to Weekly Planner
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStoreInfo = (storeType: StoreType) => {
    switch (storeType) {
      case 'supermarket':
        return { name: 'Supermarket', icon: '🛒', color: 'store-coles', chains: 'Coles, Woolworths, IGA' };
      case 'butcher':
        return { name: 'Butcher', icon: '🥩', color: 'store-butcher', chains: 'Local butchers' };
      case 'seafood':
        return { name: 'Seafood Market', icon: '🐟', color: 'bg-blue-50 border-blue-200 text-blue-800', chains: 'Fish markets' };
      case 'asian-market':
        return { name: 'Asian Supermarket', icon: '🥢', color: 'store-asian', chains: 'Asian grocers' };
      case 'bakery':
        return { name: 'Bakery', icon: '🥖', color: 'bg-amber-50 border-amber-200 text-amber-800', chains: 'Local bakeries' };
      case 'deli':
        return { name: 'Deli', icon: '🧀', color: 'bg-yellow-50 border-yellow-200 text-yellow-800', chains: 'Specialty delis' };
      case 'farmers-market':
        return { name: 'Farmers Market', icon: '🥕', color: 'store-woolworths', chains: 'Weekend markets' };
      default:
        return { name: 'Specialty Store', icon: '🏪', color: 'bg-gray-50 border-gray-200 text-gray-800', chains: 'Specialty shops' };
    }
  };

  const groupedItems = shoppingList.items.reduce((acc, item) => {
    if (!acc[item.storeType]) {
      acc[item.storeType] = [];
    }
    acc[item.storeType].push(item);
    return acc;
  }, {} as Record<StoreType, ShoppingListItem[]>);

  const filteredItems = selectedStore 
    ? { [selectedStore]: groupedItems[selectedStore] || [] }
    : groupedItems;

  const totalItems = shoppingList.items.length;
  const purchasedItems = shoppingList.items.filter(item => item.purchased).length;
  const progress = totalItems > 0 ? (purchasedItems / totalItems) * 100 : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            Shopping List
          </h2>
          <p className="text-muted-foreground mt-1">
            Organized by Australian store types for efficient shopping
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            {purchasedItems} of {totalItems} items purchased
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-semibold">{totalItems}</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold">{Object.keys(groupedItems).length}</div>
                <div className="text-sm text-muted-foreground">Store Types</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold">
                  {formatPrice(shoppingList.totalEstimatedCost)}
                </div>
                <div className="text-sm text-muted-foreground">Estimated Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedStore === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedStore(null)}
        >
          All Stores
        </Button>
        {Object.keys(groupedItems).map(storeType => {
          const store = getStoreInfo(storeType as StoreType);
          const itemCount = groupedItems[storeType as StoreType].length;
          
          return (
            <Button
              key={storeType}
              variant={selectedStore === storeType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStore(storeType as StoreType)}
              className="flex-shrink-0"
            >
              <span className="mr-1">{store.icon}</span>
              {store.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {itemCount}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Settings */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={showPurchased}
            onCheckedChange={setShowPurchased}
          />
          <span className="text-sm">Show purchased items</span>
        </label>
      </div>

      {/* Shopping List Items */}
      <div className="space-y-6">
        {Object.entries(filteredItems).map(([storeType, items]) => {
          const store = getStoreInfo(storeType as StoreType);
          const visibleItems = showPurchased 
            ? items 
            : items.filter(item => !item.purchased);
          
          if (visibleItems.length === 0) return null;
          
          const storePurchased = items.filter(item => item.purchased).length;
          const storeTotal = items.length;
          const storeProgress = storeTotal > 0 ? (storePurchased / storeTotal) * 100 : 0;
          const storeCost = items.reduce((sum, item) => sum + item.estimatedPrice, 0);
          
          return (
            <Card key={storeType}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{store.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold">{store.name}</h3>
                      <p className="text-sm text-muted-foreground font-normal">
                        {store.chains}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {formatPrice(storeCost)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {storePurchased}/{storeTotal} items
                    </div>
                    <div className="w-16 h-1 bg-muted rounded-full mt-1">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${storeProgress}%` }}
                      />
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {visibleItems.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      item.purchased 
                        ? 'bg-muted/50 border-muted' 
                        : 'bg-background border-border hover:border-primary/50'
                    }`}
                  >
                    <Checkbox
                      checked={item.purchased}
                      onCheckedChange={() => onItemToggle(item.id)}
                    />
                    
                    <div className="flex-1">
                      <div className={`font-medium ${item.purchased ? 'line-through text-muted-foreground' : ''}`}>
                        {item.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.amount} {item.unit}
                        {item.notes && ` • ${item.notes}`}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-medium ${item.purchased ? 'line-through text-muted-foreground' : ''}`}>
                        {formatPrice(item.estimatedPrice)}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Store Recommendations */}
      {shoppingList.storeRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Nearby Store Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {shoppingList.storeRecommendations.map(recommendation => {
              const store = getStoreInfo(recommendation.storeType);
              
              return (
                <div
                  key={recommendation.storeName}
                  className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{store.icon}</div>
                    <div>
                      <div className="font-medium">{recommendation.storeName}</div>
                      <div className="text-sm text-muted-foreground">
                        {recommendation.address}
                        {recommendation.distance && ` • ${recommendation.distance}km away`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium">{formatPrice(recommendation.totalCost)}</div>
                    <div className="text-sm text-muted-foreground">
                      {recommendation.items.length} items
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}