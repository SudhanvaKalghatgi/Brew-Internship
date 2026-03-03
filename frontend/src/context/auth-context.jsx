"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    logout: () => { },
});

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // On mount, check if we have an active session by trying a lightweight request
    // Since auth is cookie-based, we just track it locally after login
    useEffect(() => {
        const stored = localStorage.getItem("isLoggedIn");
        if (stored === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
    }, [isLoggedIn]);

    // Listen for 401 events from the API interceptor
    useEffect(() => {
        const handler = () => {
            setIsLoggedIn(false);
        };
        window.addEventListener("auth-unauthorized", handler);
        return () => window.removeEventListener("auth-unauthorized", handler);
    }, []);

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch {
            // ignore
        }
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
