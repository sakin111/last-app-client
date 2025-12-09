"use client";

import * as React from "react";
import { IconFileDescription, IconListDetails } from "@tabler/icons-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

// Map strings → icons here
const ICONS_MAP = {
  FileDescription: IconFileDescription,
  ListDetails: IconListDetails,
};

export function NavSecondary({
  items,
  ...props
}: {
  items: { title: string; url: string; icon: string }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const IconComponent = ICONS_MAP[item.icon as keyof typeof ICONS_MAP];

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    {IconComponent && <IconComponent />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
