import React, { useState, useRef, useEffect } from 'react';

const FaceAnalysisStudio = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading AI models... Please wait.');
    const [cameraActive, setCameraActive] = useState(false);
    const [analysisResults, setAnalysisResults] = useState({
        skinTone: { hex: '#000000', undertone: '-', brightness: '-' },
    });

    // Load face-api models
    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@latest/model/';

                await Promise.all([
                    window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    window.faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    window.faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                    window.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                    window.faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
                ]).catch(async (error) => {
                    console.log('Trying alternative model source...');
                    const FALLBACK_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights/';
                    await Promise.all([
                        window.faceapi.nets.tinyFaceDetector.loadFromUri(FALLBACK_URL),
                        window.faceapi.nets.faceLandmark68Net.loadFromUri(FALLBACK_URL),
                        window.faceapi.nets.faceRecognitionNet.loadFromUri(FALLBACK_URL),
                        window.faceapi.nets.faceExpressionNet.loadFromUri(FALLBACK_URL),
                        window.faceapi.nets.ageGenderNet.loadFromUri(FALLBACK_URL)
                    ]);
                });

                setLoadingMessage('AI models loaded! Ready to analyze faces.');
                setTimeout(() => {
                    setModelsLoaded(true);
                }, 1500);
            } catch (error) {
                console.error('Model loading error:', error);
                setLoadingMessage('Error loading AI models. Please refresh the page and ensure you have an internet connection.');
            }
        };

        // Load face-api.js script if not already loaded
        if (!window.faceapi) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js';
            script.onload = loadModels;
            document.head.appendChild(script);
        } else {
            loadModels();
        }
    }, []);

    // Auto-analyze interval
    useEffect(() => {
        const interval = setInterval(() => {
            if (stream && !isAnalyzing && cameraActive && modelsLoaded) {
                analyzeFace();
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [stream, isAnalyzing, cameraActive, modelsLoaded]);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            });

            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.addEventListener('loadedmetadata', () => {
                    if (canvasRef.current && videoRef.current) {
                        canvasRef.current.width = videoRef.current.videoWidth;
                        canvasRef.current.height = videoRef.current.videoHeight;
                    }
                });
            }
            setCameraActive(true);
        } catch (error) {
            console.error('Camera error:', error);
            alert('Camera access denied or not available. Please ensure you have granted camera permissions.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        setCameraActive(false);
    };

    const analyzeSkinTone = async (detection) => {
        try {
            const box = detection.detection.box;
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            tempCanvas.width = box.width;
            tempCanvas.height = box.height;

            tempCtx.drawImage(videoRef.current, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);

            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imageData.data;

            const centerX = Math.floor(tempCanvas.width * 0.3);
            const centerY = Math.floor(tempCanvas.height * 0.4);
            const sampleWidth = Math.floor(tempCanvas.width * 0.4);
            const sampleHeight = Math.floor(tempCanvas.height * 0.3);

            let totalR = 0, totalG = 0, totalB = 0;
            let pixelCount = 0;

            for (let y = centerY; y < centerY + sampleHeight; y++) {
                for (let x = centerX; x < centerX + sampleWidth; x++) {
                    const i = (y * tempCanvas.width + x) * 4;
                    if (i < data.length - 3) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];

                        const brightness = (r + g + b) / 3;
                        if (brightness > 50 && brightness < 240) {
                            totalR += r;
                            totalG += g;
                            totalB += b;
                            pixelCount++;
                        }
                    }
                }
            }

            if (pixelCount === 0) return { hex: '#000000', undertone: 'Unknown', brightness: 'Unknown' };

            const avgR = Math.round(totalR / pixelCount);
            const avgG = Math.round(totalG / pixelCount);
            const avgB = Math.round(totalB / pixelCount);

            const hex = '#' + [avgR, avgG, avgB].map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('');

            const undertone = determineUndertone(avgR, avgG, avgB);
            const brightness = determineBrightness(avgR, avgG, avgB);

            return { hex, undertone, brightness };
        } catch (error) {
            console.error('Skin tone analysis error:', error);
            return { hex: '#000000', undertone: 'Error', brightness: 'Error' };
        }
    };

    const determineUndertone = (r, g, b) => {
        const ratioRG = r / (g + 1);
        const ratioRB = r / (b + 1);
        const ratioGB = g / (b + 1);

        if (ratioRG > 1.1 && ratioRB > 1.1) {
            return 'Warm (Red/Yellow)';
        } else if (ratioRB < 0.9 && ratioGB < 0.9) {
            return 'Cool (Blue/Pink)';
        } else if (Math.abs(ratioRG - 1) < 0.1 && Math.abs(ratioRB - 1) < 0.1) {
            return 'Neutral';
        } else {
            return 'Mixed';
        }
    };

    const determineBrightness = (r, g, b) => {
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

        if (luminance < 100) return 'Dark';
        else if (luminance < 160) return 'Medium';
        else if (luminance < 200) return 'Light';
        else return 'Very Light';
    };

    const analyzeFace = async () => {
        if (isAnalyzing || !window.faceapi) return;
        setIsAnalyzing(true);

        try {
            const detections = await window.faceapi
                .detectAllFaces(videoRef.current, new window.faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (detections.length > 0) {
                const resizedDetections = window.faceapi.resizeResults(detections, {
                    width: canvas.width,
                    height: canvas.height
                });

                window.faceapi.draw.drawDetections(canvas, resizedDetections);
                window.faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

                const detection = detections[0];
                const skinTone = await analyzeSkinTone(detection);

                setAnalysisResults({
                    skinTone,
                });
                const tonedetails = `color code: ${analysisResults.skinTone.hex} + undertone: ${analysisResults.skinTone.undertone} + with brightness: ${analysisResults.skinTone.brightness}`
                localStorage.setItem('skintone', tonedetails)
            } else {
                setAnalysisResults({
                    skinTone: { hex: '#000000', undertone: '-', brightness: '-' },
                });
            }
        } catch (error) {
            console.error('Analysis error:', error);
            alert('Analysis failed. Please try again.');
        }

        setIsAnalyzing(false);
    };

    return (
        <div className="w-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-800 to-blue-600 text-white p-8 text-center">
                    <h1 className="text-4xl font-bold mb-3">🎭 Face Analysis </h1>
                    <p className="text-xl opacity-90">Advanced face detection and skin tone analysis powered by AI</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Camera Section */}
                    <div className="space-y-6">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
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

                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                onClick={startCamera}
                                disabled={cameraActive}
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                📹 Start Camera
                            </button>
                            <button
                                onClick={analyzeFace}
                                disabled={!cameraActive || !modelsLoaded}
                                className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                🔍 Analyze Face
                            </button>
                            <button
                                onClick={stopCamera}
                                disabled={!cameraActive}
                                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                ⏹️ Stop Camera
                            </button>
                        </div>
                    </div>

                    {/* Analysis Section */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                        {!modelsLoaded ? (
                            <div className="text-center p-8">
                                <div className="text-gray-600 text-lg">{loadingMessage}</div>
                                {loadingMessage.includes('Loading') && (
                                    <div className="mt-4">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Skin Tone Analysis Card */}
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">🎨 Skin Tone Analysis</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="font-semibold text-gray-600">Dominant Color</span>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                                                    style={{ backgroundColor: analysisResults.skinTone.hex }}
                                                ></div>
                                                <span className="font-bold text-gray-800">{analysisResults.skinTone.hex}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="font-semibold text-gray-600">Undertone</span>
                                            <span className="font-bold text-gray-800">{analysisResults.skinTone.undertone}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="font-semibold text-gray-600">Brightness</span>
                                            <span className="font-bold text-gray-800">{analysisResults.skinTone.brightness}</span>
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