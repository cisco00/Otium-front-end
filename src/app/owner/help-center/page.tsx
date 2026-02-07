'use client';

import { OwnerHelpCenter } from "@/components/OwnerHelpCenter";
import { useUser } from "@/context/UserContext";

export default function OwnerHelpCenterPage() {
    const { navigate } = useUser();

    return (
        <OwnerHelpCenter onNavigate={navigate} />
    );
}
