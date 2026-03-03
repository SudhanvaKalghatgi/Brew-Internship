"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useAuth } from "@/context/auth-context";

const movies = [
    {
        id: "tt0112870",
        name: "Dilwale Dulhania Le Jayenge",
        director: "Aditya Chopra",
        year: "1995",
        genre: "Romance, Drama",
        rating: "8.1",
        poster: "https://m.media-amazon.com/images/M/MV5BMDQyMDI4ZGMtYjI5MS00YTk1LTk3ZDgtZTA3MzQ5YWQ4Y2Q4XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
        id: "tt0169102",
        name: "Lagaan",
        director: "Ashutosh Gowariker",
        year: "2001",
        genre: "Drama, Sport",
        rating: "8.1",
        poster: "https://m.media-amazon.com/images/M/MV5BM2FmODM4OTktOTRjOS00ZTIzLWIzZjAtMDBhOGEzYThkNzMzXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
        id: "tt1187043",
        name: "3 Idiots",
        director: "Rajkumar Hirani",
        year: "2009",
        genre: "Comedy, Drama",
        rating: "8.4",
        poster: "https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
        id: "tt2631186",
        name: "Baahubali: The Beginning",
        director: "S.S. Rajamouli",
        year: "2015",
        genre: "Action, Drama",
        rating: "8.0",
        poster: "https://m.media-amazon.com/images/M/MV5BM2YxZThhZmEtYzM0Yi00OWYxLWI4NGYtM2Y2ZDNmOGE0ZWQzXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
        id: "tt5074352",
        name: "Dangal",
        director: "Nitesh Tiwari",
        year: "2016",
        genre: "Biography, Sport",
        rating: "8.3",
        poster: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SX300.jpg",
    },
    {
        id: "tt2338151",
        name: "PK",
        director: "Rajkumar Hirani",
        year: "2014",
        genre: "Comedy, Drama, Sci-Fi",
        rating: "8.1",
        poster: "https://m.media-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_SX300.jpg",
    },
    {
        id: "tt2395469",
        name: "Gully Boy",
        director: "Zoya Akhtar",
        year: "2019",
        genre: "Drama, Music",
        rating: "7.9",
        poster: "https://m.media-amazon.com/images/M/MV5BOWFkY2M3NDctZGEzMS00M2VmLTgzMTAtZWFiNjVmZDc5NWFjXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
        id: "tt0238936",
        name: "Devdas",
        director: "Sanjay Leela Bhansali",
        year: "2002",
        genre: "Drama, Musical, Romance",
        rating: "7.5",
        poster: "https://m.media-amazon.com/images/M/MV5BODM3ZDE2YjQtMTcyMi00NzdhLWEyYzUtMjIwNjFlNDlmNjgzXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
        id: "tt0292490",
        name: "Dil Chahta Hai",
        director: "Farhan Akhtar",
        year: "2001",
        genre: "Comedy, Drama, Romance",
        rating: "8.1",
        poster: "https://m.media-amazon.com/images/M/MV5BYjY4NzgzNTQtZDhiNi00ZGJiLWIzMWQtNDg3YzkyNTdkZjAyXkEyXkFqcGc@._V1_SX300.jpg",
    },
];

export function CinematicExperience() {
    const [selectedId, setSelectedId] = useState(null);
    const [imageHovered, setImageHovered] = useState(false);
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    const activeMovie = movies.find((m) => m.id === selectedId) ?? null;

    const handleAnalyze = (movieId) => {
        if (isLoggedIn) {
            router.push(`/analyze?id=${movieId}`);
        } else {
            router.push("/login");
        }
    };

    return (
        <section className="w-full bg-black py-20 relative overflow-hidden border-y border-white/10">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[160px] rounded-full" />
            </div>

            {/* Heading */}
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-4"
                >
                    A Cinematic Journey
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-white/50 text-base md:text-lg max-w-xl mx-auto"
                >
                    The masterpieces of Bollywood — stories that transcend generations.
                </motion.p>
            </div>

            {/* Main Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-0 h-[520px] border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#060606]">

                    {/* Names Column */}
                    <div className="flex flex-col w-[200px] sm:w-[240px] shrink-0 border-r border-white/10 overflow-y-auto">
                        {movies.map((movie) => {
                            const isActive = selectedId === movie.id;
                            return (
                                <button
                                    key={movie.id}
                                    onClick={() => {
                                        setSelectedId(isActive ? null : movie.id);
                                        setImageHovered(false);
                                    }}
                                    className={`flex-1 min-h-[56px] flex items-center px-5 cursor-pointer border-b border-white/5 transition-all duration-300 text-left
                    ${isActive
                                            ? "bg-primary/10 border-l-2 border-l-primary"
                                            : "bg-transparent hover:bg-white/5 border-l-2 border-l-transparent"
                                        }`}
                                >
                                    <span
                                        className={`text-sm font-semibold tracking-wide whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-300
                      ${isActive ? "text-primary" : "text-white/30 hover:text-white/60"}`}
                                    >
                                        {movie.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Preview Panel */}
                    <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            {activeMovie ? (
                                <motion.div
                                    key={activeMovie.id}
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                                    className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 p-6 md:p-10"
                                >
                                    {/* Poster */}
                                    <div
                                        onMouseEnter={() => setImageHovered(true)}
                                        onMouseLeave={() => setImageHovered(false)}
                                        className="relative flex-shrink-0 w-[180px] sm:w-[220px] md:w-[250px] rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] cursor-pointer"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={activeMovie.poster}
                                            alt={activeMovie.name}
                                            className={`w-full h-auto object-cover transition-all duration-700 ease-out ${imageHovered ? "grayscale-0 scale-105" : "grayscale"
                                                }`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                                        {/* Hover hint */}
                                        <div
                                            className={`absolute inset-0 flex items-end justify-center pb-4 transition-opacity duration-300 ${imageHovered ? "opacity-0" : "opacity-100"
                                                }`}
                                        >
                                            <span className="text-white/60 text-xs font-medium bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                                                Hover for color
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info Panel */}
                                    <div className="flex flex-col gap-4 text-left max-w-sm">
                                        <div>
                                            <motion.span
                                                initial={{ opacity: 0, y: -6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.08 }}
                                                className="inline-block text-primary text-xs font-mono tracking-widest uppercase mb-3 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full"
                                            >
                                                {activeMovie.year} · {activeMovie.genre}
                                            </motion.span>
                                            <motion.h3
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.12 }}
                                                className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight"
                                            >
                                                {activeMovie.name}
                                            </motion.h3>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.18 }}
                                            className="flex flex-col gap-3 text-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-white/30 text-xs uppercase tracking-widest w-16">Director</span>
                                                <span className="text-white/80 font-medium">{activeMovie.director}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-white/30 text-xs uppercase tracking-widest w-16">Rating</span>
                                                <span className="text-yellow-400 font-bold text-base flex items-center gap-1">
                                                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                                    {activeMovie.rating}
                                                </span>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.22 }}
                                        >
                                            <button
                                                onClick={() => handleAnalyze(activeMovie.id)}
                                                className="inline-flex items-center gap-2 mt-2 font-semibold text-sm text-black bg-primary hover:bg-primary/90 px-6 py-2.5 rounded-full shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-105 active:scale-95"
                                            >
                                                Analyze Film →
                                            </button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center gap-4 text-white/20 select-none pointer-events-none"
                                >
                                    <div className="text-6xl">🎬</div>
                                    <p className="text-lg font-semibold tracking-widest uppercase">
                                        Select a title
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
