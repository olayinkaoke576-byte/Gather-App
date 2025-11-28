'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Maximize2, Minimize2 } from 'lucide-react';

interface CallModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipientName: string;
    callType: 'audio' | 'video';
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose, recipientName, callType }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        if (isOpen) {
            startCall();
            // Simulate connection after 2 seconds
            setTimeout(() => setIsConnected(true), 2000);
        } else {
            stopCall();
        }

        return () => stopCall();
    }, [isOpen]);

    useEffect(() => {
        if (isConnected) {
            const interval = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isConnected]);

    const startCall = async () => {
        try {
            const constraints = {
                audio: true,
                video: callType === 'video',
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            setLocalStream(stream);

            if (localVideoRef.current && callType === 'video') {
                localVideoRef.current.srcObject = stream;
            }

            // In production, implement WebRTC peer connection here
        } catch (error) {
            console.error('Error accessing media devices:', error);
            alert('Unable to access camera/microphone. Please check permissions.');
        }
    };

    const stopCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            setLocalStream(null);
        }
        setCallDuration(0);
        setIsConnected(false);
    };

    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (localStream && callType === 'video') {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoOff(!isVideoOff);
        }
    };

    const endCall = () => {
        stopCall();
        onClose();
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 bg-black z-50 flex items-center justify-center ${isFullscreen ? '' : 'p-4'}`}
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className={`relative ${isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl h-[80vh]'} bg-zinc-900 rounded-3xl overflow-hidden`}
                >
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/50 to-transparent">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-bold text-xl">{recipientName}</h3>
                                <p className="text-white/70 text-sm">
                                    {isConnected ? formatDuration(callDuration) : 'Connecting...'}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                                >
                                    {isFullscreen ? (
                                        <Minimize2 className="w-5 h-5 text-white" />
                                    ) : (
                                        <Maximize2 className="w-5 h-5 text-white" />
                                    )}
                                </button>
                                {!isFullscreen && (
                                    <button
                                        onClick={endCall}
                                        className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Video Container */}
                    {callType === 'video' ? (
                        <div className="relative w-full h-full">
                            {/* Remote Video (Full Screen) */}
                            <video
                                ref={remoteVideoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover bg-zinc-800"
                            />

                            {/* Mock Remote Video Placeholder */}
                            {!isConnected && (
                                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                                            {recipientName.charAt(0)}
                                        </div>
                                        <p className="text-white text-lg">Calling {recipientName}...</p>
                                    </div>
                                </div>
                            )}

                            {/* Local Video (Picture-in-Picture) */}
                            <div className="absolute top-20 right-6 w-48 h-36 bg-zinc-700 rounded-2xl overflow-hidden shadow-2xl">
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover"
                                />
                                {isVideoOff && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                                        <VideoOff className="w-8 h-8 text-white/50" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Audio Call UI */
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-5xl mx-auto mb-6">
                                    {recipientName.charAt(0)}
                                </div>
                                <h2 className="text-white text-3xl font-bold mb-2">{recipientName}</h2>
                                <p className="text-white/70 text-lg">
                                    {isConnected ? formatDuration(callDuration) : 'Connecting...'}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                        <div className="flex items-center justify-center space-x-4">
                            {/* Mute Button */}
                            <button
                                onClick={toggleMute}
                                className={`p-4 rounded-full transition-all ${isMuted
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
                                    }`}
                            >
                                {isMuted ? (
                                    <MicOff className="w-6 h-6 text-white" />
                                ) : (
                                    <Mic className="w-6 h-6 text-white" />
                                )}
                            </button>

                            {/* Video Toggle (only for video calls) */}
                            {callType === 'video' && (
                                <button
                                    onClick={toggleVideo}
                                    className={`p-4 rounded-full transition-all ${isVideoOff
                                            ? 'bg-red-500 hover:bg-red-600'
                                            : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
                                        }`}
                                >
                                    {isVideoOff ? (
                                        <VideoOff className="w-6 h-6 text-white" />
                                    ) : (
                                        <Video className="w-6 h-6 text-white" />
                                    )}
                                </button>
                            )}

                            {/* End Call Button */}
                            <button
                                onClick={endCall}
                                className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-all"
                            >
                                <PhoneOff className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
