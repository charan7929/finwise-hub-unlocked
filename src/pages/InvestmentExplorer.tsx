import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wallet, ChartLine, LineChart, BookOpen, PieChart, BarChart as BarChartIcon, TrendingUp, ShieldCheck, AlertTriangle, Info } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { ResponsiveContainer, AreaChart, Area, LineChart as RLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart as RBarChart, Bar, Cell } from "recharts";

// Mock data for demonstration purposes
const INVESTMENT_TYPES = [
  { id: "mutual_funds", name: "Mutual Funds", icon: PieChart },
  { id: "sips", name: "Systematic Investment Plans", icon: ChartLine },
  { id: "etfs", name: "Exchange Traded Funds", icon: BarChartIcon },
  { id: "bonds", name: "Bonds & Fixed Income", icon: ShieldCheck },
];

const MUTUAL_FUNDS = [
  {
    id: "mf1",
    name: "FinWise Growth Fund",
    description: "Diversified equity fund focusing on long-term capital appreciation through large-cap stocks.",
    riskLevel: "Moderate",
    expectedReturns: "12-15%",
    minInvestment: 500,
    expense: 1.2,
    rating: 4.5,
    oneYear: 14.8,
    threeYear: 42.7,
    fiveYear: 81.2,
    tenYear: 183.6,
    categories: ["Large Cap", "Growth"],
    performance: [
      { year: "2018", return: 12.4 },
      { year: "2019", return: 16.8 },
      { year: "2020", return: 8.9 },
      { year: "2021", return: 21.5 },
      { year: "2022", return: -5.2 },
      { year: "2023", return: 18.7 },
    ],
  },
  {
    id: "mf2",
    name: "FinWise Balanced Advantage",
    description: "Dynamic asset allocation fund balancing equity and debt investments based on market conditions.",
    riskLevel: "Low to Moderate",
    expectedReturns: "10-12%",
    minInvestment: 1000,
    expense: 1.0,
    rating: 4.2,
    oneYear: 11.2,
    threeYear: 32.4,
    fiveYear: 61.8,
    tenYear: 142.5,
    categories: ["Hybrid", "Dynamic"],
    performance: [
      { year: "2018", return: 8.7 },
      { year: "2019", return: 12.3 },
      { year: "2020", return: 9.8 },
      { year: "2021", return: 14.5 },
      { year: "2022", return: 2.1 },
      { year: "2023", return: 12.4 },
    ],
  },
  {
    id: "mf3",
    name: "FinWise Small Cap Explorer",
    description: "Aggressive fund targeting high growth through small-cap companies with potential for substantial appreciation.",
    riskLevel: "High",
    expectedReturns: "15-18%",
    minInvestment: 750,
    expense: 1.5,
    rating: 4.0,
    oneYear: 22.7,
    threeYear: 48.9,
    fiveYear: 86.4,
    tenYear: 196.2,
    categories: ["Small Cap", "Growth"],
    performance: [
      { year: "2018", return: 14.2 },
      { year: "2019", return: 22.8 },
      { year: "2020", return: -4.7 },
      { year: "2021", return: 32.1 },
      { year: "2022", return: -12.3 },
      { year: "2023", return: 28.4 },
    ],
  },
];

const SIPS = [
  {
    id: "sip1",
    name: "FinWise Monthly Investor",
    description: "Disciplined monthly investment plan with flexible contribution amounts and investment options.",
    riskLevel: "Customizable",
    expectedReturns: "10-15% (based on chosen funds)",
    minInvestment: 100,
    duration: "Open-ended",
    frequency: "Monthly",
    features: ["Auto-debit", "Portfolio Rebalancing", "Goal Tracking"],
    categories: ["Flexible", "Beginner-Friendly"],
    projections: [
      { year: 1, monthly: 100, value: 1243 },
      { year: 3, monthly: 100, value: 3968 },
      { year: 5, monthly: 100, value: 7106 },
      { year: 10, monthly: 100, value: 16247 },
      { year: 15, monthly: 100, value: 27530 },
      { year: 20, monthly: 100, value: 42379 },
    ],
  },
  {
    id: "sip2",
    name: "FinWise Step-Up Investor",
    description: "Progressive investment plan that allows increasing contribution amount annually to match growing income.",
    riskLevel: "Moderate",
    expectedReturns: "12-14%",
    minInvestment: 200,
    duration: "3-20 years",
    frequency: "Monthly with annual increase",
    features: ["Annual Step-up", "Tax Harvesting", "Automated Rebalancing"],
    categories: ["Growth-oriented", "Long-term"],
    projections: [
      { year: 1, monthly: 200, value: 2486 },
      { year: 3, monthly: 242, value: 9627 },
      { year: 5, monthly: 293, value: 20734 },
      { year: 10, monthly: 429, value: 61417 },
      { year: 15, monthly: 629, value: 140293 },
      { year: 20, monthly: 922, value: 277953 },
    ],
  },
];

