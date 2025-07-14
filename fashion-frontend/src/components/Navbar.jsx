import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

export function Navbar() {
    const navItems = [
        {
            name: "Home",
            link: "/dashboard",
            icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Measurement",
            link: "/measurement",
            icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Preference",
            link: "/preference",
            icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
        {
            name: "Outfit List",
            link: "/outfitlist",
            icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Contact",
            link: "/contact",
            icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
    ];

    return (
        <div className="relative  w-full">
            <FloatingNav navItems={navItems} />
        </div>
    );
}
