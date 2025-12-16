import GetRequest from "@/components/modules/Dashboard/GetRequest";

export const metadata = { title: "My Requests" };

const RequestsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">My Requests</h1>
      <GetRequest/>
    </div>
  );
}




export default RequestsPage;