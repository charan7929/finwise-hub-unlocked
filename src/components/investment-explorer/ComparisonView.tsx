
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface ComparisonViewProps {
  selectedFunds: string[];
  growthComparisonData: any[];
  getSelectedFundsData: () => any[];
  getRiskColor: (risk: string) => string;
  onClearSelection: () => void;
}

const ComparisonView = ({
  selectedFunds,
  growthComparisonData,
  getSelectedFundsData,
  getRiskColor,
  onClearSelection
}: ComparisonViewProps) => {
  if (selectedFunds.length === 0) return null;

  return (
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
                    color: "#4ade80",
                  },
                  fund2: {
                    label: getSelectedFundsData()[1]?.name || "Fund 2",
                    color: "#3b82f6",
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
          <Button variant="outline" onClick={onClearSelection}>Clear Selection</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ComparisonView;
