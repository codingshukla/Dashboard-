import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DashboardData } from '@/types/dashboard';
import { Trash2 } from 'lucide-react';

interface ManageWidgetsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dashboardData: DashboardData;
  onToggleWidget: (categoryId: string, widgetId: string) => void;
}

export const ManageWidgetsDialog: React.FC<ManageWidgetsDialogProps> = ({
  open,
  onOpenChange,
  dashboardData,
  onToggleWidget
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Widgets</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {dashboardData.categories.map(category => (
            <div key={category.id} className="space-y-3">
              <h3 className="font-medium text-foreground">{category.name}</h3>
              
              {category.widgets.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No widgets in this category</p>
              ) : (
                <div className="space-y-2">
                  {category.widgets.map(widget => (
                    <div key={widget.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={widget.id}
                          checked={true}
                          onCheckedChange={() => onToggleWidget(category.id, widget.id)}
                        />
                        <div>
                          <label htmlFor={widget.id} className="text-sm font-medium text-foreground cursor-pointer">
                            {widget.name}
                          </label>
                          <p className="text-xs text-muted-foreground truncate max-w-md">
                            {widget.text}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleWidget(category.id, widget.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};