const ETFS = [
  {
    id: "etf1",
    name: "FinWise Total Market ETF",
    description: "Broad market exposure tracking the entire equity market with low expense ratio.",
    riskLevel: "Moderate",
    expectedReturns: "10-12%",
    price: 87.45,
    expense: 0.03,
    aum: "12.4B",
    categories: ["Broad Market", "Passive"],
    performance: [
      { year: "2018", return: 8.9 },
      { year: "2019", return: 15.7 },
      { year: "2020", return: 12.3 },
      { year: "2021", return: 18.6 },
      { year: "2022", return: -6.8 },
      { year: "2023", return: 14.9 },
    ],
  },
  {
    id: "etf2",
    name: "FinWise Tech Innovation ETF",
    description: "Focused exposure to technology companies leading in innovation and disruption.",
    riskLevel: "High",
    expectedReturns: "14-16%",
    price: 124.36,
    expense: 0.45,
    aum: "4.2B",
    categories: ["Technology", "Growth"],
    performance: [
      { year: "2018", return: 10.2 },
      { year: "2019", return: 28.4 },
      { year: "2020", return: 42.1 },
      { year: "2021", return: 22.6 },
      { year: "2022", return: -18.7 },
      { year: "2023", return: 30.5 },
    ],
  },
];

const BONDS = [
  {
    id: "bond1",
    name: "FinWise Government Bond Fund",
    description: "Investment in government securities offering stable returns with minimal risk.",
    riskLevel: "Low",
    expectedReturns: "6-8%",
    duration: 5.2,
    yield: 7.4,
    minInvestment: 1000,
    categories: ["Government", "Fixed Income"],
    performance: [
      { year: "2018", return: 6.8 },
      { year: "2019", return: 7.2 },
      { year: "2020", return: 8.1 },
      { year: "2021", return: 5.9 },
      { year: "2022", return: 6.3 },
      { year: "2023", return: 7.5 },
    ],
  },
  {
    id: "bond2",
    name: "FinWise Corporate Bond Fund",
    description: "Exposure to corporate debt instruments offering higher yields with moderate risk.",
    riskLevel: "Moderate",
    expectedReturns: "8-10%",
    duration: 3.8,
    yield: 9.2,
    minInvestment: 1500,
    categories: ["Corporate", "Fixed Income"],
    performance: [
      { year: "2018", return: 8.4 },
      { year: "2019", return: 9.6 },
      { year: "2020", return: 7.8 },
      { year: "2021", return: 8.7 },
      { year: "2022", return: 7.2 },
      { year: "2023", return: 9.3 },
    ],
  },
];

