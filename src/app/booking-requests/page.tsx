'use client';

import { BookingRequests } from "@/components/BookingRequests";
import { useUser } from "@/context/UserContext";

export default function BookingRequestsPage() {
    const { navigate } = useUser();

    return (
        <BookingRequests onNavigate={navigate} />
    );
}
