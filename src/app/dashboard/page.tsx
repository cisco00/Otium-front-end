"use client";

import { TravelerDashboard } from "@/components/TravelerDashboard";
import { OwnerDashboard } from "@/components/OwnerDashboard";
import { UserSidebar } from "@/components/UserSidebar";
import { Header } from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const { userType, isAuthenticated, logout, navigate, currentView } = useUser();
    const router = useRouter();

    // Basic route protection
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <UserSidebar
                userType={userType}
                currentView="dashboard" // or currentView from context if we map sub-views
                onNavigate={navigate}
                onLogout={logout}
            />
            <div className="flex-1 flex flex-col">
                <Header
                    currentView="dashboard"
                    onNavigate={navigate}
                    userType={userType}
                    onLogout={logout}
                    isAuthenticated={true}
                />
                <main className="flex-1">
                    {userType === "traveler" && <TravelerDashboard onNavigate={navigate} />}
                    {userType === "owner" && <OwnerDashboard onNavigate={navigate} />}
                </main>
            </div>
        </div>
    );
}
