'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';

interface CrowdDensityData {
    area: string;
    density: 'low' | 'medium' | 'high' | 'very-high';
    count: number;
    coordinates: { x: number; y: number };
}

const MOCK_CROWD_DATA: CrowdDensityData[] = [
    { area: 'Main Stage', density: 'very-high', count: 450, coordinates: { x: 50, y: 30 } },
    { area: 'Food Court', density: 'high', count: 280, coordinates: { x: 70, y: 60 } },
    { area: 'Bar Area', density: 'high', count: 320, coordinates: { x: 30, y: 50 } },
    { area: 'Lounge', density: 'medium', count: 120, coordinates: { x: 80, y: 80 } },
    { area: 'Restrooms', density: 'medium', count: 85, coordinates: { x: 20, y: 80 } },
    { area: 'VIP Section', density: 'low', count: 45, coordinates: { x: 90, y: 20 } },
    { area: 'Outdoor Patio', density: 'low', count: 60, coordinates: { x: 10, y: 20 } },
];

const getDensityColor = (density: CrowdDensityData['density']) => {
    switch (density) {
        case 'low':
            return { bg: 'bg-green-500', text: 'text-green-700', label: 'Chill' };
        case 'medium':
            return { bg: 'bg-yellow-500', text: 'text-yellow-700', label: 'Moderate' };
        case 'high':
            return { bg: 'bg-orange-500', text: 'text-orange-700', label: 'Busy' };
        case 'very-high':
            return { bg: 'bg-red-500', text: 'text-red-700', label: 'Packed' };
    }
};

export const CrowdDensityHeatmap = () => {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white">Crowd Density</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Real-time venue heatmap</p>
                    </div>
                </div>
            </div>

            {/* Heatmap Visualization */}
            <div className="p-6 space-y-6">
                {/* Venue Map */}
                <div className="relative aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl overflow-hidden">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-20">
                        <svg width="100%" height="100%">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    {/* Crowd Density Markers */}
                    {MOCK_CROWD_DATA.map((area, index) => {
                        const colors = getDensityColor(area.density);
                        const size = area.density === 'very-high' ? 80 : area.density === 'high' ? 60 : area.density === 'medium' ? 45 : 30;

                        return (
                            <motion.div
                                key={area.area}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.7 }}
                                transition={{ delay: index * 0.1 }}
                                className={`absolute ${colors.bg} rounded-full blur-xl`}
                                style={{
                                    left: `${area.coordinates.x}%`,
                                    top: `${area.coordinates.y}%`,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                        );
                    })}

                    {/* Area Labels */}
                    {MOCK_CROWD_DATA.map((area) => (
                        <div
                            key={`label-${area.area}`}
                            className="absolute"
                            style={{
                                left: `${area.coordinates.x}%`,
                                top: `${area.coordinates.y}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg px-2 py-1 text-center border border-zinc-200 dark:border-zinc-800">
                                <p className="text-xs font-bold text-zinc-900 dark:text-white whitespace-nowrap">
                                    {area.area}
                                </p>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                    {area.count} people
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2">
                    {(['low', 'medium', 'high', 'very-high'] as const).map((density) => {
                        const colors = getDensityColor(density);
                        return (
                            <div
                                key={density}
                                className="flex items-center space-x-2 p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                            >
                                <div className={`w-3 h-3 ${colors.bg} rounded-full`} />
                                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                    {colors.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Area List */}
                <div className="space-y-2">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Area Breakdown</h4>
                    <div className="space-y-2">
                        {MOCK_CROWD_DATA.sort((a, b) => b.count - a.count).map((area) => {
                            const colors = getDensityColor(area.density);
                            return (
                                <div
                                    key={area.area}
                                    className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 ${colors.bg} rounded-full`} />
                                        <div>
                                            <p className="font-bold text-sm text-zinc-900 dark:text-white">
                                                {area.area}
                                            </p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                {colors.label}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-4 h-4 text-zinc-400" />
                                        <span className="font-bold text-sm text-zinc-900 dark:text-white">
                                            {area.count}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tips */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
                    <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
                        💡 <strong>Tip:</strong> Head to the Outdoor Patio or VIP Section for a more relaxed vibe!
                    </p>
                </div>
            </div>
        </div>
    );
};
