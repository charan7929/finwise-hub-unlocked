
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TradingInterface = () => {
  const [shares, setShares] = useState<string>("1");
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [orderType, setOrderType] = useState<string>("market");
  const [price, setPrice] = useState<string>("189.87");
  
  // Calculated values
  const currentPrice = 189.87; // Would come from API in real app
  const estimatedTotal = parseInt(shares || "0") * currentPrice;

  return (
    <div className="space-y-4">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Buy</TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Sell</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buy" className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Select defaultValue={symbol} onValueChange={setSymbol}>
              <SelectTrigger>
                <SelectValue placeholder="Select a stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AAPL">AAPL - Apple Inc.</SelectItem>
                <SelectItem value="MSFT">MSFT - Microsoft Corp.</SelectItem>
                <SelectItem value="GOOGL">GOOGL - Alphabet Inc.</SelectItem>
                <SelectItem value="AMZN">AMZN - Amazon.com Inc.</SelectItem>
                <SelectItem value="TSLA">TSLA - Tesla Inc.</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orderType">Order Type</Label>
            <Select defaultValue={orderType} onValueChange={setOrderType}>
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
          
          {orderType !== "market" && (
            <div className="space-y-2">
              <Label htmlFor="price">Limit Price</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="shares">Number of Shares</Label>
            <Input
              id="shares"
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm py-2">
            <span>Current Price:</span>
            <span className="font-medium">${currentPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-t">
            <span className="font-medium">Estimated Total:</span>
            <span className="font-bold text-lg">${estimatedTotal.toFixed(2)}</span>
          </div>
          
          <Button className="w-full bg-green-500 hover:bg-green-600">Place Buy Order</Button>
        </TabsContent>
        
        <TabsContent value="sell" className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="symbolSell">Symbol</Label>
            <Select defaultValue={symbol} onValueChange={setSymbol}>
              <SelectTrigger>
                <SelectValue placeholder="Select a stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AAPL">AAPL - Apple Inc. (10 shares)</SelectItem>
                <SelectItem value="MSFT">MSFT - Microsoft Corp. (5 shares)</SelectItem>
                <SelectItem value="AMZN">AMZN - Amazon.com Inc. (8 shares)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orderTypeSell">Order Type</Label>
            <Select defaultValue={orderType} onValueChange={setOrderType}>
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
          
          {orderType !== "market" && (
            <div className="space-y-2">
              <Label htmlFor="priceSell">Limit Price</Label>
              <Input
                id="priceSell"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="sharesSell">Number of Shares</Label>
            <Input
              id="sharesSell"
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm py-2">
            <span>Current Price:</span>
            <span className="font-medium">${currentPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-t">
            <span className="font-medium">Estimated Total:</span>
            <span className="font-bold text-lg">${estimatedTotal.toFixed(2)}</span>
          </div>
          
          <Button className="w-full bg-red-500 hover:bg-red-600">Place Sell Order</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingInterface;
