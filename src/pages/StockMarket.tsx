
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Wallet, Clock, Newspaper, ChartLine, LineChart, TrendingUp, ListFilter, DollarSign } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Mock data for demonstration purposes
const STOCKS = [
  { symbol: "AAPL", name: "Apple Inc.", price: 176.38, change: 2.55, changePercent: 1.47 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 332.42, change: -1.23, changePercent: -0.37 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 145.86, change: 3.20, changePercent: 2.24 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 133.95, change: 0.85, changePercent: 0.64 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 336.11, change: 5.22, changePercent: 1.58 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 202.76, change: -8.39, changePercent: -3.97 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 422.31, change: 12.75, changePercent: 3.11 },
];

const PORTFOLIO = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 10, avgPrice: 150.25, currentPrice: 176.38, value: 1763.80, profit: 261.30, profitPercent: 17.39 },
  { symbol: "MSFT", name: "Microsoft Corporation", shares: 5, avgPrice: 280.15, currentPrice: 332.42, value: 1662.10, profit: 261.35, profitPercent: 18.66 },
  { symbol: "AMZN", name: "Amazon.com Inc.", shares: 8, avgPrice: 130.50, currentPrice: 145.86, value: 1166.88, profit: 122.88, profitPercent: 11.77 },
];

const WATCHLIST = [
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 133.95, change: 0.85, changePercent: 0.64 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 336.11, change: 5.22, changePercent: 1.58 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 422.31, change: 12.75, changePercent: 3.11 },
];

const TRADING_HISTORY = [
  { date: "2023-04-17", symbol: "AAPL", action: "BUY", quantity: 5, price: 145.30, total: 726.50 },
  { date: "2023-04-15", symbol: "MSFT", action: "BUY", quantity: 3, price: 275.42, total: 826.26 },
  { date: "2023-04-12", symbol: "AMZN", action: "BUY", quantity: 8, price: 130.50, total: 1044.00 },
  { date: "2023-04-10", symbol: "AAPL", action: "BUY", quantity: 5, price: 155.20, total: 776.00 },
  { date: "2023-04-05", symbol: "MSFT", action: "BUY", quantity: 2, price: 287.75, total: 575.50 },
];

const MARKET_NEWS = [
  {
    id: 1,
    title: "Tech Stocks Rally as Interest Rate Concerns Ease",
    summary: "Technology stocks led a market rally today as investors grew more optimistic about the Federal Reserve's approach to interest rates.",
    source: "Financial Times",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Nvidia Shares Surge on AI Chip Demand",
    summary: "Shares of Nvidia jumped after the company reported stronger-than-expected demand for its AI-focused graphics processing units.",
    source: "Wall Street Journal",
    time: "4 hours ago",
  },
  {
    id: 3,
    title: "Amazon Announces Stock Split and Buyback",
    summary: "Amazon.com Inc. announced a 20-for-1 stock split and a $10 billion share buyback program, sending its stock higher in after-hours trading.",
    source: "Bloomberg",
    time: "8 hours ago",
  },
];

const LEADERBOARD = [
  { rank: 1, name: "Emma S.", avatar: "/placeholder.svg", profit: 12543.87, profitPercent: 32.5 },
  { rank: 2, name: "James K.", avatar: "/placeholder.svg", profit: 8976.32, profitPercent: 26.8 },
  { rank: 3, name: "David L.", avatar: "/placeholder.svg", profit: 7654.21, profitPercent: 24.2 },
  { rank: 4, name: "Sarah M.", avatar: "/placeholder.svg", profit: 6234.97, profitPercent: 21.7 },
  { rank: 5, name: "Robert P.", avatar: "/placeholder.svg", profit: 5467.14, profitPercent: 19.3 },
];

// Chart data
const chartData = [
  { name: "Jan", price: 150 },
  { name: "Feb", price: 158 },
  { name: "Mar", price: 155 },
  { name: "Apr", price: 162 },
  { name: "May", price: 168 },
  { name: "Jun", price: 172 },
  { name: "Jul", price: 180 },
  { name: "Aug", price: 185 },
  { name: "Sep", price: 176 },
  { name: "Oct", price: 172 },
  { name: "Nov", price: 168 },
  { name: "Dec", price: 176 },
];

