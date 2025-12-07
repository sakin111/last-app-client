

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
                    icon: "LayoutDashboard",
                    roles: ["USER", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER","ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", 
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
                icon: "Calendar", 
                roles: ["USER"],
            },
            {
                title: "MY Travel",
                href: "/dashboard/myTravel",
                icon: "Plane ", 
                roles: ["USER"],
            },
            {
                title: "MY Profile",
                href: "/dashboard/myProfile",
                icon: "User", 
                roles: ["USER"],
            },
            {
                title: "My Requests",
                href: "/dashboard/requests",
                icon: "ClipboardList", 
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
                title: "Admins",
                href: "/admin/dashboard/profile",
                icon: "Shield", 
                roles: ["ADMIN"],
            },
            {
                title: "Admins",
                href: "/admin/dashboard/users",
                icon: "Shield", 
                roles: ["ADMIN"],
            },
            {
                title: "Admins",
                href: "/admin/dashboard/allTravel",
                icon: "Stethoscope", 
                roles: ["ADMIN"],
            },
            {
                title: "Admins",
                href: "/admin/dashboard/allRequest",
                icon: "Users", 
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