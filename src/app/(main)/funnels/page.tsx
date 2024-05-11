"use client";
import React, { useEffect, useState } from "react";
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

const Funnels = ({ params }: { params: { subaccountId: string } }) => {
  const initialFunnels: FunnelData[] = [
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

  const [funnelData, setFunnelData] = useState<FunnelData[]>(initialFunnels);
  const handleCreateFunnel = (newFunnel: { name: string }) => {
    setFunnelData([
      ...funnelData,
      { name: newFunnel.name, updatedAt: "Today", published: "Live" },
    ]);
  };
  return (
    <BlurPage>
      <FunnelsTable
        actionButtonText={
          <>
            <Plus size={15} />
            New Funnel
          </>
        }
        modalChildren={<CreateFunnel onFunnelCreated={handleCreateFunnel} />}
        filterValue="name"
        columns={columns}
        data={funnelData}
      />
    </BlurPage>
  );
};

export default Funnels;
