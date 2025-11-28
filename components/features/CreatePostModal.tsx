'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Video, MapPin, Send, Smile } from 'lucide-react';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPost: (post: { text: string; media?: string; eventTag?: string }) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPost }) => {
    const [text, setText] = useState('');
    const [eventTag, setEventTag] = useState('');
    const [mediaPreview, setMediaPreview] = useState<string | null>(null);

    const handlePost = () => {
        if (text.trim() || mediaPreview) {
            onPost({
                text,
                media: mediaPreview || undefined,
                eventTag: eventTag || undefined,
            });
            setText('');
            setMediaPreview(null);
            setEventTag('');
            onClose();
        }
    };

    const handleMediaUpload = () => {
        // Mock media upload - in real app, would use file input
        const mockImages = [
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
        ];
        setMediaPreview(mockImages[Math.floor(Math.random() * mockImages.length)]);
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
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-lg overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                        <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Create Post</h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        {/* Text Input */}
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Share your experience at the event..."
                            className="w-full h-32 p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400"
                        />

                        {/* Media Preview */}
                        {mediaPreview && (
                            <div className="relative rounded-2xl overflow-hidden">
                                <img src={mediaPreview} alt="Preview" className="w-full h-64 object-cover" />
                                <button
                                    onClick={() => setMediaPreview(null)}
                                    className="absolute top-2 right-2 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        )}

                        {/* Event Tag */}
                        <div className="flex items-center space-x-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                            <MapPin className="w-5 h-5 text-purple-600" />
                            <input
                                type="text"
                                value={eventTag}
                                onChange={(e) => setEventTag(e.target.value)}
                                placeholder="Tag an event (e.g., Summer Music Fest)"
                                className="flex-1 bg-transparent outline-none text-sm text-zinc-900 dark:text-white placeholder:text-purple-400"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleMediaUpload}
                                    className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                    title="Add Photo"
                                >
                                    <Image className="w-5 h-5 text-purple-600" />
                                </button>
                                <button
                                    className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                    title="Add Video"
                                >
                                    <Video className="w-5 h-5 text-purple-600" />
                                </button>
                                <button
                                    className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                    title="Add Emoji"
                                >
                                    <Smile className="w-5 h-5 text-purple-600" />
                                </button>
                            </div>

                            <button
                                onClick={handlePost}
                                disabled={!text.trim() && !mediaPreview}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                                <span>Post</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
