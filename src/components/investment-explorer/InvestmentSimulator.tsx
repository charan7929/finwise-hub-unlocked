
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for the chart
const generateChartData = (initialAmount: number, monthlyContribution: number, years: number, returnRate: number) => {
  const data = [];
  let total = initialAmount;
  const monthlyRate = returnRate / 100 / 12;
  
  for (let year = 0; year <= years; year++) {
    const contributed = initialAmount + (monthlyContribution * 12 * year);
    const earnings = total - contributed;
    
    data.push({
      year: `Year ${year}`,
      total: Math.round(total),
      principal: Math.round(contributed),
      returns: Math.round(earnings)
    });
    
    // Calculate next year's total
    if (year < years) {
      for (let month = 0; month < 12; month++) {
        total = (total + monthlyContribution) * (1 + monthlyRate);
      }
    }
  }
  
  return data;
};

const InvestmentSimulator = () => {
  const [initialAmount, setInitialAmount] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [years, setYears] = useState<number>(10);
  const [returnRate, setReturnRate] = useState<number>(8);
  const [investmentType, setInvestmentType] = useState<string>("moderate");
  
  const chartData = generateChartData(initialAmount, monthlyContribution, years, returnRate);
  
  // Calculate final values
  const totalContributed = initialAmount + (monthlyContribution * 12 * years);
  const totalReturns = chartData[chartData.length - 1].total - totalContributed;
  const finalAmount = chartData[chartData.length - 1].total;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Investment Type</Label>
            <Select value={investmentType} onValueChange={(value) => {
              setInvestmentType(value);
              switch (value) {
                case "conservative":
                  setReturnRate(5);
                  break;
                case "moderate":
                  setReturnRate(8);
                  break;
                case "aggressive":
                  setReturnRate(12);
                  break;
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select investment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative (5%)</SelectItem>
                <SelectItem value="moderate">Moderate (8%)</SelectItem>
                <SelectItem value="aggressive">Aggressive (12%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Initial Investment</Label>
              <span className="text-sm font-medium">${initialAmount.toLocaleString()}</span>
            </div>
            <Slider
              value={[initialAmount]}
              min={1000}
              max={50000}
              step={1000}
              onValueChange={(value) => setInitialAmount(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Monthly Contribution</Label>
              <span className="text-sm font-medium">${monthlyContribution.toLocaleString()}</span>
            </div>
            <Slider
              value={[monthlyContribution]}
              min={100}
              max={2000}
              step={100}
              onValueChange={(value) => setMonthlyContribution(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Time Period (Years)</Label>
              <span className="text-sm font-medium">{years} years</span>
            </div>
            <Slider
              value={[years]}
              min={1}
              max={30}
              step={1}
              onValueChange={(value) => setYears(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Annual Return Rate</Label>
              <span className="text-sm font-medium">{returnRate}%</span>
            </div>
            <Slider
              value={[returnRate]}
              min={1}
              max={15}
              step={0.5}
              onValueChange={(value) => setReturnRate(value[0])}
            />
          </div>
          
          <Button className="w-full">Simulate with FinCoins</Button>
        </div>
        
        <div className="space-y-4">
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                <Legend />
                <Bar dataKey="principal" name="Principal" stackId="a" fill="#4CAF50" />
                <Bar dataKey="returns" name="Returns" stackId="a" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg text-sm">
            <div>
              <p className="text-muted-foreground">Total Invested</p>
              <p className="font-bold">${totalContributed.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Investment Returns</p>
              <p className="font-bold text-green-600">+${totalReturns.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Final Amount</p>
              <p className="font-bold text-finwise-blue">${finalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSimulator;
