
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, HelpCircle, AlertCircle } from "lucide-react";

// Mock investment options data
const investmentOptions = [
  { 
    id: "mutual-growth", 
    name: "Growth Fund",
    type: "Mutual Fund",
    risk: "High",
    returns: "12-15%",
    expenseRatio: "1.2%",
    minInvestment: "$1,000",
    lockInPeriod: "None",
    taxEfficiency: "Medium"
  },
  { 
    id: "mutual-balanced", 
    name: "Balanced Fund",
    type: "Mutual Fund",
    risk: "Medium",
    returns: "9-12%",
    expenseRatio: "1.0%",
    minInvestment: "$500",
    lockInPeriod: "None",
    taxEfficiency: "Medium"
  },
  { 
    id: "mutual-income", 
    name: "Income Fund",
    type: "Mutual Fund",
    risk: "Low",
    returns: "6-8%",
    expenseRatio: "0.8%",
    minInvestment: "$500",
    lockInPeriod: "None",
    taxEfficiency: "Low"
  },
  { 
    id: "sip-growth", 
    name: "SIP Growth Plan",
    type: "SIP",
    risk: "Medium-High",
    returns: "10-14%",
    expenseRatio: "1.1%",
    minInvestment: "$100/month",
    lockInPeriod: "None",
    taxEfficiency: "Medium"
  },
  { 
    id: "sip-wealth", 
    name: "SIP Wealth Builder",
    type: "SIP",
    risk: "Medium",
    returns: "9-12%",
    expenseRatio: "1.0%",
    minInvestment: "$100/month",
    lockInPeriod: "None",
    taxEfficiency: "Medium"
  },
  { 
    id: "sip-tax", 
    name: "SIP Tax Saver",
    type: "SIP",
    risk: "Medium-High",
    returns: "10-13%",
    expenseRatio: "1.2%",
    minInvestment: "$100/month",
    lockInPeriod: "3 years",
    taxEfficiency: "High"
  },
  { 
    id: "govt-bonds", 
    name: "Government Bonds",
    type: "Bond",
    risk: "Very Low",
    returns: "5-7%",
    expenseRatio: "0.5%",
    minInvestment: "$1,000",
    lockInPeriod: "Varies",
    taxEfficiency: "Medium"
  },
  { 
    id: "corp-bonds", 
    name: "Corporate Bonds",
    type: "Bond",
    risk: "Low-Medium",
    returns: "7-9%",
    expenseRatio: "0.6%",
    minInvestment: "$1,000",
    lockInPeriod: "Varies",
    taxEfficiency: "Low"
  },
  { 
    id: "index-etf", 
    name: "Index ETF",
    type: "ETF",
    risk: "Medium",
    returns: "9-12%",
    expenseRatio: "0.3%",
    minInvestment: "1 share",
    lockInPeriod: "None",
    taxEfficiency: "High"
  },
  { 
    id: "sector-etf", 
    name: "Sector ETF",
    type: "ETF",
    risk: "High",
    returns: "10-16%",
    expenseRatio: "0.4%",
    minInvestment: "1 share",
    lockInPeriod: "None",
    taxEfficiency: "High"
  }
];

const ComparisonTool = () => {
  const [investment1, setInvestment1] = useState<string>("mutual-growth");
  const [investment2, setInvestment2] = useState<string>("index-etf");
  
  const option1 = investmentOptions.find(item => item.id === investment1);
  const option2 = investmentOptions.find(item => item.id === investment2);
  
  const getRiskIcon = (risk: string) => {
    if (risk.includes("High")) return <AlertCircle className="h-4 w-4 text-red-500" />;
    if (risk.includes("Medium")) return <HelpCircle className="h-4 w-4 text-yellow-500" />;
    if (risk.includes("Low")) return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Investment 1</Label>
          <Select value={investment1} onValueChange={setInvestment1}>
            <SelectTrigger>
              <SelectValue placeholder="Select investment" />
            </SelectTrigger>
            <SelectContent>
              {investmentOptions.map(option => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name} ({option.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Investment 2</Label>
          <Select value={investment2} onValueChange={setInvestment2}>
            <SelectTrigger>
              <SelectValue placeholder="Select investment" />
            </SelectTrigger>
            <SelectContent>
              {investmentOptions.map(option => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name} ({option.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {option1 && option2 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Feature</TableHead>
              <TableHead>{option1.name}</TableHead>
              <TableHead>{option2.name}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Type</TableCell>
              <TableCell>{option1.type}</TableCell>
              <TableCell>{option2.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Risk Level</TableCell>
              <TableCell className="flex items-center">
                {getRiskIcon(option1.risk)} <span className="ml-2">{option1.risk}</span>
              </TableCell>
              <TableCell className="flex items-center">
                {getRiskIcon(option2.risk)} <span className="ml-2">{option2.risk}</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Expected Returns</TableCell>
              <TableCell>{option1.returns}</TableCell>
              <TableCell>{option2.returns}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Expense Ratio</TableCell>
              <TableCell>{option1.expenseRatio}</TableCell>
              <TableCell>{option2.expenseRatio}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Minimum Investment</TableCell>
              <TableCell>{option1.minInvestment}</TableCell>
              <TableCell>{option2.minInvestment}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Lock-in Period</TableCell>
              <TableCell>{option1.lockInPeriod}</TableCell>
              <TableCell>{option2.lockInPeriod}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Tax Efficiency</TableCell>
              <TableCell>{option1.taxEfficiency}</TableCell>
              <TableCell>{option2.taxEfficiency}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ComparisonTool;
