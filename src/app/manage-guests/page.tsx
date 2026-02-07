'use client';

import { OwnerManageGuests } from "@/components/OwnerManageGuests";
import { useUser } from "@/context/UserContext";

export default function ManageGuestsPage() {
    const { navigate } = useUser();

    return (
        <OwnerManageGuests onNavigate={navigate} />
    );
}
