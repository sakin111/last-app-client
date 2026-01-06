import TravelCreateForm from "@/components/modules/Dashboard/CreateTravel";
import { checkSubscription } from "@/services/subscribe/sub.service";

// Mark this page as dynamic since it uses cookies for subscription check
export const dynamic = 'force-dynamic';

const CreateTravelPage = async({searchParams}: {searchParams : Promise<{redirect?:string}>}) => {
    const checkSub = await checkSubscription();
    const params = await searchParams || {}
    return (
        <div>
            <h1 className="text-2xl font-sans font-semibold  text-blue-950 text-center my-7">Create Travels</h1>
           <TravelCreateForm redirect={params.redirect} checkSub={checkSub}/>
        </div>
    );
};

export default CreateTravelPage;