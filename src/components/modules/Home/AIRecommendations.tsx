"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, MapPin, Compass, RefreshCw } from "lucide-react";
import { getAIAdventureRecommendations } from "@/services/Dashboard/ai.service";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Recommendation {
    id: string;
    title: string;
    description: string;
    location: string;
    type: string;
    difficulty: "Easy" | "Moderate" | "Challenging";
}

const AIRecommendations = () => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const result = await getAIAdventureRecommendations();
            if (result.success && result.data) {
                setRecommendations(result.data);
            }
        } catch (error) {
            console.error("Failed to fetch AI recommendations", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    return (
        <section className="py-20 bg-gradient-to-b from-background to-accent/5 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 mb-4 border border-primary/20">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-sm font-semibold uppercase tracking-wider">AI Powered</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                            AI Adventure Recommendations
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Our travel AI has curated these personalized adventures just for you based on global trends and expert insights.
                        </p>
                    </div>
                    <button
                        onClick={fetchRecommendations}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        <span>Generate New</span>
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-[320px] rounded-3xl border border-border bg-card p-6 space-y-4">
                                <Skeleton className="h-8 w-3/4 rounded-lg" />
                                <Skeleton className="h-4 w-1/2 rounded-md" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </div>
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <Skeleton className="h-10 w-full rounded-xl mt-auto" />
                            </div>
                        ))}
                    </div>
                ) : recommendations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recommendations.map((rec, index) => (
                            <div
                                key={rec.id || index}
                                className="group relative overflow-hidden rounded-3xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 p-6 flex flex-col h-full"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Compass className="h-24 w-24 -rotate-12" />
                                </div>

                                <div className="mb-4">
                                    <Badge variant="secondary" className="mb-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none">
                                        {rec.type || "Adventure"}
                                    </Badge>
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {rec.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                        <MapPin className="h-4 w-4" />
                                        <span>{rec.location}</span>
                                    </div>
                                </div>

                                <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                                    {rec.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">Difficulty:</span>
                                        <span className={`text-sm font-bold ${rec.difficulty === "Easy" ? "text-green-500" :
                                            rec.difficulty === "Challenging" ? "text-red-500" : "text-amber-500"
                                            }`}>
                                            {rec.difficulty || "Moderate"}
                                        </span>
                                    </div>
                                    <button className="text-primary font-semibold text-sm hover:underline">
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-accent/10 rounded-3xl border border-dashed border-border">
                        <Compass className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                        <h3 className="text-xl font-semibold mb-2">No recommendations found</h3>
                        <p className="text-muted-foreground">Try refreshing or check back later.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AIRecommendations;
