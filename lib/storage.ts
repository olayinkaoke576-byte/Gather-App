import { openDB, DBSchema } from 'idb';
import { Ticket, ChatMessage } from '@/types';

interface GatherDB extends DBSchema {
    tickets: {
        key: string;
        value: Ticket;
        indexes: { 'by-event': string };
    };
    messages: {
        key: string;
        value: ChatMessage;
        indexes: { 'by-event': string };
    };
}

const DB_NAME = 'gather-app-db';
const DB_VERSION = 1;

export const initDB = async () => {
    return openDB<GatherDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('tickets')) {
                const ticketStore = db.createObjectStore('tickets', { keyPath: 'id' });
                ticketStore.createIndex('by-event', 'eventId');
            }
            if (!db.objectStoreNames.contains('messages')) {
                const msgStore = db.createObjectStore('messages', { keyPath: 'id' });
                msgStore.createIndex('by-event', 'eventId');
            }
        },
    });
};

export const saveTicketLocal = async (ticket: Ticket) => {
    const db = await initDB();
    await db.put('tickets', ticket);
};

export const getTicketsLocal = async () => {
    const db = await initDB();
    return db.getAll('tickets');
};

export const saveMessageLocal = async (message: ChatMessage) => {
    const db = await initDB();
    await db.put('messages', message);
};

export const getMessagesLocal = async (eventId: string) => {
    const db = await initDB();
    return db.getAllFromIndex('messages', 'by-event', eventId);
};
