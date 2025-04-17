
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gamepad2, Trophy, Star, Medal, Users, Calendar, Clock, TrendingUp, 
         CheckCircle, Zap, Award, Search, Filter, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Mock games data
const gamesData = [
  {
    id: 1,
    title: "Investment Basics Quiz",
    description: "Test your knowledge on investment fundamentals and strategies.",
    icon: <TrendingUp size={20} />,
    type: "Quiz",
    difficulty: "Medium",
    questions: 10,
    timeEstimate: "5 min",
    completionRate: 68,
    points: 50,
    category: "Investing",
    isDaily: true,
    premium: false,
    completed: false
  },
  {
    id: 2,
    title: "Budget Builder Challenge",
    description: "Create a balanced budget with limited resources in this interactive game.",
    icon: <Zap size={20} />,
    type: "Simulation",
    difficulty: "Easy",
    timeEstimate: "10 min",
    completionRate: 85,
    points: 75,
    category: "Budgeting",
    isDaily: false,
    premium: false,
    completed: true
  },
  {
    id: 3,
    title: "Stock Market Simulator",
    description: "Practice investing in a simulated stock market with virtual money.",
    icon: <TrendingUp size={20} />,
    type: "Simulation",
    difficulty: "Hard",
    timeEstimate: "15 min",
    completionRate: 45,
    points: 100,
    category: "Investing",
    isDaily: false,
    premium: true,
    completed: false
  },
  {
    id: 4,
    title: "Credit Score Mastery",
    description: "Learn strategies to build and maintain excellent credit scores.",
    icon: <Award size={20} />,
    type: "Quiz",
    difficulty: "Medium",
    questions: 8,
    timeEstimate: "4 min",
    completionRate: 72,
    points: 45,
    category: "Credit",
    isDaily: false,
    premium: false,
    completed: false
  },
  {
    id: 5,
    title: "Retirement Planning Challenge",
    description: "Test your knowledge about saving for a comfortable retirement.",
    icon: <Calendar size={20} />,
    type: "Quiz",
    difficulty: "Hard",
    questions: 12,
    timeEstimate: "8 min",
    completionRate: 55,
    points: 80,
    category: "Retirement",
    isDaily: false,
    premium: true,
    completed: false
  },
  {
    id: 6,
    title: "Tax Savings Strategies",
    description: "Discover legal ways to minimize your tax burden in this interactive quiz.",
    icon: <Award size={20} />,
    type: "Quiz",
    difficulty: "Medium",
    questions: 10,
    timeEstimate: "6 min",
    completionRate: 60,
    points: 60,
    category: "Taxes",
    isDaily: false,
    premium: false,
    completed: false
  }
];

// Leaderboard data
const leaderboardData = [
  { rank: 1, name: "JFinance22", points: 2450, badge: "Financial Guru" },
  { rank: 2, name: "InvestorPro", points: 2305, badge: "Market Master" },
  { rank: 3, name: "MoneyWise", points: 2120, badge: "Budget Expert" },
  { rank: 4, name: "FiscalSavvy", points: 1950, badge: "Savings Champion" },
  { rank: 5, name: "WealthBuilder", points: 1860, badge: "Investment Wizard" },
  // Current user
  { rank: 42, name: "You", points: 720, badge: "Financial Rookie", isCurrentUser: true }
];

// Badge data
const badgesData = [
  { id: 1, name: "First Steps", description: "Complete your first game", icon: <CheckCircle size={20} />, unlocked: true },
  { id: 2, name: "Quick Learner", description: "Score 90%+ on any quiz", icon: <Zap size={20} />, unlocked: true },
  { id: 3, name: "Consistency", description: "Complete 5 daily challenges in a row", icon: <Calendar size={20} />, unlocked: false, progress: 3, total: 5 },
  { id: 4, name: "Investment Guru", description: "Master all investing games", icon: <Award size={20} />, unlocked: false, progress: 1, total: 3 },
  { id: 5, name: "Budget Master", description: "Complete all budgeting challenges", icon: <Star size={20} />, unlocked: false, progress: 1, total: 2 },
  { id: 6, name: "Financial Expert", description: "Earn 1000 total points", icon: <Trophy size={20} />, unlocked: false, progress: 720, total: 1000 }
];

