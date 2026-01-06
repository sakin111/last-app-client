import AdminHome from "@/components/modules/Admin/AdminHome";
import { getAllUserCount } from "@/services/Admin/admin.service";
import { getAllReviews } from "@/services/Dashboard/travel-comments.service";
import { getAllTravels } from "@/services/Dashboard/travel.service";
import { getAllSubCount } from "@/services/subscribe/sub.service";


export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Admin Dashboard",
  description: "Administrator dashboard",
};

export default async function AdminDashboardPage() {


    const users = await getAllUserCount()
    const reviews = await getAllReviews()
    const sub = await getAllSubCount()
    const travels = await getAllTravels()

    if (process.env.NODE_ENV === 'development') {
      console.log(reviews,"this is server");
    }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <AdminHome users={users} reviews={reviews} sub={sub} travels={travels} />
    </div>
  );
}
