

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
    ]
}



export const userNavItems: NavSection[] = [
    {
        title: "Activity",
        items: [
            {
                title: "Create Travel",
                href: "/dashboard/createTravel",
                icon: "IconPencilPlus", 
                roles: ["USER"],
            },
            {
                title: "My Travel",
                href: "/dashboard/myTravel",
                icon: "IconPlane", 
                roles: ["USER"],
            },
            {
                title: "My Profile",
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
            {
                title: "Subscription Plan",
                href: "/dashboard/subscriptionPlan",
                icon: "IconCoinFilled", 
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
            {
                title: "Create Subscription",
                href: "/admin/dashboard/subscription",
                icon: "IconCoinFilled", 
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