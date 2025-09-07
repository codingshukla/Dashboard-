import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Widget, Category } from '@/types/dashboard';

interface AddWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWidget: (widget: Omit<Widget, 'id'>) => void;
  categories: Category[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

export const AddWidgetDialog: React.FC<AddWidgetDialogProps> = ({
  open,
  onOpenChange,
  onAddWidget,
  categories,
  selectedCategoryId,
  onCategoryChange
}) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!widgetName.trim() || !widgetText.trim() || !selectedCategoryId) {
      return;
    }

    const newWidget: Omit<Widget, 'id'> = {
      name: widgetName.trim(),
      text: widgetText.trim(),
      type: 'text'
    };

    onAddWidget(newWidget);
    
    // Reset form
    setWidgetName('');
    setWidgetText('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setWidgetName('');
    setWidgetText('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategoryId} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="widget-name">Widget Name</Label>
            <Input
              id="widget-name"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="Enter widget name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="widget-text">Widget Text</Label>
            <Textarea
              id="widget-text"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              placeholder="Enter widget content"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!widgetName.trim() || !widgetText.trim() || !selectedCategoryId}>
              Add Widget
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};