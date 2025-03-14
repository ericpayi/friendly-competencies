
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Legend } from "recharts";

interface ResultsChartProps {
  currentRevenue: number;
  projectedRevenue: number;
  currentValue: number;
  projectedValue: number;
}

const ResultsChart: React.FC<ResultsChartProps> = ({
  currentRevenue,
  projectedRevenue,
  currentValue,
  projectedValue
}) => {
  // Format number as currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  const data = [
    {
      name: 'Revenue',
      current: currentRevenue,
      projected: projectedRevenue,
    },
    {
      name: 'Business Value',
      current: currentValue,
      projected: projectedValue,
    },
  ];

  const chartConfig = {
    current: {
      label: "Current",
      color: "#9bb8f7"
    },
    projected: {
      label: "Projected",
      color: "#3b82f6" 
    }
  };

  return (
    <div className="h-60 mt-4">
      <ChartContainer 
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => [formatCurrency(value as number), ""]}
              />
            }
          />
          <Legend />
          <Bar dataKey="current" fill="#9bb8f7" name="Current" radius={[4, 4, 0, 0]} />
          <Bar dataKey="projected" fill="#3b82f6" name="Projected" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ResultsChart;
