
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, HelpCircle, X, MessageSquare, Video, Gamepad2, BookOpen, 
         Clock, Award, Headphones, Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
  // Pricing plans configuration
  const plans = [
    {
      name: "Free",
      description: "Basic access to essential financial education tools.",
      price: {
        monthly: 0,
        annually: 0
      },
      features: [
        { name: "Chatbot Questions", value: "5 per day", included: true },
        { name: "Video Library Access", value: "Basic videos only", included: true },
        { name: "Daily Games & Quizzes", value: "Limited selection", included: true },
        { name: "Progress Tracking", value: "Basic stats", included: true },
        { name: "Personalized Recommendations", value: "", included: false },
        { name: "Premium Videos", value: "", included: false },
        { name: "Advanced Simulations", value: "", included: false },
        { name: "Priority Support", value: "", included: false },
        { name: "Downloadable Resources", value: "", included: false },
        { name: "Ad-Free Experience", value: "", included: false },
      ],
      highlight: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      description: "Enhanced learning experience with more features.",
      price: {
        monthly: 9.99,
        annually: 99.99
      },
      features: [
        { name: "Chatbot Questions", value: "Unlimited", included: true },
        { name: "Video Library Access", value: "Full library", included: true },
        { name: "Daily Games & Quizzes", value: "Full access", included: true },
        { name: "Progress Tracking", value: "Detailed analytics", included: true },
        { name: "Personalized Recommendations", value: "AI-powered", included: true },
        { name: "Premium Videos", value: "Access included", included: true },
        { name: "Advanced Simulations", value: "Included", included: true },
        { name: "Priority Support", value: "Email support", included: true },
        { name: "Downloadable Resources", value: "", included: false },
        { name: "Ad-Free Experience", value: "Included", included: true },
      ],
      highlight: true,
      buttonText: "Start Pro Trial",
      buttonVariant: "default" as const
    },
    {
      name: "Elite",
      description: "Complete financial education suite with exclusive benefits.",
      price: {
        monthly: 19.99,
        annually: 199.99
      },
      features: [
        { name: "Chatbot Questions", value: "Unlimited + priority", included: true },
        { name: "Video Library Access", value: "Full library + early access", included: true },
        { name: "Daily Games & Quizzes", value: "All games + exclusive content", included: true },
        { name: "Progress Tracking", value: "Advanced analytics & insights", included: true },
        { name: "Personalized Recommendations", value: "Enhanced AI insights", included: true },
        { name: "Premium Videos", value: "All premium + workshops", included: true },
        { name: "Advanced Simulations", value: "All advanced features", included: true },
        { name: "Priority Support", value: "24/7 dedicated support", included: true },
        { name: "Downloadable Resources", value: "All templates & guides", included: true },
        { name: "Ad-Free Experience", value: "Included", included: true },
      ],
      highlight: false,
      buttonText: "Get Elite Access",
      buttonVariant: "default" as const
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes to your subscription will take effect at the start of your next billing cycle."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes, both Pro and Elite plans come with a 7-day free trial. You won't be charged until the trial period ends, and you can cancel anytime before that."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. After cancellation, you'll continue to have access until the end of your current billing period."
    },
    {
      question: "Are there any student discounts?",
      answer: "Yes, we offer a 30% discount for verified students. Contact our support team with your valid student ID to apply for the discount."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee for annual subscriptions. If you're not completely satisfied, contact our support team within 30 days of purchase for a full refund."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-finwise-gray-light">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-finwise-blue via-finwise-blue-light to-finwise-green text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Financial Learning Journey</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Flexible plans to fit your learning style and goals with powerful features to accelerate your financial knowledge
            </p>
          </div>
        </div>
        
        {/* Pricing Section */}
        <div className="container mx-auto px-4 py-12 -mt-8">
          <Tabs defaultValue="monthly" className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="annually">
                  Annual Billing
                  <Badge className="ml-2 bg-finwise-green text-white">Save 16%</Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="monthly" className="mt-0">
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <PricingCard 
                    key={plan.name} 
                    plan={plan} 
                    billingPeriod="monthly" 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="annually" className="mt-0">
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <PricingCard 
                    key={plan.name} 
                    plan={plan} 
                    billingPeriod="annually" 
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Feature Comparison */}
        <div className="container mx-auto px-4 py-12 bg-white rounded-lg shadow-sm max-w-4xl my-12">
          <h2 className="text-2xl font-bold text-center mb-8">Detailed Plan Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Free</th>
                  <th className="text-center py-4 px-4 bg-finwise-green-light/10 border-x border-finwise-green-light/20">Pro</th>
                  <th className="text-center py-4 px-4">Elite</th>
                </tr>
              </thead>
              <tbody>
                <FeatureRow 
                  icon={<MessageSquare size={18} />}
                  feature="AI Chatbot" 
                  free="5 questions per day" 
                  pro="Unlimited questions" 
                  elite="Unlimited with priority responses" 
                />
                <FeatureRow 
                  icon={<Video size={18} />}
                  feature="Video Library" 
                  free="Basic videos only" 
                  pro="Full library access" 
                  elite="Full library + early access" 
                />
                <FeatureRow 
                  icon={<Gamepad2 size={18} />}
                  feature="Learning Games" 
                  free="Basic games only" 
                  pro="All standard games" 
                  elite="All games + exclusive content" 
                />
                <FeatureRow 
                  icon={<BookOpen size={18} />}
                  feature="Learning Modules" 
                  free="Limited access" 
                  pro="Full access" 
                  elite="Full access + advanced modules" 
                />
                <FeatureRow 
                  icon={<Award size={18} />}
                  feature="Certifications" 
                  free="Not included" 
                  pro="Basic certifications" 
                  elite="All certifications" 
                  freeMissing
                />
                <FeatureRow 
                  icon={<Clock size={18} />}
                  feature="Progress Tracking" 
                  free="Basic stats" 
                  pro="Detailed analytics" 
                  elite="Advanced insights & reports" 
                />
                <FeatureRow 
                  icon={<Headphones size={18} />}
                  feature="Support" 
                  free="Community forums" 
                  pro="Email support" 
                  elite="Priority 24/7 support" 
                />
                <FeatureRow 
                  icon={<Download size={18} />}
                  feature="Downloadable Resources" 
                  free="Not included" 
                  pro="Limited resources" 
                  elite="All templates & guides" 
                  freeMissing
                  proMissing
                />
                <FeatureRow 
                  icon={<Shield size={18} />}
                  feature="Ad-Free Experience" 
                  free="Ads included" 
                  pro="No ads" 
                  elite="No ads" 
                  freeMissing
                />
              </tbody>
            </table>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg flex items-start">
                    <HelpCircle size={20} className="mr-2 text-finwise-blue flex-shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-finwise-blue-light/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to start your financial education journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who are improving their financial knowledge with FinWise Hub.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-finwise-blue hover:bg-finwise-blue-dark">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ 
  plan, 
  billingPeriod 
}: { 
  plan: any; 
  billingPeriod: "monthly" | "annually" 
}) => {
  return (
    <Card className={`flex flex-col h-full overflow-hidden ${
      plan.highlight 
        ? "border-finwise-green shadow-lg shadow-finwise-green/10 relative" 
        : ""
    }`}>
      {plan.highlight && (
        <div className="absolute top-0 inset-x-0 h-2 bg-finwise-green rounded-t-lg" />
      )}
      
      <CardHeader className={`${plan.highlight ? "pt-8" : ""}`}>
        {plan.highlight && (
          <Badge className="w-fit mb-2 bg-finwise-green text-white">Most Popular</Badge>
        )}
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="mb-6">
          <p className="text-3xl font-bold">
            ${plan.price[billingPeriod]}
            {plan.price[billingPeriod] > 0 && (
              <span className="text-sm font-normal text-gray-500 ml-1">
                /{billingPeriod === "monthly" ? "mo" : "yr"}
              </span>
            )}
          </p>
          {plan.price[billingPeriod] === 0 && (
            <p className="text-sm text-gray-500">Forever free</p>
          )}
        </div>
        
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0 text-finwise-green" />
              ) : (
                <X className="mr-2 h-5 w-5 flex-shrink-0 text-gray-300" />
              )}
              <div>
                <span className={feature.included ? "" : "text-gray-400"}>
                  {feature.name}
                </span>
                {feature.value && feature.included && (
                  <span className="block text-xs text-gray-500">
                    {feature.value}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full ${
            plan.buttonVariant === "default" && plan.name === "Pro" 
              ? "bg-finwise-green hover:bg-finwise-green-dark" 
              : plan.buttonVariant === "default" && plan.name === "Elite"
              ? "bg-finwise-blue hover:bg-finwise-blue-dark"
              : ""
          }`} 
          variant={plan.buttonVariant}
        >
          {plan.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Feature Row Component
const FeatureRow = ({ 
  feature, 
  icon,
  free, 
  pro, 
  elite,
  freeMissing,
  proMissing
}: { 
  feature: string;
  icon: React.ReactNode;
  free: string;
  pro: string;
  elite: string;
  freeMissing?: boolean;
  proMissing?: boolean;
}) => {
  return (
    <tr className="border-b hover:bg-finwise-gray-light/30">
      <td className="py-4 px-4">
        <div className="flex items-center">
          <div className="mr-2 text-finwise-blue">{icon}</div>
          <span className="font-medium">{feature}</span>
        </div>
      </td>
      <td className="text-center py-4 px-4">
        {freeMissing ? (
          <X className="mx-auto h-5 w-5 text-gray-300" />
        ) : (
          <span className="text-sm">{free}</span>
        )}
      </td>
      <td className="text-center py-4 px-4 bg-finwise-green-light/10 border-x border-finwise-green-light/20">
        {proMissing ? (
          <X className="mx-auto h-5 w-5 text-gray-300" />
        ) : (
          <span className="text-sm font-medium">{pro}</span>
        )}
      </td>
      <td className="text-center py-4 px-4">
        <span className="text-sm font-medium">{elite}</span>
      </td>
    </tr>
  );
};

export default Pricing;
