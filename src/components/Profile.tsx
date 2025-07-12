import { MapPin, User, Settings, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export function Profile() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <User className="w-6 h-6 text-primary" />
          Profile & Settings
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage your preferences and shopping locations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Display Name</label>
              <Input placeholder="Enter your name" defaultValue="Taiping Chen" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input placeholder="your.email@example.com" defaultValue="taiping@example.com" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Dietary Preferences</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Vegetarian</Badge>
                <Badge variant="outline">Gluten-Free</Badge>
                <Badge variant="outline">Low-Sodium</Badge>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  + Add preference
                </Button>
              </div>
            </div>
            
            <Button className="w-full">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Location Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Shopping Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Postcode</label>
              <Input placeholder="e.g. 2000" defaultValue="2000" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Suburb</label>
              <Input placeholder="e.g. Sydney" defaultValue="Sydney" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">State</label>
              <Input placeholder="e.g. NSW" defaultValue="NSW" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Preferred Stores</label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">🛒 Coles Bondi Junction</span>
                  <Badge variant="outline">Primary</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">🥩 Victor Churchill Butcher</span>
                  <Badge variant="outline">Meat</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">🥢 Dragon Mart Asian</span>
                  <Badge variant="outline">Asian</Badge>
                </div>
              </div>
            </div>
            
            <Button className="w-full">
              Update Location
            </Button>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              App Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Shopping list notifications</span>
                <Badge variant="outline">Enabled</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Weekly meal plan reminders</span>
                <Badge variant="outline">Enabled</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Store price updates</span>
                <Badge variant="outline">Disabled</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Recipe recommendations</span>
                <Badge variant="outline">Enabled</Badge>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Manage Notifications
            </Button>
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Download your meal plans, recipes, and shopping lists for backup or to use with other apps.
            </p>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Meal Plans (PDF)
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Shopping Lists (CSV)
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Recipes (JSON)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Taiping's Grocery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-semibold text-primary">🇦🇺</div>
              <h3 className="font-medium mt-2">Australian-Focused</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Designed specifically for Australian families with local store integration
              </p>
            </div>
            
            <div>
              <div className="text-2xl font-semibold text-primary">🛒</div>
              <h3 className="font-medium mt-2">Smart Shopping</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Automatically categorizes ingredients by store type for efficient shopping
              </p>
            </div>
            
            <div>
              <div className="text-2xl font-semibold text-primary">📱</div>
              <h3 className="font-medium mt-2">Mobile Friendly</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Plan on desktop, shop on mobile with synchronized lists
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Version 1.0.0 • Made with ❤️ for Australian families
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}