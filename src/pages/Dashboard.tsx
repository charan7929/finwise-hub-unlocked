
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BarChart2, BookOpen, Calendar, CheckCircle, Clock, CreditCard, 
         FileText, Gamepad2, LineChart, MessageSquare, Settings, 
         Trophy, User, Video, ChevronRight, Bookmark, TrendingUp, 
         AlertCircle, Heart, BookMarked, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  // User data (in a real app, this would come from an API)
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "",
    plan: "Free",
    joinDate: "Jan 15, 2025",
    stats: {
      chatbotUsage: { current: 3, limit: 5, percentage: 60 },
      videosWatched: 7,
      gamesCompleted: 4,
      quizzesCompleted: 6,
      totalPoints: 720,
      streak: 3
    },
    progress: {
      investing: 45,
      budgeting: 80,
      credit: 60,
      retirement: 20,
      taxes: 10
    }
  };

  // Recent activities (in a real app, this would come from an API)
  const recentActivities = [
    { 
      type: "video", 
      title: "Understanding the Stock Market",
      category: "Investing",
      date: "2025-04-16",
      completed: true,
      progress: 100
    },
    { 
      type: "quiz", 
      title: "Budget Builder Challenge",
      category: "Budgeting",
      date: "2025-04-15",
      completed: true,
      score: "8/10"
    },
    { 
      type: "chatbot", 
      title: "Asked about emergency funds",
      category: "Savings",
      date: "2025-04-15",
      completed: true
    },
    { 
      type: "video", 
      title: "Introduction to Credit Scores",
      category: "Credit",
      date: "2025-04-14",
      completed: false,
      progress: 30
    },
    { 
      type: "quiz", 
      title: "Retirement Planning Basics",
      category: "Retirement",
      date: "2025-04-13",
      completed: false,
      progress: 0
    }
  ];

  // Saved content (in a real app, this would come from an API)
  const savedContent = [
    { 
      type: "video", 
      title: "Advanced Investment Strategies",
      category: "Investing",
      premium: true
    },
    { 
      type: "article", 
      title: "Ten Steps to Better Budgeting",
      category: "Budgeting"
    },
    { 
      type: "chatbot", 
      title: "Retirement calculator recommendation",
      category: "Retirement"
    },
    { 
      type: "video", 
      title: "Understanding ETFs vs. Mutual Funds",
      category: "Investing"
    }
  ];

  // Recommended content (in a real app, this would come from an API)
  const recommendedContent = [
    { 
      type: "video", 
      title: "Debt Management Strategies",
      category: "Debt",
      reason: "Based on your interests"
    },
    { 
      type: "quiz", 
      title: "Test Your Credit Knowledge",
      category: "Credit",
      reason: "Continue your learning path"
    },
    { 
      type: "course", 
      title: "Complete Guide to Personal Finance",
      category: "General",
      reason: "Popular with users like you",
      premium: true
    }
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col bg-finwise-gray-light">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* User Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center">
                <Avatar className="h-14 w-14 mr-4 border-2 border-finwise-green">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="bg-finwise-blue text-white">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{userData.name}'s Dashboard</h1>
                  <p className="text-gray-500">Member since {userData.joinDate} • {userData.plan} Plan</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {userData.plan === "Free" && (
                  <Button 
                    className="bg-finwise-green hover:bg-finwise-green-dark"
                  >
                    Upgrade to Pro
                  </Button>
                )}
                <Button variant="outline" className="gap-1">
                  <Settings size={16} />
                  Account
                </Button>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="learning">Learning Progress</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="saved">Saved Content</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Chatbot Usage */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <MessageSquare className="mr-2 text-finwise-blue" size={20} />
                      Daily Chatbot Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Questions Used Today</span>
                        <span className="font-medium">{userData.stats.chatbotUsage.current}/{userData.stats.chatbotUsage.limit}</span>
                      </div>
                      <Progress 
                        value={userData.stats.chatbotUsage.percentage} 
                        className="h-2"
                      />
                      {userData.plan === "Free" && (
                        <p className="text-xs text-finwise-blue">
                          Upgrade to Pro for unlimited questions
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Learning Stats */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="mr-2 text-finwise-blue" size={20} />
                      Learning Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-finwise-green">
                          {userData.stats.videosWatched}
                        </div>
                        <div className="text-xs text-gray-500">Videos Watched</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-finwise-green">
                          {userData.stats.quizzesCompleted}
                        </div>
                        <div className="text-xs text-gray-500">Quizzes Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-finwise-green">
                          {userData.stats.gamesCompleted}
                        </div>
                        <div className="text-xs text-gray-500">Games Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-finwise-green">
                          {userData.stats.streak}
                        </div>
                        <div className="text-xs text-gray-500">Day Streak</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Points */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="mr-2 text-finwise-blue" size={20} />
                      Your Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-3">
                      <div className="text-3xl font-bold mb-1 text-finwise-green">
                        {userData.stats.totalPoints}
                      </div>
                      <div className="text-sm text-gray-500 mb-3">Total Points Earned</div>
                      <Badge className="bg-finwise-blue">Rank #42</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Activity and Recommended Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="mr-2 text-finwise-blue" size={20} />
                        Recent Activity
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
                        View All <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {recentActivities.slice(0, 3).map((activity, index) => (
                        <li key={index} className="px-6 py-3 hover:bg-finwise-gray-light/50">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div className="mr-3 mt-1">
                                {activity.type === "video" && <Video size={18} className="text-finwise-blue" />}
                                {activity.type === "quiz" && <Gamepad2 size={18} className="text-finwise-green" />}
                                {activity.type === "chatbot" && <MessageSquare size={18} className="text-finwise-blue-light" />}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{activity.title}</p>
                                <div className="flex items-center mt-1">
                                  <Badge variant="outline" className="text-xs mr-2 bg-finwise-gray-light/30">
                                    {activity.category}
                                  </Badge>
                                  <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                                </div>
                              </div>
                            </div>
                            {activity.completed ? (
                              <CheckCircle size={16} className="text-finwise-green flex-shrink-0" />
                            ) : (
                              <Badge variant="outline" className="text-xs bg-finwise-gray-light/30">
                                In Progress
                              </Badge>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Recommended Content */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BookMarked className="mr-2 text-finwise-blue" size={20} />
                      Recommended For You
                    </CardTitle>
                    <CardDescription>
                      Based on your learning history
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {recommendedContent.map((content, index) => (
                        <li key={index} className="px-6 py-3 hover:bg-finwise-gray-light/50">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div className="mr-3 mt-1">
                                {content.type === "video" && <Video size={18} className="text-finwise-blue" />}
                                {content.type === "quiz" && <Gamepad2 size={18} className="text-finwise-green" />}
                                {content.type === "course" && <BookOpen size={18} className="text-finwise-blue-light" />}
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium text-sm">{content.title}</p>
                                  {content.premium && (
                                    <Badge className="ml-2 text-xs bg-finwise-blue">Premium</Badge>
                                  )}
                                </div>
                                <div className="flex items-center mt-1">
                                  <Badge variant="outline" className="text-xs mr-2 bg-finwise-gray-light/30">
                                    {content.category}
                                  </Badge>
                                  <span className="text-xs text-gray-500">{content.reason}</span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost" className="h-8 px-2">
                              <Bookmark size={16} />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Learning Progress Tab */}
            <TabsContent value="learning" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Overall Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BarChart2 className="mr-2 text-finwise-blue" size={20} />
                      Topic Proficiency
                    </CardTitle>
                    <CardDescription>
                      Your progress across financial topics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Investing Progress */}
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="font-medium">Investing</span>
                          <span>{userData.progress.investing}%</span>
                        </div>
                        <Progress value={userData.progress.investing} className="h-2" />
                      </div>
                      
                      {/* Budgeting Progress */}
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="font-medium">Budgeting</span>
                          <span>{userData.progress.budgeting}%</span>
                        </div>
                        <Progress value={userData.progress.budgeting} className="h-2" />
                      </div>
                      
                      {/* Credit Progress */}
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="font-medium">Credit</span>
                          <span>{userData.progress.credit}%</span>
                        </div>
                        <Progress value={userData.progress.credit} className="h-2" />
                      </div>
                      
                      {/* Retirement Progress */}
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="font-medium">Retirement</span>
                          <span>{userData.progress.retirement}%</span>
                        </div>
                        <Progress value={userData.progress.retirement} className="h-2" />
                      </div>
                      
                      {/* Taxes Progress */}
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="font-medium">Taxes</span>
                          <span>{userData.progress.taxes}%</span>
                        </div>
                        <Progress value={userData.progress.taxes} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Learning Stats and Recommendations */}
                <div className="space-y-6">
                  {/* Learning Stats Card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <LineChart className="mr-2 text-finwise-blue" size={20} />
                        Learning Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-finwise-gray-light rounded-lg p-3">
                          <dt className="text-xs text-gray-500 mb-1">Total Videos</dt>
                          <dd className="text-xl font-bold">7/50</dd>
                        </div>
                        <div className="bg-finwise-gray-light rounded-lg p-3">
                          <dt className="text-xs text-gray-500 mb-1">Quiz Score</dt>
                          <dd className="text-xl font-bold">78%</dd>
                        </div>
                        <div className="bg-finwise-gray-light rounded-lg p-3">
                          <dt className="text-xs text-gray-500 mb-1">Study Hours</dt>
                          <dd className="text-xl font-bold">12.5</dd>
                        </div>
                        <div className="bg-finwise-gray-light rounded-lg p-3">
                          <dt className="text-xs text-gray-500 mb-1">Streaks</dt>
                          <dd className="text-xl font-bold">3 Days</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                  
                  {/* Suggested Next Steps */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <AlertCircle className="mr-2 text-finwise-blue" size={20} />
                        Suggested Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        <li className="px-6 py-3 hover:bg-finwise-gray-light/50">
                          <div className="flex items-center">
                            <TrendingUp size={18} className="text-finwise-green mr-3" />
                            <div>
                              <p className="font-medium text-sm">Complete "Investing Basics" Course</p>
                              <p className="text-xs text-gray-500 mt-1">Currently 45% complete</p>
                            </div>
                          </div>
                        </li>
                        <li className="px-6 py-3 hover:bg-finwise-gray-light/50">
                          <div className="flex items-center">
                            <CreditCard size={18} className="text-finwise-blue mr-3" />
                            <div>
                              <p className="font-medium text-sm">Continue "Credit Score" Video</p>
                              <p className="text-xs text-gray-500 mt-1">Resume from 9:45</p>
                            </div>
                          </div>
                        </li>
                        <li className="px-6 py-3 hover:bg-finwise-gray-light/50">
                          <div className="flex items-center">
                            <Calendar size={18} className="text-finwise-blue-light mr-3" />
                            <div>
                              <p className="font-medium text-sm">Complete Today's Challenge</p>
                              <p className="text-xs text-gray-500 mt-1">Keep your learning streak going!</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 text-finwise-blue" size={20} />
                    Your Recent Activity
                  </CardTitle>
                  <CardDescription>
                    All your recent learning activities in one place
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {recentActivities.map((activity, index) => (
                      <li key={index} className="px-6 py-4 hover:bg-finwise-gray-light/50">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {activity.type === "video" && <Video size={18} className="text-finwise-blue" />}
                            {activity.type === "quiz" && <Gamepad2 size={18} className="text-finwise-green" />}
                            {activity.type === "chatbot" && <MessageSquare size={18} className="text-finwise-blue-light" />}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{activity.title}</p>
                              <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="text-xs mr-2 bg-finwise-gray-light/30">
                                {activity.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-finwise-gray-light/30">
                                {activity.type}
                              </Badge>
                            </div>
                            
                            {activity.type === "video" && !activity.completed && activity.progress !== undefined && (
                              <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>Progress</span>
                                  <span>{activity.progress}%</span>
                                </div>
                                <Progress value={activity.progress} className="h-1.5" />
                              </div>
                            )}
                            
                            {activity.type === "quiz" && activity.score && (
                              <div className="mt-2 text-sm">
                                Score: <span className="font-medium">{activity.score}</span>
                              </div>
                            )}
                          </div>
                          {activity.completed ? (
                            <CheckCircle size={16} className="text-finwise-green flex-shrink-0 ml-2" />
                          ) : (
                            <Button size="sm" variant="outline" className="ml-2 h-8">
                              Resume
                            </Button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Saved Content Tab */}
            <TabsContent value="saved" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bookmark className="mr-2 text-finwise-blue" size={20} />
                    Your Saved Content
                  </CardTitle>
                  <CardDescription>
                    Content you've bookmarked for later reference
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {savedContent.length > 0 ? (
                    <ul className="divide-y">
                      {savedContent.map((content, index) => (
                        <li key={index} className="px-6 py-4 hover:bg-finwise-gray-light/50">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div className="mr-3 mt-1">
                                {content.type === "video" && <Video size={18} className="text-finwise-blue" />}
                                {content.type === "article" && <FileText size={18} className="text-finwise-green" />}
                                {content.type === "chatbot" && <MessageSquare size={18} className="text-finwise-blue-light" />}
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium">{content.title}</p>
                                  {content.premium && (
                                    <Badge className="ml-2 text-xs bg-finwise-blue">Premium</Badge>
                                  )}
                                </div>
                                <div className="flex items-center mt-1">
                                  <Badge variant="outline" className="text-xs mr-2 bg-finwise-gray-light/30">
                                    {content.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs bg-finwise-gray-light/30">
                                    {content.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Heart size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-500">
                                <Bookmark size={16} className="fill-current" />
                              </Button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-12 text-center">
                      <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">You haven't saved any content yet.</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Bookmark videos, articles, and chat responses to access them later.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
