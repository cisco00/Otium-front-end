"use client";

import { PropertyDetail } from "@/components/PropertyDetail";
import { Header } from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import { mockProperties } from "@/lib/mockData";
import { useEffect, useState } from "react";

export default function PropertyDetailPage() {
    const { navigate, userType, isAuthenticated, logout } = useUser();
    const params = useParams();
    const router = useRouter();
    const [property, setProperty] = useState<any>(null);

    useEffect(() => {
        if (params.id) {
            const found = mockProperties.find(p => p.id === Number(params.id));
            if (found) {
                setProperty(found);
            }
        }
    }, [params.id]);

    if (!property) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header
                currentView="property-detail"
                onNavigate={navigate}
                userType={userType}
                onLogout={logout}
                isAuthenticated={isAuthenticated}
            />
            <main className="flex-1">
                <PropertyDetail
                    property={property}
                    onNavigate={navigate}
                    onBack={() => router.back()}
                />
            </main>
        </div>
    );
}
