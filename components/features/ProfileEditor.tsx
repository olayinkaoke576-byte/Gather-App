'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User as UserIcon, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const INTEREST_TAGS = [
    'Music Festivals', 'Tech Conferences', 'Art Exhibitions',
    'Food & Drink', 'Sports', 'Networking', 'Workshops',
    'Comedy', 'Theatre', 'Nightlife'
];

export const ProfileEditor = () => {
    const { user, updateProfile } = useAuth();
    const [bio, setBio] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setBio(user.bio || '');
            setSelectedInterests(user.interests || []);
        }
    }, [user]);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        updateProfile({ bio, interests: selectedInterests });
        setIsSaving(false);
    };

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center space-x-4 mb-8">
                <Link href="/" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                </Link>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Edit Profile</h1>
            </div>

            {/* Avatar Section */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        user.name.charAt(0).toUpperCase()
                    )}
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{user.name}</h2>
                        {user.isVerified && (
                            <div className="bg-blue-500 text-white p-0.5 rounded-full">
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400">{user.email}</p>
                    <div className="mt-2 flex space-x-2">
                        <span className="inline-flex px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                            {user.role}
                        </span>
                        {user.isPremium && (
                            <span className="inline-flex px-3 py-1 rounded-full bg-gradient-to-r from-amber-200 to-yellow-400 text-xs font-bold text-yellow-900">
                                PREMIUM
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-4">
                <label className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center space-x-2">
                    <UserIcon className="w-5 h-5 text-brand-secondary" />
                    <span>About Me</span>
                </label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a bit about yourself..."
                    className="w-full h-32 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all resize-none text-zinc-700 dark:text-zinc-300"
                />
            </div>

            {/* Interests Section */}
            <div className="space-y-4">
                <label className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Interests
                </label>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Select the types of events you enjoy</p>
                <div className="flex flex-wrap gap-3">
                    {INTEREST_TAGS.map(interest => (
                        <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedInterests.includes(interest)
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25 scale-105'
                                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-brand-secondary'
                                }`}
                        >
                            {interest}
                        </button>
                    ))}
                </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-xl shadow-brand-primary/20"
                >
                    {isSaving ? (
                        <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            <span>Save Profile</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
