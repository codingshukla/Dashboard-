import React from 'react';
import { X } from 'lucide-react';
import { Widget } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { DonutChart } from './charts/DonutChart';
import { ProgressChart } from './charts/ProgressChart';

interface WidgetCardProps {
  widget: Widget;
  onRemove: () => void;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ widget, onRemove }) => {
  const renderChart = () => {
    if (!widget.chartData) return null;

    switch (widget.chartData.type) {
      case 'donut':
        return <DonutChart data={widget.chartData.data} />;
      case 'bar':
        return <ProgressChart data={widget.chartData.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-widget-bg border border-widget-border rounded-lg p-6 relative group hover:shadow-md transition-shadow">
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
      >
        <X className="h-3 w-3" />
      </Button>

      {/* Widget Header */}
      <div className="mb-4">
        <h3 className="font-medium text-foreground text-sm">{widget.name}</h3>
      </div>

      {/* Widget Content */}
      <div className="space-y-4">
        {widget.type === 'chart' && widget.chartData ? (
          <div className="flex items-center justify-center min-h-[120px]">
            {renderChart()}
          </div>
        ) : widget.type === 'progress' && widget.chartData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-muted-foreground">{widget.text}</div>
            {renderChart()}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[120px]">
            <div className="text-center text-muted-foreground text-sm">
              {widget.text}
            </div>
          </div>
        )}
      </div>

      {/* Legend for donut charts */}
      {widget.chartData?.type === 'donut' && (
        <div className="mt-4 space-y-2">
          {widget.chartData.data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.label}</span>
              </div>
              <span className="font-medium text-foreground">({item.value})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};