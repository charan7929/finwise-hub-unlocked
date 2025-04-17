
import React from "react";
import { Newspaper, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock news data
const newsData = [
  {
    id: 1,
    title: "Fed Signals Interest Rate Cut Expected in Coming Months",
    snippet: "The Federal Reserve hinted at potential interest rate cuts later this year as inflation pressures ease...",
    source: "Market Watch",
    time: "2 hours ago",
    tags: ["Fed", "Interest Rates", "Economy"],
    url: "#"
  },
  {
    id: 2,
    title: "Tech Giants Report Better-Than-Expected Earnings",
    snippet: "Major technology companies exceeded analyst expectations in their quarterly reports, driving market gains...",
    source: "Bloomberg",
    time: "5 hours ago",
    tags: ["Tech", "Earnings", "Growth"],
    url: "#"
  },
  {
    id: 3,
    title: "Oil Prices Surge Amid Middle East Tensions",
    snippet: "Crude oil futures jumped 3% as geopolitical tensions rise in key oil-producing regions...",
    source: "Reuters",
    time: "6 hours ago",
    tags: ["Oil", "Commodities", "Geopolitics"],
    url: "#"
  },
  {
    id: 4,
    title: "New IPO Listings Outperform in Hot Market",
    snippet: "Recent initial public offerings have shown strong performance, with an average first-day pop of 25%...",
    source: "Financial Times",
    time: "8 hours ago",
    tags: ["IPO", "Stocks", "Market"],
    url: "#"
  }
];

const MarketNews = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Newspaper className="h-5 w-5 text-muted-foreground mr-2" />
        <h3 className="text-lg font-medium">Latest Market News</h3>
      </div>
      
      <div className="space-y-4">
        {newsData.map((news) => (
          <Card key={news.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-base">{news.title}</h4>
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{news.snippet}</p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-1">
                  {news.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {news.source} • {news.time}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketNews;
