
import DashboardNavbar from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";



export const dynamic = "force-dynamic";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <div className="flex h-screen overflow-hidden">
        <DashboardNavbar/>
        <div className=" flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
            <div className="">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CommonDashboardLayout;