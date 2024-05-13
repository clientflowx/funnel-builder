"use client";
import React, { useState } from "react";
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

const Funnels = ({ params }: { params: { subaccountId: string } }) => {
  const [funnelList, setFunnelList] = useState(funnels);

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
        modalChildren={
          <CreateFunnel funnelList={funnelList} setFunnelList={setFunnelList} />
        }
        filterValue="name"
        columns={columns}
        data={funnelList}
      />
    </BlurPage>
  );
};

export default Funnels;
