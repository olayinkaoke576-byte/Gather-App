'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Users, Coffee, X, Check } from 'lucide-react';

type LiveStatus = 'looking-for-ride' | 'open-to-meet' | 'with-squad' | 'taking-break' | null;

interface LiveStatusIndicatorProps {
    currentStatus?: LiveStatus;
    onStatusChange?: (status: LiveStatus) => void;
}

const STATUS_OPTIONS = [
    {
        id: 'looking-for-ride' as LiveStatus,
        label: 'Looking for a Ride',
        icon: Car,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-700 dark:text-blue-400',
        emoji: '🚗',
    },
    {
        id: 'open-to-meet' as LiveStatus,
        label: 'Open to Meet',
        icon: Users,
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-700 dark:text-green-400',
        emoji: '👋',
    },
    {
        id: 'with-squad' as LiveStatus,
        label: 'With Squad',
        icon: Users,
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        textColor: 'text-purple-700 dark:text-purple-400',
        emoji: '🎉',
    },
    {
        id: 'taking-break' as LiveStatus,
        label: 'Taking a Break',
        icon: Coffee,
        color: 'from-orange-500 to-amber-500',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        textColor: 'text-orange-700 dark:text-orange-400',
        emoji: '☕',
    },
];

export const LiveStatusIndicator: React.FC<LiveStatusIndicatorProps> = ({
    currentStatus: initialStatus,
    onStatusChange,
}) => {
    const [status, setStatus] = useState<LiveStatus>(initialStatus || null);
    const [isOpen, setIsOpen] = useState(false);

    const handleStatusChange = (newStatus: LiveStatus) => {
        const updatedStatus = status === newStatus ? null : newStatus;
        setStatus(updatedStatus);
        onStatusChange?.(updatedStatus);
        setIsOpen(false);
    };

    const currentStatusOption = STATUS_OPTIONS.find(opt => opt.id === status);

    return (
        <div className="relative">
            {/* Status Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all flex items-center space-x-2 ${currentStatusOption
                        ? `${currentStatusOption.bgColor} ${currentStatusOption.textColor}`
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
            >
                {currentStatusOption ? (
                    <>
                        <span>{currentStatusOption.emoji}</span>
                        <span>{currentStatusOption.label}</span>
                        <X className="w-4 h-4" />
                    </>
                ) : (
                    <>
                        <span>Set Live Status</span>
                    </>
                )}
            </button>

            {/* Status Picker Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-4 w-64 z-50"
                    >
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-3 text-sm">
                            Set Your Live Status
                        </h4>
                        <div className="space-y-2">
                            {STATUS_OPTIONS.map((option) => {
                                const Icon = option.icon;
                                const isActive = status === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleStatusChange(option.id)}
                                        className={`w-full p-3 rounded-xl border-2 transition-all text-left ${isActive
                                                ? `border-purple-500 ${option.bgColor}`
                                                : 'border-zinc-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-600'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`p-2 rounded-lg bg-gradient-to-r ${option.color}`}>
                                                    <Icon className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-zinc-900 dark:text-white">
                                                        {option.label}
                                                    </p>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                        {option.emoji} Visible to others
                                                    </p>
                                                </div>
                                            </div>
                                            {isActive && (
                                                <Check className="w-5 h-5 text-purple-600" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full mt-3 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
