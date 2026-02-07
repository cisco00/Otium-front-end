"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserType = "traveler" | "owner" | "admin";
type AuthView = "login" | "register-renter" | "register-owner";

interface UserContextType {
    userType: UserType;
    setUserType: (type: UserType) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuth: boolean) => void;
    currentView: string; // Keeping for compatibility, though we use routes mainly
    setCurrentView: (view: string) => void;
    authView: AuthView;
    setAuthView: (view: AuthView) => void;
    login: (type: UserType) => void;
    logout: () => void;
    navigate: (view: string, data?: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userType, setUserType] = useState<UserType>("traveler");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentView, setCurrentView] = useState("landing");
    const [authView, setAuthView] = useState<AuthView>("login");
    const router = useRouter();

    const login = (type: UserType) => {
        setIsAuthenticated(true);
        setUserType(type);
        if (type === "admin") {
            router.push("/admin");
        } else {
            router.push("/dashboard");
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserType("traveler");
        router.push("/");
    };

    const navigate = (view: string, data?: any) => {
        setCurrentView(view);

        // Map existing view names to Next.js routes
        switch (view) {
            case "landing":
                router.push("/");
                break;
            case "login":
                setAuthView("login");
                router.push("/login"); // We might use query params or separate routes
                break;
            case "auth":
                if (authView === "login") router.push("/login");
                else if (authView === "register-renter") router.push("/register/renter");
                else if (authView === "register-owner") router.push("/register/owner");
                else router.push("/login");
                break;
            case "signup-selection":
                router.push("/register");
                break;
            case "register-renter":
                router.push("/register/renter");
                break;
            case "register-owner":
                router.push("/register/owner");
                break;
            case "dashboard":
                router.push("/dashboard");
                break;
            case "search":
                router.push("/properties");
                break;
            case "property-detail":
                if (data && data.id) router.push(`/properties/${data.id}`);
                else router.push("/properties"); // Fallback
                break;
            case "profile":
                router.push("/profile");
                break;
            case "my-bookings":
                router.push("/bookings");
                break;
            case "favorites":
                router.push("/favorites");
                break;
            case "messages":
                router.push("/messages");
                break;
            // Add more mappings as needed
            default:
                console.log(`Navigating to view: ${view}`);
            // For views not yet mapped to routes, we might stay on current page or handle differently
        }
    };

    return (
        <UserContext.Provider
            value={{
                userType,
                setUserType,
                isAuthenticated,
                setIsAuthenticated,
                currentView,
                setCurrentView,
                authView,
                setAuthView,
                login,
                logout,
                navigate,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
