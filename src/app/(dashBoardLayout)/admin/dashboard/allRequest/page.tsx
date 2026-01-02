import AllRequests from "@/components/modules/Admin/AllRequest";

export const metadata = { title: "All Requests" };

export default function AdminAllRequestPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">All Requests</h1>
       <AllRequests/>
    </div>
  );
}
