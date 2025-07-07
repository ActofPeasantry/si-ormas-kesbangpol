"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconBuilding,
  IconBuildingBank,
  IconReport,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
// import { NavSecondary } from "@/components/nav-secondary";
// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: IconDashboard,
        isActive: pathname === "/",
      },
      {
        title: "Ormas",
        url: "/ormas",
        icon: IconBuilding,
        subitems: [
          {
            title: "Daftar Ormas",
            url: "/ormas",
            isActive: pathname === "/ormas",
          },
          {
            title: "Kelola Dokumen Ormas",
            url: "/ormas/kelola_dokumen",
            isActive: pathname === "/ormas/kelola_dokumen",
          },
          {
            title: "Registrasi Ormas",
            url: "/ormas/tambah",
            isActive: pathname === "/ormas/tambah",
          },
        ],
      },
    ],
    navClouds: [
      {
        title: "Capture",
        icon: IconCamera,
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: IconFileDescription,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: IconFileAi,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
    ],

    documents: [
      {
        name: "Data Library",
        url: "#",
        icon: IconDatabase,
      },
      {
        name: "Reports",
        url: "#",
        icon: IconReport,
      },
      {
        name: "Word Assistant",
        url: "#",
        icon: IconFileWord,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconBuildingBank className="!size-5" />
                <span className="text-base font-semibold">KESBANGPOL</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter><NavUser user={data.user} /></SidebarFooter> */}
    </Sidebar>
  );
}
