"use client";

import Link from "next/link";
import { type Icon } from "@tabler/icons-react";

// import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import React from "react";
export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    isActive?: boolean;
    subitems?: {
      title: string;
      url: string;
      icon?: Icon;
      isActive?: boolean;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) =>
            item.subitems ? (
              <React.Fragment key={item.title}>
                <Collapsible
                  className="group/collapsible"
                  defaultOpen={item.isActive}
                >
                  <SidebarMenuItem key={item.title}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent
                      className="overflow-hidden transition-all duration-200 ease-in-out
                      data-[state=closed]:animate-collapsible-up
                      data-[state=open]:animate-collapsible-down"
                    >
                      <SidebarMenu>
                        {item.subitems.map((subitem) => (
                          <SidebarMenuSubItem key={subitem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                data-state={
                                  subitem.isActive ? "active" : "inactive"
                                }
                                className="data-[state=active]:bg-primary  data-[state=active]:text-white"
                                href={subitem.url}
                              >
                                {subitem.icon && <subitem.icon />}
                                <span>{subitem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </React.Fragment>
            ) : (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <SidebarMenuButton
                    data-state={item.isActive ? "active" : "inactive"}
                    tooltip={item.title}
                    className="data-[state=active]:bg-primary data-[state=active]:text-white "
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

