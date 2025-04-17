
import React from "react";
import { Star, ArrowUpRight, ArrowDownRight, Plus, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Mock watchlist data
const watchlistData = [
  { symbol: "TSLA", name: "Tesla Inc.", price: 245.32, change: 8.76, changePercent: 3.70 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 410.17, change: 12.34, changePercent: 3.10 },
  { symbol: "META", name: "Meta Platforms", price: 325.64, change: -4.21, changePercent: -1.28 },
  { symbol: "JPM", name: "JPMorgan Chase", price: 142.78, change: 2.14, changePercent: 1.52 },
  { symbol: "DIS", name: "Walt Disney Co.", price: 87.92, change: -1.67, changePercent: -1.86 },
];

const Watchlist = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center">
          <Star className="h-5 w-5 text-yellow-500 mr-2 fill-yellow-500" />
          Your Watchlist
        </h3>
        <Button variant="outline" size="sm" className="flex items-center">
          <Plus className="h-4 w-4 mr-1" />
          Add Symbol
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlistData.map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell>
                <div>
                  <p className="font-medium">{stock.symbol}</p>
                  <p className="text-xs text-muted-foreground">{stock.name}</p>
                </div>
              </TableCell>
              <TableCell>${stock.price.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                    ${Math.abs(stock.change).toFixed(2)}
                  </span>
                  <span className={`ml-2 flex items-center text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? 
                      <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                      <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {Math.abs(stock.changePercent).toFixed(2)}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Buy</Button>
                  <Button variant="outline" size="sm" className="p-0 h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;
