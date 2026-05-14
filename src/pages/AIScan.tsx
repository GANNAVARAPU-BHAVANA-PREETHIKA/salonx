import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, RefreshCw, Sparkles, ArrowLeft, History, CheckCircle2, Loader2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeFaceAndRecommend } from '../services/aiService';

export default function AIScan() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [preferences, setPreferences] = useState('');

  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const videoRef = useCallback((node: HTMLVideoElement | null) => {
    setVideoElement(node);
  }, []);

  const startCamera = async () => {
    try {
      // Clear any existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(s);
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Please allow camera access to use the scan feature.");
    }
  };

  useEffect(() => {
    if (videoElement && stream) {
      videoElement.srcObject = stream;
      videoElement.play().catch(e => console.error("Error playing video:", e));
    }
  }, [videoElement, stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  };

  const capture = useCallback(() => {
    if (videoElement && canvasRef.current) {
      const video = videoElement;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCamera();
      }
    }
  }, [videoElement, stopCamera]);

  const handleAnalyze = async () => {
    if (!capturedImage) return;
    setIsAnalyzing(true);
    const data = await analyzeFaceAndRecommend(capturedImage, preferences);
    setResult(data);
    setIsAnalyzing(false);
  };

  const reset = () => {
    setCapturedImage(null);
    setResult(null);
    setIsAnalyzing(false);
    startCamera();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-32"
    >
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-full text-on-surface-variant">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-serif">AI Hair Scan</h1>
          <p className="text-on-surface-variant text-sm">Neural geometry analysis for better looks</p>
        </div>
      </header>

      <div className="max-w-xl mx-auto space-y-8">
        {/* Camera/Image Container */}
        <div className="relative aspect-[3/4] glass rounded-[40px] overflow-hidden border-2 border-white/5 shadow-2xl">
          <AnimatePresence mode="wait">
            {!capturedImage ? (
              <motion.div 
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900"
              >
                {isCameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <button 
                    onClick={startCamera}
                    className="flex flex-col items-center gap-4 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <div className="w-20 h-20 rounded-full glass flex items-center justify-center">
                      <Camera size={32} />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-xs">Initialize Neural link</span>
                  </button>
                )}
                
                {isCameraActive && (
                  <div className="absolute bottom-10 inset-x-0 flex justify-center">
                    <button 
                      onClick={capture}
                      className="w-20 h-20 rounded-full border-4 border-primary p-1 bg-white/10 group active:scale-95 transition-transform"
                    >
                      <div className="w-full h-full rounded-full bg-primary" />
                    </button>
                  </div>
                )}

                {/* Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 grid grid-cols-3 grid-rows-3 opacity-30" />
              </motion.div>
            ) : (
              <motion.div 
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <img src={capturedImage} className="w-full h-full object-cover" alt="Captured" />
                
                {!result && !isAnalyzing && (
                  <div className="absolute top-6 right-6 flex gap-2">
                    <button 
                      onClick={reset}
                      className="p-3 glass rounded-full text-white"
                    >
                      <RefreshCw size={20} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analysis Overlay */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center z-20"
              >
                <div className="relative w-48 h-48">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-2 border-primary rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                  />
                  <div className="absolute inset-4 rounded-full border border-white/10 flex items-center justify-center">
                    <Loader2 size={40} className="text-primary animate-spin" />
                  </div>
                </div>
                <div className="mt-8 text-center space-y-2">
                  <p className="text-primary font-bold uppercase tracking-[.4em] text-xs">Analyzing Geometry</p>
                  <p className="text-on-surface-variant text-[10px]">Mapping vertex coordinates...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input/Results Section */}
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-[32px] space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles size={18} />
                  <h3 className="font-bold uppercase tracking-widest text-sm">Style Preferences</h3>
                </div>
                <textarea 
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="E.g. Professional yet edgy, low maintenance, prefers long textures..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:ring-1 focus:ring-primary focus:outline-none min-h-[100px]"
                />
              </div>
              
              <button 
                disabled={!capturedImage || isAnalyzing}
                onClick={handleAnalyze}
                className="w-full py-5 bg-primary text-background font-bold rounded-full uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(212,175,55,0.4)] disabled:opacity-20 transition-all"
              >
                Process Aesthetics
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="glass p-8 rounded-[32px] border-primary/20">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-[.3em]">Neural Analysis</span>
                    <h3 className="text-2xl font-serif mt-1">{result.faceShape} Face detected</h3>
                  </div>
                  <CheckCircle2 className="text-primary" size={24} />
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">{result.features}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-label-caps text-on-surface-variant tracking-[.3em] uppercase pl-2">Signature Recommendations</h4>
                <div className="space-y-4">
                  {result.recommendations.map((rec: any, i: number) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-bold text-lg group-hover:text-primary transition-colors">{rec.title}</h5>
                        <Sparkles size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{rec.reasoning}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <button 
                onClick={reset}
                className="w-full py-4 glass text-primary font-bold rounded-full uppercase tracking-widest text-xs"
              >
                Try Another Ritual
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  );
}
