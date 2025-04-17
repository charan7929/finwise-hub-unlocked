
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock portfolio data
const portfolioData = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 10, avgPrice: 142.35, currentPrice: 189.87, change: 33.38, changePercent: 23.45 },
  { symbol: "MSFT", name: "Microsoft Corp.", shares: 5, avgPrice: 287.12, currentPrice: 326.41, change: 39.29, changePercent: 13.68 },
  { symbol: "AMZN", name: "Amazon.com Inc.", shares: 8, avgPrice: 112.45, currentPrice: 132.83, change: 20.38, changePercent: 18.12 },
  { symbol: "GOOGL", name: "Alphabet Inc.", shares: 4, avgPrice: 98.76, currentPrice: 94.21, change: -4.55, changePercent: -4.61 },
];

const Portfolio = () => {
  const totalValue = portfolioData.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
  const totalInvested = portfolioData.reduce((sum, stock) => sum + (stock.shares * stock.avgPrice), 0);
  const totalProfit = totalValue - totalInvested;
  const profitPercent = (totalProfit / totalInvested) * 100;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Value</p>
          <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Invested</p>
          <p className="text-2xl font-bold">${totalInvested.toFixed(2)}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Profit/Loss</p>
          <div className="flex items-center">
            <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${totalProfit.toFixed(2)}
            </p>
            <span className={`ml-2 flex items-center text-sm ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalProfit >= 0 ? 
                <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                <ArrowDownRight className="h-4 w-4 mr-1" />}
              {Math.abs(profitPercent).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Shares</TableHead>
            <TableHead>Avg Price</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Profit/Loss</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolioData.map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell>
                <div>
                  <p className="font-medium">{stock.symbol}</p>
                  <p className="text-xs text-muted-foreground">{stock.name}</p>
                </div>
              </TableCell>
              <TableCell>{stock.shares}</TableCell>
              <TableCell>${stock.avgPrice.toFixed(2)}</TableCell>
              <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
              <TableCell>${(stock.shares * stock.currentPrice).toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                    ${stock.change.toFixed(2)}
                  </span>
                  <span className={`ml-2 flex items-center text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? 
                      <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                      <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {Math.abs(stock.changePercent).toFixed(2)}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
