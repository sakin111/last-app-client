import TravelSection from "@/components/modules/Travels/TravelSection ";
import { checkSubscription } from "@/services/subscribe/sub.service";

// Mark this page as dynamic since it uses cookies
export const dynamic = 'force-dynamic';

const TravelPage = async () => {

    const checkSub = await checkSubscription();
    return (
        <div className="bg-white min-h-screen">
            <h1 className="text-center text-2xl font-semibold py-3 mt-5 dark:text-white bg-black ">Explore Travel Plans</h1>
            <div className="text-center w-36 h-px bg-blue-950 mx-auto"></div>
            <TravelSection  checkSub={checkSub}/>
        </div>
    );
};

export default TravelPage;