'use client';

import { Messages } from "@/components/Messages";

export default function MessagesPage() {
    return (
        <div>
            <Messages onNavigate={() => { }} userType={"traveler"} />
        </div>
    );
}