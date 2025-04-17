
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-finwise-blue via-finwise-blue-light to-finwise-green py-20 text-white overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -right-10 -top-10 bg-white rounded-full w-40 h-40"></div>
        <div className="absolute left-1/4 bottom-10 bg-white rounded-full w-60 h-60"></div>
        <div className="absolute right-1/3 top-1/3 bg-white rounded-full w-20 h-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Master Your Finances with Intelligent Guidance
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Join FinWise Hub to access personalized financial advice, educational content, 
            and interactive tools designed to help you achieve financial security and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/pricing">
              <Button className="bg-white text-finwise-blue hover:bg-white/90 font-semibold px-8 py-6 text-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/chatbot">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg">
                Try FinWise Assistant <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
          
          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-2">
                <span className="text-finwise-blue font-bold">10k+</span>
              </div>
              <span>Active Users</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-2">
                <span className="text-finwise-blue font-bold">50+</span>
              </div>
              <span>Educational Videos</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-2">
                <span className="text-finwise-blue font-bold">24/7</span>
              </div>
              <span>AI Assistant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
