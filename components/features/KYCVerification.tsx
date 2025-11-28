'use client';

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export const KYCVerification = () => {
    const [step, setStep] = useState<'ID_UPLOAD' | 'SELFIE' | 'PROCESSING' | 'COMPLETE'>('ID_UPLOAD');
    const [idImage, setIdImage] = useState<string | null>(null);
    const [selfieImage, setSelfieImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);

    const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const captureSelfie = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setSelfieImage(imageSrc);
        }
    }, [webcamRef]);

    const submitVerification = async () => {
        setStep('PROCESSING');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 3000));
        setStep('COMPLETE');
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Identity Verification</h2>
                <p className="text-zinc-500 text-sm mb-6">To ensure safety, we need to verify your identity.</p>

                <AnimatePresence mode="wait">
                    {step === 'ID_UPLOAD' && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-8 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors relative">
                                {idImage ? (
                                    <img src={idImage} alt="ID Preview" className="w-full h-48 object-cover rounded-lg" />
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Upload className="w-12 h-12 text-zinc-400 mb-2" />
                                        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Upload Government ID</p>
                                        <p className="text-xs text-zinc-400 mt-1">PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={handleIdUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                            <button
                                disabled={!idImage}
                                onClick={() => setStep('SELFIE')}
                                className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue
                            </button>
                        </motion.div>
                    )}

                    {step === 'SELFIE' && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[3/4]">
                                {selfieImage ? (
                                    <img src={selfieImage} alt="Selfie" className="w-full h-full object-cover" />
                                ) : (
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        className="w-full h-full object-cover"
                                        videoConstraints={{ facingMode: "user" }}
                                    />
                                )}
                            </div>

                            {selfieImage ? (
                                <div className="flex space-x-3">
                                    <button onClick={() => setSelfieImage(null)} className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl font-bold">Retake</button>
                                    <button onClick={submitVerification} className="flex-1 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold">Submit</button>
                                </div>
                            ) : (
                                <button onClick={captureSelfie} className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold flex items-center justify-center space-x-2">
                                    <Camera className="w-5 h-5" />
                                    <span>Take Selfie</span>
                                </button>
                            )}
                        </motion.div>
                    )}

                    {step === 'PROCESSING' && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-12 space-y-4"
                        >
                            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                            <p className="text-zinc-600 dark:text-zinc-300 font-medium">Verifying documents...</p>
                        </motion.div>
                    )}

                    {step === 'COMPLETE' && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-12 space-y-4"
                        >
                            <CheckCircle className="w-16 h-16 text-green-500" />
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Verification Successful</h3>
                            <p className="text-center text-zinc-500 text-sm">You are now verified to purchase and resell tickets.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
