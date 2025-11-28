'use client';

import { CreateEventWizard } from '@/components/features/CreateEventWizard';

export default function CreateEventPage() {
    return (
        <main className="p-4 space-y-6 pb-24">
            <header className="pt-2">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Host Event</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Create your own gathering</p>
            </header>

            <CreateEventWizard />
        </main>
    );
}
