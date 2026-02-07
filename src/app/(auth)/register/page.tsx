"use client";

import { SignupSelection } from "@/components/SignupSelection";
import { useUser } from "@/context/UserContext";

export default function RegisterPage() {
    const { navigate } = useUser();

    return (
        <SignupSelection
            onSelectRenter={() => navigate("register-renter")}
            onSelectOwner={() => navigate("register-owner")}
            onBack={() => navigate("landing")}
        />
    );
}
