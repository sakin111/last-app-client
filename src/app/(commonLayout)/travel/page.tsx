import TravelSection from "@/components/modules/Travels/TravelSection ";



const TravelPage = () => {
    return (
        <div className="bg-white min-h-screen">
            <h1 className="text-center text-2xl font-semibold py-3 mt-5 ">Travel Feed</h1>
            <div className="text-center w-36 h-px bg-blue-950 mx-auto"></div>
            <TravelSection />
        </div>
    );
};

export default TravelPage;