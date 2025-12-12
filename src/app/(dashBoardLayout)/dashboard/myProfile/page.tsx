import Profile from "@/components/modules/Dashboard/Profile";

export const metadata = { title: "My Profile (Dashboard)" };

const MyProfileDashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <Profile/>
    </div>
  );
}




export default MyProfileDashboardPage;