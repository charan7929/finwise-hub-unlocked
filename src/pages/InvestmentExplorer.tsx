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

const INVESTMENT_TYPES = [
  { id: "mutual_funds", name: "Mutual Funds", icon: PieChartIcon },
  { id: "sips", name: "Systematic Investment Plans", icon: LineChart },
  { id: "etfs", name: "Exchange Traded Funds", icon: BarChart3 },
  { id: "fixed_deposits", name: "Fixed Deposits", icon: Shield },
];

const MUTUAL_FUNDS = [
  {
    id: "mf1",
    name: "FinWise Nifty 50 Index Fund",
    description: "Track India's benchmark Nifty 50 index with low expense ratio.",
    riskLevel: "Moderate",
    expectedReturns: "12-15%",
    minInvestment: 500,
    expense: 0.5,
    rating: 4.5,
    oneYear: 15.2,
    threeYear: 44.8,
    fiveYear: 85.3,
    tenYear: 192.4,
    categories: ["Large Cap", "Index Fund"],
    performance: [
      { year: "2018", return: 11.2 },
      { year: "2019", return: 15.8 },
      { year: "2020", return: -7.2 },
      { year: "2021", return: 24.5 },
      { year: "2022", return: -4.8 },
      { year: "2023", return: 20.1 },
    ],
  },
  {
    id: "mf2",
    name: "FinWise Tax Saver ELSS",
    description: "Equity-linked savings scheme offering tax benefits under Section 80C with 3-year lock-in.",
    riskLevel: "Moderate to High",
    expectedReturns: "12-14%",
    minInvestment: 500,
    expense: 1.2,
    rating: 4.2,
    oneYear: 12.8,
    threeYear: 38.4,
    fiveYear: 72.5,
    tenYear: 168.9,
    categories: ["ELSS", "Tax Saving"],
    performance: [
      { year: "2018", return: 9.8 },
      { year: "2019", return: 14.5 },
      { year: "2020", return: -5.8 },
      { year: "2021", return: 22.4 },
      { year: "2022", return: -2.1 },
      { year: "2023", return: 18.7 },
    ],
  },
  {
    id: "mf3",
    name: "FinWise Small Cap Growth",
    description: "Focus on emerging Indian small-cap companies with high growth potential.",
    riskLevel: "High",
    expectedReturns: "15-18%",
    minInvestment: 1000,
    expense: 1.8,
    rating: 4.0,
    oneYear: 25.4,
    threeYear: 52.7,
    fiveYear: 96.8,
    tenYear: 215.3,
    categories: ["Small Cap", "Growth"],
    performance: [
      { year: "2018", return: 16.4 },
      { year: "2019", return: 24.8 },
      { year: "2020", return: -12.7 },
      { year: "2021", return: 36.5 },
      { year: "2022", return: -8.9 },
      { year: "2023", return: 32.4 },
    ],
  },
];

const SIPS = [
  {
    id: "sip1",
    name: "FinWise SIP Starter",
    description: "Start your investment journey with monthly SIPs in diversified equity funds.",
    riskLevel: "Customizable",
    expectedReturns: "12-15% (based on chosen funds)",
    minInvestment: 500,
    duration: "Open-ended",
    frequency: "Monthly",
    features: ["Auto-debit", "Portfolio Rebalancing", "Goal Tracking"],
    categories: ["Flexible", "Beginner-Friendly"],
    projections: [
      { year: 1, monthly: 1000, value: 12430 },
      { year: 3, monthly: 1000, value: 39680 },
      { year: 5, monthly: 1000, value: 71060 },
      { year: 10, monthly: 1000, value: 162470 },
      { year: 15, monthly: 1000, value: 275300 },
      { year: 20, monthly: 1000, value: 423790 },
    ],
  },
  {
    id: "sip2",
    name: "FinWise Tax-Saver SIP",
    description: "Monthly investments in ELSS funds for tax benefits under Section 80C.",
    riskLevel: "Moderate to High",
    expectedReturns: "12-14%",
    minInvestment: 500,
    duration: "3-year lock-in per installment",
    frequency: "Monthly",
    features: ["Tax Benefits", "Wealth Creation", "Auto-debit"],
    categories: ["ELSS", "Tax-Saving"],
    projections: [
      { year: 1, monthly: 2000, value: 24860 },
      { year: 3, monthly: 2000, value: 96270 },
      { year: 5, monthly: 2000, value: 207340 },
      { year: 10, monthly: 2000, value: 614170 },
      { year: 15, monthly: 2000, value: 1402930 },
      { year: 20, monthly: 2000, value: 2779530 },
    ],
  },
];

const ETFS = [
  {
    id: "etf1",
    name: "FinWise Nifty BeES",
    description: "India's first ETF tracking the Nifty 50 index with high liquidity.",
    riskLevel: "Moderate",
    expectedReturns: "12-14%",
    price: 187.45,
    expense: 0.05,
    aum: "₹2,840 Cr",
    categories: ["Large Cap", "Index"],
    performance: [
      { year: "2018", return: 10.2 },
      { year: "2019", return: 14.8 },
      { year: "2020", return: -7.4 },
      { year: "2021", return: 22.8 },
      { year: "2022", return: -4.2 },
      { year: "2023", return: 19.6 },
    ],
  },
  {
    id: "etf2",
    name: "FinWise Banking ETF",
    description: "Track India's leading banking and financial services companies.",
    riskLevel: "High",
    expectedReturns: "14-16%",
    price: 342.75,
    expense: 0.15,
    aum: "₹1,240 Cr",
    categories: ["Sectoral", "Banking"],
    performance: [
      { year: "2018", return: 12.4 },
      { year: "2019", return: 18.6 },
      { year: "2020", return: -15.8 },
      { year: "2021", return: 28.4 },
      { year: "2022", return: -6.8 },
      { year: "2023", return: 24.2 },
    ],
  },
];

const FIXED_DEPOSITS = [
  {
    id: "fd1",
    name: "FinWise Tax-Saver FD",
    description: "5-year tax-saving fixed deposit with benefits under Section 80C.",
    riskLevel: "Low",
    expectedReturns: "6.5-7%",
    duration: 5,
    interest: 7.1,
    minInvestment: 10000,
    categories: ["Tax-Saving", "Fixed Income"],
    performance: [
      { year: "2018", return: 6.8 },
      { year: "2019", return: 7.0 },
      { year: "2020", return: 6.5 },
      { year: "2021", return: 6.2 },
      { year: "2022", return: 6.8 },
      { year: "2023", return: 7.1 },
    ],
  },
  {
    id: "fd2",
    name: "FinWise Senior Citizen FD",
    description: "Special fixed deposit scheme for senior citizens with higher interest rates.",
    riskLevel: "Low",
    expectedReturns: "7-7.5%",
    duration: 3,
    interest: 7.6,
    minInvestment: 10000,
    categories: ["Senior Citizen", "Fixed Income"],
    performance: [
      { year: "2018", return: 7.3 },
      { year: "2019", return: 7.5 },
      { year: "2020", return: 7.0 },
      { year: "2021", return: 6.7 },
      { year: "2022", return: 7.3 },
      { year: "2023", return: 7.6 },
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
      case "fixed_deposits":
        return FIXED_DEPOSITS;
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
        <TabsContent value="fixed_deposits">
          {/* Similar structure for Fixed Deposits */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentExplorer;
