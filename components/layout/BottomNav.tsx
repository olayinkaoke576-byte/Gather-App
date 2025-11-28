'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Ticket, MessageCircle, Map, PlusSquare, User } from 'lucide-react';

export const BottomNav = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { path: '/home', icon: Home, label: 'Home' },
        { path: '/tickets', icon: Ticket, label: 'Tickets' },
        { path: '/create', icon: PlusSquare, label: 'Create' },
        { path: '/chat', icon: MessageCircle, label: 'Chat' },
        { path: '/map', icon: Map, label: 'Map' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 pb-safe z-50">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                {navItems.map(({ path, icon: Icon, label }) => (
                    <Link
                        key={path}
                        href={path}
                        className={`flex flex-col items-center space-y-1 w-full py-2 transition-colors ${isActive(path)
                            ? 'text-brand-primary'
                            : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                            }`}
                    >
                        <Icon className={`w-6 h-6 ${isActive(path) ? 'fill-current' : ''}`} />
                        <span className="text-[10px] font-medium">{label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
