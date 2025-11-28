'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Ticket } from '@/types';
import { useTicket } from '@/hooks/useTicket';
import { motion } from 'framer-motion';

interface TicketCardProps {
    ticket: Ticket;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
    const { qrCodeData, timeLeft } = useTicket(ticket);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl max-w-sm mx-auto border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
            {/* Holographic Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

            <div className="flex flex-col items-center space-y-6 relative z-10">
                <div className="text-center">
                    <h3 className="text-sm uppercase tracking-widest text-zinc-500 font-semibold">General Admission</h3>
                    <h2 className="text-2xl font-bold mt-1 text-zinc-900 dark:text-white">Summer Music Fest</h2>
                    <p className="text-zinc-400 text-sm mt-1">Aug 24, 2025 • 4:00 PM</p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white p-4 rounded-xl">
                        <QRCodeSVG value={qrCodeData} size={200} level="H" />
                    </div>

                    {/* Progress Bar for Refresh */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-100 rounded-b-xl overflow-hidden">
                        <motion.div
                            className="h-full bg-purple-600"
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                        />
                    </div>
                </div>

                <div className="text-center space-y-1">
                    <p className="text-xs text-zinc-400">Scan at entry</p>
                    <p className="font-mono text-xs text-zinc-300 truncate w-48 mx-auto">{ticket.id}</p>
                </div>

                <div className="w-full pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-200" />
                        <div className="text-left">
                            <p className="text-xs font-bold text-zinc-900 dark:text-white">Alex Doe</p>
                            <p className="text-[10px] text-zinc-500">Verified Owner</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                        VALID
                    </div>
                </div>

                {/* Squad Pack Button */}
                <div className="w-full pt-2">
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-bold shadow-md hover:opacity-90">
                        Buy Squad Pack (5x)
                    </button>
                </div>
            </div>
        </div>
    );
};
