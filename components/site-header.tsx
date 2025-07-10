import React from "react";
import Link from "next/link";
import { NavUser } from "@/components/nav-user";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DarkModeToggle } from "./dark-mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Breadcrumb = {
  title: string;
  url: string;
};

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function SiteHeader({ breadcrumb }: { breadcrumb?: Breadcrumb[] }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb?.map((item, index) => (
              <React.Fragment key={item.title}>
                <BreadcrumbItem>
                  {index === breadcrumb.length - 1 ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    // shadcn BreadcrumbLink sucks. use nextJS Link instead
                    <Link href={item.url}>{item.title}</Link>
                  )}
                </BreadcrumbItem>
                {index !== breadcrumb.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <NavUser user={data.user} />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
