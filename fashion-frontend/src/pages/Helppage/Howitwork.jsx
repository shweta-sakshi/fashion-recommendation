import React from 'react';
import { MessageSquare, User, Ruler, Sparkles, ArrowRight, Palette, Users, Smile } from 'lucide-react';

const Howitwork = () => {
  const steps = [
    {
      number: "01",
      title: "Describe Your Style",
      description: "Simply tell us what you're looking for - casual wear, formal attire, or any specific style preference. Our AI understands natural language.",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "from-purple-500 to-violet-600"
    },
    {
      number: "02",
      title: "Complete Your Style Profile",
      description: "Fill out our preference form with your favorite colors, styles, occasions, and fashion inspirations to get more personalized recommendations.",
      icon: <User className="w-6 h-6" />,
      color: "from-violet-500 to-purple-600"
    },
    {
      number: "03",
      title: "Add Your Measurements",
      description: "Provide your body measurements, skin tone, body shape, and face shape for perfectly tailored suggestions that complement your unique features.",
      icon: <Ruler className="w-6 h-6" />,
      color: "from-purple-600 to-indigo-600"
    },
    {
      number: "04",
      title: "Get AI-Powered Recommendations",
      description: "Receive personalized outfit suggestions that match your style, fit your body type, and complement your features perfectly.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-indigo-600 to-purple-500"
    }
  ];

  const personalizedFeatures = [
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Skin Tone Analysis",
      description: "Colors that enhance your natural beauty"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Body Shape Matching",
      description: "Silhouettes that flatter your figure"
    },
    {
      icon: <Smile className="w-5 h-5" />,
      title: "Face Shape Styling",
      description: "Necklines and styles that complement your features"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-indigo-900/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How It Works
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              From simple description to personalized fashion recommendations in just a few steps
            </p>
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300">AI-Powered Personal Styling</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-6 mb-8">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/25`}>
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${step.color}`}>
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex justify-center mb-8">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-violet-600"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Personalized Features */}
      <div className="bg-gray-800/30 border-t border-gray-700/50">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              What Makes It Personal
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our AI considers your unique features to provide recommendations that truly fit you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {personalizedFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Transform Your Style?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Get personalized fashion recommendations that match your unique style and body type
          </p>
          <button className="group inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40">
            <span>Start Your Style Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Howitwork;