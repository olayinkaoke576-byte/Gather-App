'use client';

import React from 'react';
import { Sparkles, MessageCircle, MapPin, Calendar } from 'lucide-react';

interface IcebreakerSuggestionsProps {
    userName: string;
    sharedInterests: string[];
    matchScore: number;
}

const ICEBREAKER_TEMPLATES = [
    { icon: '🎵', text: 'Ask about their favorite artist at the festival' },
    { icon: '🍔', text: 'Recommend a great food spot nearby' },
    { icon: '📸', text: 'Offer to take a group photo together' },
    { icon: '🎉', text: 'Share your excitement about the headliner' },
    { icon: '🚗', text: 'Coordinate a ride share to the venue' },
];

export const IcebreakerSuggestions: React.FC<IcebreakerSuggestionsProps> = ({
    userName,
    sharedInterests,
    matchScore,
}) => {
    const generateIcebreakers = () => {
        const icebreakers = [];

        // Interest-based icebreakers
        if (sharedInterests.includes('Music Festivals')) {
            icebreakers.push({
                icon: '🎵',
                text: `"Hey ${userName}! I saw you're into music festivals too. Who are you most excited to see?"`,
                type: 'interest',
            });
        }

        if (sharedInterests.includes('Food & Drink')) {
            icebreakers.push({
                icon: '🍔',
                text: `"Have you tried the food trucks here? I found an amazing one!"`,
                type: 'interest',
            });
        }

        if (sharedInterests.includes('Tech Conferences')) {
            icebreakers.push({
                icon: '💻',
                text: `"Which tech talks are you planning to attend? I'd love to compare notes!"`,
                type: 'interest',
            });
        }

        // Match score based
        if (matchScore > 90) {
            icebreakers.push({
                icon: '✨',
                text: `"We have a ${matchScore}% match! Looks like we have a lot in common. Want to grab a drink?"`,
                type: 'match',
            });
        }

        // Generic friendly openers
        icebreakers.push(
            {
                icon: '📸',
                text: `"Hey! Want to take a group photo? I'm trying to capture all the best moments!"`,
                type: 'generic',
            },
            {
                icon: '🎉',
                text: `"This event is amazing! Are you here with friends or flying solo?"`,
                type: 'generic',
            },
            {
                icon: '🗺️',
                text: `"First time at this venue? I can show you around if you'd like!"`,
                type: 'generic',
            }
        );

        return icebreakers.slice(0, 5);
    };

    const icebreakers = generateIcebreakers();

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm">AI Icebreaker Suggestions</h4>
            </div>
            <div className="space-y-2">
                {icebreakers.map((icebreaker, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            // Copy to clipboard or insert into message
                            navigator.clipboard.writeText(icebreaker.text);
                            alert('Icebreaker copied to clipboard!');
                        }}
                        className="w-full p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all text-left group"
                    >
                        <div className="flex items-start space-x-3">
                            <span className="text-2xl">{icebreaker.icon}</span>
                            <p className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-1">
                                {icebreaker.text}
                            </p>
                            <MessageCircle className="w-4 h-4 text-zinc-400 group-hover:text-purple-600 transition-colors flex-shrink-0 mt-0.5" />
                        </div>
                    </button>
                ))}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 text-center">
                Click any suggestion to copy and start the conversation!
            </p>
        </div>
    );
};
