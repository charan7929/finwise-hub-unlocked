
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PieChart, BarChart3, DollarSign, BookOpen, ShieldCheck, TrendingUp, Scale, FileBar, Layers, Lightbulb } from "lucide-react";
import InvestmentCard from "@/components/investment-explorer/InvestmentCard";
import InvestmentSimulator from "@/components/investment-explorer/InvestmentSimulator";
import ComparisonTool from "@/components/investment-explorer/ComparisonTool";
import MockPortfolio from "@/components/investment-explorer/MockPortfolio";

const InvestmentExplorer = () => {
  return (
    <div className="container max-w-7xl py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-finwise-blue">Investment Explorer</h1>
          <p className="text-muted-foreground">Learn about different investment types</p>
        </div>
        <div className="flex items-center gap-2 bg-finwise-green/10 p-3 rounded-lg">
          <DollarSign className="text-finwise-green h-6 w-6" />
          <div>
            <p className="text-sm font-medium">FinCoin Balance</p>
            <p className="text-2xl font-bold text-finwise-blue">10,000</p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="mutual-funds" className="w-full">
            <TabsList className="w-full grid grid-cols-4 rounded-none border-b">
              <TabsTrigger value="mutual-funds" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-finwise-green">
                <PieChart className="mr-2 h-4 w-4" />
                Mutual Funds
              </TabsTrigger>
              <TabsTrigger value="sips" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-finwise-green">
                <BarChart3 className="mr-2 h-4 w-4" />
                SIPs
              </TabsTrigger>
              <TabsTrigger value="bonds" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-finwise-green">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Bonds
              </TabsTrigger>
              <TabsTrigger value="etfs" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-finwise-green">
                <TrendingUp className="mr-2 h-4 w-4" />
                ETFs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="mutual-funds" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InvestmentCard 
                  title="Growth Fund" 
                  description="Aims for capital appreciation with higher risk"
                  icon={TrendingUp}
                  risk="High"
                  returns="12-15%"
                  category="Equity"
                />
                <InvestmentCard 
                  title="Balanced Fund" 
                  description="Mix of equity and debt for moderate growth and stability"
                  icon={Scale}
                  risk="Medium"
                  returns="9-12%"
                  category="Hybrid"
                />
                <InvestmentCard 
                  title="Income Fund" 
                  description="Focus on regular income with lower risk"
                  icon={DollarSign}
                  risk="Low"
                  returns="6-8%"
                  category="Debt"
                />
              </div>
            </TabsContent>
            <TabsContent value="sips" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InvestmentCard 
                  title="SIP Growth Plan" 
                  description="Monthly investment in equity funds"
                  icon={FileBar}
                  risk="Medium-High"
                  returns="10-14%"
                  category="Equity SIP"
                />
                <InvestmentCard 
                  title="SIP Wealth Builder" 
                  description="Systematic investment for long-term wealth creation"
                  icon={Layers}
                  risk="Medium"
                  returns="9-12%"
                  category="Diversified SIP"
                />
                <InvestmentCard 
                  title="SIP Tax Saver" 
                  description="Tax-efficient monthly investment plan"
                  icon={Lightbulb}
                  risk="Medium-High"
                  returns="10-13%"
                  category="ELSS SIP"
                />
              </div>
            </TabsContent>
            <TabsContent value="bonds" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InvestmentCard 
                  title="Government Bonds" 
                  description="Safest fixed-income securities backed by government"
                  icon={ShieldCheck}
                  risk="Very Low"
                  returns="5-7%"
                  category="Sovereign"
                />
                <InvestmentCard 
                  title="Corporate Bonds" 
                  description="Debt securities issued by private companies"
                  icon={BookOpen}
                  risk="Low-Medium"
                  returns="7-9%"
                  category="Corporate"
                />
                <InvestmentCard 
                  title="Municipal Bonds" 
                  description="Issued by local governments for public projects"
                  icon={Layers}
                  risk="Low"
                  returns="6-7.5%"
                  category="Municipal"
                />
              </div>
            </TabsContent>
            <TabsContent value="etfs" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InvestmentCard 
                  title="Index ETF" 
                  description="Tracks a market index with low fees"
                  icon={BarChart3}
                  risk="Medium"
                  returns="9-12%"
                  category="Index"
                />
                <InvestmentCard 
                  title="Sector ETF" 
                  description="Focuses on a specific industry sector"
                  icon={PieChart}
                  risk="High"
                  returns="10-16%"
                  category="Sector"
                />
                <InvestmentCard 
                  title="Bond ETF" 
                  description="Basket of bonds traded like a stock"
                  icon={DollarSign}
                  risk="Low"
                  returns="5-7%"
                  category="Bond"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="mr-2 text-finwise-green" size={20} />
              Investment Simulator
            </CardTitle>
            <CardDescription>See how your investment might grow over time</CardDescription>
          </CardHeader>
          <CardContent>
            <InvestmentSimulator />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Scale className="mr-2 text-finwise-green" size={20} />
              Compare Investments
            </CardTitle>
            <CardDescription>Side-by-side comparison of investment options</CardDescription>
          </CardHeader>
          <CardContent>
            <ComparisonTool />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <PieChart className="mr-2 text-finwise-green" size={20} />
            Your Mock Portfolio
          </CardTitle>
          <CardDescription>Build and track a virtual investment portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <MockPortfolio />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentExplorer;
