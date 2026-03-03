"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Star, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export const featuredMovies = [
    {
        id: "tt0816692",
        title: "Interstellar",
        year: "2014",
        rating: "8.7",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        genre: "Sci-Fi, Drama",
    },
    {
        id: "tt1160419",
        title: "Dune",
        year: "2021",
        rating: "8.0",
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        genre: "Sci-Fi, Adventure",
    },
    {
        id: "tt1856101",
        title: "Blade Runner 2049",
        year: "2017",
        rating: "8.0",
        poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
        genre: "Sci-Fi, Thriller",
    },
    {
        id: "tt0133093",
        title: "The Matrix",
        year: "1999",
        rating: "8.7",
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        genre: "Sci-Fi, Action",
    },
    {
        id: "tt1375666",
        title: "Inception",
        year: "2010",
        rating: "8.8",
        poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        genre: "Sci-Fi, Action",
    },
    {
        id: "tt4633694",
        title: "Spider-Man: Into the Spider-Verse",
        year: "2018",
        rating: "8.4",
        poster: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
        genre: "Animation, Action",
    },
];

export function MovieCard({ movie, index }) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    const handleClick = () => {
        if (isLoggedIn) {
            router.push(`/analyze?id=${movie.id}`);
        } else {
            router.push("/login");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div onClick={handleClick} className="cursor-pointer">
                <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative"
                >
                    <Card className="overflow-hidden border-border/30 hover:border-primary/60 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(52,211,153,0.15)] dark:hover:shadow-[0_20px_40px_rgba(52,211,153,0.2)] cursor-pointer bg-background/50 backdrop-blur-sm">
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                            />
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                            {/* Rating badge */}
                            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-bold text-yellow-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                <Star className="h-3 w-3 fill-yellow-400" /> {movie.rating}
                            </div>

                            {/* Bottom overlay content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                                <p className="text-white/70 text-xs font-medium mb-1">{movie.genre}</p>
                                <p className="text-white text-sm font-semibold flex items-center gap-1">
                                    Analyze <ArrowRight className="h-3 w-3" />
                                </p>
                            </div>
                        </div>
                        <CardContent className="p-3 pt-3">
                            <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-300">{movie.title}</h3>
                            <span className="text-xs text-muted-foreground">{movie.year}</span>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}

export function FeaturedMovies() {
    return (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 w-full mt-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-between mb-8"
            >
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Cinematic Experiences</h2>
                    <p className="text-muted-foreground text-sm mt-1">Visually stunning films selected for AI analysis</p>
                </div>
                <span className="text-sm text-muted-foreground flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium border border-primary/20">
                    <Sparkles className="h-3.5 w-3.5" /> Curated collection
                </span>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                {featuredMovies.map((movie, i) => (
                    <MovieCard key={movie.id} movie={movie} index={i} />
                ))}
            </div>
        </section>
    );
}
