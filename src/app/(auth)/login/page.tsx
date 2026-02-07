"use client";

import { OtiumLogin } from "@/components/OtiumLogin";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
    const { login, navigate } = useUser();

    return (
        <OtiumLogin
            onLogin={login}
            onRegisterRenter={() => navigate("register-renter")}
            onRegisterOwner={() => navigate("register-owner")}
            onBack={() => navigate("landing")}
        />
    );
}
