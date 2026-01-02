import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingBars } from "./RatingBars";

interface ProfileHeaderProps {
  profile: {
    fullName: string;
    name: string;
    role: string;
    userStatus: "ACTIVE" | "INACTIVE" | "DELETED";
    profileImage?: string;
    ratingBreakdown: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Image
              src={profile.profileImage || "/profile.png"}
              alt={profile.fullName}
              width={96}
              height={96}
              className="rounded-full border border-gray-200 object-cover"
            />

            {profile.userStatus === "ACTIVE" && (
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              {/* Name */}
              <div className="text-center sm:text-left">
                <h1 className="text-lg font-semibold text-gray-900">
                  {profile.fullName}
                </h1>
                <p className="text-sm text-gray-500">
                  @{profile.name}
                </p>

                <div className="mt-2">
                  <Badge
                    variant="outline"
                    className="text-xs border-gray-300 text-gray-700"
                  >
                    {profile.role}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-center sm:justify-end">
                <RatingBars
                  breakdown={
                    profile.ratingBreakdown ?? {
                      5: 0,
                      4: 0,
                      3: 0,
                      2: 0,
                      1: 0,
                    }
                  }
                />

              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
