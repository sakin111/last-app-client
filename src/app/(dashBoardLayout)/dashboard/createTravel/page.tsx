import TravelCreateForm from "@/components/modules/Dashboard/CreateTravel";



export const dynamic = 'force-dynamic';

const CreateTravelPage = async({searchParams}: {searchParams : Promise<{redirect?:string}>}) => {
  
    const params = await searchParams || {}
    return (
        <div>
            <h1 className="text-2xl font-sans font-semibold  text-blue-950 text-center my-7">Create Travels</h1>
           <TravelCreateForm redirect={params.redirect} />
        </div>
    );
};

export default CreateTravelPage;