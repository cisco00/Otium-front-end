"use client";

import { AdminDashboard } from "@/components/AdminDashboard";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
    const { navigate, userType, isAuthenticated } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || userType !== "admin") {
            router.push("/login");
        }
    }, [isAuthenticated, userType, router]);

    if (!isAuthenticated || userType !== "admin") return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminDashboard onNavigate={navigate} />
        </div>
    );
}
