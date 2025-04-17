
import React from "react";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Mock data for stock prices
const data = [
  { date: "Jan", AAPL: 142, MSFT: 223, AMZN: 102 },
  { date: "Feb", AAPL: 156, MSFT: 243, AMZN: 96 },
  { date: "Mar", AAPL: 165, MSFT: 260, AMZN: 105 },
  { date: "Apr", AAPL: 172, MSFT: 270, AMZN: 112 },
  { date: "May", AAPL: 168, MSFT: 265, AMZN: 110 },
  { date: "Jun", AAPL: 178, MSFT: 285, AMZN: 122 },
  { date: "Jul", AAPL: 186, MSFT: 305, AMZN: 130 },
  { date: "Aug", AAPL: 182, MSFT: 315, AMZN: 126 },
  { date: "Sep", AAPL: 179, MSFT: 305, AMZN: 124 },
  { date: "Oct", AAPL: 189, MSFT: 328, AMZN: 133 },
  { date: "Nov", AAPL: 196, MSFT: 342, AMZN: 140 },
  { date: "Dec", AAPL: 205, MSFT: 350, AMZN: 151 },
];

const chartConfig = {
  AAPL: {
    label: "Apple Inc.",
    color: "#4CAF50", // Green
  },
  MSFT: {
    label: "Microsoft Corp.",
    color: "#2196F3", // Blue
  },
  AMZN: {
    label: "Amazon.com Inc.",
    color: "#FF9800", // Orange
  },
};

const StockChart = () => {
  return (
    <div className="w-full h-80">
      <ChartContainer
        config={chartConfig}
        className="h-full"
      >
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tickLine={false} axisLine={false} />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            tickLine={false}
            axisLine={false}
            tickCount={6}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent 
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value, name) => [`$${value}`, chartConfig[name as keyof typeof chartConfig]?.label]}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="AAPL"
            stroke={chartConfig.AAPL.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="MSFT"
            stroke={chartConfig.MSFT.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="AMZN"
            stroke={chartConfig.AMZN.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default StockChart;
