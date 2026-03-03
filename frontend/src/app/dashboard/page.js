"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, TrendingUp, Star, Clock, Film, ArrowRight } from "lucide-react";
import { CinematicExperience } from "@/components/cinematic-experience";
import { ProtectedRoute } from "@/components/protected-route";

const stats = [
    { label: "Movies Analyzed", value: "10K+", icon: Film, color: "from-emerald-500 to-teal-600" },
    { label: "Average Rating", value: "8.5", icon: Star, color: "from-amber-400 to-yellow-600" },
    { label: "AI Insights", value: "50K+", icon: Sparkles, color: "from-teal-400 to-emerald-600" },
    { label: "Trending Now", value: "24/7", icon: TrendingUp, color: "from-orange-400 to-amber-600" },
];

function StatCard({ stat, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                <Card className="border-border/30 bg-background/50 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 overflow-hidden relative group cursor-default">
                    {/* Background gradient glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
                    <CardContent className="flex items-center gap-4 p-5 relative z-10">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                            <stat.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}

export default function Dashboard() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    return (
        <ProtectedRoute>
            <div className="flex flex-col min-h-screen bg-background text-foreground">
                <Navbar />

                <main className="flex-grow">
                    {/* Hero Section with Parallax */}
                    <motion.section
                        ref={heroRef}
                        style={{ opacity: heroOpacity, scale: heroScale }}
                        className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
                    >
                        {/* Animated gradient blobs */}
                        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
                        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between"
                        >
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
                                >
                                    <Sparkles className="h-3.5 w-3.5" /> AI-Powered Platform
                                </motion.div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                    Your Movie
                                    <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
                                        Intelligence Hub
                                    </span>
                                </h1>
                                <p className="text-muted-foreground mt-3 text-lg max-w-lg">
                                    Discover, explore, and unlock AI-powered insights for any movie in seconds.
                                </p>
                            </div>
                            <Link href="/analyze" className="mt-6 md:mt-0">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                                    <Button size="lg" className="font-semibold gap-2 shadow-lg shadow-primary/25 px-8 py-6 text-base rounded-full">
                                        <Sparkles className="h-4 w-4" /> Analyze a Movie
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </motion.section>

                    {/* Stats Section */}
                    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <StatCard key={stat.label} stat={stat} index={i} />
                            ))}
                        </div>
                    </section>

                    <div className="w-full">
                        {/* Cinematic Journey Section */}
                        <CinematicExperience />
                    </div>

                </main>

                <Footer />
            </div>
        </ProtectedRoute>
    );
}
