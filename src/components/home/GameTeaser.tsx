
import { Gamepad2, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const GameTeaser = () => {
  // In a real app, this would come from an API
  const dailyChallenge = {
    title: "Investment Basics Quiz",
    description: "Test your knowledge on investment fundamentals and strategies.",
    difficulty: "Medium",
    questions: 10,
    completionRate: 68,
    points: 50
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-finwise-blue">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-finwise-blue">
          <Gamepad2 className="mr-2" size={20} />
          Daily Financial Challenge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{dailyChallenge.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{dailyChallenge.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-finwise-blue-light/10">
              {dailyChallenge.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-finwise-green-light/10">
              {dailyChallenge.questions} Questions
            </Badge>
            <Badge variant="outline" className="bg-finwise-gray/30">
              <Trophy size={14} className="mr-1" /> {dailyChallenge.points} Points
            </Badge>
          </div>
          
          <div className="w-full bg-finwise-gray rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-finwise-blue to-finwise-green h-2.5 rounded-full" 
              style={{ width: `${dailyChallenge.completionRate}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            {dailyChallenge.completionRate}% of users completed today's challenge
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/games" className="w-full">
          <Button className="w-full bg-finwise-blue hover:bg-finwise-blue-dark">
            Play Today's Challenge <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GameTeaser;
