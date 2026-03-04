"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function ResetPassword() {
    const router = useRouter();
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match", { position: "top-center" });
            return;
        }

        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters", { position: "top-center" });
            return;
        }

        setLoading(true);

        try {
            const { data } = await api.post(`/auth/reset-password/${token}`, {
                password: formData.password,
            });
            toast.success(data.message || "Password reset successful! Please sign in.", {
                position: "top-center"
            });
            router.push("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid or expired reset link. Please request a new one.", {
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
                            <CardTitle className="text-3xl font-bold">Reset password</CardTitle>
                            <CardDescription>
                                Enter your new password below
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="New password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        className="h-12"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Password must be at least 8 characters with at least one letter and one number.
                                </p>
                                <Button type="submit" className="w-full h-12 text-md" disabled={loading}>
                                    {loading ? "Resetting password..." : "Reset password"}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground">
                            <Link href="/login" className="hover:text-primary transition-colors">
                                ← Back to sign in
                            </Link>
                        </CardFooter>
                    </Card>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
