"use server";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FormCard } from "./FormCard";
import { getCurrentUser } from "@/lib/auth/action";

const breadcrumb = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Profile",
    url: "/profile",
  },
];

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        {/* <CardDescription /> */}
        <SiteHeader breadcrumb={breadcrumb} />
        <FormCard user={user} />
      </SidebarInset>
    </SidebarProvider>
  );
}
