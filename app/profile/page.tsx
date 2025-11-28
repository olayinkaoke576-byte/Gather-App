'use client';

import { ProfileEditor } from '@/components/features/ProfileEditor';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Login } from '@/components/features/Login';

const ProfilePageContent = () => {
    const { user } = useAuth();

    if (!user) {
        return <Login />;
    }

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black p-8">
            <ProfileEditor />
        </main>
    );
};

export default function ProfilePage() {
    return (
        <AuthProvider>
            <ProfilePageContent />
        </AuthProvider>
    );
}
