'use client';

import { TicketCard } from '@/components/features/TicketCard';
import { Ticket } from '@/types';

const MOCK_TICKET: Ticket = {
    id: 'TICKET-8829-XJ',
    eventId: 'EVT-001',
    ownerId: 'USER-123',
    status: 'VALID',
    validationToken: 'SECURE-TOKEN-XYZ',
    purchaseDate: '2025-05-15',
    price: 150,
};

export default function TicketsPage() {
    return (
        <main className="p-4 space-y-6">
            <header className="pt-2">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">My Tickets</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Ready for scanning</p>
            </header>

            <div className="flex flex-col items-center space-y-6 mt-8">
                <TicketCard ticket={MOCK_TICKET} />

                <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-sm">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Event Details</h3>
                    <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex justify-between">
                            <span>Date</span>
                            <span className="text-zinc-900 dark:text-white font-medium">Aug 24, 2025</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Time</span>
                            <span className="text-zinc-900 dark:text-white font-medium">4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Location</span>
                            <span className="text-zinc-900 dark:text-white font-medium">Central Park, NY</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
