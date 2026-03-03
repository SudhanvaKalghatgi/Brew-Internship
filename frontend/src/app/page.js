"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";
import { LiquidBackground } from "@/components/liquid-background";
import { FeaturedMovies } from "@/components/featured-movies";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <LiquidBackground />
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center z-10 space-y-8 mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 relative z-10 p-10 md:p-14 rounded-[32px] border border-white/40 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-2xl overflow-hidden"
          >
            {/* Inner glass shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/10 opacity-50 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium shadow-[0_0_15px_rgba(52,211,153,0.15)] dark:shadow-[0_0_15px_rgba(52,211,153,0.3)] backdrop-blur-md"
            >
              <Zap className="h-3.5 w-3.5" /> Powered by AI
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.95] drop-shadow-sm">
              Unlock Movie
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] drop-shadow-lg">
                Intelligence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed relative z-10">
              Discover deep AI-powered insights for any movie. Analyze ratings, cast, sentiment, and more — all in one beautifully crafted platform.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 relative z-10"
            >
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="font-semibold text-lg py-6 px-10 rounded-full shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:shadow-[0_0_40px_rgba(52,211,153,0.6)] transition-shadow duration-300 gap-2 border border-primary/50 text-primary-foreground backdrop-blur-md">
                    <Sparkles className="h-4 w-4" /> Get Started
                  </Button>
                </motion.div>
              </Link>
              <Link href="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="lg" className="font-semibold text-lg py-6 px-10 rounded-full gap-2 bg-white/40 dark:bg-black/10 backdrop-blur-md border border-white/60 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-colors duration-300 text-foreground">
                    Sign In
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </main>

      <div className="w-full">
        <FeaturedMovies />
      </div>

      <Footer />
    </div>
  );
}
