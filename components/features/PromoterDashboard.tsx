'use client';

import React from 'react';
import { BarChart3, Users, MapPin, TrendingUp, DollarSign, Bell } from 'lucide-react';

export const PromoterDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Promoter Dashboard</h2>
                <p className="text-purple-100">Analytics & Marketing Tools for Event Organizers</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Total Attendees</span>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">1,247</p>
                    <p className="text-xs text-green-600">+12% vs last event</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Revenue</span>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">$24,940</p>
                    <p className="text-xs text-green-600">+18% vs last event</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Engagement</span>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">87%</p>
                    <p className="text-xs text-green-600">+5% vs last event</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-5 h-5 text-red-600" />
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Avg Distance</span>
                    </div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">12.4mi</p>
                    <p className="text-xs text-zinc-500">from venue</p>
                </div>
            </div>

            {/* Heatmap */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span>Attendee Origin Heatmap</span>
                </h3>
                <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 25 }).map((_, i) => {
                        const intensity = Math.random();
                        return (
                            <div
                                key={i}
                                className="aspect-square rounded-lg"
                                style={{
                                    backgroundColor: `rgba(147, 51, 234, ${intensity})`,
                                }}
                            />
                        );
                    })}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
                    Darker areas indicate higher concentration of attendees
                </p>
            </div>

            {/* Demographics */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span>Audience Demographics</span>
                </h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-600 dark:text-zinc-400">18-24 years</span>
                            <span className="font-bold text-zinc-900 dark:text-white">35%</span>
                        </div>
                        <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600" style={{ width: '35%' }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-600 dark:text-zinc-400">25-34 years</span>
                            <span className="font-bold text-zinc-900 dark:text-white">42%</span>
                        </div>
                        <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600" style={{ width: '42%' }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-600 dark:text-zinc-400">35+ years</span>
                            <span className="font-bold text-zinc-900 dark:text-white">23%</span>
                        </div>
                        <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600" style={{ width: '23%' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Push Marketing */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl p-6 border border-orange-200 dark:border-orange-800">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center space-x-2">
                            <Bell className="w-5 h-5 text-orange-600" />
                            <span>Push Marketing</span>
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Send targeted notifications to users looking at similar events
                        </p>
                    </div>
                    <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">
                        PREMIUM
                    </span>
                </div>
                <div className="space-y-3">
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white mb-2">Target Audience</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">
                                Music Lovers
                            </span>
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">
                                Within 20mi
                            </span>
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">
                                Age 18-35
                            </span>
                        </div>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                        Send Push Notification ($50)
                    </button>
                </div>
            </div>
        </div>
    );
};
