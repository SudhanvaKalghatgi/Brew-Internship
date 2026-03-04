"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

export default function Login() {
    const router = useRouter();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/dashboard");
        }
    }, [isLoggedIn, router]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post("/auth/login", formData);
            toast.success(data.message || "Logged in successfully", {
                position: "top-center"
            });
            setIsLoggedIn(true);
            router.push("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed", {
                position: "top-center"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow flex items-center justify-center p-4 relative pt-20">
                <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-50 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md z-10"
                >
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
                            <CardDescription>
                                Sign in to your account to continue
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        className="h-12"
                                    />
                                </div>
                                <Button type="submit" className="w-full h-12 text-md" disabled={loading}>
                                    {loading ? "Signing in..." : "Sign in"}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground">
                            <Link href="/forgot-password" className="hover:text-primary transition-colors">
                                Forgot password?
                            </Link>
                            <div>
                                Don't have an account?{" "}
                                <Link href="/register" className="text-primary hover:underline font-medium">
                                    Create an account
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
