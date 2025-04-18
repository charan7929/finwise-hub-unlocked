
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ChartLine, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinanceFeatures = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-finwise-blue text-center">
          Learn & Trade with Virtual Currency
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stock Market Trading Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-finwise-green-light/20 rounded-full flex items-center justify-center mb-4">
                <ChartLine className="h-6 w-6 text-finwise-green" />
              </div>
              <CardTitle>Stock Market Simulator</CardTitle>
              <CardDescription>Trade virtual stocks with FinCoins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  Virtual portfolio management
                </li>
                <li className="flex items-center">
                  <ChartLine className="mr-2 h-4 w-4" />
                  Real-time market simulation
                </li>
                <li className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Learn trading basics risk-free
                </li>
              </ul>
              <Link to="/stock-market">
                <Button className="w-full bg-finwise-blue hover:bg-finwise-blue/90">
                  Start Trading <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Investment Explorer Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-finwise-green-light/20 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-finwise-green" />
              </div>
              <CardTitle>Investment Explorer</CardTitle>
              <CardDescription>Learn about different investment options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore mutual funds, ETFs & more
                </li>
                <li className="flex items-center">
                  <ChartLine className="mr-2 h-4 w-4" />
                  Compare investment performance
                </li>
                <li className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  Build mock investment portfolios
                </li>
              </ul>
              <Link to="/investment-explorer">
                <Button className="w-full bg-finwise-green hover:bg-finwise-green/90">
                  Explore Investments <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FinanceFeatures;
