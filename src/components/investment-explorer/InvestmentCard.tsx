
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface InvestmentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  risk: string;
  returns: string;
  category: string;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  title,
  description,
  icon: Icon,
  risk,
  returns,
  category,
}) => {
  const getRiskColor = (risk: string) => {
    if (risk.includes("High")) return "bg-red-50 text-red-700 border-red-200";
    if (risk.includes("Medium")) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (risk.includes("Low")) return "bg-green-50 text-green-700 border-green-200";
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="bg-slate-50 p-4 flex items-start">
          <div className="h-10 w-10 rounded-full bg-finwise-green/10 flex items-center justify-center mr-3">
            <Icon className="h-5 w-5 text-finwise-green" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Risk Level</p>
              <div className={`mt-1 px-2 py-1 rounded-md border inline-block ${getRiskColor(risk)}`}>
                {risk}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Returns</p>
              <p className="font-medium">{returns}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Category</p>
              <p className="font-medium">{category}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="sm">Learn More</Button>
        <Button size="sm">Invest FinCoins</Button>
      </CardFooter>
    </Card>
  );
};

export default InvestmentCard;
