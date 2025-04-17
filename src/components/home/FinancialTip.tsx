
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// In a real app, these would come from an API or database
const tips = [
  {
    title: "Emergency Fund Basics",
    content: "Aim to save 3-6 months of expenses in an easily accessible account for emergencies.",
  },
  {
    title: "The 50/30/20 Rule",
    content: "Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.",
  },
  {
    title: "Credit Score Improvement",
    content: "Pay bills on time and keep credit utilization under 30% to boost your credit score.",
  },
  {
    title: "Compound Interest",
    content: "Starting to invest early, even with small amounts, can lead to significant growth over time.",
  },
  {
    title: "Tax-Advantaged Accounts",
    content: "Maximize contributions to 401(k)s and IRAs to reduce taxes while saving for retirement.",
  }
];

const FinancialTip = () => {
  // Select a random tip (in a real app, this could be daily or personalized)
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-finwise-green">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-finwise-blue">
          <Lightbulb className="mr-2 text-finwise-green" size={20} />
          Today's Financial Tip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{randomTip.title}</h3>
        <p className="text-gray-600">{randomTip.content}</p>
      </CardContent>
    </Card>
  );
};

export default FinancialTip;
