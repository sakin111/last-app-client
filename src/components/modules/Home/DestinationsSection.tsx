"use client"

import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const destinations = [
  { 
    name: 'Bali, Indonesia', 
    description: 'Explore the serene and spiritual soul of Bali.',
    image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1762333042/file-1762333038535-590325258.jpg',
    large: true
  },
  { 
    name: 'Kyoto, Japan', 
    description: 'Tradition meets modern elegance.',
    image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1762329653/file-1762329645646-569200669.jpg' 
  },
  { 
    name: 'Iceland', 
    count: '32 matches available',
    image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1765046213/a_beautiful_place_in_Chile_where_mountain_exists_no_flowers_suitable_for_computer_device_screen_size_ybvfao.jpg' 
  },
  { 
    name: 'Switzerland', 
    count: '15 matches available',
    image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1765046114/Gemini_Generated_Image_yxdwwnyxdwwnyxdw_vtnggm.jpg' 
  },
  { 
    name: 'Thailand', 
    count: '120 matches available',
    image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1765786099/travel-buddy/travels/hcpaf1lhypsjecvmsebc.jpg' 
  },
];

const DestinationsSection = () => {
  return (
    <section className="py-24 bg-gray-100 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1B2E4B] dark:text-white">
            Trending Destinations
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto dark:text-gray-400">
            Visit perfectly live travel spots before they're crowded.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {/* Main Large Card */}
          <div className="md:col-span-2 lg:col-span-4 relative group overflow-hidden rounded-[2.5rem] h-[400px] cursor-pointer shadow-xl">
            <Image
              src={destinations[0].image}
              alt={destinations[0].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <h3 className="text-4xl font-bold text-white mb-3">{destinations[0].name}</h3>
              <p className="text-white/80 text-lg mb-6 max-w-md">{destinations[0].description}</p>
              <button className="flex items-center gap-2 text-orange-400 font-bold group-hover:gap-3 transition-all">
                Explore Partners <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Secondary Medium Card */}
          <div className="md:col-span-1 lg:col-span-2 relative group overflow-hidden rounded-[2.5rem] h-[400px] cursor-pointer shadow-xl">
            <Image
              src={destinations[1].image}
              alt={destinations[1].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <h3 className="text-2xl font-bold text-white mb-2">{destinations[1].name}</h3>
              <p className="text-white/80 text-sm">{destinations[1].description}</p>
            </div>
          </div>

          {/* Small Grid Cards */}
          {destinations.slice(2).map((dest, i) => (
            <div key={i} className="md:col-span-1 lg:col-span-2 relative group overflow-hidden rounded-[2.5rem] h-[280px] cursor-pointer shadow-lg">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-xl font-bold text-white mb-1">{dest.name}</h3>
                <p className="text-white/70 text-xs font-medium uppercase tracking-wider">{dest.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DestinationsSection;