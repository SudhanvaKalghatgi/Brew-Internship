"use client";

import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Film, Sparkles, AlertCircle, Star, Calendar, Users } from "lucide-react";
import { ProtectedRoute } from "@/components/protected-route";

function AnalyzeContent() {
    const searchParams = useSearchParams();
    const [imdbId, setImdbId] = useState("");
    const [loading, setLoading] = useState(false);
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
        const id = searchParams.get("id");
        if (id) {
            setImdbId(id);
        }
    }, [searchParams]);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!/^tt\d{7,8}$/.test(imdbId)) {
            toast.error("Invalid IMDb ID format. Must start with 'tt' followed by 7-8 digits.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post("/movie/analyze", { imdbId });
            setMovieData(data.data);
            toast.success("Insights fully loaded", { position: "top-center" });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to analyze movie", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    const movie = movieData?.movie;
    const insights = movieData?.insights;

    return (
        <ProtectedRoute>
            <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
                <Navbar />

                <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        <div className="lg:col-span-4 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-3xl font-bold tracking-tight mb-2">Analyze Movie</h2>
                                <p className="text-muted-foreground">
                                    Enter an IMDb ID to generate AI-powered insights for any movie.
                                </p>
                            </motion.div>

                            <Card className="border-border/50 shadow-md">
                                <CardContent className="pt-6">
                                    <form onSubmit={handleAnalyze} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">IMDb ID</label>
                                            <div className="relative">
                                                <Film className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    placeholder="e.g. tt0111161"
                                                    value={imdbId}
                                                    onChange={(e) => setImdbId(e.target.value)}
                                                    className="pl-10"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full" disabled={loading || !imdbId}>
                                            {loading ? (
                                                <span className="flex items-center gap-2">
                                                    <Sparkles className="h-4 w-4 animate-spin" /> Analyzing...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <Sparkles className="h-4 w-4" /> Analyze Movie
                                                </span>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            <Card className="bg-muted/30 border-none shadow-none">
                                <CardContent className="pt-6 flex gap-3 text-sm text-muted-foreground">
                                    <AlertCircle className="h-5 w-5 shrink-0 text-primary" />
                                    <p>
                                        To find an IMDb ID, go to any movie page on imdb.com and look at the URL. It's the part that looks like <code className="bg-background px-1 py-0.5 rounded text-foreground">tt1234567</code>.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-8">
                            <AnimatePresence mode="wait">
                                {movie ? (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-6"
                                    >
                                        <Card className="overflow-hidden border-border/50 shadow-lg">
                                            <div className="flex flex-col md:flex-row">
                                                {movie.poster && (
                                                    <div className="relative w-full md:w-[280px] aspect-[2/3] md:aspect-auto md:min-h-[420px] shrink-0 bg-muted">
                                                        <img
                                                            src={movie.poster}
                                                            alt={movie.title || "Movie poster"}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <h3 className="text-3xl font-bold tracking-tight">{movie.title}</h3>
                                                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                                                                {movie.releaseYear && (
                                                                    <span className="flex items-center gap-1">
                                                                        <Calendar className="h-4 w-4" /> {movie.releaseYear}
                                                                    </span>
                                                                )}
                                                                {movie.rating && (
                                                                    <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                                                                        <Star className="h-4 w-4 fill-yellow-500" /> {Number(movie.rating).toFixed(1)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {movie.overview && (
                                                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                                                {movie.overview}
                                                            </p>
                                                        )}

                                                        {movie.cast && movie.cast.length > 0 && (
                                                            <div>
                                                                <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                                                                    <Users className="h-4 w-4" /> Cast
                                                                </h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {movie.cast.map((actor, i) => (
                                                                        <span
                                                                            key={i}
                                                                            className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border/50"
                                                                        >
                                                                            {actor}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>

                                        {insights && (
                                            <Card className="border-border/50 shadow-lg overflow-hidden relative">
                                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                                                <CardHeader className="pb-4 border-b border-border/30 bg-muted/10 relative z-10">
                                                    <div className="flex items-center justify-between">
                                                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                                                            <Sparkles className="h-5 w-5 text-primary" /> AI Insights
                                                        </CardTitle>
                                                        <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                                                            {insights.sentiment === "positive" ? "😊 Positive" : insights.sentiment === "negative" ? "😞 Negative" : "😐 Neutral"}
                                                        </span>
                                                    </div>
                                                </CardHeader>

                                                <CardContent className="pt-6 relative z-10">
                                                    <p className="text-foreground leading-relaxed text-sm md:text-base">
                                                        {insights.summary}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full min-h-[400px] border border-dashed border-border/60 rounded-3xl flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-muted/10"
                                    >
                                        <div className="w-16 h-16 rounded-full border border-border/50 bg-background flex items-center justify-center mb-4 shadow-sm">
                                            <Film className="h-8 w-8 text-muted-foreground/50" />
                                        </div>
                                        <h3 className="text-lg font-medium text-foreground mb-1">No Data Yet</h3>
                                        <p className="max-w-sm">
                                            Enter an IMDb ID and click &quot;Analyze Movie&quot; to generate detailed insights powered by AI.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </ProtectedRoute>
    );
}

export default function Analyze() {
    return (
        <Suspense fallback={null}>
            <AnalyzeContent />
        </Suspense>
    );
}