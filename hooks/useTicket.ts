import { useState, useEffect } from 'react';
import { Ticket } from '@/types';

export const useTicket = (ticket: Ticket) => {
    const [qrCodeData, setQrCodeData] = useState('');
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        const generateHash = async () => {
            const timecode = Math.floor(Date.now() / 5000); // 5-second windows
            const data = `${ticket.id}:${ticket.validationToken}:${timecode}`;

            // Simple hash for demo (in production use proper crypto lib)
            const msgBuffer = new TextEncoder().encode(data);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            setQrCodeData(hashHex);
        };

        generateHash();
        const interval = setInterval(() => {
            generateHash();
            setTimeLeft(5);
        }, 5000);

        const countdown = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 5));
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(countdown);
        };
    }, [ticket]);

    return { qrCodeData, timeLeft };
};
