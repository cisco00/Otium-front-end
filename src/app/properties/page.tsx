"use client";

import { PropertyBrowse } from "@/components/PropertyBrowse";
import { Header } from "@/components/Header";
import { useUser } from "@/context/UserContext";

export default function PropertiesPage() {
    const { navigate, userType, isAuthenticated, logout } = useUser();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header
                currentView="search"
                onNavigate={navigate}
                userType={userType}
                onLogout={logout}
                isAuthenticated={isAuthenticated}
            />
            <main className="flex-1">
                <PropertyBrowse onNavigate={navigate} />
            </main>
        </div>
    );
}
