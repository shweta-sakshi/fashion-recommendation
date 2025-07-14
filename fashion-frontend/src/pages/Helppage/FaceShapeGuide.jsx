import React, { useState } from 'react';
import { Scan, Camera, Ruler, Target, Info, ChevronRight, Eye, User } from 'lucide-react';

const FaceShapeGuide = () => {
  const [measurements, setMeasurements] = useState({
    faceLength: '',
    faceWidth: '',
    jawWidth: '',
    foreheadWidth: '',
    cheekboneWidth: ''
  });
  const [faceShape, setFaceShape] = useState('');
  const [analysisMethod, setAnalysisMethod] = useState('measurements');

  // Face shape icon component
  const FaceShapeIcon = ({ shape }) => {
    const iconProps = {
      width: "40",
      height: "50",
      viewBox: "0 0 40 50",
      fill: "none",
      stroke: "#8B5CF6",
      strokeWidth: "1.5"
    };

    const shapes = {
      'Oval': (
        <svg {...iconProps}>
          <ellipse cx="20" cy="25" rx="12" ry="18" />
        </svg>
      ),
      'Round': (
        <svg {...iconProps}>
          <circle cx="20" cy="25" r="15" />
        </svg>
      ),
      'Square': (
        <svg {...iconProps}>
          <rect x="8" y="10" width="24" height="30" rx="2" />
        </svg>
      ),
      'Rectangle': (
        <svg {...iconProps}>
          <rect x="10" y="5" width="20" height="40" rx="2" />
        </svg>
      ),
      'Heart': (
        <svg {...iconProps}>
          <path d="M8 15 L20 45 L32 15 Q32 8 20 8 Q8 8 8 15 Z" />
        </svg>
      ),
      'Triangle': (
        <svg {...iconProps}>
          <path d="M20 10 L10 40 L30 40 Z" />
        </svg>
      ),
      'Diamond': (
        <svg {...iconProps}>
          <path d="M20 5 L32 25 L20 45 L8 25 Z" />
        </svg>
      ),
      'Balanced': (
        <svg {...iconProps}>
          <ellipse cx="20" cy="25" rx="13" ry="17" />
          <circle cx="20" cy="25" r="2" fill="#8B5CF6" />
        </svg>
      )
    };

    return shapes[shape] || shapes['Balanced'];
  };

  const calculateFaceShape = () => {
    const { faceLength, faceWidth, jawWidth, foreheadWidth, cheekboneWidth } = measurements;

    if (!faceLength || !faceWidth || !jawWidth || !foreheadWidth || !cheekboneWidth) return '';

    const length = parseFloat(faceLength);
    const width = parseFloat(faceWidth);
    const jaw = parseFloat(jawWidth);
    const forehead = parseFloat(foreheadWidth);
    const cheekbones = parseFloat(cheekboneWidth);

    const lengthToWidthRatio = length / width;
    const foreheadToJawRatio = forehead / jaw;
    const cheekboneToJawRatio = cheekbones / jaw;
    const cheekboneToForeheadRatio = cheekbones / forehead;

    // Oval: Length is 1.5x width, forehead slightly wider than jaw
    if (lengthToWidthRatio >= 1.4 && lengthToWidthRatio <= 1.6 &&
      foreheadToJawRatio >= 1.0 && foreheadToJawRatio <= 1.2) {
      return 'Oval';
    }

    // Round: Length and width are similar, soft curves
    if (lengthToWidthRatio >= 0.9 && lengthToWidthRatio <= 1.2 &&
      cheekbones >= Math.max(forehead, jaw)) {
      return 'Round';
    }

    // Square: Similar length and width, strong jawline
    if (lengthToWidthRatio >= 0.9 && lengthToWidthRatio <= 1.2 &&
      Math.abs(forehead - jaw) <= 0.1 && jaw >= cheekbones * 0.95) {
      return 'Square';
    }

    // Rectangle: Longer than wide, similar forehead and jaw
    if (lengthToWidthRatio > 1.3 && Math.abs(forehead - jaw) <= 0.1) {
      return 'Rectangle';
    }

    // Heart: Wide forehead, narrow jaw
    if (forehead > cheekbones && cheekbones > jaw && foreheadToJawRatio > 1.3) {
      return 'Heart';
    }

    // Triangle: Narrow forehead, wide jaw
    if (jaw > cheekbones && cheekbones > forehead && foreheadToJawRatio < 0.8) {
      return 'Triangle';
    }

    // Diamond: Narrow forehead and jaw, wide cheekbones
    if (cheekbones > forehead && cheekbones > jaw &&
      Math.abs(forehead - jaw) <= 0.2) {
      return 'Diamond';
    }

    return 'Balanced';
  };

  const handleMeasurementChange = (key, value) => {
    const newMeasurements = { ...measurements, [key]: value };
    setMeasurements(newMeasurements);
    setFaceShape(calculateFaceShape());
  };

  const faceMeasurements = [
    {
      name: 'Face Length',
      key: 'faceLength',
      instruction: 'Measure from the center of your hairline to the tip of your chin.',
      visual: '📏 Hairline to chin (vertical)'
    },
    {
      name: 'Face Width',
      key: 'faceWidth',
      instruction: 'Measure across the widest part of your face, usually at the cheekbones.',
      visual: '↔️ Widest part of face (horizontal)'
    },
    {
      name: 'Jaw Width',
      key: 'jawWidth',
      instruction: 'Measure across your jawline at its widest point.',
      visual: '🔷 Across jawline'
    },
    {
      name: 'Forehead Width',
      key: 'foreheadWidth',
      instruction: 'Measure across your forehead at its widest point.',
      visual: '🔶 Across forehead'
    },
    {
      name: 'Cheekbone Width',
      key: 'cheekboneWidth',
      instruction: 'Measure across your cheekbones at their widest point.',
      visual: '🔸 Across cheekbones'
    }
  ];

  const faceShapeDescriptions = {
    'Oval': 'Balanced proportions with gently curved edges. Length is about 1.5x the width. Most versatile for styling.',
    'Round': 'Similar length and width with soft, curved lines. Full cheeks and a rounded chin.',
    'Square': 'Strong, angular jawline with similar forehead and jaw width. Face length and width are roughly equal.',
    'Rectangle': 'Longer than it is wide with a strong jawline. Forehead and jaw are similar in width.',
    'Heart': 'Wide forehead and cheekbones with a narrow, pointed chin. Also called inverted triangle.',
    'Triangle': 'Narrow forehead with a wide jawline. The jaw is the widest part of the face.',
    'Diamond': 'Narrow forehead and jaw with wide cheekbones. The cheekbones are the widest feature.',
    'Balanced': 'Well-proportioned features that don\'t fit into a specific category. Harmonious overall appearance.'
  };

  const visualAnalysisSteps = [
    {
      step: 1,
      title: 'Pull hair back completely',
      description: 'Ensure your entire face perimeter is visible'
    },
    {
      step: 2,
      title: 'Look straight into mirror',
      description: 'Stand about 2 feet away with neutral expression'
    },
    {
      step: 3,
      title: 'Observe face outline',
      description: 'Trace the shape with your finger on the mirror'
    },
    {
      step: 4,
      title: 'Compare proportions',
      description: 'Notice which features are widest/narrowest'
    }
  ];

  const stylingTips = {
    'Oval': {
      hair: 'Most hairstyles work well. Avoid covering your face completely.',
      glasses: 'Most frame shapes are flattering. Try square or rectangular frames.',
      makeup: 'Highlight your natural balance. Focus on enhancing your best features.'
    },
    'Round': {
      hair: 'Add height and volume on top. Avoid chin-length cuts.',
      glasses: 'Angular frames like square or rectangular shapes add definition.',
      makeup: 'Contour the sides of your face to create more definition.'
    },
    'Square': {
      hair: 'Soft, layered styles. Side-swept bangs can soften the jawline.',
      glasses: 'Round or oval frames balance the angular features.',
      makeup: 'Soften the jawline with contouring and highlight the eyes.'
    },
    'Rectangle': {
      hair: 'Add width at the sides. Avoid very long, straight styles.',
      glasses: 'Wide frames help balance the face length.',
      makeup: 'Contour to shorten the face and add width to the sides.'
    },
    'Heart': {
      hair: 'Add volume at the jawline. Chin-length bobs work well.',
      glasses: 'Bottom-heavy frames balance the wider forehead.',
      makeup: 'Highlight the jaw and soften the forehead area.'
    },
    'Triangle': {
      hair: 'Add volume at the crown. Avoid styles that widen the jaw.',
      glasses: 'Top-heavy frames balance the wider jawline.',
      makeup: 'Highlight the forehead and contour the jawline.'
    },
    'Diamond': {
      hair: 'Add width at forehead and chin. Avoid very short styles.',
      glasses: 'Frames wider than the cheekbones work best.',
      makeup: 'Highlight forehead and chin, soften the cheekbones.'
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Scan className="text-purple-400" />
            Face Shape Analysis
          </h1>
          <p className="text-gray-400 mt-2">Discover your face shape and get personalized styling recommendations</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Analysis Method Selection */}
        <div className="flex bg-gray-900 rounded-lg p-1 mb-8 max-w-lg mx-auto">
          <button
            onClick={() => setAnalysisMethod('measurements')}
            className={`flex-1 py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${analysisMethod === 'measurements'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            <Ruler size={18} />
            Measurements
          </button>
          <button
            onClick={() => setAnalysisMethod('visual')}
            className={`flex-1 py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${analysisMethod === 'visual'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            <Eye size={18} />
            Visual Guide
          </button>
        </div>

        {/* General Instructions */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Info className="text-purple-400" />
            Before You Start
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Pull your hair back completely</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Use good lighting, preferably natural</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Keep a neutral facial expression</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Look straight ahead, not up or down</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Remove glasses and jewelry</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Take photos for reference if needed</p>
              </div>
            </div>
          </div>
        </div>

        {analysisMethod === 'measurements' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Measurement Diagram */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <Camera className="text-purple-400" />
                Measurement Guide
              </h2>

              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <svg viewBox="0 0 200 240" className="w-full h-auto max-w-xs mx-auto">
                  {/* Face outline */}
                  <ellipse cx="100" cy="130" rx="60" ry="80" fill="none" stroke="#8B5CF6" strokeWidth="2" />

                  {/* Hair line */}
                  <path d="M 45 70 Q 100 50 155 70" fill="none" stroke="#6B7280" strokeWidth="1" />

                  {/* Face length line */}
                  <line x1="100" y1="70" x2="100" y2="210" stroke="#EF4444" strokeWidth="2" />
                  <text x="110" y="140" fill="#EF4444" fontSize="10" fontWeight="bold">Length</text>

                  {/* Face width line */}
                  <line x1="40" y1="120" x2="160" y2="120" stroke="#10B981" strokeWidth="2" />
                  <text x="165" y="125" fill="#10B981" fontSize="10" fontWeight="bold">Width</text>

                  {/* Forehead width */}
                  <line x1="50" y1="90" x2="150" y2="90" stroke="#F59E0B" strokeWidth="2" />
                  <text x="155" y="95" fill="#F59E0B" fontSize="10" fontWeight="bold">Forehead</text>

                  {/* Cheekbone width */}
                  <line x1="35" y1="120" x2="165" y2="120" stroke="#3B82F6" strokeWidth="2" />
                  <text x="170" y="125" fill="#3B82F6" fontSize="10" fontWeight="bold">Cheekbones</text>

                  {/* Jaw width */}
                  <line x1="55" y1="180" x2="145" y2="180" stroke="#8B5CF6" strokeWidth="2" />
                  <text x="150" y="185" fill="#8B5CF6" fontSize="10" fontWeight="bold">Jaw</text>

                  {/* Measurement points */}
                  <circle cx="100" cy="70" r="3" fill="#EF4444" />
                  <circle cx="100" cy="210" r="3" fill="#EF4444" />
                  <circle cx="40" cy="120" r="3" fill="#10B981" />
                  <circle cx="160" cy="120" r="3" fill="#10B981" />
                  <circle cx="50" cy="90" r="3" fill="#F59E0B" />
                  <circle cx="150" cy="90" r="3" fill="#F59E0B" />
                  <circle cx="35" cy="120" r="3" fill="#3B82F6" />
                  <circle cx="165" cy="120" r="3" fill="#3B82F6" />
                  <circle cx="55" cy="180" r="3" fill="#8B5CF6" />
                  <circle cx="145" cy="180" r="3" fill="#8B5CF6" />
                </svg>
              </div>

              <div className="text-center text-gray-300 text-sm">
                <p className="mb-2">Reference diagram showing measurement points</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Face Length</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Face Width</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Forehead</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Cheekbones</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Jaw Width</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Measurement Instructions */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <Target className="text-purple-400" />
                Face Measurements
              </h2>

              <div className="space-y-6">
                {faceMeasurements.map((measurement) => (
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
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="text-gray-400 text-sm">cm</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <User className="text-purple-400" />
                Your Face Shape
              </h2>

              {faceShape ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4">
                    <h3 className="text-xl font-bold text-white mb-2">Your Shape: {faceShape}</h3>
                    <p className="text-purple-100">
                      {faceShapeDescriptions[faceShape]}
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-3">Your Measurements:</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {faceMeasurements.map((measurement) => (
                        measurements[measurement.key] && (
                          <div key={measurement.key} className="flex justify-between">
                            <span className="text-gray-400">{measurement.name}:</span>
                            <span className="text-white">{measurements[measurement.key]} cm</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {stylingTips[faceShape] && (
                    <div className="bg-green-900/30 border border-green-800 rounded-lg p-4">
                      <h4 className="font-medium text-green-400 mb-3">Styling Tips:</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-green-300 font-medium">Hair:</span> <span className="text-green-100">{stylingTips[faceShape].hair}</span></div>
                        <div><span className="text-green-300 font-medium">Glasses:</span> <span className="text-green-100">{stylingTips[faceShape].glasses}</span></div>
                        <div><span className="text-green-300 font-medium">Makeup:</span> <span className="text-green-100">{stylingTips[faceShape].makeup}</span></div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Scan className="text-gray-400" size={24} />
                  </div>
                  <p className="text-gray-400 mb-2">Enter your measurements to discover your face shape</p>
                  <p className="text-gray-500 text-sm">We'll analyze your proportions and provide personalized styling tips</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Visual Analysis Instructions */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <Eye className="text-purple-400" />
                Visual Analysis Steps
              </h2>

              <div className="space-y-6">
                {visualAnalysisSteps.map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">{step.title}</h3>
                      <p className="text-gray-300 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-purple-900/20 border border-purple-800 rounded-lg">
                <h3 className="font-medium text-purple-400 mb-2">Pro Tip:</h3>
                <p className="text-purple-100 text-sm">
                  Take a front-facing photo and use the outline method - trace your face shape on your phone screen or print the photo and draw the outline with a marker.
                </p>
              </div>
            </div>

            {/* Visual Reference Diagram */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <Target className="text-purple-400" />
                Visual Reference
              </h2>

              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <svg viewBox="0 0 300 200" className="w-full h-auto">
                  {/* Mirror frame */}
                  <rect x="20" y="20" width="260" height="160" rx="10" fill="none" stroke="#6B7280" strokeWidth="2" />
                  <rect x="15" y="15" width="270" height="170" rx="15" fill="none" stroke="#4B5563" strokeWidth="3" />

                  {/* Face outline in mirror */}
                  <ellipse cx="150" cy="100" rx="45" ry="60" fill="none" stroke="#8B5CF6" strokeWidth="2" />

                  {/* Hair */}
                  <path d="M 110 55 Q 150 40 190 55" fill="none" stroke="#6B7280" strokeWidth="2" />

                  {/* Facial features */}
                  <circle cx="135" cy="85" r="2" fill="#8B5CF6" />
                  <circle cx="165" cy="85" r="2" fill="#8B5CF6" />
                  <path d="M 145 100 Q 150 105 155 100" fill="none" stroke="#8B5CF6" strokeWidth="1" />
                  <path d="M 140 115 Q 150 120 160 115" fill="none" stroke="#8B5CF6" strokeWidth="1" />

                  {/* Outline tracing */}
                  <path d="M 105 60 Q 150 40 195 60 L 195 140 Q 150 160 105 140 Z"
                    fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Text label */}
                  <text x="150" y="190" textAnchor="middle" fill="#9CA3AF" fontSize="12">
                    Trace your face outline
                  </text>
                </svg>
              </div>

              <div className="text-center text-gray-300 text-sm">
                <p className="mb-2">Stand 2 feet from mirror and trace your face outline</p>
                <div className="bg-gray-800 rounded-lg p-3 text-xs">
                  <p className="text-yellow-400 font-medium mb-1">Quick Visual Check:</p>
                  <p>• Is your face longer than it is wide?</p>
                  <p>• Where is the widest part of your face?</p>
                  <p>• How does your jaw compare to your forehead?</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Face Shape Reference Guide */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-6 text-white">Face Shape Reference</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(faceShapeDescriptions).map(([shape, description]) => (
              <div key={shape} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex flex-col items-center mb-3">
                  <div className="bg-gray-700 rounded-lg p-3 mb-2">
                    <FaceShapeIcon shape={shape} />
                  </div>
                  <h3 className="font-medium text-white">{shape}</h3>
                </div>
                <p className="text-gray-300 text-sm text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready for Style Recommendations?</h2>
          <p className="text-purple-100 mb-4">Get personalized fashion and beauty suggestions based on your face shape</p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
            Get Style Recommendations
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaceShapeGuide;