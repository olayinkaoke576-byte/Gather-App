export type UserRole = 'ATTENDEE' | 'ORGANIZER' | 'ADMIN';
export type KYCStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NONE';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    kycStatus: KYCStatus;
    avatarUrl?: string;
    bio?: string;
    interests?: string[];
    isPremium?: boolean;
    isVerified?: boolean;
}

export type TicketStatus = 'VALID' | 'USED' | 'USED_LOCAL' | 'RESALE_PENDING';

export interface Ticket {
    id: string;
    eventId: string;
    ownerId: string;
    status: TicketStatus;
    validationToken: string;
    purchaseDate: string;
    price: number;
    seat?: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    organizerId: string;
    imageUrl?: string;
    price: number;
}

export interface ChatMessage {
    id: string;
    eventId: string;
    senderId: string;
    senderName: string;
    text: string;
    timestamp: number;
    isOffline?: boolean;
}