const StockMarket = () => {
  const [selectedStock, setSelectedStock] = useState(STOCKS[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState(selectedStock.price.toString());

  // Filter stocks based on search term
  const filteredStocks = STOCKS.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle stock selection
  const handleSelectStock = (stock: any) => {
    setSelectedStock(stock);
    setPrice(stock.price.toString());
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-2 text-finwise-blue">Stock Market Demo</h1>
      <p className="text-muted-foreground mb-6">Trade virtual stocks with FinCoins and track your performance</p>

      {/* FinCoin Balance */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center bg-finwise-green bg-opacity-10 p-3 rounded-lg">
          <Wallet className="text-finwise-green mr-2" />
          <div>
            <p className="text-sm text-finwise-blue">FinCoin Balance</p>
            <p className="text-2xl font-bold text-finwise-green">FC 10,000</p>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Your Rank</p>
            <p className="font-bold text-finwise-blue">#12</p>
          </div>
          <Button size="sm" variant="outline" className="ml-2">
            View Leaderboard
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Chart and Trading Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stock Search and Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl font-bold">Market Chart</CardTitle>
                <CardDescription>Search and view stock performance</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative w-[180px] md:w-[260px]">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by symbol or name"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button size="icon" variant="outline">
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Stock list */}
              <div className="mb-4 overflow-auto max-h-[180px] border rounded-md">
                <table className="min-w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="py-2 px-4 text-left text-sm font-medium">Symbol</th>
                      <th className="py-2 px-4 text-left text-sm font-medium">Name</th>
                      <th className="py-2 px-4 text-right text-sm font-medium">Price</th>
                      <th className="py-2 px-4 text-right text-sm font-medium">Change</th>
                      <th className="py-2 px-4 text-center text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStocks.map((stock) => (
                      <tr 
                        key={stock.symbol} 
                        className={`hover:bg-muted/50 cursor-pointer ${selectedStock.symbol === stock.symbol ? 'bg-muted/50' : ''}`}
                        onClick={() => handleSelectStock(stock)}
                      >
                        <td className="py-2 px-4 text-sm font-medium">{stock.symbol}</td>
                        <td className="py-2 px-4 text-sm">{stock.name}</td>
                        <td className="py-2 px-4 text-sm text-right">${stock.price.toFixed(2)}</td>
                        <td className={`py-2 px-4 text-sm text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </td>
                        <td className="py-2 px-4 text-center">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectStock(stock);
                            }}
                          >
                            Select
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Selected stock details */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{selectedStock.name} ({selectedStock.symbol})</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">${selectedStock.price.toFixed(2)}</span>
                      <span className={`px-2 py-1 rounded text-sm ${selectedStock.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Add to Watchlist</Button>
                    <Button size="sm" className="bg-finwise-blue hover:bg-finwise-blue/90">Trade</Button>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    price: {
                      label: "Price",
                      color: "#4ade80", // Green color
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis
                        domain={['auto', 'auto']}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">{payload[0].payload.name}</span>
                                    <span className="text-sm font-bold">${payload[0].value}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#4ade80"
                        strokeWidth={2}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Trading Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Trade {selectedStock.symbol}</CardTitle>
              <CardDescription>Buy or sell stocks using your FinCoins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Buy Panel */}
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-md p-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-green-700">
                      <TrendingUp className="mr-2 h-5 w-5" /> Buy {selectedStock.symbol}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Order Type</label>
                        <Select value={orderType} onValueChange={setOrderType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select order type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="market">Market Order</SelectItem>
                            <SelectItem value="limit">Limit Order</SelectItem>
                            <SelectItem value="stop">Stop Order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Quantity</label>
                        <Input 
                          type="number" 
                          min="1" 
                          value={quantity} 
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      {orderType !== "market" && (
                        <div>
                          <label className="text-sm font-medium">Price ($)</label>
                          <Input 
                            type="number" 
                            step="0.01" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium">Estimated Cost</label>
                        <div className="bg-white p-2 rounded border">
                          <p className="font-bold">${(orderType === "market" ? selectedStock.price : parseFloat(price)) * parseFloat(quantity || "0")}</p>
                        </div>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Buy {selectedStock.symbol}</Button>
                    </div>
                  </div>
                </div>

                {/* Sell Panel */}
                <div className="space-y-4">
                  <div className="bg-red-50 rounded-md p-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-red-700">
                      <TrendingUp className="mr-2 h-5 w-5 transform rotate-180" /> Sell {selectedStock.symbol}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Order Type</label>
                        <Select value={orderType} onValueChange={setOrderType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select order type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="market">Market Order</SelectItem>
                            <SelectItem value="limit">Limit Order</SelectItem>
                            <SelectItem value="stop">Stop Order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Quantity</label>
                        <Input 
                          type="number" 
                          min="1" 
                          value={quantity} 
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      {orderType !== "market" && (
                        <div>
                          <label className="text-sm font-medium">Price ($)</label>
                          <Input 
                            type="number" 
                            step="0.01" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium">Estimated Proceeds</label>
                        <div className="bg-white p-2 rounded border">
                          <p className="font-bold">${(orderType === "market" ? selectedStock.price : parseFloat(price)) * parseFloat(quantity || "0")}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">Sell {selectedStock.symbol}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with Tabs for Portfolio, Watchlist, History, Leaderboard */}
        <div className="space-y-6">
          {/* Tabs for Portfolio, Watchlist, History, News */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold">Your Trading Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="portfolio">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="portfolio" className="text-xs sm:text-sm">Portfolio</TabsTrigger>
                  <TabsTrigger value="watchlist" className="text-xs sm:text-sm">Watchlist</TabsTrigger>
                  <TabsTrigger value="history" className="text-xs sm:text-sm">History</TabsTrigger>
                  <TabsTrigger value="news" className="text-xs sm:text-sm">News</TabsTrigger>
                </TabsList>

                {/* Portfolio Tab */}
                <TabsContent value="portfolio" className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Your Holdings</h3>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Value</p>
                        <p className="font-bold text-lg">$4,592.78</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {PORTFOLIO.map((item) => (
                        <div key={item.symbol} className="border rounded-md p-3 hover:bg-muted/50">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-bold">{item.symbol}</p>
                              <p className="text-sm text-muted-foreground">{item.shares} shares</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${item.value.toFixed(2)}</p>
                              <p className={`text-sm ${item.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {item.profit >= 0 ? '+' : ''}{item.profit.toFixed(2)} ({item.profit >= 0 ? '+' : ''}{item.profitPercent.toFixed(2)}%)
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Watchlist Tab */}
                <TabsContent value="watchlist" className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Stocks You're Watching</h3>
                      <Button size="sm" variant="outline" className="text-xs h-7">+ Add Stock</Button>
                    </div>
                    <div className="space-y-2">
                      {WATCHLIST.map((item) => (
                        <div key={item.symbol} className="border rounded-md p-3 hover:bg-muted/50">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-bold">{item.symbol}</p>
                              <p className="text-sm text-muted-foreground">{item.name}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${item.price.toFixed(2)}</p>
                              <p className={`text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Trading History Tab */}
                <TabsContent value="history" className="p-4">
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> Recent Transactions
                    </h3>
                    <div className="space-y-2 max-h-[350px] overflow-y-auto">
                      {TRADING_HISTORY.map((item, index) => (
                        <div key={index} className="border rounded-md p-3 hover:bg-muted/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold">{item.symbol} · <span className={`${item.action === 'BUY' ? 'text-green-600' : 'text-red-600'}`}>{item.action}</span></p>
                              <p className="text-sm text-muted-foreground">{item.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{item.quantity} shares @ ${item.price.toFixed(2)}</p>
                              <p className="text-sm font-semibold">Total: ${item.total.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Market News Tab */}
                <TabsContent value="news" className="p-4">
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center">
                      <Newspaper className="h-4 w-4 mr-1" /> Market News
                    </h3>
                    <div className="space-y-3 max-h-[350px] overflow-y-auto">
                      {MARKET_NEWS.map((news) => (
                        <div key={news.id} className="border rounded-md p-3 hover:bg-muted/50">
                          <h4 className="font-bold text-sm">{news.title}</h4>
                          <p className="text-xs text-muted-foreground my-1">{news.summary}</p>
                          <div className="flex justify-between items-center mt-2 text-xs">
                            <span className="text-muted-foreground">{news.source}</span>
                            <span className="text-muted-foreground">{news.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Leaderboard Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-finwise-green" /> Trading Leaderboard
              </CardTitle>
              <CardDescription>Top performers based on trading profits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {LEADERBOARD.map((user) => (
                  <div key={user.rank} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex justify-center items-center w-7 h-7 rounded-full mr-3 ${
                        user.rank === 1 ? 'bg-yellow-100 text-yellow-700' : 
                        user.rank === 2 ? 'bg-slate-100 text-slate-700' : 
                        user.rank === 3 ? 'bg-amber-100 text-amber-700' : 
                        'bg-muted text-muted-foreground'
                      }`}>
                        <span className="text-sm font-bold">{user.rank}</span>
                      </div>
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-finwise-green">+${user.profit.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">+{user.profitPercent}%</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">See Full Leaderboard</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockMarket;
