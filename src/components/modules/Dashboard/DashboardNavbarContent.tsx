"use client";

import React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { UserInfo } from "@/Types";
import { NavSection } from "@/Types/dashboard.interface";
import { Icon, IconHome2} from "@tabler/icons-react";
import Link from "next/link";
import { getIcon } from "@/lib/icon-map";

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboard?: string;
}

const DashboardNavbarContent: React.FC<DashboardNavbarContentProps & React.ComponentProps<typeof Sidebar>> = ({
  userInfo,
  navItems = [],
  ...props
}) => {




  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <IconHome2 className="size-5!" />
              <span className="text-base font-semibold">Typers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={navItems.flatMap((section) => section.items).map((it) => ({
            title: it.title,
            url: it.href,
            icon: getIcon(it.icon) as string | Icon
          }))}
        />


      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: userInfo.data.name || "Guest",
            email: userInfo.data.email || "",
            avatar: (userInfo as UserInfo).data.profileImage || "/favicon.ico",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
};

export default DashboardNavbarContent;