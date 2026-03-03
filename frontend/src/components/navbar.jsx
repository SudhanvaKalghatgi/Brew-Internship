"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/context/auth-context";

export function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/60 dark:bg-black/40 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-xl font-semibold tracking-tight">
                            Br<span className="text-primary">ew</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push(isLoggedIn ? "/dashboard" : "/login")}
                            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => router.push(isLoggedIn ? "/analyze" : "/login")}
                            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                        >
                            Analyze
                        </button>
                        <ThemeToggle />
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
