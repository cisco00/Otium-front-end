"use client";

import { OwnerRegistration } from "@/components/OwnerRegistration";
import { useUser } from "@/context/UserContext";

export default function OwnerRegisterPage() {
    const { navigate, setAuthView } = useUser();

    return (
        <OwnerRegistration
            onComplete={() => {
                setAuthView("login");
                navigate("landing"); // Or login
            }}
            onBack={() => {
                setAuthView("login");
                navigate("landing");
            }}
        />
    );
}
