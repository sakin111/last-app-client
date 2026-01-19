import TravelSection from "@/components/modules/Travels/TravelSection ";
import { checkSubscription } from "@/services/subscribe/sub.service";


export const dynamic = 'force-dynamic';

const TravelPage = async () => {

    const checkSub = await checkSubscription();
    return (
        <div className="bg-background min-h-screen">
            <h1 className="text-center text-2xl font-semibold py-3 mt-5 text-foreground">Explore Travel Plans</h1>
            <div className="text-center w-36 h-px bg-primary mx-auto"></div>
            <TravelSection checkSub={checkSub} />
        </div>
    );
};

export default TravelPage;