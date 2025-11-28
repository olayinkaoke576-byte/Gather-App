'use client';

import { ChatRoom } from '@/components/features/ChatRoom';
import { useAuth } from '@/context/AuthContext';

export default function ChatPage() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <main className="h-[calc(100vh-5rem)] flex flex-col">
            <header className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Event Chat</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Summer Music Fest 2025</p>
            </header>

            <div className="flex-1 overflow-hidden">
                <ChatRoom eventId="EVT-001" userId={user.id} userName={user.name} />
            </div>
        </main>
    );
}
