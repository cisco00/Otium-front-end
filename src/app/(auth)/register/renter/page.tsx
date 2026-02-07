"use client";

import { RenterRegistration } from "@/components/RenterRegistration";
import { useUser } from "@/context/UserContext";

export default function RenterRegisterPage() {
    const { navigate, setAuthView, login } = useUser();

    return (
        <RenterRegistration
            onComplete={() => {
                login("traveler");
            }}
            onBack={() => {
                setAuthView("login");
                navigate("login");
            }}
        />
    );
}
