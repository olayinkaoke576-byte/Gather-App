'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import { CreatePostModal } from './CreatePostModal';

const STORIES = [
    { id: 1, user: 'Alex', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80', time: '2m ago' },
    { id: 2, user: 'Sarah', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80', time: '15m ago' },
    { id: 3, user: 'Mike', image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97d848?w=500&q=80', time: '1h ago' },
];

interface Post {
    id: number;
    user: string;
    image: string;
    time: string;
    text: string;
    eventTag?: string;
}

export const SocialFeed = () => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [posts, setPosts] = useState<Post[]>([
        { id: 1, user: 'Alex', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80', time: '2m ago', text: 'Having an amazing time at the main stage! 🎵', eventTag: 'Summer Music Fest' },
        { id: 2, user: 'Sarah', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80', time: '15m ago', text: 'The vibes here are incredible! 🔥', eventTag: 'Summer Music Fest' },
        { id: 3, user: 'Mike', image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97d848?w=500&q=80', time: '1h ago', text: 'Best concert ever! Can\'t wait for the next one 🎸' },
    ]);

    const handleCreatePost = (newPost: { text: string; media?: string; eventTag?: string }) => {
        const post: Post = {
            id: posts.length + 1,
            user: 'You',
            image: newPost.media || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80',
            time: 'Just now',
            text: newPost.text,
            eventTag: newPost.eventTag,
        };
        setPosts([post, ...posts]);
    };

    return (
        <div className="space-y-6">
            {/* Create Post Button */}
            <button
                onClick={() => setIsPostModalOpen(true)}
                className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg"
            >
                <Plus className="w-5 h-5" />
                <span>Share Your Experience</span>
            </button>

            {/* Stories Rail */}
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex-shrink-0 w-20 space-y-1 text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                        <span className="text-2xl font-light text-zinc-400">+</span>
                    </div>
                    <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Add Story</p>
                </div>
                {STORIES.map((story) => (
                    <div key={story.id} className="flex-shrink-0 w-20 space-y-1 text-center cursor-pointer">
                        <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-purple-600">
                            <img src={story.image} alt={story.user} className="w-full h-full rounded-full object-cover border-2 border-white dark:border-black" />
                        </div>
                        <p className="text-xs font-medium text-zinc-900 dark:text-white">{story.user}</p>
                    </div>
                ))}
            </div>

            {/* Feed Posts */}
            <div className="space-y-6">
                {posts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                    >
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden">
                                    <img src={post.image} alt={post.user} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900 dark:text-white">{post.user}</p>
                                    <p className="text-xs text-zinc-500">{post.time}</p>
                                </div>
                            </div>
                            {post.eventTag && (
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-bold">
                                    📍 {post.eventTag}
                                </span>
                            )}
                        </div>

                        <div className="aspect-square bg-zinc-100 dark:bg-zinc-800">
                            <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                        </div>

                        <div className="p-4">
                            <div className="flex items-center space-x-4 mb-4">
                                <button className="text-zinc-900 dark:text-white hover:text-red-500 transition-colors">
                                    <Heart className="w-6 h-6" />
                                </button>
                                <button className="text-zinc-900 dark:text-white hover:text-blue-500 transition-colors">
                                    <MessageCircle className="w-6 h-6" />
                                </button>
                                <button className="text-zinc-900 dark:text-white hover:text-green-500 transition-colors ml-auto">
                                    <Share2 className="w-6 h-6" />
                                </button>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                <span className="font-bold text-zinc-900 dark:text-white mr-2">{post.user}</span>
                                {post.text}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={isPostModalOpen}
                onClose={() => setIsPostModalOpen(false)}
                onPost={handleCreatePost}
            />
        </div>
    );
};
