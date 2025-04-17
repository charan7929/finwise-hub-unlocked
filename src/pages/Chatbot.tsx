
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bot, Send, ThumbsUp, ThumbsDown, Clock, HelpCircle, 
         DollarSign, PiggyBank, CreditCard, TrendingUp, Bookmark, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [conversation, setConversation] = useState<{ sender: string; text: string; time: string }[]>([
    { 
      sender: "bot", 
      text: "Hi there! I'm your FinWise AI assistant. How can I help with your financial questions today?", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);

  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Categories for financial questions
  const categories = [
    { name: "Budgeting", icon: <PiggyBank size={18} /> },
    { name: "Investing", icon: <TrendingUp size={18} /> },
    { name: "Credit", icon: <CreditCard size={18} /> },
    { name: "Taxes", icon: <DollarSign size={18} /> },
    { name: "Retirement", icon: <Clock size={18} /> },
    { name: "Market Data", icon: <BarChart size={18} /> },
  ];

  // Suggested questions
  const suggestedQuestions = [
    "How should I start building an emergency fund?",
    "What's the difference between stocks and bonds?",
    "How can I improve my credit score?",
    "What's the 50/30/20 budgeting rule?"
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to conversation
    const newConversation = [
      ...conversation, 
      { 
        sender: "user", 
        text: message, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    
    setConversation(newConversation);
    setMessage("");
    
    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      setConversation(prev => [
        ...prev, 
        { 
          sender: "bot", 
          text: "Thanks for your question about financial planning. As a free user, you have a limited number of questions per day. For comprehensive answers and unlimited assistance, consider upgrading to our Pro or Elite plan.", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      
      toast({
        title: "Question Limit",
        description: "You have 2 questions remaining today. Upgrade for unlimited assistance!",
        variant: "default",
      });
    }, 1500);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    
    // Simulate a query based on the selected category
    setConversation(prev => [
      ...prev, 
      { 
        sender: "user", 
        text: `I want to learn about ${category}`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    
    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      setConversation(prev => [
        ...prev, 
        { 
          sender: "bot", 
          text: `Here's some information about ${category}. What specific aspect would you like to know more about?`, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const askSuggestedQuestion = (question: string) => {
    setConversation(prev => [
      ...prev, 
      { 
        sender: "user", 
        text: question, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    
    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      setConversation(prev => [
        ...prev, 
        { 
          sender: "bot", 
          text: "I'd be happy to explain that! Here's a detailed answer... (This would be a longer, detailed response in the actual application)", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-finwise-gray-light">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar - Categories & Usage */}
            {!isMobile && (
              <div className="w-full md:w-64 space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Button
                          key={category.name}
                          variant={selectedCategory === category.name ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => selectCategory(category.name)}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">Usage Stats</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Daily Questions</span>
                          <span>3/5</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <Button variant="outline" className="w-full text-finwise-blue border-finwise-blue">
                        Upgrade for Unlimited
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Chat Interface */}
            <div className="flex-grow flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-[80vh]">
              {/* Chat Header */}
              <div className="bg-finwise-blue text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Bot className="mr-2" size={20} />
                  <h2 className="font-semibold">FinWise AI Assistant</h2>
                </div>
                <Badge variant="outline" className="border-white text-white">
                  Free Plan
                </Badge>
              </div>
              
              {/* Categories (Mobile Only) */}
              {isMobile && (
                <div className="p-2 bg-finwise-gray overflow-x-auto whitespace-nowrap">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      className="mr-2 mb-2"
                      size="sm"
                      onClick={() => selectCategory(category.name)}
                    >
                      <span className="mr-1">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
              )}
              
              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {conversation.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[75%]">
                      {msg.sender === "bot" && (
                        <div className="flex items-center mb-1">
                          <div className="w-6 h-6 rounded-full bg-finwise-green-light flex items-center justify-center mr-1">
                            <Bot size={12} className="text-white" />
                          </div>
                          <span className="text-xs font-medium text-finwise-blue">FinWise Assistant</span>
                        </div>
                      )}
                      
                      <div 
                        className={`p-3 rounded-lg ${
                          msg.sender === "user" 
                            ? "bg-finwise-blue text-white rounded-tr-none" 
                            : "bg-finwise-gray text-gray-800 rounded-tl-none"
                        }`}
                      >
                        {msg.text}
                        <div className="text-xs opacity-70 mt-1 text-right">
                          {msg.time}
                        </div>
                      </div>
                      
                      {msg.sender === "bot" && (
                        <div className="flex items-center mt-1 justify-end space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <ThumbsUp size={14} />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <ThumbsDown size={14} />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Bookmark size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Suggested Questions */}
              <div className="p-3 bg-finwise-gray-light border-t">
                <p className="text-xs text-gray-500 mb-2">Suggested Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="text-xs py-1 h-auto bg-white" 
                      onClick={() => askSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask your financial question..."
                  className="flex-grow"
                />
                <Button type="submit" className="bg-finwise-green hover:bg-finwise-green-dark">
                  <Send size={18} />
                </Button>
              </form>
            </div>
            
            {/* Help Panel (Desktop Only) */}
            {!isMobile && (
              <div className="w-64 space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-4">
                      <HelpCircle size={18} className="mr-2 text-finwise-blue" />
                      <h3 className="font-semibold">Help</h3>
                    </div>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p>
                        <strong>Ask</strong> financial questions in natural language
                      </p>
                      <p>
                        <strong>Browse</strong> categories for specific topics
                      </p>
                      <p>
                        <strong>Save</strong> useful answers for future reference
                      </p>
                      <Separator className="my-3" />
                      <p className="text-finwise-blue">
                        Upgrade to Pro for unlimited questions and advanced features
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chatbot;
