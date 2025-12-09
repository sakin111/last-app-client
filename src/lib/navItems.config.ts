

import { NavSection } from "@/Types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "IconLayoutDashboard",
                    roles: ["USER", "ADMIN"],
                },
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "IconSettings", 
                    roles: ["USER"],
                },
            ],
        },
    ]
}



export const userNavItems: NavSection[] = [
    {
        title: "Activity",
        items: [
            {
                title: "MY Activity",
                href: "/dashboard/myActivity",
                icon: "IconJumpRope", 
                roles: ["USER"],
            },
            {
                title: "Create Travel",
                href: "/dashboard/createTravel",
                icon: "IconPencilPlus", 
                roles: ["USER"],
            },
            {
                title: "MY Travel",
                href: "/dashboard/myTravel",
                icon: "IconPlane", 
                roles: ["USER"],
            },
            {
                title: "MY Profile",
                href: "/dashboard/myProfile",
                icon: "IconUserScan", 
                roles: ["USER"],
            },
            {
                title: "My Requests",
                href: "/dashboard/requests",
                icon: "IconBell", 
                roles: ["USER"],
            },
        ],
    },

]

export const adminNavItems: NavSection[] = [
    {
        title: "Admin activity",
        items: [
            {
                title: "Admin Profile",
                href: "/admin/dashboard/profile",
                icon: "IconUserScan", 
                roles: ["ADMIN"],
            },
            {
                title: "Users",
                href: "/admin/dashboard/users",
                icon: "IconUsers", 
                roles: ["ADMIN"],
            },
            {
                title: "All Travel",
                href: "/admin/dashboard/allTravel",
                icon: "IconPlaneTilt", 
                roles: ["ADMIN"],
            },
            {
                title: "All Requests",
                href: "/admin/dashboard/allRequest",
                icon: "IconBell", 
                roles: ["ADMIN"],
            },
        ],
    },
]



export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];

        default:
            return [];
    }
}