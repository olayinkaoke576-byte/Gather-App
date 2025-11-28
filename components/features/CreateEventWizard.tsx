'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Image as ImageIcon, Check } from 'lucide-react';

export const CreateEventWizard = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        price: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden max-w-2xl mx-auto">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="font-bold text-xl text-zinc-900 dark:text-white">Host Your Event</h3>
                <div className="flex space-x-2 mt-2">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="p-8">
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">Event Details</h4>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Event Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Summer Beach Party"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Date & Time</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                                <input
                                    name="date"
                                    type="datetime-local"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full p-3 pl-10 bg-zinc-50 dark:bg-zinc-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                        <button onClick={nextStep} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold mt-4 hover:bg-blue-700">Next</button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">Location & Price</h4>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full p-3 pl-10 bg-zinc-50 dark:bg-zinc-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Search or drop pin..."
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Ticket Price (USD)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                                <input
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full p-3 pl-10 bg-zinc-50 dark:bg-zinc-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <button onClick={nextStep} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold mt-4 hover:bg-blue-700">Next</button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center space-y-6 py-8">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">Ready to Launch!</h4>
                            <p className="text-zinc-500 mt-2">Smart contracts will be deployed automatically.</p>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl text-left text-sm space-y-2">
                            <p><span className="font-bold">Event:</span> {formData.title}</p>
                            <p><span className="font-bold">Location:</span> {formData.location}</p>
                            <p><span className="font-bold">Price:</span> ${formData.price}</p>
                        </div>
                        <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90">
                            Mint Tickets & Publish
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
