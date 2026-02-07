'use client';

import { HelpCenter } from "@/components/HelpCenter";

export default function HelpCenterPage() {
    return (
        <div>
            <HelpCenter onNavigate={() => { }} userType={"traveler"} />
        </div>
    );
}