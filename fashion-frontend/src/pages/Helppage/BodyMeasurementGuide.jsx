import React, { useState } from 'react';
import { Ruler, User, Users, Calculator, Info, ChevronRight, Target } from 'lucide-react';

const BodyMeasurementGuide = () => {
  const [activeTab, setActiveTab] = useState('women');
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hips: '',
    chest: '',
    shoulders: ''
  });
  const [bodyShape, setBodyShape] = useState('');

  const calculateWomenShape = () => {
    const bust = parseFloat(measurements.bust);
    const waist = parseFloat(measurements.waist);
    const hips = parseFloat(measurements.hips);

    if (!bust || !waist || !hips) return '';

    const bustHipDiff = Math.abs(bust - hips);
    const waistBustDiff = bust - waist;
    const waistHipDiff = hips - waist;

    if (bustHipDiff <= 1 && waistBustDiff < 9 && waistHipDiff < 10) {
      return 'Rectangle';
    } else if (bust - hips >= 3.6 && waistBustDiff >= 9) {
      return 'Inverted Triangle';
    } else if (hips - bust >= 3.6 && waistHipDiff >= 9) {
      return 'Pear';
    } else if (bustHipDiff <= 1 && waistBustDiff >= 9 && waistHipDiff >= 7) {
      return 'Hourglass';
    } else if (waist >= bust && waist >= hips) {
      return 'Apple';
    }
    return 'Balanced';
  };

  const calculateMenShape = () => {
    const chest = parseFloat(measurements.chest);
    const waist = parseFloat(measurements.waist);
    const shoulders = parseFloat(measurements.shoulders);

    if (!chest || !waist || !shoulders) return '';

    const shoulderWaistRatio = shoulders / waist;
    const chestWaistRatio = chest / waist;

    if (shoulderWaistRatio > 1.3 && chestWaistRatio > 1.3) {
      return 'Inverted Triangle';
    } else if (shoulderWaistRatio < 1.1 && chestWaistRatio < 1.1) {
      return 'Triangle';
    } else if (Math.abs(shoulders - waist) < 2 && Math.abs(chest - waist) < 2) {
      return 'Rectangle';
    } else if (waist > chest && waist > shoulders) {
      return 'Oval';
    }
    return 'Balanced';
  };

  const handleMeasurementChange = (key, value) => {
    const newMeasurements = { ...measurements, [key]: value };
    setMeasurements(newMeasurements);

    if (activeTab === 'women') {
      setBodyShape(calculateWomenShape());
    } else {
      setBodyShape(calculateMenShape());
    }
  };

  const womenMeasurements = [
    {
      name: 'Bust',
      key: 'bust',
      instruction: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.',
      visual: '🔴 Around fullest part of chest'
    },
    {
      name: 'Waist',
      key: 'waist',
      instruction: 'Measure around the narrowest part of your torso, usually above the navel.',
      visual: '🟡 Around narrowest part of torso'
    },
    {
      name: 'Hips',
      key: 'hips',
      instruction: 'Measure around the fullest part of your hips and buttocks.',
      visual: '🔵 Around fullest part of hips'
    }
  ];

  const menMeasurements = [
    {
      name: 'Chest',
      key: 'chest',
      instruction: 'Measure around the fullest part of your chest, under your arms.',
      visual: '🔴 Around fullest part of chest'
    },
    {
      name: 'Waist',
      key: 'waist',
      instruction: 'Measure around your natural waistline, above your hip bones.',
      visual: '🟡 Around natural waistline'
    },
    {
      name: 'Shoulders',
      key: 'shoulders',
      instruction: 'Measure across your back from shoulder point to shoulder point.',
      visual: '🔵 Across shoulder points'
    }
  ];

  const womenShapeDescriptions = {
    'Hourglass': 'Balanced bust and hips with a defined waist. Most clothing styles are flattering.',
    'Pear': 'Hips wider than bust. Emphasize your upper body and balance your proportions.',
    'Apple': 'Fuller midsection with narrower hips. Create a defined waistline and elongate your torso.',
    'Inverted Triangle': 'Broader shoulders than hips. Balance your proportions by adding volume to your lower half.',
    'Rectangle': 'Similar bust, waist, and hip measurements. Create curves and definition at the waist.',
    'Balanced': 'Well-proportioned figure with balanced measurements throughout.'
  };

  const menShapeDescriptions = {
    'Inverted Triangle': 'Broad shoulders and chest with narrow waist. Most clothing styles are flattering.',
    'Triangle': 'Narrower shoulders with fuller waist. Build up your upper body and create a stronger silhouette.',
    'Rectangle': 'Similar chest, waist, and shoulder measurements. Add structure and definition to your frame.',
    'Oval': 'Fuller midsection. Choose clothing that elongates your torso and creates a leaner appearance.',
    'Balanced': 'Well-proportioned figure with balanced measurements throughout.'
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Ruler className="text-blue-400" />
            Body Measurement Guide
          </h1>
          <p className="text-gray-400 mt-2">Learn how to measure your body and determine your shape for perfect fashion recommendations</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex bg-gray-900 rounded-lg p-1 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('women')}
            className={`flex-1 py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'women'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            <User size={18} />
            Women
          </button>
          <button
            onClick={() => setActiveTab('men')}
            className={`flex-1 py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'men'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            <Users size={18} />
            Men
          </button>
        </div>

        {/* General Instructions */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Info className="text-blue-400" />
            Before You Start
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Use a flexible measuring tape, not a rigid ruler</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Wear minimal, form-fitting clothing</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Stand straight with feet together</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Keep the tape parallel to the ground</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Don't pull the tape too tight - it should be snug but comfortable</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Have someone help you for more accurate measurements</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Measurement Instructions */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
              <Target className="text-blue-400" />
              How to Measure
            </h2>

            <div className="space-y-6">
              {(activeTab === 'women' ? womenMeasurements : menMeasurements).map((measurement) => (
                <div key={measurement.key} className="border border-gray-800 rounded-lg p-4 bg-gray-800/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">{measurement.name}</h3>
                    <span className="text-sm text-gray-400">{measurement.visual}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{measurement.instruction}</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Enter measurement"
                      value={measurements[measurement.key]}
                      onChange={(e) => handleMeasurementChange(measurement.key, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-400 text-sm">inches</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
              <Calculator className="text-blue-400" />
              Your Body Shape
            </h2>

            {bodyShape ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-white mb-2">Your Shape: {bodyShape}</h3>
                  <p className="text-blue-100">
                    {activeTab === 'women' ? womenShapeDescriptions[bodyShape] : menShapeDescriptions[bodyShape]}
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">Your Measurements:</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {(activeTab === 'women' ? womenMeasurements : menMeasurements).map((measurement) => (
                      measurements[measurement.key] && (
                        <div key={measurement.key} className="flex justify-between">
                          <span className="text-gray-400">{measurement.name}:</span>
                          <span className="text-white">{measurements[measurement.key]}"</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                <div className="bg-green-900/30 border border-green-800 rounded-lg p-4">
                  <h4 className="font-medium text-green-400 mb-2">Fashion Tips for Your Shape:</h4>
                  <p className="text-green-100 text-sm">
                    Based on your {bodyShape.toLowerCase()} shape, our AI will recommend clothing styles that enhance your best features and create a balanced, flattering silhouette.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-400 mb-2">Enter your measurements to discover your body shape</p>
                <p className="text-gray-500 text-sm">We'll analyze your proportions and provide personalized fashion recommendations</p>
              </div>
            )}
          </div>
        </div>

        {/* Shape Guide */}
        <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-6 text-white">
            {activeTab === 'women' ? 'Women\'s' : 'Men\'s'} Body Shape Guide
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(activeTab === 'women' ? womenShapeDescriptions : menShapeDescriptions).map(([shape, description]) => (
              <div key={shape} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="font-medium text-white mb-2">{shape}</h3>
                <p className="text-gray-300 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready for Personalized Recommendations?</h2>
          <p className="text-blue-100 mb-4">Get fashion suggestions tailored to your body shape and style preferences</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
            Get My Recommendations
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyMeasurementGuide;