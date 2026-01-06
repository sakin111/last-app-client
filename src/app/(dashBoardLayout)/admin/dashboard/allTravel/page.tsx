import TravelsClient from "@/components/modules/Travels/TravelsClients";
import { getTravels } from "@/services/Dashboard/travel.server";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function TravelsPage() {


  


  return (
    <TravelsClient
   
    />
  );
}