'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Shield } from 'lucide-react';

// Dynamic import for Leaflet components to avoid SSR issues
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

export const LocationMap = () => {
    const [isClient, setIsClient] = useState(false);
    const [ghostMode, setGhostMode] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="h-[400px] bg-zinc-100 dark:bg-zinc-800 rounded-3xl animate-pulse" />;
    }

    // Fix for Leaflet default icon issues in Next.js
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">Event Map</h3>
                    <p className="text-xs text-zinc-500">Buddy System Active</p>
                </div>
                <button
                    onClick={() => {
                        // Mock Premium Check - in real app, check user.isPremium
                        const isPremium = true;
                        if (isPremium) {
                            setGhostMode(!ghostMode);
                        } else {
                            alert("Upgrade to Premium to use Ghost Mode!");
                        }
                    }}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${ghostMode
                        ? 'bg-zinc-800 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                >
                    <Shield className="w-3 h-3" />
                    <span>{ghostMode ? 'GHOST MODE ON' : 'Location Shared'}</span>
                </button>
            </div>

            <div className="h-[400px] relative z-0">
                <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {!ghostMode && (
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                You are here <br /> (Visible to Buddies)
                            </Popup>
                        </Marker>
                    )}
                    <Marker position={[51.51, -0.1]}>
                        <Popup>
                            Main Stage <br /> Event Location
                        </Popup>
                    </Marker>
                </MapContainer>

                {/* Floating Controls */}
                <div className="absolute bottom-4 right-4 z-[1000] flex flex-col space-y-2">
                    <button className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-lg text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800">
                        <Navigation className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-lg text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800">
                        <MapPin className="w-5 h-5" />
                    </button>
                </div>

                {/* Nearby Services */}
                <div className="absolute top-4 left-4 z-[1000] bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-4 max-w-xs">
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-3 text-sm">Nearby Services</h4>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                    🏨
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Grand Hotel</p>
                                    <p className="text-xs text-zinc-500">0.3 mi away</p>
                                </div>
                            </div>
                            <button className="text-xs text-purple-600 font-bold">View</button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                    🍔
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Burger Joint</p>
                                    <p className="text-xs text-zinc-500">0.1 mi away</p>
                                </div>
                            </div>
                            <button className="text-xs text-purple-600 font-bold">View</button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                    ⛽
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Gas Station</p>
                                    <p className="text-xs text-zinc-500">0.5 mi away</p>
                                </div>
                            </div>
                            <button className="text-xs text-purple-600 font-bold">View</button>
                        </div>
                    </div>
                </div>

                {/* Ride Hailing */}
                <div className="absolute bottom-20 left-4 right-4 z-[1000]">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-4 border border-zinc-200 dark:border-zinc-800">
                        <p className="text-sm font-bold text-zinc-900 dark:text-white mb-3">Get a ride to the venue</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center space-x-2 p-3 bg-black text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                                <span>🚗</span>
                                <span>Uber</span>
                            </button>
                            <button className="flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                                <span>⚡</span>
                                <span>Bolt</span>
                            </button>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 text-center">
                            Estimated fare: $12-18
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
