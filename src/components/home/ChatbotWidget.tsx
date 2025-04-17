
import { useState } from "react";
import { Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ChatbotWidget = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hello! I'm your FinWise assistant. Ask me a quick finance question." },
  ]);
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation([...conversation, { sender: "user", text: message }]);
    setMessage("");
    
    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      setConversation(prev => [
        ...prev, 
        { 
          sender: "bot", 
          text: "To answer in detail, let's continue this conversation in the full chatbot. Click 'Open Full Assistant' below!" 
        }
      ]);
      
      toast({
        title: "Free Question Used",
        description: "You have limited questions in the preview. Subscribe for unlimited help!",
      });
    }, 1000);
  };

  return (
    <Card className="shadow-lg border border-finwise-gray-dark overflow-hidden h-[400px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-finwise-green to-finwise-blue-light py-4">
        <CardTitle className="text-white flex items-center">
          <Bot className="mr-2" size={20} />
          FinWise Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {conversation.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-lg ${
                message.sender === "user" 
                  ? "bg-finwise-green-light text-white rounded-tr-none" 
                  : "bg-finwise-gray text-gray-800 rounded-tl-none"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a quick finance question..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send size={18} />
          </Button>
        </form>
      </CardFooter>
      
      <div className="bg-finwise-gray p-2 text-center">
        <Link to="/chatbot" className="text-finwise-blue hover:underline text-sm font-medium">
          Open Full Assistant
        </Link>
      </div>
    </Card>
  );
};

export default ChatbotWidget;
