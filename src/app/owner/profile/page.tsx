'use client';

import { OwnerProfile } from "@/components/OwnerProfile";
import { useUser } from "@/context/UserContext";

export default function OwnerProfilePage() {
    const { navigate } = useUser();

    return (
        <OwnerProfile onNavigate={navigate} />
    );
}