// Chart data for investment growth comparison
const growthComparisonData = [
  { year: "2023", fund1: 10000, fund2: 10000 },
  { year: "2024", fund1: 11200, fund2: 10800 },
  { year: "2025", fund1: 12544, fund2: 11664 },
  { year: "2026", fund1: 14049, fund2: 12597 },
  { year: "2027", fund1: 15735, fund2: 13605 },
  { year: "2028", fund1: 17623, fund2: 14693 },
  { year: "2029", fund1: 19738, fund2: 15869 },
  { year: "2030", fund1: 22106, fund2: 17138 },
  { year: "2031", fund1: 24759, fund2: 18509 },
  { year: "2032", fund1: 27730, fund2: 19990 },
];

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel.toLowerCase()) {
    case "low":
      return "bg-green-100 text-green-800";
    case "low to moderate":
      return "bg-lime-100 text-lime-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "very high":
      return "bg-red-100 text-red-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

const InvestmentExplorer = () => {
  const [selectedInvestmentType, setSelectedInvestmentType] = useState("mutual_funds");
  const [showCompare, setShowCompare] = useState(false);
  const [selectedFunds, setSelectedFunds] = useState<string[]>([]);
  const [investmentAmount, setInvestmentAmount] = useState("1000");

  // Get data based on selected investment type
  const getInvestmentData = () => {
    switch (selectedInvestmentType) {
      case "mutual_funds":
        return MUTUAL_FUNDS;
      case "sips":
        return SIPS;
      case "etfs":
        return ETFS;
      case "bonds":
        return BONDS;
      default:
        return MUTUAL_FUNDS;
    }
  };

  // Toggle fund selection for comparison
  const toggleFundSelection = (id: string) => {
    if (selectedFunds.includes(id)) {
      setSelectedFunds(selectedFunds.filter(fundId => fundId !== id));
    } else {
      if (selectedFunds.length < 2) {
        setSelectedFunds([...selectedFunds, id]);
      }
    }
  };

  // Get selected funds for comparison
  const getSelectedFundsData = () => {
    return getInvestmentData().filter(fund => selectedFunds.includes(fund.id));
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-2 text-finwise-blue">Investment Explorer</h1>
      <p className="text-muted-foreground mb-6">Learn about different investment options and simulate your returns</p>

      {/* FinCoin Balance */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center bg-finwise-green bg-opacity-10 p-3 rounded-lg">
          <Wallet className="text-finwise-green mr-2" />
          <div>
            <p className="text-sm text-finwise-blue">FinCoin Balance</p>
            <p className="text-2xl font-bold text-finwise-green">FC 10,000</p>
          </div>
        </div>

        {/* Compare Button */}
        <div className="flex items-center space-x-2">
          <Button
            variant={showCompare ? "default" : "outline"}
            onClick={() => {
              setShowCompare(!showCompare);
              if (!showCompare) {
                setSelectedFunds([]);
              }
            }}
            className={showCompare ? "bg-finwise-blue hover:bg-finwise-blue/90" : ""}
          >
            {showCompare ? "Exit Compare Mode" : "Compare Investments"}
          </Button>
        </div>
      </div>

      {showCompare && (
        <div className="mb-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Compare Mode Activated</AlertTitle>
            <AlertDescription>
              Select up to 2 investments to compare their performance. Selected investments: {selectedFunds.length}/2
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Investment Types Tabs */}
      <Tabs
        defaultValue="mutual_funds"
        value={selectedInvestmentType}
        onValueChange={setSelectedInvestmentType}
        className="mb-6"
      >
        <TabsList className="w-full grid grid-cols-4">
          {INVESTMENT_TYPES.map((type) => (
            <TabsTrigger key={type.id} value={type.id} className="flex items-center">
              <type.icon className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span className="truncate">{type.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Display comparison chart if in compare mode and funds selected */}
        {showCompare && selectedFunds.length > 0 && (
          <div className="mb-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Investment Comparison</CardTitle>
                <CardDescription>
                  Compare the performance of selected investments over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Comparison Chart */}
                  <div className="lg:col-span-2 h-[300px]">
                    <ChartContainer
                      config={{
                        fund1: {
                          label: getSelectedFundsData()[0]?.name || "Fund 1",
                          color: "#4ade80", // Green
                        },
                        fund2: {
                          label: getSelectedFundsData()[1]?.name || "Fund 2",
                          color: "#3b82f6", // Blue
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={growthComparisonData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                          <Tooltip
                            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                            labelFormatter={(label) => `Year: ${label}`}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="fund1"
                            name={getSelectedFundsData()[0]?.name || "Fund 1"}
                            stroke="#4ade80"
                            fill="#4ade80"
                            fillOpacity={0.2}
                          />
                          {selectedFunds.length > 1 && (
                            <Area
                              type="monotone"
                              dataKey="fund2"
                              name={getSelectedFundsData()[1]?.name || "Fund 2"}
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              fillOpacity={0.2}
                            />
                          )}
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>

                  {/* Comparison Table */}
                  <table className="min-w-full lg:col-span-2">
                    <thead className="bg-muted">
                      <tr>
                        <th className="py-2 px-4 text-left text-sm font-medium">Feature</th>
                        {getSelectedFundsData().map((fund) => (
                          <th key={fund.id} className="py-2 px-4 text-left text-sm font-medium">
                            {fund.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-medium">Risk Level</td>
                        {getSelectedFundsData().map((fund) => (
                          <td key={fund.id} className="py-2 px-4">
                            <span className={`px-2 py-0.5 rounded text-xs ${getRiskColor(fund.riskLevel)}`}>
                              {fund.riskLevel}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-medium">Expected Returns</td>
                        {getSelectedFundsData().map((fund) => (
                          <td key={fund.id} className="py-2 px-4">
                            {fund.expectedReturns}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-medium">Minimum Investment</td>
                        {getSelectedFundsData().map((fund) => (
                          <td key={fund.id} className="py-2 px-4">
                            {"minInvestment" in fund ? `$${fund.minInvestment}` : "N/A"}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-medium">1-Year Growth (FC 1,000)</td>
                        {getSelectedFundsData().map((fund) => {
                          const returnRate = "oneYear" in fund ? fund.oneYear : "performance" in fund ? fund.performance[fund.performance.length - 1].return : 10;
                          const growth = 1000 * (1 + returnRate / 100);
                          return (
                            <td key={fund.id} className="py-2 px-4 font-semibold">
                              FC {growth.toFixed(2)} <span className="text-green-600 text-xs">(+{returnRate}%)</span>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setSelectedFunds([])}>Clear Selection</Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Mutual Funds Tab Content */}
        <TabsContent value="mutual_funds">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MUTUAL_FUNDS.map((fund) => (
              <Card key={fund.id} className={`${selectedFunds.includes(fund.id) ? 'ring-2 ring-finwise-blue' : ''}`}>
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
                        onClick={() => toggleFundSelection(fund.id)}
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
                            color: "#4ade80", // Green color for positive returns
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <RBarChart data={fund.performance} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
                              fill="#4ade80"
                              radius={[2, 2, 0, 0]}
                            >
                              {fund.performance.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.return >= 0 ? "#4ade80" : "#ef4444"} />
                              ))}
                            </Bar>
                          </RBarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>

                    {/* Returns Data */}
                    <div className="pt-2">
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
                            onChange={(e) => setInvestmentAmount(e.target.value)}
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
                  <Button className="w-[48%] bg-finwise-green hover:bg-finwise-green/90">
                    Invest FinCoins
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* SIPs Tab Content */}
        <TabsContent value="sips">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SIPS.map((sip) => (
              <Card key={sip.id} className={`${selectedFunds.includes(sip.id) ? 'ring-2 ring-finwise-blue' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{sip.name}</CardTitle>
                      <CardDescription className="mt-1">{sip.description}</CardDescription>
                    </div>
                    {showCompare && (
                      <Button
                        size="sm"
                        variant={selectedFunds.includes(sip.id) ? "default" : "outline"}
                        onClick={() => toggleFundSelection(sip.id)}
                        className={selectedFunds.includes(sip.id) ? "bg-finwise-blue hover:bg-finwise-blue/90" : ""}
                      >
                        {selectedFunds.includes(sip.id) ? "Selected" : "Compare"}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Risk Level</p>
                        <p className={`mt-1 px-2 py-0.5 rounded text-xs inline-block ${getRiskColor(sip.riskLevel)}`}>
                          {sip.riskLevel}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Returns</p>
                        <p className="font-medium mt-1">{sip.expectedReturns}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Min Monthly</p>
                        <p className="font-medium mt-1">${sip.minInvestment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Frequency</p>
                        <p className="font-medium mt-1">{sip.frequency}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <p className="text-sm font-medium mb-2">Key Features</p>
                      <div className="flex flex-wrap gap-2">
                        {sip.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-muted rounded-full text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Growth Chart */}
                    <div className="h-[200px] pt-2">
                      <p className="text-sm font-medium mb-2">Projected Growth</p>
                      <ChartContainer
                        config={{
                          value: {
                            label: "Projected Value",
                            color: "#4ade80", // Green color
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <RLineChart data={sip.projections} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis 
                              dataKey="year" 
                              tick={{ fontSize: 10 }}
                              label={{ value: 'Years', position: 'insideBottomRight', offset: -5, fontSize: 10 }}
                            />
                            <YAxis
                              tickFormatter={(value) => `$${value}`}
                              tick={{ fontSize: 10 }}
                            />
                            <Tooltip
                              formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
                              labelFormatter={(label) => `Year: ${label}`}
                            />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#4ade80"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          </RLineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>

                    {/* Simulate Investment */}
                    <div className="pt-2">
                      <p className="text-sm font-medium mb-2">Try Your Own SIP</p>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                          <Input
                            className="pl-8"
                            type="number"
                            min="50"
