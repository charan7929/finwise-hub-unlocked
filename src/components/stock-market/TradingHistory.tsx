
import React from "react";
import { Clock, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock trading history data
const historyData = [
  { id: 1, date: "2025-04-16", time: "14:30:25", symbol: "AAPL", type: "buy", shares: 5, price: 182.35, total: 911.75 },
  { id: 2, date: "2025-04-15", time: "10:15:42", symbol: "MSFT", type: "buy", shares: 3, price: 305.12, total: 915.36 },
  { id: 3, date: "2025-04-14", time: "15:45:10", symbol: "GOOGL", type: "sell", shares: 2, price: 98.76, total: 197.52 },
  { id: 4, date: "2025-04-12", time: "11:20:37", symbol: "AMZN", type: "buy", shares: 4, price: 112.45, total: 449.80 },
  { id: 5, date: "2025-04-10", time: "09:50:18", symbol: "TSLA", type: "sell", shares: 6, price: 242.50, total: 1455.00 },
];

const TradingHistory = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Clock className="h-5 w-5 text-muted-foreground mr-2" />
        <h3 className="text-lg font-medium">Recent Transactions</h3>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Shares</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{transaction.date}</p>
                  <p className="text-xs text-muted-foreground">{transaction.time}</p>
                </div>
              </TableCell>
              <TableCell>{transaction.symbol}</TableCell>
              <TableCell>
                <Badge variant={transaction.type === "buy" ? "outline" : "secondary"} className={`
                  ${transaction.type === "buy" ? "border-green-500 text-green-600" : "border-red-500 text-red-600"}
                `}>
                  {transaction.type === "buy" ? 
                    <ArrowDownRight className="h-3 w-3 mr-1" /> : 
                    <ArrowUpRight className="h-3 w-3 mr-1" />}
                  {transaction.type.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>{transaction.shares}</TableCell>
              <TableCell>${transaction.price.toFixed(2)}</TableCell>
              <TableCell>${transaction.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TradingHistory;
