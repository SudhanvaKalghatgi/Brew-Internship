"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/login");
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
        return null;
    }

    return <>{children}</>;
}
