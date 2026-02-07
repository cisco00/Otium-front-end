"use client";

import { OwnerRegistration } from "@/components/OwnerRegistration";
import { useUser } from "@/context/UserContext";

export default function OwnerRegisterPage() {
    const { navigate, setAuthView, login } = useUser();

    return (
        <OwnerRegistration
            onComplete={() => {
                login("owner");
            }}
            onBack={() => {
                setAuthView("login");
                navigate("landing");
            }}
        />
    );
}
