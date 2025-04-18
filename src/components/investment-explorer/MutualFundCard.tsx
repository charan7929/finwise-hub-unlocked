
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { BookOpen } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface MutualFundCardProps {
  fund: any;
  showCompare: boolean;
  selectedFunds: string[];
  getRiskColor: (risk: string) => string;
  onToggleFundSelection: (id: string) => void;
  investmentAmount: string;
  onInvestmentAmountChange: (value: string) => void;
}

const MutualFundCard = ({
  fund,
  showCompare,
  selectedFunds,
  getRiskColor,
  onToggleFundSelection,
  investmentAmount,
  onInvestmentAmountChange
}: MutualFundCardProps) => {
  const handleInvest = () => {
    toast.success(`Investment of $${investmentAmount} in ${fund.name} initiated!`, {
      description: "Please complete the transaction process.",
      duration: 5000,
    });
  };

  return (
    <Card className={`${selectedFunds.includes(fund.id) ? 'ring-2 ring-finwise-blue' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{fund.name}</CardTitle>
            <CardDescription className="mt-1">{fund.description}</CardDescription>
          </div>
          {showCompare && (
            <Button
              size="sm"
              variant={selectedFunds.includes(fund.id) ? "default" : "outline"}
              onClick={() => onToggleFundSelection(fund.id)}
              className={selectedFunds.includes(fund.id) ? "bg-finwise-blue hover:bg-finwise-blue/90" : ""}
            >
              {selectedFunds.includes(fund.id) ? "Selected" : "Compare"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Risk Level</p>
              <p className={`mt-1 px-2 py-0.5 rounded text-xs inline-block ${getRiskColor(fund.riskLevel)}`}>
                {fund.riskLevel}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expected Returns</p>
              <p className="font-medium mt-1">{fund.expectedReturns}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Min Investment</p>
              <p className="font-medium mt-1">${fund.minInvestment}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expense Ratio</p>
              <p className="font-medium mt-1">{fund.expense}%</p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="h-[150px] pt-4">
            <p className="text-sm font-medium mb-2">Historical Performance</p>
            <ChartContainer
              config={{
                return: {
                  label: "Annual Return",
                  color: "#4ade80",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fund.performance} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                  <YAxis
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 10 }}
                    domain={[-20, 40]}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Return"]}
                    labelFormatter={(label) => `Year: ${label}`}
                  />
                  <Bar
                    dataKey="return"
                    radius={[2, 2, 0, 0]}
                  >
                    {fund.performance.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.return >= 0 ? "#4ade80" : "#ef4444"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Returns Data */}
          <div className="grid grid-cols-4 text-center text-xs">
            <div>
              <p className="text-muted-foreground">1Y</p>
              <p className={`font-medium ${fund.oneYear >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {fund.oneYear >= 0 ? '+' : ''}{fund.oneYear}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">3Y</p>
              <p className={`font-medium ${fund.threeYear >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {fund.threeYear >= 0 ? '+' : ''}{fund.threeYear}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">5Y</p>
              <p className={`font-medium ${fund.fiveYear >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {fund.fiveYear >= 0 ? '+' : ''}{fund.fiveYear}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">10Y</p>
              <p className={`font-medium ${fund.tenYear >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {fund.tenYear >= 0 ? '+' : ''}{fund.tenYear}%
              </p>
            </div>
          </div>

          {/* Simulate Investment */}
          <div className="pt-2">
            <p className="text-sm font-medium mb-2">Simulate Investment</p>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <Input
                  className="pl-8"
                  type="number"
                  min="100"
                  step="100"
                  placeholder="Amount"
                  value={investmentAmount}
                  onChange={(e) => onInvestmentAmountChange(e.target.value)}
                />
              </div>
              <Select defaultValue="5">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-2 p-2 bg-muted rounded-md text-center">
              <p className="text-sm text-muted-foreground">Potential Value</p>
              <p className="font-bold text-lg">
                ${(parseInt(investmentAmount || "0") * (1 + fund.fiveYear / 100)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="w-[48%]">
          <BookOpen className="mr-2 h-4 w-4" />
          Learn More
        </Button>
        <Button 
          className="w-[48%] bg-finwise-green hover:bg-finwise-green/90"
          onClick={handleInvest}
        >
          Invest Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MutualFundCard;
