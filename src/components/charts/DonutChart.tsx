import React from 'react';

interface DonutChartData {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data: DonutChartData[];
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulatedValue = 0;

  // Create SVG path for each segment
  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const startAngle = (accumulatedValue / total) * 360;
    const endAngle = ((accumulatedValue + item.value) / total) * 360;
    
    accumulatedValue += item.value;

    const startAngleRad = (startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (endAngle - 90) * (Math.PI / 180);

    const largeArcFlag = percentage > 50 ? 1 : 0;

    const x1 = 50 + 35 * Math.cos(startAngleRad);
    const y1 = 50 + 35 * Math.sin(startAngleRad);
    const x2 = 50 + 35 * Math.cos(endAngleRad);
    const y2 = 50 + 35 * Math.sin(endAngleRad);

    const pathData = [
      `M 50 50`,
      `L ${x1} ${y1}`,
      `A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `Z`
    ].join(' ');

    return {
      ...item,
      pathData,
      percentage
    };
  });

  return (
    <div className="relative w-24 h-24">
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
        {segments.map((segment, index) => (
          <path
            key={index}
            d={segment.pathData}
            fill={segment.color || 'hsl(var(--muted))'}
            className="transition-opacity hover:opacity-80"
          />
        ))}
        {/* Center circle to create donut effect */}
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="hsl(var(--widget-bg))"
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs font-bold text-foreground">{total}</div>
          <div className="text-[10px] text-muted-foreground">Total</div>
        </div>
      </div>
    </div>
  );
};