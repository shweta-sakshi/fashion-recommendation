let video, canvas, ctx;
let stream = null;
let isAnalyzing = false;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', async () => {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Load face-api models
    await loadModels();

    // Set up event listeners
    setupEventListeners();
});

async function loadModels() {
    try {
        // Use the correct CDN path for face-api.js models
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@latest/model/';

        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
        ]).catch(async (error) => {
            console.log('Trying alternative model source...');
            // Fallback to original face-api.js models
            const FALLBACK_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights/';
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(FALLBACK_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(FALLBACK_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(FALLBACK_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(FALLBACK_URL),
                faceapi.nets.ageGenderNet.loadFromUri(FALLBACK_URL)
            ]);
        });

        document.getElementById('loadingMsg').textContent = 'AI models loaded! Ready to analyze faces.';
        setTimeout(() => {
            document.getElementById('loadingMsg').style.display = 'none';
            document.getElementById('analysisResults').style.display = 'block';
        }, 1500);
    } catch (error) {
        console.error('Model loading error:', error);
        document.getElementById('loadingMsg').innerHTML = '<div class="error">Error loading AI models. Please refresh the page and ensure you have an internet connection.</div>';
    }
}

function setupEventListeners() {
    document.getElementById('startBtn').addEventListener('click', startCamera);
    document.getElementById('stopBtn').addEventListener('click', stopCamera);
    document.getElementById('analyzeBtn').addEventListener('click', analyzeFace);
}

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });

        video.srcObject = stream;

        video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        });

        document.getElementById('startBtn').disabled = true;
        document.getElementById('analyzeBtn').disabled = false;
        document.getElementById('stopBtn').disabled = false;

    } catch (error) {
        console.error('Camera error:', error);
        alert('Camera access denied or not available. Please ensure you have granted camera permissions.');
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    video.srcObject = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById('startBtn').disabled = false;
    document.getElementById('analyzeBtn').disabled = true;
    document.getElementById('stopBtn').disabled = true;
}

async function analyzeFace() {
    if (isAnalyzing) return;
    isAnalyzing = true;

    try {
        // Detect faces with all attributes
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender();

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (detections.length > 0) {
            // Draw face detection boxes
            const resizedDetections = faceapi.resizeResults(detections, {
                width: canvas.width,
                height: canvas.height
            });

            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            // Analyze the first detected face
            const detection = detections[0];

            // Update face detection info
            document.getElementById('faceCount').textContent = detections.length;
            document.getElementById('confidence').textContent = Math.round(detection.detection.score * 100) + '%';

            // Analyze skin tone
            const skinTone = await analyzeSkinTone(detection);
            updateSkinToneUI(skinTone);

            // Update emotions
            updateEmotionsUI(detection.expressions);

            // Update age and gender
            document.getElementById('age').textContent = Math.round(detection.age) + ' years';
            document.getElementById('gender').textContent = detection.gender + ' (' + Math.round(detection.genderProbability * 100) + '%)';

        } else {
            document.getElementById('faceCount').textContent = '0';
            document.getElementById('confidence').textContent = '-';
            document.getElementById('age').textContent = '-';
            document.getElementById('gender').textContent = '-';
            document.getElementById('skinToneHex').textContent = '#000000';
            document.getElementById('undertone').textContent = '-';
            document.getElementById('brightness').textContent = '-';
            document.getElementById('skinTonePreview').style.backgroundColor = '#000000';
            document.getElementById('emotionsGrid').innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #666;">No face detected</div>';
        }

    } catch (error) {
        console.error('Analysis error:', error);
        alert('Analysis failed. Please try again.');
    }

    isAnalyzing = false;
}

async function analyzeSkinTone(detection) {
    try {
        // Get face region from video
        const box = detection.detection.box;

        // Create a temporary canvas to extract face region
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        tempCanvas.width = box.width;
        tempCanvas.height = box.height;

        // Draw the face region
        tempCtx.drawImage(video, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);

        // Get image data
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;

        // Analyze skin pixels (focus on center region of face)
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

                    // Filter out very dark or very light pixels (likely not skin)
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

        if (pixelCount === 0) return { r: 0, g: 0, b: 0, hex: '#000000', undertone: 'Unknown', brightness: 'Unknown' };

        const avgR = Math.round(totalR / pixelCount);
        const avgG = Math.round(totalG / pixelCount);
        const avgB = Math.round(totalB / pixelCount);

        // Convert to hex
        const hex = '#' + [avgR, avgG, avgB].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');

        // Determine undertone
        const undertone = determineUndertone(avgR, avgG, avgB);

        // Determine brightness
        const brightness = determineBrightness(avgR, avgG, avgB);

        return { r: avgR, g: avgG, b: avgB, hex, undertone, brightness };
    } catch (error) {
        console.error('Skin tone analysis error:', error);
        return { r: 0, g: 0, b: 0, hex: '#000000', undertone: 'Error', brightness: 'Error' };
    }
}

function determineUndertone(r, g, b) {
    // More sophisticated undertone detection
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
}

function determineBrightness(r, g, b) {
    // Calculate relative luminance using proper formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

    if (luminance < 100) return 'Dark';
    else if (luminance < 160) return 'Medium';
    else if (luminance < 200) return 'Light';
    else return 'Very Light';
}

function updateSkinToneUI(skinTone) {
    document.getElementById('skinTonePreview').style.backgroundColor = skinTone.hex;
    document.getElementById('skinToneHex').textContent = skinTone.hex;
    document.getElementById('undertone').textContent = skinTone.undertone;
    document.getElementById('brightness').textContent = skinTone.brightness;
}

function updateEmotionsUI(expressions) {
    const emotionsGrid = document.getElementById('emotionsGrid');
    emotionsGrid.innerHTML = '';

    const emotions = [
        { name: 'Happy', value: expressions.happy },
        { name: 'Sad', value: expressions.sad },
        { name: 'Angry', value: expressions.angry },
        { name: 'Fearful', value: expressions.fearful },
        { name: 'Disgusted', value: expressions.disgusted },
        { name: 'Surprised', value: expressions.surprised },
        { name: 'Neutral', value: expressions.neutral }
    ];

    emotions.forEach(emotion => {
        const emotionElement = document.createElement('div');
        emotionElement.innerHTML = `
            <div class="emotion-bar">
                <div class="emotion-fill" style="width: ${emotion.value * 100}%"></div>
                <div class="emotion-label">${emotion.name}: ${Math.round(emotion.value * 100)}%</div>
            </div>
        `;
        emotionsGrid.appendChild(emotionElement);
    });
}

// Auto-analyze when camera is running (optional - can be disabled)
setInterval(() => {
    if (stream && !isAnalyzing && !document.getElementById('analyzeBtn').disabled) {
        analyzeFace();
    }
}, 2000); // Increased interval to 2 seconds for better performance