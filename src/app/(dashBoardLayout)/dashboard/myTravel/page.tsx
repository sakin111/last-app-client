import MyTravel from "@/components/modules/Dashboard/MyTravel";

export const metadata = { title: "My Travel" };

const MyTravelPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Travel</h1>
      <MyTravel/>
    </div>
  );
}

export default MyTravelPage;
