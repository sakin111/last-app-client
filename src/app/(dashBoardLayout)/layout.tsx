import DashboardNavbar from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/modeToggle";

export const dynamic = "force-dynamic";

const CommonDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >

      <DashboardNavbar variant="inset" />

      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
            </div>
            <ModeToggle />
          </header>
          <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6 text-foreground">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CommonDashboardLayout;
