import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import DashboardNavbarContent from "../modules/Dashboard/DashboardNavbarContent";
import { UserInfo } from "@/Types";
import { getUserProfile } from "@/services/Dashboard/profile.service";


const DashboardNavbar = async ({...props}) => {
  const userInfo = (await getUserProfile()) as UserInfo;
  const navItems = getNavItemsByRole(userInfo.role);
  const dashboard = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboard={dashboard}
      {...props}
    />
  );
};

export default DashboardNavbar;