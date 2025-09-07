import React from 'react';

interface ProgressChartData {
  label: string;
  value: number;
  color?: string;
}

interface ProgressChartProps {
  data: ProgressChartData[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium text-foreground">({item.value})</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || 'hsl(var(--primary))'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};