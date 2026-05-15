"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Star, UserPlus } from "lucide-react";
import { getAIAdventureRecommendations } from "@/services/Dashboard/ai.service";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AIRecommendations = () => {
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const result = await getAIAdventureRecommendations();
            if (result.success && result.data) {
                setRecommendations(result.data.slice(0, 3));
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

    // Static data for design if API is slow/empty
    const displayData = recommendations.length > 0 ? recommendations : [
        {
            name: "Elena",
            age: 24,
            location: "Japan",
            match: "98%",
            image: "https://res.cloudinary.com/dmbf41o2r/image/upload/v1762329653/file-1762329645646-569200669.jpg",
            tags: ["Photography", "Culture", "Boutique Hotels"]
        },
        {
            name: "Marcus",
            age: 27,
            location: "Iceland",
            match: "95%",
            image: "https://res.cloudinary.com/dmbf41o2r/image/upload/v1765046213/a_beautiful_place_in_Chile_where_mountain_exists_no_flowers_suitable_for_computer_device_screen_size_ybvfao.jpg",
            tags: ["Hiking", "Backpacking", "Nature"]
        },
        {
            name: "Sofia",
            age: 26,
            location: "Bali",
            match: "92%",
            image: "https://res.cloudinary.com/dmbf41o2r/image/upload/v1762333042/file-1762333038535-590325258.jpg",
            tags: ["Yoga", "Wellness", "Surfing"]
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-[#1B2E4B] dark:text-white mb-6">
                    Top Potential Matches
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
                    You don't just find travelers; we find travel counterparts who align with your lifestyle and expectations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {displayData.map((match, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none group transition-all duration-500 hover:-translate-y-2">
                            <div className="relative h-[300px]">
                                <Image
                                    src={match.image || match.location_image || ""}
                                    alt={match.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-sm border border-white/20">
                                    {match.match || "90%"} Match
                                </div>
                            </div>
                            <div className="p-8 text-left">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                            {match.name || match.title}, {match.age || 25}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm font-medium">{match.location || "Worldwide"}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                                        ))}
                                        <span className="text-xs font-bold text-gray-400 ml-1">(45+)</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {(match.tags || ["Traveler", "Adventurer"]).map((tag: string) => (
                                        <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-full border border-gray-200/50 dark:border-gray-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Button className="w-full bg-[#1B2E4B] hover:bg-[#15253d] text-white rounded-full py-6 font-bold transition-all shadow-lg hover:shadow-[#1B2E4B]/20">
                                    View Profile
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AIRecommendations;
