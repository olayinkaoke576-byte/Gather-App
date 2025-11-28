'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MessageCircle, X, Send, Sparkles, Phone, Video, Mic } from 'lucide-react';
import { CallModal } from './CallModal';
import { VoiceNoteRecorder } from './VoiceNoteRecorder';

interface Attendee {
    id: string;
    name: string;
    interests: string[];
    matchScore: number;
    avatarUrl?: string;
}

const MOCK_ATTENDEES: Attendee[] = [
    { id: '1', name: 'Sarah Chen', interests: ['Music Festivals', 'Tech Conferences', 'Food & Drink'], matchScore: 95 },
    { id: '2', name: 'Marcus Johnson', interests: ['Music Festivals', 'Sports', 'Nightlife'], matchScore: 87 },
    { id: '3', name: 'Aisha Patel', interests: ['Art Exhibitions', 'Music Festivals', 'Workshops'], matchScore: 82 },
    { id: '4', name: 'David Kim', interests: ['Tech Conferences', 'Music Festivals', 'Networking'], matchScore: 78 },
];

export const FriendMatcher = () => {
    const [selectedUser, setSelectedUser] = useState<Attendee | null>(null);
    const [message, setMessage] = useState('');
    const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [callType, setCallType] = useState<'audio' | 'video'>('audio');
    const [isRecordingVoice, setIsRecordingVoice] = useState(false);

    const sendFriendRequest = (userId: string) => {
        setSentRequests(new Set([...sentRequests, userId]));
        setTimeout(() => setSelectedUser(null), 1000);
    };

    const sendMessage = () => {
        if (message.trim()) {
            alert(`Message sent to ${selectedUser?.name}: "${message}"`);
            setMessage('');
            setSelectedUser(null);
        }
    };

    const startCall = (type: 'audio' | 'video') => {
        setCallType(type);
        setIsCallModalOpen(true);
    };

    const handleVoiceNoteSend = (audioBlob: Blob, duration: number) => {
        alert(`Voice note sent to ${selectedUser?.name} (${duration}s)`);
        setIsRecordingVoice(false);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white">Find Your Crew</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Connect with people who share your interests</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                {MOCK_ATTENDEES.map((attendee) => (
                    <motion.div
                        key={attendee.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {attendee.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-bold text-zinc-900 dark:text-white">{attendee.name}</h4>
                                        <span className="px-2 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full">
                                            {attendee.matchScore}% Match
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {attendee.interests.slice(0, 3).map((interest) => (
                                            <span
                                                key={interest}
                                                className="px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full text-xs text-zinc-600 dark:text-zinc-400"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                {sentRequests.has(attendee.id) ? (
                                    <div className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold">
                                        Request Sent ✓
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => sendFriendRequest(attendee.id)}
                                            className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                                            title="Send Friend Request"
                                        >
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedUser(attendee)}
                                            className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                            title="Send Message"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* DM Modal */}
            {selectedUser && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedUser(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md overflow-hidden"
                    >
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900 dark:text-white">{selectedUser.name}</h3>
                                    <p className="text-xs text-zinc-500">Send a message</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Call Buttons */}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => startCall('audio')}
                                    className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>Audio Call</span>
                                </button>
                                <button
                                    onClick={() => startCall('video')}
                                    className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Video className="w-5 h-5" />
                                    <span>Video Call</span>
                                </button>
                            </div>

                            {/* Voice Note Recorder or Text Input */}
                            {isRecordingVoice ? (
                                <VoiceNoteRecorder
                                    onSend={handleVoiceNoteSend}
                                    onCancel={() => setIsRecordingVoice(false)}
                                />
                            ) : (
                                <>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Hey! I saw we're both going to the event. Want to meet up?"
                                        className="w-full h-32 p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none text-zinc-700 dark:text-zinc-300"
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setIsRecordingVoice(true)}
                                            className="px-4 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center space-x-2"
                                        >
                                            <Mic className="w-5 h-5" />
                                            <span>Voice Note</span>
                                        </button>
                                        <button
                                            onClick={sendMessage}
                                            disabled={!message.trim()}
                                            className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Call Modal */}
            {selectedUser && (
                <CallModal
                    isOpen={isCallModalOpen}
                    onClose={() => setIsCallModalOpen(false)}
                    recipientName={selectedUser.name}
                    callType={callType}
                />
            )}
        </div>
    );
};
