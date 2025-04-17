
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ChatbotWidget from "@/components/home/ChatbotWidget";
import FinancialTip from "@/components/home/FinancialTip";
import NewsFeed from "@/components/home/NewsFeed";
import GameTeaser from "@/components/home/GameTeaser";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-finwise-gray-light">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Chatbot Widget */}
              <div className="md:col-span-1">
                <ChatbotWidget />
              </div>
              
              {/* News and Tips */}
              <div className="md:col-span-2 space-y-8">
                <FinancialTip />
                <NewsFeed />
              </div>
            </div>
            
            {/* Game Teaser */}
            <div className="mt-12">
              <GameTeaser />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-finwise-blue">
              Smart Tools for Financial Success
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-finwise-gray-light rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-finwise-green-light/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-finwise-green"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Financial AI Assistant</h3>
                <p className="text-gray-600 mb-4">
                  Get personalized financial advice and answers to your questions 24/7.
                </p>
                <Link to="/chatbot">
                  <Button variant="link" className="text-finwise-green">
                    Try Now <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-finwise-gray-light rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-finwise-green-light/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-finwise-green"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M18 2v8l-2-2"/><path d="M18 6l-4 4"/><path d="M8 4v4"/><path d="M12 4v4"/></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Educational Videos</h3>
                <p className="text-gray-600 mb-4">
                  Learn financial concepts through our library of expert-curated videos.
                </p>
                <Link to="/videos">
                  <Button variant="link" className="text-finwise-green">
                    Browse Library <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-finwise-gray-light rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-finwise-green-light/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-finwise-green"><path d="M13.5 17H10a3.5 3.5 0 1 1 0-7h7a3.5 3.5 0 1 0 0-7h-3.5"/></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Games</h3>
                <p className="text-gray-600 mb-4">
                  Reinforce financial literacy through fun, educational games and challenges.
                </p>
                <Link to="/games">
                  <Button variant="link" className="text-finwise-green">
                    Play & Learn <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-finwise-blue to-finwise-blue-light text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Improve Your Financial Knowledge?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who are taking control of their financial future with FinWise Hub.
            </p>
            <Link to="/pricing">
              <Button className="bg-white text-finwise-blue hover:bg-white/90 font-semibold px-8 py-6 text-lg">
                View Subscription Plans
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
