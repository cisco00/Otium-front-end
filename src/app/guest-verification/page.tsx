'use client'

import { GuestVerification } from "@/components/GuestVerification";

export default function GuestVerificationPage() {
    return (
        <div>
            <GuestVerification onNavigate={() => { }} userType={"traveler"} />
        </div>
    );
}