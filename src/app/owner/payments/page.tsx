'use client';

import { OwnerPayments } from "@/components/OwnerPayments";
import { useUser } from "@/context/UserContext";

export default function OwnerPaymentsPage() {
    const { navigate } = useUser();

    return (
        <OwnerPayments onNavigate={navigate} />
    );
}
