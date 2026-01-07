/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { NavSection } from "@/Types/dashboard.interface"
import { getIcon } from "@/lib/icon-map"

interface TeamSwitcherProps {
  teams: NavSection[]
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()

  const [activeTeam, setActiveTeam] = React.useState<NavSection | null>(
    teams.length > 0 ? teams[0] : null
  )


  const ActiveIcon = React.useMemo(() => {
    return getIcon(activeTeam?.items?.[0]?.icon as any)
  }, [activeTeam])


  if (!activeTeam) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {ActiveIcon
                  ? React.createElement(ActiveIcon, { className: "size-4" })
                  : null}
              </div>

              <div className="grid flex-1 text-left text-sm">
                <span className="truncate font-medium">
                  {activeTeam.title ?? "Section"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {activeTeam.items.length} items
                </span>
              </div>

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
            className="min-w-56 rounded-lg"
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Sections
            </DropdownMenuLabel>

            {teams.map((team) => {
              const TeamIcon = getIcon(team.items?.[0]?.icon)

              return (
                <DropdownMenuItem
                  key={team.title}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    {TeamIcon && <TeamIcon className="size-4" />}
                  </div>
                  {team.title ?? "Section"}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
