'use client';

import React, { useState, useRef } from 'react';
import { Mic, Square, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceNoteRecorderProps {
    onSend: (audioBlob: Blob, duration: number) => void;
    onCancel: () => void;
}

export const VoiceNoteRecorder: React.FC<VoiceNoteRecorderProps> = ({ onSend, onCancel }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [duration, setDuration] = useState(0);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);

            // Start timer
            timerRef.current = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Unable to access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const handleSend = () => {
        if (audioBlob) {
            onSend(audioBlob, duration);
            reset();
        }
    };

    const handleCancel = () => {
        if (isRecording) {
            stopRecording();
        }
        reset();
        onCancel();
    };

    const reset = () => {
        setDuration(0);
        setAudioBlob(null);
        chunksRef.current = [];
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    React.useEffect(() => {
        startRecording();
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800"
            >
                {/* Recording Indicator */}
                <div className="flex items-center space-x-2">
                    {isRecording ? (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-3 h-3 bg-red-500 rounded-full"
                        />
                    ) : (
                        <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    )}
                    <span className="text-sm font-mono text-red-600 dark:text-red-400">
                        {formatDuration(duration)}
                    </span>
                </div>

                {/* Waveform Animation */}
                <div className="flex-1 flex items-center justify-center space-x-1">
                    {isRecording && (
                        <>
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: [4, Math.random() * 24 + 4, 4],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.5,
                                        delay: i * 0.05,
                                    }}
                                    className="w-1 bg-red-500 rounded-full"
                                />
                            ))}
                        </>
                    )}
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-2">
                    {isRecording ? (
                        <button
                            onClick={stopRecording}
                            className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                            title="Stop Recording"
                        >
                            <Square className="w-5 h-5 text-white" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSend}
                            className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
                            title="Send Voice Note"
                        >
                            <Send className="w-5 h-5 text-white" />
                        </button>
                    )}
                    <button
                        onClick={handleCancel}
                        className="p-2 bg-gray-500 hover:bg-gray-600 rounded-full transition-colors"
                        title="Cancel"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
