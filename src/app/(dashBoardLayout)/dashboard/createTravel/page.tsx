import TravelCreateForm from "@/components/modules/Dashboard/CreateTravel";
import { getMyPlan } from "@/services/subscribe/sub.service";



export const dynamic = 'force-dynamic';

const CreateTravelPage = async({searchParams}: {searchParams : Promise<{redirect?:string}>}) => {
  
    const params = await searchParams || {}
    const sub = await getMyPlan()
    return (
        <div>
            <h1 className="text-2xl font-sans font-semibold  text-blue-950 text-center my-7">Create Travels</h1>
           <TravelCreateForm redirect={params.redirect} sub={sub} />
        </div>
    );
};

export default CreateTravelPage;