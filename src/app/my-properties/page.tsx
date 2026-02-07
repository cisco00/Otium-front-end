'use client';

import { OwnerProperties } from "@/components/OwnerProperties";
import { useUser } from "@/context/UserContext";

export default function MyPropertiesPage() {
    const { navigate } = useUser();

    return (
        <OwnerProperties onNavigate={navigate} />
    );
}
