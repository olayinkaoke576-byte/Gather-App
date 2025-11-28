'use client';

import { SocialFeed } from '@/components/features/SocialFeed';
import { WhosGoing } from '@/components/features/WhosGoing';
import { FriendMatcher } from '@/components/features/FriendMatcher';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
    const { user } = useAuth();

    return (
        <main className="p-4 space-y-6">
            <header className="flex justify-between items-center pt-2">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Discover</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">Happening around you</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold">
                    {user?.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        user?.name.charAt(0).toUpperCase()
                    )}
                </div>
            </header>

            <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Who's Going</h2>
                <WhosGoing />
            </section>

            <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Connect with New Friends</h2>
                <FriendMatcher />
            </section>

            <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Live Feed</h2>
                <SocialFeed />
            </section>
        </main>
    );
}
