"use client";

import { RenterRegistration } from "@/components/RenterRegistration";
import { useUser } from "@/context/UserContext";

export default function RenterRegisterPage() {
    const { navigate, setAuthView } = useUser();

    return (
        <RenterRegistration
            onComplete={() => {
                setAuthView("login");
                navigate("login");
            }}
            onBack={() => {
                setAuthView("login");
                navigate("login");
            }}
        />
    );
}
