import React, { useState } from 'react';
import { Search, Plus, Settings2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DashboardData, Category, Widget, defaultDashboardData } from '@/types/dashboard';
import { WidgetCard } from './WidgetCard';
import { AddWidgetDialog } from './AddWidgetDialog';
import { ManageWidgetsDialog } from './ManageWidgetsDialog';

export const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(defaultDashboardData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  const [isManageWidgetsOpen, setIsManageWidgetsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const handleAddWidget = (categoryId: string, widget: Omit<Widget, 'id'>) => {
    const newWidget: Widget = {
      ...widget,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      )
    }));
  };

  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? { ...category, widgets: category.widgets.filter(w => w.id !== widgetId) }
          : category
      )
    }));
  };

  const handleOpenAddWidget = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setIsAddWidgetOpen(true);
  };

  // Filter widgets based on search query
  const filteredCategories = dashboardData.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.widgets.length > 0 || searchQuery === '');

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <header className="bg-card border-b border-widget-border p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">{dashboardData.title}</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsManageWidgetsOpen(true)}
                className="flex items-center gap-2"
              >
                <Settings2 className="h-4 w-4" />
                Manage Widgets
              </Button>
              <div className="text-sm text-muted-foreground">
                Last 7 days
              </div>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="space-y-8">
          {filteredCategories.map(category => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenAddWidget(category.id)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Widget
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.widgets.map(widget => (
                  <WidgetCard
                    key={widget.id}
                    widget={widget}
                    onRemove={() => handleRemoveWidget(category.id, widget.id)}
                  />
                ))}
                
                {/* Add Widget Placeholder */}
                <div 
                  className="bg-widget-bg border-2 border-dashed border-widget-border rounded-lg p-6 min-h-[240px] flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handleOpenAddWidget(category.id)}
                >
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-sm font-medium">Add Widget</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Dialogs */}
      <AddWidgetDialog
        open={isAddWidgetOpen}
        onOpenChange={setIsAddWidgetOpen}
        onAddWidget={(widget) => handleAddWidget(selectedCategoryId, widget)}
        categories={dashboardData.categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
      />
      
      <ManageWidgetsDialog
        open={isManageWidgetsOpen}
        onOpenChange={setIsManageWidgetsOpen}
        dashboardData={dashboardData}
        onToggleWidget={handleRemoveWidget}
      />
    </div>
  );
};