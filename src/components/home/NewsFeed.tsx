
import { Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock news data (in a real app, this would come from an API)
const newsItems = [
  {
    id: 1,
    title: "Fed Announces Interest Rate Decision",
    snippet: "The Federal Reserve has decided to maintain current interest rates, citing economic stability...",
    date: "2025-04-15",
    source: "Financial Times",
    url: "#"
  },
  {
    id: 2,
    title: "New Tax Credits for Clean Energy Investments",
    snippet: "The government has announced additional tax incentives for individuals investing in renewable energy...",
    date: "2025-04-14",
    source: "Bloomberg",
    url: "#"
  },
  {
    id: 3,
    title: "Stock Market Reaches New High",
    snippet: "Major indices closed at record levels yesterday, driven by strong earnings reports from tech sector...",
    date: "2025-04-13",
    source: "Wall Street Journal",
    url: "#"
  }
];

const NewsFeed = () => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-finwise-blue">
          Latest Financial News
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {newsItems.map((item, index) => (
          <div key={item.id}>
            <div className="mb-2">
              <h3 className="font-semibold hover:text-finwise-green transition-colors cursor-pointer">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{item.snippet}</p>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(item.date)}
                </div>
                <div className="flex items-center space-x-1">
                  <span>{item.source}</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </div>
            {index < newsItems.length - 1 && <Separator className="my-3" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewsFeed;
