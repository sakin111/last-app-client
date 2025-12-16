import AllUsers from "@/components/modules/Admin/AllUsers";

export const metadata = { title: "Admin Users" };

export default function AdminUsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Admin Users</h1>
     <AllUsers/>
    </div>
  );
}
