import TravelSection from "@/components/modules/Travels/TravelSection ";

export const dynamic = 'force-dynamic';

const TravelPage = async () => {
    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen pt-28 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mb-16">
                    <h1 className="text-5xl font-black text-[#1B2E4B] dark:text-white tracking-tighter mb-6">
                        Explore <span className="text-orange-500">Travel Plans</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
                        Connect with travelers heading to the same destinations. Filter by budget, date, and travel style to find your perfect match.
                    </p>
                </div>
                <TravelSection />
            </div>
        </div>
    );
};

export default TravelPage;