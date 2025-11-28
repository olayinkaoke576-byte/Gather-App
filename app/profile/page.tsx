'use client';

import React, { useState } from 'react';
import { ProfileEditor } from '@/components/features/ProfileEditor';
import { TapToConnect } from '@/components/features/TapToConnect';
import { LiveStatusIndicator } from '@/components/features/LiveStatusIndicator';
import { QrCode } from 'lucide-react';

export default function ProfilePage() {
    const [isTapToConnectOpen, setIsTapToConnectOpen] = useState(false);

    return (
        <main className="p-4 pb-24 space-y-6">
            {/* Quick Actions */}
            <div className="flex items-center justify-between">
                <LiveStatusIndicator />
                <button
                    onClick={() => setIsTapToConnectOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:opacity-90 transition-opacity flex items-center space-x-2"
                >
                    <QrCode className="w-5 h-5" />
                    <span>Tap to Connect</span>
                </button>
            </div>

            <ProfileEditor />

            <TapToConnect
                isOpen={isTapToConnectOpen}
                onClose={() => setIsTapToConnectOpen(false)}
            />
        </main>
    );
}
