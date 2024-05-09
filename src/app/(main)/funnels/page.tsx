import React from "react";
import FunnelsTable from "./data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import BlurPage from "@/components/global/blur-page";
import CreateFunnel from "@/components/forms/funnels/create-funnel";

export type FunnelData = {
  name: string;
  updatedAt: string;
  published: string;
};

const Funnels = async ({ params }: { params: { subaccountId: string } }) => {
  const funnels: FunnelData[] = [
    {
      name: "Caching Kit",
      updatedAt: "Today",
      published: "Live",
    },
    {
      name: "Coaching Kit",
      updatedAt: "Today",
      published: "Live",
    },
    {
      name: "SaaS Kit",
      updatedAt: "Today",
      published: "Live",
    },
    {
      name: "PaaS Kit",
      updatedAt: "Today",
      published: "Draft",
    },
  ];

  return (
    <BlurPage>
      <FunnelsTable
        actionButtonText={
          <>
            <Plus size={15} />
            New Funnel
          </>
        }
        modalChildren={<CreateFunnel />}
        filterValue="name"
        columns={columns}
        data={funnels}
      />
    </BlurPage>
  );
};

export default Funnels;
