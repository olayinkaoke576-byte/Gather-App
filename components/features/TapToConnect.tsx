'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, X, Camera, UserPlus, Sparkles, Copy, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface TapToConnectProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TapToConnect: React.FC<TapToConnectProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [isCopied, setIsCopied] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scannedUser, setScannedUser] = useState<string | null>(null);

    if (!user) return null;

    const profileUrl = `https://gather.app/u/${user.id}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(profileUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleScan = () => {
        setIsScanning(true);
        // Simulate QR scan
        setTimeout(() => {
            setScannedUser('Sarah Chen');
            setIsScanning(false);
        }, 2000);
    };

    const handleConnect = () => {
        alert(`Connected with ${scannedUser}! You're now friends.`);
        setScannedUser(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                                    <QrCode className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900 dark:text-white">Tap to Connect</h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Instant friend connection</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {scannedUser ? (
                            /* Scanned User Success */
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto">
                                    <Check className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                                        Found {scannedUser}!
                                    </h4>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        Connect to become friends and exchange socials
                                    </p>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setScannedUser(null)}
                                        className="flex-1 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConnect}
                                        className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                                    >
                                        <UserPlus className="w-5 h-5" />
                                        <span>Connect</span>
                                    </button>
                                </div>
                            </motion.div>
                        ) : isScanning ? (
                            /* Scanning State */
                            <div className="text-center space-y-4 py-8">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"
                                />
                                <p className="text-zinc-600 dark:text-zinc-400">Scanning for QR code...</p>
                            </div>
                        ) : (
                            <>
                                {/* My QR Code */}
                                <div className="text-center space-y-4">
                                    <h4 className="font-bold text-zinc-900 dark:text-white">My QR Code</h4>
                                    <div className="relative inline-block">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25" />
                                        <div className="relative bg-white p-6 rounded-2xl">
                                            <QRCodeSVG value={profileUrl} size={200} level="H" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-bold text-zinc-900 dark:text-white">{user.name}</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Have someone scan this to connect
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleCopyLink}
                                        className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center space-x-2 mx-auto"
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                <span>Copy Link</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">or</span>
                                    </div>
                                </div>

                                {/* Scan QR Code */}
                                <button
                                    onClick={handleScan}
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                                >
                                    <Camera className="w-5 h-5" />
                                    <span>Scan Someone's QR Code</span>
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
