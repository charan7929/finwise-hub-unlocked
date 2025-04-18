
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wallet, Info, PieChartIcon, LineChart, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ComparisonView from "@/components/investment-explorer/ComparisonView";
import MutualFundCard from "@/components/investment-explorer/MutualFundCard";
import InvestmentTypeCard from "@/components/investment-explorer/InvestmentTypeCard";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Mock data for demonstration purposes
const INVESTMENT_TYPES = [
  { id: "mutual_funds", name: "Mutual Funds", icon: PieChartIcon },
  { id: "sips", name: "Systematic Investment Plans", icon: LineChart },
  { id: "etfs", name: "Exchange Traded Funds", icon: BarChart3 },
  { id: "bonds", name: "Bonds & Fixed Income", icon: Shield },
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
  const [accountBalance, setAccountBalance] = useState("10,000.00");

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

  const toggleFundSelection = (id: string) => {
    if (selectedFunds.includes(id)) {
      setSelectedFunds(selectedFunds.filter(fundId => fundId !== id));
    } else {
      if (selectedFunds.length < 2) {
        setSelectedFunds([...selectedFunds, id]);
      }
    }
  };

  const getSelectedFundsData = () => {
    return getInvestmentData().filter(fund => selectedFunds.includes(fund.id));
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-2 text-finwise-blue">Investment Explorer</h1>
      <p className="text-muted-foreground mb-6">Explore real investment options and plan your financial future</p>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center bg-finwise-green bg-opacity-10 p-3 rounded-lg">
          <Wallet className="text-finwise-green mr-2" />
          <div>
            <p className="text-sm text-finwise-blue">Account Balance</p>
            <p className="text-2xl font-bold text-finwise-green">${accountBalance}</p>
          </div>
        </div>

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

      <Tabs defaultValue="mutual_funds" value={selectedInvestmentType} onValueChange={setSelectedInvestmentType} className="mb-6">
        <TabsList className="w-full grid grid-cols-4">
          {INVESTMENT_TYPES.map((type) => (
            <TabsTrigger key={type.id} value={type.id}>
              <InvestmentTypeCard {...type} />
            </TabsTrigger>
          ))}
        </TabsList>

        <ComparisonView
          selectedFunds={selectedFunds}
          growthComparisonData={growthComparisonData}
          getSelectedFundsData={getSelectedFundsData}
          getRiskColor={getRiskColor}
          onClearSelection={() => setSelectedFunds([])}
        />

        <TabsContent value="mutual_funds">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MUTUAL_FUNDS.map((fund) => (
              <MutualFundCard
                key={fund.id}
                fund={fund}
                showCompare={showCompare}
                selectedFunds={selectedFunds}
                getRiskColor={getRiskColor}
                onToggleFundSelection={toggleFundSelection}
                investmentAmount={investmentAmount}
                onInvestmentAmountChange={setInvestmentAmount}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sips">
          {/* Similar structure for SIPs */}
        </TabsContent>
        <TabsContent value="etfs">
          {/* Similar structure for ETFs */}
        </TabsContent>
        <TabsContent value="bonds">
          {/* Similar structure for Bonds */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentExplorer;
