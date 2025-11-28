'use client';

import React from 'react';
import { User } from '@/types';
import { MessageCircle, UserPlus } from 'lucide-react';

const MOCK_FRIENDS: User[] = [
    { id: '1', name: 'Sarah Jenkins', email: 'sarah@example.com', role: 'ATTENDEE', kycStatus: 'VERIFIED' },
    { id: '2', name: 'Mike Chen', email: 'mike@example.com', role: 'ATTENDEE', kycStatus: 'VERIFIED' },
    { id: '3', name: 'Jessica Wu', email: 'jess@example.com', role: 'ATTENDEE', kycStatus: 'VERIFIED' },
];

const MOCK_OTHERS: User[] = [
    { id: '4', name: 'David Miller', email: 'david@example.com', role: 'ATTENDEE', kycStatus: 'VERIFIED' },
    { id: '5', name: 'Emma Wilson', email: 'emma@example.com', role: 'ATTENDEE', kycStatus: 'VERIFIED' },
];

export const WhosGoing = () => {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="font-bold text-xl text-zinc-900 dark:text-white">Who's Going</h3>
                <p className="text-sm text-zinc-500">See friends and others attending</p>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">My Friends (3)</h4>
                    <div className="space-y-3">
                        {MOCK_FRIENDS.map((friend) => (
                            <div key={friend.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold">
                                        {friend.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-zinc-900 dark:text-white">{friend.name}</p>
                                        <p className="text-xs text-zinc-500">Arriving at 4:00 PM</p>
                                    </div>
                                </div>
                                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
                                    <MessageCircle className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Others (2)</h4>
                    <div className="space-y-3">
                        {MOCK_OTHERS.map((user) => (
                            <div key={user.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-zinc-900 dark:text-white">{user.name}</p>
                                        <p className="text-xs text-zinc-500">Looking for a group</p>
                                    </div>
                                </div>
                                <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                    <UserPlus className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
