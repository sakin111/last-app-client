import { Card, CardContent } from "@/components/ui/card";
import { Heart, DollarSign, Map, Clock, Star, Users } from "lucide-react";

const reasons = [
    {
        icon: Users,
        title: "Find Your Perfect Match",
        description: "Our smart matching algorithm connects you with travelers who share your interests, pace, and travel style.",
    },
    {
        icon: DollarSign,
        title: "Save Money Together",
        description: "Split accommodation, transport, and activity costs with your travel buddy. Travel further for less.",
    },
    {
        icon: Heart,
        title: "Create Lasting Friendships",
        description: "Meet like-minded people from around the world. Many of our users stay friends long after their trips end.",
    },
    {
        icon: Map,
        title: "Discover Hidden Gems",
        description: "Access local knowledge and insider tips from our community. Go beyond tourist spots to authentic experiences.",
    },
    {
        icon: Clock,
        title: "Travel on Your Schedule",
        description: "No fixed tours or rigid itineraries. Plan your own adventure and find buddies who fit your timeline.",
    },
    {
        icon: Star,
        title: "Verified & Trusted",
        description: "Every profile is verified. Read reviews, check ratings, and connect with confidence.",
    },
];

export default function WhyTravelSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4 dark:bg-blue-900/50 dark:text-blue-300">
                        Why Choose Us
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        Why Travel With Us?
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto dark:text-gray-300">
                        Join thousands of travelers who have discovered the joy of exploring the world with the perfect companion.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {reasons.map((reason, index) => (
                        <Card
                            key={index}
                            className="group border border-gray-200 bg-white hover:border-blue-300 hover:shadow-xl transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-blue-500"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <reason.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                            {reason.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
                                            {reason.description}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="/register"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    >
                        Start Your Journey Today
                    </a>
                </div>
            </div>
        </section>
    );
}
