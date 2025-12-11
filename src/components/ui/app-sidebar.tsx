import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import DashboardNavbarContent from "../modules/Dashboard/DashboardNavbarContent";
import { getUserInfo } from "@/services/Auth/getUserInfo";
import { UserInfo } from "@/Types";


const DashboardNavbar = async ({...props}) => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItems = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
      {...props}
    />
  );
};

export default DashboardNavbar;