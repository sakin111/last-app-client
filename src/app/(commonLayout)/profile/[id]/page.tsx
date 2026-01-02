import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileInterests } from "@/components/Profile/ProfileInterests";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { countryMap } from "@/constants/countries";

async function getPublicProfile(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/profile/public/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    const json = await res.json();
  return json.data

  } catch {
    return null;
  }
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const profile = await getPublicProfile(id);

  if (!profile) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        <ProfileHeader profile={profile} />

        {profile.bio && (
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-2">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {profile.bio}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInterests
            title="Travel Interests"
            items={profile.travelInterests ?? []}
          />

          <ProfileInterests
            title="Visited Countries"
             items={profile.visitedCountries.map((code: string | number) => countryMap[code] || code)}
          />
        </div>

        <Separator />
    
      </div>
    </div>
  );
}
