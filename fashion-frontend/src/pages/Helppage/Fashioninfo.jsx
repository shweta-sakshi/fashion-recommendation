import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Sparkles,
  Brain,
  Shield,
  Users,
  Zap,
  Heart,
  Star,
  Clock,
  Smartphone,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function Fashioninfo() {
  const [activeTab, setActiveTab] = useState('about');

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Styling",
      description: "Advanced machine learning algorithms analyze your preferences and body type"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Trend Analysis",
      description: "Stay ahead with real-time fashion trend insights and seasonal recommendations"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personal Style Profile",
      description: "Detailed style analysis based on your lifestyle, preferences, and occasions"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-First Experience",
      description: "Seamless styling recommendations wherever you go"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Style Assessment",
      description: "Complete our comprehensive style quiz to understand your preferences, body type, and lifestyle needs."
    },
    {
      step: "2",
      title: "AI Analysis",
      description: "Our advanced AI processes your data along with current fashion trends to create your unique style profile."
    },
    {
      step: "3",
      title: "Personalized Recommendations",
      description: "Receive curated outfit suggestions, shopping recommendations, and styling tips tailored just for you."
    },
    {
      step: "4",
      title: "Continuous Learning",
      description: "The more you use our platform, the better our recommendations become through machine learning."
    }
  ];

  const faqs = [
    {
      question: "How accurate are the AI recommendations?",
      answer: "Our AI has been trained on millions of fashion combinations and user preferences, achieving 94% satisfaction rate. The system continuously learns from user feedback to improve accuracy."
    },
    {
      question: "Is my personal data secure?",
      answer: "Yes, we use enterprise-grade encryption and follow strict privacy protocols. Your data is never shared with third parties without explicit consent."
    },
    {
      question: "Can I use this for different occasions?",
      answer: "Absolutely! Our AI can recommend outfits for work, casual outings, special events, seasonal changes, and more based on your specified needs."
    },
    {
      question: "How often are recommendations updated?",
      answer: "New recommendations are generated daily based on weather, trends, and your evolving style preferences. You can also request instant recommendations anytime."
    },
    {
      question: "Do you work with specific brands?",
      answer: "We partner with over 500 fashion brands and retailers to provide diverse options across all price ranges, from budget-friendly to luxury."
    }
  ];

  // Create the background pattern using inline styles instead of Tailwind arbitrary values
  const backgroundPattern = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    opacity: 0.2
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20 py-20">
          <div className="absolute inset-0" style={backgroundPattern}></div>
          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-purple-400 mr-4" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                StyleAI
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI-powered fashion recommendations that understand your unique style,
              lifestyle, and preferences to deliver personalized styling solutions.
            </p>
            <div className="flex items-center justify-center mt-8 space-x-6">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                <Star className="w-4 h-4 mr-1" />
                4.9/5 Rating
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                <Users className="w-4 h-4 mr-1" />
                100K+ Users
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <TabsTrigger value="about" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
                About
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
                Features
              </TabsTrigger>
              <TabsTrigger value="how-it-works" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
                How It Works
              </TabsTrigger>
              <TabsTrigger value="faq" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
                FAQ
              </TabsTrigger>
            </TabsList>

            {/* About Section */}
            <TabsContent value="about" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-purple-300 flex items-center">
                      <Sparkles className="w-6 h-6 mr-2" />
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-4">
                    <p>
                      We believe everyone deserves to look and feel their best. Our AI-powered platform
                      democratizes personal styling by making expert fashion advice accessible to everyone,
                      regardless of budget or location.
                    </p>
                    <p>
                      Founded in 2024, StyleAI combines cutting-edge artificial intelligence with deep
                      fashion expertise to create personalized styling solutions that evolve with your
                      changing needs and preferences.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-300 flex items-center">
                      <Brain className="w-6 h-6 mr-2" />
                      Our Technology
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-4">
                    <p>
                      Our proprietary AI engine analyzes millions of fashion combinations, user preferences,
                      body types, and current trends to generate highly personalized recommendations.
                    </p>
                    <p>
                      Using advanced machine learning algorithms, we continuously improve our suggestions
                      based on user feedback, seasonal changes, and emerging fashion trends.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Separator className="my-12 bg-gray-700" />

              <div className="text-center">
                <h3 className="text-3xl font-bold mb-8 text-gray-100">Why Choose StyleAI?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <CheckCircle className="w-8 h-8 text-green-400" />,
                      title: "Personalized",
                      description: "Every recommendation is tailored to your unique style and preferences"
                    },
                    {
                      icon: <Zap className="w-8 h-8 text-yellow-400" />,
                      title: "Instant",
                      description: "Get outfit recommendations in seconds, not hours"
                    },
                    {
                      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
                      title: "Trendy",
                      description: "Stay current with the latest fashion trends and seasonal styles"
                    }
                  ].map((item, index) => (
                    <Card key={index} className="bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-colors">
                      <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-4">{item.icon}</div>
                        <h4 className="text-xl font-semibold mb-2 text-gray-100">{item.title}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Features Section */}
            <TabsContent value="features" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <div className="p-2 bg-purple-500/20 rounded-lg mr-3 group-hover:bg-purple-500/30 transition-colors">
                          {feature.icon}
                        </div>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator className="my-12 bg-gray-700" />

              <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-purple-300">
                    Advanced Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-purple-400" />
                        <span>Weather-based recommendations</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-purple-400" />
                        <span>Occasion-specific styling</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 mr-2 text-purple-400" />
                        <span>Brand preference learning</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                        <span>Seasonal trend integration</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-purple-400" />
                        <span>Social style inspiration</span>
                      </div>
                      <div className="flex items-center">
                        <Smartphone className="w-5 h-5 mr-2 text-purple-400" />
                        <span>Virtual wardrobe management</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* How It Works Section */}
            <TabsContent value="how-it-works" className="mt-8">
              <div className="space-y-8">
                {howItWorks.map((step, index) => (
                  <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-gray-100">{step.title}</h3>
                          <p className="text-gray-300">{step.description}</p>
                        </div>
                        {index < howItWorks.length - 1 && (
                          <ArrowRight className="w-6 h-6 text-purple-400 mt-3" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator className="my-12 bg-gray-700" />

              <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-purple-300">
                    Getting Started is Easy
                  </CardTitle>
                  <CardDescription className="text-center text-gray-300">
                    Join thousands of users who have transformed their style with AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full">
                    <Clock className="w-5 h-5 text-purple-300" />
                    <span className="text-purple-300">Setup takes less than 5 minutes</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQ Section */}
            <TabsContent value="faq" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-100">Frequently Asked Questions</h2>
                  <p className="text-gray-300">Everything you need to know about StyleAI</p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-gray-800/50 border-gray-700 rounded-lg px-6">
                      <AccordionTrigger className="text-left hover:text-purple-300 transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <Separator className="my-12 bg-gray-700" />

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8 text-center">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">Privacy & Security</h3>
                  <p className="text-gray-300 mb-4">
                    Your data is protected with enterprise-grade security. We never share your personal information
                    without explicit consent and follow strict privacy protocols.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="outline" className="border-green-400/30 text-green-300">
                      GDPR Compliant
                    </Badge>
                    <Badge variant="outline" className="border-green-400/30 text-green-300">
                      SSL Encrypted
                    </Badge>
                    <Badge variant="outline" className="border-green-400/30 text-green-300">
                      SOC 2 Certified
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="mt-20 bg-gray-900/50 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-purple-400 mr-2" />
                <h3 className="text-2xl font-bold text-purple-300">StyleAI</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Revolutionizing personal style with artificial intelligence
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-purple-300 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-purple-300 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-purple-300 transition-colors">Contact Us</a>
                <a href="#" className="hover:text-purple-300 transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}