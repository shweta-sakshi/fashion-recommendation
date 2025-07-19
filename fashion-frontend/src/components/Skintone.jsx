import React, { useRef, useState, useEffect } from 'react';

const FaceAnalysisStudio = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading face detection models...');
    const [analysisResults, setAnalysisResults] = useState({
        skinTone: {
            hex: '--',
            undertone: '--',
            brightness: '--'
        }
    });

    useEffect(() => {
        // Simulate model loading
        const timer = setTimeout(() => {
            setModelsLoaded(true);
            setLoadingMessage('Models loaded successfully!');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraActive(true);
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setCameraActive(false);
        }
    };

    const analyzeFace = () => {
        // Simulate face analysis with random results
        const colors = ['#F5DEB3', '#D2B48C', '#DEB887', '#CD853F', '#A0522D', '#8B4513'];
        const undertones = ['Warm', 'Cool', 'Neutral'];
        const brightness = ['Light', 'Medium', 'Dark'];

        setAnalysisResults({
            skinTone: {
                hex: colors[Math.floor(Math.random() * colors.length)],
                undertone: undertones[Math.floor(Math.random() * undertones.length)],
                brightness: brightness[Math.floor(Math.random() * brightness.length)]
            }
        });
    };

    return (
        <div className="min-w-200 w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto bg-gray-800 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-slate-700 text-white p-4 sm:p-6 md:p-8 text-center border-b border-gray-600">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-gray-100">🎭 Face Analysis </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">Advanced face detection and skin tone analysis powered by AI</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
                    {/* Camera Section */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gray-700 border border-gray-600">
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-auto block"
                            />
                            <canvas
                                ref={canvasRef}
                                className="absolute top-0 left-0"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3">
                            <button
                                onClick={startCamera}
                                disabled={cameraActive}
                                className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:from-indigo-500 hover:to-purple-600 text-sm sm:text-base"
                            >
                                📹 Start Camera
                            </button>
                            <button
                                onClick={analyzeFace}
                                disabled={!cameraActive || !modelsLoaded}
                                className="bg-gradient-to-r from-green-600 to-teal-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:from-green-500 hover:to-teal-600 text-sm sm:text-base"
                            >
                                🔍 Analyze Face
                            </button>
                            <button
                                onClick={stopCamera}
                                disabled={!cameraActive}
                                className="bg-gradient-to-r from-red-600 to-pink-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:from-red-500 hover:to-pink-600 text-sm sm:text-base"
                            >
                                ⏹️ Stop Camera
                            </button>
                        </div>
                    </div>

                    {/* Analysis Section */}
                    <div className="bg-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-600">
                        {!modelsLoaded ? (
                            <div className="text-center p-4 sm:p-8">
                                <div className="text-gray-300 text-base sm:text-lg">{loadingMessage}</div>
                                {loadingMessage.includes('Loading') && (
                                    <div className="mt-4">
                                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-indigo-500 mx-auto"></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4 sm:space-y-6">
                                {/* Skin Tone Analysis Card */}
                                <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-600">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-3 sm:mb-4">🎨 Skin Tone Analysis</h3>
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-600 gap-2 sm:gap-0">
                                            <span className="font-semibold text-gray-300 text-sm sm:text-base">Dominant Color</span>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div
                                                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-gray-600 shadow-lg flex-shrink-0"
                                                    style={{ backgroundColor: analysisResults.skinTone.hex }}
                                                ></div>
                                                <span className="font-bold text-gray-100 text-sm sm:text-base">{analysisResults.skinTone.hex}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-600 gap-2 sm:gap-0">
                                            <span className="font-semibold text-gray-300 text-sm sm:text-base">Undertone</span>
                                            <span className="font-bold text-gray-100 text-sm sm:text-base">{analysisResults.skinTone.undertone}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-2 sm:gap-0">
                                            <span className="font-semibold text-gray-300 text-sm sm:text-base">Brightness</span>
                                            <span className="font-bold text-gray-100 text-sm sm:text-base">{analysisResults.skinTone.brightness}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaceAnalysisStudio;