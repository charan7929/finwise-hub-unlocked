
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Filter, Clock, Play, BookOpen, CheckCircle2, Star, 
         FolderOpen, SortDesc, SortAsc, EyeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock video data (in a real app, this would come from an API)
const videoData = [
  {
    id: 1,
    title: "Introduction to Investing",
    description: "Learn the basics of investing and how to get started with your first investments.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
    duration: "12:45",
    category: "Investing",
    level: "Beginner",
    watched: true,
    progress: 100,
    premium: false
  },
  {
    id: 2,
    title: "Understanding the Stock Market",
    description: "Dive into how the stock market works, including key terms and concepts.",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3",
    duration: "18:20",
    category: "Investing",
    level: "Beginner",
    watched: true,
    progress: 75,
    premium: false
  },
  {
    id: 3,
    title: "Creating a Personal Budget",
    description: "Step-by-step guide to creating and sticking to an effective personal budget.",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3",
    duration: "15:10",
    category: "Budgeting",
    level: "Beginner",
    watched: false,
    progress: 0,
    premium: false
  },
  {
    id: 4,
    title: "Advanced Investment Strategies",
    description: "Explore advanced techniques for optimizing your investment portfolio.",
    thumbnail: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3",
    duration: "22:30",
    category: "Investing",
    level: "Advanced",
    watched: false,
    progress: 0,
    premium: true
  },
  {
    id: 5,
    title: "Understanding Credit Scores",
    description: "Learn what affects your credit score and how to improve it over time.",
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3",
    duration: "14:15",
    category: "Credit",
    level: "Intermediate",
    watched: false,
    progress: 30,
    premium: false
  },
  {
    id: 6,
    title: "Retirement Planning Essentials",
    description: "Key strategies for planning a secure and comfortable retirement.",
    thumbnail: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3",
    duration: "20:05",
    category: "Retirement",
    level: "Intermediate",
    watched: false,
    progress: 0,
    premium: true
  },
  {
    id: 7,
    title: "Tax Planning for Beginners",
    description: "Basic tax concepts and strategies to legally minimize your tax burden.",
    thumbnail: "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3",
    duration: "16:40",
    category: "Taxes",
    level: "Beginner",
    watched: false,
    progress: 0,
    premium: false
  },
  {
    id: 8,
    title: "Debt Management Strategies",
    description: "Effective approaches to paying down debt and avoiding future debt problems.",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3",
    duration: "19:15",
    category: "Debt",
    level: "Beginner",
    watched: false,
    progress: 0,
    premium: false
  }
];

// Categories
const categories = [
  "All",
  "Investing",
  "Budgeting",
  "Credit",
  "Retirement",
  "Taxes",
  "Debt"
];

// Experience levels
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortOption, setSortOption] = useState("newest");
  
  // Filter videos based on search, category, and level
  const filteredVideos = videoData.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || video.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  // Sort videos based on the selected option
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortOption === "newest") return b.id - a.id;
    if (sortOption === "oldest") return a.id - b.id;
    if (sortOption === "duration-asc") return parseInt(a.duration) - parseInt(b.duration);
    if (sortOption === "duration-desc") return parseInt(b.duration) - parseInt(a.duration);
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-finwise-gray-light">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-finwise-blue to-finwise-blue-light text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Financial Education Video Library</h1>
            <p className="text-xl mb-6">Expand your financial knowledge with expert-created videos</p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="search"
                placeholder="Search for videos..."
                className="pl-10 bg-white/10 border-white/20 placeholder:text-white/60 text-white focus-visible:ring-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              <Filter size={20} className="mr-2 text-finwise-blue" />
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
            
            <div className="flex gap-4 w-full md:w-auto">
              <Select onValueChange={setSelectedLevel} defaultValue={selectedLevel}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select onValueChange={setSortOption} defaultValue={sortOption}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="duration-asc">Shortest First</SelectItem>
                  <SelectItem value="duration-desc">Longest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Video Tabs */}
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {sortedVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No videos match your current filters. Try adjusting your search.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="in-progress" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedVideos.filter(video => video.progress > 0 && video.progress < 100).map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedVideos.filter(video => video.progress === 100).map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="bookmarked" className="mt-0">
              <div className="text-center py-12">
                <p className="text-gray-500">You haven't bookmarked any videos yet.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Video Card Component
const VideoCard = ({ video }: { video: any }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Button variant="default" className="bg-finwise-green hover:bg-finwise-green-dark">
            <Play size={20} className="mr-2" /> Watch Now
          </Button>
        </div>
        
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          <Clock size={12} className="inline mr-1" /> {video.duration}
        </div>
        
        {/* Premium Badge */}
        {video.premium && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-finwise-blue">Premium</Badge>
          </div>
        )}
        
        {/* Progress Bar */}
        {video.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0">
            <Progress value={video.progress} className="h-1 rounded-none" />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold truncate">{video.title}</h3>
          {video.watched && (
            <CheckCircle2 size={16} className="text-finwise-green flex-shrink-0 ml-1" />
          )}
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{video.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <Badge variant="outline" className="bg-finwise-gray-light/50">
            {video.category}
          </Badge>
          <Badge variant="outline" className="bg-finwise-gray-light/50">
            {video.level}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Videos;