// Filter categories
const categories = ["All", "Investing", "Budgeting", "Credit", "Retirement", "Taxes"];
const difficulties = ["All Difficulties", "Easy", "Medium", "Hard"];
const types = ["All Types", "Quiz", "Simulation", "Challenge"];

const Games = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
  const [selectedType, setSelectedType] = useState("All Types");
  const { toast } = useToast();
  
  // Filter games based on search and filters
  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All Difficulties" || game.difficulty === selectedDifficulty;
    const matchesType = selectedType === "All Types" || game.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });
  
  const handleGameStart = (gameId: number, isPremium: boolean) => {
    if (isPremium) {
      toast({
        title: "Premium Content",
        description: "This game is available to Pro and Elite subscribers. Upgrade to play!",
        variant: "default",
      });
    } else {
      // In a real app, this would navigate to the game screen
      toast({
        title: "Game Started",
        description: "Good luck with your financial challenge!",
        variant: "default",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-finwise-gray-light">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-finwise-blue to-finwise-blue-light text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-4">Financial Learning Games</h1>
                <p className="text-xl mb-6">
                  Test your knowledge, practice skills, and earn rewards with interactive financial challenges
                </p>
                
                {/* Today's Challenge Card */}
                <Card className="bg-white/10 border-white/20 text-white max-w-md shadow-xl">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit bg-white text-finwise-blue self-start">Daily Challenge</Badge>
                    <CardTitle className="text-xl mt-2">{gamesData[0].title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 mb-4">{gamesData[0].description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="border-white/30 text-white">
                        {gamesData[0].difficulty}
                      </Badge>
                      <Badge variant="outline" className="border-white/30 text-white">
                        <Clock size={14} className="mr-1" /> {gamesData[0].timeEstimate}
                      </Badge>
                      <Badge variant="outline" className="border-white/30 text-white">
                        <Trophy size={14} className="mr-1" /> {gamesData[0].points} Points
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-white text-finwise-blue hover:bg-white/90"
                      onClick={() => handleGameStart(gamesData[0].id, gamesData[0].premium)}
                    >
                      Play Today's Challenge
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center">
                <Card className="bg-white/10 border-white/20 text-white w-full max-w-xs">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="mr-2" size={20} />
                      Your Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Points</span>
                      <span className="font-bold text-xl">720</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Games Completed</span>
                      <span>8/24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Daily Streak</span>
                      <span>3 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Badges Earned</span>
                      <span>2/12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Leaderboard Rank</span>
                      <span>#42</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="games">
            <TabsList className="mb-6">
              <TabsTrigger value="games">
                <Gamepad2 size={16} className="mr-2" /> Games
              </TabsTrigger>
              <TabsTrigger value="leaderboard">
                <Users size={16} className="mr-2" /> Leaderboard
              </TabsTrigger>
              <TabsTrigger value="badges">
                <Medal size={16} className="mr-2" /> My Badges
              </TabsTrigger>
            </TabsList>
            
            {/* Games Tab */}
            <TabsContent value="games" className="mt-0">
              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="search"
                    placeholder="Search games..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-3 items-center">
                  <Filter size={20} className="text-finwise-blue" />
                  <div className="space-x-1">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? "bg-finwise-green hover:bg-finwise-green-dark" : ""}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="space-x-1">
                    {difficulties.map(difficulty => (
                      <Button
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={selectedDifficulty === difficulty ? "bg-finwise-blue hover:bg-finwise-blue-dark" : ""}
                      >
                        {difficulty}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Games Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map(game => (
                  <Card key={game.id} className={`overflow-hidden hover:shadow-md transition-shadow ${game.completed ? "border-finwise-green" : ""}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${game.isDaily ? "bg-finwise-blue" : "bg-finwise-green"} text-white`}>
                            {game.icon}
                          </div>
                          <Badge variant="outline" className="bg-finwise-gray-light/50">
                            {game.type}
                          </Badge>
                        </div>
                        {game.isDaily && (
                          <Badge className="bg-finwise-blue">Today's Challenge</Badge>
                        )}
                        {game.premium && (
                          <Badge className="bg-finwise-blue-light">Premium</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-2">{game.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{game.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={`${
                          game.difficulty === "Easy" ? "border-green-300 bg-green-50" :
                          game.difficulty === "Medium" ? "border-yellow-300 bg-yellow-50" :
                          "border-red-300 bg-red-50"
                        }`}>
                          {game.difficulty}
                        </Badge>
                        {game.questions && (
                          <Badge variant="outline" className="bg-finwise-gray-light/30">
                            {game.questions} Questions
                          </Badge>
                        )}
                        <Badge variant="outline" className="bg-finwise-gray-light/30">
                          <Clock size={14} className="mr-1" /> {game.timeEstimate}
                        </Badge>
                        <Badge variant="outline" className="bg-finwise-gray-light/30">
                          <Trophy size={14} className="mr-1" /> {game.points} Points
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Completion Rate</span>
                          <span>{game.completionRate}%</span>
                        </div>
                        <div className="w-full bg-finwise-gray rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              game.difficulty === "Easy" ? "bg-green-500" :
                              game.difficulty === "Medium" ? "bg-yellow-500" :
                              "bg-red-500"
                            }`}
                            style={{ width: `${game.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        onClick={() => handleGameStart(game.id, game.premium)}
                        className={`w-full ${game.premium ? "bg-finwise-blue-light" : "bg-finwise-green"}`}
                        disabled={game.completed}
                      >
                        {game.completed ? (
                          <>
                            <CheckCircle size={16} className="mr-2" /> Completed
                          </>
                        ) : game.premium ? (
                          <>
                            <Lock size={16} className="mr-2" /> Premium Game
                          </>
                        ) : (
                          "Play Now"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Trophy className="mr-2 text-finwise-blue" size={20} />
                    Global Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Rank</th>
                          <th className="text-left py-3 px-4">Player</th>
                          <th className="text-left py-3 px-4">Points</th>
                          <th className="text-left py-3 px-4">Badge</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData.map((player) => (
                          <tr 
                            key={player.rank} 
                            className={`border-b hover:bg-finwise-gray-light/50 ${
                              player.isCurrentUser ? "bg-finwise-green-light/10" : ""
                            }`}
                          >
                            <td className="py-3 px-4">
                              {player.rank <= 3 ? (
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  player.rank === 1 ? "bg-yellow-400" :
                                  player.rank === 2 ? "bg-gray-300" :
                                  "bg-amber-700"
                                } text-white font-bold`}>
                                  {player.rank}
                                </div>
                              ) : player.rank}
                            </td>
                            <td className="py-3 px-4 font-medium">
                              {player.name}
                              {player.isCurrentUser && <span className="ml-2 text-xs text-finwise-green">(You)</span>}
                            </td>
                            <td className="py-3 px-4">{player.points.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className="bg-finwise-gray-light/30">
                                {player.badge}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Badges Tab */}
            <TabsContent value="badges" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badgesData.map(badge => (
                  <Card 
                    key={badge.id} 
                    className={`${
                      badge.unlocked 
                        ? "border-finwise-green bg-finwise-green-light/5" 
                        : "border-gray-200 opacity-80"
                    }`}
                  >
                    <CardContent className="p-6 flex gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        badge.unlocked 
                          ? "bg-finwise-green text-white" 
                          : "bg-gray-200 text-gray-400"
                      }`}>
                        {badge.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{badge.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{badge.description}</p>
                        
                        {badge.unlocked ? (
                          <Badge variant="outline" className="bg-finwise-green-light/20 border-finwise-green">
                            <CheckCircle size={12} className="mr-1" /> Unlocked
                          </Badge>
                        ) : badge.progress ? (
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>{badge.progress}/{badge.total}</span>
                            </div>
                            <Progress value={(badge.progress / badge.total) * 100} className="h-1.5" />
                          </div>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100">
                            <Lock size={12} className="mr-1" /> Locked
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Games;
