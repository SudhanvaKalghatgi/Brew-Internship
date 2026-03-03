"use client";

import { motion } from "framer-motion";

export function LiquidBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            {/* Base noise texture for a premium look */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-0 pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <div className="absolute inset-0 z-0">
                {/* Liquid morphing blob 1 */}
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-br from-primary/30 via-emerald-600/20 to-teal-900/40 blur-[90px] mix-blend-screen liquid-shape"
                    style={{
                        animation: "morph 15s ease-in-out infinite",
                    }}
                />

                {/* Liquid morphing blob 2 */}
                <motion.div
                    animate={{
                        rotate: -360,
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-gradient-to-tl from-accent/20 via-yellow-600/20 to-orange-800/30 blur-[100px] mix-blend-screen liquid-shape"
                    style={{
                        animation: "morph 18s ease-in-out infinite reverse",
                    }}
                />

                {/* Center liquid blob */}
                <motion.div
                    animate={{
                        x: ["-10%", "10%", "-10%"],
                        y: ["-5%", "15%", "-5%"],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[25%] w-[50vw] h-[50vw] bg-gradient-to-tr from-cyan-500/20 to-primary/20 blur-[120px] mix-blend-screen liquid-shape"
                    style={{
                        animation: "morph 12s ease-in-out infinite",
                    }}
                />
            </div>

            <style jsx>{`
        .liquid-shape {
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }
        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
      `}</style>
        </div>
    );
}
