"use client";

import { IconFileDescription, IconListDetails } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";


const ICONS_MAP = {
  FileDescription: IconFileDescription,
  ListDetails: IconListDetails,
};

export function NavDocuments({
  items,
}: {
  items: { name: string; url: string; icon: string }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const IconComponent = ICONS_MAP[item.icon as keyof typeof ICONS_MAP];

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {IconComponent && <IconComponent />}
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
