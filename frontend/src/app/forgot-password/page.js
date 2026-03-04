"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post("/auth/forgot-password", { email });
            toast.success(data.message || "If the email is registered, a reset link has been sent.", {
                position: "top-center"
            });
            setSubmitted(true);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong. Please try again.", {
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
                            <CardTitle className="text-3xl font-bold">Forgot password</CardTitle>
                            <CardDescription>
                                {submitted
                                    ? "Check your email for a reset link"
                                    : "Enter your email and we'll send you a reset link"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center space-y-4"
                                >
                                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-primary"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        If <span className="font-medium text-foreground">{email}</span> is registered, you'll receive a password reset link shortly.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="w-full h-12"
                                        onClick={() => {
                                            setSubmitted(false);
                                            setEmail("");
                                        }}
                                    >
                                        Try another email
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={loading}
                                            className="h-12"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-12 text-md" disabled={loading}>
                                        {loading ? "Sending link..." : "Send reset link"}
                                    </Button>
                                </form>
                            )}
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
