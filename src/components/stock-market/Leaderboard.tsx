
import React from "react";
import { Trophy, ArrowUpRight, Medal, User } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, user: "InvestmentGuru", avatar: "G", return: 38.2, portfolio: 138200 },
  { rank: 2, user: "StockWhisperer", avatar: "S", return: 35.7, portfolio: 135700 },
  { rank: 3, user: "TradeNinja", avatar: "T", return: 31.4, portfolio: 131400 },
  { rank: 4, user: "DiamondHands", avatar: "D", return: 27.8, portfolio: 127800 },
  { rank: 5, user: "BullMarket", avatar: "B", return: 24.3, portfolio: 124300 },
];

const Leaderboard = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
        <h3 className="text-lg font-medium">Top Performers</h3>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Return</TableHead>
            <TableHead>Portfolio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((trader) => (
            <TableRow key={trader.rank}>
              <TableCell>
                {trader.rank === 1 ? (
                  <Medal className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ) : trader.rank === 2 ? (
                  <Medal className="h-5 w-5 text-gray-400 fill-gray-400" />
                ) : trader.rank === 3 ? (
                  <Medal className="h-5 w-5 text-amber-700 fill-amber-700" />
                ) : (
                  trader.rank
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center mr-2 text-slate-800 font-medium">
                    {trader.avatar}
                  </div>
                  <span>{trader.user}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {trader.return.toFixed(1)}%
                </div>
              </TableCell>
              <TableCell>${trader.portfolio.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-center py-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="h-4 w-4 mr-2" />
          Your Rank: 42 (Top 12%)
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
