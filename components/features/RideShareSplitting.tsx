'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Users, MapPin, DollarSign, Clock, Check, X, ArrowRight } from 'lucide-react';

interface RideShareMatch {
    id: string;
    name: string;
    destination: string;
    departureTime: string;
    currentRiders: number;
    maxRiders: number;
    estimatedCost: number;
    distance: string;
}

const MOCK_RIDE_MATCHES: RideShareMatch[] = [
    {
        id: '1',
        name: 'Sarah Chen',
        destination: 'Downtown Area',
        departureTime: '11:30 PM',
        currentRiders: 2,
        maxRiders: 4,
        estimatedCost: 25,
        distance: '2.3 km away',
    },
    {
        id: '2',
        name: 'Marcus Johnson',
        destination: 'North District',
        departureTime: '12:00 AM',
        currentRiders: 1,
        maxRiders: 4,
        estimatedCost: 30,
        distance: '3.1 km away',
    },
    {
        id: '3',
        name: 'Aisha Patel',
        destination: 'East Side',
        departureTime: '11:45 PM',
        currentRiders: 3,
        maxRiders: 4,
        estimatedCost: 20,
        distance: '1.8 km away',
    },
];

export const RideShareSplitting = () => {
    const [selectedRide, setSelectedRide] = useState<RideShareMatch | null>(null);
    const [isJoined, setIsJoined] = useState(false);

    const handleJoinRide = (ride: RideShareMatch) => {
        setSelectedRide(ride);
    };

    const confirmJoin = () => {
        setIsJoined(true);
        setTimeout(() => {
            alert(`You've joined ${selectedRide?.name}'s ride! Check your messages for coordination details.`);
            setIsJoined(false);
            setSelectedRide(null);
        }, 2000);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                        <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white">Ride Share Splitting</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Split costs with others going your way
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Savings Banner */}
                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold mb-1">Save up to 75% on rides!</p>
                            <p className="text-xs opacity-90">
                                Share with 3 others and split the cost
                            </p>
                        </div>
                        <DollarSign className="w-8 h-8 opacity-80" />
                    </div>
                </div>

                {/* Available Rides */}
                <div className="space-y-3">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                        Available Rides Near You
                    </h4>
                    {MOCK_RIDE_MATCHES.map((ride) => {
                        const spotsLeft = ride.maxRiders - ride.currentRiders;
                        const costPerPerson = ride.estimatedCost / ride.maxRiders;

                        return (
                            <motion.div
                                key={ride.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-green-300 dark:hover:border-green-600 transition-all"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {ride.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-zinc-900 dark:text-white">
                                                {ride.name}
                                            </p>
                                            <div className="flex items-center space-x-1 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                                <MapPin className="w-3 h-3" />
                                                <span>{ride.destination}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-green-600">
                                            ${costPerPerson.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">per person</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    <div className="flex items-center space-x-1 text-xs text-zinc-600 dark:text-zinc-400">
                                        <Clock className="w-3 h-3" />
                                        <span>{ride.departureTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs text-zinc-600 dark:text-zinc-400">
                                        <Users className="w-3 h-3" />
                                        <span>
                                            {ride.currentRiders}/{ride.maxRiders} riders
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs text-zinc-600 dark:text-zinc-400">
                                        <MapPin className="w-3 h-3" />
                                        <span>{ride.distance}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex -space-x-2">
                                            {[...Array(ride.currentRiders)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white dark:border-zinc-800"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs font-medium text-green-600">
                                            {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleJoinRide(ride)}
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold transition-colors flex items-center space-x-1"
                                    >
                                        <span>Join Ride</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Create Ride Button */}
                <button className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
                    <Car className="w-5 h-5" />
                    <span>Create New Ride Share</span>
                </button>
            </div>

            {/* Join Confirmation Modal */}
            <AnimatePresence>
                {selectedRide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedRide(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md p-6"
                        >
                            {isJoined ? (
                                <div className="text-center space-y-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto"
                                    >
                                        <Check className="w-10 h-10 text-white" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                                        Ride Joined!
                                    </h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        Check your messages for coordination
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                                        Confirm Ride Share
                                    </h3>
                                    <div className="space-y-4 mb-6">
                                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                                                Riding with
                                            </p>
                                            <p className="font-bold text-zinc-900 dark:text-white">
                                                {selectedRide.name}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                    Your Cost
                                                </p>
                                                <p className="text-xl font-bold text-green-600">
                                                    ${(selectedRide.estimatedCost / selectedRide.maxRiders).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                    Departure
                                                </p>
                                                <p className="text-lg font-bold text-zinc-900 dark:text-white">
                                                    {selectedRide.departureTime}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => setSelectedRide(null)}
                                            className="flex-1 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmJoin}
                                            className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
