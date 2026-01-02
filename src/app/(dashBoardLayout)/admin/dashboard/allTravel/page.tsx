import TravelsClient from "@/components/modules/Travels/TravelsClients";
import { getTravels } from "@/services/Dashboard/travel.service";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function TravelsPage({ searchParams }: PageProps) {

  const params = await searchParams;
  
  const { data, meta } = await getTravels(params);

  return (
    <TravelsClient
      travels={data}
      meta={meta}
    />
  );
}