'use client';

import { OwnerMessages } from "@/components/OwnerMessages";
import { useUser } from "@/context/UserContext";

export default function OwnerMessagesPage() {
    const { navigate } = useUser();

    return (
        <OwnerMessages onNavigate={navigate} />
    );
}
