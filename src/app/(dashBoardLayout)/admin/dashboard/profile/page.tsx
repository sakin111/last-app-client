import Profile from "@/components/modules/Dashboard/Profile";

export const metadata = { title: "Admin Profile" };

export default function AdminProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Admin Profile</h1>
      <Profile/>
    </div>
  );
}
