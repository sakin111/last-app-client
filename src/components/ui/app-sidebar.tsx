
import {
  IconInnerShadowTop,
  IconListDetails,
  IconFileDescription,

} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getNavItemsByRole } from "@/lib/navItems.config"
import { getDefaultDashboardRoute } from "@/lib/auth-utils"
import { getUserInfo } from "@/services/Auth/getUserInfo"
import { UserInfo } from "@/Types"
import { NavSection } from "@/Types/dashboard.interface"



export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
 
    const userInfo = (await getUserInfo()) as UserInfo;
    const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  // Build arrays expected by the nav components
  const navMain = navItems
    .flatMap((section) => section.items)
    .slice(0, 6)
    .map((it) => ({ title: it.title, url: it.href }))

  const documents = navItems
    .flatMap((section) => section.items)
    .slice(0, 4)
    .map((it) => ({ name: it.title, url: it.href, icon: IconFileDescription }))

  const navSecondary = navItems
    .slice(1)
    .flatMap((section) => section.items)
    .map((it) => ({ title: it.title, url: it.href, icon: IconListDetails }))

  const user = {
    name: userInfo?.name || "Guest",
    email: userInfo?.email || "guest@example.com",
    avatar: userInfo?.profileImage || "/favicon.ico",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href={dashboardHome}>
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavDocuments items={documents} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
