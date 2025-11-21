import React, { useState } from "react";
import { withSlide } from "../../HOC/withSlide";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Check, Crop, Zap, FileDigit, Grid } from "lucide-react";

import { processImage } from "../../assets";
type AttackMode = 'none' | 'blur' | 'crop' | 'noise' | 'jpeg';

const Slide3: React.FC = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [attackMode, setAttackMode] = useState<AttackMode>('none');

    const startAnimation = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 4000); // Reset after animation
    };

    const getAttackStyle = () => {
        switch (attackMode) {
            case 'blur': return 'blur-sm';
            case 'crop': return 'scale-125';
            case 'jpeg': return 'contrast-125 saturate-50';
            default: return '';
        }
    };

    const getBadgeInfo = () => {
        switch (attackMode) {
            case 'none': return { text: 'No Attack', color: 'bg-green-500' };
            case 'blur': return { text: 'Blur (Gaussian)', color: 'bg-orange-500' };
            case 'crop': return { text: 'Crop (50%)', color: 'bg-red-500' };
            case 'noise': return { text: 'Noise (Salt&Pepper)', color: 'bg-purple-500' };
            case 'jpeg': return { text: 'JPEG (Q=50)', color: 'bg-yellow-500' };
        }
    };

    const badge = getBadgeInfo();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-7xl w-full px-8 flex flex-col h-[85%]">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="font-grotesk text-4xl font-bold mb-2 text-left text-black dark:text-white">
                        Deep Watermarking Pipeline
                    </h2>
                    <div className="w-20 h-1 bg-blue-700 dark:bg-blue-500" />
                </div>

                {/* Diagram Container */}
                <div className="flex-1 flex items-center justify-between gap-4 relative">

                    {/* 1. Inputs */}
                    <div className="flex flex-col gap-4 w-48">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-zinc-800 flex flex-col items-center text-center">
                            <span className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">Cover Image</span>
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                                <img src={processImage} alt="Cover" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-zinc-800 flex flex-col items-center text-center">
                            <span className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">Secret Message</span>
                            <div className="flex gap-1 text-xs font-mono text-blue-600 dark:text-blue-400">
                                {[0, 1, 1, 0, 1].map((bit, i) => (
                                    <span key={i} className="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">{bit}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="text-gray-300 dark:text-gray-600" size={32} />

                    {/* 2. Encoder */}
                    <div className="w-56 p-6 border-2 border-blue-600 dark:border-blue-500 rounded-xl bg-white dark:bg-zinc-900 flex flex-col items-center text-center shadow-lg relative z-10">
                        <h3 className="font-bold text-lg mb-4">Encoder</h3>
                        <div className="grid grid-cols-3 gap-2 mb-4 opacity-50">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-3 h-3 bg-blue-500 rounded-full" />
                            ))}
                        </div>
                        <p className="text-xs text-gray-500">Conv Layers + Fusion</p>

                        {/* Animation Particle */}
                        {isAnimating && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full z-20"
                                initial={{ x: -150, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            />
                        )}
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="text-gray-300 dark:text-gray-600" size={32} />

                    {/* 3. Noise Layer (Interactive) */}
                    <div className="w-56 flex flex-col items-center relative gap-4">
                        {/* Badge */}
                        <div className={`absolute -top-3 ${badge.color} text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider z-20 transition-colors duration-300`}>
                            {badge.text}
                        </div>

                        {/* Image Container */}
                        <div className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50/50 dark:bg-zinc-800/50 flex flex-col items-center text-center w-full overflow-hidden relative">
                            <span className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">Watermarked Image</span>
                            <div className="w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded flex items-center justify-center border border-blue-100 dark:border-blue-800 overflow-hidden relative">
                                <img
                                    src={processImage}
                                    alt="Watermarked"
                                    className={`w-full h-full object-cover transition-all duration-300 ${getAttackStyle()}`}
                                />
                                {/* Noise Overlay */}
                                {attackMode === 'noise' && (
                                    <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
                                )}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex gap-2 p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg">
                            <button onClick={() => setAttackMode('none')} className={`p-2 rounded hover:bg-white dark:hover:bg-zinc-700 ${attackMode === 'none' ? 'bg-white dark:bg-zinc-600 shadow-sm' : ''}`} title="No Attack"><Check size={16} /></button>
                            <button onClick={() => setAttackMode('blur')} className={`p-2 rounded hover:bg-white dark:hover:bg-zinc-700 ${attackMode === 'blur' ? 'bg-white dark:bg-zinc-600 shadow-sm' : ''}`} title="Blur"><Grid size={16} /></button>
                            <button onClick={() => setAttackMode('crop')} className={`p-2 rounded hover:bg-white dark:hover:bg-zinc-700 ${attackMode === 'crop' ? 'bg-white dark:bg-zinc-600 shadow-sm' : ''}`} title="Crop"><Crop size={16} /></button>
                            <button onClick={() => setAttackMode('noise')} className={`p-2 rounded hover:bg-white dark:hover:bg-zinc-700 ${attackMode === 'noise' ? 'bg-white dark:bg-zinc-600 shadow-sm' : ''}`} title="Noise"><Zap size={16} /></button>
                            <button onClick={() => setAttackMode('jpeg')} className={`p-2 rounded hover:bg-white dark:hover:bg-zinc-700 ${attackMode === 'jpeg' ? 'bg-white dark:bg-zinc-600 shadow-sm' : ''}`} title="JPEG"><FileDigit size={16} /></button>
                        </div>

                        {isAnimating && (
                            <motion.div
                                className="absolute top-1/2 left-0 w-4 h-4 bg-blue-500 rounded-full z-20"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 100, opacity: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                            />
                        )}
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="text-gray-300 dark:text-gray-600" size={32} />

                    {/* 4. Decoder */}
                    <div className="w-56 p-6 border-2 border-gray-800 dark:border-gray-400 rounded-xl bg-white dark:bg-zinc-900 flex flex-col items-center text-center shadow-lg relative z-10">
                        <h3 className="font-bold text-lg mb-4">Decoder</h3>
                        <Activity className="text-gray-800 dark:text-gray-200 mb-4" size={32} />
                        <p className="text-xs text-gray-500">Feature Extraction</p>
                        {isAnimating && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full z-20"
                                initial={{ x: -150, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 2, duration: 1 }}
                            />
                        )}
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="text-gray-300 dark:text-gray-600" size={32} />

                    {/* 5. Result */}
                    <div className="w-40 flex flex-col gap-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-green-50 dark:bg-green-900/20 flex flex-col items-center text-center">
                            <span className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">Extracted</span>
                            <div className="flex gap-1 text-xs font-mono text-green-600 dark:text-green-400">
                                {isAnimating ? (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 3.5 }}
                                    >
                                        0 1 1 0 1
                                    </motion.span>
                                ) : (
                                    <span>- - - - -</span>
                                )}
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="text-xs font-bold text-gray-400">BER: </span>
                            <span className="text-xs font-mono text-green-600">0.00%</span>
                        </div>
                    </div>

                </div>

                {/* Controls */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={startAnimation}
                        disabled={isAnimating}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Activity size={16} />
                        Simulate Process
                    </button>
                </div>

            </div>
        </div>
    );
};

export default withSlide(Slide3);