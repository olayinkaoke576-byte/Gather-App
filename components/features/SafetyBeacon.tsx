'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, X, MapPin, Phone, Users, Check } from 'lucide-react';

interface SafetyBeaconProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SafetyBeacon: React.FC<SafetyBeaconProps> = ({ isOpen, onClose }) => {
    const [isActivated, setIsActivated] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
    const [alertSecurity, setAlertSecurity] = useState(true);

    const emergencyContacts = [
        { id: '1', name: 'Sarah Chen', relation: 'Friend' },
        { id: '2', name: 'Marcus Johnson', relation: 'Friend' },
        { id: '3', name: 'Emergency Contact', relation: 'Family' },
    ];

    const handleActivate = () => {
        setIsActivated(true);
        // Simulate sending alerts
        setTimeout(() => {
            alert(`Safety Beacon activated! Alerts sent to:\n${selectedContacts.length} friends\n${alertSecurity ? 'Event Security' : ''}\n\nYour location has been shared.`);
            setTimeout(() => {
                setIsActivated(false);
                onClose();
            }, 2000);
        }, 1500);
    };

    const toggleContact = (id: string) => {
        setSelectedContacts(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border-2 border-red-500 w-full max-w-md overflow-hidden"
                >
                    {isActivated ? (
                        /* Activation Animation */
                        <div className="p-8 text-center space-y-6">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto"
                            >
                                <Shield className="w-12 h-12 text-white" />
                            </motion.div>
                            <div>
                                <h3 className="text-2xl font-bold text-red-600 mb-2">
                                    Safety Beacon Active
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Sending alerts to your contacts...
                                </p>
                            </div>
                            <div className="flex justify-center space-x-2">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ scale: [0, 1, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1,
                                            delay: i * 0.2,
                                        }}
                                        className="w-3 h-3 bg-red-500 rounded-full"
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="p-6 border-b border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-red-500 rounded-xl">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-zinc-900 dark:text-white text-lg">
                                                Safety Beacon
                                            </h3>
                                            <p className="text-xs text-red-600 dark:text-red-400">
                                                Emergency SOS System
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Warning */}
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-start space-x-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-amber-900 dark:text-amber-400 mb-1">
                                            Use in emergencies only
                                        </p>
                                        <p className="text-xs text-amber-700 dark:text-amber-500">
                                            This will immediately alert your selected contacts and event security with your exact location.
                                        </p>
                                    </div>
                                </div>

                                {/* Alert Event Security */}
                                <div className="space-y-3">
                                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                                        Alert Recipients
                                    </h4>
                                    <button
                                        onClick={() => setAlertSecurity(!alertSecurity)}
                                        className={`w-full p-4 rounded-xl border-2 transition-all ${alertSecurity
                                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                                : 'border-zinc-200 dark:border-zinc-800'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-red-500 rounded-lg">
                                                    <Shield className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-zinc-900 dark:text-white">
                                                        Event Security
                                                    </p>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                        Recommended for immediate help
                                                    </p>
                                                </div>
                                            </div>
                                            {alertSecurity && (
                                                <Check className="w-5 h-5 text-red-600" />
                                            )}
                                        </div>
                                    </button>
                                </div>

                                {/* Emergency Contacts */}
                                <div className="space-y-3">
                                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                                        Emergency Contacts
                                    </h4>
                                    <div className="space-y-2">
                                        {emergencyContacts.map((contact) => {
                                            const isSelected = selectedContacts.includes(contact.id);
                                            return (
                                                <button
                                                    key={contact.id}
                                                    onClick={() => toggleContact(contact.id)}
                                                    className={`w-full p-3 rounded-xl border-2 transition-all ${isSelected
                                                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                                            : 'border-zinc-200 dark:border-zinc-800 hover:border-red-300'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                                                                {contact.name.charAt(0)}
                                                            </div>
                                                            <div className="text-left">
                                                                <p className="font-bold text-sm text-zinc-900 dark:text-white">
                                                                    {contact.name}
                                                                </p>
                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                                    {contact.relation}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {isSelected && (
                                                            <Check className="w-5 h-5 text-red-600" />
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Location Info */}
                                <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                        Your current location will be shared
                                    </p>
                                </div>

                                {/* Activate Button */}
                                <button
                                    onClick={handleActivate}
                                    disabled={!alertSecurity && selectedContacts.length === 0}
                                    className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    <Shield className="w-6 h-6" />
                                    <span>Activate Safety Beacon</span>
                                </button>

                                {/* Emergency Call */}
                                <button
                                    onClick={() => window.open('tel:911')}
                                    className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>Call Emergency Services</span>
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
