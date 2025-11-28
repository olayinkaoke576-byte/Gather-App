'use client';

import { LocationMap } from '@/components/features/LocationMap';

export default function MapPage() {
    return (
        <main className="h-[calc(100vh-5rem)] flex flex-col">
            <header className="p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-white/90 to-transparent dark:from-black/90 pointer-events-none">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Event Map</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Find friends and venues</p>
            </header>

            <div className="flex-1 relative z-0">
                <LocationMap />
            </div>
        </main>
    );
}
