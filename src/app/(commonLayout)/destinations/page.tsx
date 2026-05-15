import React from 'react';
import Image from 'next/image';
import { MapPin, ArrowRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const destinations = [
    {
        name: 'Bali, Indonesia',
        description: 'The Island of the Gods, where spirituality meets stunning beaches and lush jungles.',
        image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1762333042/file-1762333038535-590325258.jpg',
        matchCount: 142,
        category: 'Beach'
    },
    {
        name: 'Kyoto, Japan',
        description: 'A city of ten thousand shrines, offering a glimpse into Japan’s ancient soul.',
        image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1762329653/file-1762329645646-569200669.jpg',
        matchCount: 89,
        category: 'Culture'
    },
    {
        name: 'Reykjavik, Iceland',
        description: 'Dramatic landscapes of fire and ice, perfect for those seeking raw natural beauty.',
        image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1765046213/a_beautiful_place_in_Chile_where_mountain_exists_no_flowers_suitable_for_computer_device_screen_size_ybvfao.jpg',
        matchCount: 32,
        category: 'Adventure'
    },
    {
        name: 'Zermatt, Switzerland',
        description: 'Home to the iconic Matterhorn, offering world-class skiing and alpine charm.',
        image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1765046114/Gemini_Generated_Image_yxdwwnyxdwwnyxdw_vtnggm.jpg',
        matchCount: 15,
        category: 'Mountains'
    },
    {
        name: 'Phuket, Thailand',
        description: 'Crystal clear waters and vibrant nightlife in the heart of the Andaman Sea.',
        image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1765786099/travel-buddy/travels/hcpaf1lhypsjecvmsebc.jpg',
        matchCount: 120,
        category: 'Beach'
    },
    {
        name: 'Paris, France',
        description: 'The city of light and love, where every street corner tells a story of art and history.',
        image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1762332917/file-1762332910196-56934235.jpg',
        matchCount: 210,
        category: 'City'
    },
];

const DestinationsPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/dmbf41o2r/image/upload/v1762333042/file-1762333038535-590325258.jpg"
                        alt="Destinations Hero"
                        fill
                        className="object-cover opacity-60 dark:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E4B]/40 to-white dark:to-gray-950"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-[#1B2E4B] dark:text-white mb-6 tracking-tighter">
                        Explore the <span className="text-orange-500">World</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
                        Discover your next adventure and find the perfect companion to share it with.
                    </p>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="container mx-auto px-4 -mt-12 relative z-20">
                <div className="bg-white dark:bg-gray-900 p-4 md:p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input 
                            placeholder="Search by country or city..." 
                            className="pl-12 py-6 rounded-2xl border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus-visible:ring-orange-500"
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button variant="outline" className="rounded-2xl py-6 px-6 border-gray-100 dark:border-gray-800 flex gap-2 font-bold">
                            <Filter className="w-5 h-5" /> Filter
                        </Button>
                        <Button className="rounded-2xl py-6 px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/20">
                            Search Matches
                        </Button>
                    </div>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {destinations.map((dest, i) => (
                        <div key={i} className="group bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                            <div className="relative h-[300px] overflow-hidden">
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 dark:text-white shadow-sm">
                                    {dest.category}
                                </div>
                            </div>
                            <div className="p-10 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-[#1B2E4B] dark:text-white">{dest.name}</h3>
                                    <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50 dark:bg-orange-950/20 px-3 py-1 rounded-full">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-xs font-bold">{dest.matchCount} Matches</span>
                                    </div>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed line-clamp-3">
                                    {dest.description}
                                </p>
                                <div className="mt-auto">
                                    <Button variant="link" className="p-0 h-auto text-orange-500 font-bold flex gap-2 group-hover:gap-3 transition-all">
                                        Find a Travel Buddy <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Button className="bg-[#1B2E4B] hover:bg-[#15253d] text-white rounded-full px-12 py-8 text-lg font-bold shadow-xl transition-all">
                        Load More Destinations
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default DestinationsPage;
