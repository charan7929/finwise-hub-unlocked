
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChartLineUp, PieChart, Clock, Newspaper, Eye, BarChart3, ArrowUpRight, ArrowDownRight, DollarSign, Search } from "lucide-react";
import StockChart from "@/components/stock-market/StockChart";
import Portfolio from "@/components/stock-market/Portfolio";
import Watchlist from "@/components/stock-market/Watchlist";
import TradingHistory from "@/components/stock-market/TradingHistory";
import MarketNews from "@/components/stock-market/MarketNews";
import TradingInterface from "@/components/stock-market/TradingInterface";
import Leaderboard from "@/components/stock-market/Leaderboard";

const StockMarket = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container max-w-7xl py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-finwise-blue">Stock Market Demo</h1>
          <p className="text-muted-foreground">Practice trading with virtual FinCoins</p>
        </div>
        <div className="flex items-center gap-2 bg-finwise-green/10 p-3 rounded-lg">
          <DollarSign className="text-finwise-green h-6 w-6" />
          <div>
            <p className="text-sm font-medium">FinCoin Balance</p>
            <p className="text-2xl font-bold text-finwise-blue">10,000</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="mr-2 text-finwise-green" size={20} />
                  Market Overview
                </CardTitle>
                <div className="relative w-full max-w-xs">
                  <Input
                    placeholder="Search symbol..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-8"
                  />
                  <Search className="absolute right-2 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <StockChart />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="portfolio" className="w-full">
                <TabsList className="w-full grid grid-cols-4 rounded-none border-b">
                  <TabsTrigger value="portfolio" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-finwise-green">
                    <PieChart className="mr-2 h-4 w-4" />
                    Portfolio
                  </TabsTrigger>
                  <TabsTrigger value="watchlist" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-finwise-green">
                    <Eye className="mr-2 h-4 w-4" />
                    Watchlist
                  </TabsTrigger>
                  <TabsTrigger value="history" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-finwise-green">
                    <Clock className="mr-2 h-4 w-4" />
                    History
                  </TabsTrigger>
                  <TabsTrigger value="news" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-finwise-green">
                    <Newspaper className="mr-2 h-4 w-4" />
                    News
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="portfolio" className="p-4">
                  <Portfolio />
                </TabsContent>
                <TabsContent value="watchlist" className="p-4">
                  <Watchlist />
                </TabsContent>
                <TabsContent value="history" className="p-4">
                  <TradingHistory />
                </TabsContent>
                <TabsContent value="news" className="p-4">
                  <MarketNews />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Trading Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TradingInterface />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ChartLineUp className="mr-2 text-finwise-green" size={20} />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Leaderboard />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockMarket;
