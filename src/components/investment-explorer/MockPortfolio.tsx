
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

// Mock portfolio data
const portfolioData = [
  { name: "Growth Fund", type: "Mutual Fund", allocation: 30, amount: 3000, returns: 12.5 },
  { name: "SIP Wealth Builder", type: "SIP", allocation: 25, amount: 2500, returns: 9.8 },
  { name: "Corporate Bonds", type: "Bond", allocation: 20, amount: 2000, returns: 7.2 },
  { name: "Index ETF", type: "ETF", allocation: 15, amount: 1500, returns: 10.3 },
  { name: "Government Bonds", type: "Bond", allocation: 10, amount: 1000, returns: 5.5 },
];

// Colors for the pie chart
const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#F44336'];

const MockPortfolio = () => {
  const totalValue = portfolioData.reduce((sum, item) => sum + item.amount, 0);
  const weightedReturn = portfolioData.reduce((sum, item) => sum + (item.returns * item.allocation / 100), 0);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Portfolio Allocation</h3>
          <p className="text-sm text-muted-foreground">Current allocation of your mock portfolio</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Investment
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-1">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="allocation"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Allocation']}
                  wrapperStyle={{ outline: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col h-64 justify-between">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                <p className="text-2xl font-bold text-finwise-blue">${totalValue.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Expected Annual Return</p>
                <p className="text-2xl font-bold text-green-600">{weightedReturn.toFixed(2)}%</p>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Return</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>${item.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600">{item.returns}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockPortfolio;
