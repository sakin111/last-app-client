import { Button } from "@/components/ui/button";


export const dynamic = "force-dynamic";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className=" overflow-hidden">
      <div className="overflow-hidden">
        <main className="overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;