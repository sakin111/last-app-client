/* eslint-disable @typescript-eslint/no-explicit-any */

import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAllTravels } from '@/services/Dashboard/travel.service';
import Image from 'next/image';
import { TravelType } from '@/Types';
import { timeAgo } from '@/lib/time-ago';
import ReviewsModal from '@/components/Shared/ReviewsModal';
import RequestButton from '@/components/Shared/RequestButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type TravelSectionProps = {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budgetRange: string;
  travelType: TravelType;
  description: string;
  visibility: boolean;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
    isActive: boolean
    fullName: string;
    profileImage: string;
  };
  location: string;
  content: string;
  image: string;
  comments: number;
  shares: number;
  date: string;
};

const TravelSection = async () => {
  const result = await getAllTravels();

  if (!result?.data || result.data.length === 0) {
    return <div className="text-center p-8">No travels found</div>;
  }

  return (
    <div className="w-full mx-auto bg-white min-h-screen sm:p-4">
      <div className="max-w-2xl mx-auto">
        {result.data.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((travel: TravelSectionProps, idx: number) => (
          <Card
            className="border-0 shadow-none rounded-none border-b border-gray-200 bg-white hover: transition-colors cursor-pointer"
            key={travel.id || idx}
          >
            <CardContent className="p-0">
              <div className="p-3 sm:p-4 flex items-start justify-between">
                <div className="flex gap-2 sm:gap-3 flex-1 min-w-0">
                 <Link href={`/profile/${travel.author.id}`}>
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                    <AvatarImage
                      src={travel.author?.profileImage}
                      alt={travel.author?.name || "User profile picture"}
                    />
                    <AvatarFallback>
                      {travel.author?.name?.charAt(0) || ''}
                    </AvatarFallback>
                  </Avatar>
                 </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900  text-sm sm:text-base truncate">
                        {travel.author.fullName || travel.author.name}
                      </h3>
                      <span className="text-gray-500 text-xs sm:text-sm truncate">
                        @{travel.author.name}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm hidden sm:inline">
                        ·
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {timeAgo(travel.createdAt.toString())}
                      </span>
                      <div className="flex items-center gap-2 ml-2 sm:ml-16 flex-nowrap">
                        <Button
                          variant="outline"
                          className="text-xs sm:text-sm font-sans whitespace-nowrap shrink-0"
                        >

                          {travel.startDate
                            ? new Date(travel.startDate).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                            : "—"}
                        </Button>
                        {"-"}
                        <Button
                          variant="outline"
                          className="text-xs sm:text-sm font-sans whitespace-nowrap shrink-0"
                        >
                          {travel.endDate
                            ? new Date(travel.endDate).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                            : "—"}
                        </Button>
                      </div>

                    </div>

                    {/* Content */}
                    <div className="mt-2">
                      <p className="text-black text-sm sm:text-[15px] leading-normal mb-2 sm:mb-3">
                        {travel.title}
                      </p>
                      <p className="text-gray-700 text-sm sm:text-[15px] leading-normal mb-2 sm:mb-3">
                        {travel.description}
                      </p>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                        <span className="truncate">
                          {travel.destination}
                        </span>
                        <Button variant="outline" className='p-2 font-normal text-sm ml-4 '>
                           {travel.travelType}
                        </Button>
                      </div>

                      {/* Image */}
                      {(travel.image || travel.images?.[0]) && (
                        <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200">
                          <Image
                            src={travel.image || travel.images[0]}
                            alt="Travel post"
                            width={800}
                            height={600}
                            className="w-full h-56 sm:h-80 md:h-96 object-contain sm:object-cover bg-gray-100 "
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-start gap-7 mt-2 sm:mt-3 max-w-full sm:max-w-md">

                        <ReviewsModal targetId={travel.author.id} />

                        <RequestButton travelId={travel.id} />

                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TravelSection;