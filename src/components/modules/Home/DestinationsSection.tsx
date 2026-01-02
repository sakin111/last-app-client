"use client"

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

interface Destination {
  name: string;
  image: string;
}

const destinations: Destination[] = [
  { name: 'Bali, Indonesia', image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1762333042/file-1762333038535-590325258.jpg'},
  { name: 'Paris, France', image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1762332917/file-1762332910196-56934235.jpg' },
  { name: 'Tokyo, Japan', image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1762329653/file-1762329645646-569200669.jpg'},
  { name: 'New York, USA', image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1765046114/Gemini_Generated_Image_yxdwwnyxdwwnyxdw_vtnggm.jpg'},
  { name: 'Barcelona, Spain', image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1765046213/a_beautiful_place_in_Chile_where_mountain_exists_no_flowers_suitable_for_computer_device_screen_size_ybvfao.jpg'},
  { name: 'Dubai, UAE', image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1765786099/travel-buddy/travels/hcpaf1lhypsjecvmsebc.jpg' },
  { name: 'Sydney, Australia', image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1765957511/travel-buddy/travels/db8stfkjxl3vhjzgcnet.jpg'},
  { name: 'London, UK', image: 'https://res.cloudinary.com/dmbf41o2r/image/upload/v1766859647/travel-buddy/travels/kbtxt71oiazxeanlrquj.jpg'},
];

const DestinationsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-liner-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-liner-to-r from-blue-600 to-indigo-600">
            Popular Destinations
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover where travelers are heading next
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {destinations.map((destination, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
           
              <Image
                src={destination.image}
                alt={destination.name}
                 fill={true}
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-500"
              />
              
              <div className={`absolute inset-0 bg-liner-to-t transition-all duration-300 ${
                hoveredIndex === index 
                  ? 'from-blue-900/90 via-blue-800/50 to-transparent' 
                  : 'from-black/70 via-black/30 to-transparent'
              }`}></div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="text-white transform transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    <h3 className="font-semibold text-lg">{destination.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DestinationsSection;