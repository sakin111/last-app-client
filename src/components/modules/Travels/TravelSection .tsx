/* eslint-disable @typescript-eslint/no-explicit-any */

import { MessageCircle, Share2, MapPin, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getAllTravels } from '@/services/Dashboard/travel.service';
import Image from 'next/image';
import { TravelType } from '@/Types';

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
  user: {
    id:string;
    name : string;
    email:string;
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
    <div className="w-full mx-auto bg-gray-50 min-h-screen sm:p-4">
      <div className="max-w-2xl mx-auto">
        {result.data.map((travel: TravelSectionProps, idx: number) => (
          <Card
            className="border-0 shadow-none rounded-none border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            key={travel.id || idx}
          >
            <CardContent className="p-0">
              <div className="p-3 sm:p-4 flex items-start justify-between">
                <div className="flex gap-2 sm:gap-3 flex-1 min-w-0">
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                    <AvatarImage
                      src={travel.user?.profileImage}
                      alt={travel.user?.name}
                    />
                    <AvatarFallback>
                      {travel.user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900 hover:underline text-sm sm:text-base truncate">
                        {travel.user?.name}
                      </h3>
                      <span className="text-gray-500 text-xs sm:text-sm truncate">
                        @{travel.user?.name}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm hidden sm:inline">
                        ·
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {travel.date}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-2">
                      <p className="text-gray-900 text-sm sm:text-[15px] leading-normal mb-2 sm:mb-3">
                        {travel.description || travel.content}
                      </p>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                        <span className="truncate">
                          {travel.destination}
                        </span>
                      </div>

                      {/* Image */}
                      {(travel.image || travel.images?.[0]) && (
                        <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200">
                          <Image
                            src={travel.image || travel.images[0]}
                            alt="Travel post"
                            width={800}
                            height={600}
                            className="w-full h-64 sm:h-80 md:h-96 object-cover"
                          />
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-2 sm:mt-3 max-w-full sm:max-w-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 sm:px-3"
                        >
                          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-xs sm:text-sm">
                            {travel.comments || 0}
                          </span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-green-600 hover:bg-green-50 px-2 sm:px-3"
                        >
                          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-xs sm:text-sm hidden sm:inline">
                            {travel.shares || 0}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 -mt-1 h-8 w-8 sm:h-10 sm:w-10 shrink-0"
                >
                  <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TravelSection;